import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemItemComponent } from './system-item.component';
import { By } from '@angular/platform-browser';

describe('SystemItemComponent', () => {
  let component: SystemItemComponent;
  let fixture: ComponentFixture<SystemItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display systemInput', () => {
    component.system = {
      "alertBody" : "Google went down",
      "alertEmail" : "erik.j.svensson@gmail.com",
      "alertHasBeenSent" : false,
      "alertUrl" : "https://hooks.slack.com/services/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",
      "callBody" : "",
      "callStatus" : "",
      "callUrl" : "https://google.com",
      "certExpirationDays" : 10,
      "certStatus" : "",
      "clientCertId" : 1,
      "httpMethod" : "GET",
      "id" : 2,
      "lastFailTime" : "0001-01-01T01:12:12+01:12",
      "lastOkTime" : "0001-01-01T01:12:12+01:12",
      "message" : "",
      "name" : "google",
      "responseMatch" : "google.kEI",
      "status" : ""
    }
    fixture.detectChanges();
    var Item = fixture.debugElement.nativeElement.querySelector('name');
    expect(Item.innerText).toBe("google");
  })
});
