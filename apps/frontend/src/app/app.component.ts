import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isScreenWide = window.innerWidth > 768;
  title = 'portfolio';

  menuItems = [
    { icon: 'home', label: 'Home', routerLink: '/' },
    { icon: 'table_chart', label: 'Table', routerLink: '/table' },
    { icon: 'bar_chart', label: 'Data Visualization', routerLink: '/data-visualization' },
    { icon: 'restaurant', label: 'Peasant Kitchen', routerLink: '/peasant-kitchen' },
    { icon: 'movie', label: 'Movies', routerLink: '/space-video' }
  ];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isScreenWide = window.innerWidth > 768;
  }
}