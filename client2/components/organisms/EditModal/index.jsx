import React, {useContext} from 'react'
import { UserContext } from '../../../pages'
import * as s from './styles'

export default function EditModal({modal}) {
    const {userData, setUserData} = useContext(UserContext)

    async function handleOnSubmit() {

    }
    function toggleEditModal() {
      modal.setEditModal(!modal.editModal)
    }
  return (
    <s.Container>
        <s.Fade onClick={toggleEditModal}></s.Fade>
        <s.Modal>
            <form onSubmit={handleOnSubmit}>

            </form>
        </s.Modal>
    </s.Container>
  )
}
