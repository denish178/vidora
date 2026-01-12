import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  // 1️⃣ Get token from Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    // 2️⃣ Verify token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 3️⃣ Attach user info to request
    req.user = decodedToken;

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }
});
