import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSearchDialogComponent } from './map-search-dialog.component';

describe('MapSearchDialogComponent', () => {
  let component: MapSearchDialogComponent;
  let fixture: ComponentFixture<MapSearchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSearchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
