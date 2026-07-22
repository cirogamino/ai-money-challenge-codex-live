const DEFAULT_INPUT = {
  businessType: 'AI services consultant',
  audience: 'busy small business owners',
  bottleneck: 'manual work that slows sales follow-up',
  monthlyRevenue: 10000,
  offerPrice: 19,
};

const OPPORTUNITY_TEMPLATES = [
  {
    title: 'AI candidate screening triage',
    keywords: ['candidate', 'screen', 'screening', 'recruit', 'hiring', 'resume'],
    impact: 0.07,
    ease: 9,
    firstStep: 'Collect the last 20 candidate profiles, tag pass/fail reasons, and turn the pattern into a reusable screening rubric.',
  },
  {
    title: 'AI follow-up rescue sequence',
    keywords: ['follow', 'follow-up', 'slow', 'lead', 'sales', 'reply', 'inbox'],
    impact: 0.06,
    ease: 10,
    firstStep: 'Export five recent conversations, identify the moment each lead stalled, and draft three reply templates.',
  },
  {
    title: 'AI intake-to-brief converter',
    keywords: ['intake', 'manual', 'brief', 'onboarding', 'form', 'client'],
    impact: 0.05,
    ease: 8,
    firstStep: 'Turn the current intake questions into a structured brief template with required fields and missing-info prompts.',
  },
  {
    title: 'AI proposal and scope drafter',
    keywords: ['proposal', 'quote', 'scope', 'estimate', 'sales', 'founder'],
    impact: 0.08,
    ease: 7,
    firstStep: 'Paste two won proposals and two lost proposals into a comparison grid, then extract the winning language.',
  },
  {
    title: 'AI quality-control checklist',
    keywords: ['quality', 'review', 'ops', 'delivery', 'manual', 'error'],
    impact: 0.04,
    ease: 8,
    firstStep: 'List the five most expensive mistakes from the last month and convert them into a pre-delivery review checklist.',
  },
  {
    title: 'AI customer-question answer bank',
    keywords: ['support', 'faq', 'question', 'customer', 'email', 'inbox'],
    impact: 0.04,
    ease: 9,
    firstStep: 'Pull the ten most common buyer questions and write approved answers with proof points and escalation rules.',
  },
];

function cleanText(value, fallback) {
  return String(value || fallback).trim().replace(/\s+/g, ' ');
}

function normalizeInput(input = {}) {
  const merged = { ...DEFAULT_INPUT, ...input };
  return {
    businessType: cleanText(merged.businessType, DEFAULT_INPUT.businessType),
    audience: cleanText(merged.audience, DEFAULT_INPUT.audience),
    bottleneck: cleanText(merged.bottleneck, DEFAULT_INPUT.bottleneck),
    monthlyRevenue: Math.max(1000, Number(merged.monthlyRevenue) || DEFAULT_INPUT.monthlyRevenue),
    offerPrice: Math.max(1, Number(merged.offerPrice) || DEFAULT_INPUT.offerPrice),
  };
}

function pluralizeBusiness(type) {
  const trimmed = type.trim();
  const lower = trimmed.toLowerCase();
  if (lower.endsWith('agency')) return `${trimmed.slice(0, -1)}ies`;
  if (/(ch|sh|s|x|z)$/i.test(trimmed)) return `${trimmed}es`;
  if (/[^aeiou]y$/i.test(trimmed)) return `${trimmed.slice(0, -1)}ies`;
  if (lower.endsWith('s')) return trimmed;
  return `${trimmed}s`;
}

function keywordScore(template, bottleneck, businessType, audience) {
  const haystack = `${bottleneck} ${businessType} ${audience}`.toLowerCase();
  return template.keywords.reduce((total, keyword) => total + (haystack.includes(keyword) ? 12 : 0), 0);
}

function moneyRound(value) {
  return Math.round(value / 25) * 25;
}

function buildOpportunity(template, input) {
  const relevance = keywordScore(template, input.bottleneck, input.businessType, input.audience);
  const monthlyValueUsd = Math.max(250, moneyRound(input.monthlyRevenue * template.impact));
  const score = Math.round(relevance + template.ease * 6 + Math.min(30, monthlyValueUsd / 100));
  const dailyValue = monthlyValueUsd / 30;
  const paybackDays = Math.max(1, Math.min(30, Math.ceil(input.offerPrice / dailyValue)));

  return {
    title: template.title,
    score,
    monthlyValueUsd,
    paybackDays,
    firstStep: template.firstStep,
    buyerPromise: `Reduce ${input.bottleneck.toLowerCase()} for ${input.audience.toLowerCase()} without replacing the current workflow.`,
  };
}

function buildExecutionPlan(input) {
  return [
    `Day 1: Publish the $${input.offerPrice} audit checkout and send 10 warm, permission-based messages.`,
    'Day 2: Deliver first audits manually using this demo output and capture objections.',
    'Day 3: Turn the strongest audit into a before/after case note.',
    'Day 4: Invite buyers into the recurring deal room with one implementation template.',
    'Day 5: Run a live teardown session for members and record the workflow.',
    'Day 6: Offer the high-ticket sprint to buyers with urgent implementation pain.',
    'Day 7: Package proof, testimonials, and exact steps into the public trail.',
  ];
}

function buildSalesAssets(input, opportunities) {
  const top = opportunities[0];
  return {
    checkoutCopy: `$${input.offerPrice} AI Opportunity Snapshot: get the top five automation plays, estimated monthly value, payback timing, and first action for your ${input.businessType}.`,
    outreachMessage: `Quick idea for ${input.audience}: I built a $${input.offerPrice} AI audit that spots where ${input.bottleneck.toLowerCase()} is costing time or revenue. Want me to run your workflow through it and send the top opportunity?`,
    upsellHook: `If ${top.title.toLowerCase()} is worth roughly $${top.monthlyValueUsd.toLocaleString()} per month, the next step is a paid implementation sprint.`,
  };
}

export function generateAudit(rawInput = {}) {
  const input = normalizeInput(rawInput);
  const opportunities = OPPORTUNITY_TEMPLATES
    .map((template) => buildOpportunity(template, input))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return {
    positioning: {
      oneLine: `AI automation audit for ${pluralizeBusiness(input.businessType)}`,
      targetBuyer: input.audience,
    },
    summary: `This snapshot prioritizes AI opportunities around ${input.bottleneck.toLowerCase()} and turns them into a sellable first-dollar audit.`,
    opportunities,
    salesAssets: buildSalesAssets(input, opportunities),
    executionPlan: buildExecutionPlan(input),
  };
}
