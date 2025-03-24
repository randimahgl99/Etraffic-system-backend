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
exports.CivilUserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const CivilUser_1 = __importDefault(require("../Model/CivilUser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const stripe_1 = __importDefault(require("stripe"));
const transaction_1 = __importDefault(require("../Model/transaction"));
const policeIssueFine_1 = __importDefault(require("../Model/policeIssueFine"));
const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
    throw new Error("STRIPE_SECRET_KEY is not defined in the environment variables");
}
const stripe = new stripe_1.default(stripeKey);
class CivilUserService {
    registerUser(name, email, password, idNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newUser = new CivilUser_1.default({
                name,
                email,
                password: hashedPassword,
                isAdmin: false,
                idNumber,
            });
            return yield newUser.save();
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield CivilUser_1.default.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid credentials");
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "default_secret", {
                expiresIn: "1h",
            });
            const response = {
                "token": token,
                "userType": user.isAdmin,
                "nicNo": user.idNumber || "N/A"
            };
            return response;
        });
    }
    registerAdminUser(name, email, password, idNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newUser = new CivilUser_1.default({
                name,
                email,
                password: hashedPassword,
                isAdmin: true,
                idNumber,
            });
            return yield newUser.save();
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield CivilUser_1.default.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            yield CivilUser_1.default.findByIdAndDelete(userId);
            return { success: true, message: "User deleted successfully" };
        });
    }
    editUser(userId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield CivilUser_1.default.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            if (updates.password) {
                updates.password = yield bcryptjs_1.default.hash(updates.password, 10);
            }
            Object.assign(user, updates);
            yield user.save();
            return user;
        });
    }
    editAdmin(userId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield CivilUser_1.default.findById(userId);
            if (!user) {
                throw new Error("Admin user not found");
            }
            if (!user.isAdmin) {
                throw new Error("The specified user is not an admin");
            }
            Object.assign(user, updates);
            return yield user.save();
        });
    }
    payFine(fineId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(typeof (fineId));
            const fine = yield policeIssueFine_1.default.findById(fineId);
            if (!fine) {
                throw new Error("Fine not found");
            }
            const unitAmount = Number(amount) * 100;
            //create stripe checkout session
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            unit_amount: unitAmount, // Stripe expects amount in cents
                            product_data: {
                                name: "police issued fine", // Add product name here
                                description: "A fine issues by police", // Optional but recommended
                            },
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                cancel_url: `http://localhost:5173/payment-subscription/upgrade-false`,
                success_url: `http://localhost:3000/#/civilUserDash`,
            });
            console.log('4 line');
            //save transaction in db
            const transactionData = {
                fineId,
                issueLocation: fine.issueLocation,
                amount: amount
            };
            const transaction = new transaction_1.default(transactionData);
            console.log('5 line');
            yield transaction.save();
            console.log('6 line');
            return {
                sessionId: session.id,
                url: session.url,
                transactionId: transaction._id
            };
        });
    }
    payFineStatus(sessionId, transactionId, policeIssuedFineId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield transaction_1.default.findById(transactionId);
            if (!transaction) {
                throw new Error("Transaction not found");
            }
            //get stripe checkout session data
            const session = yield stripe.checkout.sessions.retrieve(sessionId);
            let updatedTransaction;
            if (session.payment_status == "paid") {
                //update transaction in db
                updatedTransaction = yield transaction_1.default.findByIdAndUpdate(transactionId, { status: "PAID" });
                if (!updatedTransaction) {
                    throw new Error('Transaction Update Failed');
                }
                //updaate police issued fine data
                const updatedFine = yield policeIssueFine_1.default.findOneAndUpdate({ _id: policeIssuedFineId }, { isPaid: true });
                console.log('payment', updatedFine);
                if (!updatedFine) {
                    throw new Error("Police issue fine update failed");
                }
            }
            else {
                throw new Error('Paiment is pending');
            }
            return updatedTransaction;
        });
    }
}
exports.CivilUserService = CivilUserService;
