export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api.herokuapp.com',

  tokenAllowedlistedDomains: [ /algamoney-api.herokuapp.com/ ],
  tokenDisallowedlistedRoutes: [/\/oauth\/token/]
};
