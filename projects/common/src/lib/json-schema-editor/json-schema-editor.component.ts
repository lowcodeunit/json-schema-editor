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

  // 	Properties
  public CurrentlyEditingSettingsFor: JSONSchema;

  @Input('hide-schema-title')
  public HideSchemaTitle: boolean;

  @Input('hide-note')
  public HideNote: boolean;

  @Input('nested')
  public Nested: boolean;

  @Input('parent-title')
  public ParentTitle: string;

  @Input('prop-key')
  public PropertyKey: string;

  @Output('schemaChange')
  public Changed: EventEmitter<JSONSchema>;

  @Output('propertyAdded')
  public PropertyAdded: EventEmitter<JSONSchema>;

  @Output('propertyTypeChanged')
  public PropertyTypeChanged: EventEmitter<string>;

  @Output('propertyDeleted')
  public PropertyDeleted: EventEmitter<JSONSchema>;

  @Input('schema')
  public Schema: JSONSchema;

  @Input('schema-lookup-placeholder')
  public SchemaLookupPlaceholder: string;

  @Input('show-validations')
  public ShowValidations: boolean;

  public SortedProperties: string[];

  // 	Constructors
  constructor() {
    this.Changed = new EventEmitter();

    this.PropertyAdded = new EventEmitter();

    this.PropertyTypeChanged = new EventEmitter();

    this.PropertyDeleted = new EventEmitter();

    this.SchemaLookupPlaceholder = 'Schema Type Lookup';
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

    this.Schema.type = 'object';

    if (this.Nested) {
      this.Schema.title = this.ParentTitle;
    }

    const self = this;

    this.SortedProperties = [];

    this.PivotProperties().forEach(function(prop) {
      self.SortedProperties.push(prop.id);
    });
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

    this.EmitPropertyAdded();
  }

  public EmitChange() {
    this.Changed.emit(this.Schema);
  }

  public EmitPropertyAdded() {
    this.PropertyAdded.emit(this.Schema);
  }

  public EmitPropertyTypeChanged(propertyId: string) {
    this.PropertyTypeChanged.emit(propertyId);
  }

  public EmitPropertyDeleted() {
    this.PropertyDeleted.emit(this.Schema);
  }

  public IsEditingSettings(prop: JSONSchema) {
    return this.CurrentlyEditingSettingsFor === prop;
  }

  public PivotProperties() {
    const keys = Object.keys(this.Schema.properties);

    return keys.map(k => this.Schema.properties[k]);
  }

  public SchemaPropertyTypeChanged(property: any) {
    this.EmitChange();

    this.EmitPropertyTypeChanged(property.id);
  }

  public PropertySchemaChanged(prop: JSONSchema, schema: JSONSchema) {
    prop.oneOf = [schema];

    this.EmitChange();
  }

  public RemoveProperty(propIndex: string) {
    let msg = 'Are you sure you want to delete this property?';

    if (this.Schema.properties[propIndex].title) {
      msg = `Are you sure you want to delete property '${this.Schema.properties[propIndex].title}'?`;
    }

    if (confirm(msg)) {
      delete this.Schema.properties[propIndex];

      this.EmitChange();

      this.EmitPropertyDeleted();
    }
  }

  public SetEditingSettings(prop: JSONSchema) {
    if (this.IsEditingSettings(prop)) {
      this.CurrentlyEditingSettingsFor = null;
    } else {
      this.CurrentlyEditingSettingsFor = prop;
    }
  }

  public SortSuccess(event: any) {
    const tmpProps = {};

    for (const key in this.Schema.properties) {
      tmpProps[this.SortedProperties.indexOf(this.Schema.properties[key].id)] = this.Schema.properties[key];
    }

    this.Schema.properties = tmpProps;
  }

  public ValueChanged(root: any, prop: string, value: any) {
    root[prop] = value;

    this.EmitChange();
  }

  // 	Helpers
}
