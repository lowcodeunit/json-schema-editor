import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JSONSchemaEditorChangeComponent } from './json-schema-editor-change.component';

describe('JSONSchemaEditorChangeComponent', () => {
  let component: JSONSchemaEditorChangeComponent;
  let fixture: ComponentFixture<JSONSchemaEditorChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JSONSchemaEditorChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JSONSchemaEditorChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
