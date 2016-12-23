import { Component, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef) {
    overlay.defaultViewContainer = viewContainerRef;
  }
}
