
file_path = r'D:\Download\Nivaro - Framer Template.html'
search_text = 'class="framer-10d722n"'

with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    line_280 = f.readlines()[279]
    idx = line_280.find(search_text)
    context = line_280[idx:idx+15000] # Get 15k chars for all images
    with open('d:\\ABSYS\\images_container.txt', 'w', encoding='utf-8') as out:
        out.write(context)
