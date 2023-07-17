import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchannelVerificationComponent } from './echannel-verification.component';

describe('EchannelVerificationComponent', () => {
  let component: EchannelVerificationComponent;
  let fixture: ComponentFixture<EchannelVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EchannelVerificationComponent]
    });
    fixture = TestBed.createComponent(EchannelVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
