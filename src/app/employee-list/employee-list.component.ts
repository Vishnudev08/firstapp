import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees:Observable<Employee[]>
  constructor( private employeesService: EmployeeService,
                private router : Router) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData(){
    this.employees = this.employeesService.getEmployeesList();
  }

  deleteEmployee(id: number, employee:Employee){
    this.employeesService.deleteEmployee(id,employee)
    .subscribe(data=>{
      console.log(data);
      this.reloadData();
    },error=>console.log(error));
  }

  employeeDetails(id:number){
    console.log(id);
    this.router.navigate(['details', id]);
  }
// updating employee details

  updateEmployee(id:number){
    console.log(id);
    this.router.navigate(['update',id])
  }

}
