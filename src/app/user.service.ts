import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiURL = environment.siteURL;

  constructor(
    private _http: HttpClient
  ) { }

  register(body:any){return this._http.post( this.apiURL + 'users/register',body,{
    observe:'body',
    headers: new HttpHeaders().append('Content-type','application/json')
  })}

  login(body:any){return this._http.post( this.apiURL +'users/login',body,{
    observe:'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-type','application/json')
  })}

  user(){return this._http.get( this.apiURL + 'users/user',{
    observe:'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-type','application/json')
  })}

  books(){return this._http.get(this.apiURL +'users/get-data',{
    observe:'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-type','application/json')
  })}

  logout(){return this._http.get(this.apiURL +'users/logout',{
    observe:'body',
    withCredentials: true,
    headers: new HttpHeaders().append('Content-type','application/json')
  })}
}
