import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashEmployeeAddComponent } from './add.component';

describe('CashEmployeeAddComponent', () => {
  let component: CashEmployeeAddComponent;
  let fixture: ComponentFixture<CashEmployeeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashEmployeeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashEmployeeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
