import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API_URI}profiles`;

const getAuthHeader = authState => {
  if (!authState.isAuthenticated) {
    throw new Error('Not authenticated');
  }
  return { Authorization: `Bearer ${authState.idToken}` };
};

const getSpending = (url, authState) => {
  const headers = getAuthHeader(authState);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .post(
      url,
      {
        user_ID: '00ulthapbErVUwVJy4x6',
        time_period: 'week',
        graph_type: 'pie',
      },
      { headers }
    )
    .then(res => JSON.parse(res.data))
    .catch(err => err);
};

const getMoneyFlow = (url, authState) => {
  const headers = getAuthHeader(authState);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .post(
      url,
      {
        user_ID: '00ulthapbErVUwVJy4x6',
        time_period: 'week',
      },
      { headers }
    )
    .then(res => JSON.parse(res.data))
    .catch(err => err);
};

const getFutureBudget = (url, authState) => {
  var headers = getAuthHeader(authState);
  var headers = { ...headers, user_id: '00ulthapbErVUwVJy4x6' };
  console.log(headers);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .get(url, { headers })
    .then(res => res.data)
    .catch(err => err);
};

const postFutureBudget = (url, authState) => {
  const headers = getAuthHeader(authState);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .post(
      url,
      {
        user_id: '00ulthapbErVUwVJy4x6',
        monthly_savings_goal: 400,
        placeholder: 'Shopping, Auto, Utilities',
      },
      { headers }
    )
    .then(res => res.data)
    .catch(err => err);
};

const apiAuthGet = authHeader => {
  return axios.get(apiUrl, { headers: authHeader });
};

const getProfileData = authState => {
  try {
    return apiAuthGet(getAuthHeader(authState)).then(response => response.data);
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

export {
  getProfileData,
  getSpending,
  getMoneyFlow,
  getFutureBudget,
  postFutureBudget,
};
