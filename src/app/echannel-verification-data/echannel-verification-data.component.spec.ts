import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchannelVerificationDataComponent } from './echannel-verification-data.component';

describe('EchannelVerificationDataComponent', () => {
  let component: EchannelVerificationDataComponent;
  let fixture: ComponentFixture<EchannelVerificationDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EchannelVerificationDataComponent]
    });
    fixture = TestBed.createComponent(EchannelVerificationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
