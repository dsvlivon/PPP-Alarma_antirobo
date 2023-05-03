import { Component } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  constructor(private platform: Platform) {}

  initializeApp() {

  }
}
