const KoaRouter = require("koa-router");

const RequestMethods = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete"
}

function Controller ({prefix}) {
    const router = new KoaRouter();
    if (prefix) {
        router.prefix(prefix);
    }
    return function (target) {
        const descs = Object.getOwnPropertyDescriptors(target.prototype);

        for (let key in descs) {
            if (key !== "constructor") {
                const fn = descs[key].value;
                fn(router);
            }
        }
        return router;
    }
}

function Request ({url, method}) {
    return function (target, name, desc) {
        const fn = desc.value;
        desc.value = (router) => {
            router[method] (url, async (ctx, next) => {
                await fn(ctx, next);
            })
        }
    }
}

exports.Controller = Controller;
exports.Request = Request;
exports.RequestMethods = RequestMethods;