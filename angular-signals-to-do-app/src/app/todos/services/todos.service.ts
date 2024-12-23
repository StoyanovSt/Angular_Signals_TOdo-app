import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  public todosSig = signal<TodoInterface[]>([]);
  public filterSig = signal<FilterEnum>(FilterEnum.all);

  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16), //mock
    };

    this.todosSig.update((todos) => [...todos, newTodo]);
  }

  changeFilter(filterName: FilterEnum): void {
    this.filterSig.set(filterName);
  }

  changeTodo(id: string, text: string): void {
    this.todosSig.update((todos: TodoInterface[]) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  }

  removeTodo(id: string): void {
    this.todosSig.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  toggleTodo(id: string): void {
    this.todosSig.update((todos: TodoInterface[]) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  toggleAll(isCompleted: boolean): void {
    this.todosSig.update((todos: TodoInterface[]) =>
      todos.map((todo) => ({ ...todo, isCompleted }))
    );
  }
}
