import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/_services/auth.service';
import {Router} from "@angular/router";
import {GlobalService} from "../shared/_services/global.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: any = {
    username: null,
    bu: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private readonly authService: AuthService,
              private readonly globalService: GlobalService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.globalService.setShowSignUpFlag(false);
  }

  onSubmit(): void {
    const {username, bu, password} = this.form;

    this.authService.register(username, bu, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        setTimeout(() => this.router.navigate(['login']), 2000)
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.globalService.setShowSignUpFlag(true);
  }
}
