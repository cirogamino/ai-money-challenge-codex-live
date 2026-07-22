import {
  buildClaudeDeploymentAsk,
  calculateRoi,
  getCheckoutState,
  getConversionUpgrades,
  getFeaturedMetrics,
  getGrowthIdeas,
  getGoButtonDashboard,
  getLaunchReadiness,
  getProjectProgress,
  getProofTransformation,
  getQualificationResult,
  getRevenueFocus,
  getSnapshotDeliveryPlan,
  getSprintDepositOffer,
  getSuperChecklist,
  getTargetNiches,
  products,
} from './lib/catalog.mjs';

const checkoutState = getCheckoutState();
const launchReadiness = getLaunchReadiness();
const handoffText = buildClaudeDeploymentAsk();
const revenueFocus = getRevenueFocus();
const proofTransformation = getProofTransformation();
const projectProgress = getProjectProgress();
const goButtonDashboard = getGoButtonDashboard();
const snapshotDelivery = getSnapshotDeliveryPlan();
const sprintDeposit = getSprintDepositOffer();
const superChecklist = getSuperChecklist();

const metricStrip = document.querySelector('#metric-strip');
const productGrid = document.querySelector('#product-grid');
const readinessList = document.querySelector('#readiness-list');
const heroCopy = document.querySelector('#hero-copy');
const progressBar = document.querySelector('#project-progress-fill');
const progressPercent = document.querySelector('#project-progress-percent');
const progressMeta = document.querySelector('#project-progress-meta');
const progressMilestone = document.querySelector('#project-progress-milestone');
const goButtonGrid = document.querySelector('#go-button-grid');
const goButtonPercent = document.querySelector('#go-button-percent');
const goButtonStatus = document.querySelector('#go-button-status');
const snapshotOutputs = document.querySelector('#snapshot-outputs');
const snapshotSteps = document.querySelector('#snapshot-steps');
const snapshotPromise = document.querySelector('#snapshot-promise');
const checklistGrid = document.querySelector('#super-checklist-grid');
const nicheGrid = document.querySelector('#niche-grid');
const checkoutGrid = document.querySelector('#checkout-grid');
const upgradeGrid = document.querySelector('#upgrade-grid');
const growthGrid = document.querySelector('#growth-grid');
const proofBefore = document.querySelector('#proof-before');
const proofAfter = document.querySelector('#proof-after');
const roiForm = document.querySelector('#roi-form');
const roiOutput = document.querySelector('#roi-output');
const quizCard = document.querySelector('.quiz-card');
const quizResult = document.querySelector('#quiz-result');
const modal = document.querySelector('#flow-modal');
const flowTitle = document.querySelector('#flow-title');
const flowCopy = document.querySelector('#flow-copy');
const flowSteps = document.querySelector('#flow-steps');
const handoffBox = document.querySelector('#handoff-box');

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function renderMetrics() {
  metricStrip.innerHTML = getFeaturedMetrics()
    .map(
      (metric) => `
        <div class="metric">
          <dt>${escapeHtml(metric.label)}</dt>
          <dd>${escapeHtml(metric.value)}</dd>
        </div>
      `,
    )
    .join('');
}

function getStatusLabel(status) {
  return {
    done: 'Done',
    in_progress: 'In progress',
    blocked: 'Needs connector',
    queued: 'Next',
  }[status] ?? status;
}

function renderProjectProgress() {
  progressBar.style.width = `${projectProgress.percent}%`;
  progressPercent.textContent = `${projectProgress.percent}%`;
  progressMeta.textContent = `${projectProgress.completed} done, ${projectProgress.inProgress} in motion, ${projectProgress.blocked} connector-blocked, ${projectProgress.queued} next.`;
  progressMilestone.textContent = projectProgress.nextMilestone;
}

function renderGoButtonDashboard() {
  goButtonPercent.textContent = `${goButtonDashboard.launchReadyPercent}%`;
  goButtonStatus.textContent = goButtonDashboard.status;
  goButtonGrid.innerHTML = goButtonDashboard.connectors
    .map(
      (connector) => `
        <article class="go-card" data-status="${escapeHtml(connector.state)}">
          <div class="go-card-top">
            <span>${escapeHtml(getStatusLabel(connector.state))}</span>
            <strong>${escapeHtml(connector.name)}</strong>
          </div>
          <p>${escapeHtml(connector.action)}</p>
          <small>${escapeHtml(connector.owner)}</small>
        </article>
      `,
    )
    .join('');
}

function renderSnapshotDelivery() {
  snapshotPromise.textContent = `${snapshotDelivery.promise} Price: ${snapshotDelivery.price}. Delivery: ${snapshotDelivery.deliverySpeed}.`;
  snapshotOutputs.innerHTML = snapshotDelivery.outputs.map((output) => `<li>${escapeHtml(output)}</li>`).join('');
  snapshotSteps.innerHTML = snapshotDelivery.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('');
}

function renderSuperChecklist() {
  checklistGrid.innerHTML = superChecklist
    .map(
      (phase) => `
        <article class="checklist-phase">
          <div class="checklist-phase-top">
            <h3>${escapeHtml(phase.phase)}</h3>
            <span>${escapeHtml(String(phase.items.filter((item) => item.status === 'done').length))} / ${escapeHtml(String(phase.items.length))}</span>
          </div>
          <p>${escapeHtml(phase.summary)}</p>
          <div class="checklist-items">
            ${phase.items
              .map(
                (item) => `
                  <div class="checklist-item" data-status="${escapeHtml(item.status)}">
                    <span>${escapeHtml(getStatusLabel(item.status))}</span>
                    <strong>${escapeHtml(item.label)}</strong>
                    <p>${escapeHtml(item.detail)}</p>
                    <small>${escapeHtml(item.owner)}</small>
                  </div>
                `,
              )
              .join('')}
          </div>
        </article>
      `,
    )
    .join('');
}

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card ${product.slug === revenueFocus.primaryProductSlug ? 'product-card-featured' : ''}">
          <div class="product-top">
            <span class="product-type">${escapeHtml(product.type)}</span>
            <span class="price">${escapeHtml(product.price)}</span>
          </div>
          <h3>${escapeHtml(product.title)}</h3>
          <p>${escapeHtml(product.promise)}</p>
          <p><strong>Buyer:</strong> ${escapeHtml(product.audience)}</p>
          <ul class="include-list" aria-label="${escapeHtml(product.title)} includes">
            ${product.includes.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
          <p><strong>Checkout path:</strong> ${escapeHtml(product.checkoutAction)}</p>
          <div class="card-actions">
            <button class="button button-secondary" type="button" data-open-flow="${escapeHtml(product.slug)}">
              ${escapeHtml(product.cta)}
            </button>
          </div>
        </article>
      `,
    )
    .join('');
}

function renderNiches() {
  nicheGrid.innerHTML = getTargetNiches()
    .map(
      (niche) => `
        <article class="niche-card">
          <h3>${escapeHtml(niche.name)}</h3>
          <p><strong>Pain:</strong> ${escapeHtml(niche.pain)}</p>
          <p><strong>Sprint angle:</strong> ${escapeHtml(niche.sprintAngle)}</p>
        </article>
      `,
    )
    .join('');
}

function renderCheckoutActions() {
  checkoutGrid.innerHTML = checkoutState.actions
    .map((action) => {
      const product = getProductBySlug(action.productSlug);

      return `
        <article class="checkout-card">
          <span>${escapeHtml(action.connector)}</span>
          <h3>${escapeHtml(action.label)}</h3>
          <p>${escapeHtml(product.primaryOutcome)}</p>
          <button class="button button-secondary" type="button" data-open-flow="${escapeHtml(product.slug)}">
            ${escapeHtml(checkoutState.liveLabel)}
          </button>
        </article>
      `;
    })
    .join('');
}

function renderUpgradeList() {
  upgradeGrid.innerHTML = getConversionUpgrades()
    .map(
      (upgrade, index) => `
        <article class="upgrade-card">
          <span>${String(index + 1).padStart(2, '0')}</span>
          <p>${escapeHtml(upgrade.title)}</p>
        </article>
      `,
    )
    .join('');
}

function renderGrowthIdeas() {
  growthGrid.innerHTML = getGrowthIdeas()
    .map(
      (idea, index) => `
        <article class="growth-card">
          <span>${String(index + 1).padStart(2, '0')}</span>
          <h3>${escapeHtml(idea.title)}</h3>
          <p>${escapeHtml(idea.why)}</p>
        </article>
      `,
    )
    .join('');
}

function renderReadiness() {
  readinessList.innerHTML = launchReadiness.blocks
    .map(
      (block) => `
        <article class="readiness-item">
          <span>${escapeHtml(block.owner)}</span>
          <strong>${escapeHtml(block.name)}</strong>
          <p>${escapeHtml(block.status)}</p>
        </article>
      `,
    )
    .join('');
}

function renderProof() {
  heroCopy.textContent = revenueFocus.supportingCopy;
  proofBefore.textContent = proofTransformation.before;
  proofAfter.textContent = proofTransformation.after;
}

function updateRoi() {
  const formData = new FormData(roiForm);
  const roi = calculateRoi({
    clientValue: formData.get('client-value'),
    expectedClients: formData.get('expected-clients'),
    investment: formData.get('investment'),
  });

  roiOutput.innerHTML = `
    <strong>${escapeHtml(roi.multiple)} return multiple</strong>
    <span>Revenue: $${escapeHtml(roi.revenue.toLocaleString())}</span>
    <span>Profit after entry investment: $${escapeHtml(roi.profit.toLocaleString())}</span>
    <p>${escapeHtml(roi.summary)}</p>
  `;
}

function updateQualifier() {
  const formData = new FormData(quizCard);
  const result = getQualificationResult({
    hasAudience: formData.has('hasAudience'),
    hasService: formData.has('hasService'),
    wantsDoneForYou: formData.has('wantsDoneForYou'),
    budgetReady: formData.has('budgetReady'),
  });
  const product = getProductBySlug(result.recommendedSlug);

  quizResult.innerHTML = `
    <span>${escapeHtml(result.title)}</span>
    <strong>${escapeHtml(product.title)} - ${escapeHtml(product.price)}</strong>
    <p>${escapeHtml(result.message)}</p>
    <button class="button button-primary" type="button" data-open-flow="${escapeHtml(product.slug)}">
      ${escapeHtml(product.cta)}
    </button>
  `;
}

function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) ?? products[0];
}

function openFlow(slug) {
  const product = getProductBySlug(slug);
  const isSprint = product.slug === sprintDeposit.productSlug;
  const firstStep = isSprint
    ? `Buyer clicks ${sprintDeposit.cta} and pays ${sprintDeposit.price} toward the ${sprintDeposit.appliesTo}.`
    : `Buyer clicks ${product.cta} for ${product.title} at ${product.price}.`;

  flowTitle.textContent = `${product.title} - ${checkoutState.liveLabel}`;
  flowCopy.textContent = `${product.primaryOutcome} ${checkoutState.buyerMessage}`;
  flowSteps.innerHTML = [
    firstStep,
    `${product.checkoutAction} collects cash or deposit once the connector is authorized.`,
    'Intake captures buyer context and triggers fulfillment.',
    'Claude receives the status packet so Ciro only approves the go-live step.',
  ]
    .map((step) => `<li>${escapeHtml(step)}</li>`)
    .join('');
  handoffBox.value = handoffText;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('[data-close-flow]').focus();
}

function closeFlow() {
  modal.hidden = true;
  document.body.style.overflow = '';
}

async function copyHandoff() {
  handoffBox.value = handoffText;

  try {
    await navigator.clipboard.writeText(handoffText);
  } catch {
    handoffBox.focus();
    handoffBox.select();
  }
}

document.addEventListener('click', (event) => {
  const openButton = event.target.closest('[data-open-flow]');
  const closeButton = event.target.closest('[data-close-flow]');
  const copyButton = event.target.closest('[data-copy-claude]');

  if (openButton) {
    openFlow(openButton.dataset.openFlow);
  }

  if (closeButton) {
    closeFlow();
  }

  if (copyButton) {
    copyHandoff();
  }
});

roiForm.addEventListener('input', updateRoi);
quizCard.addEventListener('change', updateQualifier);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hidden) {
    closeFlow();
  }
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeFlow();
  }
});

renderMetrics();
renderProof();
renderProjectProgress();
renderGoButtonDashboard();
renderSnapshotDelivery();
renderSuperChecklist();
renderNiches();
renderCheckoutActions();
renderProducts();
renderUpgradeList();
renderGrowthIdeas();
renderReadiness();
updateRoi();
updateQualifier();
handoffBox.value = handoffText;
