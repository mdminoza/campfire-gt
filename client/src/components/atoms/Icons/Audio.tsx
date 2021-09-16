import React, { PureComponent } from 'react';

type State = {};

type Props = {
  [key: string]: string | number | Function;
};

export default class extends PureComponent<Props, State> {
  render = (): React.ReactElement => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.365479 6.83783H1.17691V14.7268H0.365479V6.83783Z"
        fill={this.props.fill ? this.props.fill.toString() : '#040404'}
      />
      <path
        d="M15.7828 6.83783H17.4057V14.7268H15.7828V6.83783Z"
        fill={this.props.fill ? this.props.fill.toString() : '#040404'}
      />
      <path
        d="M3.61133 3.68225H5.2342V17.8824H3.61133V3.68225Z"
        fill={this.props.fill ? this.props.fill.toString() : '#040404'}
      />
      <path
        d="M11.7256 3.68225H13.3485V17.8824H11.7256V3.68225Z"
        fill={this.props.fill ? this.props.fill.toString() : '#040404'}
      />
      <path
        d="M19.84 3.68225H21.4628V17.8824H19.84V3.68225Z"
        fill={this.props.fill ? this.props.fill.toString() : '#040404'}
      />
      <path
        d="M7.66846 0.526672H9.29133V21.0379H7.66846V0.526672Z"
        fill={this.props.fill ? this.props.fill.toString() : '#040404'}
      />
    </svg>
  );
}
