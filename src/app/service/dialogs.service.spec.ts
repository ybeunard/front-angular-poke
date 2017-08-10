import { TestBed, inject, async, ComponentFixture } from "@angular/core/testing";
import { Component, Directive, NgModule, ViewChild, ViewContainerRef } from "@angular/core";
import { MdDialog, MdDialogRef, MdDialogModule, OverlayContainer } from "@angular/material";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { DialogsService } from "./dialogs.service";

@Component({template: ""}) class DialogMock { }

@Directive({selector: "dir-with-view-container"}) class DirectiveWithViewContainer {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: "arbitrary-component",
  template: "<dir-with-view-container></dir-with-view-container>",
}) class ComponentWithChildViewContainer {
  @ViewChild(DirectiveWithViewContainer) childWithViewContainer: DirectiveWithViewContainer;
  get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}

const TEST_DIRECTIVES: any = [
  ComponentWithChildViewContainer,
  DialogMock,
  DirectiveWithViewContainer
];

@NgModule({
  imports: [MdDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    ComponentWithChildViewContainer,
    DialogMock
  ],
}) class DialogTestModule { }

describe("DialogsService", () => {

  let dialog: MdDialog;
  let overlayContainerElement: HTMLElement;
  let testViewContainerRef: ViewContainerRef;
  let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;

  let dialogService: DialogsService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      imports: [MdDialogModule, DialogTestModule],
      providers: [

        DialogsService,
        {provide: OverlayContainer, useFactory: () => {
          overlayContainerElement = document.createElement("div");
          return {getContainerElement: () => overlayContainerElement};
        }}

      ],
    });
    TestBed.compileComponents().then(inject([DialogsService, MdDialog], (service: DialogsService, d: MdDialog) => {

      dialog = d;
      dialogService = service;

    }));

  }));
  beforeEach(() => {
    viewContainerFixture = TestBed.createComponent(ComponentWithChildViewContainer);

    viewContainerFixture.detectChanges();
    testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
  });
  it("should test service", async(() => {

    let dialogRef: MdDialogRef<DialogMock> = dialog.open(DialogMock, { viewContainerRef: testViewContainerRef });
    spyOn(dialog, "open").and.returnValue(dialogRef);
    let afterCloseCallback: any = jasmine.createSpy("afterClose callback");

    dialogService.createModuleDialog(null).subscribe(afterCloseCallback);
    dialogRef.close("test");
    viewContainerFixture.detectChanges();

    viewContainerFixture.whenStable().then(() => {
      expect(afterCloseCallback).toHaveBeenCalledWith("test");
      expect(overlayContainerElement.querySelector("md-dialog-container")).toBeNull();
    });

  }));
  describe("confirmationDialog", () => {

    it("should return an Observable", async(() => {

      let dialogRef: MdDialogRef<DialogMock> = dialog.open(DialogMock, { viewContainerRef: testViewContainerRef });
      spyOn(dialog, "open").and.returnValue(dialogRef);
      let afterCloseCallback: any = jasmine.createSpy("afterClose callback");

      dialogService.confirmationDialog("test", null).subscribe(afterCloseCallback);
      dialogRef.close("test");
      viewContainerFixture.detectChanges();

      viewContainerFixture.whenStable().then(() => {
        expect(afterCloseCallback).toHaveBeenCalledWith("test");
        expect(overlayContainerElement.querySelector("md-dialog-container")).toBeNull();
      });

    }));

  });

});
