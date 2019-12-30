const keys = require('../keys')

module.exports = function(email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Account create',
        html: `
            <h1>Welcome</h1>
            <p>Your accaut ${email}</p>
            <hr />
            <a href="${keys.BASE_URL}">Courses</a>
        `
    }
}
