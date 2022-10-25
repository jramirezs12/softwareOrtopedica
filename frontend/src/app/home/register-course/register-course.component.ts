import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css'],
})
export class RegisterCourseComponent implements OnInit {
  registerDataCourse: any;
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _courseService: CourseService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerDataCourse = {};
    this.message = '';
  }

  ngOnInit(): void {}

  registerCourse(){
    if (
      !this.registerDataCourse.name ||
      !this.registerDataCourse.description
    ) {
      console.log('Failed process incomplete data');
      this.message = 'Failed process incomplete data';
      this.openSnackBarError();
      this.registerDataCourse = {};
    } else {
      this._courseService.registerCourse(this.registerDataCourse).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.jwtToken);
          this._router.navigate(['/saveMatter']);
          this.message = 'Successfull course registration';
          this.openSnackBarSuccessfull();
          this.registerDataCourse = {};
          
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
