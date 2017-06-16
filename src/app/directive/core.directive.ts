import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appCore]"
})
export class CoreDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
