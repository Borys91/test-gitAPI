import { TopComponent } from './dashboard/top/top.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoriteComponent } from './dashboard/favorite/favorite.component';

const routes: Routes = [
  { path: "", component: TopComponent },
  { path: "favorite", component: FavoriteComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
