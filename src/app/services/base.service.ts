import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private http: HttpClient
  ) { }

  fetchUserList() {
    const url = 'https://mocki.io/v1/887650b7-c8af-457b-92a1-548f1f648168';
    return this.http.get(url);
  }
}
