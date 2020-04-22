import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Frontend";
  routeHidden;

  constructor(private _router: Router) {
    this._router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (e.url === "/registrar") {
          this.routeHidden = true;
        } else {
          this.routeHidden = false;
        }
      }
    });
  }
}
