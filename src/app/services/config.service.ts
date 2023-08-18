import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../models/config';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) {}
  public config: Config = {apiBaseUrl: ""};
  loadConfig(): Promise<any> {
    //const promise = 
    console.log("loading config..");
    return this.http.get("/config/config.json").toPromise()
        .then(data => {
          this.config = data as Config;
          console.log(this.config);
          //Object.assign(this, data)
          
          return Promise.resolve(data);
        });


    //return promise;
  }
  
}
