import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { PopoverBody } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase';
const Post = ({ post }) => {
    const router = useRouter();
  const [user,  loading] = useAuthState(auth);
  return (
    <div style={{ width: "50%" }}>
      {user ? (
        <Card className="text-center" style={{ marginRight: "10px" }}>
    <Card.Header>{post.author}</Card.Header>
    <Card.Body>
      <Card.Title>{post.name}</Card.Title>
    
      <Card.Subtitle>
        Likes: {post.likes.length}
      </Card.Subtitle>
      <Button variant="primary" onClick={() => router.push(`/post/${post.id}`)}>Read More</Button>
    </Card.Body>
    <Card.Footer className="text-muted">{post.dateAdded}</Card.Footer>
  </Card>
      ) : ""}
    </div>
  )
}

// <h2><a href={`/post/${post.id}`}>{Post.name}</a></h2>
// <small>By: {post.author}</small>
// <br />
// <span>Likes: {post.likes.length}</span>

export default Post