import { Component, OnInit } from '@angular/core';
import { JSONSchema } from '@lcu/common';
import { Constants } from '@lowcodeunit/json-schema-editor-common';

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

    /**
     * Stub out a new schema
     */
    public CreateNewSchema(): void {
      if (this.JSONSchema) {
        this.JSONSchema = null;
      }
      this.JSONSchema = Constants.DEFAULT_SCHEMA;
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
        },
        middleName: {
          type: 'string',
          description: 'The person\'s middle name.'
        },
        lastName: {
          type: 'string',
          description: 'The person\'s last name.'
        },
        address: {
          type: 'object',
          description: 'The addres of the user.',
          properties: {
            street: {
              type: 'string',
              description: 'The address street'
            },
            state: {
              type: 'string',
              description: 'The address state'
            }
          }
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