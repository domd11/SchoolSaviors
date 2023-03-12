import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../Firebase'

const ForumPost = ({ post }) => {
  const [topics, setTopics] = useState([])
  
  const [user, loading] =  useAuthState(auth)

  useEffect(() => {
    setTopics(post.topics)
  }, [])
  return (
    <div>
        {user ? (
          <>
          <h2><a href={`/Forum/${post.id}`}>{post.heading}</a></h2>
          <p>{post.authorName}</p>
          <small>{post.dateAdded}</small>
          <br />
          {post.topics.map((x) => {
            return <span className='topic'>{x}</span>
          })}
          </>
        ) : ""}
    </div>
  )
}

export default ForumPost