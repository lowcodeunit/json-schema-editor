import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@lcu/common';
import { JsonEditorComponent } from './controls/json-editor/json-editor.component';
import { TreeLoadmoreExampleComponent } from './controls/tree-loadmore-example/tree-loadmore-example.component';
import { DynamicReactiveFormComponent } from './controls/dynamic-reactive-form/dynamic-reactive-form.component';
import { DynamicReactiveFormDosComponent } from './controls/dynamic-reactive-form-dos/dynamic-reactive-form-dos.component';

@NgModule({
  declarations: [JsonEditorComponent, TreeLoadmoreExampleComponent, DynamicReactiveFormComponent, DynamicReactiveFormDosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [JsonEditorComponent, TreeLoadmoreExampleComponent, DynamicReactiveFormComponent, DynamicReactiveFormDosComponent],
  entryComponents: [JsonEditorComponent, TreeLoadmoreExampleComponent, DynamicReactiveFormComponent, DynamicReactiveFormDosComponent]
})
export class JsonSchemaEditorModule { }
