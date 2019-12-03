import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JSONSchema } from '@lcu/common';

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

  @Input('schema')
  public get Schema(): JSONSchema {
    return this.schema;
  }

  public set Schema(schema: JSONSchema) {
    this.schema = schema;

    this.PivotProperties();
  }

  @Input('show-validations')
  public ShowValidations: boolean;

  public SortedProperties: string[];

  // 	Constructors
  constructor() {
    this.Changed = new EventEmitter();
  }

  // 	Runtime
  public ngOnInit() {
    if (!this.Schema) {
      this.Schema = { properties: {} } as JSONSchema;

      this.EmitChange();
    }

    if (!this.Schema.properties) {
      this.Schema.properties = {};

      this.EmitChange();
    }
  }

  // 	API Methods
  public AddProperty() {
    const prop = {
      oneOf: [{} as JSONSchema]
    } as JSONSchema;

    let index = 0;

    if (Object.keys(this.Schema.properties).length > 0) {
      index = parseInt(Object.keys(this.Schema.properties)[(Object.keys(this.Schema.properties).length - 1).toString()]) + 1;
    }

    this.Schema.properties[index.toString()] = prop;

    this.SetEditingSettings(prop);

    this.EmitChange();
  }

  public EmitChange() {
    this.Changed.emit(this.Schema);
  }

  public IsEditingSettings(prop: JSONSchema) {
    return this.CurrentlyEditingSettingsFor === prop;
  }

  public PivotProperties() {
    if (this.Schema) {
      this.SortedProperties = Object.keys(this.Schema.properties);
    }
  }

  public RemoveProperty(propIndex: string) {
    let msg = 'Are you sure you want to delete this property?';

    if (this.Schema.properties[propIndex].title) {
      msg = `Are you sure you want to delete property '${this.Schema.properties[propIndex].title}'?`;
    }

    if (confirm(msg)) {
      delete this.Schema.properties[propIndex];

      this.EmitChange();
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

  public SetEditingSettings(prop: JSONSchema) {
    if (this.IsEditingSettings(prop)) {
      this.CurrentlyEditingSettingsFor = null;
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

  public ValueChanged(root: any, prop: string, value: any) {
    root[prop] = value;

    this.EmitChange();
  }

  // 	Helpers
}
