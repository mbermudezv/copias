

        const msalConfig = {
            auth: {
              clientId: "2d9e9cb2-50f6-49d7-931f-05952571b493",             
              authority: "https://login.microsoftonline.com/mep.go.cr",
              redirectUri: "http://localhost/copias/index.html"
            },
            cache: {
              cacheLocation: "sessionStorage", // This configures where your cache will be stored
              storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
            }
          };
          
          // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
          const loginRequest = {
           scopes: ["openid", "profile", "User.Read"]
          };
          
          // Add scopes here for access token to be used at Microsoft Graph API endpoints.
          const tokenRequest = {
           scopes: ["User.Read", "Mail.Read"]
          };