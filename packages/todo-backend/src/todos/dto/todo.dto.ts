export type TodoDto ={
    id:string,
    title:string,
    description:string,
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}