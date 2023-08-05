import { Component, OnInit } from '@angular/core';
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscription";
import {HomeService} from "../../../../shared/services/home/home.service";
import {takeUntil} from "rxjs";
import {Articles} from "../../../../shared/models/articles.interface";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent extends DestroySubscription implements OnInit {
  articleData: Articles | undefined;
  // @ts-ignore
  id: number;

  constructor(private homeService: HomeService, private activatedRoute: ActivatedRoute, private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    })
    this.getOneArticle(this.id);
  }

  getOneArticle(id: number) {
    this.homeService.getOneArticle(id).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.articleData = data;
    })
  }

  goBack() {
    this.location.back();
  }
}
