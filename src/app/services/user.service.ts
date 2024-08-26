import { UrlUtility } from './../utilities/url-utility';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserUtility } from '../utilities/user-utility';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlUtility = new UrlUtility();

  constructor(private http: HttpClient) { }
  
  login(user: UserUtility):Observable<any>{
    return this.http.post(this.urlUtility.url + '/User/Login', user);
  }
  register(user: UserUtility):Observable<any>{
    return this.http.post(this.urlUtility.url + '/User/Register',user);
  }

  isLogged(){
    return localStorage.getItem('token') != null;
  }

  logout(){
    localStorage.removeItem('token');
  }

  haveAccess(){
    let token = localStorage.getItem('token');
    if(token === null){
      return null;
    }
    let extractToken = token.split('.')[1];
    let atobData = atob(extractToken);
    let user = JSON.parse(atobData);
    return user;
  }

  isTokenExpired(): boolean {
    try {
      let token: any = localStorage.getItem('token');
      
      let extractToken = token.split('.')[1];
      let atobData = atob(extractToken);
      let user = JSON.parse(atobData);

      let expirationDate = user.exp * 1000; // exp là thời gian hết hạn tính bằng giây
      let currentTime = Date.now();
      
      return currentTime > expirationDate;
    } catch (error) {
      console.error('Không thể giải mã token:', error);
      return true; // Nếu có lỗi, coi như token đã hết hạn để bảo vệ
    }
  }
}
