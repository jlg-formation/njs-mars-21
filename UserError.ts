export class UserError extends Error {
  constructor(msg: string) {
    console.log("creating user error");
    super(msg);
    Object.setPrototypeOf(this, UserError.prototype);
  }
}
