import { Component, inject, Input, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    this.getUsers()
  }

  registerMode = false;
  http= inject(HttpClient)
  users: any;
  
  
  cancelRegisterMode(event: boolean)
  {
    this.registerMode = event;
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUsers()
  {
    this.http.get('http://localhost:5001/api/users').subscribe({
      next: response => {this.users = response},
      error: error => {console.log(error)},
      complete: () => {}
    });
  }

}
