import { Component, OnInit } from '@angular/core';
import { MatterService } from '../../services/matter.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-matter',
  templateUrl: './register-matter.component.html',
  styleUrls: ['./register-matter.component.css'],
})
export class RegisterMatterComponent implements OnInit {
  registerDataMatter: any;
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  

  constructor(
    private _matterService: MatterService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerDataMatter = {};
    this.message = '';
  }

  ngOnInit(): void {}

  registerMatter(){
    if (
      !this.registerDataMatter.name ||
      !this.registerDataMatter.description
    ) {
      console.log('Failed process incomplete data');
      this.message = 'Failed process incomplete data';
      this.openSnackBarError();
      this.registerDataMatter = {};
    } else {
      this._matterService.registerMatter(this.registerDataMatter).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.jwtToken);
          this._router.navigate(['/saveCourse']);
          this.message = 'Successfull matter registration';
          this.openSnackBarSuccessfull();
          this.registerDataMatter = {};
          
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
