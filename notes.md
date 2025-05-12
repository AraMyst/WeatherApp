# Async/Await Summary

`async/await` is a modern way to work with asynchronous code in JavaScript. It helps you write code that looks synchronous but handles promises behind the scenes.

## Example

```js
async function myFunction() {
  const data = await axios.get('https://somerandomapi.com/somerandomdata');
  return data;
}

const result = await myFunction();
```

---

## What Is a Promise?

A **Promise** is a built-in JavaScript object that represents the eventual result of an asynchronous operation.

**Key Points:**
- A promise can be in one of three states:
  - **Pending** – the operation is still happening
  - **Fulfilled** – the operation completed successfully
  - **Rejected** – the operation failed
- Promises are used to handle asynchronous operations, like fetching data from an API.

---

## What Is an API?

An **API** (Application Programming Interface) lets you talk to another program or service to get or send data.

- Always check the API documentation to know what URL to use and what data it returns.
- Use `try...catch` to handle errors like broken connections or bad responses.

---

## HTTP Status Codes

### 1xx – Informational
- **100 Continue** – The server has received the request headers. Keep going!

### 2xx – Success
- **200 OK** – Everything worked!
- **201 Created** – A new resource was successfully created (e.g., after a POST).
- **204 No Content** – The request was successful but there's no content to return.

### 3xx – Redirection
- **301 Moved Permanently** – The resource has been moved to a new URL.
- **302 Found** – Temporarily redirected.
- **304 Not Modified** – Use cached version; the resource hasn't changed.

### 4xx – Client Errors
- **400 Bad Request** – Something is wrong with your request.
- **401 Unauthorized** – You need to log in or provide an API key.
- **403 Forbidden** – You're not allowed to access this.
- **404 Not Found** – The resource doesn't exist.
- **429 Too Many Requests** – You're being rate-limited (slow down!).

### 5xx – Server Errors
- **500 Internal Server Error** – The server messed up.
- **502 Bad Gateway** – Server got an invalid response from another server.
- **503 Service Unavailable** – The server is down or busy.
- **504 Gateway Timeout** – The server took too long to respond.