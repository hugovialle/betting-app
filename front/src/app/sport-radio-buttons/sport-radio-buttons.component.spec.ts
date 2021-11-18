import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportRadioButtonsComponent } from './sport-radio-buttons.component';

describe('SportRadioButtonsComponent', () => {
  let component: SportRadioButtonsComponent;
  let fixture: ComponentFixture<SportRadioButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportRadioButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportRadioButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
