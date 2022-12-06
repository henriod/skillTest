export const backendPort = ':8008';
export const backendProtocol = 'http://';
export const backendDomain = '0.0.0.0';
export const backendUrl = `${backendProtocol}${backendDomain}${backendPort}`;
export const environment = {
  production: true,
  listFarms: backendUrl + '/api/v1/farms/',
  listBestFarms: backendUrl + '/api/v1/farms/best_farms/',
  listWorstFarms: backendUrl + '/api/v1/farms/worst_farms/',
  uploadCsvFarms: backendUrl + '/api/v1/farms/upload_csv/',
};
