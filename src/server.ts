import application from "./app";
import envConfig from "./config/env-config";

application().then((app) => {
  app?.listen(envConfig.Port, () => {
    console.log(`Application start on Port ${envConfig.Port}`);
  });
}).catch((error) => {
  console.log('Application falied to start')
  console.error(error)
  process.exit(1);
})