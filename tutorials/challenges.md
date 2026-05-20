# Udfordringer og løsninger

## Firestore datastruktur — todos og subTodos

Under udviklingen stødte vi på udfordringer relateret til strukturen af vores todo-data i Firestore.

#### Delte todos på tværs af huse

I den første iteration af databasen lå todos direkte på `default-house` dokumentet, på samme niveau som adresse og øvrige husfelter. Dette betød at alle huse delte den samme todo-liste, og når en todo blev markeret som færdig på ét hus, blev ændringen reflekteret på samtlige huse i systemet.

Løsningen var at flytte todos ud af `default-house` og i stedet gemme dem som et nested array direkte på hvert enkelt hus-dokument i `houses`-collectionen. På den måde har hvert hus sin egen uafhængige kopi af todos, og afkrydsninger er isoleret til det specifikke hus.

#### Manglende todos/subTodos hierarki

En anden udfordring var, at vi undervejs opdagede at vores todos skulle have to niveauer — overordnede todos og tilhørende subTodos — hvilket ikke var afspejlet i den oprindelige struktur.

Løsningen blev en to-lags nested struktur: i `houseTemplates/default-house/todos` ligger de overordnede todos som separate dokumenter, og hvert todo-dokument har en egen `subTodos`-subcollection. Når et nyt hus oprettes, bygges todos-arrayet fra denne template via `buildTodosFromTemplate()`, som henter både todos og subTodos og kopierer dem ned i hus-dokumentet med `done: false`.

```js 
async function buildTodosFromTemplate() {
        const templateTodos = await getDocs(
            query(
                collection(db, 'houseTemplates', 'default-house', 'todos'),
                orderBy('order')
            )
        )
        const todos = []
        for (const todoDoc of templateTodos.docs) {
            const subTodosSnap = await getDocs(
                collection(db, 'houseTemplates', 'default-house', 'todos', todoDoc.id, 'subTodos')
            )
            todos.push({
                title: todoDoc.data().title,
                order: todoDoc.data().order,
                done: false,
                subTodos: subTodosSnap.docs.map(subDoc => ({
                    title: subDoc.data().title,
                    order: subDoc.data().order,
                    done: false,
                }))
            })
        }
        return todos
    }
```

#### Tekniske konsekvenser

Den nested struktur havde direkte indflydelse på flere dele af kodebasen.

`updateSubTodoDone()` og `updateSubTodoDoneById()` blev mere komplekse, da en statusændring på en subTodo også kræver at parent objektets `done`-felt genberegnes. Efter hver ændring på en subTodo tjekkes det derfor om alle subTodos under det pågældende todo er fuldført, og parents `done` opdateres i overensstemmelse med:

```js
async function updateSubTodoDone(todoIndex, subTodoIndex, done) {
        const house = await fetchUserHouse()
        if (!house) return
        const todos = house.todos
        todos[todoIndex].subTodos[subTodoIndex].done = done
        const allDone = todos[todoIndex].subTodos.every(s => s.done)
        todos[todoIndex].done = allDone
        const houseRef = doc(db, 'houses', house.id)
        await updateDoc(houseRef, { todos })
    }
```
```js
async function updateSubTodoDoneById(houseId, todoIndex, subTodoIndex, done) {
        const house = await fetchHouseById(houseId)
        if (!house) return
        const todos = house.todos
        todos[todoIndex].subTodos[subTodoIndex].done = done
        const allDone = todos[todoIndex].subTodos.every(s => s.done)
        todos[todoIndex].done = allDone
        const houseRef = doc(db, 'houses', houseId)
        await updateDoc(houseRef, { todos })
    }
```

I `ProgressBar`-komponenten blev beregningen af progress også tilpasset strukturen. Da det er subTodos der udgør de egentlige opgaver, flades arrayet ud med `flatMap` for at beregne den samlede fremdrift:

```js
const max = computed(() => houseStore.todos.flatMap((todo) => todo.subTodos))
const done = computed(() => max.value.filter((todo) => todo.done === true))
```
