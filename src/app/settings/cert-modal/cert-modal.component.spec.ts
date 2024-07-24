import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertModalComponent } from './cert-modal.component';

describe('CertModalComponent', () => {
  let component: CertModalComponent;
  let fixture: ComponentFixture<CertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
