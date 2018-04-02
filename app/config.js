/*
 * Create and export configuration variables
 *
 */

// Cntainer for all the environments
let environments = {};

// Staging (default) environment
environments.staging = {
    'port': 3000,
    'envName': 'staging'
}

// Production environment
environments.production = {
    'port': 5000,
    'envName': 'production'
}

// Determine which environment was passed as command-line argument
let currentEnvironment = process.env.NODE_ENV || '';
let environmentToExport = environments[currentEnvironment] || environments['staging'];

module.exports = environmentToExport;
