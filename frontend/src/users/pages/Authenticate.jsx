import React, {
  useRef, useState, useContext, useEffect,
} from 'react';
import { useMutation } from 'react-query';
import { signUpUser, loginUser } from '../api/users';
import { AuthContext } from '../../shared/components/context/auth-context';
import ErrorNotification from '../../shared/components/errornotification/ErrorNotification';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner';

function Authenticate() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoginMode, setLoginMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const switchModeHandler = () => {
    setLoginMode((prevMode) => !prevMode);
  };

  const auth = useContext(AuthContext);

  const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      if (data.error) {
        setErrorMessage(data.error);
        setErrorVisible(true);
        return;
      }
      console.log(data);
      auth.login(data.id, data.token, data.name);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.error) {
        setErrorMessage(data.error);
        setErrorVisible(true);
        return;
      }
      console.log(data);
      auth.login(data.id, data.token, data.name);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (isLoginMode) {
        loginUserMutation.mutate({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
      } else {
        signUpUserMutation.mutate({
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left" />
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={onSubmitHandler} className="card-body">
            <h1 className="text-3xl text-center font-bold">
              {isLoginMode ? 'Login' : 'Signup'}
              {isSubmitting && (
              <div className="flex pt-10 justify-center items-center">
                <LoadingSpinner />
              </div>
              )}
            </h1>
            {errorMessage && (
              <ErrorNotification
                message={errorMessage}
                onClose={() => {
                  setErrorVisible(false);
                  setErrorMessage('');
                }}
              />
            )}
            {!isLoginMode && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  ref={nameRef}
                  placeholder="name"
                  className="input input-bordered"
                />
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                ref={passwordRef}
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a
                  href="#"
                  onClick={switchModeHandler}
                  className="label-text-alt link link-hover"
                >
                  {isLoginMode ? 'Signup' : 'Login'}
                  {' '}
                  instead?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                {isLoginMode ? 'LOGIN' : 'SIGNUP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Authenticate;
