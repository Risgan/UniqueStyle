import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UniqueStyleService {

  private apiUrl = 'https://uniquestyle-production.up.railway.app/api/'

  constructor(private http: HttpClient) { }

  login(user: string, password: string){
    return fetch(`${this.apiUrl}${'auth'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user, password: password })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
      if(data.accessToken){
        localStorage.setItem('token', data.accessToken);
        return true;
      }
      return false;
    });
  }

  getProducts(){
    return this.http.get<Product[]>(`${this.apiUrl}${'products'}`);    
  }
}
