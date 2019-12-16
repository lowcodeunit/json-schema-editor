import { Directive, EventEmitter, Input, OnDestroy, OnInit, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[emitEvent]'
})
export class EmitEventDirective implements OnInit, OnDestroy {
  @Input('emitEvent') emitter: EventEmitter<any>;
  private subscription: Subscription;
  
  constructor(@Self() private ngControl: NgControl) {
    this.emitter = new EventEmitter();
  }
  
  ngOnInit() {
    this.subscription = this.ngControl.valueChanges
      .subscribe(data => this.emitter.emit(data));
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
    