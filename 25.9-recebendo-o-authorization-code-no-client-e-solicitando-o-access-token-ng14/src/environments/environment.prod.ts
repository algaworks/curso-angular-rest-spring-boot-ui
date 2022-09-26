export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api.herokuapp.com',
  tokenAllowedDomains: [ /algamoney-api.herokuapp.com/ ],
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  oauthCallbackUrl: 'https:/algamoney-app.herokuapp.com/authorized'
  
  // apiUrl: 'http://localhost:8080',
  // tokenAllowedDomains: [/localhost:8080/],
  // tokenDisallowedRoutes: [/\/oauth\/token/],
  // oauthCallbackUrl: 'https://oidcdebugger.com/debug'
};