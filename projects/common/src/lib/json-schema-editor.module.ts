import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@lcu/common';
import { JSONSchemaEditorComponent } from './controls/json-editor/json-schema-editor.component';
import { JSONSchemaEditorChangeComponent } from './controls/json-schema-editor-change/json-schema-editor-change.component';

@NgModule({
  declarations: [JSONSchemaEditorComponent, JSONSchemaEditorChangeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [JSONSchemaEditorComponent, JSONSchemaEditorChangeComponent],
  entryComponents: [JSONSchemaEditorComponent, JSONSchemaEditorChangeComponent]
})
export class JsonSchemaEditorModule { }
