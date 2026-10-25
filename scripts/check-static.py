from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import re
root=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):super().__init__();self.ids=[];self.refs=[];self.assets=[];self.errors=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        for key in ['aria-controls','aria-labelledby','aria-describedby']:
            self.refs.extend(a.get(key,'').split())
        for key in ['src','href']:
            value=a.get(key,'')
            if value.startswith('#') and len(value)>1:self.refs.append(value[1:])
            elif value and not re.match(r'^(https?:|data:|mailto:)',value):self.assets.append(value.split('?')[0])
        if tag=='img' and 'alt' not in a:self.errors.append('Image lacks alt')
        if tag=='button' and a.get('type')!='button':self.errors.append('Button missing explicit type')
p=Page();p.feed((root/'index.html').read_text())
errors=p.errors+[f'Duplicate id: {k}' for k,v in Counter(p.ids).items() if v>1]+[f'Missing reference: {r}' for r in p.refs if r not in p.ids]+[f'Missing asset: {s}' for s in p.assets if not(root/s).is_file()]
for value in re.findall(r"url\(['\"]?([^)'\"]+)",(root/'styles.css').read_text()):
    if not value.startswith('data:') and not(root/value).is_file():errors.append('Missing CSS asset: '+value)
assert not errors,'\n'.join(errors)
print(f'Passed HTML/ARIA references, unique IDs, local assets, image alt and button types ({len(p.ids)} IDs).')
