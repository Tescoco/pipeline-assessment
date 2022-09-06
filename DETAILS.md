# Design and implementation details

### Implemetation

1. Created an endpoint with route `/howold`
2. I then added a rate limiter middleware using a npm package called `express-rate-limit`
3. The endpoint consumes this middleware, accepts a request query of `dob` and does its calculation.

### How does this work

- Firstly we destructure `dob` from request query,
- Then we check if the dob is defined
- If dob is not defined, we return `date of birth is required`
- Then we check if dob length is greater than 10, if it is, we assume it the dob is in milliseconds and we convert it into an interger.
- Then we use the inbuilt js-function Date to convert our dob into a standard time
- lastly we check if the date of birth is `greater` than the current date, if it is, we return `Invaid Date`
- If all checks passes, we minus the current date from the date of birth, we get our age in `milliseconds`
- Finally we convert these milliseconds into a year and return `{age: 24 year(s)}`
