import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOSComponent } from './map-os.component';

describe('MapOSComponent', () => {
  let component: MapOSComponent;
  let fixture: ComponentFixture<MapOSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
