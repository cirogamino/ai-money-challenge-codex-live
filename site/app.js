import {
  buildClaudeDeploymentAsk,
  calculateRoi,
  getCheckoutState,
  getConversionUpgrades,
  getFeaturedMetrics,
  getGrowthIdeas,
  getGoButtonDashboard,
  getLaunchPreviewDeck,
  getLaunchReadiness,
  getLaunchTimeline,
  getMasterLaunchChecklist,
  getProjectProgress,
  getProductVisualSuite,
  getProofTransformation,
  getQualificationResult,
  getRevenueFocus,
  getSnapshotDeliveryPlan,
  getSprintDepositOffer,
  getSuperChecklist,
  getTargetNiches,
  products,
} from './lib/catalog.mjs?v=20260723c';
import {
  getPaymentProfitUpgrades,
  getPaymentReadiness,
  getPaymentRouteBySlug,
  getPaymentStrategy,
  getPrimaryPaymentRouteForProduct,
  getProcessorAssignments,
} from './lib/paymentRoutes.mjs?v=20260723c';

const checkoutState = getCheckoutState();
const launchReadiness = getLaunchReadiness();
const handoffText = buildClaudeDeploymentAsk();
const revenueFocus = getRevenueFocus();
const proofTransformation = getProofTransformation();
const projectProgress = getProjectProgress();
const launchPreviewDeck = getLaunchPreviewDeck();
const productVisualSuite = getProductVisualSuite();
const masterLaunchChecklist = getMasterLaunchChecklist();
const launchTimeline = getLaunchTimeline();
const goButtonDashboard = getGoButtonDashboard();
const snapshotDelivery = getSnapshotDeliveryPlan();
const sprintDeposit = getSprintDepositOffer();
const superChecklist = getSuperChecklist();
const paymentStrategy = getPaymentStrategy();
const processorAssignments = getProcessorAssignments();
const paymentReadiness = getPaymentReadiness();
const paymentProfitUpgrades = getPaymentProfitUpgrades();

const metricStrip = document.querySelector('#metric-strip');
const productGrid = document.querySelector('#product-grid');
const readinessList = document.querySelector('#readiness-list');
const heroCopy = document.querySelector('#hero-copy');
const progressBar = document.querySelector('#project-progress-fill');
const progressPercent = document.querySelector('#project-progress-percent');
const progressMeta = document.querySelector('#project-progress-meta');
const progressMilestone = document.querySelector('#project-progress-milestone');
const timelineSummary = document.querySelector('#launch-timeline-summary');
const timelineEta = document.querySelector('#launch-timeline-eta');
const timelineDone = document.querySelector('#launch-timeline-done');
const timelineSpeedups = document.querySelector('#launch-timeline-speedups');
const timelinePhases = document.querySelector('#launch-timeline-phases');
const launchPreviewIntro = document.querySelector('#launch-preview-intro');
const launchPreviewGrid = document.querySelector('#launch-preview-grid');
const productVisualImage = document.querySelector('#product-visual-image');
const productVisualHeadline = document.querySelector('#product-visual-headline');
const productVisualNote = document.querySelector('#product-visual-note');
const productVisualCallouts = document.querySelector('#product-visual-callouts');
const fulfillmentPreviewGrid = document.querySelector('#fulfillment-preview-grid');
const proofStackGrid = document.querySelector('#proof-stack-grid');
const masterChecklistSummary = document.querySelector('#master-checklist-summary');
const masterChecklistUpdated = document.querySelector('#master-checklist-updated');
const masterChecklistGrid = document.querySelector('#master-checklist-grid');
const goButtonGrid = document.querySelector('#go-button-grid');
const goButtonPercent = document.querySelector('#go-button-percent');
const goButtonStatus = document.querySelector('#go-button-status');
const paymentReadinessSummary = document.querySelector('#payment-readiness-summary');
const processorAssignmentGrid = document.querySelector('#processor-assignment-grid');
const paymentRouteGrid = document.querySelector('#payment-route-grid');
const paymentRules = document.querySelector('#payment-rules');
const profitUpgradeGrid = document.querySelector('#profit-upgrade-grid');
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
const flowStatus = document.querySelector('#flow-status');
const flowTitle = document.querySelector('#flow-title');
const flowCopy = document.querySelector('#flow-copy');
const flowSteps = document.querySelector('#flow-steps');
const handoffBox = document.querySelector('#handoff-box');
let currentCopyText = handoffText;

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
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

function renderLaunchTimeline() {
  timelineSummary.textContent = `${launchTimeline.currentPace.summary} ${launchTimeline.fastTrack.summary}`;
  timelineEta.innerHTML = [launchTimeline.currentPace, launchTimeline.fastTrack]
    .map(
      (item) => `
        <article class="timeline-eta-card">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.etaDate)}</strong>
          <p>${escapeHtml(item.daysRemaining)} day${item.daysRemaining === 1 ? '' : 's'} remaining</p>
          ${item.percent ? `<small>${escapeHtml(item.percent)}% complete today</small>` : '<small>Fast-track mode</small>'}
        </article>
      `,
    )
    .join('');

  timelineDone.innerHTML = launchTimeline.definitionOfDone
    .map(
      (item) => `
        <article class="timeline-mini-card" data-status="${escapeHtml(item.status)}">
          <span>${escapeHtml(getStatusLabel(item.status))}</span>
          <strong>${escapeHtml(item.label)}</strong>
          <p>${escapeHtml(item.need)}</p>
        </article>
      `,
    )
    .join('');

  timelineSpeedups.innerHTML = launchTimeline.speedUps
    .map(
      (item) => `
        <article class="timeline-speed-card">
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.effect)}</p>
        </article>
      `,
    )
    .join('');

  timelinePhases.innerHTML = launchTimeline.phases
    .map(
      (phase, index) => `
        <article class="timeline-phase-card" data-status="${escapeHtml(phase.status)}">
          <span>${String(index + 1).padStart(2, '0')} / ${escapeHtml(getStatusLabel(phase.status))}</span>
          <strong>${escapeHtml(phase.name)}</strong>
          <p>${escapeHtml(phase.output)}</p>
          <small>${escapeHtml(phase.window)}</small>
        </article>
      `,
    )
    .join('');
}

function renderLaunchPreviewDeck() {
  launchPreviewIntro.textContent = launchPreviewDeck.intro;
  launchPreviewGrid.innerHTML = launchPreviewDeck.productMockups
    .map(
      (mockup) => `
        <article class="launch-mockup-card">
          <div class="mockup-card-top">
            <span>${escapeHtml(launchPreviewDeck.contextLabel)}</span>
            <strong>${escapeHtml(mockup.price)}</strong>
          </div>
          <h3>${escapeHtml(mockup.product)}</h3>
          <div class="mockup-window">
            <div class="mockup-window-bar">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="mockup-window-body">
              <small>${escapeHtml(mockup.sampleBusiness)}</small>
              <strong>${escapeHtml(mockup.artifactTitle)}</strong>
              <em>${escapeHtml(mockup.badge)}</em>
              <ul>
                ${mockup.visualLines.map((line) => `<li>${escapeHtml(line)}</li>`).join('')}
              </ul>
            </div>
          </div>
          <p>${escapeHtml(mockup.buyerPromise)}</p>
        </article>
      `,
    )
    .join('');

  fulfillmentPreviewGrid.innerHTML = launchPreviewDeck.fulfillmentPreview
    .map(
      (item) => `
        <article class="fulfillment-card">
          <span>${escapeHtml(item.status)}</span>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `,
    )
    .join('');

  proofStackGrid.innerHTML = launchPreviewDeck.proofCards
    .map(
      (card) => `
        <article class="proof-stack-card">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.title)}</strong>
          <p>${escapeHtml(card.detail)}</p>
        </article>
      `,
    )
    .join('');
}

function renderProductVisualSuite() {
  productVisualImage.src = productVisualSuite.imageSrc;
  productVisualImage.alt = productVisualSuite.alt;
  productVisualHeadline.textContent = productVisualSuite.headline;
  productVisualNote.textContent = productVisualSuite.highTicketNote;
  productVisualCallouts.innerHTML = productVisualSuite.callouts
    .map(
      (callout) => `
        <article class="visual-callout">
          <span>${escapeHtml(callout.label)}</span>
          <p>${escapeHtml(callout.detail)}</p>
        </article>
      `,
    )
    .join('');
}

function renderMasterLaunchChecklist() {
  masterChecklistSummary.textContent = masterLaunchChecklist.summary;
  masterChecklistUpdated.textContent = `Updated ${masterLaunchChecklist.updatedAt}`;
  masterChecklistGrid.innerHTML = masterLaunchChecklist.phases
    .map(
      (phase) => `
        <article class="master-checklist-phase">
          <div class="master-checklist-phase-top">
            <h3>${escapeHtml(phase.name)}</h3>
            <span>${escapeHtml(String(phase.items.filter((item) => item.status === 'done').length))} / ${escapeHtml(String(phase.items.length))}</span>
          </div>
          <div class="master-checklist-items">
            ${phase.items
              .map(
                (item) => `
                  <div class="master-checklist-item" data-status="${escapeHtml(item.status)}">
                    <input type="checkbox" aria-label="${escapeHtml(item.label)}" ${item.status === 'done' ? 'checked' : ''} disabled>
                    <div>
                      <div class="master-checklist-item-top">
                        <strong>${escapeHtml(item.label)}</strong>
                        <span>${escapeHtml(getStatusLabel(item.status))}</span>
                      </div>
                      <p>${escapeHtml(item.detail)}</p>
                      <small>${escapeHtml(item.code)}${item.completedAt ? ` - ${escapeHtml(item.completedAt)}` : ''}</small>
                    </div>
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

function renderPaymentOperatingSystem() {
  paymentReadinessSummary.innerHTML = `
    <span>${escapeHtml(paymentReadiness.mode === 'live' ? 'Live checkout' : 'Connector preview')}</span>
    <strong>${escapeHtml(paymentReadiness.liveCount)} / ${escapeHtml(paymentReadiness.totalCount)} URLs live</strong>
    <p>${escapeHtml(paymentReadiness.summary)}</p>
  `;

  paymentRules.innerHTML = paymentStrategy.rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join('');

  processorAssignmentGrid.innerHTML = processorAssignments
    .map(
      (assignment) => `
        <article class="processor-card">
          <span>${escapeHtml(assignment.processor)}</span>
          <h3>${escapeHtml(assignment.bestFor)}</h3>
          <p>${escapeHtml(assignment.setup)}</p>
          <ul>
            ${assignment.offers
              .map((offer) => `<li>${escapeHtml(offer.offer)} - ${escapeHtml(offer.amount)}</li>`)
              .join('')}
          </ul>
        </article>
      `,
    )
    .join('');

  paymentRouteGrid.innerHTML = paymentReadiness.routes
    .map(
      (route) => `
        <article class="payment-route-card" data-live="${escapeHtml(String(route.isLive))}">
          <div class="payment-route-top">
            <span>${escapeHtml(route.processorLabel)} ${escapeHtml(route.checkoutType)}</span>
            <strong>${escapeHtml(route.amount)}</strong>
          </div>
          <h3>${escapeHtml(route.offer)}</h3>
          <p>${escapeHtml(route.reason)}</p>
          <dl>
            <div>
              <dt>Slot</dt>
              <dd>${escapeHtml(route.configKey)}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>${escapeHtml(route.displayStatus)}</dd>
            </div>
            <div>
              <dt>Metadata</dt>
              <dd>${escapeHtml(route.metadata.offer_slug)} / ${escapeHtml(route.metadata.processor)}</dd>
            </div>
          </dl>
          ${
            route.isLive
              ? `<a class="button button-primary" href="${escapeHtml(route.checkoutUrl)}">Open checkout</a>`
              : `
                <div class="route-actions">
                  <a class="button button-primary" href="${escapeHtml(route.setupTarget.url)}" target="_blank" rel="noreferrer">
                    ${escapeHtml(route.setupTarget.label)}
                  </a>
                  <button class="button button-secondary" type="button" data-copy-route="${escapeHtml(route.slug)}">
                    Copy setup spec
                  </button>
                </div>
              `
          }
          <small>${escapeHtml(route.nextAction)} <a href="${escapeHtml(route.docsUrl)}" target="_blank" rel="noreferrer">Docs</a></small>
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
      const route = getPaymentRouteBySlug(action.routeSlug);

      return `
        <article class="checkout-card">
          <span>${escapeHtml(action.connector)}</span>
          <h3>${escapeHtml(action.label)}</h3>
          <p>${escapeHtml(product.primaryOutcome)}</p>
          <small>${escapeHtml(action.configKey)}</small>
          ${
            action.isLive
              ? `<a class="button button-primary" href="${escapeHtml(action.checkoutUrl)}">${escapeHtml(action.buttonLabel)}</a>`
              : `
                <div class="route-actions">
                  <a class="button button-primary" href="${escapeHtml(route.setupTarget.url)}" target="_blank" rel="noreferrer">
                    ${escapeHtml(route.setupTarget.label)}
                  </a>
                  <button class="button button-secondary" type="button" data-open-flow="${escapeHtml(product.slug)}">
                    Preview flow
                  </button>
                </div>
              `
          }
        </article>
      `;
    })
    .join('');
}

function renderPaymentProfitUpgrades() {
  profitUpgradeGrid.innerHTML = paymentProfitUpgrades
    .map(
      (upgrade, index) => `
        <article class="growth-card">
          <span>${String(index + 1).padStart(2, '0')}</span>
          <h3>${escapeHtml(upgrade.title)}</h3>
          <p>${escapeHtml(upgrade.why)}</p>
        </article>
      `,
    )
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
  const route = getPrimaryPaymentRouteForProduct(product.slug) ?? getPaymentRouteBySlug(slug);
  const isSprint = product.slug === sprintDeposit.productSlug;
  const firstStep = isSprint
    ? `Buyer clicks ${sprintDeposit.cta} and pays ${sprintDeposit.price} toward the ${sprintDeposit.appliesTo}.`
    : `Buyer clicks ${product.cta} for ${product.title} at ${product.price}.`;
  const paymentStep = route
    ? `${route.processorLabel} ${route.checkoutType} collects cash once ${route.configKey} contains the public checkout URL.`
    : `${product.checkoutAction} collects cash or deposit once the connector is authorized.`;
  const setupSteps = route?.isLive ? [] : route?.setupSteps ?? [];

  flowTitle.textContent = `${product.title} - ${route?.displayStatus ?? checkoutState.liveLabel}`;
  flowStatus.textContent = route?.isLive ? 'Live checkout' : 'Connector setup';
  flowCopy.textContent = `${product.primaryOutcome} ${checkoutState.buyerMessage}`;
  flowSteps.innerHTML = [
    firstStep,
    paymentStep,
    ...setupSteps,
    'Intake captures buyer context and triggers fulfillment.',
    'Claude receives the status packet so Ciro only approves the go-live step.',
  ]
    .map((step) => `<li>${escapeHtml(step)}</li>`)
    .join('');
  currentCopyText = route?.setupCopy ?? handoffText;
  handoffBox.value = currentCopyText;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('[data-close-flow]').focus();
}

function closeFlow() {
  modal.hidden = true;
  document.body.style.overflow = '';
}

async function copyHandoff() {
  handoffBox.value = currentCopyText;

  try {
    await navigator.clipboard.writeText(currentCopyText);
  } catch {
    handoffBox.focus();
    handoffBox.select();
  }
}

async function copyRouteSetup(slug) {
  const route = getPaymentRouteBySlug(slug);

  if (!route) {
    return;
  }

  currentCopyText = route.setupCopy;
  handoffBox.value = currentCopyText;

  try {
    await navigator.clipboard.writeText(currentCopyText);
  } catch {
    handoffBox.focus();
    handoffBox.select();
  }
}

document.addEventListener('click', (event) => {
  const openButton = event.target.closest('[data-open-flow]');
  const closeButton = event.target.closest('[data-close-flow]');
  const copyButton = event.target.closest('[data-copy-claude]');
  const routeCopyButton = event.target.closest('[data-copy-route]');

  if (openButton) {
    openFlow(openButton.dataset.openFlow);
  }

  if (closeButton) {
    closeFlow();
  }

  if (copyButton) {
    copyHandoff();
  }

  if (routeCopyButton) {
    copyRouteSetup(routeCopyButton.dataset.copyRoute);
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
renderLaunchTimeline();
renderLaunchPreviewDeck();
renderProductVisualSuite();
renderMasterLaunchChecklist();
renderGoButtonDashboard();
renderPaymentOperatingSystem();
renderSnapshotDelivery();
renderSuperChecklist();
renderNiches();
renderCheckoutActions();
renderProducts();
renderUpgradeList();
renderPaymentProfitUpgrades();
renderGrowthIdeas();
renderReadiness();
updateRoi();
updateQualifier();
handoffBox.value = handoffText;
