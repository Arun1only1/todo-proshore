import app from "./app.js";

const port = process.env.API_PORT;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
