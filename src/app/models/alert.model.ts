export class Alert {
  constructor(
    public icon: string,
    public type: 'error' | 'success',
    public title: string,
    public message: string
  ) {}
}
