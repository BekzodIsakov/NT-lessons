import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const userCredentials = {
  userName: "John",
  password: "123",
};

app.post("/login", (req, res) => {
  if (
    req.body.userName === userCredentials.userName &&
    req.body.password === userCredentials.password
  ) {
    res.status(200).send({
      token: "John_123",
      name: "Ben",
      img: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.listen(8080, () => console.log("Server is live on port:8080"));

// req
// fetch("http://localhost:8080/login", {
//   method: "POST",
// headers: {
//   'Content-Type': "application/json",
// },
// body: JSON.stringify({userName: 'John', password: "123"})
// })
