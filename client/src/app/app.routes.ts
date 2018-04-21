import { Routes } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const ROUTES: Routes = [
  { path: '', component: TodosComponent, canActivate: [ AuthGuard ] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];
