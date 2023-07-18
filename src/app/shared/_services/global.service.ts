import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  showSideNavFlag = true;

  constructor() {
  }

  showSideNav() {
    this.setShowSideNavFlag(true);
  }

  hideSideNav() {
    this.setShowSideNavFlag(false);
  }

  toggleSideNav() {
    this.setShowSideNavFlag(!this.showSideNavFlag);
  }

  isSideNavVisible() {
    return this.showSideNavFlag;
  }

  private setShowSideNavFlag(param: boolean) {
    setTimeout(() => this.showSideNavFlag = param);
  }
}
