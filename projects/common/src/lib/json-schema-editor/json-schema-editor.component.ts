import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JSONSchema } from '@lcu/common';
import { FormBuilder } from '@angular/forms';
import { SchemaEventsService } from '../services/schema-events.service';

@Component({
  selector: 'lcu-json-schema-editor',
  templateUrl: './json-schema-editor.component.html',
  styleUrls: ['./json-schema-editor.component.scss']
})

export class JSONSchemaEditorComponent implements OnInit {

    // 	Fields
    protected schema: JSONSchema;

    // 	Properties
    public CurrentlyEditingSettingsFor: JSONSchema;

    @Output('schemaChange')
    public Changed: EventEmitter<JSONSchema>;

    @Input('child-schema')
    public IsChildSchema: boolean;

    @Input('schema')
    public get Schema(): JSONSchema {
      return this.schema;
    }

    public set Schema(schema: JSONSchema) {
      this.schema = schema;

      if (!schema) {
        return;
      }

      this.PivotProperties();
    }

    @Input('show-validations')
    public ShowValidations: boolean;

    private _propNameFldValue: string;
    get PropNameFldValue(): string {
      return this._propNameFldValue;
    }

    set PropNameFldValue(val: string) {
      this._propNameFldValue = val;
    }

    /**
     * Schema properties
     */
    public SortedProperties: Array<string>;

    // 	Constructors
    constructor(
      protected formBuilder: FormBuilder, 
      protected schemaEventService: SchemaEventsService) {
      this.Changed = new EventEmitter();
    }

    // 	Runtime
    public ngOnInit() {
      // if (!this.Schema) {
        // this.Schema = { properties: {} } as JSONSchema;
        // this.EmitChange();
      // }

      // if (!this.Schema.properties) {
      //   this.Schema.properties = {};

      //   this.EmitChange();
      // }
    }

    // 	API Methods

    public PropertyNameChanged(val: string): void {
      this.PropNameFldValue = val;
    }

    /**
     * Add a new top level property
     */
    public AddProperty() {
      const prop = {
      // oneOf: [{} as JSONSchema]
      } as JSONSchema;

      let index = 0;

      if (Object.keys(this.Schema.properties).length > 0) {
        index = parseInt(Object.keys(this.Schema.properties)[(Object.keys(this.Schema.properties).length - 1).toString()]) + 1;
      }

      this.Schema.properties[index.toString()] = prop;

      this.SetEditingSettings(prop);

      this.Schema = this.Schema;
     // this.EmitChange();
    }

    /**
     * Add a new nested property
     *
     * @param idx parent property index
     *
     * @param parentPropertyName parent property name
     */
    // may not need to do this -shannon
    public AddNestedProperty(idx: number, parentPropertyName: string): void {
    //   const prop = {} as JSONSchema;
    //   prop['isChild'] = true;
    //   const parentProperty: any = this.Schema.properties[parentPropertyName];
    //   const parentKeys: Array<string> = Object.keys(this.Schema.properties[parentPropertyName]);
    //   const index: number = parentKeys.length;

    //   this.Schema.properties[parentPropertyName]['Child'] = prop;

    //   this.SetEditingSettings(prop);
    }

    public EmitChange() {
      this.Changed.emit(this.Schema);
    }

    public IsEditingSettings(prop: JSONSchema) {
      return this.CurrentlyEditingSettingsFor === prop;
    }

    public PivotProperties() {
      if (this.Schema && this.Schema.properties) {
       this.SortedProperties = Object.keys(this.Schema.properties);
      }
    }

    public RemoveProperty(propIndex: string) {
      let msg = 'Are you sure you want to delete this property?';
      const propName: string = Object.keys(this.schema.properties)[propIndex];
      const property: any = this.schema.properties[Object.keys(this.schema.properties)[propIndex]];
      // if (this.Schema.properties[propIndex].title) {
      //   msg = `Are you sure you want to delete property '${this.Schema.properties[propIndex].title}'?`;
      // }

      if (this.Schema.properties[propName]) {
        msg = `Are you sure you want to delete property '${propName}'?`;
      }

      if (confirm(msg)) {
        delete this.Schema.properties[propName];
        this.Schema = this.Schema;
        // this.EmitChange();
      }
    }

    public SaveProperty(propName: string, prop: JSONSchema, newPropName: string) {
      this.SetEditingSettings(prop);

      if (propName !== newPropName) {
        this.Schema.properties[newPropName] = this.Schema.properties[propName];

        delete this.Schema.properties[propName];

        const index = this.SortedProperties.indexOf(propName);

        if (index !== -1) {
          this.SortedProperties[index] = newPropName;
        }

        this.SortSuccess();
      }
    }

    public CloseEditControl(): void {
      this.CurrentlyEditingSettingsFor = null;
    }

    public SetEditingSettings(prop: JSONSchema) {
      if (this.IsEditingSettings(prop)) {
        this.CloseEditControl();
      } else {
        this.CurrentlyEditingSettingsFor = prop;
      }
    }

    public SortSuccess() {
      const tmpProps = {};

      this.SortedProperties.forEach(key => {
        tmpProps[key] = this.Schema.properties[key];
      });

      this.Schema.properties = tmpProps;
    }
}
