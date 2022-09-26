const express = require("express");
const app = express();
  
app.get("/", (req, res) => {
  res.send("Hello World!");
});
  
const PORT = process.env.PORT || 9300;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));