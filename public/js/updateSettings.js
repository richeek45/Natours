/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  const route = type === 'password' ? 'updatePassword' : 'updateMe';
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${route}`,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
