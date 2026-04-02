import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="header-brand">
        <span class="brand-logo">TDID</span>
      </div>
      <div class="header-actions">
        <button class="btn-action">Profile</button>
        <button class="btn-action">Logout</button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1.5rem;
      background: #fff;
      border-bottom: 1px solid #e0e0e0;
      height: 60px;
    }
    
    .header-brand {
      display: flex;
      align-items: center;
    }
    
    .brand-logo {
      font-size: 1.25rem;
      font-weight: bold;
      color: #333;
    }
    
    .header-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .btn-action {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      background: #f5f5f5;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .btn-action:hover {
      background: #e0e0e0;
    }
  `]
})
export class HeaderComponent { }
