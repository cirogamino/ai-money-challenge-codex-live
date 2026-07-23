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
      'A paid 15-minute diagnostic that turns one messy workflow into a scored AI opportunity, buyer promise, and next checkout step.',
    primaryOutcome: 'Find the first sellable AI offer without burning days in research or guesswork.',
    audience: 'Owners with one leaky workflow: missed quotes, slow follow-up, messy intake, or stale lead lists.',
    speedToDollar: 'Fastest path: buy the Snapshot, get the sample-grade report, then upgrade the best opportunity into a Sprint.',
    profitPotential: '30-day role: entry product, proof builder, and low-friction feeder for the Sprint.',
    includes: [
      'One-page opportunity score',
      'Offer ladder recommendation',
      'Buyer pain map',
      'Launch copy starter pack',
    ],
    cta: 'Buy $19 Snapshot',
    checkoutAction: 'Polar Checkout Link - POLAR_SNAPSHOT_CHECKOUT_URL',
  },
  {
    slug: 'ai-deal-room',
    type: 'Recurring membership',
    title: 'AI Deal Room',
    price: '$49/mo',
    promise: 'A weekly build room with offer templates, teardown notes, and launch checklists for people turning AI ideas into receipts.',
    primaryOutcome: 'Keep shipping one small AI offer every week with reusable templates and a visible deal pipeline.',
    audience: 'Builders who want a repeatable launch rhythm instead of another folder full of unused prompts.',
    speedToDollar: 'Fastest path: convert Snapshot buyers who want weekly help implementing.',
    profitPotential: '30-day role: recurring base that compounds after the first sales push.',
    includes: [
      'Weekly offer teardown',
      'Prompt and page templates',
      'Proof-of-demand checklist',
      'Member-only launch console',
    ],
    cta: 'Join Deal Room',
    checkoutAction: 'Polar recurring Checkout Link - POLAR_DEAL_ROOM_CHECKOUT_URL',
  },
  {
    slug: 'ai-revenue-sprint',
    type: 'High-ticket offer',
    title: '48-Hour AI Revenue Sprint',
    price: '$1,500',
    promise:
      'A focused 48-hour build sprint that turns one business workflow into a sellable AI-assisted offer system.',
    primaryOutcome: 'Leave with a sales page, intake flow, delivery packet, checkout plan, and launch sequence ready for authorization.',
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
      'The buyer pays, enters one business workflow, and immediately receives a compact action packet that can upsell into the Sprint.',
    outputs: [
      'AI opportunity score',
      'Revenue leak snapshot',
      'Buyer promise draft',
      'Checkout-ready offer ladder',
      'First outreach message',
      'Sprint upsell credit',
    ],
    steps: [
      'Payment confirms the $19 Snapshot purchase.',
      'Buyer enters one workflow, audience, bottleneck, and current offer context.',
      'Snapshot engine returns score, revenue leak, product ladder, and first launch copy.',
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
          detail:
            'Stripe live product and price exist, but Stripe Payment Link is blocked until charges_enabled is true. Polar URLs still need a Polar connector or dashboard link export.',
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
          owner: 'Codex',
          status: 'done',
          detail: 'Static success pages now collect buyer context after payment redirects for all four checkout routes.',
        },
        {
          label: 'Challenge ledger sync',
          owner: 'Codex and Claude orchestrator',
          status: 'in_progress',
          detail: 'Success pages generate local ledger JSON rows; shared ledger/webhook sync still needs the live connector target.',
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

export function getLaunchTimeline() {
  const progress = getProjectProgress();

  return {
    asOf: '2026-07-23',
    title: 'Estimated timeline to a 100% live product',
    currentPace: {
      label: 'Current pace ETA',
      etaDate: '2026-07-27',
      daysRemaining: 4,
      percent: progress.percent,
      summary:
        'At the current build-and-connector pace, the full sellable system should be ready in about four calendar days once each connector is handled in sequence.',
    },
    fastTrack: {
      label: 'Fast-track ETA',
      etaDate: '2026-07-24',
      daysRemaining: 1,
      summary:
        'If payment URLs, subdomain choice, intake destination, ledger access, and webhook target are bundled into one approval block, the same system can compress into roughly one day.',
    },
    definitionOfDone: [
      {
        label: 'Payment URLs',
        status: 'blocked',
        need: 'Four public Stripe and Polar checkout URLs installed into the prepared slots.',
      },
      {
        label: 'Subdomain routing',
        status: 'blocked',
        need: 'Final hostname confirmed and pointed at the public sales site.',
      },
      {
        label: 'Buyer intake',
        status: 'queued',
        need: 'One intake form that captures Snapshot, Deal Room, and Sprint buyer context.',
      },
      {
        label: 'Instant delivery',
        status: 'queued',
        need: 'Snapshot output and Sprint next-step packet triggered after payment.',
      },
      {
        label: 'Ledger reconciliation',
        status: 'queued',
        need: 'Cash received, product sold, processor, delivery status, and date logged for the challenge.',
      },
    ],
    phases: [
      {
        name: 'Payment activation',
        window: '0.5 day',
        status: 'blocked',
        output: 'Create the four hosted checkout URLs and run the safe installer.',
      },
      {
        name: 'Subdomain cutover',
        window: '0.5 day',
        status: 'blocked',
        output: 'Choose codex.cedogamino.com or chatgtp.cedogamino.com and point it at the live site.',
      },
      {
        name: 'Intake and delivery',
        window: '1 day',
        status: 'queued',
        output: 'Connect the buyer form to Snapshot delivery and Sprint qualification.',
      },
      {
        name: 'Webhook and ledger',
        window: '1 day',
        status: 'queued',
        output: 'Route Stripe and Polar events into the shared cash ledger and delivery status.',
      },
      {
        name: 'Final live smoke test',
        window: '1 day',
        status: 'queued',
        output: 'Test every paid route, success path, intake packet, and reporting view before marketing.',
      },
    ],
    speedUps: [
      {
        title: 'Batch the checkout URLs',
        effect: 'Cuts one to two days by creating all Stripe and Polar links in one dashboard pass instead of one product at a time.',
      },
      {
        title: 'Pick one hostname now',
        effect: 'Removes the subdomain branch from the work and lets the live URL, success URLs, and checkout copy settle.',
      },
      {
        title: 'Use one intake destination',
        effect: 'Avoids building separate forms for each product; one smart intake can route Snapshot, Deal Room, and Sprint buyers.',
      },
      {
        title: 'Start with hosted checkout webhooks only',
        effect: 'Keeps the first automation narrow: paid event in, delivery and ledger packet out, no custom checkout rebuild yet.',
      },
      {
        title: 'Do one paid penny test',
        effect: 'A single end-to-end test exposes payment, redirect, delivery, and ledger problems faster than isolated checks.',
      },
    ],
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

export function getLaunchPreviewDeck() {
  return {
    contextLabel: 'Founder preview samples',
    headline: 'The launch now has believable sample artifacts for each offer.',
    intro:
      'These panels are realistic founder-preview samples, not claimed customer results. They make the site feel launch-ready today and can be swapped for real receipts after the first buyers come in.',
    productMockups: [
      {
        product: 'AI Opportunity Snapshot',
        price: '$19',
        sampleBusiness: 'NorthStar Roof Care',
        artifactTitle: 'Quote Rescue Snapshot',
        badge: '84/100 opportunity score',
        buyerPromise: 'Recover missed estimate follow-up without hiring a coordinator.',
        visualLines: [
          'Leak found: 17 warm quote requests with no 48-hour follow-up',
          'First offer: $19 quote-rescue workflow map',
          'Upsell: $99 Sprint deposit credited from Snapshot purchase',
        ],
      },
      {
        product: 'AI Deal Room',
        price: '$49/mo',
        sampleBusiness: 'BrightPath Admissions',
        artifactTitle: 'Weekly Deal Board',
        badge: '4 launch assets queued',
        buyerPromise: 'Turn one stalled service idea per week into a sellable mini-offer.',
        visualLines: [
          'Monday: offer teardown',
          'Wednesday: checkout copy and objection bank',
          'Friday: proof-of-demand scorecard',
        ],
      },
      {
        product: '48-Hour AI Revenue Sprint',
        price: '$1,500',
        sampleBusiness: 'Harbor Dental Implants',
        artifactTitle: 'Patient Lead Rescue Sprint',
        badge: '$99 deposit path',
        buyerPromise: 'Ship a page, intake, follow-up sequence, and delivery packet in one weekend.',
        visualLines: [
          'Day 1: buyer promise, intake, page, checkout',
          'Day 2: fulfillment packet, launch copy, ledger routing',
          'After: 7-day follow-up sequence and Deal Room handoff',
        ],
      },
    ],
    fulfillmentPreview: [
      {
        title: 'Checkout receipt',
        status: 'Ready after URL install',
        detail: 'Buyer sees one processor, one price, and one next step. No split-payment confusion on the first launch.',
      },
      {
        title: 'Smart intake',
        status: 'One form planned',
        detail: 'The same intake captures workflow, buyer, bottleneck, revenue value, and urgency for every offer.',
      },
      {
        title: 'Delivery packet',
        status: 'Sample structure built',
        detail: 'Snapshot buyers receive score, leak, offer ladder, launch copy, and Sprint credit immediately after payment.',
      },
      {
        title: 'Ledger row',
        status: 'Connector next',
        detail: 'Every paid route maps to product, processor, amount, date, delivery status, and challenge scoreboard proof.',
      },
    ],
    proofCards: [
      {
        label: 'Sample buyer situation',
        title: 'NorthStar Roof Care has quote requests slipping through follow-up gaps.',
        detail: 'The Snapshot turns that one pain into a Quote Rescue offer and a clear Sprint upgrade path.',
      },
      {
        label: 'Sample delivery promise',
        title: 'The buyer leaves with one paid promise and a first message to send.',
        detail: 'No vague AI advice: every sample output ends with a buyer, pain, offer, price, and next action.',
      },
      {
        label: 'Sample Sprint finish line',
        title: 'A weekend build should end with a page, intake, checkout, delivery packet, and launch copy.',
        detail: 'This gives the high-ticket offer a visible finish line before the first real case study exists.',
      },
    ],
    speedToLaunch: [
      {
        title: 'Replace samples with receipts',
        detail: 'After the first sale, swap the founder-preview cards for real buyer screenshots, delivery timestamps, and ledger proof.',
      },
      {
        title: 'Record one founder video',
        detail: 'Use the finished script on the page: who it is for, what gets delivered, why three Sprint slots exist, and what happens after payment.',
      },
      {
        title: 'Keep sample labels honest',
        detail: 'The mockups should feel polished, but labels stay clear so the launch builds trust instead of pretending to have results it does not have yet.',
      },
    ],
  };
}

export function getProductVisualSuite() {
  return {
    imageSrc: './assets/codex-product-suite.png',
    alt:
      'Premium product suite showing AI Opportunity Snapshot, AI Deal Room, and the 48-Hour AI Revenue Sprint command console.',
    headline: 'The product ladder now looks like something worth buying.',
    highTicketNote:
      'The $1,500 Sprint is framed as an executive command console with checkout, intake, delivery packet, and revenue ledger modules.',
    callouts: [
      {
        label: 'Tripwire clarity',
        detail: '$19 Snapshot looks like a tangible diagnostic report, not a vague AI prompt pack.',
      },
      {
        label: 'Recurring value',
        detail: '$49/mo Deal Room is presented as a weekly deal-flow dashboard with templates and member rhythm.',
      },
      {
        label: 'High-ticket finish line',
        detail: '$1,500 Sprint has the premium command-center feel the price needs to earn trust.',
      },
    ],
  };
}

export function getMasterLaunchChecklist() {
  return {
    updatedAt: '2026-07-23T01:55:00-05:00',
    title: 'Codex launch master checklist',
    summary:
      'A timestamped, cross-agent checklist for making the Codex offer live, sellable, and duplicatable by every competing AI.',
    phases: [
      {
        name: 'Offer and proof surface',
        items: [
          {
            code: 'codex-product-ladder',
            label: 'Three-product ladder finished',
            status: 'done',
            completedAt: '2026-07-23T00:18:00-05:00',
            detail: '$19 Snapshot, $49/mo Deal Room, and $1,500 Sprint are visible and internally consistent.',
          },
          {
            code: 'codex-product-visual-suite',
            label: 'Premium product-suite image created',
            status: 'done',
            completedAt: '2026-07-23T20:50:00-05:00',
            detail: 'Generated visual asset makes the tripwire, membership, and high-ticket Sprint feel tangible.',
          },
          {
            code: 'codex-founder-preview-artifacts',
            label: 'Founder-preview proof cards finished',
            status: 'done',
            completedAt: '2026-07-23T00:42:00-05:00',
            detail: 'NorthStar, BrightPath, and Harbor sample artifacts replace generic claims.',
          },
        ],
      },
      {
        name: 'Checkout architecture',
        items: [
          {
            code: 'cross-ai-payment-standard',
            label: 'Shared payment architecture guide created',
            status: 'done',
            completedAt: '2026-07-23T20:56:00-05:00',
            detail: 'All AIs should use the same Stripe/Polar metadata, operator code, variant code, success URL, and ledger schema.',
          },
          {
            code: 'codex-stripe-live-product-price',
            label: 'Stripe live product and price created',
            status: 'done',
            completedAt: '2026-07-23T20:54:00-05:00',
            detail:
              'Stripe deposit product prod_Uw3y9rTAJ6C0bW / price price_1TwBqNLPpHpxUHTGTATb5NBd and balance product prod_Uw42Rrw93JcovO / price price_1TwBuULPpHpxUHTGfG0lJDl8 exist.',
          },
          {
            code: 'codex-stripe-payment-link',
            label: 'Stripe Payment Link creation',
            status: 'blocked',
            completedAt: '',
            detail:
              'Stripe rejected Payment Link creation because charges_enabled=false and card_payments is inactive; account onboarding requirements must be finished in Dashboard.',
          },
          {
            code: 'codex-polar-checkout-links',
            label: 'Polar Checkout Links',
            status: 'blocked',
            completedAt: '',
            detail: 'No Polar connector or POLAR token is available in this environment; Claude needs to provide URLs or enable a Polar tool.',
          },
        ],
      },
      {
        name: 'Post-payment path',
        items: [
          {
            code: 'codex-success-routes',
            label: 'Four hosted-checkout success pages',
            status: 'done',
            completedAt: '2026-07-23T20:45:00-05:00',
            detail: 'Snapshot, Deal Room, Sprint deposit, and Sprint balance redirects now land on static intake pages.',
          },
          {
            code: 'codex-intake-packet-generator',
            label: 'Buyer intake and fulfillment packet',
            status: 'done',
            completedAt: '2026-07-23T20:45:00-05:00',
            detail: 'Success pages generate copy-ready delivery briefs from buyer intake.',
          },
          {
            code: 'codex-ledger-json',
            label: 'Local ledger JSON row',
            status: 'done',
            completedAt: '2026-07-23T20:45:00-05:00',
            detail: 'Each paid route can generate a ledger row while cash status stays pending processor verification.',
          },
          {
            code: 'codex-webhook-ledger-sync',
            label: 'Verified webhook ledger sync',
            status: 'blocked',
            completedAt: '',
            detail: 'Needs an authorized backend or automation target plus Stripe/Polar webhook signatures before cash can be claimed automatically.',
          },
        ],
      },
      {
        name: 'Launch routing',
        items: [
          {
            code: 'codex-github-pages-live',
            label: 'GitHub Pages live mirror',
            status: 'done',
            completedAt: '2026-07-23T00:53:00-05:00',
            detail: 'Public live mirror exists for real-environment testing.',
          },
          {
            code: 'codex-custom-subdomain',
            label: 'Custom subdomain routing',
            status: 'blocked',
            completedAt: '',
            detail: 'Claude still needs to confirm codex.cedogamino.com or chatgtp.cedogamino.com and route DNS/hosting.',
          },
        ],
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
    headline: 'Turn one leaky workflow into a sellable AI offer in 48 hours.',
    supportingCopy:
      'The fastest path to the 30-day scoreboard is one premium buyer with a real workflow pain. The $19 Snapshot proves the opportunity, the $49 Deal Room keeps momentum, and the Sprint turns the best workflow into a launch-ready offer system.',
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
    before: 'Warm roofing quote requests scattered across calls, texts, and inboxes with no reliable follow-up owner.',
    after: 'Quote Rescue Snapshot: one buyer, one revenue leak, one $19 diagnostic, and a $99 Sprint deposit path.',
    demoInput: 'NorthStar Roof Care is losing estimates after busy storm weeks and needs a follow-up workflow.',
    demoOutput: 'Score the quote leak, write the rescue promise, map the first automation, then route to Snapshot or Sprint.',
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
