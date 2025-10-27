import {Action} from "@ngrx/store";

export interface IDeliveryLocation {
  deliveryId: string;
  courierId: string;
  latitude: string;
  longitude: string;
  status: string;
  timestamp: string;
}

export interface Delivery {
  readonly location: IDeliveryLocation;
}

export const UPDATE_DELIVERY = 'UPDATE_DELIVERY';

export class UpdateDeliveryLocation implements Action {
  type: string = UPDATE_DELIVERY
  constructor(public updateDeliveryLocation: IDeliveryLocation) {
  }
}

export function deliveryLocationReducer(state: IDeliveryLocation, action: Action): IDeliveryLocation {
  switch(action.type) {
    case UPDATE_DELIVERY:
      return (action as UpdateDeliveryLocation).updateDeliveryLocation;
    default:
      return state
  }
}
