import { async } from '@angular/core/testing';
import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { JSONSchema } from '@lcu/common';

@Component({
  selector: 'lcu-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss']
})
export class JsonEditorComponent implements OnInit {

  /**
   * Access address field
   */
  public get EditedSchemaControl(): AbstractControl {
    if (this.Form) {
      return this.Form.get('editedSchemaControl');
    }
  }

  /**
   * Local property for json schema getter / setter
   */
  private _jsonSchema: JSONSchema;

  /**
   * JSON Schema input hook
   */
  // tslint:disable-next-line:no-input-rename
  @Input('json-schema')
  set JSONSchema(val: any) {

    if (!val) {
      return;
    }

    this._jsonSchema = val;

    const schema = JSON.parse(JSON.stringify(val.default));

    if (this.EditedSchemaControl) {
      this.iterateSchema(schema);
      this.EditedSchemaControl.setValue(JSON.stringify(val.default, null, 5)); // keeps JSON format
    }
  }

  get JSONSchema(): any {
      return this._jsonSchema;
    }

  /**
   * property for reactive form
   */
  public Form: FormGroup;

  public SchemaArray: Array<object>;

  protected level: number = 0;

  protected dataMap = new Map<string, Array<string>>([]);
  protected rootLevelNodes: Array<string>;

  constructor() {
    this.SchemaArray = [];
    this.rootLevelNodes = [];
   }

  ngOnInit() {
    this.setupForm();
  }

  // Helper Functions

  /**
   * Setup the form
   */
  protected setupForm(): void {
    this.Form = new FormGroup({
      editedSchemaControl: new FormControl('', Validators.compose([Validators.required])),
    });

    this.onChanges();
  }

  protected onChanges(): void {
    this.Form.valueChanges.subscribe(val => {
      console.log('value changes', val);
    });
  }

  // protected jsonToMap(jsonStr): Map<any, any> {
  //   return new Map(JSON.parse(jsonStr));
  // }

  protected iterateSchema(schema: JSONSchema): void {
    // https://2ality.com/2015/08/es6-map-json.html
   //  this.jsonToMap(schema);
  
    Object.entries(schema).forEach(([key, value]) => { // destructor the object, so we get access to key and value

        // this.rootLevelNodes.push(key);

        // this.SchemaArray.push(
        //   {
        //     key,
        //     value,
        //     level: this.level,
        //     isObject: typeof value === 'object'
        //   }
        // );

        // if (typeof value === 'object') {
        //   value.level = this.level += 1;
        //   this.level += 1;
        //   this.iterateSchema(value);
        // }

        // console.log('key: ' + key + ', value: ' + value);
        // console.log(`${key} ${value}`);
        }
    );
  }

  protected iterateSchemaArray(): void {

  }

  // API Calls
  public Save(): void {
    console.log('changes', this.EditedSchemaControl.value);
  }
}
