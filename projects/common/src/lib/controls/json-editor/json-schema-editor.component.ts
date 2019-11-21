import { element } from 'protractor';
import { Component, OnInit, Input } from '@angular/core';
import { JSONSchema, IsDataTypeUtil, JSONFlattenUnflatten, DotNotationUtil } from '@lcu/common';
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
    // console.log('control selected', itm);
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

  // maybe look here for a different way to build dynamic controls
  // https://egghead.io/lessons/angular-dynamically-create-multiple-formcontrols-from-a-data-set-in-angular

  // push new item to a storage array
  this.DynamicControlItems.push(newItem);

  // destructor newItem, this prevents having to do: newItem.ControlName, etc.
  const { ControlName, DotNotatedPath, Indent, Key, Level, UUID, Value, ValueDataType, ParentObj, PreviousValue } = newItem;

  const fg: FormGroup = this.formBuilder.group(
    {
      UUID: [UUID],
      ControlName: [Key],
      DotNotatedPath: [DotNotatedPath],
      Indent: [Indent],
      Key: [Key],
      Level: [Level],
      Value: [Value],
      ValueType: [ValueDataType],
      ParentObj: [ParentObj],
      PreviousValue: [PreviousValue]
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

    const json: JSONSchema = this.JSONSchema;
    const currKey: string = val.DotNotatedPath.split('.').pop();

    for (let control of this.JSONSchemaEditorForm.controls.JSONFields.value) {
      if (control.UUID === val.UUID) {
        control = val;

        const pathArr: Array<string> = val.DotNotatedPath.split('.');

        if (currKey !== val.Key) {
          json.default = this.ChangeKey(json.default, val.DotNotatedPath, currKey, val.Key, val.ParentObj);
        }

        pathArr.pop();
        pathArr.push(val.Key);
        val.DotNotatedPath = pathArr.join('.');

        this.JSONSchemaEditorForm.controls.JSONFields['controls'].forEach(el => {
          if (el.value.UUID === val.UUID) {
            // update DotNotatedPath so it's the same as the new key value
            el.controls['DotNotatedPath'].value = val.DotNotatedPath;
          }
        });

        DotNotationUtil.SetValue(json.default, val.DotNotatedPath, val.Value);
      }
    }
    this.updateSchemaControl(json);
  });
}

  protected ChangeKey(schema: any, propertyPath: string, oldKey: string, newKey: string, objToChange: string): any {

    // for top level properties
    if (propertyPath.split('.').length === 1) {
      return Object.keys(schema).reduce( (acc, curr, idx, arr) =>
        curr === oldKey ? ({ ...acc, [newKey]: schema[oldKey] }) : ({...acc, [curr]: schema[curr]}), {} );
    }

    // for nested properties
    if (propertyPath.split('.').length > 1) {
      return propertyPath.split('.').reduce( (acc, curr, idx, arr) => {
          if ( idx === (arr.length - 1) && acc ) {

            const idxPos: number = arr.indexOf(objToChange);
            const idxPosArr: Array<string> = [ ...arr.splice(0, idxPos + 1) ];

            DotNotationUtil.SetValue(schema, idxPosArr.join('.'), this.renameKeys({[oldKey]: newKey}, acc));

            return schema;
            // return {
            //   ...schema, [objToChange]: this.renameKeys({[oldKey]: newKey}, acc)
            // };
          }
          return acc ? acc[curr] : null; // if acc, then start additional iterations with acc[curr]
      }, schema); // first item to start the loop
    }
  }

  /**
   * Rename property keys
   */
  protected renameKeys = (keysMap, obj) => {
    return Object
            .keys(obj)
            .reduce((acc, key) => {
              const renamedObject = {
                [keysMap[key] || key]: obj[key]
              };
              return {
                ...acc,
                ...renamedObject
              };
            }, {});
  }

 /**
  * Update the current schema
  *
  * @param schema JSON to search through
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

        // const value: string = this.getNestedObjectValue(schema, pathArr);
       // const value: string = DotNotationUtil.GetValue(schema, pathArr);
        const value: string = this.testGetValue(schema, pathArr.join('.'));
        let dataType: string = '';

        const parentObj: string = pathArr.length === 1 ? pathArr[0] : pathArr[pathArr.length - 2];

        if (value) {
          dataType = (IsDataTypeUtil.GetDataType(value));
        }

      //  const { ControlName, DotNotatedPath, Indent, Key, Level, Value, ValueDataType } = newItem;

        this.addNewControl(
          new JSONControlModel(
            this.createUUID(), // UUID
            indices, // key
            value, // value
            indices, // control name
            20 * idx, // indent(x offset)
            dataType, // data type
            idx, // parent/child level
            dotNotatedPath, // dotnotated path
            parentObj, // parent object of property
            value // set previous value
          ));
      });
    });
  }

  protected createUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  protected testGetValue(obj: JSON | object, propertyPath: string): string {
    /**
     * @param acc(accumulator) returned object to iterate
     *
     * @param curr(current value) current element being processed in the array
     */
    return propertyPath.split('.').reduce( (acc, curr, idx, arr) => {
      if ( idx === (arr.length - 1) && acc ) {
        return acc[curr];
      }
      // return a new accumulator to the reduce callback(starts the loop with the next curr value)
      return acc ? acc[curr] : null;

    // inital value to use as the first argument(this is the item to start the iteration with)
  }, obj);
  }
}
