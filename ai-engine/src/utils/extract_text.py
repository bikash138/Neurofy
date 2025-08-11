def extract_text(doc):
    result = []

    for block in doc.get("content",[]):
        for node in block.get("content",[]):
            text = node.get("text", '')
            if text:
                result.append(text)
    return ("\n".join(result))