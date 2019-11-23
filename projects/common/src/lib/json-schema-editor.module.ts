import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@lcu/common';
import { JSONSchemaEditorComponent } from './controls/json-editor/json-schema-editor.component';

@NgModule({
  declarations: [JSONSchemaEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [JSONSchemaEditorComponent],
  entryComponents: [JSONSchemaEditorComponent]
})
export class JsonSchemaEditorModule { }
