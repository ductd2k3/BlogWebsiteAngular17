import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserUtility } from '../../utilities/user-utility';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  applyForm = new FormGroup({
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',[Validators.required])
  })
  constructor(private userService: UserService, private route: Router){}

  login(){
    let user = new UserUtility('',this.applyForm.value.email ?? '',this.applyForm.value.password ?? '','');
    this.userService.login(user).subscribe(res =>{
      if(res.success === 'true'){
        localStorage.setItem('token',res.data);
        this.route.navigate(['/home']);
      }
      else{
        alert('Error')
      }
    })
  }
}
