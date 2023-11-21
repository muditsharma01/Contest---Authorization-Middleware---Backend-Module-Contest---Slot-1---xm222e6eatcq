const jwt = require('jsonwebtoken');
const { Request, Response, NextFunction } = require('express');
const JWT_SECRET = 'newtonSchoolContest';

function isLoggedIn(req, res, next) {
  // Extract the token from the Authorization header
  const token = req.headers.authorization;

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({
      message: 'Authentication failed: Missing token.',
      status: 'error',
    });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the user information to the request for further use in the route
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid token
    return res.status(401).json({
      message: 'Authentication failed: Invalid token.',
      status: 'error',
    });
  }
}

module.exports = isLoggedIn;
