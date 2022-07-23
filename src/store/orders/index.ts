import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Order } from '../../interfaces';

export interface OrderState {
  orders: Array<Order>;
  connected: boolean;
}

const initialState: OrderState = {
  orders: [],
  connected: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateOrder: (state, action: PayloadAction<Array<number>>) => {
      const order = action.payload;
      const exist = state.orders.find((od: Order) => od.price === order[0]);

      if (exist) {
        state.orders = state.orders.map((od: Order) =>
          od.price === order[0] ? { ...od, amount: order[2], count: order[1] } : od
        );
      } else {
        state.orders.push({
          price: order[0],
          count: order[1],
          amount: order[2],
        });
      }
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
  },
});

// Actions
export const { updateOrder, setConnected } = orderSlice.actions;

// Selectors
export const selectConnected = (state: RootState) => state.order.connected;

export const selectOrders = (state: RootState) =>
  state.order.orders.filter((order: Order) => order.count > 0);

export const selectBids = (state: RootState) => {
  const orders = selectOrders(state).filter((od: Order) => od.amount > 0);
  orders.sort((a, b) => b.price - a.price);

  return orders;
};

export const selectAsks = (state: RootState) => {
  const orders = selectOrders(state).filter((od: Order) => od.amount < 0);
  orders.sort((a, b) => a.price - b.price);

  return orders;
};

export default orderSlice.reducer;
