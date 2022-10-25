import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css'],
})
export class RegisterTeacherComponent implements OnInit {
  registerDataTeacher: any;
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _teacherService: TeacherService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerDataTeacher = {};
    this.message = '';
  }

  ngOnInit(): void {}

  registerTeacher(){
    if (
      !this.registerDataTeacher.name ||
      !this.registerDataTeacher.email ||
      !this.registerDataTeacher.password
    ) {
      console.log('Failed process incomplete data');
      this.message = 'Failed process incomplete data';
      this.openSnackBarError();
      this.registerDataTeacher = {};
    } else {
      this._teacherService.registerTeacher(this.registerDataTeacher).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.jwtToken);
          this._router.navigate(['/saveMatter']);
          this.message = 'Successfull teacher registration';
          this.openSnackBarSuccessfull();
          this.registerDataTeacher = {};
          
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
