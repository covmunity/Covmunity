const host = '';

function getAccountProfile() {
    url = host + '/account/profile'
    return get(url);
}

function getReportQuery() {
    url = host + '/report/query'
    return get(url);
}

function getRandomReportLocations(data = {}) {
    url = host + '/report/query/random'
    return post(url, data)
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
    url = host + '/volunteer/request'
    return get(url);
}

function postAccountProfile(data = {}) {
    url = host + '/account/profile'
    return post(url, data)
}

function postReportQuery(data = {}) {
    url = host + '/report/query'
    return post(url, data)
}

function postReportSend(data = {}) {
    url = host + '/report/send'
    return post(url, data)
}

function postVolunteerOffer(data = {}) {
    url = host + '/volunteer/offer'
    return post(url, data)
}

function postVolunteerRequest(data = {}) {
    url = host + '/volunteer/request'
    return post(url, data)
}

async function get(url) {
    const response = await fetch(url, {
        method: 'GET', 
        mode: 'no-cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
      return await response.json();
}

async function post(url, data = {}) {
    let response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return await response.json();
}
