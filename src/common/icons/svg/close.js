import React from 'react';

export const Close = ({
  name = '',
  fill = '#9A9A9A',
}) => (
  <svg
    width="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`icon icon__${name}`}
  >
    <path d="M11.6724 9.97294L19.6879 1.95899C19.8933 1.7386 20.0051 1.44712 19.9998 1.14593C19.9945 0.844748 19.8725 0.557385 19.6594 0.344383C19.4464 0.131381 19.159 0.00936973 18.8577 0.00405569C18.5565 -0.00125834 18.2649 0.110539 18.0445 0.315895L10.029 8.32985L2.0135 0.312019C1.79307 0.106664 1.50153 -0.00513291 1.20029 0.000181124C0.899046 0.00549516 0.611627 0.127505 0.398584 0.340507C0.18554 0.55351 0.063506 0.840873 0.058191 1.14206C0.0528759 1.44324 0.164695 1.73473 0.370091 1.95511L8.38559 9.97294L0.370091 17.9869C0.255847 18.0933 0.164216 18.2217 0.100663 18.3643C0.0371093 18.5069 0.00293567 18.6608 0.000180961 18.8169C-0.00257374 18.973 0.026147 19.1281 0.0846292 19.2728C0.143111 19.4176 0.230157 19.5491 0.340574 19.6595C0.450991 19.7699 0.582516 19.8569 0.727304 19.9154C0.872091 19.9739 1.02718 20.0026 1.1833 19.9998C1.33943 19.9971 1.49341 19.9629 1.63604 19.8994C1.77868 19.8358 1.90705 19.7442 2.0135 19.63L10.029 11.616L18.0445 19.63C18.2649 19.8353 18.5565 19.9471 18.8577 19.9418C19.159 19.9365 19.4464 19.8145 19.6594 19.6015C19.8725 19.3885 19.9945 19.1011 19.9998 18.7999C20.0051 18.4988 19.8933 18.2073 19.6879 17.9869L11.6724 9.97294Z" fill={fill} />
  </svg>
);
