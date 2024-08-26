import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'ckeditor5/ckeditor5.css';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [],
  templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent implements OnInit{
  private blogId: any;
  content = '';
  title = '';
  author = '';
  time = '';
  constructor(private route: ActivatedRoute, private blogService: BlogService){}
  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('blogId');
    this.load(+this.blogId)
  }
  
  load(id:number){
    this.blogService.getById(id).subscribe(res => {      
      this.content =JSON.stringify(res.data.content).replace(/\\"/g, '"').slice(1, -1);
      this.title = JSON.stringify(res.data.title).slice(1, -1)
      this.time = this.formatTime(JSON.stringify(res.data.createAt).slice(1, -1));
    })
  }

  private formatTime(dateString:string):string{
    let date = new Date(dateString);

    let formattedDate = date.toLocaleString(
      'vi-VN', 
      { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: false 
      });
    return formattedDate;
  }

}
