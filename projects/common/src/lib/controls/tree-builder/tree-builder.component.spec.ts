import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeBuilderComponent } from './tree-builder.component';

describe('TreeBuilderComponent', () => {
  let component: TreeBuilderComponent;
  let fixture: ComponentFixture<TreeBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
