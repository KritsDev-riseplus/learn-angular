import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  template: `
    <div class="settings-page">
      <h1 class="page-title">Settings</h1>
      <div class="settings-card">
        <h2>General Settings</h2>
        <form class="settings-form">
          <div class="form-group">
            <label>Application Name</label>
            <input type="text" value="TDID Web" class="form-control">
          </div>
          <div class="form-group">
            <label>API Endpoint</label>
            <input type="text" value="http://localhost:8080/api" class="form-control">
          </div>
          <button type="submit" class="btn-save">Save Changes</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .settings-page {
      padding: 1rem;
    }
    
    .page-title {
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    .settings-card {
      background: #fff;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    h2 {
      margin-bottom: 1.5rem;
      color: #333;
      font-size: 1.25rem;
    }
    
    .settings-form {
      max-width: 500px;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
      font-weight: 500;
    }
    
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .btn-save {
      padding: 0.75rem 1.5rem;
      background: #3498db;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
    
    .btn-save:hover {
      background: #2980b9;
    }
  `]
})
export class SettingsComponent { }
