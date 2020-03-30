import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todos más cerca';
  routeHidden = false;

  constructor(private _router: Router) {
    this._router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        if (e.url === '/login-admin' || e.url === '/inicio-admin') {
          this.routeHidden = false;
        } else {
          this.routeHidden = true;
        }
      }
    });
  }
}
