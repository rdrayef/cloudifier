class ServerStatusUtility {
  static updateServerStatus(status, setServerStatus) {
    const parsedStatus = JSON.parse(status.data);
    setServerStatus(parsedStatus);
  }
}

export default ServerStatusUtility;
