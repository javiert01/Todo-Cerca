import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadExcelDialogComponent } from './download-excel-dialog.component';

describe('DownloadExcelDialogComponent', () => {
  let component: DownloadExcelDialogComponent;
  let fixture: ComponentFixture<DownloadExcelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadExcelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadExcelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
