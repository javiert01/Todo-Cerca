import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceListComponent } from './commerce-list.component';

describe('CommerceListComponent', () => {
  let component: CommerceListComponent;
  let fixture: ComponentFixture<CommerceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
