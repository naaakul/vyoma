export interface PaymentProvider {
  createOrder(amount: number, currency: string): Promise<{ orderId: string }>;
  captureOrder(orderId: string): Promise<any>;
}
