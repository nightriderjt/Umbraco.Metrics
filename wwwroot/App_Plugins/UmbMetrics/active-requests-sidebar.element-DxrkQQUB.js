import { html as C, unsafeCSS as ne, css as Q, state as B, customElement as oe } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalElement as se } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as ie } from "@umbraco-cms/backoffice/notification";
import { UMB_AUTH_CONTEXT as re } from "@umbraco-cms/backoffice/auth";
import { UUIModalElement as ae } from "@umbraco-cms/backoffice/external/uui";
class k extends Error {
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
class z extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.TimeoutError}.
   *
   * @param {string} errorMessage A descriptive error message.
   */
  constructor(e = "A timeout occurred.") {
    const t = new.target.prototype;
    super(e), this.__proto__ = t;
  }
}
class b extends Error {
  /** Constructs a new instance of {@link AbortError}.
   *
   * @param {string} errorMessage A descriptive error message.
   */
  constructor(e = "An abort occurred.") {
    const t = new.target.prototype;
    super(e), this.__proto__ = t;
  }
}
class ce extends Error {
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
class le extends Error {
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
class he extends Error {
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
class K extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.FailedToNegotiateWithServerError}.
   *
   * @param {string} message A descriptive error message.
   */
  constructor(e) {
    const t = new.target.prototype;
    super(e), this.errorType = "FailedToNegotiateWithServerError", this.__proto__ = t;
  }
}
class ue extends Error {
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
class Y {
  constructor(e, t, n) {
    this.statusCode = e, this.statusText = t, this.content = n;
  }
}
class U {
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
class x {
  constructor() {
  }
  /** @inheritDoc */
  // eslint-disable-next-line
  log(e, t) {
  }
}
x.instance = new x();
const de = "10.0.0";
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
class f {
  // react-native has a window but no document so we should check both
  static get isBrowser() {
    return !f.isNode && typeof window == "object" && typeof window.document == "object";
  }
  // WebWorkers don't have a window object so the isBrowser check would fail
  static get isWebWorker() {
    return !f.isNode && typeof self == "object" && "importScripts" in self;
  }
  // react-native has a window but no document
  static get isReactNative() {
    return !f.isNode && typeof window == "object" && typeof window.document > "u";
  }
  // Node apps shouldn't have a window object, but WebWorkers don't either
  // so we need to check for both WebWorker and window
  static get isNode() {
    return typeof process < "u" && process.release && process.release.name === "node";
  }
}
function D(o, e) {
  let t = "";
  return I(o) ? (t = `Binary data of length ${o.byteLength}`, e && (t += `. Content: '${ge(o)}'`)) : typeof o == "string" && (t = `String data of length ${o.length}`, e && (t += `. Content: '${o}'`)), t;
}
function ge(o) {
  const e = new Uint8Array(o);
  let t = "";
  return e.forEach((n) => {
    const s = n < 16 ? "0" : "";
    t += `0x${s}${n.toString(16)} `;
  }), t.substring(0, t.length - 1);
}
function I(o) {
  return o && typeof ArrayBuffer < "u" && (o instanceof ArrayBuffer || // Sometimes we get an ArrayBuffer that doesn't satisfy instanceof
  o.constructor && o.constructor.name === "ArrayBuffer");
}
async function Z(o, e, t, n, s, i) {
  const a = {}, [c, l] = T();
  a[c] = l, o.log(r.Trace, `(${e} transport) sending data. ${D(s, i.logMessageContent)}.`);
  const u = I(s) ? "arraybuffer" : "text", d = await t.post(n, {
    content: s,
    headers: { ...a, ...i.headers },
    responseType: u,
    timeout: i.timeout,
    withCredentials: i.withCredentials
  });
  o.log(r.Trace, `(${e} transport) request complete. Response status: ${d.statusCode}.`);
}
function fe(o) {
  return o === void 0 ? new N(r.Information) : o === null ? x.instance : o.log !== void 0 ? o : new N(o);
}
class _e {
  constructor(e, t) {
    this._subject = e, this._observer = t;
  }
  dispose() {
    const e = this._subject.observers.indexOf(this._observer);
    e > -1 && this._subject.observers.splice(e, 1), this._subject.observers.length === 0 && this._subject.cancelCallback && this._subject.cancelCallback().catch((t) => {
    });
  }
}
class N {
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
function T() {
  let o = "X-SignalR-User-Agent";
  return f.isNode && (o = "User-Agent"), [o, pe(de, me(), be(), we())];
}
function pe(o, e, t, n) {
  let s = "Microsoft SignalR/";
  const i = o.split(".");
  return s += `${i[0]}.${i[1]}`, s += ` (${o}; `, e && e !== "" ? s += `${e}; ` : s += "Unknown OS; ", s += `${t}`, n ? s += `; ${n}` : s += "; Unknown Runtime Version", s += ")", s;
}
function me() {
  if (f.isNode)
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
function we() {
  if (f.isNode)
    return process.versions.node;
}
function be() {
  return f.isNode ? "NodeJS" : "Browser";
}
function W(o) {
  return o.stack ? o.stack : o.message ? o.message : `${o}`;
}
function ve() {
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
class ye extends U {
  constructor(e) {
    if (super(), this._logger = e, typeof fetch > "u" || f.isNode) {
      const t = typeof __webpack_require__ == "function" ? __non_webpack_require__ : require;
      this._jar = new (t("tough-cookie")).CookieJar(), typeof fetch > "u" ? this._fetchType = t("node-fetch") : this._fetchType = fetch, this._fetchType = t("fetch-cookie")(this._fetchType, this._jar);
    } else
      this._fetchType = fetch.bind(ve());
    if (typeof AbortController > "u") {
      const t = typeof __webpack_require__ == "function" ? __non_webpack_require__ : require;
      this._abortControllerType = t("abort-controller");
    } else
      this._abortControllerType = AbortController;
  }
  /** @inheritDoc */
  async send(e) {
    if (e.abortSignal && e.abortSignal.aborted)
      throw new b();
    if (!e.method)
      throw new Error("No method defined.");
    if (!e.url)
      throw new Error("No url defined.");
    const t = new this._abortControllerType();
    let n;
    e.abortSignal && (e.abortSignal.onabort = () => {
      t.abort(), n = new b();
    });
    let s = null;
    if (e.timeout) {
      const l = e.timeout;
      s = setTimeout(() => {
        t.abort(), this._logger.log(r.Warning, "Timeout from HTTP request."), n = new z();
      }, l);
    }
    e.content === "" && (e.content = void 0), e.content && (e.headers = e.headers || {}, I(e.content) ? e.headers["Content-Type"] = "application/octet-stream" : e.headers["Content-Type"] = "text/plain;charset=UTF-8");
    let i;
    try {
      i = await this._fetchType(e.url, {
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
      s && clearTimeout(s), e.abortSignal && (e.abortSignal.onabort = null);
    }
    if (!i.ok) {
      const l = await X(i, "text");
      throw new k(l || i.statusText, i.status);
    }
    const c = await X(i, e.responseType);
    return new Y(i.status, i.statusText, c);
  }
  getCookieString(e) {
    let t = "";
    return f.isNode && this._jar && this._jar.getCookies(e, (n, s) => t = s.join("; ")), t;
  }
}
function X(o, e) {
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
class Se extends U {
  constructor(e) {
    super(), this._logger = e;
  }
  /** @inheritDoc */
  send(e) {
    return e.abortSignal && e.abortSignal.aborted ? Promise.reject(new b()) : e.method ? e.url ? new Promise((t, n) => {
      const s = new XMLHttpRequest();
      s.open(e.method, e.url, !0), s.withCredentials = e.withCredentials === void 0 ? !0 : e.withCredentials, s.setRequestHeader("X-Requested-With", "XMLHttpRequest"), e.content === "" && (e.content = void 0), e.content && (I(e.content) ? s.setRequestHeader("Content-Type", "application/octet-stream") : s.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"));
      const i = e.headers;
      i && Object.keys(i).forEach((a) => {
        s.setRequestHeader(a, i[a]);
      }), e.responseType && (s.responseType = e.responseType), e.abortSignal && (e.abortSignal.onabort = () => {
        s.abort(), n(new b());
      }), e.timeout && (s.timeout = e.timeout), s.onload = () => {
        e.abortSignal && (e.abortSignal.onabort = null), s.status >= 200 && s.status < 300 ? t(new Y(s.status, s.statusText, s.response || s.responseText)) : n(new k(s.response || s.responseText || s.statusText, s.status));
      }, s.onerror = () => {
        this._logger.log(r.Warning, `Error from HTTP request. ${s.status}: ${s.statusText}.`), n(new k(s.statusText, s.status));
      }, s.ontimeout = () => {
        this._logger.log(r.Warning, "Timeout from HTTP request."), n(new z());
      }, s.send(e.content);
    }) : Promise.reject(new Error("No url defined.")) : Promise.reject(new Error("No method defined."));
  }
}
class Ce extends U {
  /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
  constructor(e) {
    if (super(), typeof fetch < "u" || f.isNode)
      this._httpClient = new ye(e);
    else if (typeof XMLHttpRequest < "u")
      this._httpClient = new Se(e);
    else
      throw new Error("No usable HttpClient found.");
  }
  /** @inheritDoc */
  send(e) {
    return e.abortSignal && e.abortSignal.aborted ? Promise.reject(new b()) : e.method ? e.url ? this._httpClient.send(e) : Promise.reject(new Error("No url defined.")) : Promise.reject(new Error("No method defined."));
  }
  getCookieString(e) {
    return this._httpClient.getCookieString(e);
  }
}
class w {
  static write(e) {
    return `${e}${w.RecordSeparator}`;
  }
  static parse(e) {
    if (e[e.length - 1] !== w.RecordSeparator)
      throw new Error("Message is incomplete.");
    const t = e.split(w.RecordSeparator);
    return t.pop(), t;
  }
}
w.RecordSeparatorCode = 30;
w.RecordSeparator = String.fromCharCode(w.RecordSeparatorCode);
class ke {
  // Handshake request is always JSON
  writeHandshakeRequest(e) {
    return w.write(JSON.stringify(e));
  }
  parseHandshakeResponse(e) {
    let t, n;
    if (I(e)) {
      const c = new Uint8Array(e), l = c.indexOf(w.RecordSeparatorCode);
      if (l === -1)
        throw new Error("Message is incomplete.");
      const u = l + 1;
      t = String.fromCharCode.apply(null, Array.prototype.slice.call(c.slice(0, u))), n = c.byteLength > u ? c.slice(u).buffer : null;
    } else {
      const c = e, l = c.indexOf(w.RecordSeparator);
      if (l === -1)
        throw new Error("Message is incomplete.");
      const u = l + 1;
      t = c.substring(0, u), n = c.length > u ? c.substring(u) : null;
    }
    const s = w.parse(t), i = JSON.parse(s[0]);
    if (i.type)
      throw new Error("Expected a handshake response from the server.");
    return [n, i];
  }
}
var h;
(function(o) {
  o[o.Invocation = 1] = "Invocation", o[o.StreamItem = 2] = "StreamItem", o[o.Completion = 3] = "Completion", o[o.StreamInvocation = 4] = "StreamInvocation", o[o.CancelInvocation = 5] = "CancelInvocation", o[o.Ping = 6] = "Ping", o[o.Close = 7] = "Close", o[o.Ack = 8] = "Ack", o[o.Sequence = 9] = "Sequence";
})(h || (h = {}));
class Ee {
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
    return this.observers.push(e), new _e(this, e);
  }
}
class Ie {
  constructor(e, t, n) {
    this._bufferSize = 1e5, this._messages = [], this._totalMessageCount = 0, this._waitForSequenceMessage = !1, this._nextReceivingSequenceId = 1, this._latestReceivedSequenceId = 0, this._bufferedByteCount = 0, this._reconnectInProgress = !1, this._protocol = e, this._connection = t, this._bufferSize = n;
  }
  async _send(e) {
    const t = this._protocol.writeMessage(e);
    let n = Promise.resolve();
    if (this._isInvocationMessage(e)) {
      this._totalMessageCount++;
      let s = () => {
      }, i = () => {
      };
      I(t) ? this._bufferedByteCount += t.byteLength : this._bufferedByteCount += t.length, this._bufferedByteCount >= this._bufferSize && (n = new Promise((a, c) => {
        s = a, i = c;
      })), this._messages.push(new Te(t, this._totalMessageCount, s, i));
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
      const s = this._messages[n];
      if (s._id <= e.sequenceId)
        t = n, I(s._message) ? this._bufferedByteCount -= s._message.byteLength : this._bufferedByteCount -= s._message.length, s._resolver();
      else if (this._bufferedByteCount < this._bufferSize)
        s._resolver();
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
class Te {
  constructor(e, t, n, s) {
    this._message = e, this._id = t, this._resolver = n, this._rejector = s;
  }
}
const Re = 30 * 1e3, Pe = 15 * 1e3, $e = 1e5;
var g;
(function(o) {
  o.Disconnected = "Disconnected", o.Connecting = "Connecting", o.Connected = "Connected", o.Disconnecting = "Disconnecting", o.Reconnecting = "Reconnecting";
})(g || (g = {}));
class j {
  /** @internal */
  // Using a public static factory method means we can have a private constructor and an _internal_
  // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
  // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
  // public parameter-less constructor.
  static create(e, t, n, s, i, a, c) {
    return new j(e, t, n, s, i, a, c);
  }
  constructor(e, t, n, s, i, a, c) {
    this._nextKeepAlive = 0, this._freezeEventListener = () => {
      this._logger.log(r.Warning, "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep");
    }, _.isRequired(e, "connection"), _.isRequired(t, "logger"), _.isRequired(n, "protocol"), this.serverTimeoutInMilliseconds = i ?? Re, this.keepAliveIntervalInMilliseconds = a ?? Pe, this._statefulReconnectBufferSize = c ?? $e, this._logger = t, this._protocol = n, this.connection = e, this._reconnectPolicy = s, this._handshakeProtocol = new ke(), this.connection.onreceive = (l) => this._processIncomingData(l), this.connection.onclose = (l) => this._connectionClosed(l), this._callbacks = {}, this._methods = {}, this._closedCallbacks = [], this._reconnectingCallbacks = [], this._reconnectedCallbacks = [], this._invocationId = 0, this._receivedHandshakeResponse = !1, this._connectionState = g.Disconnected, this._connectionStarted = !1, this._cachedPingMessage = this._protocol.writeMessage({ type: h.Ping });
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
    if (this._connectionState !== g.Disconnected && this._connectionState !== g.Reconnecting)
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
    if (this._connectionState !== g.Disconnected)
      return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."));
    this._connectionState = g.Connecting, this._logger.log(r.Debug, "Starting HubConnection.");
    try {
      await this._startInternal(), f.isBrowser && window.document.addEventListener("freeze", this._freezeEventListener), this._connectionState = g.Connected, this._connectionStarted = !0, this._logger.log(r.Debug, "HubConnection connected successfully.");
    } catch (e) {
      return this._connectionState = g.Disconnected, this._logger.log(r.Debug, `HubConnection failed to start successfully because of error '${e}'.`), Promise.reject(e);
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
      this.connection.features.reconnect && (this._messageBuffer = new Ie(this._protocol, this.connection, this._statefulReconnectBufferSize), this.connection.features.disconnected = this._messageBuffer._disconnected.bind(this._messageBuffer), this.connection.features.resend = () => {
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
    if (this._connectionState === g.Disconnected)
      return this._logger.log(r.Debug, `Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`), Promise.resolve();
    if (this._connectionState === g.Disconnecting)
      return this._logger.log(r.Debug, `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`), this._stopPromise;
    const t = this._connectionState;
    return this._connectionState = g.Disconnecting, this._logger.log(r.Debug, "Stopping HubConnection."), this._reconnectDelayHandle ? (this._logger.log(r.Debug, "Connection stopped during reconnect delay. Done reconnecting."), clearTimeout(this._reconnectDelayHandle), this._reconnectDelayHandle = void 0, this._completeClose(), Promise.resolve()) : (t === g.Connected && this._sendCloseMessage(), this._cleanupTimeout(), this._cleanupPingTimer(), this._stopDuringStartError = e || new b("The connection was stopped before the hub handshake could complete."), this.connection.stop(e));
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
    const [n, s] = this._replaceStreamingParams(t), i = this._createStreamInvocation(e, t, s);
    let a;
    const c = new Ee();
    return c.cancelCallback = () => {
      const l = this._createCancelInvocation(i.invocationId);
      return delete this._callbacks[i.invocationId], a.then(() => this._sendWithProtocol(l));
    }, this._callbacks[i.invocationId] = (l, u) => {
      if (u) {
        c.error(u);
        return;
      } else l && (l.type === h.Completion ? l.error ? c.error(new Error(l.error)) : c.complete() : c.next(l.item));
    }, a = this._sendWithProtocol(i).catch((l) => {
      c.error(l), delete this._callbacks[i.invocationId];
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
    const [n, s] = this._replaceStreamingParams(t), i = this._sendWithProtocol(this._createInvocation(e, t, !0, s));
    return this._launchStreams(n, i), i;
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
    const [n, s] = this._replaceStreamingParams(t), i = this._createInvocation(e, t, !1, s);
    return new Promise((c, l) => {
      this._callbacks[i.invocationId] = (d, y) => {
        if (y) {
          l(y);
          return;
        } else d && (d.type === h.Completion ? d.error ? l(new Error(d.error)) : c(d.result) : l(new Error(`Unexpected message type: ${d.type}`)));
      };
      const u = this._sendWithProtocol(i).catch((d) => {
        l(d), delete this._callbacks[i.invocationId];
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
        const s = n.indexOf(t);
        s !== -1 && (n.splice(s, 1), n.length === 0 && delete this._methods[e]);
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
              this._invokeClientMethod(n).catch((s) => {
                this._logger.log(r.Error, `Invoke client method threw error: ${W(s)}`);
              });
              break;
            case h.StreamItem:
            case h.Completion: {
              const s = this._callbacks[n.invocationId];
              if (s) {
                n.type === h.Completion && delete this._callbacks[n.invocationId];
                try {
                  s(n);
                } catch (i) {
                  this._logger.log(r.Error, `Stream callback threw error: ${W(i)}`);
                }
              }
              break;
            }
            case h.Ping:
              break;
            case h.Close: {
              this._logger.log(r.Information, "Close message received from server.");
              const s = n.error ? new Error("Server returned an error on close: " + n.error) : void 0;
              n.allowReconnect === !0 ? this.connection.stop(s) : this._stopPromise = this._stopInternal(s);
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
    } catch (s) {
      const i = "Error parsing handshake response: " + s;
      this._logger.log(r.Error, i);
      const a = new Error(i);
      throw this._handshakeRejecter(a), a;
    }
    if (t.error) {
      const s = "Server returned handshake error: " + t.error;
      this._logger.log(r.Error, s);
      const i = new Error(s);
      throw this._handshakeRejecter(i), i;
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
        this._connectionState === g.Connected && this._trySendPingMessage();
        return;
      }
      this._pingServerHandle === void 0 && (e < 0 && (e = 0), this._pingServerHandle = setTimeout(async () => {
        this._connectionState === g.Connected && await this._trySendPingMessage();
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
    const s = n.slice(), i = !!e.invocationId;
    let a, c, l;
    for (const u of s)
      try {
        const d = a;
        a = await u.apply(this, e.arguments), i && a && d && (this._logger.log(r.Error, `Multiple results provided for '${t}'. Sending error to server.`), l = this._createCompletionMessage(e.invocationId, "Client provided multiple results.", null)), c = void 0;
      } catch (d) {
        c = d, this._logger.log(r.Error, `A callback for the method '${t}' threw error '${d}'.`);
      }
    l ? await this._sendWithProtocol(l) : i ? (c ? l = this._createCompletionMessage(e.invocationId, `${c}`, null) : a !== void 0 ? l = this._createCompletionMessage(e.invocationId, null, a) : (this._logger.log(r.Warning, `No result given for '${t}' method and invocation ID '${e.invocationId}'.`), l = this._createCompletionMessage(e.invocationId, "Client didn't provide a result.", null)), await this._sendWithProtocol(l)) : a && this._logger.log(r.Error, `Result given for '${t}' method but server is not expecting a result.`);
  }
  _connectionClosed(e) {
    this._logger.log(r.Debug, `HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`), this._stopDuringStartError = this._stopDuringStartError || e || new b("The underlying connection was closed before the hub handshake could complete."), this._handshakeResolver && this._handshakeResolver(), this._cancelCallbacksWithError(e || new Error("Invocation canceled due to the underlying connection being closed.")), this._cleanupTimeout(), this._cleanupPingTimer(), this._connectionState === g.Disconnecting ? this._completeClose(e) : this._connectionState === g.Connected && this._reconnectPolicy ? this._reconnect(e) : this._connectionState === g.Connected && this._completeClose(e);
  }
  _completeClose(e) {
    if (this._connectionStarted) {
      this._connectionState = g.Disconnected, this._connectionStarted = !1, this._messageBuffer && (this._messageBuffer._dispose(e ?? new Error("Connection closed.")), this._messageBuffer = void 0), f.isBrowser && window.document.removeEventListener("freeze", this._freezeEventListener);
      try {
        this._closedCallbacks.forEach((t) => t.apply(this, [e]));
      } catch (t) {
        this._logger.log(r.Error, `An onclose callback called with error '${e}' threw error '${t}'.`);
      }
    }
  }
  async _reconnect(e) {
    const t = Date.now();
    let n = 0, s = e !== void 0 ? e : new Error("Attempting to reconnect due to a unknown error."), i = this._getNextRetryDelay(n, 0, s);
    if (i === null) {
      this._logger.log(r.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."), this._completeClose(e);
      return;
    }
    if (this._connectionState = g.Reconnecting, e ? this._logger.log(r.Information, `Connection reconnecting because of error '${e}'.`) : this._logger.log(r.Information, "Connection reconnecting."), this._reconnectingCallbacks.length !== 0) {
      try {
        this._reconnectingCallbacks.forEach((a) => a.apply(this, [e]));
      } catch (a) {
        this._logger.log(r.Error, `An onreconnecting callback called with error '${e}' threw error '${a}'.`);
      }
      if (this._connectionState !== g.Reconnecting) {
        this._logger.log(r.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
        return;
      }
    }
    for (; i !== null; ) {
      if (this._logger.log(r.Information, `Reconnect attempt number ${n + 1} will start in ${i} ms.`), await new Promise((a) => {
        this._reconnectDelayHandle = setTimeout(a, i);
      }), this._reconnectDelayHandle = void 0, this._connectionState !== g.Reconnecting) {
        this._logger.log(r.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
        return;
      }
      try {
        if (await this._startInternal(), this._connectionState = g.Connected, this._logger.log(r.Information, "HubConnection reconnected successfully."), this._reconnectedCallbacks.length !== 0)
          try {
            this._reconnectedCallbacks.forEach((a) => a.apply(this, [this.connection.connectionId]));
          } catch (a) {
            this._logger.log(r.Error, `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${a}'.`);
          }
        return;
      } catch (a) {
        if (this._logger.log(r.Information, `Reconnect attempt failed because of error '${a}'.`), this._connectionState !== g.Reconnecting) {
          this._logger.log(r.Debug, `Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`), this._connectionState === g.Disconnecting && this._completeClose();
          return;
        }
        n++, s = a instanceof Error ? a : new Error(a.toString()), i = this._getNextRetryDelay(n, Date.now() - t, s);
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
    } catch (s) {
      return this._logger.log(r.Error, `IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${s}'.`), null;
    }
  }
  _cancelCallbacksWithError(e) {
    const t = this._callbacks;
    this._callbacks = {}, Object.keys(t).forEach((n) => {
      const s = t[n];
      try {
        s(null, e);
      } catch (i) {
        this._logger.log(r.Error, `Stream 'error' callback called with '${e}' threw error: ${W(i)}`);
      }
    });
  }
  _cleanupPingTimer() {
    this._pingServerHandle && (clearTimeout(this._pingServerHandle), this._pingServerHandle = void 0);
  }
  _cleanupTimeout() {
    this._timeoutHandle && clearTimeout(this._timeoutHandle);
  }
  _createInvocation(e, t, n, s) {
    if (n)
      return s.length !== 0 ? {
        target: e,
        arguments: t,
        streamIds: s,
        type: h.Invocation
      } : {
        target: e,
        arguments: t,
        type: h.Invocation
      };
    {
      const i = this._invocationId;
      return this._invocationId++, s.length !== 0 ? {
        target: e,
        arguments: t,
        invocationId: i.toString(),
        streamIds: s,
        type: h.Invocation
      } : {
        target: e,
        arguments: t,
        invocationId: i.toString(),
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
          error: (s) => {
            let i;
            s instanceof Error ? i = s.message : s && s.toString ? i = s.toString() : i = "Unknown error", t = t.then(() => this._sendWithProtocol(this._createCompletionMessage(n, i)));
          },
          next: (s) => {
            t = t.then(() => this._sendWithProtocol(this._createStreamItemMessage(n, s)));
          }
        });
    }
  }
  _replaceStreamingParams(e) {
    const t = [], n = [];
    for (let s = 0; s < e.length; s++) {
      const i = e[s];
      if (this._isObservable(i)) {
        const a = this._invocationId;
        this._invocationId++, t[a] = i, n.push(a.toString()), e.splice(s, 1);
      }
    }
    return [t, n];
  }
  _isObservable(e) {
    return e && e.subscribe && typeof e.subscribe == "function";
  }
  _createStreamInvocation(e, t, n) {
    const s = this._invocationId;
    return this._invocationId++, n.length !== 0 ? {
      target: e,
      arguments: t,
      invocationId: s.toString(),
      streamIds: n,
      type: h.StreamInvocation
    } : {
      target: e,
      arguments: t,
      invocationId: s.toString(),
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
const xe = [0, 2e3, 1e4, 3e4, null];
class J {
  constructor(e) {
    this._retryDelays = e !== void 0 ? [...e, null] : xe;
  }
  nextRetryDelayInMilliseconds(e) {
    return this._retryDelays[e.previousRetryCount];
  }
}
class E {
}
E.Authorization = "Authorization";
E.Cookie = "Cookie";
class De extends U {
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
    e.headers || (e.headers = {}), this._accessToken ? e.headers[E.Authorization] = `Bearer ${this._accessToken}` : this._accessTokenFactory && e.headers[E.Authorization] && delete e.headers[E.Authorization];
  }
  getCookieString(e) {
    return this._innerClient.getCookieString(e);
  }
}
var p;
(function(o) {
  o[o.None = 0] = "None", o[o.WebSockets = 1] = "WebSockets", o[o.ServerSentEvents = 2] = "ServerSentEvents", o[o.LongPolling = 4] = "LongPolling";
})(p || (p = {}));
var m;
(function(o) {
  o[o.Text = 1] = "Text", o[o.Binary = 2] = "Binary";
})(m || (m = {}));
let Ae = class {
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
class V {
  // This is an internal type, not exported from 'index' so this is really just internal.
  get pollAborted() {
    return this._pollAbort.aborted;
  }
  constructor(e, t, n) {
    this._httpClient = e, this._logger = t, this._pollAbort = new Ae(), this._options = n, this._running = !1, this.onreceive = null, this.onclose = null;
  }
  async connect(e, t) {
    if (_.isRequired(e, "url"), _.isRequired(t, "transferFormat"), _.isIn(t, m, "transferFormat"), this._url = e, this._logger.log(r.Trace, "(LongPolling transport) Connecting."), t === m.Binary && typeof XMLHttpRequest < "u" && typeof new XMLHttpRequest().responseType != "string")
      throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
    const [n, s] = T(), i = { [n]: s, ...this._options.headers }, a = {
      abortSignal: this._pollAbort.signal,
      headers: i,
      timeout: 1e5,
      withCredentials: this._options.withCredentials
    };
    t === m.Binary && (a.responseType = "arraybuffer");
    const c = `${e}&_=${Date.now()}`;
    this._logger.log(r.Trace, `(LongPolling transport) polling: ${c}.`);
    const l = await this._httpClient.get(c, a);
    l.statusCode !== 200 ? (this._logger.log(r.Error, `(LongPolling transport) Unexpected response code: ${l.statusCode}.`), this._closeError = new k(l.statusText || "", l.statusCode), this._running = !1) : this._running = !0, this._receiving = this._poll(this._url, a);
  }
  async _poll(e, t) {
    try {
      for (; this._running; )
        try {
          const n = `${e}&_=${Date.now()}`;
          this._logger.log(r.Trace, `(LongPolling transport) polling: ${n}.`);
          const s = await this._httpClient.get(n, t);
          s.statusCode === 204 ? (this._logger.log(r.Information, "(LongPolling transport) Poll terminated by server."), this._running = !1) : s.statusCode !== 200 ? (this._logger.log(r.Error, `(LongPolling transport) Unexpected response code: ${s.statusCode}.`), this._closeError = new k(s.statusText || "", s.statusCode), this._running = !1) : s.content ? (this._logger.log(r.Trace, `(LongPolling transport) data received. ${D(s.content, this._options.logMessageContent)}.`), this.onreceive && this.onreceive(s.content)) : this._logger.log(r.Trace, "(LongPolling transport) Poll timed out, reissuing.");
        } catch (n) {
          this._running ? n instanceof z ? this._logger.log(r.Trace, "(LongPolling transport) Poll timed out, reissuing.") : (this._closeError = n, this._running = !1) : this._logger.log(r.Trace, `(LongPolling transport) Poll errored after shutdown: ${n.message}`);
        }
    } finally {
      this._logger.log(r.Trace, "(LongPolling transport) Polling complete."), this.pollAborted || this._raiseOnClose();
    }
  }
  async send(e) {
    return this._running ? Z(this._logger, "LongPolling", this._httpClient, this._url, e, this._options) : Promise.reject(new Error("Cannot send until the transport is connected"));
  }
  async stop() {
    this._logger.log(r.Trace, "(LongPolling transport) Stopping polling."), this._running = !1, this._pollAbort.abort();
    try {
      await this._receiving, this._logger.log(r.Trace, `(LongPolling transport) sending DELETE request to ${this._url}.`);
      const e = {}, [t, n] = T();
      e[t] = n;
      const s = {
        headers: { ...e, ...this._options.headers },
        timeout: this._options.timeout,
        withCredentials: this._options.withCredentials
      };
      let i;
      try {
        await this._httpClient.delete(this._url, s);
      } catch (a) {
        i = a;
      }
      i ? i instanceof k && (i.statusCode === 404 ? this._logger.log(r.Trace, "(LongPolling transport) A 404 response was returned from sending a DELETE request.") : this._logger.log(r.Trace, `(LongPolling transport) Error sending a DELETE request: ${i}`)) : this._logger.log(r.Trace, "(LongPolling transport) DELETE request accepted.");
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
class Me {
  constructor(e, t, n, s) {
    this._httpClient = e, this._accessToken = t, this._logger = n, this._options = s, this.onreceive = null, this.onclose = null;
  }
  async connect(e, t) {
    return _.isRequired(e, "url"), _.isRequired(t, "transferFormat"), _.isIn(t, m, "transferFormat"), this._logger.log(r.Trace, "(SSE transport) Connecting."), this._url = e, this._accessToken && (e += (e.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(this._accessToken)}`), new Promise((n, s) => {
      let i = !1;
      if (t !== m.Text) {
        s(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
        return;
      }
      let a;
      if (f.isBrowser || f.isWebWorker)
        a = new this._options.EventSource(e, { withCredentials: this._options.withCredentials });
      else {
        const c = this._httpClient.getCookieString(e), l = {};
        l.Cookie = c;
        const [u, d] = T();
        l[u] = d, a = new this._options.EventSource(e, { withCredentials: this._options.withCredentials, headers: { ...l, ...this._options.headers } });
      }
      try {
        a.onmessage = (c) => {
          if (this.onreceive)
            try {
              this._logger.log(r.Trace, `(SSE transport) data received. ${D(c.data, this._options.logMessageContent)}.`), this.onreceive(c.data);
            } catch (l) {
              this._close(l);
              return;
            }
        }, a.onerror = (c) => {
          i ? this._close() : s(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."));
        }, a.onopen = () => {
          this._logger.log(r.Information, `SSE connected to ${this._url}`), this._eventSource = a, i = !0, n();
        };
      } catch (c) {
        s(c);
        return;
      }
    });
  }
  async send(e) {
    return this._eventSource ? Z(this._logger, "SSE", this._httpClient, this._url, e, this._options) : Promise.reject(new Error("Cannot send until the transport is connected"));
  }
  stop() {
    return this._close(), Promise.resolve();
  }
  _close(e) {
    this._eventSource && (this._eventSource.close(), this._eventSource = void 0, this.onclose && this.onclose(e));
  }
}
class He {
  constructor(e, t, n, s, i, a) {
    this._logger = n, this._accessTokenFactory = t, this._logMessageContent = s, this._webSocketConstructor = i, this._httpClient = e, this.onreceive = null, this.onclose = null, this._headers = a;
  }
  async connect(e, t) {
    _.isRequired(e, "url"), _.isRequired(t, "transferFormat"), _.isIn(t, m, "transferFormat"), this._logger.log(r.Trace, "(WebSockets transport) Connecting.");
    let n;
    return this._accessTokenFactory && (n = await this._accessTokenFactory()), new Promise((s, i) => {
      e = e.replace(/^http/, "ws");
      let a;
      const c = this._httpClient.getCookieString(e);
      let l = !1;
      if (f.isNode || f.isReactNative) {
        const u = {}, [d, y] = T();
        u[d] = y, n && (u[E.Authorization] = `Bearer ${n}`), c && (u[E.Cookie] = c), a = new this._webSocketConstructor(e, void 0, {
          headers: { ...u, ...this._headers }
        });
      } else
        n && (e += (e.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(n)}`);
      a || (a = new this._webSocketConstructor(e)), t === m.Binary && (a.binaryType = "arraybuffer"), a.onopen = (u) => {
        this._logger.log(r.Information, `WebSocket connected to ${e}.`), this._webSocket = a, l = !0, s();
      }, a.onerror = (u) => {
        let d = null;
        typeof ErrorEvent < "u" && u instanceof ErrorEvent ? d = u.error : d = "There was an error with the transport", this._logger.log(r.Information, `(WebSockets transport) ${d}.`);
      }, a.onmessage = (u) => {
        if (this._logger.log(r.Trace, `(WebSockets transport) data received. ${D(u.data, this._logMessageContent)}.`), this.onreceive)
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
          typeof ErrorEvent < "u" && u instanceof ErrorEvent ? d = u.error : d = "WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.", i(new Error(d));
        }
      };
    });
  }
  send(e) {
    return this._webSocket && this._webSocket.readyState === this._webSocketConstructor.OPEN ? (this._logger.log(r.Trace, `(WebSockets transport) sending data. ${D(e, this._logMessageContent)}.`), this._webSocket.send(e), Promise.resolve()) : Promise.reject("WebSocket is not in the OPEN state");
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
const G = 100;
class Ne {
  constructor(e, t = {}) {
    if (this._stopPromiseResolver = () => {
    }, this.features = {}, this._negotiateVersion = 1, _.isRequired(e, "url"), this._logger = fe(t.logger), this.baseUrl = this._resolveUrl(e), t = t || {}, t.logMessageContent = t.logMessageContent === void 0 ? !1 : t.logMessageContent, typeof t.withCredentials == "boolean" || t.withCredentials === void 0)
      t.withCredentials = t.withCredentials === void 0 ? !0 : t.withCredentials;
    else
      throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");
    t.timeout = t.timeout === void 0 ? 100 * 1e3 : t.timeout;
    let n = null, s = null;
    if (f.isNode && typeof require < "u") {
      const i = typeof __webpack_require__ == "function" ? __non_webpack_require__ : require;
      n = i("ws"), s = i("eventsource");
    }
    !f.isNode && typeof WebSocket < "u" && !t.WebSocket ? t.WebSocket = WebSocket : f.isNode && !t.WebSocket && n && (t.WebSocket = n), !f.isNode && typeof EventSource < "u" && !t.EventSource ? t.EventSource = EventSource : f.isNode && !t.EventSource && typeof s < "u" && (t.EventSource = s), this._httpClient = new De(t.httpClient || new Ce(this._logger), t.accessTokenFactory), this._connectionState = "Disconnected", this._connectionStarted = !1, this._options = t, this.onreceive = null, this.onclose = null;
  }
  async start(e) {
    if (e = e || m.Binary, _.isIn(e, m, "transferFormat"), this._logger.log(r.Debug, `Starting connection with transfer format '${m[e]}'.`), this._connectionState !== "Disconnected")
      return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));
    if (this._connectionState = "Connecting", this._startInternalPromise = this._startInternal(e), await this._startInternalPromise, this._connectionState === "Disconnecting") {
      const t = "Failed to start the HttpConnection before stop() was called.";
      return this._logger.log(r.Error, t), await this._stopPromise, Promise.reject(new b(t));
    } else if (this._connectionState !== "Connected") {
      const t = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
      return this._logger.log(r.Error, t), Promise.reject(new b(t));
    }
    this._connectionStarted = !0;
  }
  send(e) {
    return this._connectionState !== "Connected" ? Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")) : (this._sendQueue || (this._sendQueue = new O(this.transport)), this._sendQueue.send(e));
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
        if (this._options.transport === p.WebSockets)
          this.transport = this._constructTransport(p.WebSockets), await this._startTransport(t, e);
        else
          throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");
      else {
        let n = null, s = 0;
        do {
          if (n = await this._getNegotiationResponse(t), this._connectionState === "Disconnecting" || this._connectionState === "Disconnected")
            throw new b("The connection was stopped during negotiation.");
          if (n.error)
            throw new Error(n.error);
          if (n.ProtocolVersion)
            throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
          if (n.url && (t = n.url), n.accessToken) {
            const i = n.accessToken;
            this._accessTokenFactory = () => i, this._httpClient._accessToken = i, this._httpClient._accessTokenFactory = void 0;
          }
          s++;
        } while (n.url && s < G);
        if (s === G && n.url)
          throw new Error("Negotiate redirection limit exceeded.");
        await this._createTransport(t, this._options.transport, n, e);
      }
      this.transport instanceof V && (this.features.inherentKeepAlive = !0), this._connectionState === "Connecting" && (this._logger.log(r.Debug, "The HttpConnection connected successfully."), this._connectionState = "Connected");
    } catch (n) {
      return this._logger.log(r.Error, "Failed to start the connection: " + n), this._connectionState = "Disconnected", this.transport = void 0, this._stopPromiseResolver(), Promise.reject(n);
    }
  }
  async _getNegotiationResponse(e) {
    const t = {}, [n, s] = T();
    t[n] = s;
    const i = this._resolveNegotiateUrl(e);
    this._logger.log(r.Debug, `Sending negotiation request: ${i}.`);
    try {
      const a = await this._httpClient.post(i, {
        content: "",
        headers: { ...t, ...this._options.headers },
        timeout: this._options.timeout,
        withCredentials: this._options.withCredentials
      });
      if (a.statusCode !== 200)
        return Promise.reject(new Error(`Unexpected status code returned from negotiate '${a.statusCode}'`));
      const c = JSON.parse(a.content);
      return (!c.negotiateVersion || c.negotiateVersion < 1) && (c.connectionToken = c.connectionId), c.useStatefulReconnect && this._options._useStatefulReconnect !== !0 ? Promise.reject(new K("Client didn't negotiate Stateful Reconnect but the server did.")) : c;
    } catch (a) {
      let c = "Failed to complete negotiation with the server: " + a;
      return a instanceof k && a.statusCode === 404 && (c = c + " Either this is not a SignalR endpoint or there is a proxy blocking the connection."), this._logger.log(r.Error, c), Promise.reject(new K(c));
    }
  }
  _createConnectUrl(e, t) {
    return t ? e + (e.indexOf("?") === -1 ? "?" : "&") + `id=${t}` : e;
  }
  async _createTransport(e, t, n, s) {
    let i = this._createConnectUrl(e, n.connectionToken);
    if (this._isITransport(t)) {
      this._logger.log(r.Debug, "Connection was provided an instance of ITransport, using that directly."), this.transport = t, await this._startTransport(i, s), this.connectionId = n.connectionId;
      return;
    }
    const a = [], c = n.availableTransports || [];
    let l = n;
    for (const u of c) {
      const d = this._resolveTransportOrError(u, t, s, l?.useStatefulReconnect === !0);
      if (d instanceof Error)
        a.push(`${u.transport} failed:`), a.push(d);
      else if (this._isITransport(d)) {
        if (this.transport = d, !l) {
          try {
            l = await this._getNegotiationResponse(e);
          } catch (y) {
            return Promise.reject(y);
          }
          i = this._createConnectUrl(e, l.connectionToken);
        }
        try {
          await this._startTransport(i, s), this.connectionId = l.connectionId;
          return;
        } catch (y) {
          if (this._logger.log(r.Error, `Failed to start the transport '${u.transport}': ${y}`), l = void 0, a.push(new he(`${u.transport} failed: ${y}`, p[u.transport])), this._connectionState !== "Connecting") {
            const F = "Failed to select transport before stop() was called.";
            return this._logger.log(r.Debug, F), Promise.reject(new b(F));
          }
        }
      }
    }
    return a.length > 0 ? Promise.reject(new ue(`Unable to connect to the server with any of the available transports. ${a.join(" ")}`, a)) : Promise.reject(new Error("None of the transports supported by the client are supported by the server."));
  }
  _constructTransport(e) {
    switch (e) {
      case p.WebSockets:
        if (!this._options.WebSocket)
          throw new Error("'WebSocket' is not supported in your environment.");
        return new He(this._httpClient, this._accessTokenFactory, this._logger, this._options.logMessageContent, this._options.WebSocket, this._options.headers || {});
      case p.ServerSentEvents:
        if (!this._options.EventSource)
          throw new Error("'EventSource' is not supported in your environment.");
        return new Me(this._httpClient, this._httpClient._accessToken, this._logger, this._options);
      case p.LongPolling:
        return new V(this._httpClient, this._logger, this._options);
      default:
        throw new Error(`Unknown transport: ${e}.`);
    }
  }
  _startTransport(e, t) {
    return this.transport.onreceive = this.onreceive, this.features.reconnect ? this.transport.onclose = async (n) => {
      let s = !1;
      if (this.features.reconnect)
        try {
          this.features.disconnected(), await this.transport.connect(e, t), await this.features.resend();
        } catch {
          s = !0;
        }
      else {
        this._stopConnection(n);
        return;
      }
      s && this._stopConnection(n);
    } : this.transport.onclose = (n) => this._stopConnection(n), this.transport.connect(e, t);
  }
  _resolveTransportOrError(e, t, n, s) {
    const i = p[e.transport];
    if (i == null)
      return this._logger.log(r.Debug, `Skipping transport '${e.transport}' because it is not supported by this client.`), new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);
    if (Ue(t, i))
      if (e.transferFormats.map((c) => m[c]).indexOf(n) >= 0) {
        if (i === p.WebSockets && !this._options.WebSocket || i === p.ServerSentEvents && !this._options.EventSource)
          return this._logger.log(r.Debug, `Skipping transport '${p[i]}' because it is not supported in your environment.'`), new ce(`'${p[i]}' is not supported in your environment.`, i);
        this._logger.log(r.Debug, `Selecting transport '${p[i]}'.`);
        try {
          return this.features.reconnect = i === p.WebSockets ? s : void 0, this._constructTransport(i);
        } catch (c) {
          return c;
        }
      } else
        return this._logger.log(r.Debug, `Skipping transport '${p[i]}' because it does not support the requested transfer format '${m[n]}'.`), new Error(`'${p[i]}' does not support ${m[n]}.`);
    else
      return this._logger.log(r.Debug, `Skipping transport '${p[i]}' because it was disabled by the client.`), new le(`'${p[i]}' is disabled by the client.`, i);
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
    if (!f.isBrowser)
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
function Ue(o, e) {
  return !o || (e & o) !== 0;
}
class O {
  constructor(e) {
    this._transport = e, this._buffer = [], this._executing = !0, this._sendBufferedData = new A(), this._transportResult = new A(), this._sendLoopPromise = this._sendLoop();
  }
  send(e) {
    return this._bufferData(e), this._transportResult || (this._transportResult = new A()), this._transportResult.promise;
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
      this._sendBufferedData = new A();
      const e = this._transportResult;
      this._transportResult = void 0;
      const t = typeof this._buffer[0] == "string" ? this._buffer.join("") : O._concatBuffers(this._buffer);
      this._buffer.length = 0;
      try {
        await this._transport.send(t), e.resolve();
      } catch (n) {
        e.reject(n);
      }
    }
  }
  static _concatBuffers(e) {
    const t = e.map((i) => i.byteLength).reduce((i, a) => i + a), n = new Uint8Array(t);
    let s = 0;
    for (const i of e)
      n.set(new Uint8Array(i), s), s += i.byteLength;
    return n.buffer;
  }
}
class A {
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
const qe = "json";
class We {
  constructor() {
    this.name = qe, this.version = 2, this.transferFormat = m.Text;
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
    t === null && (t = x.instance);
    const n = w.parse(e), s = [];
    for (const i of n) {
      const a = JSON.parse(i);
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
      s.push(a);
    }
    return s;
  }
  /** Writes the specified {@link @microsoft/signalr.HubMessage} to a string and returns it.
   *
   * @param {HubMessage} message The message to write.
   * @returns {string} A string containing the serialized representation of the message.
   */
  writeMessage(e) {
    return w.write(JSON.stringify(e));
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
const Le = {
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
function Be(o) {
  const e = Le[o.toLowerCase()];
  if (typeof e < "u")
    return e;
  throw new Error(`Unknown log level: ${o}`);
}
class ze {
  configureLogging(e) {
    if (_.isRequired(e, "logging"), je(e))
      this.logger = e;
    else if (typeof e == "string") {
      const t = Be(e);
      this.logger = new N(t);
    } else
      this.logger = new N(e);
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
    return e ? Array.isArray(e) ? this.reconnectPolicy = new J(e) : this.reconnectPolicy = e : this.reconnectPolicy = new J(), this;
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
    const t = new Ne(this.url, e);
    return j.create(t, this.logger || x.instance, this.protocol || new We(), this.reconnectPolicy, this._serverTimeoutInMilliseconds, this._keepAliveIntervalInMilliseconds, this._statefulReconnectBufferSize);
  }
}
function je(o) {
  return o.log !== void 0;
}
class Oe {
  constructor(e) {
    this.#o = /* @__PURE__ */ new Set(), this.#t = !1, this.API_BASE_URL = "/umbraco/management/api/v1/metrics", this.HUB_URL = "/umbraco/metrics-hub", this.#n = e;
  }
  #e;
  #o;
  #t;
  #n;
  /**
   * Fetches current performance metrics from the server (one-time request)
   */
  async getPerformanceMetrics() {
    const e = await this.#n();
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
      console.log("Connection already in progress, waiting..."), await this.#s();
      return;
    }
    if (this.#e?.state === g.Connected) {
      console.log("Already connected to hub");
      return;
    }
    this.#e && await this.disconnectFromHub(), this.#t = !0;
    try {
      console.log("Building SignalR connection..."), this.#e = new ze().withUrl(this.HUB_URL, {
        accessTokenFactory: async () => await this.#n()
      }).withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (t) => t.previousRetryCount === 0 ? 0 : t.previousRetryCount === 1 ? 2e3 : t.previousRetryCount === 2 ? 5e3 : t.previousRetryCount === 3 ? 1e4 : 3e4
      }).configureLogging(r.Information).build(), this.#e.on("ReceiveMetrics", (t) => {
        console.log("Received metrics from SignalR"), this.#i(t);
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
  async #s(e = 2e4) {
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
    return this.#o.add(e), () => {
      this.#o.delete(e);
    };
  }
  /**
   * Manually request metrics update from the hub
   */
  async requestMetrics() {
    if (!this.#e || this.#e.state !== g.Connected)
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
    return this.#e?.state === g.Connected;
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
    const e = await this.#n(), t = await fetch(`${this.API_BASE_URL}/umb`, {
      headers: {
        Authorization: `Bearer ${e}`,
        "Content-Type": "application/json"
      }
    });
    if (!t.ok)
      throw new Error(`Failed to fetch Umbraco metrics: ${t.statusText}`);
    return await t.json();
  }
  /**
   * Fetches active requests from the server
   */
  async getActiveRequests() {
    const e = await this.#n();
    if (!e)
      throw new Error("No authentication token available");
    const t = await fetch(`${this.API_BASE_URL}/active-requests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${e}`
      }
    });
    if (!t.ok)
      throw t.status === 401 ? new Error("Unauthorized: Please ensure you are logged into the Umbraco backoffice") : new Error(
        `Failed to fetch active requests: ${t.status} ${t.statusText}`
      );
    return await t.json();
  }
  #i(e) {
    this.#o.forEach((t) => {
      try {
        t(e);
      } catch (n) {
        console.error("Error in metrics listener:", n);
      }
    });
  }
}
const Fe = ".align-center-self{align-self:center}.modal-content{height:100%;display:flex;flex-direction:column;min-height:0}.loading-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--uui-size-space-4);padding:var(--uui-size-space-12);color:var(--uui-color-text-alt);flex:1}.loading-state p{margin:0;font-size:var(--uui-font-size-3)}.empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:var(--uui-size-space-12);text-align:center;color:var(--uui-color-text-alt);flex:1}.empty-state uui-icon{font-size:var(--uui-font-size-12);color:var(--uui-color-positive);margin-bottom:var(--uui-size-space-4)}.empty-state h3{margin:0 0 var(--uui-size-space-1);font-size:var(--uui-font-size-4);font-weight:600}.empty-state p{margin:0;font-size:var(--uui-font-size-2);opacity:.7}.requests-summary{padding:var(--uui-size-space-4);border-bottom:1px solid var(--uui-color-border);background:var(--uui-color-surface)}.summary-text{font-size:var(--uui-font-size-3);font-weight:600;color:var(--uui-color-text)}.requests-container{flex:1;overflow-y:auto;padding:var(--uui-size-space-4);display:flex;flex-direction:column;gap:var(--uui-size-space-3)}.request-item{background:var(--uui-color-surface);border:1px solid var(--uui-color-border);border-radius:var(--uui-border-radius);overflow:hidden}.request-header{display:flex;align-items:flex-start;gap:var(--uui-size-space-3);padding:var(--uui-size-space-3) var(--uui-size-space-4);background:var(--uui-color-surface-alt);border-bottom:1px solid var(--uui-color-border)}.method-tag{font-weight:700;text-transform:uppercase;min-width:60px;justify-content:center;flex-shrink:0}.request-main-info{flex:1;display:flex;flex-direction:column;gap:var(--uui-size-space-1);min-width:0}.request-path{font-family:var(--uui-font-family-monospace);font-size:var(--uui-font-size-2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.request-duration{font-size:var(--uui-font-size-1);font-weight:600;color:var(--uui-color-interactive)}.request-details{padding:var(--uui-size-space-3) var(--uui-size-space-4);display:flex;flex-direction:column;gap:var(--uui-size-space-2)}.detail-item{display:flex;align-items:center;gap:var(--uui-size-space-2);font-size:var(--uui-font-size-2);color:var(--uui-color-text-alt)}.detail-item uui-icon{font-size:var(--uui-font-size-3);opacity:.7;flex-shrink:0;width:16px}.query-string{font-family:var(--uui-font-family-monospace);font-size:var(--uui-font-size-1);word-break:break-all}";
var Ke = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, ee = (o) => {
  throw TypeError(o);
}, q = (o, e, t, n) => {
  for (var s = n > 1 ? void 0 : n ? Xe(e, t) : e, i = o.length - 1, a; i >= 0; i--)
    (a = o[i]) && (s = (n ? a(e, t, s) : a(s)) || s);
  return n && s && Ke(e, t, s), s;
}, te = (o, e, t) => e.has(o) || ee("Cannot " + t), S = (o, e, t) => (te(o, e, "read from private field"), t ? t.call(o) : e.get(o)), M = (o, e, t) => e.has(o) ? ee("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(o) : e.set(o, t), L = (o, e, t, n) => (te(o, e, "write to private field"), e.set(o, t), t), R, H, P, $;
let v = class extends se {
  constructor() {
    super(), this._requests = [], this._loading = !1, M(this, R), M(this, H), M(this, P), this._autoRefresh = !1, M(this, $, async () => {
      if (!S(this, P)) {
        console.error("Metrics service not initialized");
        return;
      }
      this._loading = !0;
      try {
        this._requests = await S(this, P).getActiveRequests();
      } catch (o) {
        console.error("Error loading active requests:", o), S(this, R) && S(this, R).peek("danger", {
          data: {
            headline: "Error",
            message: o instanceof Error ? o.message : "Failed to load active requests"
          }
        });
      } finally {
        this._loading = !1;
      }
    }), this.consumeContext(ie, (o) => {
      L(this, R, o);
    }), this.consumeContext(re, (o) => {
      L(this, H, o), L(this, P, new Oe(async () => {
        const e = await S(this, H)?.getLatestToken();
        if (!e)
          throw new Error("No authentication token available");
        return e;
      }));
    });
  }
  connectedCallback() {
    super.connectedCallback(), this._setupKeyboardNavigation(), S(this, $).call(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._stopAutoRefresh(), this._cleanupKeyboardNavigation();
  }
  _setupKeyboardNavigation() {
    const o = (e) => {
      e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), this._rejectModal());
    };
    document.addEventListener("keydown", o), this._cleanupKeyboardNavigation = () => {
      document.removeEventListener("keydown", o);
    };
  }
  _cleanupKeyboardNavigation() {
  }
  _rejectModal() {
    this.modalContext?.reject();
  }
  _submitModal() {
    this.modalContext?.submit();
  }
  _toggleAutoRefresh() {
    this._autoRefresh = !this._autoRefresh, this._autoRefresh ? this._startAutoRefresh() : this._stopAutoRefresh();
  }
  _startAutoRefresh() {
    this._stopAutoRefresh(), this._refreshInterval = window.setInterval(() => {
      S(this, $).call(this);
    }, 1e3);
  }
  _stopAutoRefresh() {
    this._refreshInterval && (clearInterval(this._refreshInterval), this._refreshInterval = void 0);
  }
  _formatDuration(o) {
    return o < 1e3 ? `${o.toFixed(0)} ms` : o < 6e4 ? `${(o / 1e3).toFixed(1)} s` : `${(o / 6e4).toFixed(1)} min`;
  }
  _getMethodLook(o) {
    switch (o.toUpperCase()) {
      case "GET":
        return "primary";
      case "POST":
        return "secondary";
      case "PUT":
        return "secondary";
      case "DELETE":
        return "outline";
      default:
        return "default";
    }
  }
  _truncateUserAgent(o) {
    return o.length > 50 ? o.substring(0, 47) + "..." : o;
  }
  _formatTime(o) {
    try {
      return new Date(o).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    } catch {
      return o;
    }
  }
  render() {
    return C`
      <!-- Modal Layout Structure -->
      <umb-modal-container>
<umb-modal-sidebar>

<umb-body-layout headline="Active Requests">    

        <!-- Modal content -->
        <div class="modal-content">
          ${this._loading ? C`
            <div class="loading-state">
              <uui-loader></uui-loader>
              <p>Loading active requests...</p>
            </div>
          ` : this._requests.length === 0 ? C`
            <div class="empty-state">
              <uui-icon name="icon-check"></uui-icon>
              <h3>No active requests</h3>
              <p>All requests have completed</p>
            </div>
          ` : C`
            <!-- Requests summary -->
            <div class="requests-summary">
              <span class="summary-text">
                ${this._requests.length} active request${this._requests.length !== 1 ? "s" : ""}
              </span>
            </div>

            <!-- Requests list -->
            <div class="requests-container">
              ${this._requests.map((o) => C`
                <div class="request-item">
                  <!-- Request header with method, path, and duration -->
                  <div class="request-header">
                    <uui-tag look="${this._getMethodLook(o.method)}" class="method-tag">
                      ${o.method}
                    </uui-tag>
                    
                    <div class="request-main-info">
                      <span class="request-path" title="${o.path}${o.queryString}">
                        ${o.path}
                      </span>
                      <span class="request-duration">
                        ${this._formatDuration(o.durationMs)}
                      </span>
                    </div>
                  </div>

                  <!-- Request details -->
                  <div class="request-details">
                    <div class="detail-item">
                      <uui-icon name="icon-time"></uui-icon>
                      <span>${this._formatTime(o.startTime)}</span>
                    </div>
                    
                    ${o.queryString ? C`
                      <div class="detail-item">
                        <uui-icon name="icon-search"></uui-icon>
                        <span class="query-string">${o.queryString}</span>
                      </div>
                    ` : ""}
                    
                    <div class="detail-item">
                      <uui-icon name="icon-globe"></uui-icon>
                      <span>${o.remoteIp}</span>
                    </div>
                    
                    ${o.userAgent ? C`
                      <div class="detail-item">
                        <uui-icon name="icon-browser-window"></uui-icon>
                        <span title="${o.userAgent}">
                          ${this._truncateUserAgent(o.userAgent)}
                        </span>
                      </div>
                    ` : ""}
                  </div>
                </div>
              `)}
            </div>
          `}
        </div>
        <umb-footer-layout  slot="footer">  <uui-toggle class="align-center-self" slot="actions"
              label="Auto-refresh"
            .checked="${this._autoRefresh}"
            @change="${this._toggleAutoRefresh}"
          ></uui-toggle>    <uui-button slot="actions" color="positive" look="primary" @click="${S(this, $)}">
            <uui-icon name="icon-refresh"></uui-icon>Refresh
          </uui-button>
         
<uui-button slot="actions" look="primary" color="danger" type="button" @click=${this._rejectModal}>Close</uui-button> 
        
           
        </umb-footer-layout>
      </umb-body-layout>
</umb-modal-sidebar>
 
      </umb-modal-container>
     
    `;
  }
};
R = /* @__PURE__ */ new WeakMap();
H = /* @__PURE__ */ new WeakMap();
P = /* @__PURE__ */ new WeakMap();
$ = /* @__PURE__ */ new WeakMap();
v.customstyles = Q`${ne(Fe)}`;
v.styles = [...ae.styles, v.customstyles, Q``];
q([
  B()
], v.prototype, "_requests", 2);
q([
  B()
], v.prototype, "_loading", 2);
q([
  B()
], v.prototype, "_autoRefresh", 2);
v = q([
  oe("umbmetrics-active-requests-sidebar")
], v);
const Je = v, tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ActiveRequestsSidebarElement() {
    return v;
  },
  default: Je
}, Symbol.toStringTag, { value: "Module" }));
export {
  Oe as M,
  tt as a
};
//# sourceMappingURL=active-requests-sidebar.element-DxrkQQUB.js.map
