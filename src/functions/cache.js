const cache = {};

export const getCachedData = (key) => {
  const cached = cache[key];
  if (cached && Date.now() - cached.timestamp < 60000) {
    // 1 minute cache
    return cached.data;
  }
  return null;
};

export const setCachedData = (key, data) => {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
};
