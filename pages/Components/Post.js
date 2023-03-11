import { useRouter } from 'next/router';
import React from 'react'
import { PopoverBody } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const Post = ({ post }) => {
    const router = useRouter();
  console.log(post.id)
  return (
    <Card className="text-center" style={{  width: "50%", marginRight: "10px" }}>
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
  )
}

// <h2><a href={`/post/${post.id}`}>{Post.name}</a></h2>
// <small>By: {post.author}</small>
// <br />
// <span>Likes: {post.likes.length}</span>

export default Post