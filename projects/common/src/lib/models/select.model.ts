export class SelectModel {
    /**
     * Datatype label
     */
    public Label: string;

    /**
     * Datatype value
     */
    public Value?: string;

    constructor(label: string, value?: string) {
        this.Label = label;
        this.Value = value;
    }
}


