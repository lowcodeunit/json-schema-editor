import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { JSONSchema } from '@lcu/common';

@Component({
  selector: 'lcu-dynamic-reactive-form',
  templateUrl: './dynamic-reactive-form.component.html',
  styleUrls: ['./dynamic-reactive-form.component.scss']
})
export class DynamicReactiveFormComponent implements OnInit {

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
    setTimeout(() => {
      this.iterateSchema(schema);
    }, 1000);
  }

  get JSONSchema(): any {
    return this._jsonSchema;
  }

  public DemoForm: FormGroup;

  public ArrayItems: {
    key: string,
    value: string
  }[];

  get DemoArray() {
    return this.DemoForm.get('DemoArray') as FormArray;
 }

constructor(protected formBuilder: FormBuilder, protected cdr: ChangeDetectorRef) {

  }

 protected setupForm(): void {
  this.DemoForm = this.formBuilder.group({
    DemoArray: this.formBuilder.array([
      this.formBuilder.control('')
    ])
  });
 }

 protected addItem(item) {
    this.ArrayItems.push(item);
    this.DemoArray.push(this.formBuilder.control(false));
 }

//  protected removeItem() {
//     this.ArrayItems.pop();
//     this.DemoArray.removeAt(this.DemoArray.length - 1);
//  }

  

  ngOnInit() {
    this.setupForm();
    this.ArrayItems = [];
  }

//   protected minSelectedCheckboxes(): ValidatorFn {
//     const validator: ValidatorFn = (formArray: FormArray) => {

//        const selectedCount = formArray.controls
//           .map(control => control.value)
//           .reduce((prev, next) => next ? prev + next : prev, 0);

//        return selectedCount >= 1 ? null : { notSelected: true };
//     };

//     return validator;
//  }

 protected iterateSchema(schema: JSONSchema): void {

  Object.entries(schema).forEach(([key, value]) => { // destructor the object, so we get access to key and value

        if (typeof value === 'object') {
          this.iterateSchema(value);
        }

        this.addItem({ key, value });
        // this.cdr.detectChanges();
        console.log('key: ' + key + ', value: ' + value);
      }
  );
}

}
