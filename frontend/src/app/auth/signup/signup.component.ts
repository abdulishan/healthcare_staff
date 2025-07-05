import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
    signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    console.log("Signup component is loaded")
  }

  ngOnInit(): void {
      this.signupForm = this.fb.group({
        fullName: new FormControl('', [Validators.required]),
        empType: new FormControl('', [Validators.required]),
        mobileNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
        email: new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
        confirmPassword: new FormControl('',[Validators.required]),
      },
      {
        validators: [this.passwordMatchValidator]
      });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null{
      const password = control.get('password');
      const cnfPassword = control.get('confirmPassword');
      return password?.value === cnfPassword?.value ? null : { mismatchPassword: true};
  }

  get nameValidate(){
    return this.signupForm.get('fullName');
  }

  get empValidate(){
    return this.signupForm.get('empType');
  }

  get emailValidate(){
    return this.signupForm.get('email');
  }

  get mobileValidate(){
    return this.signupForm.get('mobileNo');
  }

  get passwordValidate(){
    return this.signupForm.get('password');
  }

  get cnfPassword(){
    return this.signupForm.get('confirmPassword');
  }

  submitLogin(){
    if(this.signupForm.invalid){
      return;
    }
    console.log(this.signupForm.value);
    this.authService.signupPatients(this.signupForm.value).subscribe({
      next: (res:any)=>{
        this.router.navigate(['auth/login']);
      },
      error: err=> console.log(err)
    })
  }
}
