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

  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required),
  })

  constructor(private router: Router,
    private _userService:UserService) { }

  ngOnInit() {
  }

  moveToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    if ((!this.registerForm.valid) || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)) {
      console.log("invalid form");
      return;
    }
    this._userService.register(JSON.stringify(this.registerForm.value))
    .subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error =>{ console.error(error);
      }
    )
    console.log("form", JSON.stringify(this.registerForm.value));
  }

}
