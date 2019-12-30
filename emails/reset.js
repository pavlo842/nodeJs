const keys = require('../keys')

module.exports = function(email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Access recovery',
        html: `
            <h1>You forgot pass?</h1>
            <p>If no - go out!</p>
            <p>Else</p>
            <p><a href="${keys.BASE_URL}/auth/password/${token}">Restore access</a></p>
            <hr />
            <a href="${keys.BASE_URL}">Courses</a>
        `
    }
}
