import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogUtility } from '../utilities/blog-utility';
import { UrlUtility } from '../utilities/url-utility';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private urlUtility = new UrlUtility();
  
  constructor(private http: HttpClient) { }

  getById(id:number):Observable<any>{
    return this.http.get(this.urlUtility.url + '/Blog/Get?id='+id);
  }

  paging(start:number, end: number):Observable<any>{
    return this.http.get(this.urlUtility.url + '/Blog/numberOfBlogs?start='+start+'&end='+end);
  }

  create(blog:BlogUtility):Observable<any>{
    return this.http.post(this.urlUtility.url + '/Blog/Create',blog);
  }
}
