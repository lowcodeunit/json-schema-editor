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
     * Full path for property(properties.address.type)
     */
    public DotNotatedPath?: string;

    /**
     * Parent/Child Level
     */
    public Level?: number;

    /**
     * Indentation value, to mimic <ul><li>
     */
    public Indent?: number;

    /**
     * Property value
     */
    public Value: string | Array<any> | object | unknown;

    /**
     * Data type
     */
    public ValueDataType?: string;

    // need to use destructured parameters
    constructor(
        key: string,
        value: string | Array<any> | object | unknown,
        controlName: string,
        indent?: number,
        valueDataType?: string,
        level?: number,
        dotNotatedPath?: string)
        {
            this.ControlName = controlName;
            this.DotNotatedPath = dotNotatedPath;
            this.Indent = indent;
            this.Key = key;
            this.Level = level;
            this.Value = value;
            this.ValueDataType = valueDataType;
        }
}
