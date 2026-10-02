const approvedDeposits = { 'social-deposit': 10000, 'founding-deposit': 20000 };

export function liveDepositCheckout(config, offer) {
  if (config.mode !== 'live' || config.currency !== 'USD') return null;
  const ready = config.readiness;
  if (ready?.chargesEnabled !== true || ready?.payoutsEnabled !== true || ready?.cardPaymentsActive !== true) return null;
  if (!offer || offer.kind !== 'deposit' || !Object.hasOwn(approvedDeposits, offer.id) || approvedDeposits[offer.id] !== offer.amountCents ||
      offer.stripeVerified !== true || typeof offer.termsVersion !== 'string' || !offer.termsVersion.trim()) return null;
  try {
    const url = new URL(offer.paymentLink);
    if (url.protocol !== 'https:' || url.hostname !== 'buy.stripe.com' || url.port ||
        url.username || url.password || url.search || url.hash ||
        !/^\/[a-zA-Z0-9]+$/.test(url.pathname) || url.pathname.startsWith('/test_')) return null;
    return url.href;
  } catch { return null; }
}

export function renderLiveDeposits(document, config) {
  const container = document.getElementById('live-deposit-options');
  if (!container) return;
  container.replaceChildren();
  let available = 0;
  for (const offer of config.offers) {
    const section = document.createElement('div');
    section.style.flex = '1 1 260px';
    const heading = document.createElement('h3');
    heading.textContent = offer.name;
    const amount = document.createElement('p');
    amount.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(offer.amountCents / 100) + ' one-time deposit';
    const url = liveDepositCheckout(config, offer);
    const action = document.createElement(url ? 'a' : 'button');
    action.className = 'btn';
    if (url) {
      action.href = url;
      action.textContent = 'Pay reservation deposit';
      available++;
    } else {
      action.type = 'button';
      action.disabled = true;
      action.textContent = 'Checkout coming soon';
    }
    section.append(heading, amount, action);
    container.append(section);
  }
  document.getElementById('live-deposit-status').textContent = available
    ? 'Payments are processed by Stripe. The Club verifies your payment before confirming your reservation.'
    : 'Online reservation payments are being prepared. Join the interest list for updates.';
}
