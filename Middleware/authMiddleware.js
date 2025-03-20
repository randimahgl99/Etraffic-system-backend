"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            // return res.status(401).json({ success: false, message: "Access denied. No token provided." });
            console.log('run');
        }
        // const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
        // (req as any).user = decoded;
        next();
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Invalid token." });
    }
};
exports.authMiddleware = authMiddleware;
