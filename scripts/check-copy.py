from pathlib import Path
import re,html
root=Path(__file__).resolve().parents[1]
s=(root/'index.html').read_text()
expected=['hero','recognize-this','benefits','doctor-report','strength-club','member-story','the-app','daily-wellbeing','how-it-works','inside-thrive','your-privacy','questions','get-thrive']
sections=re.findall(r'<section\b[^>]*>',s)
order=[]
for section in sections:
    match=re.search(r'\bid="([^"]+)"',section)
    order.append(match[1] if match else 'hero')
assert order==expected,order
buttons=re.findall(r'<button\b[^>]*data-trial="[^"]+"[^>]*>([\s\S]*?)</button>',s)
assert len(buttons)==6
for button in buttons:
    text=' '.join(html.unescape(re.sub(r'<[^>]+>','',button)).split())
    assert text=='Start My Free Trial',text
assert len(re.findall(r'a little',s,re.I))<=2
for phrase in ['Finally make sense','perimenopause.','Night sweats at 3am.','not a clinical assessment','Is THRIVE a medical service?','does not diagnose conditions','Will my data be shared or sold?','Can I share my records with my doctor?']:
    assert phrase in s or phrase in (root/'app.js').read_text(),phrase
assert len(re.findall(r'<h1\b',s))==1
# WCAG relative luminance for the shared body/secondary/tab/button color tokens.
def rgb(hex_value):return [int(hex_value[i:i+2],16)/255 for i in (0,2,4)]
def lum(color):
    c=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in rgb(color)]
    return .2126*c[0]+.7152*c[1]+.0722*c[2]
def ratio(a,b):
    high,low=sorted([lum(a),lum(b)],reverse=True)
    return (high+.05)/(low+.05)
pairs=[('243022','f5f1e8'),('4f594b','f5f1e8'),('4f594b','fbf8f1'),('404c36','f5f1e8'),('fbf8f1','3d4b31'),('e1e4d5','1d291d')]
for foreground,background in pairs:
    measured=ratio(foreground,background)
    assert measured>=4.5,(foreground,background,measured)
print('Passed section order, all 6 CTA labels, copy limits, disclaimers and body-color contrast (minimum %.2f:1).'%min(ratio(*pair) for pair in pairs))
