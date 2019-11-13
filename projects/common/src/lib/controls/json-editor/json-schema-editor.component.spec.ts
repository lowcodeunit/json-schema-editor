import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JSONSchemaEditorComponent } from './json-schema-editor.component';


describe('JSONSchemaEditorComponent', () => {
  let component: JSONSchemaEditorComponent;
  let fixture: ComponentFixture<JSONSchemaEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JSONSchemaEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JSONSchemaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
