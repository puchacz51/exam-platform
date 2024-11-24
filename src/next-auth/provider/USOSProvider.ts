import { Provider } from '@auth/core/providers';
// import { OAuth } from 'oauth'; // Używamy pakietu OAuth

// const oauth = new OAuth(
//   'https://usosapps.pbs.edu.pl/services/oauth/request_token', // Request Token URL
//   'https://usosapps.pbs.edu.pl/services/oauth/access_token', // Access Token URL
//   process.env.USOS_CONSUMER_KEY!, // Consumer Key
//   process.env.USOS_CONSUMER_SECRET!, // Consumer Secret
//   '1.0A', // OAuth version
//   'http://localhost:3005/callback', // Callback URL after authorization
//   'HMAC-SHA1' // Signature method
// );

export const USOSProvider: Provider = {
  id: 'USOS',
  name: process.env.USOS_APPLICATION_NAME || '',
  type: 'oauth', // Typ OAuth
};
