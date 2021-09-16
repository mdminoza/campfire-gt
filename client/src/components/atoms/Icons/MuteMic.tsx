import React, { PureComponent } from 'react';

type State = {};

type Props = {
  [key: string]: string | number | Object | Function;
};

export default class extends PureComponent<Props, State> {
  render = (): React.ReactElement => (
    <svg
      width="50"
      height="53"
      viewBox="0 0 50 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...this.props}>
      <rect y="0.969482" width="49.4736" height="51.1228" fill="#DEDEDE" />
      <g opacity="0.6">
        <path
          d="M37 26.5C37 19.599 31.401 14 24.5 14C17.599 14 12 19.599 12 26.5C12 33.401 17.599 39 24.5 39C31.401 39 37 33.401 37 26.5Z"
          stroke="black"
          strokeMiterlimit="10"
        />
        <path
          d="M22.4165 33.7917H26.5832"
          stroke="black"
          strokeWidth="2.08333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29.7082 24.4363V25.9936C29.7082 28.56 27.0662 30.6472 24.4998 30.6472C21.9334 30.6472 19.2915 28.56 19.2915 25.9936V24.4363"
          stroke="black"
          strokeWidth="2.08333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.5 30.6667V33.7917"
          stroke="black"
          strokeWidth="2.08333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27.625 21.2917C27.625 19.5659 26.2259 18.1667 24.5 18.1667C22.7741 18.1667 21.375 19.5659 21.375 21.2917V25.4584C21.375 27.1843 22.7741 28.5834 24.5 28.5834C26.2259 28.5834 27.625 27.1843 27.625 25.4584V21.2917Z"
          fill="black"
        />
      </g>
      <line x1="12.3536" y1="12.6464" x2="39.061" y2="39.3539" stroke="black" />
    </svg>
  );
}
