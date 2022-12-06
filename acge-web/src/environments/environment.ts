// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const backendPort = ':8000';
export const backendProtocol = 'http://';
export const backendDomain = 'localhost';
export const backendUrl = `${backendProtocol}${backendDomain}${backendPort}`;
export const environment = {
  production: false,
  listFarms: backendUrl + '/api/v1/farms/',
  listBestFarms: backendUrl + '/api/v1/farms/best_farms/',
  listWorstFarms: backendUrl + '/api/v1/farms/worst_farms/',
  uploadCsvFarms: backendUrl + '/api/v1/farms/upload_csv/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
