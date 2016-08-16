class FlatTreemap {
  
    static function txtPrint_render(text) {
      
    var str = "<style>" +
		"svg {" +
		"	font: 12px sans-serif;" +
		"}" +
		".axis path, .axis line {" +
		"	fill: none;" +
		"	stroke: #000;" +
		"	shape-rendering: crispEdges;" +
		"}" +
		"div.tooltip {	" +
		"	position: absolute;" +
		"	text-align: center;" +
		"	font: 12px sans-serif;" +
		"	color: #000000;" +
		"	border: 0px;" +
		"	pointer-events: none;" +
		"	padding: 8px;" +
		"	max-width: 300px;" +
		"}" +
		".arrow-up {" +
		"	position: absolute;" +
		"	pointer-events: none;" +
		"	width: 0;" +
		"	height: 0;" +
		"	border-left: 7px solid transparent;" +
		"	border-right: 7px solid transparent;" +
		"	border-bottom: 7px solid #CCCCCC;" +
		"}" +
		".treemap {" +
		"	overflow: hidden;" +
		"	background: white;" +
		"}" +
		"text {" +
		"	pointer-events: none;" +
		"}" +
		".grandparent text {" +
		"	font-weight: bold;" +
		"	fill: white;" +
		"}" +
		"rect {" +
		"	fill: none;" +
		"	stroke: #fff;" +
		"}" +
		"rect.parent," +
		"	.grandparent rect {" +
		"	stroke-width: 2px;" +
		"}" +
		".grandparent rect {" +
		"	fill: #373B58;" +
		"}" +
		"/*" +
		".grandparent:hover rect {" +
		"	fill: #003b64 ;" +
		"}" +
		".children rect.parent," +
		".grandparent rect {" +
		"	cursor: pointer;" +
		"}*/" +
		"rect.parent {" +
		"	fill-opacity: 0.65;" +
		"}" +
		"rect.child {" +
		"	fill-opacity: 0;" +
		"}" +
		"/*" +
		"html[data-useragent='notie'] .children:hover rect.parent {" +
		"	fill-opacity: 0 !important;" +
		"}" +
		"html[data-useragent='notie'] .children:hover rect.child {" +
		"	fill-opacity: 0.9 !important;" +
		"}*/" +
		"</style> " +
		"<script src=\"//d3js.org/d3.v3.min.js\" charset=\"utf-8\"></script>" +
		"<script>" +
		"var doc = document.documentElement;" +
		"if (!detectIE() && !detectFirefox()) {" +
		"	doc.setAttribute('data-useragent', 'notie');" +
		"}" +
		"CreateTreemaps();" +
		"function detectIE() {" +
		"	var ua = window.navigator.userAgent;" +
		"	var msie = ua.indexOf('MSIE ');" +
		"	if (msie > 0) {    " +
		"		return true;" +
		"	}" +
		"	var trident = ua.indexOf('Trident/');" +
		"	if (trident > 0) {" +
		"		return true;" +
		"	}" +
		"	var edge = ua.indexOf('Edge/');" +
		"	if (edge > 0) {" +
		"		return true;" +
		"	}" +
		"	/* other browser*/" +
		"	return false;" +
		"}" +
		"function detectFirefox() {" +
		"	return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;" +
		"}" +
		"function CreateTreemaps() {" +
		"	var obj = ScanTables();" +
		"	" +
		"	if (!obj)" +
		"		return;" +
		"	" +
		"	for (var i = 0; i < obj.tables.length; i++) {" +
		"		CreateTreemap(obj.tables[i], obj.treemapIds[i], obj.configs[i]);" +
		"	}  " +
		"}" +
		"function ScanTables() {" +
		"	if (!config) " +
		"		return;" +
		"		" +
		"	var treemapObject = {" +
		"		configs: []," +
		"		tables: []," +
		"		treemapIds: []" +
		"	};" +
		"	" +
		"	var configs = treemapObject.configs;" +
		"	var tables = treemapObject.tables;" +
		"	var treemapIds = treemapObject.treemapIds;" +
		"	" +
		"	var items = [];" +
		"	for (var i = 0; i < config.length; i++) {" +
		"		var id = config[i].TableContainerId;" +
		"		id = (id.indexOf('#') == 0) ? id : '#' + id;" +
		"		var item = document.querySelector(id + ' table');" +
		"		if (!item) continue;" +
		"		" +
		"		var treemapId = config[i].TreemapContainerId;" +
		"		if (!treemapId) continue;" +
		"		treemapId = (treemapId.indexOf('#') == 0) ? treemapId : '#' + treemapId;" +
		"			" +
		"		treemapIds[treemapIds.length] = treemapId;			" +
		"		configs[configs.length] = config[i];" +
		"		" +
		"		items[items.length] = item;	" +
		"	}" +
		"	if (items.length <= 0) { " +
		"		return;" +
		"	}" +
		"	" +
		"	var rows;" +
		"	" +
		"	for (var i = 0; i < items.length; i++) {" +
		"		tables[i] = [];" +
		"		rows = items[i].querySelectorAll('tbody tr');" +
		"		" +
		"		for (var j = 0; j < rows.length; j++) {" +
		"		" +
		"			var valueColumnNumber = (" +
		"					configs[i]" +
		"					&& configs[i].ValueColumnNumber " +
		"					&& !isNaN(parseInt(configs[i].ValueColumnNumber)) " +
		"					&& (+configs[i].ValueColumnNumber) > 0 " +
		"					&& (+configs[i].ValueColumnNumber) < rows[j].children.length" +
		"				) " +
		"				? configs[i].ValueColumnNumber " +
		"				: 1;" +
		"			tables[i][j] = {" +
		"				name: rows[j].children[0].innerText, " +
		"				value: rows[j].children[valueColumnNumber].innerText" +
		"			};" +
		"			" +
		"			if (configs[i] && configs[i].TooltipInfo) {" +
		"				var data = configs[i].TooltipInfo;" +
		"				var info = tables[i][j].info = {};" +
		"				" +
		"				for (var k = 0; k < data.length; k++) {" +
		"					var datum = data[k];" +
		"					var colNumber = datum.ColumnNumber " +
		"						&& !isNaN(parseInt(datum.ColumnNumber)) " +
		"						&& (+datum.ColumnNumber) > 0 " +
		"						&& (+datum.ColumnNumber) < rows[j].children.length 						" +
		"						? datum.ColumnNumber " +
		"						: undefined;" +
		"						" +
		"					if (!colNumber) " +
		"						continue;" +
		"					" +
		"					var name = datum.Name ? datum.Name : items[i].querySelectorAll('thead tr')[0].children[colNumber].innerText;" +
		"					var value = rows[j].children[colNumber].innerText;" +
		"					" +
		"					info[name] = value;" +
		"				}" +
		"			}" +
		"		}" +
		"	}" +
		"	" +
		"	return treemapObject;	" +
		"}" +
		"function CreateTreemap(cells, id, config) {" +
		"	if (!id)" +
		"		return;" +
		"	id = (id.indexOf('#') == 0) ? id : '#' + id;" +
		"	" +
		"	var treemapTitle = (config && config.TreemapTitle) ? config.TreemapTitle : 'Answers';" +
		"	var root = { name: treemapTitle, children: cells };" +
		"	var hue = (config && config.Hue && !isNaN(parseInt(config.Hue)) && (+config.Hue) >= 0 && (+config.Hue) <= 360) ? config.Hue : 60;" +
		"	var showValue = (config && config.ShowValue) ? true : false;" +
		"	" +
		"	var index = 0;" +
		"	" +
		"	var margin = {top: 20, right: 0, bottom: 0, left: 0}," +
		"    formatNumber = d3.format(\",d\")," +
		"    transitioning," +
		"	func = d3.scale.category20c()," +
		"	color = function() {		" +
		"		return generateShadesNotRandom(hue, index++);" +
		"	};" +
		"	" +
		"	var width = (config.Width && !isNaN(parseInt(config.Width)) && (+config.Width) >= 0 && (+config.Width) <= 1000) ? config.Width : 500;" +
		"	var height = (config.Height && !isNaN(parseInt(config.Height)) && (+config.Height) >= 0 && (+config.Height) <= 1000) ? config.Height : 350;" +
		"    height = height - margin.top - margin.bottom;" +
		"	" +
		"	" +
		"	" +
		"	" +
		"	var x = d3.scale.linear()" +
		"    .domain([0, width])" +
		"    .range([0, width]);" +
		"	var y = d3.scale.linear()" +
		"    .domain([0, height])" +
		"    .range([0, height]);" +
		"	var treemap = d3.layout.treemap()" +
		"    .children(function(d, depth) { return depth ? null : d._children; })" +
		"    .sort(function(a, b) { return a.value - b.value; })" +
		"    .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))" +
		"    .round(false);" +
		"	var svg = d3.select(id).append(\"svg\")" +
		"    .attr(\"width\", width + margin.left + margin.right)" +
		"    .attr(\"height\", height + margin.bottom + margin.top)" +
		"    .style(\"margin-left\", -margin.left + \"px\")" +
		"    .style(\"margin.right\", -margin.right + \"px\")" +
		"  .append(\"g\")" +
		"    .attr(\"transform\", \"translate(\" + margin.left + \",\" + margin.top + \")\")" +
		"    .style(\"shape-rendering\", \"crispEdges\");" +
		"	var grandparent = svg.append(\"g\")" +
		"    .attr(\"class\", \"grandparent\");" +
		"	grandparent.append(\"rect\")" +
		"    .attr(\"y\", -margin.top)" +
		"    .attr(\"width\", width)" +
		"    .attr(\"height\", margin.top);" +
		"	grandparent.append(\"text\")" +
		"    .attr(\"x\", 6)" +
		"    .attr(\"y\", 6 - margin.top)" +
		"    .attr(\"dy\", \".75em\");" +
		"	var tooltipColor = generateTooltipBackground(hue);" +
		"	" +
		"	/* Define the div for the tooltip*/" +
		"	var div = d3.select(\"body\").append(\"div\")	" +
		"    .attr(\"class\", \"tooltip\")				" +
		"    .style(\"opacity\", 0)" +
		"	.style(\"background\", tooltipColor);" +
		"	" +
		"	var arrow = d3.select('body').append(\"div\")	" +
		"    .attr(\"class\", \"arrow-up\")				" +
		"    .style(\"opacity\", 0)" +
		"	.style('border-bottom-color', tooltipColor);" +
		"	" +
		"  initialize(root);" +
		"  accumulate(root);" +
		"  layout(root);" +
		"  display(root);" +
		"	" +
		"  function initialize(root) {" +
		"    root.x = root.y = 0;" +
		"    root.dx = width;" +
		"    root.dy = height;" +
		"    root.depth = 0;" +
		"  }" +
		"  /* Aggregate the values for internal nodes. This is normally done by the" +
		"   treemap layout, but not here because of our custom implementation." +
		"   We also take a snapshot of the original children (_children) to avoid" +
		"   the children being overwritten when when layout is computed.*/" +
		"  function accumulate(d) {" +
		"	d._children = d.children;" +
		"	if (d._children) {" +
		"		d.value = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0);" +
		"	}" +
		"	return d.value;	" +
		"  }" +
		"  /* Compute the treemap layout recursively such that each group of siblings" +
		"   uses the same size (1×1) rather than the dimensions of the parent cell." +
		"   This optimizes the layout for the current zoom state. Note that a wrapper" +
		"   object is created for the parent node for each group of siblings so that" +
		"   the parent’s dimensions are not discarded as we recurse. Since each group" +
		"   of sibling was laid out in 1×1, we must rescale to fit using absolute" +
		"   coordinates. This lets us use a viewport to zoom.*/" +
		"  function layout(d) {" +
		"    if (d._children) {" +
		"      treemap.nodes({_children: d._children});" +
		"      d._children.forEach(function(c) {" +
		"        c.x = d.x + c.x * d.dx;" +
		"        c.y = d.y + c.y * d.dy;" +
		"        c.dx *= d.dx;" +
		"        c.dy *= d.dy;" +
		"        c.parent = d;" +
		"		" +
		"        layout(c);" +
		"      });" +
		"    }" +
		"  }" +
		"  function display(d) {" +
		"    grandparent" +
		"        .datum(d.parent)" +
		"        .on(\"click\", transition)" +
		"      .select(\"text\")" +
		"        .text(name(d));" +
		"    var g1 = svg.insert(\"g\", \".grandparent\")" +
		"        .datum(d)" +
		"        .attr(\"class\", \"depth\");" +
		"    var g = g1.selectAll(\"g\")" +
		"        .data(d._children)" +
		"      .enter().append(\"g\");" +
		"    g.filter(function(d) { return d._children; })" +
		"        .classed(\"children\", true)" +
		"        .on(\"click\", transition);" +
		"    g.selectAll(\".child\")" +
		"        .data(function(d) { return d._children || [d]; })" +
		"      .enter().append(\"rect\")" +
		"        .attr(\"class\", \"child\")" +
		"		/*.style(\"fill\", function(d) { return this.parentNode.className.baseVal.indexOf('children') >= 0 ? color(d.parent.sentiment) :  color(d.sentiment) ; })*/" +
		"        .call(rect);" +
		"    var parentSelection = g.append(\"rect\")" +
		"        .attr(\"class\", \"parent\")" +
		"        .call(rect)" +
		"		.style(\"fill\", function(d) { return color() ; })" +
		"        .text(function(d) { return formatNumber(d.value); });" +
		"		" +
		"    g.append(\"text\")" +
		"        .text(function(d) { return d.name; })" +
		"        .call(text_center)" +
		"		.call(wrap, function(d) { return getRectWidth(d); })" +
		"        .call(text_display)" +
		"        .call(text_center_wrapped);" +
		"	" +
		"		" +
		"	g.selectAll('.parent')" +
		"		.on(\"mouseover\", function(d) {	" +
		"				var txt = '';" +
		"				var info = d.info;	" +
		"				" +
		"				if (this.nextSibling.style.display == 'none' && !transitioning) {" +
		"					txt += '<b>' + d.name + '</b>'; " +
		"					if (showValue) {" +
		"						txt += '<br>';" +
		"						txt += (getItalicText('Value') + ': ' + d.value);" +
		"					}" +
		"				} else {" +
		"					if (showValue) {" +
		"						txt += (getItalicText('Value') + ': ' + d.value);" +
		"					} else {" +
		"						if (!info) {" +
		"							return;" +
		"						}" +
		"					}					" +
		"				}" +
		"				" +
		"							" +
		"				if (info) {" +
		"					for(var index in info) { " +
		"						if (info.hasOwnProperty(index)) {" +
		"							var attr = info[index];" +
		"							txt += ('<br>' + getItalicText(index) + ': ' + attr);" +
		"						}" +
		"					}" +
		"				}" +
		"				" +
		"				if (txt.substr(0, 4) == '<br>') {" +
		"					txt = txt.substr(4);" +
		"				}" +
		"				" +
		"				div.html(txt);" +
		"				div.transition()		" +
		"					.duration(100)		" +
		"					.style(\"opacity\", 1);		" +
		"				var parentRectWidth = +d3.event.target.attributes.width.value;" +
		"				var divWidth = +div[0][0].scrollWidth;" +
		"				var arrowWidth = +arrow[0][0].offsetWidth;" +
		"				var arrowHeight = +arrow[0][0].offsetHeight;" +
		"				var leftPosition = +getPosition(d3.event.target).left;" +
		"				var bottomPosition = +getPosition(d3.event.target).bottom;" +
		"				" +
		"				div.style(\"left\", (leftPosition + (parentRectWidth - divWidth)/2) + \"px\" )		" +
		"					.style(\"top\", (bottomPosition + arrowHeight) + \"px\");	" +
		"				arrow.transition()		" +
		"					.duration(100)		" +
		"					.style(\"opacity\", 1);		" +
		"				arrow.style(\"left\", (leftPosition + (parentRectWidth - arrowWidth)/2) + \"px\" )		" +
		"					.style(\"top\", bottomPosition + \"px\");	" +
		"		})		" +
		"        .on(\"mouseout\", function(d) {		" +
		"            div.transition()		" +
		"                .duration(100)		" +
		"                .style(\"opacity\", 0);" +
		"				" +
		"			arrow.transition()		" +
		"                .duration(100)		" +
		"                .style(\"opacity\", 0);" +
		"				" +
		"			this.style.cursor = undefined;" +
		"		});" +
		"		" +
		"	function getItalicText(str) {" +
		"		return '<span style=\"font-style: italic;\">' + str + '</span>' ;" +
		"	}" +
		"		" +
		"	/* Helper function to get an element's exact position*/" +
		"  function getPosition(elem) {" +
		"		var box = elem.getBoundingClientRect();" +
		"		 " +
		"		var body = document.body;" +
		"		var docElem = document.documentElement;" +
		"		" +
		"		var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;" +
		"		var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;" +
		"		 " +
		"		var clientTop = docElem.clientTop || body.clientTop || 0;" +
		"		var clientLeft = docElem.clientLeft || body.clientLeft || 0;" +
		"		 " +
		"		var top  = box.top +  scrollTop - clientTop;" +
		"		var bottom  = box.bottom +  scrollTop - clientTop;" +
		"		var left = box.left + scrollLeft - clientLeft;" +
		"		var right = box.right + scrollLeft - clientLeft;" +
		"		 " +
		"		return { top: Math.round(top), left: Math.round(left), right: Math.round(right), bottom: Math.round(bottom) };" +
		"	}" +
		"	" +
		"  function transition(d) {" +
		"      if (transitioning || !d) return;" +
		"      transitioning = true;" +
		"	  " +
		"      var g2 = display(d);" +
		"	  " +
		"      var t1 = g1.transition().duration(750)," +
		"          t2 = g2.transition().duration(750);" +
		"      /* Update the domain only after entering new elements.*/" +
		"      x.domain([d.x, d.x + d.dx]);" +
		"      y.domain([d.y, d.y + d.dy]);" +
		"      /* Enable anti-aliasing during the transition.*/" +
		"      svg.style(\"shape-rendering\", null);" +
		"      /* Draw child nodes on top of parent nodes.*/" +
		"      svg.selectAll(\".depth\").sort(function(a, b) { return a.depth - b.depth; });" +
		"      /* Fade-in entering text.*/" +
		"      g2.selectAll(\"text\").style(\"fill-opacity\", 0);" +
		"	  " +
		"	  g1.selectAll(\".child\").style(\"fill-opacity\", 0);" +
		"	  g2.selectAll(\".child\").style(\"fill-opacity\", 0);" +
		"	  " +
		"	  g2.selectAll(\".parent\").style(\"fill-opacity\", 0);" +
		"      /* Transition to the new view.*/" +
		"      t1.selectAll(\"text\").call(text_center).style(\"fill-opacity\", 0);" +
		"      t2.selectAll(\"text\").call(text_center).call(text_display).style(\"fill-opacity\", 1);" +
		"	  	  " +
		"	  t1.selectAll(\".child\").style(\"fill-opacity\", 0);" +
		"	  t2.selectAll(\".child\").style(\"fill-opacity\", 0);" +
		"	  " +
		"	  t1.selectAll(\".parent\").style(\"fill-opacity\", 0);" +
		"	  t2.selectAll(\".parent\").style(\"fill-opacity\", 0.5);" +
		"	  " +
		"      t1.selectAll(\"rect\").call(rect);" +
		"      t2.selectAll(\"rect\").call(rect);" +
		"      /* Remove the old node when the transition is finished.*/" +
		"      t1.remove().each(\"end\", function() {" +
		"        svg.style(\"shape-rendering\", \"crispEdges\");" +
		"        transitioning = false;" +
		"		t1.selectAll(\"text\").call(text_display);" +
		"		t2.selectAll(\"text\").call(text_display);" +
		"      });	  " +
		"    }" +
		"    return g;" +
		"  }" +
		"  function text_center_wrapped(text) {" +
		"	if (detectFirefox()) {" +
		"		return;" +
		"	}" +
		"    text.attr(\"y\", function(d) { " +
		"		var y1 = y(d.y);" +
		"		var h = getRectHeight(d);" +
		"		var h2 = this.scrollHeight;" +
		"		return y1 + (h - h2)/2 + 12; " +
		"	});" +
		"  }" +
		"  " +
		"  function text_center(text) {" +
		"    text.attr(\"x\", function(d) { " +
		"						return x(d.x) + getRectWidth(d)/2; " +
		"					})" +
		"        .attr(\"y\", function(d) { return y(d.y) + getRectHeight(d)/2; })" +
		"		.attr(\"text-anchor\", \"middle\")" +
		"        .attr(\"dy\", function(d) { return 4; })" +
		"  }" +
		"  " +
		"  function text_display(text) {" +
		"    text.style('display', function(d) {" +
		"			var isHidden = (this.style.display == 'none');" +
		"			this.style.display = 'block';" +
		"			var shouldBeShown = ((this.scrollWidth + 8) < getRectWidth(d)) && ((this.scrollHeight + 4) < getRectHeight(d));" +
		"			" +
		"			if (detectFirefox()) {" +
		"				console.log(this);" +
		"				shouldBeShown = (this.firstChild && (this.firstChild.length*6.5 + 8) < getRectWidth(d)) && (18 < getRectHeight(d));			" +
		"			}" +
		"			" +
		"			if (isHidden) { this.style.display = 'none'; }" +
		"			if (shouldBeShown) {" +
		"				return 'block';" +
		"			} else {" +
		"				return 'none';" +
		"			}" +
		"		})" +
		"  }" +
		"  function rect(rect) {" +
		"	" +
		"    rect.attr(\"x\", function(d) { return x(d.x); })" +
		"        .attr(\"y\", function(d) { return y(d.y); })" +
		"        .attr(\"width\", getRectWidth)" +
		"        .attr(\"height\", getRectHeight);" +
		"  }" +
		"  function name(d) {" +
		"    return d.parent" +
		"        ? name(d.parent) + \".\" + d.name" +
		"        : d.name;" +
		"  }" +
		"  " +
		"  function getRectWidth(d) {" +
		"	return x(d.x + d.dx) - x(d.x);" +
		"  }" +
		"  " +
		"  function getRectHeight(d) {" +
		"	return y(d.y + d.dy) - y(d.y);" +
		"  }" +
		"  " +
		"  function wrap(text, width) {" +
		"		if (detectFirefox()) {" +
		"			return;" +
		"		}" +
		"	  text.each(function(d,i) {" +
		"		var text = d3.select(this)," +
		"			words = text.text().split(/\\s+/).reverse()," +
		"			word," +
		"			line = []," +
		"			lineHeight = 1.2, /*ems*/" +
		"			y = text.attr(\"y\")," +
		"			x = text.attr(\"x\")," +
		"			dy = 0," +
		"			tspan = text.text(null).append(\"tspan\").attr(\"x\", x).attr(\"dy\", \"0\");" +
		"		while (word = words.pop()) {" +
		"		  line.push(word);" +
		"		  tspan.text(line.join(\" \"));" +
		"		  if (tspan.node().getComputedTextLength() + 8 > width(d)) {" +
		"			line.pop();" +
		"			tspan.text(line.join(\" \"));" +
		"			line = [word];" +
		"			tspan = text.append(\"tspan\").attr(\"x\", x).attr(\"dy\", (+(lineHeight) + +(dy)) + \"em\").text(word);" +
		"		  }" +
		"		}" +
		"	  });" +
		"  }" +
		"	function generateShadesNotRandom(hue, index){" +
		"	  var hsl = \"hsl(\" + hue + \", \" + getNotRandomNumber(70,80, 2, index) + \"%, \" +getNotRandomNumber(45, 80, 3, index) + \"%)\";  " +
		"	  return hsl;" +
		"	}" +
		"	function getNotRandomNumber(min, max, step, index) {" +
		"		var number = min + (step*index) % (max - min);" +
		"		return number;" +
		"	}" +
		"	function generateTooltipBackground(hue){" +
		"	  var hsl = \"hsl(\"+hue+\", \"+ rand(90,90) +\"%, \"+rand(90, 90) +\"%)\";  " +
		"	  return hsl;" +
		"	}" +
		"	" +
		"	function rand(min, max){" +
		"		return Math.floor(Math.random() * (max - min + 1)) + min;" +
		"	}" +
		"}" +
		"</script>";
      
		text.Output.Append(str);      
    }    
}