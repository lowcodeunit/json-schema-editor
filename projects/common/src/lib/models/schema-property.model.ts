export class SchemaPropertyModel {
    public Description?: string;
    public IsChild: boolean;
    public Minimum?: string;
    public Placeholder?: string;
    public PropertyChildName?: string;
    public PropertyName: string;
    public Selected?: boolean;
    public Type?: string;
    public Value: any;

    constructor(opts: SchemaPropertyModel) {
        Object.assign(this, opts); // destructure values
    }
}
