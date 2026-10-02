import express from "express"
import axios from 'axios';
 
const app = express();
const port = 3000
 
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
 
app.get("/", (req, res) => {
    res.render("index.ejs");
});
 
app.post("/joke", async (req, res) => {
  const name = req.body.name;
  //console.log(name)
 
  if(!name){
    res.render("index.ejs", { error: "Please enter your name and try again" });
      return;
  }
 
  try {
      const result = await axios.get("https://v2.jokeapi.dev/joke/Any?safe-mode");
      res.render("index.ejs", {joke: result.data, name: name});
  } catch(error) {
    console.log(error.message)
    res.render("index.ejs", { error: "Couldn't get a joke, please try again" });
  }
})
 
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
 
