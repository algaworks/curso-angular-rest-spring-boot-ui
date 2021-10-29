// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  tokenAllowedDomains: [ /localhost:8080/ ],
  tokenDisallowedRoutes: [/\/oauth2\/token/],
  oauthCallbackUrl: 'http://local-algamoney.com:8000/authorized'
};

