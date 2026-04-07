import { Component, OnInit } from "@angular/core";
import { UserService, User } from "@services/user.service";

@Component({
  selector: "app-users",
  template: `
    <div class="users-page">
      <h1 class="page-title">Users Management</h1>
      <div class="users-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.roleName }}</td>
              <td>
                <button class="btn-edit">Edit</button>
                <button class="btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
      .users-page {
        padding: 1rem;
      }

      .page-title {
        margin-bottom: 1.5rem;
        color: #333;
      }

      .users-table {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
      }

      th {
        background: #f5f5f5;
        font-weight: 600;
        color: #333;
      }

      .badge {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        background: #3498db;
        color: #fff;
        border-radius: 4px;
        font-size: 0.75rem;
        margin-right: 0.25rem;
      }

      .btn-edit,
      .btn-delete {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 0.5rem;
      }

      .btn-edit {
        background: #3498db;
        color: #fff;
      }

      .btn-delete {
        background: #e74c3c;
        color: #fff;
      }
    `,
  ],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error("Error loading users:", error);
      },
    });
  }
}
