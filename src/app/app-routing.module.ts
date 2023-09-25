import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ConversionsComponent } from './components/conversions/conversions.component';
import { PostComponent } from './components/post/post.component';
import { AuthGuard } from './auth.guard';
import { Error403Component } from './error403/error403.component';

const routes: Routes = [

  {path: '', component: MainComponent},
  {path: 'convers', component: ConversionsComponent,canActivate: [AuthGuard], data: { roles: ['user']}},
  {path: 'post', component: PostComponent, canActivate: [AuthGuard], data: { roles: ['admin']}},
  //{path: '403', component: Error403Component },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
