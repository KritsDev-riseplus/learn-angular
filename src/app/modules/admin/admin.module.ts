import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin-routing.module";
import { UserManagementComponent } from "./user-management/user-management.component";

@NgModule({
  declarations: [UserManagementComponent],
  imports: [CommonModule, FormsModule, AdminRoutingModule],
})
export class AdminModule {}
