import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="sidebar">
      <nav class="sidebar-nav">
        <ul class="nav-menu">
          <li class="nav-item">
            <a routerLink="/dashboard" class="nav-link">Dashboard</a>
          </li>
          <li class="nav-item">
            <a routerLink="/users" class="nav-link">Users</a>
          </li>
          <li class="nav-item">
            <a routerLink="/settings" class="nav-link">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background: #2c3e50;
      color: #fff;
      overflow-y: auto;
    }
    
    .sidebar-nav {
      padding: 1rem 0;
    }
    
    .nav-menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .nav-item {
      margin: 0;
    }
    
    .nav-link {
      display: block;
      padding: 0.75rem 1.5rem;
      color: #ecf0f1;
      text-decoration: none;
      transition: background 0.3s;
    }
    
    .nav-link:hover {
      background: #34495e;
      color: #fff;
    }
    
    .nav-link.router-link-active {
      background: #3498db;
    }
  `]
})
export class SidebarComponent { }
