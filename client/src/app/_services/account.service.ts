import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient)
  baseUrl = "http://localhost:5001/api/";
  currentUser = signal<any>(null);

  login(model : any)
  {
    return this.http.post<User>(this.baseUrl + 'Accounts/login', model).pipe(
      map(user => {
        if (user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  
  register(model : any)
  {
    return this.http.post<User>(this.baseUrl + 'Accounts/register', model).pipe(
      map(user => {
        if (user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    );
  }



  logout()
  {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
