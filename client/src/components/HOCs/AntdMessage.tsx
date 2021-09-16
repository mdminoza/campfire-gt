import { message } from 'antd';

export const AntdMessage = (
  type: 'info' | 'success' | 'error' | 'warning',
  content: string,
) => {
  message[type]({
    content,
    style: {
      marginTop: '15vh',
    },
    duration: 3,
  });
};
