# HTTP Status Codes — Exercise 5.4

1. User successfully logged in  
**200 OK** — The login request was successful and the server returned the expected response.

2. User tried to access a page without being logged in  
**401 Unauthorized** — The user is not authenticated and must log in first.

3. User is logged in but tried to access another user's private data  
**403 Forbidden** — The user is authenticated but does not have permission to access this resource.

4. User requested a blog post that doesn't exist  
**404 Not Found** — The requested resource does not exist on the server.

5. User successfully created a new task  
**201 Created** — A new resource was successfully created on the server.

6. User sent a POST request with invalid JSON  
**400 Bad Request** — The server cannot process the request due to invalid JSON syntax.

7. User deleted a task successfully (no data to return)  
**204 No Content** — The request was successful, but there is no content to return.

8. Database is down and the server can't handle the request  
**500 Internal Server Error** — The server encountered an unexpected condition and cannot complete the request.

9. User exceeded the rate limit  
**429 Too Many Requests** — The user has sent too many requests in a given time period.

10. User requested data and got it successfully  
**200 OK** — The request was successful and the server returned the requested data.