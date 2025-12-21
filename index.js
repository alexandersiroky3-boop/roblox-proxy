import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Roblox Proxy is running.");
});
app.get("/games/:universeId/game-passes", async (req, res) => {
	try {
		const universeId = req.params.universeId;

		const robloxUrl =
			`https://games.roblox.com/v1/games/${universeId}/game-passes?limit=100&sortOrder=Asc`;

		const response = await fetch(robloxUrl, {
			headers: { "User-Agent": "RobloxProxy" }
		});

		const data = await response.json();
		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch game passes" });
	}
});


