import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowCommerceDialogComponent } from './allow-commerce-dialog.component';

describe('AllowCommerceDialogComponent', () => {
  let component: AllowCommerceDialogComponent;
  let fixture: ComponentFixture<AllowCommerceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowCommerceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowCommerceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
