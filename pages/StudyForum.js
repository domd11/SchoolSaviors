import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiFillDelete, AiFillPlusCircle, AiFillPlusSquare } from 'react-icons/ai';
import { auth, db } from '../Firebase';
import ForumPost from './Components/ForumPost';
import NavbarHeading from './Components/Navbar';
import Navbar from './Components/Navbar';
import ColorSchemesExample from './Components/Navbar';
import TopicForm from './Components/TopicForm';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, FloatingLabel } from 'react-bootstrap';

const Forum = () => {
  const heading = useRef(null); 
  const content = useRef(null);
  const topic = useRef(null); 


const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);

  const [user, loading] = useAuthState(auth); 

  const getData = async () => {
    const ref = collection(db, "study-forum"); 
    await getDocs(ref).then((response) => {
        setPosts(response.docs.map((data) => {
            return {...data.data(), id: data.id}
        }));
    });

    console.log(posts)
}


  const post = async () => {
    const date = new Date();
        const formatter = new Intl.DateTimeFormat(undefined, {
            dateStyle: "short", 
            timeStyle: "short",
        }).format(date)
    await addDoc(collection(db, "study-forum"), {
      heading: heading.current.value, 
      details: content.current.value,  
      authorName:  user.displayName, 
      authorId: user.uid, 
      dateAdded: formatter, 
      topics: topics, 
    }); 

    heading.current.value = ''; 
    content.current.value = ''; 

    getData(); 
  }

  const addTopic = () => {
    setTopics([...topics, topic.current.value])
  }

  const removeTopic = (item) => {
    console.log(item)
    topics.splice(`${item}`, 1)
    setTopics([...topics])
    console.log(topics)
  } 

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [!loading])
 
  return (
    <div className='forum'>
    <NavbarHeading />
      {user ? (
        <div>
        <h1>Study Forum</h1>
        <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">Heading</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          ref={heading}
        />
      </InputGroup>        <br />
      <FloatingLabel controlId="floatingTextarea2" label="Description">
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        style={{ height: '100px' }}
        ref={content}
      />
    </FloatingLabel>        
    <br />
    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">
    <Button onClick={addTopic} variant="secondary" style={{ display: "inline" }}>Add Topic</Button>
    </InputGroup.Text>
    <Form.Control
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
      ref={topic}
    />
  </InputGroup>
  <div>
        <ul>
        {topics.map((x) => {
          return <div>
            <span>{x} </span>
            <Button variant="danger" onClick={() => removeTopic(x)}>Delete Topic</Button>
            <br />
          </div>
        })}
        </ul>
        </div>
        <Button onClick={post}>Post</Button>
        {posts.map((post) => {
          return <ForumPost post={post} />
        })}
        </div>
      ) : ""}
    </div>
  )
}

export default Forum