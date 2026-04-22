
import sys

file_path = r'D:\Download\Nivaro - Framer Template.html'
search_text = "focused on clarity"

with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    for i, line in enumerate(f, 0):
        if search_text in line:
            print(f"Found in line {i+1}:")
            start = max(0, line.find(search_text)-500)
            end = line.find(search_text)+1500
            print(line[start:end])
            break
