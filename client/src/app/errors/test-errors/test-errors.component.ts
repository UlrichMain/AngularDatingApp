import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {

  baseUrl = "http://localhost:5001/api/"
  private http = inject(HttpClient);


  validationErrors: string[] = []


  get400Error()
  {
    this.http.get(`${this.baseUrl}buggy/bad-request`)
    .subscribe({
      next: r => console.log(r),
      error: e => console.log(e)
    });
  }

  
  get401Error()
  {
    this.http.get(`${this.baseUrl}buggy/auth`)
    .subscribe({
      next: r => console.log(r),
      error: e => console.log(e)
    })
  }
  
  get404Error()
  {
    this.http.get(`${this.baseUrl}buggy/not-found`)
    .subscribe({
      next: r => console.log(r),
      error: e => console.log(e)
    })
  }

  
  get500Error()
  {
    this.http.get(`${this.baseUrl}buggy/server-error`)
    .subscribe({
      next: r => console.log(r),
      error: e => console.log(e)
    })
  }

  
  get400ValidationError()
  {
    this.http.post(`${this.baseUrl}accounts/register`, {})
    .subscribe({
      next: r => console.log(r),
      error: e => {
        console.log(e)
        this.validationErrors = e;
      }
    })
  }

}
