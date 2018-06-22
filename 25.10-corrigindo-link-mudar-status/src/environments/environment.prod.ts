export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api.herokuapp.com',

  tokenWhitelistedDomains: [ /algamoney-api.herokuapp.com/ ],
  tokenBlacklistedRoutes: [/\/oauth\/token/]
};
