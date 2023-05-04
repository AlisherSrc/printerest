import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinPageComponent } from './pin-page.component';

describe('PinPageComponent', () => {
  let component: PinPageComponent;
  let fixture: ComponentFixture<PinPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
