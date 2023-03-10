import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Navbar } from 'react-bootstrap';
import { db } from '../Firebase';
import NavbarHeading from './Components/Navbar';
import ColorSchemesExample from './Components/Navbar';
import Post from './Components/Post';

const TipsAndTricks = () => {
    const [posts, setPosts] = useState([]);

    const getData = async () => {
        const ref = collection(db, "tips-tricks"); 
        await getDocs(ref).then((response) => {
            setPosts(response.docs.map((data) => {
                return {...data.data(), id: data.id}
            }));
        });

        console.log(posts)
    }

    useEffect(() => {
        getData();
    }, [])
  return (
    <div>
    <NavbarHeading />
        <h1>Tips and Tricks</h1>
        <a href='/AddTipsTricks'>Add Post</a>

        <hr />

        {posts.length === 0 ? <h1>There are currently no posts. Add One!</h1> : (
            <div>
            {posts.map((post) => {
                return <Post post={post} />
            })}
            </div>
        )}
    </div>
  )
}

export default TipsAndTricks


// const getData = async () => {
//     const postsRef = collection(db, "posts"); 
//     await getDocs(postsRef).then((response) => {
//         setAllPosts(response.docs.map((data) => {
//           return {...data.data(), id: data.id}
//         })); 
//       });
// }
