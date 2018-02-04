import { Routes } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const ROUTES: Routes = [
  { path: '', component: TodosComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];
