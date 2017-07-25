import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateModuleDialogComponent } from "./create-module-dialog.component";

describe("CreateModuleDialogComponent", () => {
  let component: CreateModuleDialogComponent;
  let fixture: ComponentFixture<CreateModuleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateModuleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateModuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
