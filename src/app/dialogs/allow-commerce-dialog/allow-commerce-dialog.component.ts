import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommerceService } from 'src/app/services/commerce.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-allow-commerce-dialog',
  templateUrl: './allow-commerce-dialog.component.html',
  styleUrls: ['./allow-commerce-dialog.component.css']
})
export class AllowCommerceDialogComponent implements OnInit, OnDestroy {

  commerces = [];
  nombreEmpresa = '';
  allowConfirmed = false;
  activarBoton = false;
  allowCommercesSub: Subscription;
  constructor(
    private dialogRef: MatDialogRef<AllowCommerceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private commerceService: CommerceService,
  ) {
    this.commerces = data.commerces;
  }

  ngOnInit() {}

  updateStatusCommerce() {
    //    this.empresasService.el;
    const allowObservables = [];
    for (let i = 0; i < this.commerces.length; i++) {
      allowObservables.push(this.commerceService.updateStatusCommerce(this.commerces[i].id))
    }
    this.allowCommercesSub = forkJoin(allowObservables)
    .subscribe((data) => {
      this.allowConfirmed = true;
    })
  }

  close(action) {
    this.dialogRef.close(action);
  }

  ngOnDestroy() {
    if (this.allowCommercesSub) {
      this.allowCommercesSub.unsubscribe();
    }
  }

}
