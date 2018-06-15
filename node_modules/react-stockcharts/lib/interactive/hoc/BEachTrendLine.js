"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../../utils");

var _StraightLine = require("../components/StraightLine");

var _StraightLine2 = _interopRequireDefault(_StraightLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EachTrendLine = function (_Component) {
	_inherits(EachTrendLine, _Component);

	function EachTrendLine(props) {
		_classCallCheck(this, EachTrendLine);

		var _this = _possibleConstructorReturn(this, (EachTrendLine.__proto__ || Object.getPrototypeOf(EachTrendLine)).call(this, props));
		_this.nodes = {};

		return _this;
	}

	_createClass(EachTrendLine, [{
		key: "render",
		value: function render() {
			var _props8 = this.props,
			    x1Value = _props8.x1Value,
			    y1Value = _props8.y1Value,
			    x2Value = _props8.x2Value,
			    y2Value = _props8.y2Value,
			    type = _props8.type,
			    stroke = _props8.stroke,
			    strokeWidth = _props8.strokeWidth,
			    strokeOpacity = _props8.strokeOpacity,
			    strokeDasharray = _props8.strokeDasharray,
			    edgeStrokeWidth = _props8.edgeStrokeWidth,
			    edgeFill = _props8.edgeFill,
			    edgeStroke = _props8.edgeStroke

			return _react2.default.createElement(
				"g",
				null,
				_react2.default.createElement(_StraightLine2.default, {
					selected: false,
					x1Value: x1Value,
					y1Value: y1Value,
					x2Value: x2Value,
					y2Value: y2Value,
					type: type,
					stroke: stroke,
					strokeWidth: strokeWidth,
					strokeOpacity: strokeOpacity,
					strokeDasharray: strokeDasharray,
				}),
			);
		}
	}]);

	return EachTrendLine;
}(_react.Component);

EachTrendLine.propTypes = {
	x1Value: _propTypes2.default.any.isRequired,
	x2Value: _propTypes2.default.any.isRequired,
	y1Value: _propTypes2.default.any.isRequired,
	y2Value: _propTypes2.default.any.isRequired,

	index: _propTypes2.default.number,

	type: _propTypes2.default.oneOf(["XLINE", // extends from -Infinity to +Infinity
	"RAY", // extends to +/-Infinity in one direction
	"LINE"] // extends between the set bounds
	).isRequired,

	strokeOpacity: _propTypes2.default.number.isRequired,
	defaultClassName: _propTypes2.default.string,

	stroke: _propTypes2.default.string.isRequired,
	strokeWidth: _propTypes2.default.number.isRequired,
	strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),

	edgeStrokeWidth: _propTypes2.default.number.isRequired,
	edgeStroke: _propTypes2.default.string.isRequired,
	edgeFill: _propTypes2.default.string.isRequired,
};

EachTrendLine.defaultProps = {
	edgeStroke: "#000000",
	edgeFill: "#FFFFFF",
	edgeStrokeWidth: 2,
	strokeWidth: 1,
	strokeOpacity: 1,
	strokeDasharray: "Solid"
};

exports.default = EachTrendLine;