/* tslint:disable:directive-selector */
import {AfterContentInit, ContentChild, Directive} from '@angular/core';
import {FormLabelDirective} from './form-label.directive';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '.form-group'
})
export class FormLabelValidationDirective implements AfterContentInit {

  @ContentChild(NgControl) ngControl: NgControl;
  @ContentChild(FormLabelDirective) label: FormLabelDirective;

  constructor() { }

  private setLabelValidity(): void {
    this.label.isInvalid = this.ngControl.invalid && this.ngControl.dirty;
  }

  ngAfterContentInit(): void {
    if (this.ngControl && this.label) {
      this.setLabelValidity();
      this.ngControl.statusChanges.subscribe(() => this.setLabelValidity());
    }
  }

}
