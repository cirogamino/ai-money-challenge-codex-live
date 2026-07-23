import {
  buildFulfillmentPacket,
  buildIntakeSeed,
  buildLedgerEntry,
  getFulfillmentAutomationPlan,
  getFulfillmentRouteByFolder,
} from '../lib/fulfillment.mjs?v=20260723c';

const routeFolder = document.body.dataset.successRoute || 'snapshot';
const route = getFulfillmentRouteByFolder(routeFolder);
const params = new URLSearchParams(window.location.search);
const seed = buildIntakeSeed(routeFolder, params);
const plan = getFulfillmentAutomationPlan();

const fields = {
  eyebrow: document.querySelector('#success-eyebrow'),
  title: document.querySelector('#success-title'),
  intro: document.querySelector('#success-intro'),
  confirmation: document.querySelector('#confirmation-reference'),
  processor: document.querySelector('#processor-name'),
  amount: document.querySelector('#offer-amount'),
  cashStatus: document.querySelector('#cash-status'),
  routeStatus: document.querySelector('#route-status'),
  nextStep: document.querySelector('#next-step'),
  requiredList: document.querySelector('#required-fields'),
  planGrid: document.querySelector('#automation-plan-grid'),
  form: document.querySelector('#buyer-intake-form'),
  packet: document.querySelector('#fulfillment-packet'),
  ledger: document.querySelector('#ledger-preview'),
  copyButton: document.querySelector('[data-copy-fulfillment-packet]'),
  downloadButton: document.querySelector('[data-download-ledger-json]'),
  saveStatus: document.querySelector('#save-status'),
  paymentLink: document.querySelector('#payment-link'),
};

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function getIntake() {
  return Object.fromEntries(new FormData(fields.form).entries());
}

function saveLedgerEntry(entry) {
  const storageKey = 'codex-ai-money-ledger-preview';
  const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
  const nextEntries = [entry, ...existing.filter((item) => item.checkout_reference !== entry.checkout_reference)].slice(0, 25);
  localStorage.setItem(storageKey, JSON.stringify(nextEntries, null, 2));
}

function renderStaticRouteDetails() {
  document.title = `${route.offer} Success | Codex Revenue Lab`;
  fields.eyebrow.textContent = route.displayStatus;
  fields.title.textContent = `${route.offer} intake`;
  fields.intro.textContent =
    'Payment redirected here successfully. Complete the intake below so the delivery packet and challenge ledger row are ready before any manual follow-up.';
  fields.confirmation.textContent = seed.checkoutReference;
  fields.processor.textContent = `${route.processor} ${route.checkoutType}`;
  fields.amount.textContent = route.amount;
  fields.cashStatus.textContent = seed.cashStatus;
  fields.routeStatus.textContent = route.isCheckoutLive
    ? 'Live checkout URL is wired.'
    : 'Checkout URL still needs processor verification before cash is claimed.';
  fields.nextStep.textContent = route.nextStep;
  fields.requiredList.innerHTML = route.requiredFields
    .map((field) => `<li>${escapeHtml(field.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`))}</li>`)
    .join('');
  fields.planGrid.innerHTML = plan.steps
    .map(
      (step) => `
        <article class="success-plan-card" data-status="${escapeHtml(step.status)}">
          <span>${escapeHtml(step.status)}</span>
          <strong>${escapeHtml(step.title)}</strong>
          <p>${escapeHtml(step.detail)}</p>
        </article>
      `,
    )
    .join('');

  if (route.checkoutUrl) {
    fields.paymentLink.href = route.checkoutUrl;
    fields.paymentLink.hidden = false;
  }
}

function renderPacket() {
  const intake = getIntake();
  const packet = buildFulfillmentPacket({ routeSlug: route.routeSlug, params, intake });
  const ledgerEntry = buildLedgerEntry({ routeSlug: route.routeSlug, params, intake });

  fields.packet.value = packet.body;
  fields.ledger.textContent = JSON.stringify(ledgerEntry, null, 2);
  saveLedgerEntry(ledgerEntry);
  fields.saveStatus.textContent = 'Fulfillment packet and local ledger preview refreshed.';

  return { packet, ledgerEntry };
}

async function copyPacket() {
  const { packet } = renderPacket();

  try {
    await navigator.clipboard.writeText(packet.body);
    fields.copyButton.textContent = 'Copied';
  } catch {
    fields.packet.focus();
    fields.packet.select();
    fields.copyButton.textContent = 'Selected';
  }

  setTimeout(() => {
    fields.copyButton.textContent = 'Copy fulfillment packet';
  }, 1600);
}

function downloadLedgerJson() {
  const { ledgerEntry } = renderPacket();
  const blob = new Blob([JSON.stringify(ledgerEntry, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${route.routeSlug}-${ledgerEntry.date}-ledger-row.json`;
  link.click();
  URL.revokeObjectURL(url);
}

fields.form.addEventListener('input', renderPacket);
fields.form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPacket();
});
fields.copyButton.addEventListener('click', copyPacket);
fields.downloadButton.addEventListener('click', downloadLedgerJson);

renderStaticRouteDetails();
renderPacket();
