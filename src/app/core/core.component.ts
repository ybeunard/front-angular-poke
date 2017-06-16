import {ChangeDetectorRef, Component, ComponentFactoryResolver, Type, ViewChild} from '@angular/core';

import { CoreDirective } from "../directive/core.directive";
import {ActionsListComponent} from '../actions-list/actions-list.component';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent {

  @ViewChild(CoreDirective) appCore: CoreDirective;
  loadComponent() {

    let component: Type<any> = ActionsListComponent;
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    let viewContainerRef = this.appCore.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance

  }
  constructor(private changeDetector: ChangeDetectorRef, private componentFactoryResolver: ComponentFactoryResolver) {  }

  ngAfterViewInit() {

    this.loadComponent();
    this.changeDetector.detectChanges();

  }

}
