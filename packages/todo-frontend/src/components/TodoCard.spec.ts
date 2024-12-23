import { mount } from '@vue/test-utils';
import TodoCard from '@/components/TodoCard.vue';
import type { Todo } from '@/types/todo.type';

describe('TodoCard.vue', () => {
    let wrapper: any;
    const todo: Todo = {
        id: '1',
        title: 'Test Todo',
        description: 'This is a test description',
        status: 'TODO',
    };

    beforeEach(() => {
        wrapper = mount(TodoCard, {
            props: { todo },
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('renders todo title and status', () => {
        expect(wrapper.find('.todo-card-title').text()).toBe(todo.title);
        expect(wrapper.find('.todo-card-status').text()).toBe(todo.status);
    });

    it('renders todo description', () => {
        expect(wrapper.find('.todo-card-content').text()).toBe(todo.description);
    });

    it('emits update-todo event when Change d\'état is clicked', async () => {
        await wrapper.find('.todo-card-button').trigger('click');
        expect(wrapper.emitted('update-todo')).toBeTruthy();
        expect(wrapper.emitted('update-todo')![0]).toEqual([todo]);
    });

    it('emits remove-todo event with todo id when Supprimer is clicked', async () => {
        const deleteButton = wrapper.findAll('.todo-card-button')[1];
        await deleteButton.trigger('click');
        expect(wrapper.emitted('remove-todo')).toBeTruthy();
        expect(wrapper.emitted('remove-todo')![0]).toEqual([todo.id]);
    });
});
