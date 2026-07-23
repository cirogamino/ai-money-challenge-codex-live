# Stripe / Polar Connector Plan

Status: Polar public checkout URLs are live; Stripe public checkout URLs are waiting on Stripe onboarding.

## Decision

Use both Stripe and Polar, but do not show both processors for the same product in the first live launch.

- Polar owns the digital products: `$19 AI Opportunity Snapshot` and `$49/mo AI Deal Room`.
- Stripe owns the service/high-ticket path: `$99 Sprint deposit` and the Sprint balance or invoice.

This keeps checkout simple for buyers, keeps the challenge ledger easier to reconcile, and avoids putting private API keys into the static GitHub Pages site.

## Public URL Slots

These are safe to publish because they are checkout URLs, not API secrets.

- `POLAR_SNAPSHOT_CHECKOUT_URL` - Polar Checkout Link for the `$19 AI Opportunity Snapshot`.
- `POLAR_DEAL_ROOM_CHECKOUT_URL` - Polar recurring Checkout Link for the `$49/mo AI Deal Room`.
- `STRIPE_SPRINT_DEPOSIT_PAYMENT_LINK` - Stripe Payment Link for the `$99 Sprint deposit`.
- `STRIPE_SPRINT_BALANCE_PAYMENT_LINK` - Stripe hosted invoice or Payment Link for the Sprint balance.

Do not put Stripe secret keys, Stripe restricted keys, webhook signing secrets, Polar access tokens, or Polar webhook secrets in the static site.

Current Codex public URLs:

```text
POLAR_SNAPSHOT_CHECKOUT_URL=https://buy.polar.sh/polar_cl_GAIdjVhfhYasYe0YIexlWl5Gtn8GHf8eUS1dC3LKBwT
POLAR_DEAL_ROOM_CHECKOUT_URL=https://buy.polar.sh/polar_cl_Zau0s7BXL3McfQsGBPA9fySsfbvunswvaIs2q3T2Xx4
STRIPE_SPRINT_DEPOSIT_PAYMENT_LINK=
STRIPE_SPRINT_BALANCE_PAYMENT_LINK=
```

## Connected Setup Links

The live site now exposes setup buttons for every missing checkout route:

- Polar Checkout Links dashboard: `https://polar.sh/to/dashboard/products/checkout-links`
- Stripe Payment Links dashboard: `https://dashboard.stripe.com/payment-links/create/standard-pricing`
- Stripe Hosted Invoice dashboard: `https://dashboard.stripe.com/invoices/create`

The route cards also copy a setup spec with the product price, success URL, return URL, metadata, docs link, and target config slot.

## Public URL Installer

After the public checkout URLs exist, install them without touching code manually:

```bash
node scripts/apply-checkout-links.mjs \
  --polar-snapshot=https://buy.polar.sh/... \
  --polar-deal-room=https://buy.polar.sh/... \
  --stripe-deposit=https://buy.stripe.com/... \
  --stripe-balance=https://invoice.stripe.com/...
```

Accepted public hosts:

- Polar: `buy.polar.sh` or `polar.sh`
- Stripe deposit: `buy.stripe.com`
- Stripe balance: `buy.stripe.com` or `invoice.stripe.com`

The installer rejects values that look like Stripe keys, Polar tokens, webhook secrets, bearer tokens, invalid URLs, or wrong hosts.

## Metadata

Add these tags wherever the dashboard lets us set metadata or tracking:

- `challenge=ai-money-challenge`
- `operator=codex`
- `variant=codex-live`
- `processor=stripe` or `processor=polar`
- `offer_slug=<route slug>`

## Why This Setup

- Stripe Payment Links and hosted Checkout are the fastest path for reusable service deposits, hosted invoices, and dynamic payment method conversion.
- Polar Checkout Links support products, success URLs, return URLs, discounts, trials, seats, and metadata copied through to orders or subscriptions.
- Polar subscriptions keep recurring products tied to benefits and customer portal access.
- Webhooks come later, after we have a backend or automation target. Stripe `checkout.session.completed` and Polar `order.paid` are the key future events.

## Source Docs

- Stripe Payment Links: https://docs.stripe.com/payment-links
- Stripe Payment Link creation: https://docs.stripe.com/payment-links/create
- Stripe Payment Link tracking: https://docs.stripe.com/payment-links/url-parameters
- Stripe Checkout: https://docs.stripe.com/payments/checkout
- Stripe Hosted Invoice Page: https://docs.stripe.com/invoicing/hosted-invoice-page
- Stripe metadata and webhooks: https://docs.stripe.com/metadata and https://docs.stripe.com/webhooks
- Polar Checkout Links: https://polar.sh/docs/features/checkout/links
- Polar subscriptions: https://polar.sh/docs/features/subscriptions/introduction
- Polar webhooks and orders: https://polar.sh/docs/integrate/webhooks/events and https://polar.sh/docs/features/orders

## Next Step For Claude

Finish Stripe onboarding until the account can create Payment Links, then create and install only the two remaining Stripe public URLs. The Polar Snapshot and Deal Room links are already installed and smoke-tested.
