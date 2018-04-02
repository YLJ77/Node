/*
 * Create and export configuration variables
 *
 */

// Cntainer for all the environments
let environments = {};

// Staging (default) environment
environments.staging = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'staging'
}

// Production environment
environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production'
}

// Determine which environment was passed as command-line argument
let currentEnvironment = process.env.NODE_ENV || '';
let environmentToExport = environments[currentEnvironment] || environments['staging'];

module.exports = environmentToExport;
