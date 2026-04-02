# TDID Web - Angular Frontend

Angular frontend application for TDID Learning Platform, designed to consume APIs from the Java Spring Boot backend.

## Project Structure

```
learn-angular/
├── src/
│   ├── app/
│   │   ├── _fake/              # Mock data for development
│   │   ├── _metronic/          # Metronic UI theme components
│   │   ├── interceptors/       # HTTP interceptors (API, Error)
│   │   ├── modules/            # Feature modules
│   │   │   └── layout/         # Layout module (Header, Sidebar, Footer)
│   │   ├── pages/              # Page components
│   │   │   ├── dashboard/      # Dashboard page
│   │   │   ├── users/          # Users management page
│   │   │   └── settings/       # Settings page
│   │   ├── services/           # Angular services
│   │   │   ├── http.service.ts       # Base HTTP service
│   │   │   ├── auth.service.ts       # Authentication service
│   │   │   └── user.service.ts       # User service
│   │   ├── shared/             # Shared utilities and constants
│   │   ├── app.component.ts    # Root component
│   │   ├── app.module.ts       # Root module
│   │   └── app-routing.module.ts # Root routing
│   ├── assets/                 # Static assets
│   │   ├── css/
│   │   ├── fonts/
│   │   ├── media/
│   │   ├── plugins/
│   │   └── sass/
│   ├── environments/           # Environment configurations
│   │   ├── environment.ts      # Development environment
│   │   └── environment.prod.ts # Production environment
│   ├── utils/                  # Utility functions
│   │   └── set-error.validator.ts
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.scss
│   └── typings.d.ts
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Java Spring Boot backend running on `http://localhost:8080`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment (if needed):
   - Edit `src/environments/environment.ts` for development
   - Edit `src/environments/environment.prod.ts` for production

## Development Server

Run the development server:
```bash
npm start
```

Navigate to `http://localhost:3000`. The app will automatically reload if you change any of the source files.

## API Integration

### Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get user by ID |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/{id}` | Update user by ID |
| DELETE | `/api/users/{id}` | Delete user by ID |

### Services

- **HttpService**: Base HTTP client service with common methods (GET, POST, PUT, PATCH, DELETE)
- **AuthService**: Handles authentication (login, logout, refresh token)
- **UserService**: Manages user operations (CRUD)

### Interceptors

- **ApiInterceptor**: Automatically prefixes all HTTP requests with the API URL
- **ErrorInterceptor**: Centralized error handling for HTTP requests

## Build

Build the project for production:
```bash
npm run build
```

Production builds are optimized and minified. The output is placed in the `dist/` directory.

## Code Scaffolding

Generate a new component:
```bash
ng generate component component-name
```

Generate a new service:
```bash
ng generate service service-name
```

## Running Tests

Execute unit tests:
```bash
npm test
```

## CORS Configuration

The backend is configured to accept CORS requests from `http://localhost:3000`. If you change the development server port, update the CORS configuration in the Spring Boot application (`WebConfig.java`).

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `apiUrl` | Backend API base URL | `http://localhost:8080/api` |
| `appUrl` | Frontend app URL | `http://localhost:3000` |
| `production` | Production mode flag | `false` |

## License

This project is part of the TDID Learning Platform.
