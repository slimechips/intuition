import path from 'path';
import fs from 'fs';

/**
 * Sets the App path of the project
 * @param appPath (optional) Declare a custom app path for the project
 */
export const setAppDir = (appPath: string = '') => {
  let finalPath: string;
  if (appPath === '') {
    console.log(__dirname);
    finalPath = path.join(__dirname, '..', '..');
  } else {
    finalPath = path.join(__dirname, '..', appPath);
  }
  return finalPath;
};

export const appDir: string = setAppDir(process.env.SVC);

/**
 * Gets the config file
 * @param environment the node env
 */
const getConfig = (environment: string = 'development') => {
  const configPath = path.join(appDir, 'config', `${environment}.json`);
  const cfg = JSON.parse(fs.readFileSync(configPath).toString());
  console.info(`${cfg.service} Config File: ${configPath}`);
  return cfg;
};

export const cfg = getConfig(process.env.NODE_ENV);

/**
 * Gets the endponts from endpoint config file
 * @param endpCfgPath Custom endpoint config path
 */
const getEndpoints = (endpCfgPath: string = '') => {
  let finalPath: string;
  if (endpCfgPath === '') {
    finalPath = path.join(appDir, cfg.endpoints_file);
  } else {
    finalPath = path.join(appDir, endpCfgPath);
  }
  console.info(`Endpoints configuration file: ${finalPath}`);
  const endpoints = JSON.parse(fs.readFileSync(finalPath).toString());


  Object.keys(endpoints).forEach((service) => {
    if (process.env.NODE_ENV === 'development') {
      endpoints[service].host = endpoints[service].local_host;
    }
    endpoints[service].full_url = `http://${endpoints[service].host}`
    + `:${endpoints[service].http_port}${endpoints[service].path}`;
  });

  return endpoints;
};

export const endpoints = getEndpoints();
