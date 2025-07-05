import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, private router: Router, private http: HttpClient){
    console.log("Login component is loaded")
  }

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
      });
  }

  get emailValidate(){
    return this.loginForm.get('email');
  }

  get passwordValidate(){
    return this.loginForm.get('password');
  }

  submitLogin(){
    if(this.loginForm.invalid){
      return;
    }
    console.log(this.loginForm.value);
    this.authService.loginPatients(this.loginForm.value).subscribe({
      next: (res:any)=>{
        this.authService.setloginToken(res?.authToken);
      },
      error: (err)=> {
        console.log(err)
      }
    })
    this.router.navigate(['/dashboard']);
  }
}
