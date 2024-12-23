<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todo.service';
import type { Todo } from '@/types/todo.type';
import TodoForm from './TodoForm.vue';
import TodoCard from './TodoCard.vue';


const todos = ref<Todo[]>([]);

const fetchTodos = async () => {
    todos.value = await getTodos();
};

const updateTodoList = async (todo: Todo) => {
    if (todo.id) {
        const updatedTodo = { ...todo, status: nextStatus(todo.status) }
        await updateTodo(todo.id, updatedTodo);
        await fetchTodos()
    }
};

const nextStatus = (status: 'TODO' | 'IN_PROGRESS' | 'DONE' | undefined): 'TODO' | 'IN_PROGRESS' | 'DONE' => {
    switch (status) {
        case 'TODO': {
            return 'IN_PROGRESS'
        }
        case 'IN_PROGRESS': {
            return 'DONE'
        }
        case 'DONE': {
            return 'TODO'
        }
        default:
            return 'TODO'
    }
}
const removeTodo = async (id: string | undefined) => {
    if (id) {
        await deleteTodo(id);
        todos.value = todos.value.filter(todo => todo.id !== id);
    }
};

const addTodo = async (form: Todo) => {
    await createTodo({ ...form });
    await fetchTodos()
}

onMounted(fetchTodos);
</script>

<template>
    <div class="todo-list">
        <TodoForm @valid-form="addTodo" />
        <div class="todo-list-card">
            <TodoCard v-for="todo in todos" :key="todo.id" :todo=todo @remove-todo="removeTodo"
                @update-todo="updateTodoList" />
        </div>
    </div>
</template>

<style scoped>
.todo-list {
    display: flex;
    flex-direction: row;
    margin: 24px;

    &.-card {
        flex-direction: column;
    }
}
</style>
