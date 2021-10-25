import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeeRecordComponent } from './view-employee-record.component';

describe('ViewEmployeeRecordComponent', () => {
  let component: ViewEmployeeRecordComponent;
  let fixture: ComponentFixture<ViewEmployeeRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmployeeRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmployeeRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
