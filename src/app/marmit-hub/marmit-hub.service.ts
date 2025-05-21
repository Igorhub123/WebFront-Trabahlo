import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarmitHub } from './marmit-hub.model';

@Injectable({
  providedIn: 'root'
})
export class MarmitHubService {

  atualizar(marmithub: MarmitHub) {
    throw new Error('Method not implemented.');
  }
  getAll() {
    throw new Error('Method not implemented.');
  }

  private apiURL = 'http://localhost:3000/marmit-hub';

  constructor(private http: HttpClient) { }

  listarMarmitHub(): Observable<MarmitHub[]> {
    return this.http.get<MarmitHub[]>(this.apiURL);
  }

  cadastrarMarmitHub(marmit: MarmitHub): Observable<MarmitHub> {
    return this.http.post<MarmitHub>(this.apiURL, marmit);
  }

  buscarMarmitHub(id: number): Observable<MarmitHub> {
    return this.http.get<MarmitHub>(`${this.apiURL}/${id}`);
  }

  buscarMarmitHubPorDescricao(descricao: string): Observable<MarmitHub[]> {
    return this.http.get<MarmitHub[]>(`${this.apiURL}?descricao=${descricao}`);
  }

  atualizarMarmitHub(id: number, marmit: MarmitHub): Observable<MarmitHub> {
    return this.http.patch<MarmitHub>(`${this.apiURL}/${id}`, marmit);
  }

  deletarMarmitHub(id: number): Observable<MarmitHub> {
    return this.http.delete<MarmitHub>(`${this.apiURL}/${id}`);
  }
}
