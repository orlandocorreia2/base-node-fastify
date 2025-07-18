export enum KiwifyWebhookEventAddType {
  ORDER_APPROVED = 'order_approved',
  SUBSCRIPTION_RENEWED = 'subscription_renewed',
}

export enum KiwifyWebhookEventRemoveType {
  ORDER_REFUNDED = 'order_refunded',
  CHARGEBACK = 'chargeback',
  // SUBSCRIPTION_CANCELED = 'subscription_canceled',
}
