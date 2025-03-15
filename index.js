import express, { urlencoded } from "express"
import axios from "axios"

const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.render("index.ejs")
});










app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});