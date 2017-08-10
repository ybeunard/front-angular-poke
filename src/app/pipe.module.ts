import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { SafeHtmlPipe, SortArrayPipe } from "./pipe.pipe";

@NgModule({

  imports: [BrowserModule],
  declarations:   [ SafeHtmlPipe, SortArrayPipe ],
  exports:        [ SafeHtmlPipe, SortArrayPipe ]

}) export class PipeModule { }
