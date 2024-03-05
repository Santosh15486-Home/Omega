import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apis } from './apis';

@Injectable({
  providedIn: 'root',
})
export class SmartService {


    apis = new Apis();
    constructor(private http: HttpClient, private router: Router){
     
    }

    public login(data: Request){
        return this.http.post<any>(data.url, data.body, this.getHeader());
    }
    
    public post(data: Request){
        return this.http.post<any>(data.url, data.body, this.getHeader());
    }

  public get(data: Request){
        return this.http.get<any>(data.url, this.getHeader());
  }

  public delete(data: Request){
        return this.http.delete(data.url, this.getHeader());
  }

  public put(data: Request){
        return this.http.put(data.url, data.body, this.getHeader());
  }

  getHeader(){
      var header = {};
      var authKey = sessionStorage.getItem("AUTH_KEY");
      if(!authKey){
          header =  {
              headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' }),
              observe: 'response',
          }; 
      } else {
          header =  {
              headers: new HttpHeaders({Authorization: authKey, 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' }),
              observe: 'response',
          };
      } 
      return header;
  }
}

export class Request{
    constructor(_url: string, _data?: any){
        this.url = _url;
        this.body = _data;
    }
    url: string;
    body?: any;
}
