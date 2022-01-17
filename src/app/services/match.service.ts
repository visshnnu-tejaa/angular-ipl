import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  constructor(private http: HttpClient) {}

  getServices() {
    return this.http.get('http://localhost:8000/api/matches');
  }

  getServiceById(id: any) {
    let url = `http://localhost:8000/api/matches/${id}`;
    return this.http.get(url);
  }
}
