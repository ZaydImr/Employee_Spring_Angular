import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee Manager';

  public  data: Employee[] = [];
  public  employees: Employee[] = [];
  public editEmployee:Employee
  public deleteEmployee: Employee
  public txtSearch:string

  constructor(private employeeService:EmployeeService){}

  ngOnInit(){
    this.getEmployees();
    
    
  }

  public getEmployees():void{
    this.employeeService.getEmployees().subscribe(
      (response:Employee[]) =>{
        this.data = response;
        this.employees = response
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

  public Search():void{    
      this.employees=this.data.filter(emp=>emp.name.toLowerCase().includes(this.txtSearch.toLowerCase()));
  }

  public onAddEmployee(addForm:NgForm):void{
    document.getElementById('btn-close-modal')?.click()
    this.employeeService.addEmployee(addForm.value).subscribe(
      ()=>{this.getEmployees();addForm.reset()},
      (error:HttpErrorResponse)=>{
        alert(error.message)})
  }

  public onUpdateEmployee(employee:Employee):void{
    document.getElementById('btn-close-EditModal')?.click()
    this.employeeService.updateEmployee(employee).subscribe(
      ()=>this.getEmployees(),
      (error:HttpErrorResponse)=>{
        alert(error.message)})
        
  }

  public onDeleteEmployee(employeeId:number):void{
    let doc = document.getElementById('btn-close-Modal')
    console.log(doc);
    doc?.click()
    
    this.employeeService.deleteEmployee(employeeId).subscribe(
      ()=>{this.getEmployees();},
      (error:HttpErrorResponse)=>{
        alert(error.message)})
        
  }

  public OpenModal(mode :string,employee?:Employee):void{
    const container = document.getElementById('home')
    const button = document.createElement('button')
    button.type = 'button'
    button.style.display = 'none'
    button.setAttribute('data-bs-toggle','modal')
    if(mode === 'add')
      button.setAttribute('data-bs-target','#AddEmployeeModal')
    if(mode === 'edit')
      {
        this.editEmployee = employee
        button.setAttribute('data-bs-target','#EditEmployeeModal')
      }
    if(mode === 'delete')
    {
      this.deleteEmployee= employee
      button.setAttribute('data-bs-target','#DeleteEmployeeModal')
    }
    container?.appendChild(button)
    button.click()
    container?.removeChild(button)
  }


  
}
