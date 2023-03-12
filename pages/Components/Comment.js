import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { auth, db } from '../../Firebase'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap'

const Comment = ({ comment, id, getComments }) => {
const date = Date.toString(comment.dateAdded)
    console.log(comment.dateAdded)

    const [user, loading] = useAuthState(auth)

    const formatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: "short", 
        timeStyle: "short", 
        timeZone: "UTC"
    })

    const deletePost = async () => {
        await deleteDoc(doc(db, `tips-tricks/${id}/comments`, comment.id))

        getComments();
    }

    const like = async () => {
        await updateDoc(doc(db, `tips-tricks/${id}/comments`, comment.id), {
            likes: arrayUnion(user.email),
        })


        getComments(); 
    }

    const unlike = async () => {
        await updateDoc(doc(db, `tips-tricks/${id}/comments`, comment.id), {
            likes: arrayRemove(user.email),
        })

        getComments();
    }

    
  return (
    <div>
      {user ? (
        <Card style={{ marginTop: "10px" }}>
      <Card.Header>{comment.name}</Card.Header>
      <Card.Body>
        <Card.Title>{comment.comment}</Card.Title>
        <Card.Text style={{ paddingBottom: "0px", marginBottom: "5px" }}>
            {comment.dateAdded}
        </Card.Text>
        {comment.likes.includes(user.email) ? <AiFillLike onClick={unlike} /> : <AiOutlineLike onClick={like} />}{comment.likes.length}
        <br />
        {user.uid === comment.author ? <Button variant='danger' onClick={deletePost} style={{ marginTop: "10px" }}>Delete Comment</Button> : ""}
      </Card.Body>
    </Card>
      ) : ""}
    </div>
  )
}


// <div className='comment'>
//         <p>{comment.comment}</p>
//         <small>{comment.name}</small>
//         <br />
//         <small>{comment.dateAdded}</small>
//         <br />
        // {comment.likes.includes(user.email) ? <AiFillLike onClick={unlike} /> : <AiOutlineLike onClick={like} />}{comment.likes.length}
//         <br />
//         {user.uid === comment.author ? <button onClick={deletePost}>Delete Comment</button> : ""}
//         <br />
//     </div>

export default Comment