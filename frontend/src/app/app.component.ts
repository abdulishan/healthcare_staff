import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicComponent } from './component/public/public.component';
import { HeaderComponent } from './common/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'healthcare-patient-portal';
}
