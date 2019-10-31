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
     * Property value
     */
    public Value: string;

    constructor(key: string, value: string, controlName: string) {
        this.Key = key;
        this.Value = value;
        this.ControlName = controlName;
    }
}
