import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventSourceService} from "../shared/_services/event-source.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription, switchMap} from "rxjs";
import {EventSource} from "../shared/model/everification-form";
import {GlobalService} from "../shared/_services/global.service";

@Component({
  selector: 'app-echannel-verification-form',
  templateUrl: './echannel-verification-form.component.html',
  styleUrls: ['./echannel-verification-form.component.css']
})
export class EchannelVerificationFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formData: EventSource;
  loading = false;
  subs = new Subscription();

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly globalService: GlobalService,
              private readonly eventSourceService: EventSourceService) {
  }

  ngOnInit() {
    this.loading = true;
    this.globalService.hideSideNav();

    this.initializeForm();
    this.subs.add(
      this.route.params.pipe(
        switchMap(param => {
          return this.eventSourceService.getEventSourceById(param['id'])
        })
      ).subscribe((res: any) => {
        console.log({res});
        this.formData = res;
        this.form.patchValue(this.formData);
        this.loading = false;
      }, err => {
        console.error('Error occurred while loading es data');
        this.loading = false;
      }));


  }

  private initializeForm() {
    this.form = this.fb.group({
      businessKey: [{value: '', disabled: true}],
      transactionCurrency: [{value: '', disabled: true}],
      transactionAmount: [{value: '', disabled: true}],
      accountName: [{value: '', disabled: true}],
      debitAccountNumber: [{value: '', disabled: true}],
      accountCurrency: [{value: '', disabled: true}],
      beneficiaryName: [{value: '', disabled: true}],
      accountInfoMkr: [{value: '', disabled: true}],
      custInfoMkr: [{value: '', disabled: true}],
      outcome: ['', Validators.required],
      extension: ['', Validators.required],
      contactPerson: ['', Validators.required],
      customerCalledOn: ['', Validators.required],
      comment: ['', Validators.required],
    });

    this.form.valueChanges.subscribe(v => console.log('Form change: ', v));
  }

  ngOnDestroy(): void {
    this.globalService.showSideNav();
  }

  checkMandatory(key: string) {
    return this.form.controls[key].invalid && this.form.controls[key].touched;
  }

  saveEventSource(status: string) {
    this.loading = true;
    this.eventSourceService
      .updateEventSource({id: this.formData.id, ...this.form.value, status})
      .subscribe(res => {
        this.loading = false;
        this.router.navigateByUrl('/home');
      }, err => {
        this.loading = false;
        console.error('Error occurred when saving form.', err);
      });

    console.log(this.formData);
  }
}
