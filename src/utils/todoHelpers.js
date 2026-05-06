export function getSubTodos(todos, todoIndex) {
    return todos[todoIndex]?.subTodos ?? []
}
export function toggleDone(subTodos, subTodoIndex) {
    return subTodos.map((sub, i) =>
        i === subTodoIndex ? { ...sub, done: !sub.done } : sub
    )
}
export function applyToggle(subTodos, subTodoIndex) {
    const newDone = !subTodos[subTodoIndex].done
    const updated = toggleDone(subTodos, subTodoIndex)
    return { updated, newDone }
}