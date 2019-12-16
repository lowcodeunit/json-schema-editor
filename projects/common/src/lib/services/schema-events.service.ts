import { JSONSchema } from '@lcu/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
    providedIn: 'root'
})

export class SchemaEventsService {
    public AddPropertyEvent = new Subject<any>();
    public AddNestedPropertyEvent = new Subject<any>();
    public CloseEditControlEvent = new Subject<any>();
    public RemovePropertyEvent = new Subject<number>();
    public SavePropertyEvent = new Subject<any>();
    public EditSettingsEvent = new Subject<any>();
    public PropNameChangedEvent = new Subject<any>();
    public SchemaChangedEvent = new Subject<any>();

    public AddProperty(): void {
        // this.ForecastPlotDataChanged.next({ ...params });
        this.AddPropertyEvent.next();
    }

    public AddNestedProperty(idx: number, propertyName: string): void {
        // this.ForecastPlotDataChanged.next({ ...params });
        this.AddNestedPropertyEvent.next({ idx: idx, propertyName: propertyName });
    }

    public CloseEditControl(): void {
        this.CloseEditControlEvent.next();
    }

    public RemoveProperty(idx: number): void {
        this.RemovePropertyEvent.next(idx);
    }

    public SaveProperty(propName: string, prop: any, PropNameFldValue: string): void {
        this.SavePropertyEvent.next({ propName: propName, prop: prop, PropNameFldValue: PropNameFldValue });
    }

    public EditSettings(params: any): void {
        this.EditSettingsEvent.next();
    }

    public PropNameChanged(param: any): void {
        this.PropNameChangedEvent.next({ ...param });
    }

    public SchemaChanged(param: JSONSchema): void {
       this.SchemaChangedEvent.next({ ... param });
    }
}
