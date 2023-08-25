import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SegmentApiService {
  apiUrl = 'http://localhost:3000/segment';

  constructor(private http: HttpClient) {}

  getAlldata(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getSingleData(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  deleteData(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateData(id: any, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}