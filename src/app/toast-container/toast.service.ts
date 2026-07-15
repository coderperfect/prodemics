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
    readonly toasts = signal<any[]>([]);

    show(text: string, classname = 'bg-success text-light', delay = 5000) {
        this.toasts.update((value) => [...value, { text, classname, delay }]);
    }

    remove(toast: any) {
        this.toasts.update((value) =>
            value.filter((t) => t !== toast)
        );
    }

    success(message: string) {
        this.show(message, 'bg-success text-light');
    }

    error(message: string) {
        this.show(message, 'bg-danger text-light');
    }

    info(message: string) {
        this.show(message, 'bg-primary text-light');
    }
}