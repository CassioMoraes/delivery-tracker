import { Component } from '@angular/core';
import { User } from './shared/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tracking-timeline-ui';
  parentUser: User;
}
