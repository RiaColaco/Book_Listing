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

  submitted = false;
  public loginerr = null;
  public loginloader = false;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
  })

  constructor(private router: Router,
    private _userService: UserService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.loginerr = null;
    this.loginloader = false;
    this.loginService.showLoggedIn(false);
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  moverToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    this.loginloader = true;
    this.loginerr = null;
    this.submitted = true;
    if ((!this.loginForm.valid)) {
      this.loginloader = false;
      return;
    }
    this._userService.login(JSON.stringify(this.loginForm.value))
      .subscribe(
        data => { this.loginloader = false;this.loginService.showLoggedIn(true); this.router.navigate(['/user']); },
        error => { this.loginloader = false;this.loginerr = error.error.message; console.error("err", error) }
      )
  }

}
