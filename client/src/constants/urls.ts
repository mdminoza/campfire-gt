// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // baseUrl: 'https://staging.godtribe.com/wp-json/api/v1/',
  campfireBaseUrl: 'https://staging-campfire-api.azurewebsites.net/api/',
  // campfireBaseUrl: 'http://localhost:5000/api/',
  web: {
    dev: 'https://staging.godtribe.com/wp-json/wp/v1/',
    prod: 'https://godtribe.com/wp-json/api/v1/',
    jwt: 'https://staging.godtribe.com/wp-json/jwt-auth/v1/token',
  },
  native: {
    dev: 'https://staging.godtribe.com/wp-json/wp/v2/',
    prod: 'https://godtribe.com/wp-json/wp/v2/',
  },
  user: {
    subscribed: 'users/subscribed',
    current: 'login',
    randomTestUser: 'user/random/test',
  },
  campfire: {
    main: 'campfires/',
    owned: 'campfires/owned/',
    public: 'campfires/public/',
    private: 'campfires/private/',
  },
  member: {
    add: 'member/push',
    get: 'member/get',
    delete: 'member/pull',
    setStatus: 'member/set/status',
    setRole: 'member/set/role',
  },
};
