import { generateAudit } from './lib/opportunityEngine.mjs?v=20260707-launch-console';
import { generateLaunchPlan } from './lib/launchPlan.mjs?v=20260707-launch-console';
import { copyText } from './lib/clipboard.mjs?v=20260707-launch-console';

const presets = {
  agency: {
    businessType: 'boutique recruiting agency',
    audience: 'founders hiring their first sales team',
    bottleneck: 'manual candidate screening and slow follow-up',
    monthlyRevenue: 24000,
    offerPrice: 19,
  },
  coach: {
    businessType: 'AI adoption coach',
    audience: 'solo founders overwhelmed by tool choices',
    bottleneck: 'proposal writing and stalled sales conversations',
    monthlyRevenue: 18000,
    offerPrice: 29,
  },
  clinic: {
    businessType: 'cash-pay wellness clinic',
    audience: 'clinic owners losing leads after consult requests',
    bottleneck: 'slow lead follow-up and repeated customer questions',
    monthlyRevenue: 42000,
    offerPrice: 39,
  },
};

const form = document.querySelector('#audit-form');
const fields = {
  businessType: document.querySelector('#businessType'),
  audience: document.querySelector('#audience'),
  bottleneck: document.querySelector('#bottleneck'),
  monthlyRevenue: document.querySelector('#monthlyRevenue'),
  offerPrice: document.querySelector('#offerPrice'),
};

const output = {
  oneLine: document.querySelector('#oneLine'),
  summary: document.querySelector('#summary'),
  topValue: document.querySelector('#topValue'),
  paybackDays: document.querySelector('#paybackDays'),
  topScore: document.querySelector('#topScore'),
  mapLabel: document.querySelector('#mapLabel'),
  map: document.querySelector('#map'),
  opportunityList: document.querySelector('#opportunityList'),
  checkoutCopy: document.querySelector('#checkoutCopy'),
  outreachMessage: document.querySelector('#outreachMessage'),
  upsellHook: document.querySelector('#upsellHook'),
  executionPlan: document.querySelector('#executionPlan'),
  copyAssets: document.querySelector('#copyAssets'),
  launchStage: document.querySelector('#launchStage'),
  humanActionPolicy: document.querySelector('#humanActionPolicy'),
  goButtonLabel: document.querySelector('#goButtonLabel'),
  connectorList: document.querySelector('#connectorList'),
  claudePacketTitle: document.querySelector('#claudePacketTitle'),
  claudePacketBody: document.querySelector('#claudePacketBody'),
  copyClaudePacket: document.querySelector('#copyClaudePacket'),
};

let latestAudit = null;
let latestLaunchPlan = generateLaunchPlan();

function formData() {
  return {
    businessType: fields.businessType.value,
    audience: fields.audience.value,
    bottleneck: fields.bottleneck.value,
    monthlyRevenue: Number(fields.monthlyRevenue.value),
    offerPrice: Number(fields.offerPrice.value),
  };
}

function fillForm(values) {
  Object.entries(values).forEach(([key, value]) => {
    fields[key].value = value;
  });
}

function money(value) {
  return `$${Math.round(value).toLocaleString()}`;
}

function renderMap(opportunities) {
  output.map.innerHTML = '';
  opportunities.forEach((item, index) => {
    const dot = document.createElement('span');
    dot.className = 'map-dot';
    dot.style.left = `${14 + index * 17}%`;
    dot.style.bottom = `${Math.min(86, Math.max(16, item.score))}%`;
    dot.style.setProperty('--dot-size', `${Math.max(34, Math.min(58, item.monthlyValueUsd / 25))}px`);
    dot.textContent = index + 1;
    dot.title = `${item.title}: ${money(item.monthlyValueUsd)} per month`;
    output.map.append(dot);
  });
}

function renderOpportunities(opportunities) {
  output.opportunityList.innerHTML = '';
  opportunities.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'opportunity-card';
    card.innerHTML = `
      <div class="rank">${index + 1}</div>
      <div class="opportunity-body">
        <div class="card-title-row">
          <h3>${item.title}</h3>
          <span>${item.score}</span>
        </div>
        <div class="score-track" aria-hidden="true">
          <span style="width: ${Math.min(100, item.score)}%"></span>
        </div>
        <p>${item.buyerPromise}</p>
        <dl>
          <div><dt>Monthly value</dt><dd>${money(item.monthlyValueUsd)}</dd></div>
          <div><dt>Payback</dt><dd>${item.paybackDays} days</dd></div>
        </dl>
        <p class="first-step">${item.firstStep}</p>
      </div>
    `;
    output.opportunityList.append(card);
  });
}

function renderPlan(plan) {
  output.executionPlan.innerHTML = '';
  plan.forEach((step) => {
    const item = document.createElement('li');
    item.textContent = step.replace(/^Day \d: /, '');
    output.executionPlan.append(item);
  });
}

function renderLaunchPlan(plan) {
  latestLaunchPlan = plan;
  output.launchStage.textContent = plan.stage;
  output.humanActionPolicy.textContent = plan.humanActionPolicy.route;
  output.goButtonLabel.textContent = plan.goLiveReadiness.goButtonLabel;
  output.claudePacketTitle.textContent = plan.claudePacket.title;
  output.claudePacketBody.textContent = plan.claudePacket.body;
  output.connectorList.innerHTML = '';

  plan.connectors.forEach((connector) => {
    const item = document.createElement('article');
    item.className = `connector-card ${connector.status}`;
    item.innerHTML = `
      <div class="connector-head">
        <h4>${connector.name}</h4>
        <span>${connector.status.replace('-', ' ')}</span>
      </div>
      <p>${connector.recommended}</p>
      <small>${connector.purpose}</small>
      <em>${connector.authorizationNeeded}</em>
    `;
    output.connectorList.append(item);
  });
}

function renderAudit(audit) {
  latestAudit = audit;
  const [top] = audit.opportunities;
  output.oneLine.textContent = audit.positioning.oneLine;
  output.summary.textContent = audit.summary;
  output.topValue.textContent = money(top.monthlyValueUsd);
  output.paybackDays.textContent = `${top.paybackDays}d`;
  output.topScore.textContent = top.score;
  output.mapLabel.textContent = audit.positioning.targetBuyer;
  output.checkoutCopy.textContent = audit.salesAssets.checkoutCopy;
  output.outreachMessage.textContent = audit.salesAssets.outreachMessage;
  output.upsellHook.textContent = audit.salesAssets.upsellHook;
  renderMap(audit.opportunities);
  renderOpportunities(audit.opportunities);
  renderPlan(audit.executionPlan);
  renderLaunchPlan(generateLaunchPlan({
    productName: 'AI Opportunity Snapshot',
    priceUsd: Number(fields.offerPrice.value),
  }));
}

async function copySalesAssets() {
  if (!latestAudit) return;
  const text = [
    `Checkout copy: ${latestAudit.salesAssets.checkoutCopy}`,
    `Outreach message: ${latestAudit.salesAssets.outreachMessage}`,
    `Upsell hook: ${latestAudit.salesAssets.upsellHook}`,
  ].join('\n\n');

  const copied = await copyText(text, window);
  output.copyAssets.classList.toggle('copied', copied);
  output.copyAssets.setAttribute('aria-label', copied ? 'Sales assets copied' : 'Copy sales assets');
  window.setTimeout(() => {
    output.copyAssets.classList.remove('copied');
    output.copyAssets.setAttribute('aria-label', 'Copy sales assets');
  }, 900);
}

async function copyClaudePacket() {
  const text = `${latestLaunchPlan.claudePacket.title}\n\n${latestLaunchPlan.claudePacket.body}`;
  const copied = await copyText(text, window);
  output.copyClaudePacket.classList.toggle('copied', copied);
  if (!copied) {
    const range = document.createRange();
    range.selectNodeContents(output.claudePacketBody);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    output.claudePacketBody.focus();
  }
  output.copyClaudePacket.setAttribute('aria-label', copied ? 'Claude packet copied' : 'Claude packet selected');
  window.setTimeout(() => {
    output.copyClaudePacket.classList.remove('copied');
    output.copyClaudePacket.setAttribute('aria-label', 'Copy Claude packet');
  }, 900);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderAudit(generateAudit(formData()));
});

document.querySelectorAll('[data-preset]').forEach((button) => {
  button.addEventListener('click', () => {
    fillForm(presets[button.dataset.preset]);
    renderAudit(generateAudit(formData()));
  });
});

output.copyAssets.addEventListener('click', copySalesAssets);
output.copyClaudePacket.addEventListener('click', copyClaudePacket);

renderAudit(generateAudit(formData()));
