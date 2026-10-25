/* Consent-aware integration boundary. No SDK, cookies, network or storage by default.
 * TODO: Supply config.analytics.adapter.send(event, properties) and connect consent.
 * Never send symptoms, cycle data, nutrition logs, emails, full URLs or identifiers.
 * trial_started/app_install/trial_converted_to_paid must come from verified app/backend
 * attribution, NOT website clicks. They are deliberately rejected by this facade.
 */
(() => {
  const allowed = new Set(['landing_page_view','primary_cta_click','store_option_select','store_redirect','video_opened','feature_preview','resource_preview','sample_report_download','faq_open']);
  const safeKeys = new Set(['location','platform','feature','video','resource','question','preview']);
  const events = [];
  window.ThriveAnalytics = Object.freeze({
    track(name, properties = {}) {
      if (!allowed.has(name)) return false;
      const clean = { preview: window.THRIVE_CONFIG.previewMode };
      for (const [key,value] of Object.entries(properties)) {
        if (safeKeys.has(key) && ['string','number','boolean'].includes(typeof value)) clean[key] = typeof value === 'string' ? value.slice(0,80) : value;
      }
      events.push({ name, properties: clean });
      if (events.length > 100) events.shift();
      const settings = window.THRIVE_CONFIG.analytics;
      if (settings.enabled && settings.consentGranted && typeof settings.adapter?.send === 'function') {
        try { settings.adapter.send(name, clean); } catch (_) { /* Analytics must never block navigation. */ }
      }
      return true;
    },
    diagnostics() { return events.map(event => ({ ...event, properties: { ...event.properties } })); }
  });
})();
