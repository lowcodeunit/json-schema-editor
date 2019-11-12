import { JSONSchemaItemModel } from './../../models/json-schema-item.model';
import { async } from '@angular/core/testing';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { JSONSchema, IsDataTypeUtil } from '@lcu/common';
import { JSONControlModel } from './../../models/json-control.model';
import { JSONSchemaPropModel } from '../../models/json-schema-prop.model';
import { JSONFlattenUnflatten } from '../../utils/json/json-flatten-unflatten.util';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'lcu-json-editor-flatten',
  templateUrl: './json-editor-flatten.component.html',
  styleUrls: ['./json-editor-flatten.component.scss']
})

export class JsonEditorFlattenComponent implements OnInit {

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
 * Form control
 */
public JSONSchemaEditorForm: FormGroup;

protected query: string;


constructor(protected formBuilder: FormBuilder) {
  this.DynamicControlItems = [];
}

ngOnInit() {
  this.setupForm();
}

// Helper functions

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

 /**
  * Add new controls
  *
  * @param item control to add
  */
 protected addNewControl(newItem: JSONControlModel) {
    this.DynamicControlItems.push(newItem);

    const fg: FormGroup = this.formBuilder.group(
      {
        Key: [newItem.Key],
        Value: [newItem.Value],
        ControlName: [newItem.Key],
        Indent: [newItem.Indent]
      }
    );

    this.JSONFields.push(fg);

    this.onChanges(fg);
 }

 protected updateSchemaControl(json: JSONSchema): void {
    this.EditedSchemaControl.setValue(JSON.stringify(json.default, null, 5)); // keeps JSON format
 }

 /**
  * Iterate over the JSON Schema and pull out the values we need
  *
  * @param schema JSON Schema
  */
 protected iterateJSONSchema(schema: JSONSchema, indent?: number): void {

  // https://itnext.io/using-es6-to-destructure-nested-objects-in-javascript-avoid-undefined-errors-that-break-your-code-612ae67913e9
  // const user = {
  //   id: 101,
  //   email: 'jack@dev.com',
  //   personalInfo: {
  //       name: 'Jack',
  //       address: {
  //           line1: 'westwish st',
  //           line2: 'washmasher',
  //           city: 'wallas',
  //           state: 'WX'
  //       }
  //   }
  // };

  // const {
  // personalInfo: {
  //   address: {
  //     line2
  //   },
  // },
  // } = user;

 // console.log('destruct', line2);

  // const person = { name: 'Sarah', country: 'Nigeria', job: 'Developer' }; // https://dev.to/sarah_chima/object-destructuring-in-es6-3fm
  // const { name: foo, job: bar } = person;

  // console.log(foo); // "Sarah"
  // console.log(bar); // "Developer"

  // const { properties : { address: { items }}} = schema;
  // console.log('destructor', items);

  // console.log('Flatten', JSONFlattenUnflatten.Flatten(schema));
  // console.log('FlattenMap', JSONFlattenUnflatten.FlattenMap(schema));

  // const flatMap: Map<string, string> = JSONFlattenUnflatten.FlattenMap(schema);
  // const flatMap: Map<string, JSONSchemaItemModel> = JSONFlattenUnflatten.FlattenMapJSONSchemaItem(schema);
  const flatMap: Map<string, string> = JSONFlattenUnflatten.FlattenMapTest(schema);


  //  Object.entries(JSONFlattenUnflatten.Flatten(schema)).forEach(([key, value]) => {
  //   console.log('enteries for each', [key, value]);
  // });

  //  for (const [k, v] of t) {
  //   console.log(k, v);
  // }

//  Object.entries(t).forEach(([key, value]) => {
  //   console.log(t[key].entries().next().value);
  //   });
  let indices: Array<string> = [];
  let flatMapArray: Array<any> = [];

  for (const kv of flatMap) {
    flatMapArray.push(kv);
    
   // console.log('kv', kv);
    indices = kv[0].split('.');

    let x = Array.from(new Set(kv[0].split('.'))).toString();
    // console.log('x', x);

    if (indices.length > 0) {
      indices.forEach((value, idx) => {
       // this.addNewControl(new JSONControlModel(value, kv[1], value, idx * 20));
      });
    } else {
     // this.addNewControl(new JSONControlModel(kv[0], kv[1], kv[0]));
    }

    // console.log('flatMapArray', flatMapArray);
   }
 //  console.log('flatMapArray', flatMapArray);

  flatMapArray.forEach( (element) => {
    let path: string = element[0];

    const x: any = element[0].split('.');
    // console.log('x', x);
    // console.log('sdfsfsf', element[0] + ' : ' + schema[path]);

    // console.log('schema.' + element[0] + ' = ' + this.getNestedObject(schema, x));
    const value: string = this.getNestedObject(schema, x);

    this.addNewControl(new JSONControlModel(element[0], this.getNestedObject(schema, x), element[0], 0, value));

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

  // public highlight() {
  //   if (!this.query) {
  //       return this.JSONSchema.default;
  //   }

  //   return this.JSONSchema.default.$schema.replace(new RegExp(this.query, 'gi'), match => {
  //       return '<span class='highlightText'>' + match + '</span>';
  //   });
  // }

}

