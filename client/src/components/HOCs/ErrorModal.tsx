import React from 'react';
import { Modal } from 'antd';

export const ErrorModal = (
  content: string,
  onOk: () => void,
  okText = 'Go back',
  title = 'Error',
): void => {
  Modal.error({
    title,
    content,
    okText,
    onOk,
    maskClosable: false,
  });
};
