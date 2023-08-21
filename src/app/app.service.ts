import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}

  sendOrder = (payload: any) => {
    return this.http.post('https://testologia.site/burgers-order', payload)
  }

  getData = () => {
    return this.http.get('https://testologia.site/burgers-data')
  }
}
