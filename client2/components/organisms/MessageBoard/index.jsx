import React, { useEffect, useState } from "react";
import Link from 'next/link'
import * as s from './styles'
import MessageItem from '../MessageItem/index'
import { getMessageList } from "../../../components/API";


export default function MessageBoard({userList}) {
    const [messages, setMessages] = useState(null);
    useEffect(() => {
      const token = localStorage.getItem("Token");
      let headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (token) {
        headers.headers["Authorization"] = `Bearer ${token}`;
        getMessageList(headers, setMessages);
      } else {
        getMessageList(headers, setMessages);
      }
    }, []);
  return (
    <s.Container>
      {messages && 
        <s.List>{messages.map((item, index) => {
            const splitMessage = item.message.split(" ")
            const modifiedMessage = splitMessage.map((word) => /^#/.test(word) ? <Link href={`/hashtags/${word.replace("#", "%23")}`}>{`${word} `}</Link> : `${word} `
            )
           return (<div key={item._id}>
             <MessageItem data={{item, modifiedMessage, user: userList.find((user) => user.username === item.username)}}></MessageItem>
           </div>)
        })}
        </s.List>}
    </s.Container>
  )
}
