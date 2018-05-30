import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleComponent } from './console/console.component';
import { LoginComponent } from './login/login.component';
import { LinksManagerComponent } from './links-manager/links-manager.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/console',pathMatch: 'full'},
  { path:'console', component:ConsoleComponent, canActivate:[AuthGuard]},
  { path:'linksManager', component:LinksManagerComponent, canActivate:[AuthGuard]},
  { path:'login', component:LoginComponent},
  { path: "**", component:PageNotFoundComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ConsoleComponent,LoginComponent,LinksManagerComponent,PageNotFoundComponent]
