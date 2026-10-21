#!/usr/bin/env python3
"""Make og:image / twitter:image absolute once the final site address is known.
Usage: python3 tools/set_base.py https://USER.github.io/the-differential/
Run it from the site root, once, right before publishing."""
import sys,re,pathlib
base=sys.argv[1].rstrip('/')+'/'
root=pathlib.Path(__file__).resolve().parent.parent
for f in root.rglob('*.html'):
    s=f.read_text(encoding='utf-8')
    n=re.sub(r'content="(?:\.\./)*assets/og\.png"','content="'+base+'assets/og.png"',s)
    if n!=s: f.write_text(n,encoding='utf-8'); print('updated',f.relative_to(root))
