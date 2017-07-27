import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateActionDialogComponent } from "./create-action-dialog.component";

describe("CreateActionDialogComponent", () => {
  let component: CreateActionDialogComponent;
  let fixture: ComponentFixture<CreateActionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
