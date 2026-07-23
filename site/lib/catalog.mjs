import {
  buildPaymentConnectorAsk,
  getPaymentReadiness,
  getPaymentRouteBySlug,
} from './paymentRoutes.mjs';

export const products = [
  {
    slug: 'ai-opportunity-snapshot',
    type: 'Small digital product',
    title: 'AI Opportunity Snapshot',
    price: '$19',
    promise:
      'A low-risk tripwire audit for buyers who are not ready for the Sprint yet but want one clear AI offer to test.',
    primaryOutcome: 'Find the first sellable AI offer without burning days in research.',
    audience: 'Solo operators, creators, and local service owners who want a fast AI-product angle.',
    speedToDollar: 'Fastest path: buy the Snapshot, see the offer, then upgrade if the opportunity is real.',
    profitPotential: '30-day role: entry product, trust builder, and lead source for the Sprint.',
    includes: [
      'One-page opportunity score',
      'Offer ladder recommendation',
      'Buyer pain map',
      'Launch copy starter pack',
    ],
    cta: 'Buy Snapshot after approval',
    checkoutAction: 'Polar Checkout Link - POLAR_SNAPSHOT_CHECKOUT_URL',
  },
  {
    slug: 'ai-deal-room',
    type: 'Recurring membership',
    title: 'AI Deal Room',
    price: '$49/mo',
    promise: 'A weekly operating room for turning AI ideas into small offers, sales pages, and proof-of-demand receipts.',
    primaryOutcome: 'Keep shipping one small AI offer every week with reusable templates and group accountability.',
    audience: 'Builders who want a repeatable rhythm instead of another idea graveyard.',
    speedToDollar: 'Fastest path: convert snapshot buyers who want weekly help implementing.',
    profitPotential: '30-day role: recurring base that compounds after the first sales push.',
    includes: [
      'Weekly offer teardown',
      'Prompt and page templates',
      'Proof-of-demand checklist',
      'Member-only launch console',
    ],
    cta: 'Join founding list',
    checkoutAction: 'Polar recurring Checkout Link - POLAR_DEAL_ROOM_CHECKOUT_URL',
  },
  {
    slug: 'ai-revenue-sprint',
    type: 'High-ticket offer',
    title: '48-Hour AI Revenue Sprint',
    price: '$1,500',
    promise:
      'The primary cash offer: a focused 48-hour sprint that turns one expertise, audience, or service into a sellable AI-powered offer.',
    primaryOutcome: 'Leave with a page, intake flow, fulfillment template, and launch sequence ready for authorization.',
    audience: 'Business owners with an audience, service, or skill that can be packaged quickly.',
    speedToDollar: 'Fastest path: collect a paid deposit, qualify the buyer, then finish the sprint delivery.',
    profitPotential: '30-day role: one sale can win the challenge if delivery stays tight.',
    includes: [
      'Offer architecture session',
      'Sales page and intake build',
      'Fulfillment automation map',
      'Launch script packet',
    ],
    cta: 'Reserve $99 Sprint deposit',
    checkoutAction: 'Stripe Payment Link - STRIPE_SPRINT_DEPOSIT_PAYMENT_LINK',
  },
];

const statusProgress = {
  done: 1,
  in_progress: 0.5,
  blocked: 0,
  queued: 0,
};

export function getSprintDepositOffer() {
  return {
    title: '$99 Sprint deposit',
    price: '$99',
    appliesTo: '$1,500 Sprint',
    productSlug: 'ai-revenue-sprint',
    cta: 'Reserve $99 Sprint deposit',
    buyerPromise:
      'Reserve one of the 3 Sprint slots, credit the deposit toward the $1,500 build, and trigger qualification before full delivery.',
    connector: 'Stripe Payment Link or hosted invoice',
  };
}

export function getSnapshotDeliveryPlan() {
  return {
    title: 'Instant Snapshot delivery',
    price: '$19',
    deliverySpeed: 'Instant after payment',
    promise:
      'The buyer pays, enters one business idea, and immediately receives a compact action packet that can upsell into the Sprint.',
    outputs: [
      'AI opportunity score',
      'Buyer pain map',
      'Offer ladder recommendation',
      'Launch copy starter pack',
      'Sprint upsell credit',
    ],
    steps: [
      'Payment confirms the $19 Snapshot purchase.',
      'Buyer enters one idea, audience, and current offer context.',
      'Snapshot engine returns score, pain map, product ladder, and first launch copy.',
      'Thank-you page offers the $19 as credit toward the $99 Sprint deposit.',
      'Ledger packet records cash received, product sold, and delivery status.',
    ],
  };
}

export function getSuperChecklist() {
  return [
    {
      phase: 'Foundation',
      summary: 'The sellable product and local preview exist.',
      items: [
        {
          label: 'Three-product challenge ladder',
          owner: 'Codex',
          status: 'done',
          detail: '$19 Snapshot, $49/mo Deal Room, and $1,500 Sprint are defined.',
        },
        {
          label: 'Working Snapshot demo',
          owner: 'Codex',
          status: 'done',
          detail: 'The demo turns an idea into opportunity score, pain map, and launch plan.',
        },
        {
          label: 'Sprint-first sales page',
          owner: 'Codex',
          status: 'done',
          detail: 'Hero, proof, niche routing, ROI calculator, and qualifier push high-intent buyers to the Sprint.',
        },
        {
          label: 'Local preview server path',
          owner: 'Codex',
          status: 'done',
          detail: 'The site can be reviewed at the local preview URL before live deployment.',
        },
      ],
    },
    {
      phase: 'First-dollar path',
      summary: 'The first paid route is designed around low-friction deposits and instant delivery.',
      items: [
        {
          label: '$99 Sprint deposit option',
          owner: 'Codex',
          status: 'done',
          detail: 'The site now shows a $99 deposit path that credits toward the $1,500 Sprint.',
        },
        {
          label: 'Instant Snapshot delivery',
          owner: 'Codex',
          status: 'done',
          detail: 'The $19 buyer output, thank-you upsell, and ledger packet are specified.',
        },
        {
          label: 'Stripe and Polar processor split',
          owner: 'Codex',
          status: 'done',
          detail: 'Polar owns Snapshot and Deal Room. Stripe owns the Sprint deposit and balance.',
        },
        {
          label: 'Payment link connector packet',
          owner: 'Codex',
          status: 'done',
          detail: 'Exact public checkout URL slots, setup links, and installer command are defined for Stripe and Polar.',
        },
        {
          label: 'Live checkout URLs',
          owner: 'Claude orchestrator',
          status: 'blocked',
          detail: 'Needs the real public Stripe and Polar checkout links before preview buttons become payment buttons.',
        },
      ],
    },
    {
      phase: 'Authorize-and-go controls',
      summary: 'The page now shows what is ready, what is blocked, and what Claude should wire.',
      items: [
        {
          label: 'Go Button dashboard',
          owner: 'Codex',
          status: 'done',
          detail: 'Visible launch-control board tracks subdomain, payment, delivery, intake, ledger, and Claude handoff.',
        },
        {
          label: 'Subdomain decision for Claude',
          owner: 'Claude orchestrator',
          status: 'blocked',
          detail: 'Claude still needs to confirm codex.cedogamino.com or chatgtp.cedogamino.com.',
        },
        {
          label: 'Buyer intake form',
          owner: 'Claude orchestrator',
          status: 'queued',
          detail: 'One form should collect buyer context and feed fulfillment after payment.',
        },
        {
          label: 'Challenge ledger sync',
          owner: 'Claude orchestrator',
          status: 'queued',
          detail: 'Cash received, product sold, delivery status, and date should update the shared ledger.',
        },
      ],
    },
    {
      phase: 'Profit multipliers',
      summary: 'Next improvements can raise conversion after core connectors are live.',
      items: [
        {
          label: 'Founder video block',
          owner: 'Codex',
          status: 'done',
          detail: 'The trust section has a ready slot for a short Ciro intro before launch.',
        },
        {
          label: 'Niche-specific landing pages',
          owner: 'Codex',
          status: 'queued',
          detail: 'Consultants, local service owners, and creators should eventually get their own landing URLs.',
        },
        {
          label: 'Affiliate referral bounty',
          owner: 'Codex',
          status: 'queued',
          detail: 'A 20% bounty can recruit warm referrers after payment tracking exists.',
        },
        {
          label: 'Claude abandoned-click follow-up',
          owner: 'Codex',
          status: 'queued',
          detail: 'Checkout clicks without purchases should generate a follow-up packet when tracking is available.',
        },
      ],
    },
  ];
}

export function getProjectProgress() {
  const phases = getSuperChecklist();
  const items = phases.flatMap((phase) => phase.items);
  const completed = items.filter((item) => item.status === 'done').length;
  const inProgress = items.filter((item) => item.status === 'in_progress').length;
  const blocked = items.filter((item) => item.status === 'blocked').length;
  const queued = items.filter((item) => item.status === 'queued').length;
  const weightedComplete = items.reduce((sum, item) => sum + (statusProgress[item.status] ?? 0), 0);

  return {
    percent: Math.round((weightedComplete / items.length) * 100),
    completed,
    inProgress,
    blocked,
    queued,
    total: items.length,
    currentPhase: 'First-dollar connector wiring',
    nextMilestone: 'Replace connector previews with live Stripe, Polar, intake, ledger, and subdomain routing.',
  };
}

export function getGoButtonDashboard() {
  const progress = getProjectProgress();

  return {
    title: 'Go Button dashboard',
    primaryCommand: 'Authorize connectors, then press Go',
    launchReadyPercent: progress.percent,
    status: 'Preview-ready, connector-blocked',
    connectors: [
      {
        name: 'Subdomain',
        state: 'blocked',
        owner: 'Claude orchestrator',
        action: 'Confirm codex.cedogamino.com or chatgtp.cedogamino.com.',
      },
      {
        name: 'Payment link',
        state: 'in_progress',
        owner: 'Codex and Claude orchestrator',
        action: 'Use the setup buttons, then install the four public checkout URLs with the safe installer.',
      },
      {
        name: '$99 Sprint deposit',
        state: 'done',
        owner: 'Codex',
        action: 'Use the deposit copy and modal flow now; replace preview with the live paid link later.',
      },
      {
        name: 'Instant Snapshot delivery',
        state: 'done',
        owner: 'Codex',
        action: 'Use the defined buyer packet and thank-you upsell after the $19 payment.',
      },
      {
        name: 'Buyer intake',
        state: 'queued',
        owner: 'Claude orchestrator',
        action: 'Create one form that captures buyer context and triggers fulfillment.',
      },
      {
        name: 'Ledger sync',
        state: 'queued',
        owner: 'Claude orchestrator',
        action: 'Record cash received, product sold, date, and delivery status.',
      },
      {
        name: 'Claude handoff',
        state: 'done',
        owner: 'Codex',
        action: 'Copy the handoff packet so Claude can ask Ciro only for the required authorization.',
      },
    ],
  };
}

export function getCheckoutState() {
  const sprintDeposit = getSprintDepositOffer();
  const paymentReadiness = getPaymentReadiness();
  const snapshotRoute = getPaymentRouteBySlug('ai-opportunity-snapshot');
  const dealRoomRoute = getPaymentRouteBySlug('ai-deal-room');
  const sprintDepositRoute = getPaymentRouteBySlug('ai-revenue-sprint-deposit');

  return {
    mode: paymentReadiness.mode === 'live' ? 'live' : 'preview',
    isPaymentLive: paymentReadiness.mode === 'live',
    primaryButtonLabel: sprintDeposit.cta,
    liveLabel: paymentReadiness.mode === 'live' ? 'Live checkout' : 'Connector preview',
    pendingConnectors: ['Stripe URL', 'Polar URL', 'intake form', 'ledger sync', 'subdomain routing'],
    buyerMessage:
      'Payments are not live in this preview until the public Stripe and Polar checkout URLs are installed. API keys and webhook secrets stay out of the static site.',
    actions: [
      {
        label: 'Buy $19 Snapshot',
        productSlug: snapshotRoute.productSlug,
        routeSlug: snapshotRoute.slug,
        connector: `${snapshotRoute.processorLabel} - ${snapshotRoute.displayStatus}`,
        configKey: snapshotRoute.configKey,
        checkoutUrl: snapshotRoute.checkoutUrl,
        isLive: snapshotRoute.isLive,
        buttonLabel: snapshotRoute.isLive ? 'Buy Snapshot' : snapshotRoute.buttonLabel,
      },
      {
        label: 'Join $49/mo Deal Room',
        productSlug: dealRoomRoute.productSlug,
        routeSlug: dealRoomRoute.slug,
        connector: `${dealRoomRoute.processorLabel} - ${dealRoomRoute.displayStatus}`,
        configKey: dealRoomRoute.configKey,
        checkoutUrl: dealRoomRoute.checkoutUrl,
        isLive: dealRoomRoute.isLive,
        buttonLabel: dealRoomRoute.isLive ? 'Join Deal Room' : dealRoomRoute.buttonLabel,
      },
      {
        label: sprintDeposit.cta,
        productSlug: sprintDepositRoute.productSlug,
        routeSlug: sprintDepositRoute.slug,
        connector: `${sprintDepositRoute.processorLabel} - ${sprintDepositRoute.displayStatus}`,
        configKey: sprintDepositRoute.configKey,
        checkoutUrl: sprintDepositRoute.checkoutUrl,
        isLive: sprintDepositRoute.isLive,
        buttonLabel: sprintDepositRoute.isLive ? sprintDeposit.cta : sprintDepositRoute.buttonLabel,
      },
    ],
  };
}

export function getFeaturedMetrics() {
  return [
    { label: 'Primary sale', value: '$1,500' },
    { label: 'Sprint slots', value: '3 before Aug 3' },
    { label: 'Tripwire', value: '$19' },
    { label: 'Sprint window', value: '48 hours' },
  ];
}

export function getRevenueFocus() {
  return {
    primaryProductSlug: 'ai-revenue-sprint',
    headline: 'Turn one AI idea into a sellable offer in 48 hours.',
    supportingCopy:
      'The fastest path to winning the 30-day scoreboard is not chasing tiny purchases. It is qualifying one buyer who can pay for the 48-Hour AI Revenue Sprint, while the $19 Snapshot catches lower-intent buyers.',
    primaryCta: 'Reserve $99 Sprint deposit',
    secondaryCta: 'Try the $19 Snapshot first',
    scarcity: {
      totalSlots: 3,
      claimedSlots: 0,
      deadline: '2026-08-03',
      message: '3 sprint slots before the August 3 challenge deadline.',
    },
  };
}

export function getTargetNiches() {
  return [
    {
      name: 'Consultants',
      pain: 'They know their expertise is valuable, but their offer still looks like hourly advice.',
      sprintAngle: 'Package one repeatable client problem into a paid AI-assisted diagnostic or implementation sprint.',
    },
    {
      name: 'Local Service Owners',
      pain: 'They hear about AI everywhere but do not know which workflow could actually make or save money.',
      sprintAngle: 'Turn one intake, follow-up, quote, or customer education workflow into a simple revenue-ready offer.',
    },
    {
      name: 'Creators',
      pain: 'They have audience attention and ideas, but not a clean paid product ladder.',
      sprintAngle: 'Convert one audience pain into a $19 entry product, recurring room, and premium build sprint.',
    },
  ];
}

export function getProofTransformation() {
  return {
    before: 'Messy AI idea, unclear buyer, no price, no payment path.',
    after: 'One buyer, one urgent problem, one paid promise, one checkout-ready offer ladder.',
    demoInput: 'I know AI is valuable, but I do not know what to sell.',
    demoOutput: 'Pick one buyer, score urgency, define one paid promise, then route to Snapshot or Sprint.',
  };
}

export function calculateRoi({ clientValue, expectedClients, investment }) {
  const revenue = Math.max(0, Number(clientValue) || 0) * Math.max(0, Number(expectedClients) || 0);
  const cleanInvestment = Math.max(1, Number(investment) || 1);
  const profit = revenue - cleanInvestment;
  const multiple = `${(revenue / cleanInvestment).toFixed(1)}x`;

  return {
    revenue,
    profit,
    multiple,
    summary: `If the $19 Snapshot helps create $${revenue.toLocaleString()} in buyer value, it returns ${multiple} on the entry purchase before delivery time.`,
  };
}

export function getQualificationResult(answers) {
  const score = [
    answers.hasAudience,
    answers.hasService,
    answers.wantsDoneForYou,
    answers.budgetReady,
  ].filter(Boolean).length;

  if (score >= 3 && answers.budgetReady) {
    return {
      score,
      recommendedSlug: 'ai-revenue-sprint',
      title: 'Sprint-ready buyer',
      message: 'Route this person to the 48-Hour AI Revenue Sprint and ask for a paid booking or deposit.',
    };
  }

  if (score >= 2) {
    return {
      score,
      recommendedSlug: 'ai-deal-room',
      title: 'Build-with-guidance buyer',
      message: 'Route this person to the Deal Room, then upsell the Sprint when urgency increases.',
    };
  }

  return {
    score,
    recommendedSlug: 'ai-opportunity-snapshot',
    title: 'Snapshot-first buyer',
    message: 'Route this person to the $19 Snapshot so they can clarify the first sellable AI offer.',
  };
}

export function getConversionUpgrades() {
  return [
    { title: 'Sprint-first hero', status: 'built into this version' },
    { title: 'Book + pay deposit CTA', status: 'built into this version' },
    { title: '$19 Snapshot tripwire framing', status: 'built into this version' },
    { title: 'ROI calculator', status: 'built into this version' },
    { title: 'Qualification quiz', status: 'built into this version' },
    { title: 'Three specific buyer niches', status: 'built into this version' },
    { title: 'Real scarcity with 3 sprint slots', status: 'built into this version' },
    { title: 'Instant checkout connector rail', status: 'built into this version' },
    { title: 'Before and after proof section', status: 'built into this version' },
    { title: 'Founder and challenge trust section', status: 'built into this version' },
  ];
}

export function getGrowthIdeas() {
  return [
    {
      title: 'Add a 20% affiliate bounty',
      why: 'A payout gives friends, builders, and creators a reason to refer Sprint buyers fast.',
    },
    {
      title: 'Offer a deadline guarantee',
      why: 'Promise the buyer leaves with a page, intake, and launch packet in 48 hours or gets one extra build session.',
    },
    {
      title: 'Create a public build receipt',
      why: 'A small scoreboard of booked calls, deposits, and delivered outputs makes the challenge feel real.',
    },
    {
      title: 'Add a one-click founder video',
      why: 'A short personal video can replace a lot of trust-building copy for first-time buyers.',
    },
    {
      title: 'Bundle the first month of Deal Room with the Sprint',
      why: 'Bundling continuity raises retention and gives buyers a reason to stay after the build weekend.',
    },
    {
      title: 'Create niche-specific landing URLs',
      why: 'Consultants, creators, and local owners should each see copy that sounds written for them.',
    },
    {
      title: 'Add a fast objection FAQ',
      why: 'Answering price, time, AI quality, and delivery doubts reduces hesitation before checkout.',
    },
    {
      title: 'Add a live waitlist counter',
      why: 'Visible demand makes the scarce sprint slots feel more believable and worth acting on.',
    },
    {
      title: 'Add an upsell thank-you page',
      why: 'Snapshot buyers should immediately see a Sprint credit offer while intent is highest.',
    },
    {
      title: 'Add abandoned-click follow-up',
      why: 'If a buyer clicks checkout but does not buy, the site should generate a follow-up packet for Claude.',
    },
  ];
}

export function getLaunchReadiness() {
  return {
    stage: 'Build and connector readiness',
    blocks: [
      {
        name: 'Subdomain confirmation',
        owner: 'Claude orchestrator',
        status: 'Ask which hostname should route to Codex/ChatGPT sales site.',
      },
      {
        name: 'Payment link',
        owner: 'Codex build packet',
        status: 'Use the on-page setup buttons and safe installer for Polar Checkout Links, Stripe Payment Links, and hosted invoices.',
      },
      {
        name: 'Sprint deposit',
        owner: 'Codex build packet',
        status: 'Connect STRIPE_SPRINT_DEPOSIT_PAYMENT_LINK for the $99 deposit and keep the full balance on Stripe.',
      },
      {
        name: 'Intake form',
        owner: 'Codex build packet',
        status: 'Create one lightweight buyer intake that feeds fulfillment and ledger.',
      },
      {
        name: 'Ledger sync',
        owner: 'Claude orchestrator',
        status: 'Record cash received, product sold, and delivery status for the challenge scoreboard.',
      },
    ],
  };
}

export function buildClaudeDeploymentAsk() {
  return [
    'Claude/orchestrator handoff request:',
    'Confirm whether the Codex/ChatGPT sales site should live at codex.cedogamino.com or chatgtp.cedogamino.com.',
    'After Ciro authorizes the final connector stack, use the setup buttons or PAYMENT_CONNECTOR_PLAN.md to wire the chosen subdomain, Polar Snapshot checkout, Polar Deal Room checkout, Stripe $99 Sprint deposit, Stripe Sprint balance path, intake form, instant Snapshot delivery, and ledger update.',
    'Goal: Ciro should only need to authorize and press go, not manually post, DM, or stitch systems together.',
    '',
    buildPaymentConnectorAsk(),
  ].join('\n');
}
