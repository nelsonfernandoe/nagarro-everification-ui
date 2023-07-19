import {Component} from '@angular/core';
import {AuthService} from "./shared/_services/auth.service";
import {StorageService} from "./shared/_services/storage.service";
import {GlobalService} from "./shared/_services/global.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  username?: string;

  constructor(private readonly storageService: StorageService,
              readonly globalService: GlobalService,
              private readonly router: Router,
              private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
    }
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: res => {
          console.log(res);
          this.storageService.clean();
          // this.router.navigate(['login']);
        },
        error: err => {
          console.log(err);
        }
      });

  }

}
