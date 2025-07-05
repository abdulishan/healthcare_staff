import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patients } from '../interfaces/patients';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl:string = 'http://localhost:3000/api/patient/'
  constructor(private http: HttpClient) { }

  getAllPatientsList(){
    return this.http.get(this.baseUrl+"getAllPetients");
  }

  getAllPatientDetailByEmail(){
    const parsedData:any = this.getLoginToken();
    const decoded:any = jwtDecode(parsedData);
    console.log(decoded)
    return this.http.get(this.baseUrl+"patientByEmail/"+decoded?.email);
  }

  loginPatients(loginData:Patients){
    return this.http.post(this.baseUrl+'signin',loginData)
  }

  signupPatients(loginData:Patients){
    return this.http.post(this.baseUrl+'signup',loginData)
  }

  getLoginToken(){
    return localStorage.getItem('authToken');
  }

  setloginToken(token: string){
    localStorage.setItem('authToken',token);
  }

  updateProfile(profileData:any){
    return this.http.put(this.baseUrl+"profileUpdate", profileData);
  }
}
