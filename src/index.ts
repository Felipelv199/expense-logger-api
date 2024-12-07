import buildApp from "./app";
import { buildConfigurations } from "./configurations";
import { testConnnection } from "./database";

async function startApp() {
  const { application, database } = buildConfigurations();
  const app = buildApp();

  try {
    await testConnnection(database);
    console.log("Database stablished connection");
  } catch (error) {
    console.error("Not possible to stablish connection with DB", error);
  }

  app.listen(application.port, () => {
    console.log(`Server running on http://localhost:${application.port}`);
  });
}

startApp();
