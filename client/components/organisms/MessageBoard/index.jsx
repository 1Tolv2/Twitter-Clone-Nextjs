import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import * as s from './styles'
import MessageItem from '../MessageItem/index'
import { getMessageList, getUserMessages, getHashtag } from "../../../components/API";


export default function MessageBoard({userList, children}) {
  const router = useRouter()
    const [messages, setMessages] = useState(null);

    function getHashtagMessages() {
router.params
    }

    useEffect(() => {
      const token = localStorage.getItem("Token");
      let headers = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      token && router.pathname === "/" ? getMessageList({headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${token}`}}, setMessages)
      : router.pathname === "/[user]" ? getUserMessages(router.query.user, setMessages)
      : router.pathname === "/hashtags/[hashtag]" ?  getHashtag(router.query.hashtag?.replace("#", "%23"), setMessages) 
      : getMessageList(headers, setMessages)
    }, [router.pathname]);

    function handleOnClick() {
      console.log("halloj")
    }

  return (
    <s.Container>
      {children}
      {messages && 
        <s.List>{messages.map((item) => {
            const splitMessage = item.message.split(" ")
            const modifiedMessage = splitMessage.map((word) => /^#/.test(word) ? <Link href={`/hashtags/${word.replace("#", "%23").toLowerCase()}`}>{`${word} `}</Link> : `${word} `)
           return (
             <MessageItem key={item._id} data={{item, modifiedMessage, user: userList.find((user) => user.username === item.username)}}/>)
        })}
        </s.List>}
    </s.Container>
  )
}
