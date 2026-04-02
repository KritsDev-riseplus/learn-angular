import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsersComponent } from "./users/users.component";
import { SettingsComponent } from "./settings/settings.component";

@NgModule({
  declarations: [DashboardComponent, UsersComponent, SettingsComponent],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class PagesModule {}
