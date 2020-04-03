import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommerceDialogComponent } from './edit-commerce-dialog.component';

describe('EditCommerceDialogComponent', () => {
  let component: EditCommerceDialogComponent;
  let fixture: ComponentFixture<EditCommerceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommerceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommerceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
