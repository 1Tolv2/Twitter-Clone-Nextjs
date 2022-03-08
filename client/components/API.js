export const API = "http://localhost:9000";

async function postNewUserData(payload, setErrorMessage) {
  const res = await fetch(`${API}/auth/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    return setErrorMessage(
      "User already exists, please try again with a unique username"
    );
  }
  return res;
}

async function postLoginData(payload, setErrorMessage) {
  const res = await fetch(`${API}/auth/api-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    setErrorMessage("Incorrect username or password, please try again.");
  } else {
    return await res.json();
  }
}

export { postNewUserData, postLoginData };
