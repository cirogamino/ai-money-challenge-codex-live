import {
  buildPaymentConnectorAsk,
  getBestPaymentRouteForProduct,
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
    checkoutAction: 'Stripe Payment Link with Polar fallback - STRIPE_SPRINT_DEPOSIT_PAYMENT_LINK or POLAR_SPRINT_DEPOSIT_CHECKOUT_URL',
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
    connector: 'Stripe Payment Link preferred; Polar Checkout Link fallback while Stripe onboarding is blocked',
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
          status: 'in_progress',
          detail:
            'The site now supports Stripe as the preferred route plus a Polar fallback slot that can go live if Stripe remains blocked.',
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
          detail:
            'Polar owns Snapshot and Deal Room. Stripe owns the Sprint deposit and balance, with Polar deposit fallback hidden in ops mode.',
        },
        {
          label: 'Payment link connector packet',
          owner: 'Codex',
          status: 'done',
          detail:
            'Exact public checkout URL slots, setup links, and installer command are defined for Stripe, Polar, and the Polar Sprint fallback.',
        },
        {
          label: 'Live checkout URLs',
          owner: 'Codex and Claude orchestrator',
          status: 'in_progress',
          detail:
            'Polar Snapshot and Deal Room checkout URLs are live. Polar Sprint deposit fallback is ready to create; Stripe Payment Links remain blocked until charges_enabled is true.',
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
          status: 'done',
          detail: 'codex.cirogamino.com is the current public custom-domain route for the Codex sales site.',
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
          label: 'Buyer-first storefront mode',
          owner: 'Codex',
          status: 'done',
          detail: 'Cold buyers see the offer path first; internal progress, payments, and checklists move behind ops mode.',
        },
        {
          label: 'Founder video block',
          owner: 'Codex',
          status: 'queued',
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
    currentPhase: 'Buyer storefront and deposit fallback',
    nextMilestone: 'Create the Polar Sprint deposit fallback, then wire webhook-backed ledger sync when a backend is authorized.',
  };
}

export function getLaunchTimeline() {
  const progress = getProjectProgress();

  return {
    asOf: '2026-07-27',
    title: 'Estimated timeline to a 100% live product',
    currentPace: {
      label: 'Current pace ETA',
      etaDate: '2026-07-28',
      daysRemaining: 1,
      percent: progress.percent,
      summary:
        'At the current build-and-connector pace, the buyer storefront can be cash-ready within about one calendar day if the Polar deposit fallback is created and installed.',
    },
    fastTrack: {
      label: 'Fast-track ETA',
      etaDate: '2026-07-27',
      daysRemaining: 0,
      summary:
        'If the Polar deposit link is created now and pasted into the prepared slot, the public page can start taking Snapshot, Deal Room, and deposit payments today.',
    },
    definitionOfDone: [
      {
        label: 'Payment URLs',
        status: 'in_progress',
        need: 'Two Polar checkout URLs are live; create the Polar Sprint deposit fallback now and install Stripe URLs after onboarding clears.',
      },
      {
        label: 'Subdomain routing',
        status: 'done',
        need: 'codex.cirogamino.com is the current public custom-domain route for Codex.',
      },
      {
        label: 'Buyer intake',
        status: 'done',
        need: 'Static success pages capture Snapshot, Deal Room, and Sprint buyer context.',
      },
      {
        label: 'Instant delivery',
        status: 'in_progress',
        need: 'Snapshot and Sprint packets exist locally; verified webhooks still need a backend before claiming automated delivery.',
      },
      {
        label: 'Ledger reconciliation',
        status: 'queued',
        need: 'Cash received, product sold, processor, delivery status, and date logged for the challenge.',
      },
    ],
    phases: [
      {
        name: 'Buyer storefront split',
        window: 'Done today',
        status: 'done',
        output: 'Buyer mode leads with the offer; ops mode keeps progress, connector, and checklist detail behind ?ops=1.',
      },
      {
        name: 'Polar deposit fallback',
        window: '0.25 day',
        status: 'in_progress',
        output: 'Create one Polar $99 deposit link so the highest-value CTA can collect money before Stripe clears.',
      },
      {
        name: 'Stripe repair',
        window: '0.5 day after onboarding',
        status: 'blocked',
        output: 'Finish Stripe onboarding, then create the preferred deposit link and hosted balance invoice.',
      },
      {
        name: 'Webhook and ledger',
        window: '1 day',
        status: 'queued',
        output: 'Route Polar and Stripe events into verified cash rows, fulfillment status, and challenge reporting.',
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
        title: 'Create the Polar deposit fallback first',
        effect: 'Avoids waiting on Stripe before the highest-value CTA can collect a $99 commitment.',
      },
      {
        title: 'Finish the remaining Stripe URLs',
        effect: 'Cuts one to two days by completing Stripe onboarding once, then creating both Sprint links in the same dashboard pass.',
      },
      {
        title: 'Keep buyer mode clean',
        effect: 'Removes connector language from the cold-visitor path while preserving the full ops board for Ciro and Claude.',
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
    primaryCommand: 'Authorize fallback deposit, then press Go',
    launchReadyPercent: progress.percent,
    status: 'Buyer mode ready, Polar fallback next, Stripe blocked',
    connectors: [
      {
        name: 'Buyer storefront',
        state: 'done',
        owner: 'Codex',
        action: 'Make the public page lead with proof, offer path, guarantee, and checkout buttons instead of ops language.',
      },
      {
        name: 'Subdomain',
        state: 'done',
        owner: 'Claude orchestrator',
        action: 'Use codex.cirogamino.com as the current public Codex sales route.',
      },
      {
        name: 'Payment link',
        state: 'in_progress',
        owner: 'Codex and Claude orchestrator',
        action: 'Polar Snapshot and Deal Room are live; create the Polar Sprint deposit fallback now and Stripe links after onboarding clears.',
      },
      {
        name: 'Polar Sprint fallback',
        state: 'in_progress',
        owner: 'Codex and Claude orchestrator',
        action: 'Create one $99 Polar Checkout Link using the prepared setup spec and install it in POLAR_SPRINT_DEPOSIT_CHECKOUT_URL.',
      },
      {
        name: 'Instant Snapshot delivery',
        state: 'done',
        owner: 'Codex',
        action: 'Use the defined buyer packet and thank-you upsell after the $19 payment.',
      },
      {
        name: 'Buyer intake',
        state: 'done',
        owner: 'Codex',
        action: 'Static success pages collect buyer context and generate fulfillment packet drafts.',
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
    contextLabel: 'Sample buyer outcome',
    headline: 'The launch now has specific sample outcomes for each offer.',
    intro:
      'These panels are realistic samples, not claimed customer results. They make the offer tangible now and can be swapped for real receipts after the first buyers come in.',
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
    updatedAt: '2026-07-27T12:49:15-05:00',
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
          {
            code: 'codex-buyer-storefront-mode',
            label: 'Buyer-first storefront mode',
            status: 'done',
            completedAt: '2026-07-27T12:49:15-05:00',
            detail:
              'Public visitors see the offer, proof, guarantee, FAQ, and buying path first; ops sections are available behind ?ops=1.',
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
            status: 'done',
            completedAt: '2026-07-23T21:26:00-05:00',
            detail:
              'Snapshot product 8e02a470-97db-4c5c-94e2-70dc6d7f0c61 / link f2e428e0-641b-476b-9211-e2d20c3a1062 and Deal Room product 668cf0b1-21b5-45da-a8b4-db9ec8077d2b / link b6cb5225-5476-4c02-a71c-701c31521340 are live on buy.polar.sh.',
          },
          {
            code: 'codex-polar-sprint-deposit-fallback',
            label: 'Polar Sprint deposit fallback',
            status: 'in_progress',
            completedAt: '',
            detail:
              'Create one-time Polar product and Checkout Link for the $99 Sprint deposit; install the public URL into POLAR_SPRINT_DEPOSIT_CHECKOUT_URL.',
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
          {
            code: 'codex-checkout-copy-benefits',
            label: 'Hosted checkout copy and benefits',
            status: 'in_progress',
            completedAt: '',
            detail:
              'Polar setup specs now include checkout-page descriptions and custom benefits for Snapshot, Deal Room, and Sprint deposit.',
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
            status: 'done',
            completedAt: '2026-07-23T21:32:00-05:00',
            detail: 'codex.cirogamino.com is the current public custom-domain route for the Codex sales site.',
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
  const sprintDepositRoute = getBestPaymentRouteForProduct('ai-revenue-sprint');

  return {
    mode: paymentReadiness.mode === 'live' ? 'live' : 'preview',
    isPaymentLive: paymentReadiness.liveCount > 0,
    primaryButtonLabel: sprintDeposit.cta,
    liveLabel: paymentReadiness.statusLabel,
    pendingConnectors: ['Polar Sprint deposit URL', 'Stripe URL', 'verified webhook ledger sync'],
    buyerMessage:
      'Polar checkout is live for the Snapshot and Deal Room. The Sprint deposit has a prepared Polar fallback while Stripe onboarding remains blocked; API keys and webhook secrets stay out of the static site.',
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

export function getBuyerPathCards() {
  return [
    {
      label: 'Fastest live purchase',
      productSlug: 'ai-opportunity-snapshot',
      routeSlug: 'ai-opportunity-snapshot',
      title: 'Start with the $19 Snapshot',
      price: '$19',
      detail: 'Best if you want quick proof before committing to the Sprint. The Snapshot clarifies the offer and credits toward the deposit.',
      riskReducer: 'Low friction, immediate sample-grade output, and a direct upgrade path.',
      cta: 'Buy Snapshot',
    },
    {
      label: 'Best profit path',
      productSlug: 'ai-revenue-sprint',
      routeSlug: 'ai-revenue-sprint-deposit-polar',
      title: 'Reserve a 48-Hour Sprint slot',
      price: '$99 deposit',
      detail: 'Best if you already have a service, audience, or lead flow and want the page, intake, delivery packet, and launch copy built fast.',
      riskReducer: 'Deposit credits toward the $1,500 Sprint after qualification.',
      cta: 'Reserve deposit',
    },
    {
      label: 'Ongoing builder path',
      productSlug: 'ai-deal-room',
      routeSlug: 'ai-deal-room',
      title: 'Join the AI Deal Room',
      price: '$49/mo',
      detail: 'Best if you want weekly teardown notes, reusable templates, and a deal-building rhythm after the first idea is clear.',
      riskReducer: 'Cancel through the customer portal; week-one agenda is visible before checkout.',
      cta: 'Join Deal Room',
    },
  ];
}

export function getBuyerTrustStack() {
  return {
    supportEmail: 'support@cirogamino.com',
    guaranteeTitle: '48-hour delivery boundary',
    guarantee:
      'For a paid Sprint, the deliverable is a working sales-page draft, intake path, fulfillment packet, and launch-copy bundle within the agreed 48-hour build window. If Codex/Ciro misses that delivery window after kickoff materials are provided, the buyer gets one extra build session or a refund review.',
    depositTerms:
      'The $99 Sprint deposit reserves a founder slot and credits toward the $1,500 Sprint. If the buyer is not a fit after qualification, the deposit can be converted into Snapshot/Deal Room credit or reviewed for refund before build work starts.',
    privacy:
      'Buyer context is used to produce the purchased deliverable and internal challenge ledger proof. Payment card details stay inside Stripe or Polar hosted checkout.',
    items: [
      {
        title: 'No vague AI advice',
        detail: 'Every offer ends with a buyer, pain, promise, first paid step, and launch asset.',
      },
      {
        title: 'One processor per buyer path',
        detail: 'Buyers see a single checkout action; backup processor details stay in ops mode.',
      },
      {
        title: 'Payment proof before scoreboard claims',
        detail: 'Static pages collect intake, but cash only counts when Stripe or Polar confirms the event.',
      },
      {
        title: 'Support path visible',
        detail: 'Use support@cirogamino.com for receipt, access, or delivery questions during the challenge.',
      },
    ],
  };
}

export function getDealRoomFirstWeek() {
  return [
    {
      day: 'Day 0',
      title: 'Welcome and buyer map',
      detail: 'Pick one audience, one pain, one offer angle, and one checkout goal before adding new ideas.',
    },
    {
      day: 'Day 1',
      title: 'Offer teardown',
      detail: 'Get the weekly teardown: headline, promise, product ladder, pricing logic, and objections.',
    },
    {
      day: 'Day 3',
      title: 'Template drop',
      detail: 'Use the Snapshot prompt, outreach draft, FAQ skeleton, and delivery-packet checklist.',
    },
    {
      day: 'Day 5',
      title: 'Proof-of-demand scorecard',
      detail: 'Score whether the offer is ready for checkout, needs a warmer audience, or should become a Sprint.',
    },
  ];
}

export function getBuyerFaq() {
  return [
    {
      question: 'Do I need to know how to code?',
      answer: 'No. The Snapshot and Sprint are designed for owners with a real workflow pain, not developers.',
    },
    {
      question: 'What should I bring to the Sprint?',
      answer: 'One business workflow, one target buyer, any existing offer or lead source, and honest constraints on time and budget.',
    },
    {
      question: 'What happens after I pay?',
      answer: 'You land on a product-specific intake page, generate the delivery packet, and get routed into Snapshot delivery, Deal Room access, or Sprint qualification.',
    },
    {
      question: 'Is the $99 deposit the full Sprint price?',
      answer: 'No. It reserves and qualifies a Sprint slot, then credits toward the $1,500 total if the build proceeds.',
    },
    {
      question: 'Why only 3 Sprint slots?',
      answer: 'The challenge ends August 3, and a 48-hour build requires focused execution. Scarcity is based on capacity, not a fake countdown.',
    },
    {
      question: 'Can I cancel the membership?',
      answer: 'Yes. The Deal Room is recurring, and hosted customer-portal access should handle receipts, card updates, and cancellation.',
    },
  ];
}

export function getHostedCheckoutCopyPlan() {
  return [
    {
      routeSlug: 'ai-opportunity-snapshot',
      title: 'AI Opportunity Snapshot checkout copy',
      copy:
        'A 15-minute AI opportunity report for one leaky workflow: score, buyer promise, first launch message, and $19 Sprint credit.',
      benefit: 'Attach a file download or custom benefit with Snapshot delivery instructions.',
    },
    {
      routeSlug: 'ai-deal-room',
      title: 'AI Deal Room checkout copy',
      copy:
        'Weekly offer teardowns, prompt/page templates, and a proof-of-demand scorecard for builders turning AI ideas into receipts.',
      benefit: 'Attach a custom benefit with the member welcome link, first-week agenda, and customer portal instructions.',
    },
    {
      routeSlug: 'ai-revenue-sprint-deposit-polar',
      title: 'Polar Sprint deposit fallback copy',
      copy:
        'Reserve one of 3 founder Sprint slots before August 3. The $99 deposit credits toward the $1,500 48-Hour AI Revenue Sprint after qualification.',
      benefit: 'Attach a custom benefit with Sprint intake, support email, and deposit-credit terms.',
    },
  ];
}

export function getExecutiveAssistantQueue() {
  return {
    title: 'Ciro fast-answer queue',
    summary:
      'Codex keeps building with safe defaults, but these answers make the launch sharper when Ciro or Claude has a minute.',
    questions: [
      {
        question: 'Which buyer wedge should the first public push lead with?',
        defaultAnswer: 'Local service owners with missed quote or follow-up leaks.',
        moneyImpact: 'Sharper copy and outreach, fewer broad-AI objections.',
      },
      {
        question: 'What support identity should buyers see?',
        defaultAnswer: 'support@cirogamino.com and Codex Revenue Lab.',
        moneyImpact: 'Higher checkout trust and fewer refund/support surprises.',
      },
      {
        question: 'What refund boundary feels right?',
        defaultAnswer: 'Delivery-window guarantee plus deposit review before build work starts.',
        moneyImpact: 'Reduces purchase fear without promising impossible revenue outcomes.',
      },
      {
        question: 'Can we use a short founder video from Ciro?',
        defaultAnswer: 'Use the prepared script until a real video is recorded.',
        moneyImpact: 'A human face can raise trust faster than another paragraph of copy.',
      },
      {
        question: 'Who should get the first private test link?',
        defaultAnswer: 'One warm business owner with a real lead-follow-up or intake pain.',
        moneyImpact: 'Fastest route to a real receipt and first testimonial candidate.',
      },
    ],
  };
}

export function getTargetNiches() {
  return [
    {
      name: 'Local Service Owners',
      pain: 'Warm quotes, intake forms, and follow-up texts leak money because no one owns the next best action fast enough.',
      sprintAngle: 'Turn one intake, follow-up, quote, or customer education workflow into a simple revenue-ready AI offer.',
    },
    {
      name: 'Consultants',
      pain: 'They know their expertise is valuable, but their offer still looks like hourly advice.',
      sprintAngle: 'Package one repeatable client problem into a paid AI-assisted diagnostic or implementation sprint.',
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
    { title: 'Buyer-first storefront default', status: 'built into this version' },
    { title: 'Ops console hidden behind ?ops=1', status: 'built into this version' },
    { title: 'Polar Sprint deposit fallback slot', status: 'built into this version' },
    { title: 'Hosted checkout copy and benefits plan', status: 'built into this version' },
    { title: 'Webhook-verification warning before cash claims', status: 'built into this version' },
    { title: 'Deal Room first-week agenda', status: 'built into this version' },
    { title: 'Local-service follow-up wedge', status: 'built into this version' },
    { title: 'Refund and deposit boundary', status: 'built into this version' },
    { title: 'Collapsed buyer checkout path', status: 'built into this version' },
    { title: 'August 3 capacity urgency', status: 'built into this version' },
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
        owner: 'Codex and Claude orchestrator',
        status: 'Use codex.cirogamino.com as the current public custom-domain route.',
      },
      {
        name: 'Payment link',
        owner: 'Codex build packet',
        status:
          'Polar Snapshot and Deal Room links are live; Polar Sprint fallback and Stripe deposit/balance links are the remaining checkout work.',
      },
      {
        name: 'Polar Sprint fallback',
        owner: 'Codex build packet',
        status: 'Create one $99 Polar Checkout Link and install POLAR_SPRINT_DEPOSIT_CHECKOUT_URL while Stripe remains blocked.',
      },
      {
        name: 'Stripe repair',
        owner: 'Codex build packet',
        status: 'Connect STRIPE_SPRINT_DEPOSIT_PAYMENT_LINK and STRIPE_SPRINT_BALANCE_PAYMENT_LINK after Stripe onboarding enables payments.',
      },
      {
        name: 'Intake form',
        owner: 'Codex',
        status: 'Static buyer intake pages exist for hosted checkout redirects and generate fulfillment packet drafts.',
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
    'Use codex.cirogamino.com as the current Codex/ChatGPT public sales route unless Ciro explicitly changes the hostname.',
    'The public page now defaults to buyer mode; append ?ops=1 to review the internal progress, payment, checklist, and connector boards.',
    'After Ciro authorizes the final connector stack, use the setup buttons or PAYMENT_CONNECTOR_PLAN.md to wire the Polar Sprint deposit fallback, Stripe $99 Sprint deposit, Stripe Sprint balance path, verified webhook ledger update, and any upgraded hosted checkout benefits.',
    'Goal: Ciro should only need to authorize and press go, not manually post, DM, or stitch systems together.',
    '',
    buildPaymentConnectorAsk(),
  ].join('\n');
}
