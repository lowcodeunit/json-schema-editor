import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicReactiveFormDosComponent } from './dynamic-reactive-form-dos.component';

describe('DynamicReactiveFormDosComponent', () => {
  let component: DynamicReactiveFormDosComponent;
  let fixture: ComponentFixture<DynamicReactiveFormDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicReactiveFormDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicReactiveFormDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
