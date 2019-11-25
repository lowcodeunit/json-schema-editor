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
     * Parent Object
     */
    public ParentObj?: string;

    /**
     * Previous key value
     */
    public PreviousKey: string;
    /**
     * Previous Value
     */
     public PreviousValue: string | object | Array<any>;

    /**
     * Unique identifier
     */
    public UUID: string;

    /**
     * Property value
     */
    // public Value: string | Array<any> | object | unknown;
    public Value: string;

    /**
     * Data type
     */
    public ValueDataType?: string;

    // need to use destructured parameters
    constructor(
        uuid: string,
        key: string,
        previousKey: string,
        value: string,
        controlName: string,
        indent?: number,
        valueDataType?: string,
        level?: number,
        dotNotatedPath?: string,
        parentObj?: string,
        previousValue?: string | object | Array<any>)
        {
            this.UUID = uuid;
            this.ControlName = controlName;
            this.DotNotatedPath = dotNotatedPath;
            this.Indent = indent;
            this.Key = key;
            this.Level = level;
            this.Value = value;
            this.ValueDataType = valueDataType;
            this.ParentObj = parentObj;
            this.PreviousValue = previousValue;
            this.PreviousKey = previousKey;
        }
}
