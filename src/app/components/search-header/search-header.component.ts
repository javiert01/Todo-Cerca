import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommerceService } from "src/app/services/commerce.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-search-header",
  templateUrl: "./search-header.component.html",
  styleUrls: ["./search-header.component.css"],
})
export class SearchHeaderComponent implements OnInit, OnDestroy {
  totalCommerces = 0;
  newsIndex = 0;

  //========================================
  //Close subscriptions
  //========================================
  commmerceServiceSub: Subscription;

  constructor(private commmerceService: CommerceService) {}

  ngOnInit(): void {
    //this.showNews();
    this.commmerceServiceSub = this.commmerceService
      .getTotalRegisteredCommerces()
      .subscribe((data) => {
        this.totalCommerces = data["allowedCommerces"];
      });
  }

  showNews() {
    let i;
    const news = document.getElementsByClassName("noticia");
    for (i = 0; i < news.length; i++) {
      const c = news[i] as HTMLElement;
      c.style.display = "none";
    }
    this.newsIndex += 1;
    if (this.newsIndex > news.length) {
      this.newsIndex = 1;
    }
    const n = news[this.newsIndex - 1] as HTMLElement;
    n.style.display = "flex";
    setTimeout(this.showNews, 2000); // Change image every 2 seconds
  }

  onCloseNews() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.style.display = "none";
  }

  ngOnDestroy() {
    if (this.commmerceServiceSub) {
      this.commmerceServiceSub.unsubscribe();
    }
  }
}
