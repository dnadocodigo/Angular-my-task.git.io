import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 public  mode: String = 'list';
 public todos: any[] = [];
 public title: String = 'Minha lista de Exercícios';
 public form: FormGroup;

 constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['',Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required
      ])]
    });
    this.load();
 }


 add(){
   const title = this.form.controls['title'].value;
   const id = this.todos.length + 1;
   this.todos.push(new Todo(id, title, false));
   this.save();
   this.clear();
 }

 clear(){
  this.form.reset();
 }

 remove(todo: Todo){
  const index = this.todos.indexOf(todo);
  if(index !== -1){
    this.todos.splice(index, 1)
   this.save();
  }else{
    this.todos = [];
  }
 }
 markAsDone(todo: Todo){
  todo.done = true;
  this.save();
 }
 markAsUndone(todo: Todo){
  todo.done = false;
  this.save();

 }
 save(){
  const datas= JSON.stringify(this.todos);
  localStorage.setItem('todos', datas);
  this.mode = 'list';
 }
 load(){
  const datas = localStorage.getItem('todos')
  if(datas !== null){

    this.todos = JSON.parse(datas);
  }
 }
 changeMode(mode: string){
  this.mode = mode;
 }
}
function todo(): any {
  throw new Error('Function not implemented.');
}

