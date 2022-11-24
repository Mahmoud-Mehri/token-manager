import { LogController } from "../controller/log-controller";
import { service } from "../model/service";

class ServiceManager {
  private services: Object;
  private serviceTimeout: number;
  private logger: LogController;

  constructor(logger: LogController, timeout: number) {
    this.services = {};
    this.serviceTimeout = timeout;
    this.logger = logger;
  }

  registerService(name: string, version: string, ip: string, port: number) {
    this.cleanup();

    const key = name + version + ip + port;
    const timestamp = Math.floor(Date.now() / 1000);

    if (!this.services[key]) {
      const newService = new service();
      newService.name = name;
      newService.version = version;
      newService.ip = ip;
      newService.port = port;
      newService.timestamp = timestamp;

      this.services[key] = newService;
      return key;
    }

    this.services[key].timestamp = timestamp;
    return key;
  }

  unregisterService(name: string, version: string, ip: string, port: number) {
    const key = name + version + ip + port;
    delete this.services[key];
    return key;
  }

  getService(name: string, version: string) {
    this.cleanup();

    return Object.values(this.services).filter((service, index, array) => {
      return service.name === name && service.version == version;
    });
  }

  cleanup() {
    const now = Math.floor(Date.now() / 1000);
    Object.keys(this.services).forEach((value, index, array) => {
      const registerTime = this.services[value].timestamp;
      if (now - registerTime > this.serviceTimeout) {
        delete this.services[value];
      }
    });
  }
}
