export async function copyText(text, env = globalThis) {
  const doc = env.document;
  if (doc?.createElement && doc.body?.append && doc.execCommand) {
    const textarea = doc.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    doc.body.append(textarea);
    textarea.focus?.();
    textarea.select();
    const copied = doc.execCommand('copy');
    textarea.remove();
    if (copied) return true;
  }

  try {
    if (env.navigator?.clipboard?.writeText) {
      await env.navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    return false;
  }

  return false;
}
