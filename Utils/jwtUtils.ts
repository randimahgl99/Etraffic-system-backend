import jwt from "jsonwebtoken";

export const generateToken = (id: string, email: string): string => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });
};
