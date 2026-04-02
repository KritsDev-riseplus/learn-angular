import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { User } from '@services/user.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <h1 class="page-title">Dashboard</h1>
      <div class="dashboard-cards">
        <div class="card">
          <h3>Total Users</h3>
          <p class="card-value">{{ totalUsers }}</p>
        </div>
        <div class="card">
          <h3>Active Sessions</h3>
          <p class="card-value">0</p>
        </div>
        <div class="card">
          <h3>System Status</h3>
          <p class="card-value status-ok">OK</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 1rem;
    }
    
    .page-title {
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    .dashboard-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    
    .card {
      background: #fff;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .card h3 {
      margin: 0 0 0.5rem 0;
      color: #666;
      font-size: 0.875rem;
    }
    
    .card-value {
      margin: 0;
      font-size: 2rem;
      font-weight: bold;
      color: #333;
    }
    
    .status-ok {
      color: #27ae60;
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalUsers = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.totalUsers = users.length;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }
}
