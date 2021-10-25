import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeRecordComponent } from './add-employee-record.component';

describe('AddEmployeeRecordComponent', () => {
  let component: AddEmployeeRecordComponent;
  let fixture: ComponentFixture<AddEmployeeRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
