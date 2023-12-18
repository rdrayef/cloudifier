class WebSocketUtility {
  constructor(url, onMessageCallback) {
    this.socket = new WebSocket(url);
    this.socket.addEventListener("message", onMessageCallback);
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default WebSocketUtility;
