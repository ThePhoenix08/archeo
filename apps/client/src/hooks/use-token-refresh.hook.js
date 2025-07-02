// React hook for automatic token refresh
import { refreshApi } from '@/features/auth/state/redux-apis/refresh.api.js';
import { selectIsAuthenticated, selectIsRefreshing, selecttokenExpiryEstimate } from '@/features/auth/state/slices/auth.slice.js';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const FIVE_MINS = 5 * 60 * 1000;

export const useTokenRefresh = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const tokenExpiryEstimate = useSelector(selecttokenExpiryEstimate);
  const isRefreshing = useSelector(selectIsRefreshing);
  
  useEffect(() => {
    if (!isAuthenticated || !tokenExpiryEstimate || isRefreshing) {
      return;
    }
    
    const checkTokenExpiry = () => {
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      
      // If token expires in 5 minutes or less, refresh it
      if (tokenExpiryEstimate - now <= fiveMinutes && tokenExpiryEstimate > now) {
        dispatch(refreshApi.endpoints.refreshToken.initiate());
      }
    };
    
    // Check immediately
    checkTokenExpiry();
    
    // Set up interval to check periodically
    const interval = setInterval(checkTokenExpiry, FIVE_MINS); // Check every minute
    
    return () => clearInterval(interval);
  }, [dispatch, isAuthenticated, tokenExpiryEstimate, isRefreshing]);
};