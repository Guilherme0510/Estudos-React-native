const os = require('os');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.maxWorkers = Math.min(os.cpus().length, 8); // Limita o número de threads

module.exports = config;
