import { ForgeJSONSchema } from '@lcu/apps';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormGroup } from '@angular/forms';


@Component({
	selector: 'json-schema-form-controls',
	templateUrl: './json-schema-form-controls.component.html',
	styleUrls: ['./json-schema-form-controls.component.scss']
})
export class JSONSchemaFormControlsComponent implements OnInit {
	//	Fields

	//	Properties
	@Input('data')
	public Data: any;

	@Input('form')
	public FormGroup: FormGroup;

	@Input('schema')
	public Schema: ForgeJSONSchema;

	//	Constructors
	constructor() {
	}

	//	Runtime
	public ngOnInit() {
	}

	//	API Methods
	public PivotProperties() {
		if (!this.Schema)
			return [];

		var keys = Object.keys(this.Schema.properties);

		return keys.map(k => this.Schema.properties[k]);
	}

	//	Helpers
}