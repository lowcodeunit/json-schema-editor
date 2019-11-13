import { element } from 'protractor';
import { Component, OnInit, Input } from '@angular/core';
import { JSONSchema, IsDataTypeUtil } from '@lcu/common';
import { FormGroup, AbstractControl, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { JSONControlModel } from '../../models/json-control.model';
import { JSONFlattenUnflatten } from '../../utils/json/json-flatten-unflatten.util';

@Component({
  selector: 'lcu-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

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

public TestItems: Array<JSONControlModel>;

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
    this.TestItems = [];
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
    json.default[val.ControlName] = val.Value;

    const key = Object.keys(json.default)[Object.values(json.default).indexOf(val.Value)];
    json.default = this.renameJSONKey( json.default, key, val.Key );
    this.updateSchemaControl(json);
  });
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

  protected updateSchemaControl(json: JSONSchema): void {
    this.EditedSchemaControl.setValue(JSON.stringify(json.default, null, 5)); // keeps JSON format
 }

 protected indent(item): number {
  return item;
 }

  protected iterateJSONSchema(schema): void {
    const flatMap: Map<string, string> = JSONFlattenUnflatten.FlattenMapTest(schema);
    const flatMapArray: Array<any> = [];

    for (const kv of flatMap) {
      flatMapArray.push(kv);
    }

    flatMapArray.forEach((itm: Array<any>, index: number) => {

      // dot-notated-path(properties.address.name)
      const dotNotatedPath: string = itm[0];

      // Array of each item separated by dot-notation
      const pathIndices: Array<string> = itm[0].split('.');

      // Length of pathIndices
      const pathLength: number = pathIndices.length;

      pathIndices.forEach((indices: string, idx: number, arr: Array<string>) => {

        // need to build the path to get the item value
        const pathArr: Array<string> = arr.slice(0, idx + 1).map(i => {
          return i;
        });

        // const value: string = this.getNestedObject(schema, [indices]);
        const value: string = this.getNestedObject(schema, pathArr);
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
  protected getNestedObject(nestedObj, pathArr: Array<string>): any {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
  }
}
