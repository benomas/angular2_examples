import {Component, Output, EventEmitter} from 'angular2/core';
import {Todo} from './todo';
@Component({
  selector: 'todo-form',
  template: `
    <form (ngSubmit)="addTodo()">
      <input type="text" [(ngModel)]="task" size="30"
             placeholder="add new todo here">
      <input class="btn-primary" type="submit" value="add">
    </form>`
})
export class TodoForm
{
  //output se refiere a una salida de informacion hacia el scope superior, es una salida en forma de evento
  //que regresara un objeto Todo
  @Output() newTask = new EventEmitter<Todo>();
  task: string = '';
  addTodo()
  {
    if (this.task)
    {
      //Se genera un trigger del evento newTask y se define objecto invocador
      this.newTask.next({text:this.task, done:false});
    }
    this.task = '';
  }
}