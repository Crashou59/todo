<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive } from 'vue';

const emit = defineEmits(['valid-form'])

const form = reactive({
    title: '',
    description: ''
})

const rules = {
    title: { required },
    description: { required },
}

const $v = useVuelidate(rules, form);

const submitForm = async () => {
    const isValidForm = await $v.value.$validate();

    if (isValidForm) {
        emit('valid-form', { ...form })
        $v.value.$reset()
        form.description = ''
        form.title = ''
    }
};
</script>

<template>
    <div>
        <form @submit.prevent="submitForm" class="todo-form">
            <div class="todo-form-input">
                <label for="title">Titre :</label>
                <input type="text" name="title" v-model="form.title"></input>
                <div v-if="$v.title.$error" class="p-error">Titre est obligatoire.</div>
            </div>
            <div class="todo-form-input">
                <label for="description">Description :</label>
                <textarea id="description" v-model="form.description"></textarea>
                <div v-if="$v.description.$error" class="p-error">Description est obligatoire.</div>
            </div>
            <button class="todo-form-button" type="submit">Créer une nouvelle tâche</button>
        </form>
    </div>
</template>



<style scoped>
.todo-form {
    margin: 10px
}

.todo-form-input {
    display: flex;
    flex-direction: column;
    margin: 10px
}

.todo-form-button {
    margin: 10px
}
</style>