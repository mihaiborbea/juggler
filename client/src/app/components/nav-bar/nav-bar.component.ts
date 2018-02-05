import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
  }

  public onLogoutClick(): void {
    this.authService.logout();
    this.flashMessagesService.show('Successfully logged out!', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/login']);
  }
}
