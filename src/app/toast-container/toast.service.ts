import { Injectable, signal } from '@angular/core';

export interface Toast {
    text: string;
    classname: string;
    delay?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    readonly toasts = signal<Toast[]>([]);

    show(
        text: string,
        classname = 'success',
        delay = 5000
    ) {
        this.toasts.update((value) => [
            ...value,
            {
                text,
                classname,
                delay
            }
        ]);
    }

    remove(toast: Toast) {
        this.toasts.update((value) =>
            value.filter((t) => t !== toast)
        );
    }

    success(message: string) {
        this.show(message, 'success');
    }

    error(message: string) {
        this.show(message, 'danger');
    }

    info(message: string) {
        this.show(message, 'info');
    }
}