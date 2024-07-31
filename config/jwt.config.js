module.exports = {
    secret: 'lokep',
    expiresIn: '8h',
    unlessPath: ['/api/auth/login', '/api/auth/register'],
    errorMessage: 'Invalid token',
    lackOfTokenMessage: 'Unauthorized access'
}
