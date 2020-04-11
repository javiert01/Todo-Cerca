import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceResultsMapComponent } from './commerce-results-map.component';

describe('CommerceResultsMapComponent', () => {
  let component: CommerceResultsMapComponent;
  let fixture: ComponentFixture<CommerceResultsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerceResultsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceResultsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
