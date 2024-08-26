import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlUtility } from '../utilities/url-utility';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private urlUtility = new UrlUtility();
  
  constructor(private http: HttpClient) { }

  public getAll():Observable<any>{
    return this.http.get(this.urlUtility.url+'/Category/GetAll');
  }
}
