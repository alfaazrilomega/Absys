
file_path = r'D:\Download\Nivaro - Framer Template.html'
search_text = "focused"

with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    line_280 = f.readlines()[279]
    idx = line_280.find(search_text)
    context = line_280[max(0, idx-5000):idx+10000]
    with open('d:\\ABSYS\\reference_section.txt', 'w', encoding='utf-8') as out:
        out.write(context)
