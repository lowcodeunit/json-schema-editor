import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JSONSchema } from '@lcu/common';
import { FormBuilder } from '@angular/forms';
import { SchemaEventsService } from '../services/schema-events.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'lcu-json-schema-editor',
  templateUrl: './json-schema-editor.component.html',
  styleUrls: ['./json-schema-editor.component.scss']
})

export class JSONSchemaEditorComponent implements OnInit {

    // 	Properties
    public CurrentlyEditingSettingsFor: JSONSchema;

    /**
     * Output event when save button is clicked
     */
    @Output('save-schema')
    public SaveSchema: EventEmitter<JSONSchema>;

    /**
     * Output event when schema changes
     */
    @Output('schema-changed')
    public SchemaChanged: EventEmitter<JSONSchema>;

    /**
     * Input property for identifying a child schema
     */
    @Input('child-schema')
    public IsChildSchema: boolean;

    /**
     * Input property for current schema
     */
    private _schema: JSONSchema;
    @Input('schema')
    public set Schema(schema: JSONSchema) {
      this._schema = schema;

      if (!schema) {
        return;
      }

      this.EmitChange();
      this.PivotProperties();
    }

    public get Schema(): JSONSchema {
      return this._schema;
    }

    /**
     * Input property to hide/show save button
     */
    @Input('show-save-button')
    public ShowSaveButton: boolean;

    /**
     * Input property to hide/show validation
     */
    @Input('show-validations')
    public ShowValidations: boolean;

    /**
     * Property name field value
     */
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

    /**
     * Schema change subscription
     */
    protected schemaChangeSubscription: Subscription;

    // 	Constructors
    constructor(
      protected formBuilder: FormBuilder,
      protected schemaEventService: SchemaEventsService) {
      this.SchemaChanged = new EventEmitter();
      this.SaveSchema = new EventEmitter();
    }

    // 	Runtime
    public ngOnInit() {

      /**
       * subscribe to schema changes
       */
      this.schemaChangeSubscription = this.schemaEventService.SchemaChangedEvent.subscribe((data: JSONSchema) => {
        this.Schema = data;
      });
    }

    // 	API Methods

    public PropertyNameChanged(val: string): void {
      this.PropNameFldValue = val;
      this.EmitChange();
    }

    /**
     * Add a new top level property
     */
    public AddProperty() {
      const prop = {
      // oneOf: [{} as JSONSchema]
      } as JSONSchema;

      let index = 0;

      if (this.Schema.properties && Object.keys(this.Schema.properties).length > 0) {
        index = parseInt(Object.keys(this.Schema.properties)[(Object.keys(this.Schema.properties).length - 1).toString()]) + 1;
      }

      if (!this.Schema.properties) {
        this.Schema.properties = {};
      }

      this.Schema.properties[index.toString()] = prop;

      this.SetEditingSettings(prop);

      this.Schema = this.Schema;
      this.EmitChange();
    }

    /**
     * Emit schema changed event for those listening
     */
    public EmitChange() {
      this.SchemaChanged.emit(this.Schema);
    }

    /**
     * Is the property being edited
     *
     * @param prop schema
     */
    public IsEditingSettings(prop: JSONSchema) {
      return this.CurrentlyEditingSettingsFor === prop;
    }

    /**
     * Get schema property names
     */
    public PivotProperties() {
      if (this.Schema && this.Schema.properties) {
       this.SortedProperties = Object.keys(this.Schema.properties);
      }
    }

    /**
     * Delete property
     *
     * @param propIndex Index position of selected property
     */
    public RemoveProperty(propIndex: string) {
      let msg = 'Are you sure you want to delete this property?';
      const propName: string = Object.keys(this.Schema.properties)[propIndex];
      const property: any = this.Schema.properties[Object.keys(this.Schema.properties)[propIndex]];
      // if (this.Schema.properties[propIndex].title) {
      //   msg = `Are you sure you want to delete property '${this.Schema.properties[propIndex].title}'?`;
      // }

      if (this.Schema.properties[propName]) {
        msg = `Are you sure you want to delete property '${propName}'?`;
      }

      if (confirm(msg)) {
        delete this.Schema.properties[propName];
        this.Schema = this.Schema;
        this.EmitChange();
      }
    }

    /**
     * Update selected property
     *
     * @param propName property name
     *
     * @param prop property object
     *
     * @param newPropName new property name
     */
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

      this.EmitChange();
    }

    /**
     * Save the schema
     */
    public SaveSchemaChanges(): void {
      this.SaveSchema.emit(this.Schema);
    }

    /**
     * Close property edit control
     */
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

    /**
     * After successfully changing the order of properties
     */
    public SortSuccess() {
      const tmpProps = {};

      this.SortedProperties.forEach(key => {
        tmpProps[key] = this.Schema.properties[key];
      });

      this.Schema.properties = tmpProps;
      this.EmitChange();
    }
}
