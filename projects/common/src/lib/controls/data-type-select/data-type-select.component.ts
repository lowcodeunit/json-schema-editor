import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SelectModel } from '../../models/select.model';

@Component({
  selector: 'lcu-data-type-select',
  templateUrl: './data-type-select.component.html',
  styleUrls: ['./data-type-select.component.scss']
})
export class DataTypeSelectComponent implements OnInit {

  /**
   * Current property
   */
  @Input('prop')
  public Prop: any;

  /**
   * Current property name
   */
  @Input('prop-name')
  public PropName: string;

  /**
   * Event for data type change
   */
  @Output('data-type-changed')
  public DataTypeChanged: EventEmitter<string>;

  /**
   * Array of datatype select options
   */
  public DataTypes: Array<SelectModel>;

  constructor() {
    this.DataTypeChanged = new EventEmitter<string>();
   }

  ngOnInit() {
    this.setDataTypes();
  }

  public OnChange(val: string): void {
    this.DataTypeChanged.emit(val);
  }

  /**
   * Set datatype select options
   */
  protected setDataTypes(): void {
    this.DataTypes = [
      { Label: 'No Type', Value: '' },
      { Label: 'Null', Value: 'null' },
      { Label: 'Boolean', Value: 'boolean' },
      { Label: 'Object', Value: 'object' },
      { Label: 'Array', Value: 'array' },
      { Label: 'Number', Value: 'number' },
      { Label: 'String', Value: 'string' },
      { Label: 'Integer', Value: 'integer' },
    ];
  }
}
