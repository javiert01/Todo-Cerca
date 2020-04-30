import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { OnlyOnceMessageComponent } from './dialogs/only-once-message/only-once-message.component';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Frontend";
  routeHidden;
  registerCounter = 1;
  homeCounter = 1;
  dialogSub: Subscription;

  constructor(private _router: Router, private dialog: MatDialog) {
    this._router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (e.url === "/registrar") {
          this.routeHidden = true;
         /*  if(this.registerCounter === 1) {
            this.openMessageDialog('register');
          } */
        } else {
          this.routeHidden = false;
        }
      if(e.url === "/home"){
        if(this.homeCounter === 1) {
          this.openMessageDialog('home')
        }
      }
      }
    });
  }

  openMessageDialog(message) {
      const configuracionDialog = new MatDialogConfig();
      configuracionDialog.disableClose = false;
      configuracionDialog.autoFocus = true;
      if (window.innerWidth < 551) {
        configuracionDialog.height = '324px';
      } else if (window.innerWidth < 769) {
        configuracionDialog.height = '424px';
      } else {
        configuracionDialog.height = '524px';
      }
      configuracionDialog.width = '500px';
      configuracionDialog.data = {
        message: message
      };
      const dialogRef = this.dialog.open(OnlyOnceMessageComponent, configuracionDialog);
      this.dialogSub = dialogRef.afterClosed().subscribe((data) => {
        if (data === 'register') {
          this.registerCounter ++;
        } else {
          this.homeCounter++;
        }
      });
    }
 }
