export const API = "http://localhost:9000";

async function getUser(payload, setErrorMessage) {
  console.log("GET:", payload);
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

async function postNewUser(data, setErrorMessage) {
  console.log("POST:", data);
  const payload = { username: data.newUsername, password: data.newPassword };
  console.log("PAYLOAD:", payload);

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

export { getUser, postNewUser };
