"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
//Middle Ware
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Rate exceeded",
});
app.use(limiter).get("/howold", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //destructures dob form query
    const { dob } = req.query;
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const dobMs = dobDate.getTime(); //date of birth in milliseconds
    const currentDateMs = currentDate.getTime();
    const ageMs = currentDateMs - dobMs; //Get difference
    //If dob is undefined
    if (!dob) {
        return res.status(400).json({ error: "date of birth is required" });
    }
    //Check if dobMs is a number or if date of birth is greater than current year
    if (Number.isNaN(dobMs) || dobDate > currentDate) {
        return res.status(400).json({ error: "Invalid Date" });
    }
    let age = Math.round(ageMs / (1000 * 60 * 60 * 24 * 365));
    return res.status(200).json({ age: `${age} year(s)` });
}));
app.get("/", (_req, res) => {
    res.status(200).json("Route: /howold?dob=MM-DD-YYYY");
});
app.listen(port, () => {
    console.log(`And we have takeoff! [Port]: ${port}`);
});
//# sourceMappingURL=index.js.map