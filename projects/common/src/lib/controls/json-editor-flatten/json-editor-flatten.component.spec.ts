import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonEditorFlattenComponent } from './json-editor-flatten.component';

describe('JsonEditorFlattenComponent', () => {
  let component: JsonEditorFlattenComponent;
  let fixture: ComponentFixture<JsonEditorFlattenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonEditorFlattenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonEditorFlattenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
