import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css'],
})
export class RegisterStudentComponent implements OnInit {
  registerDataStudent: any;
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _studentService: StudentService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerDataStudent = {};
    this.message = '';
  }

  ngOnInit(): void {}

  registerStudent(){
    if (
      !this.registerDataStudent.name ||
      !this.registerDataStudent.email ||
      !this.registerDataStudent.password
    ) {
      console.log('Failed process incomplete data');
      this.message = 'Failed process incomplete data';
      this.openSnackBarError();
      this.registerDataStudent = {};
    } else {
      this._studentService.registerStudent(this.registerDataStudent).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.jwtToken);
          this._router.navigate(['/saveMatter']);
          this.message = 'Successfull student registration';
          this.openSnackBarSuccessfull();
          this.registerDataStudent = {};
          
        },
        (err) => {
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  openSnackBarSuccessfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition, 
      verticalPosition: this.verticalPosition, 
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'] 
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition, 
      verticalPosition: this.verticalPosition, 
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'] 
    });
  }
}
