import { Component, signal } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer/footer';
import { ToastContainer } from './toast-container/toast-container';

@Component({
    selector: 'app-root',
    imports: [NavComponent, ToastContainer, Footer, RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend-angular');
}
