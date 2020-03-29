const host = 'http://127.0.0.1:8888';

async function getAccountProfile() {
    url = host + '/account/profile'
    const response = await fetch(url, {
      method: 'GET', 
      mode: 'no-cors',
      headers: {
    	'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    return await response.json();
}

async function getReportQuery() {
    url = host + '/report/query'
    const response = await fetch(url, {
      method: 'GET', 
      mode: 'no-cors',
      headers: {
    	'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    return await response.json();
}

async function getStatic(path) {
    url = host + '/report/query/' + path
    const response = await fetch(url, {
      method: 'GET', 
      mode: 'no-cors',
      headers: {
    	'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    return await response.json();
}

async function getVolunteerOffer() {
    url = host + '/volunteer/offer'
    const response = await fetch(url, {
      method: 'GET', 
      mode: 'no-cors',
      headers: {
    	'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    return await response.json();
}

async function getVolunteerRequest() {
    url = host + '/volunteer/request'
    const response = await fetch(url, {
      method: 'GET', 
      mode: 'no-cors',
      headers: {
    	'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    return await response.json();
}

async function postAccountProfile(url = host + '/account/profile', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return await response.json();
}