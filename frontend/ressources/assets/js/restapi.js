const host = 'http://127.0.0.1:8888';

function getAccountProfile() {
    url = host + '/account/profile'
    return get(url);
}

function getReportQuery() {
    url = host + '/report/query'
    return get(url);
}

function getStatic(path) {
    url = host + '/report/query/' + path
    return get(url);
}

function getVolunteerOffer() {
    url = host + '/volunteer/offer'
    return get(url);
}

function getVolunteerRequest() {
    return get(url);
}

function postAccountProfile(data = {}) {
    url = host + '/account/profile'
    return post(url, data)
}

async function get(url) {
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

async function post(url, data = {}) {
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