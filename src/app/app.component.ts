import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  public loggedInUser = false;

  public loggedIn = false;
  constructor(
    private user: UserService,
    private router: Router,
    private loginService: LoginService
  ) {

    // this.user.user().subscribe(
    //   data => {console.log(data);
    //     this.loginService.showLoggedIn(true);
    //   },
    //   error => {this.router.navigate(['/login']); this.loginService.showLoggedIn(false);}
    // )
   }

   ngOnInit() {
    this.loginService.loggedInUser.subscribe((isUserLoggedIn) => {
      this.loggedInUser = isUserLoggedIn;
    });
  }

  

  logout(){
    this.user.logout().subscribe(
      data =>{console.log(data), this.loginService.showLoggedIn(false); this.router.navigate(['/login']);
      },
      error =>console.error(error)
      
    )
    window.location.reload();
  }
}
