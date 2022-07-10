import { loginRequest, graphConfig } from "../authConfig";
import { msalInstance } from "../index";

export async function callMsGraph(accessToken) {
  let userId = "";
  if (!accessToken) {
    const account = msalInstance.getActiveAccount();
    if (!account) {
      throw Error(
        "No active account! Verify a user has been signed in and setActiveAccount has been called."
      );
    }

    const response = await msalInstance.acquireTokenSilent({
      scopes: ["https://graph.microsoft.com/User.Read"],
      account: account,
    });
    accessToken = response.accessToken;
    console.log(response.idTokenClaims.roles[0]);
    userId = account.username;
  }

  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(graphConfig.graphMeEndpoint + "me", options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
