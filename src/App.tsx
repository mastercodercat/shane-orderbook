import React from 'react';

import ConnectButton from './components/ConnectButton';
import OrderBook from './components/OrderBook';

import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectBids, updateOrder, setConnected, selectConnected, selectAsks } from './store/orders';
import BitfinexWebSocket from './services/websocket';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const bids = useAppSelector(selectBids);
  const asks = useAppSelector(selectAsks);
  const connected = useAppSelector(selectConnected);

  const bf = React.useMemo(() => {
    const ws = new BitfinexWebSocket();

    return ws;
  }, []);

  const connect = React.useCallback(() => {
    bf.connect((order: Array<number>) => {
      dispatch(updateOrder(order));
    });
    dispatch(setConnected(true));
  }, [dispatch, bf]);

  const disconnect = React.useCallback(() => {
    bf.disconnect();
    dispatch(setConnected(false));
  }, [dispatch, bf]);

  return (
    <div className="App">
      <ConnectButton connected={connected} connect={connect} disconnect={disconnect} />
      <OrderBook bids={bids} asks={asks} />
    </div>
  );
}

export default App;
