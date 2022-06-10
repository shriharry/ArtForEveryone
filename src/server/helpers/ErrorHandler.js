const {
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED_REQUEST,
  FORBIDDEN_REQUEST,
  RESOURCE_CONFLICT,
  INTERNAL_SERVER,
} = require("@src/utils/httpStatusCodes");

class BaseError extends Error {
  constructor(name, statusCode) {
    super(name);

    this.name = name;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends BaseError {
  constructor(name, statusCode = NOT_FOUND) {
    super(name, statusCode);
  }
}

class BadRequestError extends BaseError {
  constructor(name, statusCode = BAD_REQUEST) {
    super(name, statusCode);
  }
}

class UnauthorizedRequestError extends BaseError {
  constructor(name, statusCode = UNAUTHORIZED_REQUEST) {
    super(name, statusCode);
  }
}

class ForbiddenRequestError extends BaseError {
  constructor(name, statusCode = FORBIDDEN_REQUEST) {
    super(name, statusCode);
  }
}

class ResourceConflictError extends BaseError {
  constructor(name, statusCode = RESOURCE_CONFLICT) {
    super(name, statusCode);
  }
}

class InternalServerError extends BaseError {
  constructor(name, statusCode = INTERNAL_SERVER) {
    super(name, statusCode);
  }
}

class DatabaseError extends BaseError {
  constructor(name, statusCode = INTERNAL_SERVER) {
    super(name, statusCode);
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedRequestError,
  ForbiddenRequestError,
  ResourceConflictError,
  NotFoundError,
  DatabaseError,
  InternalServerError,
};
