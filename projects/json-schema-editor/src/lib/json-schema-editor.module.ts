import { JSONSchemaEditorComponent } from './json-schema-editor/json-schema-editor.component';
import { NgModule } from '@angular/core';
import { JSONSchemaFormControlsComponent } from './json-schema-form-controls/json-schema-form-controls.component';
import { DndModule } from '@beyerleinf/ngx-dnd';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatSelectModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { FathymSharedModule } from '@lowcodeunit/common';

@NgModule({
  declarations: [
    JSONSchemaEditorComponent,
    JSONSchemaFormControlsComponent,    
  ],
  imports: [
    FathymSharedModule,
    DndModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  exports: [
    JSONSchemaEditorComponent,
    JSONSchemaFormControlsComponent,
  ]
})
export class JsonSchemaEditorModule { 

}
