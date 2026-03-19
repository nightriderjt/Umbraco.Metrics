import {
  LitElement,
  css,
  unsafeCSS,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import styles from '../css/export-progress.styles.css?inline';

@customElement("umbmetrics-progress")
export class ProgressElement extends UmbElementMixin(LitElement) {
  @property({ type: Boolean })
  isProgress: boolean = false;

  @property({ type: Number })
  progress: number = 0;

  @property()
  text:string='';

  render() {
    if (!this.isProgress) {
      return html``;
    }

    return html`
      <div class="export-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${this.progress}%"></div>
        </div>
        <div class="progress-text">          
          ${this.text} ${this.progress}%
        </div>
      </div>
    `;
  }

  static styles = css`${unsafeCSS(styles)}`;
}

export default ProgressElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-progress": ProgressElement;
  }
}