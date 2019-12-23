import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Greeting} from './greeting/Greeting';

@Injectable({
  providedIn: 'root'
})
export class GreetingService {

  constructor(private http: HttpClient) {
  }

  configUrl = 'api/hello';

  getGreeting() {
    return this.http.get(this.configUrl);
  }

  getGreetingResponse(): Observable<HttpResponse<Greeting>> {
    return this.http.get<Greeting>(
      this.configUrl, {observe: 'response'});
  }
}
