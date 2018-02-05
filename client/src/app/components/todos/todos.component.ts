import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoModel } from '../../models/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  constructor(private todoService: TodoService) {
    //
  }

  public newTodo: TodoModel = new TodoModel();

  todosList: TodoModel[];
  editTodos: TodoModel[] = [];

  ngOnInit(): void {
    this.todoService.getTodos()
      .subscribe((todos) => {
        this.todosList = todos;
        console.log(todos);
      });
  }

  create() {
    this.todoService.createTodo(this.newTodo)
      .subscribe((res) => {
        this.todosList.push(res.result);
        this.newTodo = new TodoModel();
      });
  }

  editTodo(todo: TodoModel) {
    console.log(todo);
    if (this.todosList.includes(todo)) {
      if (!this.editTodos.includes(todo)) {
        this.editTodos.push(todo);
      } else {
        this.editTodos.splice(this.editTodos.indexOf(todo), 1);
        this.todoService.editTodo(todo).subscribe(res => {
          console.log('Update Succesful');
        }, err => {
          this.editTodo(todo);
          console.error('Update Unsuccesful');
        });
      }
    }
  }

  doneTodo(todo: TodoModel) {
    todo.status = 'Done';
    this.todoService.editTodo(todo).subscribe(res => {
      console.log('Update Succesful');
    }, err => {
      this.editTodo(todo);
      console.error('Update Unsuccesful');
    });
  }

  submitTodo(event, todo: TodoModel) {
    if (event.keyCode === 13) {
      this.editTodo(todo);
    }
  }

  deleteTodo(todo: TodoModel) {
    this.todoService.deleteTodo(todo._id).subscribe(res => {
      this.todosList.splice(this.todosList.indexOf(todo), 1);
    });
  }

}
