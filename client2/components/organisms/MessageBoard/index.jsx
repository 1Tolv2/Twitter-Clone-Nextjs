import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import * as s from './styles'
import MessageItem from '../MessageItem/index'
import { getMessageList, getUserMessages } from "../../../components/API";


export default function MessageBoard({userList, children}) {
  const router = useRouter()
    const [messages, setMessages] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem("Token");
      let headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("Board:", router.query.user)
      if (token && router.query.user == undefined) {
        headers.headers["Authorization"] = `Bearer ${token}`;
        getMessageList(headers, setMessages);
      } else if (router.query.user != undefined) {
        getUserMessages(router.query.user, setMessages)
      } 
      else {
        getMessageList(headers, setMessages);
      }
    }, []);

    function handleOnClick() {
      console.log("halloj")
    }
  return (
    <s.Container>
      {children}
      {messages && 
        <s.List>{messages.map((item) => {
            const splitMessage = item.message.split(" ")
            const modifiedMessage = splitMessage.map((word) => /^#/.test(word) ? <Link href={`/hashtags/${word.replace("#", "%23")}`}>{`${word} `}</Link> : `${word} `)
           return (
             <MessageItem key={item._id} data={{item, modifiedMessage, user: userList.find((user) => user.username === item.username)}}/>)
        })}
        </s.List>}
    </s.Container>
  )
}
