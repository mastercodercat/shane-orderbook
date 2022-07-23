import React from 'react';

interface ConnectButtonProps {
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ connected, connect, disconnect }) => {
  return (
    <button className="px-4 py-3 border" onClick={connected ? disconnect : connect}>
      {connected ? 'Disconnect' : 'Connect'}
    </button>
  );
};

export default ConnectButton;
