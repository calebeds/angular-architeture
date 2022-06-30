// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'default',
  firebase: {
    config: {
      apiKey: 'AIzaSyC8kWl15LoKEZtHqa2y82Avy4t3v3NhgBc',
      authDomain: 'courseapp-e6af5.firebaseapp.com',
      projectId: 'courseapp-e6af5',
      storageBucket: 'courseapp-e6af5.appspot.com',
      messagingSenderId: '218938794098',
      appId: '1:218938794098:web:4b6b5343a923822e4962eb',
    },
    actionCodeSettings: {
      url: 'http://localhost:5200/demo',
      handleCodeInApp: true,
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
