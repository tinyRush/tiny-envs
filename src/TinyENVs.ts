import * as path from 'path';
import * as fs from 'fs';
import { TinyENVsOptions } from '../index';

function load(options?: TinyENVsOptions) {
  let filePaths = createEnvFilePath(options);
  loadENVs(filePaths.envGeneralFilePath);
  loadENVs(filePaths.envFilePath);
}

export { load }

function createEnvFilePath(options: TinyENVsOptions) {
  options = options || {};
  let envKey = options.envKey || 'NODE_ENV';
  let envDefault = options.envDefault || 'development';
  process.env[envKey] = process.env[envKey] || envDefault;
  let envFileName = `${process.env[envKey]}.json`;
  let envGeneralFileName = `${options.envGeneralFileName || 'general'}.json`;
  let envFolder = options.envFolder || 'envs';
  let envGeneralFilePath = path.resolve('.', envFolder, envGeneralFileName);
  let envFilePath = path.resolve('.', envFolder, envFileName);

  return {
    envGeneralFilePath: envGeneralFilePath,
    envFilePath: envFilePath
  };
}

function loadENVs(envFilePath: string) {
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
