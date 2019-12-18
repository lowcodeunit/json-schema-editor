import { JSONSchema } from '@lcu/common';
import { Subscription } from 'rxjs';
import { SchemaEventsService } from './../../services/schema-events.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lcu-schema-property-control',
  templateUrl: './schema-property-control.component.html',
  styleUrls: ['./schema-property-control.component.scss']
})
export class SchemaPropertyControlComponent implements OnInit {

  /**
   * Input property to track if the control is being edited
   */
  @Input('is-editing')
  public IsEditing: boolean;

  /**
   * Current property
   */
  @Input('prop')
  public Prop: any;

  /**
   * Current property name
   */
  @Input('prop-name')
  public PropName: string;

  /**
   * Event for adding a nested property
   */
  @Output('add-property')
  public AddProperty: EventEmitter<any>;

  /**
   * Collapse the edit control
   */
  @Output('close-edit-control')
  public CloseEditControl: EventEmitter<any>;

  /**
   * Event for when the property name is changed
   */
  @Output('prop-name-changed')
  public PropNameChanged: EventEmitter<string>;

  /**
   * Event for remove schema property
   */
  @Output('remove-property')
  public RemoveProperty: EventEmitter<any>;

  /**
   * Event for saving schema property
   */
  @Output('save-property')
  public SaveProperty: EventEmitter<any>;

  /**
   * Current schema
   */
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

    private _propNameFldValue: string;
    get PropNameFldValue(): string {
      return this._propNameFldValue;
    }

    set PropNameFldValue(val: string) {
      this._propNameFldValue = val;
    }

  protected schema: JSONSchema;

  public CurrentlyEditingSettingsFor: JSONSchema;

  /**
   * Schema properties
   */
  public SortedProperties: Array<string>;

  /**
   * Schema changed event
   */
  // protected schemaChangeSubscription: Subscription;

  constructor(protected schemaEventsService: SchemaEventsService) { }

  ngOnInit() {
    // this.schemaChangeSubscription = this.schemaEventsService.SchemaChangedEvent.subscribe((data: JSONSchema) => {
    //   this.Schema = data;
    // });
  }

  public PivotProperties(): void {
    if (this.Schema) {
      this.SortedProperties = Object.keys(this.Schema.properties);
    }
  }

  /**
   * Close edit control
   */
  public CloseControl(): void {
    this.schemaEventsService.CloseEditControl();
  }

  /**
   * Property name changed
   *
   * @param evt property name event
   */
  public PropertyNameChanged(evt: Event): void {
    this.schemaEventsService.PropNameChanged(evt);
  }

  public AddNestedProperty(idx: number, propertyName: string): void {
    this.schemaEventsService.AddNestedProperty(idx, propertyName);
  }

  public RemoveSchemaProperty(idx: number): void {
    this.schemaEventsService.RemoveProperty(idx);
  }

  public SaveSchemaProperty(propName: string, prop: any, PropNameFldValue: string): void {
    this.schemaEventsService.SaveProperty(propName, prop, PropNameFldValue);
  }

  public SortSuccess() {
    const tmpProps = {};

    this.SortedProperties.forEach(key => {
      tmpProps[key] = this.Schema.properties[key];
    });

    this.Schema.properties = tmpProps;
  }

  public SetEditingSettings(prop: JSONSchema) {
    if (this.IsEditingSettings(prop)) {
      // this.CloseEditControl();
    } else {
      this.CurrentlyEditingSettingsFor = prop;
    }
  }

  public IsEditingSettings(prop: JSONSchema) {
    return this.CurrentlyEditingSettingsFor === prop;
  }
}
