import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskesComponent } from './taskes.component';

describe('TaskesComponent', () => {
  let component: TaskesComponent;
  let fixture: ComponentFixture<TaskesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskesComponent]
    });
    fixture = TestBed.createComponent(TaskesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
