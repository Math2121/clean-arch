export type NotificationErrorProps = {
    message: string,
    context: string,
}

export class Notification {
    private errors: NotificationErrorProps[] = [];
    public addError(error: NotificationErrorProps): void {
        this.errors.push(error);
    }

    public messages(context?: string): string {
        return this.errors.filter(error => error.context === context || context === undefined)
        .map(error => `${error.context}: ${error.message}`)
        .join(', ');
    }

    public hasErrors(): boolean {
        return this.errors.length > 0;
    }

    public clearErrors(): void {
        this.errors = [];
    }

    getErrors(): NotificationErrorProps[] {
        return this.errors;
    }
}