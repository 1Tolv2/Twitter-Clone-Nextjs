import React, { useState } from "react";

export default function Messageboard() {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("")

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(author);
    console.log(message)

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
        {/* <input type="text" name="author"/> */}
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
    </div>
  );
}
