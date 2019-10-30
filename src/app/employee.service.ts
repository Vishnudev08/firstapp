import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8080/Rest_emp/api";

  constructor(private httpService:HttpClient) { }

  getEmployee(id:number):Observable<any>{
    return this.httpService.get(this.baseUrl+'/employeeid/'+id)
  }
  createEmployee(employee:Object):Observable<Object>{
    return this.httpService.post(this.baseUrl+'/insertemployee',employee)
  }
  updateEmployee(id:number, employee:Employee):Observable<any>{
    return this.httpService.put(this.baseUrl+'/updateemployee/'+id,employee)
  }
  deleteEmployee(id:number, employee:Employee): Observable<any>{
    return this.httpService.put(this.baseUrl+'/disableemployee/'+id,employee)
  }
  getEmployeesList():Observable<any>{
    return this.httpService.get(environment.baseUrl+'/employeedetails');
  }
}
