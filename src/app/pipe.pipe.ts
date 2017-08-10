import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { isNullOrUndefined } from "util";

@Pipe({

  name: "safeHtml"

}) export class SafeHtmlPipe implements PipeTransform {

  transform(value: string): SafeHtml {

    return this.sanitizer.bypassSecurityTrustHtml(value.replace(/(?:\r\n|\r|\n)/g, "<br />"));

  }

  constructor(private sanitizer: DomSanitizer) { }

}

@Pipe({

  name: "arrayTable"

}) export class SortArrayPipe implements PipeTransform {

  transform(value: any, filter: string): any {

    if(!(value instanceof Array) || value.length === 0 || isNullOrUndefined(value[0].label)) {

      return value;

    }
    value.sort((a: any, b: any) => {

      if(a.label < b.label) {

        return -1;

      } else if(a.label > b.label) {

        return 1;

      } else {

        return 0;

      }

    });
    if(!isNullOrUndefined(filter) && filter !== "") {

      return value.filter(s => s.label.toLowerCase().indexOf(filter.toLowerCase()) === 0);

    }
    return value;

  }

}
