import { JSONSchemaEditorComponent } from './json-schema-editor/json-schema-editor.component';
import { NgModule } from '@angular/core';
import { JSONSchemaFormControlsComponent } from './json-schema-form-controls/json-schema-form-controls.component';
import { DndModule } from '@beyerleinf/ngx-dnd';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';

@NgModule({
  declarations: [
    JSONSchemaEditorComponent,
    JSONSchemaFormControlsComponent,    
  ],
  imports: [
    FathymSharedModule,
    DndModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    JSONSchemaEditorComponent,
    JSONSchemaFormControlsComponent,
  ]
})
export class JsonSchemaEditorModule { 

}
