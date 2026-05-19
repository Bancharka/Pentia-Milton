// Returnerer listen af subtodos for et givent todo element
export function getSubTodos(todos, todoIndex) {
    return todos[todoIndex]?.subTodos ?? []
}
// Toggler done status på en specifik subtodo og returnerer den opdaterede liste
export function toggleDone(subTodos, subTodoIndex) {
    return subTodos.map((sub, i) =>
        i === subTodoIndex ? { ...sub, done: !sub.done } : sub
    )
}
// Beregner den nye done status og returnerer den opdaterede subtodo liste
export function applyToggle(subTodos, subTodoIndex) {
    const newDone = !subTodos[subTodoIndex].done
    const updated = toggleDone(subTodos, subTodoIndex)
    return { updated, newDone }
}