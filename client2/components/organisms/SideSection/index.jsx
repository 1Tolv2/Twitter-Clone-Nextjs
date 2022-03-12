import React, {useState, useEffect, useContext} from 'react'
import * as s from './styles'
import { API } from '../../API'
import { UserContext } from '../../../pages'

export default function SideSection() {
  const [user, setUser] = useState(null)
  const {userData} = useContext(UserContext)

  useEffect(() => {
    userData && setUser(userData.data.user)
  }, [userData])

  useEffect(()=> {
fetch(`${API}/hashtags`)
  }, [])
  return (
    <s.Container>
      {user && (<>
      <s.ProfileContainer>
        <img src={`${API}/${user.image}`} alt="profile image"/>
        <h2>Hello {user.username}!</h2>
      </s.ProfileContainer>
      <s.FollowContainer><h3>DISCOVER</h3><hr/>
      <ul>
      </ul>
      </s.FollowContainer></>)}
      <s.HashtagContainer><h3>TRENDING</h3><hr/>
      <ul>
      </ul>
      </s.HashtagContainer>
    </s.Container>
  )
}
