import { LitElement as G, html as f, css as X, property as w, customElement as V, state as P, unsafeCSS as Ye } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as K } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT as Ze } from "@umbraco-cms/backoffice/notification";
import { UMB_CURRENT_USER_CONTEXT as et } from "@umbraco-cms/backoffice/current-user";
import { UMB_AUTH_CONTEXT as tt } from "@umbraco-cms/backoffice/auth";
class B extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.HttpError}.
   *
   * @param {string} errorMessage A descriptive error message.
   * @param {number} statusCode The HTTP status code represented by this error.
   */
  constructor(e, t) {
    const o = new.target.prototype;
    super(`${e}: Status code '${t}'`), this.statusCode = t, this.__proto__ = o;
  }
}
class Ee extends Error {
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
class nt extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.UnsupportedTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(e, t) {
    const o = new.target.prototype;
    super(e), this.transport = t, this.errorType = "UnsupportedTransportError", this.__proto__ = o;
  }
}
class ot extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.DisabledTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(e, t) {
    const o = new.target.prototype;
    super(e), this.transport = t, this.errorType = "DisabledTransportError", this.__proto__ = o;
  }
}
class it extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.FailedToStartTransportError}.
   *
   * @param {string} message A descriptive error message.
   * @param {HttpTransportType} transport The {@link @microsoft/signalr.HttpTransportType} this error occurred on.
   */
  constructor(e, t) {
    const o = new.target.prototype;
    super(e), this.transport = t, this.errorType = "FailedToStartTransportError", this.__proto__ = o;
  }
}
class De extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.FailedToNegotiateWithServerError}.
   *
   * @param {string} message A descriptive error message.
   */
  constructor(e) {
    const t = new.target.prototype;
    super(e), this.errorType = "FailedToNegotiateWithServerError", this.__proto__ = t;
  }
}
class st extends Error {
  /** Constructs a new instance of {@link @microsoft/signalr.AggregateErrors}.
   *
   * @param {string} message A descriptive error message.
   * @param {Error[]} innerErrors The collection of errors this error is aggregating.
   */
  constructor(e, t) {
    const o = new.target.prototype;
    super(e), this.innerErrors = t, this.__proto__ = o;
  }
}
class Ne {
  constructor(e, t, o) {
    this.statusCode = e, this.statusText = t, this.content = o;
  }
}
class de {
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
var a;
(function(n) {
  n[n.Trace = 0] = "Trace", n[n.Debug = 1] = "Debug", n[n.Information = 2] = "Information", n[n.Warning = 3] = "Warning", n[n.Error = 4] = "Error", n[n.Critical = 5] = "Critical", n[n.None = 6] = "None";
})(a || (a = {}));
class Y {
  constructor() {
  }
  /** @inheritDoc */
  // eslint-disable-next-line
  log(e, t) {
  }
}
Y.instance = new Y();
const rt = "10.0.0";
class m {
  static isRequired(e, t) {
    if (e == null)
      throw new Error(`The '${t}' argument is required.`);
  }
  static isNotEmpty(e, t) {
    if (!e || e.match(/^\s*$/))
      throw new Error(`The '${t}' argument should not be empty.`);
  }
  static isIn(e, t, o) {
    if (!(e in t))
      throw new Error(`Unknown ${o} value: ${e}.`);
  }
}
class _ {
  // react-native has a window but no document so we should check both
  static get isBrowser() {
    return !_.isNode && typeof window == "object" && typeof window.document == "object";
  }
  // WebWorkers don't have a window object so the isBrowser check would fail
  static get isWebWorker() {
    return !_.isNode && typeof self == "object" && "importScripts" in self;
  }
  // react-native has a window but no document
  static get isReactNative() {
    return !_.isNode && typeof window == "object" && typeof window.document > "u";
  }
  // Node apps shouldn't have a window object, but WebWorkers don't either
  // so we need to check for both WebWorker and window
  static get isNode() {
    return typeof process < "u" && process.release && process.release.name === "node";
  }
}
function Z(n, e) {
  let t = "";
  return N(n) ? (t = `Binary data of length ${n.byteLength}`, e && (t += `. Content: '${at(n)}'`)) : typeof n == "string" && (t = `String data of length ${n.length}`, e && (t += `. Content: '${n}'`)), t;
}
function at(n) {
  const e = new Uint8Array(n);
  let t = "";
  return e.forEach((o) => {
    const i = o < 16 ? "0" : "";
    t += `0x${i}${o.toString(16)} `;
  }), t.substring(0, t.length - 1);
}
function N(n) {
  return n && typeof ArrayBuffer < "u" && (n instanceof ArrayBuffer || // Sometimes we get an ArrayBuffer that doesn't satisfy instanceof
  n.constructor && n.constructor.name === "ArrayBuffer");
}
async function Oe(n, e, t, o, i, s) {
  const r = {}, [c, l] = j();
  r[c] = l, n.log(a.Trace, `(${e} transport) sending data. ${Z(i, s.logMessageContent)}.`);
  const d = N(i) ? "arraybuffer" : "text", g = await t.post(o, {
    content: i,
    headers: { ...r, ...s.headers },
    responseType: d,
    timeout: s.timeout,
    withCredentials: s.withCredentials
  });
  n.log(a.Trace, `(${e} transport) request complete. Response status: ${g.statusCode}.`);
}
function ct(n) {
  return n === void 0 ? new he(a.Information) : n === null ? Y.instance : n.log !== void 0 ? n : new he(n);
}
class lt {
  constructor(e, t) {
    this._subject = e, this._observer = t;
  }
  dispose() {
    const e = this._subject.observers.indexOf(this._observer);
    e > -1 && this._subject.observers.splice(e, 1), this._subject.observers.length === 0 && this._subject.cancelCallback && this._subject.cancelCallback().catch((t) => {
    });
  }
}
class he {
  constructor(e) {
    this._minLevel = e, this.out = console;
  }
  log(e, t) {
    if (e >= this._minLevel) {
      const o = `[${(/* @__PURE__ */ new Date()).toISOString()}] ${a[e]}: ${t}`;
      switch (e) {
        case a.Critical:
        case a.Error:
          this.out.error(o);
          break;
        case a.Warning:
          this.out.warn(o);
          break;
        case a.Information:
          this.out.info(o);
          break;
        default:
          this.out.log(o);
          break;
      }
    }
  }
}
function j() {
  let n = "X-SignalR-User-Agent";
  return _.isNode && (n = "User-Agent"), [n, ht(rt, ut(), gt(), dt())];
}
function ht(n, e, t, o) {
  let i = "Microsoft SignalR/";
  const s = n.split(".");
  return i += `${s[0]}.${s[1]}`, i += ` (${n}; `, e && e !== "" ? i += `${e}; ` : i += "Unknown OS; ", i += `${t}`, o ? i += `; ${o}` : i += "; Unknown Runtime Version", i += ")", i;
}
function ut() {
  if (_.isNode)
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
function dt() {
  if (_.isNode)
    return process.versions.node;
}
function gt() {
  return _.isNode ? "NodeJS" : "Browser";
}
function ge(n) {
  return n.stack ? n.stack : n.message ? n.message : `${n}`;
}
function pt() {
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
class ft extends de {
  constructor(e) {
    if (super(), this._logger = e, typeof fetch > "u" || _.isNode) {
      const t = typeof __webpack_require__ == "function" ? __non_webpack_require__ : require;
      this._jar = new (t("tough-cookie")).CookieJar(), typeof fetch > "u" ? this._fetchType = t("node-fetch") : this._fetchType = fetch, this._fetchType = t("fetch-cookie")(this._fetchType, this._jar);
    } else
      this._fetchType = fetch.bind(pt());
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
    let o;
    e.abortSignal && (e.abortSignal.onabort = () => {
      t.abort(), o = new T();
    });
    let i = null;
    if (e.timeout) {
      const l = e.timeout;
      i = setTimeout(() => {
        t.abort(), this._logger.log(a.Warning, "Timeout from HTTP request."), o = new Ee();
      }, l);
    }
    e.content === "" && (e.content = void 0), e.content && (e.headers = e.headers || {}, N(e.content) ? e.headers["Content-Type"] = "application/octet-stream" : e.headers["Content-Type"] = "text/plain;charset=UTF-8");
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
      throw o || (this._logger.log(a.Warning, `Error from HTTP request. ${l}.`), l);
    } finally {
      i && clearTimeout(i), e.abortSignal && (e.abortSignal.onabort = null);
    }
    if (!s.ok) {
      const l = await Ae(s, "text");
      throw new B(l || s.statusText, s.status);
    }
    const c = await Ae(s, e.responseType);
    return new Ne(s.status, s.statusText, c);
  }
  getCookieString(e) {
    let t = "";
    return _.isNode && this._jar && this._jar.getCookies(e, (o, i) => t = i.join("; ")), t;
  }
}
function Ae(n, e) {
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
class _t extends de {
  constructor(e) {
    super(), this._logger = e;
  }
  /** @inheritDoc */
  send(e) {
    return e.abortSignal && e.abortSignal.aborted ? Promise.reject(new T()) : e.method ? e.url ? new Promise((t, o) => {
      const i = new XMLHttpRequest();
      i.open(e.method, e.url, !0), i.withCredentials = e.withCredentials === void 0 ? !0 : e.withCredentials, i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), e.content === "" && (e.content = void 0), e.content && (N(e.content) ? i.setRequestHeader("Content-Type", "application/octet-stream") : i.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"));
      const s = e.headers;
      s && Object.keys(s).forEach((r) => {
        i.setRequestHeader(r, s[r]);
      }), e.responseType && (i.responseType = e.responseType), e.abortSignal && (e.abortSignal.onabort = () => {
        i.abort(), o(new T());
      }), e.timeout && (i.timeout = e.timeout), i.onload = () => {
        e.abortSignal && (e.abortSignal.onabort = null), i.status >= 200 && i.status < 300 ? t(new Ne(i.status, i.statusText, i.response || i.responseText)) : o(new B(i.response || i.responseText || i.statusText, i.status));
      }, i.onerror = () => {
        this._logger.log(a.Warning, `Error from HTTP request. ${i.status}: ${i.statusText}.`), o(new B(i.statusText, i.status));
      }, i.ontimeout = () => {
        this._logger.log(a.Warning, "Timeout from HTTP request."), o(new Ee());
      }, i.send(e.content);
    }) : Promise.reject(new Error("No url defined.")) : Promise.reject(new Error("No method defined."));
  }
}
class mt extends de {
  /** Creates a new instance of the {@link @microsoft/signalr.DefaultHttpClient}, using the provided {@link @microsoft/signalr.ILogger} to log messages. */
  constructor(e) {
    if (super(), typeof fetch < "u" || _.isNode)
      this._httpClient = new ft(e);
    else if (typeof XMLHttpRequest < "u")
      this._httpClient = new _t(e);
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
class E {
  static write(e) {
    return `${e}${E.RecordSeparator}`;
  }
  static parse(e) {
    if (e[e.length - 1] !== E.RecordSeparator)
      throw new Error("Message is incomplete.");
    const t = e.split(E.RecordSeparator);
    return t.pop(), t;
  }
}
E.RecordSeparatorCode = 30;
E.RecordSeparator = String.fromCharCode(E.RecordSeparatorCode);
class bt {
  // Handshake request is always JSON
  writeHandshakeRequest(e) {
    return E.write(JSON.stringify(e));
  }
  parseHandshakeResponse(e) {
    let t, o;
    if (N(e)) {
      const c = new Uint8Array(e), l = c.indexOf(E.RecordSeparatorCode);
      if (l === -1)
        throw new Error("Message is incomplete.");
      const d = l + 1;
      t = String.fromCharCode.apply(null, Array.prototype.slice.call(c.slice(0, d))), o = c.byteLength > d ? c.slice(d).buffer : null;
    } else {
      const c = e, l = c.indexOf(E.RecordSeparator);
      if (l === -1)
        throw new Error("Message is incomplete.");
      const d = l + 1;
      t = c.substring(0, d), o = c.length > d ? c.substring(d) : null;
    }
    const i = E.parse(t), s = JSON.parse(i[0]);
    if (s.type)
      throw new Error("Expected a handshake response from the server.");
    return [o, s];
  }
}
var u;
(function(n) {
  n[n.Invocation = 1] = "Invocation", n[n.StreamItem = 2] = "StreamItem", n[n.Completion = 3] = "Completion", n[n.StreamInvocation = 4] = "StreamInvocation", n[n.CancelInvocation = 5] = "CancelInvocation", n[n.Ping = 6] = "Ping", n[n.Close = 7] = "Close", n[n.Ack = 8] = "Ack", n[n.Sequence = 9] = "Sequence";
})(u || (u = {}));
class vt {
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
    return this.observers.push(e), new lt(this, e);
  }
}
class wt {
  constructor(e, t, o) {
    this._bufferSize = 1e5, this._messages = [], this._totalMessageCount = 0, this._waitForSequenceMessage = !1, this._nextReceivingSequenceId = 1, this._latestReceivedSequenceId = 0, this._bufferedByteCount = 0, this._reconnectInProgress = !1, this._protocol = e, this._connection = t, this._bufferSize = o;
  }
  async _send(e) {
    const t = this._protocol.writeMessage(e);
    let o = Promise.resolve();
    if (this._isInvocationMessage(e)) {
      this._totalMessageCount++;
      let i = () => {
      }, s = () => {
      };
      N(t) ? this._bufferedByteCount += t.byteLength : this._bufferedByteCount += t.length, this._bufferedByteCount >= this._bufferSize && (o = new Promise((r, c) => {
        i = r, s = c;
      })), this._messages.push(new yt(t, this._totalMessageCount, i, s));
    }
    try {
      this._reconnectInProgress || await this._connection.send(t);
    } catch {
      this._disconnected();
    }
    await o;
  }
  _ack(e) {
    let t = -1;
    for (let o = 0; o < this._messages.length; o++) {
      const i = this._messages[o];
      if (i._id <= e.sequenceId)
        t = o, N(i._message) ? this._bufferedByteCount -= i._message.byteLength : this._bufferedByteCount -= i._message.length, i._resolver();
      else if (this._bufferedByteCount < this._bufferSize)
        i._resolver();
      else
        break;
    }
    t !== -1 && (this._messages = this._messages.slice(t + 1));
  }
  _shouldProcessMessage(e) {
    if (this._waitForSequenceMessage)
      return e.type !== u.Sequence ? !1 : (this._waitForSequenceMessage = !1, !0);
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
    await this._connection.send(this._protocol.writeMessage({ type: u.Sequence, sequenceId: e }));
    const t = this._messages;
    for (const o of t)
      await this._connection.send(o._message);
    this._reconnectInProgress = !1;
  }
  _dispose(e) {
    e ?? (e = new Error("Unable to reconnect to server."));
    for (const t of this._messages)
      t._rejector(e);
  }
  _isInvocationMessage(e) {
    switch (e.type) {
      case u.Invocation:
      case u.StreamItem:
      case u.Completion:
      case u.StreamInvocation:
      case u.CancelInvocation:
        return !0;
      case u.Close:
      case u.Sequence:
      case u.Ping:
      case u.Ack:
        return !1;
    }
  }
  _ackTimer() {
    this._ackTimerHandle === void 0 && (this._ackTimerHandle = setTimeout(async () => {
      try {
        this._reconnectInProgress || await this._connection.send(this._protocol.writeMessage({ type: u.Ack, sequenceId: this._latestReceivedSequenceId }));
      } catch {
      }
      clearTimeout(this._ackTimerHandle), this._ackTimerHandle = void 0;
    }, 1e3));
  }
}
class yt {
  constructor(e, t, o, i) {
    this._message = e, this._id = t, this._resolver = o, this._rejector = i;
  }
}
const St = 30 * 1e3, Ct = 15 * 1e3, kt = 1e5;
var p;
(function(n) {
  n.Disconnected = "Disconnected", n.Connecting = "Connecting", n.Connected = "Connected", n.Disconnecting = "Disconnecting", n.Reconnecting = "Reconnecting";
})(p || (p = {}));
class $e {
  /** @internal */
  // Using a public static factory method means we can have a private constructor and an _internal_
  // create method that can be used by HubConnectionBuilder. An "internal" constructor would just
  // be stripped away and the '.d.ts' file would have no constructor, which is interpreted as a
  // public parameter-less constructor.
  static create(e, t, o, i, s, r, c) {
    return new $e(e, t, o, i, s, r, c);
  }
  constructor(e, t, o, i, s, r, c) {
    this._nextKeepAlive = 0, this._freezeEventListener = () => {
      this._logger.log(a.Warning, "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://learn.microsoft.com/aspnet/core/signalr/javascript-client#bsleep");
    }, m.isRequired(e, "connection"), m.isRequired(t, "logger"), m.isRequired(o, "protocol"), this.serverTimeoutInMilliseconds = s ?? St, this.keepAliveIntervalInMilliseconds = r ?? Ct, this._statefulReconnectBufferSize = c ?? kt, this._logger = t, this._protocol = o, this.connection = e, this._reconnectPolicy = i, this._handshakeProtocol = new bt(), this.connection.onreceive = (l) => this._processIncomingData(l), this.connection.onclose = (l) => this._connectionClosed(l), this._callbacks = {}, this._methods = {}, this._closedCallbacks = [], this._reconnectingCallbacks = [], this._reconnectedCallbacks = [], this._invocationId = 0, this._receivedHandshakeResponse = !1, this._connectionState = p.Disconnected, this._connectionStarted = !1, this._cachedPingMessage = this._protocol.writeMessage({ type: u.Ping });
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
    this._connectionState = p.Connecting, this._logger.log(a.Debug, "Starting HubConnection.");
    try {
      await this._startInternal(), _.isBrowser && window.document.addEventListener("freeze", this._freezeEventListener), this._connectionState = p.Connected, this._connectionStarted = !0, this._logger.log(a.Debug, "HubConnection connected successfully.");
    } catch (e) {
      return this._connectionState = p.Disconnected, this._logger.log(a.Debug, `HubConnection failed to start successfully because of error '${e}'.`), Promise.reject(e);
    }
  }
  async _startInternal() {
    this._stopDuringStartError = void 0, this._receivedHandshakeResponse = !1;
    const e = new Promise((t, o) => {
      this._handshakeResolver = t, this._handshakeRejecter = o;
    });
    await this.connection.start(this._protocol.transferFormat);
    try {
      let t = this._protocol.version;
      this.connection.features.reconnect || (t = 1);
      const o = {
        protocol: this._protocol.name,
        version: t
      };
      if (this._logger.log(a.Debug, "Sending handshake request."), await this._sendMessage(this._handshakeProtocol.writeHandshakeRequest(o)), this._logger.log(a.Information, `Using HubProtocol '${this._protocol.name}'.`), this._cleanupTimeout(), this._resetTimeoutPeriod(), this._resetKeepAliveInterval(), await e, this._stopDuringStartError)
        throw this._stopDuringStartError;
      this.connection.features.reconnect && (this._messageBuffer = new wt(this._protocol, this.connection, this._statefulReconnectBufferSize), this.connection.features.disconnected = this._messageBuffer._disconnected.bind(this._messageBuffer), this.connection.features.resend = () => {
        if (this._messageBuffer)
          return this._messageBuffer._resend();
      }), this.connection.features.inherentKeepAlive || await this._sendMessage(this._cachedPingMessage);
    } catch (t) {
      throw this._logger.log(a.Debug, `Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`), this._cleanupTimeout(), this._cleanupPingTimer(), await this.connection.stop(t), t;
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
      return this._logger.log(a.Debug, `Call to HubConnection.stop(${e}) ignored because it is already in the disconnected state.`), Promise.resolve();
    if (this._connectionState === p.Disconnecting)
      return this._logger.log(a.Debug, `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`), this._stopPromise;
    const t = this._connectionState;
    return this._connectionState = p.Disconnecting, this._logger.log(a.Debug, "Stopping HubConnection."), this._reconnectDelayHandle ? (this._logger.log(a.Debug, "Connection stopped during reconnect delay. Done reconnecting."), clearTimeout(this._reconnectDelayHandle), this._reconnectDelayHandle = void 0, this._completeClose(), Promise.resolve()) : (t === p.Connected && this._sendCloseMessage(), this._cleanupTimeout(), this._cleanupPingTimer(), this._stopDuringStartError = e || new T("The connection was stopped before the hub handshake could complete."), this.connection.stop(e));
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
    const [o, i] = this._replaceStreamingParams(t), s = this._createStreamInvocation(e, t, i);
    let r;
    const c = new vt();
    return c.cancelCallback = () => {
      const l = this._createCancelInvocation(s.invocationId);
      return delete this._callbacks[s.invocationId], r.then(() => this._sendWithProtocol(l));
    }, this._callbacks[s.invocationId] = (l, d) => {
      if (d) {
        c.error(d);
        return;
      } else l && (l.type === u.Completion ? l.error ? c.error(new Error(l.error)) : c.complete() : c.next(l.item));
    }, r = this._sendWithProtocol(s).catch((l) => {
      c.error(l), delete this._callbacks[s.invocationId];
    }), this._launchStreams(o, r), c;
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
    const [o, i] = this._replaceStreamingParams(t), s = this._sendWithProtocol(this._createInvocation(e, t, !0, i));
    return this._launchStreams(o, s), s;
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
    const [o, i] = this._replaceStreamingParams(t), s = this._createInvocation(e, t, !1, i);
    return new Promise((c, l) => {
      this._callbacks[s.invocationId] = (g, D) => {
        if (D) {
          l(D);
          return;
        } else g && (g.type === u.Completion ? g.error ? l(new Error(g.error)) : c(g.result) : l(new Error(`Unexpected message type: ${g.type}`)));
      };
      const d = this._sendWithProtocol(s).catch((g) => {
        l(g), delete this._callbacks[s.invocationId];
      });
      this._launchStreams(o, d);
    });
  }
  on(e, t) {
    !e || !t || (e = e.toLowerCase(), this._methods[e] || (this._methods[e] = []), this._methods[e].indexOf(t) === -1 && this._methods[e].push(t));
  }
  off(e, t) {
    if (!e)
      return;
    e = e.toLowerCase();
    const o = this._methods[e];
    if (o)
      if (t) {
        const i = o.indexOf(t);
        i !== -1 && (o.splice(i, 1), o.length === 0 && delete this._methods[e]);
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
      for (const o of t)
        if (!(this._messageBuffer && !this._messageBuffer._shouldProcessMessage(o)))
          switch (o.type) {
            case u.Invocation:
              this._invokeClientMethod(o).catch((i) => {
                this._logger.log(a.Error, `Invoke client method threw error: ${ge(i)}`);
              });
              break;
            case u.StreamItem:
            case u.Completion: {
              const i = this._callbacks[o.invocationId];
              if (i) {
                o.type === u.Completion && delete this._callbacks[o.invocationId];
                try {
                  i(o);
                } catch (s) {
                  this._logger.log(a.Error, `Stream callback threw error: ${ge(s)}`);
                }
              }
              break;
            }
            case u.Ping:
              break;
            case u.Close: {
              this._logger.log(a.Information, "Close message received from server.");
              const i = o.error ? new Error("Server returned an error on close: " + o.error) : void 0;
              o.allowReconnect === !0 ? this.connection.stop(i) : this._stopPromise = this._stopInternal(i);
              break;
            }
            case u.Ack:
              this._messageBuffer && this._messageBuffer._ack(o);
              break;
            case u.Sequence:
              this._messageBuffer && this._messageBuffer._resetSequence(o);
              break;
            default:
              this._logger.log(a.Warning, `Invalid message type: ${o.type}.`);
              break;
          }
    }
    this._resetTimeoutPeriod();
  }
  _processHandshakeResponse(e) {
    let t, o;
    try {
      [o, t] = this._handshakeProtocol.parseHandshakeResponse(e);
    } catch (i) {
      const s = "Error parsing handshake response: " + i;
      this._logger.log(a.Error, s);
      const r = new Error(s);
      throw this._handshakeRejecter(r), r;
    }
    if (t.error) {
      const i = "Server returned handshake error: " + t.error;
      this._logger.log(a.Error, i);
      const s = new Error(i);
      throw this._handshakeRejecter(s), s;
    } else
      this._logger.log(a.Debug, "Server handshake complete.");
    return this._handshakeResolver(), o;
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
    const t = e.target.toLowerCase(), o = this._methods[t];
    if (!o) {
      this._logger.log(a.Warning, `No client method with the name '${t}' found.`), e.invocationId && (this._logger.log(a.Warning, `No result given for '${t}' method and invocation ID '${e.invocationId}'.`), await this._sendWithProtocol(this._createCompletionMessage(e.invocationId, "Client didn't provide a result.", null)));
      return;
    }
    const i = o.slice(), s = !!e.invocationId;
    let r, c, l;
    for (const d of i)
      try {
        const g = r;
        r = await d.apply(this, e.arguments), s && r && g && (this._logger.log(a.Error, `Multiple results provided for '${t}'. Sending error to server.`), l = this._createCompletionMessage(e.invocationId, "Client provided multiple results.", null)), c = void 0;
      } catch (g) {
        c = g, this._logger.log(a.Error, `A callback for the method '${t}' threw error '${g}'.`);
      }
    l ? await this._sendWithProtocol(l) : s ? (c ? l = this._createCompletionMessage(e.invocationId, `${c}`, null) : r !== void 0 ? l = this._createCompletionMessage(e.invocationId, null, r) : (this._logger.log(a.Warning, `No result given for '${t}' method and invocation ID '${e.invocationId}'.`), l = this._createCompletionMessage(e.invocationId, "Client didn't provide a result.", null)), await this._sendWithProtocol(l)) : r && this._logger.log(a.Error, `Result given for '${t}' method but server is not expecting a result.`);
  }
  _connectionClosed(e) {
    this._logger.log(a.Debug, `HubConnection.connectionClosed(${e}) called while in state ${this._connectionState}.`), this._stopDuringStartError = this._stopDuringStartError || e || new T("The underlying connection was closed before the hub handshake could complete."), this._handshakeResolver && this._handshakeResolver(), this._cancelCallbacksWithError(e || new Error("Invocation canceled due to the underlying connection being closed.")), this._cleanupTimeout(), this._cleanupPingTimer(), this._connectionState === p.Disconnecting ? this._completeClose(e) : this._connectionState === p.Connected && this._reconnectPolicy ? this._reconnect(e) : this._connectionState === p.Connected && this._completeClose(e);
  }
  _completeClose(e) {
    if (this._connectionStarted) {
      this._connectionState = p.Disconnected, this._connectionStarted = !1, this._messageBuffer && (this._messageBuffer._dispose(e ?? new Error("Connection closed.")), this._messageBuffer = void 0), _.isBrowser && window.document.removeEventListener("freeze", this._freezeEventListener);
      try {
        this._closedCallbacks.forEach((t) => t.apply(this, [e]));
      } catch (t) {
        this._logger.log(a.Error, `An onclose callback called with error '${e}' threw error '${t}'.`);
      }
    }
  }
  async _reconnect(e) {
    const t = Date.now();
    let o = 0, i = e !== void 0 ? e : new Error("Attempting to reconnect due to a unknown error."), s = this._getNextRetryDelay(o, 0, i);
    if (s === null) {
      this._logger.log(a.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."), this._completeClose(e);
      return;
    }
    if (this._connectionState = p.Reconnecting, e ? this._logger.log(a.Information, `Connection reconnecting because of error '${e}'.`) : this._logger.log(a.Information, "Connection reconnecting."), this._reconnectingCallbacks.length !== 0) {
      try {
        this._reconnectingCallbacks.forEach((r) => r.apply(this, [e]));
      } catch (r) {
        this._logger.log(a.Error, `An onreconnecting callback called with error '${e}' threw error '${r}'.`);
      }
      if (this._connectionState !== p.Reconnecting) {
        this._logger.log(a.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");
        return;
      }
    }
    for (; s !== null; ) {
      if (this._logger.log(a.Information, `Reconnect attempt number ${o + 1} will start in ${s} ms.`), await new Promise((r) => {
        this._reconnectDelayHandle = setTimeout(r, s);
      }), this._reconnectDelayHandle = void 0, this._connectionState !== p.Reconnecting) {
        this._logger.log(a.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting.");
        return;
      }
      try {
        if (await this._startInternal(), this._connectionState = p.Connected, this._logger.log(a.Information, "HubConnection reconnected successfully."), this._reconnectedCallbacks.length !== 0)
          try {
            this._reconnectedCallbacks.forEach((r) => r.apply(this, [this.connection.connectionId]));
          } catch (r) {
            this._logger.log(a.Error, `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${r}'.`);
          }
        return;
      } catch (r) {
        if (this._logger.log(a.Information, `Reconnect attempt failed because of error '${r}'.`), this._connectionState !== p.Reconnecting) {
          this._logger.log(a.Debug, `Connection moved to the '${this._connectionState}' from the reconnecting state during reconnect attempt. Done reconnecting.`), this._connectionState === p.Disconnecting && this._completeClose();
          return;
        }
        o++, i = r instanceof Error ? r : new Error(r.toString()), s = this._getNextRetryDelay(o, Date.now() - t, i);
      }
    }
    this._logger.log(a.Information, `Reconnect retries have been exhausted after ${Date.now() - t} ms and ${o} failed attempts. Connection disconnecting.`), this._completeClose();
  }
  _getNextRetryDelay(e, t, o) {
    try {
      return this._reconnectPolicy.nextRetryDelayInMilliseconds({
        elapsedMilliseconds: t,
        previousRetryCount: e,
        retryReason: o
      });
    } catch (i) {
      return this._logger.log(a.Error, `IRetryPolicy.nextRetryDelayInMilliseconds(${e}, ${t}) threw error '${i}'.`), null;
    }
  }
  _cancelCallbacksWithError(e) {
    const t = this._callbacks;
    this._callbacks = {}, Object.keys(t).forEach((o) => {
      const i = t[o];
      try {
        i(null, e);
      } catch (s) {
        this._logger.log(a.Error, `Stream 'error' callback called with '${e}' threw error: ${ge(s)}`);
      }
    });
  }
  _cleanupPingTimer() {
    this._pingServerHandle && (clearTimeout(this._pingServerHandle), this._pingServerHandle = void 0);
  }
  _cleanupTimeout() {
    this._timeoutHandle && clearTimeout(this._timeoutHandle);
  }
  _createInvocation(e, t, o, i) {
    if (o)
      return i.length !== 0 ? {
        target: e,
        arguments: t,
        streamIds: i,
        type: u.Invocation
      } : {
        target: e,
        arguments: t,
        type: u.Invocation
      };
    {
      const s = this._invocationId;
      return this._invocationId++, i.length !== 0 ? {
        target: e,
        arguments: t,
        invocationId: s.toString(),
        streamIds: i,
        type: u.Invocation
      } : {
        target: e,
        arguments: t,
        invocationId: s.toString(),
        type: u.Invocation
      };
    }
  }
  _launchStreams(e, t) {
    if (e.length !== 0) {
      t || (t = Promise.resolve());
      for (const o in e)
        e[o].subscribe({
          complete: () => {
            t = t.then(() => this._sendWithProtocol(this._createCompletionMessage(o)));
          },
          error: (i) => {
            let s;
            i instanceof Error ? s = i.message : i && i.toString ? s = i.toString() : s = "Unknown error", t = t.then(() => this._sendWithProtocol(this._createCompletionMessage(o, s)));
          },
          next: (i) => {
            t = t.then(() => this._sendWithProtocol(this._createStreamItemMessage(o, i)));
          }
        });
    }
  }
  _replaceStreamingParams(e) {
    const t = [], o = [];
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      if (this._isObservable(s)) {
        const r = this._invocationId;
        this._invocationId++, t[r] = s, o.push(r.toString()), e.splice(i, 1);
      }
    }
    return [t, o];
  }
  _isObservable(e) {
    return e && e.subscribe && typeof e.subscribe == "function";
  }
  _createStreamInvocation(e, t, o) {
    const i = this._invocationId;
    return this._invocationId++, o.length !== 0 ? {
      target: e,
      arguments: t,
      invocationId: i.toString(),
      streamIds: o,
      type: u.StreamInvocation
    } : {
      target: e,
      arguments: t,
      invocationId: i.toString(),
      type: u.StreamInvocation
    };
  }
  _createCancelInvocation(e) {
    return {
      invocationId: e,
      type: u.CancelInvocation
    };
  }
  _createStreamItemMessage(e, t) {
    return {
      invocationId: e,
      item: t,
      type: u.StreamItem
    };
  }
  _createCompletionMessage(e, t, o) {
    return t ? {
      error: t,
      invocationId: e,
      type: u.Completion
    } : {
      invocationId: e,
      result: o,
      type: u.Completion
    };
  }
  _createCloseMessage() {
    return { type: u.Close };
  }
  async _trySendPingMessage() {
    try {
      await this._sendMessage(this._cachedPingMessage);
    } catch {
      this._cleanupPingTimer();
    }
  }
}
const Et = [0, 2e3, 1e4, 3e4, null];
class Ue {
  constructor(e) {
    this._retryDelays = e !== void 0 ? [...e, null] : Et;
  }
  nextRetryDelayInMilliseconds(e) {
    return this._retryDelays[e.previousRetryCount];
  }
}
class q {
}
q.Authorization = "Authorization";
q.Cookie = "Cookie";
class $t extends de {
  constructor(e, t) {
    super(), this._innerClient = e, this._accessTokenFactory = t;
  }
  async send(e) {
    let t = !0;
    this._accessTokenFactory && (!this._accessToken || e.url && e.url.indexOf("/negotiate?") > 0) && (t = !1, this._accessToken = await this._accessTokenFactory()), this._setAuthorizationHeader(e);
    const o = await this._innerClient.send(e);
    return t && o.statusCode === 401 && this._accessTokenFactory ? (this._accessToken = await this._accessTokenFactory(), this._setAuthorizationHeader(e), await this._innerClient.send(e)) : o;
  }
  _setAuthorizationHeader(e) {
    e.headers || (e.headers = {}), this._accessToken ? e.headers[q.Authorization] = `Bearer ${this._accessToken}` : this._accessTokenFactory && e.headers[q.Authorization] && delete e.headers[q.Authorization];
  }
  getCookieString(e) {
    return this._innerClient.getCookieString(e);
  }
}
var b;
(function(n) {
  n[n.None = 0] = "None", n[n.WebSockets = 1] = "WebSockets", n[n.ServerSentEvents = 2] = "ServerSentEvents", n[n.LongPolling = 4] = "LongPolling";
})(b || (b = {}));
var C;
(function(n) {
  n[n.Text = 1] = "Text", n[n.Binary = 2] = "Binary";
})(C || (C = {}));
let It = class {
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
class He {
  // This is an internal type, not exported from 'index' so this is really just internal.
  get pollAborted() {
    return this._pollAbort.aborted;
  }
  constructor(e, t, o) {
    this._httpClient = e, this._logger = t, this._pollAbort = new It(), this._options = o, this._running = !1, this.onreceive = null, this.onclose = null;
  }
  async connect(e, t) {
    if (m.isRequired(e, "url"), m.isRequired(t, "transferFormat"), m.isIn(t, C, "transferFormat"), this._url = e, this._logger.log(a.Trace, "(LongPolling transport) Connecting."), t === C.Binary && typeof XMLHttpRequest < "u" && typeof new XMLHttpRequest().responseType != "string")
      throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
    const [o, i] = j(), s = { [o]: i, ...this._options.headers }, r = {
      abortSignal: this._pollAbort.signal,
      headers: s,
      timeout: 1e5,
      withCredentials: this._options.withCredentials
    };
    t === C.Binary && (r.responseType = "arraybuffer");
    const c = `${e}&_=${Date.now()}`;
    this._logger.log(a.Trace, `(LongPolling transport) polling: ${c}.`);
    const l = await this._httpClient.get(c, r);
    l.statusCode !== 200 ? (this._logger.log(a.Error, `(LongPolling transport) Unexpected response code: ${l.statusCode}.`), this._closeError = new B(l.statusText || "", l.statusCode), this._running = !1) : this._running = !0, this._receiving = this._poll(this._url, r);
  }
  async _poll(e, t) {
    try {
      for (; this._running; )
        try {
          const o = `${e}&_=${Date.now()}`;
          this._logger.log(a.Trace, `(LongPolling transport) polling: ${o}.`);
          const i = await this._httpClient.get(o, t);
          i.statusCode === 204 ? (this._logger.log(a.Information, "(LongPolling transport) Poll terminated by server."), this._running = !1) : i.statusCode !== 200 ? (this._logger.log(a.Error, `(LongPolling transport) Unexpected response code: ${i.statusCode}.`), this._closeError = new B(i.statusText || "", i.statusCode), this._running = !1) : i.content ? (this._logger.log(a.Trace, `(LongPolling transport) data received. ${Z(i.content, this._options.logMessageContent)}.`), this.onreceive && this.onreceive(i.content)) : this._logger.log(a.Trace, "(LongPolling transport) Poll timed out, reissuing.");
        } catch (o) {
          this._running ? o instanceof Ee ? this._logger.log(a.Trace, "(LongPolling transport) Poll timed out, reissuing.") : (this._closeError = o, this._running = !1) : this._logger.log(a.Trace, `(LongPolling transport) Poll errored after shutdown: ${o.message}`);
        }
    } finally {
      this._logger.log(a.Trace, "(LongPolling transport) Polling complete."), this.pollAborted || this._raiseOnClose();
    }
  }
  async send(e) {
    return this._running ? Oe(this._logger, "LongPolling", this._httpClient, this._url, e, this._options) : Promise.reject(new Error("Cannot send until the transport is connected"));
  }
  async stop() {
    this._logger.log(a.Trace, "(LongPolling transport) Stopping polling."), this._running = !1, this._pollAbort.abort();
    try {
      await this._receiving, this._logger.log(a.Trace, `(LongPolling transport) sending DELETE request to ${this._url}.`);
      const e = {}, [t, o] = j();
      e[t] = o;
      const i = {
        headers: { ...e, ...this._options.headers },
        timeout: this._options.timeout,
        withCredentials: this._options.withCredentials
      };
      let s;
      try {
        await this._httpClient.delete(this._url, i);
      } catch (r) {
        s = r;
      }
      s ? s instanceof B && (s.statusCode === 404 ? this._logger.log(a.Trace, "(LongPolling transport) A 404 response was returned from sending a DELETE request.") : this._logger.log(a.Trace, `(LongPolling transport) Error sending a DELETE request: ${s}`)) : this._logger.log(a.Trace, "(LongPolling transport) DELETE request accepted.");
    } finally {
      this._logger.log(a.Trace, "(LongPolling transport) Stop finished."), this._raiseOnClose();
    }
  }
  _raiseOnClose() {
    if (this.onclose) {
      let e = "(LongPolling transport) Firing onclose event.";
      this._closeError && (e += " Error: " + this._closeError), this._logger.log(a.Trace, e), this.onclose(this._closeError);
    }
  }
}
class Tt {
  constructor(e, t, o, i) {
    this._httpClient = e, this._accessToken = t, this._logger = o, this._options = i, this.onreceive = null, this.onclose = null;
  }
  async connect(e, t) {
    return m.isRequired(e, "url"), m.isRequired(t, "transferFormat"), m.isIn(t, C, "transferFormat"), this._logger.log(a.Trace, "(SSE transport) Connecting."), this._url = e, this._accessToken && (e += (e.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(this._accessToken)}`), new Promise((o, i) => {
      let s = !1;
      if (t !== C.Text) {
        i(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
        return;
      }
      let r;
      if (_.isBrowser || _.isWebWorker)
        r = new this._options.EventSource(e, { withCredentials: this._options.withCredentials });
      else {
        const c = this._httpClient.getCookieString(e), l = {};
        l.Cookie = c;
        const [d, g] = j();
        l[d] = g, r = new this._options.EventSource(e, { withCredentials: this._options.withCredentials, headers: { ...l, ...this._options.headers } });
      }
      try {
        r.onmessage = (c) => {
          if (this.onreceive)
            try {
              this._logger.log(a.Trace, `(SSE transport) data received. ${Z(c.data, this._options.logMessageContent)}.`), this.onreceive(c.data);
            } catch (l) {
              this._close(l);
              return;
            }
        }, r.onerror = (c) => {
          s ? this._close() : i(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled."));
        }, r.onopen = () => {
          this._logger.log(a.Information, `SSE connected to ${this._url}`), this._eventSource = r, s = !0, o();
        };
      } catch (c) {
        i(c);
        return;
      }
    });
  }
  async send(e) {
    return this._eventSource ? Oe(this._logger, "SSE", this._httpClient, this._url, e, this._options) : Promise.reject(new Error("Cannot send until the transport is connected"));
  }
  stop() {
    return this._close(), Promise.resolve();
  }
  _close(e) {
    this._eventSource && (this._eventSource.close(), this._eventSource = void 0, this.onclose && this.onclose(e));
  }
}
class Rt {
  constructor(e, t, o, i, s, r) {
    this._logger = o, this._accessTokenFactory = t, this._logMessageContent = i, this._webSocketConstructor = s, this._httpClient = e, this.onreceive = null, this.onclose = null, this._headers = r;
  }
  async connect(e, t) {
    m.isRequired(e, "url"), m.isRequired(t, "transferFormat"), m.isIn(t, C, "transferFormat"), this._logger.log(a.Trace, "(WebSockets transport) Connecting.");
    let o;
    return this._accessTokenFactory && (o = await this._accessTokenFactory()), new Promise((i, s) => {
      e = e.replace(/^http/, "ws");
      let r;
      const c = this._httpClient.getCookieString(e);
      let l = !1;
      if (_.isNode || _.isReactNative) {
        const d = {}, [g, D] = j();
        d[g] = D, o && (d[q.Authorization] = `Bearer ${o}`), c && (d[q.Cookie] = c), r = new this._webSocketConstructor(e, void 0, {
          headers: { ...d, ...this._headers }
        });
      } else
        o && (e += (e.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(o)}`);
      r || (r = new this._webSocketConstructor(e)), t === C.Binary && (r.binaryType = "arraybuffer"), r.onopen = (d) => {
        this._logger.log(a.Information, `WebSocket connected to ${e}.`), this._webSocket = r, l = !0, i();
      }, r.onerror = (d) => {
        let g = null;
        typeof ErrorEvent < "u" && d instanceof ErrorEvent ? g = d.error : g = "There was an error with the transport", this._logger.log(a.Information, `(WebSockets transport) ${g}.`);
      }, r.onmessage = (d) => {
        if (this._logger.log(a.Trace, `(WebSockets transport) data received. ${Z(d.data, this._logMessageContent)}.`), this.onreceive)
          try {
            this.onreceive(d.data);
          } catch (g) {
            this._close(g);
            return;
          }
      }, r.onclose = (d) => {
        if (l)
          this._close(d);
        else {
          let g = null;
          typeof ErrorEvent < "u" && d instanceof ErrorEvent ? g = d.error : g = "WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.", s(new Error(g));
        }
      };
    });
  }
  send(e) {
    return this._webSocket && this._webSocket.readyState === this._webSocketConstructor.OPEN ? (this._logger.log(a.Trace, `(WebSockets transport) sending data. ${Z(e, this._logMessageContent)}.`), this._webSocket.send(e), Promise.resolve()) : Promise.reject("WebSocket is not in the OPEN state");
  }
  stop() {
    return this._webSocket && this._close(void 0), Promise.resolve();
  }
  _close(e) {
    this._webSocket && (this._webSocket.onclose = () => {
    }, this._webSocket.onmessage = () => {
    }, this._webSocket.onerror = () => {
    }, this._webSocket.close(), this._webSocket = void 0), this._logger.log(a.Trace, "(WebSockets transport) socket closed."), this.onclose && (this._isCloseEvent(e) && (e.wasClean === !1 || e.code !== 1e3) ? this.onclose(new Error(`WebSocket closed with status code: ${e.code} (${e.reason || "no reason given"}).`)) : e instanceof Error ? this.onclose(e) : this.onclose());
  }
  _isCloseEvent(e) {
    return e && typeof e.wasClean == "boolean" && typeof e.code == "number";
  }
}
const We = 100;
class Pt {
  constructor(e, t = {}) {
    if (this._stopPromiseResolver = () => {
    }, this.features = {}, this._negotiateVersion = 1, m.isRequired(e, "url"), this._logger = ct(t.logger), this.baseUrl = this._resolveUrl(e), t = t || {}, t.logMessageContent = t.logMessageContent === void 0 ? !1 : t.logMessageContent, typeof t.withCredentials == "boolean" || t.withCredentials === void 0)
      t.withCredentials = t.withCredentials === void 0 ? !0 : t.withCredentials;
    else
      throw new Error("withCredentials option was not a 'boolean' or 'undefined' value");
    t.timeout = t.timeout === void 0 ? 100 * 1e3 : t.timeout;
    let o = null, i = null;
    if (_.isNode && typeof require < "u") {
      const s = typeof __webpack_require__ == "function" ? __non_webpack_require__ : require;
      o = s("ws"), i = s("eventsource");
    }
    !_.isNode && typeof WebSocket < "u" && !t.WebSocket ? t.WebSocket = WebSocket : _.isNode && !t.WebSocket && o && (t.WebSocket = o), !_.isNode && typeof EventSource < "u" && !t.EventSource ? t.EventSource = EventSource : _.isNode && !t.EventSource && typeof i < "u" && (t.EventSource = i), this._httpClient = new $t(t.httpClient || new mt(this._logger), t.accessTokenFactory), this._connectionState = "Disconnected", this._connectionStarted = !1, this._options = t, this.onreceive = null, this.onclose = null;
  }
  async start(e) {
    if (e = e || C.Binary, m.isIn(e, C, "transferFormat"), this._logger.log(a.Debug, `Starting connection with transfer format '${C[e]}'.`), this._connectionState !== "Disconnected")
      return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."));
    if (this._connectionState = "Connecting", this._startInternalPromise = this._startInternal(e), await this._startInternalPromise, this._connectionState === "Disconnecting") {
      const t = "Failed to start the HttpConnection before stop() was called.";
      return this._logger.log(a.Error, t), await this._stopPromise, Promise.reject(new T(t));
    } else if (this._connectionState !== "Connected") {
      const t = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";
      return this._logger.log(a.Error, t), Promise.reject(new T(t));
    }
    this._connectionStarted = !0;
  }
  send(e) {
    return this._connectionState !== "Connected" ? Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")) : (this._sendQueue || (this._sendQueue = new Ie(this.transport)), this._sendQueue.send(e));
  }
  async stop(e) {
    if (this._connectionState === "Disconnected")
      return this._logger.log(a.Debug, `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnected state.`), Promise.resolve();
    if (this._connectionState === "Disconnecting")
      return this._logger.log(a.Debug, `Call to HttpConnection.stop(${e}) ignored because the connection is already in the disconnecting state.`), this._stopPromise;
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
        this._logger.log(a.Error, `HttpConnection.transport.stop() threw error '${t}'.`), this._stopConnection();
      }
      this.transport = void 0;
    } else
      this._logger.log(a.Debug, "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.");
  }
  async _startInternal(e) {
    let t = this.baseUrl;
    this._accessTokenFactory = this._options.accessTokenFactory, this._httpClient._accessTokenFactory = this._accessTokenFactory;
    try {
      if (this._options.skipNegotiation)
        if (this._options.transport === b.WebSockets)
          this.transport = this._constructTransport(b.WebSockets), await this._startTransport(t, e);
        else
          throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");
      else {
        let o = null, i = 0;
        do {
          if (o = await this._getNegotiationResponse(t), this._connectionState === "Disconnecting" || this._connectionState === "Disconnected")
            throw new T("The connection was stopped during negotiation.");
          if (o.error)
            throw new Error(o.error);
          if (o.ProtocolVersion)
            throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
          if (o.url && (t = o.url), o.accessToken) {
            const s = o.accessToken;
            this._accessTokenFactory = () => s, this._httpClient._accessToken = s, this._httpClient._accessTokenFactory = void 0;
          }
          i++;
        } while (o.url && i < We);
        if (i === We && o.url)
          throw new Error("Negotiate redirection limit exceeded.");
        await this._createTransport(t, this._options.transport, o, e);
      }
      this.transport instanceof He && (this.features.inherentKeepAlive = !0), this._connectionState === "Connecting" && (this._logger.log(a.Debug, "The HttpConnection connected successfully."), this._connectionState = "Connected");
    } catch (o) {
      return this._logger.log(a.Error, "Failed to start the connection: " + o), this._connectionState = "Disconnected", this.transport = void 0, this._stopPromiseResolver(), Promise.reject(o);
    }
  }
  async _getNegotiationResponse(e) {
    const t = {}, [o, i] = j();
    t[o] = i;
    const s = this._resolveNegotiateUrl(e);
    this._logger.log(a.Debug, `Sending negotiation request: ${s}.`);
    try {
      const r = await this._httpClient.post(s, {
        content: "",
        headers: { ...t, ...this._options.headers },
        timeout: this._options.timeout,
        withCredentials: this._options.withCredentials
      });
      if (r.statusCode !== 200)
        return Promise.reject(new Error(`Unexpected status code returned from negotiate '${r.statusCode}'`));
      const c = JSON.parse(r.content);
      return (!c.negotiateVersion || c.negotiateVersion < 1) && (c.connectionToken = c.connectionId), c.useStatefulReconnect && this._options._useStatefulReconnect !== !0 ? Promise.reject(new De("Client didn't negotiate Stateful Reconnect but the server did.")) : c;
    } catch (r) {
      let c = "Failed to complete negotiation with the server: " + r;
      return r instanceof B && r.statusCode === 404 && (c = c + " Either this is not a SignalR endpoint or there is a proxy blocking the connection."), this._logger.log(a.Error, c), Promise.reject(new De(c));
    }
  }
  _createConnectUrl(e, t) {
    return t ? e + (e.indexOf("?") === -1 ? "?" : "&") + `id=${t}` : e;
  }
  async _createTransport(e, t, o, i) {
    let s = this._createConnectUrl(e, o.connectionToken);
    if (this._isITransport(t)) {
      this._logger.log(a.Debug, "Connection was provided an instance of ITransport, using that directly."), this.transport = t, await this._startTransport(s, i), this.connectionId = o.connectionId;
      return;
    }
    const r = [], c = o.availableTransports || [];
    let l = o;
    for (const d of c) {
      const g = this._resolveTransportOrError(d, t, i, l?.useStatefulReconnect === !0);
      if (g instanceof Error)
        r.push(`${d.transport} failed:`), r.push(g);
      else if (this._isITransport(g)) {
        if (this.transport = g, !l) {
          try {
            l = await this._getNegotiationResponse(e);
          } catch (D) {
            return Promise.reject(D);
          }
          s = this._createConnectUrl(e, l.connectionToken);
        }
        try {
          await this._startTransport(s, i), this.connectionId = l.connectionId;
          return;
        } catch (D) {
          if (this._logger.log(a.Error, `Failed to start the transport '${d.transport}': ${D}`), l = void 0, r.push(new it(`${d.transport} failed: ${D}`, b[d.transport])), this._connectionState !== "Connecting") {
            const Me = "Failed to select transport before stop() was called.";
            return this._logger.log(a.Debug, Me), Promise.reject(new T(Me));
          }
        }
      }
    }
    return r.length > 0 ? Promise.reject(new st(`Unable to connect to the server with any of the available transports. ${r.join(" ")}`, r)) : Promise.reject(new Error("None of the transports supported by the client are supported by the server."));
  }
  _constructTransport(e) {
    switch (e) {
      case b.WebSockets:
        if (!this._options.WebSocket)
          throw new Error("'WebSocket' is not supported in your environment.");
        return new Rt(this._httpClient, this._accessTokenFactory, this._logger, this._options.logMessageContent, this._options.WebSocket, this._options.headers || {});
      case b.ServerSentEvents:
        if (!this._options.EventSource)
          throw new Error("'EventSource' is not supported in your environment.");
        return new Tt(this._httpClient, this._httpClient._accessToken, this._logger, this._options);
      case b.LongPolling:
        return new He(this._httpClient, this._logger, this._options);
      default:
        throw new Error(`Unknown transport: ${e}.`);
    }
  }
  _startTransport(e, t) {
    return this.transport.onreceive = this.onreceive, this.features.reconnect ? this.transport.onclose = async (o) => {
      let i = !1;
      if (this.features.reconnect)
        try {
          this.features.disconnected(), await this.transport.connect(e, t), await this.features.resend();
        } catch {
          i = !0;
        }
      else {
        this._stopConnection(o);
        return;
      }
      i && this._stopConnection(o);
    } : this.transport.onclose = (o) => this._stopConnection(o), this.transport.connect(e, t);
  }
  _resolveTransportOrError(e, t, o, i) {
    const s = b[e.transport];
    if (s == null)
      return this._logger.log(a.Debug, `Skipping transport '${e.transport}' because it is not supported by this client.`), new Error(`Skipping transport '${e.transport}' because it is not supported by this client.`);
    if (xt(t, s))
      if (e.transferFormats.map((c) => C[c]).indexOf(o) >= 0) {
        if (s === b.WebSockets && !this._options.WebSocket || s === b.ServerSentEvents && !this._options.EventSource)
          return this._logger.log(a.Debug, `Skipping transport '${b[s]}' because it is not supported in your environment.'`), new nt(`'${b[s]}' is not supported in your environment.`, s);
        this._logger.log(a.Debug, `Selecting transport '${b[s]}'.`);
        try {
          return this.features.reconnect = s === b.WebSockets ? i : void 0, this._constructTransport(s);
        } catch (c) {
          return c;
        }
      } else
        return this._logger.log(a.Debug, `Skipping transport '${b[s]}' because it does not support the requested transfer format '${C[o]}'.`), new Error(`'${b[s]}' does not support ${C[o]}.`);
    else
      return this._logger.log(a.Debug, `Skipping transport '${b[s]}' because it was disabled by the client.`), new ot(`'${b[s]}' is disabled by the client.`, s);
  }
  _isITransport(e) {
    return e && typeof e == "object" && "connect" in e;
  }
  _stopConnection(e) {
    if (this._logger.log(a.Debug, `HttpConnection.stopConnection(${e}) called while in state ${this._connectionState}.`), this.transport = void 0, e = this._stopError || e, this._stopError = void 0, this._connectionState === "Disconnected") {
      this._logger.log(a.Debug, `Call to HttpConnection.stopConnection(${e}) was ignored because the connection is already in the disconnected state.`);
      return;
    }
    if (this._connectionState === "Connecting")
      throw this._logger.log(a.Warning, `Call to HttpConnection.stopConnection(${e}) was ignored because the connection is still in the connecting state.`), new Error(`HttpConnection.stopConnection(${e}) was called while the connection is still in the connecting state.`);
    if (this._connectionState === "Disconnecting" && this._stopPromiseResolver(), e ? this._logger.log(a.Error, `Connection disconnected with error '${e}'.`) : this._logger.log(a.Information, "Connection disconnected."), this._sendQueue && (this._sendQueue.stop().catch((t) => {
      this._logger.log(a.Error, `TransportSendQueue.stop() threw error '${t}'.`);
    }), this._sendQueue = void 0), this.connectionId = void 0, this._connectionState = "Disconnected", this._connectionStarted) {
      this._connectionStarted = !1;
      try {
        this.onclose && this.onclose(e);
      } catch (t) {
        this._logger.log(a.Error, `HttpConnection.onclose(${e}) threw error '${t}'.`);
      }
    }
  }
  _resolveUrl(e) {
    if (e.lastIndexOf("https://", 0) === 0 || e.lastIndexOf("http://", 0) === 0)
      return e;
    if (!_.isBrowser)
      throw new Error(`Cannot resolve '${e}'.`);
    const t = window.document.createElement("a");
    return t.href = e, this._logger.log(a.Information, `Normalizing '${e}' to '${t.href}'.`), t.href;
  }
  _resolveNegotiateUrl(e) {
    const t = new URL(e);
    t.pathname.endsWith("/") ? t.pathname += "negotiate" : t.pathname += "/negotiate";
    const o = new URLSearchParams(t.searchParams);
    return o.has("negotiateVersion") || o.append("negotiateVersion", this._negotiateVersion.toString()), o.has("useStatefulReconnect") ? o.get("useStatefulReconnect") === "true" && (this._options._useStatefulReconnect = !0) : this._options._useStatefulReconnect === !0 && o.append("useStatefulReconnect", "true"), t.search = o.toString(), t.toString();
  }
}
function xt(n, e) {
  return !n || (e & n) !== 0;
}
class Ie {
  constructor(e) {
    this._transport = e, this._buffer = [], this._executing = !0, this._sendBufferedData = new oe(), this._transportResult = new oe(), this._sendLoopPromise = this._sendLoop();
  }
  send(e) {
    return this._bufferData(e), this._transportResult || (this._transportResult = new oe()), this._transportResult.promise;
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
      this._sendBufferedData = new oe();
      const e = this._transportResult;
      this._transportResult = void 0;
      const t = typeof this._buffer[0] == "string" ? this._buffer.join("") : Ie._concatBuffers(this._buffer);
      this._buffer.length = 0;
      try {
        await this._transport.send(t), e.resolve();
      } catch (o) {
        e.reject(o);
      }
    }
  }
  static _concatBuffers(e) {
    const t = e.map((s) => s.byteLength).reduce((s, r) => s + r), o = new Uint8Array(t);
    let i = 0;
    for (const s of e)
      o.set(new Uint8Array(s), i), i += s.byteLength;
    return o.buffer;
  }
}
class oe {
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
const Mt = "json";
class Dt {
  constructor() {
    this.name = Mt, this.version = 2, this.transferFormat = C.Text;
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
    t === null && (t = Y.instance);
    const o = E.parse(e), i = [];
    for (const s of o) {
      const r = JSON.parse(s);
      if (typeof r.type != "number")
        throw new Error("Invalid payload.");
      switch (r.type) {
        case u.Invocation:
          this._isInvocationMessage(r);
          break;
        case u.StreamItem:
          this._isStreamItemMessage(r);
          break;
        case u.Completion:
          this._isCompletionMessage(r);
          break;
        case u.Ping:
          break;
        case u.Close:
          break;
        case u.Ack:
          this._isAckMessage(r);
          break;
        case u.Sequence:
          this._isSequenceMessage(r);
          break;
        default:
          t.log(a.Information, "Unknown message type '" + r.type + "' ignored.");
          continue;
      }
      i.push(r);
    }
    return i;
  }
  /** Writes the specified {@link @microsoft/signalr.HubMessage} to a string and returns it.
   *
   * @param {HubMessage} message The message to write.
   * @returns {string} A string containing the serialized representation of the message.
   */
  writeMessage(e) {
    return E.write(JSON.stringify(e));
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
const At = {
  trace: a.Trace,
  debug: a.Debug,
  info: a.Information,
  information: a.Information,
  warn: a.Warning,
  warning: a.Warning,
  error: a.Error,
  critical: a.Critical,
  none: a.None
};
function Ut(n) {
  const e = At[n.toLowerCase()];
  if (typeof e < "u")
    return e;
  throw new Error(`Unknown log level: ${n}`);
}
class Ht {
  configureLogging(e) {
    if (m.isRequired(e, "logging"), Wt(e))
      this.logger = e;
    else if (typeof e == "string") {
      const t = Ut(e);
      this.logger = new he(t);
    } else
      this.logger = new he(e);
    return this;
  }
  withUrl(e, t) {
    return m.isRequired(e, "url"), m.isNotEmpty(e, "url"), this.url = e, typeof t == "object" ? this.httpConnectionOptions = { ...this.httpConnectionOptions, ...t } : this.httpConnectionOptions = {
      ...this.httpConnectionOptions,
      transport: t
    }, this;
  }
  /** Configures the {@link @microsoft/signalr.HubConnection} to use the specified Hub Protocol.
   *
   * @param {IHubProtocol} protocol The {@link @microsoft/signalr.IHubProtocol} implementation to use.
   */
  withHubProtocol(e) {
    return m.isRequired(e, "protocol"), this.protocol = e, this;
  }
  withAutomaticReconnect(e) {
    if (this.reconnectPolicy)
      throw new Error("A reconnectPolicy has already been set.");
    return e ? Array.isArray(e) ? this.reconnectPolicy = new Ue(e) : this.reconnectPolicy = e : this.reconnectPolicy = new Ue(), this;
  }
  /** Configures {@link @microsoft/signalr.HubConnection.serverTimeoutInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
   *
   * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
   */
  withServerTimeout(e) {
    return m.isRequired(e, "milliseconds"), this._serverTimeoutInMilliseconds = e, this;
  }
  /** Configures {@link @microsoft/signalr.HubConnection.keepAliveIntervalInMilliseconds} for the {@link @microsoft/signalr.HubConnection}.
   *
   * @returns The {@link @microsoft/signalr.HubConnectionBuilder} instance, for chaining.
   */
  withKeepAliveInterval(e) {
    return m.isRequired(e, "milliseconds"), this._keepAliveIntervalInMilliseconds = e, this;
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
    const t = new Pt(this.url, e);
    return $e.create(t, this.logger || Y.instance, this.protocol || new Dt(), this.reconnectPolicy, this._serverTimeoutInMilliseconds, this._keepAliveIntervalInMilliseconds, this._statefulReconnectBufferSize);
  }
}
function Wt(n) {
  return n.log !== void 0;
}
class Bt {
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
      console.log("Connection already in progress, waiting..."), await this.#i();
      return;
    }
    if (this.#e?.state === p.Connected) {
      console.log("Already connected to hub");
      return;
    }
    this.#e && await this.disconnectFromHub(), this.#t = !0;
    try {
      console.log("Building SignalR connection..."), this.#e = new Ht().withUrl(this.HUB_URL, {
        accessTokenFactory: async () => await this.#n()
      }).withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (t) => t.previousRetryCount === 0 ? 0 : t.previousRetryCount === 1 ? 2e3 : t.previousRetryCount === 2 ? 5e3 : t.previousRetryCount === 3 ? 1e4 : 3e4
      }).configureLogging(a.Information).build(), this.#e.on("ReceiveMetrics", (t) => {
        console.log("Received metrics from SignalR"), this.#s(t);
      }), this.#e.onreconnected(async (t) => {
        console.log("SignalR reconnected:", t);
        try {
          await this.#e?.invoke("RequestMetrics");
        } catch (o) {
          console.error("Error requesting metrics after reconnect:", o);
        }
      }), this.#e.onreconnecting((t) => {
        console.log("SignalR reconnecting...", t);
      }), this.#e.onclose((t) => {
        console.log("SignalR connection closed", t), this.#t = !1;
      }), console.log("Starting SignalR connection...");
      const e = new Promise(
        (t, o) => setTimeout(() => o(new Error("Connection timeout after 15 seconds")), 15e3)
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
      await new Promise((o) => setTimeout(o, 200));
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
  #s(e) {
    this.#o.forEach((t) => {
      try {
        t(e);
      } catch (o) {
        console.error("Error in metrics listener:", o);
      }
    });
  }
}
function Be(n, e) {
  return n > e ? "danger" : n > e * 0.7 ? "warning" : "positive";
}
function v(n) {
  return n.toLocaleString();
}
function qt(n) {
  const e = Math.floor(n / 86400), t = Math.floor(n % 86400 / 3600), o = Math.floor(n % 3600 / 60), i = Math.floor(n % 60);
  return `${e}d ${t}h ${o}m ${i}s`;
}
var Nt = Object.defineProperty, Ot = Object.getOwnPropertyDescriptor, Te = (n, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? Ot(e, t) : e, s = n.length - 1, r; s >= 0; s--)
    (r = n[s]) && (i = (o ? r(e, t, i) : r(i)) || i);
  return o && i && Nt(e, t, i), i;
};
let ee = class extends K(G) {
  constructor() {
    super(...arguments), this.isConnected = !1;
  }
  render() {
    return this.applicationInfo ? f`
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
          <strong>Uptime:</strong> ${qt(this.applicationInfo.uptimeSeconds)}
        </div>
        ${this.isConnected ? f`
          <div class="info-item connected">
            <uui-icon name="icon-check"></uui-icon>
            <strong>SignalR Connected</strong>
          </div>
        ` : ""}
      </div>
    ` : f``;
  }
};
ee.styles = X`
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
Te([
  w({ type: Object })
], ee.prototype, "applicationInfo", 2);
Te([
  w({ type: Boolean })
], ee.prototype, "isConnected", 2);
ee = Te([
  V("umbmetrics-app-info-banner")
], ee);
var Lt = Object.defineProperty, Ft = Object.getOwnPropertyDescriptor, Le = (n) => {
  throw TypeError(n);
}, x = (n, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? Ft(e, t) : e, s = n.length - 1, r; s >= 0; s--)
    (r = n[s]) && (i = (o ? r(e, t, i) : r(i)) || i);
  return o && i && Lt(e, t, i), i;
}, zt = (n, e, t) => e.has(n) || Le("Cannot " + t), jt = (n, e, t) => (zt(n, e, "read from private field"), t ? t.call(n) : e.get(n)), Gt = (n, e, t) => e.has(n) ? Le("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), fe;
let I = class extends K(G) {
  constructor() {
    super(...arguments), this.icon = "icon-info", this.title = "", this.value = "", this.detail = "", this.color = "default", this.span = 1, this.clickable = !1, this.actionIcon = "icon-activity", this.actionLabel = "View Details", Gt(this, fe, (n) => {
      n.stopPropagation(), this.clickable && this.dispatchEvent(new CustomEvent("card-action", { bubbles: !0, composed: !0 }));
    });
  }
  render() {
    return f`
      <div class="metric-card">
        <div class="card-header">
          <div class="header-title">
            <uui-icon name="${this.icon}"></uui-icon>
            <h3>${this.title}</h3>
          </div>
          ${this.clickable ? f`
            <uui-button 
              class="action-button"
              look="secondary" 
              compact 
              @click="${jt(this, fe)}"
              title="${this.actionLabel}"
            >
              <uui-icon name="${this.actionIcon}"></uui-icon>
            </uui-button>
          ` : ""}
        </div>
        
        <div class="card-body">
          <div class="metric-value ${this.color}">
            ${this.value}
          </div>
          ${this.detail ? f`<div class="metric-detail">${this.detail}</div>` : ""}
          <slot></slot>
        </div>
      </div>
    `;
  }
};
fe = /* @__PURE__ */ new WeakMap();
I.styles = X`
    :host {
      display: block;
      height: 100%;
    }

    :host([span="2"]) {
      grid-column: span 2;
    }

    :host([span="3"]) {
      grid-column: span 3;
    }

    :host([span="4"]) {
      grid-column: span 4;
    }

    .metric-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--uui-color-surface);
      border: 1px solid var(--uui-color-border);
      border-radius: var(--uui-border-radius);
      overflow: hidden;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: var(--uui-color-surface-alt);
      border-bottom: 1px solid var(--uui-color-border);
      min-height: 48px;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .header-title uui-icon {
      font-size: 1.25rem;
      color: var(--uui-color-interactive);
    }

    .header-title h3 {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--uui-color-text-alt);
    }

    .action-button {
      --uui-button-height: 28px;
      --uui-button-padding-left-factor: 1;
      --uui-button-padding-right-factor: 1;
    }

    .action-button uui-icon {
      font-size: 1rem;
    }

    .card-body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      padding: 1.25rem 1rem;
      text-align: center;
    }

    .metric-value {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--uui-color-text);
      line-height: 1.2;
    }

    .metric-value.positive {
      color: var(--uui-color-positive);
    }

    .metric-value.warning {
      color: var(--uui-color-warning);
    }

    .metric-value.danger {
      color: var(--uui-color-danger);
    }

    .metric-detail {
      font-size: 0.8rem;
      color: var(--uui-color-text-alt);
      margin-top: 0.5rem;
    }
  `;
x([
  w({ type: String })
], I.prototype, "icon", 2);
x([
  w({ type: String })
], I.prototype, "title", 2);
x([
  w({ type: String })
], I.prototype, "value", 2);
x([
  w({ type: String })
], I.prototype, "detail", 2);
x([
  w({ type: String })
], I.prototype, "color", 2);
x([
  w({ type: Number, reflect: !0 })
], I.prototype, "span", 2);
x([
  w({ type: Boolean })
], I.prototype, "clickable", 2);
x([
  w({ type: String })
], I.prototype, "actionIcon", 2);
x([
  w({ type: String })
], I.prototype, "actionLabel", 2);
I = x([
  V("umbmetrics-metric-card")
], I);
var Xt = Object.defineProperty, Vt = Object.getOwnPropertyDescriptor, Fe = (n, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? Vt(e, t) : e, s = n.length - 1, r; s >= 0; s--)
    (r = n[s]) && (i = (o ? r(e, t, i) : r(i)) || i);
  return o && i && Xt(e, t, i), i;
};
let ue = class extends K(G) {
  constructor() {
    super(...arguments), this.columns = 4;
  }
  render() {
    return f`
      <div class="metrics-grid" style="--grid-columns: ${this.columns}">
        <slot></slot>
      </div>
    `;
  }
};
ue.styles = X`
    :host {
      display: block;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(var(--grid-columns, 4), 1fr);
      grid-auto-rows: 1fr;
      gap: 1rem;
    }

    @media (max-width: 1200px) {
      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Handle span classes for slotted elements */
    ::slotted([span="2"]) {
      grid-column: span 2;
    }

    ::slotted([span="3"]) {
      grid-column: span 3;
    }

    ::slotted([span="4"]) {
      grid-column: span 4;
    }
  `;
Fe([
  w({ type: Number })
], ue.prototype, "columns", 2);
ue = Fe([
  V("umbmetrics-metrics-grid")
], ue);
var Kt = Object.defineProperty, Jt = Object.getOwnPropertyDescriptor, te = (n, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? Jt(e, t) : e, s = n.length - 1, r; s >= 0; s--)
    (r = n[s]) && (i = (o ? r(e, t, i) : r(i)) || i);
  return o && i && Kt(e, t, i), i;
};
let O = class extends K(G) {
  constructor() {
    super(...arguments), this.icon = "icon-info", this.title = "", this.stats = [], this.span = 1;
  }
  render() {
    return f`
      <div class="stat-card">
        <div class="card-header">
          <div class="header-title">
            <uui-icon name="${this.icon}"></uui-icon>
            <h3>${this.title}</h3>
          </div>
        </div>
        
        <div class="card-body">
          <div class="stats-list">
            ${this.stats.map((n) => f`
              <div class="stat-row">
                <span class="stat-label">${n.label}</span>
                <strong class="${n.color || "default"}">${n.value}</strong>
              </div>
            `)}
          </div>
          <slot></slot>
        </div>
      </div>
    `;
  }
};
O.styles = X`
    :host {
      display: block;
      height: 100%;
    }

    :host([span="2"]) {
      grid-column: span 2;
    }

    :host([span="3"]) {
      grid-column: span 3;
    }

    :host([span="4"]) {
      grid-column: span 4;
    }

    .stat-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--uui-color-surface);
      border: 1px solid var(--uui-color-border);
      border-radius: var(--uui-border-radius);
      overflow: hidden;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: var(--uui-color-surface-alt);
      border-bottom: 1px solid var(--uui-color-border);
      min-height: 48px;
    }

    .header-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .header-title uui-icon {
      font-size: 1.25rem;
      color: var(--uui-color-interactive);
    }

    .header-title h3 {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--uui-color-text-alt);
    }

    .card-body {
      flex: 1;
      padding: 1rem;
    }

    .stats-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--uui-color-border);
    }

    .stat-row:last-child {
      border-bottom: none;
    }

    .stat-label {
      color: var(--uui-color-text-alt);
      font-size: 0.875rem;
    }

    .stat-row strong {
      font-size: 0.95rem;
      font-weight: 600;
    }

    .stat-row strong.positive {
      color: var(--uui-color-positive);
    }

    .stat-row strong.warning {
      color: var(--uui-color-warning);
    }

    .stat-row strong.danger {
      color: var(--uui-color-danger);
    }

    .stat-row strong.default {
      color: var(--uui-color-text);
    }
  `;
te([
  w({ type: String })
], O.prototype, "icon", 2);
te([
  w({ type: String })
], O.prototype, "title", 2);
te([
  w({ type: Array })
], O.prototype, "stats", 2);
te([
  w({ type: Number, reflect: !0 })
], O.prototype, "span", 2);
O = te([
  V("umbmetrics-stat-card")
], O);
var Qt = Object.defineProperty, Yt = Object.getOwnPropertyDescriptor, ze = (n) => {
  throw TypeError(n);
}, ne = (n, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? Yt(e, t) : e, s = n.length - 1, r; s >= 0; s--)
    (r = n[s]) && (i = (o ? r(e, t, i) : r(i)) || i);
  return o && i && Qt(e, t, i), i;
}, Re = (n, e, t) => e.has(n) || ze("Cannot " + t), R = (n, e, t) => (Re(n, e, "read from private field"), t ? t.call(n) : e.get(n)), H = (n, e, t) => e.has(n) ? ze("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), qe = (n, e, t, o) => (Re(n, e, "write to private field"), e.set(n, t), t), pe = (n, e, t) => (Re(n, e, "access private method"), t), z, ie, se, _e, me, re, J, je, Ge, Xe;
let L = class extends K(G) {
  constructor() {
    super(...arguments), H(this, J), this.open = !1, this.requests = [], this.loading = !1, this._autoRefresh = !1, H(this, z), H(this, ie, () => {
      this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
    }), H(this, se, () => {
      this.dispatchEvent(new CustomEvent("refresh", { bubbles: !0, composed: !0 }));
    }), H(this, _e, () => {
      this._autoRefresh = !this._autoRefresh, this._autoRefresh ? R(this, me).call(this) : R(this, re).call(this);
    }), H(this, me, () => {
      qe(this, z, window.setInterval(() => {
        R(this, se).call(this);
      }, 5e3));
    }), H(this, re, () => {
      R(this, z) && (clearInterval(R(this, z)), qe(this, z, void 0));
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), R(this, re).call(this);
  }
  render() {
    return f`
      <div class="sidebar-overlay ${this.open ? "open" : ""}" @click="${R(this, ie)}"></div>
      <aside class="sidebar ${this.open ? "open" : ""}">
        <header class="sidebar-header">
          <h2>
            <uui-icon name="icon-link"></uui-icon>
            Active Requests
          </h2>
          <div class="header-actions">
            <uui-button 
              look="secondary" 
              compact
              @click="${R(this, se)}"
              ?disabled="${this.loading}"
            >
              <uui-icon name="icon-refresh"></uui-icon>
            </uui-button>
            <uui-toggle
              label="Auto-refresh"
              .checked="${this._autoRefresh}"
              @change="${R(this, _e)}"
            ></uui-toggle>
            <uui-button look="secondary" compact @click="${R(this, ie)}">
              <uui-icon name="icon-wrong"></uui-icon>
            </uui-button>
          </div>
        </header>

        <div class="sidebar-content">
          ${this.loading ? f`
            <div class="loading">
              <uui-loader></uui-loader>
              <span>Loading active requests...</span>
            </div>
          ` : this.requests.length === 0 ? f`
            <div class="empty-state">
              <uui-icon name="icon-check"></uui-icon>
              <p>No active requests</p>
              <small>All requests have completed</small>
            </div>
          ` : f`
            <div class="request-count">
              <strong>${this.requests.length}</strong> active request${this.requests.length !== 1 ? "s" : ""}
            </div>
            <ul class="request-list">
              ${this.requests.map((n) => f`
                <li class="request-item">
                  <div class="request-header">
                    <span class="method ${pe(this, J, Ge).call(this, n.method)}">${n.method}</span>
                    <span class="path" title="${n.path}${n.queryString}">${n.path}</span>
                    <span class="duration">${pe(this, J, je).call(this, n.durationMs)}</span>
                  </div>
                  <div class="request-details">
                    <div class="detail-row">
                      <uui-icon name="icon-time"></uui-icon>
                      <span>Started: ${new Date(n.startTime).toLocaleTimeString()}</span>
                    </div>
                    ${n.queryString ? f`
                      <div class="detail-row">
                        <uui-icon name="icon-search"></uui-icon>
                        <span class="query-string">${n.queryString}</span>
                      </div>
                    ` : ""}
                    <div class="detail-row">
                      <uui-icon name="icon-globe"></uui-icon>
                      <span>${n.remoteIp}</span>
                    </div>
                    ${n.userAgent ? f`
                      <div class="detail-row user-agent">
                        <uui-icon name="icon-browser-window"></uui-icon>
                        <span title="${n.userAgent}">${pe(this, J, Xe).call(this, n.userAgent)}</span>
                      </div>
                    ` : ""}
                  </div>
                </li>
              `)}
            </ul>
          `}
        </div>
      </aside>
    `;
  }
};
z = /* @__PURE__ */ new WeakMap();
ie = /* @__PURE__ */ new WeakMap();
se = /* @__PURE__ */ new WeakMap();
_e = /* @__PURE__ */ new WeakMap();
me = /* @__PURE__ */ new WeakMap();
re = /* @__PURE__ */ new WeakMap();
J = /* @__PURE__ */ new WeakSet();
je = function(n) {
  return n < 1e3 ? `${n.toFixed(0)} ms` : n < 6e4 ? `${(n / 1e3).toFixed(1)} s` : `${(n / 6e4).toFixed(1)} min`;
};
Ge = function(n) {
  switch (n.toUpperCase()) {
    case "GET":
      return "positive";
    case "POST":
      return "warning";
    case "PUT":
      return "warning";
    case "DELETE":
      return "danger";
    default:
      return "default";
  }
};
Xe = function(n) {
  return n.length > 50 ? n.substring(0, 47) + "..." : n;
};
L.styles = X`
    :host {
      display: contents;
    }

    .sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s;
      z-index: 1000;
    }

    .sidebar-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .sidebar {
      position: fixed;
      top: 0;
      right: 0;
      width: 450px;
      max-width: 90vw;
      height: 100vh;
      background: var(--uui-color-surface);
      box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
      z-index: 1001;
      display: flex;
      flex-direction: column;
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--uui-color-border);
      background: var(--uui-color-surface-alt);
    }

    .sidebar-header h2 {
      margin: 0;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 3rem;
      color: var(--uui-color-text-alt);
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      text-align: center;
      color: var(--uui-color-text-alt);
    }

    .empty-state uui-icon {
      font-size: 3rem;
      color: var(--uui-color-positive);
      margin-bottom: 1rem;
    }

    .empty-state p {
      margin: 0;
      font-size: 1.1rem;
    }

    .empty-state small {
      opacity: 0.7;
    }

    .request-count {
      padding: 0.75rem 1rem;
      background: var(--uui-color-surface-alt);
      border-radius: var(--uui-border-radius);
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }

    .request-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .request-item {
      background: var(--uui-color-surface-alt);
      border: 1px solid var(--uui-color-border);
      border-radius: var(--uui-border-radius);
      overflow: hidden;
    }

    .request-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: var(--uui-color-surface);
      border-bottom: 1px solid var(--uui-color-border);
    }

    .method {
      font-weight: 700;
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      border-radius: var(--uui-border-radius);
      text-transform: uppercase;
    }

    .method.positive {
      background: var(--uui-color-positive-emphasis);
      color: var(--uui-color-positive);
    }

    .method.warning {
      background: var(--uui-color-warning-emphasis);
      color: var(--uui-color-warning);
    }

    .method.danger {
      background: var(--uui-color-danger-emphasis);
      color: var(--uui-color-danger);
    }

    .path {
      flex: 1;
      font-family: monospace;
      font-size: 0.85rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .duration {
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--uui-color-interactive);
    }

    .request-details {
      padding: 0.75rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .detail-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: var(--uui-color-text-alt);
    }

    .detail-row uui-icon {
      font-size: 0.9rem;
      opacity: 0.7;
    }

    .query-string {
      font-family: monospace;
      font-size: 0.75rem;
      word-break: break-all;
    }

    .user-agent span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;
ne([
  w({ type: Boolean, reflect: !0 })
], L.prototype, "open", 2);
ne([
  w({ type: Array })
], L.prototype, "requests", 2);
ne([
  w({ type: Boolean })
], L.prototype, "loading", 2);
ne([
  P()
], L.prototype, "_autoRefresh", 2);
L = ne([
  V("umbmetrics-active-requests-sidebar")
], L);
const Zt = ":host{display:block;padding:1rem}uui-box.wide{width:100%}.metrics-controls{display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap}.connection-status{display:flex;align-items:center;gap:.25rem;font-size:.875rem;padding:.25rem .75rem;border-radius:var(--uui-border-radius)}.connection-status.connected{color:var(--uui-color-positive);background:var(--uui-color-positive-emphasis)}.connection-status.connecting{color:var(--uui-color-warning);background:var(--uui-color-warning-emphasis)}.tab-navigation{display:flex;gap:.5rem;margin-bottom:1.5rem;border-bottom:1px solid var(--uui-color-border);padding-bottom:1rem}.tab-content{min-height:400px}";
var en = Object.defineProperty, tn = Object.getOwnPropertyDescriptor, Ve = (n) => {
  throw TypeError(n);
}, M = (n, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? tn(e, t) : e, s = n.length - 1, r; s >= 0; s--)
    (r = n[s]) && (i = (o ? r(e, t, i) : r(i)) || i);
  return o && i && en(e, t, i), i;
}, Pe = (n, e, t) => e.has(n) || Ve("Cannot " + t), h = (n, e, t) => (Pe(n, e, "read from private field"), t ? t.call(n) : e.get(n)), k = (n, e, t) => e.has(n) ? Ve("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), F = (n, e, t, o) => (Pe(n, e, "write to private field"), e.set(n, t), t), W = (n, e, t) => (Pe(n, e, "access private method"), t), S, ae, y, A, be, ve, U, we, ce, xe, ye, Se, Ce, le, Q, ke, Ke, Je, Qe;
let $ = class extends K(G) {
  constructor() {
    super(), k(this, U), this._autoRefresh = !1, this._activeTab = "overview", this._isConnected = !1, this._sidebarOpen = !1, this._activeRequests = [], this._loadingActiveRequests = !1, k(this, S), k(this, ae), k(this, y), k(this, A), k(this, be, async (n) => {
      if (!h(this, y)) {
        console.error("Metrics service not initialized");
        return;
      }
      const e = n.target;
      e.state = "waiting";
      try {
        this._autoRefresh && h(this, y).isConnected ? (await h(this, y).requestMetrics(), W(this, U, we).call(this)) : await Promise.all([
          h(this, ve).call(this),
          W(this, U, we).call(this)
        ]), e.state = "success";
      } catch (t) {
        console.error("Error refreshing metrics:", t), e.state = "failed";
      }
    }), k(this, ve, async () => {
      if (!h(this, y)) {
        console.error("Metrics service not initialized");
        return;
      }
      try {
        this._performanceMetrics = await h(this, y).getPerformanceMetrics();
      } catch (n) {
        console.error("Error loading performance metrics:", n), h(this, S) && h(this, S).peek("danger", {
          data: {
            headline: "Error",
            message: n instanceof Error ? n.message : "Failed to load performance metrics"
          }
        });
      }
    }), k(this, ce, async () => {
      if (!h(this, y)) {
        console.error("Metrics service not initialized");
        return;
      }
      this._loadingActiveRequests = !0;
      try {
        this._activeRequests = await h(this, y).getActiveRequests();
      } catch (n) {
        console.error("Error loading active requests:", n), h(this, S) && h(this, S).peek("danger", {
          data: {
            headline: "Error",
            message: n instanceof Error ? n.message : "Failed to load active requests"
          }
        });
      } finally {
        this._loadingActiveRequests = !1;
      }
    }), k(this, xe, async () => {
      this._sidebarOpen = !0, await h(this, ce).call(this);
    }), k(this, ye, () => {
      this._sidebarOpen = !1, this._activeRequests = [];
    }), k(this, Se, async () => {
      this._autoRefresh = !this._autoRefresh, this._autoRefresh ? await h(this, Ce).call(this) : await h(this, le).call(this);
    }), k(this, Ce, async () => {
      if (!h(this, y)) {
        console.error("Metrics service not initialized"), this._autoRefresh = !1;
        return;
      }
      try {
        h(this, S) && h(this, S).peek("default", {
          data: {
            headline: "Connecting...",
            message: "Establishing connection to metrics hub"
          }
        }), F(this, A, h(this, y).onMetricsUpdate((n) => {
          this._performanceMetrics = n, this._isConnected = !0;
        })), await h(this, y).connectToHub(), this._isConnected = h(this, y).isConnected, this._isConnected && h(this, S) && h(this, S).peek("positive", {
          data: {
            headline: "Connected",
            message: "Real-time metrics updates enabled"
          }
        });
      } catch (n) {
        console.error("Error starting auto-refresh:", n), this._autoRefresh = !1, this._isConnected = !1, h(this, S) && h(this, S).peek("danger", {
          data: {
            headline: "Connection Failed",
            message: n instanceof Error ? n.message : "Failed to connect to metrics hub. Try again."
          }
        }), h(this, A) && (h(this, A).call(this), F(this, A, void 0));
      }
    }), k(this, le, async () => {
      if (h(this, y))
        try {
          h(this, A) && (h(this, A).call(this), F(this, A, void 0)), await h(this, y).disconnectFromHub(), this._isConnected = !1, h(this, S) && h(this, S).peek("default", {
            data: {
              headline: "Disconnected",
              message: "Real-time updates disabled"
            }
          });
        } catch (n) {
          console.error("Error stopping auto-refresh:", n);
        }
    }), k(this, Q, (n) => {
      this._activeTab = n;
    }), this.consumeContext(Ze, (n) => {
      F(this, S, n);
    }), this.consumeContext(et, (n) => {
      this.observe(
        n?.currentUser,
        (e) => {
          this._contextCurrentUser = e;
        },
        "_contextCurrentUser"
      );
    }), this.consumeContext(tt, (n) => {
      F(this, ae, n), F(this, y, new Bt(async () => {
        const e = await h(this, ae)?.getLatestToken();
        if (!e)
          throw new Error("No authentication token available");
        return e;
      }));
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), h(this, le).call(this);
  }
  render() {
    return f`
      <uui-box headline="Application Performance Metrics" class="wide">
        <div slot="header">[.NET 10 Application - Real-time Metrics${this._contextCurrentUser?.name ? ` - ${this._contextCurrentUser.name}` : ""}]</div>

        <div class="metrics-controls">
          <uui-button color="default" look="primary" @click="${h(this, be)}">
            <uui-icon name="icon-refresh"></uui-icon> Refresh Metrics
          </uui-button>

          <uui-toggle
            label="Real-time Updates (SignalR)"
            .checked="${this._autoRefresh}"
            @change="${h(this, Se)}"
          ></uui-toggle>

          ${this._isConnected ? f`
            <span class="connection-status connected">
              <uui-icon name="icon-check"></uui-icon> Connected
            </span>
          ` : this._autoRefresh ? f`
            <span class="connection-status connecting">
              <uui-icon name="icon-time"></uui-icon> Connecting...
            </span>
          ` : ""}
        </div>

        <div class="tab-navigation">
          <uui-button 
            look="${this._activeTab === "overview" ? "primary" : "default"}"
            color="${this._activeTab === "overview" ? "positive" : "default"}"
            @click="${() => h(this, Q).call(this, "overview")}"
          >
            <uui-icon name="icon-chart"></uui-icon> Overview
          </uui-button>
          <uui-button 
            look="${this._activeTab === "heap" ? "primary" : "default"}"
            color="${this._activeTab === "heap" ? "positive" : "default"}"
            @click="${() => h(this, Q).call(this, "heap")}"
          >
            <uui-icon name="icon-box"></uui-icon> Heap & GC
          </uui-button>
          <uui-button 
            look="${this._activeTab === "umbraco" ? "primary" : "default"}"
            color="${this._activeTab === "umbraco" ? "positive" : "default"}"
            @click="${() => h(this, Q).call(this, "umbraco")}"
          >
            <uui-icon name="icon-umbraco"></uui-icon> Umbraco
          </uui-button>
        </div>

        <div class="tab-content">
          ${W(this, U, Qe).call(this)}
        </div>
      </uui-box>

      <umbmetrics-active-requests-sidebar
        ?open="${this._sidebarOpen}"
        .requests="${this._activeRequests}"
        .loading="${this._loadingActiveRequests}"
        @close="${h(this, ye)}"
        @refresh="${h(this, ce)}"
      ></umbmetrics-active-requests-sidebar>
    `;
  }
};
S = /* @__PURE__ */ new WeakMap();
ae = /* @__PURE__ */ new WeakMap();
y = /* @__PURE__ */ new WeakMap();
A = /* @__PURE__ */ new WeakMap();
be = /* @__PURE__ */ new WeakMap();
ve = /* @__PURE__ */ new WeakMap();
U = /* @__PURE__ */ new WeakSet();
we = async function() {
  if (!h(this, y)) {
    console.error("Metrics service not initialized");
    return;
  }
  try {
    this._umbracoMetrics = await h(this, y).getUmbracoMetrics();
  } catch (n) {
    console.error("Error loading Umbraco metrics:", n), h(this, S) && h(this, S).peek("danger", {
      data: {
        headline: "Error",
        message: n instanceof Error ? n.message : "Failed to load Umbraco metrics"
      }
    });
  }
};
ce = /* @__PURE__ */ new WeakMap();
xe = /* @__PURE__ */ new WeakMap();
ye = /* @__PURE__ */ new WeakMap();
Se = /* @__PURE__ */ new WeakMap();
Ce = /* @__PURE__ */ new WeakMap();
le = /* @__PURE__ */ new WeakMap();
Q = /* @__PURE__ */ new WeakMap();
ke = function() {
  if (!this._performanceMetrics)
    return f`<p>Click "Refresh Metrics" to load application performance data</p>`;
  const n = this._performanceMetrics;
  return f`
      <umbmetrics-app-info-banner
        .applicationInfo=${n.applicationInfo}
        .isConnected=${this._isConnected}
      ></umbmetrics-app-info-banner>

      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-metric-card
          icon="icon-dashboard"
          title="CPU Usage"
          value="${n.cpuUsage.toFixed(1)}%"
          detail="Process CPU"
          color="${Be(n.cpuUsage, 80)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-memory"
          title="Working Set"
          value="${n.memoryUsage.workingSetMB.toFixed(0)} MB"
          detail="Private: ${n.memoryUsage.privateMemoryMB.toFixed(0)} MB"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-activity"
          title="Requests/Sec"
          value="${n.requestMetrics.requestsPerSecond.toFixed(2)}"
          detail="Last min: ${n.requestMetrics.lastMinuteRequests}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-timer"
          title="Avg Response"
          value="${n.requestMetrics.averageResponseTimeMs.toFixed(0)} ms"
          detail="Last 1000 requests"
          color="${Be(n.requestMetrics.averageResponseTimeMs, 1e3)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-link"
          title="Active Requests"
          value="${n.requestMetrics.activeRequests}"
          detail="Total: ${v(n.requestMetrics.totalRequests)}"
          ?clickable=${!0}
          actionLabel="View Details"
          @card-action="${h(this, xe)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-alert"
          title="Failed Requests"
          value="${v(n.requestMetrics.failedRequests)}"
          detail="4xx/5xx responses"
          color="${n.requestMetrics.failedRequests > 0 ? "danger" : "positive"}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-nodes"
          title="Threads"
          value="${n.threadInfo.threadCount}"
          detail="Pool: ${n.threadInfo.threadPoolThreadCount}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          icon="icon-list"
          title="Work Items"
          value="${n.threadInfo.pendingWorkItemCount}"
          detail="Completed: ${v(n.threadInfo.completedWorkItemCount)}"
        ></umbmetrics-metric-card>

        <umbmetrics-metric-card
          span="4"
          icon="icon-calendar"
          title="Last Updated"
          value="${new Date(n.timestamp).toLocaleString()}"
        ></umbmetrics-metric-card>
      </umbmetrics-metrics-grid>
    `;
};
Ke = function() {
  if (!this._performanceMetrics)
    return f`<p>Click "Refresh Metrics" to load heap information</p>`;
  const n = this._performanceMetrics, e = [
    { label: "Gen 0", value: `${n.memoryUsage.gcGen0HeapSizeMB.toFixed(2)} MB` },
    { label: "Gen 1", value: `${n.memoryUsage.gcGen1HeapSizeMB.toFixed(2)} MB` },
    { label: "Gen 2", value: `${n.memoryUsage.gcGen2HeapSizeMB.toFixed(2)} MB` }
  ], t = [
    { label: "Gen 0", value: v(n.garbageCollectionStats.gen0Collections) },
    { label: "Gen 1", value: v(n.garbageCollectionStats.gen1Collections) },
    { label: "Gen 2", value: v(n.garbageCollectionStats.gen2Collections) }
  ], o = [
    { label: "GC Mode", value: n.garbageCollectionStats.isServerGC ? "Server" : "Workstation" },
    { label: "Total Heap Size", value: `${n.memoryUsage.totalHeapSizeMB.toFixed(2)} MB` },
    { label: "Fragmented Memory", value: `${n.memoryUsage.fragmentedMemoryMB.toFixed(2)} MB` },
    { label: "Memory Load", value: `${n.garbageCollectionStats.memoryLoadMB.toFixed(2)} MB` },
    { label: "High Memory Threshold", value: `${n.garbageCollectionStats.highMemoryLoadThresholdMB.toFixed(2)} MB` },
    { label: "Latency Mode", value: n.garbageCollectionStats.gcLatencyMode },
    { label: "Total Pause Time", value: `${n.garbageCollectionStats.totalPauseTimeMs.toFixed(2)} ms` }
  ];
  return f`
      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-stat-card
          span="2"
          icon="icon-box"
          title="GC Heap Sizes"
          .stats=${e}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="2"
          icon="icon-trash"
          title="GC Collections"
          .stats=${t}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="4"
          icon="icon-chart"
          title="Garbage Collector Details"
          .stats=${o}
        ></umbmetrics-stat-card>
      </umbmetrics-metrics-grid>
    `;
};
Je = function() {
  if (!this._umbracoMetrics)
    return f`<p>Click "Refresh Metrics" to load Umbraco-specific data</p>`;
  const n = this._umbracoMetrics, e = [
    { label: "Total Nodes", value: v(n.contentStatistics.totalContentNodes) },
    { label: "Published", value: v(n.contentStatistics.publishedNodes), color: "positive" },
    { label: "Unpublished", value: v(n.contentStatistics.unpublishedNodes), color: "warning" },
    { label: "Trashed", value: v(n.contentStatistics.trashedNodes), color: n.contentStatistics.trashedNodes > 0 ? "danger" : "positive" },
    { label: "Content Types", value: n.contentStatistics.contentTypeCount }
  ], t = [
    { label: "Total Items", value: v(n.mediaStatistics.totalMediaItems) },
    { label: "Total Size", value: `${n.mediaStatistics.totalMediaSizeMB.toFixed(2)} MB` },
    { label: "Images", value: v(n.mediaStatistics.imagesCount) },
    { label: "Documents", value: v(n.mediaStatistics.documentsCount) },
    { label: "Media Types", value: n.mediaStatistics.mediaTypeCount }
  ], o = [
    { label: "Runtime Cache", value: `${v(n.cacheStatistics.runtimeCacheCount)} items` },
    { label: "NuCache", value: `${v(n.cacheStatistics.nuCacheCount)} items` },
    { label: "Total Size", value: n.cacheStatistics.totalCacheSize }
  ], i = [
    { label: "Total Users", value: v(n.backofficeUsers.totalUsers) },
    { label: "Active Users", value: v(n.backofficeUsers.activeUsers), color: "positive" },
    { label: "Administrators", value: v(n.backofficeUsers.adminUsers) },
    { label: "Current Sessions", value: v(n.backofficeUsers.currentSessions), color: n.backofficeUsers.currentSessions > 0 ? "positive" : "default" }
  ];
  return f`
      <umbmetrics-metrics-grid columns="4">
        <umbmetrics-stat-card
          span="2"
          icon="icon-document"
          title="Content Statistics"
          .stats=${e}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="2"
          icon="icon-picture"
          title="Media Library"
          .stats=${t}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="2"
          icon="icon-server-alt"
          title="Cache Performance"
          .stats=${o}
        ></umbmetrics-stat-card>

        <umbmetrics-stat-card
          span="2"
          icon="icon-users"
          title="Backoffice Users"
          .stats=${i}
        ></umbmetrics-stat-card>
      </umbmetrics-metrics-grid>
    `;
};
Qe = function() {
  switch (this._activeTab) {
    case "overview":
      return W(this, U, ke).call(this);
    case "heap":
      return W(this, U, Ke).call(this);
    case "umbraco":
      return W(this, U, Je).call(this);
    default:
      return W(this, U, ke).call(this);
  }
};
$.styles = X`${Ye(Zt)}`;
M([
  P()
], $.prototype, "_contextCurrentUser", 2);
M([
  P()
], $.prototype, "_performanceMetrics", 2);
M([
  P()
], $.prototype, "_autoRefresh", 2);
M([
  P()
], $.prototype, "_activeTab", 2);
M([
  P()
], $.prototype, "_isConnected", 2);
M([
  P()
], $.prototype, "_umbracoMetrics", 2);
M([
  P()
], $.prototype, "_sidebarOpen", 2);
M([
  P()
], $.prototype, "_activeRequests", 2);
M([
  P()
], $.prototype, "_loadingActiveRequests", 2);
$ = M([
  V("umbmetrics-dashboard")
], $);
const ln = $;
export {
  $ as ExampleDashboardElement,
  ln as default
};
//# sourceMappingURL=dashboard.element-BngMMQOM.js.map
