import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ConversionsComponent } from './components/conversions/conversions.component';
import { PostComponent } from './components/post/post.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  {path: '', component: MainComponent, canActivate: [AuthGuard], data: { roles: ['users'] }},
  {path: 'convers', component: ConversionsComponent},
  {path: 'post', component: PostComponent, canActivate: [AuthGuard], data: { roles: ['admin']}},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
