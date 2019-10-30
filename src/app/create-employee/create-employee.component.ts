import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee=new Employee();
  submitted = false;
  constructor(private employeeService:EmployeeService,
              private router:Router) { }
  
  employees:Observable<Employee[]>;

  ngOnInit() {
  }

  newEmplyee():void{
    this.submitted = false;
    this.employee = new Employee();
  }

  save(){
    this.employeeService.createEmployee(this.employee)
      .subscribe(data=>console.log(data),error=>console.log(error));
    this.gotoList();

  }

  onSubmit(){
    this.submitted = true;
    this.save();
  }

  gotoList(){
    this.employees = this.employeeService.getEmployeesList();
    this.router.navigate(['/employees']);
  }
}
