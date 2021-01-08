process.env.NODE_ENV = process.env.NODE_ENV || 'development';

exports.isProd = process.env.NODE_ENV === 'production';
exports.isTest = process.env.NODE_ENV === 'test' || process.env.BABEL_ENV === 'test';
