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

  // Signature status email
  signatureStatusLoading = false;
  signatureStatusEmailStatus: Record<
    number,
    { success?: string; error?: string }
  > = {};

  // Signing completed email
  signingCompletedLoading = false;
  signingCompletedStatus: Record<number, { success?: string; error?: string }> =
    {};

  // Certificate email
  certEmailLoading = false;
  certEmailStatus: Record<number, { success?: string; error?: string }> = {};

  // Certificate rejection email
  certRejectionLoading = false;
  certRejectionStatus: Record<number, { success?: string; error?: string }> =
    {};

  // Certificate download email
  certDownloadLoading = false;
  certDownloadStatus: Record<number, { success?: string; error?: string }> = {};

  // New admin email
  newAdminLoading = false;
  newAdminStatus: Record<number, { success?: string; error?: string }> = {};

  // New password email
  newPasswordLoading = false;
  newPasswordStatus: Record<number, { success?: string; error?: string }> = {};

  // OTP email
  otpLoading = false;
  otpStatus: Record<number, { success?: string; error?: string }> = {};

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

  sendSignatureStatusEmail(userId: number): void {
    this.signatureStatusLoading = true;
    this.signatureStatusEmailStatus[userId] = {};

    this.userService.sendSignatureStatusEmail(userId).subscribe({
      next: (response: any) => {
        this.signatureStatusEmailStatus[userId] = {
          success: response?.message || "Signature status email sent!",
        };
        this.signatureStatusLoading = false;
        setTimeout(() => {
          delete this.signatureStatusEmailStatus[userId];
        }, 3000);
      },
      error: (err: any) => {
        this.signatureStatusEmailStatus[userId] = {
          error: err?.error?.message || "Failed to send signature status email",
        };
        this.signatureStatusLoading = false;
        console.error("Error sending signature status email:", err);
      },
    });
  }

  sendSigningCompletedEmail(userId: number): void {
    this.signingCompletedLoading = true;
    this.signingCompletedStatus[userId] = {};

    this.userService.sendSigningCompletedEmail(userId).subscribe({
      next: (response: any) => {
        this.signingCompletedStatus[userId] = {
          success: response?.message || "Signing completed email sent!",
        };
        this.signingCompletedLoading = false;
        setTimeout(() => {
          delete this.signingCompletedStatus[userId];
        }, 3000);
      },
      error: (err: any) => {
        this.signingCompletedStatus[userId] = {
          error:
            err?.error?.message || "Failed to send signing completed email",
        };
        this.signingCompletedLoading = false;
        console.error("Error sending signing completed email:", err);
      },
    });
  }

  sendCertEmail(userId: number): void {
    this.certEmailLoading = true;
    this.certEmailStatus[userId] = {};

    this.userService.sendCertificateEmail(userId).subscribe({
      next: (response: any) => {
        this.certEmailStatus[userId] = {
          success: response?.message || "ใบรับรองอิเล็กทรอนิกส์ส่งสำเร็จ!",
        };
        this.certEmailLoading = false;
        setTimeout(() => {
          delete this.certEmailStatus[userId];
        }, 3000);
      },
      error: (err: any) => {
        this.certEmailStatus[userId] = {
          error: err?.error?.message || "ส่งใบรับรองอิเล็กทรอนิกส์ไม่สำเร็จ",
        };
        this.certEmailLoading = false;
        console.error("Error sending certificate email:", err);
      },
    });
  }

  sendCertRejectionEmail(userId: number): void {
    this.certRejectionLoading = true;
    this.certRejectionStatus[userId] = {};

    this.userService.sendCertificateRejectionEmail(userId).subscribe({
      next: (response: any) => {
        this.certRejectionStatus[userId] = {
          success: response?.message || "อีเมลไม่อนุมัติส่งสำเร็จ!",
        };
        this.certRejectionLoading = false;
        setTimeout(() => {
          delete this.certRejectionStatus[userId];
        }, 3000);
      },
      error: (err: any) => {
        this.certRejectionStatus[userId] = {
          error: err?.error?.message || "ส่งอีเมลไม่อนุมัติไม่สำเร็จ",
        };
        this.certRejectionLoading = false;
        console.error("Error sending certificate rejection email:", err);
      },
    });
  }

  sendCertDownloadEmail(userId: number): void {
    this.certDownloadLoading = true;
    this.certDownloadStatus[userId] = {};

    this.userService.sendCertificateDownloadEmail(userId).subscribe({
      next: (response: any) => {
        this.certDownloadStatus[userId] = {
          success: response?.message || "อีเมลดาวน์โหลดใบรับรองส่งสำเร็จ!",
        };
        this.certDownloadLoading = false;
        setTimeout(() => {
          delete this.certDownloadStatus[userId];
        }, 3000);
      },
      error: (err: any) => {
        this.certDownloadStatus[userId] = {
          error: err?.error?.message || "ส่งอีเมลดาวน์โหลดไม่สำเร็จ",
        };
        this.certDownloadLoading = false;
        console.error("Error sending certificate download email:", err);
      },
    });
  }

  sendNewAdminEmail(userId: number): void {
    this.newAdminLoading = true;
    this.newAdminStatus[userId] = {};

    this.userService.sendNewAdminEmail(userId).subscribe({
      next: (response: any) => {
        this.newAdminStatus[userId] = {
          success: response?.message || "อีเมลข้อมูลผู้ใช้งานใหม่ส่งสำเร็จ!",
        };
        this.newAdminLoading = false;
        setTimeout(() => {
          delete this.newAdminStatus[userId];
        }, 3000);
      },
      error: (err: any) => {
        this.newAdminStatus[userId] = {
          error: err?.error?.message || "ส่งอีเมลข้อมูลผู้ใช้งานใหม่ไม่สำเร็จ",
        };
        this.newAdminLoading = false;
        console.error("Error sending new admin email:", err);
      },
    });
  }

  sendNewPasswordEmail(userId: number): void {
    this.newPasswordLoading = true;
    this.newPasswordStatus[userId] = {};

    this.userService.sendNewPasswordEmail(userId).subscribe({
      next: (response: any) => {
        this.newPasswordStatus[userId] = {
          success: response?.message || "อีเมลรหัสผ่านใหม่ส่งสำเร็จ!",
        };
        this.newPasswordLoading = false;
        setTimeout(() => {
          delete this.newPasswordStatus[userId];
        }, 3000);
      },
      error: (err: any) => {
        this.newPasswordStatus[userId] = {
          error: err?.error?.message || "ส่งอีเมลรหัสผ่านใหม่ไม่สำเร็จ",
        };
        this.newPasswordLoading = false;
        console.error("Error sending new password email:", err);
      },
    });
  }

  sendOtpEmail(userId: number): void {
    this.otpLoading = true;
    this.otpStatus[userId] = {};

    this.userService.sendOtpEmail(userId).subscribe({
      next: (response: any) => {
        this.otpStatus[userId] = {
          success: response?.message || "อีเมล OTP ส่งสำเร็จ!",
        };
        this.otpLoading = false;
        setTimeout(() => {
          delete this.otpStatus[userId];
        }, 3000);
      },
      error: (err: any) => {
        this.otpStatus[userId] = {
          error: err?.error?.message || "ส่งอีเมล OTP ไม่สำเร็จ",
        };
        this.otpLoading = false;
        console.error("Error sending OTP email:", err);
      },
    });
  }
}
