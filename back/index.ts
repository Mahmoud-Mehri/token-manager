import cluster from "cluster";
import os from "os";
import { app } from "./app";
import * as config from "./config.json";

if (config.cluster_mode) {
  const cpuCount = os.cpus().length;
  if (cluster.isPrimary) {
    for (let i = 0; i < cpuCount; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      console.log(
        `Worker process(${
          worker.id
        }) died : ${new Date()} \n Remaining workers: ${cluster.workers.length}`
      );
      cluster.fork();
    });
  } else {
    app.listen(3000, () => {
      console.log(`Worker process (${process.pid}) is listening on port 3000`);
    });
  }
} else {
  app.listen(3000, () => {
    console.log(`App is listening on port 3000`);
  });
}
