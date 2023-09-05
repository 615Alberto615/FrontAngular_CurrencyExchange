import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ConversionsComponent } from './components/conversions/conversions.component';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [

  {path: '', component: MainComponent},
  {path: 'convers', component: ConversionsComponent},
  {path: 'post', component: PostComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
