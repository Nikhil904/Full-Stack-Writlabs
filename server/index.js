import express from "express";
import cors from "cors"
import ConnectDB from "./Database/DB.js";
import route from "./Middleware/routeMiddleware.js";
ConnectDB();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(route);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
