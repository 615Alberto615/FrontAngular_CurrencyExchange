import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionsComponent } from './conversions.component';

describe('ConversionsComponent', () => {
  let component: ConversionsComponent;
  let fixture: ComponentFixture<ConversionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConversionsComponent]
    });
    fixture = TestBed.createComponent(ConversionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
