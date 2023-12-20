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
      return false;
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
  
  async getNodesList() {
    try {
      const response = await this.instance.get("/nodes");
      const res = await response.data;
      const nodeIds = res.data.map(node => node.id.split("node/")[1]);
      return nodeIds;
    } catch (error) {
      console.error("Error getting nodes:", error);
      throw error;
    }
  }

  async createVM(node, vmid, name, iso) {
    try {
      const response = await this.instance.post(`/nodes/${node}/qemu`, {
        node: node,
        vmid: vmid,
        name: name,
        ide1: `file=${iso},media=cdrom`,
        kvm:false
      });
      const res = await response.data;
      return res.data;
    } catch (error) {
      console.error(`Error creating VM on node ${node}:`, error);
      throw error;
    }
  }

  async getNodeStatus(node) {
    try {
      const response = await this.instance.get(`/nodes/${node}/status`);
      const nodeObject = await response.data.data;
  
      return nodeObject;
    } catch (error) {
      console.error(`Error getting node ${node}:`, error);
      throw error;
    }
  }
  
  async getVMList(node) {
    try {
      const response = await this.instance.get(`/nodes/${node}/qemu`);
      const res = await response.data;
      return res.data;
    } catch (error) {
      console.error(`Error getting VMs for node ${node}:`, error);
      throw error;
    }
  }

  async getVMStatus(node, vmid) {
    try {
      const response = await this.instance.get(`/nodes/${node}/qemu/${vmid}/status/current`);
      return response.data.data;
    } catch (error) {
      console.error(`Error getting status for VM ${vmid} on node ${node}:`, error);
      throw error;
    }
  }

  async startVM(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/qemu/${vmid}/status/start`);
      return response.data;
    } catch (error) {
      console.error(`Error starting VM ${vmid} on node ${node}:`, error);
      throw error;
    }
  }

  async stopVM(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/qemu/${vmid}/status/stop`);
      return response.data;
    } catch (error) {
      console.error(`Error stopping VM ${vmid} on node ${node}:`, error);
      throw error;
    }
  } 
  
  async suspendVM(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/qemu/${vmid}/status/suspend`);
      return response.data;
    } catch (error) {
      console.error(`Error suspending VM ${vmid} on node ${node}:`, error);
      throw error;
    }
  }

  async resumeVM(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/qemu/${vmid}/status/resume`);
      return response.data;
    } catch (error) {
      console.error(`Error resuming VM ${vmid} on node ${node}:`, error);
      throw error;
    }
  }  

  async shutdownVM(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/qemu/${vmid}/status/shutdown`);
      return response.data;
    } catch (error) {
      console.error(`Error shutting down VM ${vmid} on node ${node}:`, error);
      throw error;
    }
  }

  async resetVM(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/qemu/${vmid}/status/reset`);
      return response.data;
    } catch (error) {
      console.error(`Error resetting VM ${vmid} on node ${node}:`, error);
      throw error;
    }
  }
  
  async rebootVM(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/qemu/${vmid}/status/reboot`);
      return response.data;
    } catch (error) {
      console.error(`Error rebooting VM ${vmid} on node ${node}:`, error);
      throw error;
    }
  }

  async cloneVM(node, vmid, newid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/qemu/${vmid}/clone`, {
        newid: newid
      });
      return response.data;
    } catch (error) {
      console.error(`Error cloning VM ${vmid} on node ${node} to ${newid}:`, error);
      throw error;
    }
  }
  
  async restoreVM(node, vmid, archive) {
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

  async backupAllVMs(node) {
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
  
  async getContainersList(node) {
    try {
      const response = await this.instance.get(`/nodes/${node}/lxc`);
      const res = await response.data;
      return res.data;
    } catch (error) {
      console.error(`Error getting LXC container index for node ${node}:`, error);
      throw error;
    }
  }

  async createContainer(node, vmid, ostemplate) {
    try {
      const response = await this.instance.post(`/nodes/${node}/lxc`, {
        ostemplate: ostemplate,
        vmid: vmid,
        rootfs : 'local-lvm:8'
      });
      const res = await response.data;
      return res.data;
    } catch (error) {
      console.error(`Error creating or restoring container on node ${node}:`, error);
      throw error;
    }
  }

  async getContainerStatus(node, vmid) {
    try {
      const response = await this.instance.get(`/nodes/${node}/lxc/${vmid}/status/current`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching status for container ${vmid} on node ${node}:`, error);
      throw error;
    }
  }
  
  async startContainer(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/lxc/${vmid}/status/start`);
      return response.data;
    } catch (error) {
      console.error(`Error starting container ${vmid} on node ${node}:`, error);
      throw error;
    }
  }

  async stopContainer(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/lxc/${vmid}/status/stop`);
      return response.data;
    } catch (error) {
      console.error(`Error stopping container ${vmid} on node ${node}:`, error);
      throw error;
    }
  }

  async suspendContainer(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/lxc/${vmid}/status/suspend`);
      return response.data;
    } catch (error) {
      console.error(`Error suspending container ${vmid} on node ${node}:`, error);
      throw error;
    }
  }
  
  async resumeContainer(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/lxc/${vmid}/status/resume`);
      return response.data;
    } catch (error) {
      console.error(`Error resuming container ${vmid} on node ${node}:`, error);
      throw error;
    }
  }
  
  async shutdownContainer(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/lxc/${vmid}/status/shutdown`);
      return response.data;
    } catch (error) {
      console.error(`Error shutting down container ${vmid} on node ${node}:`, error);
      throw error;
    }
  }
  
  async rebootContainer(node, vmid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/lxc/${vmid}/status/reboot`);
      return response.data;
    } catch (error) {
      console.error(`Error rebooting container ${vmid} on node ${node}:`, error);
      throw error;
    }
  }
  
  async cloneContainer(node, vmid, newid) {
    try {
      const response = await this.instance.post(`/nodes/${node}/lxc/${vmid}/clone`, {
        newid: newid
      });
      return response.data;
    } catch (error) {
      console.error(`Error cloning container ${vmid} on node ${node} to ${newid}:`, error);
      throw error;
    }
  }

  async migrateContainer(node, vmid, target) {
    try {
      const response = await this.instance.post(`/nodes/${node}/lxc/${vmid}/migrate`, {
        target: target
      });
      return response.data;
    } catch (error) {
      console.error(`Error migrating container ${vmid} from node ${node} to ${target}:`, error);
      throw error;
    }
  }
  
  async getISOImages(node, storage) {
    try {
      const response = await this.instance.get(`/nodes/${node}/storage/${storage}/content`);
      const contentList = response.data.data
        .filter(entry => entry.format === 'iso')
        .map(entry => entry.volid);
      return contentList;
    } catch (error) {
      console.error(`Error fetching images from storage ${storage} on node ${node}:`, error);
      throw error;
    }
  }
  
  async getContainerTemplates(node, storage) {
    try {
      const response = await this.instance.get(`/nodes/${node}/storage/${storage}/content`);
      const contentList = response.data.data
        .filter(entry => entry.content === 'vztmpl')
        .map(entry => entry.volid);
      return contentList;
    } catch (error) {
      console.error(`Error fetching templates from storage ${storage} on node ${node}:`, error);
      throw error;
    }
  }

  async getBackups(node, storage) {
    try {
      const response = await this.instance.get(`/nodes/${node}/storage/${storage}/content`);
      const contentList = await response.data.data
      .filter(entry => entry.content === 'backup')
      .map(entry => entry.volid);
      return contentList;
    } catch (error) {
      console.error(`Error fetching backups from storage ${storage} on node ${node}:`, error);
      throw error;
    }
  }
}