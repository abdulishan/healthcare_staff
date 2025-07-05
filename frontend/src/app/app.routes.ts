import { Routes } from '@angular/router';
import { PublicComponent } from './component/public/public.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

export const routes: Routes = [
  
  {
    path: '',
    component: PublicComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'auth',
    loadChildren: ()=> import('./auth/auth.route').then(m=> m.authRoutes),
  },
  {
    path: '**',
    redirectTo: ''
  },
];
