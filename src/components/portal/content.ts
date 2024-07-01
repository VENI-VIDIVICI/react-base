import * as React from 'react';

export type QueueCreate = ((appendFunc: VoidFunction) => void) | null;

const OrderContext = React.createContext<QueueCreate>(null);

export default OrderContext;