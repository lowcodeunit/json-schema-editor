import { Constants } from './../utils/constants.utils';
import { ModifiedFormControlModel } from './../models/modified-form-control.model';
import { SchemaPropertyModel } from './../models/schema-property.model';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, map, pairwise } from 'rxjs/operators';
import { JSONSchema, JSONFlattenUnflatten, IsDataTypeUtil } from '@lcu/common';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { SelectModel } from '../models/select.model';
import { SchemaEventsService } from '../services/schema-events.service';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'lcu-json-schema-editor',
  templateUrl: './json-schema-editor.component.html',
  styleUrls: ['./json-schema-editor.component.scss']
})

export class JSONSchemaEditorComponent implements OnInit {

    // 	Fields
    protected schema: JSONSchema;

    // 	Properties
    public CurrentlyEditingSettingsFor: JSONSchema;

    @Output('schemaChange')
    public Changed: EventEmitter<JSONSchema>;

    @Input('schema')
    public get Schema(): JSONSchema {
      return this.schema;
    }

    public set Schema(schema: JSONSchema) {
      this.schema = schema;

      if (!schema) {
        return;
      }

      setTimeout(() => {
        this.schemaEventService.SchemaChanged(schema);
      }, 500);

      this.updateSchemaControl();
      this.iterateSchema(schema);
      this.PivotProperties();
    }

    @Input('show-validations')
    public ShowValidations: boolean;

    /**
     * Access modified schema
     */
    public get ModifiedSchemaControl(): AbstractControl {
      if (this.SchemaForm) {
        return this.SchemaForm.get('ModifiedSchemaControl');
      }
    }

    private _propNameFldValue: string;
    get PropNameFldValue(): string {
      return this._propNameFldValue;
    }

    set PropNameFldValue(val: string) {
      this._propNameFldValue = val;
    }

    /**
   * Form
   */
    public SchemaForm: FormGroup;

    public SchemaKeywordGroup: FormGroup;

    public get SchemaPropertyControls(): FormArray {
      return this.SchemaForm.get('SchemaPropertyControls') as FormArray;
    }

    public SchemaPropertyList: Array<SchemaPropertyModel>;

    /**
     * Schema properties
     */
    // public SortedProperties: Array<SchemaPropertyModel>;
    public SortedProperties: Array<string>;

    protected changedFormControl: ModifiedFormControlModel;

    // protected propertyKeys: Array<SchemaPropertyModel>;
    protected propertyKeys: Array<string>;

    // protected addPropertyEvent: Subscription;
    // protected closeEditControlEvent: Subscription;
    // protected removePropertyEvent: Subscription;
    // protected savePropertyEvent: Subscription;

    // 	Constructors
    constructor(
      protected formBuilder: FormBuilder, 
      protected schemaEventService: SchemaEventsService) {
      this.Changed = new EventEmitter();
    }

    // 	Runtime
    public ngOnInit() {

      this.setupForm();
      
      // this.addPropertyEvent = this.schemaEventService.AddPropertyEvent.subscribe((data: any) => {
  
      // });

      // this.closeEditControlEvent = this.schemaEventService.CloseEditControlEvent.subscribe((data: any) => {
  
      // });

      // this.removePropertyEvent = this.schemaEventService.RemovePropertyEvent.subscribe((data: any) => {
  
      // });

      // this.savePropertyEvent = this.schemaEventService.SavePropertyEvent.subscribe((data: any) => {
  
      // });

      // if (!this.Schema) {
        // this.Schema = { properties: {} } as JSONSchema;
        // this.EmitChange();
      // }

      // if (!this.Schema.properties) {
      //   this.Schema.properties = {};

      //   this.EmitChange();
      // }
    }

    // 	API Methods

    public PropertyNameChanged(val: string): void {
      this.PropNameFldValue = val;
    }

    /**
     * Stub out a new schema
     */
    public CreateNewSchema(): void {
      if (this.Schema) {
        this.Schema = null;
      }
      this.Schema = Constants.DEFAULT_SCHEMA;
    }

    /**
     * Add a new top level property
     */
    public AddProperty() {
      const prop = {
      // oneOf: [{} as JSONSchema]
      } as JSONSchema;

      let index = 0;

      if (Object.keys(this.Schema.properties).length > 0) {
        index = parseInt(Object.keys(this.Schema.properties)[(Object.keys(this.Schema.properties).length - 1).toString()]) + 1;
      }

      this.Schema.properties[index.toString()] = prop;

      this.SetEditingSettings(prop);

      this.Schema = this.Schema;
     // this.EmitChange();
    }

    /**
     * Add a new nested property
     *
     * @param idx parent property index
     *
     * @param parentPropertyName parent property name
     */
    public AddNestedProperty(idx: number, parentPropertyName: string): void {
      const prop = {} as JSONSchema;
      prop['isChild'] = true;
      const parentProperty: any = this.Schema.properties[parentPropertyName];
      const parentKeys: Array<string> = Object.keys(this.Schema.properties[parentPropertyName]);
      const index: number = parentKeys.length;

      this.Schema.properties[parentPropertyName]['Child'] = prop;

      this.SetEditingSettings(prop);
    }

    public EmitChange() {
      this.Changed.emit(this.Schema);
    }

    public IsEditingSettings(prop: JSONSchema) {
      return this.CurrentlyEditingSettingsFor === prop;
    }

    public PivotProperties() {
      if (this.Schema) {
       this.SortedProperties = Object.keys(this.Schema.properties);

      // this.SortedProperties = this.propertyKeys;
        this.createPropertyControls();
      }
    }

    public RemoveProperty(propIndex: string) {
      let msg = 'Are you sure you want to delete this property?';
      const propName: string = Object.keys(this.schema.properties)[propIndex];
      const property: any = this.schema.properties[Object.keys(this.schema.properties)[propIndex]];
      // if (this.Schema.properties[propIndex].title) {
      //   msg = `Are you sure you want to delete property '${this.Schema.properties[propIndex].title}'?`;
      // }

      if (this.Schema.properties[propName]) {
        msg = `Are you sure you want to delete property '${propName}'?`;
      }

      if (confirm(msg)) {
        delete this.Schema.properties[propName];
        this.Schema = this.Schema;
        // this.EmitChange();
      }
    }

    public SaveProperty(propName: string, prop: JSONSchema, newPropName: string) {
      this.SetEditingSettings(prop);

      if (propName !== newPropName) {
        this.Schema.properties[newPropName] = this.Schema.properties[propName];

        delete this.Schema.properties[propName];

        const index = this.SortedProperties.indexOf(propName);

        if (index !== -1) {
          this.SortedProperties[index] = newPropName;
        }

        this.SortSuccess();
      }
    }

    public CloseEditControl(): void {
      this.CurrentlyEditingSettingsFor = null;
    }

    public SetEditingSettings(prop: JSONSchema) {
      if (this.IsEditingSettings(prop)) {
        // this.CloseEditControl();
      } else {
        this.CurrentlyEditingSettingsFor = prop;
      }
    }

    public SortSuccess() {
      const tmpProps = {};

      this.SortedProperties.forEach(key => {
        tmpProps[key] = this.Schema.properties[key];
      });

      this.Schema.properties = tmpProps;
    }

    public ValueChanged(root: any, prop: string, value: any) {
      root[prop] = value;

      this.EmitChange();
    }

    public GetControlName(c: AbstractControl): string | null {
      const formGroup = c.parent.controls;
      // let name: string = '';
      // Object.keys(formGroup).forEach( (itm, idx) => {
      //   name = formGroup[idx].value.PropertyName;
      // });
      const ctrlName = Object.keys(formGroup).find((name) => c === formGroup[name]) || null;
     return ctrlName;
    }

    // 	Helpers
    /**
   * Setup the form
   */
  protected setupForm(): void {

    this.SchemaForm = this.formBuilder.group({
      ModifiedSchemaControl: new FormControl({value: '', disabled: true}),
      Title: new FormControl('', [Validators.required]),
      SchemaPropertyControls: this.buildPropertyControls()
    });

    this.onFormChanges();
  }

  // public NameChange(val: any): void {
  //   console.log('name change', val);
  // }

  // public InputChanged(ctrl: any): void {
  //   console.log('input change', ctrl);
  // }

  /**
   * When control has focus, get control values
   *
   * @param ctrl form control that has focus
   *
   * @param currVal control's current value
   *
   * @param propertyName control's property name
   */
  public InputHasFocus(ctrl: FormControl, propertyName: string, currVal: string, prevVal: SchemaPropertyModel, index: string): void {
    console.log('input has focus', ctrl);
    this.changedFormControl = new ModifiedFormControlModel(ctrl, currVal, propertyName, prevVal, Number(index));
  }

  // public TextChanged(ctrl: any): void {
  //   console.log('text changed', ctrl);
  // }

  protected onFormChanges(): void {
    // this.SchemaForm.valueChanges.pipe(pairwise())
    // .subscribe(([prev, next]: [any, any]) => {
    //   console.log('PREV1', prev);
    //   console.log('NEXT1', next);
    // });
    // this.SchemaForm
    // .valueChanges
    // .pipe(
    //   debounceTime(500),
    //   distinctUntilChanged((prev, curr) => {
    //   // console.log(prev, curr);
    //     return prev === curr;
    //   }),
    //   map(res => console.log('mapped form changed res', res))
    // )
    this.SchemaForm
    .valueChanges
      .subscribe(val => {
        console.log('value changed', val);
        console.log(this.changedFormControl);
        this.updateControlValue(val);
      });
  }

  protected updateControlValue(changedValue: any): void {
    if (!this.changedFormControl) {
      return;
    }

    this.changedFormControl.PreviousValue.Value = changedValue.SchemaPropertyControls[this.changedFormControl.Index];
    this.changedFormControl.Control.setValue(this.changedFormControl.PreviousValue, {onlySelf: true, emitEvent: false});
  }

  protected getSelectedCtrl(): any {
    if (!this.SchemaPropertyControls.controls || this.SchemaPropertyControls.controls.length === 0) {
      return;
    }
    return this.SchemaForm.value
    .SchemaPropertyControls.filter(x => x)
                           .map((selected, i) => this.SchemaPropertyList.map( prop => {
                             return { PropertyName: prop.PropertyName, Value: prop.Value };
                            } ));
  }

  /**
    * Update the current schema
    *
    * @param schema JSON to search through
    */
  protected updateSchemaControl(): void {
    this.ModifiedSchemaControl.setValue(JSON.stringify(this.schema, null, 5)); // null, 5 keeps JSON format
  }

  protected createPropertyControls(): void {
    // this.SchemaPropertyList = [];
    // console.log('this.SortedProperties', this.SortedProperties);
    // this.SortedProperties.forEach(propName => {
    //   console.log('propName', this.Schema.properties[propName]);
    //   Object.entries(this.Schema.properties[propName]).forEach(entry => {
    //     let key: string = entry[0];
    //     let value: any = entry[1];
    //     let newCtrl = new SchemaPropertyModel({
    //                                             PropertyName : propName,
    //                                             Type: (key === 'type') ? key : null,
    //                                             Description: (key === 'description') ? key : null,
    //                                             Minimum: (key === 'minimum') ? key : null,
    //                                             Placeholder: 'Schema Type Lookup',
    //                                             Value: value });

    //     this.SchemaPropertyList.push(newCtrl);
    //   });
    // });
    // this.setupForm();
  }

  protected buildPropertyControls(): FormArray {

    if (this.SortedProperties && this.SortedProperties.length > 0) {
      const arr = this.SchemaPropertyList.map(propCtrl => {
        return this.formBuilder.control(propCtrl);
      });
      // this.SchemaPropertyControls.setValue(arr);
      return this.formBuilder.array(arr);
    }
  }

  /**
  * Iterate through JSON Schema and build dynamic controls
  *
  * Set control properties
  *
  * @param schema JSON Schema
  */
  protected iterateSchema(schema: JSONSchema): void {

    const flatMap: Map<string, string> = JSONFlattenUnflatten.FlattenMap(schema.properties);
    const flatMapArray: Array<any> = [];
    const propertyKeys: Array<string> = [];
    this.propertyKeys = [];

    flatMap.forEach((itm, i, a) => {
      console.log('for each');
      this.getKeys(schema.properties, i, propertyKeys);
    });

    for (const kv of flatMap) {
      flatMapArray.push(kv);
     // this.getKeys(schema.properties, kv[0], propertyKeys);
    }
  //  this.getKeys(schema.properties, '', propertyKeys);
  }

  protected getKeys(obj: object, propertyPath: string, propertyKeys: Array<string>): string {

    const topLevelProperties: Array<string> = Object.keys(obj);

    if (topLevelProperties.length > 0) {
      return topLevelProperties.reduce( (acc, curr, idx, arr) => {

        // if (Object.keys(obj[curr])) {
        if (IsDataTypeUtil.IsObject(obj[curr])) {
          console.log('first level', curr);
          const newProp: SchemaPropertyModel = new SchemaPropertyModel(
            {
              Description: obj[curr].description,
              PropertyName: curr,
              IsChild: false,
              Type: obj[curr].type,
              Value: curr
            });
          // this.propertyKeys.push(newProp);
        }

        for (const itm of Object.keys(obj[curr])) {
          if (IsDataTypeUtil.IsObject(obj[curr][itm])) {
            console.log('child itm', itm);
            const newProp: SchemaPropertyModel = new SchemaPropertyModel(
              {
                Description: obj[curr][itm].description,
                IsChild: true,
                PropertyName: itm,
                PropertyChildName: itm,
                Type: obj[curr][itm].type,
                Value: itm
              });
            // this.propertyKeys.push(newProp);
          }
        }
          return acc ? acc[curr] : null; // if acc, then start additional iterations with acc[curr]
      }, obj); // first item to start the loop
   }

    // if (propertyPath.split('.').length > 1) {
    //   return propertyPath.split('.').reduce( (acc, curr, idx, arr) => {
    //       if (IsDataTypeUtil.IsObject(obj[curr]) || acc && IsDataTypeUtil.IsObject(acc[curr])) {
    //         console.log('curr', curr);
    //         this.propertyKeys.push(curr);
    //       }
    //       return acc ? acc[curr] : null; // if acc, then start additional iterations with acc[curr]
    //   }, obj); // first item to start the loop
    // }
  }
}
