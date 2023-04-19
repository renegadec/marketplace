import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from '@dfinity/agent';

const canisterId = import.meta.env.VITE_DFINITY_CANISTER_ID;

// import { useContext } from "react";
// import { UserContext } from "../UserContext";
interface authHandlerProps {
    successHandler?: Function,
    errorHandler?: Function
}

const idlFactory = ({ IDL }) => 
  IDL.Service({
    whoami: IDL.Func([], [IDL.Principal], []),
})

let authClientInstance;

const useAuth = (session, setSession) => {


  const isLoggedIn = async () => {
    if (authClientInstance) {
      return await authClientInstance.isAuthenticated();
    } else {
      return false;
    }
  };
  
  const identity = async () =>  await authClientInstance.getIdentity();

  const actor  = async () => {
    let identity = authClientInstance.getIdentity()
    return Actor.createActor(idlFactory, {
      agent: new HttpAgent({
      identity,
      host: 'http://localhost:5173'
      }),
      canisterId,
  })
}

  const login = async (
      successHandler,
      errorHandler
  ) => {
      const days = BigInt(1);
      const hours = BigInt(24);
      const nanoseconds = BigInt(3600000000000);
      authClientInstance.login({
        onSuccess: async () => {
          successHandler();
          console.log('Logged in')
          setSession(true);
        },
        onError: async () => {
          errorHandler();
          setSession(false);
        },
        identityProvider: "https://identity.ic0.app/#authorize",
        // `http://localhost:${process.env.REPLICA_PORT}?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}#authorize`,
        // Maximum authorization expiration is 8 days
        maxTimeToLive: days * hours * nanoseconds,
      });
    }

  const logout = async () => {
    await authClientInstance.logout()
    setSession(false)
  }

  return {
    isLoggedIn,
    identity,
    actor,
    login,
    logout
  }
};

AuthClient.create({
  idleOptions: {
    idleTimeout: 1000 * 60 * 30, // set to 30 minutes
    disableDefaultIdleCallback: true // disable the default reload behavior
  }
}).then(authClient => {
  authClientInstance = authClient;
}).catch(error => {
  console.error(error);
});

export default useAuth;