import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../../../shared/services/home/home.service";
import {Articles} from "../../../../shared/models/articles.interface";
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscription";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends DestroySubscription implements OnInit {
  articlesData: Articles[] | undefined;
  filteredArticles: Articles[] | undefined;
  searchTerm: any;

  constructor(private homeService: HomeService) {
    super();
  }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.homeService.getArticles().pipe(takeUntil(this.destroyStream$)).subscribe(data => {
      this.articlesData = data;
      this.filteredArticles = data;
    })
  }

  filterArticles() {
    if (this.searchTerm) {
      this.filteredArticles = this.articlesData?.filter(article =>
        article.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredArticles = this.articlesData;
    }
  }

  formatDate(isoString: string): string {
    const date = new Date(isoString);
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();
    return `${monthNames[date.getMonth()]} ${day}${this.getOrdinal(day)}, ${date.getFullYear()}`;
  }

  private getOrdinal(n: number): string {
    let s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return (v > 10 && v < 20) ? 'th' : s[(v - 20) % 10] || s[v] || s[0];
  }

}
