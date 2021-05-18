import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil, distinctUntilChanged, filter } from 'rxjs/operators';
import { Repo } from 'src/app/shared/clases/repos';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit , OnDestroy{
  repos:Repo[] = [];
  favRepo:Repo[] = [];
  repo!: Repo;
  unsubscribe = new Subject();
  searchControl!: FormControl;
  debounce: number = 1000;
  page:number = 0;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.searchControl = new FormControl('');
    this.initRepos();
    this.searchControl.valueChanges
    .pipe(
      takeUntil(this.unsubscribe),
      debounceTime(this.debounce),
      distinctUntilChanged(),
      filter(val => val.trim()),
      switchMap((query: string) => {
        return this.usersService.searchRepos(query, this.page)
      })
      )
      .subscribe((list: any) => {
        this.repos = list.items.map( (item:any) => new Repo(item))
        this.repos.forEach(item => {
          this.favRepo.forEach(value => {
            if(value.id === item.id) {
              item.isFavorite = true;
            }
          })
        })
      });
      this.usersService.repo$.subscribe( v => this.favRepo = v)
    }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  initRepos() {
    this.usersService.getAllRepos()
    .pipe(
      takeUntil(this.unsubscribe)
    )
      .subscribe((list: any) => {
        this.repos = list.map( (item:any) => new Repo(item))
        this.repos.forEach(item => {
          this.favRepo.forEach(value => {
            if(value.id === item.id) {
              item.isFavorite = true;
            }
          })
        })
      })
  }

  open(repo:Repo) {
    this.repo = repo;
  }

  addToFavorite(repo:Repo) {
    repo.isFavorite = true;
    this.usersService.addFavoriteRepo(repo)
  }

  nextPage(event:any) {
    if(event === this.repos.length - 20) {
      this.page++
      if(this.searchControl.value) {
        this.usersService.searchRepos(this.searchControl.value, this.page)
          .pipe(
            takeUntil(this.unsubscribe)
          )
          .subscribe((list:any) => {
            this.repos = this.repos.concat(list.items.map( (item:any) => new Repo(item)))
            this.repos.forEach(item => {
              this.favRepo.forEach(value => {
                if(value.id === item.id) {
                  item.isFavorite = true;
                }
              })
            })
          })
      }
    }
  }
}

