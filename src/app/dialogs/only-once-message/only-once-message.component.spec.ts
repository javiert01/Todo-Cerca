import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyOnceMessageComponent } from './only-once-message.component';

describe('OnlyOnceMessageComponent', () => {
  let component: OnlyOnceMessageComponent;
  let fixture: ComponentFixture<OnlyOnceMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlyOnceMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyOnceMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
