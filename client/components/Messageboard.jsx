import React, { useState, useEffect } from "react";

export default function Messageboard() {
  const [messageList, setMessageList] = useState("")
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("")

  function callAPI() {
    fetch("http://localhost:9000/", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setMessageList(data));
  }
  useEffect(() => {
    callAPI();
  }, []);

  function handleOnSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:9000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({author, message})
    }).then(res =>{console.log(res)})
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        Moo to your hearts desire
        <br />
        Author:
        <br />
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        Message:
        <br />
        <textarea
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        {messageList && messageList.map((item) => {
return <article key={item._id}>{item.author} - {item.message}</article>
      })}</div>
    </div>
  );
}