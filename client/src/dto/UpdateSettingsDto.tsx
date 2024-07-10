export class UpdateSettingsDto {
  constructor(allowEmailAlert: boolean) {

    this.allowEmailAlert = allowEmailAlert
  }

  allowEmailAlert: boolean | undefined


}