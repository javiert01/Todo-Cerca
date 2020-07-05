import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommerceService } from "src/app/services/commerce.service";
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: "app-search-header",
  templateUrl: "./search-header.component.html",
  styleUrls: ["./search-header.component.css"],
})
export class SearchHeaderComponent implements OnInit, OnDestroy {
  totalCommerces = 0;
  newsIndex = 0;
  i = 0;
  currentNew;
  newsArray = [
    'Durante la nueva normalidad, si tu localidad se encuentra en semaforo rojo 🔴 #QuédateEnCasa',
    'Mantén una sana distancia entre personas (1,5 metros a 2 metros), en caso de no poder mantenerla, recuerda usar cubreboca, por ejemplo en el transporte público',
  ]

  //========================================
  //Close subscriptions
  //========================================
  commmerceServiceSub: Subscription;

  constructor(private commmerceService: CommerceService, private router: Router) {}

  ngOnInit(): void {
    this.currentNew = this.newsArray[this.i];
    setInterval(() => {
      this.showNews();
    }, 5000);
    this.commmerceServiceSub = this.commmerceService
      .getTotalRegisteredCommerces()
      .subscribe((data) => {
        this.totalCommerces = data["allowedCommerces"];
      });

  }

  showNews() {
    this.i++;
   if (this.i > 2) {
     this.i = 0;
   }
   this.currentNew = this.newsArray[this.i];
  }

  onCloseNews() {
    const newsContainer = document.getElementById("news-container");
    newsContainer.style.display = "none";
  }

  onNavigateToRegister() {
    this.router.navigate(['/registrar']);
    if(this.commmerceService.getCommerceFormData()) {
      this.commmerceService.setCommerceFormData(null);
    }
  }

  ngOnDestroy() {
    if (this.commmerceServiceSub) {
      this.commmerceServiceSub.unsubscribe();
    }
  }

}
