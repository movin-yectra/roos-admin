import { LogLevel } from "@azure/msal-browser";

export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_signupsignin",
  },
  authorities: {
    signUpSignIn: {
      authority:
        "https://roos1.b2clogin.com/roos1.onmicrosoft.com/B2C_1_signupsignin",
    },
  },
  authorityDomain: "roos1.b2clogin.com",
};

export const msalConfig = {
  auth: {
    clientId: "749f80a8-087a-4d54-9646-f850e62215a1",
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: "/",
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const protectedResources = {
  apiTodoList: {
    endpoint: "localhost:3000",
    scopes: {
      write: ["https://roos1.onmicrosoft.com/task1/tasks.write"],
    },
  },
};

export const loginRequest: any = {
  scopes: [...protectedResources.apiTodoList.scopes.write],
};
