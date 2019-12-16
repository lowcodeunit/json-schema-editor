import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaPropertiesComponent } from './schema-properties.component';

describe('SchemaPropertiesComponent', () => {
  let component: SchemaPropertiesComponent;
  let fixture: ComponentFixture<SchemaPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
