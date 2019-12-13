import { JSONSchemaEditorComponent } from './json-schema-editor/json-schema-editor.component';
import { NgModule } from '@angular/core';
import { JSONSchemaFormControlsComponent } from './json-schema-form-controls/json-schema-form-controls.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from '@beyerleinf/ngx-dnd';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { EmitEventDirective } from './directives/emit-event.directive';
import { EditDragComponent } from './controls/edit-drag/edit-drag.component';
import { EditControlsComponent } from './controls/edit-controls/edit-controls.component';
import { SchemaViewComponent } from './controls/schema-view/schema-view.component';
import { SchemaPropertiesComponent } from './controls/schema-properties/schema-properties.component';
import { SchemaKeywordsComponent } from './controls/schema-keywords/schema-keywords.component';
import { DataTypeSelectComponent } from './controls/data-type-select/data-type-select.component';

@NgModule({
  declarations: [
    JSONSchemaEditorComponent,
    JSONSchemaFormControlsComponent,
    EmitEventDirective,
    EditDragComponent,
    EditControlsComponent,
    SchemaViewComponent,
    SchemaPropertiesComponent,
    SchemaKeywordsComponent,
    DataTypeSelectComponent
  ],
  imports: [
    FathymSharedModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    JSONSchemaEditorComponent,
    JSONSchemaFormControlsComponent,
    EmitEventDirective,
    EditDragComponent,
    EditControlsComponent,
    SchemaViewComponent,
    SchemaPropertiesComponent,
    SchemaKeywordsComponent,
    DataTypeSelectComponent
  ],
  entryComponents: [EditDragComponent, EditControlsComponent, SchemaViewComponent, SchemaPropertiesComponent, SchemaKeywordsComponent, DataTypeSelectComponent]
})
export class JsonSchemaEditorModule { 

}
