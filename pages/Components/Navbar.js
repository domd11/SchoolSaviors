import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase';

function NavbarHeading() {
  const [user, loading] = useAuthState(auth)
  return (
    <>
      {user ? (
        <Navbar  style={{ margin: "0px" }} bg="secondary" variant="dark">
        <Container  style={{ margin: "0px" }}>
          <Navbar.Brand href="/">SchoolSavior</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/StudyForum">Forum</Nav.Link>
            <Nav.Link href="/TipsAndTricks">Tips & Tricks</Nav.Link>
          </Nav>
          <Nav className='justify-content-end'>
            <Nav.Link href='/Account' style={{ color: "white" }}>Signed in as: <span style={{ textDecoration: "underline", color: "darkgray" }}>{user.displayName}</span></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      ) : (
        <Navbar  style={{ margin: "0px" }} bg="secondary" variant="dark">
        <Container  style={{ margin: "0px" }}>
          <Navbar.Brand href="/">SchoolSavior</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav className='justify-content-end'>
          </Nav>
        </Container>
      </Navbar>
      )}
  
    </>
  );
}

export default NavbarHeading;