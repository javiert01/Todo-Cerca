import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseConditionsComponent } from './use-conditions.component';

describe('UseConditionsComponent', () => {
  let component: UseConditionsComponent;
  let fixture: ComponentFixture<UseConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
