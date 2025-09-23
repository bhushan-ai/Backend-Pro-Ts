"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const dbConnection_1 = require("./services/dbConnection");
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("api started");
});
app.use(express_1.default.json());
app.use("/api", user_routes_1.default);
(0, dbConnection_1.dbConnection)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`server started on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.log(`server is not started`, error);
});
//# sourceMappingURL=server.js.map