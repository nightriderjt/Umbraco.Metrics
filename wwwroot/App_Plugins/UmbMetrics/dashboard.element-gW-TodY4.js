import { LitElement as fe, html as P, unsafeCSS as pe, css as _e, state as N, customElement as me } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as ve } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT as we } from "@umbraco-cms/backoffice/notification";
import { UMB_CURRENT_USER_CONTEXT as be } from "@umbraco-cms/backoffice/current-user";
import { UMB_AUTH_CONTEXT as Ce } from "@umbraco-cms/backoffice/auth";
class M extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.HttpError}.
   *
   * @param {string} errorMessage A descriptive error message.
   * @param {number} statusCode The HTTP status code represented by this error.
   */
  constructor(e, t) {
    const n = new.target.prototype;
    super(`${e}: Status code '${t}'`), this.statusCode = t, this.__proto__ = n;
  }
}
class Y extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.TimeoutError}.
   *
   * @param {string} errorMessage A descriptive error message.
   */
  constructor(e = "A timeout occurred.") {
    const t = new.target.prototype;
    super(e), this.__proto__ = t;
  }
}
class E extends Error {
  /** Constructs a new instance of {@link AbortError}.
   *
   * @param {string} errorMessage A descriptive error message.
   */
  constructor(e = "An abort occurred.") {
    const t = new.target.prototype;
    super(e), this.__proto__ = t;
  }
}
class Se extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.UnsupportedTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(e, t) {
    const n = new.target.prototype;
    super(e), this.transport = t, this.errorType = "UnsupportedTransportError", this.__proto__ = n;
  }
}
class ye extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.DisabledTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(e, t) {
    const n = new.target.prototype;
    super(e), this.transport = t, this.errorType = "DisabledTransportError", this.__proto__ = n;
  }
}
class ke extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.FailedToStartTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(e, t) {
    const n = new.target.prototype;
    super(e), this.transport = t, this.errorType = "FailedToStartTransportError", this.__proto__ = n;
  }
}
class oe extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.FailedToNegotiateWithServerError}.
   *
   * @param {string} message A descriptive error message.
   */
  constructor(e) {
    const t = new.target.prototype;
    super(e), this.errorType = "FailedToNegotiateWithServerError", this.__proto__ = t;
  }
}
class Ee extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.AggregateErrors}.
   *
   * @param {string} message A descriptive error message.
   * @param {Error[]} innerErrors The collection of errors this error is aggregating.
   */
  constructor(e, t) {
    const n = new.target.prototype;
    super(e), this.innerErrors = t, this.__proto__ = n;
  }
}
class ce {
  constructor(e, t, n) {
    this.statusCode = e, this.statusText = t, this.content = n;
  }
}
class j {
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
(function(o) {
  o[o.Trace = 0] = "Trace", o[o.Debug = 1] = "Debug", o[o.Information = 2] = "Information", o[o.Warning = 3] = "Warning", o[o.Error = 4] = "Error", o[o.Critical = 5] = "Critical", o[o.None = 6] = "None";
})(r || (r = {}));
class B {
  constructor() {
  }
  /** @inheritDoc */
  // eslint-disable-next-line
  log(e, t) {
  }
}
B.instance = new B();
const Ie = "10.0.0";
class _ {
  static isRequired(e, t) {
    if (e == null)
      throw new Error(`The '${t}' argument is required.`);
  }
  static isNotEmpty(e, t) {
    if (!e || e.match(/^\s*$/))
      throw new Error(`The '${t}' argument should not be empty.`);
  }
  static isIn(e, t, n) {
    if (!(e in t))
      throw new Error(`Unknown ${n} value: ${e}.`);
  }
}
class p {
  // react-native has a window but no document so we should check both
  static get isBrowser() {
    return !p.isNode && typeof window == "object" && typeof window.document == "object";
  }
  // WebWorkers don't have a window object so the isBrowser check would fail
  static get isWebWorker() {
    return !p.isNode && typeof self == "object" && "importScripts" in self;
  }
  // react-native has a window but no document
  static get isReactNative() {
    return !p.isNode && typeof window == "object" && typeof window.document > "u";
  }
  // Node apps shouldn't have a window object, but WebWorkers don't either
  // so we need to check for both WebWorker and window
  static get isNode() {
    return typeof process < "u" && process.release && process.release.name === "node";
  }
}
function W(o, e) {
  let t = "";
  return D(o) ? (t = `Binary data of length ${o.byteLength}`, e && (t += `. Content: '${Te(o)}'`)) : typeof o == "string" && (t = `String data of length ${o.length}`, e && (t += `. Content: '${o}'`)), t;
}
function Te(o) {
  const e = new Uint8Array(o);
  let t = "";
  return e.forEach((n) => {
    const i = n < 16 ? "0" : "";
    t += `0x${i}${n.toString(16)} `;
  }), t.substring(0, t.length - 1);
}
function D(o) {
  return o && typeof ArrayBuffer < "u" && (o instanceof ArrayBuffer || // Sometimes we get an ArrayBuffer that doesn't satisfy instanceof
  o.constructor && o.constructor.name === "ArrayBuffer");
}
async function le(o, e, t, n, i, s) {
  const a = {}, [c, l] = U();
  a[c] = l, o.log(r.Trace, `(${e} transport) sending data. ${W(i, s.logMessageContent)}.`);
  const u = D(i) ? "arraybuffer" : "text", d = await t.post(n, {
    content: i,
    headers: { ...a, ...s.headers },
    responseType: u,
    timeout: s.timeout,
    withCredentials: s.withCredentials
  });
  o.log(r.Trace, `(${e} transport) request complete. Response status: ${d.statusCode}.`);
}
function Re(o) {
  return o === void 0 ? new O(r.Information) : o === null ? B.instance : o.log !== void 0 ? o : new O(o);
}
class Pe {
  constructor(e, t) {
    this._subject = e, this._observer = t;
  }
  dispose() {
    const e = this._subject.observers.indexOf(this._observer);
    e > -1 && this._subject.observers.splice(e, 1), this._subject.observers.length === 0 && this._subject.cancelCallback && this._subject.cancelCallback().catch((t) => {
    });
  }
}
class O {
  constructor(e) {
    this._minLevel = e, this.out = console;
  }
  log(e, t) {
    if (e >= this._minLevel) {
      const n = `[${(/* @__PURE__ */ new Date()).toISOString()}] ${r[e]}: ${t}`;
      switch (e) {
        case r.Critical:
        case r.Error:
          this.out.error(n);
          break;
        case r.Warning:
          this.out.warn(n);
          break;
        case r.Information:
          this.out.info(n);
          break;
        default:
          this.out.log(n);
          break;
      }
    }
  }
}
function U() {
  let o = "X-SignalR-User-Agent";
  return p.isNode && (o = "User-Agent"), [o, Me(Ie, $e(), De(), xe())];
}
function Me(o, e, t, n) {
  let i = "Microsoft SignalR/";
  const s = o.split(".");
  return i += `${s[0]}.${s[1]}`, i += ` (${o}; `, e && e !== "" ? i += `${e}; ` : i += "Unknown OS; ", i += `${t}`, n ? i += `; ${n}` : i += "; Unknown Runtime Version", i += ")", i;
}
function $e() {
  if (p.isNode)
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
function xe() {
  if (p.isNode)
    return process.versions.node;
}
function De() {
  return p.isNode ? "NodeJS" : "Browser";
}
function G(o) {
  return o.stack ? o.stack : o.message ? o.message : `${o}`;
}
function Ae() {
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
class Ue extends j {
  constructor(e) {
    if (super(), this._logger = e, typeof fetch > "u" || p.isNode) {
      const t = typeof __webpack_require__ == "function" ? __non_webpack_require__ : require;
      this._jar = new (t("tough-cookie")).CookieJar(), typeof fetch > "u" ? this._fetchType = t("node-fetch") : this._fetchType = fetch, this._fetchType = t("fetch-cookie")(this._fetchType, this._jar);
    } else
      this._fetchType = fetch.bind(Ae());
    if (typeof AbortController > "u") {
      const t = typeof __webpack_require__ == "function" ? __non_webpack_require__ : require;
      this._abortControllerType = t("abort-controller");
    } else
      this._abortControllerType = AbortController;
  }
  /** @inheritDoc */
  async send(e) {
    if (e.abortSignal && e.abortSignal.aborted)
      throw new E();
    if (!e.method)
      throw new Error("No method defined.");
    if (!e.url)
      throw new Error("No url defined.");
    const t = new this._abortControllerType();
    let n;
    e.abortSignal && (e.abortSignal.onabort = () => {
      t.abort(), n = new E();
    });
    let i = null;
    if (e.timeout) {
      const l = e.timeout;
      i = setTimeout(() => {
        t.abort(), this._logger.log(r.Warning, "Timeout from HTTP request."), n = new Y();
      }, l);
    }
    e.content === "" && (e.content = void 0), e.content && (e.headers = e.headers || {}, D(e.content) ? e.headers["Content-Type"] = "application/octet-stream" : e.headers["Content-Type"] = "text/plain;charset=UTF-8");
    let s;
    try {
      s = await this._fetchType(e.url, {
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
      throw n || (this._logger.log(r.Warning, `Error from HTTP request. ${l}.`), l);
    } finally {
      i && clearTimeout(i), e.abortSignal && (e.abortSignal.onabort = null);
    }
    if (!s.ok) {
      const l = await ie(s, "text");
      throw new M(l || s.statusText, s.status);
    }
    const c = await ie(s, e.responseType);
    return new ce(s.status, s.statusText, c);
  }
  getCookieString(e) {
    let t = "";
    return p.isNode && this._jar && this._jar.getCookies(e, (n, i) => t = i.join("; ")), t;
  }
}
function ie(o, e) {
  let t;
  switch (e) {
    case "arraybuffer":
      t = o.arrayBuffer();
      break;
    case "text":
      t = o.text();
      break;
    case "blob":
    case "document":
    case "json":
      throw new Error(`${e} is not supported.`);
    default:
      t = o.text();
      break;
  }
  return t;
}
class He extends j {
  constructor(e) {
    super(), this._logger = e;
  }
  /** @inheritDoc */
  send(e) {
    return e.abortSignal && e.abortSignal.aborted ? Promise.reject(new E()) : e.method ? e.url ? new Promise((t, n) => {
      const i = new XMLHttpRequest();
      i.open(e.method, e.url, !0), i.withCredentials = e.withCredentials === void 0 ? !0 : e.withCredentials, i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), e.content === "" && (e.content = void 0), e.content && (D(e.content) ? i.setRequestHeader("Content-Type", "application/octet-stream") : i.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"));
      const s = e.headers;
      s && Object.keys(s).forEach((a) => {
        i.setRequestHeader(a, s[a]);
      }), e.responseType && (i.responseType = e.responseType), e.abortSignal && (e.abortSignal.onabort = () => {
        i.abort(), n(new E());
      }), e.timeout && (i.timeout = e.timeout), i.onload = () => {
        e.abortSignal && (e.abortSignal.onabort = null), i.status >= 200 && i.status < 300 ? t(new ce(i.status, i.statusText, i.response || i.responseText)) : n(new M(i.response || i.responseText || i.statusText, i.status));
      }, i.onerror = () => {
        this._logger.log(r.Warning, `Error from HTTP request. ${i.status}: ${i.statusText}.`), n(new M(i.statusText, i.status));
      }, i.ontimeout = () => {
        this._logger.log(r.Warning, "Timeout from HTTP request."), n(new Y());
      }, i.send(e.content);
    }) : Promise.reject(new Error("No url defined.")) : Promise.reject(new Error("No method defined."));
  }
}
class Be extends j {
  /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
  constructor(e) {
    if (super(), typeof fetch < "u" || p.isNode)
      this._httpClient = new Ue(e);
    else if (typeof XMLHttpRequest < "u")
      this._httpClient = new He(e);
    else
      throw new Error("No usable HttpClient found.");
  }
  /** @inheritDoc */
  send(e) {
    return e.abortSignal && e.abortSignal.aborted ? Promise.reject(new E()) : e.method ? e.url ? this._httpClient.send(e) : Promise.reject(new Error("No url defined.")) : Promise.reject(new Error("No method defined."));
  }
  getCookieString(e) {
    return this._httpClient.getCookieString(e);
  }
}
class S {
  static write(e) {
    return `${e}${S.RecordSeparator}`;
  }
  static parse(e) {
    if (e[e.length - 1] !== S.RecordSeparator)
      throw new Error("Message is incomplete.");
    const t = e.split(S.RecordSeparator);
    return t.pop(), t;
  }
}
S.RecordSeparatorCode = 30;
S.RecordSeparator = String.fromCharCode(S.RecordSeparatorCode);
class We {
  // Handshake request is always JSON
  writeHandshakeRequest(e) {
    return S.write(JSON.stringify(e));
  }
  parseHandshakeResponse(e) {
    let t, n;
    if (D(e)) {
      const c = new Uint8Array(e), l = c.indexOf(S.RecordSeparatorCode);
      if (l === -1)
        throw new Error("Message is incomplete.");
      const u = l + 1;
      t = String.fromCharCode.apply(null, Array.prototype.slice.call(c.slice(0, u))), n = c.byteLength > u ? c.slice(u).buffer : null;
    } else {
      const c = e, l = c.indexOf(S.RecordSeparator);
      if (l === -1)
        throw new Error("Message is incomplete.");
      const u = l + 1;
      t = c.substring(0, u), n = c.length > u ? c.substring(u) : null;
    }
    const i = S.parse(t), s = JSON.parse(i[0]);
    if (s.type)
      throw new Error("Expected a handshake response from the server.");
    return [n, s];
  }
}
var h;
(function(o) {
  o[o.Invocation = 1] = "Invocation", o[o.StreamItem = 2] = "StreamItem", o[o.Completion = 3] = "Completion", o[o.StreamInvocation = 4] = "StreamInvocation", o[o.CancelInvocation = 5] = "CancelInvocation", o[o.Ping = 6] = "Ping", o[o.Close = 7] = "Close", o[o.Ack = 8] = "Ack", o[o.Sequence = 9] = "Sequence";
})(h || (h = {}));
class Ne {
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
    return this.observers.push(e), new Pe(this, e);
  }
}
class Le {
  constructor(e, t, n) {
    this._bufferSize = 1e5, this._messages = [], this._totalMessageCount = 0, this._waitForSequenceMessage = !1, this._nextReceivingSequenceId = 1, this._latestReceivedSequenceId = 0, this._bufferedByteCount = 0, this._reconnectInProgress = !1, this._protocol = e, this._connection = t, this._bufferSize = n;
  }
  async _send(e) {
    const t = this._protocol.writeMessage(e);
    let n = Promise.resolve();
    if (this._isInvocationMessage(e)) {
      this._totalMessageCount++;
      let i = () => {
      }, s = () => {
      };
      D(t) ? this._bufferedByteCount += t.byteLength : this._bufferedByteCount += t.length, this._bufferedByteCount >= this._bufferSize && (n = new Promise((a, c) => {
        i = a, s = c;
      })), this._messages.push(new ze(t, this._totalMessageCount, i, s));
    }
    try {
      this._reconnectInProgress || await this._connection.send(t);
    } catch {
      this._disconnected();
    }
    await n;
  }
  _ack(e) {
    let t = -1;
    for (let n = 0; n < this._messages.length; n++) {
      const i = this._messages[n];
      if (i._id <= e.sequenceId)
        t = n, D(i._message) ? this._bufferedByteCount -= i._message.byteLength : this._bufferedByteCount -= i._message.length, i._resolver();
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
    for (const n of t)
      await this._connection.send(n._message);
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
class ze {
  constructor(e, t, n, i) {
    this._message = e, this._id = t, this._resolver = n, this._rejector = i;
  }
}
const Fe = 30 * 1e3, qe = 15 * 1e3, Oe = 1e5;
var f;
(function(o) {
  o.Disconnected = "Disconnected", o.Connecting = "Connecting", o.Connected = "Connected", o.Disconnecting = "Disconnecting", o.Reconnecting = "Reconnecting";
})(f || (f = {}));
class Z {
  /** @internal */
  // Using a public static factory method means we can have a private constructor and an _internal_
  // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
  // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
  // public parameter-less constructor.
  static create(e, t, n, i, s, a, c) {
    return new Z(e, t, n, i, s, a, c);
  }
  constructor(e, t, n, i, s, a, c) {
    this._nextKeepAlive = 0, this._freezeEventListener = () => {
      this._logger.log(r.Warning, "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep");
    }, _.isRequired(e, "connection"), _.isRequired(t, "logger"), _.isRequired(n, "protocol"), this.serverTimeoutInMilliseconds = s ?? Fe, this.keepAliveIntervalInMilliseconds = a ?? qe, this._statefulReconnectBufferSize = c ?? Oe, this._logger = t, this._protocol = n, this.connection = e, this._reconnectPolicy = i, this._handshakeProtocol = new We(), this.connection.onreceive = (l) => this._processIncomingData(l), this.connection.onclose = (l) => this._connectionClosed(l), this._callbacks = {}, this._methods = {}, this._closedCallbacks = [], this._reconnectingCallbacks = [], this._reconnectedCallbacks = [], this._invocationId = 0, this._receivedHandshakeResponse = !1, this._connectionState = f.Disconnected, this._connectionStarted = !1, this._cachedPingMessage = this._protocol.writeMessage({ type: h.Ping });
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
    if (this._connectionState !== f.Disconnected && this._connectionState !== f.Reconnecting)
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
    if (this._connectionState !== f.Disconnected)
      return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));
    this._connectionState = f.Connecting, this._logger.log(r.Debug, "Starting HubConnection.");
    try {
      await this._startInternal(), p.isBrowser && window.document.addEventListener("freeze", this._freezeEventListener), this._connectionState = f.Connected, this._connectionStarted = !0, this._logger.log(r.Debug, "HubConnection connected successfully.");
    } catch (e) {
      return this._connectionState = f.Disconnected, this._logger.log(r.Debug, `HubConnection failed to start successfully because of error '${e}'.`), Promise.reject(e);
    }
  }
  async _startInternal() {
    this._stopDuringStartError = void 0, this._receivedHandshakeResponse = !1;
    const e = new Promise((t, n) => {
      this._handshakeResolver = t, this._handshakeRejecter = n;
    });
    await this.connection.start(this._protocol.transferFormat);
    try {
      let t = this._protocol.version;
      this.connection.features.reconnect || (t = 1);
      const n = {
        protocol: this._protocol.name,
        version: t
      };
      if (this._logger.log(r.Debug, "Sending handshake request."), await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(n)), this._logger.log(r.Information, `Using HubProtocol '${this._protocol.name}'.`), this._cleanupTimeout(), this._resetTimeoutPeriod(), this._resetKeepAliveInterval(), await e, this._stopDuringStartError)
        throw this._stopDuringStartError;
      this.connection.features.reconnect && (this._messageBuffer = new Le(this._protocol, this.connection, this._statefulReconnectBufferSize), this.connection.features.disconnected = this._messageBuffer._disconnected.bind(this._messageBuffer), this.connection.features.resend = () => {
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
    if (this._connectionState === f.Disconnected)
      return this._logger.log(r.Debug, `Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`), Promise.resolve();
    if (this._connectionState === f.Disconnecting)
      return this._logger.log(r.Debug, `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`), this._stopPromise;
    const t = this._connectionState;
    return this._connectionState = f.Disconnecting, this._logger.log(r.Debug, "Stopping HubConnection."), this._reconnectDelayHandle ? (this._logger.log(r.Debug, "Connection stopped during reconnect delay. Done reconnecting."), clearTimeout(this._reconnectDelayHandle), this._reconnectDelayHandle = void 0, this._completeClose(), Promise.resolve()) : (t === f.Connected && this._sendCloseMessage(), this._cleanupTimeout(), this._cleanupPingTimer(), this._stopDuringStartError = e || new E("The connection was stopped before the hub handshake could complete."), this.connection.stop(e));
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
    const [n, i] = this._replaceStreamingParams(t), s = this._createStreamInvocation(e, t, i);
    let a;
    const c = new Ne();
    return c.cancelCallback = () => {
      const l = this._createCancelInvocation(s.invocationId);
      return delete this._callbacks[s.invocationId], a.then(() => this._sendWithProtocol(l));
    }, this._callbacks[s.invocationId] = (l, u) => {
      if (u) {
        c.error(u);
        return;
      } else l && (l.type === h.Completion ? l.error ? c.error(new Error(l.error)) : c.complete() : c.next(l.item));
    }, a = this._sendWithProtocol(s).catch((l) => {
      c.error(l), delete this._callbacks[s.invocationId];
    }), this._launchStreams(n, a), c;
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
    const [n, i] = this._replaceStreamingParams(t), s = this._sendWithProtocol(this._createInvocation(e, t, !0, i));
    return this._launchStreams(n, s), s;
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
    const [n, i] = this._replaceStreamingParams(t), s = this._createInvocation(e, t, !1, i);
    return new Promise((c, l) => {
      this._callbacks[s.invocationId] = (d, I) => {
        if (I) {
          l(I);
          return;
        } else d && (d.type === h.Completion ? d.error ? l(new Error(d.error)) : c(d.result) : l(new Error(`Unexpected message type: ${d.type}`)));
      };
      const u = this._sendWithProtocol(s).catch((d) => {
        l(d), delete this._callbacks[s.invocationId];
      });
      this._launchStreams(n, u);
    });
  }
  on(e, t) {
    !e || !t || (e = e.toLowerCase(), this._methods[e] || (this._methods[e] = []), this._methods[e].indexOf(t) === -1 && this._methods[e].push(t));
  }
  off(e, t) {
    if (!e)
      return;
    e = e.toLowerCase();
    const n = this._methods[e];
    if (n)
      if (t) {
        const i = n.indexOf(t);
        i !== -1 && (n.splice(i, 1), n.length === 0 && delete this._methods[e]);
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
      for (const n of t)
        if (!(this._messageBuffer && !this._messageBuffer._shouldProcessMessage(n)))
          switch (n.type) {
            case h.Invocation:
              this._invokeClientMethod(n).catch((i) => {
                this._logger.log(r.Error, `Invoke client method threw error: ${G(i)}`);
              });
              break;
            case h.StreamItem:
            case h.Completion: {
              const i = this._callbacks[n.invocationId];
              if (i) {
                n.type === h.Completion && delete this._callbacks[n.invocationId];
                try {
                  i(n);
                } catch (s) {
                  this._logger.log(r.Error, `Stream callback threw error: ${G(s)}`);
                }
              }
              break;
            }
            case h.Ping:
              break;
            case h.Close: {
              this._logger.log(r.Information, "Close message received from server.");
              const i = n.error ? new Error("Server returned an error on close: " + n.error) : void 0;
              n.allowReconnect === !0 ? this.connection.stop(i) : this._stopPromise = this._stopInternal(i);
              break;
            }
            case h.Ack:
              this._messageBuffer && this._messageBuffer._ack(n);
              break;
            case h.Sequence:
              this._messageBuffer && this._messageBuffer._resetSequence(n);
              break;
            default:
              this._logger.log(r.Warning, `Invalid message type: ${n.type}.`);
              break;
          }
    }
    this._resetTimeoutPeriod();
  }
  _processHandshakeResponse(e) {
    let t, n;
    try {
      [n, t] = this._handshakeProtocol.parseHandshakeResponse(e);
    } catch (i) {
      const s = "Error parsing handshake response: " + i;
      this._logger.log(r.Error, s);
      const a = new Error(s);
      throw this._handshakeRejecter(a), a;
    }
    if (t.error) {
      const i = "Server returned handshake error: " + t.error;
      this._logger.log(r.Error, i);
      const s = new Error(i);
      throw this._handshakeRejecter(s), s;
    } else
      this._logger.log(r.Debug, "Server handshake complete.");
    return this._handshakeResolver(), n;
  }
  _resetKeepAliveInterval() {
    this.connection.features.inherentKeepAlive || (this._nextKeepAlive = (/* @__PURE__ */ new Date()).getTime() + this.keepAliveIntervalInMilliseconds, this._cleanupPingTimer());
  }
  _resetTimeoutPeriod() {
    if (!this.connection.features || !this.connection.features.inherentKeepAlive) {
      this._timeoutHandle = setTimeout(() => this.serverTimeout(), this.serverTimeoutInMilliseconds);
      let e = this._nextKeepAlive - (/* @__PURE__ */ new Date()).getTime();
      if (e < 0) {
        this._connectionState === f.Connected && this._trySendPingMessage();
        return;
      }
      this._pingServerHandle === void 0 && (e < 0 && (e = 0), this._pingServerHandle = setTimeout(async () => {
        this._connectionState === f.Connected && await this._trySendPingMessage();
      }, e));
    }
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  serverTimeout() {
    this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."));
  }
  async _invokeClientMethod(e) {
    const t = e.target.toLowerCase(), n = this._methods[t];
    if (!n) {
      this._logger.log(r.Warning, `No client method with the name '${t}' found.`), e.invocationId && (this._logger.log(r.Warning, `No result given for '${t}' method and invocation ID '${e.invocationId}'.`), await this._sendWithProtocol(this._createCompletionMessage(e.invocationId, "Client didn't provide a result.", null)));
      return;
    }
    const i = n.slice(), s = !!e.invocationId;
    let a, c, l;
    for (const u of i)
      try {
        const d = a;
        a = await u.apply(this, e.arguments), s && a && d && (this._logger.log(r.Error, `Multiple results provided for '${t}'. Sending error to server.`), l = this._createCompletionMessage(e.invocationId, "Client provided multiple results.", null)), c = void 0;
      } catch (d) {
        c = d, this._logger.log(r.Error, `A callback for the method '${t}' threw error '${d}'.`);
      }
    l ? await this._sendWithProtocol(l) : s ? (c ? l = this._createCompletionMessage(e.invocationId, `${c}`, null) : a !== void 0 ? l = this._createCompletionMessage(e.invocationId, null, a) : (this._logger.log(r.Warning, `No result given for '${t}' method and invocation ID '${e.invocationId}'.`), l = this._createCompletionMessage(e.invocationId, "Client didn't provide a result.", null)), await this._sendWithProtocol(l)) : a && this._logger.log(r.Error, `Result given for '${t}' method but server is not expecting a result.`);
  }
  _connectionClosed(e) {
    this._logger.log(r.Debug, `HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`), this._stopDuringStartError = this._stopDuringStartError || e || new E("The underlying connection was closed before the hub handshake could complete."), this._handshakeResolver && this._handshakeResolver(), this._cancelCallbacksWithError(e || new Error("Invocation canceled due to the underlying connection being closed.")), this._cleanupTimeout(), this._cleanupPingTimer(), this._connectionState === f.Disconnecting ? this._completeClose(e) : this._connectionState === f.Connected && this._reconnectPolicy ? this._reconnect(e) : this._connectionState === f.Connected && this._completeClose(e);
  }
  _completeClose(e) {
    if (this._connectionStarted) {
      this._connectionState = f.Disconnected, this._connectionStarted = !1, this._messageBuffer && (this._messageBuffer._dispose(e ?? new Error("Connection closed.")), this._messageBuffer = void 0), p.isBrowser && window.document.removeEventListener("freeze", this._freezeEventListener);
      try {
        this._closedCallbacks.forEach((t) => t.apply(this, [e]));
      } catch (t) {
        this._logger.log(r.Error, `An onclose callback called with error '${e}' threw error '${t}'.`);
      }
    }
  }
  async _reconnect(e) {
    const t = Date.now();
    let n = 0, i = e !== void 0 ? e : new Error("Attempting to reconnect due to a unknown error."), s = this._getNextRetryDelay(n, 0, i);
    if (s === null) {
      this._logger.log(r.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."), this._completeClose(e);
      return;
    }
    if (this._connectionState = f.Reconnecting, e ? this._logger.log(r.Information, `Connection reconnecting because of error '${e}'.`) : this._logger.log(r.Information, "Connection reconnecting."), this._reconnectingCallbacks.length !== 0) {
      try {
        this._reconnectingCallbacks.forEach((a) => a.apply(this, [e]));
      } catch (a) {
        this._logger.log(r.Error, `An onreconnecting callback called with error '${e}' threw error '${a}'.`);
      }
      if (this._connectionState !== f.Reconnecting) {
        this._logger.log(r.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
        return;
      }
    }
    for (; s !== null; ) {
      if (this._logger.log(r.Information, `Reconnect attempt number ${n + 1} will start in ${s} ms.`), await new Promise((a) => {
        this._reconnectDelayHandle = setTimeout(a, s);
      }), this._reconnectDelayHandle = void 0, this._connectionState !== f.Reconnecting) {
        this._logger.log(r.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
        return;
      }
      try {
        if (await this._startInternal(), this._connectionState = f.Connected, this._logger.log(r.Information, "HubConnection reconnected successfully."), this._reconnectedCallbacks.length !== 0)
          try {
            this._reconnectedCallbacks.forEach((a) => a.apply(this, [this.connection.connectionId]));
          } catch (a) {
            this._logger.log(r.Error, `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${a}'.`);
          }
        return;
      } catch (a) {
        if (this._logger.log(r.Information, `Reconnect attempt failed because of error '${a}'.`), this._connectionState !== f.Reconnecting) {
          this._logger.log(r.Debug, `Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`), this._connectionState === f.Disconnecting && this._completeClose();
          return;
        }
        n++, i = a instanceof Error ? a : new Error(a.toString()), s = this._getNextRetryDelay(n, Date.now() - t, i);
      }
    }
    this._logger.log(r.Information, `Reconnect retries have been exhausted after ${Date.now() - t} ms and ${n} failed attempts. Connection disconnecting.`), this._completeClose();
  }
  _getNextRetryDelay(e, t, n) {
    try {
      return this._reconnectPolicy.nextRetryDelayInMilliseconds({
        elapsedMilliseconds: t,
        previousRetryCount: e,
        retryReason: n
      });
    } catch (i) {
      return this._logger.log(r.Error, `IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${i}'.`), null;
    }
  }
  _cancelCallbacksWithError(e) {
    const t = this._callbacks;
    this._callbacks = {}, Object.keys(t).forEach((n) => {
      const i = t[n];
      try {
        i(null, e);
      } catch (s) {
        this._logger.log(r.Error, `Stream 'error' callback called with '${e}' threw error: ${G(s)}`);
      }
    });
  }
  _cleanupPingTimer() {
    this._pingServerHandle && (clearTimeout(this._pingServerHandle), this._pingServerHandle = void 0);
  }
  _cleanupTimeout() {
    this._timeoutHandle && clearTimeout(this._timeoutHandle);
  }
  _createInvocation(e, t, n, i) {
    if (n)
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
      const s = this._invocationId;
      return this._invocationId++, i.length !== 0 ? {
        target: e,
        arguments: t,
        invocationId: s.toString(),
        streamIds: i,
        type: h.Invocation
      } : {
        target: e,
        arguments: t,
        invocationId: s.toString(),
        type: h.Invocation
      };
    }
  }
  _launchStreams(e, t) {
    if (e.length !== 0) {
      t || (t = Promise.resolve());
      for (const n in e)
        e[n].subscribe({
          complete: () => {
            t = t.then(() => this._sendWithProtocol(this._createCompletionMessage(n)));
          },
          error: (i) => {
            let s;
            i instanceof Error ? s = i.message : i && i.toString ? s = i.toString() : s = "Unknown error", t = t.then(() => this._sendWithProtocol(this._createCompletionMessage(n, s)));
          },
          next: (i) => {
            t = t.then(() => this._sendWithProtocol(this._createStreamItemMessage(n, i)));
          }
        });
    }
  }
  _replaceStreamingParams(e) {
    const t = [], n = [];
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      if (this._isObservable(s)) {
        const a = this._invocationId;
        this._invocationId++, t[a] = s, n.push(a.toString()), e.splice(i, 1);
      }
    }
    return [t, n];
  }
  _isObservable(e) {
    return e && e.subscribe && typeof e.subscribe == "function";
  }
  _createStreamInvocation(e, t, n) {
    const i = this._invocationId;
    return this._invocationId++, n.length !== 0 ? {
      target: e,
      arguments: t,
      invocationId: i.toString(),
      streamIds: n,
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
  _createCompletionMessage(e, t, n) {
    return t ? {
      error: t,
      invocationId: e,
      type: h.Completion
    } : {
      invocationId: e,
      result: n,
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
const je = [0, 2e3, 1e4, 3e4, null];
class se {
  constructor(e) {
    this._retryDelays = e !== void 0 ? [...e, null] : je;
  }
  nextRetryDelayInMilliseconds(e) {
    return this._retryDelays[e.previousRetryCount];
  }
}
class $ {
}
$.Authorization = "Authorization";
$.Cookie = "Cookie";
class Ge extends j {
  constructor(e, t) {
    super(), this._innerClient = e, this._accessTokenFactory = t;
  }
  async send(e) {
    let t = !0;
    this._accessTokenFactory && (!this._accessToken || e.url && e.url.indexOf("/negotiate?") > 0) && (t = !1, this._accessToken = await this._accessTokenFactory()), this._setAuthorizationHeader(e);
    const n = await this._innerClient.send(e);
    return t && n.statusCode === 401 && this._accessTokenFactory ? (this._accessToken = await this._accessTokenFactory(), this._setAuthorizationHeader(e), await this._innerClient.send(e)) : n;
  }
  _setAuthorizationHeader(e) {
    e.headers || (e.headers = {}), this._accessToken ? e.headers[$.Authorization] = `Bearer ${this._accessToken}` : this._accessTokenFactory && e.headers[$.Authorization] && delete e.headers[$.Authorization];
  }
  getCookieString(e) {
    return this._innerClient.getCookieString(e);
  }
}
var m;
(function(o) {
  o[o.None = 0] = "None", o[o.WebSockets = 1] = "WebSockets", o[o.ServerSentEvents = 2] = "ServerSentEvents", o[o.LongPolling = 4] = "LongPolling";
})(m || (m = {}));
var v;
(function(o) {
  o[o.Text = 1] = "Text", o[o.Binary = 2] = "Binary";
})(v || (v = {}));
let Xe = class {
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
class re {
  // This is an internal type, not exported from 'index' so this is really just internal.
  get pollAborted() {
    return this._pollAbort.aborted;
  }
  constructor(e, t, n) {
    this._httpClient = e, this._logger = t, this._pollAbort = new Xe(), this._options = n, this._running = !1, this.onreceive = null, this.onclose = null;
  }
  async connect(e, t) {
    if (_.isRequired(e, "url"), _.isRequired(t, "transferFormat"), _.isIn(t, v, "transferFormat"), this._url = e, this._logger.log(r.Trace, "(LongPolling transport) Connecting."), t === v.Binary && typeof XMLHttpRequest < "u" && typeof new XMLHttpRequest().responseType != "string")
      throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
    const [n, i] = U(), s = { [n]: i, ...this._options.headers }, a = {
      abortSignal: this._pollAbort.signal,
      headers: s,
      timeout: 1e5,
      withCredentials: this._options.withCredentials
    };
    t === v.Binary && (a.responseType = "arraybuffer");
    const c = `${e}&_=${Date.now()}`;
    this._logger.log(r.Trace, `(LongPolling transport) polling: ${c}.`);
    const l = await this._httpClient.get(c, a);
    l.statusCode !== 200 ? (this._logger.log(r.Error, `(LongPolling transport) Unexpected response code: ${l.statusCode}.`), this._closeError = new M(l.statusText || "", l.statusCode), this._running = !1) : this._running = !0, this._receiving = this._poll(this._url, a);
  }
  async _poll(e, t) {
    try {
      for (; this._running; )
        try {
          const n = `${e}&_=${Date.now()}`;
          this._logger.log(r.Trace, `(LongPolling transport) polling: ${n}.`);
          const i = await this._httpClient.get(n, t);
          i.statusCode === 204 ? (this._logger.log(r.Information, "(LongPolling transport) Poll terminated by server."), this._running = !1) : i.statusCode !== 200 ? (this._logger.log(r.Error, `(LongPolling transport) Unexpected response code: ${i.statusCode}.`), this._closeError = new M(i.statusText || "", i.statusCode), this._running = !1) : i.content ? (this._logger.log(r.Trace, `(LongPolling transport) data received. ${W(i.content, this._options.logMessageContent)}.`), this.onreceive && this.onreceive(i.content)) : this._logger.log(r.Trace, "(LongPolling transport) Poll timed out, reissuing.");
        } catch (n) {
          this._running ? n instanceof Y ? this._logger.log(r.Trace, "(LongPolling transport) Poll timed out, reissuing.") : (this._closeError = n, this._running = !1) : this._logger.log(r.Trace, `(LongPolling transport) Poll errored after shutdown: ${n.message}`);
        }
    } finally {
      this._logger.log(r.Trace, "(LongPolling transport) Polling complete."), this.pollAborted || this._raiseOnClose();
    }
  }
  async send(e) {
    return this._running ? le(this._logger, "LongPolling", this._httpClient, this._url, e, this._options) : Promise.reject(new Error("Cannot send until the transport is connected"));
  }
  async stop() {
    this._logger.log(r.Trace, "(LongPolling transport) Stopping polling."), this._running = !1, this._pollAbort.abort();
    try {
      await this._receiving, this._logger.log(r.Trace, `(LongPolling transport) sending DELETE request to ${this._url}.`);
      const e = {}, [t, n] = U();
      e[t] = n;
      const i = {
        headers: { ...e, ...this._options.headers },
        timeout: this._options.timeout,
        withCredentials: this._options.withCredentials
      };
      let s;
      try {
        await this._httpClient.delete(this._url, i);
      } catch (a) {
        s = a;
      }
      s ? s instanceof M && (s.statusCode === 404 ? this._logger.log(r.Trace, "(LongPolling transport) A 404 response was returned from sending a DELETE request.") : this._logger.log(r.Trace, `(LongPolling transport) Error sending a DELETE request: ${s}`)) : this._logger.log(r.Trace, "(LongPolling transport) DELETE request accepted.");
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
class Ke {
  constructor(e, t, n, i) {
    this._httpClient = e, this._accessToken = t, this._logger = n, this._options = i, this.onreceive = null, this.onclose = null;
  }
  async connect(e, t) {
    return _.isRequired(e, "url"), _.isRequired(t, "transferFormat"), _.isIn(t, v, "transferFormat"), this._logger.log(r.Trace, "(SSE transport) Connecting."), this._url = e, this._accessToken && (e += (e.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(this._accessToken)}`), new Promise((n, i) => {
      let s = !1;
      if (t !== v.Text) {
        i(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
        return;
      }
      let a;
      if (p.isBrowser || p.isWebWorker)
        a = new this._options.EventSource(e, { withCredentials: this._options.withCredentials });
      else {
        const c = this._httpClient.getCookieString(e), l = {};
        l.Cookie = c;
        const [u, d] = U();
        l[u] = d, a = new this._options.EventSource(e, { withCredentials: this._options.withCredentials, headers: { ...l, ...this._options.headers } });
      }
      try {
        a.onmessage = (c) => {
          if (this.onreceive)
            try {
              this._logger.log(r.Trace, `(SSE transport) data received. ${W(c.data, this._options.logMessageContent)}.`), this.onreceive(c.data);
            } catch (l) {
              this._close(l);
              return;
            }
        }, a.onerror = (c) => {
          s ? this._close() : i(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."));
        }, a.onopen = () => {
          this._logger.log(r.Information, `SSE connected to ${this._url}`), this._eventSource = a, s = !0, n();
        };
      } catch (c) {
        i(c);
        return;
      }
    });
  }
  async send(e) {
    return this._eventSource ? le(this._logger, "SSE", this._httpClient, this._url, e, this._options) : Promise.reject(new Error("Cannot send until the transport is connected"));
  }
  stop() {
    return this._close(), Promise.resolve();
  }
  _close(e) {
    this._eventSource && (this._eventSource.close(), this._eventSource = void 0, this.onclose && this.onclose(e));
  }
}
class Ve {
  constructor(e, t, n, i, s, a) {
    this._logger = n, this._accessTokenFactory = t, this._logMessageContent = i, this._webSocketConstructor = s, this._httpClient = e, this.onreceive = null, this.onclose = null, this._headers = a;
  }
  async connect(e, t) {
    _.isRequired(e, "url"), _.isRequired(t, "transferFormat"), _.isIn(t, v, "transferFormat"), this._logger.log(r.Trace, "(WebSockets transport) Connecting.");
    let n;
    return this._accessTokenFactory && (n = await this._accessTokenFactory()), new Promise((i, s) => {
      e = e.replace(/^http/, "ws");
      let a;
      const c = this._httpClient.getCookieString(e);
      let l = !1;
      if (p.isNode || p.isReactNative) {
        const u = {}, [d, I] = U();
        u[d] = I, n && (u[$.Authorization] = `Bearer ${n}`), c && (u[$.Cookie] = c), a = new this._webSocketConstructor(e, void 0, {
          headers: { ...u, ...this._headers }
        });
      } else
        n && (e += (e.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(n)}`);
      a || (a = new this._webSocketConstructor(e)), t === v.Binary && (a.binaryType = "arraybuffer"), a.onopen = (u) => {
        this._logger.log(r.Information, `WebSocket connected to ${e}.`), this._webSocket = a, l = !0, i();
      }, a.onerror = (u) => {
        let d = null;
        typeof ErrorEvent < "u" && u instanceof ErrorEvent ? d = u.error : d = "There was an error with the transport", this._logger.log(r.Information, `(WebSockets transport) ${d}.`);
      }, a.onmessage = (u) => {
        if (this._logger.log(r.Trace, `(WebSockets transport) data received. ${W(u.data, this._logMessageContent)}.`), this.onreceive)
          try {
            this.onreceive(u.data);
          } catch (d) {
            this._close(d);
            return;
          }
      }, a.onclose = (u) => {
        if (l)
          this._close(u);
        else {
          let d = null;
          typeof ErrorEvent < "u" && u instanceof ErrorEvent ? d = u.error : d = "WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.", s(new Error(d));
        }
      };
    });
  }
  send(e) {
    return this._webSocket && this._webSocket.readyState === this._webSocketConstructor.OPEN ? (this._logger.log(r.Trace, `(WebSockets transport) sending data. ${W(e, this._logMessageContent)}.`), this._webSocket.send(e), Promise.resolve()) : Promise.reject("WebSocket is not in the OPEN state");
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
const ae = 100;
class Je {
  constructor(e, t = {}) {
    if (this._stopPromiseResolver = () => {
    }, this.features = {}, this._negotiateVersion = 1, _.isRequired(e, "url"), this._logger = Re(t.logger), this.baseUrl = this._resolveUrl(e), t = t || {}, t.logMessageContent = t.logMessageContent === void 0 ? !1 : t.logMessageContent, typeof t.withCredentials == "boolean" || t.withCredentials === void 0)
      t.withCredentials = t.withCredentials === void 0 ? !0 : t.withCredentials;
    else
      throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");
    t.timeout = t.timeout === void 0 ? 100 * 1e3 : t.timeout;
    let n = null, i = null;
    if (p.isNode && typeof require < "u") {
      const s = typeof __webpack_require__ == "function" ? __non_webpack_require__ : require;
      n = s("ws"), i = s("eventsource");
    }
    !p.isNode && typeof WebSocket < "u" && !t.WebSocket ? t.WebSocket = WebSocket : p.isNode && !t.WebSocket && n && (t.WebSocket = n), !p.isNode && typeof EventSource < "u" && !t.EventSource ? t.EventSource = EventSource : p.isNode && !t.EventSource && typeof i < "u" && (t.EventSource = i), this._httpClient = new Ge(t.httpClient || new Be(this._logger), t.accessTokenFactory), this._connectionState = "Disconnected", this._connectionStarted = !1, this._options = t, this.onreceive = null, this.onclose = null;
  }
  async start(e) {
    if (e = e || v.Binary, _.isIn(e, v, "transferFormat"), this._logger.log(r.Debug, `Starting connection with transfer format '${v[e]}'.`), this._connectionState !== "Disconnected")
      return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));
    if (this._connectionState = "Connecting", this._startInternalPromise = this._startInternal(e), await this._startInternalPromise, this._connectionState === "Disconnecting") {
      const t = "Failed to start the HttpConnection before stop() was called.";
      return this._logger.log(r.Error, t), await this._stopPromise, Promise.reject(new E(t));
    } else if (this._connectionState !== "Connected") {
      const t = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
      return this._logger.log(r.Error, t), Promise.reject(new E(t));
    }
    this._connectionStarted = !0;
  }
  send(e) {
    return this._connectionState !== "Connected" ? Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")) : (this._sendQueue || (this._sendQueue = new ee(this.transport)), this._sendQueue.send(e));
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
        if (this._options.transport === m.WebSockets)
          this.transport = this._constructTransport(m.WebSockets), await this._startTransport(t, e);
        else
          throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");
      else {
        let n = null, i = 0;
        do {
          if (n = await this._getNegotiationResponse(t), this._connectionState === "Disconnecting" || this._connectionState === "Disconnected")
            throw new E("The connection was stopped during negotiation.");
          if (n.error)
            throw new Error(n.error);
          if (n.ProtocolVersion)
            throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
          if (n.url && (t = n.url), n.accessToken) {
            const s = n.accessToken;
            this._accessTokenFactory = () => s, this._httpClient._accessToken = s, this._httpClient._accessTokenFactory = void 0;
          }
          i++;
        } while (n.url && i < ae);
        if (i === ae && n.url)
          throw new Error("Negotiate redirection limit exceeded.");
        await this._createTransport(t, this._options.transport, n, e);
      }
      this.transport instanceof re && (this.features.inherentKeepAlive = !0), this._connectionState === "Connecting" && (this._logger.log(r.Debug, "The HttpConnection connected successfully."), this._connectionState = "Connected");
    } catch (n) {
      return this._logger.log(r.Error, "Failed to start the connection: " + n), this._connectionState = "Disconnected", this.transport = void 0, this._stopPromiseResolver(), Promise.reject(n);
    }
  }
  async _getNegotiationResponse(e) {
    const t = {}, [n, i] = U();
    t[n] = i;
    const s = this._resolveNegotiateUrl(e);
    this._logger.log(r.Debug, `Sending negotiation request: ${s}.`);
    try {
      const a = await this._httpClient.post(s, {
        content: "",
        headers: { ...t, ...this._options.headers },
        timeout: this._options.timeout,
        withCredentials: this._options.withCredentials
      });
      if (a.statusCode !== 200)
        return Promise.reject(new Error(`Unexpected status code returned from negotiate '${a.statusCode}'`));
      const c = JSON.parse(a.content);
      return (!c.negotiateVersion || c.negotiateVersion < 1) && (c.connectionToken = c.connectionId), c.useStatefulReconnect && this._options._useStatefulReconnect !== !0 ? Promise.reject(new oe("Client didn't negotiate Stateful Reconnect but the server did.")) : c;
    } catch (a) {
      let c = "Failed to complete negotiation with the server: " + a;
      return a instanceof M && a.statusCode === 404 && (c = c + " Either this is not a SignalR endpoint or there is a proxy blocking the connection."), this._logger.log(r.Error, c), Promise.reject(new oe(c));
    }
  }
  _createConnectUrl(e, t) {
    return t ? e + (e.indexOf("?") === -1 ? "?" : "&") + `id=${t}` : e;
  }
  async _createTransport(e, t, n, i) {
    let s = this._createConnectUrl(e, n.connectionToken);
    if (this._isITransport(t)) {
      this._logger.log(r.Debug, "Connection was provided an instance of ITransport, using that directly."), this.transport = t, await this._startTransport(s, i), this.connectionId = n.connectionId;
      return;
    }
    const a = [], c = n.availableTransports || [];
    let l = n;
    for (const u of c) {
      const d = this._resolveTransportOrError(u, t, i, l?.useStatefulReconnect === !0);
      if (d instanceof Error)
        a.push(`${u.transport} failed:`), a.push(d);
      else if (this._isITransport(d)) {
        if (this.transport = d, !l) {
          try {
            l = await this._getNegotiationResponse(e);
          } catch (I) {
            return Promise.reject(I);
          }
          s = this._createConnectUrl(e, l.connectionToken);
        }
        try {
          await this._startTransport(s, i), this.connectionId = l.connectionId;
          return;
        } catch (I) {
          if (this._logger.log(r.Error, `Failed to start the transport '${u.transport}': ${I}`), l = void 0, a.push(new ke(`${u.transport} failed: ${I}`, m[u.transport])), this._connectionState !== "Connecting") {
            const ne = "Failed to select transport before stop() was called.";
            return this._logger.log(r.Debug, ne), Promise.reject(new E(ne));
          }
        }
      }
    }
    return a.length > 0 ? Promise.reject(new Ee(`Unable to connect to the server with any of the available transports. ${a.join(" ")}`, a)) : Promise.reject(new Error("None of the transports supported by the client are supported by the server."));
  }
  _constructTransport(e) {
    switch (e) {
      case m.WebSockets:
        if (!this._options.WebSocket)
          throw new Error("'WebSocket' is not supported in your environment.");
        return new Ve(this._httpClient, this._accessTokenFactory, this._logger, this._options.logMessageContent, this._options.WebSocket, this._options.headers || {});
      case m.ServerSentEvents:
        if (!this._options.EventSource)
          throw new Error("'EventSource' is not supported in your environment.");
        return new Ke(this._httpClient, this._httpClient._accessToken, this._logger, this._options);
      case m.LongPolling:
        return new re(this._httpClient, this._logger, this._options);
      default:
        throw new Error(`Unknown transport: ${e}.`);
    }
  }
  _startTransport(e, t) {
    return this.transport.onreceive = this.onreceive, this.features.reconnect ? this.transport.onclose = async (n) => {
      let i = !1;
      if (this.features.reconnect)
        try {
          this.features.disconnected(), await this.transport.connect(e, t), await this.features.resend();
        } catch {
          i = !0;
        }
      else {
        this._stopConnection(n);
        return;
      }
      i && this._stopConnection(n);
    } : this.transport.onclose = (n) => this._stopConnection(n), this.transport.connect(e, t);
  }
  _resolveTransportOrError(e, t, n, i) {
    const s = m[e.transport];
    if (s == null)
      return this._logger.log(r.Debug, `Skipping transport '${e.transport}' because it is not supported by this client.`), new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);
    if (Qe(t, s))
      if (e.transferFormats.map((c) => v[c]).indexOf(n) >= 0) {
        if (s === m.WebSockets && !this._options.WebSocket || s === m.ServerSentEvents && !this._options.EventSource)
          return this._logger.log(r.Debug, `Skipping transport '${m[s]}' because it is not supported in your environment.'`), new Se(`'${m[s]}' is not supported in your environment.`, s);
        this._logger.log(r.Debug, `Selecting transport '${m[s]}'.`);
        try {
          return this.features.reconnect = s === m.WebSockets ? i : void 0, this._constructTransport(s);
        } catch (c) {
          return c;
        }
      } else
        return this._logger.log(r.Debug, `Skipping transport '${m[s]}' because it does not support the requested transfer format '${v[n]}'.`), new Error(`'${m[s]}' does not support ${v[n]}.`);
    else
      return this._logger.log(r.Debug, `Skipping transport '${m[s]}' because it was disabled by the client.`), new ye(`'${m[s]}' is disabled by the client.`, s);
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
    if (!p.isBrowser)
      throw new Error(`Cannot resolve '${e}'.`);
    const t = window.document.createElement("a");
    return t.href = e, this._logger.log(r.Information, `Normalizing '${e}' to '${t.href}'.`), t.href;
  }
  _resolveNegotiateUrl(e) {
    const t = new URL(e);
    t.pathname.endsWith("/") ? t.pathname += "negotiate" : t.pathname += "/negotiate";
    const n = new URLSearchParams(t.searchParams);
    return n.has("negotiateVersion") || n.append("negotiateVersion", this._negotiateVersion.toString()), n.has("useStatefulReconnect") ? n.get("useStatefulReconnect") === "true" && (this._options._useStatefulReconnect = !0) : this._options._useStatefulReconnect === !0 && n.append("useStatefulReconnect", "true"), t.search = n.toString(), t.toString();
  }
}
function Qe(o, e) {
  return !o || (e & o) !== 0;
}
class ee {
  constructor(e) {
    this._transport = e, this._buffer = [], this._executing = !0, this._sendBufferedData = new L(), this._transportResult = new L(), this._sendLoopPromise = this._sendLoop();
  }
  send(e) {
    return this._bufferData(e), this._transportResult || (this._transportResult = new L()), this._transportResult.promise;
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
      this._sendBufferedData = new L();
      const e = this._transportResult;
      this._transportResult = void 0;
      const t = typeof this._buffer[0] == "string" ? this._buffer.join("") : ee._concatBuffers(this._buffer);
      this._buffer.length = 0;
      try {
        await this._transport.send(t), e.resolve();
      } catch (n) {
        e.reject(n);
      }
    }
  }
  static _concatBuffers(e) {
    const t = e.map((s) => s.byteLength).reduce((s, a) => s + a), n = new Uint8Array(t);
    let i = 0;
    for (const s of e)
      n.set(new Uint8Array(s), i), i += s.byteLength;
    return n.buffer;
  }
}
class L {
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
const Ye = "json";
class Ze {
  constructor() {
    this.name = Ye, this.version = 2, this.transferFormat = v.Text;
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
    t === null && (t = B.instance);
    const n = S.parse(e), i = [];
    for (const s of n) {
      const a = JSON.parse(s);
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
    return S.write(JSON.stringify(e));
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
const et = {
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
function tt(o) {
  const e = et[o.toLowerCase()];
  if (typeof e < "u")
    return e;
  throw new Error(`Unknown log level: ${o}`);
}
class nt {
  configureLogging(e) {
    if (_.isRequired(e, "logging"), ot(e))
      this.logger = e;
    else if (typeof e == "string") {
      const t = tt(e);
      this.logger = new O(t);
    } else
      this.logger = new O(e);
    return this;
  }
  withUrl(e, t) {
    return _.isRequired(e, "url"), _.isNotEmpty(e, "url"), this.url = e, typeof t == "object" ? this.httpConnectionOptions = { ...this.httpConnectionOptions, ...t } : this.httpConnectionOptions = {
      ...this.httpConnectionOptions,
      transport: t
    }, this;
  }
  /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified Hub Protocol.
   *
   * @param {IHubProtocol} protocol The {@link @microsoft/signalr.IHubProtocol} implementation to use.
   */
  withHubProtocol(e) {
    return _.isRequired(e, "protocol"), this.protocol = e, this;
  }
  withAutomaticReconnect(e) {
    if (this.reconnectPolicy)
      throw new Error("A reconnectPolicy has already been set.");
    return e ? Array.isArray(e) ? this.reconnectPolicy = new se(e) : this.reconnectPolicy = e : this.reconnectPolicy = new se(), this;
  }
  /** Configures {@link @microsoft/signalr.HubConnection.serverTimeoutInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
   *
   * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
   */
  withServerTimeout(e) {
    return _.isRequired(e, "milliseconds"), this._serverTimeoutInMilliseconds = e, this;
  }
  /** Configures {@link @microsoft/signalr.HubConnection.keepAliveIntervalInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
   *
   * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
   */
  withKeepAliveInterval(e) {
    return _.isRequired(e, "milliseconds"), this._keepAliveIntervalInMilliseconds = e, this;
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
    const t = new Je(this.url, e);
    return Z.create(t, this.logger || B.instance, this.protocol || new Ze(), this.reconnectPolicy, this._serverTimeoutInMilliseconds, this._keepAliveIntervalInMilliseconds, this._statefulReconnectBufferSize);
  }
}
function ot(o) {
  return o.log !== void 0;
}
class it {
  constructor(e) {
    this.#n = /* @__PURE__ */ new Set(), this.#t = !1, this.API_BASE_URL = "/umbraco/management/api/v1/metrics", this.HUB_URL = "/umbraco/metrics-hub", this.#o = e;
  }
  #e;
  #n;
  #t;
  #o;
  /**
   * Fetches current performance metrics from the server (one-time request)
   */
  async getPerformanceMetrics() {
    const e = await this.#o();
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
    if (this.#e?.state === f.Connected) {
      console.log("Already connected to hub");
      return;
    }
    this.#e && await this.disconnectFromHub(), this.#t = !0;
    try {
      console.log("Building SignalR connection..."), this.#e = new nt().withUrl(this.HUB_URL, {
        accessTokenFactory: async () => await this.#o()
      }).withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (t) => t.previousRetryCount === 0 ? 0 : t.previousRetryCount === 1 ? 2e3 : t.previousRetryCount === 2 ? 5e3 : t.previousRetryCount === 3 ? 1e4 : 3e4
      }).configureLogging(r.Information).build(), this.#e.on("ReceiveMetrics", (t) => {
        console.log("Received metrics from SignalR"), this.#s(t);
      }), this.#e.onreconnected(async (t) => {
        console.log("SignalR reconnected:", t);
        try {
          await this.#e?.invoke("RequestMetrics");
        } catch (n) {
          console.error("Error requesting metrics after reconnect:", n);
        }
      }), this.#e.onreconnecting((t) => {
        console.log("SignalR reconnecting...", t);
      }), this.#e.onclose((t) => {
        console.log("SignalR connection closed", t), this.#t = !1;
      }), console.log("Starting SignalR connection...");
      const e = new Promise(
        (t, n) => setTimeout(() => n(new Error("Connection timeout after 15 seconds")), 15e3)
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
      await new Promise((n) => setTimeout(n, 200));
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
    if (!this.#e || this.#e.state !== f.Connected)
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
    return this.#e?.state === f.Connected;
  }
  /**
   * Get current connection state
   */
  get connectionState() {
    return this.#e?.state?.toString() || "Disconnected";
  }
  #s(e) {
    this.#n.forEach((t) => {
      try {
        t(e);
      } catch (n) {
        console.error("Error in metrics listener:", n);
      }
    });
  }
}
const st = ":host{display:grid;gap:var(--uui-size-layout-1);padding:var(--uui-size-layout-1);grid-template-columns:1fr 1fr 1fr}uui-box{margin-bottom:var(--uui-size-layout-1)}h2,h3{margin-top:0}.wide{grid-column:span 3}.metrics-controls{display:flex;gap:var(--uui-size-4);margin-bottom:var(--uui-size-6);align-items:center}.tab-navigation{display:flex;gap:.5rem;margin:1rem 0;border-bottom:2px solid var(--uui-color-border);padding-bottom:.5rem}.tab-content{margin-top:1.5rem}.app-info-banner{display:flex;flex-wrap:wrap;gap:var(--uui-size-4);padding:var(--uui-size-5);background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius);margin-bottom:var(--uui-size-6);border-left:4px solid var(--uui-color-interactive)}.info-item{padding:var(--uui-size-2) var(--uui-size-4);background:var(--uui-color-surface);border-radius:var(--uui-border-radius);font-size:.9rem;box-shadow:0 1px 3px #0000001a}.info-item strong{margin-left:var(--uui-size-2);color:var(--uui-color-interactive);font-weight:600}.metrics-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--uui-size-4)}.metric-card{text-align:center;padding:var(--uui-size-4)}.metric-card uui-icon{font-size:2rem;margin-bottom:var(--uui-size-2);opacity:.8}.metric-value{font-size:2rem;font-weight:700;margin:var(--uui-size-2) 0}.metric-value.positive{color:var(--uui-color-positive)}.metric-value.warning{color:var(--uui-color-warning)}.metric-value.danger{color:var(--uui-color-danger)}.metric-detail{font-size:.85rem;color:var(--uui-color-text-alt);margin-top:var(--uui-size-1)}.gc-stats{display:flex;justify-content:space-around;margin-top:var(--uui-size-4);flex-wrap:wrap;gap:var(--uui-size-4)}.gc-stats>div{text-align:center}.gc-label{font-size:.9rem;color:var(--uui-color-text-alt);margin-bottom:var(--uui-size-1)}.gc-value{font-size:1.2rem;font-weight:700;color:var(--uui-color-interactive)}.gc-details{display:flex;flex-direction:column;gap:var(--uui-size-2);text-align:left;padding:var(--uui-size-4)}.gc-detail-row{display:flex;justify-content:space-between;padding:var(--uui-size-3);background:var(--uui-color-surface-alt);border-radius:var(--uui-border-radius);align-items:center}.gc-detail-row span{color:var(--uui-color-text)}.gc-detail-row strong{color:var(--uui-color-interactive);font-weight:600}.span-2{grid-column:span 2}.span-4{grid-column:span 4}.connection-status{display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1rem;border-radius:var(--uui-border-radius);font-size:.85rem;font-weight:600}.connection-status.connected{background:var(--uui-color-positive-emphasis);color:var(--uui-color-positive-contrast)}.connection-status.connecting{background:var(--uui-color-warning-emphasis);color:var(--uui-color-warning-contrast)}.info-item.connected{background:var(--uui-color-positive-emphasis);color:var(--uui-color-positive-contrast)}.info-item.connected strong{color:inherit}";
var rt = Object.defineProperty, at = Object.getOwnPropertyDescriptor, he = (o) => {
  throw TypeError(o);
}, H = (o, e, t, n) => {
  for (var i = n > 1 ? void 0 : n ? at(e, t) : e, s = o.length - 1, a; s >= 0; s--)
    (a = o[s]) && (i = (n ? a(e, t, i) : a(i)) || i);
  return n && i && rt(e, t, i), i;
}, te = (o, e, t) => e.has(o) || he("Cannot " + t), g = (o, e, t) => (te(o, e, "read from private field"), t ? t.call(o) : e.get(o)), y = (o, e, t) => e.has(o) ? he("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), A = (o, e, t, n) => (te(o, e, "write to private field"), e.set(o, t), t), k = (o, e, t) => (te(o, e, "access private method"), t), b, z, w, T, X, K, V, J, F, C, Q, ue, x, q, de, ge;
let R = class extends ve(fe) {
  constructor() {
    super(), y(this, C), this._autoRefresh = !1, this._activeTab = "overview", this._isConnected = !1, y(this, b), y(this, z), y(this, w), y(this, T), y(this, X, async (o) => {
      if (!g(this, w)) {
        console.error("Metrics service not initialized");
        return;
      }
      const e = o.target;
      e.state = "waiting";
      try {
        this._autoRefresh && g(this, w).isConnected ? await g(this, w).requestMetrics() : await g(this, K).call(this), e.state = "success";
      } catch (t) {
        console.error("Error refreshing metrics:", t), e.state = "failed";
      }
    }), y(this, K, async () => {
      if (!g(this, w)) {
        console.error("Metrics service not initialized");
        return;
      }
      try {
        this._performanceMetrics = await g(this, w).getPerformanceMetrics();
      } catch (o) {
        console.error("Error loading performance metrics:", o), g(this, b) && g(this, b).peek("danger", {
          data: {
            headline: "Error",
            message: o instanceof Error ? o.message : "Failed to load performance metrics"
          }
        });
      }
    }), y(this, V, async () => {
      this._autoRefresh = !this._autoRefresh, this._autoRefresh ? await g(this, J).call(this) : await g(this, F).call(this);
    }), y(this, J, async () => {
      if (!g(this, w)) {
        console.error("Metrics service not initialized"), this._autoRefresh = !1;
        return;
      }
      try {
        g(this, b) && g(this, b).peek("default", {
          data: {
            headline: "Connecting...",
            message: "Establishing connection to metrics hub"
          }
        }), A(this, T, g(this, w).onMetricsUpdate((o) => {
          this._performanceMetrics = o, this._isConnected = !0;
        })), await g(this, w).connectToHub(), this._isConnected = g(this, w).isConnected, this._isConnected && g(this, b) && g(this, b).peek("positive", {
          data: {
            headline: "Connected",
            message: "Real-time metrics updates enabled"
          }
        });
      } catch (o) {
        console.error("Error starting auto-refresh:", o), this._autoRefresh = !1, this._isConnected = !1, g(this, b) && g(this, b).peek("danger", {
          data: {
            headline: "Connection Failed",
            message: o instanceof Error ? o.message : "Failed to connect to metrics hub. Try again."
          }
        }), g(this, T) && (g(this, T).call(this), A(this, T, void 0));
      }
    }), y(this, F, async () => {
      if (g(this, w))
        try {
          g(this, T) && (g(this, T).call(this), A(this, T, void 0)), await g(this, w).disconnectFromHub(), this._isConnected = !1, g(this, b) && g(this, b).peek("default", {
            data: {
              headline: "Disconnected",
              message: "Real-time updates disabled"
            }
          });
        } catch (o) {
          console.error("Error stopping auto-refresh:", o);
        }
    }), y(this, q, (o) => {
      this._activeTab = o;
    }), this.consumeContext(we, (o) => {
      A(this, b, o);
    }), this.consumeContext(be, (o) => {
      this.observe(
        o?.currentUser,
        (e) => {
          this._contextCurrentUser = e;
        },
        "_contextCurrentUser"
      );
    }), this.consumeContext(Ce, (o) => {
      A(this, z, o), A(this, w, new it(async () => {
        const e = await g(this, z)?.getLatestToken();
        if (!e)
          throw new Error("No authentication token available");
        return e;
      }));
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), g(this, F).call(this);
  }
  render() {
    return P`
      <uui-box headline="Application Performance Metrics" class="wide">
        <div slot="header">[.NET 10 Application - Real-time Metrics${this._contextCurrentUser?.name ? ` - ${this._contextCurrentUser.name}` : ""}]</div>

        <div class="metrics-controls">
          <uui-button color="default" look="primary" @click="${g(this, X)}">
            <uui-icon name="icon-refresh"></uui-icon> Refresh Metrics
          </uui-button>

          <uui-toggle
            label="Real-time Updates (SignalR)"
            .checked="${this._autoRefresh}"
            @change="${g(this, V)}"
          ></uui-toggle>

          ${this._isConnected ? P`
            <span class="connection-status connected">
              <uui-icon name="icon-check"></uui-icon> Connected
            </span>
          ` : this._autoRefresh ? P`
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
            @click="${() => g(this, q).call(this, "overview")}"
          >
            <uui-icon name="icon-chart"></uui-icon> Overview
          </uui-button>
          <uui-button 
            look="${this._activeTab === "heap" ? "primary" : "default"}"
            color="${this._activeTab === "heap" ? "positive" : "default"}"
            @click="${() => g(this, q).call(this, "heap")}"
          >
            <uui-icon name="icon-box"></uui-icon> Heap & GC
          </uui-button>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          ${this._activeTab === "overview" ? k(this, C, de).call(this) : k(this, C, ge).call(this)}
        </div>
      </uui-box>
    `;
  }
};
b = /* @__PURE__ */ new WeakMap();
z = /* @__PURE__ */ new WeakMap();
w = /* @__PURE__ */ new WeakMap();
T = /* @__PURE__ */ new WeakMap();
X = /* @__PURE__ */ new WeakMap();
K = /* @__PURE__ */ new WeakMap();
V = /* @__PURE__ */ new WeakMap();
J = /* @__PURE__ */ new WeakMap();
F = /* @__PURE__ */ new WeakMap();
C = /* @__PURE__ */ new WeakSet();
Q = function(o, e) {
  return o > e ? "danger" : o > e * 0.7 ? "warning" : "positive";
};
ue = function(o) {
  const e = Math.floor(o / 86400), t = Math.floor(o % 86400 / 3600), n = Math.floor(o % 3600 / 60), i = Math.floor(o % 60);
  return `${e}d ${t}h ${n}m ${i}s`;
};
x = function(o) {
  return o.toLocaleString();
};
q = /* @__PURE__ */ new WeakMap();
de = function() {
  return this._performanceMetrics ? P`
      <!-- Application Info Banner -->
      <div class="app-info-banner">
        <div class="info-item">
          <strong>Process:</strong> ${this._performanceMetrics.applicationInfo.processName} (PID: ${this._performanceMetrics.applicationInfo.processId})
        </div>
        <div class="info-item">
          <strong>Runtime:</strong> ${this._performanceMetrics.applicationInfo.runtimeVersion}
        </div>
        <div class="info-item">
          <strong>Architecture:</strong> ${this._performanceMetrics.applicationInfo.is64BitProcess ? "64-bit" : "32-bit"}
        </div>
        <div class="info-item">
          <strong>CPU Cores:</strong> ${this._performanceMetrics.applicationInfo.processorCount}
        </div>
        <div class="info-item">
          <strong>Uptime:</strong> ${k(this, C, ue).call(this, this._performanceMetrics.applicationInfo.uptimeSeconds)}
        </div>
        ${this._isConnected ? P`
          <div class="info-item connected">
            <uui-icon name="icon-check"></uui-icon>
            <strong>SignalR Connected</strong>
          </div>
        ` : ""}
      </div>

      <div class="metrics-grid">
        <!-- CPU Usage -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-dashboard"></uui-icon>
            <h3>CPU Usage</h3>
            <div class="metric-value ${k(this, C, Q).call(this, this._performanceMetrics.cpuUsage, 80)}">
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
            <div class="metric-value ${k(this, C, Q).call(this, this._performanceMetrics.requestMetrics.averageResponseTimeMs, 1e3)}">
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
              Total: ${k(this, C, x).call(this, this._performanceMetrics.requestMetrics.totalRequests)}
            </div>
          </div>
        </uui-box>

        <!-- Failed Requests -->
        <uui-box>
          <div class="metric-card">
            <uui-icon name="icon-alert"></uui-icon>
            <h3>Failed Requests</h3>
            <div class="metric-value ${this._performanceMetrics.requestMetrics.failedRequests > 0 ? "danger" : "positive"}">
              ${k(this, C, x).call(this, this._performanceMetrics.requestMetrics.failedRequests)}
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
              Completed: ${k(this, C, x).call(this, this._performanceMetrics.threadInfo.completedWorkItemCount)}
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
    ` : P`<p>Click "Refresh Metrics" to load application performance data</p>`;
};
ge = function() {
  return this._performanceMetrics ? P`
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
                <div class="gc-value">${k(this, C, x).call(this, this._performanceMetrics.garbageCollectionStats.gen0Collections)}</div>
              </div>
              <div>
                <div class="gc-label">Gen 1</div>
                <div class="gc-value">${k(this, C, x).call(this, this._performanceMetrics.garbageCollectionStats.gen1Collections)}</div>
              </div>
              <div>
                <div class="gc-label">Gen 2</div>
                <div class="gc-value">${k(this, C, x).call(this, this._performanceMetrics.garbageCollectionStats.gen2Collections)}</div>
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
    ` : P`<p>Click "Refresh Metrics" to load heap information</p>`;
};
R.styles = _e`${pe(st)}`;
H([
  N()
], R.prototype, "_contextCurrentUser", 2);
H([
  N()
], R.prototype, "_performanceMetrics", 2);
H([
  N()
], R.prototype, "_autoRefresh", 2);
H([
  N()
], R.prototype, "_activeTab", 2);
H([
  N()
], R.prototype, "_isConnected", 2);
R = H([
  me("umbmetrics-dashboard")
], R);
const ft = R;
export {
  R as ExampleDashboardElement,
  ft as default
};
//# sourceMappingURL=dashboard.element-gW-TodY4.js.map
