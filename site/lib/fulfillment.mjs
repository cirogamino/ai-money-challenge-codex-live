import { getPaymentRouteBySlug } from './paymentRoutes.mjs';

const routeConfigs = [
  {
    folder: 'snapshot',
    routeSlug: 'ai-opportunity-snapshot',
    confirmationParam: 'checkout_id',
    primaryAction: 'Complete Snapshot intake',
    deliveryWindow: 'Instant packet after intake',
    requiredFields: ['buyerName', 'buyerEmail', 'businessName', 'website', 'workflow', 'bottleneck'],
    nextStep:
      'Generate the opportunity score, revenue leak summary, buyer promise, launch copy, and Sprint upsell packet.',
  },
  {
    folder: 'deal-room',
    routeSlug: 'ai-deal-room',
    confirmationParam: 'checkout_id',
    primaryAction: 'Complete membership intake',
    deliveryWindow: 'Member packet after intake',
    requiredFields: ['buyerName', 'buyerEmail', 'businessName', 'website', 'workflow', 'targetBuyer'],
    nextStep:
      'Create the first weekly deal board, offer teardown queue, member launch checklist, and renewal note.',
  },
  {
    folder: 'sprint-deposit',
    routeSlug: 'ai-revenue-sprint-deposit',
    confirmationParam: 'session_id',
    primaryAction: 'Complete Sprint deposit intake',
    deliveryWindow: 'Qualification packet same day',
    requiredFields: ['buyerName', 'buyerEmail', 'businessName', 'website', 'workflow', 'bottleneck', 'targetBuyer'],
    nextStep:
      'Qualify the workflow, confirm the $99 deposit credit, prepare the $1,401 balance path, and schedule the build sprint.',
  },
  {
    folder: 'sprint-balance',
    routeSlug: 'ai-revenue-sprint-balance',
    confirmationParam: 'session_id',
    primaryAction: 'Complete Sprint kickoff intake',
    deliveryWindow: 'Build kickoff packet same day',
    requiredFields: ['buyerName', 'buyerEmail', 'businessName', 'website', 'workflow', 'bottleneck', 'targetBuyer'],
    nextStep:
      'Create the build checklist, delivery milestones, acceptance criteria, and final challenge ledger proof row.',
  },
];

const defaultIntake = {
  buyerName: '',
  buyerEmail: '',
  businessName: '',
  website: '',
  workflow: '',
  bottleneck: '',
  targetBuyer: '',
  notes: '',
};

function pickParam(params, key) {
  if (!params) return '';

  if (params instanceof URLSearchParams) {
    return params.get(key) ?? '';
  }

  return params[key] ?? '';
}

function normalizeIntake(intake = {}) {
  return Object.fromEntries(
    Object.entries(defaultIntake).map(([key, fallback]) => [key, String(intake[key] ?? fallback).trim()]),
  );
}

function routeWithPayment(config) {
  const paymentRoute = getPaymentRouteBySlug(config.routeSlug);

  if (!paymentRoute) {
    throw new Error(`Missing payment route for ${config.routeSlug}.`);
  }

  return {
    ...config,
    successPath: `/site/success/${config.folder}/`,
    offer: paymentRoute.offer,
    amount: paymentRoute.amount,
    processor: paymentRoute.processorLabel,
    checkoutType: paymentRoute.checkoutType,
    checkoutUrl: paymentRoute.checkoutUrl,
    isCheckoutLive: paymentRoute.isLive,
    displayStatus: paymentRoute.isLive ? 'Paid redirect ready' : 'Preview redirect ready',
    cashStatus: 'pending processor verification',
    setupCopy: paymentRoute.setupCopy,
  };
}

export function getFulfillmentRoutes() {
  return routeConfigs.map(routeWithPayment);
}

export function getFulfillmentRouteByFolder(folder) {
  const config = routeConfigs.find((candidate) => candidate.folder === folder) ?? routeConfigs[0];
  return routeWithPayment(config);
}

export function getFulfillmentRouteBySlug(routeSlug) {
  const config = routeConfigs.find((candidate) => candidate.routeSlug === routeSlug) ?? routeConfigs[0];
  return routeWithPayment(config);
}

export function buildIntakeSeed(folderOrRouteSlug, params = {}) {
  const route = folderOrRouteSlug.includes('ai-')
    ? getFulfillmentRouteBySlug(folderOrRouteSlug)
    : getFulfillmentRouteByFolder(folderOrRouteSlug);
  const checkoutReference =
    pickParam(params, route.confirmationParam) ||
    pickParam(params, 'checkout_id') ||
    pickParam(params, 'session_id') ||
    'manual-preview';

  return {
    routeSlug: route.routeSlug,
    folder: route.folder,
    offer: route.offer,
    amount: route.amount,
    processor: route.processor,
    checkoutType: route.checkoutType,
    checkoutReference,
    cashStatus: route.cashStatus,
    deliveryWindow: route.deliveryWindow,
    utmSource: pickParam(params, 'utm_source') || 'direct',
    utmCampaign: pickParam(params, 'utm_campaign') || 'codex-live',
  };
}

export function buildLedgerEntry({ routeSlug, params = {}, intake = {}, now = new Date().toISOString() }) {
  const route = getFulfillmentRouteBySlug(routeSlug);
  const seed = buildIntakeSeed(route.routeSlug, params);
  const cleanIntake = normalizeIntake(intake);
  const timestamp = new Date(now);

  return {
    date: timestamp.toISOString().slice(0, 10),
    received_at: timestamp.toISOString(),
    challenge: 'ai-money-challenge',
    operator: 'codex',
    processor: route.processor,
    offer_slug: route.routeSlug,
    offer: route.offer,
    amount: route.amount,
    cash_received_status: seed.cashStatus,
    checkout_reference: seed.checkoutReference,
    buyer_name: cleanIntake.buyerName,
    buyer_email: cleanIntake.buyerEmail,
    business_name: cleanIntake.businessName,
    website: cleanIntake.website,
    workflow: cleanIntake.workflow,
    delivery_status: 'intake packet generated',
    source: 'site-success-page',
  };
}

export function buildFulfillmentPacket({ routeSlug, params = {}, intake = {}, now = new Date().toISOString() }) {
  const route = getFulfillmentRouteBySlug(routeSlug);
  const seed = buildIntakeSeed(route.routeSlug, params);
  const cleanIntake = normalizeIntake(intake);
  const ledgerEntry = buildLedgerEntry({ routeSlug: route.routeSlug, params, intake: cleanIntake, now });
  const business = cleanIntake.businessName || 'Buyer business';
  const workflow = cleanIntake.workflow || 'Priority workflow';

  return {
    subject: `${route.offer} intake - ${business}`,
    ledgerEntry,
    body: [
      `Fulfillment packet for ${route.offer}`,
      `Processor: ${route.processor}`,
      `Amount: ${route.amount}`,
      `${route.confirmationParam}: ${seed.checkoutReference}`,
      `Cash status: ${seed.cashStatus}`,
      '',
      `Buyer: ${cleanIntake.buyerName || 'Not provided'} <${cleanIntake.buyerEmail || 'not provided'}>`,
      `Business: ${business}`,
      `Website: ${cleanIntake.website || 'Not provided'}`,
      `Workflow: ${workflow}`,
      `Bottleneck: ${cleanIntake.bottleneck || 'Not provided'}`,
      `Target buyer: ${cleanIntake.targetBuyer || 'Not provided'}`,
      `Notes: ${cleanIntake.notes || 'None'}`,
      '',
      `Delivery window: ${route.deliveryWindow}`,
      `Next step: ${route.nextStep}`,
      'Ledger row:',
      JSON.stringify(ledgerEntry, null, 2),
    ].join('\n'),
  };
}

export function getFulfillmentAutomationPlan() {
  return {
    title: 'Post-payment fulfillment system',
    summary:
      'Hosted checkout redirects now land on static success pages that collect intake, generate fulfillment packets, and create ledger rows without storing secrets in the browser.',
    steps: [
      {
        title: 'Success page redirects',
        status: 'ready',
        detail: 'Stripe and Polar success URLs have a real static page for each checkout route.',
      },
      {
        title: 'Buyer intake capture',
        status: 'ready',
        detail: 'The buyer can complete context fields immediately after payment and save the packet locally.',
      },
      {
        title: 'Fulfillment packet',
        status: 'ready',
        detail: 'The success page generates a copy-ready delivery brief for Codex, Claude, or Ciro.',
      },
      {
        title: 'Ledger row',
        status: 'ready',
        detail: 'A challenge ledger JSON row is generated with processor, offer, amount, buyer, and delivery status.',
      },
      {
        title: 'Webhook verification',
        status: 'blocked',
        detail: 'Real paid status still needs Stripe and Polar webhook events or dashboard confirmation before claiming cash.',
      },
    ],
  };
}
