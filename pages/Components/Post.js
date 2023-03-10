import React from 'react'

const Post = ({ post }) => {

  console.log(post.id)
  return (
    <div>
        <h2><a href={`/post/${post.id}`}>{post.name}</a></h2>
        <small>By: {post.author}</small>
    </div>
  )
}

export default Post