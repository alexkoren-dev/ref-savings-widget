import React, { useEffect } from 'react';
import { Icons } from '../../icons';
import { Loader } from '../loader';
import './modal.scss';

export const Modal = ({
  loading = false,
  children,
  className,
  required = false,
  closeText = 'Skip',
  closeIcon,
  center,
  closeHook = () => {},
  bgIsAsctive = false,
}) => {
  useEffect(() => { document.body.style.overflow = 'hidden'; }, []);
  useEffect(() => () => { document.body.style.overflow = 'visible'; }, []);

  return (
    <div className={`modal ${className || ''} ${center ? 'center' : ''}`}>
      <div className="modal__bg" onClick={() => bgIsAsctive && !required ? closeHook() : () => {}}>
        <div className="modal__window" onClick={(e) => e.stopPropagation()}>
          {!required && (
            <button
              type="button"
              className={`modal__close ${closeIcon ? 'icon' : ''}`}
              onClick={() => !required ? closeHook() : () => {}}
              title="Close modal"
            >
              {closeIcon ? <Icons name="close" /> : closeText}
            </button>
          )}
          <div className={`modal__content ${loading ? 'loading' : ''}`}>
            {children}
          </div>
          {loading && (
            <div className="modal__loader">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
