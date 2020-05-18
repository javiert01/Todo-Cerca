import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceRegistrationComponent } from './commerce-registration.component';

describe('CommerceRegistrationComponent', () => {
  let component: CommerceRegistrationComponent;
  let fixture: ComponentFixture<CommerceRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerceRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
