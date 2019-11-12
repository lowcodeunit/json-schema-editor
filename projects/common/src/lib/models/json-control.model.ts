import { JSONSchema } from '@lcu/common';

/**
 * Model for dynamic JSON Schema controls
 */
export class JSONControlModel {

    /**
     * Property name
     */
    public Key: string;

    /**
     * Name for each dynamic control
     */
    public ControlName: string;

    /**
     * Indentation value, to mimic <ul><li>
     */
    public Indent?: number;

    /**
     * Property value
     */
    public Value: string | Array<any> | object | unknown;

    public ValueType?: string;

    constructor(key: string, value: string | Array<any> | object | unknown, controlName: string, indent?: number, valueType?: string) {
        this.ControlName = controlName;
        this.Indent = indent;
        this.Key = key;
        this.Value = value;
        this.ValueType = valueType;
    }
}
