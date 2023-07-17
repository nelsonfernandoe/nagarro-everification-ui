import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchannelVerificationFormComponent } from './echannel-verification-form.component';

describe('EchannelVerificationFormComponent', () => {
  let component: EchannelVerificationFormComponent;
  let fixture: ComponentFixture<EchannelVerificationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EchannelVerificationFormComponent]
    });
    fixture = TestBed.createComponent(EchannelVerificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
