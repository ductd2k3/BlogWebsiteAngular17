import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repassword: new FormControl('',[Validators.required])
  }, { validators: this.matchPasswordValidator('password', 'repassword') })

  matchPasswordValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
  
      if (control && matchingControl && control.value !== matchingControl.value) {
        return { 'mismatch': true };
      }
  
      return null;
    };
  }

  constructor(private userService: UserService, private router: Router){}

  submitForm(){
    let user = new UserUtility(this.applyForm.value.username ?? '',
      this.applyForm.value.email ?? '', this.applyForm.value.password ?? '','');
    this.userService.register(user).subscribe(res => {
      if(res.success === 'true'){
        this.router.navigate(['/login']);
      }
      else{
        alert('Error')
      }
    })
  }
}
