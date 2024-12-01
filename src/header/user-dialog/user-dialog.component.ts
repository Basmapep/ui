import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/dashboard/file-submission/dialog-confirm/dialog-confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  constructor(private modalRef: MatDialogRef<DialogConfirmComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.modalRef.close();
  }

  login() {
    this.modalRef.close();
    this.router.navigate(['login']);
  }
}
