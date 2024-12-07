import {
  ApplicationConfiguration,
  DatabaseConfiguration,
} from "./types";

function buildApplicationConfiguration(): ApplicationConfiguration {
  return {
    port: _getEnvironmentVariable("APPLICATION_PORT"),
  };
}

export function buildDatabaseConfiguration(): DatabaseConfiguration {
  return {
    database: _getEnvironmentVariable("MYSQL_DATABASE_DATABASE"),
    host: _getEnvironmentVariable("MYSQL_DATABASE_HOST"),
    password: _getEnvironmentVariable("MYSQL_DATABASE_PASSWORD"),
    port: _getEnvironmentVariable("MYSQL_DATABASE_PORT"),
    user: _getEnvironmentVariable("MYSQL_DATABASE_USER"),
  };
}

function _getEnvironmentVariable<T>(key: string): T {
  const variable = process.env[key] as T | undefined;

  if (!variable) {
    throw new Error(`${key} is undefined on .env file`);
  }

  return variable;
}

export function buildConfigurations() {
  return {
    application: buildApplicationConfiguration(),
    database: buildDatabaseConfiguration(),
  };
}
