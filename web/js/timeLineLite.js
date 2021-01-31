/*!
 * VERSION: 1.18.0
 * DATE: 2015-08-29
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
        var s = function(t) {
            e.call(this, t),
            this._labels = {},
            this.autoRemoveChildren = this.vars.autoRemoveChildren === !0,
            this.smoothChildTiming = this.vars.smoothChildTiming === !0,
            this._sortChildren = !0,
            this._onUpdate = this.vars.onUpdate;
            var i, s, r = this.vars;
            for (s in r)
                i = r[s],
                l(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
            l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
        }
          , r = 1e-10
          , n = i._internals
          , a = s._internals = {}
          , o = n.isSelector
          , l = n.isArray
          , h = n.lazyTweens
          , _ = n.lazyRender
          , u = _gsScope._gsDefine.globals
          , f = function(t) {
            var e, i = {};
            for (e in t)
                i[e] = t[e];
            return i
        }
          , c = function(t, e, i) {
            var s, r, n = t.cycle;
            for (s in n)
                r = n[s],
                t[s] = "function" == typeof r ? r.call(e[i], i) : r[i % r.length];
            delete t.cycle
        }
          , p = a.pauseCallback = function() {}
          , m = function(t) {
            var e, i = [], s = t.length;
            for (e = 0; e !== s; i.push(t[e++]))
                ;
            return i
        }
          , d = s.prototype = new e;
        return s.version = "1.18.0",
        d.constructor = s,
        d.kill()._gc = d._forcingPlayhead = d._hasPause = !1,
        d.to = function(t, e, s, r) {
            var n = s.repeat && u.TweenMax || i;
            return e ? this.add(new n(t,e,s), r) : this.set(t, s, r)
        }
        ,
        d.from = function(t, e, s, r) {
            return this.add((s.repeat && u.TweenMax || i).from(t, e, s), r)
        }
        ,
        d.fromTo = function(t, e, s, r, n) {
            var a = r.repeat && u.TweenMax || i;
            return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n)
        }
        ,
        d.staggerTo = function(t, e, r, n, a, l, h, _) {
            var u, p, d = new s({
                onComplete: l,
                onCompleteParams: h,
                callbackScope: _,
                smoothChildTiming: this.smoothChildTiming
            }), g = r.cycle;
            for ("string" == typeof t && (t = i.selector(t) || t),
            t = t || [],
            o(t) && (t = m(t)),
            n = n || 0,
            0 > n && (t = m(t),
            t.reverse(),
            n *= -1),
            p = 0; t.length > p; p++)
                u = f(r),
                u.startAt && (u.startAt = f(u.startAt),
                u.startAt.cycle && c(u.startAt, t, p)),
                g && c(u, t, p),
                d.to(t[p], e, u, p * n);
            return this.add(d, a)
        }
        ,
        d.staggerFrom = function(t, e, i, s, r, n, a, o) {
            return i.immediateRender = 0 != i.immediateRender,
            i.runBackwards = !0,
            this.staggerTo(t, e, i, s, r, n, a, o)
        }
        ,
        d.staggerFromTo = function(t, e, i, s, r, n, a, o, l) {
            return s.startAt = i,
            s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender,
            this.staggerTo(t, e, s, r, n, a, o, l)
        }
        ,
        d.call = function(t, e, s, r) {
            return this.add(i.delayedCall(0, t, e, s), r)
        }
        ,
        d.set = function(t, e, s) {
            return s = this._parseTimeOrLabel(s, 0, !0),
            null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused),
            this.add(new i(t,0,e), s)
        }
        ,
        s.exportRoot = function(t, e) {
            t = t || {},
            null == t.smoothChildTiming && (t.smoothChildTiming = !0);
            var r, n, a = new s(t), o = a._timeline;
            for (null == e && (e = !0),
            o._remove(a, !0),
            a._startTime = 0,
            a._rawPrevTime = a._time = a._totalTime = o._time,
            r = o._first; r; )
                n = r._next,
                e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay),
                r = n;
            return o.add(a, 0),
            a
        }
        ,
        d.add = function(r, n, a, o) {
            var h, _, u, f, c, p;
            if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)),
            !(r instanceof t)) {
                if (r instanceof Array || r && r.push && l(r)) {
                    for (a = a || "normal",
                    o = o || 0,
                    h = n,
                    _ = r.length,
                    u = 0; _ > u; u++)
                        l(f = r[u]) && (f = new s({
                            tweens: f
                        })),
                        this.add(f, h),
                        "string" != typeof f && "function" != typeof f && ("sequence" === a ? h = f._startTime + f.totalDuration() / f._timeScale : "start" === a && (f._startTime -= f.delay())),
                        h += o;
                    return this._uncache(!0)
                }
                if ("string" == typeof r)
                    return this.addLabel(r, n);
                if ("function" != typeof r)
                    throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                r = i.delayedCall(0, r)
            }
            if (e.prototype.add.call(this, r, n),
            (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (c = this,
                p = c.rawTime() > r._startTime; c._timeline; )
                    p && c._timeline.smoothChildTiming ? c.totalTime(c._totalTime, !0) : c._gc && c._enabled(!0, !1),
                    c = c._timeline;
            return this
        }
        ,
        d.remove = function(e) {
            if (e instanceof t) {
                this._remove(e, !1);
                var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale,
                this
            }
            if (e instanceof Array || e && e.push && l(e)) {
                for (var s = e.length; --s > -1; )
                    this.remove(e[s]);
                return this
            }
            return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
        }
        ,
        d._remove = function(t, i) {
            e.prototype._remove.call(this, t, i);
            var s = this._last;
            return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(),
            this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0,
            this
        }
        ,
        d.append = function(t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
        }
        ,
        d.insert = d.insertMultiple = function(t, e, i, s) {
            return this.add(t, e || 0, i, s)
        }
        ,
        d.appendMultiple = function(t, e, i, s) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
        }
        ,
        d.addLabel = function(t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e),
            this
        }
        ,
        d.addPause = function(t, e, s, r) {
            var n = i.delayedCall(0, p, s, r || this);
            return n.vars.onComplete = n.vars.onReverseComplete = e,
            n.data = "isPause",
            this._hasPause = !0,
            this.add(n, t)
        }
        ,
        d.removeLabel = function(t) {
            return delete this._labels[t],
            this
        }
        ,
        d.getLabelTime = function(t) {
            return null != this._labels[t] ? this._labels[t] : -1
        }
        ,
        d._parseTimeOrLabel = function(e, i, s, r) {
            var n;
            if (r instanceof t && r.timeline === this)
                this.remove(r);
            else if (r && (r instanceof Array || r.push && l(r)))
                for (n = r.length; --n > -1; )
                    r[n]instanceof t && r[n].timeline === this && this.remove(r[n]);
            if ("string" == typeof i)
                return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
            if (i = i || 0,
            "string" != typeof e || !isNaN(e) && null == this._labels[e])
                null == e && (e = this.duration());
            else {
                if (n = e.indexOf("="),
                -1 === n)
                    return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)),
                e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
            }
            return Number(e) + i
        }
        ,
        d.seek = function(t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
        }
        ,
        d.stop = function() {
            return this.paused(!0)
        }
        ,
        d.gotoAndPlay = function(t, e) {
            return this.play(t, e)
        }
        ,
        d.gotoAndStop = function(t, e) {
            return this.pause(t, e)
        }
        ,
        d.render = function(t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s, n, a, o, l, u, f = this._dirty ? this.totalDuration() : this._totalDuration, c = this._time, p = this._startTime, m = this._timeScale, d = this._paused;
            if (t >= f)
                this._totalTime = this._time = f,
                this._reversed || this._hasPausedChild() || (n = !0,
                o = "onComplete",
                l = !!this._timeline.autoRemoveChildren,
                0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0,
                this._rawPrevTime > r && (o = "onReverseComplete"))),
                this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r,
                t = f + 1e-4;
            else if (1e-7 > t)
                if (this._totalTime = this._time = 0,
                (0 !== c || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete",
                n = this._reversed),
                0 > t)
                    this._active = !1,
                    this._timeline.autoRemoveChildren && this._reversed ? (l = n = !0,
                    o = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0),
                    this._rawPrevTime = t;
                else {
                    if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r,
                    0 === t && n)
                        for (s = this._first; s && 0 === s._startTime; )
                            s._duration || (n = !1),
                            s = s._next;
                    t = 0,
                    this._initted || (l = !0)
                }
            else {
                if (this._hasPause && !this._forcingPlayhead && !e) {
                    if (t >= c)
                        for (s = this._first; s && t >= s._startTime && !u; )
                            s._duration || "isPause" !== s.data || s.ratio || 0 === s._startTime && 0 === this._rawPrevTime || (u = s),
                            s = s._next;
                    else
                        for (s = this._last; s && s._startTime >= t && !u; )
                            s._duration || "isPause" === s.data && s._rawPrevTime > 0 && (u = s),
                            s = s._prev;
                    u && (this._time = t = u._startTime,
                    this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = t
            }
            if (this._time !== c && this._first || i || l || u) {
                if (this._initted || (this._initted = !0),
                this._active || !this._paused && this._time !== c && t > 0 && (this._active = !0),
                0 === c && this.vars.onStart && 0 !== this._time && (e || this._callback("onStart")),
                this._time >= c)
                    for (s = this._first; s && (a = s._next,
                    !this._paused || d); )
                        (s._active || s._startTime <= this._time && !s._paused && !s._gc) && (u === s && this.pause(),
                        s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)),
                        s = a;
                else
                    for (s = this._last; s && (a = s._prev,
                    !this._paused || d); ) {
                        if (s._active || c >= s._startTime && !s._paused && !s._gc) {
                            if (u === s) {
                                for (u = s._prev; u && u.endTime() > this._time; )
                                    u.render(u._reversed ? u.totalDuration() - (t - u._startTime) * u._timeScale : (t - u._startTime) * u._timeScale, e, i),
                                    u = u._prev;
                                u = null,
                                this.pause()
                            }
                            s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)
                        }
                        s = a
                    }
                this._onUpdate && (e || (h.length && _(),
                this._callback("onUpdate"))),
                o && (this._gc || (p === this._startTime || m !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (n && (h.length && _(),
                this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !e && this.vars[o] && this._callback(o)))
            }
        }
        ,
        d._hasPausedChild = function() {
            for (var t = this._first; t; ) {
                if (t._paused || t instanceof s && t._hasPausedChild())
                    return !0;
                t = t._next
            }
            return !1
        }
        ,
        d.getChildren = function(t, e, s, r) {
            r = r || -9999999999;
            for (var n = [], a = this._first, o = 0; a; )
                r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a),
                t !== !1 && (n = n.concat(a.getChildren(!0, e, s)),
                o = n.length))),
                a = a._next;
            return n
        }
        ,
        d.getTweensOf = function(t, e) {
            var s, r, n = this._gc, a = [], o = 0;
            for (n && this._enabled(!0, !0),
            s = i.getTweensOf(t),
            r = s.length; --r > -1; )
                (s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]);
            return n && this._enabled(!1, !0),
            a
        }
        ,
        d.recent = function() {
            return this._recent
        }
        ,
        d._contains = function(t) {
            for (var e = t.timeline; e; ) {
                if (e === this)
                    return !0;
                e = e.timeline
            }
            return !1
        }
        ,
        d.shiftChildren = function(t, e, i) {
            i = i || 0;
            for (var s, r = this._first, n = this._labels; r; )
                r._startTime >= i && (r._startTime += t),
                r = r._next;
            if (e)
                for (s in n)
                    n[s] >= i && (n[s] += t);
            return this._uncache(!0)
        }
        ,
        d._kill = function(t, e) {
            if (!t && !e)
                return this._enabled(!1, !1);
            for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1; )
                i[s]._kill(t, e) && (r = !0);
            return r
        }
        ,
        d.clear = function(t) {
            var e = this.getChildren(!1, !0, !0)
              , i = e.length;
            for (this._time = this._totalTime = 0; --i > -1; )
                e[i]._enabled(!1, !1);
            return t !== !1 && (this._labels = {}),
            this._uncache(!0)
        }
        ,
        d.invalidate = function() {
            for (var e = this._first; e; )
                e.invalidate(),
                e = e._next;
            return t.prototype.invalidate.call(this)
        }
        ,
        d._enabled = function(t, i) {
            if (t === this._gc)
                for (var s = this._first; s; )
                    s._enabled(t, !0),
                    s = s._next;
            return e.prototype._enabled.call(this, t, i)
        }
        ,
        d.totalTime = function() {
            this._forcingPlayhead = !0;
            var e = t.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1,
            e
        }
        ,
        d.duration = function(t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t),
            this) : (this._dirty && this.totalDuration(),
            this._duration)
        }
        ,
        d.totalDuration = function(t) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var e, i, s = 0, r = this._last, n = 999999999999; r; )
                        e = r._prev,
                        r._dirty && r.totalDuration(),
                        r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime,
                        0 > r._startTime && !r._paused && (s -= r._startTime,
                        this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale),
                        this.shiftChildren(-r._startTime, !1, -9999999999),
                        n = 0),
                        i = r._startTime + r._totalDuration / r._timeScale,
                        i > s && (s = i),
                        r = e;
                    this._duration = this._totalDuration = s,
                    this._dirty = !1
                }
                return this._totalDuration
            }
            return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t),
            this
        }
        ,
        d.paused = function(e) {
            if (!e)
                for (var i = this._first, s = this._time; i; )
                    i._startTime === s && "isPause" === i.data && (i._rawPrevTime = 0),
                    i = i._next;
            return t.prototype.paused.apply(this, arguments)
        }
        ,
        d.usesFrames = function() {
            for (var e = this._timeline; e._timeline; )
                e = e._timeline;
            return e === t._rootFramesTimeline
        }
        ,
        d.rawTime = function() {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }
        ,
        s
    }, !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function(t) {
    "use strict";
    var e = function() {
        return (_gsScope.GreenSockGlobals || _gsScope)[t]
    };
    "function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("./TweenLite.js"),
    module.exports = e())
}("TimelineLite");
