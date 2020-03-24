import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRegisterDataComponent } from './verify-register-data.component';

describe('VerifyRegisterDataComponent', () => {
  let component: VerifyRegisterDataComponent;
  let fixture: ComponentFixture<VerifyRegisterDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyRegisterDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyRegisterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
