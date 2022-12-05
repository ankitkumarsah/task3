import express from "express";
import cors from "cors";
import helmet from "helmet";
//For Compressing the request
import compression from "compression";

//Custome import
import { APP_PORT } from "./configs";
import librarianRoute from "./routes/AdminRoute";
import authRoute from "./routes/authRoute";
import userRoute from "./routes/userRoute";
const app = express();
const port = APP_PORT || 5000;

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

app.use(authRoute);
app.use("/user", userRoute);
app.use("/admin", librarianRoute);

app.get("*", (req, res) => {
  res.status(404).json({ message: "Sorry,Requested Route Not Found!" });
});

app.listen(port, () => {
  console.log(`Process id ${process.pid} server is running on port ${port}`);
});
