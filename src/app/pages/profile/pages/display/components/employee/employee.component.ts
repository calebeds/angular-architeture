import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '@app/store/user';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  @Input()
  role: Employee | undefined;

  constructor() {}

  ngOnInit(): void {}
}
