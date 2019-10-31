import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FathymSharedModule, MaterialModule, PipeModule, LCUServiceSettings, RealTimeService } from '@lcu/common';
import { JsonEditorComponent, DynamicReactiveFormComponent, DynamicReactiveFormDosComponent } from '@lowcodeunit/json-schema-editor-common';

@NgModule({
  declarations: [
    AppComponent,
    DynamicReactiveFormComponent,
    DynamicReactiveFormDosComponent,
    JsonEditorComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    FathymSharedModule,
    MaterialModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
