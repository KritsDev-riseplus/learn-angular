import { Component, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = "";
  isLoading = false;
  showRegister = false;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      fullName: ["", []],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    console.log("🔐 Submitting login form...");
    if (this.loginForm.invalid) {
      console.log("❌ Form is invalid");
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log("✅ Form is valid, proceeding with login");
    this.isLoading = true;
    this.errorMessage = "";

    const credentials = this.loginForm.value;
    console.log("📤 Login credentials:", credentials);

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log("✅ Login successful:", response);
        this.isLoading = false;
        if (this.authService.isAdmin()) {
          this.router.navigate(["/admin"]);
        } else {
          this.router.navigate(["/dashboard"]);
        }
      },
      error: (error) => {
        console.error("❌ Login error:", error);
        this.isLoading = false;
        this.errorMessage = "Username or password is incorrect!";
      },
    });
  }

  onRegister(): void {
    console.log("📝 Submitting register form...");
    if (this.registerForm.invalid) {
      console.log("❌ Register form is invalid");
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = "";

    const registerData = this.registerForm.value;
    console.log("📤 Register data:", registerData);

    // TODO: Call register API
    console.log("Register:", registerData);

    this.isLoading = false;
    this.showRegister = false;
    this.cd.detectChanges();
  }

  toggleForm(): void {
    console.log("🔄 Toggling form... Current showRegister:", this.showRegister);
    this.showRegister = !this.showRegister;
    console.log("🔄 New showRegister:", this.showRegister);
    this.errorMessage = "";
    this.cd.detectChanges();
    console.log("🔄 Change detection triggered");
  }

  showRegisterForm(): void {
    console.log("🔄 Showing register form...");
    this.showRegister = true;
    this.errorMessage = "";
    this.cd.detectChanges();
    console.log(
      "🔄 Change detection triggered, showRegister =",
      this.showRegister,
    );
  }

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }

  get registerUsername() {
    return this.registerForm.get("username");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get fullName() {
    return this.registerForm.get("fullName");
  }

  get registerPassword() {
    return this.registerForm.get("password");
  }
}
