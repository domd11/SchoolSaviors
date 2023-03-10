import { doc, setDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { auth, db } from '../Firebase';

const AddTipsTricks = () => {
    const [markdown, setMarkdown] = useState("")
    const title = useRef(null);

    const user = auth.currentUser; 
    
    const addPost = async () => {
        await setDoc(doc(db, "tips-tricks", `${title.current.value}-${Math.floor(Math.random()*100000000)}`), {
            name: title.current.value, 
            content: markdown, 
            likes: [],
            author: `${user.displayName}`,
            authorId: user.uid, 
            authorEmail: user.email,
        })

        setMarkdown("")
        title.current.value = "";
    }
    

  return (
    <div style={{ padding: "10px" }}>
    <p>Post titles cannot contain <strong>backslashes</strong> or <strong>question marks</strong></p>
        <input ref={title} style={{ fontSize: "25px", width: "100%" }} placeholder='Post Heading...'/>
        <textarea value={markdown} onChange={e => setMarkdown(e.target.value)} style={{ width: "100%", height: "250px" }} />
        <button className='btn' onClick={addPost}>Add Post</button>
        <br />
        <br />
        <hr />
        <br />
        <div className='markdown-div'> <ReactMarkdown children={markdown}/></div>
    </div>
  )
}

export default AddTipsTricks