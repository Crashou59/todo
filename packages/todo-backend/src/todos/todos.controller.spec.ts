import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todo } from './schemas/todo.schema';


describe('TodosController', () => {
  let todosController: TodosController;
  let todosService: TodosService;

  const mockTodosService = {
    create: jest.fn().mockResolvedValue({ id: '1', title: 'Test Todo', description: 'A test task', status: 'TODO' }),
    findAll: jest.fn().mockResolvedValue([{ id: '1', title: 'Test Todo', description: 'A test task', status: 'TODO' }]),
    findOne: jest.fn().mockResolvedValue({ id: '1', title: 'Test Todo', description: 'A test task', status: 'TODO' }),
    update: jest.fn().mockResolvedValue({ id: '1', title: 'Updated Todo', description: 'An updated task', status: 'IN_PROGRESS' }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService,
        },
      ],
    }).compile();

    todosController = module.get<TodosController>(TodosController);
    todosService = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(todosController).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const todo: Todo = { title: 'Test Todo', description: 'A test task', status: 'TODO' };
      const result = await todosController.create(todo);
      expect(result).toHaveProperty('id');
      expect(todosService.create).toHaveBeenCalledWith(todo);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const result = await todosController.findAll();
      expect(result).toEqual([{ id: '1', title: 'Test Todo', description: 'A test task', status: 'TODO' }]);
      expect(todosService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a todo by id', async () => {
      const id = '1';
      const result = await todosController.findOne(id);
      expect(result).toHaveProperty('id', '1');
      expect(todosService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const id = '1';
      const todo: Todo = { title: 'Updated Todo', description: 'An updated task', status: 'IN_PROGRESS' };
      const result = await todosController.update(id, todo);
      expect(result).toHaveProperty('title', 'Updated Todo');
      expect(todosService.update).toHaveBeenCalledWith(id, todo);
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      const id = '1';
      await todosController.remove(id);
      expect(todosService.remove).toHaveBeenCalledWith(id);
    });
  });
});
