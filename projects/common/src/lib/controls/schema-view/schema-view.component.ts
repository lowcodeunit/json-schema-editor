import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JSONSchema } from '@lcu/common';
import { Subscription } from 'rxjs/internal/Subscription';
import { SchemaEventsService } from '../../services/schema-events.service';

@Component({
  selector: 'lcu-schema-view',
  templateUrl: './schema-view.component.html',
  styleUrls: ['./schema-view.component.scss']
})
export class SchemaViewComponent implements OnInit {

  private _schema: JSONSchema | string;
  @Input('schema')
  public set Schema(val: JSONSchema | string) {
      this._schema = val;
  }

  public get Schema(): JSONSchema | string {
    return this._schema;
  }

  private _editSchema: boolean;
  @Input('edit-schema')
  public set EditSchema(val: boolean) {
    this._editSchema = val;
  }

  public get EditSchema(): boolean {
    return this._editSchema;
  }

  @Output('schema-changed')
  public SchemaChanged: EventEmitter<JSONSchema>;

  /**
   * Schema as a string
   */
  private _schemaString: string;
  public set SchemaString(val: string) {
    this._schemaString = val;
   // this.schemaStringChange(val);
  }

  public get SchemaString(): string {
    return this._schemaString;
  }

  /**
   * Edit button Tooltip message
   */
  public EditTooltip: string;

  /**
   * Card subtitle
   */
  public SubTitle: string;

  constructor(protected schemaEventsService: SchemaEventsService) {
    this.EditTooltip = 'Edit Schema';
    this.SubTitle = 'Modified Schema';
  }

  ngOnInit() {

  }

  /**
   * When changing schema string
   */
  public schemaStringChange(val: string): void {
    // this.Schema = val as JSONSchema;
    // console.log('schema', this.Schema);
  }

  /**
   * Edit schema
   */
  public Edit(): void {
    this.EditSchema = !this.EditSchema;

    if (this.EditSchema) {
      this.EditTooltip = 'Cancel Edit';
      this.SubTitle = 'Directly Editable Schema';
      this.SchemaString = JSON.stringify(this.Schema, null, 5);
    } else {
      this.EditTooltip = 'Edit Schema';
      this.SubTitle = 'Modified Schema';
    }
  }

  /**
   * Event when schema is directly edited
   *
   * @param stringSchema schema as a string
   */
  public SchemaViewChanged(stringSchema: string): void {
    this.schemaEventsService.SchemaChanged(JSON.parse(stringSchema));
    }
}
