import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserUtility } from '../../utilities/user-utility';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  applyForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })
  constructor(private userService: UserService, private router: Router){}

  submitForm(){
    let user = new UserUtility(this.applyForm.value.username ?? '',
      this.applyForm.value.email ?? '', this.applyForm.value.password ?? '','');
    this.userService.register(user).subscribe(res => {
      if(res.success === 'true'){
        this.router.navigate(['/login']);
      }
    })
  }
}
