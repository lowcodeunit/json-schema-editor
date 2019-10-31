import { ColorPickerService } from './../../../common/src/lib/services/color-picker.service';
import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { JSONSchema } from '@lcu/common';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  public JSONSchema: JSONSchema;
  public ThemeClass: BehaviorSubject<string>;

  constructor(protected colorPickerService: ColorPickerService) {

  }

  public ngOnInit(): void {
    this.resetTheme();

    setTimeout(() => {
      this.JSONSchema = this.getSchema();
    }, 2000);
  }

  /**
   * Set default theme
   */
  protected resetTheme(): void {
    // this.changeTheme('contrast-theme');
    this.ThemeClass = this.colorPickerService.GetColorClass();
   }

  protected getSchema(): JSONSchema {

    const schema: JSONSchema = new JSONSchema();

    schema.default =
   {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'JSON Schema Test',
    definitions: {
      address: {
        type: 'object',
        properties: {
          street_address: { type: 'string' },
          city:           { type: 'string' },
          state:          { type: 'string' }
        },
        required: ['street_address', 'city', 'state']
      }
    },
    type: 'object',
    properties: {
      billing_address: { $ref: '#/definitions/address' },
      shipping_address: { $ref: '#/definitions/address' }
    }
  };

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
