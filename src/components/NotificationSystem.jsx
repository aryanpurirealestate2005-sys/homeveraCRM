import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const NotificationSystem = ({ notifications = [], onDismiss = () => {} }) => {
  return (
    <div className="notification-container">
      {notifications.map((notification, idx) => (
        <div
          key={idx}
          className={`notification notification-${notification.type || 'info'}`}
        >
          <div className="notification-content">
            <span className="notification-title">{notification.title}</span>
            {notification.message && (
              <span className="notification-message">{notification.message}</span>
            )}
          </div>
          <button
            className="notification-close"
            onClick={() => onDismiss(idx)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
