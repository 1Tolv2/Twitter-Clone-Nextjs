import React, { useState, useEffect } from "react";
import Link from "next/link";
import { API } from "../../API";
import * as s from "./styles";

export default function SideWidget({ title, type }) {
  const [list, setList] = useState(null);

  useEffect(() => {
    if (type === "hashtags") {
      fetch(`${API}/hashtags?limit=5`, {
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(({ data }) => setList(data));
    } else if (type === "users") {
      fetch(`${API}/users`, {
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(({ data }) => {
          let list = [];

          for (let i = 0; i < 5; i++) {
            const index = Math.floor(Math.random() * data.length);
            list.push(data[index]);
            data.splice(index, 1);
          }
console.log(list)
          setList(list);
        });
    }
  }, []);

  function upperCaseName(name) {
    const modifiedName = name?.replace(name[0], name[0].toUpperCase());
    return modifiedName;
  }

  return (
    <>
      {list && (
        <s.Container>
          <h3>{title}</h3>
          <div>
            {type === "hashtags" && (
              <ul>
                {list &&
                  list.map((tag, index) => (
                    <li key={index}>
                      <Link
                        href={`/hashtags/${tag.tag_name.replace("#", "%23")}`}
                      >
                        <a>{tag.tag_name}</a>
                      </Link>
                      <i> - {tag.count}</i>
                    </li>
                  ))}
              </ul>
            )}
            {type === "users" && (
              <ul>
                {list.map((user, index) => (
                  <li key={index}>
                    <Link href={`/${user?.username}`}>
                      <a>{upperCaseName(user?.username)}</a>
                    </Link>
                    {user?.settings.name ? (
                      <i>{` - ${user?.firstname} ${user?.lastname}`}</i>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </s.Container>
      )}
    </>
  );
}
