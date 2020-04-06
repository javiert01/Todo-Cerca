import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommerceService } from 'src/app/services/commerce.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-allow-commerce-dialog',
  templateUrl: './allow-commerce-dialog.component.html',
  styleUrls: ['./allow-commerce-dialog.component.css']
})
export class AllowCommerceDialogComponent implements OnInit {

  commerces = [];
  nombreEmpresa = '';
  allowConfirmed = false;
  activarBoton = false;
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
    forkJoin(allowObservables)
    .subscribe((data) => {
      this.allowConfirmed = true;
    })
  }

  close(action) {
    this.dialogRef.close(action);
  }

}
