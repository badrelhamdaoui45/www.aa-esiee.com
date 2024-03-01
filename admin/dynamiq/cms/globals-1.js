const DB = 'esiee';
const _GET = [];
const CORE_LASTUPDATE_GLOBAL = '20240122-1';
const CORE_LASTUPDATE = '20220809';
const DOMAIN = 'www.aa-esiee.com';
const ENV = 'PROD';
const ACTIVE_RAYGUN = DB == 'astec' || ENV == 'dev' ? true : false;
const DOMAIN_NAME = location.protocol + '//' + location.host