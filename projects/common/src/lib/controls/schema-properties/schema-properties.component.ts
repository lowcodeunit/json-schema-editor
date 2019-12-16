import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lcu-schema-properties',
  templateUrl: './schema-properties.component.html',
  styleUrls: ['./schema-properties.component.scss']
})
export class SchemaPropertiesComponent implements OnInit {

  /**
   * Input property to track if the control is being edited
   */
  @Input('is-editing')
  public IsEditing: boolean;

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
   * Event for when the property name is changed
   */
  @Output('prop-name-changed')
  public PropNameChanged: EventEmitter<string>;

  constructor() {
    this.PropNameChanged = new EventEmitter<string>();
   }

  ngOnInit() {
  }

  /**
   * Property name changed
   *
   * @param val Control value
   */
  public ProperyNameChanged(val: string): void {
    console.log(val);
    this.PropNameChanged.emit(val);
  }
}
