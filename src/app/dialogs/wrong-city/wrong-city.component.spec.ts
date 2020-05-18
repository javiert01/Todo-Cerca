import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongCityComponent } from './wrong-city.component';

describe('WrongCityComponent', () => {
  let component: WrongCityComponent;
  let fixture: ComponentFixture<WrongCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
