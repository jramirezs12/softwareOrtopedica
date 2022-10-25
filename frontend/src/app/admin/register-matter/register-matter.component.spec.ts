import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMatterComponent } from './register-matter.component';

describe('RegisterMatterComponent', () => {
  let component: RegisterMatterComponent;
  let fixture: ComponentFixture<RegisterMatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterMatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
