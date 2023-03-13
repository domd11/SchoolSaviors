import { doc, setDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { auth, db } from '../Firebase';
import NavbarHeading from './Components/Navbar';
import Navbar from './Components/Navbar';
import ColorSchemesExample from './Components/Navbar';

const AddTipsTricks = () => {
    const [markdown, setMarkdown] = useState("")
    const title = useRef(null);

    const [user, loading] = useAuthState(auth)
    
    const addPost = async () => {

      const date = new Date();
        const formatter = new Intl.DateTimeFormat(undefined, {
            dateStyle: "short", 
            timeStyle: "short",
        }).format(date)

        await setDoc(doc(db, "tips-tricks", `${title.current.value}-${Math.floor(Math.random()*100000000)}`), {
            name: title.current.value, 
            content: markdown, 
            likes: [],
            author: `${user.displayName}`,
            authorId: user.uid, 
            authorEmail: user.email,
            bookmarks: [],
            dateAdded: formatter,
        })

        setMarkdown("")
        title.current.value = "";
    }
    

  return (
    <div style={{ padding: "10px" }}>
    <NavbarHeading />
    {user ? (
      <div style={{ paddingTop: "70px" }}>
      <p>Post titles cannot contain <strong>backslashes</strong> or <strong>question marks</strong></p>
      <InputGroup size="lg">
          <InputGroup.Text id="inputGroup-sizing-lg">Post Title</InputGroup.Text>
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            ref={title}
          />
        </InputGroup>
       <br />
        <FloatingLabel controlId="floatingTextarea2" label="Post Content">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '200px' }}
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
          />
        </FloatingLabel>
        <br />
          <Button variant='secondary' onClick={addPost}>Add Post</Button>
          <br />
          <br />
          <h1>Markdown View</h1>
  
          <hr />
          <div className='markdown-div'> <ReactMarkdown children={markdown}/></div>
      </div>
    ) : ""}
    </div>
  )
}

export default AddTipsTricks