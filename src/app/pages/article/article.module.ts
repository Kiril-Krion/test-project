import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './components/article/article.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MatButtonModule
  ]
})
export class ArticleModule { }
