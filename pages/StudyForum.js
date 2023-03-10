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
    topics.slice(`${item}`, 1)
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
      <h1>Study Forum</h1>
      <input ref={heading} style={{ height: "50px", width: "100%", paddingLeft: "10px" }} />
      <br />
      <textarea ref={content} style={{ width: "100%", height: "100px" }}/>
      <input ref={topic} style={{ paddingLeft: "10px" }} /><AiFillPlusSquare style={{ height: "32px", width: "32px" }} onClick={addTopic} />
      <div>
      <ul>
      {topics.map((x) => {
        return <div>
          <li>{x} <AiFillDelete onClick={() => removeTopic(x)} /></li>
          
        </div>
      })}
      </ul>
      </div>
      <button onClick={post} style={{ padding: "0px 30px", borderRadius: "100px" }}>Post</button>
      {posts.map((post) => {
        return <ForumPost post={post} />
      })}
    </div>
  )
}

export default Forum