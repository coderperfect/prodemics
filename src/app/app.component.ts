import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NavComponent, RouterOutlet]
})
export class AppComponent {
  title = 'frontend-angular';
}
