// Placeholder for fake data / mock data
// This folder can be used for storing mock API responses during development

export const fakeUsers = [
  {
    id: 1,
    username: 'john.doe',
    email: 'john@example.com',
    roles: ['USER']
  },
  {
    id: 2,
    username: 'jane.smith',
    email: 'jane@example.com',
    roles: ['USER', 'ADMIN']
  }
];

export const fakeAuthResponse = {
  token: 'fake-jwt-token',
  refreshToken: 'fake-refresh-token',
  user: {
    id: 1,
    username: 'john.doe',
    email: 'john@example.com',
    roles: ['USER']
  }
};
