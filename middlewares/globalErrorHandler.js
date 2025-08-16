const globalErrorHandler=(err, req, res, next)=>{
    const statusCode=err.status || 500
    const errorMessage=err.message || "Internel Server Error"
    const errorDetails= err.errors || []

    res.status(statusCode).json({Error:errorMessage, Details:errorDetails})
}

export default globalErrorHandler