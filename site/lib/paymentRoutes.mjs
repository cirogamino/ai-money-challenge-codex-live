const publicCheckoutUrls = {
  POLAR_SNAPSHOT_CHECKOUT_URL: 'https://buy.polar.sh/polar_cl_GAIdjVhfhYasYe0YIexlWl5Gtn8GHf8eUS1dC3LKBwT',
  POLAR_DEAL_ROOM_CHECKOUT_URL: 'https://buy.polar.sh/polar_cl_Zau0s7BXL3McfQsGBPA9fySsfbvunswvaIs2q3T2Xx4',
  STRIPE_SPRINT_DEPOSIT_PAYMENT_LINK: '',
  STRIPE_SPRINT_BALANCE_PAYMENT_LINK: '',
};

const sharedMetadata = {
  challenge: 'ai-money-challenge',
  operator: 'codex',
  variant: 'codex-live',
};

const liveBaseUrl = 'https://cirogamino.github.io/ai-money-challenge-codex-live';
const siteReturnUrl = `${liveBaseUrl}/site/#instant-checkout`;
const polarCheckoutLinksUrl = 'https://polar.sh/to/dashboard/products/checkout-links';
const stripePaymentLinksUrl = 'https://dashboard.stripe.com/payment-links/create/standard-pricing';
const stripeInvoiceUrl = 'https://dashboard.stripe.com/invoices/create';

export const paymentRoutes = [
  {
    slug: 'ai-opportunity-snapshot',
    productSlug: 'ai-opportunity-snapshot',
    offer: 'AI Opportunity Snapshot',
    amount: '$19',
    primaryProcessor: 'polar',
    processorLabel: 'Polar',
    checkoutType: 'Checkout Link',
    configKey: 'POLAR_SNAPSHOT_CHECKOUT_URL',
    checkoutUrl: publicCheckoutUrls.POLAR_SNAPSHOT_CHECKOUT_URL,
    buttonLabel: 'Buy $19 Snapshot',
    successUrl: `${liveBaseUrl}/site/success/snapshot/?checkout_id={CHECKOUT_ID}`,
    returnUrl: siteReturnUrl,
    docsUrl: 'https://polar.sh/docs/features/checkout/links',
    setupTarget: {
      label: 'Create Polar link',
      url: polarCheckoutLinksUrl,
    },
    setupSteps: [
      'Open Polar Checkout Links and click New Link.',
      'Select or create AI Opportunity Snapshot as a one-time product priced at $19 USD.',
      'Set the success URL and return URL from this route card.',
      'Add the metadata keys shown here so orders reconcile cleanly.',
      'Copy the persistent Checkout Link URL into POLAR_SNAPSHOT_CHECKOUT_URL.',
    ],
    reason:
      'Best fit for the low-ticket digital product because Polar checkout links can sell productized digital offers with order, subscription, benefit, invoice, and customer state records.',
    nextAction: 'Live Polar Checkout Link installed and smoke-tested against the $19 checkout page.',
    metadata: {
      ...sharedMetadata,
      processor: 'polar',
      offer_slug: 'ai-opportunity-snapshot',
      funnel_role: 'tripwire',
    },
  },
  {
    slug: 'ai-deal-room',
    productSlug: 'ai-deal-room',
    offer: 'AI Deal Room',
    amount: '$49/mo',
    primaryProcessor: 'polar',
    processorLabel: 'Polar',
    checkoutType: 'Recurring Checkout Link',
    configKey: 'POLAR_DEAL_ROOM_CHECKOUT_URL',
    checkoutUrl: publicCheckoutUrls.POLAR_DEAL_ROOM_CHECKOUT_URL,
    buttonLabel: 'Join $49/mo Deal Room',
    successUrl: `${liveBaseUrl}/site/success/deal-room/?checkout_id={CHECKOUT_ID}`,
    returnUrl: siteReturnUrl,
    docsUrl: 'https://polar.sh/docs/features/checkout/links',
    setupTarget: {
      label: 'Create Polar recurring link',
      url: polarCheckoutLinksUrl,
    },
    setupSteps: [
      'Open Polar Checkout Links and click New Link.',
      'Select or create AI Deal Room as a recurring product priced at $49 USD per month.',
      'Set the success URL and return URL from this route card.',
      'Keep the checkout link single-product for the first launch.',
      'Copy the persistent Checkout Link URL into POLAR_DEAL_ROOM_CHECKOUT_URL.',
    ],
    reason:
      'Best fit for membership because Polar creates subscriptions from recurring products, keeps benefits in sync, and gives customers a portal for receipts and payment updates.',
    nextAction: 'Live Polar recurring Checkout Link installed and smoke-tested against the $49/mo checkout page.',
    metadata: {
      ...sharedMetadata,
      processor: 'polar',
      offer_slug: 'ai-deal-room',
      funnel_role: 'continuity',
    },
  },
  {
    slug: 'ai-revenue-sprint-deposit',
    productSlug: 'ai-revenue-sprint',
    offer: '48-Hour AI Revenue Sprint deposit',
    amount: '$99',
    primaryProcessor: 'stripe',
    processorLabel: 'Stripe',
    checkoutType: 'Payment Link',
    configKey: 'STRIPE_SPRINT_DEPOSIT_PAYMENT_LINK',
    checkoutUrl: publicCheckoutUrls.STRIPE_SPRINT_DEPOSIT_PAYMENT_LINK,
    buttonLabel: 'Add Stripe link',
    successUrl: `${liveBaseUrl}/site/success/sprint-deposit/?session_id={CHECKOUT_SESSION_ID}`,
    returnUrl: siteReturnUrl,
    docsUrl: 'https://docs.stripe.com/payment-links/create',
    setupTarget: {
      label: 'Create Stripe link',
      url: stripePaymentLinksUrl,
    },
    setupSteps: [
      'Open Stripe Payment Links and create a standard fixed-price link.',
      'Create or select 48-Hour AI Revenue Sprint deposit priced at $99 USD.',
      'Set after-completion behavior to redirect to this route success URL.',
      'Add client_reference_id or metadata for challenge, operator, variant, processor, and offer_slug.',
      'Copy the buy.stripe.com URL into STRIPE_SPRINT_DEPOSIT_PAYMENT_LINK.',
    ],
    reason:
      'Best fit for the first high-ticket action because Stripe Payment Links and hosted Checkout are fast, reusable, low-code, and optimized for dynamic payment methods.',
    nextAction: 'Add the public Stripe Payment Link URL to STRIPE_SPRINT_DEPOSIT_PAYMENT_LINK.',
    metadata: {
      ...sharedMetadata,
      processor: 'stripe',
      offer_slug: 'ai-revenue-sprint-deposit',
      funnel_role: 'deposit',
    },
  },
  {
    slug: 'ai-revenue-sprint-balance',
    productSlug: 'ai-revenue-sprint',
    offer: '48-Hour AI Revenue Sprint balance',
    amount: '$1,401 or $1,500',
    primaryProcessor: 'stripe',
    processorLabel: 'Stripe',
    checkoutType: 'Hosted Invoice or Payment Link',
    configKey: 'STRIPE_SPRINT_BALANCE_PAYMENT_LINK',
    checkoutUrl: publicCheckoutUrls.STRIPE_SPRINT_BALANCE_PAYMENT_LINK,
    buttonLabel: 'Add Stripe link',
    successUrl: `${liveBaseUrl}/site/success/sprint-balance/?session_id={CHECKOUT_SESSION_ID}`,
    returnUrl: siteReturnUrl,
    docsUrl: 'https://docs.stripe.com/invoicing/hosted-invoice-page',
    setupTarget: {
      label: 'Create Stripe invoice',
      url: stripeInvoiceUrl,
    },
    setupSteps: [
      'Open Stripe Invoices for the qualified Sprint buyer.',
      'Create a Hosted Invoice Page for the $1,401 remaining balance or full $1,500 amount.',
      'Enable the hosted payment page and copy the invoice.stripe.com URL when available.',
      'Use the same challenge and offer metadata in the memo or internal description.',
      'Copy the hosted invoice URL into STRIPE_SPRINT_BALANCE_PAYMENT_LINK if it should be public.',
    ],
    reason:
      'Best fit for high-ticket services because Stripe can use hosted invoices, Payment Links, receipts, exports, and later webhook-driven reconciliation.',
    nextAction: 'Add the public Stripe invoice or balance Payment Link URL to STRIPE_SPRINT_BALANCE_PAYMENT_LINK.',
    metadata: {
      ...sharedMetadata,
      processor: 'stripe',
      offer_slug: 'ai-revenue-sprint-balance',
      funnel_role: 'balance',
    },
  },
];

function buildMetadataText(metadata) {
  return Object.entries(metadata)
    .map(([key, value]) => `${key}=${value}`)
    .join(', ');
}

function buildRouteSetupCopy(route) {
  return [
    `${route.processorLabel} setup for ${route.offer}`,
    `Amount: ${route.amount}`,
    `Checkout type: ${route.checkoutType}`,
    `Config slot: ${route.configKey}`,
    `Setup target: ${route.setupTarget.url}`,
    `Docs: ${route.docsUrl}`,
    `Success URL: ${route.successUrl}`,
    `Return URL: ${route.returnUrl}`,
    `Metadata: ${buildMetadataText(route.metadata)}`,
    '',
    'Steps:',
    ...route.setupSteps.map((step, index) => `${index + 1}. ${step}`),
  ].join('\n');
}

function withRouteStatus(route) {
  const isLive = /^https:\/\//.test(route.checkoutUrl);
  const metadataText = buildMetadataText(route.metadata);

  return {
    ...route,
    isLive,
    displayStatus: isLive ? 'Live checkout' : 'Connector preview',
    missingLabel: isLive ? '' : `Missing ${route.configKey}`,
    metadataText,
    setupCopy: buildRouteSetupCopy(route),
  };
}

export function getPaymentRouteBySlug(slug) {
  const route = paymentRoutes.find((candidate) => candidate.slug === slug);
  return route ? withRouteStatus(route) : null;
}

export function getPrimaryPaymentRouteForProduct(productSlug) {
  const route = paymentRoutes.find((candidate) => candidate.productSlug === productSlug);
  return route ? withRouteStatus(route) : null;
}

export function getPaymentReadiness() {
  const routes = paymentRoutes.map(withRouteStatus);
  const liveCount = routes.filter((route) => route.isLive).length;
  const missingRoutes = routes.filter((route) => !route.isLive);
  const mode = liveCount === routes.length ? 'live' : liveCount > 0 ? 'partial_live' : 'needs_live_urls';
  const statusLabel =
    mode === 'live' ? 'Live checkout' : mode === 'partial_live' ? 'Partial live checkout' : 'Connector preview';

  return {
    mode,
    statusLabel,
    liveCount,
    totalCount: routes.length,
    percent: Math.round((liveCount / routes.length) * 100),
    summary:
      mode === 'live'
        ? 'All public checkout URLs are wired.'
        : mode === 'partial_live'
          ? `${liveCount} public checkout URLs are live. Remaining: ${missingRoutes
              .map((route) => route.configKey)
              .join(', ')}.`
          : 'Checkout stays in preview until the public Stripe and Polar URLs are visible in this workspace.',
    missingRoutes,
    routes,
  };
}

export function getProcessorAssignments() {
  return [
    {
      processor: 'Polar',
      bestFor: 'Digital products, recurring memberships, benefits, receipts, and customer portal access.',
      offers: paymentRoutes.filter((route) => route.primaryProcessor === 'polar').map(withRouteStatus),
      setup:
        'Use long-lived Polar Checkout Links, success URLs with checkout_id={CHECKOUT_ID}, and link metadata copied to orders or subscriptions.',
    },
    {
      processor: 'Stripe',
      bestFor: 'Service deposits, high-ticket balances, hosted invoices, Payment Links, and broad payment-method conversion.',
      offers: paymentRoutes.filter((route) => route.primaryProcessor === 'stripe').map(withRouteStatus),
      setup:
        'Use Stripe Payment Links or hosted invoices first; later add Checkout Sessions and webhooks when fulfillment and ledger automation need server events.',
    },
  ];
}

export function getPaymentStrategy() {
  return {
    thesis: 'Use one primary processor per SKU: Polar for the digital product and membership, Stripe for service deposits and high-ticket balances.',
    currentMode: 'Static-site safe. Public checkout URLs are allowed; API keys, webhook secrets, and restricted keys are not.',
    rules: [
      'Do not show both processors for the same product on the first live launch.',
      'Keep secret API keys, restricted keys, and webhook secrets out of GitHub Pages and client-side JavaScript.',
      'Put product_slug, processor, challenge, operator, and variant metadata on every checkout path.',
      'Use hosted checkout links before custom embedded checkout so first cash can happen faster.',
      'Add webhooks only after there is a backend or automation target for fulfillment, ledger, and customer access.',
      'Do not enable tax automation casually; confirm registrations and processor tax responsibilities before collecting live tax.',
    ],
    evidence: [
      'Stripe Payment Links and hosted Checkout are the fastest low-code Stripe path for reusable payments and subscriptions.',
      'Polar Checkout Links can preset products, success URLs, return URLs, discounts, trials, seats, and metadata.',
      'Polar order.paid and Stripe checkout.session.completed are the key future automation events for fulfillment and ledger updates.',
    ],
  };
}

export function getPaymentProfitUpgrades() {
  return [
    {
      title: 'Make the Snapshot a Sprint credit',
      why: 'Apply the $19 purchase toward the $99 deposit so the low-ticket buy becomes a step toward the bigger sale.',
    },
    {
      title: 'Hide alternate processors at first',
      why: 'One checkout choice per product reduces buyer hesitation and prevents messy ledger attribution during the challenge.',
    },
    {
      title: 'Tag every checkout with metadata',
      why: 'Processor, offer slug, challenge, operator, and variant tags make paid receipts easier to reconcile and report.',
    },
    {
      title: 'Use a dedicated success page per offer',
      why: 'Snapshot, Deal Room, and Sprint buyers each need a different next action immediately after payment.',
    },
    {
      title: 'Add the Sprint upsell to the Snapshot success page',
      why: 'The buyer is warmest right after purchase, so the site should show the $19 credit toward the $99 deposit.',
    },
    {
      title: 'Create a deposit-to-balance path',
      why: 'Stripe can collect the $99 deposit first, then route qualified buyers to a hosted invoice or balance Payment Link.',
    },
    {
      title: 'Wire Polar order.paid later',
      why: 'A Polar webhook can trigger Snapshot delivery, benefit grants, and Deal Room access without manual checking.',
    },
    {
      title: 'Wire Stripe checkout completion later',
      why: 'A Stripe webhook can trigger Sprint intake, ledger updates, receipts, and delivery status once a backend exists.',
    },
    {
      title: 'Add daily processor reconciliation',
      why: 'A one-screen cash table by processor, SKU, amount, date, and delivery status keeps challenge profit reporting clean.',
    },
    {
      title: 'Keep fallback links admin-only',
      why: 'A backup processor is useful if one account blocks payments, but showing it publicly too early can hurt conversion.',
    },
  ];
}

export function buildPaymentConnectorAsk() {
  return [
    'Claude/orchestrator payment connector request:',
    'Keep one processor per SKU for the first live launch.',
    'Polar public checkout URLs are already installed for the $19 AI Opportunity Snapshot and $49/mo AI Deal Room.',
    'Add these remaining public checkout URLs to the Codex sales site after Stripe onboarding is complete:',
    '1. STRIPE_SPRINT_DEPOSIT_PAYMENT_LINK - Stripe Payment Link for the $99 Sprint deposit.',
    '2. STRIPE_SPRINT_BALANCE_PAYMENT_LINK - Stripe hosted invoice or Payment Link for the Sprint balance.',
    'Do not send API keys, restricted keys, or webhook secrets to the static site. Public checkout URLs only.',
    'Metadata to use on every checkout: challenge=ai-money-challenge, operator=codex, variant=codex-live, processor, offer_slug.',
  ].join('\n');
}
