const { Controller, Request, RequestMethods } = require("./decorator.js");

@Controller({prefix: "/movie"})
class MovieController {
    @Request({url: "/", method: RequestMethods.GET})
    async getAllMovies(ctx) {
        ctx.body = ctx.url + "get all movies"
    }

    @Request({url: "/:id", method: RequestMethods.GET})
    async getMovieById(ctx) {
        ctx.body = ctx.url + "get movie of id: " + ctx.params.id
    }
}

module.exports = MovieController;