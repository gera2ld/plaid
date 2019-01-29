process.env.NODE_ENV = process.env.NODE_ENV || 'development';

exports.isProd = process.env.NODE_ENV === 'production';
