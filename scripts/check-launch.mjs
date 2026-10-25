import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const scope={URL};scope.window=scope;vm.createContext(scope);
for(const file of ['config.js','routing.js'])vm.runInContext(readFileSync(new URL('../'+file,import.meta.url),'utf8'),scope);
const c=scope.THRIVE_CONFIG;
const checks={
  'Verified Apple listing':!!scope.ThriveRouting.storeURL('apple',c.stores.apple),
  'Verified Google listing':!!scope.ThriveRouting.storeURL('google',c.stores.google),
  'Price, billing and cancellation supplied':!!(c.trial.priceAfter&&c.trial.billingStarts&&c.trial.cancellation&&typeof c.trial.paymentRequired==='boolean'),
  'Full trial entitlements verified':c.trial.entitlementsVerified===true,
  'Policies and support supplied':!!(c.legal.privacy&&c.legal.terms&&c.legal.supportEmail),
  'Authentic captioned videos supplied':['app','founder'].every(key=>c.videos[key].src&&c.videos[key].poster&&c.videos[key].captions),
  'Founder identity and credentials verified':!!(c.founder.name&&c.founder.photo&&c.founder.credentialsVerified),
  'All testimonials genuine and verified':c.testimonials.length>=3&&c.testimonials.every(item=>item.verified&&!/sample member/i.test(item.name)),
  'Price/card transparency confirmed':!c.copy.priceText.includes('[price]')&&typeof c.copy.cardRequired==='boolean',
  'Privacy statements verified':c.privacyClaims.every(claim=>claim.verified&&!claim.text.includes('[')),
  'Reporting availability verified':c.report.verified===true,
  'Marketing experience statement verified':c.copy.credibilityVerified===true,
  'Launch explicitly verified':c.launchVerified===true,
  'Production mode explicitly selected':c.previewMode===false
};
for(const [label,passed]of Object.entries(checks))console.log((passed?'READY   ':'PENDING ')+label);
if(Object.values(checks).some(value=>!value)){console.log('\nPreview is valid. Production launch remains pending; see REPLACEMENT-CHECKLIST.md.');process.exitCode=1;}
