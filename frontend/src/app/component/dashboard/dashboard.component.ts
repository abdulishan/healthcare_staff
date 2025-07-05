import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Patients } from '../../interfaces/patients';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  patientsList:Patients[] = [];
  constructor(private authService: AuthService, private router:Router){}

  ngOnInit(): void {
    this.getPatientsList();
  }

  getPatientsList(){
    this.authService.getAllPatientsList().subscribe({
      next: (data:any)=>{
        this.patientsList = data;
        console.log(this.patientsList)
      },
      error: err=> console.log(err)
    })
  }

  getDetails(id:(string| undefined)){
    console.log(id)
    this.router.navigate(['profile/'+id]);
  }
}
