import { JSONSchema } from '@lcu/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lcu-edit-drag',
  templateUrl: './edit-drag.component.html',
  styleUrls: ['./edit-drag.component.scss']
})

export class EditDragComponent implements OnInit {

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

  @Input('prop-index')
  public PropIndex: number;

  /**
   * Current property name
   */
  @Input('prop-name')
  public PropName: string;

  /**
   * Event for setting up editing
   */
  @Output('editing-settings')
  public EditingSettings: EventEmitter<any>;

  constructor() {
    this.EditingSettings = new EventEmitter();
   }

  ngOnInit() {
  }

  public SetEditingSettings(prop: JSONSchema): void {
    this.EditingSettings.emit(prop);
  }

}
