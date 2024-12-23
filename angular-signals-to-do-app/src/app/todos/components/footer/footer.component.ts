import { Component, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class FooterComponent {
  todosService = inject(TodosService);
  filterSig = this.todosService.filterSig;
  filterEnum = FilterEnum;
  activeCount = computed(() => {
    return this.todosService.todosSig().filter((todo) => !todo.isCompleted)
      .length;
  });
  noTodosClass = computed(() => this.todosService.todosSig().length === 0);
  itemsLeftText = computed(
    () => `item${this.activeCount() !== 1 ? 's' : ''} left`
  );

  public changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
  }
}
