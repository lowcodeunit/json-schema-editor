import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDragComponent } from './edit-drag.component';

describe('EditDragComponent', () => {
  let component: EditDragComponent;
  let fixture: ComponentFixture<EditDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
