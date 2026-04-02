import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="footer-content">
        <span>&copy; {{ currentYear }} TDID. All rights reserved.</span>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #fff;
      border-top: 1px solid #e0e0e0;
      padding: 1rem 1.5rem;
      height: 60px;
    }
    
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666;
      font-size: 0.875rem;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
