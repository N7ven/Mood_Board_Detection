import Keycloak from 'keycloak-js';
import { removeBearerToken, setBearerToken } from './credential-storage/credential-storage';

const kc = new Keycloak({
  url: `${process.env.REACT_APP_KEYCLOAK_BASE_URL}/auth`,
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
  checkLoginIframe: false
});

const doLogin = () => kc.login({ redirectUri: `${window.location.origin}` });

const doLogout = () => {
  removeBearerToken();
  kc.logout({ redirectUri: `${window.location.origin}` });
};

const getToken = () => kc.token;

const isLoggedIn = () => !!kc.token;

const isAuthenticated = () => kc.authenticated;

const updateToken = (successCallback) => kc.updateToken(5)
  .then(successCallback)
  .catch(doLogin);

const getUsername = () => kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => kc.hasRealmRole(role));

const getSessionExpiryTime = () => (kc.tokenParsed.exp - kc.tokenParsed.iat);

const getTokenParsed = () => { console.log('kc.tokenParsed', kc.tokenParsed); };

kc.onAuthSuccess = () => { setBearerToken(getToken()); };
kc.onAuthRefreshSuccess = () => { setBearerToken(getToken()); };
kc.onTokenExpired = () => { kc.updateToken((getSessionExpiryTime())); };

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  kc.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
    pkceMethod: 'S256',
    checkLoginIframe: false
  })
    .then((authenticated) => {
      if (!authenticated) {
        doLogin();
      }
      onAuthenticatedCallback();
    })
    .catch((err) => {
      console.log('Error', err);
    });
};

const AuthService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
  isAuthenticated,
  getSessionExpiryTime,
  getTokenParsed
};

export default AuthService;
