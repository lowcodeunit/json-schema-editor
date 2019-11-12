export class JSONSchemaPropModel {
    public Children: Array<any>;
    public TopLevelProp: string;
    public Type: string;
    public Value: any;

    constructor(topLevelProp: string, type: string, children: Array<any>, value: any) {
        this.TopLevelProp = topLevelProp;
        this.Type = type;
        this.Children = children;
        this.Value = value;
    }
}