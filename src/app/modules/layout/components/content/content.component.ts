import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .content {
      flex: 1;
      padding: 1.5rem;
      background: #f5f5f5;
      min-height: calc(100vh - 120px);
    }
  `]
})
export class ContentComponent { }
