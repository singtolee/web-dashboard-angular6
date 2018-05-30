// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAt4JqhPWFqgn4Voc971zIR1nzQ9XMpKAo",
    authDomain: "restock-helper.firebaseapp.com",
    databaseURL: "https://restock-helper.firebaseio.com",
    projectId: "restock-helper",
    storageBucket: "restock-helper.appspot.com",
    messagingSenderId: "966464179859"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
