import mysql, { PoolOptions } from "mysql2/promise";
import { DatabaseConfiguration } from "../configurations/types";
import {
  buildDatabaseConfiguration,
} from "../configurations";

function _buildPoolOptions(
  dabaseConfiguration: DatabaseConfiguration
): PoolOptions {
  return {
    host: dabaseConfiguration.host,
    database: dabaseConfiguration.database,
    password: dabaseConfiguration.password,
    port: dabaseConfiguration.port,
    user: dabaseConfiguration.user,
  };
}

function createPool() {
  const configuration = buildDatabaseConfiguration();
  const poolOptions = _buildPoolOptions(configuration);
  return mysql.createPool(poolOptions);
}

async function testConnnection(dabaseConfiguration: DatabaseConfiguration) {
  const poolOptions = _buildPoolOptions(dabaseConfiguration);
  const pool = mysql.createPool(poolOptions);
  const tables = await pool.execute("SHOW TABLES");
  console.log(tables);
}

export { createPool, testConnnection };
