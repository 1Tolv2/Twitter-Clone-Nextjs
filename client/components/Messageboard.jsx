import React, { useState } from "react";
import Link from "next/link"

export default function Messageboard({data}) {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("")
 
  async function handleOnSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:9000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({author, message})
    })
    console.log(res)
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
        {data && data.map((item) => {
return <article key={item._id}><Link href={`/${item.author}`} >{item.author}</Link> - {item.message}</article>
      })}</div>
    </div>
  );
}