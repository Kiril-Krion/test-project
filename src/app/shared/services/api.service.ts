import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Articles} from "../models/articles.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'https://api.spaceflightnewsapi.net/v3'

  constructor(private http: HttpClient) { }

  public getArticles(): Observable<Articles[]> {
    return this.http.get<Articles[]>(`${this.apiUrl}/articles`)
  }

  public getOneArticle(id: number): Observable<Articles> {
    return this.http.get<Articles>(`${this.apiUrl}/articles/${id}`)
  }
}
