import { Component, OnInit } from "@angular/core";
import { UserService, User } from "../../../services/user.service";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrl: "./user-management.component.scss",
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = "";

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.loading = false;
      },
      error: (err: unknown) => {
        this.error = "Failed to load users";
        this.loading = false;
        console.error("Error loading users:", err);
      },
    });
  }

  deleteUser(id: number): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err: unknown) => {
          alert("Failed to delete user");
          console.error("Error deleting user:", err);
        },
      });
    }
  }
}
