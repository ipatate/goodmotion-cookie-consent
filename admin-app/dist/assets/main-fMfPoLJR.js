/**
 * @vue/shared v3.4.15
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function zs(e, t) {
	const r = new Set(e.split(","));
	return t ? (n) => r.has(n.toLowerCase()) : (n) => r.has(n);
}
const ae = {},
	tr = [],
	je = () => {},
	fu = () => !1,
	In = (e) =>
		e.charCodeAt(0) === 111 &&
		e.charCodeAt(1) === 110 &&
		(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
	Ws = (e) => e.startsWith("onUpdate:"),
	$e = Object.assign,
	qs = (e, t) => {
		const r = e.indexOf(t);
		r > -1 && e.splice(r, 1);
	},
	pu = Object.prototype.hasOwnProperty,
	ne = (e, t) => pu.call(e, t),
	W = Array.isArray,
	rr = (e) => kn(e) === "[object Map]",
	Zl = (e) => kn(e) === "[object Set]",
	Y = (e) => typeof e == "function",
	me = (e) => typeof e == "string",
	hr = (e) => typeof e == "symbol",
	ue = (e) => e !== null && typeof e == "object",
	Jl = (e) => (ue(e) || Y(e)) && Y(e.then) && Y(e.catch),
	Xl = Object.prototype.toString,
	kn = (e) => Xl.call(e),
	du = (e) => kn(e).slice(8, -1),
	Ql = (e) => kn(e) === "[object Object]",
	Bs = (e) =>
		me(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
	nn = zs(
		",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
	),
	Fn = (e) => {
		const t = Object.create(null);
		return (r) => t[r] || (t[r] = e(r));
	},
	hu = /-(\w)/g,
	lt = Fn((e) => e.replace(hu, (t, r) => (r ? r.toUpperCase() : ""))),
	mu = /\B([A-Z])/g,
	mr = Fn((e) => e.replace(mu, "-$1").toLowerCase()),
	Rn = Fn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
	Xn = Fn((e) => (e ? `on${Rn(e)}` : "")),
	Pt = (e, t) => !Object.is(e, t),
	Qn = (e, t) => {
		for (let r = 0; r < e.length; r++) e[r](t);
	},
	pn = (e, t, r) => {
		Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: r });
	},
	gu = (e) => {
		const t = parseFloat(e);
		return isNaN(t) ? e : t;
	};
let ki;
const eo = () =>
	ki ||
	(ki =
		typeof globalThis < "u"
			? globalThis
			: typeof self < "u"
			  ? self
			  : typeof window < "u"
				  ? window
				  : typeof global < "u"
					  ? global
					  : {});
function Gs(e) {
	if (W(e)) {
		const t = {};
		for (let r = 0; r < e.length; r++) {
			const n = e[r],
				s = me(n) ? _u(n) : Gs(n);
			if (s) for (const i in s) t[i] = s[i];
		}
		return t;
	} else if (me(e) || ue(e)) return e;
}
const bu = /;(?![^(]*\))/g,
	yu = /:([^]+)/,
	vu = /\/\*[^]*?\*\//g;
function _u(e) {
	const t = {};
	return (
		e
			.replace(vu, "")
			.split(bu)
			.forEach((r) => {
				if (r) {
					const n = r.split(yu);
					n.length > 1 && (t[n[0].trim()] = n[1].trim());
				}
			}),
		t
	);
}
function Tn(e) {
	let t = "";
	if (me(e)) t = e;
	else if (W(e))
		for (let r = 0; r < e.length; r++) {
			const n = Tn(e[r]);
			n && (t += n + " ");
		}
	else if (ue(e)) for (const r in e) e[r] && (t += r + " ");
	return t.trim();
}
const $u =
		"itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
	wu = zs($u);
function to(e) {
	return !!e || e === "";
}
const Le = (e) =>
		me(e)
			? e
			: e == null
			  ? ""
			  : W(e) || (ue(e) && (e.toString === Xl || !Y(e.toString)))
				  ? JSON.stringify(e, ro, 2)
				  : String(e),
	ro = (e, t) =>
		t && t.__v_isRef
			? ro(e, t.value)
			: rr(t)
			  ? {
						[`Map(${t.size})`]: [...t.entries()].reduce(
							(r, [n, s], i) => ((r[es(n, i) + " =>"] = s), r),
							{},
						),
				  }
			  : Zl(t)
				  ? { [`Set(${t.size})`]: [...t.values()].map((r) => es(r)) }
				  : hr(t)
					  ? es(t)
					  : ue(t) && !W(t) && !Ql(t)
						  ? String(t)
						  : t,
	es = (e, t = "") => {
		var r;
		return hr(e) ? `Symbol(${(r = e.description) != null ? r : t})` : e;
	}; /**
 * @vue/reactivity v3.4.15
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
let Fe;
class no {
	constructor(t = !1) {
		(this.detached = t),
			(this._active = !0),
			(this.effects = []),
			(this.cleanups = []),
			(this.parent = Fe),
			!t && Fe && (this.index = (Fe.scopes || (Fe.scopes = [])).push(this) - 1);
	}
	get active() {
		return this._active;
	}
	run(t) {
		if (this._active) {
			const r = Fe;
			try {
				return (Fe = this), t();
			} finally {
				Fe = r;
			}
		}
	}
	on() {
		Fe = this;
	}
	off() {
		Fe = this.parent;
	}
	stop(t) {
		if (this._active) {
			let r, n;
			for (r = 0, n = this.effects.length; r < n; r++) this.effects[r].stop();
			for (r = 0, n = this.cleanups.length; r < n; r++) this.cleanups[r]();
			if (this.scopes)
				for (r = 0, n = this.scopes.length; r < n; r++) this.scopes[r].stop(!0);
			if (!this.detached && this.parent && !t) {
				const s = this.parent.scopes.pop();
				s &&
					s !== this &&
					((this.parent.scopes[this.index] = s), (s.index = this.index));
			}
			(this.parent = void 0), (this._active = !1);
		}
	}
}
function so(e) {
	return new no(e);
}
function xu(e, t = Fe) {
	t && t.active && t.effects.push(e);
}
function io() {
	return Fe;
}
function Su(e) {
	Fe && Fe.cleanups.push(e);
}
let jt;
class Ys {
	constructor(t, r, n, s) {
		(this.fn = t),
			(this.trigger = r),
			(this.scheduler = n),
			(this.active = !0),
			(this.deps = []),
			(this._dirtyLevel = 2),
			(this._trackId = 0),
			(this._runnings = 0),
			(this._shouldSchedule = !1),
			(this._depsLength = 0),
			xu(this, s);
	}
	get dirty() {
		if (this._dirtyLevel === 1) {
			Ht();
			for (let t = 0; t < this._depsLength; t++) {
				const r = this.deps[t];
				if (r.computed && (Eu(r.computed), this._dirtyLevel >= 2)) break;
			}
			this._dirtyLevel < 2 && (this._dirtyLevel = 0), Kt();
		}
		return this._dirtyLevel >= 2;
	}
	set dirty(t) {
		this._dirtyLevel = t ? 2 : 0;
	}
	run() {
		if (((this._dirtyLevel = 0), !this.active)) return this.fn();
		let t = Et,
			r = jt;
		try {
			return (Et = !0), (jt = this), this._runnings++, Fi(this), this.fn();
		} finally {
			Ri(this), this._runnings--, (jt = r), (Et = t);
		}
	}
	stop() {
		var t;
		this.active &&
			(Fi(this),
			Ri(this),
			(t = this.onStop) == null || t.call(this),
			(this.active = !1));
	}
}
function Eu(e) {
	return e.value;
}
function Fi(e) {
	e._trackId++, (e._depsLength = 0);
}
function Ri(e) {
	if (e.deps && e.deps.length > e._depsLength) {
		for (let t = e._depsLength; t < e.deps.length; t++) lo(e.deps[t], e);
		e.deps.length = e._depsLength;
	}
}
function lo(e, t) {
	const r = e.get(t);
	r !== void 0 &&
		t._trackId !== r &&
		(e.delete(t), e.size === 0 && e.cleanup());
}
let Et = !0,
	hs = 0;
const oo = [];
function Ht() {
	oo.push(Et), (Et = !1);
}
function Kt() {
	const e = oo.pop();
	Et = e === void 0 ? !0 : e;
}
function Zs() {
	hs++;
}
function Js() {
	for (hs--; !hs && ms.length; ) ms.shift()();
}
function ao(e, t, r) {
	if (t.get(e) !== e._trackId) {
		t.set(e, e._trackId);
		const n = e.deps[e._depsLength];
		n !== t ? (n && lo(n, e), (e.deps[e._depsLength++] = t)) : e._depsLength++;
	}
}
const ms = [];
function uo(e, t, r) {
	Zs();
	for (const n of e.keys())
		if (n._dirtyLevel < t && e.get(n) === n._trackId) {
			const s = n._dirtyLevel;
			(n._dirtyLevel = t), s === 0 && ((n._shouldSchedule = !0), n.trigger());
		}
	co(e), Js();
}
function co(e) {
	for (const t of e.keys())
		t.scheduler &&
			t._shouldSchedule &&
			(!t._runnings || t.allowRecurse) &&
			e.get(t) === t._trackId &&
			((t._shouldSchedule = !1), ms.push(t.scheduler));
}
const fo = (e, t) => {
		const r = new Map();
		return (r.cleanup = e), (r.computed = t), r;
	},
	dn = new WeakMap(),
	Lt = Symbol(""),
	gs = Symbol("");
function Oe(e, t, r) {
	if (Et && jt) {
		let n = dn.get(e);
		n || dn.set(e, (n = new Map()));
		let s = n.get(r);
		s || n.set(r, (s = fo(() => n.delete(r)))), ao(jt, s);
	}
}
function ft(e, t, r, n, s, i) {
	const l = dn.get(e);
	if (!l) return;
	let o = [];
	if (t === "clear") o = [...l.values()];
	else if (r === "length" && W(e)) {
		const a = Number(n);
		l.forEach((u, f) => {
			(f === "length" || (!hr(f) && f >= a)) && o.push(u);
		});
	} else
		switch ((r !== void 0 && o.push(l.get(r)), t)) {
			case "add":
				W(e)
					? Bs(r) && o.push(l.get("length"))
					: (o.push(l.get(Lt)), rr(e) && o.push(l.get(gs)));
				break;
			case "delete":
				W(e) || (o.push(l.get(Lt)), rr(e) && o.push(l.get(gs)));
				break;
			case "set":
				rr(e) && o.push(l.get(Lt));
				break;
		}
	Zs();
	for (const a of o) a && uo(a, 2);
	Js();
}
function Au(e, t) {
	var r;
	return (r = dn.get(e)) == null ? void 0 : r.get(t);
}
const Pu = zs("__proto__,__v_isRef,__isVue"),
	po = new Set(
		Object.getOwnPropertyNames(Symbol)
			.filter((e) => e !== "arguments" && e !== "caller")
			.map((e) => Symbol[e])
			.filter(hr),
	),
	Ti = Cu();
function Cu() {
	const e = {};
	return (
		["includes", "indexOf", "lastIndexOf"].forEach((t) => {
			e[t] = function (...r) {
				const n = se(this);
				for (let i = 0, l = this.length; i < l; i++) Oe(n, "get", i + "");
				const s = n[t](...r);
				return s === -1 || s === !1 ? n[t](...r.map(se)) : s;
			};
		}),
		["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
			e[t] = function (...r) {
				Ht(), Zs();
				const n = se(this)[t].apply(this, r);
				return Js(), Kt(), n;
			};
		}),
		e
	);
}
function Ou(e) {
	const t = se(this);
	return Oe(t, "has", e), t.hasOwnProperty(e);
}
class ho {
	constructor(t = !1, r = !1) {
		(this._isReadonly = t), (this._shallow = r);
	}
	get(t, r, n) {
		const s = this._isReadonly,
			i = this._shallow;
		if (r === "__v_isReactive") return !s;
		if (r === "__v_isReadonly") return s;
		if (r === "__v_isShallow") return i;
		if (r === "__v_raw")
			return n === (s ? (i ? Ku : yo) : i ? bo : go).get(t) ||
				Object.getPrototypeOf(t) === Object.getPrototypeOf(n)
				? t
				: void 0;
		const l = W(t);
		if (!s) {
			if (l && ne(Ti, r)) return Reflect.get(Ti, r, n);
			if (r === "hasOwnProperty") return Ou;
		}
		const o = Reflect.get(t, r, n);
		return (hr(r) ? po.has(r) : Pu(r)) || (s || Oe(t, "get", r), i)
			? o
			: fe(o)
			  ? l && Bs(r)
					? o
					: o.value
			  : ue(o)
				  ? s
						? vo(o)
						: ct(o)
				  : o;
	}
}
class mo extends ho {
	constructor(t = !1) {
		super(!1, t);
	}
	set(t, r, n, s) {
		let i = t[r];
		if (!this._shallow) {
			const a = ur(i);
			if (
				(!hn(n) && !ur(n) && ((i = se(i)), (n = se(n))),
				!W(t) && fe(i) && !fe(n))
			)
				return a ? !1 : ((i.value = n), !0);
		}
		const l = W(t) && Bs(r) ? Number(r) < t.length : ne(t, r),
			o = Reflect.set(t, r, n, s);
		return (
			t === se(s) && (l ? Pt(n, i) && ft(t, "set", r, n) : ft(t, "add", r, n)),
			o
		);
	}
	deleteProperty(t, r) {
		const n = ne(t, r);
		t[r];
		const s = Reflect.deleteProperty(t, r);
		return s && n && ft(t, "delete", r, void 0), s;
	}
	has(t, r) {
		const n = Reflect.has(t, r);
		return (!hr(r) || !po.has(r)) && Oe(t, "has", r), n;
	}
	ownKeys(t) {
		return Oe(t, "iterate", W(t) ? "length" : Lt), Reflect.ownKeys(t);
	}
}
class Iu extends ho {
	constructor(t = !1) {
		super(!0, t);
	}
	set(t, r) {
		return !0;
	}
	deleteProperty(t, r) {
		return !0;
	}
}
const ku = new mo(),
	Fu = new Iu(),
	Ru = new mo(!0),
	Xs = (e) => e,
	Mn = (e) => Reflect.getPrototypeOf(e);
function Br(e, t, r = !1, n = !1) {
	e = e.__v_raw;
	const s = se(e),
		i = se(t);
	r || (Pt(t, i) && Oe(s, "get", t), Oe(s, "get", i));
	const { has: l } = Mn(s),
		o = n ? Xs : r ? ti : Fr;
	if (l.call(s, t)) return o(e.get(t));
	if (l.call(s, i)) return o(e.get(i));
	e !== s && e.get(t);
}
function Gr(e, t = !1) {
	const r = this.__v_raw,
		n = se(r),
		s = se(e);
	return (
		t || (Pt(e, s) && Oe(n, "has", e), Oe(n, "has", s)),
		e === s ? r.has(e) : r.has(e) || r.has(s)
	);
}
function Yr(e, t = !1) {
	return (
		(e = e.__v_raw), !t && Oe(se(e), "iterate", Lt), Reflect.get(e, "size", e)
	);
}
function Mi(e) {
	e = se(e);
	const t = se(this);
	return Mn(t).has.call(t, e) || (t.add(e), ft(t, "add", e, e)), this;
}
function ji(e, t) {
	t = se(t);
	const r = se(this),
		{ has: n, get: s } = Mn(r);
	let i = n.call(r, e);
	i || ((e = se(e)), (i = n.call(r, e)));
	const l = s.call(r, e);
	return (
		r.set(e, t), i ? Pt(t, l) && ft(r, "set", e, t) : ft(r, "add", e, t), this
	);
}
function Li(e) {
	const t = se(this),
		{ has: r, get: n } = Mn(t);
	let s = r.call(t, e);
	s || ((e = se(e)), (s = r.call(t, e))), n && n.call(t, e);
	const i = t.delete(e);
	return s && ft(t, "delete", e, void 0), i;
}
function Ni() {
	const e = se(this),
		t = e.size !== 0,
		r = e.clear();
	return t && ft(e, "clear", void 0, void 0), r;
}
function Zr(e, t) {
	return function (n, s) {
		const i = this,
			l = i.__v_raw,
			o = se(l),
			a = t ? Xs : e ? ti : Fr;
		return (
			!e && Oe(o, "iterate", Lt), l.forEach((u, f) => n.call(s, a(u), a(f), i))
		);
	};
}
function Jr(e, t, r) {
	return function (...n) {
		const s = this.__v_raw,
			i = se(s),
			l = rr(i),
			o = e === "entries" || (e === Symbol.iterator && l),
			a = e === "keys" && l,
			u = s[e](...n),
			f = r ? Xs : t ? ti : Fr;
		return (
			!t && Oe(i, "iterate", a ? gs : Lt),
			{
				next() {
					const { value: c, done: w } = u.next();
					return w
						? { value: c, done: w }
						: { value: o ? [f(c[0]), f(c[1])] : f(c), done: w };
				},
				[Symbol.iterator]() {
					return this;
				},
			}
		);
	};
}
function _t(e) {
	return function (...t) {
		return e === "delete" ? !1 : e === "clear" ? void 0 : this;
	};
}
function Tu() {
	const e = {
			get(i) {
				return Br(this, i);
			},
			get size() {
				return Yr(this);
			},
			has: Gr,
			add: Mi,
			set: ji,
			delete: Li,
			clear: Ni,
			forEach: Zr(!1, !1),
		},
		t = {
			get(i) {
				return Br(this, i, !1, !0);
			},
			get size() {
				return Yr(this);
			},
			has: Gr,
			add: Mi,
			set: ji,
			delete: Li,
			clear: Ni,
			forEach: Zr(!1, !0),
		},
		r = {
			get(i) {
				return Br(this, i, !0);
			},
			get size() {
				return Yr(this, !0);
			},
			has(i) {
				return Gr.call(this, i, !0);
			},
			add: _t("add"),
			set: _t("set"),
			delete: _t("delete"),
			clear: _t("clear"),
			forEach: Zr(!0, !1),
		},
		n = {
			get(i) {
				return Br(this, i, !0, !0);
			},
			get size() {
				return Yr(this, !0);
			},
			has(i) {
				return Gr.call(this, i, !0);
			},
			add: _t("add"),
			set: _t("set"),
			delete: _t("delete"),
			clear: _t("clear"),
			forEach: Zr(!0, !0),
		};
	return (
		["keys", "values", "entries", Symbol.iterator].forEach((i) => {
			(e[i] = Jr(i, !1, !1)),
				(r[i] = Jr(i, !0, !1)),
				(t[i] = Jr(i, !1, !0)),
				(n[i] = Jr(i, !0, !0));
		}),
		[e, r, t, n]
	);
}
const [Mu, ju, Lu, Nu] = Tu();
function Qs(e, t) {
	const r = t ? (e ? Nu : Lu) : e ? ju : Mu;
	return (n, s, i) =>
		s === "__v_isReactive"
			? !e
			: s === "__v_isReadonly"
			  ? e
			  : s === "__v_raw"
				  ? n
				  : Reflect.get(ne(r, s) && s in n ? r : n, s, i);
}
const Vu = { get: Qs(!1, !1) },
	Du = { get: Qs(!1, !0) },
	Hu = { get: Qs(!0, !1) },
	go = new WeakMap(),
	bo = new WeakMap(),
	yo = new WeakMap(),
	Ku = new WeakMap();
function Uu(e) {
	switch (e) {
		case "Object":
		case "Array":
			return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet":
			return 2;
		default:
			return 0;
	}
}
function zu(e) {
	return e.__v_skip || !Object.isExtensible(e) ? 0 : Uu(du(e));
}
function ct(e) {
	return ur(e) ? e : ei(e, !1, ku, Vu, go);
}
function Wu(e) {
	return ei(e, !1, Ru, Du, bo);
}
function vo(e) {
	return ei(e, !0, Fu, Hu, yo);
}
function ei(e, t, r, n, s) {
	if (!ue(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
	const i = s.get(e);
	if (i) return i;
	const l = zu(e);
	if (l === 0) return e;
	const o = new Proxy(e, l === 2 ? n : r);
	return s.set(e, o), o;
}
function st(e) {
	return ur(e) ? st(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ur(e) {
	return !!(e && e.__v_isReadonly);
}
function hn(e) {
	return !!(e && e.__v_isShallow);
}
function _o(e) {
	return st(e) || ur(e);
}
function se(e) {
	const t = e && e.__v_raw;
	return t ? se(t) : e;
}
function Ut(e) {
	return pn(e, "__v_skip", !0), e;
}
const Fr = (e) => (ue(e) ? ct(e) : e),
	ti = (e) => (ue(e) ? vo(e) : e);
class $o {
	constructor(t, r, n, s) {
		(this._setter = r),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this.__v_isReadonly = !1),
			(this.effect = new Ys(
				() => t(this._value),
				() => Ar(this, 1),
				() => this.dep && co(this.dep),
			)),
			(this.effect.computed = this),
			(this.effect.active = this._cacheable = !s),
			(this.__v_isReadonly = n);
	}
	get value() {
		const t = se(this);
		return (
			(!t._cacheable || t.effect.dirty) &&
				Pt(t._value, (t._value = t.effect.run())) &&
				Ar(t, 2),
			wo(t),
			t.effect._dirtyLevel >= 1 && Ar(t, 1),
			t._value
		);
	}
	set value(t) {
		this._setter(t);
	}
	get _dirty() {
		return this.effect.dirty;
	}
	set _dirty(t) {
		this.effect.dirty = t;
	}
}
function qu(e, t, r = !1) {
	let n, s;
	const i = Y(e);
	return (
		i ? ((n = e), (s = je)) : ((n = e.get), (s = e.set)),
		new $o(n, s, i || !s, r)
	);
}
function wo(e) {
	Et &&
		jt &&
		((e = se(e)),
		ao(
			jt,
			e.dep ||
				(e.dep = fo(() => (e.dep = void 0), e instanceof $o ? e : void 0)),
		));
}
function Ar(e, t = 2, r) {
	e = se(e);
	const n = e.dep;
	n && uo(n, t);
}
function fe(e) {
	return !!(e && e.__v_isRef === !0);
}
function te(e) {
	return Bu(e, !1);
}
function Bu(e, t) {
	return fe(e) ? e : new Gu(e, t);
}
class Gu {
	constructor(t, r) {
		(this.__v_isShallow = r),
			(this.dep = void 0),
			(this.__v_isRef = !0),
			(this._rawValue = r ? t : se(t)),
			(this._value = r ? t : Fr(t));
	}
	get value() {
		return wo(this), this._value;
	}
	set value(t) {
		const r = this.__v_isShallow || hn(t) || ur(t);
		(t = r ? t : se(t)),
			Pt(t, this._rawValue) &&
				((this._rawValue = t), (this._value = r ? t : Fr(t)), Ar(this, 2));
	}
}
function Xr(e) {
	Ar(e, 2);
}
function ie(e) {
	return fe(e) ? e.value : e;
}
const Yu = {
	get: (e, t, r) => ie(Reflect.get(e, t, r)),
	set: (e, t, r, n) => {
		const s = e[t];
		return fe(s) && !fe(r) ? ((s.value = r), !0) : Reflect.set(e, t, r, n);
	},
};
function xo(e) {
	return st(e) ? e : new Proxy(e, Yu);
}
function Zu(e) {
	const t = W(e) ? new Array(e.length) : {};
	for (const r in e) t[r] = So(e, r);
	return t;
}
class Ju {
	constructor(t, r, n) {
		(this._object = t),
			(this._key = r),
			(this._defaultValue = n),
			(this.__v_isRef = !0);
	}
	get value() {
		const t = this._object[this._key];
		return t === void 0 ? this._defaultValue : t;
	}
	set value(t) {
		this._object[this._key] = t;
	}
	get dep() {
		return Au(se(this._object), this._key);
	}
}
class Xu {
	constructor(t) {
		(this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
	}
	get value() {
		return this._getter();
	}
}
function Qu(e, t, r) {
	return fe(e)
		? e
		: Y(e)
		  ? new Xu(e)
		  : ue(e) && arguments.length > 1
			  ? So(e, t, r)
			  : te(e);
}
function So(e, t, r) {
	const n = e[t];
	return fe(n) ? n : new Ju(e, t, r);
} /**
 * @vue/runtime-core v3.4.15
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
function At(e, t, r, n) {
	let s;
	try {
		s = n ? e(...n) : e();
	} catch (i) {
		jn(i, t, r);
	}
	return s;
}
function Ze(e, t, r, n) {
	if (Y(e)) {
		const i = At(e, t, r, n);
		return (
			i &&
				Jl(i) &&
				i.catch((l) => {
					jn(l, t, r);
				}),
			i
		);
	}
	const s = [];
	for (let i = 0; i < e.length; i++) s.push(Ze(e[i], t, r, n));
	return s;
}
function jn(e, t, r, n = !0) {
	const s = t ? t.vnode : null;
	if (t) {
		let i = t.parent;
		const l = t.proxy,
			o = `https://vuejs.org/error-reference/#runtime-${r}`;
		for (; i; ) {
			const u = i.ec;
			if (u) {
				for (let f = 0; f < u.length; f++) if (u[f](e, l, o) === !1) return;
			}
			i = i.parent;
		}
		const a = t.appContext.config.errorHandler;
		if (a) {
			At(a, null, 10, [e, l, o]);
			return;
		}
	}
	ec(e, r, s, n);
}
function ec(e, t, r, n = !0) {
	console.error(e);
}
let Rr = !1,
	bs = !1;
const we = [];
let nt = 0;
const nr = [];
let wt = null,
	Tt = 0;
const Eo = Promise.resolve();
let ri = null;
function ni(e) {
	const t = ri || Eo;
	return e ? t.then(this ? e.bind(this) : e) : t;
}
function tc(e) {
	let t = nt + 1,
		r = we.length;
	for (; t < r; ) {
		const n = (t + r) >>> 1,
			s = we[n],
			i = Tr(s);
		i < e || (i === e && s.pre) ? (t = n + 1) : (r = n);
	}
	return t;
}
function si(e) {
	(!we.length || !we.includes(e, Rr && e.allowRecurse ? nt + 1 : nt)) &&
		(e.id == null ? we.push(e) : we.splice(tc(e.id), 0, e), Ao());
}
function Ao() {
	!Rr && !bs && ((bs = !0), (ri = Eo.then(Co)));
}
function rc(e) {
	const t = we.indexOf(e);
	t > nt && we.splice(t, 1);
}
function nc(e) {
	W(e)
		? nr.push(...e)
		: (!wt || !wt.includes(e, e.allowRecurse ? Tt + 1 : Tt)) && nr.push(e),
		Ao();
}
function Vi(e, t, r = Rr ? nt + 1 : 0) {
	for (; r < we.length; r++) {
		const n = we[r];
		if (n && n.pre) {
			if (e && n.id !== e.uid) continue;
			we.splice(r, 1), r--, n();
		}
	}
}
function Po(e) {
	if (nr.length) {
		const t = [...new Set(nr)].sort((r, n) => Tr(r) - Tr(n));
		if (((nr.length = 0), wt)) {
			wt.push(...t);
			return;
		}
		for (wt = t, Tt = 0; Tt < wt.length; Tt++) wt[Tt]();
		(wt = null), (Tt = 0);
	}
}
const Tr = (e) => (e.id == null ? 1 / 0 : e.id),
	sc = (e, t) => {
		const r = Tr(e) - Tr(t);
		if (r === 0) {
			if (e.pre && !t.pre) return -1;
			if (t.pre && !e.pre) return 1;
		}
		return r;
	};
function Co(e) {
	(bs = !1), (Rr = !0), we.sort(sc);
	try {
		for (nt = 0; nt < we.length; nt++) {
			const t = we[nt];
			t && t.active !== !1 && At(t, null, 14);
		}
	} finally {
		(nt = 0),
			(we.length = 0),
			Po(),
			(Rr = !1),
			(ri = null),
			(we.length || nr.length) && Co();
	}
}
function ic(e, t, ...r) {
	if (e.isUnmounted) return;
	const n = e.vnode.props || ae;
	let s = r;
	const i = t.startsWith("update:"),
		l = i && t.slice(7);
	if (l && l in n) {
		const f = `${l === "modelValue" ? "model" : l}Modifiers`,
			{ number: c, trim: w } = n[f] || ae;
		w && (s = r.map((b) => (me(b) ? b.trim() : b))), c && (s = r.map(gu));
	}
	let o,
		a = n[(o = Xn(t))] || n[(o = Xn(lt(t)))];
	!a && i && (a = n[(o = Xn(mr(t)))]), a && Ze(a, e, 6, s);
	const u = n[o + "Once"];
	if (u) {
		if (!e.emitted) e.emitted = {};
		else if (e.emitted[o]) return;
		(e.emitted[o] = !0), Ze(u, e, 6, s);
	}
}
function Oo(e, t, r = !1) {
	const n = t.emitsCache,
		s = n.get(e);
	if (s !== void 0) return s;
	const i = e.emits;
	let l = {},
		o = !1;
	if (!Y(e)) {
		const a = (u) => {
			const f = Oo(u, t, !0);
			f && ((o = !0), $e(l, f));
		};
		!r && t.mixins.length && t.mixins.forEach(a),
			e.extends && a(e.extends),
			e.mixins && e.mixins.forEach(a);
	}
	return !i && !o
		? (ue(e) && n.set(e, null), null)
		: (W(i) ? i.forEach((a) => (l[a] = null)) : $e(l, i),
		  ue(e) && n.set(e, l),
		  l);
}
function Ln(e, t) {
	return !e || !In(t)
		? !1
		: ((t = t.slice(2).replace(/Once$/, "")),
		  ne(e, t[0].toLowerCase() + t.slice(1)) || ne(e, mr(t)) || ne(e, t));
}
let xe = null,
	Nn = null;
function mn(e) {
	const t = xe;
	return (xe = e), (Nn = (e && e.type.__scopeId) || null), t;
}
function lc(e) {
	Nn = e;
}
function oc() {
	Nn = null;
}
function Re(e, t = xe, r) {
	if (!t || e._n) return e;
	const n = (...s) => {
		n._d && Zi(-1);
		const i = mn(t);
		let l;
		try {
			l = e(...s);
		} finally {
			mn(i), n._d && Zi(1);
		}
		return l;
	};
	return (n._n = !0), (n._c = !0), (n._d = !0), n;
}
function ts(e) {
	const {
		type: t,
		vnode: r,
		proxy: n,
		withProxy: s,
		props: i,
		propsOptions: [l],
		slots: o,
		attrs: a,
		emit: u,
		render: f,
		renderCache: c,
		data: w,
		setupState: b,
		ctx: x,
		inheritAttrs: p,
	} = e;
	let m, v;
	const O = mn(e);
	try {
		if (r.shapeFlag & 4) {
			const y = s || n,
				_ = y;
			(m = rt(f.call(_, y, c, i, b, w, x))), (v = a);
		} else {
			const y = t;
			(m = rt(
				y.length > 1 ? y(i, { attrs: a, slots: o, emit: u }) : y(i, null),
			)),
				(v = t.props ? a : ac(a));
		}
	} catch (y) {
		(Cr.length = 0), jn(y, e, 1), (m = U(jr));
	}
	let P = m;
	if (v && p !== !1) {
		const y = Object.keys(v),
			{ shapeFlag: _ } = P;
		y.length && _ & 7 && (l && y.some(Ws) && (v = uc(v, l)), (P = Vt(P, v)));
	}
	return (
		r.dirs && ((P = Vt(P)), (P.dirs = P.dirs ? P.dirs.concat(r.dirs) : r.dirs)),
		r.transition && (P.transition = r.transition),
		(m = P),
		mn(O),
		m
	);
}
const ac = (e) => {
		let t;
		for (const r in e)
			(r === "class" || r === "style" || In(r)) && ((t || (t = {}))[r] = e[r]);
		return t;
	},
	uc = (e, t) => {
		const r = {};
		for (const n in e) (!Ws(n) || !(n.slice(9) in t)) && (r[n] = e[n]);
		return r;
	};
function cc(e, t, r) {
	const { props: n, children: s, component: i } = e,
		{ props: l, children: o, patchFlag: a } = t,
		u = i.emitsOptions;
	if (t.dirs || t.transition) return !0;
	if (r && a >= 0) {
		if (a & 1024) return !0;
		if (a & 16) return n ? Di(n, l, u) : !!l;
		if (a & 8) {
			const f = t.dynamicProps;
			for (let c = 0; c < f.length; c++) {
				const w = f[c];
				if (l[w] !== n[w] && !Ln(u, w)) return !0;
			}
		}
	} else
		return (s || o) && (!o || !o.$stable)
			? !0
			: n === l
			  ? !1
			  : n
				  ? l
						? Di(n, l, u)
						: !0
				  : !!l;
	return !1;
}
function Di(e, t, r) {
	const n = Object.keys(t);
	if (n.length !== Object.keys(e).length) return !0;
	for (let s = 0; s < n.length; s++) {
		const i = n[s];
		if (t[i] !== e[i] && !Ln(r, i)) return !0;
	}
	return !1;
}
function fc({ vnode: e, parent: t }, r) {
	for (; t; ) {
		const n = t.subTree;
		if ((n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e))
			((e = t.vnode).el = r), (t = t.parent);
		else break;
	}
}
const Io = "components";
function Vn(e, t) {
	return dc(Io, e, !0, t) || e;
}
const pc = Symbol.for("v-ndc");
function dc(e, t, r = !0, n = !1) {
	const s = xe || ye;
	if (s) {
		const i = s.type;
		if (e === Io) {
			const o = af(i, !1);
			if (o && (o === t || o === lt(t) || o === Rn(lt(t)))) return i;
		}
		const l = Hi(s[e] || i[e], t) || Hi(s.appContext[e], t);
		return !l && n ? i : l;
	}
}
function Hi(e, t) {
	return e && (e[t] || e[lt(t)] || e[Rn(lt(t))]);
}
const hc = (e) => e.__isSuspense;
function mc(e, t) {
	t && t.pendingBranch
		? W(e)
			? t.effects.push(...e)
			: t.effects.push(e)
		: nc(e);
}
const gc = Symbol.for("v-scx"),
	bc = () => Ne(gc);
function We(e, t) {
	return ii(e, null, t);
}
const Qr = {};
function Ve(e, t, r) {
	return ii(e, t, r);
}
function ii(
	e,
	t,
	{ immediate: r, deep: n, flush: s, once: i, onTrack: l, onTrigger: o } = ae,
) {
	if (t && i) {
		const h = t;
		t = (...E) => {
			h(...E), _();
		};
	}
	const a = ye,
		u = (h) => (n === !0 ? h : Mt(h, n === !1 ? 1 : void 0));
	let f,
		c = !1,
		w = !1;
	if (
		(fe(e)
			? ((f = () => e.value), (c = hn(e)))
			: st(e)
			  ? ((f = () => u(e)), (c = !0))
			  : W(e)
				  ? ((w = !0),
					  (c = e.some((h) => st(h) || hn(h))),
					  (f = () =>
							e.map((h) => {
								if (fe(h)) return h.value;
								if (st(h)) return u(h);
								if (Y(h)) return At(h, a, 2);
							})))
				  : Y(e)
					  ? t
							? (f = () => At(e, a, 2))
							: (f = () => (b && b(), Ze(e, a, 3, [x])))
					  : (f = je),
		t && n)
	) {
		const h = f;
		f = () => Mt(h());
	}
	let b,
		x = (h) => {
			b = P.onStop = () => {
				At(h, a, 4), (b = P.onStop = void 0);
			};
		},
		p;
	if (Un)
		if (
			((x = je),
			t ? r && Ze(t, a, 3, [f(), w ? [] : void 0, x]) : f(),
			s === "sync")
		) {
			const h = bc();
			p = h.__watcherHandles || (h.__watcherHandles = []);
		} else return je;
	let m = w ? new Array(e.length).fill(Qr) : Qr;
	const v = () => {
		if (!(!P.active || !P.dirty))
			if (t) {
				const h = P.run();
				(n || c || (w ? h.some((E, k) => Pt(E, m[k])) : Pt(h, m))) &&
					(b && b(),
					Ze(t, a, 3, [h, m === Qr ? void 0 : w && m[0] === Qr ? [] : m, x]),
					(m = h));
			} else P.run();
	};
	v.allowRecurse = !!t;
	let O;
	s === "sync"
		? (O = v)
		: s === "post"
		  ? (O = () => Ce(v, a && a.suspense))
		  : ((v.pre = !0), a && (v.id = a.uid), (O = () => si(v)));
	const P = new Ys(f, je, O),
		y = io(),
		_ = () => {
			P.stop(), y && qs(y.effects, P);
		};
	return (
		t
			? r
				? v()
				: (m = P.run())
			: s === "post"
			  ? Ce(P.run.bind(P), a && a.suspense)
			  : P.run(),
		p && p.push(_),
		_
	);
}
function yc(e, t, r) {
	const n = this.proxy,
		s = me(e) ? (e.includes(".") ? ko(n, e) : () => n[e]) : e.bind(n, n);
	let i;
	Y(t) ? (i = t) : ((i = t.handler), (r = t));
	const l = Dr(this),
		o = ii(s, i.bind(n), r);
	return l(), o;
}
function ko(e, t) {
	const r = t.split(".");
	return () => {
		let n = e;
		for (let s = 0; s < r.length && n; s++) n = n[r[s]];
		return n;
	};
}
function Mt(e, t, r = 0, n) {
	if (!ue(e) || e.__v_skip) return e;
	if (t && t > 0) {
		if (r >= t) return e;
		r++;
	}
	if (((n = n || new Set()), n.has(e))) return e;
	if ((n.add(e), fe(e))) Mt(e.value, t, r, n);
	else if (W(e)) for (let s = 0; s < e.length; s++) Mt(e[s], t, r, n);
	else if (Zl(e) || rr(e))
		e.forEach((s) => {
			Mt(s, t, r, n);
		});
	else if (Ql(e)) for (const s in e) Mt(e[s], t, r, n);
	return e;
}
function gn(e, t) {
	if (xe === null) return e;
	const r = zn(xe) || xe.proxy,
		n = e.dirs || (e.dirs = []);
	for (let s = 0; s < t.length; s++) {
		let [i, l, o, a = ae] = t[s];
		i &&
			(Y(i) && (i = { mounted: i, updated: i }),
			i.deep && Mt(l),
			n.push({
				dir: i,
				instance: r,
				value: l,
				oldValue: void 0,
				arg: o,
				modifiers: a,
			}));
	}
	return e;
}
function Ft(e, t, r, n) {
	const s = e.dirs,
		i = t && t.dirs;
	for (let l = 0; l < s.length; l++) {
		const o = s[l];
		i && (o.oldValue = i[l].value);
		let a = o.dir[n];
		a && (Ht(), Ze(a, r, 8, [e.el, o, e, t]), Kt());
	}
} /*! #__NO_SIDE_EFFECTS__ */
function yt(e, t) {
	return Y(e) ? $e({ name: e.name }, t, { setup: e }) : e;
}
const sn = (e) => !!e.type.__asyncLoader,
	Fo = (e) => e.type.__isKeepAlive;
function vc(e, t) {
	Ro(e, "a", t);
}
function _c(e, t) {
	Ro(e, "da", t);
}
function Ro(e, t, r = ye) {
	const n =
		e.__wdc ||
		(e.__wdc = () => {
			let s = r;
			for (; s; ) {
				if (s.isDeactivated) return;
				s = s.parent;
			}
			return e();
		});
	if ((Dn(t, n, r), r)) {
		let s = r.parent;
		for (; s && s.parent; )
			Fo(s.parent.vnode) && $c(n, t, r, s), (s = s.parent);
	}
}
function $c(e, t, r, n) {
	const s = Dn(t, e, n, !0);
	Vr(() => {
		qs(n[t], s);
	}, r);
}
function Dn(e, t, r = ye, n = !1) {
	if (r) {
		const s = r[e] || (r[e] = []),
			i =
				t.__weh ||
				(t.__weh = (...l) => {
					if (r.isUnmounted) return;
					Ht();
					const o = Dr(r),
						a = Ze(t, r, e, l);
					return o(), Kt(), a;
				});
		return n ? s.unshift(i) : s.push(i), i;
	}
}
const vt =
		(e) =>
		(t, r = ye) =>
			(!Un || e === "sp") && Dn(e, (...n) => t(...n), r),
	wc = vt("bm"),
	ht = vt("m"),
	xc = vt("bu"),
	Sc = vt("u"),
	To = vt("bum"),
	Vr = vt("um"),
	Ec = vt("sp"),
	Ac = vt("rtg"),
	Pc = vt("rtc");
function Cc(e, t = ye) {
	Dn("ec", e, t);
}
function Oc(e, t, r, n) {
	let s;
	const i = r && r[n];
	if (W(e) || me(e)) {
		s = new Array(e.length);
		for (let l = 0, o = e.length; l < o; l++)
			s[l] = t(e[l], l, void 0, i && i[l]);
	} else if (typeof e == "number") {
		s = new Array(e);
		for (let l = 0; l < e; l++) s[l] = t(l + 1, l, void 0, i && i[l]);
	} else if (ue(e))
		if (e[Symbol.iterator])
			s = Array.from(e, (l, o) => t(l, o, void 0, i && i[o]));
		else {
			const l = Object.keys(e);
			s = new Array(l.length);
			for (let o = 0, a = l.length; o < a; o++) {
				const u = l[o];
				s[o] = t(e[u], u, o, i && i[o]);
			}
		}
	else s = [];
	return r && (r[n] = s), s;
}
const ys = (e) => (e ? (qo(e) ? zn(e) || e.proxy : ys(e.parent)) : null),
	Pr = $e(Object.create(null), {
		$: (e) => e,
		$el: (e) => e.vnode.el,
		$data: (e) => e.data,
		$props: (e) => e.props,
		$attrs: (e) => e.attrs,
		$slots: (e) => e.slots,
		$refs: (e) => e.refs,
		$parent: (e) => ys(e.parent),
		$root: (e) => ys(e.root),
		$emit: (e) => e.emit,
		$options: (e) => li(e),
		$forceUpdate: (e) =>
			e.f ||
			(e.f = () => {
				(e.effect.dirty = !0), si(e.update);
			}),
		$nextTick: (e) => e.n || (e.n = ni.bind(e.proxy)),
		$watch: (e) => yc.bind(e),
	}),
	rs = (e, t) => e !== ae && !e.__isScriptSetup && ne(e, t),
	Ic = {
		get({ _: e }, t) {
			const {
				ctx: r,
				setupState: n,
				data: s,
				props: i,
				accessCache: l,
				type: o,
				appContext: a,
			} = e;
			let u;
			if (t[0] !== "$") {
				const b = l[t];
				if (b !== void 0)
					switch (b) {
						case 1:
							return n[t];
						case 2:
							return s[t];
						case 4:
							return r[t];
						case 3:
							return i[t];
					}
				else {
					if (rs(n, t)) return (l[t] = 1), n[t];
					if (s !== ae && ne(s, t)) return (l[t] = 2), s[t];
					if ((u = e.propsOptions[0]) && ne(u, t)) return (l[t] = 3), i[t];
					if (r !== ae && ne(r, t)) return (l[t] = 4), r[t];
					vs && (l[t] = 0);
				}
			}
			const f = Pr[t];
			let c, w;
			if (f) return t === "$attrs" && Oe(e, "get", t), f(e);
			if ((c = o.__cssModules) && (c = c[t])) return c;
			if (r !== ae && ne(r, t)) return (l[t] = 4), r[t];
			if (((w = a.config.globalProperties), ne(w, t))) return w[t];
		},
		set({ _: e }, t, r) {
			const { data: n, setupState: s, ctx: i } = e;
			return rs(s, t)
				? ((s[t] = r), !0)
				: n !== ae && ne(n, t)
				  ? ((n[t] = r), !0)
				  : ne(e.props, t) || (t[0] === "$" && t.slice(1) in e)
					  ? !1
					  : ((i[t] = r), !0);
		},
		has(
			{
				_: {
					data: e,
					setupState: t,
					accessCache: r,
					ctx: n,
					appContext: s,
					propsOptions: i,
				},
			},
			l,
		) {
			let o;
			return (
				!!r[l] ||
				(e !== ae && ne(e, l)) ||
				rs(t, l) ||
				((o = i[0]) && ne(o, l)) ||
				ne(n, l) ||
				ne(Pr, l) ||
				ne(s.config.globalProperties, l)
			);
		},
		defineProperty(e, t, r) {
			return (
				r.get != null
					? (e._.accessCache[t] = 0)
					: ne(r, "value") && this.set(e, t, r.value, null),
				Reflect.defineProperty(e, t, r)
			);
		},
	};
function Ki(e) {
	return W(e) ? e.reduce((t, r) => ((t[r] = null), t), {}) : e;
}
let vs = !0;
function kc(e) {
	const t = li(e),
		r = e.proxy,
		n = e.ctx;
	(vs = !1), t.beforeCreate && Ui(t.beforeCreate, e, "bc");
	const {
		data: s,
		computed: i,
		methods: l,
		watch: o,
		provide: a,
		inject: u,
		created: f,
		beforeMount: c,
		mounted: w,
		beforeUpdate: b,
		updated: x,
		activated: p,
		deactivated: m,
		beforeDestroy: v,
		beforeUnmount: O,
		destroyed: P,
		unmounted: y,
		render: _,
		renderTracked: h,
		renderTriggered: E,
		errorCaptured: k,
		serverPrefetch: L,
		expose: $,
		inheritAttrs: M,
		components: j,
		directives: G,
		filters: _e,
	} = t;
	if ((u && Fc(u, n, null), l))
		for (const Z in l) {
			const ee = l[Z];
			Y(ee) && (n[Z] = ee.bind(r));
		}
	if (s) {
		const Z = s.call(r, r);
		ue(Z) && (e.data = ct(Z));
	}
	if (((vs = !0), i))
		for (const Z in i) {
			const ee = i[Z],
				ge = Y(ee) ? ee.bind(r, r) : Y(ee.get) ? ee.get.bind(r, r) : je,
				ot = !Y(ee) && Y(ee.set) ? ee.set.bind(r) : je,
				Ie = de({ get: ge, set: ot });
			Object.defineProperty(n, Z, {
				enumerable: !0,
				configurable: !0,
				get: () => Ie.value,
				set: (Xe) => (Ie.value = Xe),
			});
		}
	if (o) for (const Z in o) Mo(o[Z], n, r, Z);
	if (a) {
		const Z = Y(a) ? a.call(r) : a;
		Reflect.ownKeys(Z).forEach((ee) => {
			yn(ee, Z[ee]);
		});
	}
	f && Ui(f, e, "c");
	function D(Z, ee) {
		W(ee) ? ee.forEach((ge) => Z(ge.bind(r))) : ee && Z(ee.bind(r));
	}
	if (
		(D(wc, c),
		D(ht, w),
		D(xc, b),
		D(Sc, x),
		D(vc, p),
		D(_c, m),
		D(Cc, k),
		D(Pc, h),
		D(Ac, E),
		D(To, O),
		D(Vr, y),
		D(Ec, L),
		W($))
	)
		if ($.length) {
			const Z = e.exposed || (e.exposed = {});
			$.forEach((ee) => {
				Object.defineProperty(Z, ee, {
					get: () => r[ee],
					set: (ge) => (r[ee] = ge),
				});
			});
		} else e.exposed || (e.exposed = {});
	_ && e.render === je && (e.render = _),
		M != null && (e.inheritAttrs = M),
		j && (e.components = j),
		G && (e.directives = G);
}
function Fc(e, t, r = je) {
	W(e) && (e = _s(e));
	for (const n in e) {
		const s = e[n];
		let i;
		ue(s)
			? "default" in s
				? (i = Ne(s.from || n, s.default, !0))
				: (i = Ne(s.from || n))
			: (i = Ne(s)),
			fe(i)
				? Object.defineProperty(t, n, {
						enumerable: !0,
						configurable: !0,
						get: () => i.value,
						set: (l) => (i.value = l),
				  })
				: (t[n] = i);
	}
}
function Ui(e, t, r) {
	Ze(W(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, r);
}
function Mo(e, t, r, n) {
	const s = n.includes(".") ? ko(r, n) : () => r[n];
	if (me(e)) {
		const i = t[e];
		Y(i) && Ve(s, i);
	} else if (Y(e)) Ve(s, e.bind(r));
	else if (ue(e))
		if (W(e)) e.forEach((i) => Mo(i, t, r, n));
		else {
			const i = Y(e.handler) ? e.handler.bind(r) : t[e.handler];
			Y(i) && Ve(s, i, e);
		}
}
function li(e) {
	const t = e.type,
		{ mixins: r, extends: n } = t,
		{
			mixins: s,
			optionsCache: i,
			config: { optionMergeStrategies: l },
		} = e.appContext,
		o = i.get(t);
	let a;
	return (
		o
			? (a = o)
			: !s.length && !r && !n
			  ? (a = t)
			  : ((a = {}),
				  s.length && s.forEach((u) => bn(a, u, l, !0)),
				  bn(a, t, l)),
		ue(t) && i.set(t, a),
		a
	);
}
function bn(e, t, r, n = !1) {
	const { mixins: s, extends: i } = t;
	i && bn(e, i, r, !0), s && s.forEach((l) => bn(e, l, r, !0));
	for (const l in t)
		if (!(n && l === "expose")) {
			const o = Rc[l] || (r && r[l]);
			e[l] = o ? o(e[l], t[l]) : t[l];
		}
	return e;
}
const Rc = {
	data: zi,
	props: Wi,
	emits: Wi,
	methods: $r,
	computed: $r,
	beforeCreate: Se,
	created: Se,
	beforeMount: Se,
	mounted: Se,
	beforeUpdate: Se,
	updated: Se,
	beforeDestroy: Se,
	beforeUnmount: Se,
	destroyed: Se,
	unmounted: Se,
	activated: Se,
	deactivated: Se,
	errorCaptured: Se,
	serverPrefetch: Se,
	components: $r,
	directives: $r,
	watch: Mc,
	provide: zi,
	inject: Tc,
};
function zi(e, t) {
	return t
		? e
			? function () {
					return $e(
						Y(e) ? e.call(this, this) : e,
						Y(t) ? t.call(this, this) : t,
					);
			  }
			: t
		: e;
}
function Tc(e, t) {
	return $r(_s(e), _s(t));
}
function _s(e) {
	if (W(e)) {
		const t = {};
		for (let r = 0; r < e.length; r++) t[e[r]] = e[r];
		return t;
	}
	return e;
}
function Se(e, t) {
	return e ? [...new Set([].concat(e, t))] : t;
}
function $r(e, t) {
	return e ? $e(Object.create(null), e, t) : t;
}
function Wi(e, t) {
	return e
		? W(e) && W(t)
			? [...new Set([...e, ...t])]
			: $e(Object.create(null), Ki(e), Ki(t ?? {}))
		: t;
}
function Mc(e, t) {
	if (!e) return t;
	if (!t) return e;
	const r = $e(Object.create(null), e);
	for (const n in t) r[n] = Se(e[n], t[n]);
	return r;
}
function jo() {
	return {
		app: null,
		config: {
			isNativeTag: fu,
			performance: !1,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {},
		},
		mixins: [],
		components: {},
		directives: {},
		provides: Object.create(null),
		optionsCache: new WeakMap(),
		propsCache: new WeakMap(),
		emitsCache: new WeakMap(),
	};
}
let jc = 0;
function Lc(e, t) {
	return function (n, s = null) {
		Y(n) || (n = $e({}, n)), s != null && !ue(s) && (s = null);
		const i = jo(),
			l = new WeakSet();
		let o = !1;
		const a = (i.app = {
			_uid: jc++,
			_component: n,
			_props: s,
			_container: null,
			_context: i,
			_instance: null,
			version: cf,
			get config() {
				return i.config;
			},
			set config(u) {},
			use(u, ...f) {
				return (
					l.has(u) ||
						(u && Y(u.install)
							? (l.add(u), u.install(a, ...f))
							: Y(u) && (l.add(u), u(a, ...f))),
					a
				);
			},
			mixin(u) {
				return i.mixins.includes(u) || i.mixins.push(u), a;
			},
			component(u, f) {
				return f ? ((i.components[u] = f), a) : i.components[u];
			},
			directive(u, f) {
				return f ? ((i.directives[u] = f), a) : i.directives[u];
			},
			mount(u, f, c) {
				if (!o) {
					const w = U(n, s);
					return (
						(w.appContext = i),
						c === !0 ? (c = "svg") : c === !1 && (c = void 0),
						f && t ? t(w, u) : e(w, u, c),
						(o = !0),
						(a._container = u),
						(u.__vue_app__ = a),
						zn(w.component) || w.component.proxy
					);
				}
			},
			unmount() {
				o && (e(null, a._container), delete a._container.__vue_app__);
			},
			provide(u, f) {
				return (i.provides[u] = f), a;
			},
			runWithContext(u) {
				Mr = a;
				try {
					return u();
				} finally {
					Mr = null;
				}
			},
		});
		return a;
	};
}
let Mr = null;
function yn(e, t) {
	if (ye) {
		let r = ye.provides;
		const n = ye.parent && ye.parent.provides;
		n === r && (r = ye.provides = Object.create(n)), (r[e] = t);
	}
}
function Ne(e, t, r = !1) {
	const n = ye || xe;
	if (n || Mr) {
		const s = n
			? n.parent == null
				? n.vnode.appContext && n.vnode.appContext.provides
				: n.parent.provides
			: Mr._context.provides;
		if (s && e in s) return s[e];
		if (arguments.length > 1) return r && Y(t) ? t.call(n && n.proxy) : t;
	}
}
function Nc() {
	return !!(ye || xe || Mr);
}
function Vc(e, t, r, n = !1) {
	const s = {},
		i = {};
	pn(i, Kn, 1), (e.propsDefaults = Object.create(null)), Lo(e, t, s, i);
	for (const l in e.propsOptions[0]) l in s || (s[l] = void 0);
	r ? (e.props = n ? s : Wu(s)) : e.type.props ? (e.props = s) : (e.props = i),
		(e.attrs = i);
}
function Dc(e, t, r, n) {
	const {
			props: s,
			attrs: i,
			vnode: { patchFlag: l },
		} = e,
		o = se(s),
		[a] = e.propsOptions;
	let u = !1;
	if ((n || l > 0) && !(l & 16)) {
		if (l & 8) {
			const f = e.vnode.dynamicProps;
			for (let c = 0; c < f.length; c++) {
				let w = f[c];
				if (Ln(e.emitsOptions, w)) continue;
				const b = t[w];
				if (a)
					if (ne(i, w)) b !== i[w] && ((i[w] = b), (u = !0));
					else {
						const x = lt(w);
						s[x] = $s(a, o, x, b, e, !1);
					}
				else b !== i[w] && ((i[w] = b), (u = !0));
			}
		}
	} else {
		Lo(e, t, s, i) && (u = !0);
		let f;
		for (const c in o)
			(!t || (!ne(t, c) && ((f = mr(c)) === c || !ne(t, f)))) &&
				(a
					? r &&
					  (r[c] !== void 0 || r[f] !== void 0) &&
					  (s[c] = $s(a, o, c, void 0, e, !0))
					: delete s[c]);
		if (i !== o)
			for (const c in i) (!t || !ne(t, c)) && (delete i[c], (u = !0));
	}
	u && ft(e, "set", "$attrs");
}
function Lo(e, t, r, n) {
	const [s, i] = e.propsOptions;
	let l = !1,
		o;
	if (t)
		for (let a in t) {
			if (nn(a)) continue;
			const u = t[a];
			let f;
			s && ne(s, (f = lt(a)))
				? !i || !i.includes(f)
					? (r[f] = u)
					: ((o || (o = {}))[f] = u)
				: Ln(e.emitsOptions, a) ||
				  ((!(a in n) || u !== n[a]) && ((n[a] = u), (l = !0)));
		}
	if (i) {
		const a = se(r),
			u = o || ae;
		for (let f = 0; f < i.length; f++) {
			const c = i[f];
			r[c] = $s(s, a, c, u[c], e, !ne(u, c));
		}
	}
	return l;
}
function $s(e, t, r, n, s, i) {
	const l = e[r];
	if (l != null) {
		const o = ne(l, "default");
		if (o && n === void 0) {
			const a = l.default;
			if (l.type !== Function && !l.skipFactory && Y(a)) {
				const { propsDefaults: u } = s;
				if (r in u) n = u[r];
				else {
					const f = Dr(s);
					(n = u[r] = a.call(null, t)), f();
				}
			} else n = a;
		}
		l[0] &&
			(i && !o ? (n = !1) : l[1] && (n === "" || n === mr(r)) && (n = !0));
	}
	return n;
}
function No(e, t, r = !1) {
	const n = t.propsCache,
		s = n.get(e);
	if (s) return s;
	const i = e.props,
		l = {},
		o = [];
	let a = !1;
	if (!Y(e)) {
		const f = (c) => {
			a = !0;
			const [w, b] = No(c, t, !0);
			$e(l, w), b && o.push(...b);
		};
		!r && t.mixins.length && t.mixins.forEach(f),
			e.extends && f(e.extends),
			e.mixins && e.mixins.forEach(f);
	}
	if (!i && !a) return ue(e) && n.set(e, tr), tr;
	if (W(i))
		for (let f = 0; f < i.length; f++) {
			const c = lt(i[f]);
			qi(c) && (l[c] = ae);
		}
	else if (i)
		for (const f in i) {
			const c = lt(f);
			if (qi(c)) {
				const w = i[f],
					b = (l[c] = W(w) || Y(w) ? { type: w } : $e({}, w));
				if (b) {
					const x = Yi(Boolean, b.type),
						p = Yi(String, b.type);
					(b[0] = x > -1),
						(b[1] = p < 0 || x < p),
						(x > -1 || ne(b, "default")) && o.push(c);
				}
			}
		}
	const u = [l, o];
	return ue(e) && n.set(e, u), u;
}
function qi(e) {
	return e[0] !== "$";
}
function Bi(e) {
	const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
	return t ? t[2] : e === null ? "null" : "";
}
function Gi(e, t) {
	return Bi(e) === Bi(t);
}
function Yi(e, t) {
	return W(t) ? t.findIndex((r) => Gi(r, e)) : Y(t) && Gi(t, e) ? 0 : -1;
}
const Vo = (e) => e[0] === "_" || e === "$stable",
	oi = (e) => (W(e) ? e.map(rt) : [rt(e)]),
	Hc = (e, t, r) => {
		if (t._n) return t;
		const n = Re((...s) => oi(t(...s)), r);
		return (n._c = !1), n;
	},
	Do = (e, t, r) => {
		const n = e._ctx;
		for (const s in e) {
			if (Vo(s)) continue;
			const i = e[s];
			if (Y(i)) t[s] = Hc(s, i, n);
			else if (i != null) {
				const l = oi(i);
				t[s] = () => l;
			}
		}
	},
	Ho = (e, t) => {
		const r = oi(t);
		e.slots.default = () => r;
	},
	Kc = (e, t) => {
		if (e.vnode.shapeFlag & 32) {
			const r = t._;
			r ? ((e.slots = se(t)), pn(t, "_", r)) : Do(t, (e.slots = {}));
		} else (e.slots = {}), t && Ho(e, t);
		pn(e.slots, Kn, 1);
	},
	Uc = (e, t, r) => {
		const { vnode: n, slots: s } = e;
		let i = !0,
			l = ae;
		if (n.shapeFlag & 32) {
			const o = t._;
			o
				? r && o === 1
					? (i = !1)
					: ($e(s, t), !r && o === 1 && delete s._)
				: ((i = !t.$stable), Do(t, s)),
				(l = t);
		} else t && (Ho(e, t), (l = { default: 1 }));
		if (i) for (const o in s) !Vo(o) && l[o] == null && delete s[o];
	};
function ws(e, t, r, n, s = !1) {
	if (W(e)) {
		e.forEach((w, b) => ws(w, t && (W(t) ? t[b] : t), r, n, s));
		return;
	}
	if (sn(n) && !s) return;
	const i = n.shapeFlag & 4 ? zn(n.component) || n.component.proxy : n.el,
		l = s ? null : i,
		{ i: o, r: a } = e,
		u = t && t.r,
		f = o.refs === ae ? (o.refs = {}) : o.refs,
		c = o.setupState;
	if (
		(u != null &&
			u !== a &&
			(me(u)
				? ((f[u] = null), ne(c, u) && (c[u] = null))
				: fe(u) && (u.value = null)),
		Y(a))
	)
		At(a, o, 12, [l, f]);
	else {
		const w = me(a),
			b = fe(a),
			x = e.f;
		if (w || b) {
			const p = () => {
				if (x) {
					const m = w ? (ne(c, a) ? c[a] : f[a]) : a.value;
					s
						? W(m) && qs(m, i)
						: W(m)
						  ? m.includes(i) || m.push(i)
						  : w
							  ? ((f[a] = [i]), ne(c, a) && (c[a] = f[a]))
							  : ((a.value = [i]), e.k && (f[e.k] = a.value));
				} else
					w
						? ((f[a] = l), ne(c, a) && (c[a] = l))
						: b && ((a.value = l), e.k && (f[e.k] = l));
			};
			s || x ? p() : ((p.id = -1), Ce(p, r));
		}
	}
}
const Ce = mc;
function zc(e) {
	return Wc(e);
}
function Wc(e, t) {
	const r = eo();
	r.__VUE__ = !0;
	const {
			insert: n,
			remove: s,
			patchProp: i,
			createElement: l,
			createText: o,
			createComment: a,
			setText: u,
			setElementText: f,
			parentNode: c,
			nextSibling: w,
			setScopeId: b = je,
			insertStaticContent: x,
		} = e,
		p = (
			d,
			g,
			S,
			A = null,
			C = null,
			R = null,
			N = void 0,
			F = null,
			T = !!g.dynamicChildren,
		) => {
			if (d === g) return;
			d && !vr(d, g) && ((A = qr(d)), Xe(d, C, R, !0), (d = null)),
				g.patchFlag === -2 && ((T = !1), (g.dynamicChildren = null));
			const { type: I, ref: V, shapeFlag: K } = g;
			switch (I) {
				case Hn:
					m(d, g, S, A);
					break;
				case jr:
					v(d, g, S, A);
					break;
				case ln:
					d == null && O(g, S, A, N);
					break;
				case Te:
					j(d, g, S, A, C, R, N, F, T);
					break;
				default:
					K & 1
						? _(d, g, S, A, C, R, N, F, T)
						: K & 6
						  ? G(d, g, S, A, C, R, N, F, T)
						  : (K & 64 || K & 128) && I.process(d, g, S, A, C, R, N, F, T, qt);
			}
			V != null && C && ws(V, d && d.ref, R, g || d, !g);
		},
		m = (d, g, S, A) => {
			if (d == null) n((g.el = o(g.children)), S, A);
			else {
				const C = (g.el = d.el);
				g.children !== d.children && u(C, g.children);
			}
		},
		v = (d, g, S, A) => {
			d == null ? n((g.el = a(g.children || "")), S, A) : (g.el = d.el);
		},
		O = (d, g, S, A) => {
			[d.el, d.anchor] = x(d.children, g, S, A, d.el, d.anchor);
		},
		P = ({ el: d, anchor: g }, S, A) => {
			let C;
			for (; d && d !== g; ) (C = w(d)), n(d, S, A), (d = C);
			n(g, S, A);
		},
		y = ({ el: d, anchor: g }) => {
			let S;
			for (; d && d !== g; ) (S = w(d)), s(d), (d = S);
			s(g);
		},
		_ = (d, g, S, A, C, R, N, F, T) => {
			g.type === "svg" ? (N = "svg") : g.type === "math" && (N = "mathml"),
				d == null ? h(g, S, A, C, R, N, F, T) : L(d, g, C, R, N, F, T);
		},
		h = (d, g, S, A, C, R, N, F) => {
			let T, I;
			const { props: V, shapeFlag: K, transition: H, dirs: B } = d;
			if (
				((T = d.el = l(d.type, R, V && V.is, V)),
				K & 8
					? f(T, d.children)
					: K & 16 && k(d.children, T, null, A, C, ns(d, R), N, F),
				B && Ft(d, null, A, "created"),
				E(T, d, d.scopeId, N, A),
				V)
			) {
				for (const le in V)
					le !== "value" &&
						!nn(le) &&
						i(T, le, null, V[le], R, d.children, A, C, at);
				"value" in V && i(T, "value", null, V.value, R),
					(I = V.onVnodeBeforeMount) && et(I, A, d);
			}
			B && Ft(d, null, A, "beforeMount");
			const J = qc(C, H);
			J && H.beforeEnter(T),
				n(T, g, S),
				((I = V && V.onVnodeMounted) || J || B) &&
					Ce(() => {
						I && et(I, A, d), J && H.enter(T), B && Ft(d, null, A, "mounted");
					}, C);
		},
		E = (d, g, S, A, C) => {
			if ((S && b(d, S), A)) for (let R = 0; R < A.length; R++) b(d, A[R]);
			if (C) {
				let R = C.subTree;
				if (g === R) {
					const N = C.vnode;
					E(d, N, N.scopeId, N.slotScopeIds, C.parent);
				}
			}
		},
		k = (d, g, S, A, C, R, N, F, T = 0) => {
			for (let I = T; I < d.length; I++) {
				const V = (d[I] = F ? xt(d[I]) : rt(d[I]));
				p(null, V, g, S, A, C, R, N, F);
			}
		},
		L = (d, g, S, A, C, R, N) => {
			const F = (g.el = d.el);
			let { patchFlag: T, dynamicChildren: I, dirs: V } = g;
			T |= d.patchFlag & 16;
			const K = d.props || ae,
				H = g.props || ae;
			let B;
			if (
				(S && Rt(S, !1),
				(B = H.onVnodeBeforeUpdate) && et(B, S, g, d),
				V && Ft(g, d, S, "beforeUpdate"),
				S && Rt(S, !0),
				I
					? $(d.dynamicChildren, I, F, S, A, ns(g, C), R)
					: N || ee(d, g, F, null, S, A, ns(g, C), R, !1),
				T > 0)
			) {
				if (T & 16) M(F, g, K, H, S, A, C);
				else if (
					(T & 2 && K.class !== H.class && i(F, "class", null, H.class, C),
					T & 4 && i(F, "style", K.style, H.style, C),
					T & 8)
				) {
					const J = g.dynamicProps;
					for (let le = 0; le < J.length; le++) {
						const ce = J[le],
							be = K[ce],
							He = H[ce];
						(He !== be || ce === "value") &&
							i(F, ce, be, He, C, d.children, S, A, at);
					}
				}
				T & 1 && d.children !== g.children && f(F, g.children);
			} else !N && I == null && M(F, g, K, H, S, A, C);
			((B = H.onVnodeUpdated) || V) &&
				Ce(() => {
					B && et(B, S, g, d), V && Ft(g, d, S, "updated");
				}, A);
		},
		$ = (d, g, S, A, C, R, N) => {
			for (let F = 0; F < g.length; F++) {
				const T = d[F],
					I = g[F],
					V =
						T.el && (T.type === Te || !vr(T, I) || T.shapeFlag & 70)
							? c(T.el)
							: S;
				p(T, I, V, null, A, C, R, N, !0);
			}
		},
		M = (d, g, S, A, C, R, N) => {
			if (S !== A) {
				if (S !== ae)
					for (const F in S)
						!nn(F) && !(F in A) && i(d, F, S[F], null, N, g.children, C, R, at);
				for (const F in A) {
					if (nn(F)) continue;
					const T = A[F],
						I = S[F];
					T !== I && F !== "value" && i(d, F, I, T, N, g.children, C, R, at);
				}
				"value" in A && i(d, "value", S.value, A.value, N);
			}
		},
		j = (d, g, S, A, C, R, N, F, T) => {
			const I = (g.el = d ? d.el : o("")),
				V = (g.anchor = d ? d.anchor : o(""));
			let { patchFlag: K, dynamicChildren: H, slotScopeIds: B } = g;
			B && (F = F ? F.concat(B) : B),
				d == null
					? (n(I, S, A), n(V, S, A), k(g.children || [], S, V, C, R, N, F, T))
					: K > 0 && K & 64 && H && d.dynamicChildren
					  ? ($(d.dynamicChildren, H, S, C, R, N, F),
						  (g.key != null || (C && g === C.subTree)) && Ko(d, g, !0))
					  : ee(d, g, S, V, C, R, N, F, T);
		},
		G = (d, g, S, A, C, R, N, F, T) => {
			(g.slotScopeIds = F),
				d == null
					? g.shapeFlag & 512
						? C.ctx.activate(g, S, A, N, T)
						: _e(g, S, A, C, R, N, T)
					: Q(d, g, T);
		},
		_e = (d, g, S, A, C, R, N) => {
			const F = (d.component = rf(d, A, C));
			if ((Fo(d) && (F.ctx.renderer = qt), nf(F), F.asyncDep)) {
				if ((C && C.registerDep(F, D), !d.el)) {
					const T = (F.subTree = U(jr));
					v(null, T, g, S);
				}
			} else D(F, d, g, S, C, R, N);
		},
		Q = (d, g, S) => {
			const A = (g.component = d.component);
			if (cc(d, g, S))
				if (A.asyncDep && !A.asyncResolved) {
					Z(A, g, S);
					return;
				} else (A.next = g), rc(A.update), (A.effect.dirty = !0), A.update();
			else (g.el = d.el), (A.vnode = g);
		},
		D = (d, g, S, A, C, R, N) => {
			const F = () => {
					if (d.isMounted) {
						let { next: V, bu: K, u: H, parent: B, vnode: J } = d;
						{
							const Bt = Uo(d);
							if (Bt) {
								V && ((V.el = J.el), Z(d, V, N)),
									Bt.asyncDep.then(() => {
										d.isUnmounted || F();
									});
								return;
							}
						}
						let le = V,
							ce;
						Rt(d, !1),
							V ? ((V.el = J.el), Z(d, V, N)) : (V = J),
							K && Qn(K),
							(ce = V.props && V.props.onVnodeBeforeUpdate) && et(ce, B, V, J),
							Rt(d, !0);
						const be = ts(d),
							He = d.subTree;
						(d.subTree = be),
							p(He, be, c(He.el), qr(He), d, C, R),
							(V.el = be.el),
							le === null && fc(d, be.el),
							H && Ce(H, C),
							(ce = V.props && V.props.onVnodeUpdated) &&
								Ce(() => et(ce, B, V, J), C);
					} else {
						let V;
						const { el: K, props: H } = g,
							{ bm: B, m: J, parent: le } = d,
							ce = sn(g);
						if (
							(Rt(d, !1),
							B && Qn(B),
							!ce && (V = H && H.onVnodeBeforeMount) && et(V, le, g),
							Rt(d, !0),
							K && Jn)
						) {
							const be = () => {
								(d.subTree = ts(d)), Jn(K, d.subTree, d, C, null);
							};
							ce
								? g.type.__asyncLoader().then(() => !d.isUnmounted && be())
								: be();
						} else {
							const be = (d.subTree = ts(d));
							p(null, be, S, A, d, C, R), (g.el = be.el);
						}
						if ((J && Ce(J, C), !ce && (V = H && H.onVnodeMounted))) {
							const be = g;
							Ce(() => et(V, le, be), C);
						}
						(g.shapeFlag & 256 ||
							(le && sn(le.vnode) && le.vnode.shapeFlag & 256)) &&
							d.a &&
							Ce(d.a, C),
							(d.isMounted = !0),
							(g = S = A = null);
					}
				},
				T = (d.effect = new Ys(F, je, () => si(I), d.scope)),
				I = (d.update = () => {
					T.dirty && T.run();
				});
			(I.id = d.uid), Rt(d, !0), I();
		},
		Z = (d, g, S) => {
			g.component = d;
			const A = d.vnode.props;
			(d.vnode = g),
				(d.next = null),
				Dc(d, g.props, A, S),
				Uc(d, g.children, S),
				Ht(),
				Vi(d),
				Kt();
		},
		ee = (d, g, S, A, C, R, N, F, T = !1) => {
			const I = d && d.children,
				V = d ? d.shapeFlag : 0,
				K = g.children,
				{ patchFlag: H, shapeFlag: B } = g;
			if (H > 0) {
				if (H & 128) {
					ot(I, K, S, A, C, R, N, F, T);
					return;
				} else if (H & 256) {
					ge(I, K, S, A, C, R, N, F, T);
					return;
				}
			}
			B & 8
				? (V & 16 && at(I, C, R), K !== I && f(S, K))
				: V & 16
				  ? B & 16
						? ot(I, K, S, A, C, R, N, F, T)
						: at(I, C, R, !0)
				  : (V & 8 && f(S, ""), B & 16 && k(K, S, A, C, R, N, F, T));
		},
		ge = (d, g, S, A, C, R, N, F, T) => {
			(d = d || tr), (g = g || tr);
			const I = d.length,
				V = g.length,
				K = Math.min(I, V);
			let H;
			for (H = 0; H < K; H++) {
				const B = (g[H] = T ? xt(g[H]) : rt(g[H]));
				p(d[H], B, S, null, C, R, N, F, T);
			}
			I > V ? at(d, C, R, !0, !1, K) : k(g, S, A, C, R, N, F, T, K);
		},
		ot = (d, g, S, A, C, R, N, F, T) => {
			let I = 0;
			const V = g.length;
			let K = d.length - 1,
				H = V - 1;
			for (; I <= K && I <= H; ) {
				const B = d[I],
					J = (g[I] = T ? xt(g[I]) : rt(g[I]));
				if (vr(B, J)) p(B, J, S, null, C, R, N, F, T);
				else break;
				I++;
			}
			for (; I <= K && I <= H; ) {
				const B = d[K],
					J = (g[H] = T ? xt(g[H]) : rt(g[H]));
				if (vr(B, J)) p(B, J, S, null, C, R, N, F, T);
				else break;
				K--, H--;
			}
			if (I > K) {
				if (I <= H) {
					const B = H + 1,
						J = B < V ? g[B].el : A;
					for (; I <= H; )
						p(null, (g[I] = T ? xt(g[I]) : rt(g[I])), S, J, C, R, N, F, T), I++;
				}
			} else if (I > H) for (; I <= K; ) Xe(d[I], C, R, !0), I++;
			else {
				const B = I,
					J = I,
					le = new Map();
				for (I = J; I <= H; I++) {
					const ke = (g[I] = T ? xt(g[I]) : rt(g[I]));
					ke.key != null && le.set(ke.key, I);
				}
				let ce,
					be = 0;
				const He = H - J + 1;
				let Bt = !1,
					Ci = 0;
				const yr = new Array(He);
				for (I = 0; I < He; I++) yr[I] = 0;
				for (I = B; I <= K; I++) {
					const ke = d[I];
					if (be >= He) {
						Xe(ke, C, R, !0);
						continue;
					}
					let Qe;
					if (ke.key != null) Qe = le.get(ke.key);
					else
						for (ce = J; ce <= H; ce++)
							if (yr[ce - J] === 0 && vr(ke, g[ce])) {
								Qe = ce;
								break;
							}
					Qe === void 0
						? Xe(ke, C, R, !0)
						: ((yr[Qe - J] = I + 1),
						  Qe >= Ci ? (Ci = Qe) : (Bt = !0),
						  p(ke, g[Qe], S, null, C, R, N, F, T),
						  be++);
				}
				const Oi = Bt ? Bc(yr) : tr;
				for (ce = Oi.length - 1, I = He - 1; I >= 0; I--) {
					const ke = J + I,
						Qe = g[ke],
						Ii = ke + 1 < V ? g[ke + 1].el : A;
					yr[I] === 0
						? p(null, Qe, S, Ii, C, R, N, F, T)
						: Bt && (ce < 0 || I !== Oi[ce] ? Ie(Qe, S, Ii, 2) : ce--);
				}
			}
		},
		Ie = (d, g, S, A, C = null) => {
			const { el: R, type: N, transition: F, children: T, shapeFlag: I } = d;
			if (I & 6) {
				Ie(d.component.subTree, g, S, A);
				return;
			}
			if (I & 128) {
				d.suspense.move(g, S, A);
				return;
			}
			if (I & 64) {
				N.move(d, g, S, qt);
				return;
			}
			if (N === Te) {
				n(R, g, S);
				for (let K = 0; K < T.length; K++) Ie(T[K], g, S, A);
				n(d.anchor, g, S);
				return;
			}
			if (N === ln) {
				P(d, g, S);
				return;
			}
			if (A !== 2 && I & 1 && F)
				if (A === 0) F.beforeEnter(R), n(R, g, S), Ce(() => F.enter(R), C);
				else {
					const { leave: K, delayLeave: H, afterLeave: B } = F,
						J = () => n(R, g, S),
						le = () => {
							K(R, () => {
								J(), B && B();
							});
						};
					H ? H(R, J, le) : le();
				}
			else n(R, g, S);
		},
		Xe = (d, g, S, A = !1, C = !1) => {
			const {
				type: R,
				props: N,
				ref: F,
				children: T,
				dynamicChildren: I,
				shapeFlag: V,
				patchFlag: K,
				dirs: H,
			} = d;
			if ((F != null && ws(F, null, S, d, !0), V & 256)) {
				g.ctx.deactivate(d);
				return;
			}
			const B = V & 1 && H,
				J = !sn(d);
			let le;
			if ((J && (le = N && N.onVnodeBeforeUnmount) && et(le, g, d), V & 6))
				cu(d.component, S, A);
			else {
				if (V & 128) {
					d.suspense.unmount(S, A);
					return;
				}
				B && Ft(d, null, g, "beforeUnmount"),
					V & 64
						? d.type.remove(d, g, S, C, qt, A)
						: I && (R !== Te || (K > 0 && K & 64))
						  ? at(I, g, S, !1, !0)
						  : ((R === Te && K & 384) || (!C && V & 16)) && at(T, g, S),
					A && Ai(d);
			}
			((J && (le = N && N.onVnodeUnmounted)) || B) &&
				Ce(() => {
					le && et(le, g, d), B && Ft(d, null, g, "unmounted");
				}, S);
		},
		Ai = (d) => {
			const { type: g, el: S, anchor: A, transition: C } = d;
			if (g === Te) {
				uu(S, A);
				return;
			}
			if (g === ln) {
				y(d);
				return;
			}
			const R = () => {
				s(S), C && !C.persisted && C.afterLeave && C.afterLeave();
			};
			if (d.shapeFlag & 1 && C && !C.persisted) {
				const { leave: N, delayLeave: F } = C,
					T = () => N(S, R);
				F ? F(d.el, R, T) : T();
			} else R();
		},
		uu = (d, g) => {
			let S;
			for (; d !== g; ) (S = w(d)), s(d), (d = S);
			s(g);
		},
		cu = (d, g, S) => {
			const { bum: A, scope: C, update: R, subTree: N, um: F } = d;
			A && Qn(A),
				C.stop(),
				R && ((R.active = !1), Xe(N, d, g, S)),
				F && Ce(F, g),
				Ce(() => {
					d.isUnmounted = !0;
				}, g),
				g &&
					g.pendingBranch &&
					!g.isUnmounted &&
					d.asyncDep &&
					!d.asyncResolved &&
					d.suspenseId === g.pendingId &&
					(g.deps--, g.deps === 0 && g.resolve());
		},
		at = (d, g, S, A = !1, C = !1, R = 0) => {
			for (let N = R; N < d.length; N++) Xe(d[N], g, S, A, C);
		},
		qr = (d) =>
			d.shapeFlag & 6
				? qr(d.component.subTree)
				: d.shapeFlag & 128
				  ? d.suspense.next()
				  : w(d.anchor || d.el);
	let Yn = !1;
	const Pi = (d, g, S) => {
			d == null
				? g._vnode && Xe(g._vnode, null, null, !0)
				: p(g._vnode || null, d, g, null, null, null, S),
				Yn || ((Yn = !0), Vi(), Po(), (Yn = !1)),
				(g._vnode = d);
		},
		qt = {
			p,
			um: Xe,
			m: Ie,
			r: Ai,
			mt: _e,
			mc: k,
			pc: ee,
			pbc: $,
			n: qr,
			o: e,
		};
	let Zn, Jn;
	return (
		t && ([Zn, Jn] = t(qt)), { render: Pi, hydrate: Zn, createApp: Lc(Pi, Zn) }
	);
}
function ns({ type: e, props: t }, r) {
	return (r === "svg" && e === "foreignObject") ||
		(r === "mathml" &&
			e === "annotation-xml" &&
			t &&
			t.encoding &&
			t.encoding.includes("html"))
		? void 0
		: r;
}
function Rt({ effect: e, update: t }, r) {
	e.allowRecurse = t.allowRecurse = r;
}
function qc(e, t) {
	return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Ko(e, t, r = !1) {
	const n = e.children,
		s = t.children;
	if (W(n) && W(s))
		for (let i = 0; i < n.length; i++) {
			const l = n[i];
			let o = s[i];
			o.shapeFlag & 1 &&
				!o.dynamicChildren &&
				((o.patchFlag <= 0 || o.patchFlag === 32) &&
					((o = s[i] = xt(s[i])), (o.el = l.el)),
				r || Ko(l, o)),
				o.type === Hn && (o.el = l.el);
		}
}
function Bc(e) {
	const t = e.slice(),
		r = [0];
	let n, s, i, l, o;
	const a = e.length;
	for (n = 0; n < a; n++) {
		const u = e[n];
		if (u !== 0) {
			if (((s = r[r.length - 1]), e[s] < u)) {
				(t[n] = s), r.push(n);
				continue;
			}
			for (i = 0, l = r.length - 1; i < l; )
				(o = (i + l) >> 1), e[r[o]] < u ? (i = o + 1) : (l = o);
			u < e[r[i]] && (i > 0 && (t[n] = r[i - 1]), (r[i] = n));
		}
	}
	for (i = r.length, l = r[i - 1]; i-- > 0; ) (r[i] = l), (l = t[l]);
	return r;
}
function Uo(e) {
	const t = e.subTree.component;
	if (t) return t.asyncDep && !t.asyncResolved ? t : Uo(t);
}
const Gc = (e) => e.__isTeleport,
	Te = Symbol.for("v-fgt"),
	Hn = Symbol.for("v-txt"),
	jr = Symbol.for("v-cmt"),
	ln = Symbol.for("v-stc"),
	Cr = [];
let qe = null;
function it(e = !1) {
	Cr.push((qe = e ? null : []));
}
function Yc() {
	Cr.pop(), (qe = Cr[Cr.length - 1] || null);
}
let Lr = 1;
function Zi(e) {
	Lr += e;
}
function zo(e) {
	return (
		(e.dynamicChildren = Lr > 0 ? qe || tr : null),
		Yc(),
		Lr > 0 && qe && qe.push(e),
		e
	);
}
function Nt(e, t, r, n, s, i) {
	return zo(oe(e, t, r, n, s, i, !0));
}
function ai(e, t, r, n, s) {
	return zo(U(e, t, r, n, s, !0));
}
function xs(e) {
	return e ? e.__v_isVNode === !0 : !1;
}
function vr(e, t) {
	return e.type === t.type && e.key === t.key;
}
const Kn = "__vInternal",
	Wo = ({ key: e }) => e ?? null,
	on = ({ ref: e, ref_key: t, ref_for: r }) => (
		typeof e == "number" && (e = "" + e),
		e != null
			? me(e) || fe(e) || Y(e)
				? { i: xe, r: e, k: t, f: !!r }
				: e
			: null
	);
function oe(
	e,
	t = null,
	r = null,
	n = 0,
	s = null,
	i = e === Te ? 0 : 1,
	l = !1,
	o = !1,
) {
	const a = {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e,
		props: t,
		key: t && Wo(t),
		ref: t && on(t),
		scopeId: Nn,
		slotScopeIds: null,
		children: r,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag: i,
		patchFlag: n,
		dynamicProps: s,
		dynamicChildren: null,
		appContext: null,
		ctx: xe,
	};
	return (
		o
			? (ui(a, r), i & 128 && e.normalize(a))
			: r && (a.shapeFlag |= me(r) ? 8 : 16),
		Lr > 0 &&
			!l &&
			qe &&
			(a.patchFlag > 0 || i & 6) &&
			a.patchFlag !== 32 &&
			qe.push(a),
		a
	);
}
const U = Zc;
function Zc(e, t = null, r = null, n = 0, s = null, i = !1) {
	if (((!e || e === pc) && (e = jr), xs(e))) {
		const o = Vt(e, t, !0);
		return (
			r && ui(o, r),
			Lr > 0 &&
				!i &&
				qe &&
				(o.shapeFlag & 6 ? (qe[qe.indexOf(e)] = o) : qe.push(o)),
			(o.patchFlag |= -2),
			o
		);
	}
	if ((uf(e) && (e = e.__vccOpts), t)) {
		t = Jc(t);
		let { class: o, style: a } = t;
		o && !me(o) && (t.class = Tn(o)),
			ue(a) && (_o(a) && !W(a) && (a = $e({}, a)), (t.style = Gs(a)));
	}
	const l = me(e) ? 1 : hc(e) ? 128 : Gc(e) ? 64 : ue(e) ? 4 : Y(e) ? 2 : 0;
	return oe(e, t, r, n, s, l, i, !0);
}
function Jc(e) {
	return e ? (_o(e) || Kn in e ? $e({}, e) : e) : null;
}
function Vt(e, t, r = !1) {
	const { props: n, ref: s, patchFlag: i, children: l } = e,
		o = t ? Qc(n || {}, t) : n;
	return {
		__v_isVNode: !0,
		__v_skip: !0,
		type: e.type,
		props: o,
		key: o && Wo(o),
		ref:
			t && t.ref ? (r && s ? (W(s) ? s.concat(on(t)) : [s, on(t)]) : on(t)) : s,
		scopeId: e.scopeId,
		slotScopeIds: e.slotScopeIds,
		children: l,
		target: e.target,
		targetAnchor: e.targetAnchor,
		staticCount: e.staticCount,
		shapeFlag: e.shapeFlag,
		patchFlag: t && e.type !== Te ? (i === -1 ? 16 : i | 16) : i,
		dynamicProps: e.dynamicProps,
		dynamicChildren: e.dynamicChildren,
		appContext: e.appContext,
		dirs: e.dirs,
		transition: e.transition,
		component: e.component,
		suspense: e.suspense,
		ssContent: e.ssContent && Vt(e.ssContent),
		ssFallback: e.ssFallback && Vt(e.ssFallback),
		el: e.el,
		anchor: e.anchor,
		ctx: e.ctx,
		ce: e.ce,
	};
}
function Qt(e = " ", t = 0) {
	return U(Hn, null, e, t);
}
function Xc(e, t) {
	const r = U(ln, null, e);
	return (r.staticCount = t), r;
}
function rt(e) {
	return e == null || typeof e == "boolean"
		? U(jr)
		: W(e)
		  ? U(Te, null, e.slice())
		  : typeof e == "object"
			  ? xt(e)
			  : U(Hn, null, String(e));
}
function xt(e) {
	return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Vt(e);
}
function ui(e, t) {
	let r = 0;
	const { shapeFlag: n } = e;
	if (t == null) t = null;
	else if (W(t)) r = 16;
	else if (typeof t == "object")
		if (n & 65) {
			const s = t.default;
			s && (s._c && (s._d = !1), ui(e, s()), s._c && (s._d = !0));
			return;
		} else {
			r = 32;
			const s = t._;
			!s && !(Kn in t)
				? (t._ctx = xe)
				: s === 3 &&
				  xe &&
				  (xe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
		}
	else
		Y(t)
			? ((t = { default: t, _ctx: xe }), (r = 32))
			: ((t = String(t)), n & 64 ? ((r = 16), (t = [Qt(t)])) : (r = 8));
	(e.children = t), (e.shapeFlag |= r);
}
function Qc(...e) {
	const t = {};
	for (let r = 0; r < e.length; r++) {
		const n = e[r];
		for (const s in n)
			if (s === "class")
				t.class !== n.class && (t.class = Tn([t.class, n.class]));
			else if (s === "style") t.style = Gs([t.style, n.style]);
			else if (In(s)) {
				const i = t[s],
					l = n[s];
				l &&
					i !== l &&
					!(W(i) && i.includes(l)) &&
					(t[s] = i ? [].concat(i, l) : l);
			} else s !== "" && (t[s] = n[s]);
	}
	return t;
}
function et(e, t, r, n = null) {
	Ze(e, t, 7, [r, n]);
}
const ef = jo();
let tf = 0;
function rf(e, t, r) {
	const n = e.type,
		s = (t ? t.appContext : e.appContext) || ef,
		i = {
			uid: tf++,
			vnode: e,
			type: n,
			parent: t,
			appContext: s,
			root: null,
			next: null,
			subTree: null,
			effect: null,
			update: null,
			scope: new no(!0),
			render: null,
			proxy: null,
			exposed: null,
			exposeProxy: null,
			withProxy: null,
			provides: t ? t.provides : Object.create(s.provides),
			accessCache: null,
			renderCache: [],
			components: null,
			directives: null,
			propsOptions: No(n, s),
			emitsOptions: Oo(n, s),
			emit: null,
			emitted: null,
			propsDefaults: ae,
			inheritAttrs: n.inheritAttrs,
			ctx: ae,
			data: ae,
			props: ae,
			attrs: ae,
			slots: ae,
			refs: ae,
			setupState: ae,
			setupContext: null,
			attrsProxy: null,
			slotsProxy: null,
			suspense: r,
			suspenseId: r ? r.pendingId : 0,
			asyncDep: null,
			asyncResolved: !1,
			isMounted: !1,
			isUnmounted: !1,
			isDeactivated: !1,
			bc: null,
			c: null,
			bm: null,
			m: null,
			bu: null,
			u: null,
			um: null,
			bum: null,
			da: null,
			a: null,
			rtg: null,
			rtc: null,
			ec: null,
			sp: null,
		};
	return (
		(i.ctx = { _: i }),
		(i.root = t ? t.root : i),
		(i.emit = ic.bind(null, i)),
		e.ce && e.ce(i),
		i
	);
}
let ye = null;
const Ss = () => ye || xe;
let vn, Es;
{
	const e = eo(),
		t = (r, n) => {
			let s;
			return (
				(s = e[r]) || (s = e[r] = []),
				s.push(n),
				(i) => {
					s.length > 1 ? s.forEach((l) => l(i)) : s[0](i);
				}
			);
		};
	(vn = t("__VUE_INSTANCE_SETTERS__", (r) => (ye = r))),
		(Es = t("__VUE_SSR_SETTERS__", (r) => (Un = r)));
}
const Dr = (e) => {
		const t = ye;
		return (
			vn(e),
			e.scope.on(),
			() => {
				e.scope.off(), vn(t);
			}
		);
	},
	Ji = () => {
		ye && ye.scope.off(), vn(null);
	};
function qo(e) {
	return e.vnode.shapeFlag & 4;
}
let Un = !1;
function nf(e, t = !1) {
	t && Es(t);
	const { props: r, children: n } = e.vnode,
		s = qo(e);
	Vc(e, r, s, t), Kc(e, n);
	const i = s ? sf(e, t) : void 0;
	return t && Es(!1), i;
}
function sf(e, t) {
	const r = e.type;
	(e.accessCache = Object.create(null)), (e.proxy = Ut(new Proxy(e.ctx, Ic)));
	const { setup: n } = r;
	if (n) {
		const s = (e.setupContext = n.length > 1 ? of(e) : null),
			i = Dr(e);
		Ht();
		const l = At(n, e, 0, [e.props, s]);
		if ((Kt(), i(), Jl(l))) {
			if ((l.then(Ji, Ji), t))
				return l
					.then((o) => {
						Xi(e, o, t);
					})
					.catch((o) => {
						jn(o, e, 0);
					});
			e.asyncDep = l;
		} else Xi(e, l, t);
	} else Bo(e, t);
}
function Xi(e, t, r) {
	Y(t)
		? e.type.__ssrInlineRender
			? (e.ssrRender = t)
			: (e.render = t)
		: ue(t) && (e.setupState = xo(t)),
		Bo(e, r);
}
let Qi;
function Bo(e, t, r) {
	const n = e.type;
	if (!e.render) {
		if (!t && Qi && !n.render) {
			const s = n.template || li(e).template;
			if (s) {
				const { isCustomElement: i, compilerOptions: l } = e.appContext.config,
					{ delimiters: o, compilerOptions: a } = n,
					u = $e($e({ isCustomElement: i, delimiters: o }, l), a);
				n.render = Qi(s, u);
			}
		}
		e.render = n.render || je;
	}
	{
		const s = Dr(e);
		Ht();
		try {
			kc(e);
		} finally {
			Kt(), s();
		}
	}
}
function lf(e) {
	return (
		e.attrsProxy ||
		(e.attrsProxy = new Proxy(e.attrs, {
			get(t, r) {
				return Oe(e, "get", "$attrs"), t[r];
			},
		}))
	);
}
function of(e) {
	const t = (r) => {
		e.exposed = r || {};
	};
	return {
		get attrs() {
			return lf(e);
		},
		slots: e.slots,
		emit: e.emit,
		expose: t,
	};
}
function zn(e) {
	if (e.exposed)
		return (
			e.exposeProxy ||
			(e.exposeProxy = new Proxy(xo(Ut(e.exposed)), {
				get(t, r) {
					if (r in t) return t[r];
					if (r in Pr) return Pr[r](e);
				},
				has(t, r) {
					return r in t || r in Pr;
				},
			}))
		);
}
function af(e, t = !0) {
	return Y(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function uf(e) {
	return Y(e) && "__vccOpts" in e;
}
const de = (e, t) => qu(e, t, Un);
function Ct(e, t, r) {
	const n = arguments.length;
	return n === 2
		? ue(t) && !W(t)
			? xs(t)
				? U(e, null, [t])
				: U(e, t)
			: U(e, null, t)
		: (n > 3
				? (r = Array.prototype.slice.call(arguments, 2))
				: n === 3 && xs(r) && (r = [r]),
		  U(e, t, r));
}
const cf = "3.4.15"; /**
 * @vue/runtime-dom v3.4.15
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/
const ff = "http://www.w3.org/2000/svg",
	pf = "http://www.w3.org/1998/Math/MathML",
	St = typeof document < "u" ? document : null,
	el = St && St.createElement("template"),
	df = {
		insert: (e, t, r) => {
			t.insertBefore(e, r || null);
		},
		remove: (e) => {
			const t = e.parentNode;
			t && t.removeChild(e);
		},
		createElement: (e, t, r, n) => {
			const s =
				t === "svg"
					? St.createElementNS(ff, e)
					: t === "mathml"
					  ? St.createElementNS(pf, e)
					  : St.createElement(e, r ? { is: r } : void 0);
			return (
				e === "select" &&
					n &&
					n.multiple != null &&
					s.setAttribute("multiple", n.multiple),
				s
			);
		},
		createText: (e) => St.createTextNode(e),
		createComment: (e) => St.createComment(e),
		setText: (e, t) => {
			e.nodeValue = t;
		},
		setElementText: (e, t) => {
			e.textContent = t;
		},
		parentNode: (e) => e.parentNode,
		nextSibling: (e) => e.nextSibling,
		querySelector: (e) => St.querySelector(e),
		setScopeId(e, t) {
			e.setAttribute(t, "");
		},
		insertStaticContent(e, t, r, n, s, i) {
			const l = r ? r.previousSibling : t.lastChild;
			if (s && (s === i || s.nextSibling))
				for (
					;
					t.insertBefore(s.cloneNode(!0), r),
						!(s === i || !(s = s.nextSibling));
				);
			else {
				el.innerHTML =
					n === "svg"
						? `<svg>${e}</svg>`
						: n === "mathml"
						  ? `<math>${e}</math>`
						  : e;
				const o = el.content;
				if (n === "svg" || n === "mathml") {
					const a = o.firstChild;
					for (; a.firstChild; ) o.appendChild(a.firstChild);
					o.removeChild(a);
				}
				t.insertBefore(o, r);
			}
			return [
				l ? l.nextSibling : t.firstChild,
				r ? r.previousSibling : t.lastChild,
			];
		},
	},
	hf = Symbol("_vtc");
function mf(e, t, r) {
	const n = e[hf];
	n && (t = (t ? [t, ...n] : [...n]).join(" ")),
		t == null
			? e.removeAttribute("class")
			: r
			  ? e.setAttribute("class", t)
			  : (e.className = t);
}
const ci = Symbol("_vod"),
	_n = {
		beforeMount(e, { value: t }, { transition: r }) {
			(e[ci] = e.style.display === "none" ? "" : e.style.display),
				r && t ? r.beforeEnter(e) : _r(e, t);
		},
		mounted(e, { value: t }, { transition: r }) {
			r && t && r.enter(e);
		},
		updated(e, { value: t, oldValue: r }, { transition: n }) {
			!t != !r &&
				(n
					? t
						? (n.beforeEnter(e), _r(e, !0), n.enter(e))
						: n.leave(e, () => {
								_r(e, !1);
						  })
					: _r(e, t));
		},
		beforeUnmount(e, { value: t }) {
			_r(e, t);
		},
	};
function _r(e, t) {
	e.style.display = t ? e[ci] : "none";
}
const gf = Symbol("");
function bf(e, t, r) {
	const n = e.style,
		s = n.display,
		i = me(r);
	if (r && !i) {
		if (t && !me(t)) for (const l in t) r[l] == null && As(n, l, "");
		for (const l in r) As(n, l, r[l]);
	} else if (i) {
		if (t !== r) {
			const l = n[gf];
			l && (r += ";" + l), (n.cssText = r);
		}
	} else t && e.removeAttribute("style");
	ci in e && (n.display = s);
}
const tl = /\s*!important$/;
function As(e, t, r) {
	if (W(r)) r.forEach((n) => As(e, t, n));
	else if ((r == null && (r = ""), t.startsWith("--"))) e.setProperty(t, r);
	else {
		const n = yf(e, t);
		tl.test(r)
			? e.setProperty(mr(n), r.replace(tl, ""), "important")
			: (e[n] = r);
	}
}
const rl = ["Webkit", "Moz", "ms"],
	ss = {};
function yf(e, t) {
	const r = ss[t];
	if (r) return r;
	let n = lt(t);
	if (n !== "filter" && n in e) return (ss[t] = n);
	n = Rn(n);
	for (let s = 0; s < rl.length; s++) {
		const i = rl[s] + n;
		if (i in e) return (ss[t] = i);
	}
	return t;
}
const nl = "http://www.w3.org/1999/xlink";
function vf(e, t, r, n, s) {
	if (n && t.startsWith("xlink:"))
		r == null
			? e.removeAttributeNS(nl, t.slice(6, t.length))
			: e.setAttributeNS(nl, t, r);
	else {
		const i = wu(t);
		r == null || (i && !to(r))
			? e.removeAttribute(t)
			: e.setAttribute(t, i ? "" : r);
	}
}
function _f(e, t, r, n, s, i, l) {
	if (t === "innerHTML" || t === "textContent") {
		n && l(n, s, i), (e[t] = r ?? "");
		return;
	}
	const o = e.tagName;
	if (t === "value" && o !== "PROGRESS" && !o.includes("-")) {
		e._value = r;
		const u = o === "OPTION" ? e.getAttribute("value") : e.value,
			f = r ?? "";
		u !== f && (e.value = f), r == null && e.removeAttribute(t);
		return;
	}
	let a = !1;
	if (r === "" || r == null) {
		const u = typeof e[t];
		u === "boolean"
			? (r = to(r))
			: r == null && u === "string"
			  ? ((r = ""), (a = !0))
			  : u === "number" && ((r = 0), (a = !0));
	}
	try {
		e[t] = r;
	} catch {}
	a && e.removeAttribute(t);
}
function $f(e, t, r, n) {
	e.addEventListener(t, r, n);
}
function wf(e, t, r, n) {
	e.removeEventListener(t, r, n);
}
const sl = Symbol("_vei");
function xf(e, t, r, n, s = null) {
	const i = e[sl] || (e[sl] = {}),
		l = i[t];
	if (n && l) l.value = n;
	else {
		const [o, a] = Sf(t);
		if (n) {
			const u = (i[t] = Pf(n, s));
			$f(e, o, u, a);
		} else l && (wf(e, o, l, a), (i[t] = void 0));
	}
}
const il = /(?:Once|Passive|Capture)$/;
function Sf(e) {
	let t;
	if (il.test(e)) {
		t = {};
		let n;
		for (; (n = e.match(il)); )
			(e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
	}
	return [e[2] === ":" ? e.slice(3) : mr(e.slice(2)), t];
}
let is = 0;
const Ef = Promise.resolve(),
	Af = () => is || (Ef.then(() => (is = 0)), (is = Date.now()));
function Pf(e, t) {
	const r = (n) => {
		if (!n._vts) n._vts = Date.now();
		else if (n._vts <= r.attached) return;
		Ze(Cf(n, r.value), t, 5, [n]);
	};
	return (r.value = e), (r.attached = Af()), r;
}
function Cf(e, t) {
	if (W(t)) {
		const r = e.stopImmediatePropagation;
		return (
			(e.stopImmediatePropagation = () => {
				r.call(e), (e._stopped = !0);
			}),
			t.map((n) => (s) => !s._stopped && n && n(s))
		);
	} else return t;
}
const ll = (e) =>
		e.charCodeAt(0) === 111 &&
		e.charCodeAt(1) === 110 &&
		e.charCodeAt(2) > 96 &&
		e.charCodeAt(2) < 123,
	Of = (e, t, r, n, s, i, l, o, a) => {
		const u = s === "svg";
		t === "class"
			? mf(e, n, u)
			: t === "style"
			  ? bf(e, r, n)
			  : In(t)
				  ? Ws(t) || xf(e, t, r, n, l)
				  : (
								t[0] === "."
									? ((t = t.slice(1)), !0)
									: t[0] === "^"
									  ? ((t = t.slice(1)), !1)
									  : If(e, t, n, u)
						  )
					  ? _f(e, t, n, i, l, o, a)
					  : (t === "true-value"
								? (e._trueValue = n)
								: t === "false-value" && (e._falseValue = n),
						  vf(e, t, n, u));
	};
function If(e, t, r, n) {
	if (n)
		return !!(
			t === "innerHTML" ||
			t === "textContent" ||
			(t in e && ll(t) && Y(r))
		);
	if (
		t === "spellcheck" ||
		t === "draggable" ||
		t === "translate" ||
		t === "form" ||
		(t === "list" && e.tagName === "INPUT") ||
		(t === "type" && e.tagName === "TEXTAREA")
	)
		return !1;
	if (t === "width" || t === "height") {
		const s = e.tagName;
		if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
			return !1;
	}
	return ll(t) && me(r) ? !1 : t in e;
}
const kf = $e({ patchProp: Of }, df);
let ol;
function Ff() {
	return ol || (ol = zc(kf));
}
const Rf = (...e) => {
	const t = Ff().createApp(...e),
		{ mount: r } = t;
	return (
		(t.mount = (n) => {
			const s = Mf(n);
			if (!s) return;
			const i = t._component;
			!Y(i) && !i.render && !i.template && (i.template = s.innerHTML),
				(s.innerHTML = "");
			const l = r(s, !1, Tf(s));
			return (
				s instanceof Element &&
					(s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
				l
			);
		}),
		t
	);
};
function Tf(e) {
	if (e instanceof SVGElement) return "svg";
	if (typeof MathMLElement == "function" && e instanceof MathMLElement)
		return "mathml";
}
function Mf(e) {
	return me(e) ? document.querySelector(e) : e;
}
var jf = !1; /*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let Go;
const Wn = (e) => (Go = e),
	Yo = Symbol();
function Ps(e) {
	return (
		e &&
		typeof e == "object" &&
		Object.prototype.toString.call(e) === "[object Object]" &&
		typeof e.toJSON != "function"
	);
}
var Or;
(function (e) {
	(e.direct = "direct"),
		(e.patchObject = "patch object"),
		(e.patchFunction = "patch function");
})(Or || (Or = {}));
function Lf() {
	const e = so(!0),
		t = e.run(() => te({}));
	let r = [],
		n = [];
	const s = Ut({
		install(i) {
			Wn(s),
				(s._a = i),
				i.provide(Yo, s),
				(i.config.globalProperties.$pinia = s),
				n.forEach((l) => r.push(l)),
				(n = []);
		},
		use(i) {
			return !this._a && !jf ? n.push(i) : r.push(i), this;
		},
		_p: r,
		_a: null,
		_e: e,
		_s: new Map(),
		state: t,
	});
	return s;
}
const Zo = () => {};
function al(e, t, r, n = Zo) {
	e.push(t);
	const s = () => {
		const i = e.indexOf(t);
		i > -1 && (e.splice(i, 1), n());
	};
	return !r && io() && Su(s), s;
}
function Gt(e, ...t) {
	e.slice().forEach((r) => {
		r(...t);
	});
}
const Nf = (e) => e();
function Cs(e, t) {
	e instanceof Map && t instanceof Map && t.forEach((r, n) => e.set(n, r)),
		e instanceof Set && t instanceof Set && t.forEach(e.add, e);
	for (const r in t) {
		if (!t.hasOwnProperty(r)) continue;
		const n = t[r],
			s = e[r];
		Ps(s) && Ps(n) && e.hasOwnProperty(r) && !fe(n) && !st(n)
			? (e[r] = Cs(s, n))
			: (e[r] = n);
	}
	return e;
}
const Vf = Symbol();
function Df(e) {
	return !Ps(e) || !e.hasOwnProperty(Vf);
}
const { assign: $t } = Object;
function Hf(e) {
	return !!(fe(e) && e.effect);
}
function Kf(e, t, r, n) {
	const { state: s, actions: i, getters: l } = t,
		o = r.state.value[e];
	let a;
	function u() {
		o || (r.state.value[e] = s ? s() : {});
		const f = Zu(r.state.value[e]);
		return $t(
			f,
			i,
			Object.keys(l || {}).reduce(
				(c, w) => (
					(c[w] = Ut(
						de(() => {
							Wn(r);
							const b = r._s.get(e);
							return l[w].call(b, b);
						}),
					)),
					c
				),
				{},
			),
		);
	}
	return (a = Jo(e, u, t, r, n, !0)), a;
}
function Jo(e, t, r = {}, n, s, i) {
	let l;
	const o = $t({ actions: {} }, r),
		a = { deep: !0 };
	let u,
		f,
		c = [],
		w = [],
		b;
	const x = n.state.value[e];
	!i && !x && (n.state.value[e] = {}), te({});
	let p;
	function m(k) {
		let L;
		(u = f = !1),
			typeof k == "function"
				? (k(n.state.value[e]),
				  (L = { type: Or.patchFunction, storeId: e, events: b }))
				: (Cs(n.state.value[e], k),
				  (L = { type: Or.patchObject, payload: k, storeId: e, events: b }));
		const $ = (p = Symbol());
		ni().then(() => {
			p === $ && (u = !0);
		}),
			(f = !0),
			Gt(c, L, n.state.value[e]);
	}
	const v = i
		? function () {
				const { state: L } = r,
					$ = L ? L() : {};
				this.$patch((M) => {
					$t(M, $);
				});
		  }
		: Zo;
	function O() {
		l.stop(), (c = []), (w = []), n._s.delete(e);
	}
	function P(k, L) {
		return function () {
			Wn(n);
			const $ = Array.from(arguments),
				M = [],
				j = [];
			function G(D) {
				M.push(D);
			}
			function _e(D) {
				j.push(D);
			}
			Gt(w, { args: $, name: k, store: _, after: G, onError: _e });
			let Q;
			try {
				Q = L.apply(this && this.$id === e ? this : _, $);
			} catch (D) {
				throw (Gt(j, D), D);
			}
			return Q instanceof Promise
				? Q.then((D) => (Gt(M, D), D)).catch(
						(D) => (Gt(j, D), Promise.reject(D)),
				  )
				: (Gt(M, Q), Q);
		};
	}
	const y = {
			_p: n,
			$id: e,
			$onAction: al.bind(null, w),
			$patch: m,
			$reset: v,
			$subscribe(k, L = {}) {
				const $ = al(c, k, L.detached, () => M()),
					M = l.run(() =>
						Ve(
							() => n.state.value[e],
							(j) => {
								(L.flush === "sync" ? f : u) &&
									k({ storeId: e, type: Or.direct, events: b }, j);
							},
							$t({}, a, L),
						),
					);
				return $;
			},
			$dispose: O,
		},
		_ = ct(y);
	n._s.set(e, _);
	const E = ((n._a && n._a.runWithContext) || Nf)(() =>
		n._e.run(() => (l = so()).run(t)),
	);
	for (const k in E) {
		const L = E[k];
		if ((fe(L) && !Hf(L)) || st(L))
			i ||
				(x && Df(L) && (fe(L) ? (L.value = x[k]) : Cs(L, x[k])),
				(n.state.value[e][k] = L));
		else if (typeof L == "function") {
			const $ = P(k, L);
			(E[k] = $), (o.actions[k] = L);
		}
	}
	return (
		$t(_, E),
		$t(se(_), E),
		Object.defineProperty(_, "$state", {
			get: () => n.state.value[e],
			set: (k) => {
				m((L) => {
					$t(L, k);
				});
			},
		}),
		n._p.forEach((k) => {
			$t(
				_,
				l.run(() => k({ store: _, app: n._a, pinia: n, options: o })),
			);
		}),
		x && i && r.hydrate && r.hydrate(_.$state, x),
		(u = !0),
		(f = !0),
		_
	);
}
function Uf(e, t, r) {
	let n, s;
	const i = typeof t == "function";
	typeof e == "string" ? ((n = e), (s = i ? r : t)) : ((s = e), (n = e.id));
	function l(o, a) {
		const u = Nc();
		return (
			(o = o || (u ? Ne(Yo, null) : null)),
			o && Wn(o),
			(o = Go),
			o._s.has(n) || (i ? Jo(n, t, s, o) : Kf(n, s, o)),
			o._s.get(n)
		);
	}
	return (l.$id = n), l;
}
var Xo = ["__key", "__init", "__shim", "__original", "__index", "__prevKey"];
function gr() {
	return Math.random().toString(36).substring(2, 15);
}
function zf(e, t) {
	const r = e instanceof Set ? e : new Set(e);
	return t && t.forEach((n) => r.add(n)), [...r];
}
function q(e, t) {
	return Object.prototype.hasOwnProperty.call(e, t);
}
function Ae(e, t, r = !0, n = ["__key"]) {
	if (e === t) return !0;
	if (typeof t == "object" && typeof e == "object") {
		if (e instanceof Map || e instanceof Set) return !1;
		if (e instanceof Date && t instanceof Date)
			return e.getTime() === t.getTime();
		if (e instanceof RegExp && t instanceof RegExp) return Wf(e, t);
		if (
			e === null ||
			t === null ||
			Object.keys(e).length !== Object.keys(t).length
		)
			return !1;
		for (const s of n) if ((s in e || s in t) && e[s] !== t[s]) return !1;
		for (const s in e)
			if (!(s in t) || (e[s] !== t[s] && !r) || (r && !Ae(e[s], t[s], r, n)))
				return !1;
		return !0;
	}
	return !1;
}
function Wf(e, t) {
	return (
		e.source === t.source &&
		e.flags.split("").sort().join("") === t.flags.split("").sort().join("")
	);
}
function De(e) {
	const t = typeof e;
	if (t === "number") return !1;
	if (e === void 0) return !0;
	if (t === "string") return e === "";
	if (t === "object") {
		if (e === null) return !0;
		for (const r in e) return !1;
		return !(e instanceof RegExp || e instanceof Date);
	}
	return !1;
}
function qf(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Bf(e) {
	const t = `^${qf(e)}$`,
		r = {
			MM: "(0[1-9]|1[012])",
			M: "([1-9]|1[012])",
			DD: "([012][0-9]|3[01])",
			D: "([012]?[0-9]|3[01])",
			YYYY: "\\d{4}",
			YY: "\\d{2}",
		},
		n = Object.keys(r);
	return new RegExp(n.reduce((s, i) => s.replace(i, r[i]), t));
}
function Os(e) {
	return Object.prototype.toString.call(e) === "[object Object]";
}
function Ir(e) {
	return Os(e) || Array.isArray(e);
}
function cr(e) {
	if (Os(e) === !1 || e.__FKNode__ || e.__POJO__ === !1) return !1;
	const t = e.constructor;
	if (t === void 0) return !0;
	const r = t.prototype;
	return !(Os(r) === !1 || r.hasOwnProperty("isPrototypeOf") === !1);
}
var Ot = (e, t, r = !1, n = !1) => {
	if (t === null) return null;
	const s = {};
	if (typeof t == "string") return t;
	for (const i in e)
		if (q(t, i) && (t[i] !== void 0 || !n)) {
			if (r && Array.isArray(e[i]) && Array.isArray(t[i])) {
				s[i] = e[i].concat(t[i]);
				continue;
			}
			if (t[i] === void 0) continue;
			cr(e[i]) && cr(t[i]) ? (s[i] = Ot(e[i], t[i], r, n)) : (s[i] = t[i]);
		} else s[i] = e[i];
	for (const i in t) !q(s, i) && t[i] !== void 0 && (s[i] = t[i]);
	return s;
};
function Gf(e) {
	if ((e[0] !== '"' && e[0] !== "'") || e[0] !== e[e.length - 1]) return !1;
	const t = e[0];
	for (let r = 1; r < e.length; r++)
		if (e[r] === t && (r === 1 || e[r - 1] !== "\\") && r !== e.length - 1)
			return !1;
	return !0;
}
function Yf(e) {
	if (!e.length) return "";
	let t = "",
		r = "";
	for (let n = 0; n < e.length; n++) {
		const s = e.charAt(n);
		(s !== "\\" || r === "\\") && (t += s), (r = s);
	}
	return t;
}
function Yt(...e) {
	return e.reduce((t, r) => {
		const { value: n, name: s, modelValue: i, config: l, plugins: o, ...a } = r;
		return Object.assign(t, a);
	}, {});
}
function Zf(e) {
	const t = [];
	let r = "",
		n = 0,
		s = "",
		i = "";
	for (let l = 0; l < e.length; l++) {
		const o = e.charAt(l);
		o === s && i !== "\\"
			? (s = "")
			: (o === "'" || o === '"') && !s && i !== "\\"
			  ? (s = o)
			  : o === "(" && !s
				  ? n++
				  : o === ")" && !s && n--,
			o === "," && !s && n === 0
				? (t.push(r), (r = ""))
				: (o !== " " || s) && (r += o),
			(i = o);
	}
	return r && t.push(r), t;
}
function ul(e, t) {
	const r = {},
		n = t.filter((i) => i instanceof RegExp),
		s = new Set(t);
	for (const i in e) !s.has(i) && !n.some((l) => l.test(i)) && (r[i] = e[i]);
	return r;
}
function cl(e, t) {
	const r = {},
		n = t.filter((s) => s instanceof RegExp);
	return (
		t.forEach((s) => {
			s instanceof RegExp || (r[s] = e[s]);
		}),
		Object.keys(e).forEach((s) => {
			n.some((i) => i.test(s)) && (r[s] = e[s]);
		}),
		r
	);
}
function sr(e) {
	return e.replace(/-([a-z0-9])/gi, (t, r) => r.toUpperCase());
}
function Qo(e) {
	return e
		.replace(/([a-z0-9])([A-Z])/g, (t, r, n) => r + "-" + n.toLowerCase())
		.replace(" ", "-")
		.toLowerCase();
}
function Is(e, t = Xo) {
	if (e !== null && typeof e == "object") {
		let r;
		if ((Array.isArray(e) ? (r = [...e]) : cr(e) && (r = { ...e }), r))
			return Xf(e, r, t), r;
	}
	return e;
}
function fr(e, t = Xo) {
	if (
		e === null ||
		e instanceof RegExp ||
		e instanceof Date ||
		e instanceof Map ||
		e instanceof Set ||
		(typeof File == "function" && e instanceof File)
	)
		return e;
	let r;
	Array.isArray(e)
		? (r = e.map((n) => (typeof n == "object" ? fr(n, t) : n)))
		: (r = Object.keys(e).reduce(
				(n, s) => ((n[s] = typeof e[s] == "object" ? fr(e[s], t) : e[s]), n),
				{},
		  ));
	for (const n of t)
		n in e && Object.defineProperty(r, n, { enumerable: !1, value: e[n] });
	return r;
}
function Be(e) {
	return typeof e == "object" ? fr(e) : e;
}
function Jf(e, t) {
	if (!e || typeof e != "object") return null;
	const r = t.split(".");
	let n = e;
	for (const s in r) {
		const i = r[s];
		if ((q(n, i) && (n = n[i]), +s === r.length - 1)) return n;
		if (!n || typeof n != "object") return null;
	}
	return null;
}
function Ge(e) {
	return e !== void 0 && e !== "false" && e !== !1 ? !0 : void 0;
}
function pr(e) {
	return Object.isFrozen(e)
		? e
		: Object.defineProperty(e, "__init", { enumerable: !1, value: !0 });
}
function fi(e) {
	return e
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]/g, " ")
		.trim()
		.replace(/\s+/g, "-");
}
function Xf(e, t, r) {
	for (const n of r)
		n in e && Object.defineProperty(t, n, { enumerable: !1, value: e[n] });
	return t;
}
function Qf(e) {
	let t = !1;
	return (...r) => {
		if (!t) return (t = !0), queueMicrotask(() => (t = !1)), e(...r);
	};
}
function ep(e) {
	if (!(e === "false" || e === !1)) return !0;
}
function pi() {
	const e = [];
	let t = 0;
	const r = (s) => e.push(s),
		n = (s) => {
			const i = e[t];
			return typeof i == "function" ? i(s, (l) => (t++, n(l))) : ((t = 0), s);
		};
	return (
		(r.dispatch = n),
		(r.unshift = (s) => e.unshift(s)),
		(r.remove = (s) => {
			const i = e.indexOf(s);
			i > -1 && e.splice(i, 1);
		}),
		r
	);
}
function ea() {
	const e = new Map(),
		t = new Map();
	let r;
	const n = (s, i) => {
		if (r) {
			r.set(i.name, [s, i]);
			return;
		}
		e.has(i.name) &&
			e.get(i.name).forEach((l) => {
				(i.origin === s || l.modifiers.includes("deep")) && l.listener(i);
			}),
			i.bubble && s.bubble(i);
	};
	return (
		(n.flush = () => {
			e.clear(), t.clear(), r == null || r.clear();
		}),
		(n.on = (s, i, l = "push") => {
			const [o, ...a] = s.split("."),
				u = i.receipt || gr(),
				f = { modifiers: a, event: o, listener: i, receipt: u };
			return (
				e.has(o) ? e.get(o)[l](f) : e.set(o, [f]),
				t.has(u) ? t.get(u)[l](o) : t.set(u, [o]),
				u
			);
		}),
		(n.off = (s) => {
			var i;
			t.has(s) &&
				((i = t.get(s)) == null ||
					i.forEach((l) => {
						const o = e.get(l);
						Array.isArray(o) &&
							e.set(
								l,
								o.filter((a) => a.receipt !== s),
							);
					}),
				t.delete(s));
		}),
		(n.pause = (s) => {
			r || (r = new Map()), s && s.walk((i) => i._e.pause());
		}),
		(n.play = (s) => {
			if (!r) return;
			const i = r;
			(r = void 0),
				i.forEach(([l, o]) => n(l, o)),
				s && s.walk((l) => l._e.play());
		}),
		n
	);
}
function tp(e, t, r, n, s = !0, i) {
	return t._e(e, { payload: n, name: r, bubble: s, origin: e, meta: i }), e;
}
function rp(e, t, r) {
	return Kr(e.parent) && e.parent._e(e.parent, r), e;
}
function np(e, t, r, n, s) {
	return t._e.on(r, n, s);
}
function sp(e, t, r) {
	return t._e.off(r), e;
}
var di = pi();
di((e, t) => (e.message || (e.message = `E${e.code}`), t(e)));
var hi = pi();
hi((e, t) => {
	e.message || (e.message = `W${e.code}`);
	const r = t(e);
	return (
		console && typeof console.warn == "function" && console.warn(r.message), r
	);
});
function zt(e, t = {}) {
	hi.dispatch({ code: e, data: t });
}
function Me(e, t = {}) {
	throw Error(di.dispatch({ code: e, data: t }).message);
}
function Je(e, t) {
	const r = {
		blocking: !1,
		key: gr(),
		meta: {},
		type: "state",
		visible: !0,
		...e,
	};
	return (
		t &&
			r.value &&
			r.meta.localize !== !1 &&
			((r.value = t.t(r)), (r.meta.locale = t.config.locale)),
		r
	);
}
var fl = {
	apply: cp,
	set: lp,
	remove: ta,
	filter: ap,
	reduce: up,
	release: dp,
	touch: op,
};
function ip(e = !1) {
	const t = {};
	let r,
		n = e,
		s = [];
	const i = new Map();
	let l;
	const o = new Proxy(t, {
		get(...a) {
			const [u, f] = a;
			return f === "buffer"
				? n
				: f === "_b"
				  ? s
				  : f === "_m"
					  ? i
					  : f === "_r"
						  ? l
						  : q(fl, f)
							  ? fl[f].bind(null, t, o, r)
							  : Reflect.get(...a);
		},
		set(a, u, f) {
			return u === "_n"
				? ((r = f), l === "__n" && ra(r, o), !0)
				: u === "_b"
				  ? ((s = f), !0)
				  : u === "buffer"
					  ? ((n = f), !0)
					  : u === "_r"
						  ? ((l = f), !0)
						  : (Me(101, r), !1);
		},
	});
	return o;
}
function lp(e, t, r, n) {
	if (t.buffer) return t._b.push([[n]]), t;
	if (e[n.key] !== n) {
		if (typeof n.value == "string" && n.meta.localize !== !1) {
			const i = n.value;
			(n.value = r.t(n)), n.value !== i && (n.meta.locale = r.props.locale);
		}
		const s = `message-${q(e, n.key) ? "updated" : "added"}`;
		(e[n.key] = Object.freeze(r.hook.message.dispatch(n))), r.emit(s, n);
	}
	return t;
}
function op(e, t) {
	for (const r in e) {
		const n = { ...e[r] };
		t.set(n);
	}
}
function ta(e, t, r, n) {
	if (q(e, n)) {
		const s = e[n];
		delete e[n], r.emit("message-removed", s);
	}
	return (
		t.buffer === !0 &&
			(t._b = t._b.filter(
				(s) => ((s[0] = s[0].filter((i) => i.key !== n)), s[1] || s[0].length),
			)),
		t
	);
}
function ap(e, t, r, n, s) {
	for (const i in e) {
		const l = e[i];
		(!s || l.type === s) && !n(l) && ta(e, t, r, i);
	}
}
function up(e, t, r, n, s) {
	for (const i in e) {
		const l = e[i];
		s = n(s, l);
	}
	return s;
}
function cp(e, t, r, n, s) {
	if (Array.isArray(n)) {
		if (t.buffer) {
			t._b.push([n, s]);
			return;
		}
		const i = new Set(n.map((l) => (t.set(l), l.key)));
		typeof s == "string"
			? t.filter((l) => l.type !== s || i.has(l.key))
			: typeof s == "function" && t.filter((l) => !s(l) || i.has(l.key));
	} else
		for (const i in n) {
			const l = r.at(i);
			l ? l.store.apply(n[i], s) : pp(r, t, i, n[i], s);
		}
}
function fp(e, ...t) {
	const r = `${e.name}-set`,
		n = (s) =>
			Je({
				key: fi(s),
				type: "error",
				value: s,
				meta: { source: r, autoClear: !0 },
			});
	return t
		.filter((s) => !!s)
		.map((s) => {
			if ((typeof s == "string" && (s = [s]), Array.isArray(s)))
				return s.map((i) => n(i));
			{
				const i = {};
				for (const l in s)
					Array.isArray(s[l])
						? (i[l] = s[l].map((o) => n(o)))
						: (i[l] = [n(s[l])]);
				return i;
			}
		});
}
function pp(e, t, r, n, s) {
	var l;
	const i = t._m;
	i.has(r) || i.set(r, []),
		t._r || (t._r = ra(e, t)),
		(l = i.get(r)) == null || l.push([n, s]);
}
function ra(e, t) {
	return e.on("child.deep", ({ payload: r }) => {
		t._m.forEach((n, s) => {
			e.at(s) === r &&
				(n.forEach(([i, l]) => {
					r.store.apply(i, l);
				}),
				t._m.delete(s));
		}),
			t._m.size === 0 && t._r && (e.off(t._r), (t._r = void 0));
	});
}
function dp(e, t) {
	(t.buffer = !1), t._b.forEach(([r, n]) => t.apply(r, n)), (t._b = []);
}
function hp() {
	const e = {};
	let t;
	return {
		count: (...r) => mp(t, e, ...r),
		init(r) {
			(t = r),
				r.on("message-added.deep", pl(e, 1)),
				r.on("message-removed.deep", pl(e, -1));
		},
		merge: (r) => dl(t, e, r),
		settled(r) {
			return q(e, r) ? e[r].promise : Promise.resolve();
		},
		unmerge: (r) => dl(t, e, r, !0),
		value(r) {
			return q(e, r) ? e[r].count : 0;
		},
	};
}
function mp(e, t, r, n, s = 0) {
	if (((n = gp(n || r)), !q(t, r))) {
		const i = {
			condition: n,
			count: 0,
			name: r,
			node: e,
			promise: Promise.resolve(),
			resolve: () => {},
		};
		(t[r] = i),
			(s = e.store.reduce((l, o) => l + i.condition(o) * 1, s)),
			e.each((l) => {
				l.ledger.count(i.name, i.condition), (s += l.ledger.value(i.name));
			});
	}
	return na(t[r], s).promise;
}
function gp(e) {
	return typeof e == "function" ? e : (t) => t.type === e;
}
function na(e, t) {
	const r = e.count,
		n = e.count + t;
	return (
		(e.count = n),
		r === 0 && n !== 0
			? (e.node.emit(`unsettled:${e.name}`, e.count, !1),
			  (e.promise = new Promise((s) => (e.resolve = s))))
			: r !== 0 &&
			  n === 0 &&
			  (e.node.emit(`settled:${e.name}`, e.count, !1), e.resolve()),
		e.node.emit(`count:${e.name}`, e.count, !1),
		e
	);
}
function pl(e, t) {
	return (r) => {
		for (const n in e) {
			const s = e[n];
			s.condition(r.payload) && na(s, t);
		}
	};
}
function dl(e, t, r, n = !1) {
	const s = e;
	for (const i in t) {
		const l = t[i].condition;
		n || r.ledger.count(i, l);
		const o = r.ledger.value(i) * (n ? -1 : 1);
		if (e) {
			do e.ledger.count(i, l, o), (e = e.parent);
			while (e);
			e = s;
		}
	}
}
var mi = new Map(),
	an = new Map(),
	gi = ea(),
	bp = [];
function yp(e) {
	e.props.id &&
		(mi.set(e.props.id, e),
		an.set(e, e.props.id),
		gi(e, { payload: e, name: e.props.id, bubble: !1, origin: e }));
}
function vp(e) {
	if (an.has(e)) {
		const t = an.get(e);
		an.delete(e),
			mi.delete(t),
			gi(e, { payload: null, name: t, bubble: !1, origin: e });
	}
}
function Hr(e) {
	return mi.get(e);
}
function _p(e, t) {
	bp.push(gi.on(e, t));
}
function ks(e, t, r) {
	let n = !0;
	return (
		t in e.config._t ? (n = !1) : e.emit(`config:${t}`, r, !1),
		t in e.props ||
			(e.emit("prop", { prop: t, value: r }), e.emit(`prop:${t}`, r)),
		n
	);
}
function $p(e = {}) {
	const t = new Set(),
		r = { ...e, _add: (s) => t.add(s), _rm: (s) => t.delete(s) };
	return new Proxy(r, {
		set(s, i, l, o) {
			return (
				typeof i == "string" && t.forEach((a) => ks(a, i, l)),
				Reflect.set(s, i, l, o)
			);
		},
	});
}
function sa(e, t) {
	const r = (t || document).getElementById(e);
	if (r instanceof HTMLFormElement) {
		const n = new Event("submit", { cancelable: !0, bubbles: !0 });
		r.dispatchEvent(n);
		return;
	}
	zt(151, e);
}
function wp(e) {
	const t = (r) => {
		for (const n in r.store) {
			const s = r.store[n];
			s.type === "error" || (s.type === "ui" && n === "incomplete")
				? r.store.remove(n)
				: s.type === "state" && r.store.set({ ...s, value: !1 });
		}
	};
	t(e), e.walk(t);
}
function ia(e, t) {
	const r = typeof e == "string" ? Hr(e) : e;
	if (r) {
		const n = (l) =>
			Be(l.props.initial) ||
			(l.type === "group" ? {} : l.type === "list" ? [] : void 0);
		r._e.pause(r);
		const s = Be(t);
		return (
			t &&
				!De(t) &&
				((r.props.initial = Ir(s) ? pr(s) : s),
				(r.props._init = r.props.initial)),
			r.input(n(r), !1),
			r.walk((l) => {
				(l.type === "list" && l.sync) || l.input(n(l), !1);
			}),
			r.input(De(s) && s ? s : n(r), !1),
			r.type !== "input" &&
				t &&
				!De(t) &&
				Ir(t) &&
				r.walk((l) => {
					(l.props.initial = Ir(l.value) ? pr(l.value) : l.value),
						(l.props._init = l.props.initial);
				}),
			r._e.play(r),
			wp(r),
			r.emit("reset", r),
			r
		);
	}
	zt(152, e);
}
var xp = {
		delimiter: ".",
		delay: 0,
		locale: "en",
		rootClasses: (e) => ({ [`formkit-${Qo(e)}`]: !0 }),
	},
	la = Symbol("index"),
	Fs = Symbol("removed"),
	Rs = Symbol("moved"),
	oa = Symbol("inserted");
function Sp(e) {
	return e.type === "list" && Array.isArray(e._value);
}
function Kr(e) {
	return e && typeof e == "object" && e.__FKNode__ === !0;
}
var un = (e, t, r) => {
		Me(102, [e, r]);
	},
	Ep = {
		_c: re(qp, un, !1),
		add: re(Np),
		addProps: re(Lp),
		address: re(Gp, un, !1),
		at: re(Yp),
		bubble: re(rp),
		clearErrors: re(sd),
		calm: re(Tp),
		config: re(!1),
		define: re(jp),
		disturb: re(Rp),
		destroy: re(Mp),
		extend: re(ld),
		hydrate: re(kp),
		index: re(Wp, zp, !1),
		input: re(ca),
		each: re(Hp),
		emit: re(tp),
		find: re(Jp),
		on: re(np),
		off: re(sp),
		parent: re(!1, Vp),
		plugins: re(!1),
		remove: re(Dp),
		root: re(Qp, un, !1),
		reset: re(rd),
		resetConfig: re(Up),
		setErrors: re(nd),
		submit: re(td),
		t: re(ed),
		use: re(bi),
		name: re(Bp, !1, !1),
		walk: re(Kp),
	};
function Ap() {
	return new Map(Object.entries(Ep));
}
function re(e, t, r = !0) {
	return {
		get: e ? (n, s) => (r ? (...i) => e(n, s, ...i) : e(n, s)) : !1,
		set: t !== void 0 ? t : un.bind(null),
	};
}
function Pp() {
	const e = new Map();
	return new Proxy(e, {
		get(t, r) {
			return e.has(r) || e.set(r, pi()), e.get(r);
		},
	});
}
var aa = 0,
	Cp = 0;
function Op(e) {
	var t, r;
	return ((t = e.parent) == null ? void 0 : t.type) === "list"
		? la
		: e.name ||
				`${((r = e.props) == null ? void 0 : r.type) || "input"}_${++aa}`;
}
function ua(e) {
	return e.type === "group"
		? pr(
				e.value && typeof e.value == "object" && !Array.isArray(e.value)
					? e.value
					: {},
		  )
		: e.type === "list"
		  ? pr(Array.isArray(e.value) ? e.value : [])
		  : e.value;
}
function ca(e, t, r, n = !0) {
	return (
		(t._value = Ip(e, e.hook.input.dispatch(r))),
		e.emit("input", t._value),
		e.isCreated && e.type === "input" && Ae(t._value, t.value)
			? (e.emit("commitRaw", t.value), t.settled)
			: (t.isSettled && e.disturb(),
			  n
					? (t._tmo && clearTimeout(t._tmo),
					  (t._tmo = setTimeout($n, e.props.delay, e, t)))
					: $n(e, t),
			  t.settled)
	);
}
function Ip(e, t) {
	switch (e.type) {
		case "input":
			break;
		case "group":
			(!t || typeof t != "object") && Me(107, [e, t]);
			break;
		case "list":
			Array.isArray(t) || Me(108, [e, t]);
			break;
	}
	return t;
}
function $n(e, t, r = !0, n = !0) {
	(t._value = t.value = e.hook.commit.dispatch(t._value)),
		e.type !== "input" && n && e.hydrate(),
		e.emit("commitRaw", t.value),
		e.emit("commit", t.value),
		r && e.calm();
}
function fa(e, { name: t, value: r, from: n }) {
	if (!Object.isFrozen(e._value)) {
		if (Sp(e)) {
			const s =
				r === Fs
					? []
					: r === Rs && typeof n == "number"
					  ? e._value.splice(n, 1)
					  : [r];
			e._value.splice(t, r === Rs || n === oa ? 0 : 1, ...s);
			return;
		}
		r !== Fs ? (e._value[t] = r) : delete e._value[t];
	}
}
function kp(e, t) {
	const r = t._value;
	return (
		e.type === "list" && e.sync && Fp(e, t),
		t.children.forEach((n) => {
			if (typeof r == "object")
				if (n.name in r) {
					const s =
						n.type !== "input" || (r[n.name] && typeof r[n.name] == "object")
							? pr(r[n.name])
							: r[n.name];
					if (!n.isSettled || (!Ir(s) && Ae(s, n._value))) return;
					n.input(s, !1);
				} else
					(e.type !== "list" || typeof n.name == "number") &&
						fa(t, { name: n.name, value: n.value }),
						r.__init ||
							(n.type === "group"
								? n.input({}, !1)
								: n.type === "list"
								  ? n.input([], !1)
								  : n.input(void 0, !1));
		}),
		e
	);
}
function Fp(e, t) {
	const r = e._value;
	if (!Array.isArray(r)) return;
	const n = [],
		s = new Set(t.children),
		i = new Map();
	r.forEach((o, a) => {
		if (t.children[a] && t.children[a]._value === o)
			n.push(t.children[a]), s.delete(t.children[a]);
		else {
			n.push(null);
			const u = i.get(o) || [];
			u.push(a), i.set(o, u);
		}
	}),
		s.size &&
			i.size &&
			s.forEach((o) => {
				if (i.has(o._value)) {
					const a = i.get(o._value),
						u = a.shift();
					(n[u] = o), s.delete(o), a.length || i.delete(o._value);
				}
			});
	const l = [];
	for (
		i.forEach((o) => {
			l.push(...o);
		});
		s.size && l.length;
	) {
		const o = s.values().next().value,
			a = l.shift();
		if (a === void 0) break;
		(n[a] = o), s.delete(o);
	}
	l.forEach((o, a) => {
		n[o] = cd({ value: a });
	}),
		s.size &&
			s.forEach((o) => {
				if (!("__FKP" in o)) {
					const a = o._c.parent;
					if (!a || fd(a)) return;
					a.ledger.unmerge(o), (o._c.parent = null), o.destroy();
				}
			}),
		(t.children = n);
}
function Rp(e, t) {
	var r;
	return (
		t._d <= 0 &&
			((t.isSettled = !1),
			e.emit("settled", !1, !1),
			(t.settled = new Promise((n) => {
				t._resolve = n;
			})),
			e.parent && ((r = e.parent) == null || r.disturb())),
		t._d++,
		e
	);
}
function Tp(e, t, r) {
	var n;
	if (r !== void 0 && e.type !== "input") return fa(t, r), $n(e, t, !0, !1);
	t._d > 0 && t._d--,
		t._d === 0 &&
			((t.isSettled = !0),
			e.emit("settled", !0, !1),
			e.parent &&
				((n = e.parent) == null || n.calm({ name: e.name, value: t.value })),
			t._resolve && t._resolve(t.value));
}
function Mp(e, t) {
	e.emit("destroying", e),
		e.store.filter(() => !1),
		e.parent && e.parent.remove(e),
		vp(e),
		e.emit("destroyed", e),
		t._e.flush(),
		(t._value = t.value = void 0);
	for (const r in t.context) delete t.context[r];
	t.plugins.clear(), (t.context = null);
}
function jp(e, t, r) {
	t.type = r.type;
	const n = fr(r);
	(e.props.__propDefs = pa(
		e.props.__propDefs ?? [],
		(n == null ? void 0 : n.props) || [],
	)),
		(n.props = e.props.__propDefs),
		(t.props.definition = n),
		(t.value = t._value = ua({ type: e.type, value: t.value })),
		r.forceTypeProp &&
			(e.props.type && (e.props.originalType = e.props.type),
			(t.props.type = r.forceTypeProp)),
		r.family && (t.props.family = r.family),
		r.features && r.features.forEach((s) => s(e)),
		r.props && e.addProps(r.props),
		e.emit("defined", r);
}
function Lp(e, t, r) {
	const n = Array.isArray(r) ? r : Object.keys(r),
		s = Array.isArray(r)
			? {}
			: n.reduce((l, o) => ("default" in r[o] && (l[o] = r[o].default), l), {});
	if (e.props.attrs) {
		const l = { ...e.props.attrs };
		e.props._emit = !1;
		for (const a in l) {
			const u = sr(a);
			n.includes(u) && ((e.props[u] = l[a]), delete l[a]);
		}
		Array.isArray(r) ||
			n.forEach((a) => {
				"default" in r[a] && e.props[a] === void 0 && (e.props[a] = s[a]);
			});
		const o = Be(t._value);
		(e.props.initial = e.type !== "input" ? pr(o) : o),
			(e.props._emit = !0),
			(e.props.attrs = l);
	}
	const i = pa(e.props.__propDefs ?? [], r);
	return (
		e.props.definition && (e.props.definition.props = i),
		(e.props.__propDefs = i),
		e.emit("added-props", r),
		e
	);
}
function Ts(e) {
	return Array.isArray(e) ? e.reduce((t, r) => ((t[r] = {}), t), {}) : e;
}
function pa(e, t) {
	return Array.isArray(e) && Array.isArray(t) ? e.concat(t) : Ot(Ts(e), Ts(t));
}
function Np(e, t, r, n) {
	if (
		(e.type === "input" && Me(100, e),
		r.parent && r.parent !== e && r.parent.remove(r),
		!t.children.includes(r))
	) {
		if (n !== void 0 && e.type === "list") {
			const s = t.children[n];
			s && "__FKP" in s
				? ((r._c.uid = s.uid), t.children.splice(n, 1, r))
				: t.children.splice(n, 0, r),
				Array.isArray(e.value) &&
					e.value.length < t.children.length &&
					e.disturb().calm({ name: n, value: r.value, from: oa });
		} else t.children.push(r);
		r.isSettled || e.disturb();
	}
	if (r.parent !== e) {
		if (((r.parent = e), r.parent !== e))
			return e.remove(r), r.parent.add(r), e;
	} else r.use(e.plugins);
	return $n(e, t, !1), e.ledger.merge(r), e.emit("child", r), e;
}
function Vp(e, t, r, n) {
	return Kr(n)
		? (e.parent && e.parent !== n && e.parent.remove(e),
		  (t.parent = n),
		  e.resetConfig(),
		  n.children.includes(e) ? e.use(n.plugins) : n.add(e),
		  !0)
		: n === null
		  ? ((t.parent = null), !0)
		  : !1;
}
function Dp(e, t, r) {
	const n = t.children.indexOf(r);
	if (n !== -1) {
		r.isSettled && e.disturb(), t.children.splice(n, 1);
		let s = Ge(r.props.preserve),
			i = r.parent;
		for (; s === void 0 && i; ) (s = Ge(i.props.preserve)), (i = i.parent);
		s ? e.calm() : e.calm({ name: e.type === "list" ? n : r.name, value: Fs }),
			(r.parent = null),
			(r.config._rmn = r);
	}
	return e.ledger.unmerge(r), e.emit("childRemoved", r), e;
}
function Hp(e, t, r) {
	t.children.forEach((n) => !("__FKP" in n) && r(n));
}
function Kp(e, t, r, n = !1, s = !1) {
	t.children.some((i) => {
		if ("__FKP" in i) return !1;
		const l = r(i);
		return n && l === !1 ? !0 : s && l === !1 ? !1 : i.walk(r, n, s);
	});
}
function Up(e, t) {
	const r = e.parent || void 0;
	(t.config = da(e.config._t, r)), e.walk((n) => n.resetConfig());
}
function bi(e, t, r, n = !0, s = !0) {
	return Array.isArray(r) || r instanceof Set
		? (r.forEach((i) => bi(e, t, i)), e)
		: (t.plugins.has(r) ||
				(s && typeof r.library == "function" && r.library(e),
				n &&
					r(e) !== !1 &&
					(t.plugins.add(r), e.children.forEach((i) => i.use(r)))),
		  e);
}
function zp(e, t, r, n) {
	if (Kr(e.parent)) {
		const s = e.parent.children,
			i = n >= s.length ? s.length - 1 : n < 0 ? 0 : n,
			l = s.indexOf(e);
		return l === -1
			? !1
			: (s.splice(l, 1),
			  s.splice(i, 0, e),
			  (e.parent.children = s),
			  e.parent.type === "list" &&
					e.parent.disturb().calm({ name: i, value: Rs, from: l }),
			  !0);
	}
	return !1;
}
function Wp(e) {
	if (e.parent) {
		const t = [...e.parent.children].indexOf(e);
		return t === -1 ? e.parent.children.length : t;
	}
	return -1;
}
function qp(e, t) {
	return t;
}
function Bp(e, t) {
	var r;
	return ((r = e.parent) == null ? void 0 : r.type) === "list"
		? e.index
		: t.name !== la
		  ? t.name
		  : e.index;
}
function Gp(e, t) {
	return t.parent ? t.parent.address.concat([e.name]) : [e.name];
}
function Yp(e, t, r) {
	const n = typeof r == "string" ? r.split(e.config.delimiter) : r;
	if (!n.length) return;
	const s = n[0];
	let i = e.parent;
	for (
		i || (String(n[0]) === String(e.name) && n.shift(), (i = e)),
			s === "$parent" && n.shift();
		i && n.length;
	) {
		const l = n.shift();
		switch (l) {
			case "$root":
				i = e.root;
				break;
			case "$parent":
				i = i.parent;
				break;
			case "$self":
				i = e;
				break;
			default:
				i =
					i.children.find(
						(o) => !("__FKP" in o) && String(o.name) === String(l),
					) || Zp(i, l);
		}
	}
	return i || void 0;
}
function Zp(e, t) {
	const r = String(t).match(/^(find)\((.*)\)$/);
	if (r) {
		const [, n, s] = r,
			i = s.split(",").map((l) => l.trim());
		switch (n) {
			case "find":
				return e.find(i[0], i[1]);
			default:
				return;
		}
	}
}
function Jp(e, t, r, n) {
	return Xp(e, r, n);
}
function Xp(e, t, r = "name") {
	const n = typeof r == "string" ? (i) => i[r] == t : r,
		s = [e];
	for (; s.length; ) {
		const i = s.shift();
		if (!("__FKP" in i)) {
			if (n(i, t)) return i;
			s.push(...i.children);
		}
	}
}
function Qp(e) {
	let t = e;
	for (; t.parent; ) t = t.parent;
	return t;
}
function da(e = {}, t) {
	let r;
	return new Proxy(e, {
		get(...n) {
			const s = n[1];
			if (s === "_t") return e;
			const i = Reflect.get(...n);
			if (i !== void 0) return i;
			if (t) {
				const l = t.config[s];
				if (l !== void 0) return l;
			}
			if (e.rootConfig && typeof s == "string") {
				const l = e.rootConfig[s];
				if (l !== void 0) return l;
			}
			return s === "delay" && (r == null ? void 0 : r.type) === "input"
				? 20
				: xp[s];
		},
		set(...n) {
			const s = n[1],
				i = n[2];
			if (s === "_n") return (r = i), e.rootConfig && e.rootConfig._add(r), !0;
			if (s === "_rmn")
				return e.rootConfig && e.rootConfig._rm(r), (r = void 0), !0;
			if (!Ae(e[s], i, !1)) {
				const l = Reflect.set(...n);
				return (
					r &&
						(r.emit(`config:${s}`, i, !1),
						ks(r, s, i),
						r.walk((o) => ks(o, s, i), !1, !0)),
					l
				);
			}
			return !0;
		},
	});
}
function ed(e, t, r, n = "ui") {
	const s = typeof r == "string" ? { key: r, value: r, type: n } : r,
		i = e.hook.text.dispatch(s);
	return e.emit("text", i, !1), i.value;
}
function td(e) {
	const t = e.name;
	do {
		if (e.props.isForm === !0) break;
		e.parent || Me(106, t), (e = e.parent);
	} while (e);
	e.props.id && sa(e.props.id, e.props.__root);
}
function rd(e, t, r) {
	return ia(e, r);
}
function nd(e, t, r, n) {
	const s = `${e.name}-set`,
		i = e.hook.setErrors.dispatch({ localErrors: r, childErrors: n });
	return (
		fp(e, i.localErrors, i.childErrors).forEach((l) => {
			e.store.apply(l, (o) => o.meta.source === s);
		}),
		e
	);
}
function sd(e, t, r = !0, n) {
	return (
		e.store.filter((s) => !(n === void 0 || s.meta.source === n), "error"),
		r &&
			((n = n || `${e.name}-set`),
			e.walk((s) => {
				s.store.filter(
					(i) => !(i.type === "error" && i.meta && i.meta.source === n),
				);
			})),
		e
	);
}
function id(e) {
	const t = { initial: typeof e == "object" ? Be(e) : e };
	let r,
		n = !0,
		s = {};
	return new Proxy(t, {
		get(...i) {
			var f, c, w, b;
			const [l, o] = i;
			let a;
			q(t, o)
				? ((a = Reflect.get(...i)),
				  (f = s[o]) != null && f.boolean && (a = ep(a)))
				: r && typeof o == "string" && r.config[o] !== void 0
				  ? (a = r.config[o])
				  : (a = (c = s[o]) == null ? void 0 : c.default);
			const u = (w = s[o]) == null ? void 0 : w.getter;
			return (b = s[o]) != null && b.boolean && (a = !!a), u ? u(a, r) : a;
		},
		set(i, l, o, a) {
			var w;
			if (l === "_n") return (r = o), !0;
			if (l === "_emit") return (n = o), !0;
			let { prop: u, value: f } = r.hook.prop.dispatch({ prop: l, value: o });
			const c = (w = s[u]) == null ? void 0 : w.setter;
			if (((f = c ? c(f, r) : f), !Ae(t[u], f, !1) || typeof f == "object")) {
				const b = Reflect.set(i, u, f, a);
				return (
					u === "__propDefs" && (s = Ts(f)),
					n &&
						(r.emit("prop", { prop: u, value: f }),
						typeof u == "string" && r.emit(`prop:${u}`, f)),
					b
				);
			}
			return !0;
		},
	});
}
function ld(e, t, r, n) {
	return t.traps.set(r, n), e;
}
function od(e, t) {
	if (e.props.definition) return e.define(e.props.definition);
	for (const r of t) {
		if (e.props.definition) return;
		typeof r.library == "function" && r.library(e);
	}
}
function ad(e) {
	const t = ua(e),
		r = da(e.config || {}, e.parent);
	return {
		_d: 0,
		_e: ea(),
		uid: Symbol(),
		_resolve: !1,
		_tmo: !1,
		_value: t,
		children: zf(e.children || []),
		config: r,
		hook: Pp(),
		isCreated: !1,
		isSettled: !0,
		ledger: hp(),
		name: Op(e),
		parent: e.parent || null,
		plugins: new Set(),
		props: id(t),
		settled: Promise.resolve(t),
		store: ip(!0),
		sync: e.sync || !1,
		traps: Ap(),
		type: e.type || "input",
		value: t,
	};
}
function ud(e, t) {
	var n, s;
	const r = (n = t.props) == null ? void 0 : n.id;
	if (
		(r || (s = t.props) == null || delete s.id,
		e.ledger.init((e.store._n = e.props._n = e.config._n = e)),
		(e.props._emit = !1),
		Object.assign(e.props, r ? {} : { id: `input_${Cp++}` }, t.props ?? {}),
		(e.props._emit = !0),
		od(
			e,
			new Set([...(t.plugins || []), ...(e.parent ? e.parent.plugins : [])]),
		),
		t.plugins)
	)
		for (const i of t.plugins) bi(e, e._c, i, !0, !1);
	return (
		e.each((i) => e.add(i)),
		e.parent && e.parent.add(e, t.index),
		e.type === "input" && e.children.length && Me(100, e),
		ca(e, e._c, e._value, !1),
		e.store.release(),
		r && yp(e),
		e.emit("created", e),
		(e.isCreated = !0),
		e
	);
}
function cd(e) {
	return {
		__FKP: !0,
		uid: Symbol(),
		name: (e == null ? void 0 : e.name) ?? `p_${aa++}`,
		value: (e == null ? void 0 : e.value) ?? null,
		_value: (e == null ? void 0 : e.value) ?? null,
		type: (e == null ? void 0 : e.type) ?? "input",
		use: () => {},
		input(t) {
			return (this._value = t), (this.value = t), Promise.resolve();
		},
		isSettled: !0,
	};
}
function fd(e) {
	return "__FKP" in e;
}
function pd(e) {
	const t = e || {},
		r = ad(t),
		n = new Proxy(r, {
			get(...s) {
				const [, i] = s;
				if (i === "__FKNode__") return !0;
				const l = r.traps.get(i);
				return l && l.get ? l.get(n, r) : Reflect.get(...s);
			},
			set(...s) {
				const [, i, l] = s,
					o = r.traps.get(i);
				return o && o.set ? o.set(n, r, i, l) : Reflect.set(...s);
			},
		});
	return ud(n, t);
}
function Ms(e) {
	return typeof e != "string" && q(e, "$el");
}
function js(e) {
	return typeof e != "string" && q(e, "$cmp");
}
function Jt(e) {
	return !e || typeof e == "string" ? !1 : q(e, "if") && q(e, "then");
}
function dd(e) {
	return typeof e != "string" && "$formkit" in e;
}
function hd(e) {
	if (typeof e == "string") return { $el: "text", children: e };
	if (dd(e)) {
		const { $formkit: t, for: r, if: n, children: s, bind: i, ...l } = e;
		return Object.assign(
			{ $cmp: "FormKit", props: { ...l, type: t } },
			n ? { if: n } : {},
			r ? { for: r } : {},
			s ? { children: s } : {},
			i ? { bind: i } : {},
		);
	}
	return e;
}
function Ke(e) {
	let t;
	const r = new Set(),
		n = function (m, v) {
			return typeof m == "function" ? m(v) : m;
		},
		s = [
			{
				"&&": (p, m, v) => n(p, v) && n(m, v),
				"||": (p, m, v) => n(p, v) || n(m, v),
			},
			{
				"===": (p, m, v) => n(p, v) === n(m, v),
				"!==": (p, m, v) => n(p, v) !== n(m, v),
				"==": (p, m, v) => n(p, v) == n(m, v),
				"!=": (p, m, v) => n(p, v) != n(m, v),
				">=": (p, m, v) => n(p, v) >= n(m, v),
				"<=": (p, m, v) => n(p, v) <= n(m, v),
				">": (p, m, v) => n(p, v) > n(m, v),
				"<": (p, m, v) => n(p, v) < n(m, v),
			},
			{
				"+": (p, m, v) => n(p, v) + n(m, v),
				"-": (p, m, v) => n(p, v) - n(m, v),
			},
			{
				"*": (p, m, v) => n(p, v) * n(m, v),
				"/": (p, m, v) => n(p, v) / n(m, v),
				"%": (p, m, v) => n(p, v) % n(m, v),
			},
		],
		i = s.reduce((p, m) => p.concat(Object.keys(m)), []),
		l = new Set(i.map((p) => p.charAt(0)));
	function o(p, m, v, O) {
		const P = p.filter((y) => y.startsWith(m));
		return P.length
			? P.find((y) =>
					O.length >= v + y.length && O.substring(v, v + y.length) === y
						? y
						: !1,
			  )
			: !1;
	}
	function a(p, m, v = 1) {
		let O = v ? m.substring(p + 1).trim() : m.substring(0, p).trim();
		if (!O.length) return -1;
		if (!v) {
			const y = O.split("").reverse(),
				_ = y.findIndex((h) => l.has(h));
			O = y.slice(_).join("");
		}
		const P = O[0];
		return s.findIndex((y) => {
			const _ = Object.keys(y);
			return !!o(_, P, 0, O);
		});
	}
	function u(p, m) {
		let v = "";
		const O = m.length;
		let P = 0;
		for (let y = p; y < O; y++) {
			const _ = m.charAt(y);
			if (_ === "(") P++;
			else if (_ === ")") P--;
			else if (P === 0 && _ === " ") continue;
			if (P === 0 && o(i, _, y, m)) return [v, y - 1];
			v += _;
		}
		return [v, m.length - 1];
	}
	function f(p, m = 0) {
		const v = s[m],
			O = p.length,
			P = Object.keys(v);
		let y = 0,
			_ = !1,
			h = null,
			E = "",
			k = null,
			L,
			$ = "",
			M = "",
			j = "",
			G = "",
			_e = 0;
		const Q = (D, Z) => {
			D ? (j += Z) : (E += Z);
		};
		for (let D = 0; D < O; D++)
			if (
				(($ = M),
				(M = p.charAt(D)),
				(M === "'" || M === '"') &&
					$ !== "\\" &&
					((y === 0 && !_) || (y && !G)))
			) {
				y ? (G = M) : (_ = M), Q(y, M);
				continue;
			} else if (
				(_ && (M !== _ || $ === "\\")) ||
				(G && (M !== G || $ === "\\"))
			) {
				Q(y, M);
				continue;
			} else if (_ === M) {
				(_ = !1), Q(y, M);
				continue;
			} else if (G === M) {
				(G = !1), Q(y, M);
				continue;
			} else {
				if (M === " ") continue;
				if (M === "(") y === 0 ? (_e = D) : (j += M), y++;
				else if (M === ")")
					if ((y--, y === 0)) {
						const Z = typeof E == "string" && E.startsWith("$") ? E : void 0,
							ee = Z && p.charAt(D + 1) === ".";
						let ge = "";
						ee && ([ge, D] = u(D + 2, p));
						const ot = h ? m : a(_e, p, 0),
							Ie = a(D, p);
						ot === -1 && Ie === -1
							? ((E = c(j, -1, Z, ge)), typeof E == "string" && (E = j))
							: h && (ot >= Ie || Ie === -1) && m === ot
							  ? ((k = h.bind(null, c(j, -1, Z, ge))), (h = null), (E = ""))
							  : Ie > ot && m === Ie
								  ? (E = c(j, -1, Z, ge))
								  : (E += `(${j})${ee ? `.${ge}` : ""}`),
							(j = "");
					} else j += M;
				else if (y === 0 && (L = o(P, M, D, p))) {
					D === 0 && Me(103, [L, p]),
						(D += L.length - 1),
						D === p.length - 1 && Me(104, [L, p]),
						h
							? E &&
							  ((k = h.bind(null, c(E, m))),
							  (h = v[L].bind(null, k)),
							  (E = ""))
							: k
							  ? ((h = v[L].bind(null, c(k, m))), (k = null))
							  : ((h = v[L].bind(null, c(E, m))), (E = ""));
					continue;
				} else Q(y, M);
			}
		return (
			E && h && (h = h.bind(null, c(E, m))),
			(h = !h && k ? k : h),
			!h &&
				E &&
				((h = (D, Z) => (typeof D == "function" ? D(Z) : D)),
				(h = h.bind(null, c(E, m)))),
			!h && !E && Me(105, p),
			h
		);
	}
	function c(p, m, v, O) {
		if (v) {
			const P = c(v, s.length);
			let y,
				_ = O ? Ke(`$${O}`) : !1;
			if (typeof P == "function") {
				const h = Zf(String(p)).map((E) => c(E, -1));
				return (E) => {
					const k = P(E);
					return typeof k != "function"
						? (zt(150, v), k)
						: ((y = k(...h.map((L) => (typeof L == "function" ? L(E) : L)))),
						  _ &&
								(_ = _.provide((L) => {
									const $ = t(L);
									return L.reduce((j, G) => {
										if (
											G === O ||
											(O == null ? void 0 : O.startsWith(`${G}(`))
										) {
											const Q = Jf(y, G);
											j[G] = () => Q;
										} else j[G] = $[G];
										return j;
									}, {});
								})),
						  _ ? _() : y);
				};
			}
		} else if (typeof p == "string") {
			if (p === "true") return !0;
			if (p === "false") return !1;
			if (p === "undefined") return;
			if (Gf(p)) return Yf(p.substring(1, p.length - 1));
			if (!isNaN(+p)) return Number(p);
			if (m < s.length - 1) return f(p, m + 1);
			if (p.startsWith("$")) {
				const P = p.substring(1);
				return (
					r.add(P),
					function (_) {
						return P in _ ? _[P]() : void 0;
					}
				);
			}
			return p;
		}
		return p;
	}
	const w = f(e.startsWith("$:") ? e.substring(2) : e),
		b = Array.from(r);
	function x(p) {
		return (t = p), Object.assign(w.bind(null, p(b)), { provide: x });
	}
	return Object.assign(w, { provide: x });
}
function cn(e, t, r) {
	return r
		? typeof r == "string"
			? r.split(" ").reduce((s, i) => Object.assign(s, { [i]: !0 }), {})
			: typeof r == "function"
			  ? cn(e, t, r(t, e))
			  : r
		: {};
}
function md(e, t, ...r) {
	const n = r.reduce((s, i) => {
		if (!i) return ls(s);
		const { $reset: l, ...o } = i;
		return ls(l ? o : Object.assign(s, o));
	}, {});
	return (
		Object.keys(e.hook.classes.dispatch({ property: t, classes: n }).classes)
			.filter((s) => n[s])
			.join(" ") || null
	);
}
function ls(e) {
	const t = "$remove:";
	let r = !1;
	const n = Object.keys(e).filter(
		(s) => (e[s] && s.startsWith(t) && (r = !0), e[s]),
	);
	return (
		n.length > 1 &&
			r &&
			n
				.filter((i) => i.startsWith(t))
				.map((i) => {
					const l = i.substring(t.length);
					(e[l] = !1), (e[i] = !1);
				}),
		e
	);
}
function gd(e, t, r) {
	const n = Hr(e);
	n ? n.setErrors(t, r) : zt(651, e);
}
function bd(e, t = !0) {
	const r = Hr(e);
	r ? r.clearErrors(t) : zt(652, e);
}
var wn = "1.5.3",
	ha = new WeakSet();
function Nr(e, t) {
	const r = t || Object.assign(new Map(), { active: !1 }),
		n = new Map(),
		s = function (f) {
			var c;
			r.active &&
				(r.has(e) || r.set(e, new Set()), (c = r.get(e)) == null || c.add(f));
		},
		i = function (f) {
			return new Proxy(f, {
				get(...c) {
					return (
						typeof c[1] == "string" && s(`prop:${c[1]}`), Reflect.get(...c)
					);
				},
			});
		},
		l = function (f) {
			return new Proxy(f, {
				get(...c) {
					return c[1] === "value"
						? (w) => (s(`count:${w}`), f.value(w))
						: Reflect.get(...c);
				},
			});
		},
		o = function (f, c) {
			return Kr(f)
				? Nr(f, r)
				: (c === "value" && s("commit"),
				  c === "_value" && s("input"),
				  c === "props"
						? i(f)
						: c === "ledger"
						  ? l(f)
						  : (c === "children" && (s("child"), s("childRemoved")), f));
		},
		{ proxy: a, revoke: u } = Proxy.revocable(e, {
			get(...f) {
				switch (f[1]) {
					case "_node":
						return e;
					case "deps":
						return r;
					case "watch":
						return (w, b, x) => ba(a, w, b, x);
					case "observe":
						return () => {
							const w = new Map(r);
							return r.clear(), (r.active = !0), w;
						};
					case "stopObserve":
						return () => {
							const w = new Map(r);
							return (r.active = !1), w;
						};
					case "receipts":
						return n;
					case "kill":
						return () => {
							ga(n), ha.add(f[2]), u();
						};
				}
				const c = Reflect.get(...f);
				return typeof c == "function"
					? (...w) => {
							const b = c(...w);
							return o(b, f[1]);
					  }
					: o(c, f[1]);
			},
		});
	return a;
}
function ma(e, [t, r], n, s) {
	t.forEach((i, l) => {
		i.forEach((o) => {
			e.receipts.has(l) || e.receipts.set(l, {});
			const a = e.receipts.get(l) ?? {};
			(a[o] = a[o] ?? []), a[o].push(l.on(o, n, s)), e.receipts.set(l, a);
		});
	}),
		r.forEach((i, l) => {
			i.forEach((o) => {
				if (e.receipts.has(l)) {
					const a = e.receipts.get(l);
					a && q(a, o) && (a[o].map(l.off), delete a[o], e.receipts.set(l, a));
				}
			});
		});
}
function ga(e) {
	e.forEach((t, r) => {
		for (const n in t) t[n].map(r.off);
	}),
		e.clear();
}
function ba(e, t, r, n) {
	const s = (o) => {
			const a = e.stopObserve();
			ma(e, ya(i, a), () => ba(e, t, r, n), n), r && r(o);
		},
		i = new Map(e.deps);
	e.observe();
	const l = t(e);
	l instanceof Promise ? l.then((o) => s(o)) : s(l);
}
function ya(e, t) {
	const r = new Map(),
		n = new Map();
	return (
		t.forEach((s, i) => {
			if (!e.has(i)) r.set(i, s);
			else {
				const l = new Set(),
					o = e.get(i);
				s.forEach((a) => !(o != null && o.has(a)) && l.add(a)), r.set(i, l);
			}
		}),
		e.forEach((s, i) => {
			if (!t.has(i)) n.set(i, s);
			else {
				const l = new Set(),
					o = t.get(i);
				s.forEach((a) => !(o != null && o.has(a)) && l.add(a)), n.set(i, l);
			}
		}),
		[r, n]
	);
}
function va(e) {
	return ha.has(e);
}
var _a = function ({ value: t }) {
	return ["yes", "on", "1", 1, !0, "true"].includes(t);
};
_a.skipEmpty = !1;
var yd = _a,
	vd = function ({ value: e }, t = !1) {
		const r = Date.parse(t || new Date()),
			n = Date.parse(String(e));
		return isNaN(n) ? !1 : n > r;
	},
	_d = vd,
	$d = function ({ value: e }, t = "default") {
		const r = { default: new RegExp("^\\p{L}+$", "u"), latin: /^[a-z]+$/i },
			n = q(r, t) ? t : "default";
		return r[n].test(String(e));
	},
	wd = $d,
	xd = function ({ value: e }, t = "default") {
		const r = { default: /^[\p{L} ]+$/u, latin: /^[a-z ]+$/i },
			n = q(r, t) ? t : "default";
		return r[n].test(String(e));
	},
	Sd = xd,
	Ed = function ({ value: e }, t = "default") {
		const r = { default: /^[0-9\p{L}]+$/u, latin: /^[0-9a-z]+$/i },
			n = q(r, t) ? t : "default";
		return r[n].test(String(e));
	},
	Ad = Ed,
	Pd = function ({ value: e }, t = !1) {
		const r = Date.parse(t || new Date()),
			n = Date.parse(String(e));
		return isNaN(n) ? !1 : n < r;
	},
	Cd = Pd,
	Od = function ({ value: t }, r, n) {
		if (!isNaN(t) && !isNaN(r) && !isNaN(n)) {
			const s = 1 * t;
			(r = Number(r)), (n = Number(n));
			const [i, l] = r <= n ? [r, n] : [n, r];
			return s >= 1 * i && s <= 1 * l;
		}
		return !1;
	},
	Id = Od,
	hl = /(_confirm(?:ed)?)$/,
	kd = function (t, r, n = "loose") {
		var i;
		r || (r = hl.test(t.name) ? t.name.replace(hl, "") : `${t.name}_confirm`);
		const s = (i = t.at(r)) == null ? void 0 : i.value;
		return n === "strict" ? t.value === s : t.value == s;
	},
	Fd = kd,
	Rd = function ({ value: e }, t = "default") {
		const r = { default: new RegExp("\\p{L}", "u"), latin: /[a-z]/i },
			n = q(r, t) ? t : "default";
		return r[n].test(String(e));
	},
	Td = Rd,
	Md = function ({ value: e }, t = "default") {
		const r = { default: /[\p{L} ]/u, latin: /[a-z ]/i },
			n = q(r, t) ? t : "default";
		return r[n].test(String(e));
	},
	jd = Md,
	Ld = function ({ value: e }, t = "default") {
		const r = { default: /[0-9\p{L}]/u, latin: /[0-9a-z]/i },
			n = q(r, t) ? t : "default";
		return r[n].test(String(e));
	},
	Nd = Ld,
	Vd = function ({ value: e }, t = "default") {
		const r = { default: new RegExp("\\p{Ll}", "u"), latin: /[a-z]/ },
			n = q(r, t) ? t : "default";
		return r[n].test(String(e));
	},
	Dd = Vd,
	Hd = function ({ value: t }) {
		return /[0-9]/.test(String(t));
	},
	Kd = Hd,
	Ud = function ({ value: e }) {
		return /[!-/:-@[-`{-~]/.test(String(e));
	},
	zd = Ud,
	Wd = function ({ value: e }, t = "default") {
		const r = { default: new RegExp("\\p{Lu}", "u"), latin: /[A-Z]/ },
			n = q(r, t) ? t : "default";
		return r[n].test(String(e));
	},
	qd = Wd,
	Bd = function ({ value: t }, r, n) {
		(r = r instanceof Date ? r.getTime() : Date.parse(r)),
			(n = n instanceof Date ? n.getTime() : Date.parse(n));
		const s = t instanceof Date ? t.getTime() : Date.parse(String(t));
		if (r && !n) (n = r), (r = Date.now());
		else if (!r || !s) return !1;
		return s >= r && s <= n;
	},
	Gd = Bd,
	Yd = function ({ value: t }, r) {
		return r && typeof r == "string"
			? Bf(r).test(String(t))
			: !isNaN(Date.parse(String(t)));
	},
	Zd = Yd,
	Jd = function ({ value: t }) {
		return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
			String(t),
		);
	},
	Xd = Jd,
	Qd = function ({ value: t }, ...r) {
		return typeof t == "string" && r.length
			? r.some((n) => t.endsWith(n))
			: typeof t == "string" && r.length === 0;
	},
	eh = Qd,
	th = function ({ value: t }, ...r) {
		return r.some((n) => (typeof n == "object" ? Ae(n, t) : n == t));
	},
	rh = th,
	nh = function ({ value: t }, r = 0, n = 1 / 0) {
		(r = parseInt(r)), (n = isNaN(parseInt(n)) ? 1 / 0 : parseInt(n));
		const s = r <= n ? r : n,
			i = n >= r ? n : r;
		if (typeof t == "string" || Array.isArray(t))
			return t.length >= s && t.length <= i;
		if (t && typeof t == "object") {
			const l = Object.keys(t).length;
			return l >= s && l <= i;
		}
		return !1;
	},
	sh = nh,
	ih = function ({ value: e }, t = "default") {
		const r = {
				default: new RegExp("^\\p{Ll}+$", "u"),
				allow_non_alpha: /^[0-9\p{Ll}!-/:-@[-`{-~]+$/u,
				allow_numeric: /^[0-9\p{Ll}]+$/u,
				allow_numeric_dashes: /^[0-9\p{Ll}-]+$/u,
				latin: /^[a-z]+$/,
			},
			n = q(r, t) ? t : "default";
		return r[n].test(String(e));
	},
	lh = ih,
	oh = function ({ value: t }, ...r) {
		return r.some(
			(n) => (
				typeof n == "string" &&
					n.substr(0, 1) === "/" &&
					n.substr(-1) === "/" &&
					(n = new RegExp(n.substr(1, n.length - 2))),
				n instanceof RegExp ? n.test(String(t)) : n === t
			),
		);
	},
	ah = oh,
	uh = function ({ value: t }, r = 10) {
		return Array.isArray(t) ? t.length <= r : Number(t) <= Number(r);
	},
	ch = uh,
	fh = function ({ value: t }, r = 1) {
		return Array.isArray(t) ? t.length >= r : Number(t) >= Number(r);
	},
	ph = fh,
	dh = function ({ value: t }, ...r) {
		return !r.some((n) => (typeof n == "object" ? Ae(n, t) : n === t));
	},
	hh = dh,
	mh = function ({ value: t }) {
		return !isNaN(t);
	},
	gh = mh,
	$a = function (e, ...t) {
		return De(e.value)
			? t
					.map((n) => {
						var s;
						return (s = e.at(n)) == null ? void 0 : s.value;
					})
					.some((n) => !De(n))
			: !0;
	};
$a.skipEmpty = !1;
var bh = $a,
	wa = function ({ value: t }, r = "default") {
		return r === "trim" && typeof t == "string" ? !De(t.trim()) : !De(t);
	};
wa.skipEmpty = !1;
var yh = wa,
	vh = function ({ value: t }, ...r) {
		return typeof t == "string" && r.length
			? r.some((n) => t.startsWith(n))
			: typeof t == "string" && r.length === 0;
	},
	_h = vh,
	$h = function ({ value: e }) {
		return /^[!-/:-@[-`{-~]+$/.test(String(e));
	},
	wh = $h,
	xh = function ({ value: e }, t = "default") {
		const r = { default: new RegExp("^\\p{Lu}+$", "u"), latin: /^[A-Z]+$/ },
			n = q(r, t) ? t : "default";
		return r[n].test(String(e));
	},
	Sh = xh,
	Eh = function ({ value: t }, ...r) {
		try {
			const n = r.length ? r : ["http:", "https:"],
				s = new URL(String(t));
			return n.includes(s.protocol);
		} catch {
			return !1;
		}
	},
	Ah = Eh;
const Ph = Object.freeze(
	Object.defineProperty(
		{
			__proto__: null,
			accepted: yd,
			alpha: wd,
			alpha_spaces: Sd,
			alphanumeric: Ad,
			between: Id,
			confirm: Fd,
			contains_alpha: Td,
			contains_alpha_spaces: jd,
			contains_alphanumeric: Nd,
			contains_lowercase: Dd,
			contains_numeric: Kd,
			contains_symbol: zd,
			contains_uppercase: qd,
			date_after: _d,
			date_before: Cd,
			date_between: Gd,
			date_format: Zd,
			email: Xd,
			ends_with: eh,
			is: rh,
			length: sh,
			lowercase: lh,
			matches: ah,
			max: ch,
			min: ph,
			not: hh,
			number: gh,
			require_one: bh,
			required: yh,
			starts_with: _h,
			symbol: wh,
			uppercase: Sh,
			url: Ah,
		},
		Symbol.toStringTag,
		{ value: "Module" },
	),
);
var Ls = Je({
	type: "state",
	blocking: !0,
	visible: !1,
	value: !0,
	key: "validating",
});
function Ch(e = {}) {
	return function (r) {
		let n = Be(r.props.validationRules || {}),
			s = { ...e, ...n },
			i = Nr(r);
		const l = { input: gr(), rerun: null, isPassing: !0 };
		let o = Be(r.props.validation);
		r.on("prop:validation", ({ payload: u }) => a(u, n)),
			r.on("prop:validationRules", ({ payload: u }) => a(o, u));
		function a(u, f) {
			var c;
			(Ae(Object.keys(n || {}), Object.keys(f || {})) && Ae(o, u)) ||
				((n = Be(f)),
				(o = Be(u)),
				(s = { ...e, ...n }),
				ga(i.receipts),
				(c = r.props.parsedRules) == null ||
					c.forEach((w) => {
						var b;
						w.messageObserver =
							(b = w.messageObserver) == null ? void 0 : b.kill();
					}),
				r.store.filter(() => !1, "validation"),
				(r.props.parsedRules = gl(u, s)),
				i.kill(),
				(i = Nr(r)),
				Ns(i, r.props.parsedRules, l));
		}
		(r.props.parsedRules = gl(o, s)), Ns(i, r.props.parsedRules, l);
	};
}
function Ns(e, t, r) {
	va(e) ||
		((r.input = gr()),
		(r.isPassing = !0),
		e.store.filter((n) => !n.meta.removeImmediately, "validation"),
		t.forEach((n) => n.debounce && clearTimeout(n.timer)),
		t.length &&
			(e.store.set(Ls),
			Vs(0, t, e, r, !1, () => {
				e.store.remove(Ls.key);
			})));
}
function Vs(e, t, r, n, s, i) {
	const l = t[e];
	if (!l) return i();
	const o = n.input;
	l.state = null;
	function a(u, f) {
		(n.isPassing = n.isPassing && !!f), (l.queued = !1);
		const c = r.stopObserve();
		ma(
			r,
			ya(l.deps, c),
			function () {
				try {
					r.store.set(Ls);
				} catch {}
				(l.queued = !0),
					n.rerun && clearTimeout(n.rerun),
					(n.rerun = setTimeout(Ns, 0, r, t, n));
			},
			"unshift",
		),
			(l.deps = c),
			n.input === o &&
				((l.state = f),
				f === !1 ? kh(r, l, s || u) : Ih(r, l),
				t.length > e + 1 ? Vs(e + 1, t, r, n, s || u, i) : i());
	}
	(!De(r.value) || !l.skipEmpty) && (n.isPassing || l.force)
		? l.queued
			? Oh(l, r, (u) => {
					u instanceof Promise ? u.then((f) => a(!0, f)) : a(!1, u);
			  })
			: Vs(e + 1, t, r, n, s, i)
		: De(r.value) && l.skipEmpty && n.isPassing
		  ? (r.observe(), r.value, a(!1, n.isPassing))
		  : a(!1, null);
}
function Oh(e, t, r) {
	e.debounce
		? (e.timer = setTimeout(() => {
				t.observe(), r(e.rule(t, ...e.args));
		  }, e.debounce))
		: (t.observe(), r(e.rule(t, ...e.args)));
}
function Ih(e, t) {
	const r = `rule_${t.name}`;
	t.messageObserver && (t.messageObserver = t.messageObserver.kill()),
		q(e.store, r) && e.store.remove(r);
}
function kh(e, t, r) {
	va(e) ||
		(t.messageObserver || (t.messageObserver = Nr(e._node)),
		t.messageObserver.watch(
			(n) => Rh(n, t),
			(n) => {
				const s = Fh(e, t, n),
					i = Je({
						blocking: t.blocking,
						key: `rule_${t.name}`,
						meta: {
							messageKey: t.name,
							removeImmediately: r,
							localize: !s,
							i18nArgs: n,
						},
						type: "validation",
						value: s || "This field is not valid.",
					});
				e.store.set(i);
			},
		));
}
function Fh(e, t, r) {
	const n =
		e.props.validationMessages && q(e.props.validationMessages, t.name)
			? e.props.validationMessages[t.name]
			: void 0;
	return typeof n == "function" ? n(...r) : n;
}
function Rh(e, t) {
	return [{ node: e, name: xa(e), args: t.args }];
}
function xa(e) {
	return typeof e.props.validationLabel == "function"
		? e.props.validationLabel(e)
		: e.props.validationLabel ||
				e.props.label ||
				e.props.name ||
				String(e.name);
}
var Sa = "(?:[\\*+?()0-9]+)",
	Ea = "[a-zA-Z][a-zA-Z0-9_]+",
	Th = new RegExp(`^(${Sa}?${Ea})(?:\\:(.*)+)?$`, "i"),
	Mh = new RegExp(`^(${Sa})(${Ea})$`, "i"),
	jh = /([\*+?]+)?(\(\d+\))([\*+?]+)?/,
	ml = /\(\d+\)/,
	Lh = { blocking: !0, debounce: 0, force: !1, skipEmpty: !0, name: "" };
function gl(e, t) {
	return e
		? (typeof e == "string" ? Nh(e) : fr(e)).reduce((n, s) => {
				let i = s.shift();
				const l = {};
				if (typeof i == "string") {
					const [o, a] = Dh(i);
					q(t, o) && ((i = t[o]), Object.assign(l, a));
				}
				return (
					typeof i == "function" &&
						n.push({
							rule: i,
							args: s,
							timer: 0,
							state: null,
							queued: !0,
							deps: new Map(),
							...Lh,
							...Hh(l, i),
						}),
					n
				);
		  }, [])
		: [];
}
function Nh(e) {
	return e.split("|").reduce((t, r) => {
		const n = Vh(r);
		return n && t.push(n), t;
	}, []);
}
function Vh(e) {
	const t = e.trim();
	if (t) {
		const r = t.match(Th);
		if (r && typeof r[1] == "string") {
			const n = r[1].trim(),
				s =
					r[2] && typeof r[2] == "string"
						? r[2].split(",").map((i) => i.trim())
						: [];
			return [n, ...s];
		}
	}
	return !1;
}
function Dh(e) {
	const t = e.match(Mh);
	if (!t) return [e, { name: e }];
	const r = {
			"*": { force: !0 },
			"+": { skipEmpty: !1 },
			"?": { blocking: !1 },
		},
		[, n, s] = t,
		i = ml.test(n) ? n.match(jh) || [] : [, n];
	return [
		s,
		[i[1], i[2], i[3]].reduce(
			(l, o) => (
				o &&
					(ml.test(o)
						? (l.debounce = parseInt(o.substr(1, o.length - 1)))
						: o.split("").forEach((a) => q(r, a) && Object.assign(l, r[a]))),
				l
			),
			{ name: s },
		),
	];
}
function Hh(e, t) {
	return (
		e.name || (e.name = t.ruleName || t.name),
		["skipEmpty", "force", "debounce", "blocking"].reduce(
			(r, n) => (q(t, n) && !q(r, n) && Object.assign(r, { [n]: t[n] }), r),
			e,
		)
	);
}
function X(e) {
	return e[0].toUpperCase() + e.substr(1);
}
function bl(e, t = "or") {
	return e.reduce(
		(r, n, s) => (
			(r += n),
			s <= e.length - 2 && e.length > 2 && (r += ", "),
			s === e.length - 2 && (r += `${e.length === 2 ? " " : ""}${t} `),
			r
		),
		"",
	);
}
function en(e) {
	const t = typeof e == "string" ? new Date(Date.parse(e)) : e;
	return t instanceof Date
		? new Intl.DateTimeFormat(void 0, {
				dateStyle: "medium",
				timeZone: "UTC",
		  }).format(t)
		: "(unknown)";
}
function Kh(e, t) {
	return Number(e) >= Number(t) ? [t, e] : [e, t];
}
var Uh = {
		add: "Add",
		remove: "Remove",
		removeAll: "Remove all",
		incomplete: "Sorry, not all fields are filled out correctly.",
		submit: "Submit",
		noFiles: "No file chosen",
		moveUp: "Move up",
		moveDown: "Move down",
		isLoading: "Loading...",
		loadMore: "Load more",
		next: "Next",
		prev: "Previous",
		addAllValues: "Add all values",
		addSelectedValues: "Add selected values",
		removeAllValues: "Remove all values",
		removeSelectedValues: "Remove selected values",
		chooseDate: "Choose date",
		changeDate: "Change date",
		summaryHeader: "There were errors in your form.",
		close: "Close",
	},
	zh = {
		accepted({ name: e }) {
			return `Please accept the ${e}.`;
		},
		date_after({ name: e, args: t }) {
			return Array.isArray(t) && t.length
				? `${X(e)} must be after ${en(t[0])}.`
				: `${X(e)} must be in the future.`;
		},
		alpha({ name: e }) {
			return `${X(e)} can only contain alphabetical characters.`;
		},
		alphanumeric({ name: e }) {
			return `${X(e)} can only contain letters and numbers.`;
		},
		alpha_spaces({ name: e }) {
			return `${X(e)} can only contain letters and spaces.`;
		},
		contains_alpha({ name: e }) {
			return `${X(e)} must contain alphabetical characters.`;
		},
		contains_alphanumeric({ name: e }) {
			return `${X(e)} must contain letters or numbers.`;
		},
		contains_alpha_spaces({ name: e }) {
			return `${X(e)} must contain letters or spaces.`;
		},
		contains_symbol({ name: e }) {
			return `${X(e)} must contain a symbol.`;
		},
		contains_uppercase({ name: e }) {
			return `${X(e)} must contain an uppercase letter.`;
		},
		contains_lowercase({ name: e }) {
			return `${X(e)} must contain a lowercase letter.`;
		},
		contains_numeric({ name: e }) {
			return `${X(e)} must contain numbers.`;
		},
		symbol({ name: e }) {
			return `${X(e)} must be a symbol.`;
		},
		uppercase({ name: e }) {
			return `${X(e)} can only contain uppercase letters.`;
		},
		lowercase({ name: e, args: t }) {
			let r = "";
			return (
				Array.isArray(t) &&
					t.length &&
					(t[0] === "allow_non_alpha" && (r = ", numbers and symbols"),
					t[0] === "allow_numeric" && (r = " and numbers"),
					t[0] === "allow_numeric_dashes" && (r = ", numbers and dashes")),
				`${X(e)} can only contain lowercase letters${r}.`
			);
		},
		date_before({ name: e, args: t }) {
			return Array.isArray(t) && t.length
				? `${X(e)} must be before ${en(t[0])}.`
				: `${X(e)} must be in the past.`;
		},
		between({ name: e, args: t }) {
			if (isNaN(t[0]) || isNaN(t[1]))
				return "This field was configured incorrectly and can’t be submitted.";
			const [r, n] = Kh(t[0], t[1]);
			return `${X(e)} must be between ${r} and ${n}.`;
		},
		confirm({ name: e }) {
			return `${X(e)} does not match.`;
		},
		date_format({ name: e, args: t }) {
			return Array.isArray(t) && t.length
				? `${X(e)} is not a valid date, please use the format ${t[0]}`
				: "This field was configured incorrectly and can’t be submitted";
		},
		date_between({ name: e, args: t }) {
			return `${X(e)} must be between ${en(t[0])} and ${en(t[1])}`;
		},
		email: "Please enter a valid email address.",
		ends_with({ name: e, args: t }) {
			return `${X(e)} doesn’t end with ${bl(t)}.`;
		},
		is({ name: e }) {
			return `${X(e)} is not an allowed value.`;
		},
		length({ name: e, args: [t = 0, r = 1 / 0] }) {
			const n = Number(t) <= Number(r) ? t : r,
				s = Number(r) >= Number(t) ? r : t;
			return n == 1 && s === 1 / 0
				? `${X(e)} must be at least one character.`
				: n == 0 && s
				  ? `${X(e)} must be less than or equal to ${s} characters.`
				  : n === s
					  ? `${X(e)} should be ${s} characters long.`
					  : n && s === 1 / 0
						  ? `${X(e)} must be greater than or equal to ${n} characters.`
						  : `${X(e)} must be between ${n} and ${s} characters.`;
		},
		matches({ name: e }) {
			return `${X(e)} is not an allowed value.`;
		},
		max({ name: e, node: { value: t }, args: r }) {
			return Array.isArray(t)
				? `Cannot have more than ${r[0]} ${e}.`
				: `${X(e)} must be no more than ${r[0]}.`;
		},
		mime({ name: e, args: t }) {
			return t[0]
				? `${X(e)} must be of the type: ${t[0]}`
				: "No file formats allowed.";
		},
		min({ name: e, node: { value: t }, args: r }) {
			return Array.isArray(t)
				? `Cannot have fewer than ${r[0]} ${e}.`
				: `${X(e)} must be at least ${r[0]}.`;
		},
		not({ name: e, node: { value: t } }) {
			return `“${t}” is not an allowed ${e}.`;
		},
		number({ name: e }) {
			return `${X(e)} must be a number.`;
		},
		require_one: ({ name: e, node: t, args: r }) => {
			const n = r
				.map((s) => {
					const i = t.at(s);
					return i ? xa(i) : !1;
				})
				.filter((s) => !!s);
			return n.unshift(e), `${n.join(" or ")} is required.`;
		},
		required({ name: e }) {
			return `${X(e)} is required.`;
		},
		starts_with({ name: e, args: t }) {
			return `${X(e)} doesn’t start with ${bl(t)}.`;
		},
		url() {
			return "Please enter a valid URL.";
		},
		invalidDate: "The selected date is invalid.",
	},
	Wh = { ui: Uh, validation: zh },
	yl = new Set();
function qh(e) {
	return function (r) {
		yl.add(r), r.on("destroying", () => yl.delete(r));
		let n = vl(r.config.locale, e),
			s = n ? e[n] : {};
		r.on("prop:locale", ({ payload: i }) => {
			(n = vl(i, e)), (s = n ? e[n] : {}), r.store.touch();
		}),
			r.on("prop:label", () => r.store.touch()),
			r.on("prop:validationLabel", () => r.store.touch()),
			r.hook.text((i, l) => {
				var a, u;
				const o = ((a = i.meta) == null ? void 0 : a.messageKey) || i.key;
				if (q(s, i.type) && q(s[i.type], o)) {
					const f = s[i.type][o];
					typeof f == "function"
						? (i.value = Array.isArray(
								(u = i.meta) == null ? void 0 : u.i18nArgs,
						  )
								? f(...i.meta.i18nArgs)
								: f(i))
						: (i.value = f);
				}
				return l(i);
			});
	};
}
function vl(e, t) {
	if (q(t, e)) return e;
	const [r] = e.split("-");
	if (q(t, r)) return r;
	for (const n in t) return n;
	return !1;
}
function Bh(...e) {
	const t = e.reduce((n, s) => Ot(n, s), {}),
		r = () => {};
	return (
		(r.library = function (n) {
			const s = sr(n.props.type);
			q(t, s) && n.define(t[s]);
		}),
		r
	);
}
var Gh = [
	"classes",
	"config",
	"delay",
	"errors",
	"id",
	"index",
	"inputErrors",
	"modelValue",
	"onUpdate:modelValue",
	"name",
	"number",
	"parent",
	"plugins",
	"sectionsSchema",
	"type",
	"validation",
	"validationLabel",
	"validationMessages",
	"validationRules",
	"onInput",
	"onInputRaw",
	"onUpdate:modelValue",
	"onNode",
	"onSubmit",
	"onSubmitInvalid",
	"onSubmitRaw",
];
function qn(e) {
	return e && typeof e == "object" && "group" in e && Array.isArray(e.options);
}
function Aa(e, t = { count: 1 }) {
	return Array.isArray(e)
		? e.map((r) => {
				if (typeof r == "string" || typeof r == "number")
					return { label: String(r), value: String(r) };
				if (typeof r == "object") {
					if ("group" in r) return (r.options = Aa(r.options || [], t)), r;
					"value" in r &&
						typeof r.value != "string" &&
						Object.assign(r, {
							value: `__mask_${t.count++}`,
							__original: r.value,
						});
				}
				return r;
		  })
		: Object.keys(e).map((r) => ({ label: e[r], value: r }));
}
function Dt(e, t, r = !1) {
	if (Array.isArray(e)) {
		for (const n of e)
			if (!(typeof n != "object" && n)) {
				if (qn(n)) {
					const s = Dt(n.options, t, !0);
					if (s !== void 0) return s;
				} else if (t == n.value)
					return "__original" in n ? n.__original : n.value;
			}
	}
	return r ? void 0 : t;
}
function dr(e, t) {
	return (e === null && t === void 0) || (e === void 0 && t === null)
		? !1
		: e == t
		  ? !0
		  : cr(e) && cr(t)
			  ? Ae(e, t)
			  : !1;
}
function yi(e) {
	e.hook.prop((t, r) => {
		var n;
		return (
			t.prop === "options" &&
				(typeof t.value == "function"
					? ((e.props.optionsLoader = t.value), (t.value = []))
					: ((n = e.props)._normalizeCounter ??
							(n._normalizeCounter = { count: 1 }),
					  (t.value = Aa(t.value, e.props._normalizeCounter)))),
			r(t)
		);
	});
}
function z(e, t, r = !1) {
	return (...n) => {
		const s = (i) => {
			const l = !t || typeof t == "string" ? { $el: t } : t();
			return (
				(Ms(l) || js(l)) &&
					(l.meta || (l.meta = { section: e }),
					n.length &&
						!l.children &&
						(l.children = [
							...n.map((o) => (typeof o == "function" ? o(i) : o)),
						]),
					Ms(l) && (l.attrs = { class: `$classes.${e}`, ...(l.attrs || {}) })),
				{
					if: `$slots.${e}`,
					then: `$slots.${e}`,
					else: e in i ? wr(l, i[e]) : l,
				}
			);
		};
		return (s._s = e), r ? Yh(s) : s;
	};
}
function Yh(e) {
	return (t) => [e(t)];
}
function xn(e) {
	return !!(
		e &&
		typeof e == "object" &&
		("$el" in e || "$cmp" in e || "$formkit" in e)
	);
}
function wr(e, t = {}) {
	return typeof e == "string"
		? xn(t) || typeof t == "string"
			? t
			: e
		: Array.isArray(e)
		  ? xn(t)
				? t
				: e
		  : Ot(e, t);
}
var Zh = z("actions", () => ({ $el: "div", if: "$actions" })),
	Sn = z("input", () => ({
		$el: "input",
		bind: "$attrs",
		attrs: {
			type: "$type",
			name: "$node.props.altName || $node.name",
			disabled: "$option.attrs.disabled || $disabled",
			onInput: "$handlers.toggleChecked",
			checked: "$fns.eq($_value, $onValue)",
			onBlur: "$handlers.blur",
			value: "$: true",
			id: "$id",
			"aria-describedby": {
				if: "$options.length",
				then: {
					if: "$option.help",
					then: '$: "help-" + $option.attrs.id',
					else: void 0,
				},
				else: { if: "$help", then: '$: "help-" + $id', else: void 0 },
			},
		},
	})),
	Pa = z("optionHelp", () => ({
		$el: "div",
		if: "$option.help",
		attrs: { id: '$: "help-" + $option.attrs.id' },
	})),
	En = z("inner", "span"),
	An = z("label", "span"),
	Ca = z("option", () => ({
		$el: "li",
		for: ["option", "$options"],
		attrs: {
			"data-disabled": "$option.attrs.disabled || $disabled || undefined",
		},
	})),
	Oa = z("options", "ul"),
	Pn = z("wrapper", () => ({
		$el: "label",
		attrs: {
			"data-disabled": {
				if: "$options.length",
				then: void 0,
				else: "$disabled || undefined",
			},
			"data-checked": {
				if: "$options == undefined",
				then: "$fns.eq($_value, $onValue) || undefined",
				else: "$fns.isChecked($option.value) || undefined",
			},
		},
	})),
	Jh = z("input", () => ({
		$el: "button",
		bind: "$attrs",
		attrs: {
			type: "$type",
			disabled: "$disabled",
			name: "$node.name",
			id: "$id",
		},
	})),
	Xh = z("default", null),
	Cn = z("decorator", () => ({
		$el: "span",
		attrs: { "aria-hidden": "true" },
	})),
	Ia = z("fieldset", () => ({
		$el: "fieldset",
		attrs: {
			id: "$id",
			"aria-describedby": {
				if: "$help",
				then: '$: "help-" + $id',
				else: void 0,
			},
		},
	})),
	Qh = z("input", () => ({
		$el: "input",
		bind: "$attrs",
		attrs: {
			type: "file",
			disabled: "$disabled",
			name: "$node.name",
			onChange: "$handlers.files",
			onBlur: "$handlers.blur",
			id: "$id",
			"aria-describedby": "$describedBy",
			"aria-required": "$state.required || undefined",
		},
	})),
	em = z("fileItem", () => ({ $el: "li", for: ["file", "$value"] })),
	tm = z("fileList", () => ({
		$el: "ul",
		if: "$value.length",
		attrs: { "data-has-multiple": "$_hasMultipleFiles" },
	})),
	rm = z("fileName", () => ({
		$el: "span",
		attrs: { class: "$classes.fileName" },
	})),
	_l = z("fileRemove", () => ({
		$el: "button",
		attrs: { type: "button", onClick: "$handlers.resetFiles" },
	})),
	nm = z("form", () => ({
		$el: "form",
		bind: "$attrs",
		attrs: {
			id: "$id",
			name: "$node.name",
			onSubmit: "$handlers.submit",
			"data-loading": "$state.loading || undefined",
		},
	})),
	vi = z("wrapper", null, !0),
	mt = z("help", () => ({
		$el: "div",
		if: "$help",
		attrs: { id: '$: "help-" + $id' },
	})),
	ve = (e, t) =>
		z(`${e}Icon`, () => {
			const r = `_raw${e.charAt(0).toUpperCase()}${e.slice(1)}Icon`;
			return {
				if: `$${e}Icon && $${r}`,
				$el: `${t || "span"}`,
				attrs: {
					class: `$classes.${e}Icon + " " + $classes.icon`,
					innerHTML: `$${r}`,
					onClick: `$handlers.iconClick(${e})`,
					for: { if: `${t === "label"}`, then: "$id" },
				},
			};
		})(),
	Bn = z("inner", "div"),
	Gn = z("label", () => ({
		$el: "label",
		if: "$label",
		attrs: { for: "$id" },
	})),
	ka = z("legend", () => ({ $el: "legend", if: "$label" })),
	It = z("message", () => ({
		$el: "li",
		for: ["message", "$messages"],
		attrs: {
			key: "$message.key",
			id: "$id + '-' + $message.key",
			"data-message-type": "$message.type",
		},
	})),
	kt = z("messages", () => ({
		$el: "ul",
		if: "$defaultMessagePlacement && $fns.length($messages)",
	})),
	sm = z("noFiles", () => ({ $el: "span", if: "$value.length == 0" })),
	im = z("optGroup", () => ({
		$el: "optgroup",
		bind: "$option.attrs",
		attrs: { label: "$option.group" },
	})),
	$l = z("option", () => ({
		$el: "option",
		bind: "$option.attrs",
		attrs: {
			class: "$classes.option",
			value: "$option.value",
			selected: "$fns.isSelected($option)",
		},
	})),
	wl = z("options", () => ({
		$el: null,
		if: "$options.length",
		for: ["option", "$option.options || $options"],
	})),
	Wt = z("outer", () => ({
		$el: "div",
		attrs: {
			key: "$id",
			"data-family": "$family || undefined",
			"data-type": "$type",
			"data-multiple":
				'$attrs.multiple || ($type != "select" && $options != undefined) || undefined',
			"data-has-multiple": "$_hasMultipleFiles",
			"data-disabled": '$: ($disabled !== "false" && $disabled) || undefined',
			"data-empty": "$state.empty || undefined",
			"data-complete": "$state.complete || undefined",
			"data-invalid":
				"$state.valid === false && $state.validationVisible || undefined",
			"data-errors": "$state.errors || undefined",
			"data-submitted": "$state.submitted || undefined",
			"data-prefix-icon": "$_rawPrefixIcon !== undefined || undefined",
			"data-suffix-icon": "$_rawSuffixIcon !== undefined || undefined",
			"data-prefix-icon-click": "$onPrefixIconClick !== undefined || undefined",
			"data-suffix-icon-click": "$onSuffixIconClick !== undefined || undefined",
		},
	})),
	gt = z("prefix", null),
	lm = z("input", () => ({
		$el: "select",
		bind: "$attrs",
		attrs: {
			id: "$id",
			"data-placeholder": "$fns.showPlaceholder($_value, $placeholder)",
			disabled: "$disabled",
			class: "$classes.input",
			name: "$node.name",
			onChange: "$handlers.onChange",
			onInput: "$handlers.selectInput",
			onBlur: "$handlers.blur",
			"aria-describedby": "$describedBy",
			"aria-required": "$state.required || undefined",
		},
	})),
	om = z("submit", () => ({
		$cmp: "FormKit",
		bind: "$submitAttrs",
		props: { type: "submit", label: "$submitLabel" },
	})),
	bt = z("suffix", null),
	Fa = z("input", () => ({
		$el: "input",
		bind: "$attrs",
		attrs: {
			type: "$type",
			disabled: "$disabled",
			name: "$node.name",
			onInput: "$handlers.DOMInput",
			onBlur: "$handlers.blur",
			value: "$_value",
			id: "$id",
			"aria-describedby": "$describedBy",
			"aria-required": "$state.required || undefined",
		},
	})),
	am = z("input", () => ({
		$el: "textarea",
		bind: "$attrs",
		attrs: {
			disabled: "$disabled",
			name: "$node.name",
			onInput: "$handlers.DOMInput",
			onBlur: "$handlers.blur",
			value: "$_value",
			id: "$id",
			"aria-describedby": "$describedBy",
			"aria-required": "$state.required || undefined",
		},
		children: "$initialValue",
	})),
	Ur = z("wrapper", "div");
function Ra(e) {
	return function (t, r) {
		return (
			t.prop === "options" &&
				Array.isArray(t.value) &&
				((t.value = t.value.map((n) => {
					var s;
					return (s = n.attrs) != null && s.id
						? n
						: Ot(n, {
								attrs: { id: `${e.props.id}-option-${fi(String(n.value))}` },
						  });
				})),
				e.props.type === "checkbox" &&
					!Array.isArray(e.value) &&
					(e.isCreated
						? e.input([], !1)
						: e.on("created", () => {
								Array.isArray(e.value) || e.input([], !1);
						  }))),
			r(t)
		);
	};
}
function um(e, t) {
	const r = t.target;
	if (r instanceof HTMLInputElement) {
		const n = Array.isArray(e.props.options)
			? Dt(e.props.options, r.value)
			: r.value;
		Array.isArray(e.props.options) && e.props.options.length
			? Array.isArray(e._value)
				? e._value.some((s) => dr(n, s))
					? e.input(e._value.filter((s) => !dr(n, s)))
					: e.input([...e._value, n])
				: e.input([n])
			: r.checked
			  ? e.input(e.props.onValue)
			  : e.input(e.props.offValue);
	}
}
function cm(e, t) {
	var r, n;
	return (
		(r = e.context) == null || r.value,
		(n = e.context) == null || n._value,
		Array.isArray(e._value)
			? e._value.some((s) => dr(Dt(e.props.options, t), s))
			: !1
	);
}
function fm(e) {
	e.on("created", () => {
		var t, r;
		(t = e.context) != null &&
			t.handlers &&
			(e.context.handlers.toggleChecked = um.bind(null, e)),
			(r = e.context) != null &&
				r.fns &&
				(e.context.fns.isChecked = cm.bind(null, e)),
			q(e.props, "onValue") || (e.props.onValue = !0),
			q(e.props, "offValue") || (e.props.offValue = !1);
	}),
		e.hook.prop(Ra(e));
}
function ir(e, t) {
	return (r) => {
		r.props[`${e}Icon`] === void 0 &&
			(r.props[`${e}Icon`] = t.startsWith("<svg") ? t : `default:${t}`);
	};
}
function _i(e) {
	e.on("created", () => {
		"disabled" in e.props &&
			((e.props.disabled = Ge(e.props.disabled)),
			(e.config.disabled = Ge(e.props.disabled)));
	}),
		e.hook.prop(
			({ prop: t, value: r }, n) => (
				(r = t === "disabled" ? Ge(r) : r), n({ prop: t, value: r })
			),
		),
		e.on("prop:disabled", ({ payload: t }) => {
			e.config.disabled = Ge(t);
		});
}
function fn(e, t) {
	return (r) => {
		r.store.set(
			Je({
				key: e,
				type: "ui",
				value: t || e,
				meta: { localize: !0, i18nArgs: [r] },
			}),
		);
	};
}
var os = typeof window < "u";
function Ta(e) {
	e.target instanceof HTMLElement &&
		e.target.hasAttribute("data-file-hover") &&
		e.target.removeAttribute("data-file-hover");
}
function xl(e, t) {
	t.target instanceof HTMLInputElement
		? e === "dragover" && t.target.setAttribute("data-file-hover", "true")
		: t.preventDefault(),
		e === "drop" && Ta(t);
}
function pm(e) {
	fn("noFiles", "Select file")(e),
		fn("removeAll", "Remove all")(e),
		fn("remove")(e),
		e.addProps(["_hasMultipleFiles"]),
		os &&
			(window._FormKit_File_Drop ||
				(window.addEventListener("dragover", xl.bind(null, "dragover")),
				window.addEventListener("drop", xl.bind(null, "drop")),
				window.addEventListener("dragleave", Ta),
				(window._FormKit_File_Drop = !0))),
		e.hook.input((t, r) => r(Array.isArray(t) ? t : [])),
		e.on("input", ({ payload: t }) => {
			e.props._hasMultipleFiles =
				Array.isArray(t) && t.length > 1 ? !0 : void 0;
		}),
		e.on("reset", () => {
			if (e.props.id && os) {
				const t = document.getElementById(e.props.id);
				t && (t.value = "");
			}
		}),
		e.on("created", () => {
			Array.isArray(e.value) || e.input([], !1),
				e.context &&
					((e.context.handlers.resetFiles = (t) => {
						if ((t.preventDefault(), e.input([]), e.props.id && os)) {
							const r = document.getElementById(e.props.id);
							r && (r.value = ""), r == null || r.focus();
						}
					}),
					(e.context.handlers.files = (t) => {
						var n, s;
						const r = [];
						if (t.target instanceof HTMLInputElement && t.target.files) {
							for (let i = 0; i < t.target.files.length; i++) {
								let l;
								(l = t.target.files.item(i)) &&
									r.push({ name: l.name, file: l });
							}
							e.input(r);
						}
						e.context && (e.context.files = r),
							typeof ((n = e.props.attrs) == null ? void 0 : n.onChange) ==
								"function" &&
								((s = e.props.attrs) == null || s.onChange(t));
					}));
		});
}
var Sl = Je({ key: "loading", value: !0, visible: !1 });
async function dm(e, t) {
	const r = Math.random();
	if (
		((e.props._submitNonce = r),
		t.preventDefault(),
		await e.settled,
		e.ledger.value("validating") &&
			(e.store.set(Sl),
			await e.ledger.settled("validating"),
			e.store.remove("loading"),
			e.props._submitNonce !== r))
	)
		return;
	const n = (s) =>
		s.store.set(Je({ key: "submitted", value: !0, visible: !1 }));
	if (
		(e.walk(n),
		n(e),
		e.emit("submit-raw"),
		typeof e.props.onSubmitRaw == "function" && e.props.onSubmitRaw(t, e),
		e.ledger.value("blocking"))
	)
		typeof e.props.onSubmitInvalid == "function" && e.props.onSubmitInvalid(e),
			e.props.incompleteMessage !== !1 && Ma(e);
	else if (typeof e.props.onSubmit == "function") {
		const s = e.props.onSubmit(e.hook.submit.dispatch(fr(e.value)), e);
		if (s instanceof Promise) {
			const i =
				e.props.disabled === void 0 && e.props.submitBehavior !== "live";
			i && (e.props.disabled = !0),
				e.store.set(Sl),
				await s,
				i && (e.props.disabled = !1),
				e.store.remove("loading");
		}
	} else t.target instanceof HTMLFormElement && t.target.submit();
}
function Ma(e) {
	e.store.set(
		Je({
			blocking: !1,
			key: "incomplete",
			meta: {
				localize: e.props.incompleteMessage === void 0,
				i18nArgs: [{ node: e }],
				showAsMessage: !0,
			},
			type: "ui",
			value: e.props.incompleteMessage || "Form incomplete.",
		}),
	);
}
function hm(e) {
	var t;
	(e.props.isForm = !0),
		e.ledger.count("validating", (r) => r.key === "validating"),
		(t = e.props).submitAttrs ??
			(t.submitAttrs = { disabled: e.props.disabled }),
		e.on("prop:disabled", ({ payload: r }) => {
			e.props.submitAttrs = { ...e.props.submitAttrs, disabled: r };
		}),
		e.on("created", () => {
			var r;
			(r = e.context) != null &&
				r.handlers &&
				(e.context.handlers.submit = dm.bind(null, e)),
				q(e.props, "actions") || (e.props.actions = !0);
		}),
		e.on("prop:incompleteMessage", () => {
			e.store.incomplete && Ma(e);
		}),
		e.on("settled:blocking", () => e.store.remove("incomplete"));
}
function mm(e) {
	e.props.ignore === void 0 && ((e.props.ignore = !0), (e.parent = null));
}
function gm(e) {
	e.on("created", () => {
		e.context && (e.context.initialValue = e.value || "");
	});
}
function ja(e) {
	if (typeof e.props.number > "u") return;
	const t = ["number", "range", "hidden"].includes(e.props.type);
	e.hook.input((r, n) => {
		if (r === "") return n(void 0);
		const s = e.props.number === "integer" ? parseInt(r) : parseFloat(r);
		return Number.isFinite(s) ? n(s) : n(t ? void 0 : r);
	});
}
function bm(e, t) {
	t.target instanceof HTMLInputElement &&
		e.input(Dt(e.props.options, t.target.value));
}
function ym(e, t) {
	var r, n;
	return (
		(r = e.context) == null || r.value,
		(n = e.context) == null || n._value,
		dr(Dt(e.props.options, t), e._value)
	);
}
function vm(e) {
	e.on("created", () => {
		var t, r;
		Array.isArray(e.props.options) || zt(350, { node: e, inputType: "radio" }),
			(t = e.context) != null &&
				t.handlers &&
				(e.context.handlers.toggleChecked = bm.bind(null, e)),
			(r = e.context) != null &&
				r.fns &&
				(e.context.fns.isChecked = ym.bind(null, e));
	}),
		e.hook.prop(Ra(e));
}
var _m = 0;
function La(e) {
	(e.type === "group" || e.type === "list") && e.plugins.add($m);
}
function $m(e) {
	e.props.type === "radio" &&
		(e.addProps(["altName"]), (e.props.altName = `${e.name}_${_m++}`));
}
function wm(e, t) {
	if (qn(t)) return !1;
	e.context && e.context.value;
	const r = "__original" in t ? t.__original : t.value;
	return Array.isArray(e._value)
		? e._value.some((n) => dr(n, r))
		: (e._value === void 0 ||
					(e._value === null && !Na(e.props.options, null))) &&
			  t.attrs &&
			  t.attrs["data-is-placeholder"]
		  ? !0
		  : dr(r, e._value);
}
function Na(e, t) {
	return e.some((r) =>
		qn(r)
			? Na(r.options, t)
			: ("__original" in r ? r.__original : r.value) === t,
	);
}
async function xm(e, t) {
	var r;
	typeof ((r = e.props.attrs) == null ? void 0 : r.onChange) == "function" &&
		(await new Promise((n) => setTimeout(n, 0)),
		await e.settled,
		e.props.attrs.onChange(t));
}
function Sm(e, t) {
	const r = t.target,
		n = r.hasAttribute("multiple")
			? Array.from(r.selectedOptions).map((s) => Dt(e.props.options, s.value))
			: Dt(e.props.options, r.value);
	e.input(n);
}
function El(e, t) {
	return e.some((r) => r.attrs && r.attrs["data-is-placeholder"])
		? e
		: [
				{
					label: t,
					value: "",
					attrs: { hidden: !0, disabled: !0, "data-is-placeholder": "true" },
				},
				...e,
		  ];
}
function Va(e) {
	const t = e.length > 0 ? e[0] : void 0;
	if (t)
		return qn(t) ? Va(t.options) : "__original" in t ? t.__original : t.value;
}
function Em(e) {
	e.on("created", () => {
		var r, n, s;
		const t = Ge((r = e.props.attrs) == null ? void 0 : r.multiple);
		!t &&
			e.props.placeholder &&
			Array.isArray(e.props.options) &&
			(e.hook.prop(
				({ prop: i, value: l }, o) => (
					i === "options" && (l = El(l, e.props.placeholder)),
					o({ prop: i, value: l })
				),
			),
			(e.props.options = El(e.props.options, e.props.placeholder))),
			t
				? e.value === void 0 && e.input([], !1)
				: e.context &&
				  !e.context.options &&
				  ((e.props.attrs = Object.assign({}, e.props.attrs, {
						value: e._value,
				  })),
				  e.on("input", ({ payload: i }) => {
						e.props.attrs = Object.assign({}, e.props.attrs, { value: i });
				  })),
			(n = e.context) != null &&
				n.handlers &&
				((e.context.handlers.selectInput = Sm.bind(null, e)),
				(e.context.handlers.onChange = xm.bind(null, e))),
			(s = e.context) != null &&
				s.fns &&
				((e.context.fns.isSelected = wm.bind(null, e)),
				(e.context.fns.showPlaceholder = (i, l) => {
					if (!Array.isArray(e.props.options)) return !1;
					const o = e.props.options.some((a) => {
						if (a.attrs && "data-is-placeholder" in a.attrs) return !1;
						const u = "__original" in a ? a.__original : a.value;
						return Ae(i, u);
					});
					return l && !o ? !0 : void 0;
				}));
	}),
		e.hook.input((t, r) => {
			var n, s, i;
			return (
				!e.props.placeholder &&
					t === void 0 &&
					Array.isArray((n = e.props) == null ? void 0 : n.options) &&
					e.props.options.length &&
					!Ge(
						(i = (s = e.props) == null ? void 0 : s.attrs) == null
							? void 0
							: i.multiple,
					) &&
					(t = Va(e.props.options)),
				r(t)
			);
		});
}
function Ds(e) {
	return !!(
		Jt(e) &&
		e.if &&
		e.if.startsWith("$slots.") &&
		typeof e.then == "string" &&
		e.then.startsWith("$slots.") &&
		"else" in e
	);
}
function pt(e, t, r) {
	const n = (s) => {
		const i = t(s);
		if (r || (xn(i) && "if" in i) || Ds(i)) {
			const l = { if: e, then: i };
			return r && (l.else = r(s)), l;
		} else
			Ds(i)
				? Object.assign(i.else, { if: e })
				: xn(i) && Object.assign(i, { if: e });
		return i;
	};
	return (n._s = gr()), n;
}
function lr(e, t) {
	const r = (n) => {
		const s = e({});
		return Ds(s)
			? (Array.isArray(s.else) ||
					(s.else = wr(wr(s.else, t), e._s ? n[e._s] : {})),
			  s)
			: wr(wr(s, t), e._s ? n[e._s] : {});
	};
	return (r._s = e._s), r;
}
var Al = {
		schema: Wt(
			kt(It("$message.value")),
			Ur(
				Jh(
					ve("prefix"),
					gt(),
					Xh("$label || $ui.submit.value"),
					bt(),
					ve("suffix"),
				),
			),
			mt("$help"),
		),
		type: "input",
		family: "button",
		props: [],
		features: [fn("submit"), mm],
		schemaMemoKey: "h6st4epl3j8",
	},
	Am = {
		schema: Wt(
			pt(
				"$options == undefined",
				Pn(
					En(gt(), Sn(), Cn(ve("decorator")), bt()),
					lr(An("$label"), { if: "$label" }),
				),
				Ia(
					ka("$label"),
					mt("$help"),
					Oa(
						Ca(
							Pn(
								En(
									gt(),
									lr(Sn(), {
										bind: "$option.attrs",
										attrs: {
											id: "$option.attrs.id",
											value: "$option.value",
											checked: "$fns.isChecked($option.value)",
										},
									}),
									Cn(ve("decorator")),
									bt(),
								),
								lr(An("$option.label"), { if: "$option.label" }),
							),
							Pa("$option.help"),
						),
					),
				),
			),
			pt("$options == undefined && $help", mt("$help")),
			kt(It("$message.value")),
		),
		type: "input",
		family: "box",
		props: ["options", "onValue", "offValue", "optionsLoader"],
		features: [yi, fm, ir("decorator", "checkboxDecorator")],
		schemaMemoKey: "qje02tb3gu8",
	},
	Pm = {
		schema: Wt(
			Ur(
				Gn("$label"),
				Bn(
					ve("prefix", "label"),
					gt(),
					Qh(),
					tm(
						em(
							ve("fileItem"),
							rm("$file.name"),
							pt(
								"$value.length === 1",
								_l(ve("fileRemove"), '$ui.remove.value + " " + $file.name'),
							),
						),
					),
					pt("$value.length > 1", _l("$ui.removeAll.value")),
					sm(ve("noFiles"), "$ui.noFiles.value"),
					bt(),
					ve("suffix"),
				),
			),
			mt("$help"),
			kt(It("$message.value")),
		),
		type: "input",
		family: "text",
		props: [],
		features: [
			pm,
			ir("fileItem", "fileItem"),
			ir("fileRemove", "fileRemove"),
			ir("noFiles", "noFiles"),
		],
		schemaMemoKey: "9kqc4852fv8",
	},
	Cm = {
		schema: nm("$slots.default", kt(It("$message.value")), Zh(om())),
		type: "group",
		props: [
			"actions",
			"submit",
			"submitLabel",
			"submitAttrs",
			"submitBehavior",
			"incompleteMessage",
		],
		features: [hm, _i],
		schemaMemoKey: "5bg016redjo",
	},
	Om = {
		schema: vi("$slots.default"),
		type: "group",
		props: [],
		features: [_i, La],
	},
	Im = { schema: Fa(), type: "input", props: [], features: [ja] },
	km = {
		schema: vi("$slots.default"),
		type: "list",
		props: ["sync", "dynamic"],
		features: [_i, La],
	},
	Fm = { schema: vi(), type: "input", props: [], features: [] },
	Rm = {
		schema: Wt(
			pt(
				"$options == undefined",
				Pn(
					En(gt(), Sn(), Cn(ve("decorator")), bt()),
					lr(An("$label"), { if: "$label" }),
				),
				Ia(
					ka("$label"),
					mt("$help"),
					Oa(
						Ca(
							Pn(
								En(
									gt(),
									lr(Sn(), {
										bind: "$option.attrs",
										attrs: {
											id: "$option.attrs.id",
											value: "$option.value",
											checked: "$fns.isChecked($option.value)",
										},
									}),
									Cn(ve("decorator")),
									bt(),
								),
								lr(An("$option.label"), { if: "$option.label" }),
							),
							Pa("$option.help"),
						),
					),
				),
			),
			pt("$options == undefined && $help", mt("$help")),
			kt(It("$message.value")),
		),
		type: "input",
		family: "box",
		props: ["options", "onValue", "offValue", "optionsLoader"],
		features: [yi, vm, ir("decorator", "radioDecorator")],
		schemaMemoKey: "qje02tb3gu8",
	},
	Tm = {
		schema: Wt(
			Ur(
				Gn("$label"),
				Bn(
					ve("prefix"),
					gt(),
					lm(
						pt(
							"$slots.default",
							() => "$slots.default",
							wl(
								pt(
									"$option.group",
									im(wl($l("$option.label"))),
									$l("$option.label"),
								),
							),
						),
					),
					pt("$attrs.multiple !== undefined", () => "", ve("select")),
					bt(),
					ve("suffix"),
				),
			),
			mt("$help"),
			kt(It("$message.value")),
		),
		type: "input",
		props: ["options", "placeholder", "optionsLoader"],
		features: [yi, Em, ir("select", "select")],
		schemaMemoKey: "cb119h43krg",
	},
	Mm = {
		schema: Wt(
			Ur(
				Gn("$label"),
				Bn(ve("prefix", "label"), gt(), am(), bt(), ve("suffix")),
			),
			mt("$help"),
			kt(It("$message.value")),
		),
		type: "input",
		props: [],
		features: [gm],
		schemaMemoKey: "b1n0td79m9g",
	},
	Pe = {
		schema: Wt(
			Ur(
				Gn("$label"),
				Bn(ve("prefix", "label"), gt(), Fa(), bt(), ve("suffix")),
			),
			mt("$help"),
			kt(It("$message.value")),
		),
		type: "input",
		family: "text",
		props: [],
		features: [ja],
		schemaMemoKey: "c3cc4kflsg",
	},
	jm = {
		button: Al,
		submit: Al,
		checkbox: Am,
		file: Pm,
		form: Cm,
		group: Om,
		hidden: Im,
		list: km,
		meta: Fm,
		radio: Rm,
		select: Tm,
		textarea: Mm,
		text: Pe,
		color: Pe,
		date: Pe,
		datetimeLocal: Pe,
		email: Pe,
		month: Pe,
		number: Pe,
		password: Pe,
		search: Pe,
		tel: Pe,
		time: Pe,
		url: Pe,
		week: Pe,
		range: Pe,
	},
	Ye = void 0,
	tt = null,
	On,
	Da = !1,
	xr = !1,
	Lm = new Promise((e) => {
		On = () => {
			(Da = !0), e();
		};
	}),
	dt = typeof window < "u" && typeof fetch < "u";
Ye = dt ? getComputedStyle(document.documentElement) : void 0;
var er = {},
	as = {};
function Nm(e, t, r, n) {
	t && Object.assign(er, t),
		dt && !xr && Ye != null && Ye.getPropertyValue("--formkit-theme")
			? (On(), (xr = !0))
			: e && !xr && dt
			  ? Vm(e)
			  : !xr && dt && On();
	const s = function (l) {
		var o, a;
		l.addProps(["iconLoader", "iconLoaderUrl"]),
			(l.props.iconHandler = Pl(
				(o = l.props) != null && o.iconLoader ? l.props.iconLoader : n,
				(a = l.props) != null && a.iconLoaderUrl ? l.props.iconLoaderUrl : r,
			)),
			Km(l, l.props.iconHandler),
			l.on("created", () => {
				var u;
				(u = l == null ? void 0 : l.context) != null &&
					u.handlers &&
					(l.context.handlers.iconClick = (f) => {
						const c = `on${f.charAt(0).toUpperCase()}${f.slice(1)}IconClick`,
							w = l.props[c];
						if (w && typeof w == "function") return (b) => w(l, b);
					});
			});
	};
	return (s.iconHandler = Pl(n, r)), s;
}
function Vm(e) {
	if (
		!(!e || !dt || typeof getComputedStyle != "function") &&
		((xr = !0),
		(tt = document.getElementById("formkit-theme")),
		e &&
			dt &&
			((!(Ye != null && Ye.getPropertyValue("--formkit-theme")) && !tt) ||
				(tt != null &&
					tt.getAttribute("data-theme") &&
					(tt == null ? void 0 : tt.getAttribute("data-theme")) !== e)))
	) {
		const r = `https://cdn.jsdelivr.net/npm/@formkit/themes@${
				wn.startsWith("__") ? "latest" : wn
			}/dist/${e}/theme.css`,
			n = document.createElement("link");
		(n.type = "text/css"),
			(n.rel = "stylesheet"),
			(n.id = "formkit-theme"),
			n.setAttribute("data-theme", e),
			(n.onload = () => {
				(Ye = getComputedStyle(document.documentElement)), On();
			}),
			document.head.appendChild(n),
			(n.href = r),
			tt && tt.remove();
	}
}
function Pl(e, t) {
	return (r) => {
		if (typeof r != "string") return;
		if (r.startsWith("<svg")) return r;
		const n = r.startsWith("default:");
		r = n ? r.split(":")[1] : r;
		const s = r in er;
		let i;
		if (s) return er[r];
		if (!as[r]) {
			if (
				((i = Dm(r)),
				(i = dt && typeof i > "u" ? Promise.resolve(i) : i),
				i instanceof Promise)
			)
				as[r] = i
					.then((l) =>
						!l && typeof r == "string" && !n
							? (i = typeof e == "function" ? e(r) : Hm(r, t))
							: l,
					)
					.then(
						(l) => (
							typeof r == "string" && (er[n ? `default:${r}` : r] = l), l
						),
					);
			else if (typeof i == "string") return (er[n ? `default:${r}` : r] = i), i;
		}
		return as[r];
	};
}
function Dm(e) {
	if (dt) return Da ? Cl(e) : Lm.then(() => Cl(e));
}
function Cl(e) {
	const t = Ye == null ? void 0 : Ye.getPropertyValue(`--fk-icon-${e}`);
	if (t) {
		const r = atob(t);
		if (r.startsWith("<svg")) return (er[e] = r), r;
	}
}
function Hm(e, t) {
	const r = wn.startsWith("__") ? "latest" : wn,
		n =
			typeof t == "function"
				? t(e)
				: `https://cdn.jsdelivr.net/npm/@formkit/icons@${r}/dist/icons/${e}.svg`;
	if (dt)
		return fetch(`${n}`)
			.then(async (s) => {
				const i = await s.text();
				if (i.startsWith("<svg")) return i;
			})
			.catch((s) => {
				console.error(s);
			});
}
function Km(e, t) {
	const r = /^[a-zA-Z-]+(?:-icon|Icon)$/;
	Object.keys(e.props)
		.filter((s) => r.test(s))
		.forEach((s) => Um(e, t, s));
}
function Um(e, t, r) {
	const n = e.props[r],
		s = t(n),
		i = `_raw${r.charAt(0).toUpperCase()}${r.slice(1)}`,
		l = `on${r.charAt(0).toUpperCase()}${r.slice(1)}Click`;
	if ((e.addProps([i, l]), e.on(`prop:${r}`, zm), s instanceof Promise))
		return s.then((o) => {
			e.props[i] = o;
		});
	e.props[i] = s;
}
function zm(e) {
	var l;
	const t = e.origin,
		r = e.payload,
		n = (l = t == null ? void 0 : t.props) == null ? void 0 : l.iconHandler,
		s = e.name.split(":")[1],
		i = `_raw${s.charAt(0).toUpperCase()}${s.slice(1)}`;
	if (n && typeof n == "function") {
		const o = n(r);
		if (o instanceof Promise)
			return o.then((a) => {
				t.props[i] = a;
			});
		t.props[i] = o;
	}
}
var Ol = {
		100: ({ data: e }) =>
			`Only groups, lists, and forms can have children (${e.name}).`,
		101: ({ data: e }) =>
			`You cannot directly modify the store (${e.name}). See: https://formkit.com/advanced/core#message-store`,
		102: ({ data: [e, t] }) =>
			`You cannot directly assign node.${t} (${e.name})`,
		103: ({ data: [e] }) =>
			`Schema expressions cannot start with an operator (${e})`,
		104: ({ data: [e, t] }) =>
			`Schema expressions cannot end with an operator (${e} in "${t}")`,
		105: ({ data: e }) => `Invalid schema expression: ${e}`,
		106: ({ data: e }) => `Cannot submit because (${e}) is not in a form.`,
		107: ({ data: [e, t] }) => `Cannot set ${e.name} to non object value: ${t}`,
		108: ({ data: [e, t] }) => `Cannot set ${e.name} to non array value: ${t}`,
		300: ({ data: [e] }) =>
			`Cannot set behavior prop to overscroll (on ${e.name} input) when options prop is a function.`,
		600: ({ data: e }) =>
			`Unknown input type${
				typeof e.props.type == "string" ? ' "' + e.props.type + '"' : ""
			} ("${e.name}")`,
		601: ({ data: e }) =>
			`Input definition${
				typeof e.props.type == "string" ? ' "' + e.props.type + '"' : ""
			} is missing a schema or component property (${e.name}).`,
	},
	Il = {
		150: ({ data: e }) => `Schema function "${e}()" is not a valid function.`,
		151: ({ data: e }) => `No form element with id: ${e}`,
		152: ({ data: e }) => `No input element with id: ${e}`,
		350: ({ data: { node: e, inputType: t } }) =>
			`Invalid options prop for ${e.name} input (${t}). See https://formkit.com/inputs/${t}`,
		650: 'Schema "$get()" must use the id of an input to access.',
		651: ({ data: e }) =>
			`Cannot setErrors() on "${e}" because no such id exists.`,
		652: ({ data: e }) =>
			`Cannot clearErrors() on "${e}" because no such id exists.`,
		800: ({ data: e }) => `${e} is deprecated.`,
	},
	Wm = (e, t) => {
		if (e.code in Ol) {
			const r = Ol[e.code];
			e.message = typeof r == "function" ? r(e) : r;
		}
		return t(e);
	},
	kl = !1;
function qm() {
	kl || (di(Wm), hi(Bm), (kl = !0));
}
var Bm = (e, t) => {
		if (e.code in Il) {
			const r = Il[e.code];
			e.message = typeof r == "function" ? r(e) : r;
		}
		return t(e);
	},
	Gm = Object.defineProperty,
	Ym = Object.getOwnPropertyNames,
	Ha = (e, t) =>
		function () {
			return e && (t = (0, e[Ym(e)[0]])((e = 0))), t;
		},
	Zm = (e, t) => {
		for (var r in t) Gm(e, r, { get: t[r], enumerable: !0 });
	},
	Fl,
	Ka,
	Ua = Ha({
		"packages/vue/src/bindings.ts"() {
			(Fl = function (t) {
				t.ledger.count("blocking", ($) => $.blocking);
				const r = te(!t.ledger.value("blocking"));
				t.ledger.count("errors", ($) => $.type === "error");
				const n = te(!!t.ledger.value("errors"));
				let s = !1;
				ni(() => {
					s = !0;
				});
				const i = ct(
						t.store.reduce(($, M) => (M.visible && ($[M.key] = M), $), {}),
					),
					l = te(
						t.props.validationVisibility ||
							(t.props.type === "checkbox" ? "dirty" : "blur"),
					);
				t.on("prop:validationVisibility", ({ payload: $ }) => {
					l.value = $;
				});
				const o = te(l.value === "live"),
					a = te(!1),
					u = ($) => {
						a.value = ($ ?? []).some((M) => M.name === "required");
					};
				u(t.props.parsedRules),
					t.on("prop:parsedRules", ({ payload: $ }) => u($));
				const f = te(t.children.map(($) => $.uid)),
					c = de(() => {
						if (!_.state) return !1;
						if (_.state.submitted) return !0;
						if (!o.value && !_.state.settled) return !1;
						switch (l.value) {
							case "live":
								return !0;
							case "blur":
								return _.state.blurred;
							case "dirty":
								return _.state.dirty;
							default:
								return !1;
						}
					}),
					w = de(() =>
						_ && b.value ? r.value && !n.value : _.state.dirty && !De(_.value),
					),
					b = te(
						Array.isArray(t.props.parsedRules) &&
							t.props.parsedRules.length > 0,
					);
				t.on("prop:parsedRules", ({ payload: $ }) => {
					b.value = Array.isArray($) && $.length > 0;
				});
				const x = de(() => {
						const $ = {};
						for (const M in i) {
							const j = i[M];
							(j.type !== "validation" || c.value) && ($[M] = j);
						}
						return $;
					}),
					p = ct(
						t.store.reduce(
							($, M) => (M.type === "ui" && M.visible && ($[M.key] = M), $),
							{},
						),
					),
					m = ct({}),
					v = new Proxy(m, {
						get(...$) {
							const [M, j] = $;
							let G = Reflect.get(...$);
							return (
								!G &&
									typeof j == "string" &&
									!q(M, j) &&
									!j.startsWith("__v") &&
									Nr(t).watch((Q) => {
										const D =
												typeof Q.config.rootClasses == "function"
													? Q.config.rootClasses(j, Q)
													: {},
											Z = Q.config.classes ? cn(j, Q, Q.config.classes[j]) : {},
											ee = cn(j, Q, Q.props[`_${j}Class`]),
											ge = cn(j, Q, Q.props[`${j}Class`]);
										(G = md(Q, j, D, Z, ee, ge)), (M[j] = G ?? "");
									}),
								G
							);
						},
					});
				t.on("prop:rootClasses", () => {
					const $ = Object.keys(m);
					for (const M of $) delete m[M];
				});
				const O = de(() => {
						const $ = [];
						_.help && $.push(`help-${t.props.id}`);
						for (const M in x.value) $.push(`${t.props.id}-${M}`);
						return $.length ? $.join(" ") : void 0;
					}),
					P = te(t.value),
					y = te(t.value),
					_ = ct({
						_value: y,
						attrs: t.props.attrs,
						disabled: t.props.disabled,
						describedBy: O,
						fns: {
							length: ($) => Object.keys($).length,
							number: ($) => Number($),
							string: ($) => String($),
							json: ($) => JSON.stringify($),
							eq: Ae,
						},
						handlers: {
							blur: ($) => {
								t &&
									(t.store.set(Je({ key: "blurred", visible: !1, value: !0 })),
									typeof t.props.attrs.onBlur == "function" &&
										t.props.attrs.onBlur($));
							},
							touch: () => {
								var j;
								const $ = _.dirtyBehavior === "compare";
								if ((j = t.store.dirty) != null && j.value && !$) return;
								const M = !Ae(t.props._init, t._value);
								(!M && !$) ||
									t.store.set(Je({ key: "dirty", visible: !1, value: M }));
							},
							DOMInput: ($) => {
								t.input($.target.value), t.emit("dom-input-event", $);
							},
						},
						help: t.props.help,
						id: t.props.id,
						items: f,
						label: t.props.label,
						messages: x,
						didMount: !1,
						node: Ut(t),
						options: t.props.options,
						defaultMessagePlacement: !0,
						slots: t.props.__slots,
						state: {
							blurred: !1,
							complete: w,
							dirty: !1,
							empty: De(P),
							submitted: !1,
							settled: t.isSettled,
							valid: r,
							errors: n,
							rules: b,
							validationVisible: c,
							required: a,
						},
						type: t.props.type,
						family: t.props.family,
						ui: p,
						value: P,
						classes: v,
					});
				t.on("created", () => {
					Ae(_.value, t.value) ||
						((y.value = t.value), (P.value = t.value), Xr(P), Xr(y)),
						(async () => (
							await t.settled, t && (t.props._init = Be(t.value))
						))();
				}),
					t.on("mounted", () => {
						_.didMount = !0;
					}),
					t.on("settled", ({ payload: $ }) => {
						_.state.settled = $;
					});
				function h($) {
					(Array.isArray($) ? $ : Object.keys($)).forEach((j) => {
						(j = sr(j)),
							q(_, j) || (_[j] = t.props[j]),
							t.on(`prop:${j}`, ({ payload: G }) => {
								_[j] = G;
							});
					});
				}
				h(
					(() => {
						const $ = [
								"__root",
								"help",
								"label",
								"disabled",
								"options",
								"type",
								"attrs",
								"preserve",
								"preserveErrors",
								"id",
								"dirtyBehavior",
							],
							M = /^[a-zA-Z-]+(?:-icon|Icon)$/,
							j = Object.keys(t.props).filter((G) => M.test(G));
						return $.concat(j);
					})(),
				);
				function k($) {
					$.props && h($.props);
				}
				t.props.definition && k(t.props.definition),
					t.on("added-props", ({ payload: $ }) => h($)),
					t.on("input", ({ payload: $ }) => {
						t.type !== "input" && !fe($) && !st($)
							? (y.value = Is($))
							: ((y.value = $), Xr(y));
					}),
					t.on("commitRaw", ({ payload: $ }) => {
						t.type !== "input" && !fe($) && !st($)
							? (P.value = y.value = Is($))
							: ((P.value = y.value = $), Xr(P)),
							t.emit("modelUpdated");
					}),
					t.on("commit", ({ payload: $ }) => {
						var M;
						if (
							(!_.state.dirty || _.dirtyBehavior === "compare") &&
							t.isCreated &&
							s
						)
							if (!((M = t.store.validating) != null && M.value))
								_.handlers.touch();
							else {
								const j = t.on("message-removed", ({ payload: G }) => {
									G.key === "validating" && (_.handlers.touch(), t.off(j));
								});
							}
						w &&
							t.type === "input" &&
							n.value &&
							!Ge(t.props.preserveErrors) &&
							t.store.filter((j) => {
								var G;
								return !(
									j.type === "error" &&
									((G = j.meta) == null ? void 0 : G.autoClear) === !0
								);
							}),
							t.type === "list" &&
								t.sync &&
								(f.value = t.children.map((j) => j.uid)),
							(_.state.empty = De($));
					});
				const L = async ($) => {
					$.type === "ui" && $.visible && !$.meta.showAsMessage
						? (p[$.key] = $)
						: $.visible
						  ? (i[$.key] = $)
						  : $.type === "state" && (_.state[$.key] = !!$.value);
				};
				t.on("message-added", ($) => L($.payload)),
					t.on("message-updated", ($) => L($.payload)),
					t.on("message-removed", ({ payload: $ }) => {
						delete p[$.key], delete i[$.key], delete _.state[$.key];
					}),
					t.on("settled:blocking", () => {
						r.value = !0;
					}),
					t.on("unsettled:blocking", () => {
						r.value = !1;
					}),
					t.on("settled:errors", () => {
						n.value = !1;
					}),
					t.on("unsettled:errors", () => {
						n.value = !0;
					}),
					Ve(c, ($) => {
						$ && (o.value = !0);
					}),
					(t.context = _),
					t.emit("context", t, !1),
					t.on("destroyed", () => {
						(t.context = void 0), (t = null);
					});
			}),
				(Ka = Fl);
		},
	}),
	Jm = {};
Zm(Jm, { defaultConfig: () => $i });
var $i,
	Xm = Ha({
		"packages/vue/src/defaultConfig.ts"() {
			Ua(),
				($i = (e = {}) => {
					qm();
					const {
							rules: t = {},
							locales: r = {},
							inputs: n = {},
							messages: s = {},
							locale: i = void 0,
							theme: l = void 0,
							iconLoaderUrl: o = void 0,
							iconLoader: a = void 0,
							icons: u = {},
							...f
						} = e,
						c = Ch({ ...Ph, ...(t || {}) }),
						w = qh(Ot({ en: Wh, ...(r || {}) }, s)),
						b = Bh(jm, n),
						x = Nm(l, u, o, a);
					return Ot(
						{
							plugins: [b, x, Ka, w, c],
							...(i ? { config: { locale: i } } : {}),
						},
						f || {},
						!0,
					);
				});
		},
	}),
	Qm = typeof window > "u",
	us = new Map();
function eg(e, t) {
	var r;
	!Qm ||
		!e ||
		(us.has(e) || us.set(e, new Set()), (r = us.get(e)) == null || r.add(t));
}
var za = typeof window > "u",
	kr = {},
	or = {},
	Ee,
	ut = new WeakMap(),
	tg = "__raw__",
	rg = /[a-zA-Z0-9\-][cC]lass$/;
function ng(e, t) {
	const r = te(null);
	if (e === "get") {
		const s = {};
		return (r.value = sg.bind(null, s)), r;
	}
	const n = e.split(".");
	return (
		We(() => {
			r.value = wi(fe(t) ? t.value : t, n);
		}),
		r
	);
}
function wi(e, t) {
	if (Array.isArray(e)) {
		for (const s of e) {
			const i = s !== !1 && wi(s, t);
			if (i !== void 0) return i;
		}
		return;
	}
	let r,
		n = e;
	for (const s in t) {
		const i = t[s];
		if (typeof n != "object" || n === null) {
			r = void 0;
			break;
		}
		const l = n[i];
		if (Number(s) === t.length - 1 && l !== void 0) {
			r = typeof l == "function" ? l.bind(n) : l;
			break;
		}
		n = l;
	}
	return r;
}
function sg(e, t) {
	if (typeof t != "string") return zt(650);
	if ((t in e || (e[t] = te(void 0)), e[t].value === void 0)) {
		e[t].value = null;
		const r = Hr(t);
		r && (e[t].value = r.context),
			_p(t, ({ payload: n }) => {
				e[t].value = Kr(n) ? n.context : n;
			});
	}
	return e[t].value;
}
function Rl(e, t, r) {
	function n(b, x) {
		const p = c(Ke(x.if), { if: !0 }),
			m = u(b, x.then),
			v = x.else ? u(b, x.else) : null;
		return [p, m, v];
	}
	function s(b, x) {
		var O, P;
		const p = c(Ke(b.if));
		let m = () => x,
			v = () => x;
		return (
			typeof b.then == "object"
				? (v = i(b.then, void 0))
				: typeof b.then == "string" && (O = b.then) != null && O.startsWith("$")
				  ? (v = c(Ke(b.then)))
				  : (v = () => b.then),
			q(b, "else") &&
				(typeof b.else == "object"
					? (m = i(b.else))
					: typeof b.else == "string" &&
						  (P = b.else) != null &&
						  P.startsWith("$")
					  ? (m = c(Ke(b.else)))
					  : (m = () => b.else)),
			() => (p() ? v() : m())
		);
	}
	function i(b, x, p = {}) {
		const m = new Set(Object.keys(b || {})),
			v = x ? c(Ke(x)) : () => ({}),
			O = [
				(P) => {
					const y = v();
					for (const _ in y) m.has(_) || (P[_] = y[_]);
				},
			];
		if (b) {
			if (Jt(b)) return s(b, p);
			for (let P in b) {
				const y = b[P];
				let _;
				const h = typeof y == "string";
				P.startsWith(tg)
					? ((P = P.substring(7)), (_ = () => y))
					: h &&
						  y.startsWith("$") &&
						  y.length > 1 &&
						  !(y.startsWith("$reset") && rg.test(P))
					  ? (_ = c(Ke(y)))
					  : typeof y == "object" && Jt(y)
						  ? (_ = s(y, void 0))
						  : typeof y == "object" && cr(y)
							  ? (_ = i(y))
							  : (_ = () => y),
					O.push((E) => {
						E[P] = _();
					});
			}
		}
		return () => {
			const P = Array.isArray(b) ? [] : {};
			return O.forEach((y) => y(P)), P;
		};
	}
	function l(b, x) {
		let p = null,
			m = () => null,
			v = !1,
			O = null,
			P = null,
			y = null,
			_ = !1;
		const h = hd(x);
		if (
			(Ms(h)
				? ((p = h.$el),
				  (m = h.$el !== "text" ? i(h.attrs, h.bind) : () => null))
				: js(h)
				  ? (typeof h.$cmp == "string"
							? q(b, h.$cmp)
								? (p = b[h.$cmp])
								: ((p = h.$cmp), (_ = !0))
							: (p = h.$cmp),
					  (m = i(h.props, h.bind)))
				  : Jt(h) && ([v, O, P] = n(b, h)),
			!Jt(h) && "if" in h
				? (v = c(Ke(h.if)))
				: !Jt(h) && p === null && (v = () => !0),
			"children" in h && h.children)
		)
			if (typeof h.children == "string")
				if (h.children.startsWith("$slots."))
					(p = p === "text" ? "slot" : p), (O = c(Ke(h.children)));
				else if (h.children.startsWith("$") && h.children.length > 1) {
					const E = c(Ke(h.children));
					O = () => String(E());
				} else O = () => String(h.children);
			else if (Array.isArray(h.children)) O = u(b, h.children);
			else {
				const [E, k, L] = n(b, h.children);
				O = ($) => (E && E() ? k && k($) : L && L($));
			}
		if (js(h))
			if (O) {
				const E = O;
				(O = (k) => ({
					default(L, $) {
						var G, _e, Q, D;
						const M = Ee;
						$ && (Ee = $),
							L && ((G = ut.get(Ee)) == null || G.unshift(L)),
							k && ((_e = ut.get(Ee)) == null || _e.unshift(k));
						const j = E(k);
						return (
							L && ((Q = ut.get(Ee)) == null || Q.shift()),
							k && ((D = ut.get(Ee)) == null || D.shift()),
							(Ee = M),
							j
						);
					},
				})),
					(O.slot = !0);
			} else O = () => ({});
		if ("for" in h && h.for) {
			const E = h.for.length === 3 ? h.for[2] : h.for[1];
			y = [
				typeof E == "string" && E.startsWith("$") ? c(Ke(E)) : () => E,
				h.for[0],
				h.for.length === 3 ? String(h.for[1]) : null,
			];
		}
		return [v, p, m, O, P, y, _];
	}
	function o(b, x) {
		const p = b(x),
			m = Ee;
		return Object.keys(p).reduce((v, O) => {
			const P = p && p[O];
			return (v[O] = (y) => (P && P(y, m)) || null), v;
		}, {});
	}
	function a(b, x) {
		const [p, m, v, O, P, y, _] = l(b, x);
		let h = (E) => {
			if (p && m === null && O) return p() ? O(E) : P && P(E);
			if (m && (!p || p())) {
				if (m === "text" && O) return Qt(String(O()));
				if (m === "slot" && O) return O(E);
				const k = _ ? Vn(m) : m,
					L = O != null && O.slot ? o(O, E) : null;
				return Ct(k, v(), L || (O ? O(E) : []));
			}
			return typeof P == "function" ? P(E) : P;
		};
		if (y) {
			const E = h,
				[k, L, $] = y;
			h = () => {
				const M = k(),
					j = Number.isFinite(M)
						? Array(Number(M))
								.fill(0)
								.map((D, Z) => Z)
						: M,
					G = [];
				if (typeof j != "object") return null;
				const _e = ut.get(Ee) || [],
					Q = Array.isArray(j);
				for (const D in j) {
					if (Q && D in Array.prototype) continue;
					const Z = Object.defineProperty(
						{
							..._e.reduce(
								(ee, ge) => (ee.__idata ? { ...ee, ...ge } : ge),
								{},
							),
							[L]: j[D],
							...($ !== null ? { [$]: Q ? Number(D) : D } : {}),
						},
						"__idata",
						{ enumerable: !1, value: !0 },
					);
					_e.unshift(Z), G.push(E.bind(null, Z)()), _e.shift();
				}
				return G;
			};
		}
		return h;
	}
	function u(b, x) {
		if (Array.isArray(x)) {
			const m = x.map(a.bind(null, b));
			return (v) => m.map((O) => O(v));
		}
		const p = a(b, x);
		return (m) => p(m);
	}
	const f = [];
	function c(b, x = {}) {
		const p = new WeakMap();
		return (
			f.push((m, v) => {
				p.set(
					v,
					b.provide((O) => m(O, x)),
				);
			}),
			() => p.get(Ee)()
		);
	}
	function w(b, x) {
		r ?? (r = qa(t));
		const [p, m] = q(kr, r) ? kr[r] : [u(e, t), f];
		return (
			za || (or[r] ?? (or[r] = 0), or[r]++, (kr[r] = [p, m])),
			m.forEach((v) => {
				v(b, x);
			}),
			() => ((Ee = x), p())
		);
	}
	return w;
}
function Wa(e, t) {
	const r = ut.get(Ee) || [];
	let n;
	return r.length && (n = wi(r, e.split("."))), n === void 0 ? t : n;
}
function ig(e, t) {
	return new Proxy(e, {
		get(...r) {
			let n;
			const s = r[1];
			if (typeof s == "string") {
				const i = Ee;
				(Ee = t), (n = Wa(s, void 0)), (Ee = i);
			}
			return n !== void 0 ? n : Reflect.get(...r);
		},
	});
}
function Tl(e, t, r) {
	return e(
		(n, s = {}) =>
			n.reduce((i, l) => {
				if (l.startsWith("slots.")) {
					const o = l.substring(6),
						a = () =>
							t.slots && q(t.slots, o) && typeof t.slots[o] == "function";
					if (s.if) i[l] = a;
					else if (t.slots) {
						const u = ig(t, r);
						i[l] = () => (a() ? t.slots[o](u) : null);
					}
				} else {
					const o = ng(l, t);
					i[l] = () => Wa(l, o.value);
				}
				return i;
			}, {}),
		r,
	);
}
function Ml(e, t, r) {
	if ((t ?? (t = qa(e)), or[t]--, or[t] === 0)) {
		delete or[t];
		const [, n] = kr[t];
		delete kr[t], (n.length = 0);
	}
	ut.delete(r);
}
function qa(e) {
	return JSON.stringify(e, (t, r) =>
		typeof r == "function" ? r.toString() : r,
	);
}
var Ba = yt({
		name: "FormKitSchema",
		props: {
			schema: { type: [Array, Object], required: !0 },
			data: { type: Object, default: () => ({}) },
			library: { type: Object, default: () => ({}) },
			memoKey: { type: String, required: !1 },
		},
		emits: ["mounted"],
		setup(e, t) {
			var u;
			const r = Ss();
			let n = {};
			ut.set(n, []);
			const s = { FormKit: Ut(Ya), ...e.library };
			let i = Rl(s, e.schema, e.memoKey),
				l,
				o;
			za ||
				Ve(
					() => e.schema,
					(f, c) => {
						var b;
						const w = n;
						(n = {}),
							ut.set(n, []),
							(i = Rl(s, e.schema, e.memoKey)),
							(l = Tl(i, o, n)),
							f === c &&
								((b = r == null ? void 0 : r.proxy) == null
									? void 0
									: b.$forceUpdate
								).call(b),
							Ml(e.schema, e.memoKey, w);
					},
					{ deep: !0 },
				),
				We(() => {
					(o = Object.assign(ct(e.data ?? {}), { slots: t.slots })),
						t.slots,
						(l = Tl(i, o, n));
				});
			function a() {
				Ml(e.schema, e.memoKey, n),
					o.node && o.node.destroy(),
					(o.slots = null),
					(o = null),
					(l = null);
			}
			return (
				ht(() => t.emit("mounted")),
				Vr(a),
				eg((u = Ss()) == null ? void 0 : u.appContext.app, a),
				() => (l ? l() : null)
			);
		},
	}),
	lg = Ba,
	og = typeof window > "u",
	jl = Symbol("FormKitParent"),
	ag = Symbol("FormKitComponentCallback");
function ug(e, t) {
	const r = bg(e, t);
	if ((r.props.definition || Me(600, r), r.props.definition.component))
		return () => {
			var u;
			return Ct(
				(u = r.props.definition) == null ? void 0 : u.component,
				{ context: r.context },
				{ ...t.slots },
			);
		};
	const n = te([]);
	let s = r.props.definition.schemaMemoKey;
	const i = () => {
		var f, c;
		const u =
			(c = (f = r.props) == null ? void 0 : f.definition) == null
				? void 0
				: c.schema;
		u || Me(601, r),
			typeof u == "function"
				? ((n.value = u({ ...(e.sectionsSchema || {}) })),
				  ((s && e.sectionsSchema) ||
						("memoKey" in u && typeof u.memoKey == "string")) &&
						(s =
							(s ?? (u == null ? void 0 : u.memoKey)) +
							JSON.stringify(e.sectionsSchema)))
				: (n.value = u);
	};
	i(),
		og ||
			r.on("schema", () => {
				(s += "♻️"), i();
			}),
		t.emit("node", r);
	const l = r.props.definition.library,
		o = { FormKit: Ut(Ga), ...l };
	function a() {
		r.emit("mounted");
	}
	return (
		t.expose({ node: r }),
		() =>
			Ct(
				Ba,
				{
					schema: n.value,
					data: r.context,
					onMounted: a,
					library: o,
					memoKey: s,
				},
				{ ...t.slots },
			)
	);
}
var Ga = yt(ug, { props: Gh, inheritAttrs: !1 }),
	Ya = Ga,
	cg = Symbol();
function fg(e, t) {
	return (
		e
			.component(t.alias || "FormKit", Ya)
			.component(t.schemaAlias || "FormKitSchema", lg),
		{
			get: Hr,
			setLocale: (r) => {
				var n;
				(n = t.config) != null &&
					n.rootConfig &&
					(t.config.rootConfig.locale = r);
			},
			clearErrors: bd,
			setErrors: gd,
			submit: sa,
			reset: ia,
		}
	);
}
var Za = Symbol.for("FormKitOptions"),
	pg = Symbol.for("FormKitConfig"),
	dg = {
		install(e, t) {
			const r = Object.assign(
					{ alias: "FormKit", schemaAlias: "FormKitSchema" },
					typeof t == "function" ? t() : t,
				),
				n = $p(r.config || {});
			(r.config = { rootConfig: n }),
				(e.config.globalProperties.$formkit = fg(e, r)),
				e.provide(Za, r),
				e.provide(pg, n),
				typeof window < "u" &&
					(globalThis.__FORMKIT_CONFIGS__ = (
						globalThis.__FORMKIT_CONFIGS__ || []
					).concat([n]));
		},
	},
	hg = typeof window < "u",
	cs = [
		"ignore",
		"disabled",
		"preserve",
		"help",
		"label",
		/^preserve(-e|E)rrors/,
		/^[a-z]+(?:-visibility|Visibility|-behavior|Behavior)$/,
		/^[a-zA-Z-]+(?:-class|Class)$/,
		"prefixIcon",
		"suffixIcon",
		/^[a-zA-Z-]+(?:-icon|Icon)$/,
	],
	mg = ["disabled", "ignore", "preserve"];
function Ll(e, t) {
	t.classes &&
		Object.keys(t.classes).forEach((r) => {
			typeof r == "string" &&
				((e.props[`_${r}Class`] = t.classes[r]),
				Ir(t.classes[r]) && r === "inner" && Object.values(t.classes[r]));
		});
}
function gg(e) {
	return e
		? ["Submit", "SubmitRaw", "SubmitInvalid"].reduce((r, n) => {
				const s = `on${n}`;
				return s in e && typeof e[s] == "function" && (r[s] = e[s]), r;
		  }, {})
		: {};
}
function bg(e, t, r = {}) {
	const n = Object.assign({}, Ne(Za) || {}, r),
		s = Ne(cg, te(hg ? document : void 0)),
		i = Ne(ag, () => {}),
		l = Ss(),
		o = gg(l == null ? void 0 : l.vnode.props),
		a = ["modelValue", "model-value"].some(
			(h) => h in ((l == null ? void 0 : l.vnode.props) ?? {}),
		);
	let u = !1;
	ht(() => {
		u = !0;
	});
	const f = e.modelValue !== void 0 ? e.modelValue : Be(t.attrs.value);
	function c() {
		const h = {
				...Yt(e),
				...o,
				type: e.type ?? "text",
				__root: s.value,
				__slots: t.slots,
			},
			E = ul(Yt(t.attrs), cs);
		E.key || (E.key = gr()), (h.attrs = E);
		const k = cl(Yt(t.attrs), cs);
		for (const $ in k)
			mg.includes($) && k[$] === "" && (k[$] = !0), (h[sr($)] = k[$]);
		const L = { props: {} };
		return (
			Ll(L, e),
			Object.assign(h, L.props),
			typeof h.type != "string" && ((h.definition = h.type), delete h.type),
			h
		);
	}
	const w = c(),
		b = w.ignore ? null : e.parent || Ne(jl, null),
		x = pd(
			Ot(
				n || {},
				{
					name: e.name || void 0,
					value: f,
					parent: b,
					plugins: (n.plugins || []).concat(e.plugins ?? []),
					config: e.config || {},
					props: w,
					index: e.index,
					sync: !!Ge(t.attrs.sync || t.attrs.dynamic),
				},
				!1,
				!0,
			),
		);
	i(x), x.props.definition || Me(600, x);
	const p = te(
		new Set(
			Array.isArray(x.props.__propDefs)
				? x.props.__propDefs
				: Object.keys(x.props.__propDefs ?? {}),
		),
	);
	x.on("added-props", ({ payload: h }) => {
		(Array.isArray(h) ? h : Object.keys(h ?? {})).forEach((k) =>
			p.value.add(k),
		);
	});
	const m = de(() =>
		cs
			.concat([...p.value])
			.reduce(
				(h, E) => (
					typeof E == "string" ? (h.push(sr(E)), h.push(Qo(E))) : h.push(E), h
				),
				[],
			),
	);
	We(() => Ll(x, e));
	const v = Yt(e);
	for (const h in v)
		Ve(
			() => e[h],
			() => {
				e[h] !== void 0 && (x.props[h] = e[h]);
			},
		);
	We(() => {
		x.props.__root = s.value;
	});
	const O = new Set(),
		P = Yt(t.attrs);
	We(() => {
		y(cl(P, m.value));
	});
	function y(h) {
		O.forEach((E) => {
			E(), O.delete(E);
		});
		for (const E in h) {
			const k = sr(E);
			O.add(
				Ve(
					() => t.attrs[E],
					() => {
						x.props[k] = t.attrs[E];
					},
				),
			);
		}
	}
	if (
		(We(() => {
			const h = ul(Yt(t.attrs), m.value);
			"multiple" in h && (h.multiple = Ge(h.multiple)),
				typeof h.onBlur == "function" && (h.onBlur = Qf(h.onBlur)),
				(x.props.attrs = Object.assign({}, x.props.attrs || {}, h));
		}),
		We(() => {
			const h = (e.errors ?? []).map((E) =>
				Je({ key: fi(E), type: "error", value: E, meta: { source: "prop" } }),
			);
			x.store.apply(h, (E) => E.type === "error" && E.meta.source === "prop");
		}),
		x.type !== "input")
	) {
		const h = `${x.name}-prop`;
		We(() => {
			const E = e.inputErrors ?? {},
				k = Object.keys(E);
			k.length || x.clearErrors(!0, h);
			const L = k.reduce(($, M) => {
				let j = E[M];
				return (
					typeof j == "string" && (j = [j]),
					Array.isArray(j) &&
						($[M] = j.map((G) =>
							Je({ key: G, type: "error", value: G, meta: { source: h } }),
						)),
					$
				);
			}, {});
			x.store.apply(L, ($) => $.type === "error" && $.meta.source === h);
		});
	}
	We(() => Object.assign(x.config, e.config)), x.type !== "input" && yn(jl, x);
	let _;
	return (
		x.on("modelUpdated", () => {
			var h, E;
			t.emit("inputRaw", (h = x.context) == null ? void 0 : h.value, x),
				u && t.emit("input", (E = x.context) == null ? void 0 : E.value, x),
				a &&
					x.context &&
					((_ = Be(x.value)), t.emit("update:modelValue", Is(x.value)));
		}),
		a &&
			(Ve(
				Qu(e, "modelValue"),
				(h) => {
					Ae(_, h) || x.input(h, !1);
				},
				{ deep: !0 },
			),
			x.value !== f && x.emit("modelUpdated")),
		To(() => x.destroy()),
		x
	);
}
var yg = z("messages", () => ({ $el: "ul", if: "$fns.length($messages)" })),
	vg = z("message", () => ({
		$el: "li",
		for: ["message", "$messages"],
		attrs: {
			key: "$message.key",
			id: "$id + '-' + $message.key",
			"data-message-type": "$message.type",
		},
	}));
yg(vg("$message.value"));
var _g = z("summary", () => ({ $el: "div", attrs: { "aria-live": "polite" } })),
	$g = z("summaryInner", () => ({
		$el: "div",
		if: "$summaries.length && $showSummaries",
	})),
	wg = z("messages", () => ({
		$el: "ul",
		if: "$summaries.length && $showSummaries",
	})),
	xg = z("message", () => ({
		$el: "li",
		for: ["summary", "$summaries"],
		attrs: { key: "$summary.key", "data-message-type": "$summary.type" },
	})),
	Sg = z("summaryHeader", () => ({ $el: "h2", attrs: { id: "$id" } })),
	Eg = z("messageLink", () => ({
		$el: "a",
		attrs: {
			id: "$summary.key",
			href: '$: "#" + $summary.id',
			onClick: "$jumpLink",
		},
	}));
_g($g(Sg("$summaryHeader"), wg(xg(Eg("$summary.message")))));
Xm();
Ua();
var Ag = {};
(function (e) {
	(function () {
		var t = {
			not_string: /[^s]/,
			not_bool: /[^t]/,
			not_type: /[^T]/,
			not_primitive: /[^v]/,
			number: /[diefg]/,
			numeric_arg: /[bcdiefguxX]/,
			json: /[j]/,
			not_json: /[^j]/,
			text: /^[^\x25]+/,
			modulo: /^\x25{2}/,
			placeholder:
				/^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
			key: /^([a-z_][a-z_\d]*)/i,
			key_access: /^\.([a-z_][a-z_\d]*)/i,
			index_access: /^\[(\d+)\]/,
			sign: /^[+-]/,
		};
		function r(o) {
			return s(l(o), arguments);
		}
		function n(o, a) {
			return r.apply(null, [o].concat(a || []));
		}
		function s(o, a) {
			var u = 1,
				f = o.length,
				c,
				w = "",
				b,
				x,
				p,
				m,
				v,
				O,
				P,
				y;
			for (b = 0; b < f; b++)
				if (typeof o[b] == "string") w += o[b];
				else if (typeof o[b] == "object") {
					if (((p = o[b]), p.keys))
						for (c = a[u], x = 0; x < p.keys.length; x++) {
							if (c == null)
								throw new Error(
									r(
										'[sprintf] Cannot access property "%s" of undefined value "%s"',
										p.keys[x],
										p.keys[x - 1],
									),
								);
							c = c[p.keys[x]];
						}
					else p.param_no ? (c = a[p.param_no]) : (c = a[u++]);
					if (
						(t.not_type.test(p.type) &&
							t.not_primitive.test(p.type) &&
							c instanceof Function &&
							(c = c()),
						t.numeric_arg.test(p.type) && typeof c != "number" && isNaN(c))
					)
						throw new TypeError(
							r("[sprintf] expecting number but found %T", c),
						);
					switch ((t.number.test(p.type) && (P = c >= 0), p.type)) {
						case "b":
							c = parseInt(c, 10).toString(2);
							break;
						case "c":
							c = String.fromCharCode(parseInt(c, 10));
							break;
						case "d":
						case "i":
							c = parseInt(c, 10);
							break;
						case "j":
							c = JSON.stringify(c, null, p.width ? parseInt(p.width) : 0);
							break;
						case "e":
							c = p.precision
								? parseFloat(c).toExponential(p.precision)
								: parseFloat(c).toExponential();
							break;
						case "f":
							c = p.precision
								? parseFloat(c).toFixed(p.precision)
								: parseFloat(c);
							break;
						case "g":
							c = p.precision
								? String(Number(c.toPrecision(p.precision)))
								: parseFloat(c);
							break;
						case "o":
							c = (parseInt(c, 10) >>> 0).toString(8);
							break;
						case "s":
							(c = String(c)),
								(c = p.precision ? c.substring(0, p.precision) : c);
							break;
						case "t":
							(c = String(!!c)),
								(c = p.precision ? c.substring(0, p.precision) : c);
							break;
						case "T":
							(c = Object.prototype.toString
								.call(c)
								.slice(8, -1)
								.toLowerCase()),
								(c = p.precision ? c.substring(0, p.precision) : c);
							break;
						case "u":
							c = parseInt(c, 10) >>> 0;
							break;
						case "v":
							(c = c.valueOf()),
								(c = p.precision ? c.substring(0, p.precision) : c);
							break;
						case "x":
							c = (parseInt(c, 10) >>> 0).toString(16);
							break;
						case "X":
							c = (parseInt(c, 10) >>> 0).toString(16).toUpperCase();
							break;
					}
					t.json.test(p.type)
						? (w += c)
						: (t.number.test(p.type) && (!P || p.sign)
								? ((y = P ? "+" : "-"), (c = c.toString().replace(t.sign, "")))
								: (y = ""),
						  (v = p.pad_char
								? p.pad_char === "0"
									? "0"
									: p.pad_char.charAt(1)
								: " "),
						  (O = p.width - (y + c).length),
						  (m = p.width && O > 0 ? v.repeat(O) : ""),
						  (w += p.align ? y + c + m : v === "0" ? y + m + c : m + y + c));
				}
			return w;
		}
		var i = Object.create(null);
		function l(o) {
			if (i[o]) return i[o];
			for (var a = o, u, f = [], c = 0; a; ) {
				if ((u = t.text.exec(a)) !== null) f.push(u[0]);
				else if ((u = t.modulo.exec(a)) !== null) f.push("%");
				else if ((u = t.placeholder.exec(a)) !== null) {
					if (u[2]) {
						c |= 1;
						var w = [],
							b = u[2],
							x = [];
						if ((x = t.key.exec(b)) !== null)
							for (w.push(x[1]); (b = b.substring(x[0].length)) !== ""; )
								if ((x = t.key_access.exec(b)) !== null) w.push(x[1]);
								else if ((x = t.index_access.exec(b)) !== null) w.push(x[1]);
								else
									throw new SyntaxError(
										"[sprintf] failed to parse named argument key",
									);
						else
							throw new SyntaxError(
								"[sprintf] failed to parse named argument key",
							);
						u[2] = w;
					} else c |= 2;
					if (c === 3)
						throw new Error(
							"[sprintf] mixing positional and named placeholders is not (yet) supported",
						);
					f.push({
						placeholder: u[0],
						param_no: u[1],
						keys: u[2],
						sign: u[3],
						pad_char: u[4],
						align: u[5],
						width: u[6],
						precision: u[7],
						type: u[8],
					});
				} else throw new SyntaxError("[sprintf] unexpected placeholder");
				a = a.substring(u[0].length);
			}
			return (i[o] = f);
		}
		(e.sprintf = r),
			(e.vsprintf = n),
			typeof window < "u" && ((window.sprintf = r), (window.vsprintf = n));
	})();
})(Ag);
var Hs, Ja, Sr, Xa;
Hs = {
	"(": 9,
	"!": 8,
	"*": 7,
	"/": 7,
	"%": 7,
	"+": 6,
	"-": 6,
	"<": 5,
	"<=": 5,
	">": 5,
	">=": 5,
	"==": 4,
	"!=": 4,
	"&&": 3,
	"||": 2,
	"?": 1,
	"?:": 1,
};
Ja = ["(", "?"];
Sr = { ")": ["("], ":": ["?", "?:"] };
Xa = /<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/;
function Pg(e) {
	for (var t = [], r = [], n, s, i, l; (n = e.match(Xa)); ) {
		for (
			s = n[0], i = e.substr(0, n.index).trim(), i && t.push(i);
			(l = r.pop());
		) {
			if (Sr[s]) {
				if (Sr[s][0] === l) {
					s = Sr[s][1] || s;
					break;
				}
			} else if (Ja.indexOf(l) >= 0 || Hs[l] < Hs[s]) {
				r.push(l);
				break;
			}
			t.push(l);
		}
		Sr[s] || r.push(s), (e = e.substr(n.index + s.length));
	}
	return (e = e.trim()), e && t.push(e), t.concat(r.reverse());
}
var Cg = {
	"!": function (e) {
		return !e;
	},
	"*": function (e, t) {
		return e * t;
	},
	"/": function (e, t) {
		return e / t;
	},
	"%": function (e, t) {
		return e % t;
	},
	"+": function (e, t) {
		return e + t;
	},
	"-": function (e, t) {
		return e - t;
	},
	"<": function (e, t) {
		return e < t;
	},
	"<=": function (e, t) {
		return e <= t;
	},
	">": function (e, t) {
		return e > t;
	},
	">=": function (e, t) {
		return e >= t;
	},
	"==": function (e, t) {
		return e === t;
	},
	"!=": function (e, t) {
		return e !== t;
	},
	"&&": function (e, t) {
		return e && t;
	},
	"||": function (e, t) {
		return e || t;
	},
	"?:": function (e, t, r) {
		if (e) throw t;
		return r;
	},
};
function Og(e, t) {
	var r = [],
		n,
		s,
		i,
		l,
		o,
		a;
	for (n = 0; n < e.length; n++) {
		if (((o = e[n]), (l = Cg[o]), l)) {
			for (s = l.length, i = Array(s); s--; ) i[s] = r.pop();
			try {
				a = l.apply(null, i);
			} catch (u) {
				return u;
			}
		} else t.hasOwnProperty(o) ? (a = t[o]) : (a = +o);
		r.push(a);
	}
	return r[0];
}
function Ig(e) {
	var t = Pg(e);
	return function (r) {
		return Og(t, r);
	};
}
function kg(e) {
	var t = Ig(e);
	return function (r) {
		return +t({ n: r });
	};
}
var Nl = { contextDelimiter: "", onMissingKey: null };
function Fg(e) {
	var t, r, n;
	for (t = e.split(";"), r = 0; r < t.length; r++)
		if (((n = t[r].trim()), n.indexOf("plural=") === 0)) return n.substr(7);
}
function xi(e, t) {
	var r;
	(this.data = e), (this.pluralForms = {}), (this.options = {});
	for (r in Nl) this.options[r] = t !== void 0 && r in t ? t[r] : Nl[r];
}
xi.prototype.getPluralForm = function (e, t) {
	var r = this.pluralForms[e],
		n,
		s,
		i;
	return (
		r ||
			((n = this.data[e][""]),
			(i = n["Plural-Forms"] || n["plural-forms"] || n.plural_forms),
			typeof i != "function" &&
				((s = Fg(n["Plural-Forms"] || n["plural-forms"] || n.plural_forms)),
				(i = kg(s))),
			(r = this.pluralForms[e] = i)),
		r(t)
	);
};
xi.prototype.dcnpgettext = function (e, t, r, n, s) {
	var i, l, o;
	return (
		s === void 0 ? (i = 0) : (i = this.getPluralForm(e, s)),
		(l = r),
		t && (l = t + this.options.contextDelimiter + r),
		(o = this.data[e][l]),
		o && o[i]
			? o[i]
			: (this.options.onMissingKey && this.options.onMissingKey(r, e),
			  i === 0 ? r : n)
	);
};
const Vl = {
		"": {
			plural_forms(e) {
				return e === 1 ? 0 : 1;
			},
		},
	},
	Rg = /^i18n\.(n?gettext|has_translation)(_|$)/,
	Tg = (e, t, r) => {
		const n = new xi({}),
			s = new Set(),
			i = () => {
				s.forEach((y) => y());
			},
			l = (y) => (s.add(y), () => s.delete(y)),
			o = (y = "default") => n.data[y],
			a = (y, _ = "default") => {
				var h;
				(n.data[_] = { ...n.data[_], ...y }),
					(n.data[_][""] = {
						...Vl[""],
						...((h = n.data[_]) == null ? void 0 : h[""]),
					}),
					delete n.pluralForms[_];
			},
			u = (y, _) => {
				a(y, _), i();
			},
			f = (y, _ = "default") => {
				var h;
				(n.data[_] = {
					...n.data[_],
					...y,
					"": {
						...Vl[""],
						...((h = n.data[_]) == null ? void 0 : h[""]),
						...(y == null ? void 0 : y[""]),
					},
				}),
					delete n.pluralForms[_],
					i();
			},
			c = (y, _) => {
				(n.data = {}), (n.pluralForms = {}), u(y, _);
			},
			w = (y = "default", _, h, E, k) => (
				n.data[y] || a(void 0, y), n.dcnpgettext(y, _, h, E, k)
			),
			b = (y = "default") => y,
			x = (y, _) => {
				let h = w(_, void 0, y);
				return r
					? ((h = r.applyFilters("i18n.gettext", h, y, _)),
					  r.applyFilters("i18n.gettext_" + b(_), h, y, _))
					: h;
			},
			p = (y, _, h) => {
				let E = w(h, _, y);
				return r
					? ((E = r.applyFilters("i18n.gettext_with_context", E, y, _, h)),
					  r.applyFilters("i18n.gettext_with_context_" + b(h), E, y, _, h))
					: E;
			},
			m = (y, _, h, E) => {
				let k = w(E, void 0, y, _, h);
				return r
					? ((k = r.applyFilters("i18n.ngettext", k, y, _, h, E)),
					  r.applyFilters("i18n.ngettext_" + b(E), k, y, _, h, E))
					: k;
			},
			v = (y, _, h, E, k) => {
				let L = w(k, E, y, _, h);
				return r
					? ((L = r.applyFilters(
							"i18n.ngettext_with_context",
							L,
							y,
							_,
							h,
							E,
							k,
					  )),
					  r.applyFilters(
							"i18n.ngettext_with_context_" + b(k),
							L,
							y,
							_,
							h,
							E,
							k,
					  ))
					: L;
			},
			O = () => p("ltr", "text direction") === "rtl",
			P = (y, _, h) => {
				var L, $;
				const E = _ ? _ + "" + y : y;
				let k = !!(
					($ = (L = n.data) == null ? void 0 : L[h ?? "default"]) != null &&
					$[E]
				);
				return (
					r &&
						((k = r.applyFilters("i18n.has_translation", k, y, _, h)),
						(k = r.applyFilters("i18n.has_translation_" + b(h), k, y, _, h))),
					k
				);
			};
		if ((e && u(e, t), r)) {
			const y = (_) => {
				Rg.test(_) && i();
			};
			r.addAction("hookAdded", "core/i18n", y),
				r.addAction("hookRemoved", "core/i18n", y);
		}
		return {
			getLocaleData: o,
			setLocaleData: u,
			addLocaleData: f,
			resetLocaleData: c,
			subscribe: l,
			__: x,
			_x: p,
			_n: m,
			_nx: v,
			isRTL: O,
			hasTranslation: P,
		};
	};
function Qa(e) {
	return typeof e != "string" || e === ""
		? (console.error("The namespace must be a non-empty string."), !1)
		: /^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(e)
		  ? !0
		  : (console.error(
					"The namespace can only contain numbers, letters, dashes, periods, underscores and slashes.",
			  ),
			  !1);
}
function Si(e) {
	return typeof e != "string" || e === ""
		? (console.error("The hook name must be a non-empty string."), !1)
		: /^__/.test(e)
		  ? (console.error("The hook name cannot begin with `__`."), !1)
		  : /^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(e)
			  ? !0
			  : (console.error(
						"The hook name can only contain numbers, letters, dashes, periods and underscores.",
				  ),
				  !1);
}
function Dl(e, t) {
	return function (n, s, i, l = 10) {
		const o = e[t];
		if (!Si(n) || !Qa(s)) return;
		if (typeof i != "function") {
			console.error("The hook callback must be a function.");
			return;
		}
		if (typeof l != "number") {
			console.error("If specified, the hook priority must be a number.");
			return;
		}
		const a = { callback: i, priority: l, namespace: s };
		if (o[n]) {
			const u = o[n].handlers;
			let f;
			for (f = u.length; f > 0 && !(l >= u[f - 1].priority); f--);
			f === u.length ? (u[f] = a) : u.splice(f, 0, a),
				o.__current.forEach((c) => {
					c.name === n && c.currentIndex >= f && c.currentIndex++;
				});
		} else o[n] = { handlers: [a], runs: 0 };
		n !== "hookAdded" && e.doAction("hookAdded", n, s, i, l);
	};
}
function tn(e, t, r = !1) {
	return function (s, i) {
		const l = e[t];
		if (!Si(s) || (!r && !Qa(i))) return;
		if (!l[s]) return 0;
		let o = 0;
		if (r)
			(o = l[s].handlers.length), (l[s] = { runs: l[s].runs, handlers: [] });
		else {
			const a = l[s].handlers;
			for (let u = a.length - 1; u >= 0; u--)
				a[u].namespace === i &&
					(a.splice(u, 1),
					o++,
					l.__current.forEach((f) => {
						f.name === s && f.currentIndex >= u && f.currentIndex--;
					}));
		}
		return s !== "hookRemoved" && e.doAction("hookRemoved", s, i), o;
	};
}
function Hl(e, t) {
	return function (n, s) {
		const i = e[t];
		return typeof s < "u"
			? n in i && i[n].handlers.some((l) => l.namespace === s)
			: n in i;
	};
}
function Kl(e, t, r = !1) {
	return function (s, ...i) {
		const l = e[t];
		l[s] || (l[s] = { handlers: [], runs: 0 }), l[s].runs++;
		const o = l[s].handlers;
		if (!o || !o.length) return r ? i[0] : void 0;
		const a = { name: s, currentIndex: 0 };
		for (l.__current.push(a); a.currentIndex < o.length; ) {
			const f = o[a.currentIndex].callback.apply(null, i);
			r && (i[0] = f), a.currentIndex++;
		}
		if ((l.__current.pop(), r)) return i[0];
	};
}
function Ul(e, t) {
	return function () {
		var i;
		var n;
		const s = e[t];
		return (n =
			(i = s.__current[s.__current.length - 1]) == null ? void 0 : i.name) !==
			null && n !== void 0
			? n
			: null;
	};
}
function zl(e, t) {
	return function (n) {
		const s = e[t];
		return typeof n > "u"
			? typeof s.__current[0] < "u"
			: s.__current[0]
			  ? n === s.__current[0].name
			  : !1;
	};
}
function Wl(e, t) {
	return function (n) {
		const s = e[t];
		if (Si(n)) return s[n] && s[n].runs ? s[n].runs : 0;
	};
}
class Mg {
	constructor() {
		(this.actions = Object.create(null)),
			(this.actions.__current = []),
			(this.filters = Object.create(null)),
			(this.filters.__current = []),
			(this.addAction = Dl(this, "actions")),
			(this.addFilter = Dl(this, "filters")),
			(this.removeAction = tn(this, "actions")),
			(this.removeFilter = tn(this, "filters")),
			(this.hasAction = Hl(this, "actions")),
			(this.hasFilter = Hl(this, "filters")),
			(this.removeAllActions = tn(this, "actions", !0)),
			(this.removeAllFilters = tn(this, "filters", !0)),
			(this.doAction = Kl(this, "actions")),
			(this.applyFilters = Kl(this, "filters", !0)),
			(this.currentAction = Ul(this, "actions")),
			(this.currentFilter = Ul(this, "filters")),
			(this.doingAction = zl(this, "actions")),
			(this.doingFilter = zl(this, "filters")),
			(this.didAction = Wl(this, "actions")),
			(this.didFilter = Wl(this, "filters"));
	}
}
function jg() {
	return new Mg();
}
const Lg = jg(),
	pe = Tg(void 0, void 0, Lg),
	Ng = pe.getLocaleData.bind(pe);
pe.setLocaleData.bind(pe);
pe.resetLocaleData.bind(pe);
pe.subscribe.bind(pe);
const Ks = pe.__.bind(pe);
pe._x.bind(pe);
const Vg = pe._n.bind(pe);
pe._nx.bind(pe);
pe.isRTL.bind(pe);
pe.hasTranslation.bind(pe);
const rn = async ({ data: e, action: t } = { action: null }) => {
		if (!t) return;
		const r = new FormData();
		r.append("action", t), e && r.append("data", e);
		try {
			const n = await fetch(window.ajaxurl, {
					method: "POST",
					credentials: "same-origin",
					body: r,
				}),
				{ data: s } = await n.json();
			return s || {};
		} catch (n) {
			console.log(n);
		}
	},
	ql = async (e) => {
		if (e)
			try {
				const r = await (
					await fetch(e, { method: "GET", credentials: "same-origin" })
				).json();
				return r || {};
			} catch (t) {
				console.log(t);
			}
	},
	zr = Uf("main", () => {
		const e = te(!1),
			t = te({ success: "", error: "" }),
			r = te([]),
			n = te({}),
			s = te(null),
			i = te(null),
			l = te({});
		return (
			ht(async () => {
				(e.value = !0),
					(r.value = await ql("/wp-json/goodmotion-cookie-consent/v1/iframes")),
					(n.value = await ql(
						"/wp-json/goodmotion-cookie-consent/v1/services",
					));
				const { value: a } = await rn({ action: "get_gcc_layout" }),
					{ value: u } = await rn({ action: "get_gcc_settings" }),
					{ value: f } = await rn({ action: "get_gcc_scripts" });
				(s.value = a || {}),
					(i.value = u || {}),
					(l.value = f || {}),
					(e.value = !1),
					Object.keys(n.value).forEach((c) => {
						const w = n.value[c].slug;
						l.value[w] || ((l.value[w] = {}), (l.value[w].activated = !1));
					});
			}),
			{
				loading: e,
				message: t,
				layout: s,
				settings: i,
				scripts: l,
				scriptTags: n,
				saveValues: async (a, u) => {
					if (!a) return;
					e.value = !0;
					let f;
					try {
						f = await rn({ action: a, data: JSON.stringify({ value: u }) });
					} catch (c) {
						return (
							console.log(c),
							(e.value = !1),
							(t.value.error = Ks("Error on save process !")),
							!1
						);
					}
					return (
						(t.value.success = Ks("Saved with success")),
						(s.value = f.value),
						(e.value = !1),
						!0
					);
				},
				iframeOptions: r,
			}
		);
	});
let Dg = 0;
function Hg() {
	return ++Dg;
}
function eu() {
	return Hg();
}
function he(e) {
	var t;
	if (e == null || e.value == null) return null;
	let r = (t = e.value.$el) != null ? t : e.value;
	return r instanceof Node ? r : null;
}
function ar(e, t, ...r) {
	if (e in t) {
		let s = t[e];
		return typeof s == "function" ? s(...r) : s;
	}
	let n = new Error(
		`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(
			t,
		)
			.map((s) => `"${s}"`)
			.join(", ")}.`,
	);
	throw (Error.captureStackTrace && Error.captureStackTrace(n, ar), n);
}
var Kg = Object.defineProperty,
	Ug = (e, t, r) =>
		t in e
			? Kg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
			: (e[t] = r),
	Bl = (e, t, r) => (Ug(e, typeof t != "symbol" ? t + "" : t, r), r);
let zg = class {
		constructor() {
			Bl(this, "current", this.detect()), Bl(this, "currentId", 0);
		}
		set(t) {
			this.current !== t && ((this.currentId = 0), (this.current = t));
		}
		reset() {
			this.set(this.detect());
		}
		nextId() {
			return ++this.currentId;
		}
		get isServer() {
			return this.current === "server";
		}
		get isClient() {
			return this.current === "client";
		}
		detect() {
			return typeof window > "u" || typeof document > "u" ? "server" : "client";
		}
	},
	Wg = new zg();
function qg(e) {
	if (Wg.isServer) return null;
	if (e instanceof Node) return e.ownerDocument;
	if (e != null && e.hasOwnProperty("value")) {
		let t = he(e);
		if (t) return t.ownerDocument;
	}
	return document;
}
let Bg = [
	"[contentEditable=true]",
	"[tabindex]",
	"a[href]",
	"area[href]",
	"button:not([disabled])",
	"iframe",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
]
	.map((e) => `${e}:not([tabindex='-1'])`)
	.join(",");
var Ue = ((e) => (
		(e[(e.First = 1)] = "First"),
		(e[(e.Previous = 2)] = "Previous"),
		(e[(e.Next = 4)] = "Next"),
		(e[(e.Last = 8)] = "Last"),
		(e[(e.WrapAround = 16)] = "WrapAround"),
		(e[(e.NoScroll = 32)] = "NoScroll"),
		e
	))(Ue || {}),
	Er = ((e) => (
		(e[(e.Error = 0)] = "Error"),
		(e[(e.Overflow = 1)] = "Overflow"),
		(e[(e.Success = 2)] = "Success"),
		(e[(e.Underflow = 3)] = "Underflow"),
		e
	))(Er || {}),
	Gg = ((e) => (
		(e[(e.Previous = -1)] = "Previous"), (e[(e.Next = 1)] = "Next"), e
	))(Gg || {});
function Yg(e = document.body) {
	return e == null
		? []
		: Array.from(e.querySelectorAll(Bg)).sort((t, r) =>
				Math.sign(
					(t.tabIndex || Number.MAX_SAFE_INTEGER) -
						(r.tabIndex || Number.MAX_SAFE_INTEGER),
				),
		  );
}
var Zg = ((e) => (
		(e[(e.Strict = 0)] = "Strict"), (e[(e.Loose = 1)] = "Loose"), e
	))(Zg || {}),
	Jg = ((e) => (
		(e[(e.Keyboard = 0)] = "Keyboard"), (e[(e.Mouse = 1)] = "Mouse"), e
	))(Jg || {});
typeof window < "u" &&
	typeof document < "u" &&
	(document.addEventListener(
		"keydown",
		(e) => {
			e.metaKey ||
				e.altKey ||
				e.ctrlKey ||
				(document.documentElement.dataset.headlessuiFocusVisible = "");
		},
		!0,
	),
	document.addEventListener(
		"click",
		(e) => {
			e.detail === 1
				? delete document.documentElement.dataset.headlessuiFocusVisible
				: e.detail === 0 &&
				  (document.documentElement.dataset.headlessuiFocusVisible = "");
		},
		!0,
	));
let Xg = ["textarea", "input"].join(",");
function Qg(e) {
	var t, r;
	return (r =
		(t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Xg)) !=
		null
		? r
		: !1;
}
function Xt(e, t = (r) => r) {
	return e.slice().sort((r, n) => {
		let s = t(r),
			i = t(n);
		if (s === null || i === null) return 0;
		let l = s.compareDocumentPosition(i);
		return l & Node.DOCUMENT_POSITION_FOLLOWING
			? -1
			: l & Node.DOCUMENT_POSITION_PRECEDING
			  ? 1
			  : 0;
	});
}
function Zt(
	e,
	t,
	{ sorted: r = !0, relativeTo: n = null, skipElements: s = [] } = {},
) {
	var i;
	let l =
			(i = Array.isArray(e)
				? e.length > 0
					? e[0].ownerDocument
					: document
				: e == null
				  ? void 0
				  : e.ownerDocument) != null
				? i
				: document,
		o = Array.isArray(e) ? (r ? Xt(e) : e) : Yg(e);
	s.length > 0 && o.length > 1 && (o = o.filter((x) => !s.includes(x))),
		(n = n ?? l.activeElement);
	let a = (() => {
			if (t & 5) return 1;
			if (t & 10) return -1;
			throw new Error(
				"Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last",
			);
		})(),
		u = (() => {
			if (t & 1) return 0;
			if (t & 2) return Math.max(0, o.indexOf(n)) - 1;
			if (t & 4) return Math.max(0, o.indexOf(n)) + 1;
			if (t & 8) return o.length - 1;
			throw new Error(
				"Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last",
			);
		})(),
		f = t & 32 ? { preventScroll: !0 } : {},
		c = 0,
		w = o.length,
		b;
	do {
		if (c >= w || c + w <= 0) return 0;
		let x = u + c;
		if (t & 16) x = (x + w) % w;
		else {
			if (x < 0) return 3;
			if (x >= w) return 1;
		}
		(b = o[x]), b == null || b.focus(f), (c += a);
	} while (b !== l.activeElement);
	return t & 6 && Qg(b) && b.select(), 2;
}
function Gl(e, t) {
	if (e) return e;
	let r = t ?? "button";
	if (typeof r == "string" && r.toLowerCase() === "button") return "button";
}
function eb(e, t) {
	let r = te(Gl(e.value.type, e.value.as));
	return (
		ht(() => {
			r.value = Gl(e.value.type, e.value.as);
		}),
		We(() => {
			var n;
			r.value ||
				(he(t) &&
					he(t) instanceof HTMLButtonElement &&
					!((n = he(t)) != null && n.hasAttribute("type")) &&
					(r.value = "button"));
		}),
		r
	);
}
var Us = ((e) => (
		(e[(e.None = 0)] = "None"),
		(e[(e.RenderStrategy = 1)] = "RenderStrategy"),
		(e[(e.Static = 2)] = "Static"),
		e
	))(Us || {}),
	tb = ((e) => (
		(e[(e.Unmount = 0)] = "Unmount"), (e[(e.Hidden = 1)] = "Hidden"), e
	))(tb || {});
function br({
	visible: e = !0,
	features: t = 0,
	ourProps: r,
	theirProps: n,
	...s
}) {
	var i;
	let l = ru(n, r),
		o = Object.assign(s, { props: l });
	if (e || (t & 2 && l.static)) return fs(o);
	if (t & 1) {
		let a = (i = l.unmount) == null || i ? 0 : 1;
		return ar(a, {
			0() {
				return null;
			},
			1() {
				return fs({
					...s,
					props: { ...l, hidden: !0, style: { display: "none" } },
				});
			},
		});
	}
	return fs(o);
}
function fs({ props: e, attrs: t, slots: r, slot: n, name: s }) {
	var i, l;
	let { as: o, ...a } = nu(e, ["unmount", "static"]),
		u = (i = r.default) == null ? void 0 : i.call(r, n),
		f = {};
	if (n) {
		let c = !1,
			w = [];
		for (let [b, x] of Object.entries(n))
			typeof x == "boolean" && (c = !0), x === !0 && w.push(b);
		c && (f["data-headlessui-state"] = w.join(" "));
	}
	if (o === "template") {
		if (
			((u = tu(u ?? [])),
			Object.keys(a).length > 0 || Object.keys(t).length > 0)
		) {
			let [c, ...w] = u ?? [];
			if (!rb(c) || w.length > 0)
				throw new Error(
					[
						'Passing props on "template"!',
						"",
						`The current component <${s} /> is rendering a "template".`,
						"However we need to passthrough the following props:",
						Object.keys(a)
							.concat(Object.keys(t))
							.map((p) => p.trim())
							.filter((p, m, v) => v.indexOf(p) === m)
							.sort((p, m) => p.localeCompare(m))
							.map((p) => `  - ${p}`)
							.join(`
`),
						"",
						"You can apply a few solutions:",
						[
							'Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',
							"Render a single element as the child so that we can forward the props onto that element.",
						]
							.map((p) => `  - ${p}`)
							.join(`
`),
					].join(`
`),
				);
			let b = ru((l = c.props) != null ? l : {}, a, f),
				x = Vt(c, b, !0);
			for (let p in b)
				p.startsWith("on") && (x.props || (x.props = {}), (x.props[p] = b[p]));
			return x;
		}
		return Array.isArray(u) && u.length === 1 ? u[0] : u;
	}
	return Ct(o, Object.assign({}, a, f), { default: () => u });
}
function tu(e) {
	return e.flatMap((t) => (t.type === Te ? tu(t.children) : [t]));
}
function ru(...e) {
	if (e.length === 0) return {};
	if (e.length === 1) return e[0];
	let t = {},
		r = {};
	for (let n of e)
		for (let s in n)
			s.startsWith("on") && typeof n[s] == "function"
				? (r[s] != null || (r[s] = []), r[s].push(n[s]))
				: (t[s] = n[s]);
	if (t.disabled || t["aria-disabled"])
		return Object.assign(
			t,
			Object.fromEntries(Object.keys(r).map((n) => [n, void 0])),
		);
	for (let n in r)
		Object.assign(t, {
			[n](s, ...i) {
				let l = r[n];
				for (let o of l) {
					if (s instanceof Event && s.defaultPrevented) return;
					o(s, ...i);
				}
			},
		});
	return t;
}
function nu(e, t = []) {
	let r = Object.assign({}, e);
	for (let n of t) n in r && delete r[n];
	return r;
}
function rb(e) {
	return e == null
		? !1
		: typeof e.type == "string" ||
				typeof e.type == "object" ||
				typeof e.type == "function";
}
var su = ((e) => (
	(e[(e.None = 1)] = "None"),
	(e[(e.Focusable = 2)] = "Focusable"),
	(e[(e.Hidden = 4)] = "Hidden"),
	e
))(su || {});
let iu = yt({
	name: "Hidden",
	props: {
		as: { type: [Object, String], default: "div" },
		features: { type: Number, default: 1 },
	},
	setup(e, { slots: t, attrs: r }) {
		return () => {
			var n;
			let { features: s, ...i } = e,
				l = {
					"aria-hidden":
						(s & 2) === 2 ? !0 : (n = i["aria-hidden"]) != null ? n : void 0,
					style: {
						position: "fixed",
						top: 1,
						left: 1,
						width: 1,
						height: 0,
						padding: 0,
						margin: -1,
						overflow: "hidden",
						clip: "rect(0, 0, 0, 0)",
						whiteSpace: "nowrap",
						borderWidth: "0",
						...((s & 4) === 4 && (s & 2) !== 2 && { display: "none" }),
					},
				};
			return br({
				ourProps: l,
				theirProps: i,
				slot: {},
				attrs: r,
				slots: t,
				name: "Hidden",
			});
		};
	},
});
var ze = ((e) => (
	(e.Space = " "),
	(e.Enter = "Enter"),
	(e.Escape = "Escape"),
	(e.Backspace = "Backspace"),
	(e.Delete = "Delete"),
	(e.ArrowLeft = "ArrowLeft"),
	(e.ArrowUp = "ArrowUp"),
	(e.ArrowRight = "ArrowRight"),
	(e.ArrowDown = "ArrowDown"),
	(e.Home = "Home"),
	(e.End = "End"),
	(e.PageUp = "PageUp"),
	(e.PageDown = "PageDown"),
	(e.Tab = "Tab"),
	e
))(ze || {});
function nb(e) {
	typeof queueMicrotask == "function"
		? queueMicrotask(e)
		: Promise.resolve()
				.then(e)
				.catch((t) =>
					setTimeout(() => {
						throw t;
					}),
				);
}
let sb = yt({
	props: { onFocus: { type: Function, required: !0 } },
	setup(e) {
		let t = te(!0);
		return () =>
			t.value
				? Ct(iu, {
						as: "button",
						type: "button",
						features: su.Focusable,
						onFocus(r) {
							r.preventDefault();
							let n,
								s = 50;
							function i() {
								var l;
								if (s-- <= 0) {
									n && cancelAnimationFrame(n);
									return;
								}
								if ((l = e.onFocus) != null && l.call(e)) {
									(t.value = !1), cancelAnimationFrame(n);
									return;
								}
								n = requestAnimationFrame(i);
							}
							n = requestAnimationFrame(i);
						},
				  })
				: null;
	},
});
var ib = ((e) => (
		(e[(e.Forwards = 0)] = "Forwards"), (e[(e.Backwards = 1)] = "Backwards"), e
	))(ib || {}),
	lb = ((e) => (
		(e[(e.Less = -1)] = "Less"),
		(e[(e.Equal = 0)] = "Equal"),
		(e[(e.Greater = 1)] = "Greater"),
		e
	))(lb || {});
let lu = Symbol("TabsContext");
function Wr(e) {
	let t = Ne(lu, null);
	if (t === null) {
		let r = new Error(`<${e} /> is missing a parent <TabGroup /> component.`);
		throw (Error.captureStackTrace && Error.captureStackTrace(r, Wr), r);
	}
	return t;
}
let Ei = Symbol("TabsSSRContext"),
	ob = yt({
		name: "TabGroup",
		emits: { change: (e) => !0 },
		props: {
			as: { type: [Object, String], default: "template" },
			selectedIndex: { type: [Number], default: null },
			defaultIndex: { type: [Number], default: 0 },
			vertical: { type: [Boolean], default: !1 },
			manual: { type: [Boolean], default: !1 },
		},
		inheritAttrs: !1,
		setup(e, { slots: t, attrs: r, emit: n }) {
			var s;
			let i = te((s = e.selectedIndex) != null ? s : e.defaultIndex),
				l = te([]),
				o = te([]),
				a = de(() => e.selectedIndex !== null),
				u = de(() => (a.value ? e.selectedIndex : i.value));
			function f(p) {
				var m;
				let v = Xt(c.tabs.value, he),
					O = Xt(c.panels.value, he),
					P = v.filter((y) => {
						var _;
						return !((_ = he(y)) != null && _.hasAttribute("disabled"));
					});
				if (p < 0 || p > v.length - 1) {
					let y = ar(i.value === null ? 0 : Math.sign(p - i.value), {
							[-1]: () => 1,
							0: () =>
								ar(Math.sign(p), { [-1]: () => 0, 0: () => 0, 1: () => 1 }),
							1: () => 0,
						}),
						_ = ar(y, {
							0: () => v.indexOf(P[0]),
							1: () => v.indexOf(P[P.length - 1]),
						});
					_ !== -1 && (i.value = _), (c.tabs.value = v), (c.panels.value = O);
				} else {
					let y = v.slice(0, p),
						_ = [...v.slice(p), ...y].find((E) => P.includes(E));
					if (!_) return;
					let h = (m = v.indexOf(_)) != null ? m : c.selectedIndex.value;
					h === -1 && (h = c.selectedIndex.value),
						(i.value = h),
						(c.tabs.value = v),
						(c.panels.value = O);
				}
			}
			let c = {
				selectedIndex: de(() => {
					var p, m;
					return (m = (p = i.value) != null ? p : e.defaultIndex) != null
						? m
						: null;
				}),
				orientation: de(() => (e.vertical ? "vertical" : "horizontal")),
				activation: de(() => (e.manual ? "manual" : "auto")),
				tabs: l,
				panels: o,
				setSelectedIndex(p) {
					u.value !== p && n("change", p), a.value || f(p);
				},
				registerTab(p) {
					var m;
					if (l.value.includes(p)) return;
					let v = l.value[i.value];
					l.value.push(p), (l.value = Xt(l.value, he));
					let O = (m = l.value.indexOf(v)) != null ? m : i.value;
					O !== -1 && (i.value = O);
				},
				unregisterTab(p) {
					let m = l.value.indexOf(p);
					m !== -1 && l.value.splice(m, 1);
				},
				registerPanel(p) {
					o.value.includes(p) || (o.value.push(p), (o.value = Xt(o.value, he)));
				},
				unregisterPanel(p) {
					let m = o.value.indexOf(p);
					m !== -1 && o.value.splice(m, 1);
				},
			};
			yn(lu, c);
			let w = te({ tabs: [], panels: [] }),
				b = te(!1);
			ht(() => {
				b.value = !0;
			}),
				yn(
					Ei,
					de(() => (b.value ? null : w.value)),
				);
			let x = de(() => e.selectedIndex);
			return (
				ht(() => {
					Ve(
						[x],
						() => {
							var p;
							return f((p = e.selectedIndex) != null ? p : e.defaultIndex);
						},
						{ immediate: !0 },
					);
				}),
				We(() => {
					if (!a.value || u.value == null || c.tabs.value.length <= 0) return;
					let p = Xt(c.tabs.value, he);
					p.some((m, v) => he(c.tabs.value[v]) !== he(m)) &&
						c.setSelectedIndex(
							p.findIndex((m) => he(m) === he(c.tabs.value[u.value])),
						);
				}),
				() => {
					let p = { selectedIndex: i.value };
					return Ct(Te, [
						l.value.length <= 0 &&
							Ct(sb, {
								onFocus: () => {
									for (let m of l.value) {
										let v = he(m);
										if ((v == null ? void 0 : v.tabIndex) === 0)
											return v.focus(), !0;
									}
									return !1;
								},
							}),
						br({
							theirProps: {
								...r,
								...nu(e, [
									"selectedIndex",
									"defaultIndex",
									"manual",
									"vertical",
									"onChange",
								]),
							},
							ourProps: {},
							slot: p,
							slots: t,
							attrs: r,
							name: "TabGroup",
						}),
					]);
				}
			);
		},
	}),
	ab = yt({
		name: "TabList",
		props: { as: { type: [Object, String], default: "div" } },
		setup(e, { attrs: t, slots: r }) {
			let n = Wr("TabList");
			return () => {
				let s = { selectedIndex: n.selectedIndex.value },
					i = { role: "tablist", "aria-orientation": n.orientation.value };
				return br({
					ourProps: i,
					theirProps: e,
					slot: s,
					attrs: t,
					slots: r,
					name: "TabList",
				});
			};
		},
	}),
	ps = yt({
		name: "Tab",
		props: {
			as: { type: [Object, String], default: "button" },
			disabled: { type: [Boolean], default: !1 },
			id: { type: String, default: () => `headlessui-tabs-tab-${eu()}` },
		},
		setup(e, { attrs: t, slots: r, expose: n }) {
			let s = Wr("Tab"),
				i = te(null);
			n({ el: i, $el: i }),
				ht(() => s.registerTab(i)),
				Vr(() => s.unregisterTab(i));
			let l = Ne(Ei),
				o = de(() => {
					if (l.value) {
						let m = l.value.tabs.indexOf(e.id);
						return m === -1 ? l.value.tabs.push(e.id) - 1 : m;
					}
					return -1;
				}),
				a = de(() => {
					let m = s.tabs.value.indexOf(i);
					return m === -1 ? o.value : m;
				}),
				u = de(() => a.value === s.selectedIndex.value);
			function f(m) {
				var v;
				let O = m();
				if (O === Er.Success && s.activation.value === "auto") {
					let P = (v = qg(i)) == null ? void 0 : v.activeElement,
						y = s.tabs.value.findIndex((_) => he(_) === P);
					y !== -1 && s.setSelectedIndex(y);
				}
				return O;
			}
			function c(m) {
				let v = s.tabs.value.map((O) => he(O)).filter(Boolean);
				if (m.key === ze.Space || m.key === ze.Enter) {
					m.preventDefault(), m.stopPropagation(), s.setSelectedIndex(a.value);
					return;
				}
				switch (m.key) {
					case ze.Home:
					case ze.PageUp:
						return (
							m.preventDefault(), m.stopPropagation(), f(() => Zt(v, Ue.First))
						);
					case ze.End:
					case ze.PageDown:
						return (
							m.preventDefault(), m.stopPropagation(), f(() => Zt(v, Ue.Last))
						);
				}
				if (
					f(() =>
						ar(s.orientation.value, {
							vertical() {
								return m.key === ze.ArrowUp
									? Zt(v, Ue.Previous | Ue.WrapAround)
									: m.key === ze.ArrowDown
									  ? Zt(v, Ue.Next | Ue.WrapAround)
									  : Er.Error;
							},
							horizontal() {
								return m.key === ze.ArrowLeft
									? Zt(v, Ue.Previous | Ue.WrapAround)
									: m.key === ze.ArrowRight
									  ? Zt(v, Ue.Next | Ue.WrapAround)
									  : Er.Error;
							},
						}),
					) === Er.Success
				)
					return m.preventDefault();
			}
			let w = te(!1);
			function b() {
				var m;
				w.value ||
					((w.value = !0),
					!e.disabled &&
						((m = he(i)) == null || m.focus({ preventScroll: !0 }),
						s.setSelectedIndex(a.value),
						nb(() => {
							w.value = !1;
						})));
			}
			function x(m) {
				m.preventDefault();
			}
			let p = eb(
				de(() => ({ as: e.as, type: t.type })),
				i,
			);
			return () => {
				var m;
				let v = { selected: u.value },
					{ id: O, ...P } = e,
					y = {
						ref: i,
						onKeydown: c,
						onMousedown: x,
						onClick: b,
						id: O,
						role: "tab",
						type: p.value,
						"aria-controls":
							(m = he(s.panels.value[a.value])) == null ? void 0 : m.id,
						"aria-selected": u.value,
						tabIndex: u.value ? 0 : -1,
						disabled: e.disabled ? !0 : void 0,
					};
				return br({
					ourProps: y,
					theirProps: P,
					slot: v,
					attrs: t,
					slots: r,
					name: "Tab",
				});
			};
		},
	}),
	ub = yt({
		name: "TabPanels",
		props: { as: { type: [Object, String], default: "div" } },
		setup(e, { slots: t, attrs: r }) {
			let n = Wr("TabPanels");
			return () => {
				let s = { selectedIndex: n.selectedIndex.value };
				return br({
					theirProps: e,
					ourProps: {},
					slot: s,
					attrs: r,
					slots: t,
					name: "TabPanels",
				});
			};
		},
	}),
	ds = yt({
		name: "TabPanel",
		props: {
			as: { type: [Object, String], default: "div" },
			static: { type: Boolean, default: !1 },
			unmount: { type: Boolean, default: !0 },
			id: { type: String, default: () => `headlessui-tabs-panel-${eu()}` },
			tabIndex: { type: Number, default: 0 },
		},
		setup(e, { attrs: t, slots: r, expose: n }) {
			let s = Wr("TabPanel"),
				i = te(null);
			n({ el: i, $el: i }),
				ht(() => s.registerPanel(i)),
				Vr(() => s.unregisterPanel(i));
			let l = Ne(Ei),
				o = de(() => {
					if (l.value) {
						let f = l.value.panels.indexOf(e.id);
						return f === -1 ? l.value.panels.push(e.id) - 1 : f;
					}
					return -1;
				}),
				a = de(() => {
					let f = s.panels.value.indexOf(i);
					return f === -1 ? o.value : f;
				}),
				u = de(() => a.value === s.selectedIndex.value);
			return () => {
				var f;
				let c = { selected: u.value },
					{ id: w, tabIndex: b, ...x } = e,
					p = {
						ref: i,
						id: w,
						role: "tabpanel",
						"aria-labelledby":
							(f = he(s.tabs.value[a.value])) == null ? void 0 : f.id,
						tabIndex: u.value ? b : -1,
					};
				return !u.value && e.unmount && !e.static
					? Ct(iu, { as: "span", "aria-hidden": !0, ...p })
					: br({
							ourProps: p,
							theirProps: x,
							slot: c,
							attrs: t,
							slots: r,
							features: Us.Static | Us.RenderStrategy,
							visible: u.value,
							name: "TabPanel",
					  });
			};
		},
	});
const cb = ["width", "height"],
	fb = oe(
		"path",
		{
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "5",
			"stroke-dasharray": "182.17813903808593 74.41078918457032",
			d: "M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z",
			"stroke-linecap": "round",
			style: { transform: "scale(0.8)", "transform-origin": "50px 50px" },
		},
		[
			oe("animate", {
				attributeName: "stroke-dashoffset",
				repeatCount: "indefinite",
				dur: "1.6949152542372878s",
				keyTimes: "0;1",
				values: "0;256.58892822265625",
			}),
		],
		-1,
	),
	pb = [fb],
	db = {
		__name: "Loader",
		props: {
			width: { type: String, default: "200px" },
			height: { type: String, default: "200px" },
		},
		setup(e) {
			return (t, r) => (
				it(),
				Nt(
					"svg",
					{
						xmlns: "http://www.w3.org/2000/svg",
						"xmlns:xlink": "http://www.w3.org/1999/xlink",
						style: {
							margin: "auto",
							background: "none repeat scroll 0% 0%",
							display: "block",
						},
						width: e.width,
						height: e.height,
						viewBox: "0 0 100 100",
						preserveAspectRatio: "xMidYMid",
					},
					pb,
					8,
					cb,
				)
			);
		},
	},
	Yl = {
		__name: "Alert",
		setup(e) {
			const t = zr();
			return (
				Ve(
					() => t.message.error,
					(r) => {
						r !== "" &&
							setTimeout(() => {
								t.message.error = "";
							}, 4e3);
					},
				),
				Ve(
					() => t.message.success,
					(r) => {
						r !== "" &&
							setTimeout(() => {
								t.message.success = "";
							}, 4e3);
					},
				),
				(r, n) => (
					it(),
					Nt(
						Te,
						null,
						[
							gn(
								oe(
									"div",
									{
										class:
											"px-4 py-3 text-teal-900 bg-teal-100 border-t-4 border-teal-500 rounded-b shadow-md",
										role: "alert",
									},
									Le(ie(t).message.success),
									513,
								),
								[[_n, ie(t).message.success !== ""]],
							),
							gn(
								oe(
									"div",
									{
										class:
											"px-4 py-3 text-red-900 bg-red-100 border-t-4 border-red-500 rounded-b shadow-md",
										role: "alert",
									},
									Le(ie(t).message.error),
									513,
								),
								[[_n, ie(t).message.error !== ""]],
							),
						],
						64,
					)
				)
			);
		},
	},
	ou = (e, t) => {
		const r = e.__vccOpts || e;
		for (const [n, s] of t) r[n] = s;
		return r;
	},
	hb = {},
	mb = {
		xmlns: "http://www.w3.org/2000/svg",
		width: "32",
		height: "32",
		viewBox: "0 0 128 128",
	},
	gb = Xc(
		'<defs><path id="notoV1Cookie0" d="M108.94 112.23c-8.28 5.98-14.04 10.27-24.06 12.88c-9.94 2.59-21.19 1.12-31.24.08c-19.65-2.03-34.71-10.77-45.61-27.35c-4.18-6.33-6.33-13.55-6.88-21.08c-.25-3.36-.22-6.75-.12-10.12c.1-3.35-.04-6.93.5-10.25c1.04-6.34 2.55-12.67 4.91-18.65c2.45-6.25 6.27-10.76 10.18-16.09C28.18 5.87 50.86 1.19 69.35 1.46c6.51.09 14.07.67 20.3 2.62c4.91 1.54 9.83 3.94 14.05 6.89c4.37 3.04 8.11 7.34 10.78 11.94c2.54 4.38 4.77 9.26 6.37 14.07c.38 1.14.73 2.28 1.07 3.43c2.3 7.99 4.76 17.22 5.06 25.55c.64 16.97-3.61 35.86-18.04 46.27z"></path></defs><use fill="#b89278" href="#notoV1Cookie0"></use><clipPath id="notoV1Cookie1"><use href="#notoV1Cookie0"></use></clipPath><g fill="#855c52" clip-path="url(#notoV1Cookie1)"><path d="M85.64 3.53c-.28.56-.48 1.27-.59 2.15c-.28 2.33-.41 5.08-.04 7.36c.24 1.5.62 4.15 2.22 4.81c1.48.6 2.91-.2 4.24-.74c1.44-.59 2.96-1.28 4.49-1.68c2.41-.62 4.68-2.24 6.94-3.28c1.91-.87 1.1-3.32-.28-4.42c-.96-.77-2.11-1.39-3.11-2.17c-1.07-.85-2.44-1.57-3.68-2.13C94 2.6 92.15 2.26 90.2 1.85c-1.8-.38-3.66-.11-4.56 1.68zm24.4 35.02c-.5-.33-1.12-.54-1.85-.58c-1.12-.05-2.48.17-3.58.31c-1.52.19-3.57.63-4.89 1.34c-1.04.55-1.32.93-1.21 1.99c.18 1.97.1 3.8.59 5.75c.6 2.43.78 6.71 3.85 7.08c1.94.23 4.35.12 6.24-.25c1.26-.24 3.34-.47 4.4-1.19c.78-.53.87-1.46.87-2.37c-.01-1.88-.86-3.67-1.32-5.46c-.42-1.57-1.04-3.04-1.59-4.55c-.31-.87-.8-1.59-1.51-2.07zM53.49 31.1c-1.73-.53-3.85.07-5.61.52c-2.85.73-6.23.94-8.86 2.26c-1.51.76-1.4 3.83-1.43 5.31c-.04 1.48-.14 3.07-.01 4.54c.1 1.06.12 2.46.48 3.46c.7 1.93 4.08 1.18 5.8 1.19c3.27.02 6.34-.79 9.45-1.7c.82-.23 2.12-.42 2.74-1.13c.48-.56.51-1.8.6-2.49c.22-1.86.24-3.57-.11-5.38c-.32-1.67-.03-3.59-1.04-5.08c-.55-.8-1.24-1.26-2.01-1.5zM31.48 75.02c-.12-.03-.23-.05-.37-.07c-1.03-.13-2.06-.31-3.18-.42c-1.17-.12-2.23-.24-3.42-.26c-1.71-.02-3.32-.42-4.89.67c-.6.4-.87.98-1.14 1.57c-1.19 2.53-3.48 6.22-1.48 8.92c2.09 2.83 13.79 3.46 15.21-.02c.82-1.98 1.4-4.3 1.46-6.45c.02-1.3-.75-3.6-2.19-3.94zm45.84 11.36c.92 2.08 2.03 3.93 3.58 5.58c.59.62 1.3 1.37 1.93 1.93c.87.76 2.04.87 3.15.97c2.21.22 5.05.31 7.27-.01c1.81-.26 3.78-2.22 4.53-3.88c.91-2 2.09-3.5 1.76-5.81c-.21-1.42-1.4-2.35-2.14-3.5c-.87-1.38-1.62-2.51-2.95-3.53c-2.02-1.53-4.53-2.89-7.13-2.37c-2.72.54-4.88 2.71-6.82 4.53c-1.83 1.71-4.44 3.26-3.18 6.09zm-24.19 20.79c-2.48.14-4.94 1.82-6.84 3.42c-1.66 1.39-3.05 2.2-2.12 4.6c1.46 3.74 4.37 6.7 7.62 8.75c1.79 1.13 3.16.56 4.96-.52c2.31-1.38 9.7-5.31 6.28-9.03c-.94-1.03-1.8-1.99-2.72-3.02c-1.09-1.22-2.29-2.16-3.64-3.14c-1.13-.84-2.34-1.14-3.54-1.06zm39.1 6.11c-.2-.48-.58-.93-1.17-1.33c-2.43-1.61-6.89-.44-8.31 2.12c-2.04 3.68 4.86 4.8 7.1 3.58c1.4-.78 3.07-2.66 2.38-4.37zm7.34-9.11c2.19 1.99 8.39 2.29 7.91-1.94c-.24-2.11-5.09-2.48-6.61-2.07c-1.49.41-2.65 2.79-1.3 4.01zm17.04-14.57c.89-.37 1.58-1.02 1.8-2.01c.28-1.3-.49-2.28-1.76-2.6c-1.56-.39-4.52-.55-5.66.82c-1.02 1.23-.55 2.5.65 3.37c1.19.85 3.39 1.08 4.97.42zm-52.47 11.05c1.19.02 2.31-.31 2.87-1.1c.89-1.24 1.05-4.14-.68-4.81c-2.43-.94-7.95.11-6.46 3.77c.51 1.28 2.47 2.1 4.27 2.14zm31.23-33.58c1.16-.03 3.04-.26 3.47-1.53c.28-.8.24-2.09-.29-2.79c-1.47-1.9-8.07-1.2-7.33 1.94c.39 1.73 2.28 2.43 4.15 2.38zm16.13 5.23c2.71.77 6.89-2.14 5.71-4.87c-1.46-3.42-9.12-1.05-7.58 3.1c.39.98 1.05 1.54 1.87 1.77zM80.31 45.46c3.49-.42 4.35-4.12 1.59-5.35c-3.36-1.49-7.77 2.76-4.72 4.82c.79.54 2.08.65 3.13.53z"></path></g>',
		4,
	),
	bb = [gb];
function yb(e, t) {
	return it(), Nt("svg", mb, bb);
}
const vb = ou(hb, [["render", yb]]),
	_b = { class: "flex flex-wrap gap-3" },
	$b = oe(
		"span",
		{ class: "block mt-4 mb-6 border border-solid border-primary" },
		null,
		-1,
	),
	wb = { class: "flex flex-wrap gap-3" },
	xb = {
		__name: "Layout",
		setup(e) {
			const t = zr(),
				r = (n) => {
					t.saveValues("save_gcc_layout", n);
				};
			return (n, s) => {
				const i = Vn("FormKit");
				return (
					it(),
					ai(
						i,
						{
							type: "form",
							"submit-label": "settings",
							onSubmit: r,
							actions: !1,
							modelValue: ie(t).layout,
							"onUpdate:modelValue": s[0] || (s[0] = (l) => (ie(t).layout = l)),
						},
						{
							default: Re(() => [
								oe("fieldset", null, [
									oe("legend", null, Le(n.__("label.consent")), 1),
									U(
										i,
										{
											type: "select",
											label: n.__("label.consent.layout"),
											name: "consentLayout",
											options: ["box", "cloud", "bar"],
										},
										null,
										8,
										["label"],
									),
									oe("div", _b, [
										U(
											i,
											{
												type: "select",
												label: n.__("label.consent.positionX"),
												name: "consentPositionX",
												options: ["bottom", "middle", "top"],
											},
											null,
											8,
											["label"],
										),
										U(
											i,
											{
												type: "select",
												label: n.__("label.consent.positionY"),
												name: "consentPositionY",
												options: ["left", "right", "center"],
											},
											null,
											8,
											["label"],
										),
									]),
									U(
										i,
										{
											type: "select",
											label: n.__("label.consent.transition"),
											name: "consentTransition",
											options: ["slide", "zoom"],
										},
										null,
										8,
										["label"],
									),
								]),
								$b,
								oe("fieldset", null, [
									oe("legend", null, Le(n.__("label.settings")), 1),
									U(
										i,
										{
											type: "select",
											label: n.__("label.settings.layout"),
											name: "settingsLayout",
											options: ["box", "cloud", "bar"],
										},
										null,
										8,
										["label"],
									),
									oe("div", wb, [
										U(
											i,
											{
												type: "select",
												label: n.__("label.settings.positionX"),
												name: "settingsPositionX",
												options: ["bottom", "middle", "top"],
											},
											null,
											8,
											["label"],
										),
										U(
											i,
											{
												type: "select",
												label: n.__("label.settings.positionY"),
												name: "settingsPositionY",
												options: ["left", "right", "center"],
											},
											null,
											8,
											["label"],
										),
									]),
									U(
										i,
										{
											type: "select",
											label: n.__("label.settings.transition"),
											name: "settingsTransition",
											options: ["slide", "zoom"],
										},
										null,
										8,
										["label"],
									),
								]),
								U(
									i,
									{
										type: "submit",
										disabled: ie(t).loading,
										class: "button button-primary",
										label: n.__("button.save"),
									},
									null,
									8,
									["disabled", "label"],
								),
							]),
							_: 1,
						},
						8,
						["modelValue"],
					)
				);
			};
		},
	},
	Sb = {
		__name: "Settings",
		setup(e) {
			const t = zr(),
				r = (n) => {
					t.saveValues("save_gcc_settings", n);
				};
			return (n, s) => {
				const i = Vn("FormKit");
				return (
					it(),
					ai(
						i,
						{
							type: "form",
							onSubmit: r,
							actions: !1,
							modelValue: ie(t).settings,
							"onUpdate:modelValue":
								s[0] || (s[0] = (l) => (ie(t).settings = l)),
						},
						{
							default: Re(() => [
								oe("fieldset", null, [
									oe("legend", null, Le(n.__("label.globalSettings")), 1),
									U(
										i,
										{
											value: "182",
											type: "number",
											label: n.__("label.cookieExpiration"),
											help: n.__(
												"Number of days before the cookie expires (182 days = 6 months)",
											),
											name: "cookieExpiration",
										},
										null,
										8,
										["label", "help"],
									),
									U(
										i,
										{
											value: "gcc_cookie_consent",
											type: "text",
											label: n.__("label.cookieName"),
											help: n.__("Name of the cookie set by the plugin"),
											name: "cookieName",
										},
										null,
										8,
										["label", "help"],
									),
									U(
										i,
										{
											value: "1000",
											type: "number",
											label: n.__("banner.delayOpening"),
											help: n.__(
												"Number of milliseconds before the banner is displayed (1000ms = 1s)",
											),
											name: "delay",
										},
										null,
										8,
										["label", "help"],
									),
								]),
								oe("fieldset", null, [
									oe("legend", null, Le(n.__("label.bannerSettings")), 1),
									U(
										i,
										{
											type: "checkbox",
											name: "bannerSettingsButton",
											value: !0,
											help: n.__("label.bannerSettingsHelp"),
										},
										null,
										8,
										["help"],
									),
								]),
								oe("fieldset", null, [
									oe("legend", null, Le(n.__("label.iframeSettings")), 1),
									U(
										i,
										{
											type: "checkbox",
											name: "iframes",
											options: ie(t).iframeOptions,
											help: n.__("label.iframeSettingsHelp"),
										},
										null,
										8,
										["options", "help"],
									),
								]),
								U(
									i,
									{
										type: "submit",
										disabled: ie(t).loading,
										class: "button button-primary",
										label: n.__("button.save"),
									},
									null,
									8,
									["disabled", "label"],
								),
							]),
							_: 1,
						},
						8,
						["modelValue"],
					)
				);
			};
		},
	},
	Eb = { class: "flex items-center gap-2" },
	Ab = { class: "mb-3" },
	Pb = {
		__name: "Tag",
		props: {
			name: { type: String, required: !0 },
			slug: { type: String, required: !0 },
		},
		setup(e) {
			const t = e,
				r = zr(),
				n = (s) => {
					const i = { ...r.scripts, [t.slug]: s };
					r.saveValues("save_gcc_scripts", i);
				};
			return (s, i) => {
				const l = Vn("FormKit");
				return (
					it(),
					Nt(
						"div",
						{
							class: Tn([
								"p-6 bg-gray-100 border-t-0 border-b-0 border-r-0 border-solid border-l-3 border-primary",
								{
									"border-primary": ie(r).scripts[e.slug].activated,
									"border-zinc-300": !ie(r).scripts[e.slug].activated,
								},
							]),
						},
						[
							U(
								l,
								{
									type: "form",
									"submit-label": "settings",
									onSubmit: n,
									actions: !1,
									modelValue: ie(r).scripts[e.slug],
									"onUpdate:modelValue":
										i[0] || (i[0] = (o) => (ie(r).scripts[e.slug] = o)),
								},
								{
									default: Re(() => [
										U(
											l,
											{ type: "hidden", name: "type", value: "analytics" },
											null,
											8,
											["value"],
										),
										oe("label", Eb, [
											U(l, { type: "checkbox", name: "activated" }),
											oe("legend", Ab, Le(e.name), 1),
										]),
										oe("fieldset", null, [
											U(
												l,
												{
													type: "text",
													name: "id",
													label: s.__("script.id") + " " + e.name,
													help: s.__("script.id_help"),
													disabled: !ie(r).scripts[e.slug].activated,
													required: ie(r).scripts[e.slug].activated,
												},
												null,
												8,
												["label", "help", "disabled", "required"],
											),
											gn(
												U(
													l,
													{
														type: "textarea",
														rows: "10",
														name: "template",
														label: s.__("script.content"),
														help: s.__("script.content_help"),
														disabled: !ie(r).scripts[e.slug].activated,
													},
													null,
													8,
													["label", "help", "disabled"],
												),
												[[_n, !1]],
											),
											U(
												l,
												{
													type: "submit",
													disabled: ie(r).loading,
													class: "button button-primary",
													label: s.__("button.save"),
												},
												null,
												8,
												["disabled", "label"],
											),
										]),
									]),
									_: 1,
								},
								8,
								["modelValue"],
							),
						],
						2,
					)
				);
			};
		},
	},
	Cb = { class: "grid gap-4 md:grid-cols-2" },
	Ob = {
		__name: "ScriptTags",
		props: { scripts: { type: Object, required: !0 } },
		setup(e) {
			return (t, r) => (
				it(),
				Nt("div", Cb, [
					(it(!0),
					Nt(
						Te,
						null,
						Oc(
							e.scripts,
							(n) => (
								it(),
								ai(Pb, { key: n.slug, name: n.name, slug: n.slug }, null, 8, [
									"name",
									"slug",
								])
							),
						),
						128,
					)),
				])
			);
		},
	},
	au = (e) => (lc("data-v-4ca3f49f"), (e = e()), oc(), e),
	Ib = { class: "w-full py-10 pr-10 gm-admin_panel sm:px-0" },
	kb = { class: "flex flex-wrap items-center pb-5 text-2xl gap-x-2" },
	Fb = au(() => oe("div", { class: "py-2" }, null, -1)),
	Rb = au(() => oe("div", { class: "py-2" }, null, -1)),
	Tb = {
		class: "absolute inset-0 flex items-center justify-center bg-white/5",
	},
	Mb = {
		__name: "main",
		setup(e) {
			const t = zr();
			return (r, n) => (
				it(),
				Nt("div", Ib, [
					oe("h1", kb, [U(vb), Qt(" " + Le(r.__("main.title")), 1)]),
					U(Yl),
					Fb,
					U(ie(ob), null, {
						default: Re(() => [
							U(
								ie(ab),
								{ class: "flex gap-x-1" },
								{
									default: Re(() => [
										U(
											ie(ps),
											{ class: "tabbutton" },
											{
												default: Re(() => [Qt(Le(r.__("tab.layout")), 1)]),
												_: 1,
											},
										),
										U(
											ie(ps),
											{ class: "tabbutton" },
											{
												default: Re(() => [Qt(Le(r.__("tab.settings")), 1)]),
												_: 1,
											},
										),
										U(
											ie(ps),
											{ class: "tabbutton" },
											{
												default: Re(() => [Qt(Le(r.__("tab.scripts")), 1)]),
												_: 1,
											},
										),
									]),
									_: 1,
								},
							),
							U(
								ie(ub),
								{ class: "px-5 bg-white shadow" },
								{
									default: Re(() => [
										U(
											ie(ds),
											{ class: "tabpanel" },
											{ default: Re(() => [U(xb)]), _: 1 },
										),
										U(
											ie(ds),
											{ class: "tabpanel" },
											{ default: Re(() => [U(Sb)]), _: 1 },
										),
										U(
											ie(ds),
											{ class: "tabpanel" },
											{
												default: Re(() => [
													U(Ob, { scripts: ie(t).scriptTags }, null, 8, [
														"scripts",
													]),
												]),
												_: 1,
											},
										),
									]),
									_: 1,
								},
							),
						]),
						_: 1,
					}),
					Rb,
					U(Yl),
					gn(oe("div", Tb, [U(db, { class: "text-primary" })], 512), [
						[_n, ie(t).loading === !0],
					]),
				])
			);
		},
	},
	jb = ou(Mb, [["__scopeId", "data-v-4ca3f49f"]]);
document.addEventListener("DOMContentLoaded", () => {
	if (document.getElementById("gm-admin-app")) {
		const t = Lf(),
			r = Rf(jb, {});
		r.use(dg, $i),
			r.use(t),
			window.goodmotionCookieConsent &&
				pe.setLocaleData({ ...window.goodmotionCookieConsent }, "default"),
			(r.config.globalProperties.__ = Ks),
			(r.config.globalProperties._n = Vg),
			(r.config.globalProperties.getLocaleData = Ng),
			(r.config.globalProperties.defaultI18n = pe),
			r.mount("#gm-admin-app");
	}
});
