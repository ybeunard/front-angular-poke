import { TestBed, async } from '@angular/core/testing';

import { MdIconModule, MdToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {ToolbarComponent} from './toolbar/toolbar.component';

describe('AppComponent', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ToolbarComponent,
        HeaderComponent
      ],
      imports: [
        MdIconModule,
        MdToolbarModule
      ]
    }).compileComponents();

  }));

  it('should create the app', async(() => {

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();

  }));

});
