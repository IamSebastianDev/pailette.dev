import dotenv from 'dotenv';
import { resolve } from 'node:path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { handleAsync } from '@iasd/handle-async';

dotenv.config({
  path: resolve(process.cwd(), "../../.env")
});

var __defProp$6 = Object.defineProperty;
var __defProps$4 = Object.defineProperties;
var __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$6(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$6(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$4 = (a, b) => __defProps$4(a, __getOwnPropDescs$4(b));
var __publicField$6 = (obj, key, value) => {
  __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    __publicField$6(this, "code", 404);
    __publicField$6(this, "name", "HttpNotFoundError");
  }
  static intercept(origin) {
    return async (err, req, res, next) => {
      if (!(err instanceof NotFoundError))
        return next(err);
      return res.status(err.code).json({
        data: null,
        error: __spreadValues$4(__spreadProps$4(__spreadValues$4({}, err), {
          message: err.message
        }), origin ? { origin } : {})
      });
    };
  }
}

var __defProp$5 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$5(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$5(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
var __publicField$5 = (obj, key, value) => {
  __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    __publicField$5(this, "code", 400);
    __publicField$5(this, "name", "HttpBadRequestError");
  }
  static intercept(origin) {
    return async (err, req, res, next) => {
      if (!(err instanceof BadRequestError))
        return next(err);
      return res.status(err.code).json({
        data: null,
        error: __spreadValues$3(__spreadProps$3(__spreadValues$3({}, err), {
          message: err.message,
          cause: err.cause
        }), origin ? { origin } : {})
      });
    };
  }
}

var __defProp$3 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class GenericError extends Error {
  constructor(message = "Internal Server Error") {
    super(message);
    __publicField$3(this, "code", 500);
    __publicField$3(this, "name", "HttpInternalServerError");
  }
  static intercept(origin) {
    return async (err, req, res, next) => {
      if (!(err instanceof Error))
        return next(err);
      return res.status(500).json({
        data: null,
        error: __spreadValues$1(__spreadProps$1(__spreadValues$1({}, err), {
          message: err.message,
          cause: err.cause
        }), origin ? { origin } : {})
      });
    };
  }
}

var __defProp$2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class NotAuthorizedError extends Error {
  constructor(message = "Not Authorized") {
    super(message);
    __publicField$2(this, "code");
    this.code = 401;
    this.name = "HttpNotAuthorizedError";
  }
  static intercept(origin) {
    return async (err, req, res, next) => {
      if (!(err instanceof NotAuthorizedError))
        return next(err);
      return res.status(err.code).json({
        data: null,
        error: __spreadValues$2(__spreadProps(__spreadValues$2({}, err), {
          message: err.message,
          cause: err.cause
        }), origin ? { origin } : {})
      });
    };
  }
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PrimitiveParser {
  constructor() {
    __publicField$1(this, "primitives",  new Map([
      ["true", true],
      ["false", false],
      ["null", null],
      ["undefined", void 0]
    ]));
  }
  isNumeric(str) {
    return /^-?\d+(\.\d+)?$/gim.test(str.trim());
  }
  parseNumber(str) {
    if (str.includes(".")) {
      return Number(str.trim());
    }
    const bi = BigInt(str.trim());
    if (bi <= BigInt(Number.MAX_SAFE_INTEGER)) {
      return Number(bi);
    }
    return bi;
  }
  convert(value) {
    if (value === void 0) {
      return value;
    }
    if (this.primitives.has(value)) {
      return this.primitives.get(value);
    }
    if (this.isNumeric(value)) {
      return this.parseNumber(value);
    }
    return value;
  }
  parse(value) {
    if (value === void 0) {
      return void 0;
    }
    if (Array.isArray(value)) {
      return value.map(this.convert);
    }
    return this.convert(value);
  }
  assert(value, assert) {
    return assert(this.convert(value));
  }
}

const createPayload = (req, res) => {
  const parser = new PrimitiveParser();
  const { params, query, body } = req;
  const { locals } = res;
  return {
    params: Object.entries(params).map(([key, value]) => [key, parser.parse(value)]),
    query: Object.entries(query).map(([key, value]) => [key, parser.parse(value)]),
    body,
    locals
  };
};

const createController = (controllerFunction) => {
  return async (req, res, next) => {
    let _meta;
    {
      const { originalUrl, ip, hostname, headers } = req;
      _meta = { req: { url: originalUrl, ip, hostname, headers }, timestamp: Date.now() };
    }
    const { result: data, errorValue } = await handleAsync(
      async () => await controllerFunction(createPayload(req, res), req, res)
    );
    if (errorValue || !data) {
      return next(errorValue);
    }
    if (data) {
      return res.json({
        _meta,
        data
      });
    }
  };
};

var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ConfigService {
  constructor() {
    __publicField(this, "parser", new PrimitiveParser());
  }
  get(token) {
    const envVar = process.env[token];
    if (envVar === void 0) {
      return void 0;
    }
    return this.parser.parse(envVar);
  }
  getOrFail(token, error) {
    const envVar = process.env[token];
    if (!envVar) {
      throw new Error(error != null ? error : `Could not resolve ${token.toString()}.`);
    }
    return this.parser.parse(envVar);
  }
}

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const loq = ({ verbose, suppress, appName }) => {
  return async (req, res, next) => {
    const { method, originalUrl, query } = req;
    const [url, _] = originalUrl.split("?");
    const parts = [`\x1B[1m\x1B[36m[${appName}]\x1B[0m\x1B[36m [${method}]::${url}`];
    if (verbose && !suppress) {
      parts.push(
        Object.entries(__spreadValues({}, query)).map(([k, v]) => `@${k}->${v};`).join(" ")
      );
    }
    parts.push(`\x1B[0m`);
    if (!suppress) {
      console.log(parts.join(""));
    }
    next();
  };
};

const env = new ConfigService();
const app = express().use(
  cors(),
  helmet(),
  compression(),
  loq({ verbose: true, appName: env.getOrFail("APP_NAME") })
);

const getHealth = async () => {
  return {
    status: "ok"
  };
};

const getHealthController = createController(async (payload) => {
  return await getHealth();
});

const healthController = express.Router();
healthController.get("/", getHealthController);

const routes = express.Router().use("/health", healthController).use(
  NotFoundError.intercept(),
  BadRequestError.intercept(),
  GenericError.intercept(),
  NotAuthorizedError.intercept()
);

var _a;
const PORT = (_a = env.get("PORT")) != null ? _a : 3e3;
const APP_NAME = env.get("APP_NAME");
app.use("/api/v1", routes);
app.use("*", (_, res) => res.status(404).send());
app.listen(PORT, () => console.log(`\x1B[34m\x1B[1m[${APP_NAME}]\x1B[0m\x1B[34m started on port ${PORT}\x1B[0m`));
//# sourceMappingURL=index.mjs.map
