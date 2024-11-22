// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "npm:express@4.18.2";
import data from "./data.json" with { type: "json" };

const app = express();
const port = Number(Deno.env.get("PORT")) || 3000;

const reqLogger = function (req: { method: any; url: any; hostname: any; }, _res: any, next: () => void) {
  console.info(`${req.method} request to "${req.url}" by ${req.hostname}`);
  next();
};
app.use(reqLogger);

app.get("/", (_req, res) => {
  res.status(200).send("Hello from Deno and Express!");
});

app.get("/api", (req, res) => {
  res.send(data);
});

app.get("/api/:dinosaur", (req, res) => {
  if (req?.params?.dinosaur) {
    const found = data.find((item) =>
      item.name.toLowerCase() === req.params.dinosaur.toLowerCase()
    );
    if (found) {
      res.send(found);
    } else {
      res.send("No dinosaurs found.");
    }
  }
});


app.listen(port, () => {
  console.log(`Listening on ${port} ...`);
});