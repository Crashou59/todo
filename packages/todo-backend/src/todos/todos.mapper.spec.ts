import { TodoDto } from "./dto/todo.dto"; 
import { TodoDocument } from "./schemas/todo.schema"; 
import { maptoDto } from "./todos.mapper";


describe('maptoDto', () => {
    it('should map a TodoDocument to TodoDto', () => {
        // Crée un mock de TodoDocument
        const mockTodoDocument: TodoDocument = {
            _id: '1234567890abcdef12345678', // Exemple d'ID MongoDB
            title: 'Test Todo',
            description: 'This is a test todo description',
            status: 'TODO',
            // Ajoutez d'autres propriétés si nécessaire
        } as TodoDocument;

        // Appelle la fonction maptoDto avec le mock
        const result: TodoDto = maptoDto(mockTodoDocument);

        // Assertions
        expect(result).toEqual({
            id: '1234567890abcdef12345678',  // L'ID doit être converti en string
            title: 'Test Todo',
            description: 'This is a test todo description',
            status: 'TODO',
        });
    });
});
