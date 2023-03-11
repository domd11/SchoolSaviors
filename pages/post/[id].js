import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { auth, db } from '../../Firebase';
import {AiFillStar, AiOutlineLike, AiOutlineStar} from "react-icons/ai"
import {AiFillLike} from "react-icons/ai"
import Comment from '../Components/Comment';
import ColorSchemesExample from '../Components/Navbar';
import Navbar from '../Components/Navbar';
import NavbarHeading from '../Components/Navbar';
import { Button } from 'react-bootstrap';

const Postid = () => {
    const router = useRouter();
    const { id } = router.query;

    const comment = useRef(null);

    const [user, loading] = useAuthState(auth);

    const [data, setData] = useState([]);
    const [comments, setComments] = useState([]);
    

    const getData = async () => {
        const ref = doc(db, "tips-tricks", `${id}`); 
        const snap = await getDoc(ref); 

        if (snap.exists()) {
            setData(snap.data())
        } else {
            alert("Doc does not exists")
        }
    }

    const getComments = async () => {
            const ref = collection(db, `tips-tricks/${id}/comments`); 
            await getDocs(ref).then((response) => {
                setComments(response.docs.map((data) => {
                    return {...data.data(), id: data.id}
                }));
            });
    

    }
    
    const like = async () => {
        const ref = doc(db, "tips-tricks", id); 
        await updateDoc(ref, {
            likes: arrayUnion(user.email)
        })

        getData();
    }

    const dislike = async () => {
        const ref = doc(db, "tips-tricks", id); 
        await updateDoc(ref, {
            likes: arrayRemove(user.email)
        })

        getData();
    }

    const deletePost = async () => {
        const ref = doc(db, "tips-tricks", id); 
        await deleteDoc(ref)
        router.push("/TipsAndTricks")
    }

    const addComment = async () => {
        const date = new Date();
        const formatter = new Intl.DateTimeFormat(undefined, {
            dateStyle: "short", 
            timeStyle: "short",
        }).format(date)
        await addDoc(collection(db, `tips-tricks/${id}/comments`), {
            comment: comment.current.value,
            author: user.uid,
            likes: [],
            dateAdded: formatter,
            name: user.displayName,
        })

        comment.current.value = '';

        getComments();
    }

    useEffect(() => {
        if (user && !loading) {
            console.log(id)
            getData();
            getComments();
        }
    }, [!loading])
  return (
    <div>
    <NavbarHeading />
    {user && data.length !== 0 ? (
    <div>
        <h1>
            {data.name}
        </h1>
        <p>By: {data.author}</p>
        {data.likes.length !== 0 || data.likes.includes(user.email) ?  (
                <div>
                    <div className='like-container'>
                        <label onClick={dislike} for="likes"><AiFillLike />|</label>
                        <span name="likes">Likes: {data.likes.length}</span>
                    </div>
                </div>
        ) : (
            <div className='like-container'>
                <label onClick={like} for="likes"><AiOutlineLike />|</label>
                <span name="likes">Likes: {data.likes.length}</span>
            </div>
            )}

            {data.bookmarks.length !== 0 || data.bookmarks.includes(user.email) ?  (
                
                      <AiFillStar />
                    
        ) : (
            
               <AiOutlineStar />
            
            )}
            <br />
            {user.uid === data.authorId ? <Button variant='danger' onClick={deletePost}>Delete Post</Button> : ""}
        <hr />
        <div className='markdown-div'><ReactMarkdown children={data.content} /></div>
        <br />
        <h2>Comments:</h2>
        <div>
        <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          ref={comment}
        />
      </FloatingLabel>
        
            <br />
            <Button variant='secondary' style={{ padding: "10px" }} onClick={addComment}>Add Comment</Button>
        </div>
        <div>
            {comments.map((comment) => {
                return <Comment comment={comment} id={id} getComments={getComments}/>
            })}
        </div>
    </div>
    ) : ""}
    </div>
  )
}

export default Postid