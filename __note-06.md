- axios config file setup in context folder in auth.jsx

  ```
  auth.defaults.baseURL =  'http://localhost:8000/api/v1'
  auth.defaults.headers.common['Authorization'] =  auth?.token
  ```

- setup and implement NotFound route and page
- Intended path after redirect to login page
  > like: user go to cart page without login.
  > then redirect him 1st login then after login redirect to cart page

```
import {useLocation} from  'react-router-dom'
const location = useLocation()
console.log(location.pathname)
```

- use this code in loading and login page

```
//in loading
navigate('/login', {state: location.pathname})
```

```
//in login
navigate(location.state || '/dashboard')
```
