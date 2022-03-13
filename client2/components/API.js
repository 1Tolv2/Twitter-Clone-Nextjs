export const API = "http://localhost:9000";
const CT = { "Content-Type": "application/json" };

async function getUser(payload, setErrorMessage) {
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
  const payload = { username: data.newUsername, password: data.newPassword };
  const res = await fetch(`${API}/auth/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json();
    data.error == "Invalid data, user already exists"
      ? setErrorMessage(
          "User already exists, please try again with a unique username"
        )
      : setErrorMessage("Incorrect data, please try again");
  }
  return res;
}

async function getUserMessages(user, setData) {
  const res = await fetch(`${API}/messages/${user}`, { headers: CT });
  const data = await res.json();
  setData(data);
}

async function getUserData(setValue) {
  const token = localStorage.getItem("Token");
  if (token) {
    const res = await fetch(`${API}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setValue(await res.json());
  }
}

async function getUserList(setValue) {
  const res = await fetch(`${API}/users`, {
    "Content-Type": "application/json",
  });
  const { data } = await res.json();
  setValue(data);
}

async function getMessageList(headers, setValue) {
  const res = await fetch(`${API}/messages`, headers);
  const { data } = await res.json();
  setValue(data);
}

async function postMessage(token, payload) {
  const res = await fetch(`${API}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  console.log(await res.json());
}

async function getHashtag(hashtag, setValue) {
  fetch(`${API}/hashtags/${hashtag}`, {
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then(({ data }) => setValue(data.messages));
}

export {
  getUser,
  postNewUser,
  getMessageList,
  getUserList,
  getUserData,
  postMessage,
  getUserMessages,
  getHashtag,
};
