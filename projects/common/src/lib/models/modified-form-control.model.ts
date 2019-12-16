import { FormControl } from '@angular/forms';

export class ModifiedFormControlModel {
    /**
     * Form control that's being updated
     */
    public Control: FormControl;

    /**
     * Current control value
     */
    public CurrentValue: any;

    /**
     * Index position of control, within formArray
     */
    public Index: number;

    /**
     * Previous control value
     */
    public PreviousValue?: any;

    /**
     * Name of property that is being modified
     */
    public PropertyName: string;

    constructor(control: FormControl, currentValue: any, propertyName: string, previousValue: any, index: number) {
        this.Control = control;
        this.CurrentValue = currentValue;
        this.Index = index;
        this.PreviousValue = previousValue;
        this.PropertyName = propertyName;
    }
}
