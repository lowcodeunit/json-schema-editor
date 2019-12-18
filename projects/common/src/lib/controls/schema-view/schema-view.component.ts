import { Component, OnInit, Input } from '@angular/core';
import { JSONSchema } from '@lcu/common';

@Component({
  selector: 'lcu-schema-view',
  templateUrl: './schema-view.component.html',
  styleUrls: ['./schema-view.component.scss']
})
export class SchemaViewComponent implements OnInit {

  private _schema: JSONSchema;

  @Input('stringify-schema')
  public StringifySchema: boolean;

  @Input('schema')
  public set Schema(val: JSONSchema) {
    this._schema = val;
    // this._schema = JSON.stringify(val, null, 5);
  }

  public get Schema(): JSONSchema {
    return this._schema;
  }

  constructor() { }

  ngOnInit() {
    console.log(this.Schema);
  }

}
