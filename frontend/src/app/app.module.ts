import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { LoginComponent } from './home/login/login.component';
import { FooterComponent } from './home/footer/footer.component';
import { RegisterStudentComponent } from './home/register-student/register-student.component';
import { RegisterTeacherComponent } from './home/register-teacher/register-teacher.component';
import { RegisterCourseComponent } from './home/register-course/register-course.component';
import { RegisterMatterComponent } from './home/register-matter/register-matter.component';

import { TeacherService } from './services/teacher.service';
import { StudentService } from './services/student.service';
import { MatterService } from './services/matter.service';
import { CourseService } from './services/course.service';
import { RoleService } from './services/role.service';
import { BoardService } from './services/board.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './guard/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterStudentComponent,
    FooterComponent,
    RegisterTeacherComponent,
    RegisterCourseComponent,
    RegisterMatterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [
    TeacherService,
    StudentService,
    CourseService,
    MatterService,
    RoleService,
    TokenInterceptorService,
    BoardService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
