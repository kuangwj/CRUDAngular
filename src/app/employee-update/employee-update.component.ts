import { Employee } from '../employee';
import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  id: number;
  employee: Employee;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.employee = new Employee();
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployee(this.id).subscribe(
      data => {
        console.log(data);
        this.employee = data;
      }, error => console.log(error));
  }

  onSubmitUpdateEmployee() {
    console.log("onSubmitUpdateEmployee");
    this.employeeService.updateEmployee(this.employee.id,this.employee).subscribe(
      data => {
        console.log(data);
        this.gotoList();
      }, error => console.log(error));
    /*this.employeeService.updateEmployee(id).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      }, error => console.log(error));*/
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }

}
