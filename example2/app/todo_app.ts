import {Component} from 'angular2/core';
import {Todo} from './todo';
import {TodoList} from './todo_list';
import {TodoForm} from './todo_form';
@Component(
{
  selector: 'todo-app',
  template: `
    <h2>Todo</h2>
    <span>{{remaining}} of {{todos.length}} remaining</span>
    [ <a (click)="archive()">archive</a> ]
    <todo-list [todos]="todos"></todo-list>
    <todo-form (newTask)="addTask($event)"></todo-form>`,
  styles:['a { cursor: pointer; cursor: hand; }'],
  directives: [TodoList, TodoForm]
})

//esport es lo equivalente a controller en angular1, lo que pasa aqui es que
//cuando una clase sea importada, automaticamente se ejecutara lo definido como export
//como una especie de inicializacion
export class TodoApp
{
  todos: Todo[] = [
                    {text:'learn angular', done:true},
                    {text:'build an angular app', done:false}
                  ];

  get remaining()
  {
  	//la funcion reduce, hace un recorrido por todos los elementos del arreglo, y se ejecuta una funcion anonima, que en cada
  	//iteracion retornara un valor, dicho valor se suma,concatena, resta, etc, etc
  	//en ECMAScript6 se maneja una nueva forma de funcion anonima, donde se obvia la palabra reservada function y ademas la palabra
  	//reservada =>, actua como { return }
    return this.todos.reduce((count: number, todo: Todo) => count + +!todo.done, 0);
    //aqui se utiliza una forma ridicula de ahorrar codigo, en el return, lo que hace el codigo es castings, sin tener que especificar
    //number(bolean) pero el ahorrar unos cuantos caracteres, ocasiona que se complique la interpretacion para el resto de programadores
  }

  //funcion tipeada
  archive(): void
  {
    var oldTodos = this.todos, newTodos;
    this.todos = [];
    newTodos=this.todos;
    //nuevo format en ECMAScript6 para foreach, no se permite la utilizacion de la palabra reservada function, por lo que la funcion anonima
    //se utilizara con los puros parametros,en la iteracion al referirse al objeto this, se refiere a lo que en la version anterior de forEach
    //seria el objeto superior
    oldTodos.forEach((todo: Todo) =>
    {
      if (!todo.done)
        this.todos.push(todo);
    });
  }

	addTask(task: Todo)
	{
		this.todos.push(task);
	}
}