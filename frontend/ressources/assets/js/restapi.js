async function getAccount(url = 'http://127.0.0.1:8888/account/profile', data = {}) {
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