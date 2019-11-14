import { element } from 'protractor';
import { Component, OnInit, Input } from '@angular/core';
import { JSONSchema, IsDataTypeUtil, JSONFlattenUnflatten } from '@lcu/common';
import { FormGroup, AbstractControl, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { JSONControlModel } from '../../models/json-control.model';

@Component({
  selector: 'lcu-json-schema-editor',
  templateUrl: './json-schema-editor.component.html',
  styleUrls: ['./json-schema-editor.component.scss']
})
export class JSONSchemaEditorComponent implements OnInit {

  private _jsonSchema: JSONSchema;
  /**
   * JSON Schema input hook
   */
  // tslint:disable-next-line:no-input-rename
  @Input('json-schema')
  public set JSONSchema(val: JSONSchema) {

    if (!val) {
      return;
    }

    this._jsonSchema = val;

    this.updateSchemaControl(val);
    this.iterateJSONSchema(val.default);
  }

  public get JSONSchema(): JSONSchema {
    return this._jsonSchema;
  }

  /**
   * Access address field
   */
  public get EditedSchemaControl(): AbstractControl {
    if (this.JSONSchemaEditorForm) {
      return this.JSONSchemaEditorForm.get('editedSchemaControl');
    }
  }

  /**
   * Array for storing dynamic controls
   */
public get JSONFields(): any {
  // https://www.youtube.com/watch?v=KGxWR7AxDDk
  return this.JSONSchemaEditorForm.get('JSONFields') as FormArray;
}

/**
 * Array to store dynamic control values
 */
public DynamicControlItems: Array<JSONControlModel>;

/**
 * Height of closed expansion panel header
 */
public ExpansionPanelClosedHeight: string;

/**
 * Height of open expansion panel header
 */
public ExpansionPanelOpenHeight: string;

/**
 * Form control
 */
public JSONSchemaEditorForm: FormGroup;

/**
 * Property to hold open/close state of panel
 */
public PanelOpenState: boolean;

public InnerTextTest: string;

  constructor(protected formBuilder: FormBuilder) {

    this.PanelOpenState = false;
    this.DynamicControlItems = [];
    this.ExpansionPanelClosedHeight = '30px';
  }

  ngOnInit() {
    this.setupForm();
  }

  public Save(): void {

  }

  public ControlSelected(itm: JSONControlModel, idx: number): void {
    console.log('control selected', itm);
    // this.query = '$schema';
    // this.highlight();
    // this.JSONSchema.default[itm.Key] = itm.Key;
    // this.JSONSchema.default[itm.Value] = itm.Value;
    // this.updateSchemaControl();
  }

/**
 * Setup the form
 */
protected setupForm(): void {
  this.JSONSchemaEditorForm = this.formBuilder.group({
    editedSchemaControl: new FormControl(''),
    JSONFields: this.formBuilder.array([]) // create array to store dynamic controls
  });
 }

 /**
  * Add new controls
  *
  * @param item control to add
  */
 protected addNewControl(newItem: JSONControlModel) {

  // push new item to a storage array
  this.DynamicControlItems.push(newItem);

  // destructor newItem, this prevents having to do: newItem.ControlName, etc.
  const { ControlName, DotNotatedPath, Indent, Key, Level, Value, ValueDataType } = newItem;

  const fg: FormGroup = this.formBuilder.group(
    {
      ControlName: [Key],
      DotNotatedPath: [DotNotatedPath],
      Indent: [Indent],
      Key: [Key],
      Level: [Level],
      Value: [Value],
      ValueType: [ValueDataType]
    }
  );

  // push new form control to a storage array
  this.JSONFields.push(fg);

  this.onChanges(fg);
}

 /**
  * Subscribe to value changes from form controls
  *
  * Subscribing to the FormGroup notifies us of what
  * control actually changed and not the whole form
  */
 protected onChanges(fg: FormGroup): void {
  fg.valueChanges.subscribe((val: JSONControlModel) => {

    const json: JSONSchema = { ...this.JSONSchema };

    // json.default[val.DotNotatedPath] = val.Value;

    this.ChangeValueWithDotNotation(json.default, val.DotNotatedPath, val.Value);

    // when changing the key value, change the key name
    const key = Object.keys(json.default)[Object.values(json.default).indexOf(val.Value)];
    json.default = this.renameJSONKey( json.default, key, val.Key );
    this.updateSchemaControl(json);
  });
}

/**
 * Using dot notation, iterate the object and change the key value
 *
 * @param schema JSON object
 *
 * @param dotPath Dot notation path
 *
 * @param newVal Changed value
 */
protected ChangeValueWithDotNotation(schema: JSONSchema, dotPath: string, newVal: string): void {
    return dotPath.split('.').reduce( (prev, curr, idx, arr) => {
      if ( idx === (arr.length - 1) && prev ) {
          prev[curr] = newVal;
      }

      return prev ? prev[curr] : null;
  }, schema);
}

 /**
  * Renaming JSON properties keys
  *
  * @param json JSON to search through
  *
  * @param oldKey Old property key to search on
  *
  * @param newKey New key that replaces the old one
  *
  */
 protected renameJSONKey(json, oldKey: string, newKey: string): any {
  return Object.keys(json).reduce((s, item) =>
    item === oldKey ? ({ ...s, [newKey]: json[oldKey] }) : ({...s, [item]: json[item]}), {} );
 }

 /**
  * Update the current schema
  *
  * @param schema
  */
  protected updateSchemaControl(schema: JSONSchema): void {
    this.EditedSchemaControl.setValue(JSON.stringify(schema.default, null, 5)); // null, 5 keeps JSON format
 }

 /**
  * Iterate through JSON Schema and build dynamic controls
  *
  * Set control properties
  *
  * @param schema JSON Schema
  */
  protected iterateJSONSchema(schema): void {
    const flatMap: Map<string, string> = JSONFlattenUnflatten.FlattenMap(schema);
    const flatMapArray: Array<any> = [];

    for (const kv of flatMap) {
      flatMapArray.push(kv);
    }

    flatMapArray.forEach((itm: Array<any>, index: number) => {

      // Array of each item separated by dot-notation
      const pathIndices: Array<string> = itm[0].split('.');

      // Length of pathIndices
      const pathLength: number = pathIndices.length;

      // loop of path indices(the dotnotated path)
      pathIndices.forEach((indices: string, idx: number, arr: Array<string>) => {

        // need to build the path to get the item value
        // pathArr is also used to get the correct data path of each item
        const pathArr: Array<string> = arr.slice(0, idx + 1).map(i => {
          return i;
        });

        // create a dot-notated-path(properties.address.name) for each item
        // doing this here, because the path from flatMap is a little off
        const dotNotatedPath: string = pathArr.join('.');

        // const value: string = this.getNestedObjectValue(schema, [indices]);
        const value: string = this.getNestedObjectValue(schema, pathArr);
        let dataType: string = '';

        if (value) {
          dataType = (IsDataTypeUtil.GetDataType(value));
        }

      //  const { ControlName, DotNotatedPath, Indent, Key, Level, Value, ValueDataType } = newItem;

        this.addNewControl(
          new JSONControlModel(
            indices, // key
            value, // value
            indices, // control name
            20 * idx, // indent(x offset)
            dataType, // data type
            idx, // parent/child level
            dotNotatedPath, // dotnotated path
          ));
      });
    });
  }

  /**
   * Drill down to find nested objects
   *
   * @param nestedObj object to test
   * @param pathArr array of names used to drill into objects(a.b.c, etc.)
   */
  protected getNestedObjectValue(nestedObj, pathArr: Array<string>): any {
    const val = pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);

    return val;
  }

  protected breakDownDotnotation(val: string): Array<string> {
    return val.split('.');
  }
}
