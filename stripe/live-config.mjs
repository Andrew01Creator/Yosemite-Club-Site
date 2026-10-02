// Public Payment Link URLs only. Readiness is a manually verified snapshot, not an API check.
export const liveConfig = {
  "mode": "live",
  "currency": "USD",
  "readiness": {
    "chargesEnabled": false,
    "payoutsEnabled": false,
    "cardPaymentsActive": false,
    "verifiedOn": "2026-10-02"
  },
  "offers": [
    {
      "id": "founding-deposit",
      "name": "Founding reservation deposit",
      "amountCents": 20000,
      "kind": "deposit",
      "paymentLink": "https://buy.stripe.com/28E9AS95G4bD3au3Dua7C03",
      "stripeVerified": true,
      "termsVersion": "2026-10-02-v1-live"
    },
    {
      "id": "social-deposit",
      "name": "Social reservation deposit",
      "amountCents": 10000,
      "kind": "deposit",
      "paymentLink": "https://buy.stripe.com/4gMfZg0za0Zr6mGfmca7C02",
      "stripeVerified": true,
      "termsVersion": "2026-10-02-v1-live"
    }
  ]
};
