import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionUpdateDialogComponent } from './conversion-update-dialog.component';

describe('ConversionUpdateDialogComponent', () => {
  let component: ConversionUpdateDialogComponent;
  let fixture: ComponentFixture<ConversionUpdateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConversionUpdateDialogComponent]
    });
    fixture = TestBed.createComponent(ConversionUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
