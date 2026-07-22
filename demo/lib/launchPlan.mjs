const DEFAULTS = {
  productName: 'AI Opportunity Snapshot',
  priceUsd: 19,
  operatorName: 'ChatGPT',
  orchestratorName: 'Claude',
};

function normalizeConfig(config = {}) {
  return {
    ...DEFAULTS,
    ...config,
    priceUsd: Number(config.priceUsd || DEFAULTS.priceUsd),
  };
}

function buildConnectors({ productName, priceUsd }) {
  return [
    {
      id: 'hosting',
      name: 'Static demo hosting',
      recommended: 'GitHub Pages or equivalent static host',
      status: 'build-ready',
      purpose: 'Publish the no-budget browser demo as the buyer-facing product page.',
      authorizationNeeded: 'Repository/page publishing access',
    },
    {
      id: 'payment',
      name: 'Payment link',
      recommended: 'PayPal Payment Link first',
      status: 'needs-authorization',
      purpose: `Collect the first $${priceUsd} before delivery without building a custom checkout.`,
      authorizationNeeded: 'Ciro approves or connects the payment account through Claude.',
    },
    {
      id: 'intake',
      name: 'Buyer intake',
      recommended: 'Google Form feeding Google Sheets',
      status: 'needs-build',
      purpose: 'Collect business type, buyer, bottleneck, revenue, and proof of payment in one structured row.',
      authorizationNeeded: 'Google Form and Sheet trigger authorization when ready.',
    },
    {
      id: 'fulfillment',
      name: 'Audit fulfillment',
      recommended: 'Deterministic snapshot engine plus daily AI review window',
      status: 'build-ready',
      purpose: `${productName} can generate the first deliverable without paid APIs or live model calls.`,
      authorizationNeeded: 'None until outbound delivery is connected.',
    },
    {
      id: 'ledger',
      name: 'Ledger and reporting',
      recommended: 'Shared Challenge ledger plus daily report doc',
      status: 'needs-build',
      purpose: 'Write cash-in only after money lands and keep the replicability trail intact.',
      authorizationNeeded: 'Connector permission to append rows when payment proof exists.',
    },
    {
      id: 'orchestrator',
      name: 'Claude handoff',
      recommended: 'Message bus request packet',
      status: 'active',
      purpose: 'Route every human-needed action through Claude so Ciro only sees orchestrated authorization requests.',
      authorizationNeeded: 'None for build updates.',
    },
  ];
}

function buildClaudePacket({ productName, priceUsd, operatorName, orchestratorName }) {
  const title = `FOR ${orchestratorName} — ${operatorName} build-stage connector request`;
  const body = [
    `${operatorName} is staying in build mode for ${productName}.`,
    '',
    'No Ciro action is requested right now.',
    '',
    'When a human action becomes unavoidable, please ask Ciro only for a bounded authorization/go decision, not manual outreach.',
    '',
    'Connector plan to prepare:',
    `1. Payment link for $${priceUsd}`,
    '2. Buyer intake form feeding a sheet',
    '3. Static hosted demo',
    '4. Fulfillment queue',
    '5. Ledger/reporting append flow',
    '',
    `Signed, ${operatorName}`,
  ].join('\n');

  return { title, body };
}

export function generateLaunchPlan(config = {}) {
  const normalized = normalizeConfig(config);
  const connectors = buildConnectors(normalized);
  const blockers = [
    'payment link not connected',
    'buyer intake form not connected',
    'ledger append flow not connected',
    'final authorize/go packet not approved',
  ];

  return {
    stage: 'build',
    productName: normalized.productName,
    humanActionPolicy: {
      askCiroDirectly: false,
      route: `Report unavoidable human actions to ${normalized.orchestratorName}, who asks Ciro.`,
      goal: 'Ciro should only authorize and press go where possible.',
    },
    connectors,
    goLiveReadiness: {
      ready: false,
      blockers,
      goButtonLabel: 'Authorize connectors, then press Go Live',
    },
    claudePacket: buildClaudePacket(normalized),
  };
}
