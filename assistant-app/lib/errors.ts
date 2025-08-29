export enum ErrorCode {
  // Network/Connection errors
  NETWORK_ERROR = "NETWORK_ERROR",
  SERVER_ERROR = "SERVER_ERROR",

  // Database errors
  DATABASE_ERROR = "DATABASE_ERROR",

  // AI Service errors
  AI_SERVICE_UNAVAILABLE = "AI_SERVICE_UNAVAILABLE",

  // Validation errors
  INVALID_INPUT = "INVALID_INPUT",

  // Generic
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export interface AppError {
  code: ErrorCode;
}

export class CustomError extends Error {
  public readonly code: ErrorCode;

  constructor({ code }: { code: ErrorCode }) {
    super();
    this.name = "CustomError";
    this.code = code;
  }

  toJSON(): AppError {
    return {
      code: this.code,
    };
  }
}
