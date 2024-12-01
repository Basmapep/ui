import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { SignInService } from 'src/services/authentication/sign-in.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule,MatFormFieldModule,MatInputModule, ReactiveFormsModule, ToastrModule],
  providers: [DatePipe],
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  password: any = 'password';
  date: any = new Date()
  constructor(private fb: FormBuilder,
    private route: Router,
    private toast: ToastrService,
    private authentication: SignInService,
    private datePipe: DatePipe
  ) {
    const dates = this.datePipe.transform(this.date, "yyyy-MM-ddThh:mm:ss")

    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['1990-05-15'],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      username: ['', Validators.required],
      phoneNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      passwordHash: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      createdOn: [dates],
      updatedOn: [dates]
    })

  }

  ngOnInit(): void {
  }

  get SignUpFormControl() {
    return this.signupForm.contains
  }
  text = '';
  confirmPassword(x: any) {
    this.text = x.key;
    
  }
  passwordVisible = false;
  confirmPasswordVisible = false;
  
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  
  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }
  
  save() {
    if(this.signupForm.get('passwordHash')?.value != this.signupForm.get('confirmPassword')?.value){
      this.toast.warning('Check password')
    }
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched()
    }
    if (this.signupForm.valid) {
      this.authentication.signUp(this.signupForm.value).subscribe((result) => {
        if (result.status == "success") {
          this.toast.success("Sigup Successfully")
          this.signupForm.reset();
        } else {

        }
      }, (error) => {
        this.toast.error(error.message)
      })

    }
  }


  goToSignIn() {
    this.route.navigate(['login'])
  }
}
