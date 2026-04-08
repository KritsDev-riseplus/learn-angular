import { Component, OnInit } from "@angular/core";
import {
  UserService,
  User,
  UpdateUserRequest,
} from "../../../services/user.service";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrl: "./user-management.component.scss",
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = "";

  // Edit dialog state
  showEditDialog = false;
  editUser: User | null = null;
  editForm: UpdateUserRequest = {};
  editError = "";

  // Email dialog state
  showEmailDialog = false;
  emailUser: User | null = null;
  emailForm = { subject: "", content: "" };
  emailError = "";
  emailSuccess = "";

  // Payment email
  paymentEmailLoading = false;
  paymentEmailStatus: Record<number, { success?: string; error?: string }> = {};

  // Application review email
  appReviewEmailLoading = false;
  appReviewEmailStatus: Record<number, { success?: string; error?: string }> =
    {};

  // Application confirmation email
  appConfirmEmailLoading = false;
  appConfirmEmailStatus: Record<number, { success?: string; error?: string }> =
    {};

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

  openEditDialog(user: User): void {
    this.editUser = user;
    this.editForm = {
      email: user.email,
      fullName: user.fullName,
      roleName: user.roleName,
    };
    this.editError = "";
    this.showEditDialog = true;
  }

  closeEditDialog(): void {
    this.showEditDialog = false;
    this.editUser = null;
    this.editForm = {};
  }

  saveEdit(): void {
    if (!this.editUser) return;

    this.userService.updateUser(this.editUser.id, this.editForm).subscribe({
      next: (updatedUser: User) => {
        const index = this.users.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.closeEditDialog();
      },
      error: (err: any) => {
        this.editError = err?.error?.message || "Failed to update user";
        console.error("Error updating user:", err);
      },
    });
  }

  deleteUser(id: number): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err: any) => {
          alert(err?.error?.message || "Failed to delete user");
          console.error("Error deleting user:", err);
        },
      });
    }
  }

  // Email methods
  openEmailDialog(user: User): void {
    this.emailUser = user;
    this.emailForm = { subject: "", content: "" };
    this.emailError = "";
    this.emailSuccess = "";
    this.showEmailDialog = true;
  }

  closeEmailDialog(): void {
    this.showEmailDialog = false;
    this.emailUser = null;
  }

  sendEmail(): void {
    if (!this.emailUser || !this.emailForm.subject || !this.emailForm.content) {
      this.emailError = "Please fill in all fields";
      return;
    }

    this.userService
      .sendEmail(
        this.emailUser.id,
        this.emailForm.subject,
        this.emailForm.content,
      )
      .subscribe({
        next: (response: any) => {
          this.emailSuccess = response?.message || "Email sent successfully!";
          this.emailError = "";
          setTimeout(() => this.closeEmailDialog(), 2000);
        },
        error: (err: any) => {
          this.emailError = err?.error?.message || "Failed to send email";
          this.emailSuccess = "";
          console.error("Error sending email:", err);
        },
      });
  }

  sendPaymentEmail(userId: number): void {
    this.paymentEmailLoading = true;
    this.paymentEmailStatus[userId] = {};

    this.userService.sendPaymentEmail(userId).subscribe({
      next: (response: any) => {
        this.paymentEmailStatus[userId] = {
          success: response?.message || "Payment email sent!",
        };
        this.paymentEmailLoading = false;
        setTimeout(() => {
          delete this.paymentEmailStatus[userId];
        }, 3000);
      },
      error: (err: any) => {
        this.paymentEmailStatus[userId] = {
          error: err?.error?.message || "Failed to send payment email",
        };
        this.paymentEmailLoading = false;
        console.error("Error sending payment email:", err);
      },
    });
  }

  sendApplicationReviewEmail(userId: number): void {
    this.appReviewEmailLoading = true;
    this.appReviewEmailStatus[userId] = {};

    this.userService.sendApplicationReviewEmail(userId).subscribe({
      next: (response: any) => {
        this.appReviewEmailStatus[userId] = {
          success: response?.message || "Application review email sent!",
        };
        this.appReviewEmailLoading = false;
        setTimeout(() => {
          delete this.appReviewEmailStatus[userId];
        }, 3000);
      },
      error: (err: any) => {
        this.appReviewEmailStatus[userId] = {
          error:
            err?.error?.message || "Failed to send application review email",
        };
        this.appReviewEmailLoading = false;
        console.error("Error sending application review email:", err);
      },
    });
  }

  sendApplicationConfirmationEmail(userId: number): void {
    this.appConfirmEmailLoading = true;
    this.appConfirmEmailStatus[userId] = {};

    this.userService.sendApplicationConfirmationEmail(userId).subscribe({
      next: (response: any) => {
        this.appConfirmEmailStatus[userId] = {
          success: response?.message || "Application confirmation email sent!",
        };
        this.appConfirmEmailLoading = false;
        setTimeout(() => {
          delete this.appConfirmEmailStatus[userId];
        }, 3000);
      },
      error: (err: any) => {
        this.appConfirmEmailStatus[userId] = {
          error:
            err?.error?.message ||
            "Failed to send application confirmation email",
        };
        this.appConfirmEmailLoading = false;
        console.error("Error sending application confirmation email:", err);
      },
    });
  }
}
