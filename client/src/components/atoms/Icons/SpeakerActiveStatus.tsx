import React, { PureComponent } from 'react';

type State = {};

type Props = {
  [key: string]: string | number | Object | Function;
};

export default class extends PureComponent<Props, State> {
  render = (): React.ReactElement => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...this.props}>
      <rect width="36" height="36" fill="#196AC9" />
      <circle cx="18" cy="18" r="8" fill="white" />
    </svg>
  );
}
