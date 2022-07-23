import React from 'react';
import { Order } from '../interfaces';

interface OrderTableProps {
  orders: Array<Order>;
  isBid?: boolean;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, isBid }) => {
  return (
    <div className={`w-6/12 ${isBid ? 'mr-3' : ''}`}>
      <table className="w-full">
        <thead>
          <tr>
            {isBid ? (
              <>
                <th>COUNT</th>
                <th>PRICE</th>
                <th className="text-right">AMOUNT</th>
              </>
            ) : (
              <>
                <th className="text-left">AMOUNT</th>
                <th>PRICE</th>
                <th>COUNT</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              {isBid ? (
                <>
                  <td>{order.count}</td>
                  <td>{order.price}</td>
                  <td className="text-right">{order.amount}</td>
                </>
              ) : (
                <>
                  <td className="text-left">{-order.amount}</td>
                  <td>{order.price}</td>
                  <td>{order.count}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
