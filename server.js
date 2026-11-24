import "dotenv/config";
import express from "express";
import journal from "./Middlewares/Journal.js";
import vehiculesRouter from "./Routes/vehicules.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares 
app.use(journal);
app.use(express.json());

// Routes
app.use("/vehicules", vehiculesRouter);

// Middleware 404 (placé après les routes)
app.use((req, res) => {
  res.status(404).json({ erreur: "Route introuvable" });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});