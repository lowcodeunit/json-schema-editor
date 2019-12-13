import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaKeywordsComponent } from './schema-keywords.component';

describe('SchemaKeywordsComponent', () => {
  let component: SchemaKeywordsComponent;
  let fixture: ComponentFixture<SchemaKeywordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaKeywordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
