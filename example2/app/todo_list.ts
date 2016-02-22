import {Component, Input} from 'angular2/core';
import {Todo} from './todo';
@Component({
  selector: 'todo-list',
  styles: [`
    .done-true {
      text-decoration: line-through;
      color: grey;
    }`
  ],
  template: `
    <ul class="unstyled">
      <li *ngFor="#todo of todos">
        <input type="checkbox" [(ngModel)]="todo.done">
        <span class="done-{{todo.done}}">{{todo.text}}</span>
      </li>
    </ul>`
})
export class TodoList
{
  //el metodo input, no se refiere al elemento html input, se refiere a una entrada de informacion desde el scope superior
  //lo que dice aqui, es que se recibe una entrada que es un array de objectos Todo, y se asignara en la variable todos local
  @Input() todos: Todo[];
}