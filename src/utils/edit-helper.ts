export default class EditHelper {
  private inputTextArea: HTMLTextAreaElement;
  constructor(textArea: HTMLTextAreaElement) {
    this.inputTextArea = textArea;
  }

  public insertTextAtCursor(text: string): Promise<string> {
    this.inputTextArea.focus();
    return new Promise((resolve) => {
      const isSuccess = document.execCommand('insertText', false, text);
      if (!isSuccess && typeof this.inputTextArea.setRangeText === 'function') {
        const start = this.inputTextArea.selectionStart;
        this.inputTextArea.setRangeText(text);
        this.inputTextArea.selectionStart = this.inputTextArea.selectionEnd = start + text.length;
        const e = document.createEvent('UIEvent');
        e.initEvent('input', true, false);
        this.inputTextArea.dispatchEvent(e);
      }
      resolve(this.inputTextArea.value);
      this.inputTextArea.focus();
    });
  }

  public syncElementScrolling(e1: HTMLElement, e2: HTMLElement) {
    e2.scrollTop = (e1.scrollTop + e1.offsetHeight) / (e1.scrollHeight) * e2.scrollHeight - e2.offsetHeight;
    e2.scrollTop *= e1.scrollTop / (e1.scrollHeight - e1.offsetHeight);
  }
}
