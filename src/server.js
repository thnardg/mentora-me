import app from "./app.js";
import "dotenv/config";

app.listen(process.env.PORT || 3001, "0.0.0.0");
