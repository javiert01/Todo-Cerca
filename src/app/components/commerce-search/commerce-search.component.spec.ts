import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceSearchComponent } from './commerce-search.component';

describe('CommerceSearchComponent', () => {
  let component: CommerceSearchComponent;
  let fixture: ComponentFixture<CommerceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
