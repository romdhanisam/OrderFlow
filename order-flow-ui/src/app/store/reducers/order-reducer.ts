import {Action} from "@ngrx/store";


export interface IOrder {
  orderId: string;
  product: string;
  quantity: number;
  status: string;
}

export class Order implements IOrder{
  orderId: string;
  product: string;
  quantity: number;
  status: string;
}

export interface OrderState {
  readonly orders: IOrder[];
}

export const initialOrderState: OrderState = {
  orders: []
};

export const UPDATE_ORDER = 'UPDATE_ORDER';

export class UpdateOrder implements Action {
  readonly type = UPDATE_ORDER;
  constructor(public updatedOrders: IOrder[]) {}
}


export function orderReducer(state: IOrder[] = [], action: Action): IOrder[] {
    switch (action.type) {
      case UPDATE_ORDER:
        return [...(action as UpdateOrder).updatedOrders];
      default:
        return state;
    }
}
