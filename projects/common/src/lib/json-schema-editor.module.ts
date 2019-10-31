import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@lcu/common';
import { JsonEditorComponent } from './controls/json-editor/json-editor.component';

@NgModule({
  declarations: [JsonEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [JsonEditorComponent],
  entryComponents: [JsonEditorComponent]
})
export class JsonSchemaEditorModule { }
