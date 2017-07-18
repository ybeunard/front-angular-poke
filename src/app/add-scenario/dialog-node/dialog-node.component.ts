import { Component, EventEmitter } from "@angular/core";

@Component({
  selector: "app-dialog-node",
  templateUrl: "./dialog-node.component.html",
  styleUrls: ["./dialog-node.component.scss"]
})
export class DialogNodeComponent {

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

  onResetLabel() {

    this.label = "";

  }

  onResetArgs() {

    this.args = "";

  }

  onStarterTask() {

    this.starter.emit();

  }

  onDeleteSuccess() {

    this.deleteSuccess.emit();

  }

  onDeleteError() {

    this.deleteError.emit();

  }

  onSuccessLink() {

    this.success.emit();

  }

  onErrorLink() {

    this.error.emit();

  }

  onSubmit() {

    this.submit.emit({label: this.label, args: this.args});

  }

  onCancelAction() {

    this.cancelAction.emit();

  }

  onDelete() {

    this.deleted.emit();

  }

  onClickedExit() {
    this.close.emit();
  }

}
