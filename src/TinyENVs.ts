import * as path from 'path';
import * as fs from 'fs';
import { TinyENVsOptions } from '../index';

function TinyENVs(options?: TinyENVsOptions) {
  let envFilePath = _createEnvFilePath(options);
  _loadENVs(envFilePath);
}

export { TinyENVs };

function _createEnvFilePath(options: TinyENVsOptions) {
  options = options || {};
  let envKey = options.envKey || 'NODE_ENV';
  let envDefault = options.envDefault || 'development';
  process.env[envKey] = process.env[envKey] || envDefault;
  let envFolder = options.envFolder || 'envs';
  let envFileName = `${process.env[envKey]}.json`;
  let envFilePath = path.resolve('.', envFolder, envFileName);

  return envFilePath;
}

function _loadENVs(envFilePath: string) {
  let data = fs.readFileSync(envFilePath);
  try {
    let envOptions = JSON.parse(data.toString());
    for (var key in envOptions) {
      if (envOptions.hasOwnProperty(key)) {
        process.env[key] = envOptions[key];
      }
    }
  } catch (parsedError) {
    throw new Error(
      `"${envFilePath}" is not a valid JSON file: ${parsedError.message}`
    );
  }
}
