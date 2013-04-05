function ShapeOverlay(holder, width, height, numPoints) {
    this.xs = [];
    this.ys = [];
    this.currIndex = -1;
    this.shapeChangeListeners = [];

    var overlay = this;
    Raphael(holder, '100%', '100%', function() {
        var r = overlay.paper = this;
        var rect = r.rect(0, 0, '100%', '100%').attr({ fill: overlay.GREY, stroke: 'none', opacity: 0.2 });
        overlay.points = r.set();
        overlay.pointShields = r.set();
        overlay.halfPoints = r.set();

        overlay.path = r.path().attr('stroke-width', overlay.PATH_STROKE);
        overlay.pathShield = r.path().attr({ 'stroke-width': overlay.ACTIVE_RADIUS, 'stroke-linejoin': 'round', opacity: 0});
        overlay.pathShield.mouseover(overlay.showFunction(overlay.halfPoints, overlay.pathShield, overlay.halfPoints));

        for (var i = 0; i < numPoints; i++) {
            var point = overlay.radialToCartesian(Math.min(width, height) / 3, Math.PI - Math.PI * 2 / numPoints * i);
            overlay.addPoint(r, point.x + width / 2, point.y + height / 2, i);
        }

        overlay.halfPoints.mouseover(overlay.showFunction(overlay.halfPoints, overlay.halfPoints, overlay.pathShield));
    });
}
(function(constants) {
    for (var constant in constants)
        Object.defineProperty(ShapeOverlay.prototype, constant, { value: constants[constant] });
} ({    GREY: '#b3b3b3',
        BLUE: '#008bce',
        ORANGE: '#ff931e',
        MIN_RADIUS: 5,
        MAX_RADIUS: 7,
        MIN_OPACITY: 0.5,
        MAX_OPACITY: 1,
        ANIM_TIME: 200,
        ACTIVE_RADIUS: 7,
        PATH_STROKE: 1  }));

ShapeOverlay.prototype.radialToCartesian = function(r, theta) { return { x: r * Math.cos(theta), y : r * Math.sin(theta) }; }
ShapeOverlay.prototype.showFunction = function(show, focus, unfocus) {
    var overlay = this;
    return function() {
        show.animate({ opacity: overlay.MIN_OPACITY }, overlay.ANIM_TIME);
        unfocus.unmouseout();
        focus.mouseout(overlay.hideFunction(show));
    };
}
ShapeOverlay.prototype.hideFunction = function(hide) {
    var overlay = this;
    return function() {
        hide.animate({ opacity: 0 }, overlay.ANIM_TIME);
    };
}
ShapeOverlay.prototype.removePoint = function(paper, x, y, i) {
    if (this.xs.length < 3)
        return;
    this.xs.splice(i, 1);
    this.ys.splice(i, 1);
    this.pointShields.pop().remove();
    this.points.pop().remove();
    this.halfPoints.pop().remove();
    for (var j = 0; j < this.xs.length; j++)
        this.updatePoint(j, this.xs[j], this.ys[j]);
}
ShapeOverlay.prototype.addPoint = function(paper, x, y, i) {
    var f;
    (f = function(i, x, y, overlay) {
        var halfPoint = paper.circle(x, y, overlay.MIN_RADIUS).attr({fill: overlay.BLUE, opacity: 0});
        overlay.halfPoints.push(halfPoint);
        halfPoint.dblclick(function() {
            overlay.currIndex = i + 1;
            overlay.addPoint(paper, halfPoint.attr('cx'), halfPoint.attr('cy'), i + 1);
        });
        var point = paper.circle(x, y, overlay.MIN_RADIUS).attr('fill', i == 0 ? overlay.ORANGE : overlay.BLUE);
        overlay.points.push(point);
        var pointShield = paper.circle(x, y, overlay.ACTIVE_RADIUS).attr({ fill:'#fff', opacity: 0 });
        overlay.pointShields.push(pointShield);

        pointShield.mouseover(function() {
            point.animate({ r: overlay.MAX_RADIUS }, overlay.ANIM_TIME);
        }).mouseout(function() {
            point.animate({ r: overlay.MIN_RADIUS }, overlay.ANIM_TIME);
        }).drag(function(dx, dy) {
            overlay.updatePoint(i, x + dx, y + dy);
        }, function() {
            x = overlay.xs[i];
            y = overlay.ys[i];
            if (overlay.currIndex != i) {
                overlay.currIndex = i;
                point.toFront();
                pointShield.toFront();
            }
        }, function() {
            x = overlay.xs[i];
            y = overlay.ys[i];
        }).dblclick(function() {
            overlay.removePoint(paper, x, y, i);
        });
    })(this.points.length, x, y, this);

    if (i >= 0) {
        this.halfPoints.attr('opacity', this.MIN_OPACITY);
        this.halfPoints.unmouseover().mouseover(this.showFunction(this.halfPoints, this.halfPoints, this.pathShield));
        this.xs.splice(i, 0, x);
        this.ys.splice(i, 0, y);
        for (var j = 0; j < this.xs.length; j++)
            this.updatePoint(j, this.xs[j], this.ys[j]);
    } else {
        this.xs.push(x);
        this.ys.push(y);
    }
}
ShapeOverlay.prototype.drawPaths = function() {
    var commands = ['M', this.xs[0], this.ys[0], 'L'];
    for (var i = 1; i < this.xs.length; i++) {
        commands.push(this.xs[i], this.ys[i]);
    }
    commands.push('z');
    this.path.attr('path', commands);
    this.pathShield.attr('path', commands);
}
ShapeOverlay.prototype.updateHalfPoint = function(i) {
    var i2 = (i + 1) % this.halfPoints.length;
    var x = (this.xs[i] + this.xs[i2]) / 2;
    var y = (this.ys[i] + this.ys[i2]) / 2;
    this.halfPoints.items[i].attr({ cx: x, cy: y });
}
ShapeOverlay.prototype.updatePoint = function(i, cx, cy) {
    this.xs[i] = cx;
    this.ys[i] = cy;
    this.points.items[i].attr({ cx: cx, cy: cy });
    if (i === this.currIndex)
        this.points.items[i].animate({ r: this.MAX_RADIUS }, this.ANIM_TIME);
    this.pointShields.items[i].attr({ cx: cx, cy: cy });
    this.updateHalfPoint(i);
    this.updateHalfPoint((i + this.halfPoints.length - 1) % this.halfPoints.length);
    this.drawPaths();
    this.notifyListeners();
}
ShapeOverlay.prototype.notifyListeners = function() {
    for (var listener in this.shapeChangeListeners)
        this.shapeChangeListeners[listener]();
}
ShapeOverlay.prototype.shapechange = function(callback) {
    this.shapeChangeListeners.push(callback);
}
ShapeOverlay.prototype.unshapechange = function() {
    this.shapeChangeListeners.clear();
}