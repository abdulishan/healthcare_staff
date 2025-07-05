import { AfterViewInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, NgIf],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements AfterViewInit {
  profileForm!: FormGroup;
  profileData: any = {};
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.getProfileData()
    this.profileForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      empType: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  getProfileData() {
    this.authService.getAllPatientDetailByEmail().subscribe({
      next: (res: any) => {
        this.profileData = res;
        this.profileForm.patchValue({
          fullName: this.profileData?.fullName,
          empType: this.profileData?.empType,
          mobileNo: this.profileData?.mobileNo,
          email: this.profileData?.email,
        })
      },
      error: err => console.log(err)
    })
  }

  ngAfterViewInit(): void {
    this.profileForm.get('empType')?.disable();
    this.profileForm.get('email')?.disable();
  }

  get nameValidate() {
    return this.profileForm.get('fullName');
  }

  get empValidate() {
    return this.profileForm.get('empType');
  }

  get emailValidate() {
    return this.profileForm.get('email');
  }
  
  get mobileValidate(){
    return this.profileForm.get('mobileNo');
  }

  updateProfile() {
    if (this.profileForm.invalid) {
      return;
    }
    console.log(this.profileForm.value);
    this.authService.updateProfile(this.profileForm.getRawValue()).subscribe({
      next: (res)=> {
        console.log(res)
        alert('Profile updated successfully.')
      },
      error: err=> console.log(err)
    })
  }
}
