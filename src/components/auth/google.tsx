import React from 'react';
import NewWindow from 'react-new-window';

interface GoogleSignInProps {
  onSuccess: () => void;
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onSuccess }) => {
  return (
    <NewWindow
      url='/signin/google'
      onUnload={() => onSuccess()}
      features={{
        height: 700,
        width: 500,
        top: (window.outerHeight - 700) / 2,
        left: (window.outerWidth - 600) / 2
      }}
    />
  );
};

export default GoogleSignIn;
