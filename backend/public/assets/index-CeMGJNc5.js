(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const i of l)
      if (i.type === "childList")
        for (const s of i.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const i = {};
    return (
      l.integrity && (i.integrity = l.integrity),
      l.referrerPolicy && (i.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const i = n(l);
    fetch(l.href, i);
  }
})();
function kd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var au = { exports: {} },
  gl = {},
  du = { exports: {} },
  A = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dr = Symbol.for("react.element"),
  Ed = Symbol.for("react.portal"),
  Cd = Symbol.for("react.fragment"),
  zd = Symbol.for("react.strict_mode"),
  Fd = Symbol.for("react.profiler"),
  Td = Symbol.for("react.provider"),
  Pd = Symbol.for("react.context"),
  _d = Symbol.for("react.forward_ref"),
  Id = Symbol.for("react.suspense"),
  Bd = Symbol.for("react.memo"),
  Nd = Symbol.for("react.lazy"),
  Jo = Symbol.iterator;
function Ad(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Jo && e[Jo]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var cu = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  fu = Object.assign,
  pu = {};
function kn(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = pu),
    (this.updater = n || cu));
}
kn.prototype.isReactComponent = {};
kn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
kn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function hu() {}
hu.prototype = kn.prototype;
function ro(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = pu),
    (this.updater = n || cu));
}
var lo = (ro.prototype = new hu());
lo.constructor = ro;
fu(lo, kn.prototype);
lo.isPureReactComponent = !0;
var qo = Array.isArray,
  mu = Object.prototype.hasOwnProperty,
  io = { current: null },
  gu = { key: !0, ref: !0, __self: !0, __source: !0 };
function yu(e, t, n) {
  var r,
    l = {},
    i = null,
    s = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (s = t.ref),
    t.key !== void 0 && (i = "" + t.key),
    t))
      mu.call(t, r) && !gu.hasOwnProperty(r) && (l[r] = t[r]);
  var u = arguments.length - 2;
  if (u === 1) l.children = n;
  else if (1 < u) {
    for (var a = Array(u), d = 0; d < u; d++) a[d] = arguments[d + 2];
    l.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((u = e.defaultProps), u)) l[r] === void 0 && (l[r] = u[r]);
  return {
    $$typeof: dr,
    type: e,
    key: i,
    ref: s,
    props: l,
    _owner: io.current,
  };
}
function Rd(e, t) {
  return {
    $$typeof: dr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function oo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === dr;
}
function Dd(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var es = /\/+/g;
function Ml(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Dd("" + e.key)
    : t.toString(36);
}
function Ar(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else
    switch (i) {
      case "string":
      case "number":
        s = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case dr:
          case Ed:
            s = !0;
        }
    }
  if (s)
    return (
      (s = e),
      (l = l(s)),
      (e = r === "" ? "." + Ml(s, 0) : r),
      qo(l)
        ? ((n = ""),
          e != null && (n = e.replace(es, "$&/") + "/"),
          Ar(l, t, n, "", function (d) {
            return d;
          }))
        : l != null &&
          (oo(l) &&
            (l = Rd(
              l,
              n +
                (!l.key || (s && s.key === l.key)
                  ? ""
                  : ("" + l.key).replace(es, "$&/") + "/") +
                e,
            )),
          t.push(l)),
      1
    );
  if (((s = 0), (r = r === "" ? "." : r + ":"), qo(e)))
    for (var u = 0; u < e.length; u++) {
      i = e[u];
      var a = r + Ml(i, u);
      s += Ar(i, t, n, a, l);
    }
  else if (((a = Ad(e)), typeof a == "function"))
    for (e = a.call(e), u = 0; !(i = e.next()).done; )
      ((i = i.value), (a = r + Ml(i, u++)), (s += Ar(i, t, n, a, l)));
  else if (i === "object")
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  return s;
}
function yr(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    Ar(e, r, "", "", function (i) {
      return t.call(n, i, l++);
    }),
    r
  );
}
function Ld(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ge = { current: null },
  Rr = { transition: null },
  Md = {
    ReactCurrentDispatcher: ge,
    ReactCurrentBatchConfig: Rr,
    ReactCurrentOwner: io,
  };
function vu() {
  throw Error("act(...) is not supported in production builds of React.");
}
A.Children = {
  map: yr,
  forEach: function (e, t, n) {
    yr(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      yr(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      yr(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!oo(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
A.Component = kn;
A.Fragment = Cd;
A.Profiler = Fd;
A.PureComponent = ro;
A.StrictMode = zd;
A.Suspense = Id;
A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Md;
A.act = vu;
A.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = fu({}, e.props),
    l = e.key,
    i = e.ref,
    s = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (s = io.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var u = e.type.defaultProps;
    for (a in t)
      mu.call(t, a) &&
        !gu.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && u !== void 0 ? u[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    u = Array(a);
    for (var d = 0; d < a; d++) u[d] = arguments[d + 2];
    r.children = u;
  }
  return { $$typeof: dr, type: e.type, key: l, ref: i, props: r, _owner: s };
};
A.createContext = function (e) {
  return (
    (e = {
      $$typeof: Pd,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Td, _context: e }),
    (e.Consumer = e)
  );
};
A.createElement = yu;
A.createFactory = function (e) {
  var t = yu.bind(null, e);
  return ((t.type = e), t);
};
A.createRef = function () {
  return { current: null };
};
A.forwardRef = function (e) {
  return { $$typeof: _d, render: e };
};
A.isValidElement = oo;
A.lazy = function (e) {
  return { $$typeof: Nd, _payload: { _status: -1, _result: e }, _init: Ld };
};
A.memo = function (e, t) {
  return { $$typeof: Bd, type: e, compare: t === void 0 ? null : t };
};
A.startTransition = function (e) {
  var t = Rr.transition;
  Rr.transition = {};
  try {
    e();
  } finally {
    Rr.transition = t;
  }
};
A.unstable_act = vu;
A.useCallback = function (e, t) {
  return ge.current.useCallback(e, t);
};
A.useContext = function (e) {
  return ge.current.useContext(e);
};
A.useDebugValue = function () {};
A.useDeferredValue = function (e) {
  return ge.current.useDeferredValue(e);
};
A.useEffect = function (e, t) {
  return ge.current.useEffect(e, t);
};
A.useId = function () {
  return ge.current.useId();
};
A.useImperativeHandle = function (e, t, n) {
  return ge.current.useImperativeHandle(e, t, n);
};
A.useInsertionEffect = function (e, t) {
  return ge.current.useInsertionEffect(e, t);
};
A.useLayoutEffect = function (e, t) {
  return ge.current.useLayoutEffect(e, t);
};
A.useMemo = function (e, t) {
  return ge.current.useMemo(e, t);
};
A.useReducer = function (e, t, n) {
  return ge.current.useReducer(e, t, n);
};
A.useRef = function (e) {
  return ge.current.useRef(e);
};
A.useState = function (e) {
  return ge.current.useState(e);
};
A.useSyncExternalStore = function (e, t, n) {
  return ge.current.useSyncExternalStore(e, t, n);
};
A.useTransition = function () {
  return ge.current.useTransition();
};
A.version = "18.3.1";
du.exports = A;
var M = du.exports;
const Od = kd(M);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Wd = M,
  Ud = Symbol.for("react.element"),
  Hd = Symbol.for("react.fragment"),
  Vd = Object.prototype.hasOwnProperty,
  $d = Wd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Qd = { key: !0, ref: !0, __self: !0, __source: !0 };
function xu(e, t, n) {
  var r,
    l = {},
    i = null,
    s = null;
  (n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (s = t.ref));
  for (r in t) Vd.call(t, r) && !Qd.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: Ud,
    type: e,
    key: i,
    ref: s,
    props: l,
    _owner: $d.current,
  };
}
gl.Fragment = Hd;
gl.jsx = xu;
gl.jsxs = xu;
au.exports = gl;
var o = au.exports,
  di = {},
  Su = { exports: {} },
  Pe = {},
  ju = { exports: {} },
  wu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(F, I) {
    var N = F.length;
    F.push(I);
    e: for (; 0 < N; ) {
      var G = (N - 1) >>> 1,
        re = F[G];
      if (0 < l(re, I)) ((F[G] = I), (F[N] = re), (N = G));
      else break e;
    }
  }
  function n(F) {
    return F.length === 0 ? null : F[0];
  }
  function r(F) {
    if (F.length === 0) return null;
    var I = F[0],
      N = F.pop();
    if (N !== I) {
      F[0] = N;
      e: for (var G = 0, re = F.length, mr = re >>> 1; G < mr; ) {
        var Tt = 2 * (G + 1) - 1,
          Ll = F[Tt],
          Pt = Tt + 1,
          gr = F[Pt];
        if (0 > l(Ll, N))
          Pt < re && 0 > l(gr, Ll)
            ? ((F[G] = gr), (F[Pt] = N), (G = Pt))
            : ((F[G] = Ll), (F[Tt] = N), (G = Tt));
        else if (Pt < re && 0 > l(gr, N)) ((F[G] = gr), (F[Pt] = N), (G = Pt));
        else break e;
      }
    }
    return I;
  }
  function l(F, I) {
    var N = F.sortIndex - I.sortIndex;
    return N !== 0 ? N : F.id - I.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var s = Date,
      u = s.now();
    e.unstable_now = function () {
      return s.now() - u;
    };
  }
  var a = [],
    d = [],
    f = 1,
    g = null,
    v = 3,
    h = !1,
    y = !1,
    S = !1,
    _ = typeof setTimeout == "function" ? setTimeout : null,
    p = typeof clearTimeout == "function" ? clearTimeout : null,
    c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(F) {
    for (var I = n(d); I !== null; ) {
      if (I.callback === null) r(d);
      else if (I.startTime <= F)
        (r(d), (I.sortIndex = I.expirationTime), t(a, I));
      else break;
      I = n(d);
    }
  }
  function j(F) {
    if (((S = !1), m(F), !y))
      if (n(a) !== null) ((y = !0), Rl(C));
      else {
        var I = n(d);
        I !== null && Dl(j, I.startTime - F);
      }
  }
  function C(F, I) {
    ((y = !1), S && ((S = !1), p(T), (T = -1)), (h = !0));
    var N = v;
    try {
      for (
        m(I), g = n(a);
        g !== null && (!(g.expirationTime > I) || (F && !oe()));
      ) {
        var G = g.callback;
        if (typeof G == "function") {
          ((g.callback = null), (v = g.priorityLevel));
          var re = G(g.expirationTime <= I);
          ((I = e.unstable_now()),
            typeof re == "function" ? (g.callback = re) : g === n(a) && r(a),
            m(I));
        } else r(a);
        g = n(a);
      }
      if (g !== null) var mr = !0;
      else {
        var Tt = n(d);
        (Tt !== null && Dl(j, Tt.startTime - I), (mr = !1));
      }
      return mr;
    } finally {
      ((g = null), (v = N), (h = !1));
    }
  }
  var x = !1,
    k = null,
    T = -1,
    R = 5,
    B = -1;
  function oe() {
    return !(e.unstable_now() - B < R);
  }
  function O() {
    if (k !== null) {
      var F = e.unstable_now();
      B = F;
      var I = !0;
      try {
        I = k(!0, F);
      } finally {
        I ? H() : ((x = !1), (k = null));
      }
    } else x = !1;
  }
  var H;
  if (typeof c == "function")
    H = function () {
      c(O);
    };
  else if (typeof MessageChannel < "u") {
    var Yt = new MessageChannel(),
      Al = Yt.port2;
    ((Yt.port1.onmessage = O),
      (H = function () {
        Al.postMessage(null);
      }));
  } else
    H = function () {
      _(O, 0);
    };
  function Rl(F) {
    ((k = F), x || ((x = !0), H()));
  }
  function Dl(F, I) {
    T = _(function () {
      F(e.unstable_now());
    }, I);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (F) {
      F.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      y || h || ((y = !0), Rl(C));
    }),
    (e.unstable_forceFrameRate = function (F) {
      0 > F || 125 < F
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (R = 0 < F ? Math.floor(1e3 / F) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return v;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (F) {
      switch (v) {
        case 1:
        case 2:
        case 3:
          var I = 3;
          break;
        default:
          I = v;
      }
      var N = v;
      v = I;
      try {
        return F();
      } finally {
        v = N;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (F, I) {
      switch (F) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          F = 3;
      }
      var N = v;
      v = F;
      try {
        return I();
      } finally {
        v = N;
      }
    }),
    (e.unstable_scheduleCallback = function (F, I, N) {
      var G = e.unstable_now();
      switch (
        (typeof N == "object" && N !== null
          ? ((N = N.delay), (N = typeof N == "number" && 0 < N ? G + N : G))
          : (N = G),
        F)
      ) {
        case 1:
          var re = -1;
          break;
        case 2:
          re = 250;
          break;
        case 5:
          re = 1073741823;
          break;
        case 4:
          re = 1e4;
          break;
        default:
          re = 5e3;
      }
      return (
        (re = N + re),
        (F = {
          id: f++,
          callback: I,
          priorityLevel: F,
          startTime: N,
          expirationTime: re,
          sortIndex: -1,
        }),
        N > G
          ? ((F.sortIndex = N),
            t(d, F),
            n(a) === null &&
              F === n(d) &&
              (S ? (p(T), (T = -1)) : (S = !0), Dl(j, N - G)))
          : ((F.sortIndex = re), t(a, F), y || h || ((y = !0), Rl(C))),
        F
      );
    }),
    (e.unstable_shouldYield = oe),
    (e.unstable_wrapCallback = function (F) {
      var I = v;
      return function () {
        var N = v;
        v = I;
        try {
          return F.apply(this, arguments);
        } finally {
          v = N;
        }
      };
    }));
})(wu);
ju.exports = wu;
var bd = ju.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Kd = M,
  Te = bd;
function w(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var ku = new Set(),
  Kn = {};
function bt(e, t) {
  (gn(e, t), gn(e + "Capture", t));
}
function gn(e, t) {
  for (Kn[e] = t, e = 0; e < t.length; e++) ku.add(t[e]);
}
var nt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  ci = Object.prototype.hasOwnProperty,
  Yd =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  ts = {},
  ns = {};
function Xd(e) {
  return ci.call(ns, e)
    ? !0
    : ci.call(ts, e)
      ? !1
      : Yd.test(e)
        ? (ns[e] = !0)
        : ((ts[e] = !0), !1);
}
function Gd(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Zd(e, t, n, r) {
  if (t === null || typeof t > "u" || Gd(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function ye(e, t, n, r, l, i, s) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = s));
}
var ae = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    ae[e] = new ye(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  ae[t] = new ye(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  ae[e] = new ye(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  ae[e] = new ye(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    ae[e] = new ye(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  ae[e] = new ye(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  ae[e] = new ye(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  ae[e] = new ye(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  ae[e] = new ye(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var so = /[\-:]([a-z])/g;
function uo(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(so, uo);
    ae[t] = new ye(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(so, uo);
    ae[t] = new ye(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(so, uo);
  ae[t] = new ye(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  ae[e] = new ye(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ae.xlinkHref = new ye(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  ae[e] = new ye(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ao(e, t, n, r) {
  var l = ae.hasOwnProperty(t) ? ae[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Zd(t, n, l, r) && (n = null),
    r || l === null
      ? Xd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
        ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
        : ((t = l.attributeName),
          (r = l.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var ot = Kd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  vr = Symbol.for("react.element"),
  Gt = Symbol.for("react.portal"),
  Zt = Symbol.for("react.fragment"),
  co = Symbol.for("react.strict_mode"),
  fi = Symbol.for("react.profiler"),
  Eu = Symbol.for("react.provider"),
  Cu = Symbol.for("react.context"),
  fo = Symbol.for("react.forward_ref"),
  pi = Symbol.for("react.suspense"),
  hi = Symbol.for("react.suspense_list"),
  po = Symbol.for("react.memo"),
  ut = Symbol.for("react.lazy"),
  zu = Symbol.for("react.offscreen"),
  rs = Symbol.iterator;
function zn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (rs && e[rs]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Y = Object.assign,
  Ol;
function An(e) {
  if (Ol === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Ol = (t && t[1]) || "";
    }
  return (
    `
` +
    Ol +
    e
  );
}
var Wl = !1;
function Ul(e, t) {
  if (!e || Wl) return "";
  Wl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (d) {
          var r = d;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (d) {
          r = d;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (d) {
        r = d;
      }
      e();
    }
  } catch (d) {
    if (d && r && typeof d.stack == "string") {
      for (
        var l = d.stack.split(`
`),
          i = r.stack.split(`
`),
          s = l.length - 1,
          u = i.length - 1;
        1 <= s && 0 <= u && l[s] !== i[u];
      )
        u--;
      for (; 1 <= s && 0 <= u; s--, u--)
        if (l[s] !== i[u]) {
          if (s !== 1 || u !== 1)
            do
              if ((s--, u--, 0 > u || l[s] !== i[u])) {
                var a =
                  `
` + l[s].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= s && 0 <= u);
          break;
        }
    }
  } finally {
    ((Wl = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? An(e) : "";
}
function Jd(e) {
  switch (e.tag) {
    case 5:
      return An(e.type);
    case 16:
      return An("Lazy");
    case 13:
      return An("Suspense");
    case 19:
      return An("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = Ul(e.type, !1)), e);
    case 11:
      return ((e = Ul(e.type.render, !1)), e);
    case 1:
      return ((e = Ul(e.type, !0)), e);
    default:
      return "";
  }
}
function mi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Zt:
      return "Fragment";
    case Gt:
      return "Portal";
    case fi:
      return "Profiler";
    case co:
      return "StrictMode";
    case pi:
      return "Suspense";
    case hi:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Cu:
        return (e.displayName || "Context") + ".Consumer";
      case Eu:
        return (e._context.displayName || "Context") + ".Provider";
      case fo:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case po:
        return (
          (t = e.displayName || null),
          t !== null ? t : mi(e.type) || "Memo"
        );
      case ut:
        ((t = e._payload), (e = e._init));
        try {
          return mi(e(t));
        } catch {}
    }
  return null;
}
function qd(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return mi(t);
    case 8:
      return t === co ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function kt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Fu(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function ec(e) {
  var t = Fu(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (s) {
          ((r = "" + s), i.call(this, s));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (s) {
          r = "" + s;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function xr(e) {
  e._valueTracker || (e._valueTracker = ec(e));
}
function Tu(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Fu(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function br(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function gi(e, t) {
  var n = t.checked;
  return Y({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function ls(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = kt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function Pu(e, t) {
  ((t = t.checked), t != null && ao(e, "checked", t, !1));
}
function yi(e, t) {
  Pu(e, t);
  var n = kt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value")
    ? vi(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && vi(e, t.type, kt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function is(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    ((t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n));
}
function vi(e, t, n) {
  (t !== "number" || br(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Rn = Array.isArray;
function an(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      ((l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + kt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        ((e[l].selected = !0), r && (e[l].defaultSelected = !0));
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function xi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(w(91));
  return Y({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function os(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(w(92));
      if (Rn(n)) {
        if (1 < n.length) throw Error(w(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: kt(n) };
}
function _u(e, t) {
  var n = kt(t.value),
    r = kt(t.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function ss(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Iu(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Si(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Iu(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Sr,
  Bu = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Sr = Sr || document.createElement("div"),
          Sr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Sr.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Yn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Mn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  tc = ["Webkit", "ms", "Moz", "O"];
Object.keys(Mn).forEach(function (e) {
  tc.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Mn[t] = Mn[e]));
  });
});
function Nu(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Mn.hasOwnProperty(e) && Mn[e])
      ? ("" + t).trim()
      : t + "px";
}
function Au(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = Nu(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l));
    }
}
var nc = Y(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function ji(e, t) {
  if (t) {
    if (nc[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(w(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(w(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(w(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(w(62));
  }
}
function wi(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ki = null;
function ho(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Ei = null,
  dn = null,
  cn = null;
function us(e) {
  if ((e = pr(e))) {
    if (typeof Ei != "function") throw Error(w(280));
    var t = e.stateNode;
    t && ((t = jl(t)), Ei(e.stateNode, e.type, t));
  }
}
function Ru(e) {
  dn ? (cn ? cn.push(e) : (cn = [e])) : (dn = e);
}
function Du() {
  if (dn) {
    var e = dn,
      t = cn;
    if (((cn = dn = null), us(e), t)) for (e = 0; e < t.length; e++) us(t[e]);
  }
}
function Lu(e, t) {
  return e(t);
}
function Mu() {}
var Hl = !1;
function Ou(e, t, n) {
  if (Hl) return e(t, n);
  Hl = !0;
  try {
    return Lu(e, t, n);
  } finally {
    ((Hl = !1), (dn !== null || cn !== null) && (Mu(), Du()));
  }
}
function Xn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = jl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(w(231, t, typeof n));
  return n;
}
var Ci = !1;
if (nt)
  try {
    var Fn = {};
    (Object.defineProperty(Fn, "passive", {
      get: function () {
        Ci = !0;
      },
    }),
      window.addEventListener("test", Fn, Fn),
      window.removeEventListener("test", Fn, Fn));
  } catch {
    Ci = !1;
  }
function rc(e, t, n, r, l, i, s, u, a) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (f) {
    this.onError(f);
  }
}
var On = !1,
  Kr = null,
  Yr = !1,
  zi = null,
  lc = {
    onError: function (e) {
      ((On = !0), (Kr = e));
    },
  };
function ic(e, t, n, r, l, i, s, u, a) {
  ((On = !1), (Kr = null), rc.apply(lc, arguments));
}
function oc(e, t, n, r, l, i, s, u, a) {
  if ((ic.apply(this, arguments), On)) {
    if (On) {
      var d = Kr;
      ((On = !1), (Kr = null));
    } else throw Error(w(198));
    Yr || ((Yr = !0), (zi = d));
  }
}
function Kt(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Wu(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function as(e) {
  if (Kt(e) !== e) throw Error(w(188));
}
function sc(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Kt(e)), t === null)) throw Error(w(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return (as(l), e);
        if (i === r) return (as(l), t);
        i = i.sibling;
      }
      throw Error(w(188));
    }
    if (n.return !== r.return) ((n = l), (r = i));
    else {
      for (var s = !1, u = l.child; u; ) {
        if (u === n) {
          ((s = !0), (n = l), (r = i));
          break;
        }
        if (u === r) {
          ((s = !0), (r = l), (n = i));
          break;
        }
        u = u.sibling;
      }
      if (!s) {
        for (u = i.child; u; ) {
          if (u === n) {
            ((s = !0), (n = i), (r = l));
            break;
          }
          if (u === r) {
            ((s = !0), (r = i), (n = l));
            break;
          }
          u = u.sibling;
        }
        if (!s) throw Error(w(189));
      }
    }
    if (n.alternate !== r) throw Error(w(190));
  }
  if (n.tag !== 3) throw Error(w(188));
  return n.stateNode.current === n ? e : t;
}
function Uu(e) {
  return ((e = sc(e)), e !== null ? Hu(e) : null);
}
function Hu(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Hu(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Vu = Te.unstable_scheduleCallback,
  ds = Te.unstable_cancelCallback,
  uc = Te.unstable_shouldYield,
  ac = Te.unstable_requestPaint,
  J = Te.unstable_now,
  dc = Te.unstable_getCurrentPriorityLevel,
  mo = Te.unstable_ImmediatePriority,
  $u = Te.unstable_UserBlockingPriority,
  Xr = Te.unstable_NormalPriority,
  cc = Te.unstable_LowPriority,
  Qu = Te.unstable_IdlePriority,
  yl = null,
  Ke = null;
function fc(e) {
  if (Ke && typeof Ke.onCommitFiberRoot == "function")
    try {
      Ke.onCommitFiberRoot(yl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Ue = Math.clz32 ? Math.clz32 : mc,
  pc = Math.log,
  hc = Math.LN2;
function mc(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((pc(e) / hc) | 0)) | 0);
}
var jr = 64,
  wr = 4194304;
function Dn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Gr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    i = e.pingedLanes,
    s = n & 268435455;
  if (s !== 0) {
    var u = s & ~l;
    u !== 0 ? (r = Dn(u)) : ((i &= s), i !== 0 && (r = Dn(i)));
  } else ((s = n & ~l), s !== 0 ? (r = Dn(s)) : i !== 0 && (r = Dn(i)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (i = t & -t), l >= i || (l === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      ((n = 31 - Ue(t)), (l = 1 << n), (r |= e[n]), (t &= ~l));
  return r;
}
function gc(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function yc(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;
  ) {
    var s = 31 - Ue(i),
      u = 1 << s,
      a = l[s];
    (a === -1
      ? (!(u & n) || u & r) && (l[s] = gc(u, t))
      : a <= t && (e.expiredLanes |= u),
      (i &= ~u));
  }
}
function Fi(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function bu() {
  var e = jr;
  return ((jr <<= 1), !(jr & 4194240) && (jr = 64), e);
}
function Vl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function cr(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Ue(t)),
    (e[t] = n));
}
function vc(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Ue(n),
      i = 1 << l;
    ((t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~i));
  }
}
function go(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Ue(n),
      l = 1 << r;
    ((l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l));
  }
}
var W = 0;
function Ku(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var Yu,
  yo,
  Xu,
  Gu,
  Zu,
  Ti = !1,
  kr = [],
  ht = null,
  mt = null,
  gt = null,
  Gn = new Map(),
  Zn = new Map(),
  dt = [],
  xc =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function cs(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ht = null;
      break;
    case "dragenter":
    case "dragleave":
      mt = null;
      break;
    case "mouseover":
    case "mouseout":
      gt = null;
      break;
    case "pointerover":
    case "pointerout":
      Gn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Zn.delete(t.pointerId);
  }
}
function Tn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [l],
      }),
      t !== null && ((t = pr(t)), t !== null && yo(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function Sc(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ((ht = Tn(ht, e, t, n, r, l)), !0);
    case "dragenter":
      return ((mt = Tn(mt, e, t, n, r, l)), !0);
    case "mouseover":
      return ((gt = Tn(gt, e, t, n, r, l)), !0);
    case "pointerover":
      var i = l.pointerId;
      return (Gn.set(i, Tn(Gn.get(i) || null, e, t, n, r, l)), !0);
    case "gotpointercapture":
      return (
        (i = l.pointerId),
        Zn.set(i, Tn(Zn.get(i) || null, e, t, n, r, l)),
        !0
      );
  }
  return !1;
}
function Ju(e) {
  var t = Nt(e.target);
  if (t !== null) {
    var n = Kt(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Wu(n)), t !== null)) {
          ((e.blockedOn = t),
            Zu(e.priority, function () {
              Xu(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Dr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Pi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((ki = r), n.target.dispatchEvent(r), (ki = null));
    } else return ((t = pr(n)), t !== null && yo(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function fs(e, t, n) {
  Dr(e) && n.delete(t);
}
function jc() {
  ((Ti = !1),
    ht !== null && Dr(ht) && (ht = null),
    mt !== null && Dr(mt) && (mt = null),
    gt !== null && Dr(gt) && (gt = null),
    Gn.forEach(fs),
    Zn.forEach(fs));
}
function Pn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Ti ||
      ((Ti = !0),
      Te.unstable_scheduleCallback(Te.unstable_NormalPriority, jc)));
}
function Jn(e) {
  function t(l) {
    return Pn(l, e);
  }
  if (0 < kr.length) {
    Pn(kr[0], e);
    for (var n = 1; n < kr.length; n++) {
      var r = kr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    ht !== null && Pn(ht, e),
      mt !== null && Pn(mt, e),
      gt !== null && Pn(gt, e),
      Gn.forEach(t),
      Zn.forEach(t),
      n = 0;
    n < dt.length;
    n++
  )
    ((r = dt[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < dt.length && ((n = dt[0]), n.blockedOn === null); )
    (Ju(n), n.blockedOn === null && dt.shift());
}
var fn = ot.ReactCurrentBatchConfig,
  Zr = !0;
function wc(e, t, n, r) {
  var l = W,
    i = fn.transition;
  fn.transition = null;
  try {
    ((W = 1), vo(e, t, n, r));
  } finally {
    ((W = l), (fn.transition = i));
  }
}
function kc(e, t, n, r) {
  var l = W,
    i = fn.transition;
  fn.transition = null;
  try {
    ((W = 4), vo(e, t, n, r));
  } finally {
    ((W = l), (fn.transition = i));
  }
}
function vo(e, t, n, r) {
  if (Zr) {
    var l = Pi(e, t, n, r);
    if (l === null) (ql(e, t, r, Jr, n), cs(e, r));
    else if (Sc(l, e, t, n, r)) r.stopPropagation();
    else if ((cs(e, r), t & 4 && -1 < xc.indexOf(e))) {
      for (; l !== null; ) {
        var i = pr(l);
        if (
          (i !== null && Yu(i),
          (i = Pi(e, t, n, r)),
          i === null && ql(e, t, r, Jr, n),
          i === l)
        )
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else ql(e, t, r, null, n);
  }
}
var Jr = null;
function Pi(e, t, n, r) {
  if (((Jr = null), (e = ho(r)), (e = Nt(e)), e !== null))
    if (((t = Kt(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Wu(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((Jr = e), null);
}
function qu(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (dc()) {
        case mo:
          return 1;
        case $u:
          return 4;
        case Xr:
        case cc:
          return 16;
        case Qu:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ft = null,
  xo = null,
  Lr = null;
function ea() {
  if (Lr) return Lr;
  var e,
    t = xo,
    n = t.length,
    r,
    l = "value" in ft ? ft.value : ft.textContent,
    i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === l[i - r]; r++);
  return (Lr = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Mr(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Er() {
  return !0;
}
function ps() {
  return !1;
}
function _e(e) {
  function t(n, r, l, i, s) {
    ((this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = s),
      (this.currentTarget = null));
    for (var u in e)
      e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(i) : i[u]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Er
        : ps),
      (this.isPropagationStopped = ps),
      this
    );
  }
  return (
    Y(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Er));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Er));
      },
      persist: function () {},
      isPersistent: Er,
    }),
    t
  );
}
var En = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  So = _e(En),
  fr = Y({}, En, { view: 0, detail: 0 }),
  Ec = _e(fr),
  $l,
  Ql,
  _n,
  vl = Y({}, fr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: jo,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== _n &&
            (_n && e.type === "mousemove"
              ? (($l = e.screenX - _n.screenX), (Ql = e.screenY - _n.screenY))
              : (Ql = $l = 0),
            (_n = e)),
          $l);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Ql;
    },
  }),
  hs = _e(vl),
  Cc = Y({}, vl, { dataTransfer: 0 }),
  zc = _e(Cc),
  Fc = Y({}, fr, { relatedTarget: 0 }),
  bl = _e(Fc),
  Tc = Y({}, En, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Pc = _e(Tc),
  _c = Y({}, En, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Ic = _e(_c),
  Bc = Y({}, En, { data: 0 }),
  ms = _e(Bc),
  Nc = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Ac = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Rc = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Dc(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Rc[e]) ? !!t[e] : !1;
}
function jo() {
  return Dc;
}
var Lc = Y({}, fr, {
    key: function (e) {
      if (e.key) {
        var t = Nc[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Mr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Ac[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: jo,
    charCode: function (e) {
      return e.type === "keypress" ? Mr(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Mr(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Mc = _e(Lc),
  Oc = Y({}, vl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  gs = _e(Oc),
  Wc = Y({}, fr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: jo,
  }),
  Uc = _e(Wc),
  Hc = Y({}, En, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Vc = _e(Hc),
  $c = Y({}, vl, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Qc = _e($c),
  bc = [9, 13, 27, 32],
  wo = nt && "CompositionEvent" in window,
  Wn = null;
nt && "documentMode" in document && (Wn = document.documentMode);
var Kc = nt && "TextEvent" in window && !Wn,
  ta = nt && (!wo || (Wn && 8 < Wn && 11 >= Wn)),
  ys = " ",
  vs = !1;
function na(e, t) {
  switch (e) {
    case "keyup":
      return bc.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function ra(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var Jt = !1;
function Yc(e, t) {
  switch (e) {
    case "compositionend":
      return ra(t);
    case "keypress":
      return t.which !== 32 ? null : ((vs = !0), ys);
    case "textInput":
      return ((e = t.data), e === ys && vs ? null : e);
    default:
      return null;
  }
}
function Xc(e, t) {
  if (Jt)
    return e === "compositionend" || (!wo && na(e, t))
      ? ((e = ea()), (Lr = xo = ft = null), (Jt = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return ta && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Gc = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function xs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Gc[e.type] : t === "textarea";
}
function la(e, t, n, r) {
  (Ru(r),
    (t = qr(t, "onChange")),
    0 < t.length &&
      ((n = new So("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t })));
}
var Un = null,
  qn = null;
function Zc(e) {
  ma(e, 0);
}
function xl(e) {
  var t = tn(e);
  if (Tu(t)) return e;
}
function Jc(e, t) {
  if (e === "change") return t;
}
var ia = !1;
if (nt) {
  var Kl;
  if (nt) {
    var Yl = "oninput" in document;
    if (!Yl) {
      var Ss = document.createElement("div");
      (Ss.setAttribute("oninput", "return;"),
        (Yl = typeof Ss.oninput == "function"));
    }
    Kl = Yl;
  } else Kl = !1;
  ia = Kl && (!document.documentMode || 9 < document.documentMode);
}
function js() {
  Un && (Un.detachEvent("onpropertychange", oa), (qn = Un = null));
}
function oa(e) {
  if (e.propertyName === "value" && xl(qn)) {
    var t = [];
    (la(t, qn, e, ho(e)), Ou(Zc, t));
  }
}
function qc(e, t, n) {
  e === "focusin"
    ? (js(), (Un = t), (qn = n), Un.attachEvent("onpropertychange", oa))
    : e === "focusout" && js();
}
function ef(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return xl(qn);
}
function tf(e, t) {
  if (e === "click") return xl(t);
}
function nf(e, t) {
  if (e === "input" || e === "change") return xl(t);
}
function rf(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Ve = typeof Object.is == "function" ? Object.is : rf;
function er(e, t) {
  if (Ve(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ci.call(t, l) || !Ve(e[l], t[l])) return !1;
  }
  return !0;
}
function ws(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ks(e, t) {
  var n = ws(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = ws(n);
  }
}
function sa(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? sa(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function ua() {
  for (var e = window, t = br(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = br(e.document);
  }
  return t;
}
function ko(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function lf(e) {
  var t = ua(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    sa(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && ko(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        ((n.selectionStart = t),
          (n.selectionEnd = Math.min(e, n.value.length)));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          i = Math.min(r.start, l);
        ((r = r.end === void 0 ? i : Math.min(r.end, l)),
          !e.extend && i > r && ((l = r), (r = i), (i = l)),
          (l = ks(n, i)));
        var s = ks(n, r);
        l &&
          s &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== s.node ||
            e.focusOffset !== s.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(s.node, s.offset))
            : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var of = nt && "documentMode" in document && 11 >= document.documentMode,
  qt = null,
  _i = null,
  Hn = null,
  Ii = !1;
function Es(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ii ||
    qt == null ||
    qt !== br(r) ||
    ((r = qt),
    "selectionStart" in r && ko(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Hn && er(Hn, r)) ||
      ((Hn = r),
      (r = qr(_i, "onSelect")),
      0 < r.length &&
        ((t = new So("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = qt))));
}
function Cr(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var en = {
    animationend: Cr("Animation", "AnimationEnd"),
    animationiteration: Cr("Animation", "AnimationIteration"),
    animationstart: Cr("Animation", "AnimationStart"),
    transitionend: Cr("Transition", "TransitionEnd"),
  },
  Xl = {},
  aa = {};
nt &&
  ((aa = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete en.animationend.animation,
    delete en.animationiteration.animation,
    delete en.animationstart.animation),
  "TransitionEvent" in window || delete en.transitionend.transition);
function Sl(e) {
  if (Xl[e]) return Xl[e];
  if (!en[e]) return e;
  var t = en[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in aa) return (Xl[e] = t[n]);
  return e;
}
var da = Sl("animationend"),
  ca = Sl("animationiteration"),
  fa = Sl("animationstart"),
  pa = Sl("transitionend"),
  ha = new Map(),
  Cs =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function Ct(e, t) {
  (ha.set(e, t), bt(t, [e]));
}
for (var Gl = 0; Gl < Cs.length; Gl++) {
  var Zl = Cs[Gl],
    sf = Zl.toLowerCase(),
    uf = Zl[0].toUpperCase() + Zl.slice(1);
  Ct(sf, "on" + uf);
}
Ct(da, "onAnimationEnd");
Ct(ca, "onAnimationIteration");
Ct(fa, "onAnimationStart");
Ct("dblclick", "onDoubleClick");
Ct("focusin", "onFocus");
Ct("focusout", "onBlur");
Ct(pa, "onTransitionEnd");
gn("onMouseEnter", ["mouseout", "mouseover"]);
gn("onMouseLeave", ["mouseout", "mouseover"]);
gn("onPointerEnter", ["pointerout", "pointerover"]);
gn("onPointerLeave", ["pointerout", "pointerover"]);
bt(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
bt(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
bt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
bt(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
bt(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
bt(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var Ln =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  af = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ln));
function zs(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), oc(r, t, void 0, e), (e.currentTarget = null));
}
function ma(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var s = r.length - 1; 0 <= s; s--) {
          var u = r[s],
            a = u.instance,
            d = u.currentTarget;
          if (((u = u.listener), a !== i && l.isPropagationStopped())) break e;
          (zs(l, u, d), (i = a));
        }
      else
        for (s = 0; s < r.length; s++) {
          if (
            ((u = r[s]),
            (a = u.instance),
            (d = u.currentTarget),
            (u = u.listener),
            a !== i && l.isPropagationStopped())
          )
            break e;
          (zs(l, u, d), (i = a));
        }
    }
  }
  if (Yr) throw ((e = zi), (Yr = !1), (zi = null), e);
}
function V(e, t) {
  var n = t[Di];
  n === void 0 && (n = t[Di] = new Set());
  var r = e + "__bubble";
  n.has(r) || (ga(t, e, 2, !1), n.add(r));
}
function Jl(e, t, n) {
  var r = 0;
  (t && (r |= 4), ga(n, e, r, t));
}
var zr = "_reactListening" + Math.random().toString(36).slice(2);
function tr(e) {
  if (!e[zr]) {
    ((e[zr] = !0),
      ku.forEach(function (n) {
        n !== "selectionchange" && (af.has(n) || Jl(n, !1, e), Jl(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[zr] || ((t[zr] = !0), Jl("selectionchange", !1, t));
  }
}
function ga(e, t, n, r) {
  switch (qu(t)) {
    case 1:
      var l = wc;
      break;
    case 4:
      l = kc;
      break;
    default:
      l = vo;
  }
  ((n = l.bind(null, t, n, e)),
    (l = void 0),
    !Ci ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1));
}
function ql(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var s = r.tag;
      if (s === 3 || s === 4) {
        var u = r.stateNode.containerInfo;
        if (u === l || (u.nodeType === 8 && u.parentNode === l)) break;
        if (s === 4)
          for (s = r.return; s !== null; ) {
            var a = s.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = s.stateNode.containerInfo),
              a === l || (a.nodeType === 8 && a.parentNode === l))
            )
              return;
            s = s.return;
          }
        for (; u !== null; ) {
          if (((s = Nt(u)), s === null)) return;
          if (((a = s.tag), a === 5 || a === 6)) {
            r = i = s;
            continue e;
          }
          u = u.parentNode;
        }
      }
      r = r.return;
    }
  Ou(function () {
    var d = i,
      f = ho(n),
      g = [];
    e: {
      var v = ha.get(e);
      if (v !== void 0) {
        var h = So,
          y = e;
        switch (e) {
          case "keypress":
            if (Mr(n) === 0) break e;
          case "keydown":
          case "keyup":
            h = Mc;
            break;
          case "focusin":
            ((y = "focus"), (h = bl));
            break;
          case "focusout":
            ((y = "blur"), (h = bl));
            break;
          case "beforeblur":
          case "afterblur":
            h = bl;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            h = hs;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            h = zc;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = Uc;
            break;
          case da:
          case ca:
          case fa:
            h = Pc;
            break;
          case pa:
            h = Vc;
            break;
          case "scroll":
            h = Ec;
            break;
          case "wheel":
            h = Qc;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = Ic;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            h = gs;
        }
        var S = (t & 4) !== 0,
          _ = !S && e === "scroll",
          p = S ? (v !== null ? v + "Capture" : null) : v;
        S = [];
        for (var c = d, m; c !== null; ) {
          m = c;
          var j = m.stateNode;
          if (
            (m.tag === 5 &&
              j !== null &&
              ((m = j),
              p !== null && ((j = Xn(c, p)), j != null && S.push(nr(c, j, m)))),
            _)
          )
            break;
          c = c.return;
        }
        0 < S.length &&
          ((v = new h(v, y, null, n, f)), g.push({ event: v, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((v = e === "mouseover" || e === "pointerover"),
          (h = e === "mouseout" || e === "pointerout"),
          v &&
            n !== ki &&
            (y = n.relatedTarget || n.fromElement) &&
            (Nt(y) || y[rt]))
        )
          break e;
        if (
          (h || v) &&
          ((v =
            f.window === f
              ? f
              : (v = f.ownerDocument)
                ? v.defaultView || v.parentWindow
                : window),
          h
            ? ((y = n.relatedTarget || n.toElement),
              (h = d),
              (y = y ? Nt(y) : null),
              y !== null &&
                ((_ = Kt(y)), y !== _ || (y.tag !== 5 && y.tag !== 6)) &&
                (y = null))
            : ((h = null), (y = d)),
          h !== y)
        ) {
          if (
            ((S = hs),
            (j = "onMouseLeave"),
            (p = "onMouseEnter"),
            (c = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((S = gs),
              (j = "onPointerLeave"),
              (p = "onPointerEnter"),
              (c = "pointer")),
            (_ = h == null ? v : tn(h)),
            (m = y == null ? v : tn(y)),
            (v = new S(j, c + "leave", h, n, f)),
            (v.target = _),
            (v.relatedTarget = m),
            (j = null),
            Nt(f) === d &&
              ((S = new S(p, c + "enter", y, n, f)),
              (S.target = m),
              (S.relatedTarget = _),
              (j = S)),
            (_ = j),
            h && y)
          )
            t: {
              for (S = h, p = y, c = 0, m = S; m; m = Xt(m)) c++;
              for (m = 0, j = p; j; j = Xt(j)) m++;
              for (; 0 < c - m; ) ((S = Xt(S)), c--);
              for (; 0 < m - c; ) ((p = Xt(p)), m--);
              for (; c--; ) {
                if (S === p || (p !== null && S === p.alternate)) break t;
                ((S = Xt(S)), (p = Xt(p)));
              }
              S = null;
            }
          else S = null;
          (h !== null && Fs(g, v, h, S, !1),
            y !== null && _ !== null && Fs(g, _, y, S, !0));
        }
      }
      e: {
        if (
          ((v = d ? tn(d) : window),
          (h = v.nodeName && v.nodeName.toLowerCase()),
          h === "select" || (h === "input" && v.type === "file"))
        )
          var C = Jc;
        else if (xs(v))
          if (ia) C = nf;
          else {
            C = ef;
            var x = qc;
          }
        else
          (h = v.nodeName) &&
            h.toLowerCase() === "input" &&
            (v.type === "checkbox" || v.type === "radio") &&
            (C = tf);
        if (C && (C = C(e, d))) {
          la(g, C, n, f);
          break e;
        }
        (x && x(e, v, d),
          e === "focusout" &&
            (x = v._wrapperState) &&
            x.controlled &&
            v.type === "number" &&
            vi(v, "number", v.value));
      }
      switch (((x = d ? tn(d) : window), e)) {
        case "focusin":
          (xs(x) || x.contentEditable === "true") &&
            ((qt = x), (_i = d), (Hn = null));
          break;
        case "focusout":
          Hn = _i = qt = null;
          break;
        case "mousedown":
          Ii = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Ii = !1), Es(g, n, f));
          break;
        case "selectionchange":
          if (of) break;
        case "keydown":
        case "keyup":
          Es(g, n, f);
      }
      var k;
      if (wo)
        e: {
          switch (e) {
            case "compositionstart":
              var T = "onCompositionStart";
              break e;
            case "compositionend":
              T = "onCompositionEnd";
              break e;
            case "compositionupdate":
              T = "onCompositionUpdate";
              break e;
          }
          T = void 0;
        }
      else
        Jt
          ? na(e, n) && (T = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      (T &&
        (ta &&
          n.locale !== "ko" &&
          (Jt || T !== "onCompositionStart"
            ? T === "onCompositionEnd" && Jt && (k = ea())
            : ((ft = f),
              (xo = "value" in ft ? ft.value : ft.textContent),
              (Jt = !0))),
        (x = qr(d, T)),
        0 < x.length &&
          ((T = new ms(T, e, null, n, f)),
          g.push({ event: T, listeners: x }),
          k ? (T.data = k) : ((k = ra(n)), k !== null && (T.data = k)))),
        (k = Kc ? Yc(e, n) : Xc(e, n)) &&
          ((d = qr(d, "onBeforeInput")),
          0 < d.length &&
            ((f = new ms("onBeforeInput", "beforeinput", null, n, f)),
            g.push({ event: f, listeners: d }),
            (f.data = k))));
    }
    ma(g, t);
  });
}
function nr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function qr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      i = l.stateNode;
    (l.tag === 5 &&
      i !== null &&
      ((l = i),
      (i = Xn(e, n)),
      i != null && r.unshift(nr(e, i, l)),
      (i = Xn(e, t)),
      i != null && r.push(nr(e, i, l))),
      (e = e.return));
  }
  return r;
}
function Xt(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Fs(e, t, n, r, l) {
  for (var i = t._reactName, s = []; n !== null && n !== r; ) {
    var u = n,
      a = u.alternate,
      d = u.stateNode;
    if (a !== null && a === r) break;
    (u.tag === 5 &&
      d !== null &&
      ((u = d),
      l
        ? ((a = Xn(n, i)), a != null && s.unshift(nr(n, a, u)))
        : l || ((a = Xn(n, i)), a != null && s.push(nr(n, a, u)))),
      (n = n.return));
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var df = /\r\n?/g,
  cf = /\u0000|\uFFFD/g;
function Ts(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      df,
      `
`,
    )
    .replace(cf, "");
}
function Fr(e, t, n) {
  if (((t = Ts(t)), Ts(e) !== t && n)) throw Error(w(425));
}
function el() {}
var Bi = null,
  Ni = null;
function Ai(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Ri = typeof setTimeout == "function" ? setTimeout : void 0,
  ff = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Ps = typeof Promise == "function" ? Promise : void 0,
  pf =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Ps < "u"
        ? function (e) {
            return Ps.resolve(null).then(e).catch(hf);
          }
        : Ri;
function hf(e) {
  setTimeout(function () {
    throw e;
  });
}
function ei(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(l), Jn(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  Jn(t);
}
function yt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function _s(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Cn = Math.random().toString(36).slice(2),
  be = "__reactFiber$" + Cn,
  rr = "__reactProps$" + Cn,
  rt = "__reactContainer$" + Cn,
  Di = "__reactEvents$" + Cn,
  mf = "__reactListeners$" + Cn,
  gf = "__reactHandles$" + Cn;
function Nt(e) {
  var t = e[be];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[rt] || n[be])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = _s(e); e !== null; ) {
          if ((n = e[be])) return n;
          e = _s(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function pr(e) {
  return (
    (e = e[be] || e[rt]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function tn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(w(33));
}
function jl(e) {
  return e[rr] || null;
}
var Li = [],
  nn = -1;
function zt(e) {
  return { current: e };
}
function $(e) {
  0 > nn || ((e.current = Li[nn]), (Li[nn] = null), nn--);
}
function U(e, t) {
  (nn++, (Li[nn] = e.current), (e.current = t));
}
var Et = {},
  pe = zt(Et),
  je = zt(!1),
  Ut = Et;
function yn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Et;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    i;
  for (i in n) l[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function we(e) {
  return ((e = e.childContextTypes), e != null);
}
function tl() {
  ($(je), $(pe));
}
function Is(e, t, n) {
  if (pe.current !== Et) throw Error(w(168));
  (U(pe, t), U(je, n));
}
function ya(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(w(108, qd(e) || "Unknown", l));
  return Y({}, n, r);
}
function nl(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Et),
    (Ut = pe.current),
    U(pe, e),
    U(je, je.current),
    !0
  );
}
function Bs(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(w(169));
  (n
    ? ((e = ya(e, t, Ut)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      $(je),
      $(pe),
      U(pe, e))
    : $(je),
    U(je, n));
}
var Ze = null,
  wl = !1,
  ti = !1;
function va(e) {
  Ze === null ? (Ze = [e]) : Ze.push(e);
}
function yf(e) {
  ((wl = !0), va(e));
}
function Ft() {
  if (!ti && Ze !== null) {
    ti = !0;
    var e = 0,
      t = W;
    try {
      var n = Ze;
      for (W = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((Ze = null), (wl = !1));
    } catch (l) {
      throw (Ze !== null && (Ze = Ze.slice(e + 1)), Vu(mo, Ft), l);
    } finally {
      ((W = t), (ti = !1));
    }
  }
  return null;
}
var rn = [],
  ln = 0,
  rl = null,
  ll = 0,
  Ie = [],
  Be = 0,
  Ht = null,
  qe = 1,
  et = "";
function It(e, t) {
  ((rn[ln++] = ll), (rn[ln++] = rl), (rl = e), (ll = t));
}
function xa(e, t, n) {
  ((Ie[Be++] = qe), (Ie[Be++] = et), (Ie[Be++] = Ht), (Ht = e));
  var r = qe;
  e = et;
  var l = 32 - Ue(r) - 1;
  ((r &= ~(1 << l)), (n += 1));
  var i = 32 - Ue(t) + l;
  if (30 < i) {
    var s = l - (l % 5);
    ((i = (r & ((1 << s) - 1)).toString(32)),
      (r >>= s),
      (l -= s),
      (qe = (1 << (32 - Ue(t) + l)) | (n << l) | r),
      (et = i + e));
  } else ((qe = (1 << i) | (n << l) | r), (et = e));
}
function Eo(e) {
  e.return !== null && (It(e, 1), xa(e, 1, 0));
}
function Co(e) {
  for (; e === rl; )
    ((rl = rn[--ln]), (rn[ln] = null), (ll = rn[--ln]), (rn[ln] = null));
  for (; e === Ht; )
    ((Ht = Ie[--Be]),
      (Ie[Be] = null),
      (et = Ie[--Be]),
      (Ie[Be] = null),
      (qe = Ie[--Be]),
      (Ie[Be] = null));
}
var Fe = null,
  ze = null,
  Q = !1,
  We = null;
function Sa(e, t) {
  var n = Ne(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function Ns(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Fe = e), (ze = yt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Fe = e), (ze = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Ht !== null ? { id: qe, overflow: et } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Ne(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Fe = e),
            (ze = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Mi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Oi(e) {
  if (Q) {
    var t = ze;
    if (t) {
      var n = t;
      if (!Ns(e, t)) {
        if (Mi(e)) throw Error(w(418));
        t = yt(n.nextSibling);
        var r = Fe;
        t && Ns(e, t)
          ? Sa(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (Q = !1), (Fe = e));
      }
    } else {
      if (Mi(e)) throw Error(w(418));
      ((e.flags = (e.flags & -4097) | 2), (Q = !1), (Fe = e));
    }
  }
}
function As(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Fe = e;
}
function Tr(e) {
  if (e !== Fe) return !1;
  if (!Q) return (As(e), (Q = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Ai(e.type, e.memoizedProps))),
    t && (t = ze))
  ) {
    if (Mi(e)) throw (ja(), Error(w(418)));
    for (; t; ) (Sa(e, t), (t = yt(t.nextSibling)));
  }
  if ((As(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(w(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ze = yt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      ze = null;
    }
  } else ze = Fe ? yt(e.stateNode.nextSibling) : null;
  return !0;
}
function ja() {
  for (var e = ze; e; ) e = yt(e.nextSibling);
}
function vn() {
  ((ze = Fe = null), (Q = !1));
}
function zo(e) {
  We === null ? (We = [e]) : We.push(e);
}
var vf = ot.ReactCurrentBatchConfig;
function In(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(w(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(w(147, e));
      var l = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (s) {
            var u = l.refs;
            s === null ? delete u[i] : (u[i] = s);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(w(284));
    if (!n._owner) throw Error(w(290, e));
  }
  return e;
}
function Pr(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      w(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    )
  );
}
function Rs(e) {
  var t = e._init;
  return t(e._payload);
}
function wa(e) {
  function t(p, c) {
    if (e) {
      var m = p.deletions;
      m === null ? ((p.deletions = [c]), (p.flags |= 16)) : m.push(c);
    }
  }
  function n(p, c) {
    if (!e) return null;
    for (; c !== null; ) (t(p, c), (c = c.sibling));
    return null;
  }
  function r(p, c) {
    for (p = new Map(); c !== null; )
      (c.key !== null ? p.set(c.key, c) : p.set(c.index, c), (c = c.sibling));
    return p;
  }
  function l(p, c) {
    return ((p = jt(p, c)), (p.index = 0), (p.sibling = null), p);
  }
  function i(p, c, m) {
    return (
      (p.index = m),
      e
        ? ((m = p.alternate),
          m !== null
            ? ((m = m.index), m < c ? ((p.flags |= 2), c) : m)
            : ((p.flags |= 2), c))
        : ((p.flags |= 1048576), c)
    );
  }
  function s(p) {
    return (e && p.alternate === null && (p.flags |= 2), p);
  }
  function u(p, c, m, j) {
    return c === null || c.tag !== 6
      ? ((c = ui(m, p.mode, j)), (c.return = p), c)
      : ((c = l(c, m)), (c.return = p), c);
  }
  function a(p, c, m, j) {
    var C = m.type;
    return C === Zt
      ? f(p, c, m.props.children, j, m.key)
      : c !== null &&
          (c.elementType === C ||
            (typeof C == "object" &&
              C !== null &&
              C.$$typeof === ut &&
              Rs(C) === c.type))
        ? ((j = l(c, m.props)), (j.ref = In(p, c, m)), (j.return = p), j)
        : ((j = Qr(m.type, m.key, m.props, null, p.mode, j)),
          (j.ref = In(p, c, m)),
          (j.return = p),
          j);
  }
  function d(p, c, m, j) {
    return c === null ||
      c.tag !== 4 ||
      c.stateNode.containerInfo !== m.containerInfo ||
      c.stateNode.implementation !== m.implementation
      ? ((c = ai(m, p.mode, j)), (c.return = p), c)
      : ((c = l(c, m.children || [])), (c.return = p), c);
  }
  function f(p, c, m, j, C) {
    return c === null || c.tag !== 7
      ? ((c = Mt(m, p.mode, j, C)), (c.return = p), c)
      : ((c = l(c, m)), (c.return = p), c);
  }
  function g(p, c, m) {
    if ((typeof c == "string" && c !== "") || typeof c == "number")
      return ((c = ui("" + c, p.mode, m)), (c.return = p), c);
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case vr:
          return (
            (m = Qr(c.type, c.key, c.props, null, p.mode, m)),
            (m.ref = In(p, null, c)),
            (m.return = p),
            m
          );
        case Gt:
          return ((c = ai(c, p.mode, m)), (c.return = p), c);
        case ut:
          var j = c._init;
          return g(p, j(c._payload), m);
      }
      if (Rn(c) || zn(c))
        return ((c = Mt(c, p.mode, m, null)), (c.return = p), c);
      Pr(p, c);
    }
    return null;
  }
  function v(p, c, m, j) {
    var C = c !== null ? c.key : null;
    if ((typeof m == "string" && m !== "") || typeof m == "number")
      return C !== null ? null : u(p, c, "" + m, j);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case vr:
          return m.key === C ? a(p, c, m, j) : null;
        case Gt:
          return m.key === C ? d(p, c, m, j) : null;
        case ut:
          return ((C = m._init), v(p, c, C(m._payload), j));
      }
      if (Rn(m) || zn(m)) return C !== null ? null : f(p, c, m, j, null);
      Pr(p, m);
    }
    return null;
  }
  function h(p, c, m, j, C) {
    if ((typeof j == "string" && j !== "") || typeof j == "number")
      return ((p = p.get(m) || null), u(c, p, "" + j, C));
    if (typeof j == "object" && j !== null) {
      switch (j.$$typeof) {
        case vr:
          return (
            (p = p.get(j.key === null ? m : j.key) || null),
            a(c, p, j, C)
          );
        case Gt:
          return (
            (p = p.get(j.key === null ? m : j.key) || null),
            d(c, p, j, C)
          );
        case ut:
          var x = j._init;
          return h(p, c, m, x(j._payload), C);
      }
      if (Rn(j) || zn(j)) return ((p = p.get(m) || null), f(c, p, j, C, null));
      Pr(c, j);
    }
    return null;
  }
  function y(p, c, m, j) {
    for (
      var C = null, x = null, k = c, T = (c = 0), R = null;
      k !== null && T < m.length;
      T++
    ) {
      k.index > T ? ((R = k), (k = null)) : (R = k.sibling);
      var B = v(p, k, m[T], j);
      if (B === null) {
        k === null && (k = R);
        break;
      }
      (e && k && B.alternate === null && t(p, k),
        (c = i(B, c, T)),
        x === null ? (C = B) : (x.sibling = B),
        (x = B),
        (k = R));
    }
    if (T === m.length) return (n(p, k), Q && It(p, T), C);
    if (k === null) {
      for (; T < m.length; T++)
        ((k = g(p, m[T], j)),
          k !== null &&
            ((c = i(k, c, T)),
            x === null ? (C = k) : (x.sibling = k),
            (x = k)));
      return (Q && It(p, T), C);
    }
    for (k = r(p, k); T < m.length; T++)
      ((R = h(k, p, T, m[T], j)),
        R !== null &&
          (e && R.alternate !== null && k.delete(R.key === null ? T : R.key),
          (c = i(R, c, T)),
          x === null ? (C = R) : (x.sibling = R),
          (x = R)));
    return (
      e &&
        k.forEach(function (oe) {
          return t(p, oe);
        }),
      Q && It(p, T),
      C
    );
  }
  function S(p, c, m, j) {
    var C = zn(m);
    if (typeof C != "function") throw Error(w(150));
    if (((m = C.call(m)), m == null)) throw Error(w(151));
    for (
      var x = (C = null), k = c, T = (c = 0), R = null, B = m.next();
      k !== null && !B.done;
      T++, B = m.next()
    ) {
      k.index > T ? ((R = k), (k = null)) : (R = k.sibling);
      var oe = v(p, k, B.value, j);
      if (oe === null) {
        k === null && (k = R);
        break;
      }
      (e && k && oe.alternate === null && t(p, k),
        (c = i(oe, c, T)),
        x === null ? (C = oe) : (x.sibling = oe),
        (x = oe),
        (k = R));
    }
    if (B.done) return (n(p, k), Q && It(p, T), C);
    if (k === null) {
      for (; !B.done; T++, B = m.next())
        ((B = g(p, B.value, j)),
          B !== null &&
            ((c = i(B, c, T)),
            x === null ? (C = B) : (x.sibling = B),
            (x = B)));
      return (Q && It(p, T), C);
    }
    for (k = r(p, k); !B.done; T++, B = m.next())
      ((B = h(k, p, T, B.value, j)),
        B !== null &&
          (e && B.alternate !== null && k.delete(B.key === null ? T : B.key),
          (c = i(B, c, T)),
          x === null ? (C = B) : (x.sibling = B),
          (x = B)));
    return (
      e &&
        k.forEach(function (O) {
          return t(p, O);
        }),
      Q && It(p, T),
      C
    );
  }
  function _(p, c, m, j) {
    if (
      (typeof m == "object" &&
        m !== null &&
        m.type === Zt &&
        m.key === null &&
        (m = m.props.children),
      typeof m == "object" && m !== null)
    ) {
      switch (m.$$typeof) {
        case vr:
          e: {
            for (var C = m.key, x = c; x !== null; ) {
              if (x.key === C) {
                if (((C = m.type), C === Zt)) {
                  if (x.tag === 7) {
                    (n(p, x.sibling),
                      (c = l(x, m.props.children)),
                      (c.return = p),
                      (p = c));
                    break e;
                  }
                } else if (
                  x.elementType === C ||
                  (typeof C == "object" &&
                    C !== null &&
                    C.$$typeof === ut &&
                    Rs(C) === x.type)
                ) {
                  (n(p, x.sibling),
                    (c = l(x, m.props)),
                    (c.ref = In(p, x, m)),
                    (c.return = p),
                    (p = c));
                  break e;
                }
                n(p, x);
                break;
              } else t(p, x);
              x = x.sibling;
            }
            m.type === Zt
              ? ((c = Mt(m.props.children, p.mode, j, m.key)),
                (c.return = p),
                (p = c))
              : ((j = Qr(m.type, m.key, m.props, null, p.mode, j)),
                (j.ref = In(p, c, m)),
                (j.return = p),
                (p = j));
          }
          return s(p);
        case Gt:
          e: {
            for (x = m.key; c !== null; ) {
              if (c.key === x)
                if (
                  c.tag === 4 &&
                  c.stateNode.containerInfo === m.containerInfo &&
                  c.stateNode.implementation === m.implementation
                ) {
                  (n(p, c.sibling),
                    (c = l(c, m.children || [])),
                    (c.return = p),
                    (p = c));
                  break e;
                } else {
                  n(p, c);
                  break;
                }
              else t(p, c);
              c = c.sibling;
            }
            ((c = ai(m, p.mode, j)), (c.return = p), (p = c));
          }
          return s(p);
        case ut:
          return ((x = m._init), _(p, c, x(m._payload), j));
      }
      if (Rn(m)) return y(p, c, m, j);
      if (zn(m)) return S(p, c, m, j);
      Pr(p, m);
    }
    return (typeof m == "string" && m !== "") || typeof m == "number"
      ? ((m = "" + m),
        c !== null && c.tag === 6
          ? (n(p, c.sibling), (c = l(c, m)), (c.return = p), (p = c))
          : (n(p, c), (c = ui(m, p.mode, j)), (c.return = p), (p = c)),
        s(p))
      : n(p, c);
  }
  return _;
}
var xn = wa(!0),
  ka = wa(!1),
  il = zt(null),
  ol = null,
  on = null,
  Fo = null;
function To() {
  Fo = on = ol = null;
}
function Po(e) {
  var t = il.current;
  ($(il), (e._currentValue = t));
}
function Wi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function pn(e, t) {
  ((ol = e),
    (Fo = on = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Se = !0), (e.firstContext = null)));
}
function Re(e) {
  var t = e._currentValue;
  if (Fo !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), on === null)) {
      if (ol === null) throw Error(w(308));
      ((on = e), (ol.dependencies = { lanes: 0, firstContext: e }));
    } else on = on.next = e;
  return t;
}
var At = null;
function _o(e) {
  At === null ? (At = [e]) : At.push(e);
}
function Ea(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), _o(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    lt(e, r)
  );
}
function lt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var at = !1;
function Io(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Ca(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function tt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function vt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), D & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      lt(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), _o(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    lt(e, n)
  );
}
function Or(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), go(e, n));
  }
}
function Ds(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var s = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (i === null ? (l = i = s) : (i = i.next = s), (n = n.next));
      } while (n !== null);
      i === null ? (l = i = t) : (i = i.next = t);
    } else l = i = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t));
}
function sl(e, t, n, r) {
  var l = e.updateQueue;
  at = !1;
  var i = l.firstBaseUpdate,
    s = l.lastBaseUpdate,
    u = l.shared.pending;
  if (u !== null) {
    l.shared.pending = null;
    var a = u,
      d = a.next;
    ((a.next = null), s === null ? (i = d) : (s.next = d), (s = a));
    var f = e.alternate;
    f !== null &&
      ((f = f.updateQueue),
      (u = f.lastBaseUpdate),
      u !== s &&
        (u === null ? (f.firstBaseUpdate = d) : (u.next = d),
        (f.lastBaseUpdate = a)));
  }
  if (i !== null) {
    var g = l.baseState;
    ((s = 0), (f = d = a = null), (u = i));
    do {
      var v = u.lane,
        h = u.eventTime;
      if ((r & v) === v) {
        f !== null &&
          (f = f.next =
            {
              eventTime: h,
              lane: 0,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null,
            });
        e: {
          var y = e,
            S = u;
          switch (((v = t), (h = n), S.tag)) {
            case 1:
              if (((y = S.payload), typeof y == "function")) {
                g = y.call(h, g, v);
                break e;
              }
              g = y;
              break e;
            case 3:
              y.flags = (y.flags & -65537) | 128;
            case 0:
              if (
                ((y = S.payload),
                (v = typeof y == "function" ? y.call(h, g, v) : y),
                v == null)
              )
                break e;
              g = Y({}, g, v);
              break e;
            case 2:
              at = !0;
          }
        }
        u.callback !== null &&
          u.lane !== 0 &&
          ((e.flags |= 64),
          (v = l.effects),
          v === null ? (l.effects = [u]) : v.push(u));
      } else
        ((h = {
          eventTime: h,
          lane: v,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null,
        }),
          f === null ? ((d = f = h), (a = g)) : (f = f.next = h),
          (s |= v));
      if (((u = u.next), u === null)) {
        if (((u = l.shared.pending), u === null)) break;
        ((v = u),
          (u = v.next),
          (v.next = null),
          (l.lastBaseUpdate = v),
          (l.shared.pending = null));
      }
    } while (!0);
    if (
      (f === null && (a = g),
      (l.baseState = a),
      (l.firstBaseUpdate = d),
      (l.lastBaseUpdate = f),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do ((s |= l.lane), (l = l.next));
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    (($t |= s), (e.lanes = s), (e.memoizedState = g));
  }
}
function Ls(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(w(191, l));
        l.call(r);
      }
    }
}
var hr = {},
  Ye = zt(hr),
  lr = zt(hr),
  ir = zt(hr);
function Rt(e) {
  if (e === hr) throw Error(w(174));
  return e;
}
function Bo(e, t) {
  switch ((U(ir, t), U(lr, e), U(Ye, hr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Si(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Si(t, e)));
  }
  ($(Ye), U(Ye, t));
}
function Sn() {
  ($(Ye), $(lr), $(ir));
}
function za(e) {
  Rt(ir.current);
  var t = Rt(Ye.current),
    n = Si(t, e.type);
  t !== n && (U(lr, e), U(Ye, n));
}
function No(e) {
  lr.current === e && ($(Ye), $(lr));
}
var b = zt(0);
function ul(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var ni = [];
function Ao() {
  for (var e = 0; e < ni.length; e++)
    ni[e]._workInProgressVersionPrimary = null;
  ni.length = 0;
}
var Wr = ot.ReactCurrentDispatcher,
  ri = ot.ReactCurrentBatchConfig,
  Vt = 0,
  K = null,
  te = null,
  le = null,
  al = !1,
  Vn = !1,
  or = 0,
  xf = 0;
function de() {
  throw Error(w(321));
}
function Ro(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Ve(e[n], t[n])) return !1;
  return !0;
}
function Do(e, t, n, r, l, i) {
  if (
    ((Vt = i),
    (K = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Wr.current = e === null || e.memoizedState === null ? kf : Ef),
    (e = n(r, l)),
    Vn)
  ) {
    i = 0;
    do {
      if (((Vn = !1), (or = 0), 25 <= i)) throw Error(w(301));
      ((i += 1),
        (le = te = null),
        (t.updateQueue = null),
        (Wr.current = Cf),
        (e = n(r, l)));
    } while (Vn);
  }
  if (
    ((Wr.current = dl),
    (t = te !== null && te.next !== null),
    (Vt = 0),
    (le = te = K = null),
    (al = !1),
    t)
  )
    throw Error(w(300));
  return e;
}
function Lo() {
  var e = or !== 0;
  return ((or = 0), e);
}
function Qe() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (le === null ? (K.memoizedState = le = e) : (le = le.next = e), le);
}
function De() {
  if (te === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = te.next;
  var t = le === null ? K.memoizedState : le.next;
  if (t !== null) ((le = t), (te = e));
  else {
    if (e === null) throw Error(w(310));
    ((te = e),
      (e = {
        memoizedState: te.memoizedState,
        baseState: te.baseState,
        baseQueue: te.baseQueue,
        queue: te.queue,
        next: null,
      }),
      le === null ? (K.memoizedState = le = e) : (le = le.next = e));
  }
  return le;
}
function sr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function li(e) {
  var t = De(),
    n = t.queue;
  if (n === null) throw Error(w(311));
  n.lastRenderedReducer = e;
  var r = te,
    l = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var s = l.next;
      ((l.next = i.next), (i.next = s));
    }
    ((r.baseQueue = l = i), (n.pending = null));
  }
  if (l !== null) {
    ((i = l.next), (r = r.baseState));
    var u = (s = null),
      a = null,
      d = i;
    do {
      var f = d.lane;
      if ((Vt & f) === f)
        (a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: d.action,
              hasEagerState: d.hasEagerState,
              eagerState: d.eagerState,
              next: null,
            }),
          (r = d.hasEagerState ? d.eagerState : e(r, d.action)));
      else {
        var g = {
          lane: f,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null,
        };
        (a === null ? ((u = a = g), (s = r)) : (a = a.next = g),
          (K.lanes |= f),
          ($t |= f));
      }
      d = d.next;
    } while (d !== null && d !== i);
    (a === null ? (s = r) : (a.next = u),
      Ve(r, t.memoizedState) || (Se = !0),
      (t.memoizedState = r),
      (t.baseState = s),
      (t.baseQueue = a),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do ((i = l.lane), (K.lanes |= i), ($t |= i), (l = l.next));
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ii(e) {
  var t = De(),
    n = t.queue;
  if (n === null) throw Error(w(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var s = (l = l.next);
    do ((i = e(i, s.action)), (s = s.next));
    while (s !== l);
    (Ve(i, t.memoizedState) || (Se = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i));
  }
  return [i, r];
}
function Fa() {}
function Ta(e, t) {
  var n = K,
    r = De(),
    l = t(),
    i = !Ve(r.memoizedState, l);
  if (
    (i && ((r.memoizedState = l), (Se = !0)),
    (r = r.queue),
    Mo(Ia.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (le !== null && le.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      ur(9, _a.bind(null, n, r, l, t), void 0, null),
      ie === null)
    )
      throw Error(w(349));
    Vt & 30 || Pa(n, t, l);
  }
  return l;
}
function Pa(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = K.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (K.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function _a(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), Ba(t) && Na(e));
}
function Ia(e, t, n) {
  return n(function () {
    Ba(t) && Na(e);
  });
}
function Ba(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ve(e, n);
  } catch {
    return !0;
  }
}
function Na(e) {
  var t = lt(e, 1);
  t !== null && He(t, e, 1, -1);
}
function Ms(e) {
  var t = Qe();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: sr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = wf.bind(null, K, e)),
    [t.memoizedState, e]
  );
}
function ur(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = K.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (K.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Aa() {
  return De().memoizedState;
}
function Ur(e, t, n, r) {
  var l = Qe();
  ((K.flags |= e),
    (l.memoizedState = ur(1 | t, n, void 0, r === void 0 ? null : r)));
}
function kl(e, t, n, r) {
  var l = De();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (te !== null) {
    var s = te.memoizedState;
    if (((i = s.destroy), r !== null && Ro(r, s.deps))) {
      l.memoizedState = ur(t, n, i, r);
      return;
    }
  }
  ((K.flags |= e), (l.memoizedState = ur(1 | t, n, i, r)));
}
function Os(e, t) {
  return Ur(8390656, 8, e, t);
}
function Mo(e, t) {
  return kl(2048, 8, e, t);
}
function Ra(e, t) {
  return kl(4, 2, e, t);
}
function Da(e, t) {
  return kl(4, 4, e, t);
}
function La(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Ma(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    kl(4, 4, La.bind(null, t, e), n)
  );
}
function Oo() {}
function Oa(e, t) {
  var n = De();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ro(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Wa(e, t) {
  var n = De();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ro(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Ua(e, t, n) {
  return Vt & 21
    ? (Ve(n, t) || ((n = bu()), (K.lanes |= n), ($t |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Se = !0)), (e.memoizedState = n));
}
function Sf(e, t) {
  var n = W;
  ((W = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = ri.transition;
  ri.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((W = n), (ri.transition = r));
  }
}
function Ha() {
  return De().memoizedState;
}
function jf(e, t, n) {
  var r = St(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Va(e))
  )
    $a(t, n);
  else if (((n = Ea(e, t, n, r)), n !== null)) {
    var l = me();
    (He(n, e, r, l), Qa(n, t, r));
  }
}
function wf(e, t, n) {
  var r = St(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Va(e)) $a(t, l);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var s = t.lastRenderedState,
          u = i(s, n);
        if (((l.hasEagerState = !0), (l.eagerState = u), Ve(u, s))) {
          var a = t.interleaved;
          (a === null
            ? ((l.next = l), _o(t))
            : ((l.next = a.next), (a.next = l)),
            (t.interleaved = l));
          return;
        }
      } catch {
      } finally {
      }
    ((n = Ea(e, t, l, r)),
      n !== null && ((l = me()), He(n, e, r, l), Qa(n, t, r)));
  }
}
function Va(e) {
  var t = e.alternate;
  return e === K || (t !== null && t === K);
}
function $a(e, t) {
  Vn = al = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function Qa(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), go(e, n));
  }
}
var dl = {
    readContext: Re,
    useCallback: de,
    useContext: de,
    useEffect: de,
    useImperativeHandle: de,
    useInsertionEffect: de,
    useLayoutEffect: de,
    useMemo: de,
    useReducer: de,
    useRef: de,
    useState: de,
    useDebugValue: de,
    useDeferredValue: de,
    useTransition: de,
    useMutableSource: de,
    useSyncExternalStore: de,
    useId: de,
    unstable_isNewReconciler: !1,
  },
  kf = {
    readContext: Re,
    useCallback: function (e, t) {
      return ((Qe().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Re,
    useEffect: Os,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Ur(4194308, 4, La.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Ur(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Ur(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Qe();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = Qe();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = jf.bind(null, K, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Qe();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: Ms,
    useDebugValue: Oo,
    useDeferredValue: function (e) {
      return (Qe().memoizedState = e);
    },
    useTransition: function () {
      var e = Ms(!1),
        t = e[0];
      return ((e = Sf.bind(null, e[1])), (Qe().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = K,
        l = Qe();
      if (Q) {
        if (n === void 0) throw Error(w(407));
        n = n();
      } else {
        if (((n = t()), ie === null)) throw Error(w(349));
        Vt & 30 || Pa(r, t, n);
      }
      l.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (l.queue = i),
        Os(Ia.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        ur(9, _a.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Qe(),
        t = ie.identifierPrefix;
      if (Q) {
        var n = et,
          r = qe;
        ((n = (r & ~(1 << (32 - Ue(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = or++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = xf++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Ef = {
    readContext: Re,
    useCallback: Oa,
    useContext: Re,
    useEffect: Mo,
    useImperativeHandle: Ma,
    useInsertionEffect: Ra,
    useLayoutEffect: Da,
    useMemo: Wa,
    useReducer: li,
    useRef: Aa,
    useState: function () {
      return li(sr);
    },
    useDebugValue: Oo,
    useDeferredValue: function (e) {
      var t = De();
      return Ua(t, te.memoizedState, e);
    },
    useTransition: function () {
      var e = li(sr)[0],
        t = De().memoizedState;
      return [e, t];
    },
    useMutableSource: Fa,
    useSyncExternalStore: Ta,
    useId: Ha,
    unstable_isNewReconciler: !1,
  },
  Cf = {
    readContext: Re,
    useCallback: Oa,
    useContext: Re,
    useEffect: Mo,
    useImperativeHandle: Ma,
    useInsertionEffect: Ra,
    useLayoutEffect: Da,
    useMemo: Wa,
    useReducer: ii,
    useRef: Aa,
    useState: function () {
      return ii(sr);
    },
    useDebugValue: Oo,
    useDeferredValue: function (e) {
      var t = De();
      return te === null ? (t.memoizedState = e) : Ua(t, te.memoizedState, e);
    },
    useTransition: function () {
      var e = ii(sr)[0],
        t = De().memoizedState;
      return [e, t];
    },
    useMutableSource: Fa,
    useSyncExternalStore: Ta,
    useId: Ha,
    unstable_isNewReconciler: !1,
  };
function Me(e, t) {
  if (e && e.defaultProps) {
    ((t = Y({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Ui(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Y({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var El = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Kt(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = me(),
      l = St(e),
      i = tt(r, l);
    ((i.payload = t),
      n != null && (i.callback = n),
      (t = vt(e, i, l)),
      t !== null && (He(t, e, l, r), Or(t, e, l)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = me(),
      l = St(e),
      i = tt(r, l);
    ((i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = vt(e, i, l)),
      t !== null && (He(t, e, l, r), Or(t, e, l)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = me(),
      r = St(e),
      l = tt(n, r);
    ((l.tag = 2),
      t != null && (l.callback = t),
      (t = vt(e, l, r)),
      t !== null && (He(t, e, r, n), Or(t, e, r)));
  },
};
function Ws(e, t, n, r, l, i, s) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, s)
      : t.prototype && t.prototype.isPureReactComponent
        ? !er(n, r) || !er(l, i)
        : !0
  );
}
function ba(e, t, n) {
  var r = !1,
    l = Et,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = Re(i))
      : ((l = we(t) ? Ut : pe.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? yn(e, l) : Et)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = El),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function Us(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && El.enqueueReplaceState(t, t.state, null));
}
function Hi(e, t, n, r) {
  var l = e.stateNode;
  ((l.props = n), (l.state = e.memoizedState), (l.refs = {}), Io(e));
  var i = t.contextType;
  (typeof i == "object" && i !== null
    ? (l.context = Re(i))
    : ((i = we(t) ? Ut : pe.current), (l.context = yn(e, i))),
    (l.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (Ui(e, t, i, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && El.enqueueReplaceState(l, l.state, null),
      sl(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308));
}
function jn(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += Jd(r)), (r = r.return));
    while (r);
    var l = n;
  } catch (i) {
    l =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function oi(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Vi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var zf = typeof WeakMap == "function" ? WeakMap : Map;
function Ka(e, t, n) {
  ((n = tt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (fl || ((fl = !0), (qi = r)), Vi(e, t));
    }),
    n
  );
}
function Ya(e, t, n) {
  ((n = tt(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    ((n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        Vi(e, t);
      }));
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        (Vi(e, t),
          typeof r != "function" &&
            (xt === null ? (xt = new Set([this])) : xt.add(this)));
        var s = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: s !== null ? s : "",
        });
      }),
    n
  );
}
function Hs(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new zf();
    var l = new Set();
    r.set(t, l);
  } else ((l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l)));
  l.has(n) || (l.add(n), (e = Wf.bind(null, e, t, n)), t.then(e, e));
}
function Vs(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function $s(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = tt(-1, 1)), (t.tag = 2), vt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Ff = ot.ReactCurrentOwner,
  Se = !1;
function he(e, t, n, r) {
  t.child = e === null ? ka(t, null, n, r) : xn(t, e.child, n, r);
}
function Qs(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return (
    pn(t, l),
    (r = Do(e, t, n, r, i, l)),
    (n = Lo()),
    e !== null && !Se
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        it(e, t, l))
      : (Q && n && Eo(t), (t.flags |= 1), he(e, t, r, l), t.child)
  );
}
function bs(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !Ko(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), Xa(e, t, i, r, l))
      : ((e = Qr(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & l))) {
    var s = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : er), n(s, r) && e.ref === t.ref)
    )
      return it(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = jt(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Xa(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (er(i, r) && e.ref === t.ref)
      if (((Se = !1), (t.pendingProps = r = i), (e.lanes & l) !== 0))
        e.flags & 131072 && (Se = !0);
      else return ((t.lanes = e.lanes), it(e, t, l));
  }
  return $i(e, t, n, r, l);
}
function Ga(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        U(un, Ee),
        (Ee |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          U(un, Ee),
          (Ee |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        U(un, Ee),
        (Ee |= r));
    }
  else
    (i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      U(un, Ee),
      (Ee |= r));
  return (he(e, t, l, n), t.child);
}
function Za(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function $i(e, t, n, r, l) {
  var i = we(n) ? Ut : pe.current;
  return (
    (i = yn(t, i)),
    pn(t, l),
    (n = Do(e, t, n, r, i, l)),
    (r = Lo()),
    e !== null && !Se
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        it(e, t, l))
      : (Q && r && Eo(t), (t.flags |= 1), he(e, t, n, l), t.child)
  );
}
function Ks(e, t, n, r, l) {
  if (we(n)) {
    var i = !0;
    nl(t);
  } else i = !1;
  if ((pn(t, l), t.stateNode === null))
    (Hr(e, t), ba(t, n, r), Hi(t, n, r, l), (r = !0));
  else if (e === null) {
    var s = t.stateNode,
      u = t.memoizedProps;
    s.props = u;
    var a = s.context,
      d = n.contextType;
    typeof d == "object" && d !== null
      ? (d = Re(d))
      : ((d = we(n) ? Ut : pe.current), (d = yn(t, d)));
    var f = n.getDerivedStateFromProps,
      g =
        typeof f == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function";
    (g ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((u !== r || a !== d) && Us(t, s, r, d)),
      (at = !1));
    var v = t.memoizedState;
    ((s.state = v),
      sl(t, r, s, l),
      (a = t.memoizedState),
      u !== r || v !== a || je.current || at
        ? (typeof f == "function" && (Ui(t, n, f, r), (a = t.memoizedState)),
          (u = at || Ws(t, n, u, r, v, a, d))
            ? (g ||
                (typeof s.UNSAFE_componentWillMount != "function" &&
                  typeof s.componentWillMount != "function") ||
                (typeof s.componentWillMount == "function" &&
                  s.componentWillMount(),
                typeof s.UNSAFE_componentWillMount == "function" &&
                  s.UNSAFE_componentWillMount()),
              typeof s.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (s.props = r),
          (s.state = a),
          (s.context = d),
          (r = u))
        : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((s = t.stateNode),
      Ca(e, t),
      (u = t.memoizedProps),
      (d = t.type === t.elementType ? u : Me(t.type, u)),
      (s.props = d),
      (g = t.pendingProps),
      (v = s.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = Re(a))
        : ((a = we(n) ? Ut : pe.current), (a = yn(t, a))));
    var h = n.getDerivedStateFromProps;
    ((f =
      typeof h == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function") ||
      (typeof s.UNSAFE_componentWillReceiveProps != "function" &&
        typeof s.componentWillReceiveProps != "function") ||
      ((u !== g || v !== a) && Us(t, s, r, a)),
      (at = !1),
      (v = t.memoizedState),
      (s.state = v),
      sl(t, r, s, l));
    var y = t.memoizedState;
    u !== g || v !== y || je.current || at
      ? (typeof h == "function" && (Ui(t, n, h, r), (y = t.memoizedState)),
        (d = at || Ws(t, n, d, r, v, y, a) || !1)
          ? (f ||
              (typeof s.UNSAFE_componentWillUpdate != "function" &&
                typeof s.componentWillUpdate != "function") ||
              (typeof s.componentWillUpdate == "function" &&
                s.componentWillUpdate(r, y, a),
              typeof s.UNSAFE_componentWillUpdate == "function" &&
                s.UNSAFE_componentWillUpdate(r, y, a)),
            typeof s.componentDidUpdate == "function" && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof s.componentDidUpdate != "function" ||
              (u === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != "function" ||
              (u === e.memoizedProps && v === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = y)),
        (s.props = r),
        (s.state = y),
        (s.context = a),
        (r = d))
      : (typeof s.componentDidUpdate != "function" ||
          (u === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 4),
        typeof s.getSnapshotBeforeUpdate != "function" ||
          (u === e.memoizedProps && v === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Qi(e, t, n, r, i, l);
}
function Qi(e, t, n, r, l, i) {
  Za(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return (l && Bs(t, n, !1), it(e, t, i));
  ((r = t.stateNode), (Ff.current = t));
  var u =
    s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && s
      ? ((t.child = xn(t, e.child, null, i)), (t.child = xn(t, null, u, i)))
      : he(e, t, u, i),
    (t.memoizedState = r.state),
    l && Bs(t, n, !0),
    t.child
  );
}
function Ja(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? Is(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Is(e, t.context, !1),
    Bo(e, t.containerInfo));
}
function Ys(e, t, n, r, l) {
  return (vn(), zo(l), (t.flags |= 256), he(e, t, n, r), t.child);
}
var bi = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ki(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function qa(e, t, n) {
  var r = t.pendingProps,
    l = b.current,
    i = !1,
    s = (t.flags & 128) !== 0,
    u;
  if (
    ((u = s) ||
      (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    u
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    U(b, l & 1),
    e === null)
  )
    return (
      Oi(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((s = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (s = { mode: "hidden", children: s }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = s))
                : (i = Fl(s, r, 0, null)),
              (e = Mt(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = Ki(n)),
              (t.memoizedState = bi),
              e)
            : Wo(t, s))
    );
  if (((l = e.memoizedState), l !== null && ((u = l.dehydrated), u !== null)))
    return Tf(e, t, s, r, u, l, n);
  if (i) {
    ((i = r.fallback), (s = t.mode), (l = e.child), (u = l.sibling));
    var a = { mode: "hidden", children: r.children };
    return (
      !(s & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = jt(l, a)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      u !== null ? (i = jt(u, i)) : ((i = Mt(i, s, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (s = e.child.memoizedState),
      (s =
        s === null
          ? Ki(n)
          : {
              baseLanes: s.baseLanes | n,
              cachePool: null,
              transitions: s.transitions,
            }),
      (i.memoizedState = s),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = bi),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = jt(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Wo(e, t) {
  return (
    (t = Fl({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function _r(e, t, n, r) {
  return (
    r !== null && zo(r),
    xn(t, e.child, null, n),
    (e = Wo(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Tf(e, t, n, r, l, i, s) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = oi(Error(w(422)))), _r(e, t, s, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((i = r.fallback),
          (l = t.mode),
          (r = Fl({ mode: "visible", children: r.children }, l, 0, null)),
          (i = Mt(i, l, s, null)),
          (i.flags |= 2),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          t.mode & 1 && xn(t, e.child, null, s),
          (t.child.memoizedState = Ki(s)),
          (t.memoizedState = bi),
          i);
  if (!(t.mode & 1)) return _r(e, t, s, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var u = r.dgst;
    return (
      (r = u),
      (i = Error(w(419))),
      (r = oi(i, r, void 0)),
      _r(e, t, s, r)
    );
  }
  if (((u = (s & e.childLanes) !== 0), Se || u)) {
    if (((r = ie), r !== null)) {
      switch (s & -s) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      ((l = l & (r.suspendedLanes | s) ? 0 : l),
        l !== 0 &&
          l !== i.retryLane &&
          ((i.retryLane = l), lt(e, l), He(r, e, l, -1)));
    }
    return (bo(), (r = oi(Error(w(421)))), _r(e, t, s, r));
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Uf.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (ze = yt(l.nextSibling)),
      (Fe = t),
      (Q = !0),
      (We = null),
      e !== null &&
        ((Ie[Be++] = qe),
        (Ie[Be++] = et),
        (Ie[Be++] = Ht),
        (qe = e.id),
        (et = e.overflow),
        (Ht = t)),
      (t = Wo(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Xs(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), Wi(e.return, t, n));
}
function si(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = l));
}
function ed(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    i = r.tail;
  if ((he(e, t, r.children, n), (r = b.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Xs(e, n, t);
        else if (e.tag === 19) Xs(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((U(b, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          ((e = n.alternate),
            e !== null && ul(e) === null && (l = n),
            (n = n.sibling));
        ((n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          si(t, !1, l, n, i));
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && ul(e) === null)) {
            t.child = l;
            break;
          }
          ((e = l.sibling), (l.sibling = n), (n = l), (l = e));
        }
        si(t, !0, n, null, i);
        break;
      case "together":
        si(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Hr(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function it(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    ($t |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(w(153));
  if (t.child !== null) {
    for (
      e = t.child, n = jt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (n = n.sibling = jt(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function Pf(e, t, n) {
  switch (t.tag) {
    case 3:
      (Ja(t), vn());
      break;
    case 5:
      za(t);
      break;
    case 1:
      we(t.type) && nl(t);
      break;
    case 4:
      Bo(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      (U(il, r._currentValue), (r._currentValue = l));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (U(b, b.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? qa(e, t, n)
            : (U(b, b.current & 1),
              (e = it(e, t, n)),
              e !== null ? e.sibling : null);
      U(b, b.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return ed(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        U(b, b.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), Ga(e, t, n));
  }
  return it(e, t, n);
}
var td, Yi, nd, rd;
td = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
Yi = function () {};
nd = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    ((e = t.stateNode), Rt(Ye.current));
    var i = null;
    switch (n) {
      case "input":
        ((l = gi(e, l)), (r = gi(e, r)), (i = []));
        break;
      case "select":
        ((l = Y({}, l, { value: void 0 })),
          (r = Y({}, r, { value: void 0 })),
          (i = []));
        break;
      case "textarea":
        ((l = xi(e, l)), (r = xi(e, r)), (i = []));
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = el);
    }
    ji(n, r);
    var s;
    n = null;
    for (d in l)
      if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null)
        if (d === "style") {
          var u = l[d];
          for (s in u) u.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
        } else
          d !== "dangerouslySetInnerHTML" &&
            d !== "children" &&
            d !== "suppressContentEditableWarning" &&
            d !== "suppressHydrationWarning" &&
            d !== "autoFocus" &&
            (Kn.hasOwnProperty(d)
              ? i || (i = [])
              : (i = i || []).push(d, null));
    for (d in r) {
      var a = r[d];
      if (
        ((u = l != null ? l[d] : void 0),
        r.hasOwnProperty(d) && a !== u && (a != null || u != null))
      )
        if (d === "style")
          if (u) {
            for (s in u)
              !u.hasOwnProperty(s) ||
                (a && a.hasOwnProperty(s)) ||
                (n || (n = {}), (n[s] = ""));
            for (s in a)
              a.hasOwnProperty(s) &&
                u[s] !== a[s] &&
                (n || (n = {}), (n[s] = a[s]));
          } else (n || (i || (i = []), i.push(d, n)), (n = a));
        else
          d === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (u = u ? u.__html : void 0),
              a != null && u !== a && (i = i || []).push(d, a))
            : d === "children"
              ? (typeof a != "string" && typeof a != "number") ||
                (i = i || []).push(d, "" + a)
              : d !== "suppressContentEditableWarning" &&
                d !== "suppressHydrationWarning" &&
                (Kn.hasOwnProperty(d)
                  ? (a != null && d === "onScroll" && V("scroll", e),
                    i || u === a || (i = []))
                  : (i = i || []).push(d, a));
    }
    n && (i = i || []).push("style", n);
    var d = i;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
rd = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Bn(e, t) {
  if (!Q)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function ce(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling));
  else
    for (l = e.child; l !== null; )
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function _f(e, t, n) {
  var r = t.pendingProps;
  switch ((Co(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (ce(t), null);
    case 1:
      return (we(t.type) && tl(), ce(t), null);
    case 3:
      return (
        (r = t.stateNode),
        Sn(),
        $(je),
        $(pe),
        Ao(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Tr(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), We !== null && (no(We), (We = null)))),
        Yi(e, t),
        ce(t),
        null
      );
    case 5:
      No(t);
      var l = Rt(ir.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (nd(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(w(166));
          return (ce(t), null);
        }
        if (((e = Rt(Ye.current)), Tr(t))) {
          ((r = t.stateNode), (n = t.type));
          var i = t.memoizedProps;
          switch (((r[be] = t), (r[rr] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              (V("cancel", r), V("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              V("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Ln.length; l++) V(Ln[l], r);
              break;
            case "source":
              V("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (V("error", r), V("load", r));
              break;
            case "details":
              V("toggle", r);
              break;
            case "input":
              (ls(r, i), V("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!i.multiple }),
                V("invalid", r));
              break;
            case "textarea":
              (os(r, i), V("invalid", r));
          }
          (ji(n, i), (l = null));
          for (var s in i)
            if (i.hasOwnProperty(s)) {
              var u = i[s];
              s === "children"
                ? typeof u == "string"
                  ? r.textContent !== u &&
                    (i.suppressHydrationWarning !== !0 &&
                      Fr(r.textContent, u, e),
                    (l = ["children", u]))
                  : typeof u == "number" &&
                    r.textContent !== "" + u &&
                    (i.suppressHydrationWarning !== !0 &&
                      Fr(r.textContent, u, e),
                    (l = ["children", "" + u]))
                : Kn.hasOwnProperty(s) &&
                  u != null &&
                  s === "onScroll" &&
                  V("scroll", r);
            }
          switch (n) {
            case "input":
              (xr(r), is(r, i, !0));
              break;
            case "textarea":
              (xr(r), ss(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = el);
          }
          ((r = l), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((s = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Iu(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = s.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = s.createElement(n, { is: r.is }))
                  : ((e = s.createElement(n)),
                    n === "select" &&
                      ((s = e),
                      r.multiple
                        ? (s.multiple = !0)
                        : r.size && (s.size = r.size)))
              : (e = s.createElementNS(e, n)),
            (e[be] = t),
            (e[rr] = r),
            td(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((s = wi(n, r)), n)) {
              case "dialog":
                (V("cancel", e), V("close", e), (l = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (V("load", e), (l = r));
                break;
              case "video":
              case "audio":
                for (l = 0; l < Ln.length; l++) V(Ln[l], e);
                l = r;
                break;
              case "source":
                (V("error", e), (l = r));
                break;
              case "img":
              case "image":
              case "link":
                (V("error", e), V("load", e), (l = r));
                break;
              case "details":
                (V("toggle", e), (l = r));
                break;
              case "input":
                (ls(e, r), (l = gi(e, r)), V("invalid", e));
                break;
              case "option":
                l = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = Y({}, r, { value: void 0 })),
                  V("invalid", e));
                break;
              case "textarea":
                (os(e, r), (l = xi(e, r)), V("invalid", e));
                break;
              default:
                l = r;
            }
            (ji(n, l), (u = l));
            for (i in u)
              if (u.hasOwnProperty(i)) {
                var a = u[i];
                i === "style"
                  ? Au(e, a)
                  : i === "dangerouslySetInnerHTML"
                    ? ((a = a ? a.__html : void 0), a != null && Bu(e, a))
                    : i === "children"
                      ? typeof a == "string"
                        ? (n !== "textarea" || a !== "") && Yn(e, a)
                        : typeof a == "number" && Yn(e, "" + a)
                      : i !== "suppressContentEditableWarning" &&
                        i !== "suppressHydrationWarning" &&
                        i !== "autoFocus" &&
                        (Kn.hasOwnProperty(i)
                          ? a != null && i === "onScroll" && V("scroll", e)
                          : a != null && ao(e, i, a, s));
              }
            switch (n) {
              case "input":
                (xr(e), is(e, r, !1));
                break;
              case "textarea":
                (xr(e), ss(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + kt(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? an(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      an(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = el);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (ce(t), null);
    case 6:
      if (e && t.stateNode != null) rd(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(w(166));
        if (((n = Rt(ir.current)), Rt(Ye.current), Tr(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[be] = t),
            (i = r.nodeValue !== n) && ((e = Fe), e !== null))
          )
            switch (e.tag) {
              case 3:
                Fr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Fr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[be] = t),
            (t.stateNode = r));
      }
      return (ce(t), null);
    case 13:
      if (
        ($(b),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (Q && ze !== null && t.mode & 1 && !(t.flags & 128))
          (ja(), vn(), (t.flags |= 98560), (i = !1));
        else if (((i = Tr(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(w(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(w(317));
            i[be] = t;
          } else
            (vn(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (ce(t), (i = !1));
        } else (We !== null && (no(We), (We = null)), (i = !0));
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || b.current & 1 ? ne === 0 && (ne = 3) : bo())),
          t.updateQueue !== null && (t.flags |= 4),
          ce(t),
          null);
    case 4:
      return (
        Sn(),
        Yi(e, t),
        e === null && tr(t.stateNode.containerInfo),
        ce(t),
        null
      );
    case 10:
      return (Po(t.type._context), ce(t), null);
    case 17:
      return (we(t.type) && tl(), ce(t), null);
    case 19:
      if (($(b), (i = t.memoizedState), i === null)) return (ce(t), null);
      if (((r = (t.flags & 128) !== 0), (s = i.rendering), s === null))
        if (r) Bn(i, !1);
        else {
          if (ne !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((s = ul(e)), s !== null)) {
                for (
                  t.flags |= 128,
                    Bn(i, !1),
                    r = s.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;
                )
                  ((i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (s = i.alternate),
                    s === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = s.childLanes),
                        (i.lanes = s.lanes),
                        (i.child = s.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = s.memoizedProps),
                        (i.memoizedState = s.memoizedState),
                        (i.updateQueue = s.updateQueue),
                        (i.type = s.type),
                        (e = s.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (U(b, (b.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          i.tail !== null &&
            J() > wn &&
            ((t.flags |= 128), (r = !0), Bn(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = ul(s)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Bn(i, !0),
              i.tail === null && i.tailMode === "hidden" && !s.alternate && !Q)
            )
              return (ce(t), null);
          } else
            2 * J() - i.renderingStartTime > wn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Bn(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((s.sibling = t.child), (t.child = s))
          : ((n = i.last),
            n !== null ? (n.sibling = s) : (t.child = s),
            (i.last = s));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = J()),
          (t.sibling = null),
          (n = b.current),
          U(b, r ? (n & 1) | 2 : n & 1),
          t)
        : (ce(t), null);
    case 22:
    case 23:
      return (
        Qo(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ee & 1073741824 && (ce(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ce(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(w(156, t.tag));
}
function If(e, t) {
  switch ((Co(t), t.tag)) {
    case 1:
      return (
        we(t.type) && tl(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Sn(),
        $(je),
        $(pe),
        Ao(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (No(t), null);
    case 13:
      if (($(b), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(w(340));
        vn();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return ($(b), null);
    case 4:
      return (Sn(), null);
    case 10:
      return (Po(t.type._context), null);
    case 22:
    case 23:
      return (Qo(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Ir = !1,
  fe = !1,
  Bf = typeof WeakSet == "function" ? WeakSet : Set,
  z = null;
function sn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        X(e, t, r);
      }
    else n.current = null;
}
function Xi(e, t, n) {
  try {
    n();
  } catch (r) {
    X(e, t, r);
  }
}
var Gs = !1;
function Nf(e, t) {
  if (((Bi = Zr), (e = ua()), ko(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, i.nodeType);
          } catch {
            n = null;
            break e;
          }
          var s = 0,
            u = -1,
            a = -1,
            d = 0,
            f = 0,
            g = e,
            v = null;
          t: for (;;) {
            for (
              var h;
              g !== n || (l !== 0 && g.nodeType !== 3) || (u = s + l),
                g !== i || (r !== 0 && g.nodeType !== 3) || (a = s + r),
                g.nodeType === 3 && (s += g.nodeValue.length),
                (h = g.firstChild) !== null;
            )
              ((v = g), (g = h));
            for (;;) {
              if (g === e) break t;
              if (
                (v === n && ++d === l && (u = s),
                v === i && ++f === r && (a = s),
                (h = g.nextSibling) !== null)
              )
                break;
              ((g = v), (v = g.parentNode));
            }
            g = h;
          }
          n = u === -1 || a === -1 ? null : { start: u, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ni = { focusedElem: e, selectionRange: n }, Zr = !1, z = t; z !== null; )
    if (((t = z), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (z = e));
    else
      for (; z !== null; ) {
        t = z;
        try {
          var y = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (y !== null) {
                  var S = y.memoizedProps,
                    _ = y.memoizedState,
                    p = t.stateNode,
                    c = p.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? S : Me(t.type, S),
                      _,
                    );
                  p.__reactInternalSnapshotBeforeUpdate = c;
                }
                break;
              case 3:
                var m = t.stateNode.containerInfo;
                m.nodeType === 1
                  ? (m.textContent = "")
                  : m.nodeType === 9 &&
                    m.documentElement &&
                    m.removeChild(m.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(w(163));
            }
        } catch (j) {
          X(t, t.return, j);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (z = e));
          break;
        }
        z = t.return;
      }
  return ((y = Gs), (Gs = !1), y);
}
function $n(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        ((l.destroy = void 0), i !== void 0 && Xi(t, n, i));
      }
      l = l.next;
    } while (l !== r);
  }
}
function Cl(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Gi(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function ld(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), ld(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[be], delete t[rr], delete t[Di], delete t[mf], delete t[gf])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function id(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Zs(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || id(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Zi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = el)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Zi(e, t, n), e = e.sibling; e !== null; )
      (Zi(e, t, n), (e = e.sibling));
}
function Ji(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Ji(e, t, n), e = e.sibling; e !== null; )
      (Ji(e, t, n), (e = e.sibling));
}
var se = null,
  Oe = !1;
function st(e, t, n) {
  for (n = n.child; n !== null; ) (od(e, t, n), (n = n.sibling));
}
function od(e, t, n) {
  if (Ke && typeof Ke.onCommitFiberUnmount == "function")
    try {
      Ke.onCommitFiberUnmount(yl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      fe || sn(n, t);
    case 6:
      var r = se,
        l = Oe;
      ((se = null),
        st(e, t, n),
        (se = r),
        (Oe = l),
        se !== null &&
          (Oe
            ? ((e = se),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : se.removeChild(n.stateNode)));
      break;
    case 18:
      se !== null &&
        (Oe
          ? ((e = se),
            (n = n.stateNode),
            e.nodeType === 8
              ? ei(e.parentNode, n)
              : e.nodeType === 1 && ei(e, n),
            Jn(e))
          : ei(se, n.stateNode));
      break;
    case 4:
      ((r = se),
        (l = Oe),
        (se = n.stateNode.containerInfo),
        (Oe = !0),
        st(e, t, n),
        (se = r),
        (Oe = l));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !fe &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var i = l,
            s = i.destroy;
          ((i = i.tag),
            s !== void 0 && (i & 2 || i & 4) && Xi(n, t, s),
            (l = l.next));
        } while (l !== r);
      }
      st(e, t, n);
      break;
    case 1:
      if (
        !fe &&
        (sn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (u) {
          X(n, t, u);
        }
      st(e, t, n);
      break;
    case 21:
      st(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((fe = (r = fe) || n.memoizedState !== null), st(e, t, n), (fe = r))
        : st(e, t, n);
      break;
    default:
      st(e, t, n);
  }
}
function Js(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new Bf()),
      t.forEach(function (r) {
        var l = Hf.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      }));
  }
}
function Le(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var i = e,
          s = t,
          u = s;
        e: for (; u !== null; ) {
          switch (u.tag) {
            case 5:
              ((se = u.stateNode), (Oe = !1));
              break e;
            case 3:
              ((se = u.stateNode.containerInfo), (Oe = !0));
              break e;
            case 4:
              ((se = u.stateNode.containerInfo), (Oe = !0));
              break e;
          }
          u = u.return;
        }
        if (se === null) throw Error(w(160));
        (od(i, s, l), (se = null), (Oe = !1));
        var a = l.alternate;
        (a !== null && (a.return = null), (l.return = null));
      } catch (d) {
        X(l, t, d);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) (sd(t, e), (t = t.sibling));
}
function sd(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Le(t, e), $e(e), r & 4)) {
        try {
          ($n(3, e, e.return), Cl(3, e));
        } catch (S) {
          X(e, e.return, S);
        }
        try {
          $n(5, e, e.return);
        } catch (S) {
          X(e, e.return, S);
        }
      }
      break;
    case 1:
      (Le(t, e), $e(e), r & 512 && n !== null && sn(n, n.return));
      break;
    case 5:
      if (
        (Le(t, e),
        $e(e),
        r & 512 && n !== null && sn(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          Yn(l, "");
        } catch (S) {
          X(e, e.return, S);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var i = e.memoizedProps,
          s = n !== null ? n.memoizedProps : i,
          u = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            (u === "input" && i.type === "radio" && i.name != null && Pu(l, i),
              wi(u, s));
            var d = wi(u, i);
            for (s = 0; s < a.length; s += 2) {
              var f = a[s],
                g = a[s + 1];
              f === "style"
                ? Au(l, g)
                : f === "dangerouslySetInnerHTML"
                  ? Bu(l, g)
                  : f === "children"
                    ? Yn(l, g)
                    : ao(l, f, g, d);
            }
            switch (u) {
              case "input":
                yi(l, i);
                break;
              case "textarea":
                _u(l, i);
                break;
              case "select":
                var v = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var h = i.value;
                h != null
                  ? an(l, !!i.multiple, h, !1)
                  : v !== !!i.multiple &&
                    (i.defaultValue != null
                      ? an(l, !!i.multiple, i.defaultValue, !0)
                      : an(l, !!i.multiple, i.multiple ? [] : "", !1));
            }
            l[rr] = i;
          } catch (S) {
            X(e, e.return, S);
          }
      }
      break;
    case 6:
      if ((Le(t, e), $e(e), r & 4)) {
        if (e.stateNode === null) throw Error(w(162));
        ((l = e.stateNode), (i = e.memoizedProps));
        try {
          l.nodeValue = i;
        } catch (S) {
          X(e, e.return, S);
        }
      }
      break;
    case 3:
      if (
        (Le(t, e), $e(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Jn(t.containerInfo);
        } catch (S) {
          X(e, e.return, S);
        }
      break;
    case 4:
      (Le(t, e), $e(e));
      break;
    case 13:
      (Le(t, e),
        $e(e),
        (l = e.child),
        l.flags & 8192 &&
          ((i = l.memoizedState !== null),
          (l.stateNode.isHidden = i),
          !i ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Vo = J())),
        r & 4 && Js(e));
      break;
    case 22:
      if (
        ((f = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((fe = (d = fe) || f), Le(t, e), (fe = d)) : Le(t, e),
        $e(e),
        r & 8192)
      ) {
        if (
          ((d = e.memoizedState !== null),
          (e.stateNode.isHidden = d) && !f && e.mode & 1)
        )
          for (z = e, f = e.child; f !== null; ) {
            for (g = z = f; z !== null; ) {
              switch (((v = z), (h = v.child), v.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  $n(4, v, v.return);
                  break;
                case 1:
                  sn(v, v.return);
                  var y = v.stateNode;
                  if (typeof y.componentWillUnmount == "function") {
                    ((r = v), (n = v.return));
                    try {
                      ((t = r),
                        (y.props = t.memoizedProps),
                        (y.state = t.memoizedState),
                        y.componentWillUnmount());
                    } catch (S) {
                      X(r, n, S);
                    }
                  }
                  break;
                case 5:
                  sn(v, v.return);
                  break;
                case 22:
                  if (v.memoizedState !== null) {
                    eu(g);
                    continue;
                  }
              }
              h !== null ? ((h.return = v), (z = h)) : eu(g);
            }
            f = f.sibling;
          }
        e: for (f = null, g = e; ; ) {
          if (g.tag === 5) {
            if (f === null) {
              f = g;
              try {
                ((l = g.stateNode),
                  d
                    ? ((i = l.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((u = g.stateNode),
                      (a = g.memoizedProps.style),
                      (s =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (u.style.display = Nu("display", s))));
              } catch (S) {
                X(e, e.return, S);
              }
            }
          } else if (g.tag === 6) {
            if (f === null)
              try {
                g.stateNode.nodeValue = d ? "" : g.memoizedProps;
              } catch (S) {
                X(e, e.return, S);
              }
          } else if (
            ((g.tag !== 22 && g.tag !== 23) ||
              g.memoizedState === null ||
              g === e) &&
            g.child !== null
          ) {
            ((g.child.return = g), (g = g.child));
            continue;
          }
          if (g === e) break e;
          for (; g.sibling === null; ) {
            if (g.return === null || g.return === e) break e;
            (f === g && (f = null), (g = g.return));
          }
          (f === g && (f = null),
            (g.sibling.return = g.return),
            (g = g.sibling));
        }
      }
      break;
    case 19:
      (Le(t, e), $e(e), r & 4 && Js(e));
      break;
    case 21:
      break;
    default:
      (Le(t, e), $e(e));
  }
}
function $e(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (id(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(w(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Yn(l, ""), (r.flags &= -33));
          var i = Zs(e);
          Ji(e, i, l);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo,
            u = Zs(e);
          Zi(e, u, s);
          break;
        default:
          throw Error(w(161));
      }
    } catch (a) {
      X(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Af(e, t, n) {
  ((z = e), ud(e));
}
function ud(e, t, n) {
  for (var r = (e.mode & 1) !== 0; z !== null; ) {
    var l = z,
      i = l.child;
    if (l.tag === 22 && r) {
      var s = l.memoizedState !== null || Ir;
      if (!s) {
        var u = l.alternate,
          a = (u !== null && u.memoizedState !== null) || fe;
        u = Ir;
        var d = fe;
        if (((Ir = s), (fe = a) && !d))
          for (z = l; z !== null; )
            ((s = z),
              (a = s.child),
              s.tag === 22 && s.memoizedState !== null
                ? tu(l)
                : a !== null
                  ? ((a.return = s), (z = a))
                  : tu(l));
        for (; i !== null; ) ((z = i), ud(i), (i = i.sibling));
        ((z = l), (Ir = u), (fe = d));
      }
      qs(e);
    } else
      l.subtreeFlags & 8772 && i !== null ? ((i.return = l), (z = i)) : qs(e);
  }
}
function qs(e) {
  for (; z !== null; ) {
    var t = z;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              fe || Cl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !fe)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Me(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var i = t.updateQueue;
              i !== null && Ls(t, i, r);
              break;
            case 3:
              var s = t.updateQueue;
              if (s !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Ls(t, s, n);
              }
              break;
            case 5:
              var u = t.stateNode;
              if (n === null && t.flags & 4) {
                n = u;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var d = t.alternate;
                if (d !== null) {
                  var f = d.memoizedState;
                  if (f !== null) {
                    var g = f.dehydrated;
                    g !== null && Jn(g);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(w(163));
          }
        fe || (t.flags & 512 && Gi(t));
      } catch (v) {
        X(t, t.return, v);
      }
    }
    if (t === e) {
      z = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (z = n));
      break;
    }
    z = t.return;
  }
}
function eu(e) {
  for (; z !== null; ) {
    var t = z;
    if (t === e) {
      z = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (z = n));
      break;
    }
    z = t.return;
  }
}
function tu(e) {
  for (; z !== null; ) {
    var t = z;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Cl(4, t);
          } catch (a) {
            X(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              X(t, l, a);
            }
          }
          var i = t.return;
          try {
            Gi(t);
          } catch (a) {
            X(t, i, a);
          }
          break;
        case 5:
          var s = t.return;
          try {
            Gi(t);
          } catch (a) {
            X(t, s, a);
          }
      }
    } catch (a) {
      X(t, t.return, a);
    }
    if (t === e) {
      z = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      ((u.return = t.return), (z = u));
      break;
    }
    z = t.return;
  }
}
var Rf = Math.ceil,
  cl = ot.ReactCurrentDispatcher,
  Uo = ot.ReactCurrentOwner,
  Ae = ot.ReactCurrentBatchConfig,
  D = 0,
  ie = null,
  ee = null,
  ue = 0,
  Ee = 0,
  un = zt(0),
  ne = 0,
  ar = null,
  $t = 0,
  zl = 0,
  Ho = 0,
  Qn = null,
  ve = null,
  Vo = 0,
  wn = 1 / 0,
  Ge = null,
  fl = !1,
  qi = null,
  xt = null,
  Br = !1,
  pt = null,
  pl = 0,
  bn = 0,
  eo = null,
  Vr = -1,
  $r = 0;
function me() {
  return D & 6 ? J() : Vr !== -1 ? Vr : (Vr = J());
}
function St(e) {
  return e.mode & 1
    ? D & 2 && ue !== 0
      ? ue & -ue
      : vf.transition !== null
        ? ($r === 0 && ($r = bu()), $r)
        : ((e = W),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : qu(e.type))),
          e)
    : 1;
}
function He(e, t, n, r) {
  if (50 < bn) throw ((bn = 0), (eo = null), Error(w(185)));
  (cr(e, n, r),
    (!(D & 2) || e !== ie) &&
      (e === ie && (!(D & 2) && (zl |= n), ne === 4 && ct(e, ue)),
      ke(e, r),
      n === 1 && D === 0 && !(t.mode & 1) && ((wn = J() + 500), wl && Ft())));
}
function ke(e, t) {
  var n = e.callbackNode;
  yc(e, t);
  var r = Gr(e, e === ie ? ue : 0);
  if (r === 0)
    (n !== null && ds(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && ds(n), t === 1))
      (e.tag === 0 ? yf(nu.bind(null, e)) : va(nu.bind(null, e)),
        pf(function () {
          !(D & 6) && Ft();
        }),
        (n = null));
    else {
      switch (Ku(r)) {
        case 1:
          n = mo;
          break;
        case 4:
          n = $u;
          break;
        case 16:
          n = Xr;
          break;
        case 536870912:
          n = Qu;
          break;
        default:
          n = Xr;
      }
      n = gd(n, ad.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function ad(e, t) {
  if (((Vr = -1), ($r = 0), D & 6)) throw Error(w(327));
  var n = e.callbackNode;
  if (hn() && e.callbackNode !== n) return null;
  var r = Gr(e, e === ie ? ue : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = hl(e, r);
  else {
    t = r;
    var l = D;
    D |= 2;
    var i = cd();
    (ie !== e || ue !== t) && ((Ge = null), (wn = J() + 500), Lt(e, t));
    do
      try {
        Mf();
        break;
      } catch (u) {
        dd(e, u);
      }
    while (!0);
    (To(),
      (cl.current = i),
      (D = l),
      ee !== null ? (t = 0) : ((ie = null), (ue = 0), (t = ne)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = Fi(e)), l !== 0 && ((r = l), (t = to(e, l)))), t === 1)
    )
      throw ((n = ar), Lt(e, 0), ct(e, r), ke(e, J()), n);
    if (t === 6) ct(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Df(l) &&
          ((t = hl(e, r)),
          t === 2 && ((i = Fi(e)), i !== 0 && ((r = i), (t = to(e, i)))),
          t === 1))
      )
        throw ((n = ar), Lt(e, 0), ct(e, r), ke(e, J()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(w(345));
        case 2:
          Bt(e, ve, Ge);
          break;
        case 3:
          if (
            (ct(e, r), (r & 130023424) === r && ((t = Vo + 500 - J()), 10 < t))
          ) {
            if (Gr(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              (me(), (e.pingedLanes |= e.suspendedLanes & l));
              break;
            }
            e.timeoutHandle = Ri(Bt.bind(null, e, ve, Ge), t);
            break;
          }
          Bt(e, ve, Ge);
          break;
        case 4:
          if ((ct(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var s = 31 - Ue(r);
            ((i = 1 << s), (s = t[s]), s > l && (l = s), (r &= ~i));
          }
          if (
            ((r = l),
            (r = J() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Rf(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Ri(Bt.bind(null, e, ve, Ge), r);
            break;
          }
          Bt(e, ve, Ge);
          break;
        case 5:
          Bt(e, ve, Ge);
          break;
        default:
          throw Error(w(329));
      }
    }
  }
  return (ke(e, J()), e.callbackNode === n ? ad.bind(null, e) : null);
}
function to(e, t) {
  var n = Qn;
  return (
    e.current.memoizedState.isDehydrated && (Lt(e, t).flags |= 256),
    (e = hl(e, t)),
    e !== 2 && ((t = ve), (ve = n), t !== null && no(t)),
    e
  );
}
function no(e) {
  ve === null ? (ve = e) : ve.push.apply(ve, e);
}
function Df(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            i = l.getSnapshot;
          l = l.value;
          try {
            if (!Ve(i(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function ct(e, t) {
  for (
    t &= ~Ho,
      t &= ~zl,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;
  ) {
    var n = 31 - Ue(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function nu(e) {
  if (D & 6) throw Error(w(327));
  hn();
  var t = Gr(e, 0);
  if (!(t & 1)) return (ke(e, J()), null);
  var n = hl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Fi(e);
    r !== 0 && ((t = r), (n = to(e, r)));
  }
  if (n === 1) throw ((n = ar), Lt(e, 0), ct(e, t), ke(e, J()), n);
  if (n === 6) throw Error(w(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Bt(e, ve, Ge),
    ke(e, J()),
    null
  );
}
function $o(e, t) {
  var n = D;
  D |= 1;
  try {
    return e(t);
  } finally {
    ((D = n), D === 0 && ((wn = J() + 500), wl && Ft()));
  }
}
function Qt(e) {
  pt !== null && pt.tag === 0 && !(D & 6) && hn();
  var t = D;
  D |= 1;
  var n = Ae.transition,
    r = W;
  try {
    if (((Ae.transition = null), (W = 1), e)) return e();
  } finally {
    ((W = r), (Ae.transition = n), (D = t), !(D & 6) && Ft());
  }
}
function Qo() {
  ((Ee = un.current), $(un));
}
function Lt(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), ff(n)), ee !== null))
    for (n = ee.return; n !== null; ) {
      var r = n;
      switch ((Co(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && tl());
          break;
        case 3:
          (Sn(), $(je), $(pe), Ao());
          break;
        case 5:
          No(r);
          break;
        case 4:
          Sn();
          break;
        case 13:
          $(b);
          break;
        case 19:
          $(b);
          break;
        case 10:
          Po(r.type._context);
          break;
        case 22:
        case 23:
          Qo();
      }
      n = n.return;
    }
  if (
    ((ie = e),
    (ee = e = jt(e.current, null)),
    (ue = Ee = t),
    (ne = 0),
    (ar = null),
    (Ho = zl = $t = 0),
    (ve = Qn = null),
    At !== null)
  ) {
    for (t = 0; t < At.length; t++)
      if (((n = At[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          i = n.pending;
        if (i !== null) {
          var s = i.next;
          ((i.next = l), (r.next = s));
        }
        n.pending = r;
      }
    At = null;
  }
  return e;
}
function dd(e, t) {
  do {
    var n = ee;
    try {
      if ((To(), (Wr.current = dl), al)) {
        for (var r = K.memoizedState; r !== null; ) {
          var l = r.queue;
          (l !== null && (l.pending = null), (r = r.next));
        }
        al = !1;
      }
      if (
        ((Vt = 0),
        (le = te = K = null),
        (Vn = !1),
        (or = 0),
        (Uo.current = null),
        n === null || n.return === null)
      ) {
        ((ne = 1), (ar = t), (ee = null));
        break;
      }
      e: {
        var i = e,
          s = n.return,
          u = n,
          a = t;
        if (
          ((t = ue),
          (u.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var d = a,
            f = u,
            g = f.tag;
          if (!(f.mode & 1) && (g === 0 || g === 11 || g === 15)) {
            var v = f.alternate;
            v
              ? ((f.updateQueue = v.updateQueue),
                (f.memoizedState = v.memoizedState),
                (f.lanes = v.lanes))
              : ((f.updateQueue = null), (f.memoizedState = null));
          }
          var h = Vs(s);
          if (h !== null) {
            ((h.flags &= -257),
              $s(h, s, u, i, t),
              h.mode & 1 && Hs(i, d, t),
              (t = h),
              (a = d));
            var y = t.updateQueue;
            if (y === null) {
              var S = new Set();
              (S.add(a), (t.updateQueue = S));
            } else y.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              (Hs(i, d, t), bo());
              break e;
            }
            a = Error(w(426));
          }
        } else if (Q && u.mode & 1) {
          var _ = Vs(s);
          if (_ !== null) {
            (!(_.flags & 65536) && (_.flags |= 256),
              $s(_, s, u, i, t),
              zo(jn(a, u)));
            break e;
          }
        }
        ((i = a = jn(a, u)),
          ne !== 4 && (ne = 2),
          Qn === null ? (Qn = [i]) : Qn.push(i),
          (i = s));
        do {
          switch (i.tag) {
            case 3:
              ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
              var p = Ka(i, a, t);
              Ds(i, p);
              break e;
            case 1:
              u = a;
              var c = i.type,
                m = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof c.getDerivedStateFromError == "function" ||
                  (m !== null &&
                    typeof m.componentDidCatch == "function" &&
                    (xt === null || !xt.has(m))))
              ) {
                ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
                var j = Ya(i, u, t);
                Ds(i, j);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      pd(n);
    } catch (C) {
      ((t = C), ee === n && n !== null && (ee = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function cd() {
  var e = cl.current;
  return ((cl.current = dl), e === null ? dl : e);
}
function bo() {
  ((ne === 0 || ne === 3 || ne === 2) && (ne = 4),
    ie === null || (!($t & 268435455) && !(zl & 268435455)) || ct(ie, ue));
}
function hl(e, t) {
  var n = D;
  D |= 2;
  var r = cd();
  (ie !== e || ue !== t) && ((Ge = null), Lt(e, t));
  do
    try {
      Lf();
      break;
    } catch (l) {
      dd(e, l);
    }
  while (!0);
  if ((To(), (D = n), (cl.current = r), ee !== null)) throw Error(w(261));
  return ((ie = null), (ue = 0), ne);
}
function Lf() {
  for (; ee !== null; ) fd(ee);
}
function Mf() {
  for (; ee !== null && !uc(); ) fd(ee);
}
function fd(e) {
  var t = md(e.alternate, e, Ee);
  ((e.memoizedProps = e.pendingProps),
    t === null ? pd(e) : (ee = t),
    (Uo.current = null));
}
function pd(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = If(n, t)), n !== null)) {
        ((n.flags &= 32767), (ee = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((ne = 6), (ee = null));
        return;
      }
    } else if (((n = _f(n, t, Ee)), n !== null)) {
      ee = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      ee = t;
      return;
    }
    ee = t = e;
  } while (t !== null);
  ne === 0 && (ne = 5);
}
function Bt(e, t, n) {
  var r = W,
    l = Ae.transition;
  try {
    ((Ae.transition = null), (W = 1), Of(e, t, n, r));
  } finally {
    ((Ae.transition = l), (W = r));
  }
  return null;
}
function Of(e, t, n, r) {
  do hn();
  while (pt !== null);
  if (D & 6) throw Error(w(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(w(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var i = n.lanes | n.childLanes;
  if (
    (vc(e, i),
    e === ie && ((ee = ie = null), (ue = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Br ||
      ((Br = !0),
      gd(Xr, function () {
        return (hn(), null);
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    ((i = Ae.transition), (Ae.transition = null));
    var s = W;
    W = 1;
    var u = D;
    ((D |= 4),
      (Uo.current = null),
      Nf(e, n),
      sd(n, e),
      lf(Ni),
      (Zr = !!Bi),
      (Ni = Bi = null),
      (e.current = n),
      Af(n),
      ac(),
      (D = u),
      (W = s),
      (Ae.transition = i));
  } else e.current = n;
  if (
    (Br && ((Br = !1), (pt = e), (pl = l)),
    (i = e.pendingLanes),
    i === 0 && (xt = null),
    fc(n.stateNode),
    ke(e, J()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest }));
  if (fl) throw ((fl = !1), (e = qi), (qi = null), e);
  return (
    pl & 1 && e.tag !== 0 && hn(),
    (i = e.pendingLanes),
    i & 1 ? (e === eo ? bn++ : ((bn = 0), (eo = e))) : (bn = 0),
    Ft(),
    null
  );
}
function hn() {
  if (pt !== null) {
    var e = Ku(pl),
      t = Ae.transition,
      n = W;
    try {
      if (((Ae.transition = null), (W = 16 > e ? 16 : e), pt === null))
        var r = !1;
      else {
        if (((e = pt), (pt = null), (pl = 0), D & 6)) throw Error(w(331));
        var l = D;
        for (D |= 4, z = e.current; z !== null; ) {
          var i = z,
            s = i.child;
          if (z.flags & 16) {
            var u = i.deletions;
            if (u !== null) {
              for (var a = 0; a < u.length; a++) {
                var d = u[a];
                for (z = d; z !== null; ) {
                  var f = z;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      $n(8, f, i);
                  }
                  var g = f.child;
                  if (g !== null) ((g.return = f), (z = g));
                  else
                    for (; z !== null; ) {
                      f = z;
                      var v = f.sibling,
                        h = f.return;
                      if ((ld(f), f === d)) {
                        z = null;
                        break;
                      }
                      if (v !== null) {
                        ((v.return = h), (z = v));
                        break;
                      }
                      z = h;
                    }
                }
              }
              var y = i.alternate;
              if (y !== null) {
                var S = y.child;
                if (S !== null) {
                  y.child = null;
                  do {
                    var _ = S.sibling;
                    ((S.sibling = null), (S = _));
                  } while (S !== null);
                }
              }
              z = i;
            }
          }
          if (i.subtreeFlags & 2064 && s !== null) ((s.return = i), (z = s));
          else
            e: for (; z !== null; ) {
              if (((i = z), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    $n(9, i, i.return);
                }
              var p = i.sibling;
              if (p !== null) {
                ((p.return = i.return), (z = p));
                break e;
              }
              z = i.return;
            }
        }
        var c = e.current;
        for (z = c; z !== null; ) {
          s = z;
          var m = s.child;
          if (s.subtreeFlags & 2064 && m !== null) ((m.return = s), (z = m));
          else
            e: for (s = c; z !== null; ) {
              if (((u = z), u.flags & 2048))
                try {
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Cl(9, u);
                  }
                } catch (C) {
                  X(u, u.return, C);
                }
              if (u === s) {
                z = null;
                break e;
              }
              var j = u.sibling;
              if (j !== null) {
                ((j.return = u.return), (z = j));
                break e;
              }
              z = u.return;
            }
        }
        if (
          ((D = l), Ft(), Ke && typeof Ke.onPostCommitFiberRoot == "function")
        )
          try {
            Ke.onPostCommitFiberRoot(yl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((W = n), (Ae.transition = t));
    }
  }
  return !1;
}
function ru(e, t, n) {
  ((t = jn(n, t)),
    (t = Ka(e, t, 1)),
    (e = vt(e, t, 1)),
    (t = me()),
    e !== null && (cr(e, 1, t), ke(e, t)));
}
function X(e, t, n) {
  if (e.tag === 3) ru(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        ru(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (xt === null || !xt.has(r)))
        ) {
          ((e = jn(n, e)),
            (e = Ya(t, e, 1)),
            (t = vt(t, e, 1)),
            (e = me()),
            t !== null && (cr(t, 1, e), ke(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function Wf(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = me()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ie === e &&
      (ue & n) === n &&
      (ne === 4 || (ne === 3 && (ue & 130023424) === ue && 500 > J() - Vo)
        ? Lt(e, 0)
        : (Ho |= n)),
    ke(e, t));
}
function hd(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = wr), (wr <<= 1), !(wr & 130023424) && (wr = 4194304))
      : (t = 1));
  var n = me();
  ((e = lt(e, t)), e !== null && (cr(e, t, n), ke(e, n)));
}
function Uf(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), hd(e, n));
}
function Hf(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(w(314));
  }
  (r !== null && r.delete(t), hd(e, n));
}
var md;
md = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || je.current) Se = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((Se = !1), Pf(e, t, n));
      Se = !!(e.flags & 131072);
    }
  else ((Se = !1), Q && t.flags & 1048576 && xa(t, ll, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (Hr(e, t), (e = t.pendingProps));
      var l = yn(t, pe.current);
      (pn(t, n), (l = Do(null, t, r, e, l, n)));
      var i = Lo();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            we(r) ? ((i = !0), nl(t)) : (i = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            Io(t),
            (l.updater = El),
            (t.stateNode = l),
            (l._reactInternals = t),
            Hi(t, r, e, n),
            (t = Qi(null, t, r, !0, i, n)))
          : ((t.tag = 0), Q && i && Eo(t), he(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Hr(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = $f(r)),
          (e = Me(r, e)),
          l)
        ) {
          case 0:
            t = $i(null, t, r, e, n);
            break e;
          case 1:
            t = Ks(null, t, r, e, n);
            break e;
          case 11:
            t = Qs(null, t, r, e, n);
            break e;
          case 14:
            t = bs(null, t, r, Me(r.type, e), n);
            break e;
        }
        throw Error(w(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Me(r, l)),
        $i(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Me(r, l)),
        Ks(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((Ja(t), e === null)) throw Error(w(387));
        ((r = t.pendingProps),
          (i = t.memoizedState),
          (l = i.element),
          Ca(e, t),
          sl(t, r, null, n));
        var s = t.memoizedState;
        if (((r = s.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: s.cache,
              pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
              transitions: s.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            ((l = jn(Error(w(423)), t)), (t = Ys(e, t, r, n, l)));
            break e;
          } else if (r !== l) {
            ((l = jn(Error(w(424)), t)), (t = Ys(e, t, r, n, l)));
            break e;
          } else
            for (
              ze = yt(t.stateNode.containerInfo.firstChild),
                Fe = t,
                Q = !0,
                We = null,
                n = ka(t, null, r, n),
                t.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((vn(), r === l)) {
            t = it(e, t, n);
            break e;
          }
          he(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        za(t),
        e === null && Oi(t),
        (r = t.type),
        (l = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (s = l.children),
        Ai(r, l) ? (s = null) : i !== null && Ai(r, i) && (t.flags |= 32),
        Za(e, t),
        he(e, t, s, n),
        t.child
      );
    case 6:
      return (e === null && Oi(t), null);
    case 13:
      return qa(e, t, n);
    case 4:
      return (
        Bo(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = xn(t, null, r, n)) : he(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Me(r, l)),
        Qs(e, t, r, l, n)
      );
    case 7:
      return (he(e, t, t.pendingProps, n), t.child);
    case 8:
      return (he(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (he(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (i = t.memoizedProps),
          (s = l.value),
          U(il, r._currentValue),
          (r._currentValue = s),
          i !== null)
        )
          if (Ve(i.value, s)) {
            if (i.children === l.children && !je.current) {
              t = it(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var u = i.dependencies;
              if (u !== null) {
                s = i.child;
                for (var a = u.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (i.tag === 1) {
                      ((a = tt(-1, n & -n)), (a.tag = 2));
                      var d = i.updateQueue;
                      if (d !== null) {
                        d = d.shared;
                        var f = d.pending;
                        (f === null
                          ? (a.next = a)
                          : ((a.next = f.next), (f.next = a)),
                          (d.pending = a));
                      }
                    }
                    ((i.lanes |= n),
                      (a = i.alternate),
                      a !== null && (a.lanes |= n),
                      Wi(i.return, n, t),
                      (u.lanes |= n));
                    break;
                  }
                  a = a.next;
                }
              } else if (i.tag === 10) s = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((s = i.return), s === null)) throw Error(w(341));
                ((s.lanes |= n),
                  (u = s.alternate),
                  u !== null && (u.lanes |= n),
                  Wi(s, n, t),
                  (s = i.sibling));
              } else s = i.child;
              if (s !== null) s.return = i;
              else
                for (s = i; s !== null; ) {
                  if (s === t) {
                    s = null;
                    break;
                  }
                  if (((i = s.sibling), i !== null)) {
                    ((i.return = s.return), (s = i));
                    break;
                  }
                  s = s.return;
                }
              i = s;
            }
        (he(e, t, l.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        pn(t, n),
        (l = Re(l)),
        (r = r(l)),
        (t.flags |= 1),
        he(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = Me(r, t.pendingProps)),
        (l = Me(r.type, l)),
        bs(e, t, r, l, n)
      );
    case 15:
      return Xa(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Me(r, l)),
        Hr(e, t),
        (t.tag = 1),
        we(r) ? ((e = !0), nl(t)) : (e = !1),
        pn(t, n),
        ba(t, r, l),
        Hi(t, r, l, n),
        Qi(null, t, r, !0, e, n)
      );
    case 19:
      return ed(e, t, n);
    case 22:
      return Ga(e, t, n);
  }
  throw Error(w(156, t.tag));
};
function gd(e, t) {
  return Vu(e, t);
}
function Vf(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function Ne(e, t, n, r) {
  return new Vf(e, t, n, r);
}
function Ko(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function $f(e) {
  if (typeof e == "function") return Ko(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === fo)) return 11;
    if (e === po) return 14;
  }
  return 2;
}
function jt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Ne(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Qr(e, t, n, r, l, i) {
  var s = 2;
  if (((r = e), typeof e == "function")) Ko(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else
    e: switch (e) {
      case Zt:
        return Mt(n.children, l, i, t);
      case co:
        ((s = 8), (l |= 8));
        break;
      case fi:
        return (
          (e = Ne(12, n, t, l | 2)),
          (e.elementType = fi),
          (e.lanes = i),
          e
        );
      case pi:
        return ((e = Ne(13, n, t, l)), (e.elementType = pi), (e.lanes = i), e);
      case hi:
        return ((e = Ne(19, n, t, l)), (e.elementType = hi), (e.lanes = i), e);
      case zu:
        return Fl(n, l, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Eu:
              s = 10;
              break e;
            case Cu:
              s = 9;
              break e;
            case fo:
              s = 11;
              break e;
            case po:
              s = 14;
              break e;
            case ut:
              ((s = 16), (r = null));
              break e;
          }
        throw Error(w(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Ne(s, n, t, l)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = i),
    t
  );
}
function Mt(e, t, n, r) {
  return ((e = Ne(7, e, r, t)), (e.lanes = n), e);
}
function Fl(e, t, n, r) {
  return (
    (e = Ne(22, e, r, t)),
    (e.elementType = zu),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function ui(e, t, n) {
  return ((e = Ne(6, e, null, t)), (e.lanes = n), e);
}
function ai(e, t, n) {
  return (
    (t = Ne(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Qf(e, t, n, r, l) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Vl(0)),
    (this.expirationTimes = Vl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Vl(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null));
}
function Yo(e, t, n, r, l, i, s, u, a) {
  return (
    (e = new Qf(e, t, n, u, a)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = Ne(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Io(i),
    e
  );
}
function bf(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Gt,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function yd(e) {
  if (!e) return Et;
  e = e._reactInternals;
  e: {
    if (Kt(e) !== e || e.tag !== 1) throw Error(w(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (we(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(w(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (we(n)) return ya(e, n, t);
  }
  return t;
}
function vd(e, t, n, r, l, i, s, u, a) {
  return (
    (e = Yo(n, r, !0, e, l, i, s, u, a)),
    (e.context = yd(null)),
    (n = e.current),
    (r = me()),
    (l = St(n)),
    (i = tt(r, l)),
    (i.callback = t ?? null),
    vt(n, i, l),
    (e.current.lanes = l),
    cr(e, l, r),
    ke(e, r),
    e
  );
}
function Tl(e, t, n, r) {
  var l = t.current,
    i = me(),
    s = St(l);
  return (
    (n = yd(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = tt(i, s)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = vt(l, t, s)),
    e !== null && (He(e, l, s, i), Or(e, l, s)),
    s
  );
}
function ml(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function lu(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Xo(e, t) {
  (lu(e, t), (e = e.alternate) && lu(e, t));
}
function Kf() {
  return null;
}
var xd =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Go(e) {
  this._internalRoot = e;
}
Pl.prototype.render = Go.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(w(409));
  Tl(e, t, null, null);
};
Pl.prototype.unmount = Go.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (Qt(function () {
      Tl(null, e, null, null);
    }),
      (t[rt] = null));
  }
};
function Pl(e) {
  this._internalRoot = e;
}
Pl.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Gu();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < dt.length && t !== 0 && t < dt[n].priority; n++);
    (dt.splice(n, 0, e), n === 0 && Ju(e));
  }
};
function Zo(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function _l(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function iu() {}
function Yf(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var d = ml(s);
        i.call(d);
      };
    }
    var s = vd(t, r, e, 0, null, !1, !1, "", iu);
    return (
      (e._reactRootContainer = s),
      (e[rt] = s.current),
      tr(e.nodeType === 8 ? e.parentNode : e),
      Qt(),
      s
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var u = r;
    r = function () {
      var d = ml(a);
      u.call(d);
    };
  }
  var a = Yo(e, 0, !1, null, null, !1, !1, "", iu);
  return (
    (e._reactRootContainer = a),
    (e[rt] = a.current),
    tr(e.nodeType === 8 ? e.parentNode : e),
    Qt(function () {
      Tl(t, a, n, r);
    }),
    a
  );
}
function Il(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var s = i;
    if (typeof l == "function") {
      var u = l;
      l = function () {
        var a = ml(s);
        u.call(a);
      };
    }
    Tl(t, s, e, l);
  } else s = Yf(n, t, e, l, r);
  return ml(s);
}
Yu = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Dn(t.pendingLanes);
        n !== 0 &&
          (go(t, n | 1), ke(t, J()), !(D & 6) && ((wn = J() + 500), Ft()));
      }
      break;
    case 13:
      (Qt(function () {
        var r = lt(e, 1);
        if (r !== null) {
          var l = me();
          He(r, e, 1, l);
        }
      }),
        Xo(e, 1));
  }
};
yo = function (e) {
  if (e.tag === 13) {
    var t = lt(e, 134217728);
    if (t !== null) {
      var n = me();
      He(t, e, 134217728, n);
    }
    Xo(e, 134217728);
  }
};
Xu = function (e) {
  if (e.tag === 13) {
    var t = St(e),
      n = lt(e, t);
    if (n !== null) {
      var r = me();
      He(n, e, t, r);
    }
    Xo(e, t);
  }
};
Gu = function () {
  return W;
};
Zu = function (e, t) {
  var n = W;
  try {
    return ((W = e), t());
  } finally {
    W = n;
  }
};
Ei = function (e, t, n) {
  switch (t) {
    case "input":
      if ((yi(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = jl(r);
            if (!l) throw Error(w(90));
            (Tu(r), yi(r, l));
          }
        }
      }
      break;
    case "textarea":
      _u(e, n);
      break;
    case "select":
      ((t = n.value), t != null && an(e, !!n.multiple, t, !1));
  }
};
Lu = $o;
Mu = Qt;
var Xf = { usingClientEntryPoint: !1, Events: [pr, tn, jl, Ru, Du, $o] },
  Nn = {
    findFiberByHostInstance: Nt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Gf = {
    bundleType: Nn.bundleType,
    version: Nn.version,
    rendererPackageName: Nn.rendererPackageName,
    rendererConfig: Nn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: ot.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = Uu(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: Nn.findFiberByHostInstance || Kf,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Nr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Nr.isDisabled && Nr.supportsFiber)
    try {
      ((yl = Nr.inject(Gf)), (Ke = Nr));
    } catch {}
}
Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Xf;
Pe.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Zo(t)) throw Error(w(200));
  return bf(e, t, null, n);
};
Pe.createRoot = function (e, t) {
  if (!Zo(e)) throw Error(w(299));
  var n = !1,
    r = "",
    l = xd;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = Yo(e, 1, !1, null, null, n, !1, r, l)),
    (e[rt] = t.current),
    tr(e.nodeType === 8 ? e.parentNode : e),
    new Go(t)
  );
};
Pe.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(w(188))
      : ((e = Object.keys(e).join(",")), Error(w(268, e)));
  return ((e = Uu(t)), (e = e === null ? null : e.stateNode), e);
};
Pe.flushSync = function (e) {
  return Qt(e);
};
Pe.hydrate = function (e, t, n) {
  if (!_l(t)) throw Error(w(200));
  return Il(null, e, t, !0, n);
};
Pe.hydrateRoot = function (e, t, n) {
  if (!Zo(e)) throw Error(w(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    i = "",
    s = xd;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
    (t = vd(t, null, e, 1, n ?? null, l, !1, i, s)),
    (e[rt] = t.current),
    tr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l));
  return new Pl(t);
};
Pe.render = function (e, t, n) {
  if (!_l(t)) throw Error(w(200));
  return Il(null, e, t, !1, n);
};
Pe.unmountComponentAtNode = function (e) {
  if (!_l(e)) throw Error(w(40));
  return e._reactRootContainer
    ? (Qt(function () {
        Il(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[rt] = null));
        });
      }),
      !0)
    : !1;
};
Pe.unstable_batchedUpdates = $o;
Pe.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!_l(n)) throw Error(w(200));
  if (e == null || e._reactInternals === void 0) throw Error(w(38));
  return Il(e, t, n, !1, r);
};
Pe.version = "18.3.1-next-f1338f8080-20240426";
function Sd() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Sd);
    } catch (e) {
      console.error(e);
    }
}
(Sd(), (Su.exports = Pe));
var Zf = Su.exports,
  ou = Zf;
((di.createRoot = ou.createRoot), (di.hydrateRoot = ou.hydrateRoot));
M.createContext(null);
const Jf = {
    id: "u1",
    name: "Alex Morgan",
    role: "pm",
    avatar: "AM",
    email: "alex.morgan@company.com",
  },
  _t = [
    {
      id: "e1",
      name: "Riya Sharma",
      email: "riya@company.com",
      role: "developer",
      type: "fulltime",
      department: "Engineering",
      kekaId: "K001",
      avatar: "RS",
    },
    {
      id: "e2",
      name: "Tom Chen",
      email: "tom@company.com",
      role: "developer",
      type: "parttime",
      department: "Engineering",
      kekaId: "K002",
      avatar: "TC",
    },
    {
      id: "e3",
      name: "Priya Nair",
      email: "priya@company.com",
      role: "designer",
      type: "fulltime",
      department: "Design",
      kekaId: "K003",
      avatar: "PN",
    },
    {
      id: "e4",
      name: "Sam Okafor",
      email: "sam@company.com",
      role: "qa",
      type: "fulltime",
      department: "QA",
      kekaId: "K004",
      avatar: "SO",
    },
    {
      id: "e5",
      name: "Meera Patel",
      email: "meera@company.com",
      role: "developer",
      type: "parttime",
      department: "Engineering",
      kekaId: "K005",
      avatar: "MP",
    },
  ],
  Dt = [
    {
      id: "p1",
      name: "Phoenix Portal",
      code: "PHX",
      client: "Acme Corp",
      status: "active",
      billable: !0,
      startDate: "2025-01-01",
      endDate: "2025-06-30",
      budget: 1200,
      assignedMembers: ["e1", "e2", "e3"],
      progress: 65,
    },
    {
      id: "p2",
      name: "DataLake Migration",
      code: "DLM",
      client: "Internal",
      status: "active",
      billable: !1,
      startDate: "2025-02-01",
      endDate: "2025-08-31",
      budget: 800,
      assignedMembers: ["e1", "e4"],
      progress: 30,
    },
    {
      id: "p3",
      name: "Mobile Commerce App",
      code: "MCA",
      client: "RetailX",
      status: "active",
      billable: !0,
      startDate: "2025-03-01",
      endDate: "2025-12-31",
      budget: 2400,
      assignedMembers: ["e2", "e3", "e5"],
      progress: 15,
    },
    {
      id: "p4",
      name: "Security Audit",
      code: "SEC",
      client: "Internal",
      status: "completed",
      billable: !1,
      startDate: "2024-10-01",
      endDate: "2025-01-31",
      budget: 400,
      assignedMembers: ["e4"],
      progress: 100,
    },
  ],
  su = [
    {
      id: "t1",
      projectId: "p1",
      title: "UI Component Library",
      type: "task",
      milestone: "M1 - Foundation",
      assignee: "e3",
      startDate: "2025-01-01",
      endDate: "2025-02-15",
      status: "completed",
      estimatedHours: 80,
    },
    {
      id: "t2",
      projectId: "p1",
      title: "API Integration Layer",
      type: "task",
      milestone: "M1 - Foundation",
      assignee: "e1",
      startDate: "2025-01-15",
      endDate: "2025-03-01",
      status: "inprogress",
      estimatedHours: 120,
    },
    {
      id: "t3",
      projectId: "p1",
      title: "M1 - Foundation Complete",
      type: "milestone",
      milestone: null,
      assignee: null,
      startDate: "2025-03-01",
      endDate: "2025-03-01",
      status: "upcoming",
      estimatedHours: 0,
    },
    {
      id: "t4",
      projectId: "p1",
      title: "User Authentication",
      type: "task",
      milestone: "M2 - Core Features",
      assignee: "e1",
      startDate: "2025-03-01",
      endDate: "2025-04-15",
      status: "upcoming",
      estimatedHours: 60,
    },
    {
      id: "t5",
      projectId: "p1",
      title: "Dashboard Module",
      type: "task",
      milestone: "M2 - Core Features",
      assignee: "e2",
      startDate: "2025-03-15",
      endDate: "2025-05-01",
      status: "upcoming",
      estimatedHours: 90,
    },
    {
      id: "t6",
      projectId: "p2",
      title: "Data Source Mapping",
      type: "task",
      milestone: "M1 - Analysis",
      assignee: "e1",
      startDate: "2025-02-01",
      endDate: "2025-03-15",
      status: "inprogress",
      estimatedHours: 100,
    },
    {
      id: "t7",
      projectId: "p2",
      title: "ETL Pipeline Build",
      type: "task",
      milestone: "M2 - Build",
      assignee: "e4",
      startDate: "2025-03-15",
      endDate: "2025-06-01",
      status: "upcoming",
      estimatedHours: 200,
    },
  ],
  jd = new Date("2025-05-15"),
  wd = (e = 0) => {
    const t = new Date(jd);
    return (
      t.setDate(t.getDate() - t.getDay() + 1 + e * 7),
      Array.from({ length: 7 }, (n, r) => {
        const l = new Date(t);
        return (l.setDate(t.getDate() + r), l);
      })
    );
  },
  qf = [
    {
      id: "ts1",
      employeeId: "e1",
      projectId: "p1",
      taskId: "t2",
      date: "2025-05-12",
      hours: 8,
      description: "API integration work",
      billable: !0,
      status: "approved",
      weekOf: "2025-05-12",
    },
    {
      id: "ts2",
      employeeId: "e1",
      projectId: "p2",
      taskId: "t6",
      date: "2025-05-13",
      hours: 8,
      description: "Data mapping analysis",
      billable: !1,
      status: "approved",
      weekOf: "2025-05-12",
    },
    {
      id: "ts3",
      employeeId: "e2",
      projectId: "p1",
      taskId: "t5",
      date: "2025-05-12",
      hours: 4,
      description: "Dashboard wireframes",
      billable: !0,
      status: "pending",
      weekOf: "2025-05-12",
    },
    {
      id: "ts4",
      employeeId: "e3",
      projectId: "p1",
      taskId: "t1",
      date: "2025-05-12",
      hours: 6,
      description: "Button components",
      billable: !0,
      status: "pending",
      weekOf: "2025-05-12",
    },
    {
      id: "ts5",
      employeeId: "e1",
      projectId: "p1",
      taskId: "t2",
      date: "2025-05-14",
      hours: 8,
      description: "OAuth2 integration",
      billable: !0,
      status: "draft",
      weekOf: "2025-05-12",
    },
  ],
  ep = [
    {
      id: "i1",
      employeeId: "e2",
      type: "missing_timesheet",
      weekOf: "2025-04-28",
      chaseSent: 3,
      resolved: !1,
    },
    {
      id: "i2",
      employeeId: "e5",
      type: "missing_timesheet",
      weekOf: "2025-04-28",
      chaseSent: 2,
      resolved: !1,
    },
    {
      id: "i3",
      employeeId: "e5",
      type: "missing_timesheet",
      weekOf: "2025-05-05",
      chaseSent: 1,
      resolved: !1,
    },
    {
      id: "i4",
      employeeId: "e2",
      type: "missing_timesheet",
      weekOf: "2025-05-05",
      chaseSent: 1,
      resolved: !1,
    },
  ],
  Ce = (e) =>
    new Date(e).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  uu = (e) =>
    new Date(e).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
  tp = (e) => e.toLocaleDateString("en-US", { weekday: "short" }),
  E = {
    blue: "#3B82F6",
    green: "#10B981",
    amber: "#F59E0B",
    red: "#EF4444",
    purple: "#8B5CF6",
    slate: "#64748B",
  },
  Xe = ({ initials: e, size: t = 32, color: n = "#3B82F6" }) =>
    o.jsx("div", {
      style: {
        width: t,
        height: t,
        borderRadius: "50%",
        background: n + "22",
        border: `1.5px solid ${n}44`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: t * 0.35,
        fontWeight: 600,
        color: n,
        flexShrink: 0,
        fontFamily: "Sora, sans-serif",
      },
      children: e,
    }),
  Bl = ({ label: e, color: t = "#3B82F6", small: n }) =>
    o.jsx("span", {
      style: {
        background: t + "18",
        color: t,
        border: `1px solid ${t}33`,
        borderRadius: 4,
        padding: n ? "2px 6px" : "3px 9px",
        fontSize: n ? 10 : 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      },
      children: e,
    }),
  q = ({ status: e }) => {
    const n = {
      active: { label: "Active", color: E.green },
      completed: { label: "Completed", color: E.slate },
      approved: { label: "Approved", color: E.green },
      pending: { label: "Pending", color: E.amber },
      draft: { label: "Draft", color: E.slate },
      rejected: { label: "Rejected", color: E.red },
      inprogress: { label: "In Progress", color: E.blue },
      upcoming: { label: "Upcoming", color: E.purple },
      fulltime: { label: "Full Time", color: E.blue },
      parttime: { label: "Part Time", color: E.amber },
      billable: { label: "Billable", color: E.green },
      nonbillable: { label: "Non-Billable", color: E.slate },
      milestone: { label: "Milestone", color: E.purple },
      task: { label: "Task", color: E.blue },
    }[e] || { label: e, color: E.slate };
    return o.jsx(Bl, { label: n.label, color: n.color, small: !0 });
  },
  Je = ({ label: e, value: t, sub: n, color: r = E.blue, icon: l }) =>
    o.jsx("div", {
      style: {
        background: "white",
        borderRadius: 12,
        padding: "20px 24px",
        border: "1px solid #E2E8F0",
        flex: 1,
        minWidth: 160,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      },
      children: o.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        },
        children: [
          o.jsxs("div", {
            children: [
              o.jsx("div", {
                style: {
                  fontSize: 12,
                  color: "#94A3B8",
                  fontWeight: 500,
                  marginBottom: 6,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                },
                children: e,
              }),
              o.jsx("div", {
                style: {
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#0F172A",
                  lineHeight: 1,
                  fontFamily: "Sora, sans-serif",
                },
                children: t,
              }),
              n &&
                o.jsx("div", {
                  style: { fontSize: 12, color: "#64748B", marginTop: 6 },
                  children: n,
                }),
            ],
          }),
          o.jsx("div", {
            style: {
              width: 40,
              height: 40,
              borderRadius: 10,
              background: r + "15",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            },
            children: l,
          }),
        ],
      }),
    }),
  mn = ({ value: e, color: t = E.blue }) =>
    o.jsx("div", {
      style: {
        height: 6,
        background: "#F1F5F9",
        borderRadius: 99,
        overflow: "hidden",
      },
      children: o.jsx("div", {
        style: {
          height: "100%",
          width: `${e}%`,
          background: t,
          borderRadius: 99,
          transition: "width 0.6s ease",
        },
      }),
    }),
  L = ({
    children: e,
    onClick: t,
    variant: n = "primary",
    small: r,
    disabled: l,
    style: i = {},
  }) => {
    const s = {
      primary: {
        background: "#3B82F6",
        color: "white",
        border: "1px solid #3B82F6",
      },
      secondary: {
        background: "white",
        color: "#374151",
        border: "1px solid #E2E8F0",
      },
      ghost: {
        background: "transparent",
        color: "#64748B",
        border: "1px solid transparent",
      },
      danger: {
        background: "#FEF2F2",
        color: "#EF4444",
        border: "1px solid #FECACA",
      },
      success: {
        background: "#F0FDF4",
        color: "#10B981",
        border: "1px solid #A7F3D0",
      },
    };
    return o.jsx("button", {
      onClick: t,
      disabled: l,
      style: {
        ...s[n],
        padding: r ? "5px 12px" : "8px 16px",
        borderRadius: 7,
        fontSize: r ? 12 : 13,
        fontWeight: 600,
        cursor: l ? "not-allowed" : "pointer",
        opacity: l ? 0.5 : 1,
        display: "flex",
        alignItems: "center",
        gap: 6,
        whiteSpace: "nowrap",
        fontFamily: "inherit",
        transition: "all 0.15s ease",
        ...i,
      },
      children: e,
    });
  },
  Nl = ({ title: e, children: t, onClose: n, width: r = 560 }) =>
    o.jsx("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.5)",
        zIndex: 1e3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backdropFilter: "blur(4px)",
      },
      onClick: n,
      children: o.jsxs("div", {
        style: {
          background: "white",
          borderRadius: 14,
          width: "100%",
          maxWidth: r,
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
        },
        onClick: (l) => l.stopPropagation(),
        children: [
          o.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px",
              borderBottom: "1px solid #F1F5F9",
            },
            children: [
              o.jsx("h3", {
                style: {
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#0F172A",
                  fontFamily: "Sora, sans-serif",
                },
                children: e,
              }),
              o.jsx("button", {
                onClick: n,
                style: {
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#94A3B8",
                  lineHeight: 1,
                },
                children: "×",
              }),
            ],
          }),
          o.jsx("div", { style: { padding: 24 }, children: t }),
        ],
      }),
    }),
  Z = ({ label: e, children: t, required: n }) =>
    o.jsxs("div", {
      style: { marginBottom: 16 },
      children: [
        o.jsxs("label", {
          style: {
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: "#374151",
            marginBottom: 6,
            letterSpacing: "0.02em",
          },
          children: [
            e,
            " ",
            n && o.jsx("span", { style: { color: E.red }, children: "*" }),
          ],
        }),
        t,
      ],
    }),
  xe = ({
    value: e,
    onChange: t,
    placeholder: n,
    type: r = "text",
    style: l = {},
  }) =>
    o.jsx("input", {
      type: r,
      value: e,
      onChange: t,
      placeholder: n,
      style: {
        width: "100%",
        padding: "8px 12px",
        border: "1px solid #E2E8F0",
        borderRadius: 7,
        fontSize: 13,
        color: "#0F172A",
        outline: "none",
        fontFamily: "inherit",
        boxSizing: "border-box",
        background: "white",
        ...l,
      },
    }),
  Ot = ({ value: e, onChange: t, children: n, style: r = {} }) =>
    o.jsx("select", {
      value: e,
      onChange: t,
      style: {
        width: "100%",
        padding: "8px 12px",
        border: "1px solid #E2E8F0",
        borderRadius: 7,
        fontSize: 13,
        color: "#0F172A",
        outline: "none",
        fontFamily: "inherit",
        background: "white",
        boxSizing: "border-box",
        ...r,
      },
      children: n,
    }),
  np = ({ value: e, onChange: t, placeholder: n, rows: r = 3 }) =>
    o.jsx("textarea", {
      value: e,
      onChange: t,
      placeholder: n,
      rows: r,
      style: {
        width: "100%",
        padding: "8px 12px",
        border: "1px solid #E2E8F0",
        borderRadius: 7,
        fontSize: 13,
        color: "#0F172A",
        outline: "none",
        fontFamily: "inherit",
        boxSizing: "border-box",
        resize: "vertical",
      },
    }),
  Wt = ({ headers: e, children: t }) =>
    o.jsx("div", {
      style: { overflowX: "auto" },
      children: o.jsxs("table", {
        style: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
        children: [
          o.jsx("thead", {
            children: o.jsx("tr", {
              style: { borderBottom: "2px solid #F1F5F9" },
              children: e.map((n, r) =>
                o.jsx(
                  "th",
                  {
                    style: {
                      padding: "10px 14px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#64748B",
                      fontSize: 11,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    },
                    children: n,
                  },
                  r,
                ),
              ),
            }),
          }),
          o.jsx("tbody", { children: t }),
        ],
      }),
    }),
  wt = ({ children: e, onClick: t, hover: n }) => {
    const [r, l] = M.useState(!1);
    return o.jsx("tr", {
      onClick: t,
      onMouseEnter: () => l(!0),
      onMouseLeave: () => l(!1),
      style: {
        borderBottom: "1px solid #F8FAFC",
        background: r && n ? "#F8FAFC" : "transparent",
        cursor: t ? "pointer" : "default",
        transition: "background 0.1s",
      },
      children: e,
    });
  },
  P = ({ children: e, muted: t, bold: n }) =>
    o.jsx("td", {
      style: {
        padding: "11px 14px",
        color: t ? "#94A3B8" : n ? "#0F172A" : "#374151",
        fontWeight: n ? 600 : 400,
        verticalAlign: "middle",
      },
      children: e,
    }),
  rp = ({ notifs: e, onClear: t }) =>
    o.jsxs("div", {
      style: { position: "relative" },
      children: [
        o.jsx("div", {
          style: {
            position: "absolute",
            top: -4,
            right: -4,
            background: E.red,
            borderRadius: 99,
            width: 16,
            height: 16,
            display: e > 0 ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            color: "white",
            fontWeight: 700,
          },
          children: e,
        }),
        o.jsx("button", {
          onClick: t,
          style: {
            background: "#F1F5F9",
            border: "none",
            borderRadius: 8,
            width: 36,
            height: 36,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
          },
          children: "🔔",
        }),
      ],
    });
function lp({ timesheets: e, incidents: t, projects: n, employees: r }) {
  wd();
  const l = e
      .filter((d) => d.billable && d.status !== "draft")
      .reduce((d, f) => d + f.hours, 0),
    i = e
      .filter((d) => !d.billable && d.status !== "draft")
      .reduce((d, f) => d + f.hours, 0),
    s = e.filter((d) => d.status === "pending").length,
    u = t.filter((d) => !d.resolved).length,
    a = Dt.filter((d) => d.status === "active").map((d) => {
      const f = e
        .filter((g) => g.projectId === d.id)
        .reduce((g, v) => g + v.hours, 0);
      return { ...d, loggedHours: f };
    });
  return o.jsxs("div", {
    children: [
      o.jsxs("div", {
        style: { marginBottom: 28 },
        children: [
          o.jsx("h2", {
            style: {
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              color: "#0F172A",
              fontFamily: "Sora, sans-serif",
            },
            children: "Good morning, Alex 👋",
          }),
          o.jsx("p", {
            style: { margin: "4px 0 0", color: "#64748B", fontSize: 14 },
            children: "Here's what's happening across your projects today.",
          }),
        ],
      }),
      o.jsxs("div", {
        style: { display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" },
        children: [
          o.jsx(Je, {
            label: "Billable Hours",
            value: `${l}h`,
            sub: "This period",
            color: E.green,
            icon: "💰",
          }),
          o.jsx(Je, {
            label: "Non-Billable",
            value: `${i}h`,
            sub: "This period",
            color: E.slate,
            icon: "📋",
          }),
          o.jsx(Je, {
            label: "Pending Approvals",
            value: s,
            sub: "Need your review",
            color: E.amber,
            icon: "⏳",
          }),
          o.jsx(Je, {
            label: "Active Projects",
            value: Dt.filter((d) => d.status === "active").length,
            sub: "Across all teams",
            color: E.blue,
            icon: "🗂️",
          }),
          o.jsx(Je, {
            label: "Compliance Flags",
            value: u,
            sub: "Open incidents",
            color: u > 0 ? E.red : E.green,
            icon: "⚠️",
          }),
        ],
      }),
      o.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 20,
        },
        children: [
          o.jsxs("div", {
            style: {
              background: "white",
              borderRadius: 12,
              padding: 20,
              border: "1px solid #E2E8F0",
            },
            children: [
              o.jsx("h3", {
                style: {
                  margin: "0 0 16px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0F172A",
                },
                children: "Active Projects",
              }),
              a.map((d) =>
                o.jsxs(
                  "div",
                  {
                    style: { marginBottom: 14 },
                    children: [
                      o.jsxs("div", {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 6,
                        },
                        children: [
                          o.jsxs("div", {
                            children: [
                              o.jsx("span", {
                                style: {
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: "#0F172A",
                                },
                                children: d.name,
                              }),
                              o.jsx("span", {
                                style: {
                                  fontSize: 11,
                                  color: "#94A3B8",
                                  marginLeft: 8,
                                },
                                children: d.client,
                              }),
                            ],
                          }),
                          o.jsxs("div", {
                            style: {
                              display: "flex",
                              gap: 6,
                              alignItems: "center",
                            },
                            children: [
                              o.jsxs("span", {
                                style: { fontSize: 12, color: "#64748B" },
                                children: [
                                  d.loggedHours,
                                  "h / ",
                                  d.budget,
                                  "h",
                                ],
                              }),
                              o.jsx(q, {
                                status: d.billable ? "billable" : "nonbillable",
                              }),
                            ],
                          }),
                        ],
                      }),
                      o.jsx(mn, {
                        value: (d.loggedHours / d.budget) * 100,
                        color: d.billable ? E.green : E.slate,
                      }),
                    ],
                  },
                  d.id,
                ),
              ),
            ],
          }),
          o.jsxs("div", {
            style: {
              background: "white",
              borderRadius: 12,
              padding: 20,
              border: "1px solid #E2E8F0",
            },
            children: [
              o.jsx("h3", {
                style: {
                  margin: "0 0 16px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0F172A",
                },
                children: "Pending Approvals",
              }),
              e.filter((d) => d.status === "pending").length === 0
                ? o.jsx("div", {
                    style: {
                      textAlign: "center",
                      padding: "20px 0",
                      color: "#94A3B8",
                      fontSize: 13,
                    },
                    children: "✅ All caught up!",
                  })
                : e
                    .filter((d) => d.status === "pending")
                    .map((d) => {
                      const f = r.find((v) => v.id === d.employeeId),
                        g = Dt.find((v) => v.id === d.projectId);
                      return o.jsxs(
                        "div",
                        {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 0",
                            borderBottom: "1px solid #F1F5F9",
                          },
                          children: [
                            o.jsx(Xe, {
                              initials: f == null ? void 0 : f.avatar,
                              size: 30,
                              color: E.blue,
                            }),
                            o.jsxs("div", {
                              style: { flex: 1 },
                              children: [
                                o.jsx("div", {
                                  style: {
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "#0F172A",
                                  },
                                  children: f == null ? void 0 : f.name,
                                }),
                                o.jsxs("div", {
                                  style: { fontSize: 11, color: "#94A3B8" },
                                  children: [
                                    g == null ? void 0 : g.name,
                                    " · ",
                                    d.hours,
                                    "h · ",
                                    Ce(d.date),
                                  ],
                                }),
                              ],
                            }),
                            o.jsx(q, { status: "pending" }),
                          ],
                        },
                        d.id,
                      );
                    }),
            ],
          }),
        ],
      }),
      u > 0 &&
        o.jsxs("div", {
          style: {
            background: "#FFF7ED",
            borderRadius: 12,
            padding: 20,
            border: "1px solid #FED7AA",
          },
          children: [
            o.jsx("h3", {
              style: {
                margin: "0 0 14px",
                fontSize: 14,
                fontWeight: 700,
                color: "#92400E",
                display: "flex",
                alignItems: "center",
                gap: 8,
              },
              children: "⚠️ Timesheet Compliance Issues",
            }),
            o.jsx("div", {
              style: { display: "flex", gap: 12, flexWrap: "wrap" },
              children: t
                .filter((d) => !d.resolved)
                .map((d) => {
                  const f = r.find((g) => g.id === d.employeeId);
                  return o.jsxs(
                    "div",
                    {
                      style: {
                        background: "white",
                        borderRadius: 8,
                        padding: "10px 14px",
                        border: "1px solid #FED7AA",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      },
                      children: [
                        o.jsx(Xe, {
                          initials: f == null ? void 0 : f.avatar,
                          size: 28,
                          color: E.amber,
                        }),
                        o.jsxs("div", {
                          children: [
                            o.jsx("div", {
                              style: {
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#0F172A",
                              },
                              children: f == null ? void 0 : f.name,
                            }),
                            o.jsxs("div", {
                              style: { fontSize: 11, color: "#94A3B8" },
                              children: [
                                "Week of ",
                                Ce(d.weekOf),
                                " · ",
                                d.chaseSent,
                                " chase",
                                d.chaseSent !== 1 ? "s" : "",
                                " sent",
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    d.id,
                  );
                }),
            }),
          ],
        }),
    ],
  });
}
function ip({ projects: e, employees: t, onSelectProject: n }) {
  const [r, l] = M.useState(!1),
    [i, s] = M.useState({
      name: "",
      code: "",
      client: "",
      billable: !0,
      startDate: "",
      endDate: "",
    });
  return o.jsxs("div", {
    children: [
      o.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        },
        children: [
          o.jsxs("div", {
            children: [
              o.jsx("h2", {
                style: {
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0F172A",
                  fontFamily: "Sora, sans-serif",
                },
                children: "Projects",
              }),
              o.jsxs("p", {
                style: { margin: "4px 0 0", color: "#64748B", fontSize: 14 },
                children: [e.length, " projects total"],
              }),
            ],
          }),
          o.jsx(L, { onClick: () => l(!0), children: "➕ New Project" }),
        ],
      }),
      o.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 16,
        },
        children: e.map((u) => {
          const a = t.filter((d) => u.assignedMembers.includes(d.id));
          return o.jsxs(
            "div",
            {
              onClick: () => n(u),
              style: {
                background: "white",
                borderRadius: 12,
                padding: 20,
                border: "1px solid #E2E8F0",
                cursor: "pointer",
                transition: "all 0.15s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              },
              onMouseEnter: (d) =>
                (d.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(59,130,246,0.12)"),
              onMouseLeave: (d) =>
                (d.currentTarget.style.boxShadow =
                  "0 1px 3px rgba(0,0,0,0.04)"),
              children: [
                o.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  },
                  children: [
                    o.jsxs("div", {
                      children: [
                        o.jsxs("div", {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 4,
                          },
                          children: [
                            o.jsx("span", {
                              style: {
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#94A3B8",
                                letterSpacing: "0.06em",
                              },
                              children: u.code,
                            }),
                            o.jsx(q, { status: u.status }),
                          ],
                        }),
                        o.jsx("h3", {
                          style: {
                            margin: 0,
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#0F172A",
                            fontFamily: "Sora, sans-serif",
                          },
                          children: u.name,
                        }),
                        o.jsx("p", {
                          style: {
                            margin: "2px 0 0",
                            fontSize: 12,
                            color: "#94A3B8",
                          },
                          children: u.client,
                        }),
                      ],
                    }),
                    o.jsx(q, {
                      status: u.billable ? "billable" : "nonbillable",
                    }),
                  ],
                }),
                o.jsxs("div", {
                  style: { marginBottom: 12 },
                  children: [
                    o.jsxs("div", {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      },
                      children: [
                        o.jsx("span", {
                          style: { fontSize: 12, color: "#64748B" },
                          children: "Progress",
                        }),
                        o.jsxs("span", {
                          style: {
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#0F172A",
                          },
                          children: [u.progress, "%"],
                        }),
                      ],
                    }),
                    o.jsx(mn, {
                      value: u.progress,
                      color: u.status === "completed" ? E.green : E.blue,
                    }),
                  ],
                }),
                o.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                  children: [
                    o.jsxs("div", {
                      style: { display: "flex", gap: -6 },
                      children: [
                        a.slice(0, 4).map((d, f) =>
                          o.jsx(
                            "div",
                            {
                              style: {
                                marginLeft: f > 0 ? -8 : 0,
                                zIndex: 4 - f,
                              },
                              children: o.jsx(Xe, {
                                initials: d.avatar,
                                size: 26,
                                color: E.blue,
                              }),
                            },
                            d.id,
                          ),
                        ),
                        a.length > 4 &&
                          o.jsxs("span", {
                            style: {
                              fontSize: 11,
                              color: "#94A3B8",
                              marginLeft: 4,
                              alignSelf: "center",
                            },
                            children: ["+", a.length - 4],
                          }),
                      ],
                    }),
                    o.jsxs("span", {
                      style: { fontSize: 11, color: "#94A3B8" },
                      children: [Ce(u.startDate), " → ", Ce(u.endDate)],
                    }),
                  ],
                }),
              ],
            },
            u.id,
          );
        }),
      }),
      r &&
        o.jsxs(Nl, {
          title: "New Project",
          onClose: () => l(!1),
          children: [
            o.jsx(Z, {
              label: "Project Name",
              required: !0,
              children: o.jsx(xe, {
                value: i.name,
                onChange: (u) => s({ ...i, name: u.target.value }),
                placeholder: "e.g. Phoenix Portal",
              }),
            }),
            o.jsxs("div", {
              style: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              },
              children: [
                o.jsx(Z, {
                  label: "Project Code",
                  required: !0,
                  children: o.jsx(xe, {
                    value: i.code,
                    onChange: (u) => s({ ...i, code: u.target.value }),
                    placeholder: "PHX",
                  }),
                }),
                o.jsx(Z, {
                  label: "Client",
                  children: o.jsx(xe, {
                    value: i.client,
                    onChange: (u) => s({ ...i, client: u.target.value }),
                    placeholder: "Client name",
                  }),
                }),
              ],
            }),
            o.jsxs("div", {
              style: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              },
              children: [
                o.jsx(Z, {
                  label: "Start Date",
                  children: o.jsx(xe, {
                    type: "date",
                    value: i.startDate,
                    onChange: (u) => s({ ...i, startDate: u.target.value }),
                  }),
                }),
                o.jsx(Z, {
                  label: "End Date",
                  children: o.jsx(xe, {
                    type: "date",
                    value: i.endDate,
                    onChange: (u) => s({ ...i, endDate: u.target.value }),
                  }),
                }),
              ],
            }),
            o.jsx(Z, {
              label: "Billable Type",
              children: o.jsxs(Ot, {
                value: i.billable,
                onChange: (u) =>
                  s({ ...i, billable: u.target.value === "true" }),
                children: [
                  o.jsx("option", { value: "true", children: "Billable" }),
                  o.jsx("option", { value: "false", children: "Non-Billable" }),
                ],
              }),
            }),
            o.jsxs("div", {
              style: {
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
                marginTop: 8,
              },
              children: [
                o.jsx(L, {
                  variant: "secondary",
                  onClick: () => l(!1),
                  children: "Cancel",
                }),
                o.jsx(L, { onClick: () => l(!1), children: "Create Project" }),
              ],
            }),
          ],
        }),
    ],
  });
}
function op({ project: e, employees: t, tasks: n, onBack: r }) {
  const [l, i] = M.useState("wbs"),
    [s, u] = M.useState(!1),
    [a, d] = M.useState(!1),
    f = n.filter((y) => y.projectId === e.id),
    g = [...new Set(f.filter((y) => y.milestone).map((y) => y.milestone))],
    v = t.filter((y) => e.assignedMembers.includes(y.id)),
    h = ["wbs", "team", "overview"];
  return o.jsxs("div", {
    children: [
      o.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        },
        children: [
          o.jsx(L, {
            variant: "ghost",
            onClick: r,
            small: !0,
            children: "← Back",
          }),
          o.jsxs("div", {
            children: [
              o.jsxs("div", {
                style: { display: "flex", alignItems: "center", gap: 10 },
                children: [
                  o.jsx("h2", {
                    style: {
                      margin: 0,
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#0F172A",
                      fontFamily: "Sora, sans-serif",
                    },
                    children: e.name,
                  }),
                  o.jsx(q, { status: e.status }),
                  o.jsx(q, { status: e.billable ? "billable" : "nonbillable" }),
                ],
              }),
              o.jsxs("p", {
                style: { margin: "4px 0 0", fontSize: 13, color: "#94A3B8" },
                children: [
                  e.client,
                  " · ",
                  Ce(e.startDate),
                  " – ",
                  Ce(e.endDate),
                ],
              }),
            ],
          }),
        ],
      }),
      o.jsxs("div", {
        style: {
          display: "flex",
          gap: 8,
          marginBottom: 24,
          borderBottom: "1px solid #E2E8F0",
          paddingBottom: 0,
        },
        children: [
          h.map((y) =>
            o.jsx(
              "button",
              {
                onClick: () => i(y),
                style: {
                  padding: "8px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  color: l === y ? "#3B82F6" : "#64748B",
                  borderBottom:
                    l === y ? "2px solid #3B82F6" : "2px solid transparent",
                  marginBottom: -1,
                  fontFamily: "inherit",
                  textTransform: "capitalize",
                },
                children: y === "wbs" ? "WBS & Tasks" : y,
              },
              y,
            ),
          ),
          l === "wbs" &&
            o.jsxs("div", {
              style: {
                marginLeft: "auto",
                display: "flex",
                gap: 8,
                paddingBottom: 8,
              },
              children: [
                o.jsx(L, {
                  variant: "secondary",
                  small: !0,
                  onClick: () => u(!0),
                  children: "📤 Upload WBS",
                }),
                o.jsx(L, { small: !0, children: "➕ Add Task" }),
              ],
            }),
          l === "team" &&
            o.jsx("div", {
              style: { marginLeft: "auto", paddingBottom: 8 },
              children: o.jsx(L, {
                small: !0,
                onClick: () => d(!0),
                children: "➕ Add Member",
              }),
            }),
        ],
      }),
      l === "wbs" &&
        o.jsxs("div", {
          style: {
            background: "white",
            borderRadius: 12,
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          },
          children: [
            g.map((y) =>
              o.jsxs(
                "div",
                {
                  children: [
                    o.jsxs("div", {
                      style: {
                        background: "#F8FAFC",
                        padding: "10px 16px",
                        borderBottom: "1px solid #E2E8F0",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      },
                      children: [
                        o.jsx("span", {
                          style: { fontSize: 14 },
                          children: "🏁",
                        }),
                        o.jsx("span", {
                          style: {
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#374151",
                          },
                          children: y,
                        }),
                      ],
                    }),
                    f
                      .filter((S) => S.milestone === y)
                      .map((S) => {
                        const _ = t.find((p) => p.id === S.assignee);
                        return o.jsxs(
                          "div",
                          {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: 14,
                              padding: "12px 16px",
                              borderBottom: "1px solid #F8FAFC",
                            },
                            children: [
                              o.jsx("div", {
                                style: { fontSize: 16 },
                                children: S.type === "milestone" ? "🏁" : "📌",
                              }),
                              o.jsxs("div", {
                                style: { flex: 1 },
                                children: [
                                  o.jsx("div", {
                                    style: {
                                      fontSize: 13,
                                      fontWeight: 600,
                                      color: "#0F172A",
                                    },
                                    children: S.title,
                                  }),
                                  o.jsxs("div", {
                                    style: {
                                      fontSize: 11,
                                      color: "#94A3B8",
                                      marginTop: 2,
                                    },
                                    children: [
                                      Ce(S.startDate),
                                      " → ",
                                      Ce(S.endDate),
                                      S.estimatedHours
                                        ? ` · ${S.estimatedHours}h est.`
                                        : "",
                                    ],
                                  }),
                                ],
                              }),
                              _ &&
                                o.jsxs("div", {
                                  style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                  },
                                  children: [
                                    o.jsx(Xe, {
                                      initials: _.avatar,
                                      size: 24,
                                      color: E.blue,
                                    }),
                                    o.jsx("span", {
                                      style: { fontSize: 12, color: "#64748B" },
                                      children: _.name.split(" ")[0],
                                    }),
                                  ],
                                }),
                              o.jsx(q, { status: S.status }),
                            ],
                          },
                          S.id,
                        );
                      }),
                  ],
                },
                y,
              ),
            ),
            f
              .filter((y) => !y.milestone)
              .map((y) =>
                o.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "12px 16px",
                      borderBottom: "1px solid #F8FAFC",
                    },
                    children: [
                      o.jsx("div", { style: { fontSize: 16 }, children: "🏁" }),
                      o.jsxs("div", {
                        style: { flex: 1 },
                        children: [
                          o.jsx("div", {
                            style: {
                              fontSize: 13,
                              fontWeight: 600,
                              color: "#0F172A",
                            },
                            children: y.title,
                          }),
                          o.jsx("div", {
                            style: {
                              fontSize: 11,
                              color: "#94A3B8",
                              marginTop: 2,
                            },
                            children: Ce(y.startDate),
                          }),
                        ],
                      }),
                      o.jsx(q, { status: "milestone" }),
                      o.jsx(q, { status: y.status }),
                    ],
                  },
                  y.id,
                ),
              ),
          ],
        }),
      l === "team" &&
        o.jsx("div", {
          style: {
            background: "white",
            borderRadius: 12,
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          },
          children: o.jsx(Wt, {
            headers: ["Member", "Role", "Type", "Allocation", "Actions"],
            children: v.map((y) =>
              o.jsxs(
                wt,
                {
                  hover: !0,
                  children: [
                    o.jsx(P, {
                      children: o.jsxs("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        },
                        children: [
                          o.jsx(Xe, {
                            initials: y.avatar,
                            size: 32,
                            color: E.blue,
                          }),
                          o.jsxs("div", {
                            children: [
                              o.jsx("div", {
                                style: { fontWeight: 600, color: "#0F172A" },
                                children: y.name,
                              }),
                              o.jsx("div", {
                                style: { fontSize: 11, color: "#94A3B8" },
                                children: y.email,
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    o.jsx(P, { muted: !0, children: y.role }),
                    o.jsx(P, { children: o.jsx(q, { status: y.type }) }),
                    o.jsx(P, {
                      children:
                        y.type === "fulltime"
                          ? o.jsx("span", {
                              style: { fontSize: 12, color: E.green },
                              children: "Auto-logged (8h/day)",
                            })
                          : o.jsx("span", {
                              style: { fontSize: 12, color: E.amber },
                              children: "AI Chaser Active",
                            }),
                    }),
                    o.jsx(P, {
                      children: o.jsx(L, {
                        variant: "ghost",
                        small: !0,
                        children: "Remove",
                      }),
                    }),
                  ],
                },
                y.id,
              ),
            ),
          }),
        }),
      l === "overview" &&
        o.jsxs("div", {
          style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
          children: [
            o.jsxs("div", {
              style: {
                background: "white",
                borderRadius: 12,
                padding: 20,
                border: "1px solid #E2E8F0",
              },
              children: [
                o.jsx("h4", {
                  style: { margin: "0 0 16px", fontSize: 14, fontWeight: 700 },
                  children: "Project Details",
                }),
                [
                  ["Code", e.code],
                  ["Client", e.client],
                  ["Start Date", Ce(e.startDate)],
                  ["End Date", Ce(e.endDate)],
                  ["Budget", `${e.budget}h`],
                  ["Billable", e.billable ? "Yes" : "No"],
                  ["Status", e.status],
                ].map(([y, S]) =>
                  o.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 0",
                        borderBottom: "1px solid #F8FAFC",
                        fontSize: 13,
                      },
                      children: [
                        o.jsx("span", {
                          style: { color: "#64748B", fontWeight: 500 },
                          children: y,
                        }),
                        o.jsx("span", {
                          style: { color: "#0F172A", fontWeight: 600 },
                          children: S,
                        }),
                      ],
                    },
                    y,
                  ),
                ),
              ],
            }),
            o.jsxs("div", {
              style: {
                background: "white",
                borderRadius: 12,
                padding: 20,
                border: "1px solid #E2E8F0",
              },
              children: [
                o.jsx("h4", {
                  style: { margin: "0 0 16px", fontSize: 14, fontWeight: 700 },
                  children: "Progress",
                }),
                o.jsxs("div", {
                  style: { textAlign: "center", padding: "20px 0" },
                  children: [
                    o.jsxs("div", {
                      style: {
                        fontSize: 48,
                        fontWeight: 800,
                        color: "#3B82F6",
                        fontFamily: "Sora, sans-serif",
                      },
                      children: [e.progress, "%"],
                    }),
                    o.jsx("div", {
                      style: {
                        fontSize: 13,
                        color: "#94A3B8",
                        marginBottom: 16,
                      },
                      children: "Overall Completion",
                    }),
                    o.jsx(mn, { value: e.progress }),
                    o.jsxs("div", {
                      style: {
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 8,
                        fontSize: 12,
                        color: "#94A3B8",
                      },
                      children: [
                        o.jsx("span", { children: "0%" }),
                        o.jsx("span", { children: "100%" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      s &&
        o.jsxs(Nl, {
          title: "Upload WBS",
          onClose: () => u(!1),
          children: [
            o.jsxs("div", {
              style: {
                border: "2px dashed #E2E8F0",
                borderRadius: 10,
                padding: "32px 20px",
                textAlign: "center",
                marginBottom: 16,
                cursor: "pointer",
              },
              onMouseEnter: (y) =>
                (y.currentTarget.style.borderColor = "#3B82F6"),
              onMouseLeave: (y) =>
                (y.currentTarget.style.borderColor = "#E2E8F0"),
              children: [
                o.jsx("div", {
                  style: { fontSize: 32, marginBottom: 8 },
                  children: "📎",
                }),
                o.jsx("div", {
                  style: { fontWeight: 600, color: "#374151", marginBottom: 4 },
                  children: "Drop your WBS file here",
                }),
                o.jsx("div", {
                  style: { fontSize: 12, color: "#94A3B8" },
                  children: "Supports .xlsx, .csv formats",
                }),
              ],
            }),
            o.jsxs("div", {
              style: {
                background: "#F8FAFC",
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
              },
              children: [
                o.jsx("div", {
                  style: {
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 8,
                  },
                  children: "Expected columns:",
                }),
                o.jsx("div", {
                  style: {
                    fontSize: 11,
                    color: "#64748B",
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                  },
                  children: [
                    "Task Name",
                    "Type (task/milestone)",
                    "Milestone",
                    "Assignee Email",
                    "Start Date",
                    "End Date",
                    "Est. Hours",
                  ].map((y) =>
                    o.jsx(
                      "span",
                      {
                        style: {
                          background: "white",
                          border: "1px solid #E2E8F0",
                          padding: "2px 8px",
                          borderRadius: 4,
                        },
                        children: y,
                      },
                      y,
                    ),
                  ),
                }),
              ],
            }),
            o.jsxs("div", {
              style: { display: "flex", gap: 8, justifyContent: "flex-end" },
              children: [
                o.jsx(L, {
                  variant: "secondary",
                  onClick: () => u(!1),
                  children: "Cancel",
                }),
                o.jsx(L, { onClick: () => u(!1), children: "Upload & Import" }),
              ],
            }),
          ],
        }),
    ],
  });
}
function sp({
  timesheets: e,
  setTimesheets: t,
  projects: n,
  tasks: r,
  employees: l,
  currentUser: i,
}) {
  const [s, u] = M.useState(0),
    [a, d] = M.useState(!1),
    [f, g] = M.useState({
      projectId: "",
      taskId: "",
      hours: "",
      description: "",
      date: "",
      billable: !0,
    }),
    [v, h] = M.useState("mine"),
    y = wd(s),
    S = y[0].toISOString().split("T")[0],
    _ = e.filter(
      (x) =>
        x.employeeId === i.id &&
        y.some((k) => k.toISOString().split("T")[0] === x.date),
    ),
    p = _.reduce((x, k) => x + k.hours, 0),
    c = s === 0,
    m = _.some((x) => x.status === "pending" || x.status === "approved"),
    j = () => {
      const x = "ts" + Date.now();
      (t((k) => [
        ...k,
        {
          ...f,
          id: x,
          employeeId: i.id,
          status: "draft",
          weekOf: S,
          hours: parseFloat(f.hours),
        },
      ]),
        g({
          projectId: "",
          taskId: "",
          hours: "",
          description: "",
          date: "",
          billable: !0,
        }),
        d(!1));
    },
    C = () => {
      t((x) =>
        x.map((k) =>
          k.employeeId === i.id && k.status === "draft"
            ? { ...k, status: "pending" }
            : k,
        ),
      );
    };
  return o.jsxs("div", {
    children: [
      o.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        },
        children: [
          o.jsxs("div", {
            children: [
              o.jsx("h2", {
                style: {
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0F172A",
                  fontFamily: "Sora, sans-serif",
                },
                children: "Timesheets",
              }),
              o.jsxs("p", {
                style: { margin: "4px 0 0", color: "#64748B", fontSize: 14 },
                children: [uu(y[0]), " – ", uu(y[6])],
              }),
            ],
          }),
          o.jsxs("div", {
            style: { display: "flex", gap: 8, alignItems: "center" },
            children: [
              o.jsx("div", {
                style: {
                  display: "flex",
                  background: "#F1F5F9",
                  borderRadius: 8,
                  padding: 2,
                },
                children: ["mine", "team"].map((x) =>
                  o.jsx(
                    "button",
                    {
                      onClick: () => h(x),
                      style: {
                        padding: "6px 14px",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                        background: v === x ? "white" : "transparent",
                        color: v === x ? "#0F172A" : "#64748B",
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: "inherit",
                        boxShadow:
                          v === x ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                      },
                      children: x === "mine" ? "My Timesheet" : "Team View",
                    },
                    x,
                  ),
                ),
              }),
              o.jsx(L, {
                variant: "secondary",
                small: !0,
                onClick: () => u((x) => x - 1),
                children: "← Prev",
              }),
              o.jsx(L, {
                variant: "secondary",
                small: !0,
                onClick: () => u(0),
                disabled: c,
                children: "Today",
              }),
              o.jsx(L, {
                variant: "secondary",
                small: !0,
                onClick: () => u((x) => x + 1),
                children: "Next →",
              }),
            ],
          }),
        ],
      }),
      v === "mine"
        ? o.jsxs(o.Fragment, {
            children: [
              o.jsxs("div", {
                style: {
                  display: "flex",
                  gap: 12,
                  marginBottom: 20,
                  background: "white",
                  borderRadius: 12,
                  padding: 16,
                  border: "1px solid #E2E8F0",
                },
                children: [
                  y.map((x) => {
                    const k = x.toISOString().split("T")[0],
                      R = _.filter((O) => O.date === k).reduce(
                        (O, H) => O + H.hours,
                        0,
                      ),
                      B = k === jd.toISOString().split("T")[0],
                      oe = x.getDay() === 0 || x.getDay() === 6;
                    return o.jsxs(
                      "div",
                      {
                        style: {
                          flex: 1,
                          textAlign: "center",
                          padding: "10px 4px",
                          borderRadius: 8,
                          background: B ? "#EFF6FF" : "transparent",
                          border: B
                            ? "1px solid #BFDBFE"
                            : "1px solid transparent",
                        },
                        children: [
                          o.jsx("div", {
                            style: {
                              fontSize: 11,
                              color: "#94A3B8",
                              fontWeight: 600,
                              marginBottom: 4,
                            },
                            children: tp(x),
                          }),
                          o.jsx("div", {
                            style: {
                              fontSize: 18,
                              fontWeight: 700,
                              color:
                                R === 0
                                  ? oe
                                    ? "#E2E8F0"
                                    : "#FCA5A5"
                                  : R >= 8
                                    ? E.green
                                    : E.amber,
                              fontFamily: "Sora, sans-serif",
                            },
                            children: R > 0 ? R : oe ? "–" : "0",
                          }),
                          o.jsx("div", {
                            style: { fontSize: 10, color: "#94A3B8" },
                            children: "hrs",
                          }),
                        ],
                      },
                      k,
                    );
                  }),
                  o.jsx("div", {
                    style: { width: 1, background: "#E2E8F0", margin: "0 8px" },
                  }),
                  o.jsxs("div", {
                    style: { textAlign: "center", padding: "10px 16px" },
                    children: [
                      o.jsx("div", {
                        style: {
                          fontSize: 11,
                          color: "#94A3B8",
                          fontWeight: 600,
                          marginBottom: 4,
                        },
                        children: "TOTAL",
                      }),
                      o.jsx("div", {
                        style: {
                          fontSize: 18,
                          fontWeight: 700,
                          color: "#0F172A",
                          fontFamily: "Sora, sans-serif",
                        },
                        children: p,
                      }),
                      o.jsx("div", {
                        style: { fontSize: 10, color: "#94A3B8" },
                        children: "/ 40h",
                      }),
                    ],
                  }),
                ],
              }),
              o.jsx("div", {
                style: {
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid #E2E8F0",
                  marginBottom: 16,
                  overflow: "hidden",
                },
                children: o.jsx(Wt, {
                  headers: [
                    "Date",
                    "Project",
                    "Task",
                    "Description",
                    "Hours",
                    "Billable",
                    "Status",
                    "",
                  ],
                  children:
                    _.length === 0
                      ? o.jsx(wt, {
                          children: o.jsx("td", {
                            colSpan: 8,
                            style: {
                              padding: 32,
                              textAlign: "center",
                              color: "#94A3B8",
                              fontSize: 13,
                            },
                            children:
                              "No entries for this week. Add your first entry.",
                          }),
                        })
                      : _.map((x) => {
                          const k = n.find((R) => R.id === x.projectId),
                            T = r.find((R) => R.id === x.taskId);
                          return o.jsxs(
                            wt,
                            {
                              hover: !0,
                              children: [
                                o.jsx(P, { muted: !0, children: Ce(x.date) }),
                                o.jsx(P, {
                                  bold: !0,
                                  children:
                                    (k == null ? void 0 : k.name) || "–",
                                }),
                                o.jsx(P, {
                                  muted: !0,
                                  children:
                                    (T == null ? void 0 : T.title) || "–",
                                }),
                                o.jsx(P, {
                                  muted: !0,
                                  children: x.description,
                                }),
                                o.jsxs(P, {
                                  bold: !0,
                                  children: [x.hours, "h"],
                                }),
                                o.jsx(P, {
                                  children: o.jsx(q, {
                                    status: x.billable
                                      ? "billable"
                                      : "nonbillable",
                                  }),
                                }),
                                o.jsx(P, {
                                  children: o.jsx(q, { status: x.status }),
                                }),
                                o.jsx(P, {
                                  children:
                                    x.status === "draft" &&
                                    o.jsx(L, {
                                      variant: "ghost",
                                      small: !0,
                                      children: "Edit",
                                    }),
                                }),
                              ],
                            },
                            x.id,
                          );
                        }),
                }),
              }),
              o.jsxs("div", {
                style: {
                  display: "flex",
                  gap: 8,
                  justifyContent: "space-between",
                },
                children: [
                  o.jsx(L, {
                    variant: "secondary",
                    onClick: () => d(!0),
                    children: "➕ Add Entry",
                  }),
                  o.jsxs("div", {
                    style: { display: "flex", gap: 8 },
                    children: [
                      _.some((x) => x.status === "draft") &&
                        o.jsx(L, {
                          variant: "success",
                          onClick: C,
                          children: "✅ Submit for Approval",
                        }),
                      m &&
                        o.jsx(Bl, {
                          label: `${_.filter((x) => x.status === "approved").length} approved`,
                          color: E.green,
                        }),
                    ],
                  }),
                ],
              }),
            ],
          })
        : o.jsx("div", {
            style: {
              background: "white",
              borderRadius: 12,
              border: "1px solid #E2E8F0",
              overflow: "hidden",
            },
            children: o.jsx(Wt, {
              headers: [
                "Employee",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Total",
                "Status",
              ],
              children: l.map((x) => {
                var oe;
                const k = e.filter(
                    (O) =>
                      O.employeeId === x.id &&
                      y.some((H) => H.toISOString().split("T")[0] === O.date),
                  ),
                  T = y.slice(0, 5).map((O) => {
                    const H = O.toISOString().split("T")[0];
                    return k
                      .filter((Yt) => Yt.date === H)
                      .reduce((Yt, Al) => Yt + Al.hours, 0);
                  }),
                  R = T.reduce((O, H) => O + H, 0),
                  B = k.some((O) => O.status === "pending");
                return o.jsxs(
                  wt,
                  {
                    hover: !0,
                    children: [
                      o.jsx(P, {
                        children: o.jsxs("div", {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          },
                          children: [
                            o.jsx(Xe, {
                              initials: x.avatar,
                              size: 28,
                              color: E.blue,
                            }),
                            o.jsxs("div", {
                              children: [
                                o.jsx("div", {
                                  style: { fontWeight: 600, fontSize: 13 },
                                  children: x.name,
                                }),
                                o.jsx(q, { status: x.type }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      T.map((O, H) =>
                        o.jsx(
                          P,
                          {
                            muted: O === 0,
                            children: o.jsx("span", {
                              style: {
                                color:
                                  O === 0
                                    ? "#FCA5A5"
                                    : O >= 8
                                      ? E.green
                                      : E.amber,
                                fontWeight: O > 0 ? 600 : 400,
                              },
                              children: O > 0 ? `${O}h` : "–",
                            }),
                          },
                          H,
                        ),
                      ),
                      o.jsxs(P, { bold: !0, children: [R, "h"] }),
                      o.jsx(P, {
                        children: B
                          ? o.jsxs("div", {
                              style: { display: "flex", gap: 4 },
                              children: [
                                o.jsx(L, {
                                  variant: "success",
                                  small: !0,
                                  onClick: () =>
                                    t((O) =>
                                      O.map((H) =>
                                        H.employeeId === x.id &&
                                        H.status === "pending"
                                          ? { ...H, status: "approved" }
                                          : H,
                                      ),
                                    ),
                                  children: "✓",
                                }),
                                o.jsx(L, {
                                  variant: "danger",
                                  small: !0,
                                  onClick: () =>
                                    t((O) =>
                                      O.map((H) =>
                                        H.employeeId === x.id &&
                                        H.status === "pending"
                                          ? { ...H, status: "rejected" }
                                          : H,
                                      ),
                                    ),
                                  children: "✗",
                                }),
                              ],
                            })
                          : R === 0
                            ? o.jsx(q, { status: "draft" })
                            : o.jsx(q, {
                                status:
                                  ((oe = k[0]) == null ? void 0 : oe.status) ||
                                  "approved",
                              }),
                      }),
                    ],
                  },
                  x.id,
                );
              }),
            }),
          }),
      a &&
        o.jsxs(Nl, {
          title: "Add Time Entry",
          onClose: () => d(!1),
          children: [
            o.jsx(Z, {
              label: "Date",
              required: !0,
              children: o.jsx(xe, {
                type: "date",
                value: f.date,
                onChange: (x) => g({ ...f, date: x.target.value }),
              }),
            }),
            o.jsx(Z, {
              label: "Project",
              required: !0,
              children: o.jsxs(Ot, {
                value: f.projectId,
                onChange: (x) =>
                  g({ ...f, projectId: x.target.value, taskId: "" }),
                children: [
                  o.jsx("option", { value: "", children: "Select project" }),
                  n
                    .filter(
                      (x) =>
                        x.status === "active" &&
                        x.assignedMembers.includes(i.id),
                    )
                    .map((x) =>
                      o.jsx("option", { value: x.id, children: x.name }, x.id),
                    ),
                ],
              }),
            }),
            f.projectId &&
              o.jsx(Z, {
                label: "Task",
                children: o.jsxs(Ot, {
                  value: f.taskId,
                  onChange: (x) => g({ ...f, taskId: x.target.value }),
                  children: [
                    o.jsx("option", { value: "", children: "Select task" }),
                    r
                      .filter((x) => x.projectId === f.projectId)
                      .map((x) =>
                        o.jsx(
                          "option",
                          { value: x.id, children: x.title },
                          x.id,
                        ),
                      ),
                  ],
                }),
              }),
            o.jsx(Z, {
              label: "Hours",
              required: !0,
              children: o.jsx(xe, {
                type: "number",
                value: f.hours,
                onChange: (x) => g({ ...f, hours: x.target.value }),
                placeholder: "8",
              }),
            }),
            o.jsx(Z, {
              label: "Description",
              children: o.jsx(np, {
                value: f.description,
                onChange: (x) => g({ ...f, description: x.target.value }),
                placeholder: "What did you work on?",
              }),
            }),
            o.jsx(Z, {
              label: "Billable",
              children: o.jsxs(Ot, {
                value: f.billable,
                onChange: (x) =>
                  g({ ...f, billable: x.target.value === "true" }),
                children: [
                  o.jsx("option", { value: "true", children: "Billable" }),
                  o.jsx("option", { value: "false", children: "Non-Billable" }),
                ],
              }),
            }),
            o.jsxs("div", {
              style: { display: "flex", gap: 8, justifyContent: "flex-end" },
              children: [
                o.jsx(L, {
                  variant: "secondary",
                  onClick: () => d(!1),
                  children: "Cancel",
                }),
                o.jsx(L, {
                  onClick: j,
                  disabled: !f.date || !f.projectId || !f.hours,
                  children: "Save Entry",
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
function up({ employees: e, incidents: t }) {
  const [n, r] = M.useState(!1),
    [l, i] = M.useState(!1),
    [s, u] = M.useState(!1),
    a = () => {
      (i(!0),
        setTimeout(() => {
          (i(!1), u(!0), setTimeout(() => r(!1), 1500));
        }, 2e3));
    },
    d = (f) => t.filter((g) => g.employeeId === f && !g.resolved).length;
  return o.jsxs("div", {
    children: [
      o.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        },
        children: [
          o.jsxs("div", {
            children: [
              o.jsx("h2", {
                style: {
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#0F172A",
                  fontFamily: "Sora, sans-serif",
                },
                children: "Team Members",
              }),
              o.jsxs("p", {
                style: { margin: "4px 0 0", color: "#64748B", fontSize: 14 },
                children: ["Synced from Keka HR · ", e.length, " members"],
              }),
            ],
          }),
          o.jsx(L, {
            variant: "secondary",
            onClick: () => r(!0),
            children: "🔄 Sync from Keka",
          }),
        ],
      }),
      o.jsx("div", {
        style: {
          background: "white",
          borderRadius: 12,
          border: "1px solid #E2E8F0",
          overflow: "hidden",
        },
        children: o.jsx(Wt, {
          headers: [
            "Employee",
            "Department",
            "Role",
            "Type",
            "Keka ID",
            "Compliance",
            "Actions",
          ],
          children: e.map((f) => {
            const g = d(f.id);
            return o.jsxs(
              wt,
              {
                hover: !0,
                children: [
                  o.jsx(P, {
                    children: o.jsxs("div", {
                      style: { display: "flex", alignItems: "center", gap: 10 },
                      children: [
                        o.jsx(Xe, {
                          initials: f.avatar,
                          size: 36,
                          color: E.blue,
                        }),
                        o.jsxs("div", {
                          children: [
                            o.jsx("div", {
                              style: { fontWeight: 600, color: "#0F172A" },
                              children: f.name,
                            }),
                            o.jsx("div", {
                              style: { fontSize: 11, color: "#94A3B8" },
                              children: f.email,
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  o.jsx(P, { muted: !0, children: f.department }),
                  o.jsx(P, {
                    muted: !0,
                    style: { textTransform: "capitalize" },
                    children: f.role,
                  }),
                  o.jsx(P, { children: o.jsx(q, { status: f.type }) }),
                  o.jsx(P, { muted: !0, children: f.kekaId }),
                  o.jsx(P, {
                    children:
                      g > 0
                        ? o.jsxs("span", {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              color: E.red,
                              fontSize: 12,
                              fontWeight: 600,
                            },
                            children: ["⚠️ ", g, " open"],
                          })
                        : o.jsx("span", {
                            style: {
                              color: E.green,
                              fontSize: 12,
                              fontWeight: 600,
                            },
                            children: "✅ Clear",
                          }),
                  }),
                  o.jsx(P, {
                    children: o.jsxs("div", {
                      style: { display: "flex", gap: 4 },
                      children: [
                        o.jsx(L, {
                          variant: "ghost",
                          small: !0,
                          children: "View",
                        }),
                        f.type === "parttime" &&
                          o.jsx(L, {
                            variant: "secondary",
                            small: !0,
                            children: "📩 Chase",
                          }),
                      ],
                    }),
                  }),
                ],
              },
              f.id,
            );
          }),
        }),
      }),
      n &&
        o.jsx(Nl, {
          title: "Sync from Keka",
          onClose: () => r(!1),
          children:
            !l && !s
              ? o.jsxs(o.Fragment, {
                  children: [
                    o.jsx("div", {
                      style: {
                        background: "#EFF6FF",
                        borderRadius: 8,
                        padding: 14,
                        marginBottom: 16,
                        fontSize: 13,
                        color: "#1D4ED8",
                      },
                      children:
                        "🔗 Connected to Keka API · Last synced: 2 hours ago",
                    }),
                    o.jsx("p", {
                      style: {
                        fontSize: 13,
                        color: "#374151",
                        margin: "0 0 16px",
                      },
                      children:
                        "This will sync employee data from Keka including names, departments, roles, and employment type. Existing records will be updated.",
                    }),
                    o.jsxs("div", {
                      style: {
                        display: "flex",
                        gap: 8,
                        justifyContent: "flex-end",
                      },
                      children: [
                        o.jsx(L, {
                          variant: "secondary",
                          onClick: () => r(!1),
                          children: "Cancel",
                        }),
                        o.jsx(L, { onClick: a, children: "Start Sync" }),
                      ],
                    }),
                  ],
                })
              : l
                ? o.jsxs("div", {
                    style: { textAlign: "center", padding: "20px 0" },
                    children: [
                      o.jsx("div", {
                        style: {
                          fontSize: 32,
                          marginBottom: 12,
                          animation: "spin 1s linear infinite",
                        },
                        children: "🔄",
                      }),
                      o.jsx("div", {
                        style: {
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#0F172A",
                        },
                        children: "Syncing from Keka...",
                      }),
                      o.jsx("div", {
                        style: { fontSize: 12, color: "#94A3B8", marginTop: 4 },
                        children: "Fetching employee records",
                      }),
                    ],
                  })
                : o.jsxs("div", {
                    style: { textAlign: "center", padding: "20px 0" },
                    children: [
                      o.jsx("div", {
                        style: { fontSize: 32, marginBottom: 12 },
                        children: "✅",
                      }),
                      o.jsx("div", {
                        style: {
                          fontSize: 14,
                          fontWeight: 600,
                          color: E.green,
                        },
                        children: "Sync Complete!",
                      }),
                      o.jsxs("div", {
                        style: { fontSize: 12, color: "#94A3B8", marginTop: 4 },
                        children: [e.length, " records updated"],
                      }),
                    ],
                  }),
        }),
    ],
  });
}
function ap({ timesheets: e, employees: t, projects: n, incidents: r }) {
  const [l, i] = M.useState("utilization"),
    s = e.filter((h) => h.status === "approved" || h.status === "pending"),
    u = s.reduce((h, y) => h + y.hours, 0),
    a = s.filter((h) => h.billable).reduce((h, y) => h + y.hours, 0),
    d = s.filter((h) => !h.billable).reduce((h, y) => h + y.hours, 0),
    f = t.map((h) => {
      const y = s.filter((c) => c.employeeId === h.id),
        S = y.filter((c) => c.billable).reduce((c, m) => c + m.hours, 0),
        _ = y.filter((c) => !c.billable).reduce((c, m) => c + m.hours, 0),
        p = r.filter((c) => c.employeeId === h.id);
      return {
        ...h,
        billable: S,
        nonBillable: _,
        total: S + _,
        incidentCount: p.length,
      };
    }),
    g = n.map((h) => {
      const S = s
          .filter((p) => p.projectId === h.id)
          .reduce((p, c) => p + c.hours, 0),
        _ = ((S / h.budget) * 100).toFixed(1);
      return { ...h, logged: S, utilizationPct: _ };
    }),
    v = [
      { id: "utilization", label: "Resource Utilization" },
      { id: "billability", label: "Billable / Non-Billable" },
      { id: "project", label: "Project Summary" },
      { id: "compliance", label: "Compliance" },
    ];
  return o.jsxs("div", {
    children: [
      o.jsxs("div", {
        style: { marginBottom: 24 },
        children: [
          o.jsx("h2", {
            style: {
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              color: "#0F172A",
              fontFamily: "Sora, sans-serif",
            },
            children: "Reports",
          }),
          o.jsx("p", {
            style: { margin: "4px 0 0", color: "#64748B", fontSize: 14 },
            children: "Analytics across all projects and team members",
          }),
        ],
      }),
      o.jsxs("div", {
        style: { display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" },
        children: [
          o.jsx(Je, {
            label: "Total Hours",
            value: `${u}h`,
            color: E.blue,
            icon: "⏱️",
          }),
          o.jsx(Je, {
            label: "Billable",
            value: `${a}h`,
            sub: `${((a / u) * 100).toFixed(0)}% of total`,
            color: E.green,
            icon: "💰",
          }),
          o.jsx(Je, {
            label: "Non-Billable",
            value: `${d}h`,
            sub: `${((d / u) * 100).toFixed(0)}% of total`,
            color: E.slate,
            icon: "📋",
          }),
          o.jsx(Je, {
            label: "Compliance Issues",
            value: r.filter((h) => !h.resolved).length,
            color: E.amber,
            icon: "⚠️",
          }),
        ],
      }),
      o.jsxs("div", {
        style: {
          display: "flex",
          gap: 8,
          marginBottom: 20,
          borderBottom: "1px solid #E2E8F0",
          paddingBottom: 0,
        },
        children: [
          v.map((h) =>
            o.jsx(
              "button",
              {
                onClick: () => i(h.id),
                style: {
                  padding: "8px 14px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  color: l === h.id ? "#3B82F6" : "#64748B",
                  borderBottom:
                    l === h.id ? "2px solid #3B82F6" : "2px solid transparent",
                  marginBottom: -1,
                  fontFamily: "inherit",
                },
                children: h.label,
              },
              h.id,
            ),
          ),
          o.jsx("div", {
            style: { marginLeft: "auto", paddingBottom: 8 },
            children: o.jsx(L, {
              variant: "secondary",
              small: !0,
              children: "📥 Export CSV",
            }),
          }),
        ],
      }),
      l === "utilization" &&
        o.jsx("div", {
          style: {
            background: "white",
            borderRadius: 12,
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          },
          children: o.jsx(Wt, {
            headers: [
              "Employee",
              "Type",
              "Total Hours",
              "Billable",
              "Non-Billable",
              "Billability %",
              "Incidents",
            ],
            children: f
              .sort((h, y) => y.total - h.total)
              .map((h) =>
                o.jsxs(
                  wt,
                  {
                    hover: !0,
                    children: [
                      o.jsx(P, {
                        children: o.jsxs("div", {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          },
                          children: [
                            o.jsx(Xe, {
                              initials: h.avatar,
                              size: 30,
                              color: E.blue,
                            }),
                            o.jsx("span", {
                              style: { fontWeight: 600 },
                              children: h.name,
                            }),
                          ],
                        }),
                      }),
                      o.jsx(P, { children: o.jsx(q, { status: h.type }) }),
                      o.jsxs(P, { bold: !0, children: [h.total, "h"] }),
                      o.jsx(P, {
                        children: o.jsxs("span", {
                          style: { color: E.green, fontWeight: 600 },
                          children: [h.billable, "h"],
                        }),
                      }),
                      o.jsxs(P, { muted: !0, children: [h.nonBillable, "h"] }),
                      o.jsx(P, {
                        children: o.jsxs("div", {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          },
                          children: [
                            o.jsx("div", {
                              style: { flex: 1, maxWidth: 80 },
                              children: o.jsx(mn, {
                                value: h.total
                                  ? (h.billable / h.total) * 100
                                  : 0,
                                color: E.green,
                              }),
                            }),
                            o.jsxs("span", {
                              style: {
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#374151",
                              },
                              children: [
                                h.total
                                  ? ((h.billable / h.total) * 100).toFixed(0)
                                  : 0,
                                "%",
                              ],
                            }),
                          ],
                        }),
                      }),
                      o.jsx(P, {
                        children:
                          h.incidentCount > 0
                            ? o.jsx(Bl, {
                                label: `${h.incidentCount}`,
                                color: E.red,
                                small: !0,
                              })
                            : o.jsx("span", {
                                style: { color: E.green, fontSize: 12 },
                                children: "✅",
                              }),
                      }),
                    ],
                  },
                  h.id,
                ),
              ),
          }),
        }),
      l === "billability" &&
        o.jsxs("div", {
          style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
          children: [
            o.jsxs("div", {
              style: {
                background: "white",
                borderRadius: 12,
                padding: 24,
                border: "1px solid #E2E8F0",
              },
              children: [
                o.jsx("h4", {
                  style: { margin: "0 0 20px", fontSize: 14, fontWeight: 700 },
                  children: "Hours Breakdown",
                }),
                o.jsx("div", {
                  style: { display: "flex", gap: 16, marginBottom: 24 },
                  children: [
                    { label: "Billable", value: a, color: E.green },
                    { label: "Non-Billable", value: d, color: E.slate },
                  ].map((h) =>
                    o.jsxs(
                      "div",
                      {
                        style: {
                          flex: 1,
                          background: h.color + "08",
                          border: `1px solid ${h.color}22`,
                          borderRadius: 10,
                          padding: 16,
                          textAlign: "center",
                        },
                        children: [
                          o.jsxs("div", {
                            style: {
                              fontSize: 28,
                              fontWeight: 800,
                              color: h.color,
                              fontFamily: "Sora, sans-serif",
                            },
                            children: [h.value, "h"],
                          }),
                          o.jsx("div", {
                            style: {
                              fontSize: 12,
                              color: "#94A3B8",
                              marginTop: 4,
                            },
                            children: h.label,
                          }),
                          o.jsxs("div", {
                            style: {
                              fontSize: 20,
                              fontWeight: 700,
                              color: h.color,
                              marginTop: 8,
                            },
                            children: [((h.value / u) * 100).toFixed(1), "%"],
                          }),
                        ],
                      },
                      h.label,
                    ),
                  ),
                }),
                o.jsxs("div", {
                  style: {
                    height: 20,
                    borderRadius: 99,
                    display: "flex",
                    overflow: "hidden",
                  },
                  children: [
                    o.jsx("div", {
                      style: {
                        width: `${(a / u) * 100}%`,
                        background: E.green,
                      },
                    }),
                    o.jsx("div", {
                      style: { flex: 1, background: E.slate + "44" },
                    }),
                  ],
                }),
              ],
            }),
            o.jsxs("div", {
              style: {
                background: "white",
                borderRadius: 12,
                padding: 24,
                border: "1px solid #E2E8F0",
              },
              children: [
                o.jsx("h4", {
                  style: { margin: "0 0 20px", fontSize: 14, fontWeight: 700 },
                  children: "By Project",
                }),
                g
                  .filter((h) => h.logged > 0)
                  .map((h) =>
                    o.jsxs(
                      "div",
                      {
                        style: { marginBottom: 14 },
                        children: [
                          o.jsxs("div", {
                            style: {
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: 4,
                            },
                            children: [
                              o.jsx("span", {
                                style: { fontSize: 13, fontWeight: 600 },
                                children: h.name,
                              }),
                              o.jsxs("div", {
                                style: { display: "flex", gap: 6 },
                                children: [
                                  o.jsxs("span", {
                                    style: { fontSize: 12, color: "#64748B" },
                                    children: [h.logged, "h"],
                                  }),
                                  o.jsx(q, {
                                    status: h.billable
                                      ? "billable"
                                      : "nonbillable",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          o.jsx(mn, {
                            value: parseFloat(h.utilizationPct),
                            color: h.billable ? E.green : E.slate,
                          }),
                          o.jsxs("div", {
                            style: {
                              fontSize: 11,
                              color: "#94A3B8",
                              marginTop: 2,
                            },
                            children: [
                              h.utilizationPct,
                              "% of ",
                              h.budget,
                              "h budget used",
                            ],
                          }),
                        ],
                      },
                      h.id,
                    ),
                  ),
              ],
            }),
          ],
        }),
      l === "project" &&
        o.jsx("div", {
          style: {
            background: "white",
            borderRadius: 12,
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          },
          children: o.jsx(Wt, {
            headers: [
              "Project",
              "Client",
              "Status",
              "Budget",
              "Logged",
              "Remaining",
              "Utilization",
              "Billable",
            ],
            children: g.map((h) =>
              o.jsxs(
                wt,
                {
                  hover: !0,
                  children: [
                    o.jsx(P, { bold: !0, children: h.name }),
                    o.jsx(P, { muted: !0, children: h.client }),
                    o.jsx(P, { children: o.jsx(q, { status: h.status }) }),
                    o.jsxs(P, { muted: !0, children: [h.budget, "h"] }),
                    o.jsxs(P, { bold: !0, children: [h.logged, "h"] }),
                    o.jsxs(P, {
                      muted: !0,
                      children: [Math.max(0, h.budget - h.logged), "h"],
                    }),
                    o.jsx(P, {
                      children: o.jsxs("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        },
                        children: [
                          o.jsx("div", {
                            style: { width: 60 },
                            children: o.jsx(mn, {
                              value: parseFloat(h.utilizationPct),
                              color:
                                parseFloat(h.utilizationPct) > 90
                                  ? E.red
                                  : E.blue,
                            }),
                          }),
                          o.jsxs("span", {
                            style: { fontSize: 12, fontWeight: 600 },
                            children: [h.utilizationPct, "%"],
                          }),
                        ],
                      }),
                    }),
                    o.jsx(P, {
                      children: o.jsx(q, {
                        status: h.billable ? "billable" : "nonbillable",
                      }),
                    }),
                  ],
                },
                h.id,
              ),
            ),
          }),
        }),
      l === "compliance" &&
        o.jsx("div", {
          children: o.jsx("div", {
            style: {
              background: "white",
              borderRadius: 12,
              border: "1px solid #E2E8F0",
              overflow: "hidden",
            },
            children: o.jsx(Wt, {
              headers: [
                "Employee",
                "Type",
                "Week Of",
                "Chases Sent",
                "Status",
                "Incident #",
              ],
              children: r.map((h, y) => {
                const S = t.find((_) => _.id === h.employeeId);
                return o.jsxs(
                  wt,
                  {
                    hover: !0,
                    children: [
                      o.jsx(P, {
                        children: o.jsxs("div", {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          },
                          children: [
                            o.jsx(Xe, {
                              initials: S == null ? void 0 : S.avatar,
                              size: 28,
                              color: E.amber,
                            }),
                            o.jsx("span", {
                              style: { fontWeight: 600 },
                              children: S == null ? void 0 : S.name,
                            }),
                          ],
                        }),
                      }),
                      o.jsx(P, { muted: !0, children: "Missing Timesheet" }),
                      o.jsx(P, { muted: !0, children: Ce(h.weekOf) }),
                      o.jsx(P, {
                        children: o.jsxs("span", {
                          style: {
                            color: h.chaseSent >= 3 ? E.red : E.amber,
                            fontWeight: 600,
                          },
                          children: [h.chaseSent, " / 3"],
                        }),
                      }),
                      o.jsx(P, {
                        children: o.jsx(q, {
                          status: h.resolved ? "approved" : "pending",
                        }),
                      }),
                      o.jsxs(P, {
                        muted: !0,
                        children: ["INC-", String(y + 1).padStart(4, "0")],
                      }),
                    ],
                  },
                  h.id,
                );
              }),
            }),
          }),
        }),
    ],
  });
}
function dp() {
  const [e, t] = M.useState("••••••••••••••••"),
    [n, r] = M.useState("https://outlook.webhook.office.com/..."),
    [l, i] = M.useState("5"),
    [s, u] = M.useState("3"),
    [a, d] = M.useState(!1);
  return o.jsxs("div", {
    children: [
      o.jsxs("div", {
        style: { marginBottom: 24 },
        children: [
          o.jsx("h2", {
            style: {
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              color: "#0F172A",
              fontFamily: "Sora, sans-serif",
            },
            children: "Settings",
          }),
          o.jsx("p", {
            style: { margin: "4px 0 0", color: "#64748B", fontSize: 14 },
            children:
              "Configure integrations, notifications, and role policies",
          }),
        ],
      }),
      o.jsxs("div", {
        style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
        children: [
          o.jsxs("div", {
            style: {
              background: "white",
              borderRadius: 12,
              padding: 24,
              border: "1px solid #E2E8F0",
            },
            children: [
              o.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                },
                children: [
                  o.jsx("div", {
                    style: {
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#DBEAFE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    },
                    children: "🔗",
                  }),
                  o.jsxs("div", {
                    children: [
                      o.jsx("h3", {
                        style: { margin: 0, fontSize: 14, fontWeight: 700 },
                        children: "Keka HR Integration",
                      }),
                      o.jsxs("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          marginTop: 2,
                        },
                        children: [
                          o.jsx("div", {
                            style: {
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: E.green,
                            },
                          }),
                          o.jsx("span", {
                            style: { fontSize: 11, color: E.green },
                            children: "Connected",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              o.jsx(Z, {
                label: "API Token",
                children: o.jsx(xe, {
                  value: e,
                  onChange: (f) => t(f.target.value),
                  type: "password",
                }),
              }),
              o.jsx(Z, {
                label: "Base URL",
                children: o.jsx(xe, {
                  value: "https://api.keka.com/v1",
                  readOnly: !0,
                  style: { background: "#F8FAFC" },
                }),
              }),
              o.jsx(Z, {
                label: "Auto-sync Schedule",
                children: o.jsxs(Ot, {
                  value: "daily",
                  children: [
                    o.jsx("option", { children: "Daily at 6 AM" }),
                    o.jsx("option", { children: "Every 12 hours" }),
                    o.jsx("option", { children: "Manual only" }),
                  ],
                }),
              }),
              o.jsx(L, { variant: "secondary", children: "Test Connection" }),
            ],
          }),
          o.jsxs("div", {
            style: {
              background: "white",
              borderRadius: 12,
              padding: 24,
              border: "1px solid #E2E8F0",
            },
            children: [
              o.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                },
                children: [
                  o.jsx("div", {
                    style: {
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#F3E8FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    },
                    children: "🔔",
                  }),
                  o.jsx("h3", {
                    style: { margin: 0, fontSize: 14, fontWeight: 700 },
                    children: "Notification Settings",
                  }),
                ],
              }),
              o.jsx(Z, {
                label: "MS Teams Webhook URL",
                children: o.jsx(xe, {
                  value: n,
                  onChange: (f) => r(f.target.value),
                }),
              }),
              o.jsx(Z, {
                label: "Chase after (working days without entry)",
                children: o.jsx(xe, {
                  type: "number",
                  value: l,
                  onChange: (f) => i(f.target.value),
                }),
              }),
              o.jsx(Z, {
                label: "Max chase notifications per week",
                children: o.jsx(xe, {
                  type: "number",
                  value: s,
                  onChange: (f) => u(f.target.value),
                }),
              }),
              o.jsx(Z, {
                label: "AI Chase Channel",
                children: o.jsxs(Ot, {
                  children: [
                    o.jsx("option", { children: "MS Teams + Email" }),
                    o.jsx("option", { children: "MS Teams only" }),
                    o.jsx("option", { children: "Email only" }),
                  ],
                }),
              }),
            ],
          }),
          o.jsxs("div", {
            style: {
              background: "white",
              borderRadius: 12,
              padding: 24,
              border: "1px solid #E2E8F0",
            },
            children: [
              o.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                },
                children: [
                  o.jsx("div", {
                    style: {
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#FEF3C7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    },
                    children: "🔐",
                  }),
                  o.jsx("h3", {
                    style: { margin: 0, fontSize: 14, fontWeight: 700 },
                    children: "Role Permissions",
                  }),
                ],
              }),
              [
                {
                  role: "Admin",
                  permissions: [
                    "All access",
                    "Manage roles",
                    "Override anything",
                  ],
                },
                {
                  role: "Project Manager",
                  permissions: [
                    "Manage projects",
                    "Approve timesheets",
                    "View all reports",
                    "Override entries",
                  ],
                },
                {
                  role: "Employee",
                  permissions: [
                    "Fill timesheet",
                    "View own data",
                    "View assigned projects",
                  ],
                },
              ].map((f) =>
                o.jsxs(
                  "div",
                  {
                    style: {
                      marginBottom: 14,
                      paddingBottom: 14,
                      borderBottom: "1px solid #F1F5F9",
                    },
                    children: [
                      o.jsx("div", {
                        style: {
                          fontWeight: 700,
                          fontSize: 13,
                          color: "#0F172A",
                          marginBottom: 6,
                        },
                        children: f.role,
                      }),
                      o.jsx("div", {
                        style: { display: "flex", gap: 6, flexWrap: "wrap" },
                        children: f.permissions.map((g) =>
                          o.jsx(Bl, { label: g, color: E.slate, small: !0 }, g),
                        ),
                      }),
                    ],
                  },
                  f.role,
                ),
              ),
            ],
          }),
          o.jsxs("div", {
            style: {
              background: "white",
              borderRadius: 12,
              padding: 24,
              border: "1px solid #E2E8F0",
            },
            children: [
              o.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                },
                children: [
                  o.jsx("div", {
                    style: {
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#ECFDF5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    },
                    children: "🤖",
                  }),
                  o.jsxs("div", {
                    children: [
                      o.jsx("h3", {
                        style: { margin: 0, fontSize: 14, fontWeight: 700 },
                        children: "AI Timesheet Agent",
                      }),
                      o.jsx("div", {
                        style: { fontSize: 11, color: "#64748B", marginTop: 2 },
                        children: "Powered by Claude AI",
                      }),
                    ],
                  }),
                ],
              }),
              o.jsx("div", {
                style: {
                  background: "#F0FDF4",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                  fontSize: 13,
                  color: "#166534",
                },
                children:
                  "✅ Agent is active · Chasing 2 part-time employees this week",
              }),
              o.jsx("p", {
                style: { fontSize: 13, color: "#64748B", margin: "0 0 14px" },
                children:
                  "The AI agent automatically sends personalized chase messages to part-time employees when timesheets are overdue. Users can reply directly from Teams or Outlook to fill their timesheet via conversation.",
              }),
              o.jsx(Z, {
                label: "Claude API Key",
                children: o.jsx(xe, {
                  value: "sk-ant-•••••••••••••••",
                  type: "password",
                }),
              }),
              o.jsx(Z, {
                label: "Chase Message Tone",
                children: o.jsxs(Ot, {
                  children: [
                    o.jsx("option", { children: "Friendly" }),
                    o.jsx("option", { children: "Formal" }),
                    o.jsx("option", { children: "Urgent" }),
                  ],
                }),
              }),
              o.jsxs("div", {
                style: { display: "flex", gap: 8, marginTop: 8 },
                children: [
                  o.jsx(L, {
                    variant: "secondary",
                    children: "Preview Message",
                  }),
                  o.jsx(L, { children: "Save Config" }),
                ],
              }),
            ],
          }),
        ],
      }),
      a &&
        o.jsx("div", {
          style: {
            position: "fixed",
            bottom: 24,
            right: 24,
            background: E.green,
            color: "white",
            padding: "10px 20px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
          },
          children: "✅ Settings saved",
        }),
    ],
  });
}
function cp({ onClose: e, employees: t, incidents: n }) {
  var f;
  const [r, l] = M.useState(0),
    [i, s] = M.useState(""),
    u = n.filter((g) => !g.resolved),
    a = t.find((g) => {
      var v;
      return g.id === ((v = u[0]) == null ? void 0 : v.employeeId);
    }),
    d = [
      {
        label: "AI Compose",
        content: `Hi ${((f = a == null ? void 0 : a.name) == null ? void 0 : f.split(" ")[0]) || "there"}! 👋

I noticed your timesheet for the week of Apr 28 hasn't been submitted yet. Could you quickly log your hours?

Simply reply with:
• Project name
• Hours worked
• Brief description

You can fill it right here in Teams! I'll take care of the rest. 😊

— TimeTrack AI`,
      },
      { label: "Employee Reply", content: i },
      {
        label: "AI Parsed",
        content: `✅ Got it! I've logged the following entries for you:

📌 Phoenix Portal - API work: 4h (billable)
📌 DataLake Migration - Planning: 2h (non-billable)

Total: 6h for week of Apr 28

Submitting for your manager's approval now!`,
      },
    ];
  return o.jsxs("div", {
    style: {
      position: "fixed",
      right: 24,
      bottom: 24,
      width: 380,
      background: "white",
      borderRadius: 14,
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      border: "1px solid #E2E8F0",
      overflow: "hidden",
      zIndex: 500,
    },
    children: [
      o.jsxs("div", {
        style: {
          background: "#0F172A",
          padding: "14px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        children: [
          o.jsxs("div", {
            style: { display: "flex", alignItems: "center", gap: 8 },
            children: [
              o.jsx("div", {
                style: {
                  width: 28,
                  height: 28,
                  background: "#3B82F6",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                },
                children: "🤖",
              }),
              o.jsxs("div", {
                children: [
                  o.jsx("div", {
                    style: { color: "white", fontSize: 13, fontWeight: 600 },
                    children: "TimeTrack AI Agent",
                  }),
                  o.jsxs("div", {
                    style: { color: "#64748B", fontSize: 11 },
                    children: ["Chasing: ", a == null ? void 0 : a.name],
                  }),
                ],
              }),
            ],
          }),
          o.jsx("button", {
            onClick: e,
            style: {
              color: "#64748B",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 18,
            },
            children: "×",
          }),
        ],
      }),
      o.jsxs("div", {
        style: { padding: 16 },
        children: [
          o.jsxs("div", {
            style: { marginBottom: 12 },
            children: [
              o.jsx("div", {
                style: {
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#94A3B8",
                  marginBottom: 8,
                  letterSpacing: "0.06em",
                },
                children: "TEAMS MESSAGE PREVIEW",
              }),
              r >= 0 &&
                o.jsxs("div", {
                  style: {
                    background: "#EFF6FF",
                    borderRadius: 10,
                    borderTopLeftRadius: 2,
                    padding: 12,
                    marginBottom: 8,
                  },
                  children: [
                    o.jsx("div", {
                      style: {
                        fontSize: 10,
                        color: "#94A3B8",
                        marginBottom: 4,
                      },
                      children: "TimeTrack AI · just now",
                    }),
                    o.jsx("div", {
                      style: {
                        fontSize: 13,
                        color: "#1E3A5F",
                        lineHeight: 1.5,
                        whiteSpace: "pre-line",
                      },
                      children: d[0].content,
                    }),
                  ],
                }),
              r >= 1 &&
                o.jsxs("div", {
                  style: {
                    background: "#F8FAFC",
                    borderRadius: 10,
                    borderTopRightRadius: 2,
                    padding: 12,
                    marginBottom: 8,
                    marginLeft: 24,
                  },
                  children: [
                    o.jsxs("div", {
                      style: {
                        fontSize: 10,
                        color: "#94A3B8",
                        marginBottom: 4,
                      },
                      children: [a == null ? void 0 : a.name, " · 2m ago"],
                    }),
                    o.jsx("div", {
                      style: {
                        fontSize: 13,
                        color: "#374151",
                        lineHeight: 1.5,
                      },
                      children:
                        "Phoenix Portal 4h API work, DataLake 2h planning",
                    }),
                  ],
                }),
              r >= 2 &&
                o.jsxs("div", {
                  style: {
                    background: "#F0FDF4",
                    borderRadius: 10,
                    borderTopLeftRadius: 2,
                    padding: 12,
                  },
                  children: [
                    o.jsx("div", {
                      style: {
                        fontSize: 10,
                        color: "#94A3B8",
                        marginBottom: 4,
                      },
                      children: "TimeTrack AI · just now",
                    }),
                    o.jsx("div", {
                      style: {
                        fontSize: 13,
                        color: "#166534",
                        lineHeight: 1.5,
                        whiteSpace: "pre-line",
                      },
                      children: d[2].content,
                    }),
                  ],
                }),
            ],
          }),
          r === 0 &&
            o.jsx(L, {
              style: { width: "100%", justifyContent: "center" },
              onClick: () => l(1),
              children: "📤 Send Chase Message",
            }),
          r === 1 &&
            o.jsxs("div", {
              children: [
                o.jsx(xe, {
                  value: i,
                  onChange: (g) => s(g.target.value),
                  placeholder: "Simulate employee reply...",
                }),
                o.jsx(L, {
                  style: {
                    width: "100%",
                    justifyContent: "center",
                    marginTop: 8,
                  },
                  onClick: () => l(2),
                  children: "✅ Parse & Log Hours",
                }),
              ],
            }),
          r === 2 &&
            o.jsx(L, {
              variant: "success",
              style: { width: "100%", justifyContent: "center" },
              onClick: e,
              children: "🎉 Done · Close",
            }),
        ],
      }),
    ],
  });
}
const fp = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "projects", label: "Projects", icon: "🗂️" },
  { id: "timesheets", label: "Timesheets", icon: "⏱️" },
  { id: "team", label: "Team", icon: "👥" },
  { id: "reports", label: "Reports", icon: "📈" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];
function pp() {
  const [e, t] = M.useState("dashboard"),
    [n, r] = M.useState(null),
    [l, i] = M.useState(qf),
    [s] = M.useState(ep),
    [u, a] = M.useState(3),
    [d, f] = M.useState(!1),
    g = (h) => {
      (r(h), t("projectDetail"));
    },
    v = () => {
      switch (e) {
        case "dashboard":
          return o.jsx(lp, {
            timesheets: l,
            incidents: s,
            projects: Dt,
            employees: _t,
          });
        case "projects":
          return o.jsx(ip, { projects: Dt, employees: _t, onSelectProject: g });
        case "projectDetail":
          return o.jsx(op, {
            project: n,
            employees: _t,
            tasks: su,
            onBack: () => t("projects"),
          });
        case "timesheets":
          return o.jsx(sp, {
            timesheets: l,
            setTimesheets: i,
            projects: Dt,
            tasks: su,
            employees: _t,
            currentUser: Jf,
          });
        case "team":
          return o.jsx(up, { employees: _t, incidents: s });
        case "reports":
          return o.jsx(ap, {
            timesheets: l,
            employees: _t,
            projects: Dt,
            incidents: s,
          });
        case "settings":
          return o.jsx(dp, {});
        default:
          return null;
      }
    };
  return o.jsxs(o.Fragment, {
    children: [
      o.jsx("style", {
        children: `
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'DM Sans', sans-serif; background: #F8FAFC; }
        input, select, textarea, button { font-family: 'DM Sans', sans-serif; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }
      `,
      }),
      o.jsxs("div", {
        style: { display: "flex", height: "100vh", overflow: "hidden" },
        children: [
          o.jsxs("div", {
            style: {
              width: 220,
              background: "#0F172A",
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
              overflow: "hidden",
            },
            children: [
              o.jsx("div", {
                style: {
                  padding: "22px 20px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                },
                children: o.jsxs("div", {
                  style: { display: "flex", alignItems: "center", gap: 10 },
                  children: [
                    o.jsx("div", {
                      style: {
                        width: 32,
                        height: 32,
                        background: "#3B82F6",
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                      },
                      children: "⏱",
                    }),
                    o.jsxs("div", {
                      children: [
                        o.jsx("div", {
                          style: {
                            color: "white",
                            fontSize: 14,
                            fontWeight: 700,
                            fontFamily: "Sora, sans-serif",
                            letterSpacing: "-0.02em",
                          },
                          children: "TimeTrack",
                        }),
                        o.jsx("div", {
                          style: {
                            color: "#475569",
                            fontSize: 10,
                            fontWeight: 500,
                          },
                          children: "Pro",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              o.jsxs("nav", {
                style: { flex: 1, padding: "12px 10px", overflow: "auto" },
                children: [
                  fp.map((h) => {
                    const y =
                      e === h.id ||
                      (h.id === "projects" && e === "projectDetail");
                    return o.jsxs(
                      "button",
                      {
                        onClick: () => {
                          (t(h.id), r(null));
                        },
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          width: "100%",
                          padding: "9px 12px",
                          borderRadius: 8,
                          border: "none",
                          cursor: "pointer",
                          background: y ? "#1E293B" : "transparent",
                          color: y ? "white" : "#64748B",
                          fontSize: 13,
                          fontWeight: y ? 600 : 400,
                          marginBottom: 2,
                          fontFamily: "inherit",
                          transition: "all 0.15s",
                          boxShadow: y
                            ? "inset 0 0 0 1px rgba(59,130,246,0.3)"
                            : "none",
                        },
                        onMouseEnter: (S) => {
                          y ||
                            ((S.currentTarget.style.background = "#1E293B"),
                            (S.currentTarget.style.color = "#CBD5E1"));
                        },
                        onMouseLeave: (S) => {
                          y ||
                            ((S.currentTarget.style.background = "transparent"),
                            (S.currentTarget.style.color = "#64748B"));
                        },
                        children: [
                          o.jsx("span", {
                            style: { fontSize: 16 },
                            children: h.icon,
                          }),
                          h.label,
                          h.id === "reports" &&
                            s.filter((S) => !S.resolved).length > 0 &&
                            o.jsx("span", {
                              style: {
                                marginLeft: "auto",
                                background: E.red,
                                color: "white",
                                borderRadius: 99,
                                width: 16,
                                height: 16,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 9,
                                fontWeight: 700,
                              },
                              children: s.filter((S) => !S.resolved).length,
                            }),
                        ],
                      },
                      h.id,
                    );
                  }),
                  o.jsx("div", {
                    style: {
                      margin: "12px 0",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      paddingTop: 12,
                    },
                    children: o.jsxs("button", {
                      onClick: () => f(!0),
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: 8,
                        border: "1px solid rgba(59,130,246,0.3)",
                        cursor: "pointer",
                        background: "rgba(59,130,246,0.08)",
                        color: "#93C5FD",
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: "inherit",
                      },
                      children: [
                        o.jsx("span", {
                          style: { fontSize: 16 },
                          children: "🤖",
                        }),
                        "AI Chase Agent",
                        o.jsx("span", {
                          style: {
                            marginLeft: "auto",
                            background: E.amber,
                            color: "white",
                            borderRadius: 99,
                            padding: "1px 6px",
                            fontSize: 9,
                            fontWeight: 700,
                          },
                          children: "2 pending",
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              o.jsx("div", {
                style: {
                  padding: 12,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                },
                children: o.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 10px",
                    borderRadius: 8,
                  },
                  children: [
                    o.jsx(Xe, { initials: "AM", size: 30, color: "#3B82F6" }),
                    o.jsxs("div", {
                      children: [
                        o.jsx("div", {
                          style: {
                            color: "#E2E8F0",
                            fontSize: 12,
                            fontWeight: 600,
                          },
                          children: "Alex Morgan",
                        }),
                        o.jsx("div", {
                          style: { color: "#475569", fontSize: 10 },
                          children: "Project Manager",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          o.jsxs("div", {
            style: {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            },
            children: [
              o.jsxs("div", {
                style: {
                  background: "white",
                  borderBottom: "1px solid #E2E8F0",
                  padding: "12px 28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexShrink: 0,
                },
                children: [
                  o.jsx("div", {
                    style: { fontSize: 13, color: "#94A3B8" },
                    children: new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }),
                  }),
                  o.jsxs("div", {
                    style: { display: "flex", gap: 8, alignItems: "center" },
                    children: [
                      o.jsx("div", {
                        style: {
                          background: "#EFF6FF",
                          border: "1px solid #BFDBFE",
                          borderRadius: 6,
                          padding: "4px 10px",
                          fontSize: 11,
                          color: "#1D4ED8",
                          fontWeight: 600,
                        },
                        children: "🔗 Keka: Connected",
                      }),
                      o.jsx(rp, { notifs: u, onClear: () => a(0) }),
                    ],
                  }),
                ],
              }),
              o.jsx("div", {
                style: { flex: 1, overflow: "auto", padding: 28 },
                children: v(),
              }),
            ],
          }),
        ],
      }),
      d && o.jsx(cp, { onClose: () => f(!1), employees: _t, incidents: s }),
    ],
  });
}
di.createRoot(document.getElementById("root")).render(
  o.jsx(Od.StrictMode, { children: o.jsx(pp, {}) }),
);
