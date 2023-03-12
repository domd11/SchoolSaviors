import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../Firebase'
import Post from './Components/Post';
const HomePage = () => {
  const user = auth.currentUser; 
  const router = useRouter();

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
      {auth.currentUser ? (
        <div>
          <h1>Hello, {user.displayName}!</h1>
            <h2>Bookmarked Forums:</h2>
            <h2>Bookmarked Tips & Tricks:</h2>
            {posts.map(post => {
              return (
                <div>
                {post.bookmarks.includes(user.email) ? <Post post={post} /> : "" }
              </div>
              )
            })}
        </div>
      ) : ""}
    </div>
  )
}

export default HomePage