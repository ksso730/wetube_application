import "regenerator-runtime";
import "dotenv/config"
import "./db";
import app from "./server";

const port = process.env.PORT || 4001;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${port}`);

app.listen(port, handleListening);
