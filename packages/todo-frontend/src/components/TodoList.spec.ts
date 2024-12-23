// tests/TodoList.spec.ts

import { mount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue'; // Adapte le chemin si nécessaire
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todo.service';

// Mock des services
vi.mock('../services/todo.service');

describe('TodoList.vue', () => {
    let wrapper: any;

    beforeEach(async () => {
        (getTodos as jest.Mock).mockResolvedValue([]);
        wrapper = mount(TodoList);
        await wrapper.vm.$nextTick(); // Attendre que le composant se monte et effectue les appels asynchrones
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('fetches todos on mount', async () => {
        expect(getTodos).toHaveBeenCalled();
    });

    it('adds a new todo', async () => {
        const newTodo = { title: 'New Task', description: 'Task Description', status: 'TODO', id: '1' };
        (createTodo as jest.Mock).mockResolvedValueOnce(newTodo);
        (getTodos as jest.Mock).mockResolvedValueOnce([newTodo]);
        
        await wrapper.findComponent({ name: 'TodoForm' }).vm.$emit('valid-form', newTodo);

        expect(createTodo).toHaveBeenCalledWith(expect.objectContaining(newTodo));
    });

    it('removes a todo', async () => {
        const todoToRemove = { title: 'Task to Remove', description: 'Description', status: 'TODO', id: '1' };
        wrapper.vm.todos.push(todoToRemove);
        (deleteTodo as jest.Mock).mockResolvedValueOnce(null);

        await wrapper.vm.removeTodo(todoToRemove.id);

        expect(deleteTodo).toHaveBeenCalledWith(todoToRemove.id);
        expect(wrapper.vm.todos).not.toContain(todoToRemove);
    });

    it('updates a todo', async () => {
        const todoToUpdate = { title: 'Update Task', description: 'Description', status: 'TODO', id: '1' };
        wrapper.vm.todos.push(todoToUpdate);
        const updatedTodo = { ...todoToUpdate, status: 'IN_PROGRESS' };
        (updateTodo as jest.Mock).mockResolvedValueOnce(updatedTodo);
        (getTodos as jest.Mock).mockResolvedValueOnce([updatedTodo]);

        await wrapper.vm.updateTodoList(todoToUpdate);

        expect(updateTodo).toHaveBeenCalledWith(todoToUpdate.id, expect.objectContaining(updatedTodo));
        expect(wrapper.vm.todos).toContainEqual(updatedTodo);
    });
});
