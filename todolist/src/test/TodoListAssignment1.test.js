import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoInput from '../components/TodoInput';
import TodoApp from '../components/TodoApp';
import React from 'react';


describe('removeTodo function test', () => {
    test('remove ToDo item from list (Test Case 1)', () => {
        render(<TodoApp remove={(remove) => console.log("Remove", remove)} />)
        const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
        const deleteButton = deleteButtons[0]
        fireEvent.click(deleteButton)
        expect(deleteButton).not.toBeInTheDocument()
    })
    test('does not delete any item from the todo list when the item is missing (Test Case 2)', () => {
        render(<TodoApp />)
        const deleteButton = screen.getByRole('button', { name: /delete/i })
        fireEvent.click(deleteButton);

    })

})

describe('addTodo function test', () => {

    test('add ToDo item to the todo list without warning message', () => {
        render(<TodoInput onValue={(todo) => console.log("Todo:", todo)} />);
        const inputElement = screen.getByRole('textbox', { name: /desc/i });
        const dateInputElement = screen.getByPlaceholderText('Enter date')
        const addButton = screen.getByRole('button', { name: /add/i });

        fireEvent.change(inputElement, { target: { value: 'Hello' } })
        fireEvent.change(dateInputElement, { target: { value: '2024-04-15' } });
        fireEvent.click(addButton);


        expect(inputElement.value).toBe('Hello')
        expect(dateInputElement.value).toBe('2024-04-15');
        expect(addButton).toBeEnabled()
    });
    test.only('add duplicate ToDo item to the todo list with warning message', () => {
        const modalRef = { current: { showModal: jest.fn() } }

        render(<TodoApp modal={modalRef} />)

        const inputElement = screen.getByRole('textbox', { name: /desc/i });
        const dateInputElement = screen.getByPlaceholderText('Enter date')
        const addButton = screen.getByRole('button', { name: /add/i });

        fireEvent.change(inputElement, { target: { value: 'Default Todo 1' } })
        fireEvent.change(dateInputElement, { target: { value: '2024-04-15' } });
        fireEvent.click(addButton);

        fireEvent.change(inputElement, { target: { value: 'Default Todo 1' } });
        fireEvent.change(dateInputElement, { target: { value: '2024-04-15' } });
        fireEvent.click(addButton);
        expect(modalRef.current.showModal).toHaveBeenCalled();
    })
})


