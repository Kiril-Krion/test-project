import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {Observable} from "rxjs";
import {Articles} from "../../models/articles.interface";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private apiService: ApiService) { }

  getArticles(): Observable<Articles[]> {
    return this.apiService.getArticles();
  }

  getOneArticle(id: number): Observable<Articles> {
    return this.apiService.getOneArticle(id);
  }
}
