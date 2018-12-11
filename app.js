const Koa = require("koa");


const app = new Koa();

require("babel-register");
const MovieController = require("./routes/movieRouter.js"); // 一定要在babel-register之后
app.use(MovieController.routes());
app.use(MovieController.allowedMethods());

app.listen(8964, "127.0.0.1", () => {
    console.log('App listening on port 8964!');
});