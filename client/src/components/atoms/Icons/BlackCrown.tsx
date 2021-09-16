import React, { PureComponent } from 'react';

type State = {};

type Props = {
  [key: string]: string | number | Object | Function;
};

export default class extends PureComponent<Props, State> {
  render = (): React.ReactElement => (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...this.props}>
      <path
        d="M18.2916 0.452179L13.4298 5.2287L9.54033 0.452179L5.65088 5.2287L0.789062 0.452179V12.8711H18.2916V0.452179ZM2.73379 18.6029H16.3469C16.8626 18.6029 17.3573 18.4017 17.722 18.0433C18.0867 17.685 18.2916 17.1991 18.2916 16.6923V14.7817H0.789062V16.6923C0.789063 17.1991 0.993953 17.685 1.35866 18.0433C1.72337 18.4017 2.21801 18.6029 2.73379 18.6029Z"
        fill="black"
      />
    </svg>
  );
}
