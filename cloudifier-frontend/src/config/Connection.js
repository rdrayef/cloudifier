import Cookies from 'universal-cookie';

const cookies = new Cookies();
const URL = "https://192.168.108.105:8006/";

export const connect = (username, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch(`${URL}api2/json/access/ticket`, requestOptions)
    .then(response => response.text())
    .then(result => {
       let data = JSON.parse(result).data;
       cookies.set('PVEAuthCookie',data.ticket);
       cookies.set('CSRFPreventionToken',data.CSRFPreventionToken)
    })
    .catch(error => console.log('error', error));
}



export const getVms = async () => {
    var myHeaders = new Headers();
    myHeaders.append("CSRFPreventionToken", `${cookies.get('CSRFPreventionToken')}`);
    myHeaders.append("Authorization", `PVEAuthCookie=${cookies.get('PVEAuthCookie')}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
   const data = await fetch(`${URL}api2/json/nodes/one/lxc`, requestOptions)
          .then(response => response.text())
          .then(result => {
            return  JSON.parse(result).data;
    })
    return data;
}