import { Component, OnInit } from '@angular/core';
import { JSONSchema } from '@lcu/common';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * Schema
   */
  public JSONSchema: JSONSchema;

  constructor() {}

  public ngOnInit(): void {
    setTimeout(() => {
      this.JSONSchema = this.getSchema();
    }, 1000);
  }

  protected getSchema(): JSONSchema {
    const schema: JSONSchema = {
      $id: 'https://example.com/person.schema.json',
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: 'Person',
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          description: 'The person\'s first name.',
          userName: {
            type: 'string',
            description: 'The person\'s user name.',
          }
        },
        middleName: {
          type: 'string',
          description: 'The person\'s middle name.'
        },
        lastName: {
          type: 'string',
          description: 'The person\'s last name.'
        },
        age: {
          description: 'Age in years which must be equal to or greater than zero.',
          type: 'integer',
          minimum: 0
        }
      }
    } as JSONSchema;

    return schema;
  }
}