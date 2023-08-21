const app = require('./app');

require("dotenv").config();
const PORT = (process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log(`.env: Server is listening on ${PORT}`);
    console.log(`.env: DATABASE_URL ${process.env.DATABASE_URL}`);
});