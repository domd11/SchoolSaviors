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
            <p><a href="/TipsAndTricks">Studying Tips and Tricks</a></p>
            <p><a href="/StudyForum">Study Forum</a></p>
        </div>
      ) : ""}
    </div>
  )
}

export default HomePage