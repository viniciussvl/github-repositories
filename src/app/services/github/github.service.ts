import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private httpClient: HttpClient) { }

  getRepositories(pagination: any): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/repos', {
      params: pagination
    });
  }

  getTotalRepositories(): Observable<any> {
    return this.httpClient.get(environment.apiUrl);
  }
}
