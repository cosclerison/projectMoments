import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response } from '../Response';
import { Moments } from '../Moments';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl
  // direcionando com a rota do serviço deste service que é o moment
  private apiUrl = `${this.baseApiUrl}api/moments`

  constructor(
    private http: HttpClient
  ) { }

  getMoments(): Observable<Response<Moments[]>> {
    return this.http.get<Response<Moments[]>>(this.apiUrl);
  }  
  
  getMoment(id: number): Observable<Response<Moments>> {
    //  Primeiro método para acessar a url do id
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Moments>>(url);

    //  Segundo método para acessar a url do id
    // return this.http.get<Response<Moments>>(`${this.apiUrl}/${id}`);
  }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  removeMoment(id: number) {
    //  método para deletar
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  updateMoment(id: number, formData: FormData): Observable<FormData> {
    const url = `${this.apiUrl}/${id}`;
    // método put para atualizar somente o que for alterado
    return this.http.put<FormData>(url, formData);
  }
 }
