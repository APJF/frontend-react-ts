enum HttpStatusCode {
    Ok = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    UnprocessableEntity = 422, // Thường dùng cho lỗi validation
    InternalServerError = 500
  }
  export default HttpStatusCode