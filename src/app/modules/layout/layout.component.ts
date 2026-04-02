import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>
      <div class="layout-container">
        <app-sidebar></app-sidebar>
        <div class="layout-content">
          <app-content></app-content>
          <app-footer></app-footer>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .layout-container {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    
    .layout-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
  `]
})
export class LayoutComponent { }
