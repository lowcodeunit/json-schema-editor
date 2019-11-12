// https://www.sitepoint.com/online-json-tree-viewer/

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { JSONSchema, IsDataTypeUtil } from '@lcu/common';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { JSONControlModel } from '../../models/json-control.model';

@Component({
  selector: 'lcu-tree-builder',
  templateUrl: './tree-builder.component.html',
  styleUrls: ['./tree-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TreeBuilderComponent implements OnInit {

  protected data: any;
  protected branches: any;
  public text: string;

/**
 * Array to store dynamic control values
 */
public DynamicControlItems: Array<JSONControlModel>;

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

    this.processJSONTree(val.default);
  }

  /**
   * Form control
   */
  public Form: FormGroup;


  /**
   * Array for storing dynamic controls
   */
  public get JSONFields(): FormArray {
    // https://www.youtube.com/watch?v=KGxWR7AxDDk
    return this.Form.get('JSONFields') as FormArray;
  }

  constructor(protected formBuilder: FormBuilder) {
    this.DynamicControlItems = [];
  }

  ngOnInit() {
    this.setupForm();
  }

/**
 * Setup the form
 */
protected setupForm(): void {
  this.Form = this.formBuilder.group({
    JSONFields: this.formBuilder.array([]) // create array to store dynamic controls
  });
 }

  protected processJSONTree(json: JSONSchema): void {
      this.buildTree(this.processNodes(json));
  }

  protected buildTree(branches): void {
    if (typeof branches !== 'undefined' || branches !== '') {
    }
  }

  protected processNodes(node): string {
    let return_str: string = '';

    switch (IsDataTypeUtil.GetDataType(node)) {
      case 'string':
        return_str += `
        <ul>
          <li>
            <span class="material-icons">
              insert_drive_file
            </span>
            <span>
              ` + node + `
            </span>
          </li>
        </ul>
        `;
        this.addNewControl(new JSONControlModel(node, node, node, 20));
        break;
      case 'array':
        node.forEach((arrayItem, index) => {
          return_str += this.processNodes(arrayItem);
          // this.addNewControl(new JSONControlModel(itm, itm, itm, 20));
        });
        break;
      case 'object':
          Object.entries(node).forEach(([key, value]) => {
            return_str += `
            <ul>
              <li>
                <span class="material-icons">
                  folder
                </span>
                <span>
                ` + key + `
                </span>`;
            return_str += this.processNodes(value);
            // this.addNewControl(new JSONControlModel(key, key, key, 20));
            return_str += `
              </li>
            </ul>
            `;
          });
          break;
    }

    // return_str = return_str.replace('undefined', ''); may still need this -Shannon

    this.text = return_str;
    return return_str;
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
}

}
