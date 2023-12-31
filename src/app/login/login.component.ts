import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/_services/auth.service';
import {StorageService} from '../shared/_services/storage.service';
import {Router} from "@angular/router";
import {GlobalService} from "../shared/_services/global.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private readonly authService: AuthService,
              private readonly router: Router,
              private readonly globalService: GlobalService,
              private readonly storageService: StorageService) {
  }

  ngOnInit(): void {
    this.globalService.setShowSignUpFlag(true);
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const {username, password} = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  get loggedInUserName() {
    if (this.storageService.isLoggedIn()) {
      return this.storageService.getUser().username;
    }
    return "";
  }

  reloadPage(): void {
    window.location.reload();
  }
}
