import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTypeSelectComponent } from './data-type-select.component';

describe('DataTypeSelectComponent', () => {
  let component: DataTypeSelectComponent;
  let fixture: ComponentFixture<DataTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
