import React from 'react';

type Props = {
  fallback: (error?: Error) => React.ReactChild;
};

type State = {
  hasError: boolean;
  error?: Error;
};

// Error boundaries currently have to be classes.
// https://reactjs.org/docs/concurrent-mode-suspense.html#handling-errors
export default class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false, error: undefined };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      return fallback(error);
    }

    return children;
  }
}
