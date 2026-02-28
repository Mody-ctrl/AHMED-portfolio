// Utility functions for the portfolio backend

const utils = {
  // Format validation errors
  formatValidationErrors: (errors) => {
    return errors.array().map(error => ({
      field: error.param,
      message: error.msg
    }));
  },

  // Sanitize input data
  sanitizeInput: (data) => {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        sanitized[key] = value.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  },

  // Generate unique ID
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Format success response
  successResponse: (data = null, message = 'Success') => {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  },

  // Format error response
  errorResponse: (error, statusCode = 500) => {
    return {
      success: false,
      error: {
        message: error.message || 'Internal server error',
        status: statusCode
      },
      timestamp: new Date().toISOString()
    };
  }
};

module.exports = utils;