import express, { urlencoded } from "express"
import axios from "axios"

const app = express();
const port = 4000;
const APIsearch = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw&type=single&contains=";
const APIrandom = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw&type=single";

app.use(express.static("public"));
app.use(urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        let response;

        if (searchTerm) {
            const encodedTerm = encodeURIComponent(searchTerm.trim());
            response = await axios.get(APIsearch + encodedTerm);
        } else {
            response = await axios.get(APIrandom);
        }

        const result = response.data;
        console.log(result.joke);

        res.render("index", { jokes: result, search: searchTerm });

    } catch (error) {
        console.error("Error:", error.message);
        res.render("index", { error: "Sorry, no jokes found!" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
