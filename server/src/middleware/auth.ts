import PasswordResetToken from "#/models/passwordResetToken";
import {JWT_SECRET} from "#/utils/variables";
import {RequestHandler} from "express";
import {JwtPayload, verify} from "jsonwebtoken";
import User from "#/models/user";

export const isValidPassResetToken: RequestHandler = async (req, res, next) => {
  const {token, userId} = req.body;
  const resetToken = await PasswordResetToken.findOne({
    owner: userId,
  });
  if (!resetToken) return res.status(403).json({error: "Unauthorized access,Invalid Token"});
  const isMatched = await resetToken.compareToken(token);
  if (!isMatched) return res.status(403).json({error: "Unauthorized access,Invalid Token"});

  next();
};

export const mustAuth: RequestHandler = async (req, res, next) => {
  const {authorization} = req.headers;
  const token = authorization?.split("Bearer ")[1];
  if (!token) return res.status(403).json({error: "Unauthorized request!"});

  const payload = verify(token, JWT_SECRET) as JwtPayload;
  const id = payload.userId;

  const user = await User.findOne({id: id, tokens: token});
  if (!user) return res.status(403).json({error: "Unauthorized request!"});

  req.user = {
    id: user._id,
    name: user.name,
    email: user.email,
    verified: user.verified,
    avatar: user.avatar?.url,
    followers: user.followers.length,
    followings: user.followings.length,
  };
  req.token = token;

  next();
};
export const isAuth: RequestHandler = async (req, res, next) => {
  const {authorization} = req.headers;
  const token = authorization?.split("Bearer ")[1];
  if (token) {
    const payload = verify(token, JWT_SECRET) as JwtPayload;
    const id = payload.userId;

    const user = await User.findOne({id: id, tokens: token});
    if (!user) return res.status(403).json({error: "Unauthorized request!"});

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      avatar: user.avatar?.url,
      followers: user.followers.length,
      followings: user.followings.length,
    };
    req.token = token;
  }
  next();
};

export const isVerified: RequestHandler = async (req, res, next) => {
  if (!req.user.verified) return res.status(403).json({error: "Please verify your email account"});
  next();
};
