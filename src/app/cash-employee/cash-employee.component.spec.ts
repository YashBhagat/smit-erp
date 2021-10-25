import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashEmployeeComponent } from './cash-employee.component';

describe('CashEmployeeComponent', () => {
  let component: CashEmployeeComponent;
  let fixture: ComponentFixture<CashEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
