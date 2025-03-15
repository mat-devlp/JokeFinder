import express, { urlencoded } from "express"
import axios from "axios"

const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw&type=single");
        const result = response.data;
        console.log(result.joke);  
        res.render("index", { jokes: result });  
    } catch (error) {
        console.error("Error", error.message);
        res.render("index", { error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
