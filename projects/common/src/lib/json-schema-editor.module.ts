import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@lcu/common';
import { JsonEditorComponent } from './controls/json-editor/json-editor.component';
import { TreeBuilderComponent } from './controls/tree-builder/tree-builder.component';
import { JsonEditorFlattenComponent } from './controls/json-editor-flatten/json-editor-flatten.component';
import { AccordionComponent } from './controls/accordion/accordion.component';

@NgModule({
  declarations: [JsonEditorComponent, TreeBuilderComponent, JsonEditorFlattenComponent, AccordionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [JsonEditorComponent, TreeBuilderComponent, JsonEditorFlattenComponent, AccordionComponent],
  entryComponents: [JsonEditorComponent, TreeBuilderComponent, JsonEditorFlattenComponent, AccordionComponent]
})
export class JsonSchemaEditorModule { }
