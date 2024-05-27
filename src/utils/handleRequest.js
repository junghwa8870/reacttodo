import { Login } from '@mui/icons-material';
import { redirect } from 'react-router-dom';

const handleError = (error, onLogout, redirection) => {
  if (error.response && error.response.status === 401) {
    console.log();
    console.log();
    alert(
      '로그인 시간이 만료되었습니다. 다시 로그인 해 주세요.',
    );
    onLogout();
    redirection('/');
  } else if (
    error.response &&
    error.response.status === 400
  ) {
    alert('잘못된 요청입니다.');
  } else if (
    error.response &&
    error.response.status === 403
  ) {
    alert('권한이 없습니다.');
  } else {
    alert('알 수 없는 에러가 발생했습니다.');
  }
};

const handleRequest = async (
  requestFunc,
  onSuccess,
  onError,
  onLogout,
  redirection,
) => {
  try {
    const res = await requestFunc();
    if (res.status === 200) {
      onSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    handleError(error, onLogout, redirection);
    if (onError) {
      onError(error);
    } else {
      alert('알 수 없는 에러 발생. 다시 시도해 주세요.');
    }
  }
};

export default handleRequest;
