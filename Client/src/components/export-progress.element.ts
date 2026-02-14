import {
  LitElement,
  css,
  html,
  customElement,
  property,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

@customElement("umbmetrics-export-progress")
export class ExportProgressElement extends UmbElementMixin(LitElement) {
  @property({ type: Boolean })
  isExporting: boolean = false;

  @property({ type: Number })
  progress: number = 0;

  render() {
    if (!this.isExporting) {
      return html``;
    }

    return html`
      <div class="export-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${this.progress}%"></div>
        </div>
        <div class="progress-text">
          Exporting... ${this.progress}%
        </div>
      </div>
    `;
  }

  static styles = css`
    .export-progress {
      margin-top: var(--uui-size-space-5);
      padding: var(--uui-size-space-4);
      background-color: var(--uui-color-surface-alt);
      border-radius: var(--uui-border-radius);
    }

    .progress-bar {
      height: 8px;
      background-color: var(--uui-color-surface);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: var(--uui-size-space-2);
    }

    .progress-fill {
      height: 100%;
      background-color: var(--uui-color-positive);
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .progress-text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.875rem;
      color: var(--uui-color-text-alt);
    }

    .progress-text::before {
      content: "⏳";
      margin-right: var(--uui-size-space-2);
    }
  `;
}

export default ExportProgressElement;

declare global {
  interface HTMLElementTagNameMap {
    "umbmetrics-export-progress": ExportProgressElement;
  }
}