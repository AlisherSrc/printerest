import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropOutNotificationsComponent } from './drop-out-notifications.component';

describe('DropOutNotificationsComponent', () => {
  let component: DropOutNotificationsComponent;
  let fixture: ComponentFixture<DropOutNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropOutNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropOutNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
