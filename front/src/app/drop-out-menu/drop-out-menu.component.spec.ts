import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropOutMenuComponent } from './drop-out-menu.component';

describe('DropOutMenuComponent', () => {
  let component: DropOutMenuComponent;
  let fixture: ComponentFixture<DropOutMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropOutMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropOutMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
