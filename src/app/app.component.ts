import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'database';

  hideNavAndFooter = false;
  hideFooter = false;
  hideFooter1 = false;
  hideFooter2 = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.hideNavAndFooter = currentRoute === '/login' || currentRoute === '/Sign-up';
      this.hideFooter1 = currentRoute === '/components/select-Sequence';
      this.hideFooter2 = currentRoute === '/team';
      this.hideFooter = currentRoute === '/submission';

    });
  }

}
