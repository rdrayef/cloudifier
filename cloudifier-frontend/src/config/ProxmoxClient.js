import axios from "axios";
import Cookies from "universal-cookie";

export default class ProxmoxClient {
  constructor(URL) {
    this.init(URL);
    this.cookies = new Cookies();
  }

  init(URL) {
    this.instance = axios.create({
      baseURL: `${URL}/api2/json`,
    });
    this.instance.interceptors.request.use(
      (config) => {
        const token = {
          PVEAuthCookie: this.cookies.get("PVEAuthCookie"),
          CSRFPreventionToken: this.cookies.get("CSRFPreventionToken"),
        };
        if (token.CSRFPreventionToken && token.PVEAuthCookie) {
          config.headers[
            "Authorization"
          ] = `PVEAuthCookie=${token.PVEAuthCookie}`;
          config.headers[
            "CSRFPreventionToken"
          ] = `${token.CSRFPreventionToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async connect(username, password) {
    try {
      const response = await this.instance.post("/access/ticket", {
        username: username,
        password: password,
      });
      const res = await response.data;
      this.cookies.set("PVEAuthCookie", res.data.ticket);
      this.cookies.set("CSRFPreventionToken", res.data.CSRFPreventionToken);
      return true;
    } catch (error) {
      console.error("Connection error:", error);
      throw error;
    }
  }

  async getClusterResources(type = '') {
    try {
      const params = type ? { type } : {};
      const response = await this.instance.get('/cluster/resources', { params });
      const res = await response.data;
      return res.data;
    } catch (error) {
      console.error('Error fetching cluster resources:', error);
      throw error;
    }
  }

  async getImages(node, storage) {
    try {
      const response = await this.instance.get(`/nodes/${node}/storage/${storage}/content`);
      const contentList = await response.data.data.filter(entry => entry.format === 'iso');
      return contentList;
    } catch (error) {
      console.error(`Error fetching images from storage ${storage} on node ${node}:`, error);
      throw error;
    }
  }

  async getTemplates(node, storage) {
    try {
      const response = await this.instance.get(`/nodes/${node}/storage/${storage}/content`);
      const contentList = await response.data.data.filter(entry => entry.content === 'vztmpl');
      return contentList;
    } catch (error) {
      console.error(`Error fetching templates from storage ${storage} on node ${node}:`, error);
      throw error;
    }
  }

  async getBackups(node, storage) {
    try {
      const response = await this.instance.get(`/nodes/${node}/storage/${storage}/content`);
      const contentList = await response.data.data.filter(entry => entry.content === 'backup');
      return contentList;
    } catch (error) {
      console.error(`Error fetching backups from storage ${storage} on node ${node}:`, error);
      throw error;
    }
  }
  

  async getNodes() {
    try {
      const response = await this.instance.get("/nodes");
      const res = await response.data;
      return res.data;
    } catch (error) {
      console.error("Error getting nodes:", error);
      throw error;
    }
  }

  async getVMs(node) {
    try {
      const response = await this.instance.get(`/nodes/${node}/qemu`);
      const res = await response.data;
      return res.data;
    } catch (error) {
      console.error(`Error getting VMs for node ${node}:`, error);
      throw error;
    }
  }

  async createVM(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/qemu`, {
        vmid: vmid
      });
      const res = await response.data;
      return res.data;
    } catch (error) {
      console.error(`Error creating VM on node ${node}:`, error);
      throw error;
    }
  }

  async migrateVM(node, vmid, target) {
    try {
      const response = await this.instance.post(`/nodes/${node}/qemu/${vmid}/migrate`, {
        target: target,
      });
      const res = await response.data;
      return res.data;
    } catch (error) {
      console.error(`Error migrating VM ${vmid} from node ${node} to ${target}:`, error);
      throw error;
    }
  }
  
  async backupAll(node) {
    try {
      const response = await this.instance.post(`/nodes/${node}/vzdump`, {
        all: true,
      });
      const res = await response.data;
      return res.data;
    } catch (error) {
      console.error(`Error creating backup of all VMs on node ${node}:`, error);
      throw error;
    }
  }
  
  async backupVM(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/vzdump`, {
        vmid: vmid,
      });
      const res = await response.data;
      return res.data;
    } catch (error) {
      console.error(`Error creating backup of VM ${vmid} on node ${node}:`, error);
      throw error;
    }
  }

  async restoreVM(node, vmid,archive) {
    try {
      const response = await this.instance.post(`/nodes/${node}/qemu`, {
        vmid: vmid,
        archive: archive,
        'live-restore': true,
      });
      const res = await response.data;
      return res.data;
    } catch (error) {
      console.error(`Error restoring VM ${vmid} on node ${node}:`, error);
      throw error;
    }
  }
  

  async getLXCs(node) {
    try {
      const response = await this.instance.get(`/nodes/${node}/lxc`);
      const res = await response.data;
      return res.data;
    } catch (error) {
      console.error(`Error getting LXC container index for node ${node}:`, error);
      throw error;
    }
  }
  
  async createLXC(node, ostemplate, vmid, rootfs = 'local-lvm:8') {
    try {
      const requestData = {
        ostemplate: ostemplate,
        vmid: vmid,
        rootfs: rootfs,
      };
      const response = await this.instance.post(`/nodes/${node}/lxc`, requestData);
      const res = await response.data;
      return res.data;
    } catch (error) {
      console.error(`Error creating or restoring container on node ${node}:`, error);
      throw error;
    }
  }
}