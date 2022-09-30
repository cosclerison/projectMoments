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
  private apiUrl = `${this.baseApiUrl}/api/moments`

  constructor(
    private http: HttpClient
  ) { }

  getMoments(): Observable<Response<Moments[]>> {
    return this.http.get<Response<Moments[]>>(this.apiUrl);
  }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }
 }
