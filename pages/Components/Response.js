import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { get } from 'mongoose'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { auth, db } from '../../Firebase'

const Response = ({ response, getResponses, id }) => {
    const [user, loading] = useAuthState(auth)
    const remove = async () =>{
        await deleteDoc(doc(db, `study-forum/${id}/responses`, response.id));
        getResponses();
    }

    const like = async () => {
       await updateDoc(doc(db, `study-forum/${id}/responses`, response.id), {
            likes: arrayUnion(user.email),
       })

       getResponses(); 
    }

    const unlike = async () => {
        await updateDoc(doc(db, `study-forum/${id}/responses`, response.id), {
            likes: arrayRemove(user.email),
        })

        getResponses();
    }
  return (
    <div>
        <span><b>{response.response}</b></span>
        <br />
        <small>{response.authorName}</small>
        <br />
        {response.likes.includes(user.email) ? <AiFillLike onClick={unlike} /> : <AiOutlineLike onClick={like} />}<span>{response.likes.length}</span>
        <br />
        {user.uid === response.authorId ? <button onClick={remove}>Delete Response</button> : ""}

    </div>
  )
}

export default Response