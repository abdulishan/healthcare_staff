import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: ()=> import('./login/login.component').then((m)=>m.LoginComponent),
    title: "Login Page"
  },
  {
    path: 'signup',
    loadComponent: ()=> import('./signup/signup.component').then(m=> m.SignupComponent),
    title: "Signup Page"
  },
];
