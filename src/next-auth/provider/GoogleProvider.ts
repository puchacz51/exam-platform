import { Provider } from '@auth/core/providers';

export const GoogleProvider: Provider = {
  id: 'google',
  name: 'google',
  type: 'oauth',
  authorization: {
    url: 'https://accounts.google.com/o/oauth2/v2/auth',
    params: {
      prompt: 'consent',
      access_type: 'offline',
      response_type: 'code',
    },
  },
  token: 'https://oauth2.googleapis.com/token',
  userinfo: 'https://www.googleapis.com/oauth2/v2/userinfo',
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};
