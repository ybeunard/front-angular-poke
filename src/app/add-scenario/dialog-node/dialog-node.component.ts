import { Component, EventEmitter } from "@angular/core";

@Component({

  selector: "app-dialog-node",
  templateUrl: "./dialog-node.component.html",
  styleUrls: ["./dialog-node.component.scss"]

}) export class DialogNodeComponent {

  // event emitter to communicate with the add-scenario component
  starter: EventEmitter<any> = new EventEmitter();
  success: EventEmitter<any> = new EventEmitter();
  deleteSuccess: EventEmitter<any> = new EventEmitter();
  error: EventEmitter<any> = new EventEmitter();
  deleteError: EventEmitter<any> = new EventEmitter();
  cancelAction: EventEmitter<any> = new EventEmitter();
  submit: EventEmitter<any> = new EventEmitter();
  deleted: EventEmitter<any> = new EventEmitter();
  close: EventEmitter<any> = new EventEmitter();

  label: string = "";
  args: string = "";
  argsHelper: string = "";
  starterTask: boolean = false;
  successLabel: string = null;
  successLink: boolean = false;
  errorLabel: string = null;
  errorLink: boolean = false;

  public onResetLabel() {

    this.label = "";

  }

  public onResetArgs() {

    this.args = "";

  }

  public onStarterTask() {

    this.starter.emit();

  }

  public onDeleteSuccess() {

    this.deleteSuccess.emit();

  }

  public onDeleteError() {

    this.deleteError.emit();

  }

  public onSuccessLink() {

    this.success.emit();

  }

  public onErrorLink() {

    this.error.emit();

  }

  public onSubmit() {

    this.submit.emit({label: this.label, args: this.args});

  }

  public onCancelAction() {

    this.cancelAction.emit();

  }

  public onDelete() {

    this.deleted.emit();

  }

  public onClickedExit() {
    this.close.emit();
  }

}
