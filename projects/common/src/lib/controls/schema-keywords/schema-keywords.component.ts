import { Component, OnInit, Input } from '@angular/core';
import { JSONSchema } from '@lcu/common';
import { SelectModel } from '../../models/select.model';

@Component({
  selector: 'lcu-schema-keywords',
  templateUrl: './schema-keywords.component.html',
  styleUrls: ['./schema-keywords.component.scss']
})
export class SchemaKeywordsComponent implements OnInit {

  /**
   * Current Schema
   */
  @Input('schema')
  public Schema: JSONSchema;

  /**
   * Array of schema draft types
   */
  public DraftTypes: Array<SelectModel>;


  constructor() { }

  ngOnInit() {
    this.setDraftTypes();
  }

  /**
   * Set schema draft types
   */
  protected setDraftTypes(): void {
    this.DraftTypes = [
      { Label: 'http://json-schema.org/draft-2019-09/schema#', Value: 'http://json-schema.org/draft-2019-09/schema#' },
      { Label: 'http://json-schema.org/draft-07/schema#', Value: 'http://json-schema.org/draft-07/schema#' },
      { Label: 'http://json-schema.org/draft-07/schema#', Value: 'http://json-schema.org/draft-06/schema#' },
      { Label: 'http://json-schema.org/draft-07/schema#', Value: 'http://json-schema.org/draft-04/schema#' }
    ];
  }

}
