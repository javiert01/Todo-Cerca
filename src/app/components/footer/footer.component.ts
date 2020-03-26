import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  showTerms = false;
  constructor(private _router: Router) {
    this._router.events
      .pipe(
        tap(e => {
          if (e instanceof NavigationStart) {
            if (e.url === "/gracias") {
              this.showTerms = true;
            } else {
              this.showTerms = false;
            }
          }
        })
      )
      .subscribe();
  }

  ngOnInit() {}

  onGoToTop() {
    document
      .querySelector("#section-3-registro")
      .scrollIntoView({ behavior: "smooth" });
  }
}
