import mysql, { PoolOptions } from "mysql2/promise";

import { buildDatabaseConfiguration } from "../configurations";
import { DatabaseConfiguration } from "../configurations/types";

function _buildPoolOptions(
  dabaseConfiguration: DatabaseConfiguration,
): PoolOptions {
  return {
    database: dabaseConfiguration.database,
    host: dabaseConfiguration.host,
    password: dabaseConfiguration.password,
    port: dabaseConfiguration.port,
    user: dabaseConfiguration.user,
  };
}

function buildPool() {
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

export { buildPool as createPool, testConnnection };
