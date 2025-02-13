const errorHandler = (err, req, res, next) => {
    console.log(err,"ini error");

    let status = 500
    let message = "Internal Server Error"

    if (err.name == 'LoginError') {
        status = 401
        message = 'Email/Password salah'
    }

    if (err.name == 'Unauthorized') {
        status = 401
        message = "Unauthorized"
    }

    if (err.name == 'JsonWebTokenError') {
        status = 401
        message = 'Unauthorized'
    }

    if (err.name == `password is required`) {
        status = 401
        message = `password is required`
    }
    if (err.name == `email is required`) {
        status = 401
        message = `email is required`
    }
    if (err.name == 'All fields must be filled') {
        status = 401
        message = 'All fields must be filled'
    }
    if (err.name == 'Id not found') {
        status = 404
        message = 'Id not found'
    }
    if (err.name == 'Data not found') {
        status = 404
        message = 'Data not found'
    }

    res.status(status).json({
        message
    })
}

module.exports = errorHandler