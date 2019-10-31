import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ValidatorFn, FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { JSONSchema } from '@lcu/common';

@Component({
  selector: 'lcu-dynamic-reactive-form-dos',
  templateUrl: './dynamic-reactive-form-dos.component.html',
  styleUrls: ['./dynamic-reactive-form-dos.component.scss']
})
export class DynamicReactiveFormDosComponent implements OnInit {

 protected currentJSONSchema: JSONSchema;

  /**
   * JSON Schema input hook
   */
  // tslint:disable-next-line:no-input-rename
  @Input('json-schema')
  set JSONSchema(val: JSONSchema) {

    if (!val) {
      return;
    }
    
    this.iterateSchema(val.default);
  }

  /**
   * Array for storing dynamic controls
   */
get jsonFields(): any {
  // https://www.youtube.com/watch?v=KGxWR7AxDDk
  return this.DemoForm.get('jsonFields') as FormArray;
}

/**
 * Form control
 */
public DemoForm: FormGroup;

/**
 * Array to store dynamic control values
 */
public FormItems: {
  key: string,
  value: string,
  name: string
}[];

constructor(protected formBuilder: FormBuilder, protected cdr: ChangeDetectorRef) {
  this.FormItems = [];
}

ngOnInit() {
  this.setupForm();
}

/**
 * Setup the form
 */
 protected setupForm(): void {
  this.DemoForm = this.formBuilder.group({
    jsonFields: this.formBuilder.array([]) // create array to store dynamic controls
  });
 }

 /**
  * Subscribe to value changes from form controls
  *
  * Subscribing to the FormGroup notifies us of what
  * control actually changed and not the whole form
  */
 protected onChanges(fg: FormGroup): void {
    fg.valueChanges.subscribe(val => {
      console.log('value change', val);
    });
 }

 /**
  * Add new controls
  *
  * @param item control to add
  */
 protected addItem(item: {key, value, name}) {
    this.FormItems.push(item);

    const fg: FormGroup = this.formBuilder.group(
      {
          key: [item.key], value: [item.value], name: [item.key]
      }
    );

    this.jsonFields.push(fg);

    this.onChanges(fg);
 }

 /**
  * Iterate over the JSON Schema and pull out the values we need
  *
  * @param schema JSON Schema
  */
 protected iterateSchema(schema: JSONSchema): void {

    Object.entries(schema).forEach(([key, value]) => {

        if (typeof value === 'object') {
          this.iterateSchema(value);
        }

        this.addItem({ key, value, name });
        // console.log('key: ' + key + ', value: ' + value);
      }
    );
  }

  public Save(): void {
   console.log('field 1', this.DemoForm.get(['jsonFields', 1]).value);
   console.log('controls', this.DemoForm.controls);
  }
}
