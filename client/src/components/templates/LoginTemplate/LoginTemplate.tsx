import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { Formik } from 'formik';
import { theme } from '../../../constants';
import { FireOutline } from '../../atoms/Icons';
import { TextInput } from '../../atoms/TextInput';
import { Button } from '../../atoms/Button';
import { Title, Description } from '../../molecules/TitleContent/TitleContent';

import { useUserAction, useUserState } from '../../../hooks/user';
import { LoginSchema } from './validation';

const Container = styled.div`
  background: ${theme.colors.gray.gray2C};
  height: 100vh;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 350px;
  margin: auto;
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const InputTitle = styled.text`
  color: ${theme.colors.mainWhite};
  font-weight: 700;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const ButtonWrapper = styled.div`
  margin-top: 55px;
  display: flex;
  justify-content: center;

  .ant-spin-dot-item {
    background-color: #e75a0b;
  }
`;

const ErrorLabel = styled.span`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.02em;
  color: #ff7373;
  height: 19px;
`;

const LoginButtonStyle = {
  background: theme.colors.orange,
  width: 150,
  color: theme.colors.mainWhite,
  fontSize: 16,
  fontWeight: 700,
};

const LoginTemplate = (): React.ReactElement => {
  const navigate = useNavigate();
  const { loginUser } = useUserAction();
  const { setToken, token } = useUserState();
  const [loginFail, setLoginFail] = useState(false);

  const { mutate: refetchLoginUser, isLoading } = useMutation(
    (user: { username: string; password: string }) =>
      loginUser(user.username, user.password),
    {
      onSuccess: (res) => {
        localStorage.setItem('access-token', `${res}`);
        setToken(`${res}`);
      },
      onError: (error) => {
        console.log('Error: ', error);
        setLoginFail(true);
      },
    },
  );

  useEffect(() => {
    if (token) {
      navigate('/campfires');
    }
  }, [token]);

  return (
    <Container>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          refetchLoginUser({
            username: values.username,
            password: values.password,
          });
        }}>
        {({ values, errors, handleChange, handleSubmit }) => (
          <Wrapper>
            <TitleContainer>
              <FireOutline width={75} height={106} />
              <Title>CAMPFIRES</Title>
              <Description width="100%" fontSize="0.9rem">
                AUDIO ONLY MEETING ROOMS
              </Description>
            </TitleContainer>
            <InputWrapper>
              <InputTitle>Username</InputTitle>
              <TextInput
                onChange={handleChange('username')}
                value={values.username}
              />
              <ErrorLabel>{errors.username}</ErrorLabel>
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Password</InputTitle>
              <TextInput
                onChange={handleChange('password')}
                value={values.password}
                type="password"
              />
              <ErrorLabel>{errors.password}</ErrorLabel>
            </InputWrapper>
            {loginFail && (
              <ErrorLabel>Incorrect usernamer / password.</ErrorLabel>
            )}
            <ButtonWrapper>
              {!isLoading ? (
                <Button onClick={handleSubmit} style={LoginButtonStyle}>
                  Login
                </Button>
              ) : (
                <Spin />
              )}
            </ButtonWrapper>
          </Wrapper>
        )}
      </Formik>
    </Container>
  );
};

export default LoginTemplate;
