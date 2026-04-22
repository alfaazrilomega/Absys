
import sys

file_path = r'D:\Download\Nivaro - Framer Template.html'
search_text = "focused"

with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    line_280 = f.readlines()[279]
    idx = line_280.find(search_text)
    # Get 3000 chars before and 5000 chars after the text
    print(line_280[max(0, idx-3000):idx+5000])
