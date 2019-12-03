import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { JSONSchema, Address } from '@lcu/common';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public JSONSchema: JSONSchema;
  public ThemeClass: BehaviorSubject<string>;

  constructor() {}

  public ngOnInit(): void {
    this.resetTheme();
    
    this.JSONSchema = this.getSchema();
  }

  /**
   * Set default theme
   */
  protected resetTheme(): void {}

  protected getSchema(): JSONSchema {
    const schema: JSONSchema = {
      $id: 'https://example.com/person.schema.json',
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: 'Person',
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          description: 'The person\'s first name.'
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

    // schema.default = {
    //   $schema: 'http://json-schema.org/draft-07/schema#',
    //   $id: 'root',
    //   definitions: {},
    //   description: 'Test JSON editor',
    //   title: 'JSON Schema Test',
    //   type: 'object',
    //   properties: {
    //     address: {
    //       $id: '#/properties/address',
    //       type: 'object',
    //       person: {
    //         firstName: 'Shannon',
    //         lastName: 'Bruns'
    //       },
    //       shannonArray: [
    //         'shannon',
    //         'wayne',
    //         'bruns'
    //       ],
    //       required: [
    //         'street_address',
    //         'city',
    //         'state'
    //       ]
    //     },
    //     billing_address: {
    //       $ref: '#/properties/address'
    //     },
    //     shipping_address: {
    //       $ref: '#/properties/address'
    //     }
    //   }
    // };

    // schema.default =
    // {
    //   'definitions': {},
    //   '$schema': 'http://json-schema.org/draft-07/schema#',
    //   '$id': 'http://example.com/root.json',
    //   'type': 'object',
    //   'title': 'The Root Schema',
    //   'description': 'An explanation about the purpose of this instance.',
    //   'readOnly': true,
    //   'writeOnly': false,
    //   'required': [
    //     'checked',
    //     'dimensions',
    //     'id',
    //     'name',
    //     'price',
    //     'tags'
    //   ],
    //   'properties': {
    //     'checked': {
    //       '$id': '#/properties/checked',
    //       'type': 'boolean',
    //       'title': 'The Checked Schema',
    //       'description': 'An explanation about the purpose of this instance.',
    //       'default': false,
    //       'examples': [
    //         false
    //       ],
    //       'readOnly': true,
    //       'writeOnly': false
    //     },
    //     'dimensions': {
    //       '$id': '#/properties/dimensions',
    //       'type': 'object',
    //       'title': 'The Dimensions Schema',
    //       'description': 'An explanation about the purpose of this instance.',
    //       'readOnly': true,
    //       'writeOnly': false,
    //       'required': [
    //         'width',
    //         'height'
    //       ],
    //       'properties': {
    //         'width': {
    //           '$id': '#/properties/dimensions/properties/width',
    //           'type': 'integer',
    //           'title': 'The Width Schema',
    //           'description': 'An explanation about the purpose of this instance.',
    //           'default': 0,
    //           'examples': [
    //             5
    //           ],
    //           'readOnly': true,
    //           'writeOnly': false
    //         },
    //         'height': {
    //           '$id': '#/properties/dimensions/properties/height',
    //           'type': 'integer',
    //           'title': 'The Height Schema',
    //           'description': 'An explanation about the purpose of this instance.',
    //           'default': 0,
    //           'examples': [
    //             10
    //           ],
    //           'readOnly': true,
    //           'writeOnly': false
    //         }
    //       }
    //     },
    //     'id': {
    //       '$id': '#/properties/id',
    //       'type': 'integer',
    //       'title': 'The Id Schema',
    //       'description': 'An explanation about the purpose of this instance.',
    //       'default': 0,
    //       'examples': [
    //         1
    //       ],
    //       'readOnly': true,
    //       'writeOnly': false
    //     },
    //     'name': {
    //       '$id': '#/properties/name',
    //       'type': 'string',
    //       'title': 'The Name Schema',
    //       'description': 'An explanation about the purpose of this instance.',
    //       'default': '',
    //       'examples': [
    //         'A green door'
    //       ],
    //       'readOnly': true,
    //       'writeOnly': false,
    //       'pattern': '^(.*)$'
    //     },
    //     'price': {
    //       '$id': '#/properties/price',
    //       'type': 'number',
    //       'title': 'The Price Schema',
    //       'description': 'An explanation about the purpose of this instance.',
    //       'default': 0,
    //       'examples': [
    //         12.5
    //       ],
    //       'readOnly': true,
    //       'writeOnly': false
    //     },
    //     'tags': {
    //       '$id': '#/properties/tags',
    //       'type': 'array',
    //       'title': 'The Tags Schema',
    //       'description': 'An explanation about the purpose of this instance.',
    //       'readOnly': true,
    //       'writeOnly': false,
    //       'items': {
    //         '$id': '#/properties/tags/items',
    //         'type': 'string',
    //         'title': 'The Items Schema',
    //         'description': 'An explanation about the purpose of this instance.',
    //         'default': '',
    //         'examples': [
    //           'home',
    //           'green'
    //         ],
    //         'readOnly': true,
    //         'writeOnly': false,
    //         'pattern': '^(.*)$'
    //       }
    //     }
    //   }
    // };

    //   schema.default =
    //  {
    //   $schema: 'http://json-schema.org/draft-07/schema#',
    //   title: 'JSON Schema Test',

    //   definitions: {
    //     address: {
    //       properties: {
    //         street_address: { type: 'string' },
    //         city:           { type: 'string' },
    //         state:          { type: 'string' }
    //       }
    //     }
    //   }
    // };
    return schema;
  }
}
