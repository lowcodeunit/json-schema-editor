import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lcu-edit-controls',
  templateUrl: './edit-controls.component.html',
  styleUrls: ['./edit-controls.component.scss']
})
export class EditControlsComponent implements OnInit {

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
   * Event for adding a nested property
   */
  @Output('add-property')
  public AddProperty: EventEmitter<any>;

  /**
   * Collapse the edit control
   */
  @Output('close-edit-control')
  public CloseEditControl: EventEmitter<any>;

  /**
   * Event for remove schema property
   */
  @Output('remove-property')
  public RemoveProperty: EventEmitter<any>;

  /**
   * Event for saving schema property
   */
  @Output('save-property')
  public SaveProperty: EventEmitter<any>;

  constructor() {
    this.AddProperty = new EventEmitter();
    this.CloseEditControl = new EventEmitter();
    this.RemoveProperty = new EventEmitter();
    this.SaveProperty = new EventEmitter();
  }

  ngOnInit() {
  }

  public Add(): void {
    this.AddProperty.emit();
  }

  public Close(): void {
    this.CloseEditControl.emit();
  }

  public Remove(): void {
    this.RemoveProperty.emit();
  }

  public Save(): void {
    this.SaveProperty.emit();
  }
}
