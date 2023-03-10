import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../Firebase';
import NavbarHeading from '../Components/Navbar';
import Navbar from '../Components/Navbar';
import ColorSchemesExample from '../Components/Navbar';
import Response from '../Components/Response';

const ForumPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([])
  const [responses, setResponses] = useState([]);
  const respsonse = useRef(null);

  const [user, loading] = useAuthState(auth)
  

  const getData = async () => {
    const ref = doc(db, "study-forum", id)

    const snap = await getDoc(ref); 
    if (snap.exists()) {
      setData(snap.data())
    } else {
      alert("Data not found")
    }

    const responsesRef = collection(db, `study-forum/${id}/responses`); 
    await getDocs(responsesRef).then((response) => {
      setResponses(response.docs.map((data) => {
        return {...data.data(), id: data.id}
      }));
    });
  }

  const getResponses = async () => {
    const responsesRef = collection(db, `study-forum/${id}/responses`); 
    await getDocs(responsesRef).then((response) => {
      setResponses(response.docs.map((data) => {
        return {...data.data(), id: data.id}
      }));
    });
  }

  const respond = async () => {

    const date = new Date();
        const formatter = new Intl.DateTimeFormat(undefined, {
            dateStyle: "short", 
            timeStyle: "short",
        }).format(date)

    await addDoc(collection(db, `study-forum/${id}/responses`), {
      authorId: user.uid, 
      authorName: user.displayName, 
      response: respsonse.current.value,
      likes: [],
      added: formatter, 
    })

    respsonse.current.value = '';

    getResponses();
  }

  useEffect(() => {
    if(!loading) {
      getData();
    }
  }, [!loading])
 
  return (
    <div>
    <NavbarHeading />
      <h2>{data.heading}</h2>
      <p>{data.author}</p>
      <small>{data.dateAdded}</small>
      {data.topics && data.topics.length > 0 ? (
        <div>
        {data.topics.map((x) => {
          return <span className='topic'>{x}</span>
        })}
        </div>
      ) : ""}
      <p><strong>{data.details}</strong></p>
      <br />
      <textarea ref={respsonse} style={{ width: "100%", height:"100px" }} />
      <br />
      <button onClick={respond}>Add response</button>
      {responses.map((x) => {
        return <Response response={x} getResponses={getResponses} id={id}  />
      })}
    </div>
  )
}

export default ForumPost