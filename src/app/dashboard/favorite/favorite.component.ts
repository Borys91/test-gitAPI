import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Repo } from 'src/app/shared/clases/repos';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  unsubscribe = new Subject();
  repos:Repo[] = []
  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    this.usersService.repo$
    .pipe(
    takeUntil(this.unsubscribe)
    )
    .subscribe(repos => this.repos = repos)
  }

  delFavoriteRepo(repo:Repo) {
    this.usersService.delFavoriteRepo(repo)
  }
}
