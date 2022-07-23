import OrderTable from './OrderTable';

import { Order } from '../interfaces';

interface OrderBookProps {
  bids: Array<Order>;
  asks: Array<Order>;
}

const OrderBook: React.FC<OrderBookProps> = ({ bids, asks }) => {
  return (
    <div className="flex justify-between mt-5">
      <OrderTable orders={bids} isBid />
      <OrderTable orders={asks} />
    </div>
  );
};

export default OrderBook;
