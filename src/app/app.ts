import { Component, signal } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [NavComponent, RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('frontend-angular');
}
