import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  selectmenu: any = 'home'
  userId: number = 1;
  userName: string = '';
  activeRoute: string = '/home';
  imageSrc: string = '../../assets/icons/icons8-log-out-50.png';

  constructor(private route: Router, public dialog: MatDialog) {
    this.userName = localStorage.getItem('UserName') || '';
  }

  onMouseOver() {
    this.imageSrc = '../../assets/icons/log-white.png';
  }

  onMouseOut() {
    this.imageSrc = '../../assets/icons/icons8-log-out-50.png';
  }

  ngOnInit(): void {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = this.route.url;
      }
    });
  }


  gotomenu(menu: any) {
    this.selectmenu = menu;
  }
  showNav: boolean = false

  openNav() {
    this.showNav = true;

  }

  isActive(router: string): boolean {
    return this.activeRoute == router;
  }
  openMenu(value: string) {

    if (value == 'submission') {
      if (localStorage.getItem('userId')) {
        this.route.navigate(['submission']);
        this.showNav = false
      } else {
        const dialogRef = this.dialog.open(UserDialogComponent, {
          panelClass: 'modal-xs'
        });

        dialogRef.afterClosed().subscribe((result: undefined) => {
          if (result !== undefined) {
          }
        });
      }
    }

    else if (value == 'signIn') {
      this.route.navigate(['login'])
      this.showNav = false
    }
    else if (value == 'signUp') {
      this.route.navigate(['Sign-up'])
      this.showNav = false
    }
    else if (value == 'logout') {
      this.route.navigate(['login'])
      localStorage.removeItem('userId')
      localStorage.removeItem('UserName')
      this.showNav = false
    }
  }
}
