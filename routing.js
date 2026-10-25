/* Pure routing rules, shared by the UI and focused tests. */
(function(scope) {
  const rules = {
    platformFrom(userAgent='',platform='',touchPoints=0) {
      if (/Android/i.test(userAgent)) return 'google';
      if (/iPhone|iPad|iPod/i.test(userAgent) || (platform === 'MacIntel' && touchPoints > 1)) return 'apple';
      return null;
    },
    storeURL(platform, value) {
      const hosts = {apple:'apps.apple.com',google:'play.google.com'};
      if (!hosts[platform] || !value) return null;
      try {
        const url = new URL(value);
        return url.protocol === 'https:' && url.hostname === hosts[platform] && !url.username && !url.password ? url.href : null;
      } catch (_) { return null; }
    }
  };
  scope.ThriveRouting = Object.freeze(rules);
})(typeof window === 'undefined' ? globalThis : window);
