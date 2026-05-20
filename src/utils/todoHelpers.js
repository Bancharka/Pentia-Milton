export function getSubTodos(todos, todoIndex) {
    return todos[todoIndex]?.subTodos ?? []
}
/**
 * @function toggleDone
 * @description Toggler done-status på en specifik subTodo og returnerer den opdaterede liste.
 * @param {Array} subTodos - Array af subTodo-objekter
 * @param {number} subTodoIndex - Indeks for den subTodo der skal togles
 * @returns {Array} Opdateret array af subTodos
 */
export function toggleDone(subTodos, subTodoIndex) {
    return subTodos.map((sub, i) =>
        i === subTodoIndex ? { ...sub, done: !sub.done } : sub
    )
}
/**
 * @function applyToggle
 * @description Beregner den nye done-status og returnerer den opdaterede subTodo-liste.
 * @param {Array} subTodos - Array af subTodo-objekter
 * @param {number} subTodoIndex - Indeks for den subTodo der skal togles
 * @returns {{updated: Array, newDone: boolean}} Opdateret subTodo-liste og den nye done-status
 */
export function applyToggle(subTodos, subTodoIndex) {
    const newDone = !subTodos[subTodoIndex].done
    const updated = toggleDone(subTodos, subTodoIndex)
    return { updated, newDone }
}