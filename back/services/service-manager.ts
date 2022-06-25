
class ServiceManager {
    constructor(logger, timeout) {
        this.services = {};
        this.serviceTimeout = timeout;
        this.logger = logger;
    }

    registerService(name, version, ip, port) {
        this.cleanup();

        const key = name + version + ip + port;
        const timestamp = Math.floor(new Date() / 1000);

        if (!this.services[key]) {
            const newService = {};
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

    unregisterService(name, version, ip, port) {
        const key = name + version + ip + port;
        delete this.services[key];
        return key;
    }

    getService(name, version) {
        this.cleanup();

        return Object.values(this.services).filter((service, index, array) => {
            return (service.name === name && service.version == version)
        });
    }

    cleanup() {
        const now = Math.floor(new Date() / 1000);
        Object.keys(this.services).forEach((value, index, array) => {
            const registerTime = this.services[value].timestamp;
            if (now - registerTime > this.serviceTimeout) {
                delete this.services[value];
            }
        })
    }
}