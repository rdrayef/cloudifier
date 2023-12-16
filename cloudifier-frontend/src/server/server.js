const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PROXMOX_API = 'https://192.168.1.3:8006/api2/json';

app.get('/proxmox', async (req, res) => {
  try {
    const response = await axios.get(`${PROXMOX_API}/nodes/server/qemu`, {
      /* Add any necessary headers or authentication here */
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Proxmox:', error);
    res.status(500).json({ error: 'Failed to fetch data from Proxmox' });
  }
});

const port = 5000; // Choose any available port
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
