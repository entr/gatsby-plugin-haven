import React, { useMemo, useLayoutEffect } from 'react'
import store from '@chiiya/haven/dist/esm/store'
import { trans } from '@chiiya/haven/dist/esm/utils'
import { Link } from 'gatsby'

function createStyles() {
  const options = store.notification.styles

  return `
    .hv-notification {
      align-items: center;
      background: ${options.background};
      color: ${options.textColor};
      display: flex;
      padding: 1rem;
      justify-content: space-between;
      position: fixed;
      left: 0;
      overflow: hidden;
      width: 100%;
      z-index: 9999;
    }

    .hv-notification--top {
      top: 0;
    }

    .hv-notification--bottom {
      bottom: 0;
    }

    .hv-notification__message {
      margin-bottom: 0;
    }

    .hv-notification__message a {
      color: ${options.linkColor};
    }

    .hv-notification__message a:hover {
      color: ${options.textColor};
    }

    .hv-notification-button {
      border: 0;
    }

    .hv-notification__decline {
      background-color: transparent;
      color: ${options.textColor};
    }

    .hv-notification__decline:hover {
      text-decoration: underline;
    }

    .hv-notification__accept {
      background: ${options.buttonBackgroundColor};
      color: ${options.buttonTextColor};
    }

    .hv-notification__accept:hover {
      background: ${options.buttonBackgroundColorHover};
    }
  `;
}

export default function Notification() {
  const options = useMemo(() => store.notification, [store])

  useLayoutEffect(() => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'cookie-notification-styles'
    style.appendChild(document.createTextNode(createStyles()));
    const firstStyle = document.head.querySelector('style')
    if (firstStyle) {
      document.head.insertBefore(style, firstStyle)
    } else {
      document.head.appendChild(style);
    }

    return () => {
      style.parentNode.removeChild(style)
    };
  }, [])

  return (
    <div
      id="cookie-notification"
      role="alert"
      data-display="flex"
      className={`hv-notification hv-notification--${options.position}`}
      style={{ display: 'none' }}
    >
      <p className="hv-notification__message">
        {trans('notification.message')}
        {options.policyUrl ? (
          <>
            {' '}
            <Link to={options.policyUrl}>{trans('notification.policy')}</Link>
          </>
        ) : null}
      </p>

      <div className="hv-notification__actions">
        <button
          id="cookie-notification__decline"
          className="hv-notification-button hv-notification__decline"
        >
          {trans('notification.decline')}
        </button>

        <button
          id="cookie-notification__accept"
          className="hv-notification-button hv-notification__accept"
        >
          {trans('notification.accept')}
        </button>
      </div>
    </div>
  )
}
