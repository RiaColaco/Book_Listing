import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  public regerr = null;
  public regloader = false;

  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required),
  })

  constructor(private router: Router,
    private _userService: UserService) { }

  ngOnInit() {
    this.regerr = null;
    this.regloader = false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  moveToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    this.regloader = true;
    this.regerr = null;
    this.submitted = true;
    if ((!this.registerForm.valid) || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)) {
      this.regloader = false;
      return;
    }
    this._userService.register(JSON.stringify(this.registerForm.value))
      .subscribe(
        data => {
          this.regloader = false;
          this.router.navigate(['/login']);
        },
        error => {
          this.regloader = false;
          console.error(error);
        }
      )
  }

}
