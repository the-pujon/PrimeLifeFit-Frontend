import { selectCurrentUser,signOut,useCurrentToken } from '@/redux/features/auth/authSlice';
import { useAppDispatch,useAppSelector } from '@/redux/hook';
import { isTokenExpired } from '@/utils/isTokenExpired';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// Update the type to include different access levels
type TProtectedRoute = {
    children: ReactNode;
    accessLevel: 'user' | 'admin' | 'both';
};

const ProtectedRoute = ({ children,accessLevel }: TProtectedRoute) => {
    const token = useAppSelector(useCurrentToken);
    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    // Check if the token is expired
    const expiredToken = isTokenExpired(token);

    // If there's no token or it's expired, redirect to sign in
    if (!token || expiredToken) {
        return <Navigate to="/auth/signin" replace={true} />;
    }

    // Check user role and access level
    if (user && !expiredToken) {
        switch (accessLevel) {
            case 'user':
                if (user.role !== 'user') {
                    dispatch(signOut());
                    return <Navigate to="/auth/signin" replace={true} />;
                }
                break;
            case 'admin':
                if (user.role !== 'admin') {
                    dispatch(signOut());
                    return <Navigate to="/auth/signin" replace={true} />;
                }
                break;
            case 'both':
                // Both users and admins are allowed, no additional check needed
                break;
            default:
                // If an invalid access level is provided, sign out and redirect
                dispatch(signOut());
                return <Navigate to="/auth/signin" replace={true} />;
        }
    } else {
        // If there's no user data, sign out and redirect
        dispatch(signOut());
        return <Navigate to="/auth/signin" replace={true} />;
    }

    return children;
};

export default ProtectedRoute;