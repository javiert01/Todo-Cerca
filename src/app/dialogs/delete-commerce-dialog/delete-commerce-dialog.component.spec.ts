import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCommerceDialogComponent } from './delete-commerce-dialog.component';

describe('DeleteCommerceDialogComponent', () => {
  let component: DeleteCommerceDialogComponent;
  let fixture: ComponentFixture<DeleteCommerceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCommerceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCommerceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
