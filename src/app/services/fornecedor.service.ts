import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fornecedor } from '../interfaces/fornecedor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private apiUrl = 'http://localhost:3000/fornecedores'
  constructor(private http: HttpClient) {
  }

  list(): Observable<Fornecedor[]>{
    return this.http.get<Fornecedor[]>(this.apiUrl) as Observable<Fornecedor[]>;
  }

  getById(id: string): Observable<Fornecedor> {
    console.log(`${this.apiUrl}/${id}`);
    return this.http.get<Fornecedor>(`${this.apiUrl}/${id}`) as Observable<Fornecedor>;
  }

  remove(id:string) {
    console.log(`${this.apiUrl}/${id}`)
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  add(fornecedor: Fornecedor) {
    const httpHeaders =
    {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return this.http.post(this.apiUrl, fornecedor, httpHeaders);
  }

  update(fornecedor: Fornecedor) {
    const httpHeaders =
    {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log(fornecedor)
    console.log(`${this.apiUrl}/${fornecedor.id}`)
    return this.http.put(`${this.apiUrl}/${fornecedor.id}`, fornecedor, httpHeaders);
  }
}
