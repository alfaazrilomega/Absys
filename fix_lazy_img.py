
import re

file_path = r'd:\ABSYS\index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the header section end or hero section start to avoid lazy loading there
# We'll start lazy loading from line 2530 (approx start of projects section)
lines = content.splitlines()
modified_lines = []

for i, line in enumerate(lines, 1):
    if i >= 2530:
        # If it's an img tag and doesn't have loading="lazy"
        if '<img' in line and 'loading="lazy"' not in line:
            # Add loading="lazy"
            line = line.replace('<img', '<img loading="lazy"')
    modified_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(modified_lines))

print("Successfully added loading='lazy' to images below the fold.")
