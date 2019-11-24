import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isloggedin : boolean;

  loggedInUser = this.isUserLoggedIn.asObservable();

  constructor(
    private user: UserService,
    private router: Router
  ) { 
    this.user.user().subscribe(
      data => {console.log(data);
       this.isloggedin = true;
      },
      error => this.router.navigate(['/login'])
    )
  }

  showLoggedIn = (value: boolean) => {
    this.isUserLoggedIn.next(value);
}
}
