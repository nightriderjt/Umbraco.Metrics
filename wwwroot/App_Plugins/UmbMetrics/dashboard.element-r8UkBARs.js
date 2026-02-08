import { LitElement as ge, html as E, css as fe, property as pe, customElement as _e, unsafeCSS as Ie, state as B } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as me } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT as Te } from "@umbraco-cms/backoffice/notification";
import { UMB_CURRENT_USER_CONTEXT as $e } from "@umbraco-cms/backoffice/current-user";
import { UMB_AUTH_CONTEXT as Re } from "@umbraco-cms/backoffice/auth";
class M extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.HttpError}.
   *
   * @param {string} errorMessage A descriptive error message.
   * @param {number} statusCode The HTTP status code represented by this error.
   */
  constructor(e, t) {
    const s = new.target.prototype;
    super(`${e}: Status code '${t}'`), this.statusCode = t, this.__proto__ = s;
  }
}
class ne extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.TimeoutError}.
   *
   * @param {string} errorMessage A descriptive error message.
   */
  constructor(e = "A timeout occurred.") {
    const t = new.target.prototype;
    super(e), this.__proto__ = t;
  }
}
class T extends Error {
  /** Constructs a new instance of {@link AbortError}.
   *
   * @param {string} errorMessage A descriptive error message.
   */
  constructor(e = "An abort occurred.") {
    const t = new.target.prototype;
    super(e), this.__proto__ = t;
  }
}
class Pe extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.UnsupportedTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(e, t) {
    const s = new.target.prototype;
    super(e), this.transport = t, this.errorType = "UnsupportedTransportError", this.__proto__ = s;
  }
}
class Me extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.DisabledTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(e, t) {
    const s = new.target.prototype;
    super(e), this.transport = t, this.errorType = "DisabledTransportError", this.__proto__ = s;
  }
}
class xe extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.FailedToStartTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(e, t) {
    const s = new.target.prototype;
    super(e), this.transport = t, this.errorType = "FailedToStartTransportError", this.__proto__ = s;
  }
}
class ce extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.FailedToNegotiateWithServerError}.
   *
   * @param {string} message A descriptive error message.
   */
  constructor(e) {
    const t = new.target.prototype;
    super(e), this.errorType = "FailedToNegotiateWithServerError", this.__proto__ = t;
  }
}
class De extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.AggregateErrors}.
   *
   * @param {string} message A descriptive error message.
   * @param {Error[]} innerErrors The collection of errors this error is aggregating.
   */
  constructor(e, t) {
    const s = new.target.prototype;
    super(e), this.innerErrors = t, this.__proto__ = s;
  }
}
class ve {
  constructor(e, t, s) {
    this.statusCode = e, this.statusText = t, this.content = s;
  }
}
class G {
  get(e, t) {
    return this.send({
      ...t,
      method: "GET",
      url: e
    });
  }
  post(e, t) {
    return this.send({
      ...t,
      method: "POST",
      url: e
    });
  }
  delete(e, t) {
    return this.send({
      ...t,
      method: "DELETE",
      url: e
    });
  }
  /** Gets all cookies that apply to the specified URL.
   *
   * @param url The URL that the cookies are valid for.
   * @returns {string} A string containing all the key-value cookie pairs for the specified URL.
   */
  // @ts-ignore
  getCookieString(e) {
    return "";
  }
}
var r;
(function(n) {
  n[n.Trace = 0] = "Trace", n[n.Debug = 1] = "Debug", n[n.Information = 2] = "Information", n[n.Warning = 3] = "Warning", n[n.Error = 4] = "Error", n[n.Critical = 5] = "Critical", n[n.None = 6] = "None";
})(r || (r = {}));
class W {
  constructor() {
  }
  /** @inheritDoc */
  // eslint-disable-next-line
  log(e, t) {
  }
}
W.instance = new W();
const Ue = "10.0.0";
class b {
  static isRequired(e, t) {
    if (e == null)
      throw new Error(`The '${t}' argument is required.`);
  }
  static isNotEmpty(e, t) {
    if (!e || e.match(/^\s*$/))
      throw new Error(`The '${t}' argument should not be empty.`);
  }
  static isIn(e, t, s) {
    if (!(e in t))
      throw new Error(`Unknown ${s} value: ${e}.`);
  }
}
class m {
  // react-native has a window but no document so we should check both
  static get isBrowser() {
    return !m.isNode && typeof window == "object" && typeof window.document == "object";
  }
  // WebWorkers don't have a window object so the isBrowser check would fail
  static get isWebWorker() {
    return !m.isNode && typeof self == "object" && "importScripts" in self;
  }
  // react-native has a window but no document
  static get isReactNative() {
    return !m.isNode && typeof window == "object" && typeof window.document > "u";
  }
  // Node apps shouldn't have a window object, but WebWorkers don't either
  // so we need to check for both WebWorker and window
  static get isNode() {
    return typeof process < "u" && process.release && process.release.name === "node";
  }
}
function L(n, e) {
  let t = "";
  return D(n) ? (t = `Binary data of length ${n.byteLength}`, e && (t += `. Content: '${Ae(n)}'`)) : typeof n == "string" && (t = `String data of length ${n.length}`, e && (t += `. Content: '${n}'`)), t;
}
function Ae(n) {
  const e = new Uint8Array(n);
  let t = "";
  return e.forEach((s) => {
    const i = s < 16 ? "0" : "";
    t += `0x${i}${s.toString(16)} `;
  }), t.substring(0, t.length - 1);
}
function D(n) {
  return n && typeof ArrayBuffer < "u" && (n instanceof ArrayBuffer || // Sometimes we get an ArrayBuffer that doesn't satisfy instanceof
  n.constructor && n.constructor.name === "ArrayBuffer");
}
async function be(n, e, t, s, i, o) {
  const a = {}, [c, l] = H();
  a[c] = l, n.log(r.Trace, `(${e} transport) sending data. ${L(i, o.logMessageContent)}.`);
  const u = D(i) ? "arraybuffer" : "text", g = await t.post(s, {
    content: i,
    headers: { ...a, ...o.headers },
    responseType: u,
    timeout: o.timeout,
    withCredentials: o.withCredentials
  });
  n.log(r.Trace, `(${e} transport) request complete. Response status: ${g.statusCode}.`);
}
function He(n) {
  return n === void 0 ? new j(r.Information) : n === null ? W.instance : n.log !== void 0 ? n : new j(n);
}
class Be {
  constructor(e, t) {
    this._subject = e, this._observer = t;
  }
  dispose() {
    const e = this._subject.observers.indexOf(this._observer);
    e > -1 && this._subject.observers.splice(e, 1), this._subject.observers.length === 0 && this._subject.cancelCallback && this._subject.cancelCallback().catch((t) => {
    });
  }
}
class j {
  constructor(e) {
    this._minLevel = e, this.out = console;
  }
  log(e, t) {
    if (e >= this._minLevel) {
      const s = `[${(/* @__PURE__ */ new Date()).toISOString()}] ${r[e]}: ${t}`;
      switch (e) {
        case r.Critical:
        case r.Error:
          this.out.error(s);
          break;
        case r.Warning:
          this.out.warn(s);
          break;
        case r.Information:
          this.out.info(s);
          break;
        default:
          this.out.log(s);
          break;
      }
    }
  }
}
function H() {
  let n = "X-SignalR-User-Agent";
  return m.isNode && (n = "User-Agent"), [n, Ne(Ue, We(), ze(), Le())];
}
function Ne(n, e, t, s) {
  let i = "Microsoft SignalR/";
  const o = n.split(".");
  return i += `${o[0]}.${o[1]}`, i += ` (${n}; `, e && e !== "" ? i += `${e}; ` : i += "Unknown OS; ", i += `${t}`, s ? i += `; ${s}` : i += "; Unknown Runtime Version", i += ")", i;
}
function We() {
  if (m.isNode)
    switch (process.platform) {
      case "win32":
        return "Windows NT";
      case "darwin":
        return "macOS";
      case "linux":
        return "Linux";
      default:
        return process.platform;
    }
  else
    return "";
}
function Le() {
  if (m.isNode)
    return process.versions.node;
}
function ze() {
  return m.isNode ? "NodeJS" : "Browser";
}
function X(n) {
  return n.stack ? n.stack : n.message ? n.message : `${n}`;
}
function Fe() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("could not find global");
}
class Oe extends G {
  constructor(e) {
    if (super(), this._logger = e, typeof fetch > "u" || m.isNode) {
      const t = typeof __webpack_require__ == "function" ? __non_webpack_require__ : require;
      this._jar = new (t("tough-cookie")).CookieJar(), typeof fetch > "u" ? this._fetchType = t("node-fetch") : this._fetchType = fetch, this._fetchType = t("fetch-cookie")(this._fetchType, this._jar);
    } else
      this._fetchType = fetch.bind(Fe());
    if (typeof AbortController > "u") {
      const t = typeof __webpack_require__ == "function" ? __non_webpack_require__ : require;
      this._abortControllerType = t("abort-controller");
    } else
      this._abortControllerType = AbortController;
  }
  /** @inheritDoc */
  async send(e) {
    if (e.abortSignal && e.abortSignal.aborted)
      throw new T();
    if (!e.method)
      throw new Error("No method defined.");
    if (!e.url)
      throw new Error("No url defined.");
    const t = new this._abortControllerType();
    let s;
    e.abortSignal && (e.abortSignal.onabort = () => {
      t.abort(), s = new T();
    });
    let i = null;
    if (e.timeout) {
      const l = e.timeout;
      i = setTimeout(() => {
        t.abort(), this._logger.log(r.Warning, "Timeout from HTTP request."), s = new ne();
      }, l);
    }
    e.content === "" && (e.content = void 0), e.content && (e.headers = e.headers || {}, D(e.content) ? e.headers["Content-Type"] = "application/octet-stream" : e.headers["Content-Type"] = "text/plain;charset=UTF-8");
    let o;
    try {
      o = await this._fetchType(e.url, {
        body: e.content,
        cache: "no-cache",
        credentials: e.withCredentials === !0 ? "include" : "same-origin",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          ...e.headers
        },
        method: e.method,
        mode: "cors",
        redirect: "follow",
        signal: t.signal
      });
    } catch (l) {
      throw s || (this._logger.log(r.Warning, `Error from HTTP request. ${l}.`), l);
    } finally {
      i && clearTimeout(i), e.abortSignal && (e.abortSignal.onabort = null);
    }
    if (!o.ok) {
      const l = await le(o, "text");
      throw new M(l || o.statusText, o.status);
    }
    const c = await le(o, e.responseType);
    return new ve(o.status, o.statusText, c);
  }
  getCookieString(e) {
    let t = "";
    return m.isNode && this._jar && this._jar.getCookies(e, (s, i) => t = i.join("; ")), t;
  }
}
function le(n, e) {
  let t;
  switch (e) {
    case "arraybuffer":
      t = n.arrayBuffer();
      break;
    case "text":
      t = n.text();
      break;
    case "blob":
    case "document":
    case "json":
      throw new Error(`${e} is not supported.`);
    default:
      t = n.text();
      break;
  }
  return t;
}
class qe extends G {
  constructor(e) {
    super(), this._logger = e;
  }
  /** @inheritDoc */
  send(e) {
    return e.abortSignal && e.abortSignal.aborted ? Promise.reject(new T()) : e.method ? e.url ? new Promise((t, s) => {
      const i = new XMLHttpRequest();
      i.open(e.method, e.url, !0), i.withCredentials = e.withCredentials === void 0 ? !0 : e.withCredentials, i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), e.content === "" && (e.content = void 0), e.content && (D(e.content) ? i.setRequestHeader("Content-Type", "application/octet-stream") : i.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"));
      const o = e.headers;
      o && Object.keys(o).forEach((a) => {
        i.setRequestHeader(a, o[a]);
      }), e.responseType && (i.responseType = e.responseType), e.abortSignal && (e.abortSignal.onabort = () => {
        i.abort(), s(new T());
      }), e.timeout && (i.timeout = e.timeout), i.onload = () => {
        e.abortSignal && (e.abortSignal.onabort = null), i.status >= 200 && i.status < 300 ? t(new ve(i.status, i.statusText, i.response || i.responseText)) : s(new M(i.response || i.responseText || i.statusText, i.status));
      }, i.onerror = () => {
        this._logger.log(r.Warning, `Error from HTTP request. ${i.status}: ${i.statusText}.`), s(new M(i.statusText, i.status));
      }, i.ontimeout = () => {
        this._logger.log(r.Warning, "Timeout from HTTP request."), s(new ne());
      }, i.send(e.content);
    }) : Promise.reject(new Error("No url defined.")) : Promise.reject(new Error("No method defined."));
  }
}
class je extends G {
  /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
  constructor(e) {
    if (super(), typeof fetch < "u" || m.isNode)
      this._httpClient = new Oe(e);
    else if (typeof XMLHttpRequest < "u")
      this._httpClient = new qe(e);
    else
      throw new Error("No usable HttpClient found.");
  }
  /** @inheritDoc */
  send(e) {
    return e.abortSignal && e.abortSignal.aborted ? Promise.reject(new T()) : e.method ? e.url ? this._httpClient.send(e) : Promise.reject(new Error("No url defined.")) : Promise.reject(new Error("No method defined."));
  }
  getCookieString(e) {
    return this._httpClient.getCookieString(e);
  }
}
class k {
  static write(e) {
    return `${e}${k.RecordSeparator}`;
  }
  static parse(e) {
    if (e[e.length - 1] !== k.RecordSeparator)
      throw new Error("Message is incomplete.");
    const t = e.split(k.RecordSeparator);
    return t.pop(), t;
  }
}
k.RecordSeparatorCode = 30;
k.RecordSeparator = String.fromCharCode(k.RecordSeparatorCode);
class Ge {
  // Handshake request is always JSON
  writeHandshakeRequest(e) {
    return k.write(JSON.stringify(e));
  }
  parseHandshakeResponse(e) {
    let t, s;
    if (D(e)) {
      const c = new Uint8Array(e), l = c.indexOf(k.RecordSeparatorCode);
      if (l === -1)
        throw new Error("Message is incomplete.");
      const u = l + 1;
      t = String.fromCharCode.apply(null, Array.prototype.slice.call(c.slice(0, u))), s = c.byteLength > u ? c.slice(u).buffer : null;
    } else {
      const c = e, l = c.indexOf(k.RecordSeparator);
      if (l === -1)
        throw new Error("Message is incomplete.");
      const u = l + 1;
      t = c.substring(0, u), s = c.length > u ? c.substring(u) : null;
    }
    const i = k.parse(t), o = JSON.parse(i[0]);
    if (o.type)
      throw new Error("Expected a handshake response from the server.");
    return [s, o];
  }
}
var h;
(function(n) {
  n[n.Invocation = 1] = "Invocation", n[n.StreamItem = 2] = "StreamItem", n[n.Completion = 3] = "Completion", n[n.StreamInvocation = 4] = "StreamInvocation", n[n.CancelInvocation = 5] = "CancelInvocation", n[n.Ping = 6] = "Ping", n[n.Close = 7] = "Close", n[n.Ack = 8] = "Ack", n[n.Sequence = 9] = "Sequence";
})(h || (h = {}));
class Xe {
  constructor() {
    this.observers = [];
  }
  next(e) {
    for (const t of this.observers)
      t.next(e);
  }
  error(e) {
    for (const t of this.observers)
      t.error && t.error(e);
  }
  complete() {
    for (const e of this.observers)
      e.complete && e.complete();
  }
  subscribe(e) {
    return this.observers.push(e), new Be(this, e);
  }
}
class Ke {
  constructor(e, t, s) {
    this._bufferSize = 1e5, this._messages = [], this._totalMessageCount = 0, this._waitForSequenceMessage = !1, this._nextReceivingSequenceId = 1, this._latestReceivedSequenceId = 0, this._bufferedByteCount = 0, this._reconnectInProgress = !1, this._protocol = e, this._connection = t, this._bufferSize = s;
  }
  async _send(e) {
    const t = this._protocol.writeMessage(e);
    let s = Promise.resolve();
    if (this._isInvocationMessage(e)) {
      this._totalMessageCount++;
      let i = () => {
      }, o = () => {
      };
      D(t) ? this._bufferedByteCount += t.byteLength : this._bufferedByteCount += t.length, this._bufferedByteCount >= this._bufferSize && (s = new Promise((a, c) => {
        i = a, o = c;
      })), this._messages.push(new Ve(t, this._totalMessageCount, i, o));
    }
    try {
      this._reconnectInProgress || await this._connection.send(t);
    } catch {
      this._disconnected();
    }
    await s;
  }
  _ack(e) {
    let t = -1;
    for (let s = 0; s < this._messages.length; s++) {
      const i = this._messages[s];
      if (i._id <= e.sequenceId)
        t = s, D(i._message) ? this._bufferedByteCount -= i._message.byteLength : this._bufferedByteCount -= i._message.length, i._resolver();
      else if (this._bufferedByteCount < this._bufferSize)
        i._resolver();
      else
        break;
    }
    t !== -1 && (this._messages = this._messages.slice(t + 1));
  }
  _shouldProcessMessage(e) {
    if (this._waitForSequenceMessage)
      return e.type !== h.Sequence ? !1 : (this._waitForSequenceMessage = !1, !0);
    if (!this._isInvocationMessage(e))
      return !0;
    const t = this._nextReceivingSequenceId;
    return this._nextReceivingSequenceId++, t <= this._latestReceivedSequenceId ? (t === this._latestReceivedSequenceId && this._ackTimer(), !1) : (this._latestReceivedSequenceId = t, this._ackTimer(), !0);
  }
  _resetSequence(e) {
    if (e.sequenceId > this._nextReceivingSequenceId) {
      this._connection.stop(new Error("Sequence ID greater than amount of messages we've received."));
      return;
    }
    this._nextReceivingSequenceId = e.sequenceId;
  }
  _disconnected() {
    this._reconnectInProgress = !0, this._waitForSequenceMessage = !0;
  }
  async _resend() {
    const e = this._messages.length !== 0 ? this._messages[0]._id : this._totalMessageCount + 1;
    await this._connection.send(this._protocol.writeMessage({ type: h.Sequence, sequenceId: e }));
    const t = this._messages;
    for (const s of t)
      await this._connection.send(s._message);
    this._reconnectInProgress = !1;
  }
  _dispose(e) {
    e ?? (e = new Error("Unable to reconnect to server."));
    for (const t of this._messages)
      t._rejector(e);
  }
  _isInvocationMessage(e) {
    switch (e.type) {
      case h.Invocation:
      case h.StreamItem:
      case h.Completion:
      case h.StreamInvocation:
      case h.CancelInvocation:
        return !0;
      case h.Close:
      case h.Sequence:
      case h.Ping:
      case h.Ack:
        return !1;
    }
  }
  _ackTimer() {
    this._ackTimerHandle === void 0 && (this._ackTimerHandle = setTimeout(async () => {
      try {
        this._reconnectInProgress || await this._connection.send(this._protocol.writeMessage({ type: h.Ack, sequenceId: this._latestReceivedSequenceId }));
      } catch {
      }
      clearTimeout(this._ackTimerHandle), this._ackTimerHandle = void 0;
    }, 1e3));
  }
}
class Ve {
  constructor(e, t, s, i) {
    this._message = e, this._id = t, this._resolver = s, this._rejector = i;
  }
}
const Je = 30 * 1e3, Qe = 15 * 1e3, Ye = 1e5;
var p;
(function(n) {
  n.Disconnected = "Disconnected", n.Connecting = "Connecting", n.Connected = "Connected", n.Disconnecting = "Disconnecting", n.Reconnecting = "Reconnecting";
})(p || (p = {}));
class se {
  /** @internal */
  // Using a public static factory method means we can have a private constructor and an _internal_
  // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
  // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
  // public parameter-less constructor.
  static create(e, t, s, i, o, a, c) {
    return new se(e, t, s, i, o, a, c);
  }
  constructor(e, t, s, i, o, a, c) {
    this._nextKeepAlive = 0, this._freezeEventListener = () => {
      this._logger.log(r.Warning, "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep");
    }, b.isRequired(e, "connection"), b.isRequired(t, "logger"), b.isRequired(s, "protocol"), this.serverTimeoutInMilliseconds = o ?? Je, this.keepAliveIntervalInMilliseconds = a ?? Qe, this._statefulReconnectBufferSize = c ?? Ye, this._logger = t, this._protocol = s, this.connection = e, this._reconnectPolicy = i, this._handshakeProtocol = new Ge(), this.connection.onreceive = (l) => this._processIncomingData(l), this.connection.onclose = (l) => this._connectionClosed(l), this._callbacks = {}, this._methods = {}, this._closedCallbacks = [], this._reconnectingCallbacks = [], this._reconnectedCallbacks = [], this._invocationId = 0, this._receivedHandshakeResponse = !1, this._connectionState = p.Disconnected, this._connectionStarted = !1, this._cachedPingMessage = this._protocol.writeMessage({ type: h.Ping });
  }
  /** Indicates the state of the {@link HubConnection} to the server. */
  get state() {
    return this._connectionState;
  }
  /** Represents the connection id of the {@link HubConnection} on the server. The connection id will be null when the connection is either
   *  in the disconnected state or if the negotiation step was skipped.
   */
  get connectionId() {
    return this.connection && this.connection.connectionId || null;
  }
  /** Indicates the url of the {@link HubConnection} to the server. */
  get baseUrl() {
    return this.connection.baseUrl || "";
  }
  /**
   * Sets a new url for the HubConnection. Note that the url can only be changed when the connection is in either the Disconnected or
   * Reconnecting states.
   * @param {string} url The url to connect to.
   */
  set baseUrl(e) {
    if (this._connectionState !== p.Disconnected && this._connectionState !== p.Reconnecting)
      throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.");
    if (!e)
      throw new Error("The HubConnection url must be a valid url.");
    this.connection.baseUrl = e;
  }
  /** Starts the connection.
   *
   * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
   */
  start() {
    return this._startPromise = this._startWithStateTransitions(), this._startPromise;
  }
  async _startWithStateTransitions() {
    if (this._connectionState !== p.Disconnected)
      return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));
    this._connectionState = p.Connecting, this._logger.log(r.Debug, "Starting HubConnection.");
    try {
      await this._startInternal(), m.isBrowser && window.document.addEventListener("freeze", this._freezeEventListener), this._connectionState = p.Connected, this._connectionStarted = !0, this._logger.log(r.Debug, "HubConnection connected successfully.");
    } catch (e) {
      return this._connectionState = p.Disconnected, this._logger.log(r.Debug, `HubConnection failed to start successfully because of error '${e}'.`), Promise.reject(e);
    }
  }
  async _startInternal() {
    this._stopDuringStartError = void 0, this._receivedHandshakeResponse = !1;
    const e = new Promise((t, s) => {
      this._handshakeResolver = t, this._handshakeRejecter = s;
    });
    await this.connection.start(this._protocol.transferFormat);
    try {
      let t = this._protocol.version;
      this.connection.features.reconnect || (t = 1);
      const s = {
        protocol: this._protocol.name,
        version: t
      };
      if (this._logger.log(r.Debug, "Sending handshake request."), await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(s)), this._logger.log(r.Information, `Using HubProtocol '${this._protocol.name}'.`), this._cleanupTimeout(), this._resetTimeoutPeriod(), this._resetKeepAliveInterval(), await e, this._stopDuringStartError)
        throw this._stopDuringStartError;
      this.connection.features.reconnect && (this._messageBuffer = new Ke(this._protocol, this.connection, this._statefulReconnectBufferSize), this.connection.features.disconnected = this._messageBuffer._disconnected.bind(this._messageBuffer), this.connection.features.resend = () => {
        if (this._messageBuffer)
          return this._messageBuffer._resend();
      }), this.connection.features.inherentKeepAlive || await this._sendMessage(this._cachedPingMessage);
    } catch (t) {
      throw this._logger.log(r.Debug, `Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`), this._cleanupTimeout(), this._cleanupPingTimer(), await this.connection.stop(t), t;
    }
  }
  /** Stops the connection.
   *
   * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
   */
  async stop() {
    const e = this._startPromise;
    this.connection.features.reconnect = !1, this._stopPromise = this._stopInternal(), await this._stopPromise;
    try {
      await e;
    } catch {
    }
  }
  _stopInternal(e) {
    if (this._connectionState === p.Disconnected)
      return this._logger.log(r.Debug, `Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`), Promise.resolve();
    if (this._connectionState === p.Disconnecting)
      return this._logger.log(r.Debug, `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`), this._stopPromise;
    const t = this._connectionState;
    return this._connectionState = p.Disconnecting, this._logger.log(r.Debug, "Stopping HubConnection."), this._reconnectDelayHandle ? (this._logger.log(r.Debug, "Connection stopped during reconnect delay. Done reconnecting."), clearTimeout(this._reconnectDelayHandle), this._reconnectDelayHandle = void 0, this._completeClose(), Promise.resolve()) : (t === p.Connected && this._sendCloseMessage(), this._cleanupTimeout(), this._cleanupPingTimer(), this._stopDuringStartError = e || new T("The connection was stopped before the hub handshake could complete."), this.connection.stop(e));
  }
  async _sendCloseMessage() {
    try {
      await this._sendWithProtocol(this._createCloseMessage());
    } catch {
    }
  }
  /** Invokes a streaming hub method on the server using the specified name and arguments.
   *
   * @typeparam T The type of the items returned by the server.
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
   */
  stream(e, ...t) {
    const [s, i] = this._replaceStreamingParams(t), o = this._createStreamInvocation(e, t, i);
    let a;
    const c = new Xe();
    return c.cancelCallback = () => {
      const l = this._createCancelInvocation(o.invocationId);
      return delete this._callbacks[o.invocationId], a.then(() => this._sendWithProtocol(l));
    }, this._callbacks[o.invocationId] = (l, u) => {
      if (u) {
        c.error(u);
        return;
      } else l && (l.type === h.Completion ? l.error ? c.error(new Error(l.error)) : c.complete() : c.next(l.item));
    }, a = this._sendWithProtocol(o).catch((l) => {
      c.error(l), delete this._callbacks[o.invocationId];
    }), this._launchStreams(s, a), c;
  }
  _sendMessage(e) {
    return this._resetKeepAliveInterval(), this.connection.send(e);
  }
  /**
   * Sends a js object to the server.
   * @param message The js object to serialize and send.
   */
  _sendWithProtocol(e) {
    return this._messageBuffer ? this._messageBuffer._send(e) : this._sendMessage(this._protocol.writeMessage(e));
  }
  /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
   *
   * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
   * be processing the invocation.
   *
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
   */
  send(e, ...t) {
    const [s, i] = this._replaceStreamingParams(t), o = this._sendWithProtocol(this._createInvocation(e, t, !0, i));
    return this._launchStreams(s, o), o;
  }
  /** Invokes a hub method on the server using the specified name and arguments.
   *
   * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
   * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
   * resolving the Promise.
   *
   * @typeparam T The expected return type.
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
   */
  invoke(e, ...t) {
    const [s, i] = this._replaceStreamingParams(t), o = this._createInvocation(e, t, !1, i);
    return new Promise((c, l) => {
      this._callbacks[o.invocationId] = (g, R) => {
        if (R) {
          l(R);
          return;
        } else g && (g.type === h.Completion ? g.error ? l(new Error(g.error)) : c(g.result) : l(new Error(`Unexpected message type: ${g.type}`)));
      };
      const u = this._sendWithProtocol(o).catch((g) => {
        l(g), delete this._callbacks[o.invocationId];
      });
      this._launchStreams(s, u);
    });
  }
  on(e, t) {
    !e || !t || (e = e.toLowerCase(), this._methods[e] || (this._methods[e] = []), this._methods[e].indexOf(t) === -1 && this._methods[e].push(t));
  }
  off(e, t) {
    if (!e)
      return;
    e = e.toLowerCase();
    const s = this._methods[e];
    if (s)
      if (t) {
        const i = s.indexOf(t);
        i !== -1 && (s.splice(i, 1), s.length === 0 && delete this._methods[e]);
      } else
        delete this._methods[e];
  }
  /** Registers a handler that will be invoked when the connection is closed.
   *
   * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
   */
  onclose(e) {
    e && this._closedCallbacks.push(e);
  }
  /** Registers a handler that will be invoked when the connection starts reconnecting.
   *
   * @param {Function} callback The handler that will be invoked when the connection starts reconnecting. Optionally receives a single argument containing the error that caused the connection to start reconnecting (if any).
   */
  onreconnecting(e) {
    e && this._reconnectingCallbacks.push(e);
  }
  /** Registers a handler that will be invoked when the connection successfully reconnects.
   *
   * @param {Function} callback The handler that will be invoked when the connection successfully reconnects.
   */
  onreconnected(e) {
    e && this._reconnectedCallbacks.push(e);
  }
  _processIncomingData(e) {
    if (this._cleanupTimeout(), this._receivedHandshakeResponse || (e = this._processHandshakeResponse(e), this._receivedHandshakeResponse = !0), e) {
      const t = this._protocol.parseMessages(e, this._logger);
      for (const s of t)
        if (!(this._messageBuffer && !this._messageBuffer._shouldProcessMessage(s)))
          switch (s.type) {
            case h.Invocation:
              this._invokeClientMethod(s).catch((i) => {
                this._logger.log(r.Error, `Invoke client method threw error: ${X(i)}`);
              });
              break;
            case h.StreamItem:
            case h.Completion: {
              const i = this._callbacks[s.invocationId];
              if (i) {
                s.type === h.Completion && delete this._callbacks[s.invocationId];
                try {
                  i(s);
                } catch (o) {
                  this._logger.log(r.Error, `Stream callback threw error: ${X(o)}`);
                }
              }
              break;
            }
            case h.Ping:
              break;
            case h.Close: {
              this._logger.log(r.Information, "Close message received from server.");
              const i = s.error ? new Error("Server returned an error on close: " + s.error) : void 0;
              s.allowReconnect === !0 ? this.connection.stop(i) : this._stopPromise = this._stopInternal(i);
              break;
            }
            case h.Ack:
              this._messageBuffer && this._messageBuffer._ack(s);
              break;
            case h.Sequence:
              this._messageBuffer && this._messageBuffer._resetSequence(s);
              break;
            default:
              this._logger.log(r.Warning, `Invalid message type: ${s.type}.`);
              break;
          }
    }
    this._resetTimeoutPeriod();
  }
  _processHandshakeResponse(e) {
    let t, s;
    try {
      [s, t] = this._handshakeProtocol.parseHandshakeResponse(e);
    } catch (i) {
      const o = "Error parsing handshake response: " + i;
      this._logger.log(r.Error, o);
      const a = new Error(o);
      throw this._handshakeRejecter(a), a;
    }
    if (t.error) {
      const i = "Server returned handshake error: " + t.error;
      this._logger.log(r.Error, i);
      const o = new Error(i);
      throw this._handshakeRejecter(o), o;
    } else
      this._logger.log(r.Debug, "Server handshake complete.");
    return this._handshakeResolver(), s;
  }
  _resetKeepAliveInterval() {
    this.connection.features.inherentKeepAlive || (this._nextKeepAlive = (/* @__PURE__ */ new Date()).getTime() + this.keepAliveIntervalInMilliseconds, this._cleanupPingTimer());
  }
  _resetTimeoutPeriod() {
    if (!this.connection.features || !this.connection.features.inherentKeepAlive) {
      this._timeoutHandle = setTimeout(() => this.serverTimeout(), this.serverTimeoutInMilliseconds);
      let e = this._nextKeepAlive - (/* @__PURE__ */ new Date()).getTime();
      if (e < 0) {
        this._connectionState === p.Connected && this._trySendPingMessage();
        return;
      }
      this._pingServerHandle === void 0 && (e < 0 && (e = 0), this._pingServerHandle = setTimeout(async () => {
        this._connectionState === p.Connected && await this._trySendPingMessage();
      }, e));
    }
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  serverTimeout() {
    this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
  }
  async _invokeClientMethod(e) {
    const t = e.target.toLowerCase(), s = this._methods[t];
    if (!s) {
      this._logger.log(r.Warning, `No client method with the name '${t}' found.`), e.invocationId && (this._logger.log(r.Warning, `No result given for '${t}' method and invocation ID '${e.invocationId}'.`), await this._sendWithProtocol(this._createCompletionMessage(e.invocationId, "Client didn't provide a result.", null)));
      return;
    }
    const i = s.slice(), o = !!e.invocationId;
    let a, c, l;
    for (const u of i)
      try {
        const g = a;
        a = await u.apply(this, e.arguments), o && a && g && (this._logger.log(r.Error, `Multiple results provided for '${t}'. Sending error to server.`), l = this._createCompletionMessage(e.invocationId, "Client provided multiple results.", null)), c = void 0;
      } catch (g) {
        c = g, this._logger.log(r.Error, `A callback for the method '${t}' threw error '${g}'.`);
      }
    l ? await this._sendWithProtocol(l) : o ? (c ? l = this._createCompletionMessage(e.invocationId, `${c}`, null) : a !== void 0 ? l = this._createCompletionMessage(e.invocationId, null, a) : (this._logger.log(r.Warning, `No result given for '${t}' method and invocation ID '${e.invocationId}'.`), l = this._createCompletionMessage(e.invocationId, "Client didn't provide a result.", null)), await this._sendWithProtocol(l)) : a && this._logger.log(r.Error, `Result given for '${t}' method but server is not expecting a result.`);
  }
  _connectionClosed(e) {
    this._logger.log(r.Debug, `HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`), this._stopDuringStartError = this._stopDuringStartError || e || new T("The underlying connection was closed before the hub handshake could complete."), this._handshakeResolver && this._handshakeResolver(), this._cancelCallbacksWithError(e || new Error("Invocation canceled due to the underlying connection being closed.")), this._cleanupTimeout(), this._cleanupPingTimer(), this._connectionState === p.Disconnecting ? this._completeClose(e) : this._connectionState === p.Connected && this._reconnectPolicy ? this._reconnect(e) : this._connectionState === p.Connected && this._completeClose(e);
  }
  _completeClose(e) {
    if (this._connectionStarted) {
      this._connectionState = p.Disconnected, this._connectionStarted = !1, this._messageBuffer && (this._messageBuffer._dispose(e ?? new Error("Connection closed.")), this._messageBuffer = void 0), m.isBrowser && window.document.removeEventListener("freeze", this._freezeEventListener);
      try {
        this._closedCallbacks.forEach((t) => t.apply(this, [e]));
      } catch (t) {
        this._logger.log(r.Error, `An onclose callback called with error '${e}' threw error '${t}'.`);
      }
    }
  }
  async _reconnect(e) {
    const t = Date.now();
    let s = 0, i = e !== void 0 ? e : new Error("Attempting to reconnect due to a unknown error."), o = this._getNextRetryDelay(s, 0, i);
    if (o === null) {
      this._logger.log(r.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."), this._completeClose(e);
      return;
    }
    if (this._connectionState = p.Reconnecting, e ? this._logger.log(r.Information, `Connection reconnecting because of error '${e}'.`) : this._logger.log(r.Information, "Connection reconnecting."), this._reconnectingCallbacks.length !== 0) {
      try {
        this._reconnectingCallbacks.forEach((a) => a.apply(this, [e]));
      } catch (a) {
        this._logger.log(r.Error, `An onreconnecting callback called with error '${e}' threw error '${a}'.`);
      }
      if (this._connectionState !== p.Reconnecting) {
        this._logger.log(r.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
        return;
      }
    }
    for (; o !== null; ) {
      if (this._logger.log(r.Information, `Reconnect attempt number ${s + 1} will start in ${o} ms.`), await new Promise((a) => {
        this._reconnectDelayHandle = setTimeout(a, o);
      }), this._reconnectDelayHandle = void 0, this._connectionState !== p.Reconnecting) {
        this._logger.log(r.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
        return;
      }
      try {
        if (await this._startInternal(), this._connectionState = p.Connected, this._logger.log(r.Information, "HubConnection reconnected successfully."), this._reconnectedCallbacks.length !== 0)
          try {
            this._reconnectedCallbacks.forEach((a) => a.apply(this, [this.connection.connectionId]));
          } catch (a) {
            this._logger.log(r.Error, `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${a}'.`);
          }
        return;
      } catch (a) {
        if (this._logger.log(r.Information, `Reconnect attempt failed because of error '${a}'.`), this._connectionState !== p.Reconnecting) {
          this._logger.log(r.Debug, `Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`), this._connectionState === p.Disconnecting && this._completeClose();
          return;
        }
        s++, i = a instanceof Error ? a : new Error(a.toString()), o = this._getNextRetryDelay(s, Date.now() - t, i);
      }
    }
    this._logger.log(r.Information, `Reconnect retries have been exhausted after ${Date.now() - t} ms and ${s} failed attempts. Connection disconnecting.`), this._completeClose();
  }
  _getNextRetryDelay(e, t, s) {
    try {
      return this._reconnectPolicy.nextRetryDelayInMilliseconds({
        elapsedMilliseconds: t,
        previousRetryCount: e,
        retryReason: s
      });
    } catch (i) {
      return this._logger.log(r.Error, `IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${i}'.`), null;
    }
  }
  _cancelCallbacksWithError(e) {
    const t = this._callbacks;
    this._callbacks = {}, Object.keys(t).forEach((s) => {
      const i = t[s];
      try {
        i(null, e);
      } catch (o) {
        this._logger.log(r.Error, `Stream 'error' callback called with '${e}' threw error: ${X(o)}`);
      }
    });
  }
  _cleanupPingTimer() {
    this._pingServerHandle && (clearTimeout(this._pingServerHandle), this._pingServerHandle = void 0);
  }
  _cleanupTimeout() {
    this._timeoutHandle && clearTimeout(this._timeoutHandle);
  }
  _createInvocation(e, t, s, i) {
    if (s)
      return i.length !== 0 ? {
        target: e,
        arguments: t,
        streamIds: i,
        type: h.Invocation
      } : {
        target: e,
        arguments: t,
        type: h.Invocation
      };
    {
      const o = this._invocationId;
      return this._invocationId++, i.length !== 0 ? {
        target: e,
        arguments: t,
        invocationId: o.toString(),
        streamIds: i,
        type: h.Invocation
      } : {
        target: e,
        arguments: t,
        invocationId: o.toString(),
        type: h.Invocation
      };
    }
  }
  _launchStreams(e, t) {
    if (e.length !== 0) {
      t || (t = Promise.resolve());
      for (const s in e)
        e[s].subscribe({
          complete: () => {
            t = t.then(() => this._sendWithProtocol(this._createCompletionMessage(s)));
          },
          error: (i) => {
            let o;
            i instanceof Error ? o = i.message : i && i.toString ? o = i.toString() : o = "Unknown error", t = t.then(() => this._sendWithProtocol(this._createCompletionMessage(s, o)));
          },
          next: (i) => {
            t = t.then(() => this._sendWithProtocol(this._createStreamItemMessage(s, i)));
          }
        });
    }
  }
  _replaceStreamingParams(e) {
    const t = [], s = [];
    for (let i = 0; i < e.length; i++) {
      const o = e[i];
      if (this._isObservable(o)) {
        const a = this._invocationId;
        this._invocationId++, t[a] = o, s.push(a.toString()), e.splice(i, 1);
      }
    }
    return [t, s];
  }
  _isObservable(e) {
    return e && e.subscribe && typeof e.subscribe == "function";
  }
  _createStreamInvocation(e, t, s) {
    const i = this._invocationId;
    return this._invocationId++, s.length !== 0 ? {
      target: e,
      arguments: t,
      invocationId: i.toString(),
      streamIds: s,
      type: h.StreamInvocation
    } : {
      target: e,
      arguments: t,
      invocationId: i.toString(),
      type: h.StreamInvocation
    };
  }
  _createCancelInvocation(e) {
    return {
      invocationId: e,
      type: h.CancelInvocation
    };
  }
  _createStreamItemMessage(e, t) {
    return {
      invocationId: e,
      item: t,
      type: h.StreamItem
    };
  }
  _createCompletionMessage(e, t, s) {
    return t ? {
      error: t,
      invocationId: e,
      type: h.Completion
    } : {
      invocationId: e,
      result: s,
      type: h.Completion
    };
  }
  _createCloseMessage() {
    return { type: h.Close };
  }
  async _trySendPingMessage() {
    try {
      await this._sendMessage(this._cachedPingMessage);
    } catch {
      this._cleanupPingTimer();
    }
  }
}
const Ze = [0, 2e3, 1e4, 3e4, null];
class he {
  constructor(e) {
    this._retryDelays = e !== void 0 ? [...e, null] : Ze;
  }
  nextRetryDelayInMilliseconds(e) {
    return this._retryDelays[e.previousRetryCount];
  }
}
class x {
}
x.Authorization = "Authorization";
x.Cookie = "Cookie";
class et extends G {
  constructor(e, t) {
    super(), this._innerClient = e, this._accessTokenFactory = t;
  }
  async send(e) {
    let t = !0;
    this._accessTokenFactory && (!this._accessToken || e.url && e.url.indexOf("/negotiate?") > 0) && (t = !1, this._accessToken = await this._accessTokenFactory()), this._setAuthorizationHeader(e);
    const s = await this._innerClient.send(e);
    return t && s.statusCode === 401 && this._accessTokenFactory ? (this._accessToken = await this._accessTokenFactory(), this._setAuthorizationHeader(e), await this._innerClient.send(e)) : s;
  }
  _setAuthorizationHeader(e) {
    e.headers || (e.headers = {}), this._accessToken ? e.headers[x.Authorization] = `Bearer ${this._accessToken}` : this._accessTokenFactory && e.headers[x.Authorization] && delete e.headers[x.Authorization];
  }
  getCookieString(e) {
    return this._innerClient.getCookieString(e);
  }
}
var w;
(function(n) {
  n[n.None = 0] = "None", n[n.WebSockets = 1] = "WebSockets", n[n.ServerSentEvents = 2] = "ServerSentEvents", n[n.LongPolling = 4] = "LongPolling";
})(w || (w = {}));
var S;
(function(n) {
  n[n.Text = 1] = "Text", n[n.Binary = 2] = "Binary";
})(S || (S = {}));
let tt = class {
  constructor() {
    this._isAborted = !1, this.onabort = null;
  }
  abort() {
    this._isAborted || (this._isAborted = !0, this.onabort && this.onabort());
  }
  get signal() {
    return this;
  }
  get aborted() {
    return this._isAborted;
  }
};
class ue {
  // This is an internal type, not exported from 'index' so this is really just internal.
  get pollAborted() {
    return this._pollAbort.aborted;
  }
  constructor(e, t, s) {
    this._httpClient = e, this._logger = t, this._pollAbort = new tt(), this._options = s, this._running = !1, this.onreceive = null, this.onclose = null;
  }
  async connect(e, t) {
    if (b.isRequired(e, "url"), b.isRequired(t, "transferFormat"), b.isIn(t, S, "transferFormat"), this._url = e, this._logger.log(r.Trace, "(LongPolling transport) Connecting."), t === S.Binary && typeof XMLHttpRequest < "u" && typeof new XMLHttpRequest().responseType != "string")
      throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
    const [s, i] = H(), o = { [s]: i, ...this._options.headers }, a = {
      abortSignal: this._pollAbort.signal,
      headers: o,
      timeout: 1e5,
      withCredentials: this._options.withCredentials
    };
    t === S.Binary && (a.responseType = "arraybuffer");
    const c = `${e}&_=${Date.now()}`;
    this._logger.log(r.Trace, `(LongPolling transport) polling: ${c}.`);
    const l = await this._httpClient.get(c, a);
    l.statusCode !== 200 ? (this._logger.log(r.Error, `(LongPolling transport) Unexpected response code: ${l.statusCode}.`), this._closeError = new M(l.statusText || "", l.statusCode), this._running = !1) : this._running = !0, this._receiving = this._poll(this._url, a);
  }
  async _poll(e, t) {
    try {
      for (; this._running; )
        try {
          const s = `${e}&_=${Date.now()}`;
          this._logger.log(r.Trace, `(LongPolling transport) polling: ${s}.`);
          const i = await this._httpClient.get(s, t);
          i.statusCode === 204 ? (this._logger.log(r.Information, "(LongPolling transport) Poll terminated by server."), this._running = !1) : i.statusCode !== 200 ? (this._logger.log(r.Error, `(LongPolling transport) Unexpected response code: ${i.statusCode}.`), this._closeError = new M(i.statusText || "", i.statusCode), this._running = !1) : i.content ? (this._logger.log(r.Trace, `(LongPolling transport) data received. ${L(i.content, this._options.logMessageContent)}.`), this.onreceive && this.onreceive(i.content)) : this._logger.log(r.Trace, "(LongPolling transport) Poll timed out, reissuing.");
        } catch (s) {
          this._running ? s instanceof ne ? this._logger.log(r.Trace, "(LongPolling transport) Poll timed out, reissuing.") : (this._closeError = s, this._running = !1) : this._logger.log(r.Trace, `(LongPolling transport) Poll errored after shutdown: ${s.message}`);
        }
    } finally {
      this._logger.log(r.Trace, "(LongPolling transport) Polling complete."), this.pollAborted || this._raiseOnClose();
    }
  }
  async send(e) {
    return this._running ? be(this._logger, "LongPolling", this._httpClient, this._url, e, this._options) : Promise.reject(new Error("Cannot send until the transport is connected"));
  }
  async stop() {
    this._logger.log(r.Trace, "(LongPolling transport) Stopping polling."), this._running = !1, this._pollAbort.abort();
    try {
      await this._receiving, this._logger.log(r.Trace, `(LongPolling transport) sending DELETE request to ${this._url}.`);
      const e = {}, [t, s] = H();
      e[t] = s;
      const i = {
        headers: { ...e, ...this._options.headers },
        timeout: this._options.timeout,
        withCredentials: this._options.withCredentials
      };
      let o;
      try {
        await this._httpClient.delete(this._url, i);
      } catch (a) {
        o = a;
      }
      o ? o instanceof M && (o.statusCode === 404 ? this._logger.log(r.Trace, "(LongPolling transport) A 404 response was returned from sending a DELETE request.") : this._logger.log(r.Trace, `(LongPolling transport) Error sending a DELETE request: ${o}`)) : this._logger.log(r.Trace, "(LongPolling transport) DELETE request accepted.");
    } finally {
      this._logger.log(r.Trace, "(LongPolling transport) Stop finished."), this._raiseOnClose();
    }
  }
  _raiseOnClose() {
    if (this.onclose) {
      let e = "(LongPolling transport) Firing onclose event.";
      this._closeError && (e += " Error: " + this._closeError), this._logger.log(r.Trace, e), this.onclose(this._closeError);
    }
  }
}
class nt {
  constructor(e, t, s, i) {
    this._httpClient = e, this._accessToken = t, this._logger = s, this._options = i, this.onreceive = null, this.onclose = null;
  }
  async connect(e, t) {
    return b.isRequired(e, "url"), b.isRequired(t, "transferFormat"), b.isIn(t, S, "transferFormat"), this._logger.log(r.Trace, "(SSE transport) Connecting."), this._url = e, this._accessToken && (e += (e.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(this._accessToken)}`), new Promise((s, i) => {
      let o = !1;
      if (t !== S.Text) {
        i(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
        return;
      }
      let a;
      if (m.isBrowser || m.isWebWorker)
        a = new this._options.EventSource(e, { withCredentials: this._options.withCredentials });
      else {
        const c = this._httpClient.getCookieString(e), l = {};
        l.Cookie = c;
        const [u, g] = H();
        l[u] = g, a = new this._options.EventSource(e, { withCredentials: this._options.withCredentials, headers: { ...l, ...this._options.headers } });
      }
      try {
        a.onmessage = (c) => {
          if (this.onreceive)
            try {
              this._logger.log(r.Trace, `(SSE transport) data received. ${L(c.data, this._options.logMessageContent)}.`), this.onreceive(c.data);
            } catch (l) {
              this._close(l);
              return;
            }
        }, a.onerror = (c) => {
          o ? this._close() : i(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."));
        }, a.onopen = () => {
          this._logger.log(r.Information, `SSE connected to ${this._url}`), this._eventSource = a, o = !0, s();
        };
      } catch (c) {
        i(c);
        return;
      }
    });
  }
  async send(e) {
    return this._eventSource ? be(this._logger, "SSE", this._httpClient, this._url, e, this._options) : Promise.reject(new Error("Cannot send until the transport is connected"));
  }
  stop() {
    return this._close(), Promise.resolve();
  }
  _close(e) {
    this._eventSource && (this._eventSource.close(), this._eventSource = void 0, this.onclose && this.onclose(e));
  }
}
class st {
  constructor(e, t, s, i, o, a) {
    this._logger = s, this._accessTokenFactory = t, this._logMessageContent = i, this._webSocketConstructor = o, this._httpClient = e, this.onreceive = null, this.onclose = null, this._headers = a;
  }
  async connect(e, t) {
    b.isRequired(e, "url"), b.isRequired(t, "transferFormat"), b.isIn(t, S, "transferFormat"), this._logger.log(r.Trace, "(WebSockets transport) Connecting.");
    let s;
    return this._accessTokenFactory && (s = await this._accessTokenFactory()), new Promise((i, o) => {
      e = e.replace(/^http/, "ws");
      let a;
      const c = this._httpClient.getCookieString(e);
      let l = !1;
      if (m.isNode || m.isReactNative) {
        const u = {}, [g, R] = H();
        u[g] = R, s && (u[x.Authorization] = `Bearer ${s}`), c && (u[x.Cookie] = c), a = new this._webSocketConstructor(e, void 0, {
          headers: { ...u, ...this._headers }
        });
      } else
        s && (e += (e.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(s)}`);
      a || (a = new this._webSocketConstructor(e)), t === S.Binary && (a.binaryType = "arraybuffer"), a.onopen = (u) => {
        this._logger.log(r.Information, `WebSocket connected to ${e}.`), this._webSocket = a, l = !0, i();
      }, a.onerror = (u) => {
        let g = null;
        typeof ErrorEvent < "u" && u instanceof ErrorEvent ? g = u.error : g = "There was an error with the transport", this._logger.log(r.Information, `(WebSockets transport) ${g}.`);
      }, a.onmessage = (u) => {
        if (this._logger.log(r.Trace, `(WebSockets transport) data received. ${L(u.data, this._logMessageContent)}.`), this.onreceive)
          try {
            this.onreceive(u.data);
          } catch (g) {
            this._close(g);
            return;
          }
      }, a.onclose = (u) => {
        if (l)
          this._close(u);
        else {
          let g = null;
          typeof ErrorEvent < "u" && u instanceof ErrorEvent ? g = u.error : g = "WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.", o(new Error(g));
        }
      };
    });
  }
  send(e) {
    return this._webSocket && this._webSocket.readyState === this._webSocketConstructor.OPEN ? (this._logger.log(r.Trace, `(WebSockets transport) sending data. ${L(e, this._logMessageContent)}.`), this._webSocket.send(e), Promise.resolve()) : Promise.reject("WebSocket is not in the OPEN state");
  }
  stop() {
    return this._webSocket && this._close(void 0), Promise.resolve();
  }
  _close(e) {
    this._webSocket && (this._webSocket.onclose = () => {
    }, this._webSocket.onmessage = () => {
    }, this._webSocket.onerror = () => {
    }, this._webSocket.close(), this._webSocket = void 0), this._logger.log(r.Trace, "(WebSockets transport) socket closed."), this.onclose && (this._isCloseEvent(e) && (e.wasClean === !1 || e.code !== 1e3) ? this.onclose(new Error(`WebSocket closed with status code: ${e.code} (${e.reason || "no reason given"}).`)) : e instanceof Error ? this.onclose(e) : this.onclose());
  }
  _isCloseEvent(e) {
    return e && typeof e.wasClean == "boolean" && typeof e.code == "number";
  }
}
const de = 100;
class it {
  constructor(e, t = {}) {
    if (this._stopPromiseResolver = () => {
    }, this.features = {}, this._negotiateVersion = 1, b.isRequired(e, "url"), this._logger = He(t.logger), this.baseUrl = this._resolveUrl(e), t = t || {}, t.logMessageContent = t.logMessageContent === void 0 ? !1 : t.logMessageContent, typeof t.withCredentials == "boolean" || t.withCredentials === void 0)
      t.withCredentials = t.withCredentials === void 0 ? !0 : t.withCredentials;
    else
      throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");
    t.timeout = t.timeout === void 0 ? 100 * 1e3 : t.timeout;
    let s = null, i = null;
    if (m.isNode && typeof require < "u") {
      const o = typeof __webpack_require__ == "function" ? __non_webpack_require__ : require;
      s = o("ws"), i = o("eventsource");
    }
    !m.isNode && typeof WebSocket < "u" && !t.WebSocket ? t.WebSocket = WebSocket : m.isNode && !t.WebSocket && s && (t.WebSocket = s), !m.isNode && typeof EventSource < "u" && !t.EventSource ? t.EventSource = EventSource : m.isNode && !t.EventSource && typeof i < "u" && (t.EventSource = i), this._httpClient = new et(t.httpClient || new je(this._logger), t.accessTokenFactory), this._connectionState = "Disconnected", this._connectionStarted = !1, this._options = t, this.onreceive = null, this.onclose = null;
  }
  async start(e) {
    if (e = e || S.Binary, b.isIn(e, S, "transferFormat"), this._logger.log(r.Debug, `Starting connection with transfer format '${S[e]}'.`), this._connectionState !== "Disconnected")
      return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));
    if (this._connectionState = "Connecting", this._startInternalPromise = this._startInternal(e), await this._startInternalPromise, this._connectionState === "Disconnecting") {
      const t = "Failed to start the HttpConnection before stop() was called.";
      return this._logger.log(r.Error, t), await this._stopPromise, Promise.reject(new T(t));
    } else if (this._connectionState !== "Connected") {
      const t = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
      return this._logger.log(r.Error, t), Promise.reject(new T(t));
    }
    this._connectionStarted = !0;
  }
  send(e) {
    return this._connectionState !== "Connected" ? Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")) : (this._sendQueue || (this._sendQueue = new ie(this.transport)), this._sendQueue.send(e));
  }
  async stop(e) {
    if (this._connectionState === "Disconnected")
      return this._logger.log(r.Debug, `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`), Promise.resolve();
    if (this._connectionState === "Disconnecting")
      return this._logger.log(r.Debug, `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`), this._stopPromise;
    this._connectionState = "Disconnecting", this._stopPromise = new Promise((t) => {
      this._stopPromiseResolver = t;
    }), await this._stopInternal(e), await this._stopPromise;
  }
  async _stopInternal(e) {
    this._stopError = e;
    try {
      await this._startInternalPromise;
    } catch {
    }
    if (this.transport) {
      try {
        await this.transport.stop();
      } catch (t) {
        this._logger.log(r.Error, `HttpConnection.transport.stop() threw error '${t}'.`), this._stopConnection();
      }
      this.transport = void 0;
    } else
      this._logger.log(r.Debug, "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.");
  }
  async _startInternal(e) {
    let t = this.baseUrl;
    this._accessTokenFactory = this._options.accessTokenFactory, this._httpClient._accessTokenFactory = this._accessTokenFactory;
    try {
      if (this._options.skipNegotiation)
        if (this._options.transport === w.WebSockets)
          this.transport = this._constructTransport(w.WebSockets), await this._startTransport(t, e);
        else
          throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");
      else {
        let s = null, i = 0;
        do {
          if (s = await this._getNegotiationResponse(t), this._connectionState === "Disconnecting" || this._connectionState === "Disconnected")
            throw new T("The connection was stopped during negotiation.");
          if (s.error)
            throw new Error(s.error);
          if (s.ProtocolVersion)
            throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
          if (s.url && (t = s.url), s.accessToken) {
            const o = s.accessToken;
            this._accessTokenFactory = () => o, this._httpClient._accessToken = o, this._httpClient._accessTokenFactory = void 0;
          }
          i++;
        } while (s.url && i < de);
        if (i === de && s.url)
          throw new Error("Negotiate redirection limit exceeded.");
        await this._createTransport(t, this._options.transport, s, e);
      }
      this.transport instanceof ue && (this.features.inherentKeepAlive = !0), this._connectionState === "Connecting" && (this._logger.log(r.Debug, "The HttpConnection connected successfully."), this._connectionState = "Connected");
    } catch (s) {
      return this._logger.log(r.Error, "Failed to start the connection: " + s), this._connectionState = "Disconnected", this.transport = void 0, this._stopPromiseResolver(), Promise.reject(s);
    }
  }
  async _getNegotiationResponse(e) {
    const t = {}, [s, i] = H();
    t[s] = i;
    const o = this._resolveNegotiateUrl(e);
    this._logger.log(r.Debug, `Sending negotiation request: ${o}.`);
    try {
      const a = await this._httpClient.post(o, {
        content: "",
        headers: { ...t, ...this._options.headers },
        timeout: this._options.timeout,
        withCredentials: this._options.withCredentials
      });
      if (a.statusCode !== 200)
        return Promise.reject(new Error(`Unexpected status code returned from negotiate '${a.statusCode}'`));
      const c = JSON.parse(a.content);
      return (!c.negotiateVersion || c.negotiateVersion < 1) && (c.connectionToken = c.connectionId), c.useStatefulReconnect && this._options._useStatefulReconnect !== !0 ? Promise.reject(new ce("Client didn't negotiate Stateful Reconnect but the server did.")) : c;
    } catch (a) {
      let c = "Failed to complete negotiation with the server: " + a;
      return a instanceof M && a.statusCode === 404 && (c = c + " Either this is not a SignalR endpoint or there is a proxy blocking the connection."), this._logger.log(r.Error, c), Promise.reject(new ce(c));
    }
  }
  _createConnectUrl(e, t) {
    return t ? e + (e.indexOf("?") === -1 ? "?" : "&") + `id=${t}` : e;
  }
  async _createTransport(e, t, s, i) {
    let o = this._createConnectUrl(e, s.connectionToken);
    if (this._isITransport(t)) {
      this._logger.log(r.Debug, "Connection was provided an instance of ITransport, using that directly."), this.transport = t, await this._startTransport(o, i), this.connectionId = s.connectionId;
      return;
    }
    const a = [], c = s.availableTransports || [];
    let l = s;
    for (const u of c) {
      const g = this._resolveTransportOrError(u, t, i, l?.useStatefulReconnect === !0);
      if (g instanceof Error)
        a.push(`${u.transport} failed:`), a.push(g);
      else if (this._isITransport(g)) {
        if (this.transport = g, !l) {
          try {
            l = await this._getNegotiationResponse(e);
          } catch (R) {
            return Promise.reject(R);
          }
          o = this._createConnectUrl(e, l.connectionToken);
        }
        try {
          await this._startTransport(o, i), this.connectionId = l.connectionId;
          return;
        } catch (R) {
          if (this._logger.log(r.Error, `Failed to start the transport '${u.transport}': ${R}`), l = void 0, a.push(new xe(`${u.transport} failed: ${R}`, w[u.transport])), this._connectionState !== "Connecting") {
            const ae = "Failed to select transport before stop() was called.";
            return this._logger.log(r.Debug, ae), Promise.reject(new T(ae));
          }
        }
      }
    }
    return a.length > 0 ? Promise.reject(new De(`Unable to connect to the server with any of the available transports. ${a.join(" ")}`, a)) : Promise.reject(new Error("None of the transports supported by the client are supported by the server."));
  }
  _constructTransport(e) {
    switch (e) {
      case w.WebSockets:
        if (!this._options.WebSocket)
          throw new Error("'WebSocket' is not supported in your environment.");
        return new st(this._httpClient, this._accessTokenFactory, this._logger, this._options.logMessageContent, this._options.WebSocket, this._options.headers || {});
      case w.ServerSentEvents:
        if (!this._options.EventSource)
          throw new Error("'EventSource' is not supported in your environment.");
        return new nt(this._httpClient, this._httpClient._accessToken, this._logger, this._options);
      case w.LongPolling:
        return new ue(this._httpClient, this._logger, this._options);
      default:
        throw new Error(`Unknown transport: ${e}.`);
    }
  }
  _startTransport(e, t) {
    return this.transport.onreceive = this.onreceive, this.features.reconnect ? this.transport.onclose = async (s) => {
      let i = !1;
      if (this.features.reconnect)
        try {
          this.features.disconnected(), await this.transport.connect(e, t), await this.features.resend();
        } catch {
          i = !0;
        }
      else {
        this._stopConnection(s);
        return;
      }
      i && this._stopConnection(s);
    } : this.transport.onclose = (s) => this._stopConnection(s), this.transport.connect(e, t);
  }
  _resolveTransportOrError(e, t, s, i) {
    const o = w[e.transport];
    if (o == null)
      return this._logger.log(r.Debug, `Skipping transport '${e.transport}' because it is not supported by this client.`), new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);
    if (ot(t, o))
      if (e.transferFormats.map((c) => S[c]).indexOf(s) >= 0) {
        if (o === w.WebSockets && !this._options.WebSocket || o === w.ServerSentEvents && !this._options.EventSource)
          return this._logger.log(r.Debug, `Skipping transport '${w[o]}' because it is not supported in your environment.'`), new Pe(`'${w[o]}' is not supported in your environment.`, o);
        this._logger.log(r.Debug, `Selecting transport '${w[o]}'.`);
        try {
          return this.features.reconnect = o === w.WebSockets ? i : void 0, this._constructTransport(o);
        } catch (c) {
          return c;
        }
      } else
        return this._logger.log(r.Debug, `Skipping transport '${w[o]}' because it does not support the requested transfer format '${S[s]}'.`), new Error(`'${w[o]}' does not support ${S[s]}.`);
    else
      return this._logger.log(r.Debug, `Skipping transport '${w[o]}' because it was disabled by the client.`), new Me(`'${w[o]}' is disabled by the client.`, o);
  }
  _isITransport(e) {
    return e && typeof e == "object" && "connect" in e;
  }
  _stopConnection(e) {
    if (this._logger.log(r.Debug, `HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`), this.transport = void 0, e = this._stopError || e, this._stopError = void 0, this._connectionState === "Disconnected") {
      this._logger.log(r.Debug, `Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`);
      return;
    }
    if (this._connectionState === "Connecting")
      throw this._logger.log(r.Warning, `Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`), new Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);
    if (this._connectionState === "Disconnecting" && this._stopPromiseResolver(), e ? this._logger.log(r.Error, `Connection disconnected with error '${e}'.`) : this._logger.log(r.Information, "Connection disconnected."), this._sendQueue && (this._sendQueue.stop().catch((t) => {
      this._logger.log(r.Error, `TransportSendQueue.stop() threw error '${t}'.`);
    }), this._sendQueue = void 0), this.connectionId = void 0, this._connectionState = "Disconnected", this._connectionStarted) {
      this._connectionStarted = !1;
      try {
        this.onclose && this.onclose(e);
      } catch (t) {
        this._logger.log(r.Error, `HttpConnection.onclose(${e}) threw error '${t}'.`);
      }
    }
  }
  _resolveUrl(e) {
    if (e.lastIndexOf("https://", 0) === 0 || e.lastIndexOf("http://", 0) === 0)
      return e;
    if (!m.isBrowser)
      throw new Error(`Cannot resolve '${e}'.`);
    const t = window.document.createElement("a");
    return t.href = e, this._logger.log(r.Information, `Normalizing '${e}' to '${t.href}'.`), t.href;
  }
  _resolveNegotiateUrl(e) {
    const t = new URL(e);
    t.pathname.endsWith("/") ? t.pathname += "negotiate" : t.pathname += "/negotiate";
    const s = new URLSearchParams(t.searchParams);
    return s.has("negotiateVersion") || s.append("negotiateVersion", this._negotiateVersion.toString()), s.has("useStatefulReconnect") ? s.get("useStatefulReconnect") === "true" && (this._options._useStatefulReconnect = !0) : this._options._useStatefulReconnect === !0 && s.append("useStatefulReconnect", "true"), t.search = s.toString(), t.toString();
  }
}
function ot(n, e) {
  return !n || (e & n) !== 0;
}
class ie {
  constructor(e) {
    this._transport = e, this._buffer = [], this._executing = !0, this._sendBufferedData = new F(), this._transportResult = new F(), this._sendLoopPromise = this._sendLoop();
  }
  send(e) {
    return this._bufferData(e), this._transportResult || (this._transportResult = new F()), this._transportResult.promise;
  }
  stop() {
    return this._executing = !1, this._sendBufferedData.resolve(), this._sendLoopPromise;
  }
  _bufferData(e) {
    if (this._buffer.length && typeof this._buffer[0] != typeof e)
      throw new Error(`Expected data to be of type ${typeof this._buffer} but was of type ${typeof e}`);
    this._buffer.push(e), this._sendBufferedData.resolve();
  }
  async _sendLoop() {
    for (; ; ) {
      if (await this._sendBufferedData.promise, !this._executing) {
        this._transportResult && this._transportResult.reject("Connection stopped.");
        break;
      }
      this._sendBufferedData = new F();
      const e = this._transportResult;
      this._transportResult = void 0;
      const t = typeof this._buffer[0] == "string" ? this._buffer.join("") : ie._concatBuffers(this._buffer);
      this._buffer.length = 0;
      try {
        await this._transport.send(t), e.resolve();
      } catch (s) {
        e.reject(s);
      }
    }
  }
  static _concatBuffers(e) {
    const t = e.map((o) => o.byteLength).reduce((o, a) => o + a), s = new Uint8Array(t);
    let i = 0;
    for (const o of e)
      s.set(new Uint8Array(o), i), i += o.byteLength;
    return s.buffer;
  }
}
class F {
  constructor() {
    this.promise = new Promise((e, t) => [this._resolver, this._rejecter] = [e, t]);
  }
  resolve() {
    this._resolver();
  }
  reject(e) {
    this._rejecter(e);
  }
}
const rt = "json";
class at {
  constructor() {
    this.name = rt, this.version = 2, this.transferFormat = S.Text;
  }
  /** Creates an array of {@link @microsoft/signalr.HubMessage} objects from the specified serialized representation.
   *
   * @param {string} input A string containing the serialized representation.
   * @param {ILogger} logger A logger that will be used to log messages that occur during parsing.
   */
  parseMessages(e, t) {
    if (typeof e != "string")
      throw new Error("Invalid input for JSON hub protocol. Expected a string.");
    if (!e)
      return [];
    t === null && (t = W.instance);
    const s = k.parse(e), i = [];
    for (const o of s) {
      const a = JSON.parse(o);
      if (typeof a.type != "number")
        throw new Error("Invalid payload.");
      switch (a.type) {
        case h.Invocation:
          this._isInvocationMessage(a);
          break;
        case h.StreamItem:
          this._isStreamItemMessage(a);
          break;
        case h.Completion:
          this._isCompletionMessage(a);
          break;
        case h.Ping:
          break;
        case h.Close:
          break;
        case h.Ack:
          this._isAckMessage(a);
          break;
        case h.Sequence:
          this._isSequenceMessage(a);
          break;
        default:
          t.log(r.Information, "Unknown message type '" + a.type + "' ignored.");
          continue;
      }
      i.push(a);
    }
    return i;
  }
  /** Writes the specified {@link @microsoft/signalr.HubMessage} to a string and returns it.
   *
   * @param {HubMessage} message The message to write.
   * @returns {string} A string containing the serialized representation of the message.
   */
  writeMessage(e) {
    return k.write(JSON.stringify(e));
  }
  _isInvocationMessage(e) {
    this._assertNotEmptyString(e.target, "Invalid payload for Invocation message."), e.invocationId !== void 0 && this._assertNotEmptyString(e.invocationId, "Invalid payload for Invocation message.");
  }
  _isStreamItemMessage(e) {
    if (this._assertNotEmptyString(e.invocationId, "Invalid payload for StreamItem message."), e.item === void 0)
      throw new Error("Invalid payload for StreamItem message.");
  }
  _isCompletionMessage(e) {
    if (e.result && e.error)
      throw new Error("Invalid payload for Completion message.");
    !e.result && e.error && this._assertNotEmptyString(e.error, "Invalid payload for Completion message."), this._assertNotEmptyString(e.invocationId, "Invalid payload for Completion message.");
  }
  _isAckMessage(e) {
    if (typeof e.sequenceId != "number")
      throw new Error("Invalid SequenceId for Ack message.");
  }
  _isSequenceMessage(e) {
    if (typeof e.sequenceId != "number")
      throw new Error("Invalid SequenceId for Sequence message.");
  }
  _assertNotEmptyString(e, t) {
    if (typeof e != "string" || e === "")
      throw new Error(t);
  }
}
const ct = {
  trace: r.Trace,
  debug: r.Debug,
  info: r.Information,
  information: r.Information,
  warn: r.Warning,
  warning: r.Warning,
  error: r.Error,
  critical: r.Critical,
  none: r.None
};
function lt(n) {
  const e = ct[n.toLowerCase()];
  if (typeof e < "u")
    return e;
  throw new Error(`Unknown log level: ${n}`);
}
class ht {
  configureLogging(e) {
    if (b.isRequired(e, "logging"), ut(e))
      this.logger = e;
    else if (typeof e == "string") {
      const t = lt(e);
      this.logger = new j(t);
    } else
      this.logger = new j(e);
    return this;
  }
  withUrl(e, t) {
    return b.isRequired(e, "url"), b.isNotEmpty(e, "url"), this.url = e, typeof t == "object" ? this.httpConnectionOptions = { ...this.httpConnectionOptions, ...t } : this.httpConnectionOptions = {
      ...this.httpConnectionOptions,
      transport: t
    }, this;
  }
  /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified Hub Protocol.
   *
   * @param {IHubProtocol} protocol The {@link @microsoft/signalr.IHubProtocol} implementation to use.
   */
  withHubProtocol(e) {
    return b.isRequired(e, "protocol"), this.protocol = e, this;
  }
  withAutomaticReconnect(e) {
    if (this.reconnectPolicy)
      throw new Error("A reconnectPolicy has already been set.");
    return e ? Array.isArray(e) ? this.reconnectPolicy = new he(e) : this.reconnectPolicy = e : this.reconnectPolicy = new he(), this;
  }
  /** Configures {@link @microsoft/signalr.HubConnection.serverTimeoutInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
   *
   * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
   */
  withServerTimeout(e) {
    return b.isRequired(e, "milliseconds"), this._serverTimeoutInMilliseconds = e, this;
  }
  /** Configures {@link @microsoft/signalr.HubConnection.keepAliveIntervalInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
   *
   * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
   */
  withKeepAliveInterval(e) {
    return b.isRequired(e, "milliseconds"), this._keepAliveIntervalInMilliseconds = e, this;
  }
  /** Enables and configures options for the Stateful Reconnect feature.
   *
   * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
   */
  withStatefulReconnect(e) {
    return this.httpConnectionOptions === void 0 && (this.httpConnectionOptions = {}), this.httpConnectionOptions._useStatefulReconnect = !0, this._statefulReconnectBufferSize = e?.bufferSize, this;
  }
  /** Creates a {@link @microsoft/signalr.HubConnection} from the configuration options specified in this builder.
   *
   * @returns {HubConnection} The configured {@link @microsoft/signalr.HubConnection}.
   */
  build() {
    const e = this.httpConnectionOptions || {};
    if (e.logger === void 0 && (e.logger = this.logger), !this.url)
      throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
    const t = new it(this.url, e);
    return se.create(t, this.logger || W.instance, this.protocol || new at(), this.reconnectPolicy, this._serverTimeoutInMilliseconds, this._keepAliveIntervalInMilliseconds, this._statefulReconnectBufferSize);
  }
}
function ut(n) {
  return n.log !== void 0;
}
class dt {
  constructor(e) {
    this.#n = /* @__PURE__ */ new Set(), this.#t = !1, this.API_BASE_URL = "/umbraco/management/api/v1/metrics", this.HUB_URL = "/umbraco/metrics-hub", this.#s = e;
  }
  #e;
  #n;
  #t;
  #s;
  /**
   * Fetches current performance metrics from the server (one-time request)
   */
  async getPerformanceMetrics() {
    const e = await this.#s();
    if (!e)
      throw new Error("No authentication token available");
    const t = await fetch(`${this.API_BASE_URL}/performance`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    });
    if (!t.ok)
      throw t.status === 401 ? new Error("Unauthorized: Please ensure you are logged into the Umbraco backoffice") : new Error(
        `Failed to fetch performance metrics: ${t.status} ${t.statusText}`
      );
    return await t.json();
  }
  /**
   * Connect to SignalR hub for real-time metrics updates
   */
  async connectToHub() {
    if (this.#t) {
      console.log("Connection already in progress, waiting..."), await this.#i();
      return;
    }
    if (this.#e?.state === p.Connected) {
      console.log("Already connected to hub");
      return;
    }
    this.#e && await this.disconnectFromHub(), this.#t = !0;
    try {
      console.log("Building SignalR connection..."), this.#e = new ht().withUrl(this.HUB_URL, {
        accessTokenFactory: async () => await this.#s()
      }).withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (t) => t.previousRetryCount === 0 ? 0 : t.previousRetryCount === 1 ? 2e3 : t.previousRetryCount === 2 ? 5e3 : t.previousRetryCount === 3 ? 1e4 : 3e4
      }).configureLogging(r.Information).build(), this.#e.on("ReceiveMetrics", (t) => {
        console.log("Received metrics from SignalR"), this.#o(t);
      }), this.#e.onreconnected(async (t) => {
        console.log("SignalR reconnected:", t);
        try {
          await this.#e?.invoke("RequestMetrics");
        } catch (s) {
          console.error("Error requesting metrics after reconnect:", s);
        }
      }), this.#e.onreconnecting((t) => {
        console.log("SignalR reconnecting...", t);
      }), this.#e.onclose((t) => {
        console.log("SignalR connection closed", t), this.#t = !1;
      }), console.log("Starting SignalR connection...");
      const e = new Promise(
        (t, s) => setTimeout(() => s(new Error("Connection timeout after 15 seconds")), 15e3)
      );
      await Promise.race([
        this.#e.start(),
        e
      ]), console.log("SignalR connected successfully"), await new Promise((t) => setTimeout(t, 500)), console.log("Requesting initial metrics..."), await this.#e.invoke("RequestMetrics"), this.#t = !1;
    } catch (e) {
      if (this.#t = !1, console.error("Error connecting to SignalR hub:", e), this.#e) {
        try {
          await this.#e.stop();
        } catch (t) {
          console.error("Error stopping failed connection:", t);
        }
        this.#e = void 0;
      }
      throw e;
    }
  }
  /**
   * Wait for ongoing connection attempt to complete
   */
  async #i(e = 2e4) {
    const t = Date.now();
    for (; this.#t && Date.now() - t < e; )
      await new Promise((s) => setTimeout(s, 200));
    if (this.#t)
      throw new Error("Connection timeout - another connection attempt is taking too long");
  }
  /**
   * Disconnect from SignalR hub
   */
  async disconnectFromHub() {
    if (this.#e)
      try {
        this.#e.off("ReceiveMetrics"), await this.#e.stop(), console.log("SignalR disconnected from metrics hub");
      } catch (e) {
        console.error("Error during disconnect:", e);
      } finally {
        this.#e = void 0, this.#t = !1;
      }
  }
  /**
   * Subscribe to real-time metrics updates
   */
  onMetricsUpdate(e) {
    return this.#n.add(e), () => {
      this.#n.delete(e);
    };
  }
  /**
   * Manually request metrics update from the hub
   */
  async requestMetrics() {
    if (!this.#e || this.#e.state !== p.Connected)
      throw new Error("Not connected to metrics hub");
    try {
      await this.#e.invoke("RequestMetrics");
    } catch (e) {
      throw console.error("Error requesting metrics:", e), new Error("Failed to request metrics from hub");
    }
  }
  /**
   * Check if connected to hub
   */
  get isConnected() {
    return this.#e?.state === p.Connected;
  }
  /**
   * Get current connection state
   */
  get connectionState() {
    return this.#e?.state?.toString() || "Disconnected";
  }
  /**
   * Fetches Umbraco-specific metrics from the server
   */
  async getUmbracoMetrics() {
    const e = await this.#s(), t = await fetch(`${this.API_BASE_URL}/umb`, {
      headers: {
        Authorization: `Bearer ${e}`,
        "Content-Type": "application/json"
      }
    });
    if (!t.ok)
      throw new Error(`Failed to fetch Umbraco metrics: ${t.statusText}`);
    return await t.json();
  }
  #o(e) {
    this.#n.forEach((t) => {
      try {
        t(e);
      } catch (s) {
        console.error("Error in metrics listener:", s);
      }
    });
  }
}
var gt = Object.defineProperty, ft = Object.getOwnPropertyDescriptor, we = (n) => {
  throw TypeError(n);
}, oe = (n, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? ft(e, t) : e, o = n.length - 1, a; o >= 0; o--)
    (a = n[o]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && gt(e, t, i), i;
}, pt = (n, e, t) => e.has(n) || we("Cannot " + t), _t = (n, e, t) => e.has(n) ? we("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), mt = (n, e, t) => (pt(n, e, "access private method"), t), K, Ce;
let z = class extends me(ge) {
  constructor() {
    super(...arguments), _t(this, K), this.isConnected = !1;
  }
  render() {
    return this.applicationInfo ? E`
      <div class="app-info-banner">
        <div class="info-item">
          <strong>Process:</strong> ${this.applicationInfo.processName} (PID: ${this.applicationInfo.processId})
        </div>
        <div class="info-item">
          <strong>Runtime:</strong> ${this.applicationInfo.runtimeVersion}
        </div>
        <div class="info-item">
          <strong>Architecture:</strong> ${this.applicationInfo.is64BitProcess ? "64-bit" : "32-bit"}
        </div>
        <div class="info-item">
          <strong>CPU Cores:</strong> ${this.applicationInfo.processorCount}
        </div>
        <div class="info-item">
          <strong>Uptime:</strong> ${mt(this, K, Ce).call(this, this.applicationInfo.uptimeSeconds)}
        </div>
        ${this.isConnected ? E`
          <div class="info-item connected">
            <uui-icon name="icon-check"></uui-icon>
            <strong>SignalR Connected</strong>
          </div>
        ` : ""}
      </div>
    ` : E``;
  }
};
K = /* @__PURE__ */ new WeakSet();
Ce = function(n) {
  const e = Math.floor(n / 86400), t = Math.floor(n % 86400 / 3600), s = Math.floor(n % 3600 / 60), i = Math.floor(n % 60);
  return `${e}d ${t}h ${s}m ${i}s`;
};
z.styles = fe`
    :host {
      display: block;
    }

    .app-info-banner {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1rem;
      background: var(--uui-color-surface-alt);
      border-radius: var(--uui-border-radius);
      margin-bottom: 1.5rem;
      border: 1px solid var(--uui-color-border);
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--uui-color-text);
    }

    .info-item strong {
      color: var(--uui-color-text-alt);
    }

    .info-item.connected {
      color: var(--uui-color-positive);
    }

    .info-item.connected strong {
      color: var(--uui-color-positive);
    }

    .info-item.connected uui-icon {
      color: var(--uui-color-positive);
    }
  `;
oe([
  pe({ type: Object })
], z.prototype, "applicationInfo", 2);
oe([
  pe({ type: Boolean })
], z.prototype, "isConnected", 2);
z = oe([
  _e("umbmetrics-app-info-banner")
], z);
const vt = ":host{display:grid;gap:var(--uui-size-layout-1);padding:var(--uui-size-layout-1);grid-template-columns:1fr 1fr 1fr}uui-box{margin-bottom:var(--uui-size-layout-1)}h2,h3{margin-top:0}.wide{grid-column:span 3}.metrics-controls{display:flex;gap:var(--uui-size-4);margin-bottom:var(--uui-size-6);align-items:center}.tab-navigation{display:flex;gap:.5rem;margin:1rem 0;border-bottom:2px solid var(--uui-color-border);padding-bottom:.5rem}.tab-content{margin-top:1.5rem}.metrics-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--uui-size-4)}.metric-card{text-align:center;padding:var(--uui-size-4)}.metric-card uui-icon{font-size:2rem;margin-bottom:var(--uui-size-2);opacity:.8}.metric-value{font-size:2rem;font-weight:700;margin:var(--uui-size-2) 0}.metric-value.positive{color:var(--uui-color-positive)}.metric-value.warning{color:var(--uui-color-warning)}.metric-value.danger{color:var(--uui-color-danger)}.metric-detail{font-size:.85rem;color:var(--uui-color-text-alt);margin-top:var(--uui-size-1)}.gc-stats{display:flex;justify-content:space-around;margin-top:var(--uui-size-4);flex-wrap:wrap;gap:var(--uui-size-4)}.gc-stats>div{text-align:center}.gc-label{font-size:.9rem;color:var(--uui-color-text-alt);margin-bottom:var(--uui-size-1)}.gc-value{font-size:1.2rem;font-weight:700;color:var(--uui-color-interactive)}.gc-details{display:flex;flex-direction:column;gap:var(--uui-size-2);text-align:left;padding:var(--uui-size-4)}.gc-detail-row{display:flex;justify-content:space-between;padding:var(--uui-size-3);background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius);align-items:center}.gc-detail-row span{color:var(--uui-color-text)}.gc-detail-row strong{color:var(--uui-color-interactive);font-weight:600}.span-2{grid-column:span 2}.span-4{grid-column:span 4}.connection-status{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1rem;border-radius:var(--uui-border-radius);font-size:.85rem;font-weight:600}.connection-status.connected{background:var(--uui-color-positive-emphasis);color:var(--uui-color-positive-contrast)}.connection-status.connecting{background:var(--uui-color-warning-emphasis);color:var(--uui-color-warning-contrast)}.umbraco-stats{display:flex;flex-direction:column;gap:.75rem;padding:.5rem 0}.stat-row{display:flex;justify-content:space-between;align-items:center;padding:.5rem 0;border-bottom:1px solid var(--uui-color-border)}.stat-row:last-child{border-bottom:none}.stat-row span{color:var(--uui-color-text-alt);font-size:.9rem}.stat-row strong{font-size:1.1rem;font-weight:600}.stat-row strong.positive{color:var(--uui-color-positive)}.stat-row strong.warning{color:var(--uui-color-warning)}.stat-row strong.danger{color:var(--uui-color-danger)}";
var bt = Object.defineProperty, wt = Object.getOwnPropertyDescriptor, Se = (n) => {
  throw TypeError(n);
}, U = (n, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? wt(e, t) : e, o = n.length - 1, a; o >= 0; o--)
    (a = n[o]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && bt(e, t, i), i;
}, re = (n, e, t) => e.has(n) || Se("Cannot " + t), d = (n, e, t) => (re(n, e, "read from private field"), t ? t.call(n) : e.get(n)), I = (n, e, t) => e.has(n) ? Se("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), A = (n, e, t, s) => (re(n, e, "write to private field"), e.set(n, t), t), _ = (n, e, t) => (re(n, e, "access private method"), t), y, O, C, P, V, J, f, Q, Y, Z, q, ee, v, N, te, ye, ke, Ee;
let $ = class extends me(ge) {
  constructor() {
    super(), I(this, f), this._autoRefresh = !1, this._activeTab = "overview", this._isConnected = !1, I(this, y), I(this, O), I(this, C), I(this, P), I(this, V, async (n) => {
      if (!d(this, C)) {
        console.error("Metrics service not initialized");
        return;
      }
      const e = n.target;
      e.state = "waiting";
      try {
        this._autoRefresh && d(this, C).isConnected ? (await d(this, C).requestMetrics(), _(this, f, Q).call(this)) : await Promise.all([
          d(this, J).call(this),
          _(this, f, Q).call(this)
        ]), e.state = "success";
      } catch (t) {
        console.error("Error refreshing metrics:", t), e.state = "failed";
      }
    }), I(this, J, async () => {
      if (!d(this, C)) {
        console.error("Metrics service not initialized");
        return;
      }
      try {
        this._performanceMetrics = await d(this, C).getPerformanceMetrics();
      } catch (n) {
        console.error("Error loading performance metrics:", n), d(this, y) && d(this, y).peek("danger", {
          data: {
            headline: "Error",
            message: n instanceof Error ? n.message : "Failed to load performance metrics"
          }
        });
      }
    }), I(this, Y, async () => {
      this._autoRefresh = !this._autoRefresh, this._autoRefresh ? await d(this, Z).call(this) : await d(this, q).call(this);
    }), I(this, Z, async () => {
      if (!d(this, C)) {
        console.error("Metrics service not initialized"), this._autoRefresh = !1;
        return;
      }
      try {
        d(this, y) && d(this, y).peek("default", {
          data: {
            headline: "Connecting...",
            message: "Establishing connection to metrics hub"
          }
        }), A(this, P, d(this, C).onMetricsUpdate((n) => {
          this._performanceMetrics = n, this._isConnected = !0;
        })), await d(this, C).connectToHub(), this._isConnected = d(this, C).isConnected, this._isConnected && d(this, y) && d(this, y).peek("positive", {
          data: {
            headline: "Connected",
            message: "Real-time metrics updates enabled"
          }
        });
      } catch (n) {
        console.error("Error starting auto-refresh:", n), this._autoRefresh = !1, this._isConnected = !1, d(this, y) && d(this, y).peek("danger", {
          data: {
            headline: "Connection Failed",
            message: n instanceof Error ? n.message : "Failed to connect to metrics hub. Try again."
          }
        }), d(this, P) && (d(this, P).call(this), A(this, P, void 0));
      }
    }), I(this, q, async () => {
      if (d(this, C))
        try {
          d(this, P) && (d(this, P).call(this), A(this, P, void 0)), await d(this, C).disconnectFromHub(), this._isConnected = !1, d(this, y) && d(this, y).peek("default", {
            data: {
              headline: "Disconnected",
              message: "Real-time updates disabled"
            }
          });
        } catch (n) {
          console.error("Error stopping auto-refresh:", n);
        }
    }), I(this, N, (n) => {
      this._activeTab = n;
    }), this.consumeContext(Te, (n) => {
      A(this, y, n);
    }), this.consumeContext($e, (n) => {
      this.observe(
        n?.currentUser,
        (e) => {
          this._contextCurrentUser = e;
        },
        "_contextCurrentUser"
      );
    }), this.consumeContext(Re, (n) => {
      A(this, O, n), A(this, C, new dt(async () => {
        const e = await d(this, O)?.getLatestToken();
        if (!e)
          throw new Error("No authentication token available");
        return e;
      }));
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), d(this, q).call(this);
  }
  render() {
    return E`
      <uui-box headline="Application Performance Metrics" class="wide">
        <div slot="header">[.NET 10 Application - Real-time Metrics${this._contextCurrentUser?.name ? ` - ${this._contextCurrentUser.name}` : ""}]</div>

        <div class="metrics-controls">
          <uui-button color="default" look="primary" @click="${d(this, V)}">
            <uui-icon name="icon-refresh"></uui-icon> Refresh Metrics
          </uui-button>

          <uui-toggle
            label="Real-time Updates (SignalR)"
            .checked="${this._autoRefresh}"
            @change="${d(this, Y)}"
          ></uui-toggle>

          ${this._isConnected ? E`
            <span class="connection-status connected">
              <uui-icon name="icon-check"></uui-icon> Connected
            </span>
          ` : this._autoRefresh ? E`
            <span class="connection-status connecting">
              <uui-icon name="icon-time"></uui-icon> Connecting...
            </span>
          ` : ""}
        </div>

        <!-- Custom Tab Navigation -->
        <div class="tab-navigation">
          <uui-button 
            look="${this._activeTab === "overview" ? "primary" : "default"}"
            color="${this._activeTab === "overview" ? "positive" : "default"}"
            @click="${() => d(this, N).call(this, "overview")}"
          >
            <uui-icon name="icon-chart"></uui-icon> Overview
          </uui-button>
          <uui-button 
            look="${this._activeTab === "heap" ? "primary" : "default"}"
            color="${this._activeTab === "heap" ? "positive" : "default"}"
            @click="${() => d(this, N).call(this, "heap")}"
          >
            <uui-icon name="icon-box"></uui-icon> Heap & GC
          </uui-button>
          <uui-button 
            look="${this._activeTab === "umbraco" ? "primary" : "default"}"
            color="${this._activeTab === "umbraco" ? "positive" : "default"}"
            @click="${() => d(this, N).call(this, "umbraco")}"
          >
            <uui-icon name="icon-umbraco"></uui-icon> Umbraco
          </uui-button>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          ${_(this, f, Ee).call(this)}
        </div>
      </uui-box>
    `;
  }
};
y = /* @__PURE__ */ new WeakMap();
O = /* @__PURE__ */ new WeakMap();
C = /* @__PURE__ */ new WeakMap();
P = /* @__PURE__ */ new WeakMap();
V = /* @__PURE__ */ new WeakMap();
J = /* @__PURE__ */ new WeakMap();
f = /* @__PURE__ */ new WeakSet();
Q = async function() {
  if (!d(this, C)) {
    console.error("Metrics service not initialized");
    return;
  }
  try {
    this._umbracoMetrics = await d(this, C).getUmbracoMetrics();
  } catch (n) {
    console.error("Error loading Umbraco metrics:", n), d(this, y) && d(this, y).peek("danger", {
      data: {
        headline: "Error",
        message: n instanceof Error ? n.message : "Failed to load Umbraco metrics"
      }
    });
  }
};
Y = /* @__PURE__ */ new WeakMap();
Z = /* @__PURE__ */ new WeakMap();
q = /* @__PURE__ */ new WeakMap();
ee = function(n, e) {
  return n > e ? "danger" : n > e * 0.7 ? "warning" : "positive";
};
v = function(n) {
  return n.toLocaleString();
};
N = /* @__PURE__ */ new WeakMap();
te = function() {
  return this._performanceMetrics ? E`
      <!-- Application Info Banner Component -->
      <umbmetrics-app-info-banner
        .applicationInfo=${this._performanceMetrics.applicationInfo}
        .isConnected=${this._isConnected}
      ></umbmetrics-app-info-banner>

      <div class="metrics-grid">
        <!-- CPU Usage -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-dashboard"></uui-icon>
            <h3>CPU Usage</h3>
            <div class="metric-value ${_(this, f, ee).call(this, this._performanceMetrics.cpuUsage, 80)}">
              ${this._performanceMetrics.cpuUsage.toFixed(1)}%
            </div>
            <div class="metric-detail">Process CPU</div>
          </div>
        </uui-box>

        <!-- Memory Usage -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-memory"></uui-icon>
            <h3>Working Set</h3>
            <div class="metric-value">
              ${this._performanceMetrics.memoryUsage.workingSetMB.toFixed(0)} MB
            </div>
            <div class="metric-detail">
              Private: ${this._performanceMetrics.memoryUsage.privateMemoryMB.toFixed(0)} MB
            </div>
          </div>
        </uui-box>

        <!-- Requests Per Second -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-activity"></uui-icon>
            <h3>Requests/Sec</h3>
            <div class="metric-value">
              ${this._performanceMetrics.requestMetrics.requestsPerSecond.toFixed(2)}
            </div>
            <div class="metric-detail">
              Last min: ${this._performanceMetrics.requestMetrics.lastMinuteRequests}
            </div>
          </div>
        </uui-box>

        <!-- Response Time -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-timer"></uui-icon>
            <h3>Avg Response</h3>
            <div class="metric-value ${_(this, f, ee).call(this, this._performanceMetrics.requestMetrics.averageResponseTimeMs, 1e3)}">
              ${this._performanceMetrics.requestMetrics.averageResponseTimeMs.toFixed(0)} ms
            </div>
            <div class="metric-detail">Last 1000 requests</div>
          </div>
        </uui-box>

        <!-- Active Requests -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-link"></uui-icon>
            <h3>Active Requests</h3>
            <div class="metric-value">
              ${this._performanceMetrics.requestMetrics.activeRequests}
            </div>
            <div class="metric-detail">
              Total: ${_(this, f, v).call(this, this._performanceMetrics.requestMetrics.totalRequests)}
            </div>
          </div>
        </uui-box>

        <!-- Failed Requests -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-alert"></uui-icon>
            <h3>Failed Requests</h3>
            <div class="metric-value ${this._performanceMetrics.requestMetrics.failedRequests > 0 ? "danger" : "positive"}">
              ${_(this, f, v).call(this, this._performanceMetrics.requestMetrics.failedRequests)}
            </div>
            <div class="metric-detail">4xx/5xx responses</div>
          </div>
        </uui-box>

        <!-- Thread Count -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-nodes"></uui-icon>
            <h3>Threads</h3>
            <div class="metric-value">
              ${this._performanceMetrics.threadInfo.threadCount}
            </div>
            <div class="metric-detail">
              Pool: ${this._performanceMetrics.threadInfo.threadPoolThreadCount}
            </div>
          </div>
        </uui-box>

        <!-- Thread Pool Work Items -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-list"></uui-icon>
            <h3>Work Items</h3>
            <div class="metric-value">
              ${this._performanceMetrics.threadInfo.pendingWorkItemCount}
            </div>
            <div class="metric-detail">
              Completed: ${_(this, f, v).call(this, this._performanceMetrics.threadInfo.completedWorkItemCount)}
            </div>
          </div>
        </uui-box>

        <!-- Timestamp -->
        <uui-box class="span-4">
          <div class="metric-card">
            <uui-icon name="icon-calendar"></uui-icon>
            <h3>Last Updated</h3>
            <div class="metric-detail">
              ${new Date(this._performanceMetrics.timestamp).toLocaleString()}
            </div>
          </div>
        </uui-box>
      </div>
    ` : E`<p>Click "Refresh Metrics" to load application performance data</p>`;
};
ye = function() {
  return this._performanceMetrics ? E`
      <div class="metrics-grid">
        <!-- GC Heap Sizes -->
        <uui-box class="span-2">
          <div class="metric-card">
            <uui-icon name="icon-box"></uui-icon>
            <h3>GC Heap Sizes</h3>
            <div class="gc-stats">
              <div>
                <div class="gc-label">Gen 0</div>
                <div class="gc-value">${this._performanceMetrics.memoryUsage.gcGen0HeapSizeMB.toFixed(2)} MB</div>
              </div>
              <div>
                <div class="gc-label">Gen 1</div>
                <div class="gc-value">${this._performanceMetrics.memoryUsage.gcGen1HeapSizeMB.toFixed(2)} MB</div>
              </div>
              <div>
                <div class="gc-label">Gen 2</div>
                <div class="gc-value">${this._performanceMetrics.memoryUsage.gcGen2HeapSizeMB.toFixed(2)} MB</div>
              </div>
            </div>
          </div>
        </uui-box>

        <!-- GC Collections -->
        <uui-box class="span-2">
          <div class="metric-card">
            <uui-icon name="icon-trash"></uui-icon>
            <h3>GC Collections</h3>
            <div class="gc-stats">
              <div>
                <div class="gc-label">Gen 0</div>
                <div class="gc-value">${_(this, f, v).call(this, this._performanceMetrics.garbageCollectionStats.gen0Collections)}</div>
              </div>
              <div>
                <div class="gc-label">Gen 1</div>
                <div class="gc-value">${_(this, f, v).call(this, this._performanceMetrics.garbageCollectionStats.gen1Collections)}</div>
              </div>
              <div>
                <div class="gc-label">Gen 2</div>
                <div class="gc-value">${_(this, f, v).call(this, this._performanceMetrics.garbageCollectionStats.gen2Collections)}</div>
              </div>
            </div>
          </div>
        </uui-box>

        <!-- GC Memory Details -->
        <uui-box class="span-4">
          <div class="metric-card">
            <uui-icon name="icon-chart"></uui-icon>
            <h3>Garbage Collector Details</h3>
            <div class="gc-details">
              <div class="gc-detail-row">
                <span>GC Mode:</span>
                <strong>${this._performanceMetrics.garbageCollectionStats.isServerGC ? "Server" : "Workstation"}</strong>
              </div>
              <div class="gc-detail-row">
                <span>Total Heap Size:</span>
                <strong>${this._performanceMetrics.memoryUsage.totalHeapSizeMB.toFixed(2)} MB</strong>
              </div>
              <div class="gc-detail-row">
                <span>Fragmented Memory:</span>
                <strong>${this._performanceMetrics.memoryUsage.fragmentedMemoryMB.toFixed(2)} MB</strong>
              </div>
              <div class="gc-detail-row">
                <span>Memory Load:</span>
                <strong>${this._performanceMetrics.garbageCollectionStats.memoryLoadMB.toFixed(2)} MB</strong>
              </div>
              <div class="gc-detail-row">
                <span>High Memory Threshold:</span>
                <strong>${this._performanceMetrics.garbageCollectionStats.highMemoryLoadThresholdMB.toFixed(2)} MB</strong>
              </div>
              <div class="gc-detail-row">
                <span>Latency Mode:</span>
                <strong>${this._performanceMetrics.garbageCollectionStats.gcLatencyMode}</strong>
              </div>
              <div class="gc-detail-row">
                <span>Total Pause Time:</span>
                <strong>${this._performanceMetrics.garbageCollectionStats.totalPauseTimeMs.toFixed(2)} ms</strong>
              </div>
            </div>
          </div>
        </uui-box>
      </div>
    ` : E`<p>Click "Refresh Metrics" to load heap information</p>`;
};
ke = function() {
  if (!this._umbracoMetrics)
    return E`<p>Click "Refresh Metrics" to load Umbraco-specific data</p>`;
  const n = this._umbracoMetrics;
  return E`
      <div class="metrics-grid">
        <!-- Content Statistics -->
        <uui-box class="span-2">
          <div class="metric-card">
            <uui-icon name="icon-document"></uui-icon>
            <h3>Content Statistics</h3>
            <div class="umbraco-stats">
              <div class="stat-row">
                <span>Total Nodes:</span>
                <strong>${_(this, f, v).call(this, n.contentStatistics.totalContentNodes)}</strong>
              </div>
              <div class="stat-row">
                <span>Published:</span>
                <strong class="positive">${_(this, f, v).call(this, n.contentStatistics.publishedNodes)}</strong>
              </div>
              <div class="stat-row">
                <span>Unpublished:</span>
                <strong class="warning">${_(this, f, v).call(this, n.contentStatistics.unpublishedNodes)}</strong>
              </div>
              <div class="stat-row">
                <span>Trashed:</span>
                <strong class="${n.contentStatistics.trashedNodes > 0 ? "danger" : "positive"}">
                  ${_(this, f, v).call(this, n.contentStatistics.trashedNodes)}
                </strong>
              </div>
              <div class="stat-row">
                <span>Content Types:</span>
                <strong>${n.contentStatistics.contentTypeCount}</strong>
              </div>
            </div>
          </div>
        </uui-box>

        <!-- Media Statistics -->
        <uui-box class="span-2">
          <div class="metric-card">
            <uui-icon name="icon-picture"></uui-icon>
            <h3>Media Library</h3>
            <div class="umbraco-stats">
              <div class="stat-row">
                <span>Total Items:</span>
                <strong>${_(this, f, v).call(this, n.mediaStatistics.totalMediaItems)}</strong>
              </div>
              <div class="stat-row">
                <span>Total Size:</span>
                <strong>${n.mediaStatistics.totalMediaSizeMB.toFixed(2)} MB</strong>
              </div>
              <div class="stat-row">
                <span>Images:</span>
                <strong>${_(this, f, v).call(this, n.mediaStatistics.imagesCount)}</strong>
              </div>
              <div class="stat-row">
                <span>Documents:</span>
                <strong>${_(this, f, v).call(this, n.mediaStatistics.documentsCount)}</strong>
              </div>
              <div class="stat-row">
                <span>Media Types:</span>
                <strong>${n.mediaStatistics.mediaTypeCount}</strong>
              </div>
            </div>
          </div>
        </uui-box>

        <!-- Cache Statistics -->
        <uui-box class="span-2">
          <div class="metric-card">
            <uui-icon name="icon-server-alt"></uui-icon>
            <h3>Cache Performance</h3>
            <div class="umbraco-stats">
              <div class="stat-row">
                <span>Runtime Cache:</span>
                <strong>${_(this, f, v).call(this, n.cacheStatistics.runtimeCacheCount)} items</strong>
              </div>
              <div class="stat-row">
                <span>NuCache:</span>
                <strong>${_(this, f, v).call(this, n.cacheStatistics.nuCacheCount)} items</strong>
              </div>
              <div class="stat-row">
                <span>Total Size:</span>
                <strong>${n.cacheStatistics.totalCacheSize}</strong>
              </div>
            </div>
          </div>
        </uui-box>

        <!-- Backoffice Users -->
        <uui-box class="span-2">
          <div class="metric-card">
            <uui-icon name="icon-users"></uui-icon>
            <h3>Backoffice Users</h3>
            <div class="umbraco-stats">
              <div class="stat-row">
                <span>Total Users:</span>
                <strong>${_(this, f, v).call(this, n.backofficeUsers.totalUsers)}</strong>
              </div>
              <div class="stat-row">
                <span>Active Users:</span>
                <strong class="positive">${_(this, f, v).call(this, n.backofficeUsers.activeUsers)}</strong>
              </div>
              <div class="stat-row">
                <span>Administrators:</span>
                <strong>${_(this, f, v).call(this, n.backofficeUsers.adminUsers)}</strong>
              </div>
              <div class="stat-row">
                <span>Current Sessions:</span>
                <strong class="${n.backofficeUsers.currentSessions > 0 ? "positive" : "default"}">
                  ${_(this, f, v).call(this, n.backofficeUsers.currentSessions)}
                </strong>
              </div>
            </div>
          </div>
        </uui-box>
      </div>
    `;
};
Ee = function() {
  switch (this._activeTab) {
    case "overview":
      return _(this, f, te).call(this);
    case "heap":
      return _(this, f, ye).call(this);
    case "umbraco":
      return _(this, f, ke).call(this);
    default:
      return _(this, f, te).call(this);
  }
};
$.styles = fe`${Ie(vt)}`;
U([
  B()
], $.prototype, "_contextCurrentUser", 2);
U([
  B()
], $.prototype, "_performanceMetrics", 2);
U([
  B()
], $.prototype, "_autoRefresh", 2);
U([
  B()
], $.prototype, "_activeTab", 2);
U([
  B()
], $.prototype, "_isConnected", 2);
U([
  B()
], $.prototype, "_umbracoMetrics", 2);
$ = U([
  _e("umbmetrics-dashboard")
], $);
const Tt = $;
export {
  $ as ExampleDashboardElement,
  Tt as default
};
//# sourceMappingURL=dashboard.element-r8UkBARs.js.map
