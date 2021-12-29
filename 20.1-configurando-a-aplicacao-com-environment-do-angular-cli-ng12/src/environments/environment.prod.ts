export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api.herokuapp.com',
  tokenAllowedDomains: [ /algamoney-api.herokuapp.com/ ],
  tokenDisallowedRoutes: [/\/oauth\/token/],
};
