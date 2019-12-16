import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaPropertyControlComponent } from './schema-property-control.component';

describe('SchemaPropertyControlComponent', () => {
  let component: SchemaPropertyControlComponent;
  let fixture: ComponentFixture<SchemaPropertyControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaPropertyControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaPropertyControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
