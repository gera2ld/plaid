const { stat } = require('fs/promises');

async function exists(filepath, { file, dir } = {}) {
  try {
    const result = await stat(filepath);
    if (file && result.isFile()) return true;
    if (dir && result.isDirectory()) return true;
  } catch (err) {
    if (err && err.code !== 'ENOENT') {
      console.error(err);
    }
  }
  return false;
}

function shallowMerge(first, ...others) {
  const out = Object.assign({}, first);
  for (const other of others) {
    if (!other) continue;
    Object.entries(other)
    .forEach(([key, value]) => {
      if (Array.isArray(value)) {
        out[key] = [
          ...out[key] || [],
          ...value,
        ];
      } else if (value && typeof value === 'object') {
        out[key] = {
          ...out[key],
          ...value,
        };
      } else {
        out[key] = value;
      }
    });
  }
  return out;
}

function exitError(code, message) {
  if (message) console.error(message);
  process.exit(code);
}

function catchError(func) {
  return async (...args) => {
    try {
      await func(...args);
    } catch (err) {
      exitError(1, err);
    }
  };
}

exports.shallowMerge = shallowMerge;
exports.exists = exists;
exports.exitError = exitError;
exports.catchError = catchError;
