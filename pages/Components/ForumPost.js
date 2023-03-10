import React, { useEffect, useState } from 'react'

const ForumPost = ({ post }) => {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    setTopics(post.topics)
  }, [])
  return (
    <div>
        <h2><a href={`/Forum/${post.id}`}>{post.heading}</a></h2>
        <p>{post.authorName}</p>
        <small>{post.dateAdded}</small>
        <br />
        {post.topics.map((x) => {
          return <span className='topic'>{x}</span>
        })}
    </div>
  )
}

export default ForumPost