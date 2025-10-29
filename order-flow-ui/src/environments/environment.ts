// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  env: 'DEV',
  source: {
    order_host: "http://localhost:9001/ws-orders",
    delivery_host: "http://localhost:9002/ws-delivery"
  }
};
