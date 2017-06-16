import {ChangeDetectorRef, Component, ComponentFactoryResolver, Type, ViewChild, Input, OnChanges, SimpleChange} from "@angular/core";

import { CoreDirective } from "../directive/core.directive";

@Component({
  selector: "app-core",
  templateUrl: "./core.component.html",
  styleUrls: ["./core.component.scss"]
}) export class CoreComponent implements OnChanges {

  @Input() componentType: Type<any>;
  @ViewChild(CoreDirective) appCore: CoreDirective;
  loadComponent() {

    if(typeof this.componentType !== "undefined") {

      let component: Type<any> = this.componentType;
      let componentFactory: any = this.componentFactoryResolver.resolveComponentFactory(component);
      let viewContainerRef: any = this.appCore.viewContainerRef;
      viewContainerRef.clear();
      viewContainerRef.createComponent(componentFactory);

    }

  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {

    this.componentType = changes["componentType"].currentValue;
    this.loadComponent();

  }

  ngAfterViewInit() {

    this.loadComponent();
    this.changeDetector.detectChanges();

  }

  constructor(private changeDetector: ChangeDetectorRef, private componentFactoryResolver: ComponentFactoryResolver) {  }

}
