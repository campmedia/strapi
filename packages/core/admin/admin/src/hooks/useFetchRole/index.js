import { useCallback, useReducer, useEffect } from 'react';
import { request, useNotification, useAPIErrorHandler } from '@strapi/helper-plugin';
import reducer, { initialState } from './reducer';

const useFetchRole = (id) => {
  const toggleNotification = useNotification();
  const { formatAPIError } = useAPIErrorHandler();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (id) {
      fetchRole(id);
    } else {
      dispatch({
        type: 'GET_DATA_SUCCEEDED',
        role: {},
        permissions: [],
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchRole = async (roleId) => {
    try {
      const [{ data: role }, { data: permissions }] = await Promise.all(
        [`roles/${roleId}`, `roles/${roleId}/permissions`].map((endPoint) =>
          request(`/admin/${endPoint}`, { method: 'GET' })
        )
      );

      dispatch({
        type: 'GET_DATA_SUCCEEDED',
        role,
        permissions,
      });
    } catch (err) {
      dispatch({
        type: 'GET_DATA_ERROR',
      });
      toggleNotification({
        type: 'warning',
        message: formatAPIError(err),
      });
    }
  };

  const handleSubmitSucceeded = useCallback((data) => {
    dispatch({
      type: 'ON_SUBMIT_SUCCEEDED',
      ...data,
    });
  }, []);

  return { ...state, onSubmitSucceeded: handleSubmitSucceeded };
};

export default useFetchRole;
