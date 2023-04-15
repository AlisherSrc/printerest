import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropOutMessagesComponent } from './drop-out-messages.component';

describe('DropOutMessagesComponent', () => {
  let component: DropOutMessagesComponent;
  let fixture: ComponentFixture<DropOutMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropOutMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropOutMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
