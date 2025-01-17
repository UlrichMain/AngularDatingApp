import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";
import { TestErrorsComponent } from "./errors/test-errors/test-errors.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  http = inject(HttpClient);
  accountService = inject(AccountService)

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser ()
  {
    const userString: string | null = localStorage.getItem('user');

    if (userString){
      const user = JSON.parse(userString)
      this.accountService.currentUser.set(user)
    }
  }



}
