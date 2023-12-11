import { Route, Redirect } from "react-router-dom"
export default function ProtectedRoute({ component: Component, ...rest}){

    const token = localStorage.getItem('Authorization')
    
    return (
        <Route
          {...rest}
          render={(props) =>
            token ? <Component {...props} /> : <Redirect to="/login" />
          }
        />
      );
    }