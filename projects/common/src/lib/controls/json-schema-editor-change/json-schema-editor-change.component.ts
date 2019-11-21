import { element } from 'protractor';
import { Component, OnInit, Input } from '@angular/core';
import { JSONSchema, IsDataTypeUtil, JSONFlattenUnflatten, DotNotationUtil } from '@lcu/common';
import { FormGroup, AbstractControl, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { JSONControlModel } from '../../models/json-control.model';

@Component({
  selector: 'lcu-json-schema-editor-change',
  templateUrl: './json-schema-editor-change.component.html',
  styleUrls: ['./json-schema-editor-change.component.scss']
})
export class JSONSchemaEditorChangeComponent implements OnInit {

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

  // push new item to a storage array
  this.DynamicControlItems.push(newItem);

  // destructor newItem, this prevents having to do: newItem.ControlName, etc.
  const { ControlName, DotNotatedPath, Indent, Key, Level, UUID, Value, ValueDataType } = newItem;

  if (DotNotatedPath === 'properties.address.shannonArray') {
    debugger;
  }

  const fg: FormGroup = this.formBuilder.group(
    {
      UUID: [UUID],
      ControlName: [Key],
      DotNotatedPath: [DotNotatedPath],
      Indent: [Indent],
      Key: [Key],
      Level: [Level],
      Value: [Value],
      ValueDataType: [ValueDataType]
    }
  );

  // push new form control to a storage array
  this.JSONFields.push(fg);
  console.log(fg);

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

    // json.default[val.DotNotatedPath] = val.Value;

    // for (let dynKey of this.DynamicControlItems) {
    //   if (dynKey.UUID === val.UUID) {
    //     dynKey = val;
    //   }
    // }

    // const currKey = Object.keys(json.default)[Object.values(json.default).indexOf(val.Value)];
    const currKey: string = val.DotNotatedPath.split('.').pop();

    // Object.keys(this.JSONSchemaEditorForm.controls.JSONFields['controls']).forEach(idx => {
    //   const control = this.JSONSchemaEditorForm.controls.JSONFields['controls'][idx];

    //   if (control.value.UUID === val.UUID) {
    //     Object.keys(control.controls).forEach((ii, df, sdf) => {
    //       console.log('asdfsdf', ii);
    //     });

    //     // control.controls.forEach(element => {
    //     //   console.log('element', element);
    //     // });
    //   }
    // });

    for (let control of this.JSONSchemaEditorForm.controls.JSONFields.value) {
      if (control.UUID === val.UUID) {
        control = val;

        const pathArr: Array<string> = val.DotNotatedPath.split('.');

        if (currKey !== val.Key) {
          if (pathArr.length === 1) {
            json.default = this.ChangeKey(json.default, val.DotNotatedPath, currKey, val.Key);
          } else {
            json.default = this.ChangeKey(json.default, val.DotNotatedPath, currKey, val.Key);
            // json.default[pathArr.shift()] = this.ChangeKey(json.default, val.DotNotatedPath, currKey, val.Key);
            // json.default[pathArr[1]] = this.ChangeKey('person', json.default, val.DotNotatedPath, currKey, val.Key);
            // json.default[pathArr[0]] = this.ChangeKey(json.default[pathArr[0]], json.default, val.DotNotatedPath, currKey, val.Key);
          }
        }

        pathArr.pop();
        pathArr.push(val.Key);
        val.DotNotatedPath = pathArr.join('.');

        this.JSONSchemaEditorForm.controls.JSONFields['controls'].forEach(element => {
          if (element.value.UUID === val.UUID) {
            element.controls['DotNotatedPath'].value = val.DotNotatedPath;
          }
          // element.controls.setValue(val);
        });
       // if (currKey === val.Key) {
        DotNotationUtil.SetValue(json.default, val.DotNotatedPath, val.Value);
      // }
      }
    }

    this.updateSchemaControl(json);
  });
}

// schema.properties.address = this.renameJSONKey(prev, oldKey, newKey) : ({...s, [item]: prev[item]}), {} );
  protected ChangeKey(schema: JSONSchema, propertyPath: string, oldKey: string, newKey: string): any {

    return propertyPath.split('.').reduce( (acc, curr, idx, arr) => {
          if ( idx === (arr.length - 1) && acc ) {

           // acc = this.renameKeys({[oldKey]: newKey}, acc);

           let propToChange: string = '';

           if (propertyPath.length === 1) {
            propToChange = propertyPath;
           } else {
             const propArr: Array<any> = propertyPath.split('.');
             propToChange = propArr[propArr.length - 2];
           // propToChange = propertyPath.split('.').pop();
           }

          //  const newObj = {
          //   ...propPath,
          //   [propToChange]: this.renameKeys({[oldKey]: newKey}, acc)
          // };

          //  const newObj = {
          //   ...[propToChange],
          //   [propToChange]: this.renameKeys({[oldKey]: newKey}, acc)
          // };

          // return newObj;

           schema.properties = {
              ...schema.properties,
              address: this.renameKeys({[oldKey]: newKey}, acc)
            };
          }
          return acc ? acc[curr] : null; // if prev, then start the loop over with prev[curr]
      }, schema); // first item to start the loop
  }

  protected renameKeys = (keysMap, obj) => {

    return Object
            .keys(obj)
            .reduce((acc, key) => {

              const renamedObject = {
                [keysMap[key] || key]: obj[key]
              };

              const r = {
                ...acc,
                ...renamedObject
              };

              debugger;
              return r;

            }, {});
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
// protected ChangeValueWithDotNotation(schema: JSONSchema, dotPath: string, newVal: string): void {
//     return dotPath.split('.').reduce( (prev, curr, idx, arr) => {
//       if ( idx === (arr.length - 1) && prev ) {
//           prev[curr] = newVal;
//       }

//       return prev ? prev[curr] : null;
//   }, schema);
// }

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
        const value: string = DotNotationUtil.GetValue(schema, pathArr);
        let dataType: string = '';

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

  // /**
  //  * Drill down to find nested objects
  //  *
  //  * @param nestedObj object to test
  //  *
  //  * @param pathArr array of names used to drill into objects(a.b.c, etc.)
  //  */
  // protected getNestedObjectValue(nestedObj, pathArr: Array<string>): any {
  //   const val = pathArr.reduce((obj, key) =>
  //       (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);

  //   return val;
  // }
}
