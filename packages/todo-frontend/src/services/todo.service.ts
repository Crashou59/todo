import type { Todo } from '@/types/todo.type';
import axios from 'axios';


export const getTodos = async () => 
   (await axios.get(import.meta.env.VITE_API_URL)).data;

export const createTodo = async (todo:Todo) => 
   (await axios.post(import.meta.env.VITE_API_URL, todo)).data;

export const updateTodo = async (id : string, todo:Todo) => 
  (await axios.patch(`${import.meta.env.VITE_API_URL}/${id}`, todo )).data;

export const deleteTodo = async (id:string) => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
};