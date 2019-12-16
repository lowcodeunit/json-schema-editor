import { JSONSchema } from '@lcu/common';

// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */

 export class Constants {
    public static readonly DEFAULT_SCHEMA: JSONSchema = {
        $id: 'https://example.com/new-json-schema.schema.json',
        $schema: 'http://json-schema.org/draft-07/schema#',
        title: 'New JSON Schema',
        type: 'object',
        properties: {
        }
      } as JSONSchema;
 }
