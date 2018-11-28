///// ASYNCSTORAGE
export const TOKEN = 'book-management-app-token'
/////
const isProduction = true
const production = {
  baseUrl: 'http://test.incenplus.com:5000',
  gmap:'',
};
const development = {
  baseUrl: 'http://test.incenplus.com:5000',
  gmap:'',
};
export const environment = isProduction ? production : development
