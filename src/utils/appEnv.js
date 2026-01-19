const AppEnv = {
  environment: import.meta.env.VITE_APP_ENVIRONMENT,
  siteName: import.meta.env.VITE_APP_SITE_NAME,
  legacyAPIUrl: import.meta.env.VITE_APP_API_HOST,
  apiUrl: import.meta.env.VITE_APP_API_URL,
  currentDomain: import.meta.env.VITE_APP_CURRENT_DOMAIN,
  mediaCDN: import.meta.env.VITE_APP_MEDIA_CDN
};

export default AppEnv;
