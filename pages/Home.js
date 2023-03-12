import { useRouter } from 'next/router';
import React from 'react'
import { auth } from '../Firebase'
const HomePage = () => {
  const user = auth.currentUser; 
  const router = useRouter();
  return (
    <div>
      {auth.currentUser ? (
        <div>
          <h1>Hello, {user.displayName}!</h1>
            <h2>Bookmarked Forums:</h2>
            <h2>Bookmarked Tips & Tricks:</h2>
        </div>
      ) : ""}
    </div>
  )
}

export default HomePage