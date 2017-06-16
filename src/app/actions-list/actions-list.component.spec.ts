import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MdListModule } from "@angular/material";

import { ActionsService } from "../service/actions.service";
import { ActionsServiceMock} from "../service/action.service.mock";

import { ActionsListComponent } from "./actions-list.component";

describe("ActionsListComponent", () => {

  let fixture: ComponentFixture<ActionsListComponent>;
  let component: any;
  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [ ActionsListComponent ],
      imports: [ MdListModule ],
      providers: [
        { provide: ActionsService, useClass: ActionsServiceMock }
      ]

    }).compileComponents().then(() => {

      fixture = TestBed.createComponent(ActionsListComponent);
      component = fixture.debugElement.componentInstance;

    });

  }));
  it("should be created", () => {

    expect(component).toBeTruthy();

  });

});
