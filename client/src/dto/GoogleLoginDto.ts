export class GoogleLoginDto {
    googleToken: string

    constructor(googleToken: string) {
        this.googleToken = googleToken
    }
}