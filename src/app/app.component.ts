import { Component, ViewChild, ComponentFactoryResolver, Type, ChangeDetectorRef } from '@angular/core';

import {ToolbarComponent} from './toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}) export class AppComponent {

  constructor() { }

}
