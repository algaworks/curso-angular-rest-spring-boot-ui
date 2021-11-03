export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api.herokuapp.com',
  tokenAllowedDomains: [ /algamoney-api.herokuapp.com/ ],
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  oauthCallbackUrl: 'https:/algamoney-app.herokuapp.com/authorized'
};
