export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  tokenAllowedDomains: [/localhost:8080/],
  tokenDisallowedRoutes: [/\/oauth\/token/],
};