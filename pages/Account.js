import React from 'react'
import { Button } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Firebase'
import NavbarHeading from './Components/Navbar'

const Account = () => {
    const [user, loading] = useAuthState(auth)
  return (
    <div>
    <NavbarHeading />

        {user ? (
            <div style={{ paddingTop: "70px" }}>
            <h1>{user.displayName}</h1>
            <Button variant="danger" onClick={() => auth.signOut()}>Sign Out</Button>
            </div>
        ) : (
            <div>
                <p><a>Return Home</a></p>
            </div>
        )}
    </div>
  )
}

export default Account