import { Component, OnInit, Input } from '@angular/core';
import { JSONSchema } from '@lcu/common';

@Component({
  selector: 'lcu-schema-view',
  templateUrl: './schema-view.component.html',
  styleUrls: ['./schema-view.component.scss']
})
export class SchemaViewComponent implements OnInit {

  @Input('schema')
  public Schema: JSONSchema;

  constructor() { }

  ngOnInit() {
    console.log(this.Schema);
  }

}
