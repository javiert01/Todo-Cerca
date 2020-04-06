import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommerceService } from 'src/app/services/commerce.service';
import { forkJoin, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-commerce-dialog',
  templateUrl: './delete-commerce-dialog.component.html',
  styleUrls: ['./delete-commerce-dialog.component.css']
})
export class DeleteCommerceDialogComponent implements OnInit {

  commerces = [];
  nombreEmpresa = '';
  eliminarSi = false;
  activarBoton = false;
  cancelConfirmed = false;
  deleteCommerceSub: Subscription;
  constructor(
    private dialogRef: MatDialogRef<DeleteCommerceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private commerceService: CommerceService,
  ) {
    this.commerces = data.commerces;
  }
  ngOnInit() {}
  // CUANDO EL USUARIO CONFIRMA
  eliminarSiMethod() {
    this.eliminarSi = true;
  }
  // ELIMINA AL USUARIO DE LA BD
  eliminarEmpresa() {
    //    this.empresasService.el;
    const deleteObservables = [];
    for(let i = 0; i < this.commerces.length; i++) {
      deleteObservables.push(this.commerceService.deleteCommerce(this.commerces[i].id))
    }
    this.deleteCommerceSub = forkJoin(deleteObservables)
    .subscribe((data) => {
      this.cancelConfirmed = true;
    });
  }
  buscarEmpresa(param: string) {
      this.activarBoton = this.commerces[0].commerceName === param;
  }

  confirmarEliminarTodos(param: string) {
    this.activarBoton = 'confirmar' === param;
  }

  close(action) {
    this.dialogRef.close(action);
  }

  ngOnDestroy() {
    if(this.deleteCommerceSub){
      this.deleteCommerceSub.unsubscribe();
    }
  }
}
