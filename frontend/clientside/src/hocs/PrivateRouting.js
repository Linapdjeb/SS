// import React from "react";
// import { useSelector } from "react-redux";
// import { Route, Navigate } from "react-router-dom";


// const PrivateRouting = ({ element: Element, ...rest }) => {
//     const { loading, isAuthenticated } = useSelector(state => state.user);

  
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           !isAuthenticated && !loading ? (
//             <Navigate to="/login" />
//           ) : (
//             <Element {...props} />
//           )
//         }
//       />
//     );
//   };
  
//   export default PrivateRouting;