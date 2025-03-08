const express = require("express");
const app = express();

//For passing information through Postman
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
