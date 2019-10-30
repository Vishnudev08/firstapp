import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators, FormControl } from '@angular/forms';
import { Loginuser } from '../loginuser';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  loginuser:Loginuser;

  constructor( private authService: AuthService,
               private router: Router,
               private formBuilder:FormBuilder) {}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose( 
                    [Validators.required, Validators.email])],
      password:['',[Validators.required,
                    Validators.pattern('^[a-zA-Z]+$')]]
    });
  }

  get formControls(){

    return this.loginForm.controls;
  }

  login(){

    this.isSubmitted=true;
    console.log(this.loginForm.valid);

    if(this.loginForm.valid){

      this.authService.login(this.loginForm.value).subscribe(
        data =>{
          this.loginuser = data;
          console.log(data);
          console.log(data.email);

          //Role based authentication
          if(data.email !=null){

            this.isSubmitted= true;
            this.router.navigateByUrl('/admin');
          }
          else{
            window.alert('Wromg user name and password');
          }
        },
        (error) => {
          console.log(error);
          window.alert("Wrong username or password");
        }
        );
      // alert('User form is valid!!!'
     // this.router.navigateByUrl('/admin');
    }

    else{
      alert('User Form is not valid!!!!');
      return;
    }
  }
}
