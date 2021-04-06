import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Repo } from '../clases/repos';

import { API_CONSTANTS } from '../constants/api';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  favoriteRepo:Repo[] = [];
  repo$: BehaviorSubject<Repo[]> = new BehaviorSubject<Repo[]>(this.favoriteRepo);
  constructor(private http: HttpClient) { }

  searchRepos(userName: string, page = 0) {

      const  params =  new HttpParams()
        .set('sort', 'stars')
        .set('per_page','30')
        .set('page', page.toString())
      return this.http.get(`${API_CONSTANTS.url}${userName}`,{ params: params});
  }

  getAllRepos() {
    return this.http.get(`${API_CONSTANTS.all}`);
  }

  addFavoriteRepo(repo:Repo) {
    if(!this.favoriteRepo.find(item => item.id === repo.id)) {
      this.favoriteRepo.push(repo);
      this.repo$.next(this.favoriteRepo);
    }
  }

  delFavoriteRepo(repo:Repo) {
    this.favoriteRepo = this.favoriteRepo.filter(item => item.id !== repo.id);
    this.repo$.next(this.favoriteRepo);
  }
}
