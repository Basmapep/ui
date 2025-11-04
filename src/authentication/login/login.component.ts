import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, PlatformLocation } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SignInService } from 'src/services/authentication/sign-in.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, ReactiveFormsModule, ToastrModule],
  providers: [DatePipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signIn!: FormGroup;
  constructor(private router: Router,
    private toast: ToastrService,
    private authentication: SignInService,
    private fb: FormBuilder,
    private platformLocation: PlatformLocation
  ) {
    this.signIn = this.fb.group({
      userName: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
    // Prevent back navigation
    if (localStorage.getItem('userId')) {
      history.pushState(null, '', window.location.href);
      this.platformLocation.onPopState(() => {
        history.pushState(null, '', window.location.href);
      });
    } else {
    }
  }



  save() {
    if (this.signIn.invalid) {
      this.signIn.markAllAsTouched()
    }
    if (this.signIn.valid) {
      this.authentication.signIn(this.signIn.value).subscribe((result) => {
        if (result.status == "success") {
          this.toast.success("SigIn Successfully")
          this.signIn.reset();
          localStorage.setItem('userId', result.userId)
          localStorage.setItem('UserName', result.firstName + ' ' + result.lastName)
          localStorage.setItem('phone', result.phone)
          this.router.navigate(['/home']).then(() => {
            window.history.replaceState({}, '', '/home');
          });
        } else {
          this.toast.error("Check UserName and Pasword")
        }
      }, (error) => {
        this.toast.error(error.message)
      })

    }
  }


  goToSignUp() {
    this.router.navigate(['/Sign-up'])
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/login']);
  }

}
