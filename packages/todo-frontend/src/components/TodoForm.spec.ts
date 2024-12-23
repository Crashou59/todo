import { mount } from '@vue/test-utils';
import TodoForm from '@/components/TodoForm.vue'; 
import { nextTick } from 'vue';

describe('TodoForm.vue', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = mount(TodoForm);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('renders correctly', () => {
        expect(wrapper.find('input[name="title"]').exists()).toBe(true);
        expect(wrapper.find('textarea#description').exists()).toBe(true);
        expect(wrapper.find('button').text()).toBe('Créer une nouvelle tâche');
    });
  
});
