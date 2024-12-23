<script setup lang="ts">
import type { Todo } from '@/types/todo.type';
import type { PropType } from 'vue';

defineProps({
    todo: { type: Object as PropType<Todo>, default: {} },
})

const emit = defineEmits(['update-todo', 'remove-todo'])

</script>
<template>
    <div class="todo-card">
        <div class="todo-card-header">
            <span class="todo-card-title">{{ todo.title }}</span>
            <span class="todo-card-status">{{ todo.status }}</span>
        </div>
        <div class="todo-card-content">
            {{ todo.description }}
        </div>
        <button class="todo-card-button" @click="$emit('update-todo', todo)">Changer d'état</button>
        <button class="todo-card-button" @click="$emit('remove-todo', todo.id)">Supprimer</button>
    </div>
</template>

<style scoped>
.todo-card {
    display: flex;
    flex-direction: column;
    border: solid;
    margin-bottom: 10px;
    padding: 10px;
    min-width: 200px;
}

.todo-card-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}

.todo-card-content {
    margin-bottom: 40px;
}

.todo-card-title {
    font-weight: 700;
}

.todo-card-status {
    font-style: italic;
}
.todo-card-button {
    margin-bottom: 10px;
}
</style>