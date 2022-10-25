import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterTeacherComponent } from './home/register-teacher/register-teacher.component';
import { RegisterStudentComponent } from './home/register-student/register-student.component';
import { RegisterCourseComponent } from './home/register-course/register-course.component';
import { RegisterMatterComponent } from './home/register-matter/register-matter.component';
import { LoginComponent } from './home/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signUpTeacher',
    component: RegisterTeacherComponent
  },
  {
    path: 'signUpStudent',
    component: RegisterStudentComponent
  },
  {
    path: 'saveCourse',
    component: RegisterCourseComponent
  },
  {
    path: 'saveMatter',
    component: RegisterMatterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
