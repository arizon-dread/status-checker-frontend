import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) {}
  public apiBaseUrl: string = "";
  loadConfig(): Promise<any> {
    const promise = this.http.get("/config/config.json").toPromise()
        .then(data => {
          Object.assign(this, data)
          return data;
        });


    return promise;
  }
  
}
