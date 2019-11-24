import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
  })

  constructor(private router: Router,
    private _userService: UserService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.showLoggedIn(false);
  }

  moverToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    if ((!this.loginForm.valid)) {
      console.log("invalid form");
      return;
    }
    this._userService.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data => {console.log(data),this.loginService.showLoggedIn(true);this.router.navigate(['/user']);},
      error => console.error(error)
    )
    console.log("form", JSON.stringify(this.loginForm.value));
  }

}
