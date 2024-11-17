import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Cookies from "universal-cookie";
const cookies = new Cookies();


export default function AuthComponent() {

  // Dummy course data
  const courses = [
    {
      id: 1,
      name: "React for Beginners",
      image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68", 
      duration: "3 hours"
    },
    {
      id: 2,
      name: "Advanced Node.js",
      image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68", 
      duration: "4 hours"
    },
    {
      id: 3,
      name: "Python Crash Course",
      image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68", 
      duration: "2.5 hours"
    },
    {
      id: 4,
      name: "Web Development with HTML & CSS",
      image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68", 
      duration: "5 hours"
    }
  ];
  

  // Logout function
  const logout = () => {
    // Destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // Redirect user to the landing page
    window.location.href = "/";
  };

  return (
    <div className="text-center">
      <h1>Auth Component</h1>
      <div className="mt-4">
        <h2>Available Courses</h2>
        <Row className="justify-content-center">
          {/* Loop through courses and display them */}
          {courses.map((course) => (
            <Col key={course.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={course.image} />
                <Card.Body>
                  <Card.Title>{course.name}</Card.Title>
                  <Card.Text>
                    <strong>Duration:</strong> {course.duration}
                  </Card.Text>
                  <Button variant="primary">Enroll</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

            {/* Logout Button */}
            <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
