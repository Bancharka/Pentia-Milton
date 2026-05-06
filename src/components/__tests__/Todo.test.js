import { describe, it, expect } from 'vitest'
import { applyToggle } from '@/utils/todoHelpers'

describe('applyToggle', () => {
    it('returns the updated array with the toggled value', () => {
        const subTodos = [{ title: 'Opsætning af hegn', done: false }]
        const { updated } = applyToggle(subTodos, 0)
        expect(updated[0].done).toBe(true)
    })

    it('when toggling false value it returns as true', () => {
        const subTodos = [{ title: 'Opsætning af hegn', done: false }]
        const { newDone } = applyToggle(subTodos, 0)
        expect(newDone).toBe(true)
    })

    it('when toggling true value it returns as false', () => {
        const subTodos = [{ title: 'Mal lågen', done: true }]
        const { newDone } = applyToggle(subTodos, 0)
        expect(newDone).toBe(false)
    })

    it('does not mutate the original array, only applies a copy', () => {
        const subTodos = [{ title: 'Opsætning af hegn', done: false }]
        applyToggle(subTodos, 0)
        expect(subTodos[0].done).toBe(false)
    })
})