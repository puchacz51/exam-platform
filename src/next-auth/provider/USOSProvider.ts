import { Provider } from '@auth/core/providers';
import { OAuth } from 'oauth'; // Używamy pakietu OAuth

const oauth = new OAuth(
  'https://usosapps.pbs.edu.pl/services/oauth/request_token', // Request Token URL
  'https://usosapps.pbs.edu.pl/services/oauth/access_token', // Access Token URL
  process.env.USOS_CONSUMER_KEY!, // Consumer Key
  process.env.USOS_CONSUMER_SECRET!, // Consumer Secret
  '1.0A', // OAuth version
  'http://localhost:3005/callback', // Callback URL after authorization
  'HMAC-SHA1' // Signature method
);

export const USOSProvider: Provider = {
  id: 'USOS',
  name: process.env.USOS_APPLICATION_NAME || '',
  type: 'oauth', // Typ OAuth
  version: '1.0', // Używamy OAuth 1.0a
  requestTokenUrl: 'https://usosapps.pbs.edu.pl/services/oauth/request_token',
  accessTokenUrl: 'https://usosapps.pbs.edu.pl/services/oauth/access_token',
  profileUrl: 'https://usosapps.pbs.edu.pl/services/users/user',
  authorization: {
    url: 'https://usosapps.pbs.edu.pl/services/oauth/authorize?oauth_token=345354534',
  },
  clientId: process.env.USOS_CONSUMER_KEY,
  clientSecret: process.env.USOS_CONSUMER_SECRET,
  issuer: 'http://localhost:3005',

  profile(profile) {
    return {
      id: profile.id,
      name: `${profile.firstname} ${profile.lastname}`,
      email: profile.email || null,
    };
  },
};
