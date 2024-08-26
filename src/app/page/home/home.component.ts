
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  category: any;
  applyForm = new FormGroup({
    title: new FormControl(''),
    categoryId: new FormControl('')
  });

  constructor(private blogService: BlogService, private categoryService: CategoryService){}

  data = new Array();
  start: number = 0;
  end: number = 2;
  ngOnInit(): void {  
    this.loadPage();
    this.loadCategory();
  }


  loadPage(){
    this.blogService.paging(this.start, this.end).subscribe(res => {
      if(res.data.length != 0){
        this.data = [...this.data, ...res.data];
        this.start = this.end;
        this.end += 2;
      }
    })
  }
  loadCategory(){
    this.categoryService.getAll().subscribe(res => {
      this.category = res.data;
      console.log(this.category)
    })
  }
  
  search(){
    
  }

}
