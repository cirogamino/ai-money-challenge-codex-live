const publicCheckoutUrls = {
  POLAR_SNAPSHOT_CHECKOUT_URL: 'https://buy.polar.sh/polar_cl_GAIdjVhfhYasYe0YIexlWl5Gtn8GHf8eUS1dC3LKBwT',
  POLAR_DEAL_ROOM_CHECKOUT_URL: 'https://buy.polar.sh/polar_cl_Zau0s7BXL3McfQsGBPA9fySsfbvunswvaIs2q3T2Xx4',
  POLAR_SPRINT_DEPOSIT_CHECKOUT_URL: '',
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
      'Add a checkout-page description: "A 15-minute AI opportunity report for one leaky workflow, including a score, buyer promise, first launch message, and $19 Sprint credit."',
      'Attach a file-download or custom benefit with the Snapshot delivery instructions so the buyer receives something tangible after purchase.',
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
      'Add a checkout-page description with the first 7 days: welcome packet, weekly offer teardown, template vault, and Friday proof-of-demand scorecard.',
      'Attach a custom benefit with the member welcome link and cancellation/customer-portal instructions.',
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
    slug: 'ai-revenue-sprint-deposit-polar',
    productSlug: 'ai-revenue-sprint',
    offer: '48-Hour AI Revenue Sprint deposit',
    amount: '$99',
    primaryProcessor: 'polar',
    checkoutType: 'Fallback Checkout Link',
    processorLabel: 'Polar',
    configKey: 'POLAR_SPRINT_DEPOSIT_CHECKOUT_URL',
    checkoutUrl: publicCheckoutUrls.POLAR_SPRINT_DEPOSIT_CHECKOUT_URL,
    buttonLabel: 'Add Polar deposit link',
    successUrl: `${liveBaseUrl}/site/success/sprint-deposit/?route_slug=ai-revenue-sprint-deposit-polar&checkout_id={CHECKOUT_ID}`,
    returnUrl: siteReturnUrl,
    docsUrl: 'https://polar.sh/docs/features/checkout/links',
    setupTarget: {
      label: 'Create Polar deposit',
      url: polarCheckoutLinksUrl,
    },
    setupSteps: [
      'Open Polar Checkout Links and click New Link.',
      'Create or select 48-Hour AI Revenue Sprint Deposit as a one-time product priced at $99 USD.',
      'Add a checkout-page description: "Reserve one of 3 founder Sprint slots before August 3. The $99 deposit credits toward the $1,500 Sprint after qualification."',
      'Attach a custom benefit with the Sprint intake link, support email, and deposit-credit terms so the buyer knows exactly what happens next.',
      'Set the success URL and return URL from this route card.',
      'Add the metadata keys shown here so orders reconcile cleanly.',
      'Copy the persistent Checkout Link URL into POLAR_SPRINT_DEPOSIT_CHECKOUT_URL.',
    ],
    reason:
      'Fastest live fallback for the high-ticket deposit while Stripe onboarding remains blocked. Use this only until Stripe Payment Links or hosted invoices are available.',
    nextAction: 'Create the Polar $99 Sprint deposit Checkout Link and install the public URL.',
    metadata: {
      ...sharedMetadata,
      processor: 'polar',
      offer_slug: 'ai-revenue-sprint-deposit',
      route_slug: 'ai-revenue-sprint-deposit-polar',
      funnel_role: 'deposit',
      fallback_for: 'stripe',
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
      'Collect customer name, business name, and email in Checkout so fulfillment can start without a second manual lookup.',
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

export function getBestPaymentRouteForProduct(productSlug) {
  const routes = paymentRoutes.filter((candidate) => candidate.productSlug === productSlug).map(withRouteStatus);
  const liveRoute = routes.find((route) => route.isLive);

  if (liveRoute) {
    return liveRoute;
  }

  return routes.find((route) => route.primaryProcessor === 'polar') ?? routes[0] ?? null;
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
      bestFor: 'Digital products, recurring memberships, benefits, receipts, customer portal access, and emergency deposit fallback.',
      offers: paymentRoutes.filter((route) => route.primaryProcessor === 'polar').map(withRouteStatus),
      setup:
        'Use long-lived Polar Checkout Links, checkout-page descriptions, benefits, success URLs with checkout_id={CHECKOUT_ID}, and metadata copied to orders or subscriptions.',
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
    thesis: 'Use one primary processor per SKU for buyers: Polar for digital product and membership, Stripe for service deposits and high-ticket balances, with a hidden Polar deposit fallback while Stripe is blocked.',
    currentMode: 'Static-site safe. Public checkout URLs are allowed; API keys, webhook secrets, and restricted keys are not.',
    rules: [
      'Do not show both processors for the same product on the buyer-facing first launch; keep fallback routes in ops mode until needed.',
      'Keep secret API keys, restricted keys, and webhook secrets out of GitHub Pages and client-side JavaScript.',
      'Put product_slug, processor, challenge, operator, and variant metadata on every checkout path.',
      'Use hosted checkout links before custom embedded checkout so first cash can happen faster.',
      'Add webhooks only after there is a backend or automation target for fulfillment, ledger, and customer access.',
      'Do not enable tax automation casually; confirm registrations and processor tax responsibilities before collecting live tax.',
    ],
    evidence: [
      'Stripe Payment Links and hosted Checkout are the fastest low-code Stripe path for reusable payments and subscriptions.',
      'Polar Checkout Links can preset products, success URLs, return URLs, discounts, trials, seats, metadata, checkout descriptions, and product benefits.',
      'Polar order.paid and Stripe checkout.session.completed are the key future automation events for fulfillment and ledger updates.',
    ],
  };
}

export function getPaymentProfitUpgrades() {
  return [
    {
      title: 'Keep the Snapshot as the live first-money path',
      why: 'Cold visitors can buy the $19 Snapshot now while the higher-value deposit route finishes connector setup.',
    },
    {
      title: 'Add the Polar Sprint deposit fallback',
      why: 'If Stripe remains blocked, a Polar $99 deposit link keeps the highest-value CTA from being stuck in preview.',
    },
    {
      title: 'Upgrade hosted checkout pages',
      why: 'Descriptions, product media, and benefits keep trust from dropping when buyers leave the sales page for hosted checkout.',
    },
    {
      title: 'Treat success pages as intake until webhooks verify cash',
      why: 'Static pages can collect buyer context, but webhook-confirmed payment events must confirm fulfillment and scoreboard cash.',
    },
    {
      title: 'Define the Deal Room first week',
      why: 'Recurring buyers need a visible week-one rhythm before they trust a subscription.',
    },
    {
      title: 'Lead with one painful wedge',
      why: 'Local service follow-up leaks are easier to understand and buy than a broad promise to make money with AI.',
    },
    {
      title: 'Publish the refund and deposit boundary',
      why: 'Clear terms lower fear and avoid messy disputes once real money starts moving.',
    },
    {
      title: 'Collapse checkout choices',
      why: 'Buyer mode should recommend one path at a time, while ops mode can keep every route and setup detail.',
    },
    {
      title: 'Collect buyer context inside checkout when possible',
      why: 'Name, business name, email, and product metadata reduce manual fulfillment delay after the payment event.',
    },
    {
      title: 'Turn the August 3 deadline into capacity',
      why: 'The race deadline becomes a believable reason to buy now when it is tied to 3 founder Sprint slots.',
    },
  ];
}

export function buildPaymentConnectorAsk() {
  return [
    'Claude/orchestrator payment connector request:',
    'Keep one buyer-facing processor per SKU for the first live launch; fallback routes stay ops-only unless the primary route is blocked.',
    'Polar public checkout URLs are already installed for the $19 AI Opportunity Snapshot and $49/mo AI Deal Room.',
    'Add this fallback public checkout URL immediately if Stripe remains blocked:',
    '1. POLAR_SPRINT_DEPOSIT_CHECKOUT_URL - Polar one-time Checkout Link for the $99 Sprint deposit.',
    'Add these remaining public checkout URLs after Stripe onboarding is complete:',
    '2. STRIPE_SPRINT_DEPOSIT_PAYMENT_LINK - Stripe Payment Link for the $99 Sprint deposit.',
    '3. STRIPE_SPRINT_BALANCE_PAYMENT_LINK - Stripe hosted invoice or Payment Link for the Sprint balance.',
    'Do not send API keys, restricted keys, or webhook secrets to the static site. Public checkout URLs only.',
    'Metadata to use on every checkout: challenge=ai-money-challenge, operator=codex, variant=codex-live, processor, offer_slug.',
  ].join('\n');
}
