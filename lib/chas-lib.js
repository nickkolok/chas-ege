/* jqPlot 1.0.8r1250 | (c) 2009-2013 Chris Leonello | jplot.com
   jsDate | (c) 2010-2013 Chris Leonello
 */(function(L){var u;L.fn.emptyForce=function(){for(var ah=0,ai;(ai=L(this)[ah])!=null;ah++){if(ai.nodeType===1){L.cleanData(ai.getElementsByTagName("*"))}if(L.jqplot.use_excanvas){ai.outerHTML=""}else{while(ai.firstChild){ai.removeChild(ai.firstChild)}}ai=null}return L(this)};L.fn.removeChildForce=function(ah){while(ah.firstChild){this.removeChildForce(ah.firstChild);ah.removeChild(ah.firstChild)}};L.fn.jqplot=function(){var ah=[];var aj=[];for(var ak=0,ai=arguments.length;ak<ai;ak++){if(L.isArray(arguments[ak])){ah.push(arguments[ak])}else{if(L.isPlainObject(arguments[ak])){aj.push(arguments[ak])}}}return this.each(function(an){var at,ar,aq=L(this),am=ah.length,al=aj.length,ap,ao;if(an<am){ap=ah[an]}else{ap=am?ah[am-1]:null}if(an<al){ao=aj[an]}else{ao=al?aj[al-1]:null}at=aq.attr("id");if(at===u){at="jqplot_target_"+L.jqplot.targetCounter++;aq.attr("id",at)}ar=L.jqplot(at,ap,ao);aq.data("jqplot",ar)})};L.jqplot=function(an,ak,ai){var aj=null,ah=null;if(arguments.length===3){aj=ak;ah=ai}else{if(arguments.length===2){if(L.isArray(ak)){aj=ak}else{if(L.isPlainObject(ak)){ah=ak}}}}if(aj===null&&ah!==null&&ah.data){aj=ah.data}var am=new R();L("#"+an).removeClass("jqplot-error");if(L.jqplot.config.catchErrors){try{am.init(an,aj,ah);am.draw();am.themeEngine.init.call(am);return am}catch(al){var ao=L.jqplot.config.errorMessage||al.message;L("#"+an).append('<div class="jqplot-error-message">'+ao+"</div>");L("#"+an).addClass("jqplot-error");document.getElementById(an).style.background=L.jqplot.config.errorBackground;document.getElementById(an).style.border=L.jqplot.config.errorBorder;document.getElementById(an).style.fontFamily=L.jqplot.config.errorFontFamily;document.getElementById(an).style.fontSize=L.jqplot.config.errorFontSize;document.getElementById(an).style.fontStyle=L.jqplot.config.errorFontStyle;document.getElementById(an).style.fontWeight=L.jqplot.config.errorFontWeight}}else{am.init(an,aj,ah);am.draw();am.themeEngine.init.call(am);return am}};L.jqplot.version="1.0.8";L.jqplot.revision="1250";L.jqplot.targetCounter=1;L.jqplot.CanvasManager=function(){if(typeof L.jqplot.CanvasManager.canvases=="undefined"){L.jqplot.CanvasManager.canvases=[];L.jqplot.CanvasManager.free=[]}var ah=[];this.getCanvas=function(){var ak;var aj=true;if(!L.jqplot.use_excanvas){for(var al=0,ai=L.jqplot.CanvasManager.canvases.length;al<ai;al++){if(L.jqplot.CanvasManager.free[al]===true){aj=false;ak=L.jqplot.CanvasManager.canvases[al];L.jqplot.CanvasManager.free[al]=false;ah.push(al);break}}}if(aj){ak=document.createElement("canvas");ah.push(L.jqplot.CanvasManager.canvases.length);L.jqplot.CanvasManager.canvases.push(ak);L.jqplot.CanvasManager.free.push(false)}return ak};this.initCanvas=function(ai){if(L.jqplot.use_excanvas){return window.G_vmlCanvasManager.initElement(ai)}return ai};this.freeAllCanvases=function(){for(var aj=0,ai=ah.length;aj<ai;aj++){this.freeCanvas(ah[aj])}ah=[]};this.freeCanvas=function(ai){if(L.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==u){window.G_vmlCanvasManager.uninitElement(L.jqplot.CanvasManager.canvases[ai]);L.jqplot.CanvasManager.canvases[ai]=null}else{var aj=L.jqplot.CanvasManager.canvases[ai];aj.getContext("2d").clearRect(0,0,aj.width,aj.height);L(aj).unbind().removeAttr("class").removeAttr("style");L(aj).css({left:"",top:"",position:""});aj.width=0;aj.height=0;L.jqplot.CanvasManager.free[ai]=true}}};L.jqplot.log=function(){if(window.console){window.console.log.apply(window.console,arguments)}};L.jqplot.config={addDomReference:false,enablePlugins:false,defaultHeight:300,defaultWidth:400,UTCAdjust:false,timezoneOffset:new Date(new Date().getTimezoneOffset()*60000),errorMessage:"",errorBackground:"",errorBorder:"",errorFontFamily:"",errorFontSize:"",errorFontStyle:"",errorFontWeight:"",catchErrors:false,defaultTickFormatString:"%.1f",defaultColors:["#4bb2c5","#EAA228","#c5b47f","#579575","#839557","#958c12","#953579","#4b5de4","#d8b83f","#ff5800","#0085cc","#c747a3","#cddf54","#FBD178","#26B4E3","#bd70c7"],defaultNegativeColors:["#498991","#C08840","#9F9274","#546D61","#646C4A","#6F6621","#6E3F5F","#4F64B0","#A89050","#C45923","#187399","#945381","#959E5C","#C7AF7B","#478396","#907294"],dashLength:4,gapLength:4,dotGapLength:2.5,srcLocation:"jqplot/src/",pluginLocation:"jqplot/src/plugins/"};L.jqplot.arrayMax=function(ah){return Math.max.apply(Math,ah)};L.jqplot.arrayMin=function(ah){return Math.min.apply(Math,ah)};L.jqplot.enablePlugins=L.jqplot.config.enablePlugins;L.jqplot.support_canvas=function(){if(typeof L.jqplot.support_canvas.result=="undefined"){L.jqplot.support_canvas.result=!!document.createElement("canvas").getContext}return L.jqplot.support_canvas.result};L.jqplot.support_canvas_text=function(){if(typeof L.jqplot.support_canvas_text.result=="undefined"){if(window.G_vmlCanvasManager!==u&&window.G_vmlCanvasManager._version>887){L.jqplot.support_canvas_text.result=true}else{L.jqplot.support_canvas_text.result=!!(document.createElement("canvas").getContext&&typeof document.createElement("canvas").getContext("2d").fillText=="function")}}return L.jqplot.support_canvas_text.result};L.jqplot.use_excanvas=((!L.support.boxModel||!L.support.objectAll||!$support.leadingWhitespace)&&!L.jqplot.support_canvas())?true:false;L.jqplot.preInitHooks=[];L.jqplot.postInitHooks=[];L.jqplot.preParseOptionsHooks=[];L.jqplot.postParseOptionsHooks=[];L.jqplot.preDrawHooks=[];L.jqplot.postDrawHooks=[];L.jqplot.preDrawSeriesHooks=[];L.jqplot.postDrawSeriesHooks=[];L.jqplot.preDrawLegendHooks=[];L.jqplot.addLegendRowHooks=[];L.jqplot.preSeriesInitHooks=[];L.jqplot.postSeriesInitHooks=[];L.jqplot.preParseSeriesOptionsHooks=[];L.jqplot.postParseSeriesOptionsHooks=[];L.jqplot.eventListenerHooks=[];L.jqplot.preDrawSeriesShadowHooks=[];L.jqplot.postDrawSeriesShadowHooks=[];L.jqplot.ElemContainer=function(){this._elem;this._plotWidth;this._plotHeight;this._plotDimensions={height:null,width:null}};L.jqplot.ElemContainer.prototype.createElement=function(ak,am,ai,aj,an){this._offsets=am;var ah=ai||"jqplot";var al=document.createElement(ak);this._elem=L(al);this._elem.addClass(ah);this._elem.css(aj);this._elem.attr(an);al=null;return this._elem};L.jqplot.ElemContainer.prototype.getWidth=function(){if(this._elem){return this._elem.outerWidth(true)}else{return null}};L.jqplot.ElemContainer.prototype.getHeight=function(){if(this._elem){return this._elem.outerHeight(true)}else{return null}};L.jqplot.ElemContainer.prototype.getPosition=function(){if(this._elem){return this._elem.position()}else{return{top:null,left:null,bottom:null,right:null}}};L.jqplot.ElemContainer.prototype.getTop=function(){return this.getPosition().top};L.jqplot.ElemContainer.prototype.getLeft=function(){return this.getPosition().left};L.jqplot.ElemContainer.prototype.getBottom=function(){return this._elem.css("bottom")};L.jqplot.ElemContainer.prototype.getRight=function(){return this._elem.css("right")};function w(ah){L.jqplot.ElemContainer.call(this);this.name=ah;this._series=[];this.show=false;this.tickRenderer=L.jqplot.AxisTickRenderer;this.tickOptions={};this.labelRenderer=L.jqplot.AxisLabelRenderer;this.labelOptions={};this.label=null;this.showLabel=true;this.min=null;this.max=null;this.autoscale=false;this.pad=1.2;this.padMax=null;this.padMin=null;this.ticks=[];this.numberTicks;this.tickInterval;this.renderer=L.jqplot.LinearAxisRenderer;this.rendererOptions={};this.showTicks=true;this.showTickMarks=true;this.showMinorTicks=true;this.drawMajorGridlines=true;this.drawMinorGridlines=false;this.drawMajorTickMarks=true;this.drawMinorTickMarks=true;this.useSeriesColor=false;this.borderWidth=null;this.borderColor=null;this.scaleToHiddenSeries=false;this._dataBounds={min:null,max:null};this._intervalStats=[];this._offsets={min:null,max:null};this._ticks=[];this._label=null;this.syncTicks=null;this.tickSpacing=75;this._min=null;this._max=null;this._tickInterval=null;this._numberTicks=null;this.__ticks=null;this._options={}}w.prototype=new L.jqplot.ElemContainer();w.prototype.constructor=w;w.prototype.init=function(){if(L.isFunction(this.renderer)){this.renderer=new this.renderer()}this.tickOptions.axis=this.name;if(this.tickOptions.showMark==null){this.tickOptions.showMark=this.showTicks}if(this.tickOptions.showMark==null){this.tickOptions.showMark=this.showTickMarks}if(this.tickOptions.showLabel==null){this.tickOptions.showLabel=this.showTicks}if(this.label==null||this.label==""){this.showLabel=false}else{this.labelOptions.label=this.label}if(this.showLabel==false){this.labelOptions.show=false}if(this.pad==0){this.pad=1}if(this.padMax==0){this.padMax=1}if(this.padMin==0){this.padMin=1}if(this.padMax==null){this.padMax=(this.pad-1)/2+1}if(this.padMin==null){this.padMin=(this.pad-1)/2+1}this.pad=this.padMax+this.padMin-1;if(this.min!=null||this.max!=null){this.autoscale=false}if(this.syncTicks==null&&this.name.indexOf("y")>-1){this.syncTicks=true}else{if(this.syncTicks==null){this.syncTicks=false}}this.renderer.init.call(this,this.rendererOptions)};w.prototype.draw=function(ah,ai){if(this.__ticks){this.__ticks=null}return this.renderer.draw.call(this,ah,ai)};w.prototype.set=function(){this.renderer.set.call(this)};w.prototype.pack=function(ai,ah){if(this.show){this.renderer.pack.call(this,ai,ah)}if(this._min==null){this._min=this.min;this._max=this.max;this._tickInterval=this.tickInterval;this._numberTicks=this.numberTicks;this.__ticks=this._ticks}};w.prototype.reset=function(){this.renderer.reset.call(this)};w.prototype.resetScale=function(ah){L.extend(true,this,{min:null,max:null,numberTicks:null,tickInterval:null,_ticks:[],ticks:[]},ah);this.resetDataBounds()};w.prototype.resetDataBounds=function(){var ao=this._dataBounds;ao.min=null;ao.max=null;var ai,ap,am;var aj=(this.show)?true:false;for(var al=0;al<this._series.length;al++){ap=this._series[al];if(ap.show||this.scaleToHiddenSeries){am=ap._plotData;if(ap._type==="line"&&ap.renderer.bands.show&&this.name.charAt(0)!=="x"){am=[[0,ap.renderer.bands._min],[1,ap.renderer.bands._max]]}var ah=1,an=1;if(ap._type!=null&&ap._type=="ohlc"){ah=3;an=2}for(var ak=0,ai=am.length;ak<ai;ak++){if(this.name=="xaxis"||this.name=="x2axis"){if((am[ak][0]!=null&&am[ak][0]<ao.min)||ao.min==null){ao.min=am[ak][0]}if((am[ak][0]!=null&&am[ak][0]>ao.max)||ao.max==null){ao.max=am[ak][0]}}else{if((am[ak][ah]!=null&&am[ak][ah]<ao.min)||ao.min==null){ao.min=am[ak][ah]}if((am[ak][an]!=null&&am[ak][an]>ao.max)||ao.max==null){ao.max=am[ak][an]}}}if(aj&&ap.renderer.constructor!==L.jqplot.BarRenderer){aj=false}else{if(aj&&this._options.hasOwnProperty("forceTickAt0")&&this._options.forceTickAt0==false){aj=false}else{if(aj&&ap.renderer.constructor===L.jqplot.BarRenderer){if(ap.barDirection=="vertical"&&this.name!="xaxis"&&this.name!="x2axis"){if(this._options.pad!=null||this._options.padMin!=null){aj=false}}else{if(ap.barDirection=="horizontal"&&(this.name=="xaxis"||this.name=="x2axis")){if(this._options.pad!=null||this._options.padMin!=null){aj=false}}}}}}}}if(aj&&this.renderer.constructor===L.jqplot.LinearAxisRenderer&&ao.min>=0){this.padMin=1;this.forceTickAt0=true}};function q(ah){L.jqplot.ElemContainer.call(this);this.show=false;this.location="ne";this.labels=[];this.showLabels=true;this.showSwatches=true;this.placement="insideGrid";this.xoffset=0;this.yoffset=0;this.border;this.background;this.textColor;this.fontFamily;this.fontSize;this.rowSpacing="0.5em";this.renderer=L.jqplot.TableLegendRenderer;this.rendererOptions={};this.preDraw=false;this.marginTop=null;this.marginRight=null;this.marginBottom=null;this.marginLeft=null;this.escapeHtml=false;this._series=[];L.extend(true,this,ah)}q.prototype=new L.jqplot.ElemContainer();q.prototype.constructor=q;q.prototype.setOptions=function(ah){L.extend(true,this,ah);if(this.placement=="inside"){this.placement="insideGrid"}if(this.xoffset>0){if(this.placement=="insideGrid"){switch(this.location){case"nw":case"w":case"sw":if(this.marginLeft==null){this.marginLeft=this.xoffset+"px"}this.marginRight="0px";break;case"ne":case"e":case"se":default:if(this.marginRight==null){this.marginRight=this.xoffset+"px"}this.marginLeft="0px";break}}else{if(this.placement=="outside"){switch(this.location){case"nw":case"w":case"sw":if(this.marginRight==null){this.marginRight=this.xoffset+"px"}this.marginLeft="0px";break;case"ne":case"e":case"se":default:if(this.marginLeft==null){this.marginLeft=this.xoffset+"px"}this.marginRight="0px";break}}}this.xoffset=0}if(this.yoffset>0){if(this.placement=="outside"){switch(this.location){case"sw":case"s":case"se":if(this.marginTop==null){this.marginTop=this.yoffset+"px"}this.marginBottom="0px";break;case"ne":case"n":case"nw":default:if(this.marginBottom==null){this.marginBottom=this.yoffset+"px"}this.marginTop="0px";break}}else{if(this.placement=="insideGrid"){switch(this.location){case"sw":case"s":case"se":if(this.marginBottom==null){this.marginBottom=this.yoffset+"px"}this.marginTop="0px";break;case"ne":case"n":case"nw":default:if(this.marginTop==null){this.marginTop=this.yoffset+"px"}this.marginBottom="0px";break}}}this.yoffset=0}};q.prototype.init=function(){if(L.isFunction(this.renderer)){this.renderer=new this.renderer()}this.renderer.init.call(this,this.rendererOptions)};q.prototype.draw=function(ai,aj){for(var ah=0;ah<L.jqplot.preDrawLegendHooks.length;ah++){L.jqplot.preDrawLegendHooks[ah].call(this,ai)}return this.renderer.draw.call(this,ai,aj)};q.prototype.pack=function(ah){this.renderer.pack.call(this,ah)};function y(ah){L.jqplot.ElemContainer.call(this);this.text=ah;this.show=true;this.fontFamily;this.fontSize;this.textAlign;this.textColor;this.renderer=L.jqplot.DivTitleRenderer;this.rendererOptions={};this.escapeHtml=false}y.prototype=new L.jqplot.ElemContainer();y.prototype.constructor=y;y.prototype.init=function(){if(L.isFunction(this.renderer)){this.renderer=new this.renderer()}this.renderer.init.call(this,this.rendererOptions)};y.prototype.draw=function(ah){return this.renderer.draw.call(this,ah)};y.prototype.pack=function(){this.renderer.pack.call(this)};function S(ah){ah=ah||{};L.jqplot.ElemContainer.call(this);this.show=true;this.xaxis="xaxis";this._xaxis;this.yaxis="yaxis";this._yaxis;this.gridBorderWidth=2;this.renderer=L.jqplot.LineRenderer;this.rendererOptions={};this.data=[];this.gridData=[];this.label="";this.showLabel=true;this.color;this.negativeColor;this.lineWidth=2.5;this.lineJoin="round";this.lineCap="round";this.linePattern="solid";this.shadow=true;this.shadowAngle=45;this.shadowOffset=1.25;this.shadowDepth=3;this.shadowAlpha="0.1";this.breakOnNull=false;this.markerRenderer=L.jqplot.MarkerRenderer;this.markerOptions={};this.showLine=true;this.showMarker=true;this.index;this.fill=false;this.fillColor;this.fillAlpha;this.fillAndStroke=false;this.disableStack=false;this._stack=false;this.neighborThreshold=4;this.fillToZero=false;this.fillToValue=0;this.fillAxis="y";this.useNegativeColors=true;this._stackData=[];this._plotData=[];this._plotValues={x:[],y:[]};this._intervals={x:{},y:{}};this._prevPlotData=[];this._prevGridData=[];this._stackAxis="y";this._primaryAxis="_xaxis";this.canvas=new L.jqplot.GenericCanvas();this.shadowCanvas=new L.jqplot.GenericCanvas();this.plugins={};this._sumy=0;this._sumx=0;this._type=""}S.prototype=new L.jqplot.ElemContainer();S.prototype.constructor=S;S.prototype.init=function(ak,ao,am){this.index=ak;this.gridBorderWidth=ao;var an=this.data;var aj=[],al,ah;for(al=0,ah=an.length;al<ah;al++){if(!this.breakOnNull){if(an[al]==null||an[al][0]==null||an[al][1]==null){continue}else{aj.push(an[al])}}else{aj.push(an[al])}}this.data=aj;if(!this.color){this.color=am.colorGenerator.get(this.index)}if(!this.negativeColor){this.negativeColor=am.negativeColorGenerator.get(this.index)}if(!this.fillColor){this.fillColor=this.color}if(this.fillAlpha){var ai=L.jqplot.normalize2rgb(this.fillColor);var ai=L.jqplot.getColorComponents(ai);this.fillColor="rgba("+ai[0]+","+ai[1]+","+ai[2]+","+this.fillAlpha+")"}if(L.isFunction(this.renderer)){this.renderer=new this.renderer()}this.renderer.init.call(this,this.rendererOptions,am);this.markerRenderer=new this.markerRenderer();if(!this.markerOptions.color){this.markerOptions.color=this.color}if(this.markerOptions.show==null){this.markerOptions.show=this.showMarker}this.showMarker=this.markerOptions.show;this.markerRenderer.init(this.markerOptions)};S.prototype.draw=function(an,ak,am){var ai=(ak==u)?{}:ak;an=(an==u)?this.canvas._ctx:an;var ah,al,aj;for(ah=0;ah<L.jqplot.preDrawSeriesHooks.length;ah++){L.jqplot.preDrawSeriesHooks[ah].call(this,an,ai)}if(this.show){this.renderer.setGridData.call(this,am);if(!ai.preventJqPlotSeriesDrawTrigger){L(an.canvas).trigger("jqplotSeriesDraw",[this.data,this.gridData])}al=[];if(ai.data){al=ai.data}else{if(!this._stack){al=this.data}else{al=this._plotData}}aj=ai.gridData||this.renderer.makeGridData.call(this,al,am);if(this._type==="line"&&this.renderer.smooth&&this.renderer._smoothedData.length){aj=this.renderer._smoothedData}this.renderer.draw.call(this,an,aj,ai,am)}for(ah=0;ah<L.jqplot.postDrawSeriesHooks.length;ah++){L.jqplot.postDrawSeriesHooks[ah].call(this,an,ai,am)}an=ak=am=ah=al=aj=null};S.prototype.drawShadow=function(an,ak,am){var ai=(ak==u)?{}:ak;an=(an==u)?this.shadowCanvas._ctx:an;var ah,al,aj;for(ah=0;ah<L.jqplot.preDrawSeriesShadowHooks.length;ah++){L.jqplot.preDrawSeriesShadowHooks[ah].call(this,an,ai)}if(this.shadow){this.renderer.setGridData.call(this,am);al=[];if(ai.data){al=ai.data}else{if(!this._stack){al=this.data}else{al=this._plotData}}aj=ai.gridData||this.renderer.makeGridData.call(this,al,am);this.renderer.drawShadow.call(this,an,aj,ai,am)}for(ah=0;ah<L.jqplot.postDrawSeriesShadowHooks.length;ah++){L.jqplot.postDrawSeriesShadowHooks[ah].call(this,an,ai)}an=ak=am=ah=al=aj=null};S.prototype.toggleDisplay=function(ai,ak){var ah,aj;if(ai.data.series){ah=ai.data.series}else{ah=this}if(ai.data.speed){aj=ai.data.speed}if(aj){if(ah.canvas._elem.is(":hidden")||!ah.show){ah.show=true;ah.canvas._elem.removeClass("jqplot-series-hidden");if(ah.shadowCanvas._elem){ah.shadowCanvas._elem.fadeIn(aj)}ah.canvas._elem.fadeIn(aj,ak);ah.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+ah.index).fadeIn(aj)}else{ah.show=false;ah.canvas._elem.addClass("jqplot-series-hidden");if(ah.shadowCanvas._elem){ah.shadowCanvas._elem.fadeOut(aj)}ah.canvas._elem.fadeOut(aj,ak);ah.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+ah.index).fadeOut(aj)}}else{if(ah.canvas._elem.is(":hidden")||!ah.show){ah.show=true;ah.canvas._elem.removeClass("jqplot-series-hidden");if(ah.shadowCanvas._elem){ah.shadowCanvas._elem.show()}ah.canvas._elem.show(0,ak);ah.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+ah.index).show()}else{ah.show=false;ah.canvas._elem.addClass("jqplot-series-hidden");if(ah.shadowCanvas._elem){ah.shadowCanvas._elem.hide()}ah.canvas._elem.hide(0,ak);ah.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+ah.index).hide()}}};function M(){L.jqplot.ElemContainer.call(this);this.drawGridlines=true;this.gridLineColor="#cccccc";this.gridLineWidth=1;this.background="#fffdf6";this.borderColor="#999999";this.borderWidth=2;this.drawBorder=true;this.shadow=true;this.shadowAngle=45;this.shadowOffset=1.5;this.shadowWidth=3;this.shadowDepth=3;this.shadowColor=null;this.shadowAlpha="0.07";this._left;this._top;this._right;this._bottom;this._width;this._height;this._axes=[];this.renderer=L.jqplot.CanvasGridRenderer;this.rendererOptions={};this._offsets={top:null,bottom:null,left:null,right:null}}M.prototype=new L.jqplot.ElemContainer();M.prototype.constructor=M;M.prototype.init=function(){if(L.isFunction(this.renderer)){this.renderer=new this.renderer()}this.renderer.init.call(this,this.rendererOptions)};M.prototype.createElement=function(ah,ai){this._offsets=ah;return this.renderer.createElement.call(this,ai)};M.prototype.draw=function(){this.renderer.draw.call(this)};L.jqplot.GenericCanvas=function(){L.jqplot.ElemContainer.call(this);this._ctx};L.jqplot.GenericCanvas.prototype=new L.jqplot.ElemContainer();L.jqplot.GenericCanvas.prototype.constructor=L.jqplot.GenericCanvas;L.jqplot.GenericCanvas.prototype.createElement=function(al,aj,ai,am){this._offsets=al;var ah="jqplot";if(aj!=u){ah=aj}var ak;ak=am.canvasManager.getCanvas();if(ai!=null){this._plotDimensions=ai}ak.width=this._plotDimensions.width-this._offsets.left-this._offsets.right;ak.height=this._plotDimensions.height-this._offsets.top-this._offsets.bottom;this._elem=L(ak);this._elem.css({position:"absolute",left:this._offsets.left,top:this._offsets.top});this._elem.addClass(ah);ak=am.canvasManager.initCanvas(ak);ak=null;return this._elem};L.jqplot.GenericCanvas.prototype.setContext=function(){this._ctx=this._elem.get(0).getContext("2d");return this._ctx};L.jqplot.GenericCanvas.prototype.resetCanvas=function(){if(this._elem){if(L.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==u){window.G_vmlCanvasManager.uninitElement(this._elem.get(0))}this._elem.emptyForce()}this._ctx=null};L.jqplot.HooksManager=function(){this.hooks=[];this.args=[]};L.jqplot.HooksManager.prototype.addOnce=function(ak,ai){ai=ai||[];var al=false;for(var aj=0,ah=this.hooks.length;aj<ah;aj++){if(this.hooks[aj]==ak){al=true}}if(!al){this.hooks.push(ak);this.args.push(ai)}};L.jqplot.HooksManager.prototype.add=function(ai,ah){ah=ah||[];this.hooks.push(ai);this.args.push(ah)};L.jqplot.EventListenerManager=function(){this.hooks=[]};L.jqplot.EventListenerManager.prototype.addOnce=function(al,ak){var am=false,aj,ai;for(var ai=0,ah=this.hooks.length;ai<ah;ai++){aj=this.hooks[ai];if(aj[0]==al&&aj[1]==ak){am=true}}if(!am){this.hooks.push([al,ak])}};L.jqplot.EventListenerManager.prototype.add=function(ai,ah){this.hooks.push([ai,ah])};var U=["yMidAxis","xaxis","yaxis","x2axis","y2axis","y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis"];function R(){this.animate=false;this.animateReplot=false;this.axes={xaxis:new w("xaxis"),yaxis:new w("yaxis"),x2axis:new w("x2axis"),y2axis:new w("y2axis"),y3axis:new w("y3axis"),y4axis:new w("y4axis"),y5axis:new w("y5axis"),y6axis:new w("y6axis"),y7axis:new w("y7axis"),y8axis:new w("y8axis"),y9axis:new w("y9axis"),yMidAxis:new w("yMidAxis")};this.baseCanvas=new L.jqplot.GenericCanvas();this.captureRightClick=false;this.data=[];this.dataRenderer;this.dataRendererOptions;this.defaults={axesDefaults:{},axes:{xaxis:{},yaxis:{},x2axis:{},y2axis:{},y3axis:{},y4axis:{},y5axis:{},y6axis:{},y7axis:{},y8axis:{},y9axis:{},yMidAxis:{}},seriesDefaults:{},series:[]};this.defaultAxisStart=1;this.drawIfHidden=false;this.eventCanvas=new L.jqplot.GenericCanvas();this.fillBetween={series1:null,series2:null,color:null,baseSeries:0,fill:true};this.fontFamily;this.fontSize;this.grid=new M();this.legend=new q();this.noDataIndicator={show:false,indicator:"Loading Data...",axes:{xaxis:{min:0,max:10,tickInterval:2,show:true},yaxis:{min:0,max:12,tickInterval:3,show:true}}};this.negativeSeriesColors=L.jqplot.config.defaultNegativeColors;this.options={};this.previousSeriesStack=[];this.plugins={};this.series=[];this.seriesStack=[];this.seriesColors=L.jqplot.config.defaultColors;this.sortData=true;this.stackSeries=false;this.syncXTicks=true;this.syncYTicks=true;this.target=null;this.targetId=null;this.textColor;this.title=new y();this._drawCount=0;this._sumy=0;this._sumx=0;this._stackData=[];this._plotData=[];this._width=null;this._height=null;this._plotDimensions={height:null,width:null};this._gridPadding={top:null,right:null,bottom:null,left:null};this._defaultGridPadding={top:10,right:10,bottom:23,left:10};this._addDomReference=L.jqplot.config.addDomReference;this.preInitHooks=new L.jqplot.HooksManager();this.postInitHooks=new L.jqplot.HooksManager();this.preParseOptionsHooks=new L.jqplot.HooksManager();this.postParseOptionsHooks=new L.jqplot.HooksManager();this.preDrawHooks=new L.jqplot.HooksManager();this.postDrawHooks=new L.jqplot.HooksManager();this.preDrawSeriesHooks=new L.jqplot.HooksManager();this.postDrawSeriesHooks=new L.jqplot.HooksManager();this.preDrawLegendHooks=new L.jqplot.HooksManager();this.addLegendRowHooks=new L.jqplot.HooksManager();this.preSeriesInitHooks=new L.jqplot.HooksManager();this.postSeriesInitHooks=new L.jqplot.HooksManager();this.preParseSeriesOptionsHooks=new L.jqplot.HooksManager();this.postParseSeriesOptionsHooks=new L.jqplot.HooksManager();this.eventListenerHooks=new L.jqplot.EventListenerManager();this.preDrawSeriesShadowHooks=new L.jqplot.HooksManager();this.postDrawSeriesShadowHooks=new L.jqplot.HooksManager();this.colorGenerator=new L.jqplot.ColorGenerator();this.negativeColorGenerator=new L.jqplot.ColorGenerator();this.canvasManager=new L.jqplot.CanvasManager();this.themeEngine=new L.jqplot.ThemeEngine();var aj=0;this.init=function(av,ar,ay){ay=ay||{};for(var at=0;at<L.jqplot.preInitHooks.length;at++){L.jqplot.preInitHooks[at].call(this,av,ar,ay)}for(var at=0;at<this.preInitHooks.hooks.length;at++){this.preInitHooks.hooks[at].call(this,av,ar,ay)}this.targetId="#"+av;this.target=L("#"+av);if(this._addDomReference){this.target.data("jqplot",this)}this.target.removeClass("jqplot-error");if(!this.target.get(0)){throw new Error("No plot target specified")}if(this.target.css("position")=="static"){this.target.css("position","relative")}if(!this.target.hasClass("jqplot-target")){this.target.addClass("jqplot-target")}if(!this.target.height()){var au;if(ay&&ay.height){au=parseInt(ay.height,10)}else{if(this.target.attr("data-height")){au=parseInt(this.target.attr("data-height"),10)}else{au=parseInt(L.jqplot.config.defaultHeight,10)}}this._height=au;this.target.css("height",au+"px")}else{this._height=au=this.target.height()}if(!this.target.width()){var aw;if(ay&&ay.width){aw=parseInt(ay.width,10)}else{if(this.target.attr("data-width")){aw=parseInt(this.target.attr("data-width"),10)}else{aw=parseInt(L.jqplot.config.defaultWidth,10)}}this._width=aw;this.target.css("width",aw+"px")}else{this._width=aw=this.target.width()}for(var at=0,ap=U.length;at<ap;at++){this.axes[U[at]]=new w(U[at])}this._plotDimensions.height=this._height;this._plotDimensions.width=this._width;this.grid._plotDimensions=this._plotDimensions;this.title._plotDimensions=this._plotDimensions;this.baseCanvas._plotDimensions=this._plotDimensions;this.eventCanvas._plotDimensions=this._plotDimensions;this.legend._plotDimensions=this._plotDimensions;if(this._height<=0||this._width<=0||!this._height||!this._width){throw new Error("Canvas dimension not set")}if(ay.dataRenderer&&L.isFunction(ay.dataRenderer)){if(ay.dataRendererOptions){this.dataRendererOptions=ay.dataRendererOptions}this.dataRenderer=ay.dataRenderer;ar=this.dataRenderer(ar,this,this.dataRendererOptions)}if(ay.noDataIndicator&&L.isPlainObject(ay.noDataIndicator)){L.extend(true,this.noDataIndicator,ay.noDataIndicator)}if(ar==null||L.isArray(ar)==false||ar.length==0||L.isArray(ar[0])==false||ar[0].length==0){if(this.noDataIndicator.show==false){throw new Error("No data specified")}else{for(var al in this.noDataIndicator.axes){for(var an in this.noDataIndicator.axes[al]){this.axes[al][an]=this.noDataIndicator.axes[al][an]}}this.postDrawHooks.add(function(){var aD=this.eventCanvas.getHeight();var aA=this.eventCanvas.getWidth();var az=L('<div class="jqplot-noData-container" style="position:absolute;"></div>');this.target.append(az);az.height(aD);az.width(aA);az.css("top",this.eventCanvas._offsets.top);az.css("left",this.eventCanvas._offsets.left);var aC=L('<div class="jqplot-noData-contents" style="text-align:center; position:relative; margin-left:auto; margin-right:auto;"></div>');az.append(aC);aC.html(this.noDataIndicator.indicator);var aB=aC.height();var ax=aC.width();aC.height(aB);aC.width(ax);aC.css("top",(aD-aB)/2+"px")})}}this.data=L.extend(true,[],ar);this.parseOptions(ay);if(this.textColor){this.target.css("color",this.textColor)}if(this.fontFamily){this.target.css("font-family",this.fontFamily)}if(this.fontSize){this.target.css("font-size",this.fontSize)}this.title.init();this.legend.init();this._sumy=0;this._sumx=0;this.computePlotData();for(var at=0;at<this.series.length;at++){this.seriesStack.push(at);this.previousSeriesStack.push(at);this.series[at].shadowCanvas._plotDimensions=this._plotDimensions;this.series[at].canvas._plotDimensions=this._plotDimensions;for(var aq=0;aq<L.jqplot.preSeriesInitHooks.length;aq++){L.jqplot.preSeriesInitHooks[aq].call(this.series[at],av,this.data,this.options.seriesDefaults,this.options.series[at],this)}for(var aq=0;aq<this.preSeriesInitHooks.hooks.length;aq++){this.preSeriesInitHooks.hooks[aq].call(this.series[at],av,this.data,this.options.seriesDefaults,this.options.series[at],this)}this.series[at]._plotDimensions=this._plotDimensions;this.series[at].init(at,this.grid.borderWidth,this);for(var aq=0;aq<L.jqplot.postSeriesInitHooks.length;aq++){L.jqplot.postSeriesInitHooks[aq].call(this.series[at],av,this.data,this.options.seriesDefaults,this.options.series[at],this)}for(var aq=0;aq<this.postSeriesInitHooks.hooks.length;aq++){this.postSeriesInitHooks.hooks[aq].call(this.series[at],av,this.data,this.options.seriesDefaults,this.options.series[at],this)}this._sumy+=this.series[at]._sumy;this._sumx+=this.series[at]._sumx}var am,ao;for(var at=0,ap=U.length;at<ap;at++){am=U[at];ao=this.axes[am];ao._plotDimensions=this._plotDimensions;ao.init();if(this.axes[am].borderColor==null){if(am.charAt(0)!=="x"&&ao.useSeriesColor===true&&ao.show){ao.borderColor=ao._series[0].color}else{ao.borderColor=this.grid.borderColor}}}if(this.sortData){ah(this.series)}this.grid.init();this.grid._axes=this.axes;this.legend._series=this.series;for(var at=0;at<L.jqplot.postInitHooks.length;at++){L.jqplot.postInitHooks[at].call(this,av,this.data,ay)}for(var at=0;at<this.postInitHooks.hooks.length;at++){this.postInitHooks.hooks[at].call(this,av,this.data,ay)}};this.resetAxesScale=function(aq,am){var ao=am||{};var ap=aq||this.axes;if(ap===true){ap=this.axes}if(L.isArray(ap)){for(var an=0;an<ap.length;an++){this.axes[ap[an]].resetScale(ao[ap[an]])}}else{if(typeof(ap)==="object"){for(var al in ap){this.axes[al].resetScale(ao[al])}}}};this.reInitialize=function(au,al){var ay=L.extend(true,{},this.options,al);var aw=this.targetId.substr(1);var ar=(au==null)?this.data:au;for(var av=0;av<L.jqplot.preInitHooks.length;av++){L.jqplot.preInitHooks[av].call(this,aw,ar,ay)}for(var av=0;av<this.preInitHooks.hooks.length;av++){this.preInitHooks.hooks[av].call(this,aw,ar,ay)}this._height=this.target.height();this._width=this.target.width();if(this._height<=0||this._width<=0||!this._height||!this._width){throw new Error("Target dimension not set")}this._plotDimensions.height=this._height;this._plotDimensions.width=this._width;this.grid._plotDimensions=this._plotDimensions;this.title._plotDimensions=this._plotDimensions;this.baseCanvas._plotDimensions=this._plotDimensions;this.eventCanvas._plotDimensions=this._plotDimensions;this.legend._plotDimensions=this._plotDimensions;var am,ax,at,ao;for(var av=0,aq=U.length;av<aq;av++){am=U[av];ao=this.axes[am];ax=ao._ticks;for(var at=0,ap=ax.length;at<ap;at++){var an=ax[at]._elem;if(an){if(L.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==u){window.G_vmlCanvasManager.uninitElement(an.get(0))}an.emptyForce();an=null;ax._elem=null}}ax=null;delete ao.ticks;delete ao._ticks;this.axes[am]=new w(am);this.axes[am]._plotWidth=this._width;this.axes[am]._plotHeight=this._height}if(au){if(ay.dataRenderer&&L.isFunction(ay.dataRenderer)){if(ay.dataRendererOptions){this.dataRendererOptions=ay.dataRendererOptions}this.dataRenderer=ay.dataRenderer;au=this.dataRenderer(au,this,this.dataRendererOptions)}this.data=L.extend(true,[],au)}if(al){this.parseOptions(ay)}this.title._plotWidth=this._width;if(this.textColor){this.target.css("color",this.textColor)}if(this.fontFamily){this.target.css("font-family",this.fontFamily)}if(this.fontSize){this.target.css("font-size",this.fontSize)}this.title.init();this.legend.init();this._sumy=0;this._sumx=0;this.seriesStack=[];this.previousSeriesStack=[];this.computePlotData();for(var av=0,aq=this.series.length;av<aq;av++){this.seriesStack.push(av);this.previousSeriesStack.push(av);this.series[av].shadowCanvas._plotDimensions=this._plotDimensions;this.series[av].canvas._plotDimensions=this._plotDimensions;for(var at=0;at<L.jqplot.preSeriesInitHooks.length;at++){L.jqplot.preSeriesInitHooks[at].call(this.series[av],aw,this.data,this.options.seriesDefaults,this.options.series[av],this)}for(var at=0;at<this.preSeriesInitHooks.hooks.length;at++){this.preSeriesInitHooks.hooks[at].call(this.series[av],aw,this.data,this.options.seriesDefaults,this.options.series[av],this)}this.series[av]._plotDimensions=this._plotDimensions;this.series[av].init(av,this.grid.borderWidth,this);for(var at=0;at<L.jqplot.postSeriesInitHooks.length;at++){L.jqplot.postSeriesInitHooks[at].call(this.series[av],aw,this.data,this.options.seriesDefaults,this.options.series[av],this)}for(var at=0;at<this.postSeriesInitHooks.hooks.length;at++){this.postSeriesInitHooks.hooks[at].call(this.series[av],aw,this.data,this.options.seriesDefaults,this.options.series[av],this)}this._sumy+=this.series[av]._sumy;this._sumx+=this.series[av]._sumx}for(var av=0,aq=U.length;av<aq;av++){am=U[av];ao=this.axes[am];ao._plotDimensions=this._plotDimensions;ao.init();if(ao.borderColor==null){if(am.charAt(0)!=="x"&&ao.useSeriesColor===true&&ao.show){ao.borderColor=ao._series[0].color}else{ao.borderColor=this.grid.borderColor}}}if(this.sortData){ah(this.series)}this.grid.init();this.grid._axes=this.axes;this.legend._series=this.series;for(var av=0,aq=L.jqplot.postInitHooks.length;av<aq;av++){L.jqplot.postInitHooks[av].call(this,aw,this.data,ay)}for(var av=0,aq=this.postInitHooks.hooks.length;av<aq;av++){this.postInitHooks.hooks[av].call(this,aw,this.data,ay)}};this.quickInit=function(){this._height=this.target.height();this._width=this.target.width();if(this._height<=0||this._width<=0||!this._height||!this._width){throw new Error("Target dimension not set")}this._plotDimensions.height=this._height;this._plotDimensions.width=this._width;this.grid._plotDimensions=this._plotDimensions;this.title._plotDimensions=this._plotDimensions;this.baseCanvas._plotDimensions=this._plotDimensions;this.eventCanvas._plotDimensions=this._plotDimensions;this.legend._plotDimensions=this._plotDimensions;for(var aq in this.axes){this.axes[aq]._plotWidth=this._width;this.axes[aq]._plotHeight=this._height}this.title._plotWidth=this._width;if(this.textColor){this.target.css("color",this.textColor)}if(this.fontFamily){this.target.css("font-family",this.fontFamily)}if(this.fontSize){this.target.css("font-size",this.fontSize)}this._sumy=0;this._sumx=0;this.computePlotData();for(var ao=0;ao<this.series.length;ao++){if(this.series[ao]._type==="line"&&this.series[ao].renderer.bands.show){this.series[ao].renderer.initBands.call(this.series[ao],this.series[ao].renderer.options,this)}this.series[ao]._plotDimensions=this._plotDimensions;this.series[ao].canvas._plotDimensions=this._plotDimensions;this._sumy+=this.series[ao]._sumy;this._sumx+=this.series[ao]._sumx}var am;for(var al=0;al<12;al++){am=U[al];var an=this.axes[am]._ticks;for(var ao=0;ao<an.length;ao++){var ap=an[ao]._elem;if(ap){if(L.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==u){window.G_vmlCanvasManager.uninitElement(ap.get(0))}ap.emptyForce();ap=null;an._elem=null}}an=null;this.axes[am]._plotDimensions=this._plotDimensions;this.axes[am]._ticks=[]}if(this.sortData){ah(this.series)}this.grid._axes=this.axes;this.legend._series=this.series};function ah(ap){var au,av,aw,al,at;for(var aq=0;aq<ap.length;aq++){var am;var ar=[ap[aq].data,ap[aq]._stackData,ap[aq]._plotData,ap[aq]._prevPlotData];for(var an=0;an<4;an++){am=true;au=ar[an];if(ap[aq]._stackAxis=="x"){for(var ao=0;ao<au.length;ao++){if(typeof(au[ao][1])!="number"){am=false;break}}if(am){au.sort(function(ay,ax){return ay[1]-ax[1]})}}else{for(var ao=0;ao<au.length;ao++){if(typeof(au[ao][0])!="number"){am=false;break}}if(am){au.sort(function(ay,ax){return ay[0]-ax[0]})}}}}}this.computePlotData=function(){this._plotData=[];this._stackData=[];var at,au,ao;for(au=0,ao=this.series.length;au<ao;au++){at=this.series[au];this._plotData.push([]);this._stackData.push([]);var am=at.data;this._plotData[au]=L.extend(true,[],am);this._stackData[au]=L.extend(true,[],am);at._plotData=this._plotData[au];at._stackData=this._stackData[au];var ax={x:[],y:[]};if(this.stackSeries&&!at.disableStack){at._stack=true;var av=(at._stackAxis==="x")?0:1;for(var ap=0,al=am.length;ap<al;ap++){var aw=am[ap][av];if(aw==null){aw=0}this._plotData[au][ap][av]=aw;this._stackData[au][ap][av]=aw;if(au>0){for(var aq=au;aq--;){var an=this._plotData[aq][ap][av];if(aw*an>=0){this._plotData[au][ap][av]+=an;this._stackData[au][ap][av]+=an;break}}}}}else{for(var ar=0;ar<at.data.length;ar++){ax.x.push(at.data[ar][0]);ax.y.push(at.data[ar][1])}this._stackData.push(at.data);this.series[au]._stackData=at.data;this._plotData.push(at.data);at._plotData=at.data;at._plotValues=ax}if(au>0){at._prevPlotData=this.series[au-1]._plotData}at._sumy=0;at._sumx=0;for(ar=at.data.length-1;ar>-1;ar--){at._sumy+=at.data[ar][1];at._sumx+=at.data[ar][0]}}};this.populatePlotData=function(au,av){this._plotData=[];this._stackData=[];au._stackData=[];au._plotData=[];var ay={x:[],y:[]};if(this.stackSeries&&!au.disableStack){au._stack=true;var ax=(au._stackAxis==="x")?0:1;var az=L.extend(true,[],au.data);var aA=L.extend(true,[],au.data);var an,am,ao,aw,al;for(var ar=0;ar<av;ar++){var ap=this.series[ar].data;for(var aq=0;aq<ap.length;aq++){ao=ap[aq];an=(ao[0]!=null)?ao[0]:0;am=(ao[1]!=null)?ao[1]:0;az[aq][0]+=an;az[aq][1]+=am;aw=(ax)?am:an;if(au.data[aq][ax]*aw>=0){aA[aq][ax]+=aw}}}for(var at=0;at<aA.length;at++){ay.x.push(aA[at][0]);ay.y.push(aA[at][1])}this._plotData.push(aA);this._stackData.push(az);au._stackData=az;au._plotData=aA;au._plotValues=ay}else{for(var at=0;at<au.data.length;at++){ay.x.push(au.data[at][0]);ay.y.push(au.data[at][1])}this._stackData.push(au.data);this.series[av]._stackData=au.data;this._plotData.push(au.data);au._plotData=au.data;au._plotValues=ay}if(av>0){au._prevPlotData=this.series[av-1]._plotData}au._sumy=0;au._sumx=0;for(at=au.data.length-1;at>-1;at--){au._sumy+=au.data[at][1];au._sumx+=au.data[at][0]}};this.getNextSeriesColor=(function(am){var al=0;var an=am.seriesColors;return function(){if(al<an.length){return an[al++]}else{al=0;return an[al++]}}})(this);this.parseOptions=function(ay){for(var at=0;at<this.preParseOptionsHooks.hooks.length;at++){this.preParseOptionsHooks.hooks[at].call(this,ay)}for(var at=0;at<L.jqplot.preParseOptionsHooks.length;at++){L.jqplot.preParseOptionsHooks[at].call(this,ay)}this.options=L.extend(true,{},this.defaults,ay);var am=this.options;this.animate=am.animate;this.animateReplot=am.animateReplot;this.stackSeries=am.stackSeries;if(L.isPlainObject(am.fillBetween)){var ax=["series1","series2","color","baseSeries","fill"],au;for(var at=0,aq=ax.length;at<aq;at++){au=ax[at];if(am.fillBetween[au]!=null){this.fillBetween[au]=am.fillBetween[au]}}}if(am.seriesColors){this.seriesColors=am.seriesColors}if(am.negativeSeriesColors){this.negativeSeriesColors=am.negativeSeriesColors}if(am.captureRightClick){this.captureRightClick=am.captureRightClick}this.defaultAxisStart=(ay&&ay.defaultAxisStart!=null)?ay.defaultAxisStart:this.defaultAxisStart;this.colorGenerator.setColors(this.seriesColors);this.negativeColorGenerator.setColors(this.negativeSeriesColors);L.extend(true,this._gridPadding,am.gridPadding);this.sortData=(am.sortData!=null)?am.sortData:this.sortData;for(var at=0;at<12;at++){var an=U[at];var ap=this.axes[an];ap._options=L.extend(true,{},am.axesDefaults,am.axes[an]);L.extend(true,ap,am.axesDefaults,am.axes[an]);ap._plotWidth=this._width;ap._plotHeight=this._height}var aw=function(aD,aB,aE){var aA=[];var aC,az;aB=aB||"vertical";if(!L.isArray(aD[0])){for(aC=0,az=aD.length;aC<az;aC++){if(aB=="vertical"){aA.push([aE+aC,aD[aC]])}else{aA.push([aD[aC],aE+aC])}}}else{L.extend(true,aA,aD)}return aA};var av=0;this.series=[];for(var at=0;at<this.data.length;at++){var al=L.extend(true,{index:at},{seriesColors:this.seriesColors,negativeSeriesColors:this.negativeSeriesColors},this.options.seriesDefaults,this.options.series[at],{rendererOptions:{animation:{show:this.animate}}});var ax=new S(al);for(var ar=0;ar<L.jqplot.preParseSeriesOptionsHooks.length;ar++){L.jqplot.preParseSeriesOptionsHooks[ar].call(ax,this.options.seriesDefaults,this.options.series[at])}for(var ar=0;ar<this.preParseSeriesOptionsHooks.hooks.length;ar++){this.preParseSeriesOptionsHooks.hooks[ar].call(ax,this.options.seriesDefaults,this.options.series[at])}L.extend(true,ax,al);var ao="vertical";if(ax.renderer===L.jqplot.BarRenderer&&ax.rendererOptions&&ax.rendererOptions.barDirection=="horizontal"){ao="horizontal";ax._stackAxis="x";ax._primaryAxis="_yaxis"}ax.data=aw(this.data[at],ao,this.defaultAxisStart);switch(ax.xaxis){case"xaxis":ax._xaxis=this.axes.xaxis;break;case"x2axis":ax._xaxis=this.axes.x2axis;break;default:break}ax._yaxis=this.axes[ax.yaxis];ax._xaxis._series.push(ax);ax._yaxis._series.push(ax);if(ax.show){ax._xaxis.show=true;ax._yaxis.show=true}else{if(ax._xaxis.scaleToHiddenSeries){ax._xaxis.show=true}if(ax._yaxis.scaleToHiddenSeries){ax._yaxis.show=true}}if(!ax.label){ax.label="Series "+(at+1).toString()}this.series.push(ax);for(var ar=0;ar<L.jqplot.postParseSeriesOptionsHooks.length;ar++){L.jqplot.postParseSeriesOptionsHooks[ar].call(this.series[at],this.options.seriesDefaults,this.options.series[at])}for(var ar=0;ar<this.postParseSeriesOptionsHooks.hooks.length;ar++){this.postParseSeriesOptionsHooks.hooks[ar].call(this.series[at],this.options.seriesDefaults,this.options.series[at])}}L.extend(true,this.grid,this.options.grid);for(var at=0,aq=U.length;at<aq;at++){var an=U[at];var ap=this.axes[an];if(ap.borderWidth==null){ap.borderWidth=this.grid.borderWidth}}if(typeof this.options.title=="string"){this.title.text=this.options.title}else{if(typeof this.options.title=="object"){L.extend(true,this.title,this.options.title)}}this.title._plotWidth=this._width;this.legend.setOptions(this.options.legend);for(var at=0;at<L.jqplot.postParseOptionsHooks.length;at++){L.jqplot.postParseOptionsHooks[at].call(this,ay)}for(var at=0;at<this.postParseOptionsHooks.hooks.length;at++){this.postParseOptionsHooks.hooks[at].call(this,ay)}};this.destroy=function(){this.canvasManager.freeAllCanvases();if(this.eventCanvas&&this.eventCanvas._elem){this.eventCanvas._elem.unbind()}this.target.empty();this.target[0].innerHTML=""};this.replot=function(am){var an=am||{};var ap=an.data||null;var al=(an.clear===false)?false:true;var ao=an.resetAxes||false;delete an.data;delete an.clear;delete an.resetAxes;this.target.trigger("jqplotPreReplot");if(al){this.destroy()}if(ap||!L.isEmptyObject(an)){this.reInitialize(ap,an)}else{this.quickInit()}if(ao){this.resetAxesScale(ao,an.axes)}this.draw();this.target.trigger("jqplotPostReplot")};this.redraw=function(al){al=(al!=null)?al:true;this.target.trigger("jqplotPreRedraw");if(al){this.canvasManager.freeAllCanvases();this.eventCanvas._elem.unbind();this.target.empty()}for(var an in this.axes){this.axes[an]._ticks=[]}this.computePlotData();this._sumy=0;this._sumx=0;for(var am=0,ao=this.series.length;am<ao;am++){this._sumy+=this.series[am]._sumy;this._sumx+=this.series[am]._sumx}this.draw();this.target.trigger("jqplotPostRedraw")};this.draw=function(){if(this.drawIfHidden||this.target.is(":visible")){this.target.trigger("jqplotPreDraw");var aH,aF,aE,ao;for(aH=0,aE=L.jqplot.preDrawHooks.length;aH<aE;aH++){L.jqplot.preDrawHooks[aH].call(this)}for(aH=0,aE=this.preDrawHooks.hooks.length;aH<aE;aH++){this.preDrawHooks.hooks[aH].apply(this,this.preDrawSeriesHooks.args[aH])}this.target.append(this.baseCanvas.createElement({left:0,right:0,top:0,bottom:0},"jqplot-base-canvas",null,this));this.baseCanvas.setContext();this.target.append(this.title.draw());this.title.pack({top:0,left:0});var aL=this.legend.draw({},this);var al={top:0,left:0,bottom:0,right:0};if(this.legend.placement=="outsideGrid"){this.target.append(aL);switch(this.legend.location){case"n":al.top+=this.legend.getHeight();break;case"s":al.bottom+=this.legend.getHeight();break;case"ne":case"e":case"se":al.right+=this.legend.getWidth();break;case"nw":case"w":case"sw":al.left+=this.legend.getWidth();break;default:al.right+=this.legend.getWidth();break}aL=aL.detach()}var ar=this.axes;var aM;for(aH=0;aH<12;aH++){aM=U[aH];this.target.append(ar[aM].draw(this.baseCanvas._ctx,this));ar[aM].set()}if(ar.yaxis.show){al.left+=ar.yaxis.getWidth()}var aG=["y2axis","y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis"];var az=[0,0,0,0,0,0,0,0];var aC=0;var aB;for(aB=0;aB<8;aB++){if(ar[aG[aB]].show){aC+=ar[aG[aB]].getWidth();az[aB]=aC}}al.right+=aC;if(ar.x2axis.show){al.top+=ar.x2axis.getHeight()}if(this.title.show){al.top+=this.title.getHeight()}if(ar.xaxis.show){al.bottom+=ar.xaxis.getHeight()}if(this.options.gridDimensions&&L.isPlainObject(this.options.gridDimensions)){var at=parseInt(this.options.gridDimensions.width,10)||0;var aI=parseInt(this.options.gridDimensions.height,10)||0;var an=(this._width-al.left-al.right-at)/2;var aK=(this._height-al.top-al.bottom-aI)/2;if(aK>=0&&an>=0){al.top+=aK;al.bottom+=aK;al.left+=an;al.right+=an}}var am=["top","bottom","left","right"];for(var aB in am){if(this._gridPadding[am[aB]]==null&&al[am[aB]]>0){this._gridPadding[am[aB]]=al[am[aB]]}else{if(this._gridPadding[am[aB]]==null){this._gridPadding[am[aB]]=this._defaultGridPadding[am[aB]]}}}var aA=this._gridPadding;if(this.legend.placement==="outsideGrid"){aA={top:this.title.getHeight(),left:0,right:0,bottom:0};if(this.legend.location==="s"){aA.left=this._gridPadding.left;aA.right=this._gridPadding.right}}ar.xaxis.pack({position:"absolute",bottom:this._gridPadding.bottom-ar.xaxis.getHeight(),left:0,width:this._width},{min:this._gridPadding.left,max:this._width-this._gridPadding.right});ar.yaxis.pack({position:"absolute",top:0,left:this._gridPadding.left-ar.yaxis.getWidth(),height:this._height},{min:this._height-this._gridPadding.bottom,max:this._gridPadding.top});ar.x2axis.pack({position:"absolute",top:this._gridPadding.top-ar.x2axis.getHeight(),left:0,width:this._width},{min:this._gridPadding.left,max:this._width-this._gridPadding.right});for(aH=8;aH>0;aH--){ar[aG[aH-1]].pack({position:"absolute",top:0,right:this._gridPadding.right-az[aH-1]},{min:this._height-this._gridPadding.bottom,max:this._gridPadding.top})}var au=(this._width-this._gridPadding.left-this._gridPadding.right)/2+this._gridPadding.left-ar.yMidAxis.getWidth()/2;ar.yMidAxis.pack({position:"absolute",top:0,left:au,zIndex:9,textAlign:"center"},{min:this._height-this._gridPadding.bottom,max:this._gridPadding.top});this.target.append(this.grid.createElement(this._gridPadding,this));this.grid.draw();var aq=this.series;var aJ=aq.length;for(aH=0,aE=aJ;aH<aE;aH++){aF=this.seriesStack[aH];this.target.append(aq[aF].shadowCanvas.createElement(this._gridPadding,"jqplot-series-shadowCanvas",null,this));aq[aF].shadowCanvas.setContext();aq[aF].shadowCanvas._elem.data("seriesIndex",aF)}for(aH=0,aE=aJ;aH<aE;aH++){aF=this.seriesStack[aH];this.target.append(aq[aF].canvas.createElement(this._gridPadding,"jqplot-series-canvas",null,this));aq[aF].canvas.setContext();aq[aF].canvas._elem.data("seriesIndex",aF)}this.target.append(this.eventCanvas.createElement(this._gridPadding,"jqplot-event-canvas",null,this));this.eventCanvas.setContext();this.eventCanvas._ctx.fillStyle="rgba(0,0,0,0)";this.eventCanvas._ctx.fillRect(0,0,this.eventCanvas._ctx.canvas.width,this.eventCanvas._ctx.canvas.height);this.bindCustomEvents();if(this.legend.preDraw){this.eventCanvas._elem.before(aL);this.legend.pack(aA);if(this.legend._elem){this.drawSeries({legendInfo:{location:this.legend.location,placement:this.legend.placement,width:this.legend.getWidth(),height:this.legend.getHeight(),xoffset:this.legend.xoffset,yoffset:this.legend.yoffset}})}else{this.drawSeries()}}else{this.drawSeries();if(aJ){L(aq[aJ-1].canvas._elem).after(aL)}this.legend.pack(aA)}for(var aH=0,aE=L.jqplot.eventListenerHooks.length;aH<aE;aH++){this.eventCanvas._elem.bind(L.jqplot.eventListenerHooks[aH][0],{plot:this},L.jqplot.eventListenerHooks[aH][1])}for(var aH=0,aE=this.eventListenerHooks.hooks.length;aH<aE;aH++){this.eventCanvas._elem.bind(this.eventListenerHooks.hooks[aH][0],{plot:this},this.eventListenerHooks.hooks[aH][1])}var ay=this.fillBetween;if(ay.fill&&ay.series1!==ay.series2&&ay.series1<aJ&&ay.series2<aJ&&aq[ay.series1]._type==="line"&&aq[ay.series2]._type==="line"){this.doFillBetweenLines()}for(var aH=0,aE=L.jqplot.postDrawHooks.length;aH<aE;aH++){L.jqplot.postDrawHooks[aH].call(this)}for(var aH=0,aE=this.postDrawHooks.hooks.length;aH<aE;aH++){this.postDrawHooks.hooks[aH].apply(this,this.postDrawHooks.args[aH])}if(this.target.is(":visible")){this._drawCount+=1}var av,aw,aD,ap;for(aH=0,aE=aJ;aH<aE;aH++){av=aq[aH];aw=av.renderer;aD=".jqplot-point-label.jqplot-series-"+aH;if(aw.animation&&aw.animation._supported&&aw.animation.show&&(this._drawCount<2||this.animateReplot)){ap=this.target.find(aD);ap.stop(true,true).hide();av.canvas._elem.stop(true,true).hide();av.shadowCanvas._elem.stop(true,true).hide();av.canvas._elem.jqplotEffect("blind",{mode:"show",direction:aw.animation.direction},aw.animation.speed);av.shadowCanvas._elem.jqplotEffect("blind",{mode:"show",direction:aw.animation.direction},aw.animation.speed);ap.fadeIn(aw.animation.speed*0.8)}}ap=null;this.target.trigger("jqplotPostDraw",[this])}};R.prototype.doFillBetweenLines=function(){var an=this.fillBetween;var ax=an.series1;var av=an.series2;var aw=(ax<av)?ax:av;var au=(av>ax)?av:ax;var ar=this.series[aw];var aq=this.series[au];if(aq.renderer.smooth){var ap=aq.renderer._smoothedData.slice(0).reverse()}else{var ap=aq.gridData.slice(0).reverse()}if(ar.renderer.smooth){var at=ar.renderer._smoothedData.concat(ap)}else{var at=ar.gridData.concat(ap)}var ao=(an.color!==null)?an.color:this.series[ax].fillColor;var ay=(an.baseSeries!==null)?an.baseSeries:aw;var am=this.series[ay].renderer.shapeRenderer;var al={fillStyle:ao,fill:true,closePath:true};am.draw(ar.shadowCanvas._ctx,at,al)};this.bindCustomEvents=function(){this.eventCanvas._elem.bind("click",{plot:this},this.onClick);this.eventCanvas._elem.bind("dblclick",{plot:this},this.onDblClick);this.eventCanvas._elem.bind("mousedown",{plot:this},this.onMouseDown);this.eventCanvas._elem.bind("mousemove",{plot:this},this.onMouseMove);this.eventCanvas._elem.bind("mouseenter",{plot:this},this.onMouseEnter);this.eventCanvas._elem.bind("mouseleave",{plot:this},this.onMouseLeave);if(this.captureRightClick){this.eventCanvas._elem.bind("mouseup",{plot:this},this.onRightClick);this.eventCanvas._elem.get(0).oncontextmenu=function(){return false}}else{this.eventCanvas._elem.bind("mouseup",{plot:this},this.onMouseUp)}};function ai(av){var au=av.data.plot;var ap=au.eventCanvas._elem.offset();var at={x:av.pageX-ap.left,y:av.pageY-ap.top};var aq={xaxis:null,yaxis:null,x2axis:null,y2axis:null,y3axis:null,y4axis:null,y5axis:null,y6axis:null,y7axis:null,y8axis:null,y9axis:null,yMidAxis:null};var ar=["xaxis","yaxis","x2axis","y2axis","y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis","yMidAxis"];var al=au.axes;var am,ao;for(am=11;am>0;am--){ao=ar[am-1];if(al[ao].show){aq[ao]=al[ao].series_p2u(at[ao.charAt(0)])}}return{offsets:ap,gridPos:at,dataPos:aq}}function ak(al,am){var aq=am.series;var aW,aU,aT,aO,aP,aJ,aI,aw,au,az,aA,aK;var aS,aX,aQ,ar,aH,aM,aV;var an,aN;for(aT=am.seriesStack.length-1;aT>=0;aT--){aW=am.seriesStack[aT];aO=aq[aW];aV=aO._highlightThreshold;switch(aO.renderer.constructor){case L.jqplot.BarRenderer:aJ=al.x;aI=al.y;for(aU=0;aU<aO._barPoints.length;aU++){aH=aO._barPoints[aU];aQ=aO.gridData[aU];if(aJ>aH[0][0]&&aJ<aH[2][0]&&aI>aH[2][1]&&aI<aH[0][1]){return{seriesIndex:aO.index,pointIndex:aU,gridData:aQ,data:aO.data[aU],points:aO._barPoints[aU]}}}break;case L.jqplot.PyramidRenderer:aJ=al.x;aI=al.y;for(aU=0;aU<aO._barPoints.length;aU++){aH=aO._barPoints[aU];aQ=aO.gridData[aU];if(aJ>aH[0][0]+aV[0][0]&&aJ<aH[2][0]+aV[2][0]&&aI>aH[2][1]&&aI<aH[0][1]){return{seriesIndex:aO.index,pointIndex:aU,gridData:aQ,data:aO.data[aU],points:aO._barPoints[aU]}}}break;case L.jqplot.DonutRenderer:az=aO.startAngle/180*Math.PI;aJ=al.x-aO._center[0];aI=al.y-aO._center[1];aP=Math.sqrt(Math.pow(aJ,2)+Math.pow(aI,2));if(aJ>0&&-aI>=0){aw=2*Math.PI-Math.atan(-aI/aJ)}else{if(aJ>0&&-aI<0){aw=-Math.atan(-aI/aJ)}else{if(aJ<0){aw=Math.PI-Math.atan(-aI/aJ)}else{if(aJ==0&&-aI>0){aw=3*Math.PI/2}else{if(aJ==0&&-aI<0){aw=Math.PI/2}else{if(aJ==0&&aI==0){aw=0}}}}}}if(az){aw-=az;if(aw<0){aw+=2*Math.PI}else{if(aw>2*Math.PI){aw-=2*Math.PI}}}au=aO.sliceMargin/180*Math.PI;if(aP<aO._radius&&aP>aO._innerRadius){for(aU=0;aU<aO.gridData.length;aU++){aA=(aU>0)?aO.gridData[aU-1][1]+au:au;aK=aO.gridData[aU][1];if(aw>aA&&aw<aK){return{seriesIndex:aO.index,pointIndex:aU,gridData:[al.x,al.y],data:aO.data[aU]}}}}break;case L.jqplot.PieRenderer:az=aO.startAngle/180*Math.PI;aJ=al.x-aO._center[0];aI=al.y-aO._center[1];aP=Math.sqrt(Math.pow(aJ,2)+Math.pow(aI,2));if(aJ>0&&-aI>=0){aw=2*Math.PI-Math.atan(-aI/aJ)}else{if(aJ>0&&-aI<0){aw=-Math.atan(-aI/aJ)}else{if(aJ<0){aw=Math.PI-Math.atan(-aI/aJ)}else{if(aJ==0&&-aI>0){aw=3*Math.PI/2}else{if(aJ==0&&-aI<0){aw=Math.PI/2}else{if(aJ==0&&aI==0){aw=0}}}}}}if(az){aw-=az;if(aw<0){aw+=2*Math.PI}else{if(aw>2*Math.PI){aw-=2*Math.PI}}}au=aO.sliceMargin/180*Math.PI;if(aP<aO._radius){for(aU=0;aU<aO.gridData.length;aU++){aA=(aU>0)?aO.gridData[aU-1][1]+au:au;aK=aO.gridData[aU][1];if(aw>aA&&aw<aK){return{seriesIndex:aO.index,pointIndex:aU,gridData:[al.x,al.y],data:aO.data[aU]}}}}break;case L.jqplot.BubbleRenderer:aJ=al.x;aI=al.y;var aF=null;if(aO.show){for(var aU=0;aU<aO.gridData.length;aU++){aQ=aO.gridData[aU];aX=Math.sqrt((aJ-aQ[0])*(aJ-aQ[0])+(aI-aQ[1])*(aI-aQ[1]));if(aX<=aQ[2]&&(aX<=aS||aS==null)){aS=aX;aF={seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}if(aF!=null){return aF}}break;case L.jqplot.FunnelRenderer:aJ=al.x;aI=al.y;var aL=aO._vertices,ap=aL[0],ao=aL[aL.length-1],at,aE,ay;function aR(a0,a2,a1){var aZ=(a2[1]-a1[1])/(a2[0]-a1[0]);var aY=a2[1]-aZ*a2[0];var a3=a0+a2[1];return[(a3-aY)/aZ,a3]}at=aR(aI,ap[0],ao[3]);aE=aR(aI,ap[1],ao[2]);for(aU=0;aU<aL.length;aU++){ay=aL[aU];if(aI>=ay[0][1]&&aI<=ay[3][1]&&aJ>=at[0]&&aJ<=aE[0]){return{seriesIndex:aO.index,pointIndex:aU,gridData:null,data:aO.data[aU]}}}break;case L.jqplot.LineRenderer:aJ=al.x;aI=al.y;aP=aO.renderer;if(aO.show){if((aO.fill||(aO.renderer.bands.show&&aO.renderer.bands.fill))&&(!am.plugins.highlighter||!am.plugins.highlighter.show)){var ax=false;if(aJ>aO._boundingBox[0][0]&&aJ<aO._boundingBox[1][0]&&aI>aO._boundingBox[1][1]&&aI<aO._boundingBox[0][1]){var aD=aO._areaPoints.length;var aG;var aU=aD-1;for(var aG=0;aG<aD;aG++){var aC=[aO._areaPoints[aG][0],aO._areaPoints[aG][1]];var aB=[aO._areaPoints[aU][0],aO._areaPoints[aU][1]];if(aC[1]<aI&&aB[1]>=aI||aB[1]<aI&&aC[1]>=aI){if(aC[0]+(aI-aC[1])/(aB[1]-aC[1])*(aB[0]-aC[0])<aJ){ax=!ax}}aU=aG}}if(ax){return{seriesIndex:aW,pointIndex:null,gridData:aO.gridData,data:aO.data,points:aO._areaPoints}}break}else{aN=aO.markerRenderer.size/2+aO.neighborThreshold;an=(aN>0)?aN:0;for(var aU=0;aU<aO.gridData.length;aU++){aQ=aO.gridData[aU];if(aP.constructor==L.jqplot.OHLCRenderer){if(aP.candleStick){var av=aO._yaxis.series_u2p;if(aJ>=aQ[0]-aP._bodyWidth/2&&aJ<=aQ[0]+aP._bodyWidth/2&&aI>=av(aO.data[aU][2])&&aI<=av(aO.data[aU][3])){return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}else{if(!aP.hlc){var av=aO._yaxis.series_u2p;if(aJ>=aQ[0]-aP._tickLength&&aJ<=aQ[0]+aP._tickLength&&aI>=av(aO.data[aU][2])&&aI<=av(aO.data[aU][3])){return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}else{var av=aO._yaxis.series_u2p;if(aJ>=aQ[0]-aP._tickLength&&aJ<=aQ[0]+aP._tickLength&&aI>=av(aO.data[aU][1])&&aI<=av(aO.data[aU][2])){return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}}}else{if(aQ[0]!=null&&aQ[1]!=null){aX=Math.sqrt((aJ-aQ[0])*(aJ-aQ[0])+(aI-aQ[1])*(aI-aQ[1]));if(aX<=an&&(aX<=aS||aS==null)){aS=aX;return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}}}}}break;default:aJ=al.x;aI=al.y;aP=aO.renderer;if(aO.show){aN=aO.markerRenderer.size/2+aO.neighborThreshold;an=(aN>0)?aN:0;for(var aU=0;aU<aO.gridData.length;aU++){aQ=aO.gridData[aU];if(aP.constructor==L.jqplot.OHLCRenderer){if(aP.candleStick){var av=aO._yaxis.series_u2p;if(aJ>=aQ[0]-aP._bodyWidth/2&&aJ<=aQ[0]+aP._bodyWidth/2&&aI>=av(aO.data[aU][2])&&aI<=av(aO.data[aU][3])){return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}else{if(!aP.hlc){var av=aO._yaxis.series_u2p;if(aJ>=aQ[0]-aP._tickLength&&aJ<=aQ[0]+aP._tickLength&&aI>=av(aO.data[aU][2])&&aI<=av(aO.data[aU][3])){return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}else{var av=aO._yaxis.series_u2p;if(aJ>=aQ[0]-aP._tickLength&&aJ<=aQ[0]+aP._tickLength&&aI>=av(aO.data[aU][1])&&aI<=av(aO.data[aU][2])){return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}}}else{aX=Math.sqrt((aJ-aQ[0])*(aJ-aQ[0])+(aI-aQ[1])*(aI-aQ[1]));if(aX<=an&&(aX<=aS||aS==null)){aS=aX;return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}}}break}}return null}this.onClick=function(an){var am=ai(an);var ap=an.data.plot;var ao=ak(am.gridPos,ap);var al=L.Event("jqplotClick");al.pageX=an.pageX;al.pageY=an.pageY;L(this).trigger(al,[am.gridPos,am.dataPos,ao,ap])};this.onDblClick=function(an){var am=ai(an);var ap=an.data.plot;var ao=ak(am.gridPos,ap);var al=L.Event("jqplotDblClick");al.pageX=an.pageX;al.pageY=an.pageY;L(this).trigger(al,[am.gridPos,am.dataPos,ao,ap])};this.onMouseDown=function(an){var am=ai(an);var ap=an.data.plot;var ao=ak(am.gridPos,ap);var al=L.Event("jqplotMouseDown");al.pageX=an.pageX;al.pageY=an.pageY;L(this).trigger(al,[am.gridPos,am.dataPos,ao,ap])};this.onMouseUp=function(an){var am=ai(an);var al=L.Event("jqplotMouseUp");al.pageX=an.pageX;al.pageY=an.pageY;L(this).trigger(al,[am.gridPos,am.dataPos,null,an.data.plot])};this.onRightClick=function(an){var am=ai(an);var ap=an.data.plot;var ao=ak(am.gridPos,ap);if(ap.captureRightClick){if(an.which==3){var al=L.Event("jqplotRightClick");al.pageX=an.pageX;al.pageY=an.pageY;L(this).trigger(al,[am.gridPos,am.dataPos,ao,ap])}else{var al=L.Event("jqplotMouseUp");al.pageX=an.pageX;al.pageY=an.pageY;L(this).trigger(al,[am.gridPos,am.dataPos,ao,ap])}}};this.onMouseMove=function(an){var am=ai(an);var ap=an.data.plot;var ao=ak(am.gridPos,ap);var al=L.Event("jqplotMouseMove");al.pageX=an.pageX;al.pageY=an.pageY;L(this).trigger(al,[am.gridPos,am.dataPos,ao,ap])};this.onMouseEnter=function(an){var am=ai(an);var ao=an.data.plot;var al=L.Event("jqplotMouseEnter");al.pageX=an.pageX;al.pageY=an.pageY;al.relatedTarget=an.relatedTarget;L(this).trigger(al,[am.gridPos,am.dataPos,null,ao])};this.onMouseLeave=function(an){var am=ai(an);var ao=an.data.plot;var al=L.Event("jqplotMouseLeave");al.pageX=an.pageX;al.pageY=an.pageY;al.relatedTarget=an.relatedTarget;L(this).trigger(al,[am.gridPos,am.dataPos,null,ao])};this.drawSeries=function(an,al){var ap,ao,am;al=(typeof(an)==="number"&&al==null)?an:al;an=(typeof(an)==="object")?an:{};if(al!=u){ao=this.series[al];am=ao.shadowCanvas._ctx;am.clearRect(0,0,am.canvas.width,am.canvas.height);ao.drawShadow(am,an,this);am=ao.canvas._ctx;am.clearRect(0,0,am.canvas.width,am.canvas.height);ao.draw(am,an,this);if(ao.renderer.constructor==L.jqplot.BezierCurveRenderer){if(al<this.series.length-1){this.drawSeries(al+1)}}}else{for(ap=0;ap<this.series.length;ap++){ao=this.series[ap];am=ao.shadowCanvas._ctx;am.clearRect(0,0,am.canvas.width,am.canvas.height);ao.drawShadow(am,an,this);am=ao.canvas._ctx;am.clearRect(0,0,am.canvas.width,am.canvas.height);ao.draw(am,an,this)}}an=al=ap=ao=am=null};this.moveSeriesToFront=function(am){am=parseInt(am,10);var ap=L.inArray(am,this.seriesStack);if(ap==-1){return}if(ap==this.seriesStack.length-1){this.previousSeriesStack=this.seriesStack.slice(0);return}var al=this.seriesStack[this.seriesStack.length-1];var ao=this.series[am].canvas._elem.detach();var an=this.series[am].shadowCanvas._elem.detach();this.series[al].shadowCanvas._elem.after(an);this.series[al].canvas._elem.after(ao);this.previousSeriesStack=this.seriesStack.slice(0);this.seriesStack.splice(ap,1);this.seriesStack.push(am)};this.moveSeriesToBack=function(am){am=parseInt(am,10);var ap=L.inArray(am,this.seriesStack);if(ap==0||ap==-1){return}var al=this.seriesStack[0];var ao=this.series[am].canvas._elem.detach();var an=this.series[am].shadowCanvas._elem.detach();this.series[al].shadowCanvas._elem.before(an);this.series[al].canvas._elem.before(ao);this.previousSeriesStack=this.seriesStack.slice(0);this.seriesStack.splice(ap,1);this.seriesStack.unshift(am)};this.restorePreviousSeriesOrder=function(){var ar,aq,ap,ao,an,al,am;if(this.seriesStack==this.previousSeriesStack){return}for(ar=1;ar<this.previousSeriesStack.length;ar++){al=this.previousSeriesStack[ar];am=this.previousSeriesStack[ar-1];ap=this.series[al].canvas._elem.detach();ao=this.series[al].shadowCanvas._elem.detach();this.series[am].shadowCanvas._elem.after(ao);this.series[am].canvas._elem.after(ap)}an=this.seriesStack.slice(0);this.seriesStack=this.previousSeriesStack.slice(0);this.previousSeriesStack=an};this.restoreOriginalSeriesOrder=function(){var ap,ao,al=[],an,am;for(ap=0;ap<this.series.length;ap++){al.push(ap)}if(this.seriesStack==al){return}this.previousSeriesStack=this.seriesStack.slice(0);this.seriesStack=al;for(ap=1;ap<this.seriesStack.length;ap++){an=this.series[ap].canvas._elem.detach();am=this.series[ap].shadowCanvas._elem.detach();this.series[ap-1].shadowCanvas._elem.after(am);this.series[ap-1].canvas._elem.after(an)}};this.activateTheme=function(al){this.themeEngine.activate(this,al)}}L.jqplot.computeHighlightColors=function(ai){var ak;if(L.isArray(ai)){ak=[];for(var am=0;am<ai.length;am++){var al=L.jqplot.getColorComponents(ai[am]);var ah=[al[0],al[1],al[2]];var an=ah[0]+ah[1]+ah[2];for(var aj=0;aj<3;aj++){ah[aj]=(an>660)?ah[aj]*0.85:0.73*ah[aj]+90;ah[aj]=parseInt(ah[aj],10);(ah[aj]>255)?255:ah[aj]}ah[3]=0.3+0.35*al[3];ak.push("rgba("+ah[0]+","+ah[1]+","+ah[2]+","+ah[3]+")")}}else{var al=L.jqplot.getColorComponents(ai);var ah=[al[0],al[1],al[2]];var an=ah[0]+ah[1]+ah[2];for(var aj=0;aj<3;aj++){ah[aj]=(an>660)?ah[aj]*0.85:0.73*ah[aj]+90;ah[aj]=parseInt(ah[aj],10);(ah[aj]>255)?255:ah[aj]}ah[3]=0.3+0.35*al[3];ak="rgba("+ah[0]+","+ah[1]+","+ah[2]+","+ah[3]+")"}return ak};L.jqplot.ColorGenerator=function(ai){ai=ai||L.jqplot.config.defaultColors;var ah=0;this.next=function(){if(ah<ai.length){return ai[ah++]}else{ah=0;return ai[ah++]}};this.previous=function(){if(ah>0){return ai[ah--]}else{ah=ai.length-1;return ai[ah]}};this.get=function(ak){var aj=ak-ai.length*Math.floor(ak/ai.length);return ai[aj]};this.setColors=function(aj){ai=aj};this.reset=function(){ah=0};this.getIndex=function(){return ah};this.setIndex=function(aj){ah=aj}};L.jqplot.hex2rgb=function(aj,ah){aj=aj.replace("#","");if(aj.length==3){aj=aj.charAt(0)+aj.charAt(0)+aj.charAt(1)+aj.charAt(1)+aj.charAt(2)+aj.charAt(2)}var ai;ai="rgba("+parseInt(aj.slice(0,2),16)+", "+parseInt(aj.slice(2,4),16)+", "+parseInt(aj.slice(4,6),16);if(ah){ai+=", "+ah}ai+=")";return ai};L.jqplot.rgb2hex=function(am){var aj=/rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *(?:, *[0-9.]*)?\)/;var ah=am.match(aj);var al="#";for(var ak=1;ak<4;ak++){var ai;if(ah[ak].search(/%/)!=-1){ai=parseInt(255*ah[ak]/100,10).toString(16);if(ai.length==1){ai="0"+ai}}else{ai=parseInt(ah[ak],10).toString(16);if(ai.length==1){ai="0"+ai}}al+=ai}return al};L.jqplot.normalize2rgb=function(ai,ah){if(ai.search(/^ *rgba?\(/)!=-1){return ai}else{if(ai.search(/^ *#?[0-9a-fA-F]?[0-9a-fA-F]/)!=-1){return L.jqplot.hex2rgb(ai,ah)}else{throw new Error("Invalid color spec")}}};L.jqplot.getColorComponents=function(am){am=L.jqplot.colorKeywordMap[am]||am;var ak=L.jqplot.normalize2rgb(am);var aj=/rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *,? *([0-9.]* *)?\)/;var ah=ak.match(aj);var ai=[];for(var al=1;al<4;al++){if(ah[al].search(/%/)!=-1){ai[al-1]=parseInt(255*ah[al]/100,10)}else{ai[al-1]=parseInt(ah[al],10)}}ai[3]=parseFloat(ah[4])?parseFloat(ah[4]):1;return ai};L.jqplot.colorKeywordMap={aliceblue:"rgb(240, 248, 255)",antiquewhite:"rgb(250, 235, 215)",aqua:"rgb( 0, 255, 255)",aquamarine:"rgb(127, 255, 212)",azure:"rgb(240, 255, 255)",beige:"rgb(245, 245, 220)",bisque:"rgb(255, 228, 196)",black:"rgb( 0, 0, 0)",blanchedalmond:"rgb(255, 235, 205)",blue:"rgb( 0, 0, 255)",blueviolet:"rgb(138, 43, 226)",brown:"rgb(165, 42, 42)",burlywood:"rgb(222, 184, 135)",cadetblue:"rgb( 95, 158, 160)",chartreuse:"rgb(127, 255, 0)",chocolate:"rgb(210, 105, 30)",coral:"rgb(255, 127, 80)",cornflowerblue:"rgb(100, 149, 237)",cornsilk:"rgb(255, 248, 220)",crimson:"rgb(220, 20, 60)",cyan:"rgb( 0, 255, 255)",darkblue:"rgb( 0, 0, 139)",darkcyan:"rgb( 0, 139, 139)",darkgoldenrod:"rgb(184, 134, 11)",darkgray:"rgb(169, 169, 169)",darkgreen:"rgb( 0, 100, 0)",darkgrey:"rgb(169, 169, 169)",darkkhaki:"rgb(189, 183, 107)",darkmagenta:"rgb(139, 0, 139)",darkolivegreen:"rgb( 85, 107, 47)",darkorange:"rgb(255, 140, 0)",darkorchid:"rgb(153, 50, 204)",darkred:"rgb(139, 0, 0)",darksalmon:"rgb(233, 150, 122)",darkseagreen:"rgb(143, 188, 143)",darkslateblue:"rgb( 72, 61, 139)",darkslategray:"rgb( 47, 79, 79)",darkslategrey:"rgb( 47, 79, 79)",darkturquoise:"rgb( 0, 206, 209)",darkviolet:"rgb(148, 0, 211)",deeppink:"rgb(255, 20, 147)",deepskyblue:"rgb( 0, 191, 255)",dimgray:"rgb(105, 105, 105)",dimgrey:"rgb(105, 105, 105)",dodgerblue:"rgb( 30, 144, 255)",firebrick:"rgb(178, 34, 34)",floralwhite:"rgb(255, 250, 240)",forestgreen:"rgb( 34, 139, 34)",fuchsia:"rgb(255, 0, 255)",gainsboro:"rgb(220, 220, 220)",ghostwhite:"rgb(248, 248, 255)",gold:"rgb(255, 215, 0)",goldenrod:"rgb(218, 165, 32)",gray:"rgb(128, 128, 128)",grey:"rgb(128, 128, 128)",green:"rgb( 0, 128, 0)",greenyellow:"rgb(173, 255, 47)",honeydew:"rgb(240, 255, 240)",hotpink:"rgb(255, 105, 180)",indianred:"rgb(205, 92, 92)",indigo:"rgb( 75, 0, 130)",ivory:"rgb(255, 255, 240)",khaki:"rgb(240, 230, 140)",lavender:"rgb(230, 230, 250)",lavenderblush:"rgb(255, 240, 245)",lawngreen:"rgb(124, 252, 0)",lemonchiffon:"rgb(255, 250, 205)",lightblue:"rgb(173, 216, 230)",lightcoral:"rgb(240, 128, 128)",lightcyan:"rgb(224, 255, 255)",lightgoldenrodyellow:"rgb(250, 250, 210)",lightgray:"rgb(211, 211, 211)",lightgreen:"rgb(144, 238, 144)",lightgrey:"rgb(211, 211, 211)",lightpink:"rgb(255, 182, 193)",lightsalmon:"rgb(255, 160, 122)",lightseagreen:"rgb( 32, 178, 170)",lightskyblue:"rgb(135, 206, 250)",lightslategray:"rgb(119, 136, 153)",lightslategrey:"rgb(119, 136, 153)",lightsteelblue:"rgb(176, 196, 222)",lightyellow:"rgb(255, 255, 224)",lime:"rgb( 0, 255, 0)",limegreen:"rgb( 50, 205, 50)",linen:"rgb(250, 240, 230)",magenta:"rgb(255, 0, 255)",maroon:"rgb(128, 0, 0)",mediumaquamarine:"rgb(102, 205, 170)",mediumblue:"rgb( 0, 0, 205)",mediumorchid:"rgb(186, 85, 211)",mediumpurple:"rgb(147, 112, 219)",mediumseagreen:"rgb( 60, 179, 113)",mediumslateblue:"rgb(123, 104, 238)",mediumspringgreen:"rgb( 0, 250, 154)",mediumturquoise:"rgb( 72, 209, 204)",mediumvioletred:"rgb(199, 21, 133)",midnightblue:"rgb( 25, 25, 112)",mintcream:"rgb(245, 255, 250)",mistyrose:"rgb(255, 228, 225)",moccasin:"rgb(255, 228, 181)",navajowhite:"rgb(255, 222, 173)",navy:"rgb( 0, 0, 128)",oldlace:"rgb(253, 245, 230)",olive:"rgb(128, 128, 0)",olivedrab:"rgb(107, 142, 35)",orange:"rgb(255, 165, 0)",orangered:"rgb(255, 69, 0)",orchid:"rgb(218, 112, 214)",palegoldenrod:"rgb(238, 232, 170)",palegreen:"rgb(152, 251, 152)",paleturquoise:"rgb(175, 238, 238)",palevioletred:"rgb(219, 112, 147)",papayawhip:"rgb(255, 239, 213)",peachpuff:"rgb(255, 218, 185)",peru:"rgb(205, 133, 63)",pink:"rgb(255, 192, 203)",plum:"rgb(221, 160, 221)",powderblue:"rgb(176, 224, 230)",purple:"rgb(128, 0, 128)",red:"rgb(255, 0, 0)",rosybrown:"rgb(188, 143, 143)",royalblue:"rgb( 65, 105, 225)",saddlebrown:"rgb(139, 69, 19)",salmon:"rgb(250, 128, 114)",sandybrown:"rgb(244, 164, 96)",seagreen:"rgb( 46, 139, 87)",seashell:"rgb(255, 245, 238)",sienna:"rgb(160, 82, 45)",silver:"rgb(192, 192, 192)",skyblue:"rgb(135, 206, 235)",slateblue:"rgb(106, 90, 205)",slategray:"rgb(112, 128, 144)",slategrey:"rgb(112, 128, 144)",snow:"rgb(255, 250, 250)",springgreen:"rgb( 0, 255, 127)",steelblue:"rgb( 70, 130, 180)",tan:"rgb(210, 180, 140)",teal:"rgb( 0, 128, 128)",thistle:"rgb(216, 191, 216)",tomato:"rgb(255, 99, 71)",turquoise:"rgb( 64, 224, 208)",violet:"rgb(238, 130, 238)",wheat:"rgb(245, 222, 179)",white:"rgb(255, 255, 255)",whitesmoke:"rgb(245, 245, 245)",yellow:"rgb(255, 255, 0)",yellowgreen:"rgb(154, 205, 50)"};L.jqplot.AxisLabelRenderer=function(ah){L.jqplot.ElemContainer.call(this);this.axis;this.show=true;this.label="";this.fontFamily=null;this.fontSize=null;this.textColor=null;this._elem;this.escapeHTML=false;L.extend(true,this,ah)};L.jqplot.AxisLabelRenderer.prototype=new L.jqplot.ElemContainer();L.jqplot.AxisLabelRenderer.prototype.constructor=L.jqplot.AxisLabelRenderer;L.jqplot.AxisLabelRenderer.prototype.init=function(ah){L.extend(true,this,ah)};L.jqplot.AxisLabelRenderer.prototype.draw=function(ah,ai){if(this._elem){this._elem.emptyForce();this._elem=null}this._elem=L('<div style="position:absolute;" class="jqplot-'+this.axis+'-label"></div>');if(Number(this.label)){this._elem.css("white-space","nowrap")}if(!this.escapeHTML){this._elem.html(this.label)}else{this._elem.text(this.label)}if(this.fontFamily){this._elem.css("font-family",this.fontFamily)}if(this.fontSize){this._elem.css("font-size",this.fontSize)}if(this.textColor){this._elem.css("color",this.textColor)}return this._elem};L.jqplot.AxisLabelRenderer.prototype.pack=function(){};L.jqplot.AxisTickRenderer=function(ah){L.jqplot.ElemContainer.call(this);this.mark="outside";this.axis;this.showMark=true;this.showGridline=true;this.isMinorTick=false;this.size=4;this.markSize=6;this.show=true;this.showLabel=true;this.label=null;this.value=null;this._styles={};this.formatter=L.jqplot.DefaultTickFormatter;this.prefix="";this.suffix="";this.formatString="";this.fontFamily;this.fontSize;this.textColor;this.escapeHTML=false;this._elem;this._breakTick=false;L.extend(true,this,ah)};L.jqplot.AxisTickRenderer.prototype.init=function(ah){L.extend(true,this,ah)};L.jqplot.AxisTickRenderer.prototype=new L.jqplot.ElemContainer();L.jqplot.AxisTickRenderer.prototype.constructor=L.jqplot.AxisTickRenderer;L.jqplot.AxisTickRenderer.prototype.setTick=function(ah,aj,ai){this.value=ah;this.axis=aj;if(ai){this.isMinorTick=true}return this};L.jqplot.AxisTickRenderer.prototype.draw=function(){if(this.label===null){this.label=this.prefix+this.formatter(this.formatString,this.value)+this.suffix}var ai={position:"absolute"};if(Number(this.label)){ai.whitSpace="nowrap"}if(this._elem){this._elem.emptyForce();this._elem=null}this._elem=L(document.createElement("div"));this._elem.addClass("jqplot-"+this.axis+"-tick");if(!this.escapeHTML){this._elem.html(this.label)}else{this._elem.text(this.label)}this._elem.css(ai);for(var ah in this._styles){this._elem.css(ah,this._styles[ah])}if(this.fontFamily){this._elem.css("font-family",this.fontFamily)}if(this.fontSize){this._elem.css("font-size",this.fontSize)}if(this.textColor){this._elem.css("color",this.textColor)}if(this._breakTick){this._elem.addClass("jqplot-breakTick")}return this._elem};L.jqplot.DefaultTickFormatter=function(ah,ai){if(typeof ai=="number"){if(!ah){ah=L.jqplot.config.defaultTickFormatString}return L.jqplot.sprintf(ah,ai)}else{return String(ai)}};L.jqplot.PercentTickFormatter=function(ah,ai){if(typeof ai=="number"){ai=100*ai;if(!ah){ah=L.jqplot.config.defaultTickFormatString}return L.jqplot.sprintf(ah,ai)}else{return String(ai)}};L.jqplot.AxisTickRenderer.prototype.pack=function(){};L.jqplot.CanvasGridRenderer=function(){this.shadowRenderer=new L.jqplot.ShadowRenderer()};L.jqplot.CanvasGridRenderer.prototype.init=function(ai){this._ctx;L.extend(true,this,ai);var ah={lineJoin:"miter",lineCap:"round",fill:false,isarc:false,angle:this.shadowAngle,offset:this.shadowOffset,alpha:this.shadowAlpha,depth:this.shadowDepth,lineWidth:this.shadowWidth,closePath:false,strokeStyle:this.shadowColor};this.renderer.shadowRenderer.init(ah)};L.jqplot.CanvasGridRenderer.prototype.createElement=function(ak){var aj;if(this._elem){if(L.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==u){aj=this._elem.get(0);window.G_vmlCanvasManager.uninitElement(aj);aj=null}this._elem.emptyForce();this._elem=null}aj=ak.canvasManager.getCanvas();var ah=this._plotDimensions.width;var ai=this._plotDimensions.height;aj.width=ah;aj.height=ai;this._elem=L(aj);this._elem.addClass("jqplot-grid-canvas");this._elem.css({position:"absolute",left:0,top:0});aj=ak.canvasManager.initCanvas(aj);this._top=this._offsets.top;this._bottom=ai-this._offsets.bottom;this._left=this._offsets.left;this._right=ah-this._offsets.right;this._width=this._right-this._left;this._height=this._bottom-this._top;aj=null;return this._elem};L.jqplot.CanvasGridRenderer.prototype.draw=function(){this._ctx=this._elem.get(0).getContext("2d");var at=this._ctx;var aw=this._axes;at.save();at.clearRect(0,0,this._plotDimensions.width,this._plotDimensions.height);at.fillStyle=this.backgroundColor||this.background;at.fillRect(this._left,this._top,this._width,this._height);at.save();at.lineJoin="miter";at.lineCap="butt";at.lineWidth=this.gridLineWidth;at.strokeStyle=this.gridLineColor;var aA,az,ap,aq;var am=["xaxis","yaxis","x2axis","y2axis"];for(var ay=4;ay>0;ay--){var aD=am[ay-1];var ah=aw[aD];var aB=ah._ticks;var ar=aB.length;if(ah.show){if(ah.drawBaseline){var aC={};if(ah.baselineWidth!==null){aC.lineWidth=ah.baselineWidth}if(ah.baselineColor!==null){aC.strokeStyle=ah.baselineColor}switch(aD){case"xaxis":ao(this._left,this._bottom,this._right,this._bottom,aC);break;case"yaxis":ao(this._left,this._bottom,this._left,this._top,aC);break;case"x2axis":ao(this._left,this._bottom,this._right,this._bottom,aC);break;case"y2axis":ao(this._right,this._bottom,this._right,this._top,aC);break}}for(var au=ar;au>0;au--){var an=aB[au-1];if(an.show){var ak=Math.round(ah.u2p(an.value))+0.5;switch(aD){case"xaxis":if(an.showGridline&&this.drawGridlines&&((!an.isMinorTick&&ah.drawMajorGridlines)||(an.isMinorTick&&ah.drawMinorGridlines))){ao(ak,this._top,ak,this._bottom)}if(an.showMark&&an.mark&&((!an.isMinorTick&&ah.drawMajorTickMarks)||(an.isMinorTick&&ah.drawMinorTickMarks))){ap=an.markSize;aq=an.mark;var ak=Math.round(ah.u2p(an.value))+0.5;switch(aq){case"outside":aA=this._bottom;az=this._bottom+ap;break;case"inside":aA=this._bottom-ap;az=this._bottom;break;case"cross":aA=this._bottom-ap;az=this._bottom+ap;break;default:aA=this._bottom;az=this._bottom+ap;break}if(this.shadow){this.renderer.shadowRenderer.draw(at,[[ak,aA],[ak,az]],{lineCap:"butt",lineWidth:this.gridLineWidth,offset:this.gridLineWidth*0.75,depth:2,fill:false,closePath:false})}ao(ak,aA,ak,az)}break;case"yaxis":if(an.showGridline&&this.drawGridlines&&((!an.isMinorTick&&ah.drawMajorGridlines)||(an.isMinorTick&&ah.drawMinorGridlines))){ao(this._right,ak,this._left,ak)}if(an.showMark&&an.mark&&((!an.isMinorTick&&ah.drawMajorTickMarks)||(an.isMinorTick&&ah.drawMinorTickMarks))){ap=an.markSize;aq=an.mark;var ak=Math.round(ah.u2p(an.value))+0.5;switch(aq){case"outside":aA=this._left-ap;az=this._left;break;case"inside":aA=this._left;az=this._left+ap;break;case"cross":aA=this._left-ap;az=this._left+ap;break;default:aA=this._left-ap;az=this._left;break}if(this.shadow){this.renderer.shadowRenderer.draw(at,[[aA,ak],[az,ak]],{lineCap:"butt",lineWidth:this.gridLineWidth*1.5,offset:this.gridLineWidth*0.75,fill:false,closePath:false})}ao(aA,ak,az,ak,{strokeStyle:ah.borderColor})}break;case"x2axis":if(an.showGridline&&this.drawGridlines&&((!an.isMinorTick&&ah.drawMajorGridlines)||(an.isMinorTick&&ah.drawMinorGridlines))){ao(ak,this._bottom,ak,this._top)}if(an.showMark&&an.mark&&((!an.isMinorTick&&ah.drawMajorTickMarks)||(an.isMinorTick&&ah.drawMinorTickMarks))){ap=an.markSize;aq=an.mark;var ak=Math.round(ah.u2p(an.value))+0.5;switch(aq){case"outside":aA=this._top-ap;az=this._top;break;case"inside":aA=this._top;az=this._top+ap;break;case"cross":aA=this._top-ap;az=this._top+ap;break;default:aA=this._top-ap;az=this._top;break}if(this.shadow){this.renderer.shadowRenderer.draw(at,[[ak,aA],[ak,az]],{lineCap:"butt",lineWidth:this.gridLineWidth,offset:this.gridLineWidth*0.75,depth:2,fill:false,closePath:false})}ao(ak,aA,ak,az)}break;case"y2axis":if(an.showGridline&&this.drawGridlines&&((!an.isMinorTick&&ah.drawMajorGridlines)||(an.isMinorTick&&ah.drawMinorGridlines))){ao(this._left,ak,this._right,ak)}if(an.showMark&&an.mark&&((!an.isMinorTick&&ah.drawMajorTickMarks)||(an.isMinorTick&&ah.drawMinorTickMarks))){ap=an.markSize;aq=an.mark;var ak=Math.round(ah.u2p(an.value))+0.5;switch(aq){case"outside":aA=this._right;az=this._right+ap;break;case"inside":aA=this._right-ap;az=this._right;break;case"cross":aA=this._right-ap;az=this._right+ap;break;default:aA=this._right;az=this._right+ap;break}if(this.shadow){this.renderer.shadowRenderer.draw(at,[[aA,ak],[az,ak]],{lineCap:"butt",lineWidth:this.gridLineWidth*1.5,offset:this.gridLineWidth*0.75,fill:false,closePath:false})}ao(aA,ak,az,ak,{strokeStyle:ah.borderColor})}break;default:break}}}an=null}ah=null;aB=null}am=["y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis","yMidAxis"];for(var ay=7;ay>0;ay--){var ah=aw[am[ay-1]];var aB=ah._ticks;if(ah.show){var ai=aB[ah.numberTicks-1];var al=aB[0];var aj=ah.getLeft();var av=[[aj,ai.getTop()+ai.getHeight()/2],[aj,al.getTop()+al.getHeight()/2+1]];if(this.shadow){this.renderer.shadowRenderer.draw(at,av,{lineCap:"butt",fill:false,closePath:false})}ao(av[0][0],av[0][1],av[1][0],av[1][1],{lineCap:"butt",strokeStyle:ah.borderColor,lineWidth:ah.borderWidth});for(var au=aB.length;au>0;au--){var an=aB[au-1];ap=an.markSize;aq=an.mark;var ak=Math.round(ah.u2p(an.value))+0.5;if(an.showMark&&an.mark){switch(aq){case"outside":aA=aj;az=aj+ap;break;case"inside":aA=aj-ap;az=aj;break;case"cross":aA=aj-ap;az=aj+ap;break;default:aA=aj;az=aj+ap;break}av=[[aA,ak],[az,ak]];if(this.shadow){this.renderer.shadowRenderer.draw(at,av,{lineCap:"butt",lineWidth:this.gridLineWidth*1.5,offset:this.gridLineWidth*0.75,fill:false,closePath:false})}ao(aA,ak,az,ak,{strokeStyle:ah.borderColor})}an=null}al=null}ah=null;aB=null}at.restore();function ao(aH,aG,aE,ax,aF){at.save();aF=aF||{};if(aF.lineWidth==null||aF.lineWidth!=0){L.extend(true,at,aF);at.beginPath();at.moveTo(aH,aG);at.lineTo(aE,ax);at.stroke();at.restore()}}if(this.shadow){var av=[[this._left,this._bottom],[this._right,this._bottom],[this._right,this._top]];this.renderer.shadowRenderer.draw(at,av)}if(this.borderWidth!=0&&this.drawBorder){ao(this._left,this._top,this._right,this._top,{lineCap:"round",strokeStyle:aw.x2axis.borderColor,lineWidth:aw.x2axis.borderWidth});ao(this._right,this._top,this._right,this._bottom,{lineCap:"round",strokeStyle:aw.y2axis.borderColor,lineWidth:aw.y2axis.borderWidth});ao(this._right,this._bottom,this._left,this._bottom,{lineCap:"round",strokeStyle:aw.xaxis.borderColor,lineWidth:aw.xaxis.borderWidth});ao(this._left,this._bottom,this._left,this._top,{lineCap:"round",strokeStyle:aw.yaxis.borderColor,lineWidth:aw.yaxis.borderWidth})}at.restore();at=null;aw=null};L.jqplot.DivTitleRenderer=function(){};L.jqplot.DivTitleRenderer.prototype.init=function(ah){L.extend(true,this,ah)};L.jqplot.DivTitleRenderer.prototype.draw=function(){if(this._elem){this._elem.emptyForce();this._elem=null}var ak=this.renderer;var aj=document.createElement("div");this._elem=L(aj);this._elem.addClass("jqplot-title");if(!this.text){this.show=false;this._elem.height(0);this._elem.width(0)}else{if(this.text){var ah;if(this.color){ah=this.color}else{if(this.textColor){ah=this.textColor}}var ai={position:"absolute",top:"0px",left:"0px"};if(this._plotWidth){ai.width=this._plotWidth+"px"}if(this.fontSize){ai.fontSize=this.fontSize}if(typeof this.textAlign==="string"){ai.textAlign=this.textAlign}else{ai.textAlign="center"}if(ah){ai.color=ah}if(this.paddingBottom){ai.paddingBottom=this.paddingBottom}if(this.fontFamily){ai.fontFamily=this.fontFamily}this._elem.css(ai);if(this.escapeHtml){this._elem.text(this.text)}else{this._elem.html(this.text)}}}aj=null;return this._elem};L.jqplot.DivTitleRenderer.prototype.pack=function(){};var r=0.1;L.jqplot.LinePattern=function(aw,aq){var ap={dotted:[r,L.jqplot.config.dotGapLength],dashed:[L.jqplot.config.dashLength,L.jqplot.config.gapLength],solid:null};if(typeof aq==="string"){if(aq[0]==="."||aq[0]==="-"){var ax=aq;aq=[];for(var ao=0,al=ax.length;ao<al;ao++){if(ax[ao]==="."){aq.push(r)}else{if(ax[ao]==="-"){aq.push(L.jqplot.config.dashLength)}else{continue}}aq.push(L.jqplot.config.gapLength)}}else{aq=ap[aq]}}if(!(aq&&aq.length)){return aw}var ak=0;var ar=aq[0];var au=0;var at=0;var an=0;var ah=0;var av=function(ay,az){aw.moveTo(ay,az);au=ay;at=az;an=ay;ah=az};var aj=function(ay,aE){var aC=aw.lineWidth;var aA=ay-au;var az=aE-at;var aB=Math.sqrt(aA*aA+az*az);if((aB>0)&&(aC>0)){aA/=aB;az/=aB;while(true){var aD=aC*ar;if(aD<aB){au+=aD*aA;at+=aD*az;if((ak&1)==0){aw.lineTo(au,at)}else{aw.moveTo(au,at)}aB-=aD;ak++;if(ak>=aq.length){ak=0}ar=aq[ak]}else{au=ay;at=aE;if((ak&1)==0){aw.lineTo(au,at)}else{aw.moveTo(au,at)}ar-=aB/aC;break}}}};var ai=function(){aw.beginPath()};var am=function(){aj(an,ah)};return{moveTo:av,lineTo:aj,beginPath:ai,closePath:am}};L.jqplot.LineRenderer=function(){this.shapeRenderer=new L.jqplot.ShapeRenderer();this.shadowRenderer=new L.jqplot.ShadowRenderer()};L.jqplot.LineRenderer.prototype.init=function(ai,an){ai=ai||{};this._type="line";this.renderer.animation={show:false,direction:"left",speed:2500,_supported:true};this.renderer.smooth=false;this.renderer.tension=null;this.renderer.constrainSmoothing=true;this.renderer._smoothedData=[];this.renderer._smoothedPlotData=[];this.renderer._hiBandGridData=[];this.renderer._lowBandGridData=[];this.renderer._hiBandSmoothedData=[];this.renderer._lowBandSmoothedData=[];this.renderer.bandData=[];this.renderer.bands={show:false,hiData:[],lowData:[],color:this.color,showLines:false,fill:true,fillColor:null,_min:null,_max:null,interval:"3%"};var al={highlightMouseOver:ai.highlightMouseOver,highlightMouseDown:ai.highlightMouseDown,highlightColor:ai.highlightColor};delete (ai.highlightMouseOver);delete (ai.highlightMouseDown);delete (ai.highlightColor);L.extend(true,this.renderer,ai);this.renderer.options=ai;if(this.renderer.bandData.length>1&&(!ai.bands||ai.bands.show==null)){this.renderer.bands.show=true}else{if(ai.bands&&ai.bands.show==null&&ai.bands.interval!=null){this.renderer.bands.show=true}}if(this.fill){this.renderer.bands.show=false}if(this.renderer.bands.show){this.renderer.initBands.call(this,this.renderer.options,an)}if(this._stack){this.renderer.smooth=false}var am={lineJoin:this.lineJoin,lineCap:this.lineCap,fill:this.fill,isarc:false,strokeStyle:this.color,fillStyle:this.fillColor,lineWidth:this.lineWidth,linePattern:this.linePattern,closePath:this.fill};this.renderer.shapeRenderer.init(am);var aj=ai.shadowOffset;if(aj==null){if(this.lineWidth>2.5){aj=1.25*(1+(Math.atan((this.lineWidth/2.5))/0.785398163-1)*0.6)}else{aj=1.25*Math.atan((this.lineWidth/2.5))/0.785398163}}var ah={lineJoin:this.lineJoin,lineCap:this.lineCap,fill:this.fill,isarc:false,angle:this.shadowAngle,offset:aj,alpha:this.shadowAlpha,depth:this.shadowDepth,lineWidth:this.lineWidth,linePattern:this.linePattern,closePath:this.fill};this.renderer.shadowRenderer.init(ah);this._areaPoints=[];this._boundingBox=[[],[]];if(!this.isTrendline&&this.fill||this.renderer.bands.show){this.highlightMouseOver=true;this.highlightMouseDown=false;this.highlightColor=null;if(al.highlightMouseDown&&al.highlightMouseOver==null){al.highlightMouseOver=false}L.extend(true,this,{highlightMouseOver:al.highlightMouseOver,highlightMouseDown:al.highlightMouseDown,highlightColor:al.highlightColor});if(!this.highlightColor){var ak=(this.renderer.bands.show)?this.renderer.bands.fillColor:this.fillColor;this.highlightColor=L.jqplot.computeHighlightColors(ak)}if(this.highlighter){this.highlighter.show=false}}if(!this.isTrendline&&an){an.plugins.lineRenderer={};an.postInitHooks.addOnce(z);an.postDrawHooks.addOnce(af);an.eventListenerHooks.addOnce("jqplotMouseMove",h);an.eventListenerHooks.addOnce("jqplotMouseDown",e);an.eventListenerHooks.addOnce("jqplotMouseUp",ad);an.eventListenerHooks.addOnce("jqplotClick",g);an.eventListenerHooks.addOnce("jqplotRightClick",s)}};L.jqplot.LineRenderer.prototype.initBands=function(ak,av){var al=ak.bandData||[];var an=this.renderer.bands;an.hiData=[];an.lowData=[];var aB=this.data;an._max=null;an._min=null;if(al.length==2){if(L.isArray(al[0][0])){var ao;var ah=0,ar=0;for(var aw=0,at=al[0].length;aw<at;aw++){ao=al[0][aw];if((ao[1]!=null&&ao[1]>an._max)||an._max==null){an._max=ao[1]}if((ao[1]!=null&&ao[1]<an._min)||an._min==null){an._min=ao[1]}}for(var aw=0,at=al[1].length;aw<at;aw++){ao=al[1][aw];if((ao[1]!=null&&ao[1]>an._max)||an._max==null){an._max=ao[1];ar=1}if((ao[1]!=null&&ao[1]<an._min)||an._min==null){an._min=ao[1];ah=1}}if(ar===ah){an.show=false}an.hiData=al[ar];an.lowData=al[ah]}else{if(al[0].length===aB.length&&al[1].length===aB.length){var aj=(al[0][0]>al[1][0])?0:1;var aC=(aj)?0:1;for(var aw=0,at=aB.length;aw<at;aw++){an.hiData.push([aB[aw][0],al[aj][aw]]);an.lowData.push([aB[aw][0],al[aC][aw]])}}else{an.show=false}}}else{if(al.length>2&&!L.isArray(al[0][0])){var aj=(al[0][0]>al[0][1])?0:1;var aC=(aj)?0:1;for(var aw=0,at=al.length;aw<at;aw++){an.hiData.push([aB[aw][0],al[aw][aj]]);an.lowData.push([aB[aw][0],al[aw][aC]])}}else{var aq=an.interval;var aA=null;var az=null;var ai=null;var au=null;if(L.isArray(aq)){aA=aq[0];az=aq[1]}else{aA=aq}if(isNaN(aA)){if(aA.charAt(aA.length-1)==="%"){ai="multiply";aA=parseFloat(aA)/100+1}}else{aA=parseFloat(aA);ai="add"}if(az!==null&&isNaN(az)){if(az.charAt(az.length-1)==="%"){au="multiply";az=parseFloat(az)/100+1}}else{if(az!==null){az=parseFloat(az);au="add"}}if(aA!==null){if(az===null){az=-aA;au=ai;if(au==="multiply"){az+=2}}if(aA<az){var ax=aA;aA=az;az=ax;ax=ai;ai=au;au=ax}for(var aw=0,at=aB.length;aw<at;aw++){switch(ai){case"add":an.hiData.push([aB[aw][0],aB[aw][1]+aA]);break;case"multiply":an.hiData.push([aB[aw][0],aB[aw][1]*aA]);break}switch(au){case"add":an.lowData.push([aB[aw][0],aB[aw][1]+az]);break;case"multiply":an.lowData.push([aB[aw][0],aB[aw][1]*az]);break}}}else{an.show=false}}}var am=an.hiData;var ap=an.lowData;for(var aw=0,at=am.length;aw<at;aw++){if((am[aw][1]!=null&&am[aw][1]>an._max)||an._max==null){an._max=am[aw][1]}}for(var aw=0,at=ap.length;aw<at;aw++){if((ap[aw][1]!=null&&ap[aw][1]<an._min)||an._min==null){an._min=ap[aw][1]}}if(an.fillColor===null){var ay=L.jqplot.getColorComponents(an.color);ay[3]=ay[3]*0.5;an.fillColor="rgba("+ay[0]+", "+ay[1]+", "+ay[2]+", "+ay[3]+")"}};function K(ai,ah){return(3.4182054+ah)*Math.pow(ai,-0.3534992)}function n(aj,ai){var ah=Math.sqrt(Math.pow((ai[0]-aj[0]),2)+Math.pow((ai[1]-aj[1]),2));return 5.7648*Math.log(ah)+7.4456}function A(ah){var ai=(Math.exp(2*ah)-1)/(Math.exp(2*ah)+1);return ai}function J(aJ){var at=this.renderer.smooth;var aD=this.canvas.getWidth();var an=this._xaxis.series_p2u;var aG=this._yaxis.series_p2u;var aF=null;var am=null;var az=aJ.length/aD;var aj=[];var ay=[];if(!isNaN(parseFloat(at))){aF=parseFloat(at)}else{aF=K(az,0.5)}var aw=[];var ak=[];for(var aE=0,aA=aJ.length;aE<aA;aE++){aw.push(aJ[aE][1]);ak.push(aJ[aE][0])}function av(aK,aL){if(aK-aL==0){return Math.pow(10,10)}else{return aK-aL}}var ax,ar,aq,ap;var ah=aJ.length-1;for(var al=1,aB=aJ.length;al<aB;al++){var ai=[];var au=[];for(var aC=0;aC<2;aC++){var aE=al-1+aC;if(aE==0||aE==ah){ai[aC]=Math.pow(10,10)}else{if(aw[aE+1]-aw[aE]==0||aw[aE]-aw[aE-1]==0){ai[aC]=0}else{if(((ak[aE+1]-ak[aE])/(aw[aE+1]-aw[aE])+(ak[aE]-ak[aE-1])/(aw[aE]-aw[aE-1]))==0){ai[aC]=0}else{if((aw[aE+1]-aw[aE])*(aw[aE]-aw[aE-1])<0){ai[aC]=0}else{ai[aC]=2/(av(ak[aE+1],ak[aE])/(aw[aE+1]-aw[aE])+av(ak[aE],ak[aE-1])/(aw[aE]-aw[aE-1]))}}}}}if(al==1){ai[0]=3/2*(aw[1]-aw[0])/av(ak[1],ak[0])-ai[1]/2}else{if(al==ah){ai[1]=3/2*(aw[ah]-aw[ah-1])/av(ak[ah],ak[ah-1])-ai[0]/2}}au[0]=-2*(ai[1]+2*ai[0])/av(ak[al],ak[al-1])+6*(aw[al]-aw[al-1])/Math.pow(av(ak[al],ak[al-1]),2);au[1]=2*(2*ai[1]+ai[0])/av(ak[al],ak[al-1])-6*(aw[al]-aw[al-1])/Math.pow(av(ak[al],ak[al-1]),2);ap=1/6*(au[1]-au[0])/av(ak[al],ak[al-1]);aq=1/2*(ak[al]*au[0]-ak[al-1]*au[1])/av(ak[al],ak[al-1]);ar=(aw[al]-aw[al-1]-aq*(Math.pow(ak[al],2)-Math.pow(ak[al-1],2))-ap*(Math.pow(ak[al],3)-Math.pow(ak[al-1],3)))/av(ak[al],ak[al-1]);ax=aw[al-1]-ar*ak[al-1]-aq*Math.pow(ak[al-1],2)-ap*Math.pow(ak[al-1],3);var aI=(ak[al]-ak[al-1])/aF;var aH,ao;for(var aC=0,aA=aF;aC<aA;aC++){aH=[];ao=ak[al-1]+aC*aI;aH.push(ao);aH.push(ax+ar*ao+aq*Math.pow(ao,2)+ap*Math.pow(ao,3));aj.push(aH);ay.push([an(aH[0]),aG(aH[1])])}}aj.push(aJ[aE]);ay.push([an(aJ[aE][0]),aG(aJ[aE][1])]);return[aj,ay]}function F(ap){var ao=this.renderer.smooth;var aU=this.renderer.tension;var ah=this.canvas.getWidth();var aH=this._xaxis.series_p2u;var aq=this._yaxis.series_p2u;var aI=null;var aJ=null;var aT=null;var aO=null;var aM=null;var at=null;var aR=null;var am=null;var aK,aL,aD,aC,aA,ay;var ak,ai,av,au;var aB,az,aN;var aw=[];var aj=[];var al=ap.length/ah;var aS,ax,aF,aG,aE;var ar=[];var an=[];if(!isNaN(parseFloat(ao))){aI=parseFloat(ao)}else{aI=K(al,0.5)}if(!isNaN(parseFloat(aU))){aU=parseFloat(aU)}for(var aQ=0,aP=ap.length-1;aQ<aP;aQ++){if(aU===null){at=Math.abs((ap[aQ+1][1]-ap[aQ][1])/(ap[aQ+1][0]-ap[aQ][0]));aS=0.3;ax=0.6;aF=(ax-aS)/2;aG=2.5;aE=-1.4;am=at/aG+aE;aO=aF*A(am)-aF*A(aE)+aS;if(aQ>0){aR=Math.abs((ap[aQ][1]-ap[aQ-1][1])/(ap[aQ][0]-ap[aQ-1][0]))}am=aR/aG+aE;aM=aF*A(am)-aF*A(aE)+aS;aT=(aO+aM)/2}else{aT=aU}for(aK=0;aK<aI;aK++){aL=aK/aI;aD=(1+2*aL)*Math.pow((1-aL),2);aC=aL*Math.pow((1-aL),2);aA=Math.pow(aL,2)*(3-2*aL);ay=Math.pow(aL,2)*(aL-1);if(ap[aQ-1]){ak=aT*(ap[aQ+1][0]-ap[aQ-1][0]);ai=aT*(ap[aQ+1][1]-ap[aQ-1][1])}else{ak=aT*(ap[aQ+1][0]-ap[aQ][0]);ai=aT*(ap[aQ+1][1]-ap[aQ][1])}if(ap[aQ+2]){av=aT*(ap[aQ+2][0]-ap[aQ][0]);au=aT*(ap[aQ+2][1]-ap[aQ][1])}else{av=aT*(ap[aQ+1][0]-ap[aQ][0]);au=aT*(ap[aQ+1][1]-ap[aQ][1])}aB=aD*ap[aQ][0]+aA*ap[aQ+1][0]+aC*ak+ay*av;az=aD*ap[aQ][1]+aA*ap[aQ+1][1]+aC*ai+ay*au;aN=[aB,az];ar.push(aN);an.push([aH(aB),aq(az)])}}ar.push(ap[aP]);an.push([aH(ap[aP][0]),aq(ap[aP][1])]);return[ar,an]}L.jqplot.LineRenderer.prototype.setGridData=function(ap){var al=this._xaxis.series_u2p;var ah=this._yaxis.series_u2p;var am=this._plotData;var aq=this._prevPlotData;this.gridData=[];this._prevGridData=[];this.renderer._smoothedData=[];this.renderer._smoothedPlotData=[];this.renderer._hiBandGridData=[];this.renderer._lowBandGridData=[];this.renderer._hiBandSmoothedData=[];this.renderer._lowBandSmoothedData=[];var ak=this.renderer.bands;var ai=false;for(var an=0,aj=am.length;an<aj;an++){if(am[an][0]!=null&&am[an][1]!=null){this.gridData.push([al.call(this._xaxis,am[an][0]),ah.call(this._yaxis,am[an][1])])}else{if(am[an][0]==null){ai=true;this.gridData.push([null,ah.call(this._yaxis,am[an][1])])}else{if(am[an][1]==null){ai=true;this.gridData.push([al.call(this._xaxis,am[an][0]),null])}}}if(aq[an]!=null&&aq[an][0]!=null&&aq[an][1]!=null){this._prevGridData.push([al.call(this._xaxis,aq[an][0]),ah.call(this._yaxis,aq[an][1])])}else{if(aq[an]!=null&&aq[an][0]==null){this._prevGridData.push([null,ah.call(this._yaxis,aq[an][1])])}else{if(aq[an]!=null&&aq[an][0]!=null&&aq[an][1]==null){this._prevGridData.push([al.call(this._xaxis,aq[an][0]),null])}}}}if(ai){this.renderer.smooth=false;if(this._type==="line"){ak.show=false}}if(this._type==="line"&&ak.show){for(var an=0,aj=ak.hiData.length;an<aj;an++){this.renderer._hiBandGridData.push([al.call(this._xaxis,ak.hiData[an][0]),ah.call(this._yaxis,ak.hiData[an][1])])}for(var an=0,aj=ak.lowData.length;an<aj;an++){this.renderer._lowBandGridData.push([al.call(this._xaxis,ak.lowData[an][0]),ah.call(this._yaxis,ak.lowData[an][1])])}}if(this._type==="line"&&this.renderer.smooth&&this.gridData.length>2){var ao;if(this.renderer.constrainSmoothing){ao=J.call(this,this.gridData);this.renderer._smoothedData=ao[0];this.renderer._smoothedPlotData=ao[1];if(ak.show){ao=J.call(this,this.renderer._hiBandGridData);this.renderer._hiBandSmoothedData=ao[0];ao=J.call(this,this.renderer._lowBandGridData);this.renderer._lowBandSmoothedData=ao[0]}ao=null}else{ao=F.call(this,this.gridData);this.renderer._smoothedData=ao[0];this.renderer._smoothedPlotData=ao[1];if(ak.show){ao=F.call(this,this.renderer._hiBandGridData);this.renderer._hiBandSmoothedData=ao[0];ao=F.call(this,this.renderer._lowBandGridData);this.renderer._lowBandSmoothedData=ao[0]}ao=null}}};L.jqplot.LineRenderer.prototype.makeGridData=function(ao,aq){var am=this._xaxis.series_u2p;var ah=this._yaxis.series_u2p;var ar=[];var aj=[];this.renderer._smoothedData=[];this.renderer._smoothedPlotData=[];this.renderer._hiBandGridData=[];this.renderer._lowBandGridData=[];this.renderer._hiBandSmoothedData=[];this.renderer._lowBandSmoothedData=[];var al=this.renderer.bands;var ai=false;for(var an=0;an<ao.length;an++){if(ao[an][0]!=null&&ao[an][1]!=null){ar.push([am.call(this._xaxis,ao[an][0]),ah.call(this._yaxis,ao[an][1])])}else{if(ao[an][0]==null){ai=true;ar.push([null,ah.call(this._yaxis,ao[an][1])])}else{if(ao[an][1]==null){ai=true;ar.push([am.call(this._xaxis,ao[an][0]),null])}}}}if(ai){this.renderer.smooth=false;if(this._type==="line"){al.show=false}}if(this._type==="line"&&al.show){for(var an=0,ak=al.hiData.length;an<ak;an++){this.renderer._hiBandGridData.push([am.call(this._xaxis,al.hiData[an][0]),ah.call(this._yaxis,al.hiData[an][1])])}for(var an=0,ak=al.lowData.length;an<ak;an++){this.renderer._lowBandGridData.push([am.call(this._xaxis,al.lowData[an][0]),ah.call(this._yaxis,al.lowData[an][1])])}}if(this._type==="line"&&this.renderer.smooth&&ar.length>2){var ap;if(this.renderer.constrainSmoothing){ap=J.call(this,ar);this.renderer._smoothedData=ap[0];this.renderer._smoothedPlotData=ap[1];if(al.show){ap=J.call(this,this.renderer._hiBandGridData);this.renderer._hiBandSmoothedData=ap[0];ap=J.call(this,this.renderer._lowBandGridData);this.renderer._lowBandSmoothedData=ap[0]}ap=null}else{ap=F.call(this,ar);this.renderer._smoothedData=ap[0];this.renderer._smoothedPlotData=ap[1];if(al.show){ap=F.call(this,this.renderer._hiBandGridData);this.renderer._hiBandSmoothedData=ap[0];ap=F.call(this,this.renderer._lowBandGridData);this.renderer._lowBandSmoothedData=ap[0]}ap=null}}return ar};L.jqplot.LineRenderer.prototype.draw=function(ax,aI,ai,aB){var aC;var aq=L.extend(true,{},ai);var ak=(aq.shadow!=u)?aq.shadow:this.shadow;var aJ=(aq.showLine!=u)?aq.showLine:this.showLine;var aA=(aq.fill!=u)?aq.fill:this.fill;var ah=(aq.fillAndStroke!=u)?aq.fillAndStroke:this.fillAndStroke;var ar,ay,av,aE;ax.save();if(aI.length){if(aJ){if(aA){if(this.fillToZero){var aF=this.negativeColor;if(!this.useNegativeColors){aF=aq.fillStyle}var ao=false;var ap=aq.fillStyle;if(ah){var aH=aI.slice(0)}if(this.index==0||!this._stack){var aw=[];var aL=(this.renderer.smooth)?this.renderer._smoothedPlotData:this._plotData;this._areaPoints=[];var aG=this._yaxis.series_u2p(this.fillToValue);var aj=this._xaxis.series_u2p(this.fillToValue);aq.closePath=true;if(this.fillAxis=="y"){aw.push([aI[0][0],aG]);this._areaPoints.push([aI[0][0],aG]);for(var aC=0;aC<aI.length-1;aC++){aw.push(aI[aC]);this._areaPoints.push(aI[aC]);if(aL[aC][1]*aL[aC+1][1]<=0){if(aL[aC][1]<0){ao=true;aq.fillStyle=aF}else{ao=false;aq.fillStyle=ap}var an=aI[aC][0]+(aI[aC+1][0]-aI[aC][0])*(aG-aI[aC][1])/(aI[aC+1][1]-aI[aC][1]);aw.push([an,aG]);this._areaPoints.push([an,aG]);if(ak){this.renderer.shadowRenderer.draw(ax,aw,aq)}this.renderer.shapeRenderer.draw(ax,aw,aq);aw=[[an,aG]]}}if(aL[aI.length-1][1]<0){ao=true;aq.fillStyle=aF}else{ao=false;aq.fillStyle=ap}aw.push(aI[aI.length-1]);this._areaPoints.push(aI[aI.length-1]);aw.push([aI[aI.length-1][0],aG]);this._areaPoints.push([aI[aI.length-1][0],aG])}if(ak){this.renderer.shadowRenderer.draw(ax,aw,aq)}this.renderer.shapeRenderer.draw(ax,aw,aq)}else{var au=this._prevGridData;for(var aC=au.length;aC>0;aC--){aI.push(au[aC-1])}if(ak){this.renderer.shadowRenderer.draw(ax,aI,aq)}this._areaPoints=aI;this.renderer.shapeRenderer.draw(ax,aI,aq)}}else{if(ah){var aH=aI.slice(0)}if(this.index==0||!this._stack){var al=ax.canvas.height;aI.unshift([aI[0][0],al]);var aD=aI.length;aI.push([aI[aD-1][0],al])}else{var au=this._prevGridData;for(var aC=au.length;aC>0;aC--){aI.push(au[aC-1])}}this._areaPoints=aI;if(ak){this.renderer.shadowRenderer.draw(ax,aI,aq)}this.renderer.shapeRenderer.draw(ax,aI,aq)}if(ah){var az=L.extend(true,{},aq,{fill:false,closePath:false});this.renderer.shapeRenderer.draw(ax,aH,az);if(this.markerRenderer.show){if(this.renderer.smooth){aH=this.gridData}for(aC=0;aC<aH.length;aC++){this.markerRenderer.draw(aH[aC][0],aH[aC][1],ax,aq.markerOptions)}}}}else{if(this.renderer.bands.show){var am;var aK=L.extend(true,{},aq);if(this.renderer.bands.showLines){am=(this.renderer.smooth)?this.renderer._hiBandSmoothedData:this.renderer._hiBandGridData;this.renderer.shapeRenderer.draw(ax,am,aq);am=(this.renderer.smooth)?this.renderer._lowBandSmoothedData:this.renderer._lowBandGridData;this.renderer.shapeRenderer.draw(ax,am,aK)}if(this.renderer.bands.fill){if(this.renderer.smooth){am=this.renderer._hiBandSmoothedData.concat(this.renderer._lowBandSmoothedData.reverse())}else{am=this.renderer._hiBandGridData.concat(this.renderer._lowBandGridData.reverse())}this._areaPoints=am;aK.closePath=true;aK.fill=true;aK.fillStyle=this.renderer.bands.fillColor;this.renderer.shapeRenderer.draw(ax,am,aK)}}if(ak){this.renderer.shadowRenderer.draw(ax,aI,aq)}this.renderer.shapeRenderer.draw(ax,aI,aq)}}var ar=av=ay=aE=null;for(aC=0;aC<this._areaPoints.length;aC++){var at=this._areaPoints[aC];if(ar>at[0]||ar==null){ar=at[0]}if(aE<at[1]||aE==null){aE=at[1]}if(av<at[0]||av==null){av=at[0]}if(ay>at[1]||ay==null){ay=at[1]}}if(this.type==="line"&&this.renderer.bands.show){aE=this._yaxis.series_u2p(this.renderer.bands._min);ay=this._yaxis.series_u2p(this.renderer.bands._max)}this._boundingBox=[[ar,aE],[av,ay]];if(this.markerRenderer.show&&!aA){if(this.renderer.smooth){aI=this.gridData}for(aC=0;aC<aI.length;aC++){if(aI[aC][0]!=null&&aI[aC][1]!=null){this.markerRenderer.draw(aI[aC][0],aI[aC][1],ax,aq.markerOptions)}}}}ax.restore()};L.jqplot.LineRenderer.prototype.drawShadow=function(ah,aj,ai){};function z(ak,aj,ah){for(var ai=0;ai<this.series.length;ai++){if(this.series[ai].renderer.constructor==L.jqplot.LineRenderer){if(this.series[ai].highlightMouseOver){this.series[ai].highlightMouseDown=false}}}}function af(){if(this.plugins.lineRenderer&&this.plugins.lineRenderer.highlightCanvas){this.plugins.lineRenderer.highlightCanvas.resetCanvas();this.plugins.lineRenderer.highlightCanvas=null}this.plugins.lineRenderer.highlightedSeriesIndex=null;this.plugins.lineRenderer.highlightCanvas=new L.jqplot.GenericCanvas();this.eventCanvas._elem.before(this.plugins.lineRenderer.highlightCanvas.createElement(this._gridPadding,"jqplot-lineRenderer-highlight-canvas",this._plotDimensions,this));this.plugins.lineRenderer.highlightCanvas.setContext();this.eventCanvas._elem.bind("mouseleave",{plot:this},function(ah){aa(ah.data.plot)})}function ac(an,am,ak,aj){var ai=an.series[am];var ah=an.plugins.lineRenderer.highlightCanvas;ah._ctx.clearRect(0,0,ah._ctx.canvas.width,ah._ctx.canvas.height);ai._highlightedPoint=ak;an.plugins.lineRenderer.highlightedSeriesIndex=am;var al={fillStyle:ai.highlightColor};if(ai.type==="line"&&ai.renderer.bands.show){al.fill=true;al.closePath=true}ai.renderer.shapeRenderer.draw(ah._ctx,aj,al);ah=null}function aa(aj){var ah=aj.plugins.lineRenderer.highlightCanvas;ah._ctx.clearRect(0,0,ah._ctx.canvas.width,ah._ctx.canvas.height);for(var ai=0;ai<aj.series.length;ai++){aj.series[ai]._highlightedPoint=null}aj.plugins.lineRenderer.highlightedSeriesIndex=null;aj.target.trigger("jqplotDataUnhighlight");ah=null}function h(al,ak,ao,an,am){if(an){var aj=[an.seriesIndex,an.pointIndex,an.data];var ai=jQuery.Event("jqplotDataMouseOver");ai.pageX=al.pageX;ai.pageY=al.pageY;am.target.trigger(ai,aj);if(am.series[aj[0]].highlightMouseOver&&!(aj[0]==am.plugins.lineRenderer.highlightedSeriesIndex)){var ah=jQuery.Event("jqplotDataHighlight");ah.which=al.which;ah.pageX=al.pageX;ah.pageY=al.pageY;am.target.trigger(ah,aj);ac(am,an.seriesIndex,an.pointIndex,an.points)}}else{if(an==null){aa(am)}}}function e(ak,aj,an,am,al){if(am){var ai=[am.seriesIndex,am.pointIndex,am.data];if(al.series[ai[0]].highlightMouseDown&&!(ai[0]==al.plugins.lineRenderer.highlightedSeriesIndex)){var ah=jQuery.Event("jqplotDataHighlight");ah.which=ak.which;ah.pageX=ak.pageX;ah.pageY=ak.pageY;al.target.trigger(ah,ai);ac(al,am.seriesIndex,am.pointIndex,am.points)}}else{if(am==null){aa(al)}}}function ad(aj,ai,am,al,ak){var ah=ak.plugins.lineRenderer.highlightedSeriesIndex;if(ah!=null&&ak.series[ah].highlightMouseDown){aa(ak)}}function g(ak,aj,an,am,al){if(am){var ai=[am.seriesIndex,am.pointIndex,am.data];var ah=jQuery.Event("jqplotDataClick");ah.which=ak.which;ah.pageX=ak.pageX;ah.pageY=ak.pageY;al.target.trigger(ah,ai)}}function s(al,ak,ao,an,am){if(an){var aj=[an.seriesIndex,an.pointIndex,an.data];var ah=am.plugins.lineRenderer.highlightedSeriesIndex;if(ah!=null&&am.series[ah].highlightMouseDown){aa(am)}var ai=jQuery.Event("jqplotDataRightClick");ai.which=al.which;ai.pageX=al.pageX;ai.pageY=al.pageY;am.target.trigger(ai,aj)}}L.jqplot.LinearAxisRenderer=function(){};L.jqplot.LinearAxisRenderer.prototype.init=function(ah){this.breakPoints=null;this.breakTickLabel="&asymp;";this.drawBaseline=true;this.baselineWidth=null;this.baselineColor=null;this.forceTickAt0=false;this.forceTickAt100=false;this.tickInset=0;this.minorTicks=0;this.alignTicks=false;this._autoFormatString="";this._overrideFormatString=false;this._scalefact=1;L.extend(true,this,ah);if(this.breakPoints){if(!L.isArray(this.breakPoints)){this.breakPoints=null}else{if(this.breakPoints.length<2||this.breakPoints[1]<=this.breakPoints[0]){this.breakPoints=null}}}if(this.numberTicks!=null&&this.numberTicks<2){this.numberTicks=2}this.resetDataBounds()};L.jqplot.LinearAxisRenderer.prototype.draw=function(ah,ao){if(this.show){this.renderer.createTicks.call(this,ao);var an=0;var ai;if(this._elem){this._elem.emptyForce();this._elem=null}this._elem=L(document.createElement("div"));this._elem.addClass("jqplot-axis jqplot-"+this.name);this._elem.css("position","absolute");if(this.name=="xaxis"||this.name=="x2axis"){this._elem.width(this._plotDimensions.width)}else{this._elem.height(this._plotDimensions.height)}this.labelOptions.axis=this.name;this._label=new this.labelRenderer(this.labelOptions);if(this._label.show){var am=this._label.draw(ah,ao);am.appendTo(this._elem);am=null}var al=this._ticks;var ak;for(var aj=0;aj<al.length;aj++){ak=al[aj];if(ak.show&&ak.showLabel&&(!ak.isMinorTick||this.showMinorTicks)){this._elem.append(ak.draw(ah,ao))}}ak=null;al=null}return this._elem};L.jqplot.LinearAxisRenderer.prototype.reset=function(){this.min=this._options.min;this.max=this._options.max;this.tickInterval=this._options.tickInterval;this.numberTicks=this._options.numberTicks;this._autoFormatString="";if(this._overrideFormatString&&this.tickOptions&&this.tickOptions.formatString){this.tickOptions.formatString=""}};L.jqplot.LinearAxisRenderer.prototype.set=function(){var ao=0;var aj;var ai=0;var an=0;var ah=(this._label==null)?false:this._label.show;if(this.show){var am=this._ticks;var al;for(var ak=0;ak<am.length;ak++){al=am[ak];if(!al._breakTick&&al.show&&al.showLabel&&(!al.isMinorTick||this.showMinorTicks)){if(this.name=="xaxis"||this.name=="x2axis"){aj=al._elem.outerHeight(true)}else{aj=al._elem.outerWidth(true)}if(aj>ao){ao=aj}}}al=null;am=null;if(ah){ai=this._label._elem.outerWidth(true);an=this._label._elem.outerHeight(true)}if(this.name=="xaxis"){ao=ao+an;this._elem.css({height:ao+"px",left:"0px",bottom:"0px"})}else{if(this.name=="x2axis"){ao=ao+an;this._elem.css({height:ao+"px",left:"0px",top:"0px"})}else{if(this.name=="yaxis"){ao=ao+ai;this._elem.css({width:ao+"px",left:"0px",top:"0px"});if(ah&&this._label.constructor==L.jqplot.AxisLabelRenderer){this._label._elem.css("width",ai+"px")}}else{ao=ao+ai;this._elem.css({width:ao+"px",right:"0px",top:"0px"});if(ah&&this._label.constructor==L.jqplot.AxisLabelRenderer){this._label._elem.css("width",ai+"px")}}}}}};L.jqplot.LinearAxisRenderer.prototype.createTicks=function(aj){var aT=this._ticks;var aK=this.ticks;var az=this.name;var aB=this._dataBounds;var ah=(this.name.charAt(0)==="x")?this._plotDimensions.width:this._plotDimensions.height;var an;var a6,aI;var ap,ao;var a4,a0;var aH=this.min;var a5=this.max;var aW=this.numberTicks;var ba=this.tickInterval;var am=30;this._scalefact=(Math.max(ah,am+1)-am)/300;if(aK.length){for(a0=0;a0<aK.length;a0++){var aO=aK[a0];var aU=new this.tickRenderer(this.tickOptions);if(L.isArray(aO)){aU.value=aO[0];if(this.breakPoints){if(aO[0]==this.breakPoints[0]){aU.label=this.breakTickLabel;aU._breakTick=true;aU.showGridline=false;aU.showMark=false}else{if(aO[0]>this.breakPoints[0]&&aO[0]<=this.breakPoints[1]){aU.show=false;aU.showGridline=false;aU.label=aO[1]}else{aU.label=aO[1]}}}else{aU.label=aO[1]}aU.setTick(aO[0],this.name);this._ticks.push(aU)}else{if(L.isPlainObject(aO)){L.extend(true,aU,aO);aU.axis=this.name;this._ticks.push(aU)}else{aU.value=aO;if(this.breakPoints){if(aO==this.breakPoints[0]){aU.label=this.breakTickLabel;aU._breakTick=true;aU.showGridline=false;aU.showMark=false}else{if(aO>this.breakPoints[0]&&aO<=this.breakPoints[1]){aU.show=false;aU.showGridline=false}}}aU.setTick(aO,this.name);this._ticks.push(aU)}}}this.numberTicks=aK.length;this.min=this._ticks[0].value;this.max=this._ticks[this.numberTicks-1].value;this.tickInterval=(this.max-this.min)/(this.numberTicks-1)}else{if(az=="xaxis"||az=="x2axis"){ah=this._plotDimensions.width}else{ah=this._plotDimensions.height}var ax=this.numberTicks;if(this.alignTicks){if(this.name==="x2axis"&&aj.axes.xaxis.show){ax=aj.axes.xaxis.numberTicks}else{if(this.name.charAt(0)==="y"&&this.name!=="yaxis"&&this.name!=="yMidAxis"&&aj.axes.yaxis.show){ax=aj.axes.yaxis.numberTicks}}}a6=((this.min!=null)?this.min:aB.min);aI=((this.max!=null)?this.max:aB.max);var av=aI-a6;var aS,ay;var at;if(this.tickOptions==null||!this.tickOptions.formatString){this._overrideFormatString=true}if(this.min==null||this.max==null&&this.tickInterval==null&&!this.autoscale){if(this.forceTickAt0){if(a6>0){a6=0}if(aI<0){aI=0}}if(this.forceTickAt100){if(a6>100){a6=100}if(aI<100){aI=100}}var aE=false,a1=false;if(this.min!=null){aE=true}else{if(this.max!=null){a1=true}}var aP=L.jqplot.LinearTickGenerator(a6,aI,this._scalefact,ax,aE,a1);var aw=(this.min!=null)?a6:a6+av*(this.padMin-1);var aQ=(this.max!=null)?aI:aI-av*(this.padMax-1);if(a6<aw||aI>aQ){aw=(this.min!=null)?a6:a6-av*(this.padMin-1);aQ=(this.max!=null)?aI:aI+av*(this.padMax-1);aP=L.jqplot.LinearTickGenerator(aw,aQ,this._scalefact,ax,aE,a1)}this.min=aP[0];this.max=aP[1];this.numberTicks=aP[2];this._autoFormatString=aP[3];this.tickInterval=aP[4]}else{if(a6==aI){var ai=0.05;if(a6>0){ai=Math.max(Math.log(a6)/Math.LN10,0.05)}a6-=ai;aI+=ai}if(this.autoscale&&this.min==null&&this.max==null){var ak,al,ar;var aC=false;var aN=false;var aA={min:null,max:null,average:null,stddev:null};for(var a0=0;a0<this._series.length;a0++){var aV=this._series[a0];var aD=(aV.fillAxis=="x")?aV._xaxis.name:aV._yaxis.name;if(this.name==aD){var aR=aV._plotValues[aV.fillAxis];var aG=aR[0];var a2=aR[0];for(var aZ=1;aZ<aR.length;aZ++){if(aR[aZ]<aG){aG=aR[aZ]}else{if(aR[aZ]>a2){a2=aR[aZ]}}}var au=(a2-aG)/a2;if(aV.renderer.constructor==L.jqplot.BarRenderer){if(aG>=0&&(aV.fillToZero||au>0.1)){aC=true}else{aC=false;if(aV.fill&&aV.fillToZero&&aG<0&&a2>0){aN=true}else{aN=false}}}else{if(aV.fill){if(aG>=0&&(aV.fillToZero||au>0.1)){aC=true}else{if(aG<0&&a2>0&&aV.fillToZero){aC=false;aN=true}else{aC=false;aN=false}}}else{if(aG<0){aC=false}}}}}if(aC){this.numberTicks=2+Math.ceil((ah-(this.tickSpacing-1))/this.tickSpacing);this.min=0;aH=0;al=aI/(this.numberTicks-1);at=Math.pow(10,Math.abs(Math.floor(Math.log(al)/Math.LN10)));if(al/at==parseInt(al/at,10)){al+=at}this.tickInterval=Math.ceil(al/at)*at;this.max=this.tickInterval*(this.numberTicks-1)}else{if(aN){this.numberTicks=2+Math.ceil((ah-(this.tickSpacing-1))/this.tickSpacing);var aJ=Math.ceil(Math.abs(a6)/av*(this.numberTicks-1));var a9=this.numberTicks-1-aJ;al=Math.max(Math.abs(a6/aJ),Math.abs(aI/a9));at=Math.pow(10,Math.abs(Math.floor(Math.log(al)/Math.LN10)));this.tickInterval=Math.ceil(al/at)*at;this.max=this.tickInterval*a9;this.min=-this.tickInterval*aJ}else{if(this.numberTicks==null){if(this.tickInterval){this.numberTicks=3+Math.ceil(av/this.tickInterval)}else{this.numberTicks=2+Math.ceil((ah-(this.tickSpacing-1))/this.tickSpacing)}}if(this.tickInterval==null){al=av/(this.numberTicks-1);if(al<1){at=Math.pow(10,Math.abs(Math.floor(Math.log(al)/Math.LN10)))}else{at=1}this.tickInterval=Math.ceil(al*at*this.pad)/at}else{at=1/this.tickInterval}ak=this.tickInterval*(this.numberTicks-1);ar=(ak-av)/2;if(this.min==null){this.min=Math.floor(at*(a6-ar))/at}if(this.max==null){this.max=this.min+ak}}}var aF=L.jqplot.getSignificantFigures(this.tickInterval);var aM;if(aF.digitsLeft>=aF.significantDigits){aM="%d"}else{var at=Math.max(0,5-aF.digitsLeft);at=Math.min(at,aF.digitsRight);aM="%."+at+"f"}this._autoFormatString=aM}else{aS=(this.min!=null)?this.min:a6-av*(this.padMin-1);ay=(this.max!=null)?this.max:aI+av*(this.padMax-1);av=ay-aS;if(this.numberTicks==null){if(this.tickInterval!=null){this.numberTicks=Math.ceil((ay-aS)/this.tickInterval)+1}else{if(ah>100){this.numberTicks=parseInt(3+(ah-100)/75,10)}else{this.numberTicks=2}}}if(this.tickInterval==null){this.tickInterval=av/(this.numberTicks-1)}if(this.max==null){ay=aS+this.tickInterval*(this.numberTicks-1)}if(this.min==null){aS=ay-this.tickInterval*(this.numberTicks-1)}var aF=L.jqplot.getSignificantFigures(this.tickInterval);var aM;if(aF.digitsLeft>=aF.significantDigits){aM="%d"}else{var at=Math.max(0,5-aF.digitsLeft);at=Math.min(at,aF.digitsRight);aM="%."+at+"f"}this._autoFormatString=aM;this.min=aS;this.max=ay}if(this.renderer.constructor==L.jqplot.LinearAxisRenderer&&this._autoFormatString==""){av=this.max-this.min;var a7=new this.tickRenderer(this.tickOptions);var aL=a7.formatString||L.jqplot.config.defaultTickFormatString;var aL=aL.match(L.jqplot.sprintf.regex)[0];var a3=0;if(aL){if(aL.search(/[fFeEgGpP]/)>-1){var aY=aL.match(/\%\.(\d{0,})?[eEfFgGpP]/);if(aY){a3=parseInt(aY[1],10)}else{a3=6}}else{if(aL.search(/[di]/)>-1){a3=0}}var aq=Math.pow(10,-a3);if(this.tickInterval<aq){if(aW==null&&ba==null){this.tickInterval=aq;if(a5==null&&aH==null){this.min=Math.floor(this._dataBounds.min/aq)*aq;if(this.min==this._dataBounds.min){this.min=this._dataBounds.min-this.tickInterval}this.max=Math.ceil(this._dataBounds.max/aq)*aq;if(this.max==this._dataBounds.max){this.max=this._dataBounds.max+this.tickInterval}var aX=(this.max-this.min)/this.tickInterval;aX=aX.toFixed(11);aX=Math.ceil(aX);this.numberTicks=aX+1}else{if(a5==null){var aX=(this._dataBounds.max-this.min)/this.tickInterval;aX=aX.toFixed(11);this.numberTicks=Math.ceil(aX)+2;this.max=this.min+this.tickInterval*(this.numberTicks-1)}else{if(aH==null){var aX=(this.max-this._dataBounds.min)/this.tickInterval;aX=aX.toFixed(11);this.numberTicks=Math.ceil(aX)+2;this.min=this.max-this.tickInterval*(this.numberTicks-1)}else{this.numberTicks=Math.ceil((a5-aH)/this.tickInterval)+1;this.min=Math.floor(aH*Math.pow(10,a3))/Math.pow(10,a3);this.max=Math.ceil(a5*Math.pow(10,a3))/Math.pow(10,a3);this.numberTicks=Math.ceil((this.max-this.min)/this.tickInterval)+1}}}}}}}}if(this._overrideFormatString&&this._autoFormatString!=""){this.tickOptions=this.tickOptions||{};this.tickOptions.formatString=this._autoFormatString}var aU,a8;for(var a0=0;a0<this.numberTicks;a0++){a4=this.min+a0*this.tickInterval;aU=new this.tickRenderer(this.tickOptions);aU.setTick(a4,this.name);this._ticks.push(aU);if(a0<this.numberTicks-1){for(var aZ=0;aZ<this.minorTicks;aZ++){a4+=this.tickInterval/(this.minorTicks+1);a8=L.extend(true,{},this.tickOptions,{name:this.name,value:a4,label:"",isMinorTick:true});aU=new this.tickRenderer(a8);this._ticks.push(aU)}}aU=null}}if(this.tickInset){this.min=this.min-this.tickInset*this.tickInterval;this.max=this.max+this.tickInset*this.tickInterval}aT=null};L.jqplot.LinearAxisRenderer.prototype.resetTickValues=function(aj){if(L.isArray(aj)&&aj.length==this._ticks.length){var ai;for(var ah=0;ah<aj.length;ah++){ai=this._ticks[ah];ai.value=aj[ah];ai.label=ai.formatter(ai.formatString,aj[ah]);ai.label=ai.prefix+ai.label;ai._elem.html(ai.label)}ai=null;this.min=L.jqplot.arrayMin(aj);this.max=L.jqplot.arrayMax(aj);this.pack()}};L.jqplot.LinearAxisRenderer.prototype.pack=function(aj,ai){aj=aj||{};ai=ai||this._offsets;var ay=this._ticks;var au=this.max;var at=this.min;var ao=ai.max;var am=ai.min;var aq=(this._label==null)?false:this._label.show;for(var ar in aj){this._elem.css(ar,aj[ar])}this._offsets=ai;var ak=ao-am;var al=au-at;if(this.breakPoints){al=al-this.breakPoints[1]+this.breakPoints[0];this.p2u=function(aA){return(aA-am)*al/ak+at};this.u2p=function(aA){if(aA>this.breakPoints[0]&&aA<this.breakPoints[1]){aA=this.breakPoints[0]}if(aA<=this.breakPoints[0]){return(aA-at)*ak/al+am}else{return(aA-this.breakPoints[1]+this.breakPoints[0]-at)*ak/al+am}};if(this.name.charAt(0)=="x"){this.series_u2p=function(aA){if(aA>this.breakPoints[0]&&aA<this.breakPoints[1]){aA=this.breakPoints[0]}if(aA<=this.breakPoints[0]){return(aA-at)*ak/al}else{return(aA-this.breakPoints[1]+this.breakPoints[0]-at)*ak/al}};this.series_p2u=function(aA){return aA*al/ak+at}}else{this.series_u2p=function(aA){if(aA>this.breakPoints[0]&&aA<this.breakPoints[1]){aA=this.breakPoints[0]}if(aA>=this.breakPoints[1]){return(aA-au)*ak/al}else{return(aA+this.breakPoints[1]-this.breakPoints[0]-au)*ak/al}};this.series_p2u=function(aA){return aA*al/ak+au}}}else{this.p2u=function(aA){return(aA-am)*al/ak+at};this.u2p=function(aA){return(aA-at)*ak/al+am};if(this.name=="xaxis"||this.name=="x2axis"){this.series_u2p=function(aA){return(aA-at)*ak/al};this.series_p2u=function(aA){return aA*al/ak+at}}else{this.series_u2p=function(aA){return(aA-au)*ak/al};this.series_p2u=function(aA){return aA*al/ak+au}}}if(this.show){if(this.name=="xaxis"||this.name=="x2axis"){for(var av=0;av<ay.length;av++){var ap=ay[av];if(ap.show&&ap.showLabel){var ah;if(ap.constructor==L.jqplot.CanvasAxisTickRenderer&&ap.angle){var ax=(this.name=="xaxis")?1:-1;switch(ap.labelPosition){case"auto":if(ax*ap.angle<0){ah=-ap.getWidth()+ap._textRenderer.height*Math.sin(-ap._textRenderer.angle)/2}else{ah=-ap._textRenderer.height*Math.sin(ap._textRenderer.angle)/2}break;case"end":ah=-ap.getWidth()+ap._textRenderer.height*Math.sin(-ap._textRenderer.angle)/2;break;case"start":ah=-ap._textRenderer.height*Math.sin(ap._textRenderer.angle)/2;break;case"middle":ah=-ap.getWidth()/2+ap._textRenderer.height*Math.sin(-ap._textRenderer.angle)/2;break;default:ah=-ap.getWidth()/2+ap._textRenderer.height*Math.sin(-ap._textRenderer.angle)/2;break}}else{ah=-ap.getWidth()/2}var az=this.u2p(ap.value)+ah+"px";ap._elem.css("left",az);ap.pack()}}if(aq){var an=this._label._elem.outerWidth(true);this._label._elem.css("left",am+ak/2-an/2+"px");if(this.name=="xaxis"){this._label._elem.css("bottom","0px")}else{this._label._elem.css("top","0px")}this._label.pack()}}else{for(var av=0;av<ay.length;av++){var ap=ay[av];if(ap.show&&ap.showLabel){var ah;if(ap.constructor==L.jqplot.CanvasAxisTickRenderer&&ap.angle){var ax=(this.name=="yaxis")?1:-1;switch(ap.labelPosition){case"auto":case"end":if(ax*ap.angle<0){ah=-ap._textRenderer.height*Math.cos(-ap._textRenderer.angle)/2}else{ah=-ap.getHeight()+ap._textRenderer.height*Math.cos(ap._textRenderer.angle)/2}break;case"start":if(ap.angle>0){ah=-ap._textRenderer.height*Math.cos(-ap._textRenderer.angle)/2}else{ah=-ap.getHeight()+ap._textRenderer.height*Math.cos(ap._textRenderer.angle)/2}break;case"middle":ah=-ap.getHeight()/2;break;default:ah=-ap.getHeight()/2;break}}else{ah=-ap.getHeight()/2}var az=this.u2p(ap.value)+ah+"px";ap._elem.css("top",az);ap.pack()}}if(aq){var aw=this._label._elem.outerHeight(true);this._label._elem.css("top",ao-ak/2-aw/2+"px");if(this.name=="yaxis"){this._label._elem.css("left","0px")}else{this._label._elem.css("right","0px")}this._label.pack()}}}ay=null};function i(ai){var ah;ai=Math.abs(ai);if(ai>=10){ah="%d"}else{if(ai>1){if(ai===parseInt(ai,10)){ah="%d"}else{ah="%.1f"}}else{var aj=-Math.floor(Math.log(ai)/Math.LN10);ah="%."+aj+"f"}}return ah}var b=[0.1,0.2,0.3,0.4,0.5,0.8,1,2,3,4,5];var c=function(ai){var ah=b.indexOf(ai);if(ah>0){return b[ah-1]}else{return b[b.length-1]/100}};var k=function(ai){var ah=b.indexOf(ai);if(ah<b.length-1){return b[ah+1]}else{return b[0]*100}};function d(al,au,at){var aq=Math.floor(at/2);var ai=Math.ceil(at*1.5);var ak=Number.MAX_VALUE;var ah=(au-al);var ax;var ap;var ar;var ay=L.jqplot.getSignificantFigures;var aw;var an;var ao;var av;for(var am=0,aj=ai-aq+1;am<aj;am++){ao=aq+am;ax=ah/(ao-1);ap=ay(ax);ax=Math.abs(at-ao)+ap.digitsRight;if(ax<ak){ak=ax;ar=ao;av=ap.digitsRight}else{if(ax===ak){if(ap.digitsRight<av){ar=ao;av=ap.digitsRight}}}}aw=Math.max(av,Math.max(ay(al).digitsRight,ay(au).digitsRight));if(aw===0){an="%d"}else{an="%."+aw+"f"}ax=ah/(ar-1);return[al,au,ar,an,ax]}function W(ai,al){al=al||7;var ak=ai/(al-1);var aj=Math.pow(10,Math.floor(Math.log(ak)/Math.LN10));var am=ak/aj;var ah;if(aj<1){if(am>5){ah=10*aj}else{if(am>2){ah=5*aj}else{if(am>1){ah=2*aj}else{ah=aj}}}}else{if(am>5){ah=10*aj}else{if(am>4){ah=5*aj}else{if(am>3){ah=4*aj}else{if(am>2){ah=3*aj}else{if(am>1){ah=2*aj}else{ah=aj}}}}}}return ah}function Q(ai,ah){ah=ah||1;var ak=Math.floor(Math.log(ai)/Math.LN10);var am=Math.pow(10,ak);var al=ai/am;var aj;al=al/ah;if(al<=0.38){aj=0.1}else{if(al<=1.6){aj=0.2}else{if(al<=4){aj=0.5}else{if(al<=8){aj=1}else{if(al<=16){aj=2}else{aj=5}}}}}return aj*am}function x(aj,ai){var al=Math.floor(Math.log(aj)/Math.LN10);var an=Math.pow(10,al);var am=aj/an;var ah;var ak;am=am/ai;if(am<=0.38){ak=0.1}else{if(am<=1.6){ak=0.2}else{if(am<=4){ak=0.5}else{if(am<=8){ak=1}else{if(am<=16){ak=2}else{ak=5}}}}}ah=ak*an;return[ah,ak,an]}L.jqplot.LinearTickGenerator=function(an,aq,aj,ak,ao,ar){ao=(ao===null)?false:ao;ar=(ar===null||ao)?false:ar;if(an===aq){aq=(aq)?0:1}aj=aj||1;if(aq<an){var at=aq;aq=an;an=at}var ai=[];var aw=Q(aq-an,aj);var av=L.jqplot.getSignificantFigures;if(ak==null){if(!ao&&!ar){ai[0]=Math.floor(an/aw)*aw;ai[1]=Math.ceil(aq/aw)*aw;ai[2]=Math.round((ai[1]-ai[0])/aw+1);ai[3]=i(aw);ai[4]=aw}else{if(ao){ai[0]=an;ai[2]=Math.ceil((aq-an)/aw+1);ai[1]=an+(ai[2]-1)*aw;var au=av(an).digitsRight;var ap=av(aw).digitsRight;if(au<ap){ai[3]=i(aw)}else{ai[3]="%."+au+"f"}ai[4]=aw}else{if(ar){ai[1]=aq;ai[2]=Math.ceil((aq-an)/aw+1);ai[0]=aq-(ai[2]-1)*aw;var al=av(aq).digitsRight;var ap=av(aw).digitsRight;if(al<ap){ai[3]=i(aw)}else{ai[3]="%."+al+"f"}ai[4]=aw}}}}else{var am=[];am[0]=Math.floor(an/aw)*aw;am[1]=Math.ceil(aq/aw)*aw;am[2]=Math.round((am[1]-am[0])/aw+1);am[3]=i(aw);am[4]=aw;if(am[2]===ak){ai=am}else{var ah=W(am[1]-am[0],ak);ai[0]=am[0];ai[2]=ak;ai[4]=ah;ai[3]=i(ah);ai[1]=ai[0]+(ai[2]-1)*ai[4]}}return ai};L.jqplot.LinearTickGenerator.bestLinearInterval=Q;L.jqplot.LinearTickGenerator.bestInterval=W;L.jqplot.LinearTickGenerator.bestLinearComponents=x;L.jqplot.LinearTickGenerator.bestConstrainedInterval=d;L.jqplot.MarkerRenderer=function(ah){this.show=true;this.style="filledCircle";this.lineWidth=2;this.size=9;this.color="#666666";this.shadow=true;this.shadowAngle=45;this.shadowOffset=1;this.shadowDepth=3;this.shadowAlpha="0.07";this.shadowRenderer=new L.jqplot.ShadowRenderer();this.shapeRenderer=new L.jqplot.ShapeRenderer();L.extend(true,this,ah)};L.jqplot.MarkerRenderer.prototype.init=function(ah){L.extend(true,this,ah);var aj={angle:this.shadowAngle,offset:this.shadowOffset,alpha:this.shadowAlpha,lineWidth:this.lineWidth,depth:this.shadowDepth,closePath:true};if(this.style.indexOf("filled")!=-1){aj.fill=true}if(this.style.indexOf("ircle")!=-1){aj.isarc=true;aj.closePath=false}this.shadowRenderer.init(aj);var ai={fill:false,isarc:false,strokeStyle:this.color,fillStyle:this.color,lineWidth:this.lineWidth,closePath:true};if(this.style.indexOf("filled")!=-1){ai.fill=true}if(this.style.indexOf("ircle")!=-1){ai.isarc=true;ai.closePath=false}this.shapeRenderer.init(ai)};L.jqplot.MarkerRenderer.prototype.drawDiamond=function(aj,ai,am,al,ao){var ah=1.2;var ap=this.size/2/ah;var an=this.size/2*ah;var ak=[[aj-ap,ai],[aj,ai+an],[aj+ap,ai],[aj,ai-an]];if(this.shadow){this.shadowRenderer.draw(am,ak)}this.shapeRenderer.draw(am,ak,ao)};L.jqplot.MarkerRenderer.prototype.drawPlus=function(ak,aj,an,am,aq){var ai=1;var ar=this.size/2*ai;var ao=this.size/2*ai;var ap=[[ak,aj-ao],[ak,aj+ao]];var al=[[ak+ar,aj],[ak-ar,aj]];var ah=L.extend(true,{},this.options,{closePath:false});if(this.shadow){this.shadowRenderer.draw(an,ap,{closePath:false});this.shadowRenderer.draw(an,al,{closePath:false})}this.shapeRenderer.draw(an,ap,ah);this.shapeRenderer.draw(an,al,ah)};L.jqplot.MarkerRenderer.prototype.drawX=function(ak,aj,an,am,aq){var ai=1;var ar=this.size/2*ai;var ao=this.size/2*ai;var ah=L.extend(true,{},this.options,{closePath:false});var ap=[[ak-ar,aj-ao],[ak+ar,aj+ao]];var al=[[ak-ar,aj+ao],[ak+ar,aj-ao]];if(this.shadow){this.shadowRenderer.draw(an,ap,{closePath:false});this.shadowRenderer.draw(an,al,{closePath:false})}this.shapeRenderer.draw(an,ap,ah);this.shapeRenderer.draw(an,al,ah)};L.jqplot.MarkerRenderer.prototype.drawDash=function(aj,ai,am,al,ao){var ah=1;var ap=this.size/2*ah;var an=this.size/2*ah;var ak=[[aj-ap,ai],[aj+ap,ai]];if(this.shadow){this.shadowRenderer.draw(am,ak)}this.shapeRenderer.draw(am,ak,ao)};L.jqplot.MarkerRenderer.prototype.drawLine=function(am,al,ah,ak,ai){var aj=[am,al];if(this.shadow){this.shadowRenderer.draw(ah,aj)}this.shapeRenderer.draw(ah,aj,ai)};L.jqplot.MarkerRenderer.prototype.drawSquare=function(aj,ai,am,al,ao){var ah=1;var ap=this.size/2/ah;var an=this.size/2*ah;var ak=[[aj-ap,ai-an],[aj-ap,ai+an],[aj+ap,ai+an],[aj+ap,ai-an]];if(this.shadow){this.shadowRenderer.draw(am,ak)}this.shapeRenderer.draw(am,ak,ao)};L.jqplot.MarkerRenderer.prototype.drawCircle=function(ai,ao,ak,an,al){var ah=this.size/2;var aj=2*Math.PI;var am=[ai,ao,ah,0,aj,true];if(this.shadow){this.shadowRenderer.draw(ak,am)}this.shapeRenderer.draw(ak,am,al)};L.jqplot.MarkerRenderer.prototype.draw=function(ah,ak,ai,aj){aj=aj||{};if(aj.show==null||aj.show!=false){if(aj.color&&!aj.fillStyle){aj.fillStyle=aj.color}if(aj.color&&!aj.strokeStyle){aj.strokeStyle=aj.color}switch(this.style){case"diamond":this.drawDiamond(ah,ak,ai,false,aj);break;case"filledDiamond":this.drawDiamond(ah,ak,ai,true,aj);break;case"circle":this.drawCircle(ah,ak,ai,false,aj);break;case"filledCircle":this.drawCircle(ah,ak,ai,true,aj);break;case"square":this.drawSquare(ah,ak,ai,false,aj);break;case"filledSquare":this.drawSquare(ah,ak,ai,true,aj);break;case"x":this.drawX(ah,ak,ai,true,aj);break;case"plus":this.drawPlus(ah,ak,ai,true,aj);break;case"dash":this.drawDash(ah,ak,ai,true,aj);break;case"line":this.drawLine(ah,ak,ai,false,aj);break;default:this.drawDiamond(ah,ak,ai,false,aj);break}}};L.jqplot.ShadowRenderer=function(ah){this.angle=45;this.offset=1;this.alpha=0.07;this.lineWidth=1.5;this.lineJoin="miter";this.lineCap="round";this.closePath=false;this.fill=false;this.depth=3;this.strokeStyle="rgba(0,0,0,0.1)";this.isarc=false;L.extend(true,this,ah)};L.jqplot.ShadowRenderer.prototype.init=function(ah){L.extend(true,this,ah)};L.jqplot.ShadowRenderer.prototype.draw=function(av,at,ax){av.save();var ah=(ax!=null)?ax:{};var au=(ah.fill!=null)?ah.fill:this.fill;var ap=(ah.fillRect!=null)?ah.fillRect:this.fillRect;var ao=(ah.closePath!=null)?ah.closePath:this.closePath;var al=(ah.offset!=null)?ah.offset:this.offset;var aj=(ah.alpha!=null)?ah.alpha:this.alpha;var an=(ah.depth!=null)?ah.depth:this.depth;var aw=(ah.isarc!=null)?ah.isarc:this.isarc;var aq=(ah.linePattern!=null)?ah.linePattern:this.linePattern;av.lineWidth=(ah.lineWidth!=null)?ah.lineWidth:this.lineWidth;av.lineJoin=(ah.lineJoin!=null)?ah.lineJoin:this.lineJoin;av.lineCap=(ah.lineCap!=null)?ah.lineCap:this.lineCap;av.strokeStyle=ah.strokeStyle||this.strokeStyle||"rgba(0,0,0,"+aj+")";av.fillStyle=ah.fillStyle||this.fillStyle||"rgba(0,0,0,"+aj+")";for(var ak=0;ak<an;ak++){var ar=L.jqplot.LinePattern(av,aq);av.translate(Math.cos(this.angle*Math.PI/180)*al,Math.sin(this.angle*Math.PI/180)*al);ar.beginPath();if(aw){av.arc(at[0],at[1],at[2],at[3],at[4],true)}else{if(ap){if(ap){av.fillRect(at[0],at[1],at[2],at[3])}}else{if(at&&at.length){var ai=true;for(var am=0;am<at.length;am++){if(at[am][0]!=null&&at[am][1]!=null){if(ai){ar.moveTo(at[am][0],at[am][1]);ai=false}else{ar.lineTo(at[am][0],at[am][1])}}else{ai=true}}}}}if(ao){ar.closePath()}if(au){av.fill()}else{av.stroke()}}av.restore()};L.jqplot.ShapeRenderer=function(ah){this.lineWidth=1.5;this.linePattern="solid";this.lineJoin="miter";this.lineCap="round";this.closePath=false;this.fill=false;this.isarc=false;this.fillRect=false;this.strokeRect=false;this.clearRect=false;this.strokeStyle="#999999";this.fillStyle="#999999";L.extend(true,this,ah)};L.jqplot.ShapeRenderer.prototype.init=function(ah){L.extend(true,this,ah)};L.jqplot.ShapeRenderer.prototype.draw=function(at,aq,av){at.save();var ah=(av!=null)?av:{};var ar=(ah.fill!=null)?ah.fill:this.fill;var am=(ah.closePath!=null)?ah.closePath:this.closePath;var an=(ah.fillRect!=null)?ah.fillRect:this.fillRect;var ak=(ah.strokeRect!=null)?ah.strokeRect:this.strokeRect;var ai=(ah.clearRect!=null)?ah.clearRect:this.clearRect;var au=(ah.isarc!=null)?ah.isarc:this.isarc;var ao=(ah.linePattern!=null)?ah.linePattern:this.linePattern;var ap=L.jqplot.LinePattern(at,ao);at.lineWidth=ah.lineWidth||this.lineWidth;at.lineJoin=ah.lineJoin||this.lineJoin;at.lineCap=ah.lineCap||this.lineCap;at.strokeStyle=(ah.strokeStyle||ah.color)||this.strokeStyle;at.fillStyle=ah.fillStyle||this.fillStyle;at.beginPath();if(au){at.arc(aq[0],aq[1],aq[2],aq[3],aq[4],true);if(am){at.closePath()}if(ar){at.fill()}else{at.stroke()}at.restore();return}else{if(ai){at.clearRect(aq[0],aq[1],aq[2],aq[3]);at.restore();return}else{if(an||ak){if(an){at.fillRect(aq[0],aq[1],aq[2],aq[3])}if(ak){at.strokeRect(aq[0],aq[1],aq[2],aq[3]);at.restore();return}}else{if(aq&&aq.length){var aj=true;for(var al=0;al<aq.length;al++){if(aq[al][0]!=null&&aq[al][1]!=null){if(aj){ap.moveTo(aq[al][0],aq[al][1]);aj=false}else{ap.lineTo(aq[al][0],aq[al][1])}}else{aj=true}}if(am){ap.closePath()}if(ar){at.fill()}else{at.stroke()}}}}}at.restore()};L.jqplot.TableLegendRenderer=function(){};L.jqplot.TableLegendRenderer.prototype.init=function(ah){L.extend(true,this,ah)};L.jqplot.TableLegendRenderer.prototype.addrow=function(aq,ak,ah,ao){var al=(ah)?this.rowSpacing+"px":"0px";var ap;var aj;var ai;var an;var am;ai=document.createElement("tr");ap=L(ai);ap.addClass("jqplot-table-legend");ai=null;if(ao){ap.prependTo(this._elem)}else{ap.appendTo(this._elem)}if(this.showSwatches){aj=L(document.createElement("td"));aj.addClass("jqplot-table-legend jqplot-table-legend-swatch");aj.css({textAlign:"center",paddingTop:al});an=L(document.createElement("div"));an.addClass("jqplot-table-legend-swatch-outline");am=L(document.createElement("div"));am.addClass("jqplot-table-legend-swatch");am.css({backgroundColor:ak,borderColor:ak});ap.append(aj.append(an.append(am)))}if(this.showLabels){aj=L(document.createElement("td"));aj.addClass("jqplot-table-legend jqplot-table-legend-label");aj.css("paddingTop",al);ap.append(aj);if(this.escapeHtml){aj.text(aq)}else{aj.html(aq)}}aj=null;an=null;am=null;ap=null;ai=null};L.jqplot.TableLegendRenderer.prototype.draw=function(){if(this._elem){this._elem.emptyForce();this._elem=null}if(this.show){var am=this._series;var ai=document.createElement("table");this._elem=L(ai);this._elem.addClass("jqplot-table-legend");var ar={position:"absolute"};if(this.background){ar.background=this.background}if(this.border){ar.border=this.border}if(this.fontSize){ar.fontSize=this.fontSize}if(this.fontFamily){ar.fontFamily=this.fontFamily}if(this.textColor){ar.textColor=this.textColor}if(this.marginTop!=null){ar.marginTop=this.marginTop}if(this.marginBottom!=null){ar.marginBottom=this.marginBottom}if(this.marginLeft!=null){ar.marginLeft=this.marginLeft}if(this.marginRight!=null){ar.marginRight=this.marginRight}var ah=false,ao=false,aq;for(var an=0;an<am.length;an++){aq=am[an];if(aq._stack||aq.renderer.constructor==L.jqplot.BezierCurveRenderer){ao=true}if(aq.show&&aq.showLabel){var al=this.labels[an]||aq.label.toString();if(al){var aj=aq.color;if(ao&&an<am.length-1){ah=true}else{if(ao&&an==am.length-1){ah=false}}this.renderer.addrow.call(this,al,aj,ah,ao);ah=true}for(var ak=0;ak<L.jqplot.addLegendRowHooks.length;ak++){var ap=L.jqplot.addLegendRowHooks[ak].call(this,aq);if(ap){this.renderer.addrow.call(this,ap.label,ap.color,ah);ah=true}}al=null}}}return this._elem};L.jqplot.TableLegendRenderer.prototype.pack=function(aj){if(this.show){if(this.placement=="insideGrid"){switch(this.location){case"nw":var ai=aj.left;var ah=aj.top;this._elem.css("left",ai);this._elem.css("top",ah);break;case"n":var ai=(aj.left+(this._plotDimensions.width-aj.right))/2-this.getWidth()/2;var ah=aj.top;this._elem.css("left",ai);this._elem.css("top",ah);break;case"ne":var ai=aj.right;var ah=aj.top;this._elem.css({right:ai,top:ah});break;case"e":var ai=aj.right;var ah=(aj.top+(this._plotDimensions.height-aj.bottom))/2-this.getHeight()/2;this._elem.css({right:ai,top:ah});break;case"se":var ai=aj.right;var ah=aj.bottom;this._elem.css({right:ai,bottom:ah});break;case"s":var ai=(aj.left+(this._plotDimensions.width-aj.right))/2-this.getWidth()/2;var ah=aj.bottom;this._elem.css({left:ai,bottom:ah});break;case"sw":var ai=aj.left;var ah=aj.bottom;this._elem.css({left:ai,bottom:ah});break;case"w":var ai=aj.left;var ah=(aj.top+(this._plotDimensions.height-aj.bottom))/2-this.getHeight()/2;this._elem.css({left:ai,top:ah});break;default:var ai=aj.right;var ah=aj.bottom;this._elem.css({right:ai,bottom:ah});break}}else{if(this.placement=="outside"){switch(this.location){case"nw":var ai=this._plotDimensions.width-aj.left;var ah=aj.top;this._elem.css("right",ai);this._elem.css("top",ah);break;case"n":var ai=(aj.left+(this._plotDimensions.width-aj.right))/2-this.getWidth()/2;var ah=this._plotDimensions.height-aj.top;this._elem.css("left",ai);this._elem.css("bottom",ah);break;case"ne":var ai=this._plotDimensions.width-aj.right;var ah=aj.top;this._elem.css({left:ai,top:ah});break;case"e":var ai=this._plotDimensions.width-aj.right;var ah=(aj.top+(this._plotDimensions.height-aj.bottom))/2-this.getHeight()/2;this._elem.css({left:ai,top:ah});break;case"se":var ai=this._plotDimensions.width-aj.right;var ah=aj.bottom;this._elem.css({left:ai,bottom:ah});break;case"s":var ai=(aj.left+(this._plotDimensions.width-aj.right))/2-this.getWidth()/2;var ah=this._plotDimensions.height-aj.bottom;this._elem.css({left:ai,top:ah});break;case"sw":var ai=this._plotDimensions.width-aj.left;var ah=aj.bottom;this._elem.css({right:ai,bottom:ah});break;case"w":var ai=this._plotDimensions.width-aj.left;var ah=(aj.top+(this._plotDimensions.height-aj.bottom))/2-this.getHeight()/2;this._elem.css({right:ai,top:ah});break;default:var ai=aj.right;var ah=aj.bottom;this._elem.css({right:ai,bottom:ah});break}}else{switch(this.location){case"nw":this._elem.css({left:0,top:aj.top});break;case"n":var ai=(aj.left+(this._plotDimensions.width-aj.right))/2-this.getWidth()/2;this._elem.css({left:ai,top:aj.top});break;case"ne":this._elem.css({right:0,top:aj.top});break;case"e":var ah=(aj.top+(this._plotDimensions.height-aj.bottom))/2-this.getHeight()/2;this._elem.css({right:aj.right,top:ah});break;case"se":this._elem.css({right:aj.right,bottom:aj.bottom});break;case"s":var ai=(aj.left+(this._plotDimensions.width-aj.right))/2-this.getWidth()/2;this._elem.css({left:ai,bottom:aj.bottom});break;case"sw":this._elem.css({left:aj.left,bottom:aj.bottom});break;case"w":var ah=(aj.top+(this._plotDimensions.height-aj.bottom))/2-this.getHeight()/2;this._elem.css({left:aj.left,top:ah});break;default:this._elem.css({right:aj.right,bottom:aj.bottom});break}}}}};L.jqplot.ThemeEngine=function(){this.themes={};this.activeTheme=null};L.jqplot.ThemeEngine.prototype.init=function(){var ak=new L.jqplot.Theme({_name:"Default"});var an,ai,am;for(an in ak.target){if(an=="textColor"){ak.target[an]=this.target.css("color")}else{ak.target[an]=this.target.css(an)}}if(this.title.show&&this.title._elem){for(an in ak.title){if(an=="textColor"){ak.title[an]=this.title._elem.css("color")}else{ak.title[an]=this.title._elem.css(an)}}}for(an in ak.grid){ak.grid[an]=this.grid[an]}if(ak.grid.backgroundColor==null&&this.grid.background!=null){ak.grid.backgroundColor=this.grid.background}if(this.legend.show&&this.legend._elem){for(an in ak.legend){if(an=="textColor"){ak.legend[an]=this.legend._elem.css("color")}else{ak.legend[an]=this.legend._elem.css(an)}}}var aj;for(ai=0;ai<this.series.length;ai++){aj=this.series[ai];if(aj.renderer.constructor==L.jqplot.LineRenderer){ak.series.push(new p())}else{if(aj.renderer.constructor==L.jqplot.BarRenderer){ak.series.push(new T())}else{if(aj.renderer.constructor==L.jqplot.PieRenderer){ak.series.push(new f())}else{if(aj.renderer.constructor==L.jqplot.DonutRenderer){ak.series.push(new G())}else{if(aj.renderer.constructor==L.jqplot.FunnelRenderer){ak.series.push(new Z())}else{if(aj.renderer.constructor==L.jqplot.MeterGaugeRenderer){ak.series.push(new D())}else{ak.series.push({})}}}}}}for(an in ak.series[ai]){ak.series[ai][an]=aj[an]}}var ah,al;for(an in this.axes){al=this.axes[an];ah=ak.axes[an]=new P();ah.borderColor=al.borderColor;ah.borderWidth=al.borderWidth;if(al._ticks&&al._ticks[0]){for(am in ah.ticks){if(al._ticks[0].hasOwnProperty(am)){ah.ticks[am]=al._ticks[0][am]}else{if(al._ticks[0]._elem){ah.ticks[am]=al._ticks[0]._elem.css(am)}}}}if(al._label&&al._label.show){for(am in ah.label){if(al._label[am]){ah.label[am]=al._label[am]}else{if(al._label._elem){if(am=="textColor"){ah.label[am]=al._label._elem.css("color")}else{ah.label[am]=al._label._elem.css(am)}}}}}}this.themeEngine._add(ak);this.themeEngine.activeTheme=this.themeEngine.themes[ak._name]};L.jqplot.ThemeEngine.prototype.get=function(ah){if(!ah){return this.activeTheme}else{return this.themes[ah]}};function O(ai,ah){return ai-ah}L.jqplot.ThemeEngine.prototype.getThemeNames=function(){var ah=[];for(var ai in this.themes){ah.push(ai)}return ah.sort(O)};L.jqplot.ThemeEngine.prototype.getThemes=function(){var ai=[];var ah=[];for(var ak in this.themes){ai.push(ak)}ai.sort(O);for(var aj=0;aj<ai.length;aj++){ah.push(this.themes[ai[aj]])}return ah};L.jqplot.ThemeEngine.prototype.activate=function(av,aB){var ah=false;if(!aB&&this.activeTheme&&this.activeTheme._name){aB=this.activeTheme._name}if(!this.themes.hasOwnProperty(aB)){throw new Error("No theme of that name")}else{var am=this.themes[aB];this.activeTheme=am;var aA,at=false,ar=false;var ai=["xaxis","x2axis","yaxis","y2axis"];for(aw=0;aw<ai.length;aw++){var an=ai[aw];if(am.axesStyles.borderColor!=null){av.axes[an].borderColor=am.axesStyles.borderColor}if(am.axesStyles.borderWidth!=null){av.axes[an].borderWidth=am.axesStyles.borderWidth}}for(var az in av.axes){var ak=av.axes[az];if(ak.show){var aq=am.axes[az]||{};var ao=am.axesStyles;var al=L.jqplot.extend(true,{},aq,ao);aA=(am.axesStyles.borderColor!=null)?am.axesStyles.borderColor:al.borderColor;if(al.borderColor!=null){ak.borderColor=al.borderColor;ah=true}aA=(am.axesStyles.borderWidth!=null)?am.axesStyles.borderWidth:al.borderWidth;if(al.borderWidth!=null){ak.borderWidth=al.borderWidth;ah=true}if(ak._ticks&&ak._ticks[0]){for(var aj in al.ticks){aA=al.ticks[aj];if(aA!=null){ak.tickOptions[aj]=aA;ak._ticks=[];ah=true}}}if(ak._label&&ak._label.show){for(var aj in al.label){aA=al.label[aj];if(aA!=null){ak.labelOptions[aj]=aA;ah=true}}}}}for(var au in am.grid){if(am.grid[au]!=null){av.grid[au]=am.grid[au]}}if(!ah){av.grid.draw()}if(av.legend.show){for(au in am.legend){if(am.legend[au]!=null){av.legend[au]=am.legend[au]}}}if(av.title.show){for(au in am.title){if(am.title[au]!=null){av.title[au]=am.title[au]}}}var aw;for(aw=0;aw<am.series.length;aw++){var ap={};var ay=false;for(au in am.series[aw]){aA=(am.seriesStyles[au]!=null)?am.seriesStyles[au]:am.series[aw][au];if(aA!=null){ap[au]=aA;if(au=="color"){av.series[aw].renderer.shapeRenderer.fillStyle=aA;av.series[aw].renderer.shapeRenderer.strokeStyle=aA;av.series[aw][au]=aA}else{if((au=="lineWidth")||(au=="linePattern")){av.series[aw].renderer.shapeRenderer[au]=aA;av.series[aw][au]=aA}else{if(au=="markerOptions"){V(av.series[aw].markerOptions,aA);V(av.series[aw].markerRenderer,aA)}else{av.series[aw][au]=aA}}}ah=true}}}if(ah){av.target.empty();av.draw()}for(au in am.target){if(am.target[au]!=null){av.target.css(au,am.target[au])}}}};L.jqplot.ThemeEngine.prototype._add=function(ai,ah){if(ah){ai._name=ah}if(!ai._name){ai._name=Date.parse(new Date())}if(!this.themes.hasOwnProperty(ai._name)){this.themes[ai._name]=ai}else{throw new Error("jqplot.ThemeEngine Error: Theme already in use")}};L.jqplot.ThemeEngine.prototype.remove=function(ah){if(ah=="Default"){return false}return delete this.themes[ah]};L.jqplot.ThemeEngine.prototype.newTheme=function(ah,aj){if(typeof(ah)=="object"){aj=aj||ah;ah=null}if(aj&&aj._name){ah=aj._name}else{ah=ah||Date.parse(new Date())}var ai=this.copy(this.themes.Default._name,ah);L.jqplot.extend(ai,aj);return ai};function B(aj){if(aj==null||typeof(aj)!="object"){return aj}var ah=new aj.constructor();for(var ai in aj){ah[ai]=B(aj[ai])}return ah}L.jqplot.clone=B;function V(aj,ai){if(ai==null||typeof(ai)!="object"){return}for(var ah in ai){if(ah=="highlightColors"){aj[ah]=B(ai[ah])}if(ai[ah]!=null&&typeof(ai[ah])=="object"){if(!aj.hasOwnProperty(ah)){aj[ah]={}}V(aj[ah],ai[ah])}else{aj[ah]=ai[ah]}}}L.jqplot.merge=V;L.jqplot.extend=function(){var am=arguments[0]||{},ak=1,al=arguments.length,ah=false,aj;if(typeof am==="boolean"){ah=am;am=arguments[1]||{};ak=2}if(typeof am!=="object"&&!toString.call(am)==="[object Function]"){am={}}for(;ak<al;ak++){if((aj=arguments[ak])!=null){for(var ai in aj){var an=am[ai],ao=aj[ai];if(am===ao){continue}if(ah&&ao&&typeof ao==="object"&&!ao.nodeType){am[ai]=L.jqplot.extend(ah,an||(ao.length!=null?[]:{}),ao)}else{if(ao!==u){am[ai]=ao}}}}}return am};L.jqplot.ThemeEngine.prototype.rename=function(ai,ah){if(ai=="Default"||ah=="Default"){throw new Error("jqplot.ThemeEngine Error: Cannot rename from/to Default")}if(this.themes.hasOwnProperty(ah)){throw new Error("jqplot.ThemeEngine Error: New name already in use.")}else{if(this.themes.hasOwnProperty(ai)){var aj=this.copy(ai,ah);this.remove(ai);return aj}}throw new Error("jqplot.ThemeEngine Error: Old name or new name invalid")};L.jqplot.ThemeEngine.prototype.copy=function(ah,aj,al){if(aj=="Default"){throw new Error("jqplot.ThemeEngine Error: Cannot copy over Default theme")}if(!this.themes.hasOwnProperty(ah)){var ai="jqplot.ThemeEngine Error: Source name invalid";throw new Error(ai)}if(this.themes.hasOwnProperty(aj)){var ai="jqplot.ThemeEngine Error: Target name invalid";throw new Error(ai)}else{var ak=B(this.themes[ah]);ak._name=aj;L.jqplot.extend(true,ak,al);this._add(ak);return ak}};L.jqplot.Theme=function(ah,ai){if(typeof(ah)=="object"){ai=ai||ah;ah=null}ah=ah||Date.parse(new Date());this._name=ah;this.target={backgroundColor:null};this.legend={textColor:null,fontFamily:null,fontSize:null,border:null,background:null};this.title={textColor:null,fontFamily:null,fontSize:null,textAlign:null};this.seriesStyles={};this.series=[];this.grid={drawGridlines:null,gridLineColor:null,gridLineWidth:null,backgroundColor:null,borderColor:null,borderWidth:null,shadow:null};this.axesStyles={label:{},ticks:{}};this.axes={};if(typeof(ai)=="string"){this._name=ai}else{if(typeof(ai)=="object"){L.jqplot.extend(true,this,ai)}}};var P=function(){this.borderColor=null;this.borderWidth=null;this.ticks=new o();this.label=new t()};var o=function(){this.show=null;this.showGridline=null;this.showLabel=null;this.showMark=null;this.size=null;this.textColor=null;this.whiteSpace=null;this.fontSize=null;this.fontFamily=null};var t=function(){this.textColor=null;this.whiteSpace=null;this.fontSize=null;this.fontFamily=null;this.fontWeight=null};var p=function(){this.color=null;this.lineWidth=null;this.linePattern=null;this.shadow=null;this.fillColor=null;this.showMarker=null;this.markerOptions=new I()};var I=function(){this.show=null;this.style=null;this.lineWidth=null;this.size=null;this.color=null;this.shadow=null};var T=function(){this.color=null;this.seriesColors=null;this.lineWidth=null;this.shadow=null;this.barPadding=null;this.barMargin=null;this.barWidth=null;this.highlightColors=null};var f=function(){this.seriesColors=null;this.padding=null;this.sliceMargin=null;this.fill=null;this.shadow=null;this.startAngle=null;this.lineWidth=null;this.highlightColors=null};var G=function(){this.seriesColors=null;this.padding=null;this.sliceMargin=null;this.fill=null;this.shadow=null;this.startAngle=null;this.lineWidth=null;this.innerDiameter=null;this.thickness=null;this.ringMargin=null;this.highlightColors=null};var Z=function(){this.color=null;this.lineWidth=null;this.shadow=null;this.padding=null;this.sectionMargin=null;this.seriesColors=null;this.highlightColors=null};var D=function(){this.padding=null;this.backgroundColor=null;this.ringColor=null;this.tickColor=null;this.ringWidth=null;this.intervalColors=null;this.intervalInnerRadius=null;this.intervalOuterRadius=null;this.hubRadius=null;this.needleThickness=null;this.needlePad=null};L.fn.jqplotChildText=function(){return L(this).contents().filter(function(){return this.nodeType==3}).text()};L.fn.jqplotGetComputedFontStyle=function(){var ak=window.getComputedStyle?window.getComputedStyle(this[0],""):this[0].currentStyle;var ai=ak["font-style"]?["font-style","font-weight","font-size","font-family"]:["fontStyle","fontWeight","fontSize","fontFamily"];var al=[];for(var aj=0;aj<ai.length;++aj){var ah=String(ak[ai[aj]]);if(ah&&ah!="normal"){al.push(ah)}}return al.join(" ")};L.fn.jqplotToImageCanvas=function(aj){aj=aj||{};var av=(aj.x_offset==null)?0:aj.x_offset;var ax=(aj.y_offset==null)?0:aj.y_offset;var al=(aj.backgroundColor==null)?"rgb(255,255,255)":aj.backgroundColor;if(L(this).width()==0||L(this).height()==0){return null}if(L.jqplot.use_excanvas){return null}var an=document.createElement("canvas");var aA=L(this).outerHeight(true);var at=L(this).outerWidth(true);var am=L(this).offset();var ao=am.left;var aq=am.top;var au=0,ar=0;var ay=["jqplot-table-legend","jqplot-xaxis-tick","jqplot-x2axis-tick","jqplot-yaxis-tick","jqplot-y2axis-tick","jqplot-y3axis-tick","jqplot-y4axis-tick","jqplot-y5axis-tick","jqplot-y6axis-tick","jqplot-y7axis-tick","jqplot-y8axis-tick","jqplot-y9axis-tick","jqplot-xaxis-label","jqplot-x2axis-label","jqplot-yaxis-label","jqplot-y2axis-label","jqplot-y3axis-label","jqplot-y4axis-label","jqplot-y5axis-label","jqplot-y6axis-label","jqplot-y7axis-label","jqplot-y8axis-label","jqplot-y9axis-label"];var ap,ah,ai,aB;for(var az=0;az<ay.length;az++){L(this).find("."+ay[az]).each(function(){ap=L(this).offset().top-aq;ah=L(this).offset().left-ao;aB=ah+L(this).outerWidth(true)+au;ai=ap+L(this).outerHeight(true)+ar;if(ah<-au){at=at-au-ah;au=-ah}if(ap<-ar){aA=aA-ar-ap;ar=-ap}if(aB>at){at=aB}if(ai>aA){aA=ai}})}an.width=at+Number(av);an.height=aA+Number(ax);var ak=an.getContext("2d");ak.save();ak.fillStyle=al;ak.fillRect(0,0,an.width,an.height);ak.restore();ak.translate(au,ar);ak.textAlign="left";ak.textBaseline="top";function aC(aE){var aF=parseInt(L(aE).css("line-height"),10);if(isNaN(aF)){aF=parseInt(L(aE).css("font-size"),10)*1.2}return aF}function aD(aF,aE,aS,aG,aO,aH){var aQ=aC(aF);var aK=L(aF).innerWidth();var aL=L(aF).innerHeight();var aN=aS.split(/\s+/);var aR=aN.length;var aP="";var aM=[];var aU=aO;var aT=aG;for(var aJ=0;aJ<aR;aJ++){aP+=aN[aJ];if(aE.measureText(aP).width>aK){aM.push(aJ);aP="";aJ--}}if(aM.length===0){if(L(aF).css("textAlign")==="center"){aT=aG+(aH-aE.measureText(aP).width)/2-au}aE.fillText(aS,aT,aO)}else{aP=aN.slice(0,aM[0]).join(" ");if(L(aF).css("textAlign")==="center"){aT=aG+(aH-aE.measureText(aP).width)/2-au}aE.fillText(aP,aT,aU);aU+=aQ;for(var aJ=1,aI=aM.length;aJ<aI;aJ++){aP=aN.slice(aM[aJ-1],aM[aJ]).join(" ");if(L(aF).css("textAlign")==="center"){aT=aG+(aH-aE.measureText(aP).width)/2-au}aE.fillText(aP,aT,aU);aU+=aQ}aP=aN.slice(aM[aJ-1],aN.length).join(" ");if(L(aF).css("textAlign")==="center"){aT=aG+(aH-aE.measureText(aP).width)/2-au}aE.fillText(aP,aT,aU)}}function aw(aG,aJ,aE){var aN=aG.tagName.toLowerCase();var aF=L(aG).position();var aK=window.getComputedStyle?window.getComputedStyle(aG,""):aG.currentStyle;var aI=aJ+aF.left+parseInt(aK.marginLeft,10)+parseInt(aK.borderLeftWidth,10)+parseInt(aK.paddingLeft,10);var aL=aE+aF.top+parseInt(aK.marginTop,10)+parseInt(aK.borderTopWidth,10)+parseInt(aK.paddingTop,10);var aM=an.width;if((aN=="div"||aN=="span")&&!L(aG).hasClass("jqplot-highlighter-tooltip")){L(aG).children().each(function(){aw(this,aI,aL)});var aO=L(aG).jqplotChildText();if(aO){ak.font=L(aG).jqplotGetComputedFontStyle();ak.fillStyle=L(aG).css("color");aD(aG,ak,aO,aI,aL,aM)}}else{if(aN==="table"&&L(aG).hasClass("jqplot-table-legend")){ak.strokeStyle=L(aG).css("border-top-color");ak.fillStyle=L(aG).css("background-color");ak.fillRect(aI,aL,L(aG).innerWidth(),L(aG).innerHeight());if(parseInt(L(aG).css("border-top-width"),10)>0){ak.strokeRect(aI,aL,L(aG).innerWidth(),L(aG).innerHeight())}L(aG).find("div.jqplot-table-legend-swatch-outline").each(function(){var aU=L(this);ak.strokeStyle=aU.css("border-top-color");var aQ=aI+aU.position().left;var aR=aL+aU.position().top;ak.strokeRect(aQ,aR,aU.innerWidth(),aU.innerHeight());aQ+=parseInt(aU.css("padding-left"),10);aR+=parseInt(aU.css("padding-top"),10);var aT=aU.innerHeight()-2*parseInt(aU.css("padding-top"),10);var aP=aU.innerWidth()-2*parseInt(aU.css("padding-left"),10);var aS=aU.children("div.jqplot-table-legend-swatch");ak.fillStyle=aS.css("background-color");ak.fillRect(aQ,aR,aP,aT)});L(aG).find("td.jqplot-table-legend-label").each(function(){var aR=L(this);var aP=aI+aR.position().left;var aQ=aL+aR.position().top+parseInt(aR.css("padding-top"),10);ak.font=aR.jqplotGetComputedFontStyle();ak.fillStyle=aR.css("color");aD(aR,ak,aR.text(),aP,aQ,aM)});var aH=null}else{if(aN=="canvas"){ak.drawImage(aG,aI,aL)}}}}L(this).children().each(function(){aw(this,av,ax)});return an};L.fn.jqplotToImageStr=function(ai){var ah=L(this).jqplotToImageCanvas(ai);if(ah){return ah.toDataURL("image/png")}else{return null}};L.fn.jqplotToImageElem=function(ah){var ai=document.createElement("img");var aj=L(this).jqplotToImageStr(ah);ai.src=aj;return ai};L.fn.jqplotToImageElemStr=function(ah){var ai="<img src="+L(this).jqplotToImageStr(ah)+" />";return ai};L.fn.jqplotSaveImage=function(){var ah=L(this).jqplotToImageStr({});if(ah){window.location.href=ah.replace("image/png","image/octet-stream")}};L.fn.jqplotViewImage=function(){var ai=L(this).jqplotToImageElemStr({});var aj=L(this).jqplotToImageStr({});if(ai){var ah=window.open("");ah.document.open("image/png");ah.document.write(ai);ah.document.close();ah=null}};var ag=function(){this.syntax=ag.config.syntax;this._type="jsDate";this.proxy=new Date();this.options={};this.locale=ag.regional.getLocale();this.formatString="";this.defaultCentury=ag.config.defaultCentury;switch(arguments.length){case 0:break;case 1:if(l(arguments[0])=="[object Object]"&&arguments[0]._type!="jsDate"){var aj=this.options=arguments[0];this.syntax=aj.syntax||this.syntax;this.defaultCentury=aj.defaultCentury||this.defaultCentury;this.proxy=ag.createDate(aj.date)}else{this.proxy=ag.createDate(arguments[0])}break;default:var ah=[];for(var ai=0;ai<arguments.length;ai++){ah.push(arguments[ai])}this.proxy=new Date();this.proxy.setFullYear.apply(this.proxy,ah.slice(0,3));if(ah.slice(3).length){this.proxy.setHours.apply(this.proxy,ah.slice(3))}break}};ag.config={defaultLocale:"en",syntax:"perl",defaultCentury:1900};ag.prototype.add=function(aj,ai){var ah=E[ai]||E.day;if(typeof ah=="number"){this.proxy.setTime(this.proxy.getTime()+(ah*aj))}else{ah.add(this,aj)}return this};ag.prototype.clone=function(){return new ag(this.proxy.getTime())};ag.prototype.getUtcOffset=function(){return this.proxy.getTimezoneOffset()*60000};ag.prototype.diff=function(ai,al,ah){ai=new ag(ai);if(ai===null){return null}var aj=E[al]||E.day;if(typeof aj=="number"){var ak=(this.proxy.getTime()-ai.proxy.getTime())/aj}else{var ak=aj.diff(this.proxy,ai.proxy)}return(ah?ak:Math[ak>0?"floor":"ceil"](ak))};ag.prototype.getAbbrDayName=function(){return ag.regional[this.locale]["dayNamesShort"][this.proxy.getDay()]};ag.prototype.getAbbrMonthName=function(){return ag.regional[this.locale]["monthNamesShort"][this.proxy.getMonth()]};ag.prototype.getAMPM=function(){return this.proxy.getHours()>=12?"PM":"AM"};ag.prototype.getAmPm=function(){return this.proxy.getHours()>=12?"pm":"am"};ag.prototype.getCentury=function(){return parseInt(this.proxy.getFullYear()/100,10)};ag.prototype.getDate=function(){return this.proxy.getDate()};ag.prototype.getDay=function(){return this.proxy.getDay()};ag.prototype.getDayOfWeek=function(){var ah=this.proxy.getDay();return ah===0?7:ah};ag.prototype.getDayOfYear=function(){var ai=this.proxy;var ah=ai-new Date(""+ai.getFullYear()+"/1/1 GMT");ah+=ai.getTimezoneOffset()*60000;ai=null;return parseInt(ah/60000/60/24,10)+1};ag.prototype.getDayName=function(){return ag.regional[this.locale]["dayNames"][this.proxy.getDay()]};ag.prototype.getFullWeekOfYear=function(){var ak=this.proxy;var ah=this.getDayOfYear();var aj=6-ak.getDay();var ai=parseInt((ah+aj)/7,10);return ai};ag.prototype.getFullYear=function(){return this.proxy.getFullYear()};ag.prototype.getGmtOffset=function(){var ah=this.proxy.getTimezoneOffset()/60;var ai=ah<0?"+":"-";ah=Math.abs(ah);return ai+N(Math.floor(ah),2)+":"+N((ah%1)*60,2)};ag.prototype.getHours=function(){return this.proxy.getHours()};ag.prototype.getHours12=function(){var ah=this.proxy.getHours();return ah>12?ah-12:(ah==0?12:ah)};ag.prototype.getIsoWeek=function(){var ak=this.proxy;var aj=this.getWeekOfYear();var ah=(new Date(""+ak.getFullYear()+"/1/1")).getDay();var ai=aj+(ah>4||ah<=1?0:1);if(ai==53&&(new Date(""+ak.getFullYear()+"/12/31")).getDay()<4){ai=1}else{if(ai===0){ak=new ag(new Date(""+(ak.getFullYear()-1)+"/12/31"));ai=ak.getIsoWeek()}}ak=null;return ai};ag.prototype.getMilliseconds=function(){return this.proxy.getMilliseconds()};ag.prototype.getMinutes=function(){return this.proxy.getMinutes()};ag.prototype.getMonth=function(){return this.proxy.getMonth()};ag.prototype.getMonthName=function(){return ag.regional[this.locale]["monthNames"][this.proxy.getMonth()]};ag.prototype.getMonthNumber=function(){return this.proxy.getMonth()+1};ag.prototype.getSeconds=function(){return this.proxy.getSeconds()};ag.prototype.getShortYear=function(){return this.proxy.getYear()%100};ag.prototype.getTime=function(){return this.proxy.getTime()};ag.prototype.getTimezoneAbbr=function(){return this.proxy.toString().replace(/^.*\(([^)]+)\)$/,"$1")};ag.prototype.getTimezoneName=function(){var ah=/(?:\((.+)\)$| ([A-Z]{3}) )/.exec(this.toString());return ah[1]||ah[2]||"GMT"+this.getGmtOffset()};ag.prototype.getTimezoneOffset=function(){return this.proxy.getTimezoneOffset()};ag.prototype.getWeekOfYear=function(){var ah=this.getDayOfYear();var aj=7-this.getDayOfWeek();var ai=parseInt((ah+aj)/7,10);return ai};ag.prototype.getUnix=function(){return Math.round(this.proxy.getTime()/1000,0)};ag.prototype.getYear=function(){return this.proxy.getYear()};ag.prototype.next=function(ah){ah=ah||"day";return this.clone().add(1,ah)};ag.prototype.set=function(){switch(arguments.length){case 0:this.proxy=new Date();break;case 1:if(l(arguments[0])=="[object Object]"&&arguments[0]._type!="jsDate"){var aj=this.options=arguments[0];this.syntax=aj.syntax||this.syntax;this.defaultCentury=aj.defaultCentury||this.defaultCentury;this.proxy=ag.createDate(aj.date)}else{this.proxy=ag.createDate(arguments[0])}break;default:var ah=[];for(var ai=0;ai<arguments.length;ai++){ah.push(arguments[ai])}this.proxy=new Date();this.proxy.setFullYear.apply(this.proxy,ah.slice(0,3));if(ah.slice(3).length){this.proxy.setHours.apply(this.proxy,ah.slice(3))}break}return this};ag.prototype.setDate=function(ah){this.proxy.setDate(ah);return this};ag.prototype.setFullYear=function(){this.proxy.setFullYear.apply(this.proxy,arguments);return this};ag.prototype.setHours=function(){this.proxy.setHours.apply(this.proxy,arguments);return this};ag.prototype.setMilliseconds=function(ah){this.proxy.setMilliseconds(ah);return this};ag.prototype.setMinutes=function(){this.proxy.setMinutes.apply(this.proxy,arguments);return this};ag.prototype.setMonth=function(){this.proxy.setMonth.apply(this.proxy,arguments);return this};ag.prototype.setSeconds=function(){this.proxy.setSeconds.apply(this.proxy,arguments);return this};ag.prototype.setTime=function(ah){this.proxy.setTime(ah);return this};ag.prototype.setYear=function(){this.proxy.setYear.apply(this.proxy,arguments);return this};ag.prototype.strftime=function(ah){ah=ah||this.formatString||ag.regional[this.locale]["formatString"];return ag.strftime(this,ah,this.syntax)};ag.prototype.toString=function(){return this.proxy.toString()};ag.prototype.toYmdInt=function(){return(this.proxy.getFullYear()*10000)+(this.getMonthNumber()*100)+this.proxy.getDate()};ag.regional={en:{monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],formatString:"%Y-%m-%d %H:%M:%S"},fr:{monthNames:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],monthNamesShort:["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],dayNames:["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],dayNamesShort:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],formatString:"%Y-%m-%d %H:%M:%S"},de:{monthNames:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],monthNamesShort:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],dayNames:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],dayNamesShort:["So","Mo","Di","Mi","Do","Fr","Sa"],formatString:"%Y-%m-%d %H:%M:%S"},es:{monthNames:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],monthNamesShort:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],dayNames:["Domingo","Lunes","Martes","Mi&eacute;rcoles","Jueves","Viernes","S&aacute;bado"],dayNamesShort:["Dom","Lun","Mar","Mi&eacute;","Juv","Vie","S&aacute;b"],formatString:"%Y-%m-%d %H:%M:%S"},ru:{monthNames:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthNamesShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],dayNames:["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],dayNamesShort:["вск","пнд","втр","срд","чтв","птн","сбт"],formatString:"%Y-%m-%d %H:%M:%S"},ar:{monthNames:["كانون الثاني","شباط","آذار","نيسان","آذار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول"],monthNamesShort:["1","2","3","4","5","6","7","8","9","10","11","12"],dayNames:["السبت","الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"],dayNamesShort:["سبت","أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة"],formatString:"%Y-%m-%d %H:%M:%S"},pt:{monthNames:["Janeiro","Fevereiro","Mar&ccedil;o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthNamesShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],dayNames:["Domingo","Segunda-feira","Ter&ccedil;a-feira","Quarta-feira","Quinta-feira","Sexta-feira","S&aacute;bado"],dayNamesShort:["Dom","Seg","Ter","Qua","Qui","Sex","S&aacute;b"],formatString:"%Y-%m-%d %H:%M:%S"},"pt-BR":{monthNames:["Janeiro","Fevereiro","Mar&ccedil;o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthNamesShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],dayNames:["Domingo","Segunda-feira","Ter&ccedil;a-feira","Quarta-feira","Quinta-feira","Sexta-feira","S&aacute;bado"],dayNamesShort:["Dom","Seg","Ter","Qua","Qui","Sex","S&aacute;b"],formatString:"%Y-%m-%d %H:%M:%S"},pl:{monthNames:["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],monthNamesShort:["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"],dayNames:["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],dayNamesShort:["Ni","Pn","Wt","Śr","Cz","Pt","Sb"],formatString:"%Y-%m-%d %H:%M:%S"},nl:{monthNames:["Januari","Februari","Maart","April","Mei","Juni","July","Augustus","September","Oktober","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],dayNames:","["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"],dayNamesShort:["Zo","Ma","Di","Wo","Do","Vr","Za"],formatString:"%Y-%m-%d %H:%M:%S"},sv:{monthNames:["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"],monthNamesShort:["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"],dayNames:["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],dayNamesShort:["sön","mån","tis","ons","tor","fre","lör"],formatString:"%Y-%m-%d %H:%M:%S"}};ag.regional["en-US"]=ag.regional["en-GB"]=ag.regional.en;ag.regional.getLocale=function(){var ah=ag.config.defaultLocale;if(document&&document.getElementsByTagName("html")&&document.getElementsByTagName("html")[0].lang){ah=document.getElementsByTagName("html")[0].lang;if(!ag.regional.hasOwnProperty(ah)){ah=ag.config.defaultLocale}}return ah};var C=24*60*60*1000;var N=function(ah,ak){ah=String(ah);var ai=ak-ah.length;var aj=String(Math.pow(10,ai)).slice(1);return aj.concat(ah)};var E={millisecond:1,second:1000,minute:60*1000,hour:60*60*1000,day:C,week:7*C,month:{add:function(aj,ah){E.year.add(aj,Math[ah>0?"floor":"ceil"](ah/12));var ai=aj.getMonth()+(ah%12);if(ai==12){ai=0;aj.setYear(aj.getFullYear()+1)}else{if(ai==-1){ai=11;aj.setYear(aj.getFullYear()-1)}}aj.setMonth(ai)},diff:function(al,aj){var ah=al.getFullYear()-aj.getFullYear();var ai=al.getMonth()-aj.getMonth()+(ah*12);var ak=al.getDate()-aj.getDate();return ai+(ak/30)}},year:{add:function(ai,ah){ai.setYear(ai.getFullYear()+Math[ah>0?"floor":"ceil"](ah))},diff:function(ai,ah){return E.month.diff(ai,ah)/12}}};for(var Y in E){if(Y.substring(Y.length-1)!="s"){E[Y+"s"]=E[Y]}}var H=function(al,ak,ai){if(ag.formats[ai]["shortcuts"][ak]){return ag.strftime(al,ag.formats[ai]["shortcuts"][ak],ai)}else{var ah=(ag.formats[ai]["codes"][ak]||"").split(".");var aj=al["get"+ah[0]]?al["get"+ah[0]]():"";if(ah[1]){aj=N(aj,ah[1])}return aj}};ag.strftime=function(an,ak,aj,ao){var ai="perl";var am=ag.regional.getLocale();if(aj&&ag.formats.hasOwnProperty(aj)){ai=aj}else{if(aj&&ag.regional.hasOwnProperty(aj)){am=aj}}if(ao&&ag.formats.hasOwnProperty(ao)){ai=ao}else{if(ao&&ag.regional.hasOwnProperty(ao)){am=ao}}if(l(an)!="[object Object]"||an._type!="jsDate"){an=new ag(an);an.locale=am}if(!ak){ak=an.formatString||ag.regional[am]["formatString"]}var ah=ak||"%Y-%m-%d",ap="",al;while(ah.length>0){if(al=ah.match(ag.formats[ai].codes.matcher)){ap+=ah.slice(0,al.index);ap+=(al[1]||"")+H(an,al[2],ai);ah=ah.slice(al.index+al[0].length)}else{ap+=ah;ah=""}}return ap};ag.formats={ISO:"%Y-%m-%dT%H:%M:%S.%N%G",SQL:"%Y-%m-%d %H:%M:%S"};ag.formats.perl={codes:{matcher:/()%(#?(%|[a-z]))/i,Y:"FullYear",y:"ShortYear.2",m:"MonthNumber.2","#m":"MonthNumber",B:"MonthName",b:"AbbrMonthName",d:"Date.2","#d":"Date",e:"Date",A:"DayName",a:"AbbrDayName",w:"Day",H:"Hours.2","#H":"Hours",I:"Hours12.2","#I":"Hours12",p:"AMPM",M:"Minutes.2","#M":"Minutes",S:"Seconds.2","#S":"Seconds",s:"Unix",N:"Milliseconds.3","#N":"Milliseconds",O:"TimezoneOffset",Z:"TimezoneName",G:"GmtOffset"},shortcuts:{F:"%Y-%m-%d",T:"%H:%M:%S",X:"%H:%M:%S",x:"%m/%d/%y",D:"%m/%d/%y","#c":"%a %b %e %H:%M:%S %Y",v:"%e-%b-%Y",R:"%H:%M",r:"%I:%M:%S %p",t:"\t",n:"\n","%":"%"}};ag.formats.php={codes:{matcher:/()%((%|[a-z]))/i,a:"AbbrDayName",A:"DayName",d:"Date.2",e:"Date",j:"DayOfYear.3",u:"DayOfWeek",w:"Day",U:"FullWeekOfYear.2",V:"IsoWeek.2",W:"WeekOfYear.2",b:"AbbrMonthName",B:"MonthName",m:"MonthNumber.2",h:"AbbrMonthName",C:"Century.2",y:"ShortYear.2",Y:"FullYear",H:"Hours.2",I:"Hours12.2",l:"Hours12",p:"AMPM",P:"AmPm",M:"Minutes.2",S:"Seconds.2",s:"Unix",O:"TimezoneOffset",z:"GmtOffset",Z:"TimezoneAbbr"},shortcuts:{D:"%m/%d/%y",F:"%Y-%m-%d",T:"%H:%M:%S",X:"%H:%M:%S",x:"%m/%d/%y",R:"%H:%M",r:"%I:%M:%S %p",t:"\t",n:"\n","%":"%"}};ag.createDate=function(aj){if(aj==null){return new Date()}if(aj instanceof Date){return aj}if(typeof aj=="number"){return new Date(aj)}var ao=String(aj).replace(/^\s*(.+)\s*$/g,"$1");ao=ao.replace(/^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,4})/,"$1/$2/$3");ao=ao.replace(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{4})/i,"$1 $2 $3");var an=ao.match(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{2})\D*/i);if(an&&an.length>3){var at=parseFloat(an[3]);var am=ag.config.defaultCentury+at;am=String(am);ao=ao.replace(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{2})\D*/i,an[1]+" "+an[2]+" "+am)}an=ao.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})[^0-9]/);function ar(ax,aw){var aC=parseFloat(aw[1]);var aB=parseFloat(aw[2]);var aA=parseFloat(aw[3]);var az=ag.config.defaultCentury;var av,au,aD,ay;if(aC>31){au=aA;aD=aB;av=az+aC}else{au=aB;aD=aC;av=az+aA}ay=aD+"/"+au+"/"+av;return ax.replace(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})/,ay)}if(an&&an.length>3){ao=ar(ao,an)}var an=ao.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})$/);if(an&&an.length>3){ao=ar(ao,an)}var al=0;var ai=ag.matchers.length;var aq,ah,ap=ao,ak;while(al<ai){ah=Date.parse(ap);if(!isNaN(ah)){return new Date(ah)}aq=ag.matchers[al];if(typeof aq=="function"){ak=aq.call(ag,ap);if(ak instanceof Date){return ak}}else{ap=ao.replace(aq[0],aq[1])}al++}return NaN};ag.daysInMonth=function(ah,ai){if(ai==2){return new Date(ah,1,29).getDate()==29?29:28}return[u,31,u,31,30,31,30,31,31,30,31,30,31][ai]};ag.matchers=[[/(3[01]|[0-2]\d)\s*\.\s*(1[0-2]|0\d)\s*\.\s*([1-9]\d{3})/,"$2/$1/$3"],[/([1-9]\d{3})\s*-\s*(1[0-2]|0\d)\s*-\s*(3[01]|[0-2]\d)/,"$2/$3/$1"],function(ak){var ai=ak.match(/^(?:(.+)\s+)?([012]?\d)(?:\s*\:\s*(\d\d))?(?:\s*\:\s*(\d\d(\.\d*)?))?\s*(am|pm)?\s*$/i);if(ai){if(ai[1]){var aj=this.createDate(ai[1]);if(isNaN(aj)){return}}else{var aj=new Date();aj.setMilliseconds(0)}var ah=parseFloat(ai[2]);if(ai[6]){ah=ai[6].toLowerCase()=="am"?(ah==12?0:ah):(ah==12?12:ah+12)}aj.setHours(ah,parseInt(ai[3]||0,10),parseInt(ai[4]||0,10),((parseFloat(ai[5]||0))||0)*1000);return aj}else{return ak}},function(ak){var ai=ak.match(/^(?:(.+))[T|\s+]([012]\d)(?:\:(\d\d))(?:\:(\d\d))(?:\.\d+)([\+\-]\d\d\:\d\d)$/i);if(ai){if(ai[1]){var aj=this.createDate(ai[1]);if(isNaN(aj)){return}}else{var aj=new Date();aj.setMilliseconds(0)}var ah=parseFloat(ai[2]);aj.setHours(ah,parseInt(ai[3],10),parseInt(ai[4],10),parseFloat(ai[5])*1000);return aj}else{return ak}},function(al){var aj=al.match(/^([0-3]?\d)\s*[-\/.\s]{1}\s*([a-zA-Z]{3,9})\s*[-\/.\s]{1}\s*([0-3]?\d)$/);if(aj){var ak=new Date();var am=ag.config.defaultCentury;var ao=parseFloat(aj[1]);var an=parseFloat(aj[3]);var ai,ah,ap;if(ao>31){ah=an;ai=am+ao}else{ah=ao;ai=am+an}var ap=ab(aj[2],ag.regional[ag.regional.getLocale()]["monthNamesShort"]);if(ap==-1){ap=ab(aj[2],ag.regional[ag.regional.getLocale()]["monthNames"])}ak.setFullYear(ai,ap,ah);ak.setHours(0,0,0,0);return ak}else{return al}}];function ab(aj,ak){if(ak.indexOf){return ak.indexOf(aj)}for(var ah=0,ai=ak.length;ah<ai;ah++){if(ak[ah]===aj){return ah}}return -1}function l(ah){if(ah===null){return"[object Null]"}return Object.prototype.toString.call(ah)}L.jsDate=ag;L.jqplot.sprintf=function(){function an(au,ap,aq,at){var ar=(au.length>=ap)?"":Array(1+ap-au.length>>>0).join(aq);return at?au+ar:ar+au}function ak(ar){var aq=new String(ar);for(var ap=10;ap>0;ap--){if(aq==(aq=aq.replace(/^(\d+)(\d{3})/,"$1"+L.jqplot.sprintf.thousandsSeparator+"$2"))){break}}return aq}function aj(av,au,ax,ar,at,aq){var aw=ar-av.length;if(aw>0){var ap=" ";if(aq){ap="&nbsp;"}if(ax||!at){av=an(av,ar,ap,ax)}else{av=av.slice(0,au.length)+an("",aw,"0",true)+av.slice(au.length)}}return av}function ao(ay,aq,aw,ar,ap,av,ax,au){var at=ay>>>0;aw=aw&&at&&{"2":"0b","8":"0","16":"0x"}[aq]||"";ay=aw+an(at.toString(aq),av||0,"0",false);return aj(ay,aw,ar,ap,ax,au)}function ah(au,av,ar,ap,at,aq){if(ap!=null){au=au.slice(0,ap)}return aj(au,"",av,ar,at,aq)}var ai=arguments,al=0,am=ai[al++];return am.replace(L.jqplot.sprintf.regex,function(aM,ax,ay,aB,aO,aJ,av){if(aM=="%%"){return"%"}var aD=false,az="",aA=false,aL=false,aw=false,au=false;for(var aI=0;ay&&aI<ay.length;aI++){switch(ay.charAt(aI)){case" ":az=" ";break;case"+":az="+";break;case"-":aD=true;break;case"0":aA=true;break;case"#":aL=true;break;case"&":aw=true;break;case"'":au=true;break}}if(!aB){aB=0}else{if(aB=="*"){aB=+ai[al++]}else{if(aB.charAt(0)=="*"){aB=+ai[aB.slice(1,-1)]}else{aB=+aB}}}if(aB<0){aB=-aB;aD=true}if(!isFinite(aB)){throw new Error("$.jqplot.sprintf: (minimum-)width must be finite")}if(!aJ){aJ="fFeE".indexOf(av)>-1?6:(av=="d")?0:void (0)}else{if(aJ=="*"){aJ=+ai[al++]}else{if(aJ.charAt(0)=="*"){aJ=+ai[aJ.slice(1,-1)]}else{aJ=+aJ}}}var aF=ax?ai[ax.slice(0,-1)]:ai[al++];switch(av){case"s":if(aF==null){return""}return ah(String(aF),aD,aB,aJ,aA,aw);case"c":return ah(String.fromCharCode(+aF),aD,aB,aJ,aA,aw);case"b":return ao(aF,2,aL,aD,aB,aJ,aA,aw);case"o":return ao(aF,8,aL,aD,aB,aJ,aA,aw);case"x":return ao(aF,16,aL,aD,aB,aJ,aA,aw);case"X":return ao(aF,16,aL,aD,aB,aJ,aA,aw).toUpperCase();case"u":return ao(aF,10,aL,aD,aB,aJ,aA,aw);case"i":var ar=parseInt(+aF,10);if(isNaN(ar)){return""}var aH=ar<0?"-":az;var aK=au?ak(String(Math.abs(ar))):String(Math.abs(ar));aF=aH+an(aK,aJ,"0",false);return aj(aF,aH,aD,aB,aA,aw);case"d":var ar=Math.round(+aF);if(isNaN(ar)){return""}var aH=ar<0?"-":az;var aK=au?ak(String(Math.abs(ar))):String(Math.abs(ar));aF=aH+an(aK,aJ,"0",false);return aj(aF,aH,aD,aB,aA,aw);case"e":case"E":case"f":case"F":case"g":case"G":var ar=+aF;if(isNaN(ar)){return""}var aH=ar<0?"-":az;var at=["toExponential","toFixed","toPrecision"]["efg".indexOf(av.toLowerCase())];var aN=["toString","toUpperCase"]["eEfFgG".indexOf(av)%2];var aK=Math.abs(ar)[at](aJ);var aE=aK.toString().split(".");aE[0]=au?ak(aE[0]):aE[0];aK=aE.join(L.jqplot.sprintf.decimalMark);aF=aH+aK;var aC=aj(aF,aH,aD,aB,aA,aw)[aN]();return aC;case"p":case"P":var ar=+aF;if(isNaN(ar)){return""}var aH=ar<0?"-":az;var aE=String(Number(Math.abs(ar)).toExponential()).split(/e|E/);var aq=(aE[0].indexOf(".")!=-1)?aE[0].length-1:String(ar).length;var aG=(aE[1]<0)?-aE[1]-1:0;if(Math.abs(ar)<1){if(aq+aG<=aJ){aF=aH+Math.abs(ar).toPrecision(aq)}else{if(aq<=aJ-1){aF=aH+Math.abs(ar).toExponential(aq-1)}else{aF=aH+Math.abs(ar).toExponential(aJ-1)}}}else{var ap=(aq<=aJ)?aq:aJ;aF=aH+Math.abs(ar).toPrecision(ap)}var aN=["toString","toUpperCase"]["pP".indexOf(av)%2];return aj(aF,aH,aD,aB,aA,aw)[aN]();case"n":return"";default:return aM}})};L.jqplot.sprintf.thousandsSeparator=",";L.jqplot.sprintf.decimalMark=".";L.jqplot.sprintf.regex=/%%|%(\d+\$)?([-+#0&\' ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([nAscboxXuidfegpEGP])/g;L.jqplot.getSignificantFigures=function(al){var an=String(Number(Math.abs(al)).toExponential()).split(/e|E/);var am=(an[0].indexOf(".")!=-1)?an[0].length-1:an[0].length;var ai=(an[1]<0)?-an[1]-1:0;var ah=parseInt(an[1],10);var aj=(ah+1>0)?ah+1:0;var ak=(am<=aj)?0:am-ah-1;return{significantDigits:am,digitsLeft:aj,digitsRight:ak,zeros:ai,exponent:ah}};L.jqplot.getPrecision=function(ah){return L.jqplot.getSignificantFigures(ah).digitsRight};var X=L.uiBackCompat!==false;L.jqplot.effects={effect:{}};var m="jqplot.storage.";L.extend(L.jqplot.effects,{version:"1.9pre",save:function(ai,aj){for(var ah=0;ah<aj.length;ah++){if(aj[ah]!==null){ai.data(m+aj[ah],ai[0].style[aj[ah]])}}},restore:function(ai,aj){for(var ah=0;ah<aj.length;ah++){if(aj[ah]!==null){ai.css(aj[ah],ai.data(m+aj[ah]))}}},setMode:function(ah,ai){if(ai==="toggle"){ai=ah.is(":hidden")?"show":"hide"}return ai},createWrapper:function(ai){if(ai.parent().is(".ui-effects-wrapper")){return ai.parent()}var aj={width:ai.outerWidth(true),height:ai.outerHeight(true),"float":ai.css("float")},al=L("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),ah={width:ai.width(),height:ai.height()},ak=document.activeElement;ai.wrap(al);if(ai[0]===ak||L.contains(ai[0],ak)){L(ak).focus()}al=ai.parent();if(ai.css("position")==="static"){al.css({position:"relative"});ai.css({position:"relative"})}else{L.extend(aj,{position:ai.css("position"),zIndex:ai.css("z-index")});L.each(["top","left","bottom","right"],function(am,an){aj[an]=ai.css(an);if(isNaN(parseInt(aj[an],10))){aj[an]="auto"}});ai.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})}ai.css(ah);return al.css(aj).show()},removeWrapper:function(ah){var ai=document.activeElement;if(ah.parent().is(".ui-effects-wrapper")){ah.parent().replaceWith(ah);if(ah[0]===ai||L.contains(ah[0],ai)){L(ai).focus()}}return ah}});function j(ai,ah,aj,ak){if(L.isPlainObject(ai)){return ai}ai={effect:ai};if(ah===u){ah={}}if(L.isFunction(ah)){ak=ah;aj=null;ah={}}if(L.type(ah)==="number"||L.fx.speeds[ah]){ak=aj;aj=ah;ah={}}if(L.isFunction(aj)){ak=aj;aj=null}if(ah){L.extend(ai,ah)}aj=aj||ah.duration;ai.duration=L.fx.off?0:typeof aj==="number"?aj:aj in L.fx.speeds?L.fx.speeds[aj]:L.fx.speeds._default;ai.complete=ak||ah.complete;return ai}function ae(ah){if(!ah||typeof ah==="number"||L.fx.speeds[ah]){return true}if(typeof ah==="string"&&!L.jqplot.effects.effect[ah]){if(X&&L.jqplot.effects[ah]){return false}return true}return false}L.fn.extend({jqplotEffect:function(ap,aq,ai,ao){var an=j.apply(this,arguments),ak=an.mode,al=an.queue,am=L.jqplot.effects.effect[an.effect],ah=!am&&X&&L.jqplot.effects[an.effect];if(L.fx.off||!(am||ah)){if(ak){return this[ak](an.duration,an.complete)}else{return this.each(function(){if(an.complete){an.complete.call(this)}})}}function aj(au){var av=L(this),at=an.complete,aw=an.mode;function ar(){if(L.isFunction(at)){at.call(av[0])}if(L.isFunction(au)){au()}}if(av.is(":hidden")?aw==="hide":aw==="show"){ar()}else{am.call(av[0],an,ar)}}if(am){return al===false?this.each(aj):this.queue(al||"fx",aj)}else{return ah.call(this,{options:an,duration:an.duration,callback:an.complete,mode:an.mode})}}});var a=/up|down|vertical/,v=/up|left|vertical|horizontal/;L.jqplot.effects.effect.blind=function(aj,ao){var ak=L(this),ar=["position","top","bottom","left","right","height","width"],ap=L.jqplot.effects.setMode(ak,aj.mode||"hide"),au=aj.direction||"up",am=a.test(au),al=am?"height":"width",aq=am?"top":"left",aw=v.test(au),an={},av=ap==="show",ai,ah,at;if(ak.parent().is(".ui-effects-wrapper")){L.jqplot.effects.save(ak.parent(),ar)}else{L.jqplot.effects.save(ak,ar)}ak.show();at=parseInt(ak.css("top"),10);ai=L.jqplot.effects.createWrapper(ak).css({overflow:"hidden"});ah=am?ai[al]()+at:ai[al]();an[al]=av?String(ah):"0";if(!aw){ak.css(am?"bottom":"right",0).css(am?"top":"left","").css({position:"absolute"});an[aq]=av?"0":String(ah)}if(av){ai.css(al,0);if(!aw){ai.css(aq,ah)}}ai.animate(an,{duration:aj.duration,easing:aj.easing,queue:false,complete:function(){if(ap==="hide"){ak.hide()}L.jqplot.effects.restore(ak,ar);L.jqplot.effects.removeWrapper(ak);ao()}})}})(jQuery);/* jqPlot 1.0.8r1250 | (c) 2009-2013 Chris Leonello | jplot.com
   jsDate | (c) 2010-2013 Chris Leonello
 */(function(d){d.jqplot.BarRenderer=function(){d.jqplot.LineRenderer.call(this)};d.jqplot.BarRenderer.prototype=new d.jqplot.LineRenderer();d.jqplot.BarRenderer.prototype.constructor=d.jqplot.BarRenderer;d.jqplot.BarRenderer.prototype.init=function(o,q){this.barPadding=8;this.barMargin=10;this.barDirection="vertical";this.barWidth=null;this.shadowOffset=2;this.shadowDepth=5;this.shadowAlpha=0.08;this.waterfall=false;this.groups=1;this.varyBarColor=false;this.highlightMouseOver=true;this.highlightMouseDown=false;this.highlightColors=[];this.transposedData=true;this.renderer.animation={show:false,direction:"down",speed:3000,_supported:true};this._type="bar";if(o.highlightMouseDown&&o.highlightMouseOver==null){o.highlightMouseOver=false}d.extend(true,this,o);d.extend(true,this.renderer,o);this.fill=true;if(this.barDirection==="horizontal"&&this.rendererOptions.animation&&this.rendererOptions.animation.direction==null){this.renderer.animation.direction="left"}if(this.waterfall){this.fillToZero=false;this.disableStack=true}if(this.barDirection=="vertical"){this._primaryAxis="_xaxis";this._stackAxis="y";this.fillAxis="y"}else{this._primaryAxis="_yaxis";this._stackAxis="x";this.fillAxis="x"}this._highlightedPoint=null;this._plotSeriesInfo=null;this._dataColors=[];this._barPoints=[];var p={lineJoin:"miter",lineCap:"round",fill:true,isarc:false,strokeStyle:this.color,fillStyle:this.color,closePath:this.fill};this.renderer.shapeRenderer.init(p);var n={lineJoin:"miter",lineCap:"round",fill:true,isarc:false,angle:this.shadowAngle,offset:this.shadowOffset,alpha:this.shadowAlpha,depth:this.shadowDepth,closePath:this.fill};this.renderer.shadowRenderer.init(n);q.postInitHooks.addOnce(h);q.postDrawHooks.addOnce(j);q.eventListenerHooks.addOnce("jqplotMouseMove",b);q.eventListenerHooks.addOnce("jqplotMouseDown",a);q.eventListenerHooks.addOnce("jqplotMouseUp",l);q.eventListenerHooks.addOnce("jqplotClick",e);q.eventListenerHooks.addOnce("jqplotRightClick",m)};function g(t,p,o,w){if(this.rendererOptions.barDirection=="horizontal"){this._stackAxis="x";this._primaryAxis="_yaxis"}if(this.rendererOptions.waterfall==true){this._data=d.extend(true,[],this.data);var s=0;var u=(!this.rendererOptions.barDirection||this.rendererOptions.barDirection==="vertical"||this.transposedData===false)?1:0;for(var q=0;q<this.data.length;q++){s+=this.data[q][u];if(q>0){this.data[q][u]+=this.data[q-1][u]}}this.data[this.data.length]=(u==1)?[this.data.length+1,s]:[s,this.data.length+1];this._data[this._data.length]=(u==1)?[this._data.length+1,s]:[s,this._data.length+1]}if(this.rendererOptions.groups>1){this.breakOnNull=true;var n=this.data.length;var v=parseInt(n/this.rendererOptions.groups,10);var r=0;for(var q=v;q<n;q+=v){this.data.splice(q+r,0,[null,null]);this._plotData.splice(q+r,0,[null,null]);this._stackData.splice(q+r,0,[null,null]);r++}for(q=0;q<this.data.length;q++){if(this._primaryAxis=="_xaxis"){this.data[q][0]=q+1;this._plotData[q][0]=q+1;this._stackData[q][0]=q+1}else{this.data[q][1]=q+1;this._plotData[q][1]=q+1;this._stackData[q][1]=q+1}}}}d.jqplot.preSeriesInitHooks.push(g);d.jqplot.BarRenderer.prototype.calcSeriesNumbers=function(){var r=0;var t=0;var q=this[this._primaryAxis];var p,o,u;for(var n=0;n<q._series.length;n++){o=q._series[n];if(o===this){u=n}if(o.renderer.constructor==d.jqplot.BarRenderer){r+=o.data.length;t+=1}}return[r,t,u]};d.jqplot.BarRenderer.prototype.setBarWidth=function(){var q;var n=0;var o=0;var t=this[this._primaryAxis];var x,r,v;var w=this._plotSeriesInfo=this.renderer.calcSeriesNumbers.call(this);n=w[0];o=w[1];var u=t.numberTicks;var p=(u-1)/2;if(t.name=="xaxis"||t.name=="x2axis"){if(this._stack){this.barWidth=(t._offsets.max-t._offsets.min)/n*o-this.barMargin}else{this.barWidth=((t._offsets.max-t._offsets.min)/p-this.barPadding*(o-1)-this.barMargin*2)/o}}else{if(this._stack){this.barWidth=(t._offsets.min-t._offsets.max)/n*o-this.barMargin}else{this.barWidth=((t._offsets.min-t._offsets.max)/p-this.barPadding*(o-1)-this.barMargin*2)/o}}return[n,o]};function f(o){var q=[];for(var s=0;s<o.length;s++){var r=d.jqplot.getColorComponents(o[s]);var n=[r[0],r[1],r[2]];var t=n[0]+n[1]+n[2];for(var p=0;p<3;p++){n[p]=(t>570)?n[p]*0.8:n[p]+0.3*(255-n[p]);n[p]=parseInt(n[p],10)}q.push("rgb("+n[0]+","+n[1]+","+n[2]+")")}return q}function i(v,u,s,t,o){var q=v,w=v-1,n,p,r=(o==="x")?0:1;if(q>0){p=t.series[w]._plotData[u][r];if((s*p)<0){n=i(w,u,s,t,o)}else{n=t.series[w].gridData[u][r]}}else{n=(r===0)?t.series[q]._xaxis.series_u2p(0):t.series[q]._yaxis.series_u2p(0)}return n}d.jqplot.BarRenderer.prototype.draw=function(E,L,q,G){var I;var A=d.extend({},q);var w=(A.shadow!=undefined)?A.shadow:this.shadow;var O=(A.showLine!=undefined)?A.showLine:this.showLine;var F=(A.fill!=undefined)?A.fill:this.fill;var p=this.xaxis;var J=this.yaxis;var y=this._xaxis.series_u2p;var K=this._yaxis.series_u2p;var D,C;this._dataColors=[];this._barPoints=[];if(this.barWidth==null){this.renderer.setBarWidth.call(this)}var N=this._plotSeriesInfo=this.renderer.calcSeriesNumbers.call(this);var x=N[0];var v=N[1];var s=N[2];var H=[];if(this._stack){this._barNudge=0}else{this._barNudge=(-Math.abs(v/2-0.5)+s)*(this.barWidth+this.barPadding)}if(O){var u=new d.jqplot.ColorGenerator(this.negativeSeriesColors);var B=new d.jqplot.ColorGenerator(this.seriesColors);var M=u.get(this.index);if(!this.useNegativeColors){M=A.fillStyle}var t=A.fillStyle;var r;var P;var o;if(this.barDirection=="vertical"){for(var I=0;I<L.length;I++){if(!this._stack&&this.data[I][1]==null){continue}H=[];r=L[I][0]+this._barNudge;if(this._stack&&this._prevGridData.length){o=i(this.index,I,this._plotData[I][1],G,"y")}else{if(this.fillToZero){o=this._yaxis.series_u2p(0)}else{if(this.waterfall&&I>0&&I<this.gridData.length-1){o=this.gridData[I-1][1]}else{if(this.waterfall&&I==0&&I<this.gridData.length-1){if(this._yaxis.min<=0&&this._yaxis.max>=0){o=this._yaxis.series_u2p(0)}else{if(this._yaxis.min>0){o=E.canvas.height}else{o=0}}}else{if(this.waterfall&&I==this.gridData.length-1){if(this._yaxis.min<=0&&this._yaxis.max>=0){o=this._yaxis.series_u2p(0)}else{if(this._yaxis.min>0){o=E.canvas.height}else{o=0}}}else{o=E.canvas.height}}}}}if((this.fillToZero&&this._plotData[I][1]<0)||(this.waterfall&&this._data[I][1]<0)){if(this.varyBarColor&&!this._stack){if(this.useNegativeColors){A.fillStyle=u.next()}else{A.fillStyle=B.next()}}else{A.fillStyle=M}}else{if(this.varyBarColor&&!this._stack){A.fillStyle=B.next()}else{A.fillStyle=t}}if(!this.fillToZero||this._plotData[I][1]>=0){H.push([r-this.barWidth/2,o]);H.push([r-this.barWidth/2,L[I][1]]);H.push([r+this.barWidth/2,L[I][1]]);H.push([r+this.barWidth/2,o])}else{H.push([r-this.barWidth/2,L[I][1]]);H.push([r-this.barWidth/2,o]);H.push([r+this.barWidth/2,o]);H.push([r+this.barWidth/2,L[I][1]])}this._barPoints.push(H);if(w&&!this._stack){var z=d.extend(true,{},A);delete z.fillStyle;this.renderer.shadowRenderer.draw(E,H,z)}var n=A.fillStyle||this.color;this._dataColors.push(n);this.renderer.shapeRenderer.draw(E,H,A)}}else{if(this.barDirection=="horizontal"){for(var I=0;I<L.length;I++){if(!this._stack&&this.data[I][0]==null){continue}H=[];r=L[I][1]-this._barNudge;P;if(this._stack&&this._prevGridData.length){P=i(this.index,I,this._plotData[I][0],G,"x")}else{if(this.fillToZero){P=this._xaxis.series_u2p(0)}else{if(this.waterfall&&I>0&&I<this.gridData.length-1){P=this.gridData[I-1][0]}else{if(this.waterfall&&I==0&&I<this.gridData.length-1){if(this._xaxis.min<=0&&this._xaxis.max>=0){P=this._xaxis.series_u2p(0)}else{if(this._xaxis.min>0){P=0}else{P=0}}}else{if(this.waterfall&&I==this.gridData.length-1){if(this._xaxis.min<=0&&this._xaxis.max>=0){P=this._xaxis.series_u2p(0)}else{if(this._xaxis.min>0){P=0}else{P=E.canvas.width}}}else{P=0}}}}}if((this.fillToZero&&this._plotData[I][0]<0)||(this.waterfall&&this._data[I][0]<0)){if(this.varyBarColor&&!this._stack){if(this.useNegativeColors){A.fillStyle=u.next()}else{A.fillStyle=B.next()}}else{A.fillStyle=M}}else{if(this.varyBarColor&&!this._stack){A.fillStyle=B.next()}else{A.fillStyle=t}}if(!this.fillToZero||this._plotData[I][0]>=0){H.push([P,r+this.barWidth/2]);H.push([P,r-this.barWidth/2]);H.push([L[I][0],r-this.barWidth/2]);H.push([L[I][0],r+this.barWidth/2])}else{H.push([L[I][0],r+this.barWidth/2]);H.push([L[I][0],r-this.barWidth/2]);H.push([P,r-this.barWidth/2]);H.push([P,r+this.barWidth/2])}this._barPoints.push(H);if(w&&!this._stack){var z=d.extend(true,{},A);delete z.fillStyle;this.renderer.shadowRenderer.draw(E,H,z)}var n=A.fillStyle||this.color;this._dataColors.push(n);this.renderer.shapeRenderer.draw(E,H,A)}}}}if(this.highlightColors.length==0){this.highlightColors=d.jqplot.computeHighlightColors(this._dataColors)}else{if(typeof(this.highlightColors)=="string"){var N=this.highlightColors;this.highlightColors=[];for(var I=0;I<this._dataColors.length;I++){this.highlightColors.push(N)}}}};d.jqplot.BarRenderer.prototype.drawShadow=function(z,G,p,B){var D;var w=(p!=undefined)?p:{};var t=(w.shadow!=undefined)?w.shadow:this.shadow;var I=(w.showLine!=undefined)?w.showLine:this.showLine;var A=(w.fill!=undefined)?w.fill:this.fill;var o=this.xaxis;var E=this.yaxis;var v=this._xaxis.series_u2p;var F=this._yaxis.series_u2p;var y,C,x,u,s,r;if(this._stack&&this.shadow){if(this.barWidth==null){this.renderer.setBarWidth.call(this)}var H=this._plotSeriesInfo=this.renderer.calcSeriesNumbers.call(this);u=H[0];s=H[1];r=H[2];if(this._stack){this._barNudge=0}else{this._barNudge=(-Math.abs(s/2-0.5)+r)*(this.barWidth+this.barPadding)}if(I){if(this.barDirection=="vertical"){for(var D=0;D<G.length;D++){if(this.data[D][1]==null){continue}C=[];var q=G[D][0]+this._barNudge;var n;if(this._stack&&this._prevGridData.length){n=i(this.index,D,this._plotData[D][1],B,"y")}else{if(this.fillToZero){n=this._yaxis.series_u2p(0)}else{n=z.canvas.height}}C.push([q-this.barWidth/2,n]);C.push([q-this.barWidth/2,G[D][1]]);C.push([q+this.barWidth/2,G[D][1]]);C.push([q+this.barWidth/2,n]);this.renderer.shadowRenderer.draw(z,C,w)}}else{if(this.barDirection=="horizontal"){for(var D=0;D<G.length;D++){if(this.data[D][0]==null){continue}C=[];var q=G[D][1]-this._barNudge;var J;if(this._stack&&this._prevGridData.length){J=i(this.index,D,this._plotData[D][0],B,"x")}else{if(this.fillToZero){J=this._xaxis.series_u2p(0)}else{J=0}}C.push([J,q+this.barWidth/2]);C.push([G[D][0],q+this.barWidth/2]);C.push([G[D][0],q-this.barWidth/2]);C.push([J,q-this.barWidth/2]);this.renderer.shadowRenderer.draw(z,C,w)}}}}}};function h(q,p,n){for(var o=0;o<this.series.length;o++){if(this.series[o].renderer.constructor==d.jqplot.BarRenderer){if(this.series[o].highlightMouseOver){this.series[o].highlightMouseDown=false}}}}function j(){if(this.plugins.barRenderer&&this.plugins.barRenderer.highlightCanvas){this.plugins.barRenderer.highlightCanvas.resetCanvas();this.plugins.barRenderer.highlightCanvas=null}this.plugins.barRenderer={highlightedSeriesIndex:null};this.plugins.barRenderer.highlightCanvas=new d.jqplot.GenericCanvas();this.eventCanvas._elem.before(this.plugins.barRenderer.highlightCanvas.createElement(this._gridPadding,"jqplot-barRenderer-highlight-canvas",this._plotDimensions,this));this.plugins.barRenderer.highlightCanvas.setContext();this.eventCanvas._elem.bind("mouseleave",{plot:this},function(n){k(n.data.plot)})}function c(u,t,q,p){var o=u.series[t];var n=u.plugins.barRenderer.highlightCanvas;n._ctx.clearRect(0,0,n._ctx.canvas.width,n._ctx.canvas.height);o._highlightedPoint=q;u.plugins.barRenderer.highlightedSeriesIndex=t;var r={fillStyle:o.highlightColors[q]};o.renderer.shapeRenderer.draw(n._ctx,p,r);n=null}function k(p){var n=p.plugins.barRenderer.highlightCanvas;n._ctx.clearRect(0,0,n._ctx.canvas.width,n._ctx.canvas.height);for(var o=0;o<p.series.length;o++){p.series[o]._highlightedPoint=null}p.plugins.barRenderer.highlightedSeriesIndex=null;p.target.trigger("jqplotDataUnhighlight");n=null}function b(r,q,u,t,s){if(t){var p=[t.seriesIndex,t.pointIndex,t.data];var o=jQuery.Event("jqplotDataMouseOver");o.pageX=r.pageX;o.pageY=r.pageY;s.target.trigger(o,p);if(s.series[p[0]].show&&s.series[p[0]].highlightMouseOver&&!(p[0]==s.plugins.barRenderer.highlightedSeriesIndex&&p[1]==s.series[p[0]]._highlightedPoint)){var n=jQuery.Event("jqplotDataHighlight");n.which=r.which;n.pageX=r.pageX;n.pageY=r.pageY;s.target.trigger(n,p);c(s,t.seriesIndex,t.pointIndex,t.points)}}else{if(t==null){k(s)}}}function a(q,p,t,s,r){if(s){var o=[s.seriesIndex,s.pointIndex,s.data];if(r.series[o[0]].highlightMouseDown&&!(o[0]==r.plugins.barRenderer.highlightedSeriesIndex&&o[1]==r.series[o[0]]._highlightedPoint)){var n=jQuery.Event("jqplotDataHighlight");n.which=q.which;n.pageX=q.pageX;n.pageY=q.pageY;r.target.trigger(n,o);c(r,s.seriesIndex,s.pointIndex,s.points)}}else{if(s==null){k(r)}}}function l(p,o,s,r,q){var n=q.plugins.barRenderer.highlightedSeriesIndex;if(n!=null&&q.series[n].highlightMouseDown){k(q)}}function e(q,p,t,s,r){if(s){var o=[s.seriesIndex,s.pointIndex,s.data];var n=jQuery.Event("jqplotDataClick");n.which=q.which;n.pageX=q.pageX;n.pageY=q.pageY;r.target.trigger(n,o)}}function m(r,q,u,t,s){if(t){var p=[t.seriesIndex,t.pointIndex,t.data];var n=s.plugins.barRenderer.highlightedSeriesIndex;if(n!=null&&s.series[n].highlightMouseDown){k(s)}var o=jQuery.Event("jqplotDataRightClick");o.which=r.which;o.pageX=r.pageX;o.pageY=r.pageY;s.target.trigger(o,p)}}})(jQuery);/* jqPlot 1.0.8r1250 | (c) 2009-2013 Chris Leonello | jplot.com
   jsDate | (c) 2010-2013 Chris Leonello
 */(function(a){a.jqplot.CategoryAxisRenderer=function(b){a.jqplot.LinearAxisRenderer.call(this);this.sortMergedLabels=false};a.jqplot.CategoryAxisRenderer.prototype=new a.jqplot.LinearAxisRenderer();a.jqplot.CategoryAxisRenderer.prototype.constructor=a.jqplot.CategoryAxisRenderer;a.jqplot.CategoryAxisRenderer.prototype.init=function(e){this.groups=1;this.groupLabels=[];this._groupLabels=[];this._grouped=false;this._barsPerGroup=null;this.reverse=false;a.extend(true,this,{tickOptions:{formatString:"%d"}},e);var b=this._dataBounds;for(var f=0;f<this._series.length;f++){var g=this._series[f];if(g.groups){this.groups=g.groups}var h=g.data;for(var c=0;c<h.length;c++){if(this.name=="xaxis"||this.name=="x2axis"){if(h[c][0]<b.min||b.min==null){b.min=h[c][0]}if(h[c][0]>b.max||b.max==null){b.max=h[c][0]}}else{if(h[c][1]<b.min||b.min==null){b.min=h[c][1]}if(h[c][1]>b.max||b.max==null){b.max=h[c][1]}}}}if(this.groupLabels.length){this.groups=this.groupLabels.length}};a.jqplot.CategoryAxisRenderer.prototype.createTicks=function(){var D=this._ticks;var z=this.ticks;var F=this.name;var C=this._dataBounds;var v,A;var q,w;var d,c;var b,x;if(z.length){if(this.groups>1&&!this._grouped){var r=z.length;var p=parseInt(r/this.groups,10);var e=0;for(var x=p;x<r;x+=p){z.splice(x+e,0," ");e++}this._grouped=true}this.min=0.5;this.max=z.length+0.5;var m=this.max-this.min;this.numberTicks=2*z.length+1;for(x=0;x<z.length;x++){b=this.min+2*x*m/(this.numberTicks-1);var h=new this.tickRenderer(this.tickOptions);h.showLabel=false;h.setTick(b,this.name);this._ticks.push(h);var h=new this.tickRenderer(this.tickOptions);h.label=z[x];h.showMark=false;h.showGridline=false;h.setTick(b+0.5,this.name);this._ticks.push(h)}var h=new this.tickRenderer(this.tickOptions);h.showLabel=false;h.setTick(b+1,this.name);this._ticks.push(h)}else{if(F=="xaxis"||F=="x2axis"){v=this._plotDimensions.width}else{v=this._plotDimensions.height}if(this.min!=null&&this.max!=null&&this.numberTicks!=null){this.tickInterval=null}if(this.min!=null&&this.max!=null&&this.tickInterval!=null){if(parseInt((this.max-this.min)/this.tickInterval,10)!=(this.max-this.min)/this.tickInterval){this.tickInterval=null}}var y=[];var B=0;var q=0.5;var w,E;var f=false;for(var x=0;x<this._series.length;x++){var k=this._series[x];for(var u=0;u<k.data.length;u++){if(this.name=="xaxis"||this.name=="x2axis"){E=k.data[u][0]}else{E=k.data[u][1]}if(a.inArray(E,y)==-1){f=true;B+=1;y.push(E)}}}if(f&&this.sortMergedLabels){if(typeof y[0]=="string"){y.sort()}else{y.sort(function(j,i){return j-i})}}this.ticks=y;for(var x=0;x<this._series.length;x++){var k=this._series[x];for(var u=0;u<k.data.length;u++){if(this.name=="xaxis"||this.name=="x2axis"){E=k.data[u][0]}else{E=k.data[u][1]}var n=a.inArray(E,y)+1;if(this.name=="xaxis"||this.name=="x2axis"){k.data[u][0]=n}else{k.data[u][1]=n}}}if(this.groups>1&&!this._grouped){var r=y.length;var p=parseInt(r/this.groups,10);var e=0;for(var x=p;x<r;x+=p+1){y[x]=" "}this._grouped=true}w=B+0.5;if(this.numberTicks==null){this.numberTicks=2*B+1}var m=w-q;this.min=q;this.max=w;var o=0;var g=parseInt(3+v/10,10);var p=parseInt(B/g,10);if(this.tickInterval==null){this.tickInterval=m/(this.numberTicks-1)}for(var x=0;x<this.numberTicks;x++){b=this.min+x*this.tickInterval;var h=new this.tickRenderer(this.tickOptions);if(x/2==parseInt(x/2,10)){h.showLabel=false;h.showMark=true}else{if(p>0&&o<p){h.showLabel=false;o+=1}else{h.showLabel=true;o=0}h.label=h.formatter(h.formatString,y[(x-1)/2]);h.showMark=false;h.showGridline=false}h.setTick(b,this.name);this._ticks.push(h)}}};a.jqplot.CategoryAxisRenderer.prototype.draw=function(b,j){if(this.show){this.renderer.createTicks.call(this);var h=0;var c;if(this._elem){this._elem.emptyForce()}this._elem=this._elem||a('<div class="jqplot-axis jqplot-'+this.name+'" style="position:absolute;"></div>');if(this.name=="xaxis"||this.name=="x2axis"){this._elem.width(this._plotDimensions.width)}else{this._elem.height(this._plotDimensions.height)}this.labelOptions.axis=this.name;this._label=new this.labelRenderer(this.labelOptions);if(this._label.show){var g=this._label.draw(b,j);g.appendTo(this._elem)}var f=this._ticks;for(var e=0;e<f.length;e++){var d=f[e];if(d.showLabel&&(!d.isMinorTick||this.showMinorTicks)){var g=d.draw(b,j);g.appendTo(this._elem)}}this._groupLabels=[];for(var e=0;e<this.groupLabels.length;e++){var g=a('<div style="position:absolute;" class="jqplot-'+this.name+'-groupLabel"></div>');g.html(this.groupLabels[e]);this._groupLabels.push(g);g.appendTo(this._elem)}}return this._elem};a.jqplot.CategoryAxisRenderer.prototype.set=function(){var e=0;var m;var k=0;var f=0;var d=(this._label==null)?false:this._label.show;if(this.show){var n=this._ticks;for(var c=0;c<n.length;c++){var g=n[c];if(g.showLabel&&(!g.isMinorTick||this.showMinorTicks)){if(this.name=="xaxis"||this.name=="x2axis"){m=g._elem.outerHeight(true)}else{m=g._elem.outerWidth(true)}if(m>e){e=m}}}var j=0;for(var c=0;c<this._groupLabels.length;c++){var b=this._groupLabels[c];if(this.name=="xaxis"||this.name=="x2axis"){m=b.outerHeight(true)}else{m=b.outerWidth(true)}if(m>j){j=m}}if(d){k=this._label._elem.outerWidth(true);f=this._label._elem.outerHeight(true)}if(this.name=="xaxis"){e+=j+f;this._elem.css({height:e+"px",left:"0px",bottom:"0px"})}else{if(this.name=="x2axis"){e+=j+f;this._elem.css({height:e+"px",left:"0px",top:"0px"})}else{if(this.name=="yaxis"){e+=j+k;this._elem.css({width:e+"px",left:"0px",top:"0px"});if(d&&this._label.constructor==a.jqplot.AxisLabelRenderer){this._label._elem.css("width",k+"px")}}else{e+=j+k;this._elem.css({width:e+"px",right:"0px",top:"0px"});if(d&&this._label.constructor==a.jqplot.AxisLabelRenderer){this._label._elem.css("width",k+"px")}}}}}};a.jqplot.CategoryAxisRenderer.prototype.pack=function(e,c){var C=this._ticks;var v=this.max;var s=this.min;var n=c.max;var l=c.min;var q=(this._label==null)?false:this._label.show;var x;for(var r in e){this._elem.css(r,e[r])}this._offsets=c;var g=n-l;var k=v-s;if(!this.reverse){this.u2p=function(h){return(h-s)*g/k+l};this.p2u=function(h){return(h-l)*k/g+s};if(this.name=="xaxis"||this.name=="x2axis"){this.series_u2p=function(h){return(h-s)*g/k};this.series_p2u=function(h){return h*k/g+s}}else{this.series_u2p=function(h){return(h-v)*g/k};this.series_p2u=function(h){return h*k/g+v}}}else{this.u2p=function(h){return l+(v-h)*g/k};this.p2u=function(h){return s+(h-l)*k/g};if(this.name=="xaxis"||this.name=="x2axis"){this.series_u2p=function(h){return(v-h)*g/k};this.series_p2u=function(h){return h*k/g+v}}else{this.series_u2p=function(h){return(s-h)*g/k};this.series_p2u=function(h){return h*k/g+s}}}if(this.show){if(this.name=="xaxis"||this.name=="x2axis"){for(x=0;x<C.length;x++){var o=C[x];if(o.show&&o.showLabel){var b;if(o.constructor==a.jqplot.CanvasAxisTickRenderer&&o.angle){var A=(this.name=="xaxis")?1:-1;switch(o.labelPosition){case"auto":if(A*o.angle<0){b=-o.getWidth()+o._textRenderer.height*Math.sin(-o._textRenderer.angle)/2}else{b=-o._textRenderer.height*Math.sin(o._textRenderer.angle)/2}break;case"end":b=-o.getWidth()+o._textRenderer.height*Math.sin(-o._textRenderer.angle)/2;break;case"start":b=-o._textRenderer.height*Math.sin(o._textRenderer.angle)/2;break;case"middle":b=-o.getWidth()/2+o._textRenderer.height*Math.sin(-o._textRenderer.angle)/2;break;default:b=-o.getWidth()/2+o._textRenderer.height*Math.sin(-o._textRenderer.angle)/2;break}}else{b=-o.getWidth()/2}var D=this.u2p(o.value)+b+"px";o._elem.css("left",D);o.pack()}}var z=["bottom",0];if(q){var m=this._label._elem.outerWidth(true);this._label._elem.css("left",l+g/2-m/2+"px");if(this.name=="xaxis"){this._label._elem.css("bottom","0px");z=["bottom",this._label._elem.outerHeight(true)]}else{this._label._elem.css("top","0px");z=["top",this._label._elem.outerHeight(true)]}this._label.pack()}var d=parseInt(this._ticks.length/this.groups,10)+1;for(x=0;x<this._groupLabels.length;x++){var B=0;var f=0;for(var u=x*d;u<(x+1)*d;u++){if(u>=this._ticks.length-1){continue}if(this._ticks[u]._elem&&this._ticks[u].label!=" "){var o=this._ticks[u]._elem;var r=o.position();B+=r.left+o.outerWidth(true)/2;f++}}B=B/f;this._groupLabels[x].css({left:(B-this._groupLabels[x].outerWidth(true)/2)});this._groupLabels[x].css(z[0],z[1])}}else{for(x=0;x<C.length;x++){var o=C[x];if(o.show&&o.showLabel){var b;if(o.constructor==a.jqplot.CanvasAxisTickRenderer&&o.angle){var A=(this.name=="yaxis")?1:-1;switch(o.labelPosition){case"auto":case"end":if(A*o.angle<0){b=-o._textRenderer.height*Math.cos(-o._textRenderer.angle)/2}else{b=-o.getHeight()+o._textRenderer.height*Math.cos(o._textRenderer.angle)/2}break;case"start":if(o.angle>0){b=-o._textRenderer.height*Math.cos(-o._textRenderer.angle)/2}else{b=-o.getHeight()+o._textRenderer.height*Math.cos(o._textRenderer.angle)/2}break;case"middle":b=-o.getHeight()/2;break;default:b=-o.getHeight()/2;break}}else{b=-o.getHeight()/2}var D=this.u2p(o.value)+b+"px";o._elem.css("top",D);o.pack()}}var z=["left",0];if(q){var y=this._label._elem.outerHeight(true);this._label._elem.css("top",n-g/2-y/2+"px");if(this.name=="yaxis"){this._label._elem.css("left","0px");z=["left",this._label._elem.outerWidth(true)]}else{this._label._elem.css("right","0px");z=["right",this._label._elem.outerWidth(true)]}this._label.pack()}var d=parseInt(this._ticks.length/this.groups,10)+1;for(x=0;x<this._groupLabels.length;x++){var B=0;var f=0;for(var u=x*d;u<(x+1)*d;u++){if(u>=this._ticks.length-1){continue}if(this._ticks[u]._elem&&this._ticks[u].label!=" "){var o=this._ticks[u]._elem;var r=o.position();B+=r.top+o.outerHeight()/2;f++}}B=B/f;this._groupLabels[x].css({top:B-this._groupLabels[x].outerHeight()/2});this._groupLabels[x].css(z[0],z[1])}}}}})(jQuery);/*!
	AnythingSlider v1.9.2
	Original by Chris Coyier: http://css-tricks.com
	Get the latest version: https://github.com/CSS-Tricks/AnythingSlider

	To use the navigationFormatter function, you must have a function that
	accepts two paramaters, and returns a string of HTML text.

	index = integer index (1 based);
	panel = jQuery wrapped LI item this tab references
	@return = Must return a string of HTML/Text

	navigationFormatter: function(index, panel){
		return "Panel #" + index; // This would have each tab with the text 'Panel #X' where X = index
	}
*/
/*jshint browser:true, jquery:true, unused:false */
;(function($, win, doc) {
	"use strict";
	$.anythingSlider = function(el, options) {

		var base = this, o, t;

		// Wraps the ul in the necessary divs and then gives Access to jQuery element
		base.el = el;
		base.$el = $(el).addClass('anythingBase').wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>');

		// Add a reverse reference to the DOM object
		base.$el.data("AnythingSlider", base);

		base.init = function(){

			// Added "o" to be used in the code instead of "base.options" which doesn't get modifed by the compiler - reduces size by ~1k
			base.options = o = $.extend({}, $.anythingSlider.defaults, options);

			base.initialized = false;
			if ($.isFunction(o.onBeforeInitialize)) { base.$el.bind('before_initialize', o.onBeforeInitialize); }
			base.$el.trigger('before_initialize', base);

			// Add "as-oldie" class to body for css purposes
			$('<!--[if lte IE 8]><script>jQuery("body").addClass("as-oldie");</script><![endif]-->').appendTo('body').remove();

			// Cache existing DOM elements for later
			// base.$el = original ul
			// for wrap - get parent() then closest in case the ul has "anythingSlider" class
			base.$wrapper = base.$el.parent().closest('div.anythingSlider').addClass('anythingSlider-' + o.theme);
			base.$outer = base.$wrapper.parent();
			base.$window = base.$el.closest('div.anythingWindow');
			base.$win = $(win);

			base.$controls = $('<div class="anythingControls"></div>');
			base.$nav = $('<ul class="thumbNav"><li><a><span></span></a></li></ul>');
			base.$startStop = $('<a href="#" class="start-stop"></a>');
			
			if (o.buildStartStop || o.buildNavigation) {
				base.$controls.appendTo( (o.appendControlsTo && $(o.appendControlsTo).length) ? $(o.appendControlsTo) : base.$wrapper);
			}
			if (o.buildNavigation) {
				base.$nav.appendTo( (o.appendNavigationTo && $(o.appendNavigationTo).length) ? $(o.appendNavigationTo) : base.$controls );
			}
			if (o.buildStartStop) {
				base.$startStop.appendTo( (o.appendStartStopTo && $(o.appendStartStopTo).length) ? $(o.appendStartStopTo) : base.$controls );
			}

			// Figure out how many sliders are on the page for indexing
			base.runTimes = $('.anythingBase').length;
			// hash tag regex - fixes issue #432
			base.regex = (o.hashTags) ? new RegExp('panel' + base.runTimes + '-(\\d+)', 'i') : null;
			if (base.runTimes === 1) { base.makeActive(); } // make the first slider on the page active

			// Set up a few defaults & get details
			base.flag    = false; // event flag to prevent multiple calls (used in control click/focusin)
			if (o.autoPlayLocked) { o.autoPlay = true; } // if autoplay is locked, start playing
			base.playing = o.autoPlay; // slideshow state; removed "startStopped" option
			base.slideshow = false; // slideshow flag needed to correctly trigger slideshow events
			base.hovered = false; // actively hovering over the slider
			base.panelSize = [];  // will contain dimensions and left position of each panel
			base.currentPage = base.targetPage = o.startPanel = parseInt(o.startPanel,10) || 1; // make sure this isn't a string
			o.changeBy = parseInt(o.changeBy,10) || 1;

			// set slider type, but keep backward compatibility with the vertical option
			t = (o.mode || 'h').toLowerCase().match(/(h|v|f)/);
			t = o.vertical ? 'v' : (t || ['h'])[0];
			o.mode = t === 'v' ? 'vertical' : t === 'f' ? 'fade' : 'horizontal';
			if (t === 'f') {
				o.showMultiple = 1; // all slides are stacked in fade mode
				o.infiniteSlides = false; // no cloned slides
			}

			base.adj = (o.infiniteSlides) ? 0 : 1; // adjust page limits for infinite or limited modes
			base.adjustMultiple = 0;
			if (o.playRtl) { base.$wrapper.addClass('rtl'); }

			// Build start/stop button
			if (o.buildStartStop) { base.buildAutoPlay(); }

			// Build forwards/backwards buttons
			if (o.buildArrows) { base.buildNextBackButtons(); }

			base.$lastPage = base.$targetPage = base.$currentPage;

			base.updateSlider();

			// Expand slider to fit parent
			if (o.expand) {
				base.$window.css({ width: '100%', height: '100%' }); // needed for Opera
				base.checkResize();
			}

			// Make sure easing function exists.
			if (!$.isFunction($.easing[o.easing])) { o.easing = "swing"; }

			// If pauseOnHover then add hover effects
			if (o.pauseOnHover) {
				base.$wrapper.hover(function() {
					if (base.playing) {
						base.$el.trigger('slideshow_paused', base);
						base.clearTimer(true);
					}
				}, function() {
					if (base.playing) {
						base.$el.trigger('slideshow_unpaused', base);
						base.startStop(base.playing, true);
					}
				});
			}

			// Hide/Show navigation & play/stop controls
			base.slideControls(false);
			base.$wrapper.bind('mouseenter mouseleave', function(e){
				// add hovered class to outer wrapper
				$(this)[e.type === 'mouseenter' ? 'addClass' : 'removeClass']('anythingSlider-hovered');
				base.hovered = (e.type === 'mouseenter') ? true : false;
				base.slideControls(base.hovered);
			});

			// Add keyboard navigation
			$(doc).keyup(function(e){
				// Stop arrow keys from working when focused on form items
				if (o.enableKeyboard && base.$wrapper.hasClass('activeSlider') && !e.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
					if (o.mode !== 'vertical' && (e.which === 38 || e.which === 40)) { return; }
					switch (e.which) {
						case 39: case 40: // right & down arrow
							base.goForward();
							break;
						case 37: case 38: // left & up arrow
							base.goBack();
							break;
					}
				}
			});

			// If a hash can not be used to trigger the plugin, then go to start panel - see issue #432
			base.currentPage = ((o.hashTags) ? base.gotoHash() : '') || o.startPanel || 1;
			base.gotoPage(base.currentPage, false, null, -1);

			// Binds events
			var triggers = "slideshow_resized slideshow_paused slideshow_unpaused slide_init slide_begin slideshow_stop slideshow_start initialized swf_completed".split(" ");
			$.each("onSliderResize onShowPause onShowUnpause onSlideInit onSlideBegin onShowStop onShowStart onInitialized onSWFComplete".split(" "), function(i,f){
				if ($.isFunction(o[f])){
					base.$el.bind(triggers[i], o[f]);
				}
			});
			if ($.isFunction(o.onSlideComplete)){
				// Added setTimeout (zero time) to ensure animation is complete... see this bug report: http://bugs.jquery.com/ticket/7157
				base.$el.bind('slide_complete', function(){
					setTimeout(function(){ o.onSlideComplete(base); }, 0);
					return false;
				});
			}
			base.initialized = true;
			base.$el.trigger('initialized', base);

			// trigger the slideshow
			base.startStop(o.autoPlay);

		};

		// called during initialization & to update the slider if a panel is added or deleted
		base.updateSlider = function(){
			// needed for updating the slider
			base.$el.children('.cloned').remove();
			base.navTextVisible = base.$nav.find('span:first').css('visibility') !== 'hidden';
			base.$nav.empty();
			// set currentPage to 1 in case it was zero - occurs when adding slides after removing them all
			base.currentPage = base.currentPage || 1;

			base.$items = base.$el.children();
			base.pages = base.$items.length;
			base.dir = (o.mode === 'vertical') ? 'top' : 'left';
			o.showMultiple = parseInt(o.showMultiple, 10) || 1; // only integers allowed
			o.navigationSize = (o.navigationSize === false) ? 0 : parseInt(o.navigationSize,10) || 0;

			// Fix tabbing through the page, but don't change the view if the link is in view (showMultiple = true)
			base.$items.find('a').unbind('focus.AnythingSlider').bind('focus.AnythingSlider', function(e){
				var panel = $(this).closest('.panel'),
					indx = base.$items.index(panel) + base.adj; // index can be -1 in nested sliders - issue #208
				base.$items.find('.focusedLink').removeClass('focusedLink');
				$(this).addClass('focusedLink');
				base.$window.scrollLeft(0).scrollTop(0);
				if ( ( indx !== -1 && (indx >= base.currentPage + o.showMultiple || indx < base.currentPage) ) ) {
					base.gotoPage(indx);
					e.preventDefault();
				}
			});
			if (o.showMultiple > 1) {
				if (o.showMultiple > base.pages) { o.showMultiple = base.pages; }
				base.adjustMultiple = (o.infiniteSlides && base.pages > 1) ? 0 : o.showMultiple - 1;
			}

			// Hide navigation & player if there is only one page
			base.$controls
				.add(base.$nav)
				.add(base.$startStop)
				.add(base.$forward)
				.add(base.$back)[(base.pages <= 1) ? 'hide' : 'show']();
			if (base.pages > 1) {
				// Build/update navigation tabs
				base.buildNavigation();
			}

			// Top and tail the list with 'visible' number of items, top has the last section, and tail has the first
			// This supports the "infinite" scrolling, also ensures any cloned elements don't duplicate an ID
			// Moved removeAttr before addClass otherwise IE7 ignores the addClass: http://bugs.jquery.com/ticket/9871
			if (o.mode !== 'fade' && o.infiniteSlides && base.pages > 1) {
				base.$el.prepend( base.$items.filter(':last').clone().addClass('cloned') );
				// Add support for multiple sliders shown at the same time
				if (o.showMultiple > 1) {
					base.$el.append( base.$items.filter(':lt(' + o.showMultiple + ')').clone().addClass('cloned multiple') );
				} else {
					base.$el.append( base.$items.filter(':first').clone().addClass('cloned') );
				}
				base.$el.find('.cloned').each(function(){
					// disable all focusable elements in cloned panels to prevent shifting the panels by tabbing
					$(this).find('a,input,textarea,select,button,area,form').attr({ disabled : 'disabled', name : '' });
					$(this).find('[id]')[ $.fn.addBack ? 'addBack' : 'andSelf' ]().removeAttr('id');
				});
			}

			// We just added two items, time to re-cache the list, then get the dimensions of each panel
			base.$items = base.$el.addClass(o.mode).children().addClass('panel');
			base.setDimensions();

			// Set the dimensions of each panel
			if (o.resizeContents) {
				base.$items.css('width', base.width);
				base.$wrapper
					.css('width', base.getDim(base.currentPage)[0])
					.add(base.$items).css('height', base.height);
			} else {
				base.$win.load(function(){
					// set dimensions after all images load
					base.setDimensions();
					// make sure the outer wrapper is set properly
					t = base.getDim(base.currentPage);
					base.$wrapper.css({ width: t[0], height: t[1] });
					base.setCurrentPage(base.currentPage, false);
				});
			}

			if (base.currentPage > base.pages) {
				base.currentPage = base.pages;
			}
			base.setCurrentPage(base.currentPage, false);
			base.$nav.find('a').eq(base.currentPage - 1).addClass('cur'); // update current selection

			if (o.mode === 'fade') {
				t = base.$items.eq(base.currentPage-1);
				if (o.resumeOnVisible) {
					// prevent display: none;
					t.css({ opacity: 1 }).siblings().css({ opacity: 0 });
				} else {
					// allow display: none; - resets video
					base.$items.css('opacity',1);
					t.fadeIn(0).siblings().fadeOut(0);
				}
			}

		};

		// Creates the numbered navigation links
		base.buildNavigation = function() {
			if (o.buildNavigation && (base.pages > 1)) {
				var a, c, i, t, $li;
				base.$items.filter(':not(.cloned)').each(function(j){
					$li = $('<li/>');
					i = j + 1;
					c = (i === 1 ? ' first' : '') + (i === base.pages ? ' last' : '');
					a = '<a class="panel' + i + ( base.navTextVisible ? '"' : ' ' + o.tooltipClass + '" title="@"' ) + ' href="#"><span>@</span></a>';
					// If a formatter function is present, use it
					if ($.isFunction(o.navigationFormatter)) {
						t = o.navigationFormatter(i, $(this));
						if (typeof(t) === "string") {
							$li.html(a.replace(/@/g,t));
						} else {
							$li = $('<li/>', t);
						}
					} else {
						$li.html(a.replace(/@/g,i));
					}
					$li
					.appendTo(base.$nav)
					.addClass(c)
					.data('index', i);
				});
				base.$nav.children('li').bind(o.clickControls, function(e) {
					if (!base.flag && o.enableNavigation) {
						// prevent running functions twice (once for click, second time for focusin)
						base.flag = true; setTimeout(function(){ base.flag = false; }, 100);
						base.gotoPage( $(this).data('index') );
					}
					e.preventDefault();
				});

				// Add navigation tab scrolling - use !! in case someone sets the size to zero
				if (!!o.navigationSize && o.navigationSize < base.pages) {
					if (!base.$controls.find('.anythingNavWindow').length){
						base.$nav
							.before('<ul><li class="prev"><a href="#"><span>' + o.backText + '</span></a></li></ul>')
							.after('<ul><li class="next"><a href="#"><span>' + o.forwardText + '</span></a></li></ul>')
							.wrap('<div class="anythingNavWindow"></div>');
					}
					// include half of the left position to include extra width from themes like tabs-light and tabs-dark (still not perfect)
					base.navWidths = base.$nav.find('li').map(function(){
						return $(this).outerWidth(true) + Math.ceil(parseInt($(this).find('span').css('left'),10)/2 || 0);
					}).get();
					base.navLeft = base.currentPage;
					// add 25 pixels (old IE needs more than 5) to make sure the tabs don't wrap to the next line
					base.$nav.width( base.navWidth( 1, base.pages + 1 ) + 25 );
					base.$controls.find('.anythingNavWindow')
						.width( base.navWidth( 1, o.navigationSize + 1 ) ).end()
						.find('.prev,.next').bind(o.clickControls, function(e) {
							if (!base.flag) {
								base.flag = true; setTimeout(function(){ base.flag = false; }, 200);
								base.navWindow( base.navLeft + o.navigationSize * ( $(this).is('.prev') ? -1 : 1 ) );
							}
							e.preventDefault();
						});
				}

			}
		};

		base.navWidth = function(x,y){
			var i, s = Math.min(x,y),
				e = Math.max(x,y),
				w = 0;
			for (i = s; i < e; i++) {
				w += base.navWidths[i-1] || 0;
			}
			return w;
		};

		base.navWindow = function(n){
			if (!!o.navigationSize && o.navigationSize < base.pages && base.navWidths) {
				var p = base.pages - o.navigationSize + 1;
				n = (n <= 1) ? 1 : (n > 1 && n < p) ? n : p;
				if (n !== base.navLeft) {
					base.$controls.find('.anythingNavWindow').animate(
						{ scrollLeft: base.navWidth(1, n), width: base.navWidth(n, n + o.navigationSize) },
						{ queue: false, duration: o.animationTime });
					base.navLeft = n;
				}
			}
		};

		// Creates the Forward/Backward buttons
		base.buildNextBackButtons = function() {
			base.$forward = $('<span class="arrow forward"><a href="#"><span>' + o.forwardText + '</span></a></span>');
			base.$back = $('<span class="arrow back"><a href="#"><span>' + o.backText + '</span></a></span>');

			// Bind to the forward and back buttons
			base.$back.bind(o.clickBackArrow, function(e) {
				// prevent running functions twice (once for click, second time for swipe)
				if (o.enableArrows && !base.flag) {
					base.flag = true; setTimeout(function(){ base.flag = false; }, 100);
					base.goBack();
				}
				e.preventDefault();
			});
			base.$forward.bind(o.clickForwardArrow, function(e) {
				// prevent running functions twice (once for click, second time for swipe)
				if (o.enableArrows && !base.flag) {
					base.flag = true; setTimeout(function(){ base.flag = false; }, 100);
					base.goForward();
				}
				e.preventDefault();
			});
			// using tab to get to arrow links will show they have focus (outline is disabled in css)
			base.$back.add(base.$forward).find('a').bind('focusin focusout',function(){
				$(this).toggleClass('hover');
			});

			// Append elements to page
			base.$back.appendTo( (o.appendBackTo && $(o.appendBackTo).length) ? $(o.appendBackTo) : base.$wrapper );
			base.$forward.appendTo( (o.appendForwardTo && $(o.appendForwardTo).length) ? $(o.appendForwardTo) : base.$wrapper );

			base.arrowWidth = base.$forward.width(); // assuming the left & right arrows are the same width - used for toggle
			base.arrowRight = parseInt(base.$forward.css('right'), 10);
			base.arrowLeft = parseInt(base.$back.css('left'), 10);

		};

		// Creates the Start/Stop button
		base.buildAutoPlay = function(){
			base.$startStop
				.html('<span>' + (base.playing ? o.stopText : o.startText) + '</span>')
				.bind(o.clickSlideshow, function(e) {
					if (o.enableStartStop) {
						base.startStop(!base.playing);
						base.makeActive();
						if (base.playing && !o.autoPlayDelayed) {
							base.goForward(true, o.playRtl);
						}
					}
					e.preventDefault();
				})
				// show button has focus while tabbing
				.bind('focusin focusout',function(){
					$(this).toggleClass('hover');
				});
		};

		// Adjust slider dimensions on parent element resize
		base.checkResize = function(stopTimer){
			// checking document visibility - 
			var vis = !!(doc.hidden || doc.webkitHidden || doc.mozHidden || doc.msHidden);
			clearTimeout(base.resizeTimer);
			base.resizeTimer = setTimeout(function(){
				var w = base.$outer.width(),
					h = base.$outer[0].tagName === "BODY" ? base.$win.height() : base.$outer.height();
				// base.width = width of one panel, so multiply by # of panels; outerPad is padding added for arrows.
				// ignore changes if window hidden
				if (!vis && (base.lastDim[0] !== w || base.lastDim[1] !== h)) {
					
					base.setDimensions(); // adjust panel sizes
					
					//callback for slider resize
					base.$el.trigger('slideshow_resized', base);
					
					// make sure page is lined up (use -1 animation time, so we can differeniate it from when animationTime = 0)
					base.gotoPage(base.currentPage, base.playing, null, -1);
					
				}
				if (typeof(stopTimer) === 'undefined'){ base.checkResize(); }
				
				// increase time if page is hidden; but don't stop it completely
			}, vis ? 2000 : 500);
		};

		// Set panel dimensions to either resize content or adjust panel to content
		base.setDimensions = function(){

			// reset element width & height
			base.$wrapper.find('.anythingWindow, .anythingBase, .panel')[ $.fn.addBack ? 'addBack' : 'andSelf' ]().css({ width: '', height: '' });
			base.width = base.$el.width();
			base.height = base.$el.height();
			base.outerPad = [ base.$wrapper.innerWidth() - base.$wrapper.width(), base.$wrapper.innerHeight() - base.$wrapper.height() ];
			var w, h, c, t, edge = 0,
				fullsize = { width: '100%', height: '100%' },
				// determine panel width
				pw = (o.showMultiple > 1 && o.mode === 'horizontal') ? base.width || base.$window.width()/o.showMultiple : base.$window.width(),
				ph = (o.showMultiple > 1 && o.mode === 'vertical') ? base.height/o.showMultiple || base.$window.height()/o.showMultiple : base.$window.height();
			if (o.expand){
				base.lastDim = [ base.$outer.width(), base.$outer.height() ];
				w = base.lastDim[0] - base.outerPad[0];
				h = base.lastDim[1] - base.outerPad[1];
				base.$wrapper.add(base.$window).css({ width: w, height: h });
				base.height = h = (o.showMultiple > 1 && o.mode === 'vertical') ? ph : h;
				base.width = pw = (o.showMultiple > 1 && o.mode === 'horizontal') ? w/o.showMultiple : w;
				base.$items.css({ width: pw, height: ph });
			}
			base.$items.each(function(i){
				t = $(this);
				c = t.children();
				if (o.resizeContents){
					// resize panel
					w = base.width;
					h = base.height;
					t.css({ width: w, height: h });
					if (c.length) {
						if (c[0].tagName === "EMBED") { c.attr(fullsize); } // needed for IE7; also c.length > 1 in IE7
						if (c[0].tagName === "OBJECT") { c.find('embed').attr(fullsize); }
						// resize panel contents, if solitary (wrapped content or solitary image)
						if (c.length === 1){ c.css(fullsize); }
					}
				} else {
					// get panel width & height and save it
					if (o.mode === 'vertical') {
						w = t.css('display','inline-block').width();
						t.css('display','');
					} else {
						w = t.width() || base.width; // if image hasn't finished loading, width will be zero, so set it to base width instead
					}
					if (c.length === 1 && w >= pw){
						w = (c.width() >= pw) ? pw : c.width(); // get width of solitary child
						c.css('max-width', w);   // set max width for all children
					}
					t.css({ width: w, height: '' }); // set width of panel
					h = (c.length === 1 ? c.outerHeight(true) : t.height()); // get height after setting width
					if (h <= base.outerPad[1]) { h = base.height; } // if height less than the outside padding, then set it to the preset height
					t.css('height', h);
				}
				base.panelSize[i] = [w,h,edge];
				edge += (o.mode === 'vertical') ? h : w;
			});
			// Set total width of slider
			base.$el.css((o.mode === 'vertical' ? 'height' : 'width'), o.mode === 'fade' ? base.width : edge );
		};

		// get dimension of multiple panels, as needed
		base.getDim = function(page){
			var t, i, w = base.width, h = base.height;
			if (base.pages < 1 || isNaN(page)) { return [ w, h ]; } // prevent errors when base.panelSize is empty
			page = (o.infiniteSlides && base.pages > 1) ? page : page - 1;
			i = base.panelSize[page];
			if (i) {
				w = i[0] || w;
				h = i[1] || h;
			}
			if (o.showMultiple > 1) {
				for (i = 1; i < o.showMultiple; i++) {
					t = page + i;
					if (o.mode === 'vertical') {
						w = Math.max(w, base.panelSize[t][0]);
						h += base.panelSize[t][1];
					} else {
						w += base.panelSize[t][0];
						h = Math.max(h, base.panelSize[t][1]);
					}
				}
			}
			return [w,h];
		};

		base.goForward = function(autoplay, rtl) {
			// targetPage changes before animation so if rapidly changing pages, it will have the correct current page
			base.gotoPage(base[ o.allowRapidChange ? 'targetPage' : 'currentPage'] + o.changeBy * (rtl ? -1 : 1), autoplay);
		};

		base.goBack = function(autoplay) {
			base.gotoPage(base[ o.allowRapidChange ? 'targetPage' : 'currentPage'] - o.changeBy, autoplay);
		};

		base.gotoPage = function(page, autoplay, callback, time) {
			if (autoplay !== true) {
				autoplay = false;
				base.startStop(false);
				base.makeActive();
			}
			// check if page is an id or class name
			if (/^[#|.]/.test(page) && $(page).length) {
				page = $(page).closest('.panel').index() + base.adj;
			}

			// rewind effect occurs here when changeBy > 1
			if (o.changeBy !== 1){
				var adj = base.pages - base.adjustMultiple;
				if (page < 1) {
					page = o.stopAtEnd ? 1 : ( o.infiniteSlides ? base.pages + page : ( o.showMultiple > 1 - page ? 1 : adj ) );
				}
				if (page > base.pages) {
					page = o.stopAtEnd ? base.pages : ( o.showMultiple > 1 - page ? 1 : page -= adj );
				} else if (page >= adj) {
					// show multiple adjustments
					page = adj;
				}
			}

			if (base.pages <= 1) { return; } // prevents animation
			base.$lastPage = base.$currentPage;
			if (typeof(page) !== "number") {
				page = parseInt(page,10) || o.startPanel;
				base.setCurrentPage(page);
			}

			// pause YouTube videos before scrolling or prevent change if playing
			if (autoplay && o.isVideoPlaying(base)) { return; }
			if (o.stopAtEnd && !o.infiniteSlides && page > base.pages - o.showMultiple) { page = base.pages - o.showMultiple + 1; } // fixes #515
			base.exactPage = page;
			if (page > base.pages + 1 - base.adj) { page = (!o.infiniteSlides && !o.stopAtEnd) ? 1 : base.pages; }
			if (page < base.adj ) { page = (!o.infiniteSlides && !o.stopAtEnd) ? base.pages : 1; }
			if (!o.infiniteSlides) { base.exactPage = page; } // exact page used by the fx extension
			base.currentPage = ( page > base.pages ) ? base.pages : ( page < 1 ) ? 1 : base.currentPage;
			base.$currentPage = base.$items.eq(base.currentPage - base.adj);
			base.targetPage = (page === 0) ? base.pages : (page > base.pages) ? 1 : page;
			base.$targetPage = base.$items.eq(base.targetPage - base.adj);
			time = typeof time !== 'undefined' ? time : o.animationTime;
			// don't trigger events when time < 0 - to prevent FX from firing multiple times on page resize
			if (time >= 0) { base.$el.trigger('slide_init', base); }
			// toggle arrows/controls only if there is time to see it - fix issue #317
			if (time > 0) { base.slideControls(true); }

			// Set visual
			if (o.buildNavigation){
				base.setNavigation(base.targetPage);
			}

			// When autoplay isn't passed, we stop the timer
			if (autoplay !== true) { autoplay = false; }
			// Stop the slider when we reach the last page, if the option stopAtEnd is set to true
			if (!autoplay || (o.stopAtEnd && page === base.pages)) { base.startStop(false); }

			if (time >= 0) { base.$el.trigger('slide_begin', base); }

			// delay starting slide animation
			setTimeout(function(d){
				var t, p, empty = true;
				if (o.allowRapidChange) {
					base.$wrapper.add(base.$el).add(base.$items).stop(true, true);
				}
				// resize slider if content size varies
				if (!o.resizeContents) {
					// animating the wrapper resize before the window prevents flickering in Firefox
					// don't animate the dimension if it hasn't changed - fix for issue #264
					p = base.getDim(page); d = {};
					// prevent animating a dimension to zero
					if (base.$wrapper.width() !== p[0]) { d.width = p[0] || base.width; empty = false; }
					if (base.$wrapper.height() !== p[1]) { d.height = p[1] || base.height; empty = false; }
					if (!empty) {
						base.$wrapper.filter(':not(:animated)').animate(d, { queue: false, duration: (time < 0 ? 0 : time), easing: o.easing });
					}
				}

				if (o.mode === 'fade') {
					if (base.$lastPage[0] !== base.$targetPage[0]) {
						base.fadeIt( base.$lastPage, 0, time );
						base.fadeIt( base.$targetPage, 1, time, function(){ base.endAnimation(page, callback, time); });
					} else {
						base.endAnimation(page, callback, time);
					}
				} else {
					d = {};
					d[base.dir] = -base.panelSize[(o.infiniteSlides && base.pages > 1) ? page : page - 1][2];
					// resize width of base element (ul) if vertical & width of content varies
					if (o.mode === 'vertical' && !o.resizeContents) { d.width = p[0]; }
					// Animate Slider
					base.$el.filter(':not(:animated)').animate(
						d, { queue: false, duration: time < 0 ? 0 : time, easing: o.easing, complete: function(){ base.endAnimation(page, callback, time); } }
					);
				}
			}, parseInt(o.delayBeforeAnimate, 10) || 0);
		};

		base.endAnimation = function(page, callback, time){
			if (page === 0) {
				base.$el.css( base.dir, o.mode === 'fade' ? 0 : -base.panelSize[base.pages][2]);
				page = base.pages;
			} else if (page > base.pages) {
				// reset back to start position
				base.$el.css( base.dir, o.mode === 'fade' ? 0 : -base.panelSize[1][2]);
				page = 1;
			}
			base.exactPage = page;
			base.setCurrentPage(page, false);

			if (o.mode === 'fade') {
				// make sure non current panels are hidden (rapid slide changes)
				base.fadeIt( base.$items.not(':eq(' + (page - base.adj) + ')'), 0, 0);
			}

			if (!base.hovered) { base.slideControls(false); }

			if (o.hashTags) { base.setHash(page); }

			if (time >= 0) { base.$el.trigger('slide_complete', base); }
			// callback from external slide control: $('#slider').anythingSlider(4, function(slider){ })
			if (typeof callback === 'function') { callback(base); }

			// Continue slideshow after a delay
			if (o.autoPlayLocked && !base.playing) {
				setTimeout(function(){
					base.startStop(true);
				// subtract out slide delay as the slideshow waits that additional time.
				}, o.resumeDelay - (o.autoPlayDelayed ? o.delay : 0));
			}
		};

		base.fadeIt = function(el, toOpacity, time, callback){
			var t = time < 0 ? 0 : time;
			if (o.resumeOnVisible) {
				el.filter(':not(:animated)').fadeTo(t, toOpacity, callback);
			} else {
				el.filter(':not(:animated)')[ toOpacity === 0 ? 'fadeOut' : 'fadeIn' ](t, callback);
			}
		};

		base.setCurrentPage = function(page, move) {
			page = parseInt(page, 10);

			if (base.pages < 1 || page === 0 || isNaN(page)) { return; }
			if (page > base.pages + 1 - base.adj) { page = base.pages - base.adj; }
			if (page < base.adj ) { page = 1; }

			// hide/show arrows based on infinite scroll mode
			if (o.buildArrows && !o.infiniteSlides && o.stopAtEnd){
				base.$forward[ page === base.pages - base.adjustMultiple ? 'addClass' : 'removeClass']('disabled');
				base.$back[ page === 1 ? 'addClass' : 'removeClass']('disabled');
				if (page === base.pages && base.playing) { base.startStop(); }
			}

			// Only change left if move does not equal false
			if (!move) {
				var d = base.getDim(page);
				base.$wrapper
					.css({ width: d[0], height: d[1] })
					.add(base.$window).scrollLeft(0).scrollTop(0); // reset in case tabbing changed this scrollLeft - probably overly redundant
				base.$el.css( base.dir, o.mode === 'fade' ? 0 : -base.panelSize[(o.infiniteSlides && base.pages > 1) ? page : page - 1][2] );
			}

			// Update local variable
			base.currentPage = page;
			base.$currentPage = base.$items.removeClass('activePage').eq(page - base.adj).addClass('activePage');

			if (o.buildNavigation){
				base.setNavigation(page);
			}

		};

		base.setNavigation = function(page){
			base.$nav
				.find('.cur').removeClass('cur').end()
				.find('a').eq(page - 1).addClass('cur');
		};

		base.makeActive = function(){
			// Set current slider as active so keyboard navigation works properly
			if (!base.$wrapper.hasClass('activeSlider')){
				$('.activeSlider').removeClass('activeSlider');
				base.$wrapper.addClass('activeSlider');
			}
		};

		// This method tries to find a hash that matches an ID and panel-X
		// If either found, it tries to find a matching item
		// If that is found as well, then it returns the page number
		base.gotoHash = function(){
			var h = win.location.hash,
				i = h.indexOf('&'),
				n = h.match(base.regex);
			// test for "/#/" or "/#!/" used by the jquery address plugin - $('#/') breaks jQuery
			if (n === null && !/^#&/.test(h) && !/#!?\//.test(h) && !/\=/.test(h)) {
				// #quote2&panel1-3&panel3-3
				h = h.substring(0, (i >= 0 ? i : h.length));
				// ensure the element is in the same slider
				n = ($(h).length && $(h).closest('.anythingBase')[0] === base.el) ? base.$items.index($(h).closest('.panel')) + base.adj : null;
			} else if (n !== null) {
				// #&panel1-3&panel3-3
				n = (o.hashTags) ? parseInt(n[1],10) : null;
			}
			return n;
		};

		base.setHash = function(n){
			var s = 'panel' + base.runTimes + '-',
				h = win.location.hash;
			if ( typeof h !== 'undefined' ) {
				win.location.hash = (h.indexOf(s) > 0) ? h.replace(base.regex, s + n) : h + "&" + s + n;
			}
		};

		// Slide controls (nav and play/stop button up or down)
		base.slideControls = function(toggle){
			var dir = (toggle) ? 'slideDown' : 'slideUp',
				t1 = (toggle) ? 0 : o.animationTime,
				t2 = (toggle) ? o.animationTime : 0,
				op = (toggle) ? 1 : 0,
				sign = (toggle) ? 0 : 1; // 0 = visible, 1 = hidden
			if (o.toggleControls) {
				base.$controls.stop(true,true).delay(t1)[dir](o.animationTime/2).delay(t2);
			}
			if (o.buildArrows && o.toggleArrows) {
				if (!base.hovered && base.playing) { sign = 1; op = 0; } // don't animate arrows during slideshow
				base.$forward.stop(true,true).delay(t1).animate({ right: base.arrowRight + (sign * base.arrowWidth), opacity: op }, o.animationTime/2);
				base.$back.stop(true,true).delay(t1).animate({ left: base.arrowLeft + (sign * base.arrowWidth), opacity: op }, o.animationTime/2);
			}
		};

		base.clearTimer = function(paused){
			// Clear the timer only if it is set
			if (base.timer) {
				win.clearInterval(base.timer);
				if (!paused && base.slideshow) {
					base.$el.trigger('slideshow_stop', base);
					base.slideshow = false;
				}
			}
		};

		// Pass startStop(false) to stop and startStop(true) to play
		base.startStop = function(playing, paused) {
			if (playing !== true) { playing = false; }  // Default if not supplied is false
			base.playing = playing;

			if (playing && !paused) {
				base.$el.trigger('slideshow_start', base);
				base.slideshow = true;
			}

			// Toggle playing and text
			if (o.buildStartStop) {
				base.$startStop.toggleClass('playing', playing).find('span').html( playing ? o.stopText : o.startText );
				// add button text to title attribute if it is hidden by text-indent
				if ( base.$startStop.find('span').css('visibility') === "hidden" ) {
					base.$startStop.addClass(o.tooltipClass).attr( 'title', playing ? o.stopText : o.startText );
				}
			}

			// Pause slideshow while video is playing
			if (playing){
				base.clearTimer(true); // Just in case this was triggered twice in a row
				base.timer = win.setInterval(function() {
					if ( !!(doc.hidden || doc.webkitHidden || doc.mozHidden || doc.msHidden) ) {
						// stop slideshow if the page isn't visible (issue #463)
						if (!o.autoPlayLocked) {
							base.startStop();
						}
					} else if ( !o.isVideoPlaying(base) ) {
						// prevent autoplay if video is playing
						base.goForward(true, o.playRtl);
					} else if (!o.resumeOnVideoEnd) {
						// stop slideshow if resume if false
						base.startStop();
					}
				}, o.delay);
			} else {
				base.clearTimer();
			}
		};

		// Trigger the initialization
		base.init();
	};

	$.anythingSlider.defaults = {
		// Appearance
		theme               : "default", // Theme name, add the css stylesheet manually
		mode                : "horiz",   // Set mode to "horizontal", "vertical" or "fade" (only first letter needed); replaces vertical option
		expand              : false,     // If true, the entire slider will expand to fit the parent element
		resizeContents      : true,      // If true, solitary images/objects in the panel will expand to fit the viewport
		showMultiple        : false,     // Set this value to a number and it will show that many slides at once
		easing              : "swing",   // Anything other than "linear" or "swing" requires the easing plugin or jQuery UI

		buildArrows         : true,      // If true, builds the forwards and backwards buttons
		buildNavigation     : true,      // If true, builds a list of anchor links to link to each panel
		buildStartStop      : true,      // ** If true, builds the start/stop button

/*
		// commented out as this will reduce the size of the minified version
		appendForwardTo     : null,      // Append forward arrow to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendBackTo        : null,      // Append back arrow to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendControlsTo    : null,      // Append controls (navigation + start-stop) to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendNavigationTo  : null,      // Append navigation buttons to a HTML element (jQuery Object, selector or HTMLNode), if not null
		appendStartStopTo   : null,      // Append start-stop button to a HTML element (jQuery Object, selector or HTMLNode), if not null
*/

		toggleArrows        : false,     // If true, side navigation arrows will slide out on hovering & hide @ other times
		toggleControls      : false,     // if true, slide in controls (navigation + play/stop button) on hover and slide change, hide @ other times

		startText           : "Start",   // Start button text
		stopText            : "Stop",    // Stop button text
		forwardText         : "&raquo;", // Link text used to move the slider forward (hidden by CSS, replaced with arrow image)
		backText            : "&laquo;", // Link text used to move the slider back (hidden by CSS, replace with arrow image)
		tooltipClass        : "tooltip", // Class added to navigation & start/stop button (text copied to title if it is hidden by a negative text indent)

		// Function
		enableArrows        : true,      // if false, arrows will be visible, but not clickable.
		enableNavigation    : true,      // if false, navigation links will still be visible, but not clickable.
		enableStartStop     : true,      // if false, the play/stop button will still be visible, but not clickable. Previously "enablePlay"
		enableKeyboard      : true,      // if false, keyboard arrow keys will not work for this slider.

		// Navigation
		startPanel          : 1,         // This sets the initial panel
		changeBy            : 1,         // Amount to go forward or back when changing panels.
		hashTags            : true,      // Should links change the hashtag in the URL?
		infiniteSlides      : true,      // if false, the slider will not wrap & not clone any panels
		navigationFormatter : null,      // Details at the top of the file on this use (advanced use)
		navigationSize      : false,     // Set this to the maximum number of visible navigation tabs; false to disable

		// Slideshow options
		autoPlay            : false,     // If true, the slideshow will start running; replaces "startStopped" option
		autoPlayLocked      : false,     // If true, user changing slides will not stop the slideshow
		autoPlayDelayed     : false,     // If true, starting a slideshow will delay advancing slides; if false, the slider will immediately advance to the next slide when slideshow starts
		pauseOnHover        : true,      // If true & the slideshow is active, the slideshow will pause on hover
		stopAtEnd           : false,     // If true & the slideshow is active, the slideshow will stop on the last page. This also stops the rewind effect when infiniteSlides is false.
		playRtl             : false,     // If true, the slideshow will move right-to-left

		// Times
		delay               : 3000,      // How long between slideshow transitions in AutoPlay mode (in milliseconds)
		resumeDelay         : 15000,     // Resume slideshow after user interaction, only if autoplayLocked is true (in milliseconds).
		animationTime       : 600,       // How long the slideshow transition takes (in milliseconds)
		delayBeforeAnimate  : 0,         // How long to pause slide animation before going to the desired slide (used if you want your "out" FX to show).

/*
		// Callbacks - commented out to reduce size of the minified version - they still work
		onSliderResize      : function(e, slider) {}, // Callback when slider resizes
		onBeforeInitialize  : function(e, slider) {}, // Callback before the plugin initializes
		onInitialized       : function(e, slider) {}, // Callback when the plugin finished initializing
		onShowStart         : function(e, slider) {}, // Callback on slideshow start
		onShowStop          : function(e, slider) {}, // Callback after slideshow stops
		onShowPause         : function(e, slider) {}, // Callback when slideshow pauses
		onShowUnpause       : function(e, slider) {}, // Callback when slideshow unpauses - may not trigger properly if user clicks on any controls
		onSlideInit         : function(e, slider) {}, // Callback when slide initiates, before control animation
		onSlideBegin        : function(e, slider) {}, // Callback before slide animates
		onSlideComplete     : function(slider) {},    // Callback when slide completes - no event variable!
*/

		// Interactivity
		clickForwardArrow   : "click",         // Event used to activate forward arrow functionality (e.g. add jQuery mobile's "swiperight")
		clickBackArrow      : "click",         // Event used to activate back arrow functionality (e.g. add jQuery mobile's "swipeleft")
		clickControls       : "click focusin", // Events used to activate navigation control functionality
		clickSlideshow      : "click",         // Event used to activate slideshow play/stop button
		allowRapidChange    : false,           // If true, allow rapid changing of the active pane, instead of ignoring activity during animation

		// Video
		resumeOnVideoEnd    : true,      // If true & the slideshow is active & a supported video is playing, it will pause the autoplay until the video is complete
		resumeOnVisible     : true,      // If true the video will resume playing, if previously paused; if false, the video remains paused.
		isVideoPlaying      : function(base){ return false; } // return true if video is playing or false if not - used by video extension

		// deprecated - use the video extension wmode option now
		// addWmodeToObject : "opaque"   // If your slider has a video supported by the extension, the script will automatically add a wmode parameter with this setting

	};

	$.fn.anythingSlider = function(options, callback) {

		return this.each(function(){
			var page, anySlide = $(this).data('AnythingSlider');

			// initialize the slider but prevent multiple initializations
			if ((typeof(options)).match('object|undefined')){
				if (!anySlide) {
					(new $.anythingSlider(this, options));
				} else {
					anySlide.updateSlider();
				}
			// If options is a number, process as an external link to page #: $(element).anythingSlider(#)
			} else if (/\d/.test(options) && !isNaN(options) && anySlide) {
				page = (typeof(options) === "number") ? options : parseInt($.trim(options),10); // accepts "  2  "
				// ignore out of bound pages
				if ( page >= 1 && page <= anySlide.pages ) {
					anySlide.gotoPage(page, false, callback); // page #, autoplay, one time callback
				}
			// Accept id or class name
			} else if (/^[#|.]/.test(options) && $(options).length) {
				anySlide.gotoPage(options, false, callback);
			}
		});
	};

})(jQuery, window, document);
(function(){function C(){var a="{}";if("userDataBehavior"==h){d.load("jStorage");try{a=d.getAttribute("jStorage")}catch(b){}try{r=d.getAttribute("jStorage_update")}catch(c){}g.jStorage=a}D();x();E()}function u(){var a;clearTimeout(F);F=setTimeout(function(){if("localStorage"==h||"globalStorage"==h)a=g.jStorage_update;else if("userDataBehavior"==h){d.load("jStorage");try{a=d.getAttribute("jStorage_update")}catch(b){}}if(a&&a!=r){r=a;var k=l.parse(l.stringify(c.__jstorage_meta.CRC32)),p;C();p=l.parse(l.stringify(c.__jstorage_meta.CRC32));
var e,y=[],f=[];for(e in k)k.hasOwnProperty(e)&&(p[e]?k[e]!=p[e]&&"2."==String(k[e]).substr(0,2)&&y.push(e):f.push(e));for(e in p)p.hasOwnProperty(e)&&(k[e]||y.push(e));s(y,"updated");s(f,"deleted")}},25)}function s(a,b){a=[].concat(a||[]);if("flushed"==b){a=[];for(var c in j)j.hasOwnProperty(c)&&a.push(c);b="deleted"}c=0;for(var p=a.length;c<p;c++){if(j[a[c]])for(var e=0,d=j[a[c]].length;e<d;e++)j[a[c]][e](a[c],b);if(j["*"]){e=0;for(d=j["*"].length;e<d;e++)j["*"][e](a[c],b)}}}function v(){var a=
(+new Date).toString();"localStorage"==h||"globalStorage"==h?g.jStorage_update=a:"userDataBehavior"==h&&(d.setAttribute("jStorage_update",a),d.save("jStorage"));u()}function D(){if(g.jStorage)try{c=l.parse(String(g.jStorage))}catch(a){g.jStorage="{}"}else g.jStorage="{}";z=g.jStorage?String(g.jStorage).length:0;c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.CRC32||(c.__jstorage_meta.CRC32={})}function w(){if(c.__jstorage_meta.PubSub){for(var a=+new Date-2E3,b=0,k=c.__jstorage_meta.PubSub.length;b<
k;b++)if(c.__jstorage_meta.PubSub[b][0]<=a){c.__jstorage_meta.PubSub.splice(b,c.__jstorage_meta.PubSub.length-b);break}c.__jstorage_meta.PubSub.length||delete c.__jstorage_meta.PubSub}try{g.jStorage=l.stringify(c),d&&(d.setAttribute("jStorage",g.jStorage),d.save("jStorage")),z=g.jStorage?String(g.jStorage).length:0}catch(p){}}function q(a){if(!a||"string"!=typeof a&&"number"!=typeof a)throw new TypeError("Key name must be string or numeric");if("__jstorage_meta"==a)throw new TypeError("Reserved key name");
return!0}function x(){var a,b,k,d,e=Infinity,g=!1,f=[];clearTimeout(G);if(c.__jstorage_meta&&"object"==typeof c.__jstorage_meta.TTL){a=+new Date;k=c.__jstorage_meta.TTL;d=c.__jstorage_meta.CRC32;for(b in k)k.hasOwnProperty(b)&&(k[b]<=a?(delete k[b],delete d[b],delete c[b],g=!0,f.push(b)):k[b]<e&&(e=k[b]));Infinity!=e&&(G=setTimeout(x,e-a));g&&(w(),v(),s(f,"deleted"))}}function E(){var a;if(c.__jstorage_meta.PubSub){var b,k=A;for(a=c.__jstorage_meta.PubSub.length-1;0<=a;a--)if(b=c.__jstorage_meta.PubSub[a],
b[0]>A){var k=b[0],d=b[1];b=b[2];if(t[d])for(var e=0,g=t[d].length;e<g;e++)t[d][e](d,l.parse(l.stringify(b)))}A=k}}var n=window.jQuery||window.$||(window.$={}),l={parse:window.JSON&&(window.JSON.parse||window.JSON.decode)||String.prototype.evalJSON&&function(a){return String(a).evalJSON()}||n.parseJSON||n.evalJSON,stringify:Object.toJSON||window.JSON&&(window.JSON.stringify||window.JSON.encode)||n.toJSON};if(!l.parse||!l.stringify)throw Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
var c={__jstorage_meta:{CRC32:{}}},g={jStorage:"{}"},d=null,z=0,h=!1,j={},F=!1,r=0,t={},A=+new Date,G,B={isXML:function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?"HTML"!==a.nodeName:!1},encode:function(a){if(!this.isXML(a))return!1;try{return(new XMLSerializer).serializeToString(a)}catch(b){try{return a.xml}catch(c){}}return!1},decode:function(a){var b="DOMParser"in window&&(new DOMParser).parseFromString||window.ActiveXObject&&function(a){var b=new ActiveXObject("Microsoft.XMLDOM");b.async=
"false";b.loadXML(a);return b};if(!b)return!1;a=b.call("DOMParser"in window&&new DOMParser||window,a,"text/xml");return this.isXML(a)?a:!1}};n.jStorage={version:"0.4.3",set:function(a,b,d){q(a);d=d||{};if("undefined"==typeof b)return this.deleteKey(a),b;if(B.isXML(b))b={_is_xml:!0,xml:B.encode(b)};else{if("function"==typeof b)return;b&&"object"==typeof b&&(b=l.parse(l.stringify(b)))}c[a]=b;for(var g=c.__jstorage_meta.CRC32,e=l.stringify(b),j=e.length,f=2538058380^j,h=0,m;4<=j;)m=e.charCodeAt(h)&255|
(e.charCodeAt(++h)&255)<<8|(e.charCodeAt(++h)&255)<<16|(e.charCodeAt(++h)&255)<<24,m=1540483477*(m&65535)+((1540483477*(m>>>16)&65535)<<16),m^=m>>>24,m=1540483477*(m&65535)+((1540483477*(m>>>16)&65535)<<16),f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16)^m,j-=4,++h;switch(j){case 3:f^=(e.charCodeAt(h+2)&255)<<16;case 2:f^=(e.charCodeAt(h+1)&255)<<8;case 1:f^=e.charCodeAt(h)&255,f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16)}f^=f>>>13;f=1540483477*(f&65535)+((1540483477*(f>>>16)&
65535)<<16);g[a]="2."+((f^f>>>15)>>>0);this.setTTL(a,d.TTL||0);s(a,"updated");return b},get:function(a,b){q(a);return a in c?c[a]&&"object"==typeof c[a]&&c[a]._is_xml?B.decode(c[a].xml):c[a]:"undefined"==typeof b?null:b},deleteKey:function(a){q(a);return a in c?(delete c[a],"object"==typeof c.__jstorage_meta.TTL&&a in c.__jstorage_meta.TTL&&delete c.__jstorage_meta.TTL[a],delete c.__jstorage_meta.CRC32[a],w(),v(),s(a,"deleted"),!0):!1},setTTL:function(a,b){var d=+new Date;q(a);b=Number(b)||0;return a in
c?(c.__jstorage_meta.TTL||(c.__jstorage_meta.TTL={}),0<b?c.__jstorage_meta.TTL[a]=d+b:delete c.__jstorage_meta.TTL[a],w(),x(),v(),!0):!1},getTTL:function(a){var b=+new Date;q(a);return a in c&&c.__jstorage_meta.TTL&&c.__jstorage_meta.TTL[a]?(a=c.__jstorage_meta.TTL[a]-b)||0:0},flush:function(){c={__jstorage_meta:{CRC32:{}}};w();v();s(null,"flushed");return!0},storageObj:function(){function a(){}a.prototype=c;return new a},index:function(){var a=[],b;for(b in c)c.hasOwnProperty(b)&&"__jstorage_meta"!=
b&&a.push(b);return a},storageSize:function(){return z},currentBackend:function(){return h},storageAvailable:function(){return!!h},listenKeyChange:function(a,b){q(a);j[a]||(j[a]=[]);j[a].push(b)},stopListening:function(a,b){q(a);if(j[a])if(b)for(var c=j[a].length-1;0<=c;c--)j[a][c]==b&&j[a].splice(c,1);else delete j[a]},subscribe:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");t[a]||(t[a]=[]);t[a].push(b)},publish:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");
c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.PubSub||(c.__jstorage_meta.PubSub=[]);c.__jstorage_meta.PubSub.unshift([+new Date,a,b]);w();v()},reInit:function(){C()}};a:{n=!1;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","tmpval"),n=!0,window.localStorage.removeItem("_tmptest")}catch(H){}if(n)try{window.localStorage&&(g=window.localStorage,h="localStorage",r=g.jStorage_update)}catch(I){}else if("globalStorage"in window)try{window.globalStorage&&(g=window.globalStorage[window.location.hostname],
h="globalStorage",r=g.jStorage_update)}catch(J){}else if(d=document.createElement("link"),d.addBehavior){d.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(d);try{d.load("jStorage")}catch(K){d.setAttribute("jStorage","{}"),d.save("jStorage"),d.load("jStorage")}n="{}";try{n=d.getAttribute("jStorage")}catch(L){}try{r=d.getAttribute("jStorage_update")}catch(M){}g.jStorage=n;h="userDataBehavior"}else{d=null;break a}D();x();"localStorage"==h||"globalStorage"==
h?"addEventListener"in window?window.addEventListener("storage",u,!1):document.attachEvent("onstorage",u):"userDataBehavior"==h&&setInterval(u,1E3);E();"addEventListener"in window&&window.addEventListener("pageshow",function(a){a.persisted&&u()},!1)}})();
/* ********************************************************************
 **********************************************************************
 * HTML Virtual Keyboard Interface Script - v1.49
 *   Copyright (c) 2011 - GreyWyvern
 *
 *  - Licenced for free distribution under the BSDL
 *          http://www.opensource.org/licenses/bsd-license.php
 *
 * Add a script-driven keyboard interface to text fields, password
 * fields and textareas.
 *
 * See http://www.greywyvern.com/code/javascript/keyboard for examples
 * and usage instructions.
 *
 * Version 1.49 - November 8, 2011
 *   - Don't display language drop-down if only one keyboard available
 *
 *   See full changelog at:
 *     http://www.greywyvern.com/code/javascript/keyboard.changelog.txt
 *
 * Keyboard Credits
 *   - Yiddish (Yidish Lebt) keyboard layout by Simche Taub (jidysz.net)
 *   - Urdu Phonetic keyboard layout by Khalid Malik
 *   - Yiddish keyboard layout by Helmut Wollmersdorfer
 *   - Khmer keyboard layout by Sovann Heng (km-kh.com)
 *   - Dari keyboard layout by Saif Fazel
 *   - Kurdish keyboard layout by Ara Qadir
 *   - Assamese keyboard layout by Kanchan Gogoi
 *   - Bulgarian BDS keyboard layout by Milen Georgiev
 *   - Basic Japanese Hiragana/Katakana keyboard layout by Damjan
 *   - Ukrainian keyboard layout by Dmitry Nikitin
 *   - Macedonian keyboard layout by Damjan Dimitrioski
 *   - Pashto keyboard layout by Ahmad Wali Achakzai (qamosona.com)
 *   - Armenian Eastern and Western keyboard layouts by Hayastan Project (www.hayastan.co.uk)
 *   - Pinyin keyboard layout from a collaboration with Lou Winklemann
 *   - Kazakh keyboard layout by Alex Madyankin
 *   - Danish keyboard layout by Verner Kjærsgaard
 *   - Slovak keyboard layout by Daniel Lara (www.learningslovak.com)
 *   - Belarusian and Serbian Cyrillic keyboard layouts by Evgeniy Titov
 *   - Bulgarian Phonetic keyboard layout by Samuil Gospodinov
 *   - Swedish keyboard layout by Håkan Sandberg
 *   - Romanian keyboard layout by Aurel
 *   - Farsi (Persian) keyboard layout by Kaveh Bakhtiyari (www.bakhtiyari.com)
 *   - Burmese keyboard layout by Cetanapa
 *   - Bosnian/Croatian/Serbian Latin/Slovenian keyboard layout by Miran Zeljko
 *   - Hungarian keyboard layout by Antal Sall 'Hiromacu'
 *   - Arabic keyboard layout by Srinivas Reddy
 *   - Italian and Spanish (Spain) keyboard layouts by dictionarist.com
 *   - Lithuanian and Russian keyboard layouts by Ramunas
 *   - German keyboard layout by QuHno
 *   - French keyboard layout by Hidden Evil
 *   - Polish Programmers layout by moose
 *   - Turkish keyboard layouts by offcu
 *   - Dutch and US Int'l keyboard layouts by jerone
 *
 */
var VKI_attach, VKI_close;
(function() {
  var self = this;

  this.VKI_version = "1.49";
  this.VKI_showVersion = true;
  this.VKI_target = false;
  this.VKI_shift = this.VKI_shiftlock = false;
  this.VKI_altgr = this.VKI_altgrlock = false;
  this.VKI_dead = false;
  this.VKI_deadBox = 0;//После предыдущих двух настроек уже и не искал. Николай Авдеев. true; // Show the dead keys checkbox
  this.VKI_deadkeysOn = false;  // Turn dead keys on by default
  this.VKI_numberPad = true;  // Allow user to open and close the number pad
  this.VKI_numberPadOn = false;  // Show number pad by default
  this.VKI_kts = this.VKI_kt = "Русский";  //Как дотянуться извне, не нашёл. Николай Авдеев.
  this.VKI_langAdapt = true;  // Use lang attribute of input to select keyboard
  this.VKI_size = 5;  // Default keyboard size (1-5) //Как дотянуться извне, не нашёл. Николай Авдеев.
  this.VKI_sizeAdj = true;  // Allow user to adjust keyboard size
  this.VKI_clearPasswords = false;  // Clear password fields on focus
  this.VKI_imageURI = "keyboard.png";  // If empty string, use imageless mode
  this.VKI_clickless = 0;  // 0 = disabled, > 0 = delay in ms
  this.VKI_activeTab = 0;  // Tab moves to next: 1 = element, 2 = keyboard enabled element
  this.VKI_enterSubmit = true;  // Submit forms when Enter is pressed
  this.VKI_keyCenter = 3;

  this.VKI_isIE = /*@cc_on!@*/false;
  this.VKI_isIE6 = /*@if(@_jscript_version == 5.6)!@end@*/false;
  this.VKI_isIElt8 = /*@if(@_jscript_version < 5.8)!@end@*/false;
  this.VKI_isWebKit = RegExp("KHTML").test(navigator.userAgent);
  this.VKI_isOpera = RegExp("Opera").test(navigator.userAgent);
  this.VKI_isMoz = (!this.VKI_isWebKit && navigator.product == "Gecko");

  /* ***** i18n text strings ************************************* */
  this.VKI_i18n = {
    '00': "Display Number Pad",
    '01': "Виртуальная клавиатура",
    '02': "Раскладка клавиатуры",
    '03': "Dead keys",
    '04': "Вкл",
    '05': "Выкл",
    '06': "Скрыть клавиатуру",
    '07': "Сброс",
    '08': "Очистить значение поля",
    '09': "Версия",
    '10': "Decrease keyboard size",
    '11': "Increase keyboard size"
  };


  /* ***** Create keyboards ************************************** */
  this.VKI_layout = {};

  // - Lay out each keyboard in rows of sub-arrays.  Each sub-array
  //   represents one key.
  //
  // - Each sub-array consists of four slots described as follows:
  //     example: ["a", "A", "\u00e1", "\u00c1"]
  //
  //          a) Normal character
  //          A) Character + Shift/Caps
  //     \u00e1) Character + Alt/AltGr/AltLk
  //     \u00c1) Character + Shift/Caps + Alt/AltGr/AltLk
  //
  //   You may include sub-arrays which are fewer than four slots.
  //   In these cases, the missing slots will be blanked when the
  //   corresponding modifier key (Shift or AltGr) is pressed.
  //
  // - If the second slot of a sub-array matches one of the following
  //   strings:
  //     "Tab", "Caps", "Shift", "Enter", "Bksp",
  //     "Alt" OR "AltGr", "AltLk"
  //   then the function of the key will be the following,
  //   respectively:
  //     - Insert a tab
  //     - Toggle Caps Lock (technically a Shift Lock)
  //     - Next entered character will be the shifted character
  //     - Insert a newline (textarea), or close the keyboard
  //     - Delete the previous character
  //     - Next entered character will be the alternate character
  //     - Toggle Alt/AltGr Lock
  //
  //   The first slot of this sub-array will be the text to display
  //   on the corresponding key.  This allows for easy localisation
  //   of key names.
  //
  // - Layout dead keys (diacritic + letter) should be added as
  //   property/value pairs of objects with hash keys equal to the
  //   diacritic.  See the "this.VKI_deadkey" object below the layout
  //   definitions.  In each property/value pair, the value is what
  //   the diacritic would change the property name to.
  //
  // - Note that any characters beyond the normal ASCII set should be
  //   entered in escaped Unicode format.  (eg \u00a3 = Pound symbol)
  //   You can find Unicode values for characters here:
  //     http://unicode.org/charts/
  //
  // - To remove a keyboard, just delete it, or comment it out of the
  //   source code. If you decide to remove the US International
  //   keyboard layout, make sure you change the default layout
  //   (this.VKI_kt) above so it references an existing layout.

  this.VKI_layout['\u0627\u0644\u0639\u0631\u0628\u064a\u0629'] = {
    'name': "Arabic", 'keys': [
      [["\u0630", "\u0651 "], ["1", "!", "\u00a1", "\u00b9"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a4", "\u00a3"], ["5", "%", "\u20ac"], ["6", "^", "\u00bc"], ["7", "&", "\u00bd"], ["8", "*", "\u00be"], ["9", "(", "\u2018"], ["0", ")", "\u2019"], ["-", "_", "\u00a5"], ["=", "+", "\u00d7", "\u00f7"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0636", "\u064e"], ["\u0635", "\u064b"], ["\u062b", "\u064f"], ["\u0642", "\u064c"], ["\u0641", "\u0644"], ["\u063a", "\u0625"], ["\u0639", "\u2018"], ["\u0647", "\u00f7"], ["\u062e", "\u00d7"], ["\u062d", "\u061b"], ["\u062c", "<"], ["\u062f", ">"], ["\\", "|"]],
      [["Caps", "Caps"], ["\u0634", "\u0650"], ["\u0633", "\u064d"], ["\u064a", "]"], ["\u0628", "["], ["\u0644", "\u0644"], ["\u0627", "\u0623"], ["\u062a", "\u0640"], ["\u0646", "\u060c"], ["\u0645", "/"], ["\u0643", ":"], ["\u0637", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0626", "~"], ["\u0621", "\u0652"], ["\u0624", "}"], ["\u0631", "{"], ["\u0644", "\u0644"], ["\u0649", "\u0622"], ["\u0629", "\u2019"], ["\u0648", ","], ["\u0632", "."], ["\u0638", "\u061f"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["Alt", "Alt"]]
    ], 'lang': ["ar"] };

  this.VKI_layout['\u0985\u09b8\u09ae\u09c0\u09df\u09be'] = {
    'name': "Assamese", 'keys': [
      [["+", "?"], ["\u09E7", "{", "\u09E7"], ["\u09E8", "}", "\u09E8"], ["\u09E9", "\u09CD\u09F0", "\u09E9"], ["\u09EA", "\u09F0\u09CD", "\u09EA"], ["\u09EB", "\u099C\u09CD\u09F0", "\u09EB"], ["\u09EC", "\u0995\u09CD\u09B7", "\u09EC"], ["\u09ED", "\u0995\u09CD\u09F0", "\u09ED"], ["\u09EE", "\u09B6\u09CD\u09F0", "\u09EE"], ["\u09EF", "(", "\u09EF"], ["\u09E6", ")", "\u09E6"], ["-", ""], ["\u09C3", "\u098B", "\u09E2", "\u09E0"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u09CC", "\u0994", "\u09D7"], ["\u09C8", "\u0990"], ["\u09BE", "\u0986"], ["\u09C0", "\u0988", "\u09E3", "\u09E1"], ["\u09C2", "\u098A"], ["\u09F1", "\u09AD"], ["\u09B9", "\u0999"], ["\u0997", "\u0998"], ["\u09A6", "\u09A7"], ["\u099C", "\u099D"], ["\u09A1", "\u09A2", "\u09DC", "\u09DD"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["\u09CB", "\u0993", "\u09F4", "\u09F5"], ["\u09C7", "\u098F", "\u09F6", "\u09F7"], ["\u09CD", "\u0985", "\u09F8", "\u09F9"], ["\u09BF", "\u0987", "\u09E2", "\u098C"], ["\u09C1", "\u0989"], ["\u09AA", "\u09AB"], ["\u09F0", "", "\u09F0", "\u09F1"], ["\u0995", "\u0996"], ["\u09A4", "\u09A5"], ["\u099A", "\u099B"], ["\u099F", "\u09A0"], ["\u09BC", "\u099E"]],
      [["Shift", "Shift"], ["\u09CE", "\u0983"], ["\u0982", "\u0981", "\u09FA"], ["\u09AE", "\u09A3"], ["\u09A8", "\u09F7"], ["\u09AC", "\""], ["\u09B2", "'"], ["\u09B8", "\u09B6"], [",", "\u09B7"], [".", ";"], ["\u09AF", "\u09DF"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["as"] };

  this.VKI_layout['\u0410\u0437\u04d9\u0440\u0431\u0430\u0458\u04b9\u0430\u043d\u04b9\u0430'] = {
    'name': "Azerbaijani Cyrillic", 'keys': [
      [["`", "~"], ["1", "!"], ["2", '"'], ["3", "\u2116"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0458", "\u0408"], ["\u04AF", "\u04AE"], ["\u0443", "\u0423"], ["\u043A", "\u041A"], ["\u0435", "\u0415"], ["\u043D", "\u041D"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u04BB", "\u04BA"], ["\u0437", "\u0417"], ["\u0445", "\u0425"], ["\u04B9", "\u04B8"], ["\\", "/"]],
      [["Caps", "Caps"], ["\u0444", "\u0424"], ["\u044B", "\u042B"], ["\u0432", "\u0412"], ["\u0430", "\u0410"], ["\u043F", "\u041F"], ["\u0440", "\u0420"], ["\u043E", "\u041E"], ["\u043B", "\u041B"], ["\u0434", "\u0414"], ["\u0436", "\u0416"], ["\u049D", "\u049C"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\\", "|"], ["\u04D9", "\u04D8"], ["\u0447", "\u0427"], ["\u0441", "\u0421"], ["\u043C", "\u041C"], ["\u0438", "\u0418"], ["\u0442", "\u0422"], ["\u0493", "\u0492"], ["\u0431", "\u0411"], ["\u04E9", "\u04E8"], [".", ","], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["az-Cyrl"] };

  this.VKI_layout['Az\u0259rbaycanca'] = {
    'name': "Azerbaijani Latin", 'keys': [
      [["`", "~"], ["1", "!"], ["2", '"'], ["3", "\u2166"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["\u00FC", "\u00DC"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "\u0130"], ["o", "O"], ["p", "P"], ["\u00F6", "\u00D6"], ["\u011F", "\u011E"], ["\\", "/"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u0131", "I"], ["\u0259", "\u018F"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], ["\u00E7", "\u00C7"], ["\u015F", "\u015E"], [".", ","], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["az"] };

  this.VKI_layout['\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u043a\u0430\u044f'] = {
    'name': "Belarusian", 'keys': [
      [["\u0451", "\u0401"], ["1", "!"], ["2", '"'], ["3", "\u2116"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0439", "\u0419"], ["\u0446", "\u0426"], ["\u0443", "\u0423"], ["\u043a", "\u041a"], ["\u0435", "\u0415"], ["\u043d", "\u041d"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u045e", "\u040e"], ["\u0437", "\u0417"], ["\u0445", "\u0425"], ["'", "'"], ["\\", "/"]],
      [["Caps", "Caps"], ["\u0444", "\u0424"], ["\u044b", "\u042b"], ["\u0432", "\u0412"], ["\u0430", "\u0410"], ["\u043f", "\u041f"], ["\u0440", "\u0420"], ["\u043e", "\u041e"], ["\u043b", "\u041b"], ["\u0434", "\u0414"], ["\u0436", "\u0416"], ["\u044d", "\u042d"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["/", "|"], ["\u044f", "\u042f"], ["\u0447", "\u0427"], ["\u0441", "\u0421"], ["\u043c", "\u041c"], ["\u0456", "\u0406"], ["\u0442", "\u0422"], ["\u044c", "\u042c"], ["\u0431", "\u0411"], ["\u044e", "\u042e"], [".", ","], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["be"] };

  this.VKI_layout['Belgische / Belge'] = {
    'name': "Belgian", 'keys': [
      [["\u00b2", "\u00b3"], ["&", "1", "|"], ["\u00e9", "2", "@"], ['"', "3", "#"], ["'", "4"], ["(", "5"], ["\u00a7", "6", "^"], ["\u00e8", "7"], ["!", "8"], ["\u00e7", "9", "{"], ["\u00e0", "0", "}"], [")", "\u00b0"], ["-", "_"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["a", "A"], ["z", "Z"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["^", "\u00a8", "["], ["$", "*", "]"], ["\u03bc", "\u00a3", "`"]],
      [["Caps", "Caps"], ["q", "Q"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["m", "M"], ["\u00f9", "%", "\u00b4"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">", "\\"], ["w", "W"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], [",", "?"], [";", "."], [":", "/"], ["=", "+", "~"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["nl-BE", "fr-BE"] };

  this.VKI_layout['\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438 \u0424\u043e\u043d\u0435\u0442\u0438\u0447\u0435\u043d'] = {
    'name': "Bulgarian Phonetic", 'keys': [
      [["\u0447", "\u0427"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u044F", "\u042F"], ["\u0432", "\u0412"], ["\u0435", "\u0415"], ["\u0440", "\u0420"], ["\u0442", "\u0422"], ["\u044A", "\u042A"], ["\u0443", "\u0423"], ["\u0438", "\u0418"], ["\u043E", "\u041E"], ["\u043F", "\u041F"], ["\u0448", "\u0428"], ["\u0449", "\u0429"], ["\u044E", "\u042E"]],
      [["Caps", "Caps"], ["\u0430", "\u0410"], ["\u0441", "\u0421"], ["\u0434", "\u0414"], ["\u0444", "\u0424"], ["\u0433", "\u0413"], ["\u0445", "\u0425"], ["\u0439", "\u0419"], ["\u043A", "\u041A"], ["\u043B", "\u041B"], [";", ":"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0437", "\u0417"], ["\u044C", "\u042C"], ["\u0446", "\u0426"], ["\u0436", "\u0416"], ["\u0431", "\u0411"], ["\u043D", "\u041D"], ["\u043C", "\u041C"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["bg"] };

  this.VKI_layout['\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438'] = {
    'name': "Bulgarian BDS", 'keys': [
      [["`", "~"], ["1", "!"], ["2", "?"], ["3", "+"], ["4", '"'], ["5", "%"], ["6", "="], ["7", ":"], ["8", "/"], ["9", "_"], ["0", "\u2116"], ["-", "\u0406"], ["=", "V"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], [",", "\u044b"], ["\u0443", "\u0423"], ["\u0435", "\u0415"], ["\u0438", "\u0418"], ["\u0448", "\u0428"], ["\u0449", "\u0429"], ["\u043a", "\u041a"], ["\u0441", "\u0421"], ["\u0434", "\u0414"], ["\u0437", "\u0417"], ["\u0446", "\u0426"], [";", "\u00a7"], ["(", ")"]],
      [["Caps", "Caps"], ["\u044c", "\u042c"], ["\u044f", "\u042f"], ["\u0430", "\u0410"], ["\u043e", "\u041e"], ["\u0436", "\u0416"], ["\u0433", "\u0413"], ["\u0442", "\u0422"], ["\u043d", "\u041d"], ["\u0412", "\u0412"], ["\u043c", "\u041c"], ["\u0447", "\u0427"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u042e", "\u044e"], ["\u0439", "\u0419"], ["\u044a", "\u042a"], ["\u044d", "\u042d"], ["\u0444", "\u0424"], ["\u0445", "\u0425"], ["\u043f", "\u041f"], ["\u0440", "\u0420"], ["\u043b", "\u041b"], ["\u0431", "\u0411"], ["Shift", "Shift"]],
      [[" ", " "]]
    ]};

  this.VKI_layout['\u09ac\u09be\u0982\u09b2\u09be'] = {
    'name': "Bengali", 'keys': [
      [[""], ["1", "", "\u09E7"], ["2", "", "\u09E8"], ["3", "\u09CD\u09B0", "\u09E9"], ["4", "\u09B0\u09CD", "\u09EA"], ["5", "\u099C\u09CD\u09B0", "\u09EB"], ["6", "\u09A4\u09CD\u09B7", "\u09EC"], ["7", "\u0995\u09CD\u09B0", "\u09ED"], ["8", "\u09B6\u09CD\u09B0", "\u09EE"], ["9", "(", "\u09EF"], ["0", ")", "\u09E6"], ["-", "\u0983"], ["\u09C3", "\u098B", "\u09E2", "\u09E0"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u09CC", "\u0994", "\u09D7"], ["\u09C8", "\u0990"], ["\u09BE", "\u0986"], ["\u09C0", "\u0988", "\u09E3", "\u09E1"], ["\u09C2", "\u098A"], ["\u09AC", "\u09AD"], ["\u09B9", "\u0999"], ["\u0997", "\u0998"], ["\u09A6", "\u09A7"], ["\u099C", "\u099D"], ["\u09A1", "\u09A2", "\u09DC", "\u09DD"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["\u09CB", "\u0993", "\u09F4", "\u09F5"], ["\u09C7", "\u098F", "\u09F6", "\u09F7"], ["\u09CD", "\u0985", "\u09F8", "\u09F9"], ["\u09BF", "\u0987", "\u09E2", "\u098C"], ["\u09C1", "\u0989"], ["\u09AA", "\u09AB"], ["\u09B0", "", "\u09F0", "\u09F1"], ["\u0995", "\u0996"], ["\u09A4", "\u09A5"], ["\u099A", "\u099B"], ["\u099F", "\u09A0"], ["\u09BC", "\u099E"]],
      [["Shift", "Shift"], [""], ["\u0982", "\u0981", "\u09FA"], ["\u09AE", "\u09A3"], ["\u09A8"], ["\u09AC"], ["\u09B2"], ["\u09B8", "\u09B6"], [",", "\u09B7"], [".", "{"], ["\u09AF", "\u09DF"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["bn"] };

  this.VKI_layout['Bosanski'] = {
    'name': "Bosnian", 'keys': [
      [["\u00B8", "\u00A8"], ["1", "!", "~"], ["2", '"', "\u02C7"], ["3", "#", "^"], ["4", "$", "\u02D8"], ["5", "%", "\u00B0"], ["6", "&", "\u02DB"], ["7", "/", "`"], ["8", "(", "\u02D9"], ["9", ")", "\u00B4"], ["0", "=", "\u02DD"], ["'", "?", "\u00A8"], ["+", "*", "\u00B8"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\\"], ["w", "W", "|"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u0161", "\u0160", "\u00F7"], ["\u0111", "\u0110", "\u00D7"], ["\u017E", "\u017D", "\u00A4"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F", "["], ["g", "G", "]"], ["h", "H"], ["j", "J"], ["k", "K", "\u0142"], ["l", "L", "\u0141"], ["\u010D", "\u010C"], ["\u0107", "\u0106", "\u00DF"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">"], ["y", "Y"], ["x", "X"], ["c", "C"], ["v", "V", "@"], ["b", "B", "{"], ["n", "N", "}"], ["m", "M", "\u00A7"], [",", ";", "<"], [".", ":", ">"], ["-", "_", "\u00A9"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["bs"] };

  this.VKI_layout['Canadienne-fran\u00e7aise'] = {
    'name': "Canadian French", 'keys': [
      [["#", "|", "\\"], ["1", "!", "\u00B1"], ["2", '"', "@"], ["3", "/", "\u00A3"], ["4", "$", "\u00A2"], ["5", "%", "\u00A4"], ["6", "?", "\u00AC"], ["7", "&", "\u00A6"], ["8", "*", "\u00B2"], ["9", "(", "\u00B3"], ["0", ")", "\u00BC"], ["-", "_", "\u00BD"], ["=", "+", "\u00BE"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O", "\u00A7"], ["p", "P", "\u00B6"], ["^", "^", "["], ["\u00B8", "\u00A8", "]"], ["<", ">", "}"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":", "~"], ["`", "`", "{"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u00AB", "\u00BB", "\u00B0"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u00B5"], [",", "'", "\u00AF"], [".", ".", "\u00AD"], ["\u00E9", "\u00C9", "\u00B4"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["fr-CA"] };

  this.VKI_layout['\u010cesky'] = {
    'name': "Czech", 'keys': [
      [[";", "\u00b0", "`", "~"], ["+", "1", "!"], ["\u011B", "2", "@"], ["\u0161", "3", "#"], ["\u010D", "4", "$"], ["\u0159", "5", "%"], ["\u017E", "6", "^"], ["\u00FD", "7", "&"], ["\u00E1", "8", "*"], ["\u00ED", "9", "("], ["\u00E9", "0", ")"], ["=", "%", "-", "_"], ["\u00B4", "\u02c7", "=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00FA", "/", "[", "{"], [")", "(", "]", "}"], ["\u00A8", "'", "\\", "|"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u016F", '"', ";", ":"], ["\u00A7", "!", "\u00a4", "^"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\\", "|", "", "\u02dd"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "?", "<", "\u00d7"], [".", ":", ">", "\u00f7"], ["-", "_", "/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["Alt", "Alt"]]
    ], 'lang': ["cs"] };

  this.VKI_layout['Dansk'] = {
    'name': "Danish", 'keys': [
      [["\u00bd", "\u00a7"], ["1", "!"], ["2", '"', "@"], ["3", "#", "\u00a3"], ["4", "\u00a4", "$"], ["5", "%", "\u20ac"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["+", "?"], ["\u00b4", "`", "|"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00e5", "\u00c5"], ["\u00a8", "^", "~"], ["'", "*"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00e6", "\u00c6"], ["\u00f8", "\u00d8"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">", "\\"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u03bc", "\u039c"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["da"] };

  this.VKI_layout['Deutsch'] = {
    'name': "German", 'keys': [
      [["^", "\u00b0"], ["1", "!"], ["2", '"', "\u00b2"], ["3", "\u00a7", "\u00b3"], ["4", "$"], ["5", "%"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["\u00df", "?", "\\"], ["\u00b4", "`"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "@"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00fc", "\u00dc"], ["+", "*", "~"], ["#", "'"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f6", "\u00d6"], ["\u00e4", "\u00c4"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">", "\u00a6"], ["y", "Y"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u00b5"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["de"] };

  this.VKI_layout['Dingbats'] = {
    'name': "Dingbats", 'keys': [
      [["\u2764", "\u2765", "\u2766", "\u2767"], ["\u278a", "\u2780", "\u2776", "\u2768"], ["\u278b", "\u2781", "\u2777", "\u2769"], ["\u278c", "\u2782", "\u2778", "\u276a"], ["\u278d", "\u2783", "\u2779", "\u276b"], ["\u278e", "\u2784", "\u277a", "\u276c"], ["\u278f", "\u2785", "\u277b", "\u276d"], ["\u2790", "\u2786", "\u277c", "\u276e"], ["\u2791", "\u2787", "\u277d", "\u276f"], ["\u2792", "\u2788", "\u277e", "\u2770"], ["\u2793", "\u2789", "\u277f", "\u2771"], ["\u2795", "\u2796", "\u274c", "\u2797"], ["\u2702", "\u2704", "\u2701", "\u2703"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u2714", "\u2705", "\u2713"], ["\u2718", "\u2715", "\u2717", "\u2716"], ["\u271a", "\u2719", "\u271b", "\u271c"], ["\u271d", "\u271e", "\u271f", "\u2720"], ["\u2722", "\u2723", "\u2724", "\u2725"], ["\u2726", "\u2727", "\u2728", "\u2756"], ["\u2729", "\u272a", "\u272d", "\u2730"], ["\u272c", "\u272b", "\u272e", "\u272f"], ["\u2736", "\u2731", "\u2732", "\u2749"], ["\u273b", "\u273c", "\u273d", "\u273e"], ["\u2744", "\u2745", "\u2746", "\u2743"], ["\u2733", "\u2734", "\u2735", "\u2721"], ["\u2737", "\u2738", "\u2739", "\u273a"]],
      [["Caps", "Caps"], ["\u2799", "\u279a", "\u2798", "\u2758"], ["\u27b5", "\u27b6", "\u27b4", "\u2759"], ["\u27b8", "\u27b9", "\u27b7", "\u275a"], ["\u2794", "\u279c", "\u27ba", "\u27bb"], ["\u279d", "\u279e", "\u27a1", "\u2772"], ["\u27a9", "\u27aa", "\u27ab", "\u27ac"], ["\u27a4", "\u27a3", "\u27a2", "\u279b"], ["\u27b3", "\u27bc", "\u27bd", "\u2773"], ["\u27ad", "\u27ae", "\u27af", "\u27b1"], ["\u27a8", "\u27a6", "\u27a5", "\u27a7"], ["\u279f", "\u27a0", "\u27be", "\u27b2"], ["Enter", "Enter"]],
      [["Shift", "Shift"],  ["\u270c", "\u270b", "\u270a", "\u270d"], ["\u274f", "\u2750", "\u2751", "\u2752"], ["\u273f", "\u2740", "\u2741", "\u2742"], ["\u2747", "\u2748", "\u274a", "\u274b"], ["\u2757", "\u2755", "\u2762", "\u2763"], ["\u2753", "\u2754", "\u27b0", "\u27bf"], ["\u270f", "\u2710", "\u270e", "\u2774"], ["\u2712", "\u2711", "\u274d", "\u274e"], ["\u2709", "\u2706", "\u2708", "\u2707"], ["\u275b", "\u275d", "\u2761", "\u2775"], ["\u275c", "\u275e", "\u275f", "\u2760"], ["Shift", "Shift"]],
      [["AltLk", "AltLk"], [" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ]};

  this.VKI_layout['\u078b\u07a8\u0788\u07ac\u0780\u07a8\u0784\u07a6\u0790\u07b0'] = {
    'name': "Divehi", 'keys': [
      [["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", ")"], ["0", "("], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u07ab", "\u00d7"], ["\u07ae", "\u2019"], ["\u07a7", "\u201c"], ["\u07a9", "/"], ["\u07ad", ":"], ["\u078e", "\u07a4"], ["\u0783", "\u079c"], ["\u0789", "\u07a3"], ["\u078c", "\u07a0"], ["\u0780", "\u0799"], ["\u078d", "\u00f7"], ["[", "{"], ["]", "}"]],
      [["Caps", "Caps"], ["\u07a8", "<"], ["\u07aa", ">"], ["\u07b0", ".", ",", ","], ["\u07a6", "\u060c"], ["\u07ac", '"'], ["\u0788", "\u07a5"], ["\u0787", "\u07a2"], ["\u0782", "\u0798"], ["\u0786", "\u079a"], ["\u078a", "\u07a1"], ["\ufdf2", "\u061b", ";", ";"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\\", "|"], ["\u0792", "\u0796"], ["\u0791", "\u0795"], ["\u0790", "\u078f"], ["\u0794", "\u0797", "\u200D"], ["\u0785", "\u079f", "\u200C"], ["\u078b", "\u079b", "\u200E"], ["\u0784", "\u079D", "\u200F"], ["\u0781", "\\"], ["\u0793", "\u079e"], ["\u07af", "\u061f"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["dv"] };

  this.VKI_layout['Dvorak'] = {
    'name': "Dvorak", 'keys': [
      [["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["[", "{"], ["]", "}"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["'", '"'], [",", "<"], [".", ">"], ["p", "P"], ["y", "Y"], ["f", "F"], ["g", "G"], ["c", "C"], ["r", "R"], ["l", "L"], ["/", "?"], ["=", "+"], ["\\", "|"]],
      [["Caps", "Caps"], ["a", "A"], ["o", "O"], ["e", "E"], ["u", "U"], ["i", "I"], ["d", "D"], ["h", "H"], ["t", "T"], ["n", "N"], ["s", "S"], ["-", "_"], ["Enter", "Enter"]],
      [["Shift", "Shift"], [";", ":"], ["q", "Q"], ["j", "J"], ["k", "K"], ["x", "X"], ["b", "B"], ["m", "M"], ["w", "W"], ["v", "V"], ["z", "Z"], ["Shift", "Shift"]],
      [[" ", " "]]
    ]};

  this.VKI_layout['\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac'] = {
    'name': "Greek", 'keys': [
      [["`", "~"], ["1", "!"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a3"], ["5", "%", "\u00a7"], ["6", "^", "\u00b6"], ["7", "&"], ["8", "*", "\u00a4"], ["9", "(", "\u00a6"], ["0", ")", "\u00ba"], ["-", "_", "\u00b1"], ["=", "+", "\u00bd"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], [";", ":"], ["\u03c2", "^"], ["\u03b5", "\u0395"], ["\u03c1", "\u03a1"], ["\u03c4", "\u03a4"], ["\u03c5", "\u03a5"], ["\u03b8", "\u0398"], ["\u03b9", "\u0399"], ["\u03bf", "\u039f"], ["\u03c0", "\u03a0"], ["[", "{", "\u201c"], ["]", "}", "\u201d"], ["\\", "|", "\u00ac"]],
      [["Caps", "Caps"], ["\u03b1", "\u0391"], ["\u03c3", "\u03a3"], ["\u03b4", "\u0394"], ["\u03c6", "\u03a6"], ["\u03b3", "\u0393"], ["\u03b7", "\u0397"], ["\u03be", "\u039e"], ["\u03ba", "\u039a"], ["\u03bb", "\u039b"], ["\u0384", "\u00a8", "\u0385"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">"], ["\u03b6", "\u0396"], ["\u03c7", "\u03a7"], ["\u03c8", "\u03a8"], ["\u03c9", "\u03a9"], ["\u03b2", "\u0392"], ["\u03bd", "\u039d"], ["\u03bc", "\u039c"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["el"] };

  this.VKI_layout['Eesti'] = {
    'name': "Estonian", 'keys': [
      [["\u02C7", "~"], ["1", "!"], ["2", '"', "@", "@"], ["3", "#", "\u00A3", "\u00A3"], ["4", "\u00A4", "$", "$"], ["5", "%", "\u20AC"], ["6", "&"], ["7", "/", "{", "{"], ["8", "(", "[", "["], ["9", ")", "]", "]"], ["0", "=", "}", "}"], ["+", "?", "\\", "\\"], ["\u00B4", "`"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00FC", "\u00DC"], ["\u00F5", "\u00D5", "\u00A7", "\u00A7"], ["'", "*", "\u00BD", "\u00BD"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S", "\u0161", "\u0160"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00F6", "\u00D6"], ["\u00E4", "\u00C4", "^", "^"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">", "|", "|"], ["z", "Z", "\u017E", "\u017D"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["et"] };

  this.VKI_layout['Espa\u00f1ol'] = {
    'name': "Spanish", 'keys': [
      [["\u00ba", "\u00aa", "\\"], ["1", "!", "|"], ["2", '"', "@"], ["3", "'", "#"], ["4", "$", "~"], ["5", "%", "\u20ac"], ["6", "&", "\u00ac"], ["7", "/"], ["8", "("], ["9", ")"], ["0", "="], ["'", "?"], ["\u00a1", "\u00bf"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["`", "^", "["], ["+", "*", "]"], ["\u00e7", "\u00c7", "}"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f1", "\u00d1"], ["\u00b4", "\u00a8", "{"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["es"] };

  this.VKI_layout['\u062f\u0631\u06cc'] = {
    'name': "Dari", 'keys': [
      [["\u200D", "\u00F7", "~"], ["\u06F1", "!", "`"], ["\u06F2", "\u066C", "@"], ["\u06F3", "\u066B", "#"], ["\u06F4", "\u060B", "$"], ["\u06F5", "\u066A", "%"], ["\u06F6", "\u00D7", "^"], ["\u06F7", "\u060C", "&"], ["\u06F8", "*", "\u2022"], ["\u06F9", ")", "\u200E"], ["\u06F0", "(", "\u200F"], ["-", "\u0640", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0636", "\u0652", "\u00B0"], ["\u0635", "\u064C"], ["\u062B", "\u064D", "\u20AC"], ["\u0642", "\u064B", "\uFD3E"], ["\u0641", "\u064F", "\uFD3F"], ["\u063A", "\u0650", "\u0656"], ["\u0639", "\u064E", "\u0659"], ["\u0647", "\u0651", "\u0655"], ["\u062E", "]", "'"], ["\u062D", "[", '"'], ["\u062C", "}", "\u0681"], ["\u0686", "{", "\u0685"], ["\\", "|", "?"]],
      [["Caps", "Caps"], ["\u0634", "\u0624", "\u069A"], ["\u0633", "\u0626", "\u06CD"], ["\u06CC", "\u064A", "\u0649"], ["\u0628", "\u0625", "\u06D0"], ["\u0644", "\u0623", "\u06B7"], ["\u0627", "\u0622", "\u0671"], ["\u062A", "\u0629", "\u067C"], ["\u0646", "\u00BB", "\u06BC"], ["\u0645", "\u00AB", "\u06BA"], ["\u06A9", ":", ";"], ["\u06AF", "\u061B", "\u06AB"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0638", "\u0643", "\u06D2"], ["\u0637", "\u0653", "\u0691"], ["\u0632", "\u0698", "\u0696"], ["\u0631", "\u0670", "\u0693"], ["\u0630", "\u200C", "\u0688"], ["\u062F", "\u0654", "\u0689"], ["\u067E", "\u0621", "\u0679"], ["\u0648", ">", ","], [".", "<", "\u06C7"], ["/", "\u061F", "\u06C9"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["fa-AF"] };

  this.VKI_layout['\u0641\u0627\u0631\u0633\u06cc'] = {
    'name': "Farsi", 'keys': [
      [["\u067e", "\u0651 "], ["1", "!", "\u00a1", "\u00b9"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a4", "\u00a3"], ["5", "%", "\u20ac"], ["6", "^", "\u00bc"], ["7", "&", "\u00bd"], ["8", "*", "\u00be"], ["9", "(", "\u2018"], ["0", ")", "\u2019"], ["-", "_", "\u00a5"], ["=", "+", "\u00d7", "\u00f7"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0636", "\u064e"], ["\u0635", "\u064b"], ["\u062b", "\u064f"], ["\u0642", "\u064c"], ["\u0641", "\u0644"], ["\u063a", "\u0625"], ["\u0639", "\u2018"], ["\u0647", "\u00f7"], ["\u062e", "\u00d7"], ["\u062d", "\u061b"], ["\u062c", "<"], ["\u0686", ">"], ["\u0698", "|"]],
      [["Caps", "Caps"], ["\u0634", "\u0650"], ["\u0633", "\u064d"], ["\u064a", "]"], ["\u0628", "["], ["\u0644", "\u0644"], ["\u0627", "\u0623"], ["\u062a", "\u0640"], ["\u0646", "\u060c"], ["\u0645", "\\"], ["\u06af", ":"], ["\u0643", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0638", "~"], ["\u0637", "\u0652"], ["\u0632", "}"], ["\u0631", "{"], ["\u0630", "\u0644"], ["\u062f", "\u0622"], ["\u0626", "\u0621"], ["\u0648", ","], [".", "."], ["/", "\u061f"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["Alt", "Alt"]]
    ], 'lang': ["fa"] };

  this.VKI_layout['F\u00f8royskt'] = {
    'name': "Faeroese", 'keys': [
      [["\u00BD", "\u00A7"], ["1", "!"], ["2", '"', "@"], ["3", "#", "\u00A3"], ["4", "\u00A4", "$"], ["5", "%", "\u20AC"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["+", "?"], ["\u00B4", "`", "|"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00E5", "\u00C5", "\u00A8"], ["\u00F0", "\u00D0", "~"], ["'", "*"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00E6", "\u00C6"], ["\u00F8", "\u00D8", "^"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">", "\\"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u00B5"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["fo"] };

  this.VKI_layout['Fran\u00e7ais'] = {
    'name': "French", 'keys': [
      [["\u00b2", "\u00b3"], ["&", "1"], ["\u00e9", "2", "~"], ['"', "3", "#"], ["'", "4", "{"], ["(", "5", "["], ["-", "6", "|"], ["\u00e8", "7", "`"], ["_", "8", "\\"], ["\u00e7", "9", "^"], ["\u00e0", "0", "@"], [")", "\u00b0", "]"], ["=", "+", "}"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["a", "A"], ["z", "Z"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["^", "\u00a8"], ["$", "\u00a3", "\u00a4"], ["*", "\u03bc"]],
      [["Caps", "Caps"], ["q", "Q"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["m", "M"], ["\u00f9", "%"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">"], ["w", "W"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], [",", "?"], [";", "."], [":", "/"], ["!", "\u00a7"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["fr"] };

  this.VKI_layout['Gaeilge'] = {
    'name': "Irish / Gaelic", 'keys': [
      [["`", "\u00AC", "\u00A6", "\u00A6"], ["1", "!"], ["2", '"'], ["3", "\u00A3"], ["4", "$", "\u20AC"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u00E9", "\u00C9"], ["r", "R"], ["t", "T"], ["y", "Y", "\u00FD", "\u00DD"], ["u", "U", "\u00FA", "\u00DA"], ["i", "I", "\u00ED", "\u00CD"], ["o", "O", "\u00F3", "\u00D3"], ["p", "P"], ["[", "{"], ["]", "}"], ["#", "~"]],
      [["Caps", "Caps"], ["a", "A", "\u00E1", "\u00C1"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", "@", "\u00B4", "`"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\\", "|"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["ga", "gd"] };

  this.VKI_layout['\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0'] = {
    'name': "Gujarati", 'keys': [
      [[""], ["1", "\u0A8D", "\u0AE7"], ["2", "\u0AC5", "\u0AE8"], ["3", "\u0ACD\u0AB0", "\u0AE9"], ["4", "\u0AB0\u0ACD", "\u0AEA"], ["5", "\u0A9C\u0ACD\u0A9E", "\u0AEB"], ["6", "\u0AA4\u0ACD\u0AB0", "\u0AEC"], ["7", "\u0A95\u0ACD\u0AB7", "\u0AED"], ["8", "\u0AB6\u0ACD\u0AB0", "\u0AEE"], ["9", "(", "\u0AEF"], ["0", ")", "\u0AE6"], ["-", "\u0A83"], ["\u0AC3", "\u0A8B", "\u0AC4", "\u0AE0"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0ACC", "\u0A94"], ["\u0AC8", "\u0A90"], ["\u0ABE", "\u0A86"], ["\u0AC0", "\u0A88"], ["\u0AC2", "\u0A8A"], ["\u0AAC", "\u0AAD"], ["\u0AB9", "\u0A99"], ["\u0A97", "\u0A98"], ["\u0AA6", "\u0AA7"], ["\u0A9C", "\u0A9D"], ["\u0AA1", "\u0AA2"], ["\u0ABC", "\u0A9E"], ["\u0AC9", "\u0A91"]],
      [["Caps", "Caps"], ["\u0ACB", "\u0A93"], ["\u0AC7", "\u0A8F"], ["\u0ACD", "\u0A85"], ["\u0ABF", "\u0A87"], ["\u0AC1", "\u0A89"], ["\u0AAA", "\u0AAB"], ["\u0AB0"], ["\u0A95", "\u0A96"], ["\u0AA4", "\u0AA5"], ["\u0A9A", "\u0A9B"], ["\u0A9F", "\u0AA0"], ["Enter", "Enter"]],
      [["Shift", "Shift"], [""], ["\u0A82", "\u0A81", "", "\u0AD0"], ["\u0AAE", "\u0AA3"], ["\u0AA8"], ["\u0AB5"], ["\u0AB2", "\u0AB3"], ["\u0AB8", "\u0AB6"], [",", "\u0AB7"], [".", "\u0964", "\u0965", "\u0ABD"], ["\u0AAF"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["gu"] };

  this.VKI_layout['\u05e2\u05d1\u05e8\u05d9\u05ea'] = {
    'name': "Hebrew", 'keys': [
      [["~", "`"], ["1", "!"], ["2", "@"], ["3", "#"], ["4" , "$", "\u20aa"], ["5" , "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", ")"], ["0", "("], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["/", "Q"], ["'", "W"], ["\u05e7", "E", "\u20ac"], ["\u05e8", "R"], ["\u05d0", "T"], ["\u05d8", "Y"], ["\u05d5", "U", "\u05f0"], ["\u05df", "I"], ["\u05dd", "O"], ["\u05e4", "P"], ["\\", "|"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["\u05e9", "A"], ["\u05d3", "S"], ["\u05d2", "D"], ["\u05db", "F"], ["\u05e2", "G"], ["\u05d9", "H", "\u05f2"], ["\u05d7", "J", "\u05f1"], ["\u05dc", "K"], ["\u05da", "L"], ["\u05e3", ":"], ["," , '"'], ["]", "}"], ["[", "{"]],
      [["Shift", "Shift"], ["\u05d6", "Z"], ["\u05e1", "X"], ["\u05d1", "C"], ["\u05d4", "V"], ["\u05e0", "B"], ["\u05de", "N"], ["\u05e6", "M"], ["\u05ea", ">"], ["\u05e5", "<"], [".", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["he"] };

  this.VKI_layout['\u0926\u0947\u0935\u0928\u093e\u0917\u0930\u0940'] = {
    'name': "Devanagari", 'keys': [
      [["\u094A", "\u0912"], ["1", "\u090D", "\u0967"], ["2", "\u0945", "\u0968"], ["3", "\u094D\u0930", "\u0969"], ["4", "\u0930\u094D", "\u096A"], ["5", "\u091C\u094D\u091E", "\u096B"], ["6", "\u0924\u094D\u0930", "\u096C"], ["7", "\u0915\u094D\u0937", "\u096D"], ["8", "\u0936\u094D\u0930", "\u096E"], ["9", "(", "\u096F"], ["0", ")", "\u0966"], ["-", "\u0903"], ["\u0943", "\u090B", "\u0944", "\u0960"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u094C", "\u0914"], ["\u0948", "\u0910"], ["\u093E", "\u0906"], ["\u0940", "\u0908", "\u0963", "\u0961"], ["\u0942", "\u090A"], ["\u092C", "\u092D"], ["\u0939", "\u0919"], ["\u0917", "\u0918", "\u095A"], ["\u0926", "\u0927"], ["\u091C", "\u091D", "\u095B"], ["\u0921", "\u0922", "\u095C", "\u095D"], ["\u093C", "\u091E"], ["\u0949", "\u0911"]],
      [["Caps", "Caps"], ["\u094B", "\u0913"], ["\u0947", "\u090F"], ["\u094D", "\u0905"], ["\u093F", "\u0907", "\u0962", "\u090C"], ["\u0941", "\u0909"], ["\u092A", "\u092B", "", "\u095E"], ["\u0930", "\u0931"], ["\u0915", "\u0916", "\u0958", "\u0959"], ["\u0924", "\u0925"], ["\u091A", "\u091B", "\u0952"], ["\u091F", "\u0920", "", "\u0951"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0946", "\u090E", "\u0953"], ["\u0902", "\u0901", "", "\u0950"], ["\u092E", "\u0923", "\u0954"], ["\u0928", "\u0929"], ["\u0935", "\u0934"], ["\u0932", "\u0933"], ["\u0938", "\u0936"], [",", "\u0937", "\u0970"], [".", "\u0964", "\u0965", "\u093D"], ["\u092F", "\u095F"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["hi-Deva"] };

  this.VKI_layout['\u0939\u093f\u0902\u0926\u0940'] = {
    'name': "Hindi", 'keys': [
      [["\u200d", "\u200c", "`", "~"], ["1", "\u090D", "\u0967", "!"], ["2", "\u0945", "\u0968", "@"], ["3", "\u094D\u0930", "\u0969", "#"], ["4", "\u0930\u094D", "\u096A", "$"], ["5", "\u091C\u094D\u091E", "\u096B", "%"], ["6", "\u0924\u094D\u0930", "\u096C", "^"], ["7", "\u0915\u094D\u0937", "\u096D", "&"], ["8", "\u0936\u094D\u0930", "\u096E", "*"], ["9", "(", "\u096F", "("], ["0", ")", "\u0966", ")"], ["-", "\u0903", "-", "_"], ["\u0943", "\u090B", "=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u094C", "\u0914"], ["\u0948", "\u0910"], ["\u093E", "\u0906"], ["\u0940", "\u0908"], ["\u0942", "\u090A"], ["\u092C", "\u092D"], ["\u0939", "\u0919"], ["\u0917", "\u0918"], ["\u0926", "\u0927"], ["\u091C", "\u091D"], ["\u0921", "\u0922", "[", "{"], ["\u093C", "\u091E", "]", "}"], ["\u0949", "\u0911", "\\", "|"]],
      [["Caps", "Caps"], ["\u094B", "\u0913"], ["\u0947", "\u090F"], ["\u094D", "\u0905"], ["\u093F", "\u0907"], ["\u0941", "\u0909"], ["\u092A", "\u092B"], ["\u0930", "\u0931"], ["\u0915", "\u0916"], ["\u0924", "\u0925"], ["\u091A", "\u091B", ";", ":"], ["\u091F", "\u0920", "'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], [""], ["\u0902", "\u0901", "", "\u0950"], ["\u092E", "\u0923"], ["\u0928"], ["\u0935"], ["\u0932", "\u0933"], ["\u0938", "\u0936"], [",", "\u0937", ",", "<"], [".", "\u0964", ".", ">"], ["\u092F", "\u095F", "/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["hi"] };

  this.VKI_layout['Hrvatski'] = {
    'name': "Croatian", 'keys': this.VKI_layout['Bosanski'].keys.slice(0), 'lang': ["hr"]
  };

  this.VKI_layout['\u0540\u0561\u0575\u0565\u0580\u0565\u0576 \u0561\u0580\u0565\u0582\u0574\u0578\u0582\u057f\u0584'] = {
    'name': "Western Armenian", 'keys': [
      [["\u055D", "\u055C"], [":", "1"], ["\u0571", "\u0541"], ["\u0575", "\u0545"], ["\u055B", "3"], [",", "4"], ["-", "9"], [".", "\u0587"], ["\u00AB", "("], ["\u00BB", ")"], ["\u0585", "\u0555"], ["\u057C", "\u054C"], ["\u056A", "\u053A"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u056D", "\u053D"], ["\u057E", "\u054E"], ["\u0567", "\u0537"], ["\u0580", "\u0550"], ["\u0564", "\u0534"], ["\u0565", "\u0535"], ["\u0568", "\u0538"], ["\u056B", "\u053B"], ["\u0578", "\u0548"], ["\u0562", "\u0532"], ["\u0579", "\u0549"], ["\u057B", "\u054B"], ["'", "\u055E"]],
      [["Caps", "Caps"], ["\u0561", "\u0531"], ["\u057D", "\u054D"], ["\u057F", "\u054F"], ["\u0586", "\u0556"], ["\u056F", "\u053F"], ["\u0570", "\u0540"], ["\u0573", "\u0543"], ["\u0584", "\u0554"], ["\u056C", "\u053C"], ["\u0569", "\u0539"], ["\u0583", "\u0553"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0566", "\u0536"], ["\u0581", "\u0551"], ["\u0563", "\u0533"], ["\u0582", "\u0552"], ["\u057A", "\u054A"], ["\u0576", "\u0546"], ["\u0574", "\u0544"], ["\u0577", "\u0547"], ["\u0572", "\u0542"], ["\u056E", "\u053E"], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["hy-arevmda"] };

  this.VKI_layout['\u0540\u0561\u0575\u0565\u0580\u0565\u0576 \u0561\u0580\u0565\u0582\u0565\u056c\u0584'] = {
    'name': "Eastern Armenian", 'keys': [
      [["\u055D", "\u055C"], [":", "1"], ["\u0571", "\u0541"], ["\u0575", "\u0545"], ["\u055B", "3"], [",", "4"], ["-", "9"], [".", "\u0587"], ["\u00AB", "("], ["\u00BB", ")"], ["\u0585", "\u0555"], ["\u057C", "\u054C"], ["\u056A", "\u053A"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u056D", "\u053D"], ["\u0582", "\u0552"], ["\u0567", "\u0537"], ["\u0580", "\u0550"], ["\u057F", "\u054F"], ["\u0565", "\u0535"], ["\u0568", "\u0538"], ["\u056B", "\u053B"], ["\u0578", "\u0548"], ["\u057A", "\u054A"], ["\u0579", "\u0549"], ["\u057B", "\u054B"], ["'", "\u055E"]],
      [["Caps", "Caps"], ["\u0561", "\u0531"], ["\u057D", "\u054D"], ["\u0564", "\u0534"], ["\u0586", "\u0556"], ["\u0584", "\u0554"], ["\u0570", "\u0540"], ["\u0573", "\u0543"], ["\u056F", "\u053F"], ["\u056C", "\u053C"], ["\u0569", "\u0539"], ["\u0583", "\u0553"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0566", "\u0536"], ["\u0581", "\u0551"], ["\u0563", "\u0533"], ["\u057E", "\u054E"], ["\u0562", "\u0532"], ["\u0576", "\u0546"], ["\u0574", "\u0544"], ["\u0577", "\u0547"], ["\u0572", "\u0542"], ["\u056E", "\u053E"], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["hy"] };

  this.VKI_layout['\u00cdslenska'] = {
    'name': "Icelandic", 'keys': [
      [["\u00B0", "\u00A8", "\u00B0"], ["1", "!"], ["2", '"'], ["3", "#"], ["4", "$"], ["5", "%", "\u20AC"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["\u00F6", "\u00D6", "\\"], ["-", "_"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "@"], ["w", "W"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00F0", "\u00D0"], ["'", "?", "~"], ["+", "*", "`"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00E6", "\u00C6"], ["\u00B4", "'", "^"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">", "|"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u00B5"], [",", ";"], [".", ":"], ["\u00FE", "\u00DE"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["is"] };

  this.VKI_layout['Italiano'] = {
    'name': "Italian", 'keys': [
      [["\\", "|"], ["1", "!"], ["2", '"'], ["3", "\u00a3"], ["4", "$", "\u20ac"], ["5", "%"], ["6", "&"], ["7", "/"], ["8", "("], ["9", ")"], ["0", "="], ["'", "?"], ["\u00ec", "^"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00e8", "\u00e9", "[", "{"], ["+", "*", "]", "}"], ["\u00f9", "\u00a7"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f2", "\u00e7", "@"], ["\u00e0", "\u00b0", "#"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["it"] };

  this.VKI_layout['\u65e5\u672c\u8a9e'] = {
    'name': "Japanese Hiragana/Katakana", 'keys': [
      [["\uff5e"], ["\u306c", "\u30cc"], ["\u3075", '\u30d5'], ["\u3042", "\u30a2", "\u3041", "\u30a1"], ["\u3046", "\u30a6", "\u3045", "\u30a5"], ["\u3048", "\u30a8", "\u3047", "\u30a7"], ["\u304a", "\u30aa", "\u3049", "\u30a9"], ["\u3084", "\u30e4", "\u3083", "\u30e3"], ["\u3086", "\u30e6", "\u3085", "\u30e5"], ["\u3088", "\u30e8", "\u3087", "\u30e7"], ["\u308f", "\u30ef", "\u3092", "\u30f2"], ["\u307b", "\u30db", "\u30fc", "\uff1d"], ["\u3078", "\u30d8" , "\uff3e", "\uff5e"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u305f", "\u30bf"], ["\u3066", "\u30c6"], ["\u3044", "\u30a4", "\u3043", "\u30a3"], ["\u3059", "\u30b9"], ["\u304b", "\u30ab"], ["\u3093", "\u30f3"], ["\u306a", "\u30ca"], ["\u306b", "\u30cb"], ["\u3089", "\u30e9"], ["\u305b", "\u30bb"], ["\u3001", "\u3001", "\uff20", "\u2018"], ["\u3002", "\u3002", "\u300c", "\uff5b"], ["\uffe5", "", "", "\uff0a"], ['\u309B', '"', "\uffe5", "\uff5c"]],
      [["Caps", "Caps"], ["\u3061", "\u30c1"], ["\u3068", "\u30c8"], ["\u3057", "\u30b7"], ["\u306f", "\u30cf"], ["\u304d", "\u30ad"], ["\u304f", "\u30af"], ["\u307e", "\u30de"], ["\u306e", "\u30ce"], ["\u308c", "\u30ec", "\uff1b", "\uff0b"], ["\u3051", "\u30b1", "\uff1a", "\u30f6"], ["\u3080", "\u30e0", "\u300d", "\uff5d"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u3064", "\u30c4"], ["\u3055", "\u30b5"], ["\u305d", "\u30bd"], ["\u3072", "\u30d2"], ["\u3053", "\u30b3"], ["\u307f", "\u30df"], ["\u3082", "\u30e2"], ["\u306d", "\u30cd", "\u3001", "\uff1c"], ["\u308b", "\u30eb", "\u3002", "\uff1e"], ["\u3081", "\u30e1", "\u30fb", "\uff1f"], ["\u308d", "\u30ed", "", "\uff3f"], ["Shift", "Shift"]],
      [["AltLk", "AltLk"], [" ", " ", " ", " "], ["Alt", "Alt"]]
    ], 'lang': ["ja"] };

  this.VKI_layout['\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8'] = {
    'name': "Georgian", 'keys': [
      [["\u201E", "\u201C"], ["!", "1"], ["?", "2"], ["\u2116", "3"], ["\u00A7", "4"], ["%", "5"], [":", "6"], [".", "7"], [";", "8"], [",", "9"], ["/", "0"], ["\u2013", "-"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u10E6", "\u10E6"], ["\u10EF", "\u10EF"], ["\u10E3", "\u10E3"], ["\u10D9", "\u10D9"], ["\u10D4", "\u10D4", "\u10F1"], ["\u10DC", "\u10DC"], ["\u10D2", "\u10D2"], ["\u10E8", "\u10E8"], ["\u10EC", "\u10EC"], ["\u10D6", "\u10D6"], ["\u10EE", "\u10EE", "\u10F4"], ["\u10EA", "\u10EA"], ["(", ")"]],
      [["Caps", "Caps"], ["\u10E4", "\u10E4", "\u10F6"], ["\u10EB", "\u10EB"], ["\u10D5", "\u10D5", "\u10F3"], ["\u10D7", "\u10D7"], ["\u10D0", "\u10D0"], ["\u10DE", "\u10DE"], ["\u10E0", "\u10E0"], ["\u10DD", "\u10DD"], ["\u10DA", "\u10DA"], ["\u10D3", "\u10D3"], ["\u10DF", "\u10DF"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u10ED", "\u10ED"], ["\u10E9", "\u10E9"], ["\u10E7", "\u10E7"], ["\u10E1", "\u10E1"], ["\u10DB", "\u10DB"], ["\u10D8", "\u10D8", "\u10F2"], ["\u10E2", "\u10E2"], ["\u10E5", "\u10E5"], ["\u10D1", "\u10D1"], ["\u10F0", "\u10F0", "\u10F5"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["ka"] };

  this.VKI_layout['\u049a\u0430\u0437\u0430\u049b\u0448\u0430'] = {
    'name': "Kazakh", 'keys': [
      [["(", ")"], ['"', "!"], ["\u04d9", "\u04d8"], ["\u0456", "\u0406"], ["\u04a3", "\u04a2"], ["\u0493", "\u0492"], [",", ";"], [".", ":"], ["\u04af", "\u04ae"], ["\u04b1", "\u04b0"], ["\u049b", "\u049a"], ["\u04e9", "\u04e8"], ["\u04bb", "\u04ba"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0439", "\u0419"], ["\u0446", "\u0426"], ["\u0443", "\u0423"], ["\u043A", "\u041A"], ["\u0435", "\u0415"], ["\u043D", "\u041D"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u0449", "\u0429"], ["\u0437", "\u0417"], ["\u0445", "\u0425"], ["\u044A", "\u042A"], ["\\", "/"]],
      [["Caps", "Caps"], ["\u0444", "\u0424"], ["\u044B", "\u042B"], ["\u0432", "\u0412"], ["\u0430", "\u0410"], ["\u043F", "\u041F"], ["\u0440", "\u0420"], ["\u043E", "\u041E"], ["\u043B", "\u041B"], ["\u0434", "\u0414"], ["\u0436", "\u0416"], ["\u044D", "\u042D"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\\", "|"], ["\u044F", "\u042F"], ["\u0447", "\u0427"], ["\u0441", "\u0421"], ["\u043C", "\u041C"], ["\u0438", "\u0418"], ["\u0442", "\u0422"], ["\u044C", "\u042C"], ["\u0431", "\u0411"], ["\u044E", "\u042E"], ["\u2116", "?"], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["kk"] };

  this.VKI_layout['\u1797\u17b6\u179f\u17b6\u1781\u17d2\u1798\u17c2\u179a'] = {
    'name': "Khmer", 'keys': [
      [["\u00AB", "\u00BB","\u200D"], ["\u17E1", "!","\u200C","\u17F1"], ["\u17E2", "\u17D7", "@", "\u17F2"], ["\u17E3", '"', "\u17D1", "\u17F3"], ["\u17E4", "\u17DB", "$", "\u17F4"], ["\u17E5", "%" ,"\u20AC", "\u17F5"], ["\u17E6", "\u17CD", "\u17D9", "\u17F6"], ["\u17E7", "\u17D0", "\u17DA", "\u17F7"], ["\u17E8", "\u17CF", "*", "\u17F8"], ["\u17E9", "(", "{", "\u17F9"], ["\u17E0", ")", "}", "\u17F0"], ["\u17A5", "\u17CC", "x"], ["\u17B2", "=", "\u17CE"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u1786", "\u1788", "\u17DC", "\u19E0"], ["\u17B9", "\u17BA", "\u17DD", "\u19E1"], ["\u17C1", "\u17C2", "\u17AF", "\u19E2"], ["\u179A", "\u17AC", "\u17AB", "\u19E3"], ["\u178F", "\u1791", "\u17A8", "\u19E4"], ["\u1799", "\u17BD", "\u1799\u17BE\u1784", "\u19E5"], ["\u17BB", "\u17BC", "", "\u19E6"], ["\u17B7", "\u17B8", "\u17A6", "\u19E7"], ["\u17C4", "\u17C5", "\u17B1", "\u19E8"], ["\u1795", "\u1797", "\u17B0", "\u19E9"], ["\u17C0", "\u17BF", "\u17A9", "\u19EA"], ["\u17AA", "\u17A7", "\u17B3", "\u19EB"], ["\u17AE", "\u17AD", "\\"]],
      [["Caps", "Caps"], ["\u17B6", "\u17B6\u17C6", "\u17B5", "\u19EC"], ["\u179F", "\u17C3", "", "\u19ED"], ["\u178A", "\u178C", "\u17D3", "\u19EE"], ["\u1790", "\u1792", "", "\u19EF"], ["\u1784", "\u17A2", "\u17A4", "\u19F0"], ["\u17A0", "\u17C7", "\u17A3", "\u19F1"], ["\u17D2", "\u1789", "\u17B4", "\u19F2"], ["\u1780", "\u1782", "\u179D", "\u19F3"], ["\u179B", "\u17A1", "\u17D8", "\u19F4"], ["\u17BE", "\u17C4\u17C7", "\u17D6", "\u19F5"], ["\u17CB", "\u17C9", "\u17C8", "\u19F6"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u178B", "\u178D", "|", "\u19F7"], ["\u1781", "\u1783", "\u1781\u17D2\u1789\u17BB\u17C6", "\u19F8"], ["\u1785", "\u1787", "-", "\u19F9"], ["\u179C", "\u17C1\u17C7", "+", "\u19FA"], ["\u1794", "\u1796", "\u179E", "\u19FB"], ["\u1793", "\u178E", "[", "\u19FC"], ["\u1798", "\u17C6", "]", "\u19FD"], ["\u17BB\u17C6", "\u17BB\u17C7", ",", "\u19FE"], ["\u17D4", "\u17D5", ".", "\u19FF"], ["\u17CA", "?", "/"], ["Shift", "Shift"]],
      [["\u200B", " ", "\u00A0", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["km"] };

  this.VKI_layout['\u0c95\u0ca8\u0ccd\u0ca8\u0ca1'] = {
    'name': "Kannada", 'keys': [
      [["\u0CCA", "\u0C92"], ["1", "", "\u0CE7"], ["2", "", "\u0CE8"], ["3", "\u0CCD\u0CB0", "\u0CE9"], ["4", "\u0CB0\u0CCD", "\u0CEA"], ["5", "\u0C9C\u0CCD\u0C9E", "\u0CEB"], ["6", "\u0CA4\u0CCD\u0CB0", "\u0CEC"], ["7", "\u0C95\u0CCD\u0CB7", "\u0CED"], ["8", "\u0CB6\u0CCD\u0CB0", "\u0CEE"], ["9", "(", "\u0CEF"], ["0", ")", "\u0CE6"], ["-", "\u0C83"], ["\u0CC3", "\u0C8B", "\u0CC4", "\u0CE0"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0CCC", "\u0C94"], ["\u0CC8", "\u0C90", "\u0CD6"], ["\u0CBE", "\u0C86"], ["\u0CC0", "\u0C88", "", "\u0CE1"], ["\u0CC2", "\u0C8A"], ["\u0CAC", "\u0CAD"], ["\u0CB9", "\u0C99"], ["\u0C97", "\u0C98"], ["\u0CA6", "\u0CA7"], ["\u0C9C", "\u0C9D"], ["\u0CA1", "\u0CA2"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["\u0CCB", "\u0C93"], ["\u0CC7", "\u0C8F", "\u0CD5"], ["\u0CCD", "\u0C85"], ["\u0CBF", "\u0C87", "", "\u0C8C"], ["\u0CC1", "\u0C89"], ["\u0CAA", "\u0CAB", "", "\u0CDE"], ["\u0CB0", "\u0CB1"], ["\u0C95", "\u0C96"], ["\u0CA4", "\u0CA5"], ["\u0C9A", "\u0C9B"], ["\u0C9F", "\u0CA0"], ["", "\u0C9E"]],
      [["Shift", "Shift"], ["\u0CC6", "\u0C8F"], ["\u0C82"], ["\u0CAE", "\u0CA3"], ["\u0CA8"], ["\u0CB5"], ["\u0CB2", "\u0CB3"], ["\u0CB8", "\u0CB6"], [",", "\u0CB7"], [".", "|"], ["\u0CAF"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["kn"] };

  this.VKI_layout['\ud55c\uad6d\uc5b4'] = {
    'name': "Korean", 'keys': [
      [["`", "~", "`", "~"], ["1", "!", "1", "!"], ["2", "@", "2", "@"], ["3", "#", "3", "#"], ["4", "$", "4", "$"], ["5", "%", "5", "%"], ["6", "^", "6", "^"], ["7", "&", "7", "&"], ["8", "*", "8", "*"], ["9", ")", "9", ")"], ["0", "(", "0", "("], ["-", "_", "-", "_"], ["=", "+", "=", "+"], ["\u20A9", "|", "\u20A9", "|"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u1107", "\u1108", "q", "Q"], ["\u110C", "\u110D", "w", "W"], ["\u1103", "\u1104", "e", "E"], ["\u1100", "\u1101", "r", "R"], ["\u1109", "\u110A", "t", "T"], ["\u116D", "", "y", "Y"], ["\u1167", "", "u", "U"], ["\u1163", "", "i", "I"], ["\u1162", "\u1164", "o", "O"], ["\u1166", "\u1168", "p", "P"], ["[", "{", "[", "{"], ["]", "}", "]", "}"]],
      [["Caps", "Caps"], ["\u1106", "", "a", "A"], ["\u1102", "", "s", "S"], ["\u110B", "", "d", "D"], ["\u1105", "", "f", "F"], ["\u1112", "", "g", "G"], ["\u1169", "", "h", "H"], ["\u1165", "", "j", "J"], ["\u1161", "", "k", "K"], ["\u1175", "", "l", "L"], [";", ":", ";", ":"], ["'", '"', "'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u110F", "", "z", "Z"], ["\u1110", "", "x", "X"], ["\u110E", "", "c", "C"], ["\u1111", "", "v", "V"], ["\u1172", "", "b", "B"], ["\u116E", "", "n", "N"], ["\u1173", "", "m", "M"], [",", "<", ",", "<"], [".", ">", ".", ">"], ["/", "?", "/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["Kor", "Alt"]]
    ], 'lang': ["ko"] };

  this.VKI_layout['Kurd\u00ee'] = {
    'name': "Kurdish", 'keys': [
      [["\u20ac", "~"], ["\u0661", "!"], ["\u0662", "@"], ["\u0663", "#"], ["\u0664", "$"], ["\u0665", "%"], ["\u0666", "^"], ["\u0667", "&"], ["\u0668", "*"], ["\u0669", "("], ["\u0660", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0642", "`"], ["\u0648", "\u0648\u0648"], ["\u06d5", "\u064a"], ["\u0631", "\u0695"], ["\u062a", "\u0637"], ["\u06cc", "\u06ce"], ["\u0626", "\u0621"], ["\u062d", "\u0639"], ["\u06c6", "\u0624"], ["\u067e", "\u062b"], ["[", "{"], ["]", "}"], ["\\", "|"]],
      [["Caps", "Caps"], ["\u0627", "\u0622"], ["\u0633", "\u0634"], ["\u062f", "\u0630"], ["\u0641", "\u0625"], ["\u06af", "\u063a"], ["\u0647", "\u200c"], ["\u0698", "\u0623"], ["\u06a9", "\u0643"], ["\u0644", "\u06b5"], ["\u061b", ":"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0632", "\u0636"], ["\u062e", "\u0635"], ["\u062c", "\u0686"], ["\u06a4", "\u0638"], ["\u0628", "\u0649"], ["\u0646", "\u0629"], ["\u0645", "\u0640"], ["\u060c", "<"], [".", ">"], ["/", "\u061f"], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["ku"] };

  this.VKI_layout['\u041a\u044b\u0440\u0433\u044b\u0437\u0447\u0430'] = {
    'name': "Kyrgyz", 'keys': [
      [["\u0451", "\u0401"], ["1", "!"], ["2", '"'], ["3", "\u2116"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0439", "\u0419"], ["\u0446", "\u0426"], ["\u0443", "\u0423", "\u04AF", "\u04AE"], ["\u043A", "\u041A"], ["\u0435", "\u0415"], ["\u043D", "\u041D", "\u04A3", "\u04A2"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u0449", "\u0429"], ["\u0437", "\u0417"], ["\u0445", "\u0425"], ["\u044A", "\u042A"], ["\\", "/"]],
      [["Caps", "Caps"], ["\u0444", "\u0424"], ["\u044B", "\u042B"], ["\u0432", "\u0412"], ["\u0430", "\u0410"], ["\u043F", "\u041F"], ["\u0440", "\u0420"], ["\u043E", "\u041E", "\u04E9", "\u04E8"], ["\u043B", "\u041B"], ["\u0434", "\u0414"], ["\u0436", "\u0416"], ["\u044D", "\u042D"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u044F", "\u042F"], ["\u0447", "\u0427"], ["\u0441", "\u0421"], ["\u043C", "\u041C"], ["\u0438", "\u0418"], ["\u0442", "\u0422"], ["\u044C", "\u042C"], ["\u0431", "\u0411"], ["\u044E", "\u042E"], [".", ","], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["ky"] };

  this.VKI_layout['Latvie\u0161u'] = {
    'name': "Latvian", 'keys': [
      [["\u00AD", "?"], ["1", "!", "\u00AB"], ["2", "\u00AB", "", "@"], ["3", "\u00BB", "", "#"], ["4", "$", "\u20AC", "$"], ["5", "%", '"', "~"], ["6", "/", "\u2019", "^"], ["7", "&", "", "\u00B1"], ["8", "\u00D7", ":"], ["9", "("], ["0", ")"], ["-", "_", "\u2013", "\u2014"], ["f", "F", "=", ";"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u016B", "\u016A", "q", "Q"], ["g", "G", "\u0123", "\u0122"], ["j", "J"], ["r", "R", "\u0157", "\u0156"], ["m", "M", "w", "W"], ["v", "V", "y", "Y"], ["n", "N"], ["z", "Z"], ["\u0113", "\u0112"], ["\u010D", "\u010C"], ["\u017E", "\u017D", "[", "{"], ["h", "H", "]", "}"], ["\u0137", "\u0136"]],
      [["Caps", "Caps"], ["\u0161", "\u0160"], ["u", "U"], ["s", "S"], ["i", "I"], ["l", "L"], ["d", "D"], ["a", "A"], ["t", "T"], ["e", "E", "\u20AC"], ["c", "C"], ["\u00B4", "\u00B0", "\u00B4", "\u00A8"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0146", "\u0145"], ["b", "B", "x", "X"], ["\u012B", "\u012A"], ["k", "K", "\u0137", "\u0136"], ["p", "P"], ["o", "O", "\u00F5", "\u00D5"], ["\u0101", "\u0100"], [",", ";", "<"], [".", ":", ">"], ["\u013C", "\u013B"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["lv"] };

  this.VKI_layout['Lietuvi\u0173'] = {
    'name': "Lithuanian", 'keys': [
      [["`", "~"], ["\u0105", "\u0104"], ["\u010D", "\u010C"], ["\u0119", "\u0118"], ["\u0117", "\u0116"], ["\u012F", "\u012E"], ["\u0161", "\u0160"], ["\u0173", "\u0172"], ["\u016B", "\u016A"], ["\u201E", "("], ["\u201C", ")"], ["-", "_"], ["\u017E", "\u017D"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["[", "{"], ["]", "}"], ["\\", "|"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u2013", "\u20AC"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["lt"] };

  this.VKI_layout['Magyar'] = {
    'name': "Hungarian", 'keys': [
      [["0", "\u00a7"], ["1", "'", "~"], ["2", '"', "\u02c7"], ["3", "+", "\u02c6"], ["4", "!", "\u02d8"], ["5", "%", "\u00b0"], ["6", "/", "\u02db"], ["7", "=", "`"], ["8", "(", "\u02d9"], ["9", ")", "\u00b4"], ["\u00f6", "\u00d6", "\u02dd"], ["\u00fc", "\u00dc", "\u00a8"], ["\u00f3", "\u00d3", "\u00b8"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\\"], ["w", "W", "|"], ["e", "E", "\u00c4"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U", "\u20ac"], ["i", "I", "\u00cd"], ["o", "O"], ["p", "P"], ["\u0151", "\u0150", "\u00f7"], ["\u00fa", "\u00da", "\u00d7"], ["\u0171", "\u0170", "\u00a4"]],
      [["Caps", "Caps"], ["a", "A", "\u00e4"], ["s", "S", "\u0111"], ["d", "D", "\u0110"], ["f", "F", "["], ["g", "G", "]"], ["h", "H"], ["j", "J", "\u00ed"], ["k", "K", "\u0141"], ["l", "L", "\u0142"], ["\u00e9", "\u00c9", "$"], ["\u00e1", "\u00c1", "\u00df"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u00ed", "\u00cd", "<"], ["y", "Y", ">"], ["x", "X", "#"], ["c", "C", "&"], ["v", "V", "@"], ["b", "B", "{"], ["n", "N", "}"], ["m", "M", "<"], [",", "?", ";"], [".", ":", ">"], ["-", "_", "*"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["hu"] };

  this.VKI_layout['Malti'] = {
    'name': "Maltese 48", 'keys': [
      [["\u010B", "\u010A", "`"], ["1", "!"], ["2", '"'], ["3", "\u20ac", "\u00A3"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u00E8", "\u00C8"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U", "\u00F9", "\u00D9"], ["i", "I", "\u00EC", "\u00cc"], ["o", "O", "\u00F2", "\u00D2"], ["p", "P"], ["\u0121", "\u0120", "[", "{"], ["\u0127", "\u0126", "]", "}"], ["#", "\u017e"]],
      [["Caps", "Caps"], ["a", "A", "\u00E0", "\u00C0"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", "@"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u017c", "\u017b", "\\", "|"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?", "", "`"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["mt"] };

  this.VKI_layout['\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438'] = {
    'name': "Macedonian Cyrillic", 'keys': [
      [["`", "~"], ["1", "!"], ["2", "\u201E"], ["3", "\u201C"], ["4", "\u2019"], ["5", "%"], ["6", "\u2018"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0459", "\u0409"], ["\u045A", "\u040A"], ["\u0435", "\u0415", "\u20AC"], ["\u0440", "\u0420"], ["\u0442", "\u0422"], ["\u0455", "\u0405"], ["\u0443", "\u0423"], ["\u0438", "\u0418"], ["\u043E", "\u041E"], ["\u043F", "\u041F"], ["\u0448", "\u0428", "\u0402"], ["\u0453", "\u0403", "\u0452"], ["\u0436", "\u0416"]],
      [["Caps", "Caps"], ["\u0430", "\u0410"], ["\u0441", "\u0421"], ["\u0434", "\u0414"], ["\u0444", "\u0424", "["], ["\u0433", "\u0413", "]"], ["\u0445", "\u0425"], ["\u0458", "\u0408"], ["\u043A", "\u041A"], ["\u043B", "\u041B"], ["\u0447", "\u0427", "\u040B"], ["\u045C", "\u040C", "\u045B"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0451", "\u0401"], ["\u0437", "\u0417"], ["\u045F", "\u040F"], ["\u0446", "\u0426"], ["\u0432", "\u0412", "@"], ["\u0431", "\u0411", "{"], ["\u043D", "\u041D", "}"], ["\u043C", "\u041C", "\u00A7"], [",", ";"], [".", ":"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["mk"] };

  this.VKI_layout['\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02'] = {
    'name': "Malayalam", 'keys': [
      [["\u0D4A", "\u0D12"], ["1", "", "\u0D67"], ["2", "", "\u0D68"], ["3", "\u0D4D\u0D30", "\u0D69"], ["4", "", "\u0D6A"], ["5", "", "\u0D6B"], ["6", "", "\u0D6C"], ["7", "\u0D15\u0D4D\u0D37", "\u0D6D"], ["8", "", "\u0D6E"], ["9", "(", "\u0D6F"], ["0", ")", "\u0D66"], ["-", "\u0D03"], ["\u0D43", "\u0D0B", "", "\u0D60"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0D4C", "\u0D14", "\u0D57"], ["\u0D48", "\u0D10"], ["\u0D3E", "\u0D06"], ["\u0D40", "\u0D08", "", "\u0D61"], ["\u0D42", "\u0D0A"], ["\u0D2C", "\u0D2D"], ["\u0D39", "\u0D19"], ["\u0D17", "\u0D18"], ["\u0D26", "\u0D27"], ["\u0D1C", "\u0D1D"], ["\u0D21", "\u0D22"], ["", "\u0D1E"]],
      [["Caps", "Caps"], ["\u0D4B", "\u0D13"], ["\u0D47", "\u0D0F"], ["\u0D4D", "\u0D05", "", "\u0D0C"], ["\u0D3F", "\u0D07"], ["\u0D41", "\u0D09"], ["\u0D2A", "\u0D2B"], ["\u0D30", "\u0D31"], ["\u0D15", "\u0D16"], ["\u0D24", "\u0D25"], ["\u0D1A", "\u0D1B"], ["\u0D1F", "\u0D20"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0D46", "\u0D0F"], ["\u0D02"], ["\u0D2E", "\u0D23"], ["\u0D28"], ["\u0D35", "\u0D34"], ["\u0D32", "\u0D33"], ["\u0D38", "\u0D36"], [",", "\u0D37"], ["."], ["\u0D2F"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["ml"] };

  this.VKI_layout['Misc. Symbols'] = {
    'name': "Misc. Symbols", 'keys': [
      [["\u2605", "\u2606", "\u260e", "\u260f"], ["\u2648", "\u2673", "\u2659", "\u2630"], ["\u2649", "\u2674", "\u2658", "\u2631"], ["\u264a", "\u2675", "\u2657", "\u2632"], ["\u264b", "\u2676", "\u2656", "\u2633"], ["\u264c", "\u2677", "\u2655", "\u2634"], ["\u264d", "\u2678", "\u2654", "\u2635"], ["\u264e", "\u2679", "\u265f", "\u2636"], ["\u264f", "\u267a", "\u265e", "\u2637"], ["\u2650", "\u267b", "\u265d", "\u2686"], ["\u2651", "\u267c", "\u265c", "\u2687"], ["\u2652", "\u267d", "\u265b", "\u2688"], ["\u2653", "\u2672", "\u265a", "\u2689"], ["Bksp", "Bksp"]],
      [["\u263f", "\u2680", "\u268a", "\u26a2"], ["\u2640", "\u2681", "\u268b", "\u26a3"], ["\u2641", "\u2682", "\u268c", "\u26a4"], ["\u2642", "\u2683", "\u268d", "\u26a5"], ["\u2643", "\u2684", "\u268e", "\u26a6"], ["\u2644", "\u2685", "\u268f", "\u26a7"], ["\u2645", "\u2620", "\u26ff", "\u26a8"], ["\u2646", "\u2622", "\u2692", "\u26a9"], ["\u2647", "\u2623", "\u2693", "\u26b2"], ["\u2669", "\u266d", "\u2694", "\u26ac"], ["\u266a", "\u266e", "\u2695", "\u26ad"], ["\u266b", "\u266f", "\u2696", "\u26ae"], ["\u266c", "\u2607", "\u2697", "\u26af"], ["\u26f9", "\u2608", "\u2698", "\u26b0"], ["\u267f", "\u262e", "\u2638", "\u2609"]],
      [["Tab", "Tab"], ["\u261e", "\u261c", "\u261d", "\u261f"], ["\u261b", "\u261a", "\u2618", "\u2619"], ["\u2602", "\u2614", "\u26f1", "\u26d9"], ["\u2615", "\u2668", "\u26fe", "\u26d8"], ["\u263a", "\u2639", "\u263b", "\u26dc"], ["\u2617", "\u2616", "\u26ca", "\u26c9"], ["\u2660", "\u2663", "\u2665", "\u2666"], ["\u2664", "\u2667", "\u2661", "\u2662"], ["\u26c2", "\u26c0", "\u26c3", "\u26c1"], ["\u2624", "\u2625", "\u269a", "\u26b1"], ["\u2610", "\u2611", "\u2612", "\u2613"], ["\u2628", "\u2626", "\u2627", "\u2629"], ["\u262a", "\u262b", "\u262c", "\u262d"], ["\u26fa", "\u26fb", "\u26fc", "\u26fd"]],
      [["Caps", "Caps"], ["\u262f", "\u2670", "\u2671", "\u267e"], ["\u263c", "\u2699", "\u263d", "\u263e"], ["\u26c4", "\u2603", "\u26c7", "\u26c6"], ["\u26a0", "\u26a1", "\u2621", "\u26d4"], ["\u26e4", "\u26e5", "\u26e6", "\u26e7"], ["\u260a", "\u260b", "\u260c", "\u260d"], ["\u269c", "\u269b", "\u269d", "\u2604"], ["\u26b3", "\u26b4", "\u26b5", "\u26b6"], ["\u26b7", "\u26bf", "\u26b8", "\u26f8"], ["\u26b9", "\u26ba", "\u26bb", "\u26bc"], ["\u26bd", "\u26be", "\u269f", "\u269e"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u2600", "\u2601", "\u26c5", "\u26c8"], ["\u2691", "\u2690", "\u26ab", "\u26aa"], ["\u26cb", "\u26cc", "\u26cd", "\u26ce"], ["\u26cf", "\u26d0", "\u26d1", "\u26d2"], ["\u26d3", "\u26d5", "\u26d6", "\u26d7"], ["\u26da", "\u26db", "\u26dd", "\u26de"], ["\u26df", "\u26e0", "\u26e1", "\u26e2"], ["\u26e3", "\u26e8", "\u26e9", "\u26ea"], ["\u26eb", "\u26ec", "\u26ed", "\u26ee"], ["\u26ef", "\u26f0", "\u26f2", "\u26f3"], ["\u26f4", "\u26f5", "\u26f6", "\u26f7"], ["Shift", "Shift"]],
      [["AltLk", "AltLk"], [" ", " ", " ", " "], ["Alt", "Alt"]]
    ]};

  this.VKI_layout['\u041c\u043e\u043d\u0433\u043e\u043b'] = {
    'name': "Mongolian Cyrillic", 'keys': [
      [["=", "+"], ["\u2116", "1"], ["-", "2"], ['"', "3"], ["\u20AE", "4"], [":", "5"], [".", "6"], ["_", "7"], [",", "8"], ["%", "9"], ["?", "0"], ["\u0435", "\u0415"], ["\u0449", "\u0429"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0444", "\u0424"], ["\u0446", "\u0426"], ["\u0443", "\u0423"], ["\u0436", "\u0416"], ["\u044d", "\u042d"], ["\u043D", "\u041D"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u04af", "\u04AE"], ["\u0437", "\u0417"], ["\u043A", "\u041a"], ["\u044A", "\u042A"], ["\\", "|"]],
      [["Caps", "Caps"], ["\u0439", "\u0419"], ["\u044B", "\u042B"], ["\u0431", "\u0411"], ["\u04e9", "\u04e8"], ["\u0430", "\u0410"], ["\u0445", "\u0425"], ["\u0440", "\u0420"], ["\u043e", "\u041e"], ["\u043B", "\u041b"], ["\u0434", "\u0414"], ["\u043f", "\u041f"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u044F", "\u042F"], ["\u0447", "\u0427"], ["\u0451", "\u0401"], ["\u0441", "\u0421"], ["\u043c", "\u041c"], ["\u0438", "\u0418"], ["\u0442", "\u0422"], ["\u044c", "\u042c"], ["\u0432", "\u0412"], ["\u044e", "\u042e"], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["mn"] };

  this.VKI_layout['\u092e\u0930\u093e\u0920\u0940'] = {
    'name': "Marathi", 'keys': [
      [["", "", "`", "~"], ["\u0967", "\u090D", "1", "!"], ["\u0968", "\u0945", "2", "@"], ["\u0969", "\u094D\u0930", "3", "#"], ["\u096A", "\u0930\u094D", "4", "$"], ["\u096B", "\u091C\u094D\u091E", "5", "%"], ["\u096C", "\u0924\u094D\u0930", "6", "^"], ["\u096D", "\u0915\u094D\u0937", "7", "&"], ["\u096E", "\u0936\u094D\u0930", "8", "*"], ["\u096F", "(", "9", "("], ["\u0966", ")", "0", ")"], ["-", "\u0903", "-", "_"], ["\u0943", "\u090B", "=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u094C", "\u0914"], ["\u0948", "\u0910"], ["\u093E", "\u0906"], ["\u0940", "\u0908"], ["\u0942", "\u090A"], ["\u092C", "\u092D"], ["\u0939", "\u0919"], ["\u0917", "\u0918"], ["\u0926", "\u0927"], ["\u091C", "\u091D"], ["\u0921", "\u0922", "[", "{"], ["\u093C", "\u091E", "]", "}"], ["\u0949", "\u0911", "\\", "|"]],
      [["Caps", "Caps"], ["\u094B", "\u0913"], ["\u0947", "\u090F"], ["\u094D", "\u0905"], ["\u093F", "\u0907"], ["\u0941", "\u0909"], ["\u092A", "\u092B"], ["\u0930", "\u0931"], ["\u0915", "\u0916"], ["\u0924", "\u0925"], ["\u091A", "\u091B", ";", ":"], ["\u091F", "\u0920", "'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], [""], ["\u0902", "\u0901", "", "\u0950"], ["\u092E", "\u0923"], ["\u0928"], ["\u0935"], ["\u0932", "\u0933"], ["\u0938", "\u0936"], [",", "\u0937", ",", "<"], [".", "\u0964", ".", ">"], ["\u092F", "\u095F", "/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["mr"] };

  this.VKI_layout['\u1019\u103c\u1014\u103a\u1019\u102c\u1018\u102c\u101e\u102c'] = {
    'name': "Burmese", 'keys': [
      [["\u1039`", "~"], ["\u1041", "\u100D"], ["\u1042", "\u100E"], ["\u1043", "\u100B"], ["\u1044", "\u1000\u103B\u1015\u103A"], ["\u1045", "%"], ["\u1046", "/"], ["\u1047", "\u101B"], ["\u1048", "\u1002"], ["\u1049", "("], ["\u1040", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u1006", "\u1029"], ["\u1010", "\u1040"], ["\u1014", "\u103F"], ["\u1019", "\u1023"], ["\u1021", "\u1024"], ["\u1015", "\u104C"], ["\u1000", "\u1009"], ["\u1004", "\u104D"], ["\u101E", "\u1025"], ["\u1005", "\u100F"], ["\u101F", "\u1027"], ["\u2018", "\u2019"], ["\u104F", "\u100B\u1039\u100C"]],
      [["Caps", "Caps"], ["\u200B\u1031", "\u1017"], ["\u200B\u103B", "\u200B\u103E"], ["\u200B\u102D", "\u200B\u102E"], ["\u200B\u103A", "\u1004\u103A\u1039\u200B"], ["\u200B\u102B", "\u200B\u103D"], ["\u200B\u1037", "\u200B\u1036"], ["\u200B\u103C", "\u200B\u1032"], ["\u200B\u102F", "\u200B\u102F"], ["\u200B\u1030", "\u200B\u1030"], ["\u200B\u1038", "\u200B\u102B\u103A"], ["\u1012", "\u1013"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u1016", "\u1007"], ["\u1011", "\u100C"], ["\u1001", "\u1003"], ["\u101C", "\u1020"], ["\u1018", "\u1026"], ["\u100A", "\u1008"], ["\u200B\u102C", "\u102A"], ["\u101A", "\u101B"], [".", "\u101B"], ["\u104B", "\u104A"], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["my"] };

  this.VKI_layout['Nederlands'] = {
    'name': "Dutch", 'keys': [
      [["@", "\u00a7", "\u00ac"], ["1", "!", "\u00b9"], ["2", '"', "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00bc"], ["5", "%", "\u00bd"], ["6", "&", "\u00be"], ["7", "_", "\u00a3"], ["8", "(", "{"], ["9", ")", "}"], ["0", "'"], ["/", "?", "\\"], ["\u00b0", "~", "\u00b8"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R", "\u00b6"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00a8", "^"], ["*", "|"], ["<", ">"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S", "\u00df"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["+", "\u00b1"], ["\u00b4", "`"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["]", "[", "\u00a6"], ["z", "Z", "\u00ab"], ["x", "X", "\u00bb"], ["c", "C", "\u00a2"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u00b5"], [",", ";"], [".", ":", "\u00b7"], ["-", "="], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["nl"] };

  this.VKI_layout['Norsk'] = {
    'name': "Norwegian", 'keys': [
      [["|", "\u00a7"], ["1", "!"], ["2", '"', "@"], ["3", "#", "\u00a3"], ["4", "\u00a4", "$"], ["5", "%"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["+", "?"], ["\\", "`", "\u00b4"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00e5", "\u00c5"], ["\u00a8", "^", "~"], ["'", "*"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f8", "\u00d8"], ["\u00e6", "\u00c6"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u03bc", "\u039c"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["no", "nb", "nn"] };

  this.VKI_layout['\u067e\u069a\u062a\u0648'] = {
    'name': "Pashto", 'keys': [
      [["\u200d", "\u00f7", "`"], ["\u06f1", "!", "`"], ["\u06f2", "\u066c", "@"], ["\u06f3", "\u066b", "\u066b"], ["\u06f4", "\u00a4", "\u00a3"], ["\u06f5", "\u066a", "%"], ["\u06f6", "\u00d7", "^"], ["\u06f7", "\u00ab", "&"], ["\u06f8", "\u00bb", "*"], ["\u06f9", "(", "\ufdf2"], ["\u06f0", ")", "\ufefb"], ["-", "\u0640", "_"], ["=", "+", "\ufe87", "\u00f7"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0636", "\u0652", "\u06d5"], ["\u0635", "\u064c", "\u0653"], ["\u062b", "\u064d", "\u20ac"], ["\u0642", "\u064b", "\ufef7"], ["\u0641", "\u064f", "\ufef5"], ["\u063a", "\u0650", "'"], ["\u0639", "\u064e", "\ufe84"], ["\u0647", "\u0651", "\u0670"], ["\u062e", "\u0681", "'"], ["\u062d", "\u0685", '"'], ["\u062c", "]", "}"], ["\u0686", "[", "{"], ["\\", "\u066d", "|"]],
      [["Caps", "Caps"], ["\u0634", "\u069a", "\ufbb0"], ["\u0633", "\u06cd", "\u06d2"], ["\u06cc", "\u064a", "\u06d2"], ["\u0628", "\u067e", "\u06ba"], ["\u0644", "\u0623", "\u06b7"], ["\u0627", "\u0622", "\u0671"], ["\u062a", "\u067c", "\u0679"], ["\u0646", "\u06bc", "<"], ["\u0645", "\u0629", ">"], ["\u06a9", ":", "\u0643"], ["\u06af", "\u061b", "\u06ab"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0638", "\u0626", "?"], ["\u0637", "\u06d0", ";"], ["\u0632", "\u0698", "\u0655"], ["\u0631", "\u0621", "\u0654"], ["\u0630", "\u200c", "\u0625"], ["\u062f", "\u0689", "\u0688"], ["\u0693", "\u0624", "\u0691"], ["\u0648", "\u060c", ","], ["\u0696", ".", "\u06c7"], ["/", "\u061f", "\u06c9"], ["Shift", "Shift", "\u064d"]],
      [[" ", " ", " ", " "], ["Alt", "Alt"]]
    ], 'lang': ["ps"] };

  this.VKI_layout['\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40'] = {
    'name': "Punjabi (Gurmukhi)", 'keys': [
      [[""], ["1", "\u0A4D\u0A35", "\u0A67", "\u0A67"], ["2", "\u0A4D\u0A2F", "\u0A68", "\u0A68"], ["3", "\u0A4D\u0A30", "\u0A69", "\u0A69"], ["4", "\u0A71", "\u0A6A", "\u0A6A"], ["5", "", "\u0A6B", "\u0A6B"], ["6", "", "\u0A6C", "\u0A6C"], ["7", "", "\u0A6D", "\u0A6D"], ["8", "", "\u0A6E", "\u0A6E"], ["9", "(", "\u0A6F", "\u0A6F"], ["0", ")", "\u0A66", "\u0A66"], ["-"], [""], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0A4C", "\u0A14"], ["\u0A48", "\u0A10"], ["\u0A3E", "\u0A06"], ["\u0A40", "\u0A08"], ["\u0A42", "\u0A0A"], ["\u0A2C", "\u0A2D"], ["\u0A39", "\u0A19"], ["\u0A17", "\u0A18", "\u0A5A", "\u0A5A"], ["\u0A26", "\u0A27"], ["\u0A1C", "\u0A1D", "\u0A5B", "\u0A5B"], ["\u0A21", "\u0A22", "\u0A5C", "\u0A5C"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["\u0A4B", "\u0A13"], ["\u0A47", "\u0A0F"], ["\u0A4D", "\u0A05"], ["\u0A3F", "\u0A07"], ["\u0A41", "\u0A09"], ["\u0A2A", "\u0A2B", "\u0A5E", "\u0A5E"], ["\u0A30"], ["\u0A15", "\u0A16", "\u0A59", "\u0A59"], ["\u0A24", "\u0A25"], ["\u0A1A", "\u0A1B"], ["\u0A1F", "\u0A20"], ["\u0A3C", "\u0A1E"]],
      [["Shift", "Shift"], [""], ["\u0A02", "\u0A02"], ["\u0A2E", "\u0A23"], ["\u0A28"], ["\u0A35", "\u0A72", "\u0A73", "\u0A73"], ["\u0A32", "\u0A33"], ["\u0A38", "\u0A36"], [","], [".", "|", "\u0965", "\u0965"], ["\u0A2F"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["pa"] };

  this.VKI_layout['\u62fc\u97f3 (Pinyin)'] = {
    'name': "Pinyin", 'keys': [
      [["`", "~", "\u4e93", "\u301C"], ["1", "!", "\uFF62"], ["2", "@", "\uFF63"], ["3", "#", "\u301D"], ["4", "$", "\u301E"], ["5", "%", "\u301F"], ["6", "^", "\u3008"], ["7", "&", "\u3009"], ["8", "*", "\u302F"], ["9", "(", "\u300A"], ["0", ")", "\u300B"], ["-", "_", "\u300E"], ["=", "+", "\u300F"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\u0101", "\u0100"], ["w", "W", "\u00E1", "\u00C1"], ["e", "E", "\u01CE", "\u01CD"], ["r", "R", "\u00E0", "\u00C0"], ["t", "T", "\u0113", "\u0112"], ["y", "Y", "\u00E9", "\u00C9"], ["u", "U", "\u011B", "\u011A"], ["i", "I", "\u00E8", "\u00C8"], ["o", "O", "\u012B", "\u012A"], ["p", "P", "\u00ED", "\u00CD"], ["[", "{", "\u01D0", "\u01CF"], ["]", "}", "\u00EC", "\u00CC"], ["\\", "|", "\u3020"]],
      [["Caps", "Caps"], ["a", "A", "\u014D", "\u014C"], ["s", "S", "\u00F3", "\u00D3"], ["d", "D", "\u01D2", "\u01D1"], ["f", "F", "\u00F2", "\u00D2"], ["g", "G", "\u00fc", "\u00dc"], ["h", "H", "\u016B", "\u016A"], ["j", "J", "\u00FA", "\u00DA"], ["k", "K", "\u01D4", "\u01D3"], ["l", "L", "\u00F9", "\u00D9"], [";", ":"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["z", "Z", "\u01D6", "\u01D5"], ["x", "X", "\u01D8", "\u01D7"], ["c", "C", "\u01DA", "\u01D9"], ["v", "V", "\u01DC", "\u01DB"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<", "\u3001"], [".", ">", "\u3002"], ["/", "?"], ["Shift", "Shift"]],
      [["AltLk", "AltLk"], [" ", " ", " ", " "], ["Alt", "Alt"]]
    ], 'lang': ["zh-Latn"] };

  this.VKI_layout['Polski'] = {
    'name': "Polish (214)", 'keys': [
      [["\u02DB", "\u00B7"], ["1", "!", "~"], ["2", '"', "\u02C7"], ["3", "#", "^"], ["4", "\u00A4", "\u02D8"], ["5", "%", "\u00B0"], ["6", "&", "\u02DB"], ["7", "/", "`"], ["8", "(", "\u00B7"], ["9", ")", "\u00B4"], ["0", "=", "\u02DD"], ["+", "?", "\u00A8"], ["'", "*", "\u00B8"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\\"], ["w", "W", "\u00A6"], ["e", "E"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U", "\u20AC"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u017C", "\u0144", "\u00F7"], ["\u015B", "\u0107", "\u00D7"], ["\u00F3", "\u017A"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S", "\u0111"], ["d", "D", "\u0110"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u0142", "\u0141", "$"], ["\u0105", "\u0119", "\u00DF"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">"], ["y", "Y"], ["x", "X"], ["c", "C"], ["v", "V", "@"], ["b", "B", "{"], ["n", "N", "}"], ["m", "M", "\u00A7"], [",", ";", "<"], [".", ":", ">"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ]};

  this.VKI_layout['Polski Programisty'] = {
    'name': "Polish Programmers", 'keys': [
      [["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u0119", "\u0118"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O", "\u00f3", "\u00d3"], ["p", "P"], ["[", "{"], ["]", "}"], ["\\", "|"]],
      [["Caps", "Caps"], ["a", "A", "\u0105", "\u0104"], ["s", "S", "\u015b", "\u015a"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L", "\u0142", "\u0141"], [";", ":"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["z", "Z", "\u017c", "\u017b"], ["x", "X", "\u017a", "\u0179"], ["c", "C", "\u0107", "\u0106"], ["v", "V"], ["b", "B"], ["n", "N", "\u0144", "\u0143"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["Alt", "Alt"]]
    ], 'lang': ["pl"] };

  this.VKI_layout['Portugu\u00eas Brasileiro'] = {
    'name': "Portuguese (Brazil)", 'keys': [
      [["'", '"'], ["1", "!", "\u00b9"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a3"], ["5", "%", "\u00a2"], ["6", "\u00a8", "\u00ac"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+", "\u00a7"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "/"], ["w", "W", "?"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00b4", "`"], ["[", "{", "\u00aa"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00e7", "\u00c7"], ["~", "^"], ["]", "}", "\u00ba"], ["/", "?"]],
      [["Shift", "Shift"], ["\\", "|"], ["z", "Z"], ["x", "X"], ["c", "C", "\u20a2"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], [":", ":"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["pt-BR"] };

  this.VKI_layout['Portugu\u00eas'] = {
    'name': "Portuguese", 'keys': [
      [["\\", "|"], ["1", "!"], ["2", '"', "@"], ["3", "#", "\u00a3"], ["4", "$", "\u00a7"], ["5", "%"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["'", "?"], ["\u00ab", "\u00bb"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["+", "*", "\u00a8"], ["\u00b4", "`"], ["~", "^"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00e7", "\u00c7"], ["\u00ba", "\u00aa"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">", "\\"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["pt"] };

  this.VKI_layout['Rom\u00e2n\u0103'] = {
    'name': "Romanian", 'keys': [
      [["\u201E", "\u201D", "`", "~"], ["1", "!", "~"], ["2", "@", "\u02C7"], ["3", "#", "^"], ["4", "$", "\u02D8"], ["5", "%", "\u00B0"], ["6", "^", "\u02DB"], ["7", "&", "`"], ["8", "*", "\u02D9"], ["9", "(", "\u00B4"], ["0", ")", "\u02DD"], ["-", "_", "\u00A8"], ["=", "+", "\u00B8", "\u00B1"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P", "\u00A7"], ["\u0103", "\u0102", "[", "{"], ["\u00EE", "\u00CE", "]", "}"], ["\u00E2", "\u00C2", "\\", "|"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S", "\u00df"], ["d", "D", "\u00f0", "\u00D0"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L", "\u0142", "\u0141"], [(this.VKI_isIElt8) ? "\u015F" : "\u0219", (this.VKI_isIElt8) ? "\u015E" : "\u0218", ";", ":"], [(this.VKI_isIElt8) ? "\u0163" : "\u021B", (this.VKI_isIElt8) ? "\u0162" : "\u021A", "\'", "\""], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\\", "|"], ["z", "Z"], ["x", "X"], ["c", "C", "\u00A9"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";", "<", "\u00AB"], [".", ":", ">", "\u00BB"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["ro"] };

  this.VKI_layout['\u0420\u0443\u0441\u0441\u043a\u0438\u0439'] = {
    'name': "Russian", 'keys': [
      [["\u0451", "\u0401"], ["1", "!"], ["2", '"'], ["3", "\u2116"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0439", "\u0419"], ["\u0446", "\u0426"], ["\u0443", "\u0423"], ["\u043A", "\u041A"], ["\u0435", "\u0415"], ["\u043D", "\u041D"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u0449", "\u0429"], ["\u0437", "\u0417"], ["\u0445", "\u0425"], ["\u044A", "\u042A"], ["\\", "/"]],
      [["Caps", "Caps"], ["\u0444", "\u0424"], ["\u044B", "\u042B"], ["\u0432", "\u0412"], ["\u0430", "\u0410"], ["\u043F", "\u041F"], ["\u0440", "\u0420"], ["\u043E", "\u041E"], ["\u043B", "\u041B"], ["\u0434", "\u0414"], ["\u0436", "\u0416"], ["\u044D", "\u042D"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["/", "|"], ["\u044F", "\u042F"], ["\u0447", "\u0427"], ["\u0441", "\u0421"], ["\u043C", "\u041C"], ["\u0438", "\u0418"], ["\u0442", "\u0422"], ["\u044C", "\u042C"], ["\u0431", "\u0411"], ["\u044E", "\u042E"], [".", ","], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["ru"] };

  this.VKI_layout['Schweizerdeutsch'] = {
    'name': "Swiss German", 'keys': [
      [["\u00A7", "\u00B0"], ["1", "+", "\u00A6"], ["2", '"', "@"], ["3", "*", "#"], ["4", "\u00E7", "\u00B0"], ["5", "%", "\u00A7"], ["6", "&", "\u00AC"], ["7", "/", "|"], ["8", "(", "\u00A2"], ["9", ")"], ["0", "="], ["'", "?", "\u00B4"], ["^", "`", "~"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00FC", "\u00E8", "["], ["\u00A8", "!", "]"], ["$", "\u00A3", "}"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00F6", "\u00E9"], ["\u00E4", "\u00E0", "{"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">", "\\"], ["y", "Y"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["de-CH"] };

  this.VKI_layout['Shqip'] = {
    'name': "Albanian", 'keys': [
      [["\\", "|"], ["1", "!", "~"], ["2", '"', "\u02C7"], ["3", "#", "^"], ["4", "$", "\u02D8"], ["5", "%", "\u00B0"], ["6", "^", "\u02DB"], ["7", "&", "`"], ["8", "*", "\u02D9"], ["9", "(", "\u00B4"], ["0", ")", "\u02DD"], ["-", "_", "\u00A8"], ["=", "+", "\u00B8"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\\"], ["w", "W", "|"], ["e", "E"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00E7", "\u00C7", "\u00F7"], ["[", "{", "\u00DF"], ["]", "}", "\u00A4"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S", "\u0111"], ["d", "D", "\u0110"], ["f", "F", "["], ["g", "G", "]"], ["h", "H"], ["j", "J"], ["k", "K", "\u0142"], ["l", "L", "\u0141"], ["\u00EB", "\u00CB", "$"], ["@", "'", "\u00D7"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">"], ["y", "Y"], ["x", "X"], ["c", "C"], ["v", "V", "@"], ["b", "B", "{"], ["n", "N", "}"], ["m", "M", "\u00A7"], [",", ";", "<"], [".", ":", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["sq"] };

  this.VKI_layout['Sloven\u010dina'] = {
    'name': "Slovak", 'keys': [
      [[";", "\u00b0"], ["+", "1", "~"], ["\u013E", "2", "\u02C7"], ["\u0161", "3", "^"], ["\u010D", "4", "\u02D8"], ["\u0165", "5", "\u00B0"], ["\u017E", "6", "\u02DB"], ["\u00FD", "7", "`"], ["\u00E1", "8", "\u02D9"], ["\u00ED", "9", "\u00B4"], ["\u00E9", "0", "\u02DD"], ["=", "%", "\u00A8"], ["\u00B4", "\u02c7", "\u00B8"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\\"], ["w", "W", "|"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P", "'"], ["\u00FA", "/", "\u00F7"], ["\u00E4", "(", "\u00D7"], ["\u0148", ")", "\u00A4"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S", "\u0111"], ["d", "D", "\u0110"], ["f", "F", "["], ["g", "G", "]"], ["h", "H"], ["j", "J"], ["k", "K", "\u0142"], ["l", "L", "\u0141"], ["\u00F4", '"', "$"], ["\u00A7", "!", "\u00DF"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["&", "*", "<"], ["y", "Y", ">"], ["x", "X", "#"], ["c", "C", "&"], ["v", "V", "@"], ["b", "B", "{"], ["n", "N", "}"], ["m", "M"], [",", "?", "<"], [".", ":", ">"], ["-", "_", "*", ], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["sk"] };

  this.VKI_layout['Sloven\u0161\u010dina'] = {
    'name': "Slovenian", 'keys': this.VKI_layout['Bosanski'].keys.slice(0), 'lang': ["sl"]
  };

  this.VKI_layout['\u0441\u0440\u043f\u0441\u043a\u0438'] = {
    'name': "Serbian Cyrillic", 'keys': [
      [["`", "~"], ["1", "!"], ["2", '"'], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "&"], ["7", "/"], ["8", "("], ["9", ")"], ["0", "="], ["'", "?"], ["+", "*"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0459", "\u0409"], ["\u045a", "\u040a"], ["\u0435", "\u0415", "\u20ac"], ["\u0440", "\u0420"], ["\u0442", "\u0422"], ["\u0437", "\u0417"], ["\u0443", "\u0423"], ["\u0438", "\u0418"], ["\u043e", "\u041e"], ["\u043f", "\u041f"], ["\u0448", "\u0428"], ["\u0452", "\u0402"], ["\u0436", "\u0416"]],
      [["Caps", "Caps"], ["\u0430", "\u0410"], ["\u0441", "\u0421"], ["\u0434", "\u0414"], ["\u0444", "\u0424"], ["\u0433", "\u0413"], ["\u0445", "\u0425"], ["\u0458", "\u0408"], ["\u043a", "\u041a"], ["\u043b", "\u041b"], ["\u0447", "\u0427"], ["\u045b", "\u040b"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">"], ["\u0455", "\u0405"], ["\u045f", "\u040f"], ["\u0446", "\u0426"], ["\u0432", "\u0412"], ["\u0431", "\u0411"], ["\u043d", "\u041d"], ["\u043c", "\u041c"], [",", ";", "<"], [".", ":", ">"], ["-", "_", "\u00a9"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["sr-Cyrl"] };

  this.VKI_layout['Srpski'] = {
    'name': "Serbian Latin", 'keys': this.VKI_layout['Bosanski'].keys.slice(0), 'lang': ["sr"]
  };

  this.VKI_layout['Suomi'] = {
    'name': "Finnish", 'keys': [
      [["\u00a7", "\u00BD"], ["1", "!"], ["2", '"', "@"], ["3", "#", "\u00A3"], ["4", "\u00A4", "$"], ["5", "%", "\u20AC"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["+", "?", "\\"], ["\u00B4", "`"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\u00E2", "\u00C2"], ["w", "W"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T", "\u0167", "\u0166"], ["y", "Y"], ["u", "U"], ["i", "I", "\u00ef", "\u00CF"], ["o", "O", "\u00f5", "\u00D5"], ["p", "P"], ["\u00E5", "\u00C5"], ["\u00A8", "^", "~"], ["'", "*"]],
      [["Caps", "Caps"], ["a", "A", "\u00E1", "\u00C1"], ["s", "S", "\u0161", "\u0160"], ["d", "D", "\u0111", "\u0110"], ["f", "F", "\u01e5", "\u01E4"], ["g", "G", "\u01E7", "\u01E6"], ["h", "H", "\u021F", "\u021e"], ["j", "J"], ["k", "K", "\u01e9", "\u01E8"], ["l", "L"], ["\u00F6", "\u00D6", "\u00F8", "\u00D8"], ["\u00E4", "\u00C4", "\u00E6", "\u00C6"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">", "|"], ["z", "Z", "\u017E", "\u017D"], ["x", "X"], ["c", "C", "\u010d", "\u010C"], ["v", "V", "\u01EF", "\u01EE"], ["b", "B", "\u0292", "\u01B7"], ["n", "N", "\u014B", "\u014A"], ["m", "M", "\u00B5"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [["Alt", "Alt"], [" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["fi"] };

  this.VKI_layout['Svenska'] = {
    'name': "Swedish", 'keys': [
      [["\u00a7", "\u00bd"], ["1", "!"], ["2", '"', "@"], ["3", "#", "\u00a3"], ["4", "\u00a4", "$"], ["5", "%", "\u20ac"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["+", "?", "\\"], ["\u00b4", "`"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00e5", "\u00c5"], ["\u00a8", "^", "~"], ["'", "*"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f6", "\u00d6"], ["\u00e4", "\u00c4"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">", "|"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u03bc", "\u039c"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["sv"] };

  this.VKI_layout['Swiss Fran\u00e7ais'] = {
    'name': "Swiss French", 'keys': [
      [["\u00A7", "\u00B0"], ["1", "+", "\u00A6"], ["2", '"', "@"], ["3", "*", "#"], ["4", "\u00E7", "\u00B0"], ["5", "%", "\u00A7"], ["6", "&", "\u00AC"], ["7", "/", "|"], ["8", "(", "\u00A2"], ["9", ")"], ["0", "="], ["'", "?", "\u00B4"], ["^", "`", "~"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00E8", "\u00FC", "["], ["\u00A8", "!", "]"], ["$", "\u00A3", "}"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00E9", "\u00F6"], ["\u00E0", "\u00E4", "{"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">", "\\"], ["y", "Y"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["fr-CH"] };

  this.VKI_layout['\u0723\u0718\u072a\u071d\u071d\u0710'] = {
    'name': "Syriac", 'keys': [
      [["\u070f", "\u032e", "\u0651", "\u0651"], ["1", "!", "\u0701", "\u0701"], ["2", "\u030a", "\u0702", "\u0702"], ["3", "\u0325", "\u0703", "\u0703"], ["4", "\u0749", "\u0704", "\u0704"], ["5", "\u2670", "\u0705", "\u0705"], ["6", "\u2671", "\u0708", "\u0708"], ["7", "\u070a", "\u0709", "\u0709"], ["8", "\u00bb", "\u070B", "\u070B"], ["9", ")", "\u070C", "\u070C"], ["0", "(", "\u070D", "\u070D"], ["-", "\u00ab", "\u250C", "\u250C"], ["=", "+", "\u2510", "\u2510"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0714", "\u0730", "\u064E", "\u064E"], ["\u0728", "\u0733", "\u064B", "\u064B"], ["\u0716", "\u0736", "\u064F", "\u064F"], ["\u0729", "\u073A", "\u064C", "\u064C"], ["\u0726", "\u073D", "\u0653", "\u0653"], ["\u071c", "\u0740", "\u0654", "\u0654"], ["\u0725", "\u0741", "\u0747", "\u0747"], ["\u0717", "\u0308", "\u0743", "\u0743"], ["\u071e", "\u0304", "\u0745", "\u0745"], ["\u071a", "\u0307", "\u032D", "\u032D"], ["\u0713", "\u0303"], ["\u0715", "\u074A"], ["\u0706", ":"]],
      [["Caps", "Caps"], ["\u072b", "\u0731", "\u0650", "\u0650"], ["\u0723", "\u0734", "\u064d", "\u064d"], ["\u071d", "\u0737"], ["\u0712", "\u073b", "\u0621", "\u0621"], ["\u0720", "\u073e", "\u0655", "\u0655"], ["\u0710", "\u0711", "\u0670", "\u0670"], ["\u072c", "\u0640", "\u0748", "\u0748"], ["\u0722", "\u0324", "\u0744", "\u0744"], ["\u0721", "\u0331", "\u0746", "\u0746"], ["\u071f", "\u0323"], ["\u071b", "\u0330"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["]", "\u0732"], ["[", "\u0735", "\u0652", "\u0652"], ["\u0724", "\u0738"], ["\u072a", "\u073c", "\u200D"], ["\u0727", "\u073f", "\u200C"], ["\u0700", "\u0739", "\u200E"], [".", "\u0742", "\u200F"], ["\u0718", "\u060c"], ["\u0719", "\u061b"], ["\u0707", "\u061F"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["syc"] };

  this.VKI_layout['\u0ba4\u0bae\u0bbf\u0bb4\u0bcd'] = {
    'name': "Tamil", 'keys': [
      [["\u0BCA", "\u0B92"], ["1", "", "\u0BE7"], ["2", "", "\u0BE8"], ["3", "", "\u0BE9"], ["4", "", "\u0BEA"], ["5", "", "\u0BEB"], ["6", "\u0BA4\u0BCD\u0BB0", "\u0BEC"], ["7", "\u0B95\u0BCD\u0BB7", "\u0BED"], ["8", "\u0BB7\u0BCD\u0BB0", "\u0BEE"], ["9", "", "\u0BEF"], ["0", "", "\u0BF0"], ["-", "\u0B83", "\u0BF1"], ["", "", "\u0BF2"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0BCC", "\u0B94"], ["\u0BC8", "\u0B90"], ["\u0BBE", "\u0B86"], ["\u0BC0", "\u0B88"], ["\u0BC2", "\u0B8A"], ["\u0BAA", "\u0BAA"], ["\u0BB9", "\u0B99"], ["\u0B95", "\u0B95"], ["\u0BA4", "\u0BA4"], ["\u0B9C", "\u0B9A"], ["\u0B9F", "\u0B9F"], ["\u0B9E"]],
      [["Caps", "Caps"], ["\u0BCB", "\u0B93"], ["\u0BC7", "\u0B8F"], ["\u0BCD", "\u0B85"], ["\u0BBF", "\u0B87"], ["\u0BC1", "\u0B89"], ["\u0BAA", "\u0BAA"], ["\u0BB0", "\u0BB1"], ["\u0B95", "\u0B95"], ["\u0BA4", "\u0BA4"], ["\u0B9A", "\u0B9A"], ["\u0B9F", "\u0B9F"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0BC6", "\u0B8E"], [""], ["\u0BAE", "\u0BA3"], ["\u0BA8", "\u0BA9"], ["\u0BB5", "\u0BB4"], ["\u0BB2", "\u0BB3"], ["\u0BB8", "\u0BB7"], [",", "\u0BB7"], [".", "\u0BB8\u0BCD\u0BB0\u0BC0"], ["\u0BAF", "\u0BAF"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["ta"] };

  this.VKI_layout['\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41'] = {
    'name': "Telugu", 'keys': [
      [["\u0C4A", "\u0C12"], ["1", "", "\u0C67"], ["2", "", "\u0C68"], ["3", "\u0C4D\u0C30", "\u0C69"], ["4", "", "\u0C6A"], ["5", "\u0C1C\u0C4D\u0C1E", "\u0C6B"], ["6", "\u0C24\u0C4D\u0C30", "\u0C6C"], ["7", "\u0C15\u0C4D\u0C37", "\u0C6D"], ["8", "\u0C36\u0C4D\u0C30", "\u0C6E"], ["9", "(", "\u0C6F"], ["0", ")", "\u0C66"], ["-", "\u0C03"], ["\u0C43", "\u0C0B", "\u0C44"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0C4C", "\u0C14"], ["\u0C48", "\u0C10", "\u0C56"], ["\u0C3E", "\u0C06"], ["\u0C40", "\u0C08", "", "\u0C61"], ["\u0C42", "\u0C0A"], ["\u0C2C"], ["\u0C39", "\u0C19"], ["\u0C17", "\u0C18"], ["\u0C26", "\u0C27"], ["\u0C1C", "\u0C1D"], ["\u0C21", "\u0C22"], ["", "\u0C1E"]],
      [["Caps", "Caps"], ["\u0C4B", "\u0C13"], ["\u0C47", "\u0C0F", "\u0C55"], ["\u0C4D", "\u0C05"], ["\u0C3F", "\u0C07", "", "\u0C0C"], ["\u0C41", "\u0C09"], ["\u0C2A", "\u0C2B"], ["\u0C30", "\u0C31"], ["\u0C15", "\u0C16"], ["\u0C24", "\u0C25"], ["\u0C1A", "\u0C1B"], ["\u0C1F", "\u0C25"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0C46", "\u0C0E"], ["\u0C02", "\u0C01"], ["\u0C2E", "\u0C23"], ["\u0C28", "\u0C28"], ["\u0C35"], ["\u0C32", "\u0C33"], ["\u0C38", "\u0C36"], [",", "\u0C37"], ["."], ["\u0C2F"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["te"] };

  this.VKI_layout['Ti\u1ebfng Vi\u1ec7t'] = {
    'name': "Vietnamese", 'keys': [
      [["`", "~", "`", "~"], ["\u0103", "\u0102", "1", "!"], ["\u00E2", "\u00C2", "2", "@"], ["\u00EA", "\u00CA", "3", "#"], ["\u00F4", "\u00D4", "4", "$"], ["\u0300", "\u0300", "5", "%"], ["\u0309", "\u0309", "6", "^"], ["\u0303", "\u0303", "7", "&"], ["\u0301", "\u0301", "8", "*"], ["\u0323", "\u0323", "9", "("], ["\u0111", "\u0110", "0", ")"], ["-", "_", "-", "_"], ["\u20AB", "+", "=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "q", "Q"], ["w", "W", "w", "W"], ["e", "E", "e", "E"], ["r", "R", "r", "R"], ["t", "T", "t", "T"], ["y", "Y", "y", "Y"], ["u", "U", "u", "U"], ["i", "I", "i", "I"], ["o", "O", "o", "O"], ["p", "P", "p", "P"], ["\u01B0", "\u01AF", "[", "{"], ["\u01A1", "\u01A0", "]", "}"], ["\\", "|", "\\", "|"]],
      [["Caps", "Caps"], ["a", "A", "a", "A"], ["s", "S", "s", "S"], ["d", "D", "d", "D"], ["f", "F", "f", "F"], ["g", "G", "g", "G"], ["h", "H", "h", "H"], ["j", "J", "j", "J"], ["k", "K", "k", "K"], ["l", "L", "l", "L"], [";", ":", ";", ":"], ["'", '"', "'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["z", "Z", "z", "Z"], ["x", "X", "x", "X"], ["c", "C", "c", "C"], ["v", "V", "v", "V"], ["b", "B", "b", "B"], ["n", "N", "n", "N"], ["m", "M", "m", "M"], [",", "<", ",", "<"], [".", ">", ".", ">"], ["/", "?", "/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["vi"] };

  this.VKI_layout['\u0e44\u0e17\u0e22 Kedmanee'] = {
    'name': "Thai Kedmanee", 'keys': [
      [["_", "%"], ["\u0E45", "+"], ["/", "\u0E51"], ["-", "\u0E52"], ["\u0E20", "\u0E53"], ["\u0E16", "\u0E54"], ["\u0E38", "\u0E39"], ["\u0E36", "\u0E3F"], ["\u0E04", "\u0E55"], ["\u0E15", "\u0E56"], ["\u0E08", "\u0E57"], ["\u0E02", "\u0E58"], ["\u0E0A", "\u0E59"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0E46", "\u0E50"], ["\u0E44", '"'], ["\u0E33", "\u0E0E"], ["\u0E1E", "\u0E11"], ["\u0E30", "\u0E18"], ["\u0E31", "\u0E4D"], ["\u0E35", "\u0E4A"], ["\u0E23", "\u0E13"], ["\u0E19", "\u0E2F"], ["\u0E22", "\u0E0D"], ["\u0E1A", "\u0E10"], ["\u0E25", ","], ["\u0E03", "\u0E05"]],
      [["Caps", "Caps"], ["\u0E1F", "\u0E24"], ["\u0E2B", "\u0E06"], ["\u0E01", "\u0E0F"], ["\u0E14", "\u0E42"], ["\u0E40", "\u0E0C"], ["\u0E49", "\u0E47"], ["\u0E48", "\u0E4B"], ["\u0E32", "\u0E29"], ["\u0E2A", "\u0E28"], ["\u0E27", "\u0E0B"], ["\u0E07", "."], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0E1C", "("], ["\u0E1B", ")"], ["\u0E41", "\u0E09"], ["\u0E2D", "\u0E2E"], ["\u0E34", "\u0E3A"], ["\u0E37", "\u0E4C"], ["\u0E17", "?"], ["\u0E21", "\u0E12"], ["\u0E43", "\u0E2C"], ["\u0E1D", "\u0E26"], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["th"] };

  this.VKI_layout['\u0e44\u0e17\u0e22 Pattachote'] = {
    'name': "Thai Pattachote", 'keys': [
      [["_", "\u0E3F"], ["=", "+"], ["\u0E52", '"'], ["\u0E53", "/"], ["\u0E54", ","], ["\u0E55", "?"], ["\u0E39", "\u0E38"], ["\u0E57", "_"], ["\u0E58", "."], ["\u0E59", "("], ["\u0E50", ")"], ["\u0E51", "-"], ["\u0E56", "%"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0E47", "\u0E4A"], ["\u0E15", "\u0E24"], ["\u0E22", "\u0E46"], ["\u0E2D", "\u0E0D"], ["\u0E23", "\u0E29"], ["\u0E48", "\u0E36"], ["\u0E14", "\u0E1D"], ["\u0E21", "\u0E0B"], ["\u0E27", "\u0E16"], ["\u0E41", "\u0E12"], ["\u0E43", "\u0E2F"], ["\u0E0C", "\u0E26"], ["\uF8C7", "\u0E4D"]],
      [["Caps", "Caps"], ["\u0E49", "\u0E4B"], ["\u0E17", "\u0E18"], ["\u0E07", "\u0E33"], ["\u0E01", "\u0E13"], ["\u0E31", "\u0E4C"], ["\u0E35", "\u0E37"], ["\u0E32", "\u0E1C"], ["\u0E19", "\u0E0A"], ["\u0E40", "\u0E42"], ["\u0E44", "\u0E06"], ["\u0E02", "\u0E11"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0E1A", "\u0E0E"], ["\u0E1B", "\u0E0F"], ["\u0E25", "\u0E10"], ["\u0E2B", "\u0E20"], ["\u0E34", "\u0E31"], ["\u0E04", "\u0E28"], ["\u0E2A", "\u0E2E"], ["\u0E30", "\u0E1F"], ["\u0E08", "\u0E09"], ["\u0E1E", "\u0E2C"], ["Shift", "Shift"]],
      [[" ", " "]]
    ]};

  this.VKI_layout['\u0422\u0430\u0442\u0430\u0440\u0447\u0430'] = {
    'name': "Tatar", 'keys': [
      [["\u04BB", "\u04BA", "\u0451", "\u0401"], ["1", "!"], ["2", '"', "@"], ["3", "\u2116", "#"], ["4", ";", "$"], ["5", "%"], ["6", ":"], ["7", "?", "["], ["8", "*", "]"], ["9", "(", "{"], ["0", ")", "}"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0439", "\u0419"], ["\u04E9", "\u04E8", "\u0446", "\u0426"], ["\u0443", "\u0423"], ["\u043A", "\u041A"], ["\u0435", "\u0415"], ["\u043D", "\u041D"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u04D9", "\u04D8", "\u0449", "\u0429"], ["\u0437", "\u0417"], ["\u0445", "\u0425"], ["\u04AF", "\u04AE", "\u044A", "\u042A"], ["\\", "/"]],
      [["Caps", "Caps"], ["\u0444", "\u0424"], ["\u044B", "\u042B"], ["\u0432", "\u0412"], ["\u0430", "\u0410"], ["\u043F", "\u041F"], ["\u0440", "\u0420"], ["\u043E", "\u041E"], ["\u043B", "\u041B"], ["\u0434", "\u0414"], ["\u04A3", "\u04A2", "\u0436", "\u0416"], ["\u044D", "\u042D", "'"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0491", "\u0490"], ["\u044F", "\u042F"], ["\u0447", "\u0427"], ["\u0441", "\u0421"], ["\u043C", "\u041C"], ["\u0438", "\u0418"], ["\u0442", "\u0422"], ["\u0497", "\u0496", "\u044C", "\u042C"], ["\u0431", "\u0411", "<"], ["\u044E", "\u042E", ">"], [".", ","], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["tt"] };

  this.VKI_layout['T\u00fcrk\u00e7e F'] = {
    'name': "Turkish F", 'keys': [
      [['+', "*", "\u00ac"], ["1", "!", "\u00b9", "\u00a1"], ["2", '"', "\u00b2"], ["3", "^", "#", "\u00b3"], ["4", "$", "\u00bc", "\u00a4"], ["5", "%", "\u00bd"], ["6", "&", "\u00be"], ["7", "'", "{"], ["8", "(", '['], ["9", ")", ']'], ["0", "=", "}"], ["/", "?", "\\", "\u00bf"], ["-", "_", "|"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["f", "F", "@"], ["g", "G"], ["\u011f", "\u011e"], ["\u0131", "I", "\u00b6", "\u00ae"], ["o", "O"], ["d", "D", "\u00a5"], ["r", "R"], ["n", "N"], ["h", "H", "\u00f8", "\u00d8"], ["p", "P", "\u00a3"], ["q", "Q", "\u00a8"], ["w", "W", "~"], ["x", "X", "`"]],
      [["Caps", "Caps"], ["u", "U", "\u00e6", "\u00c6"], ["i", "\u0130", "\u00df", "\u00a7"], ["e", "E", "\u20ac"], ["a", "A", " ", "\u00aa"], ["\u00fc", "\u00dc"], ["t", "T"], ["k", "K"], ["m", "M"], ["l", "L"], ["y", "Y", "\u00b4"], ["\u015f", "\u015e"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">", "|", "\u00a6"], ["j", "J", "\u00ab", "<"], ["\u00f6", "\u00d6", "\u00bb", ">"], ["v", "V", "\u00a2", "\u00a9"], ["c", "C"], ["\u00e7", "\u00c7"], ["z", "Z"], ["s", "S", "\u00b5", "\u00ba"], ["b", "B", "\u00d7"], [".", ":", "\u00f7"], [",", ";", "-"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "],  ["AltGr", "AltGr"]]
    ]};

  this.VKI_layout['T\u00fcrk\u00e7e Q'] = {
    'name': "Turkish Q", 'keys': [
      [['"', "\u00e9", "<"], ["1", "!", ">"], ["2", "'", "\u00a3"], ["3", "^", "#"], ["4", "+", "$"], ["5", "%", "\u00bd"], ["6", "&"], ["7", "/", "{"], ["8", "(", '['], ["9", ")", ']'], ["0", "=", "}"], ["*", "?", "\\"], ["-", "_", "|"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "@"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["\u0131", "I", "i", "\u0130"], ["o", "O"], ["p", "P"], ["\u011f", "\u011e", "\u00a8"], ["\u00fc", "\u00dc", "~"], [",", ";", "`"]],
      [["Caps", "Caps"], ["a", "A", "\u00e6", "\u00c6"], ["s", "S", "\u00df"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u015f", "\u015e", "\u00b4"], ["i", "\u0130"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["<", ">", "|"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], ["\u00f6", "\u00d6"], ["\u00e7", "\u00c7"], [".", ":"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "],  ["AltGr", "AltGr"]]
    ], 'lang': ["tr"] };

  this.VKI_layout['\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430'] = {
    'name': "Ukrainian", 'keys': [
      [["\u00b4", "~"], ["1", "!"], ["2", '"'], ["3", "\u2116"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0439", "\u0419"], ["\u0446", "\u0426"], ["\u0443", "\u0423"], ["\u043A", "\u041A"], ["\u0435", "\u0415"], ["\u043D", "\u041D"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u0449", "\u0429"], ["\u0437", "\u0417"], ["\u0445", "\u0425"], ["\u0457", "\u0407"], ["\u0491", "\u0490"]],
      [["Caps", "Caps"], ["\u0444", "\u0424"], ["\u0456", "\u0406"], ["\u0432", "\u0412"], ["\u0430", "\u0410"], ["\u043F", "\u041F"], ["\u0440", "\u0420"], ["\u043E", "\u041E"], ["\u043B", "\u041B"], ["\u0434", "\u0414"], ["\u0436", "\u0416"], ["\u0454", "\u0404"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u044F", "\u042F"], ["\u0447", "\u0427"], ["\u0441", "\u0421"], ["\u043C", "\u041C"], ["\u0438", "\u0418"], ["\u0442", "\u0422"], ["\u044C", "\u042C"], ["\u0431", "\u0411"], ["\u044E", "\u042E"], [".", ","], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["uk"] };

  this.VKI_layout['United Kingdom'] = {
    'name': "United Kingdom", 'keys': [
      [["`", "\u00ac", "\u00a6"], ["1", "!"], ["2", '"'], ["3", "\u00a3"], ["4", "$", "\u20ac"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u00e9", "\u00c9"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U", "\u00fa", "\u00da"], ["i", "I", "\u00ed", "\u00cd"], ["o", "O", "\u00f3", "\u00d3"], ["p", "P"], ["[", "{"], ["]", "}"], ["#", "~"]],
      [["Caps", "Caps"], ["a", "A", "\u00e1", "\u00c1"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", "@"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\\", "|"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ], 'lang': ["en-gb"] };

  this.VKI_layout['\u0627\u0631\u062f\u0648'] = {
    'name': "Urdu", 'keys': [
      [["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "\u066A"], ["6", "^"], ["7", "\u06D6"], ["8", "\u066D"], ["9", ")"], ["0", "("], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0637", "\u0638"], ["\u0635", "\u0636"], ["\u06be", "\u0630"], ["\u062f", "\u0688"], ["\u0679", "\u062B"], ["\u067e", "\u0651"], ["\u062a", "\u06C3"], ["\u0628", "\u0640"], ["\u062c", "\u0686"], ["\u062d", "\u062E"], ["]", "}"], ["[", "{"], ["\\", "|"]],
      [["Caps", "Caps"], ["\u0645", "\u0698"], ["\u0648", "\u0632"], ["\u0631", "\u0691"], ["\u0646", "\u06BA"], ["\u0644", "\u06C2"], ["\u06c1", "\u0621"], ["\u0627", "\u0622"], ["\u06A9", "\u06AF"], ["\u06CC", "\u064A"], ["\u061b", ":"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0642", "\u200D"], ["\u0641", "\u200C"], ["\u06D2", "\u06D3"], ["\u0633", "\u200E"], ["\u0634", "\u0624"], ["\u063a", "\u0626"], ["\u0639", "\u200F"], ["\u060C", ">"], ["\u06D4", "<"], ["/", "\u061F"], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["ur"] };

  this.VKI_layout['\u0627\u0631\u062f\u0648 Phonetic'] = {
    'name': "Urdu Phonetic", 'keys': [
      [["\u064D", "\u064B", "~"], ["\u06F1", "1", "!"], ["\u06F2", "2", "@"], ["\u06F3", "3", "#"], ["\u06F4", "4", "$"], ["\u06F5", "5", "\u066A"], ["\u06F6", "6", "^"], ["\u06F7", "7", "&"], ["\u06F8", "8", "*"], ["\u06F9", "9", "("], ["\u06F0", "0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0642", "\u0652"], ["\u0648", "\u0651", "\u0602"], ["\u0639", "\u0670", "\u0656"], ["\u0631", "\u0691", "\u0613"], ["\u062A", "\u0679", "\u0614"], ["\u06D2", "\u064E", "\u0601"], ["\u0621", "\u0626", "\u0654"], ["\u06CC", "\u0650", "\u0611"], ["\u06C1", "\u06C3"], ["\u067E", "\u064F", "\u0657"], ["[", "{"], ["]", "}"], ["\\", "|"]],
      [["Caps", "Caps"], ["\u0627", "\u0622", "\uFDF2"], ["\u0633", "\u0635", "\u0610"], ["\u062F", "\u0688", "\uFDFA"], ["\u0641"], ["\u06AF", "\u063A"], ["\u062D", "\u06BE", "\u0612"], ["\u062C", "\u0636", "\uFDFB"], ["\u06A9", "\u062E"], ["\u0644"], ["\u061B", ":"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0632", "\u0630", "\u060F"], ["\u0634", "\u0698", "\u060E"], ["\u0686", "\u062B", "\u0603"], ["\u0637", "\u0638"], ["\u0628", "", "\uFDFD"], ["\u0646", "\u06BA", "\u0600"], ["\u0645", "\u0658"], ["\u060C", "", "<"], ["\u06D4", "\u066B", ">"], ["/", "\u061F"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["Alt", "Alt"]]
    ]};

  this.VKI_layout['US Standard'] = {
    'name': "US Standard", 'keys': [
      [["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["[", "{"], ["]", "}"], ["\\", "|"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["en-us"] };

   this.VKI_layout['US International'] = {
    'name': "US International", 'keys': [
      [["`", "~"], ["1", "!", "\u00a1", "\u00b9"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a4", "\u00a3"], ["5", "%", "\u20ac"], ["6", "^", "\u00bc"], ["7", "&", "\u00bd"], ["8", "*", "\u00be"], ["9", "(", "\u2018"], ["0", ")", "\u2019"], ["-", "_", "\u00a5"], ["=", "+", "\u00d7", "\u00f7"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\u00e4", "\u00c4"], ["w", "W", "\u00e5", "\u00c5"], ["e", "E", "\u00e9", "\u00c9"], ["r", "R", "\u00ae"], ["t", "T", "\u00fe", "\u00de"], ["y", "Y", "\u00fc", "\u00dc"], ["u", "U", "\u00fa", "\u00da"], ["i", "I", "\u00ed", "\u00cd"], ["o", "O", "\u00f3", "\u00d3"], ["p", "P", "\u00f6", "\u00d6"], ["[", "{", "\u00ab"], ["]", "}", "\u00bb"], ["\\", "|", "\u00ac", "\u00a6"]],
      [["Caps", "Caps"], ["a", "A", "\u00e1", "\u00c1"], ["s", "S", "\u00df", "\u00a7"], ["d", "D", "\u00f0", "\u00d0"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L", "\u00f8", "\u00d8"], [";", ":", "\u00b6", "\u00b0"], ["'", '"', "\u00b4", "\u00a8"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["z", "Z", "\u00e6", "\u00c6"], ["x", "X"], ["c", "C", "\u00a9", "\u00a2"], ["v", "V"], ["b", "B"], ["n", "N", "\u00f1", "\u00d1"], ["m", "M", "\u00b5"], [",", "<", "\u00e7", "\u00c7"], [".", ">"], ["/", "?", "\u00bf"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["Alt", "Alt"]]
    ], 'lang': ["en"] };

  this.VKI_layout['\u040e\u0437\u0431\u0435\u043a\u0447\u0430'] = {
    'name': "Uzbek Cyrillic", 'keys': [
      [["\u0451", "\u0401"], ["1", "!"], ["2", '"'], ["3", "\u2116"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], ["\u0493", "\u0492"], ["\u04B3", "\u04B2"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0439", "\u0419"], ["\u0446", "\u0426"], ["\u0443", "\u0423"], ["\u043A", "\u041A"], ["\u0435", "\u0415"], ["\u043D", "\u041D"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u045E", "\u040E"], ["\u0437", "\u0417"], ["\u0445", "\u0425"], ["\u044A", "\u042A"], ["\\", "/"]],
      [["Caps", "Caps"], ["\u0444", "\u0424"], ["\u049B", "\u049A"], ["\u0432", "\u0412"], ["\u0430", "\u0410"], ["\u043F", "\u041F"], ["\u0440", "\u0420"], ["\u043E", "\u041E"], ["\u043B", "\u041B"], ["\u0434", "\u0414"], ["\u0436", "\u0416"], ["\u044D", "\u042D"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u044F", "\u042F"], ["\u0447", "\u0427"], ["\u0441", "\u0421"], ["\u043C", "\u041C"], ["\u0438", "\u0418"], ["\u0442", "\u0422"], ["\u044C", "\u042C"], ["\u0431", "\u0411"], ["\u044E", "\u042E"], [".", ","], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["uz"] };

  this.VKI_layout['\u05d9\u05d9\u05b4\u05d3\u05d9\u05e9'] = { // from http://www.yv.org/uyip/hebyidkbd.txt http://uyip.org/keyboards.html
    'name': "Yiddish", 'keys': [
      [[";", "~", "\u05B0"], ["1", "!", "\u05B1"], ["2", "@", "\u05B2"], ["3", "#", "\u05B3"], ["4", "$", "\u05B4"], ["5", "%", "\u05B5"], ["6", "^", "\u05B6"], ["7", "*", "\u05B7"], ["8", "&", "\u05B8"], ["9", "(", "\u05C2"], ["0", ")", "\u05C1"], ["-", "_", "\u05B9"], ["=", "+", "\u05BC"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["/", "\u201F", "\u201F"], ["'", "\u201E", "\u201E"], ["\u05E7", "`", "`"], ["\u05E8", "\uFB2F", "\uFB2F"], ["\u05D0", "\uFB2E", "\uFB2E"], ["\u05D8", "\u05F0", "\u05F0"], ["\u05D5", "\uFB35", "\uFB35"], ["\u05DF", "\uFB4B", "\uFB4B"], ["\u05DD", "\uFB4E", "\uFB4E"], ["\u05E4", "\uFB44", "\uFB44"], ["[", "{", "\u05BD"], ["]", "}", "\u05BF"], ["\\", "|", "\u05BB"]],
      [["Caps", "Caps"], ["\u05E9", "\uFB2A", "\uFB2A"], ["\u05D3", "\uFB2B", "\uFB2B"], ["\u05D2"], ["\u05DB", "\uFB3B", "\uFB3B"], ["\u05E2", "\u05F1", "\u05F1"], ["\u05D9", "\uFB1D", "\uFB1D"], ["\u05D7", "\uFF1F", "\uFF1F"], ["\u05DC", "\u05F2", "\u05F2"], ["\u05DA"], ["\u05E3", ":", "\u05C3"], [",", '"', "\u05C0"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u05D6", "\u2260", "\u2260"], ["\u05E1", "\uFB4C", "\uFB4C"], ["\u05D1", "\uFB31", "\uFB31"], ["\u05D4", "\u05BE", "\u05BE"], ["\u05E0", "\u2013", "\u2013"], ["\u05DE", "\u2014", "\u2014"], ["\u05E6", "\uFB4A", "\uFB4A"], ["\u05EA", "<", "\u05F3"], ["\u05E5", ">", "\u05F4"], [".", "?", "\u20AA"], ["Shift", "Shift"]],
      [[" ", " "], ["Alt", "Alt"]]
    ], 'lang': ["yi"] };

  this.VKI_layout['\u05d9\u05d9\u05b4\u05d3\u05d9\u05e9 \u05dc\u05e2\u05d1\u05d8'] = { // from http://jidysz.net/ 
    'name': "Yiddish (Yidish Lebt)", 'keys': [
      [[";", "~"], ["1", "!", "\u05B2", "\u05B2"], ["2", "@", "\u05B3", "\u05B3"], ["3", "#", "\u05B1", "\u05B1"], ["4", "$", "\u05B4", "\u05B4"], ["5", "%", "\u05B5", "\u05B5"], ["6", "^", "\u05B7", "\u05B7"], ["7", "&", "\u05B8", "\u05B8"], ["8", "*", "\u05BB", "\u05BB"], ["9", ")", "\u05B6", "\u05B6"], ["0", "(", "\u05B0", "\u05B0"], ["-", "_", "\u05BF", "\u05BF"], ["=", "+", "\u05B9", "\u05B9"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["/", "", "\u05F4", "\u05F4"], ["'", "", "\u05F3", "\u05F3"], ["\u05E7", "", "\u20AC"], ["\u05E8"], ["\u05D0", "", "\u05D0\u05B7", "\uFB2E"], ["\u05D8", "", "\u05D0\u05B8", "\uFB2F"], ["\u05D5", "\u05D5\u05B9", "\u05D5\u05BC", "\uFB35"], ["\u05DF", "", "\u05D5\u05D5", "\u05F0"], ["\u05DD", "", "\u05BC"], ["\u05E4", "", "\u05E4\u05BC", "\uFB44"], ["]", "}", "\u201E", "\u201D"], ["[", "{", "\u201A", "\u2019"], ["\\", "|", "\u05BE", "\u05BE"]],
      [["Caps", "Caps"], ["\u05E9", "\u05E9\u05C1", "\u05E9\u05C2", "\uFB2B"], ["\u05D3", "", "\u20AA"], ["\u05D2", "\u201E"], ["\u05DB", "", "\u05DB\u05BC", "\uFB3B"], ["\u05E2", "", "", "\uFB20"], ["\u05D9", "", "\u05D9\u05B4", "\uFB1D"], ["\u05D7", "", "\u05F2\u05B7", "\uFB1F"], ["\u05DC", "\u05DC\u05B9", "\u05D5\u05D9", "\u05F1"], ["\u05DA", "", "", "\u05F2"], ["\u05E3", ":", "\u05E4\u05BF", "\uFB4E"], [",", '"', ";", "\u05B2"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u05D6", "", "\u2013", "\u2013"], ["\u05E1", "", "\u2014", "\u2014"], ["\u05D1", "\u05DC\u05B9", "\u05D1\u05BF", "\uFB4C"], ["\u05D4", "", "\u201D", "\u201C"], ["\u05E0", "", "\u059C", "\u059E"], ["\u05DE", "", "\u2019", "\u2018"], ["\u05E6", "", "\u05E9\u05C1", "\uFB2A"], ["\u05EA", ">", "\u05EA\u05BC", "\uFB4A"], ["\u05E5", "<"], [".", "?", "\u2026"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["Alt", "Alt"]]
    ], 'lang': ["yi"] };

  this.VKI_layout['\u4e2d\u6587\u6ce8\u97f3\u7b26\u53f7'] = {
    'name': "Chinese Bopomofo IME", 'keys': [
      [["\u20AC", "~"], ["\u3105", "!"], ["\u3109", "@"], ["\u02C7", "#"], ["\u02CB", "$"], ["\u3113", "%"], ["\u02CA", "^"], ["\u02D9", "&"], ["\u311A", "*"], ["\u311E", ")"], ["\u3122", "("], ["\u3126", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u3106", "q"], ["\u310A", "w"], ["\u310D", "e"], ["\u3110", "r"], ["\u3114", "t"], ["\u3117", "y"], ["\u3127", "u"], ["\u311B", "i"], ["\u311F", "o"], ["\u3123", "p"], ["[", "{"], ["]", "}"], ["\\", "|"]],
      [["Caps", "Caps"], ["\u3107", "a"], ["\u310B", "s"], ["\u310E", "d"], ["\u3111", "f"], ["\u3115", "g"], ["\u3118", "h"], ["\u3128", "j"], ["\u311C", "k"], ["\u3120", "l"], ["\u3124", ":"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u3108", "z"], ["\u310C", "x"], ["\u310F", "c"], ["\u3112", "v"], ["\u3116", "b"], ["\u3119", "n"], ["\u3129", "m"], ["\u311D", "<"], ["\u3121", ">"], ["\u3125", "?"], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["zh-Bopo"] };

  this.VKI_layout['\u4e2d\u6587\u4ed3\u9889\u8f93\u5165\u6cd5'] = {
    'name': "Chinese Cangjie IME", 'keys': [
      [["\u20AC", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", ")"], ["0", "("], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u624B", "q"], ["\u7530", "w"], ["\u6C34", "e"], ["\u53E3", "r"], ["\u5EFF", "t"], ["\u535C", "y"], ["\u5C71", "u"], ["\u6208", "i"], ["\u4EBA", "o"], ["\u5FC3", "p"], ["[", "{"], ["]", "}"], ["\\", "|"]],
      [["Caps", "Caps"], ["\u65E5", "a"], ["\u5C38", "s"], ["\u6728", "d"], ["\u706B", "f"], ["\u571F", "g"], ["\u7AF9", "h"], ["\u5341", "j"], ["\u5927", "k"], ["\u4E2D", "l"], [";", ":"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\uFF3A", "z"], ["\u96E3", "x"], ["\u91D1", "c"], ["\u5973", "v"], ["\u6708", "b"], ["\u5F13", "n"], ["\u4E00", "m"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " "]]
    ], 'lang': ["zh"] };


  /* ***** Define Dead Keys ************************************** */
  this.VKI_deadkey = {};

  // - Lay out each dead key set as an object of property/value
  //   pairs.  The rows below are wrapped so uppercase letters are
  //   below their lowercase equivalents.
  //
  // - The property name is the letter pressed after the diacritic.
  //   The property value is the letter this key-combo will generate.
  //
  // - Note that if you have created a new keyboard layout and want
  //   it included in the distributed script, PLEASE TELL ME if you
  //   have added additional dead keys to the ones below.

  this.VKI_deadkey['"'] = this.VKI_deadkey['\u00a8'] = this.VKI_deadkey['\u309B'] = { // Umlaut / Diaeresis / Greek Dialytika / Hiragana/Katakana Voiced Sound Mark
    'a': "\u00e4", 'e': "\u00eb", 'i': "\u00ef", 'o': "\u00f6", 'u': "\u00fc", 'y': "\u00ff", '\u03b9': "\u03ca", '\u03c5': "\u03cb", '\u016B': "\u01D6", '\u00FA': "\u01D8", '\u01D4': "\u01DA", '\u00F9': "\u01DC",
    'A': "\u00c4", 'E': "\u00cb", 'I': "\u00cf", 'O': "\u00d6", 'U': "\u00dc", 'Y': "\u0178", '\u0399': "\u03aa", '\u03a5': "\u03ab", '\u016A': "\u01D5", '\u00DA': "\u01D7", '\u01D3': "\u01D9", '\u00D9': "\u01DB",
    '\u304b': "\u304c", '\u304d': "\u304e", '\u304f': "\u3050", '\u3051': "\u3052", '\u3053': "\u3054", '\u305f': "\u3060", '\u3061': "\u3062", '\u3064': "\u3065", '\u3066': "\u3067", '\u3068': "\u3069",
    '\u3055': "\u3056", '\u3057': "\u3058", '\u3059': "\u305a", '\u305b': "\u305c", '\u305d': "\u305e", '\u306f': "\u3070", '\u3072': "\u3073", '\u3075': "\u3076", '\u3078': "\u3079", '\u307b': "\u307c",
    '\u30ab': "\u30ac", '\u30ad': "\u30ae", '\u30af': "\u30b0", '\u30b1': "\u30b2", '\u30b3': "\u30b4", '\u30bf': "\u30c0", '\u30c1': "\u30c2", '\u30c4': "\u30c5", '\u30c6': "\u30c7", '\u30c8': "\u30c9",
    '\u30b5': "\u30b6", '\u30b7': "\u30b8", '\u30b9': "\u30ba", '\u30bb': "\u30bc", '\u30bd': "\u30be", '\u30cf': "\u30d0", '\u30d2': "\u30d3", '\u30d5': "\u30d6", '\u30d8': "\u30d9", '\u30db': "\u30dc"
  };
  this.VKI_deadkey['~'] = { // Tilde / Stroke
    'a': "\u00e3", 'l': "\u0142", 'n': "\u00f1", 'o': "\u00f5",
    'A': "\u00c3", 'L': "\u0141", 'N': "\u00d1", 'O': "\u00d5"
  };
  this.VKI_deadkey['^'] = { // Circumflex
    'a': "\u00e2", 'e': "\u00ea", 'i': "\u00ee", 'o': "\u00f4", 'u': "\u00fb", 'w': "\u0175", 'y': "\u0177",
    'A': "\u00c2", 'E': "\u00ca", 'I': "\u00ce", 'O': "\u00d4", 'U': "\u00db", 'W': "\u0174", 'Y': "\u0176"
  };
  this.VKI_deadkey['\u02c7'] = { // Baltic caron
    'c': "\u010D", 'd': "\u010f", 'e': "\u011b", 's': "\u0161", 'l': "\u013e", 'n': "\u0148", 'r': "\u0159", 't': "\u0165", 'u': "\u01d4", 'z': "\u017E", '\u00fc': "\u01da",
    'C': "\u010C", 'D': "\u010e", 'E': "\u011a", 'S': "\u0160", 'L': "\u013d", 'N': "\u0147", 'R': "\u0158", 'T': "\u0164", 'U': "\u01d3", 'Z': "\u017D", '\u00dc': "\u01d9"
  };
  this.VKI_deadkey['\u02d8'] = { // Romanian and Turkish breve
    'a': "\u0103", 'g': "\u011f",
    'A': "\u0102", 'G': "\u011e"
  };
  this.VKI_deadkey['-'] = this.VKI_deadkey['\u00af'] = { // Macron
    'a': "\u0101", 'e': "\u0113", 'i': "\u012b", 'o': "\u014d", 'u': "\u016B", 'y': "\u0233", '\u00fc': "\u01d6",
    'A': "\u0100", 'E': "\u0112", 'I': "\u012a", 'O': "\u014c", 'U': "\u016A", 'Y': "\u0232", '\u00dc': "\u01d5"
  };
  this.VKI_deadkey['`'] = { // Grave
    'a': "\u00e0", 'e': "\u00e8", 'i': "\u00ec", 'o': "\u00f2", 'u': "\u00f9", '\u00fc': "\u01dc",
    'A': "\u00c0", 'E': "\u00c8", 'I': "\u00cc", 'O': "\u00d2", 'U': "\u00d9", '\u00dc': "\u01db"
  };
  this.VKI_deadkey["'"] = this.VKI_deadkey['\u00b4'] = this.VKI_deadkey['\u0384'] = { // Acute / Greek Tonos
    'a': "\u00e1", 'e': "\u00e9", 'i': "\u00ed", 'o': "\u00f3", 'u': "\u00fa", 'y': "\u00fd", '\u03b1': "\u03ac", '\u03b5': "\u03ad", '\u03b7': "\u03ae", '\u03b9': "\u03af", '\u03bf': "\u03cc", '\u03c5': "\u03cd", '\u03c9': "\u03ce", '\u00fc': "\u01d8",
    'A': "\u00c1", 'E': "\u00c9", 'I': "\u00cd", 'O': "\u00d3", 'U': "\u00da", 'Y': "\u00dd", '\u0391': "\u0386", '\u0395': "\u0388", '\u0397': "\u0389", '\u0399': "\u038a", '\u039f': "\u038c", '\u03a5': "\u038e", '\u03a9': "\u038f", '\u00dc': "\u01d7"
  };
  this.VKI_deadkey['\u02dd'] = { // Hungarian Double Acute Accent
    'o': "\u0151", 'u': "\u0171",
    'O': "\u0150", 'U': "\u0170"
  };
  this.VKI_deadkey['\u0385'] = { // Greek Dialytika + Tonos
    '\u03b9': "\u0390", '\u03c5': "\u03b0"
  };
  this.VKI_deadkey['\u00b0'] = this.VKI_deadkey['\u00ba'] = { // Ring
    'a': "\u00e5", 'u': "\u016f",
    'A': "\u00c5", 'U': "\u016e"
  };
  this.VKI_deadkey['\u02DB'] = { // Ogonek
    'a': "\u0106", 'e': "\u0119", 'i': "\u012f", 'o': "\u01eb", 'u': "\u0173", 'y': "\u0177",
    'A': "\u0105", 'E': "\u0118", 'I': "\u012e", 'O': "\u01ea", 'U': "\u0172", 'Y': "\u0176"
  };
  this.VKI_deadkey['\u02D9'] = { // Dot-above
    'c': "\u010B", 'e': "\u0117", 'g': "\u0121", 'z': "\u017C",
    'C': "\u010A", 'E': "\u0116", 'G': "\u0120", 'Z': "\u017B"
  };
  this.VKI_deadkey['\u00B8'] = this.VKI_deadkey['\u201a'] = { // Cedilla
    'c': "\u00e7", 's': "\u015F",
    'C': "\u00c7", 'S': "\u015E"
  };
  this.VKI_deadkey[','] = { // Comma
    's': (this.VKI_isIElt8) ? "\u015F" : "\u0219", 't': (this.VKI_isIElt8) ? "\u0163" : "\u021B",
    'S': (this.VKI_isIElt8) ? "\u015E" : "\u0218", 'T': (this.VKI_isIElt8) ? "\u0162" : "\u021A"
  };
  this.VKI_deadkey['\u3002'] = { // Hiragana/Katakana Point
    '\u306f': "\u3071", '\u3072': "\u3074", '\u3075': "\u3077", '\u3078': "\u307a", '\u307b': "\u307d",
    '\u30cf': "\u30d1", '\u30d2': "\u30d4", '\u30d5': "\u30d7", '\u30d8': "\u30da", '\u30db': "\u30dd"
  };


  /* ***** Define Symbols **************************************** */
  this.VKI_symbol = {
    '\u00a0': "NB\nSP", '\u200b': "ZW\nSP", '\u200c': "ZW\nNJ", '\u200d': "ZW\nJ"
  };


  /* ***** Layout Number Pad ************************************* */
  this.VKI_numpad = [
    [["$"], ["\u00a3"], ["\u20ac"], ["\u00a5"]],
    [["7"], ["8"], ["9"], ["/"]],
    [["4"], ["5"], ["6"], ["*"]],
    [["1"], ["2"], ["3"], ["-"]],
    [["0"], ["."], ["="], ["+"]]
  ];


  /* ****************************************************************
   * Attach the keyboard to an element
   *
   */
  VKI_attach = function(elem) {
    if (elem.getAttribute("VKI_attached")) return false;
    if (self.VKI_imageURI) {
      var keybut = document.createElement('img');
          keybut.src = self.VKI_imageURI;
          keybut.alt = self.VKI_i18n['01'];
          keybut.className = "keyboardInputInitiator";
          keybut.title = self.VKI_i18n['01'];
          keybut.elem = elem;
          keybut.onclick = function(e) {
            e = e || event;
            if (e.stopPropagation) { e.stopPropagation(); } else e.cancelBubble = true;
            self.VKI_show(this.elem);
          };
      elem.parentNode.insertBefore(keybut, (elem.dir == "rtl") ? elem : elem.nextSibling);
    } else {
      elem.onfocus = function() {
        if (self.VKI_target != this) {
          if (self.VKI_target) self.VKI_close();
          self.VKI_show(this);
        }
      };
      elem.onclick = function() {
        if (!self.VKI_target) self.VKI_show(this);
      }
    }
    elem.setAttribute("VKI_attached", 'true');
    if (self.VKI_isIE) {
      elem.onclick = elem.onselect = elem.onkeyup = function(e) {
        if ((e || event).type != "keyup" || !this.readOnly)
          this.range = document.selection.createRange();
      };
    }
    VKI_addListener(elem, 'click', function(e) {
      if (self.VKI_target == this) {
        e = e || event;
        if (e.stopPropagation) { e.stopPropagation(); } else e.cancelBubble = true;
      } return false;
    }, false);
    if (self.VKI_isMoz)
      elem.addEventListener('blur', function() { this.setAttribute('_scrollTop', this.scrollTop); }, false);
  };


  /* ***** Find tagged input & textarea elements ***************** */
  function VKI_buildKeyboardInputs() {
    var inputElems = [
      document.getElementsByTagName('input'),
      document.getElementsByTagName('textarea')
    ];
    for (var x = 0, elem; elem = inputElems[x++];)
      for (var y = 0, ex; ex = elem[y++];)
        if (ex.nodeName == "TEXTAREA" || ex.type == "text" || ex.type == "password")
				  if (ex.className.indexOf("keyboardInput") > -1) VKI_attach(ex);

    VKI_addListener(document.documentElement, 'click', function(e) { self.VKI_close(); }, false);
  }


  /* ****************************************************************
   * Common mouse event actions
   *
   */
  function VKI_mouseEvents(elem) {
    if (elem.nodeName == "TD") {
      if (!elem.click) elem.click = function() {
        var evt = this.ownerDocument.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        this.dispatchEvent(evt);
      };
      elem.VKI_clickless = 0;
      VKI_addListener(elem, 'dblclick', function() { return false; }, false);
    }
    VKI_addListener(elem, 'mouseover', function() {
      if (this.nodeName == "TD" && self.VKI_clickless) {
        var _self = this;
        clearTimeout(this.VKI_clickless);
        this.VKI_clickless = setTimeout(function() { _self.click(); }, self.VKI_clickless);
      }
      if (self.VKI_isIE) this.className += " hover";
    }, false);
    VKI_addListener(elem, 'mouseout', function() {
      if (this.nodeName == "TD") clearTimeout(this.VKI_clickless);
      if (self.VKI_isIE) this.className = this.className.replace(/ ?(hover|pressed) ?/g, "");
    }, false);
    VKI_addListener(elem, 'mousedown', function() {
      if (this.nodeName == "TD") clearTimeout(this.VKI_clickless);
      if (self.VKI_isIE) this.className += " pressed";
    }, false);
    VKI_addListener(elem, 'mouseup', function() {
      if (this.nodeName == "TD") clearTimeout(this.VKI_clickless);
      if (self.VKI_isIE) this.className = this.className.replace(/ ?pressed ?/g, "");
    }, false);
  }


  /* ***** Build the keyboard interface ************************** */
  this.VKI_keyboard = document.createElement('table');
  this.VKI_keyboard.id = "keyboardInputMaster";
  this.VKI_keyboard.dir = "ltr";
  this.VKI_keyboard.cellSpacing = "0";
  this.VKI_keyboard.reflow = function() {
    this.style.width = "50px";
    var foo = this.offsetWidth;
    this.style.width = "";
  };
  VKI_addListener(this.VKI_keyboard, 'click', function(e) {
    e = e || event;
    if (e.stopPropagation) { e.stopPropagation(); } else e.cancelBubble = true;
    return false;
  }, false);

  if (!this.VKI_layout[this.VKI_kt])
    return alert('No keyboard named "' + this.VKI_kt + '"');

  this.VKI_langCode = {};
  var thead = document.createElement('thead');
    var tr = document.createElement('tr');
      var th = document.createElement('th');
          th.colSpan = "2";

        var kbSelect = document.createElement('div');
            kbSelect.title = this.VKI_i18n['02'];
          VKI_addListener(kbSelect, 'click', function() {
            var ol = this.getElementsByTagName('ol')[0];
            if (!ol.style.display) {
                ol.style.display = "block";
              var li = ol.getElementsByTagName('li');
              for (var x = 0, scr = 0; x < li.length; x++) {
                if (VKI_kt == li[x].firstChild.nodeValue) {
                  li[x].className = "selected";
                  scr = li[x].offsetTop - li[x].offsetHeight * 2;
                } else li[x].className = "";
              } setTimeout(function() { ol.scrollTop = scr; }, 0);
            } else ol.style.display = "";
          }, false);
            kbSelect.appendChild(document.createTextNode(this.VKI_kt));
            kbSelect.appendChild(document.createTextNode(this.VKI_isIElt8 ? " \u2193" : " \u25be"));
            kbSelect.langCount = 0;
          var ol = document.createElement('ol');
            for (ktype in this.VKI_layout) {
              if (typeof this.VKI_layout[ktype] == "object") {
                if (!this.VKI_layout[ktype].lang) this.VKI_layout[ktype].lang = [];
                for (var x = 0; x < this.VKI_layout[ktype].lang.length; x++)
                  this.VKI_langCode[this.VKI_layout[ktype].lang[x].toLowerCase().replace(/-/g, "_")] = ktype;
                var li = document.createElement('li');
                    li.title = this.VKI_layout[ktype].name;
                  VKI_addListener(li, 'click', function(e) {
                    e = e || event;
                    if (e.stopPropagation) { e.stopPropagation(); } else e.cancelBubble = true;
                    this.parentNode.style.display = "";
                    self.VKI_kts = self.VKI_kt = kbSelect.firstChild.nodeValue = this.firstChild.nodeValue;
                    self.VKI_buildKeys();
                    self.VKI_position(true);
                  }, false);
                  VKI_mouseEvents(li);
                    li.appendChild(document.createTextNode(ktype));
                  ol.appendChild(li);
                kbSelect.langCount++;
              }
            } kbSelect.appendChild(ol);
          if (kbSelect.langCount > 1) th.appendChild(kbSelect);
        this.VKI_langCode.index = [];
        for (prop in this.VKI_langCode)
          if (prop != "index" && typeof this.VKI_langCode[prop] == "string")
            this.VKI_langCode.index.push(prop);
        this.VKI_langCode.index.sort();
        this.VKI_langCode.index.reverse();

        if (this.VKI_numberPad) {
          var span = document.createElement('span');
              span.appendChild(document.createTextNode("#"));
              span.title = this.VKI_i18n['00'];
            VKI_addListener(span, 'click', function() {
              kbNumpad.style.display = (!kbNumpad.style.display) ? "none" : "";
              self.VKI_position(true);
            }, false);
            VKI_mouseEvents(span);
            th.appendChild(span);
        }

        this.VKI_kbsize = function(e) {
          self.VKI_size = Math.min(5, Math.max(1, self.VKI_size));
          self.VKI_keyboard.className = self.VKI_keyboard.className.replace(/ ?keyboardInputSize\d ?/, "");
          if (self.VKI_size != 2) self.VKI_keyboard.className += " keyboardInputSize" + self.VKI_size;
          self.VKI_position(true);
          if (self.VKI_isOpera) self.VKI_keyboard.reflow();
        };
        if (this.VKI_sizeAdj) {
          var small = document.createElement('small');
              small.title = this.VKI_i18n['10'];
            VKI_addListener(small, 'click', function() {
              --self.VKI_size;
              self.VKI_kbsize();
            }, false);
            VKI_mouseEvents(small);
              small.appendChild(document.createTextNode(this.VKI_isIElt8 ? "\u2193" : "\u21d3"));
            th.appendChild(small);
          var big = document.createElement('big');
              big.title = this.VKI_i18n['11'];
            VKI_addListener(big, 'click', function() {
              ++self.VKI_size;
              self.VKI_kbsize();
            }, false);
            VKI_mouseEvents(big);
              big.appendChild(document.createTextNode(this.VKI_isIElt8 ? "\u2191" : "\u21d1"));
            th.appendChild(big);
        }

        var span = document.createElement('span');
            span.appendChild(document.createTextNode(this.VKI_i18n['07']));
            span.title = this.VKI_i18n['08'];
          VKI_addListener(span, 'click', function() {
            self.VKI_target.value = "";
            self.VKI_target.focus();
            return false;
          }, false);
          VKI_mouseEvents(span);
          th.appendChild(span);

        var strong = document.createElement('strong');
            strong.appendChild(document.createTextNode('X'));
            strong.title = this.VKI_i18n['06'];
          VKI_addListener(strong, 'click', function() { self.VKI_close(); }, false);
          VKI_mouseEvents(strong);
          th.appendChild(strong);

        tr.appendChild(th);
      thead.appendChild(tr);
  this.VKI_keyboard.appendChild(thead);

  var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
      var td = document.createElement('td');
        var div = document.createElement('div');

        if (this.VKI_deadBox) {
          var label = document.createElement('label');
            var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.title = this.VKI_i18n['03'] + ": " + ((this.VKI_deadkeysOn) ? this.VKI_i18n['04'] : this.VKI_i18n['05']);
                checkbox.defaultChecked = this.VKI_deadkeysOn;
              VKI_addListener(checkbox, 'click', function() {
                this.title = self.VKI_i18n['03'] + ": " + ((this.checked) ? self.VKI_i18n['04'] : self.VKI_i18n['05']);
                self.VKI_modify("");
                return true;
              }, false);
              label.appendChild(checkbox);
                checkbox.checked = this.VKI_deadkeysOn;
            div.appendChild(label);
          this.VKI_deadkeysOn = checkbox;
        } else this.VKI_deadkeysOn.checked = this.VKI_deadkeysOn;

        if (this.VKI_showVersion) {
          var vr = document.createElement('var');
              vr.title = this.VKI_i18n['09'] + " " + this.VKI_version;
              vr.appendChild(document.createTextNode("v" + this.VKI_version));
            div.appendChild(vr);
        } td.appendChild(div);
        tr.appendChild(td);

      var kbNumpad = document.createElement('td');
          kbNumpad.id = "keyboardInputNumpad";
        if (!this.VKI_numberPadOn) kbNumpad.style.display = "none";
        var ntable = document.createElement('table');
            ntable.cellSpacing = "0";
          var ntbody = document.createElement('tbody');
            for (var x = 0; x < this.VKI_numpad.length; x++) {
              var ntr = document.createElement('tr');
                for (var y = 0; y < this.VKI_numpad[x].length; y++) {
                  var ntd = document.createElement('td');
                    VKI_addListener(ntd, 'click', VKI_keyClick, false);
                    VKI_mouseEvents(ntd);
                      ntd.appendChild(document.createTextNode(this.VKI_numpad[x][y]));
                    ntr.appendChild(ntd);
                } ntbody.appendChild(ntr);
            } ntable.appendChild(ntbody);
          kbNumpad.appendChild(ntable);
        tr.appendChild(kbNumpad);
      tbody.appendChild(tr);
  this.VKI_keyboard.appendChild(tbody);

  if (this.VKI_isIE6) {
    this.VKI_iframe = document.createElement('iframe');
    this.VKI_iframe.style.position = "absolute";
    this.VKI_iframe.style.border = "0px none";
    this.VKI_iframe.style.filter = "mask()";
    this.VKI_iframe.style.zIndex = "999999";
    this.VKI_iframe.src = this.VKI_imageURI;
  }


  /* ****************************************************************
   * Private table cell attachment function for generic characters
   *
   */
  function VKI_keyClick() {
    var done = false, character = "\xa0";
    if (this.firstChild.nodeName.toLowerCase() != "small") {
      if ((character = this.firstChild.nodeValue) == "\xa0") return false;
    } else character = this.firstChild.getAttribute('char');
    if (self.VKI_deadkeysOn.checked && self.VKI_dead) {
      if (self.VKI_dead != character) {
        if (character != " ") {
          if (self.VKI_deadkey[self.VKI_dead][character]) {
            self.VKI_insert(self.VKI_deadkey[self.VKI_dead][character]);
            done = true;
          }
        } else {
          self.VKI_insert(self.VKI_dead);
          done = true;
        }
      } else done = true;
    } self.VKI_dead = false;

    if (!done) {
      if (self.VKI_deadkeysOn.checked && self.VKI_deadkey[character]) {
        self.VKI_dead = character;
        this.className += " dead";
        if (self.VKI_shift) self.VKI_modify("Shift");
        if (self.VKI_altgr) self.VKI_modify("AltGr");
      } else self.VKI_insert(character);
    } self.VKI_modify("");
    return false;
  }


  /* ****************************************************************
   * Build or rebuild the keyboard keys
   *
   */
  this.VKI_buildKeys = function() {
    this.VKI_shift = this.VKI_shiftlock = this.VKI_altgr = this.VKI_altgrlock = this.VKI_dead = false;
    var container = this.VKI_keyboard.tBodies[0].getElementsByTagName('div')[0];
    var tables = container.getElementsByTagName('table');
    for (var x = tables.length - 1; x >= 0; x--) container.removeChild(tables[x]);

    for (var x = 0, hasDeadKey = false, lyt; lyt = this.VKI_layout[this.VKI_kt].keys[x++];) {
      var table = document.createElement('table');
          table.cellSpacing = "0";
        if (lyt.length <= this.VKI_keyCenter) table.className = "keyboardInputCenter";
        var tbody = document.createElement('tbody');
          var tr = document.createElement('tr');
            for (var y = 0, lkey; lkey = lyt[y++];) {
              var td = document.createElement('td');
                if (this.VKI_symbol[lkey[0]]) {
                  var text = this.VKI_symbol[lkey[0]].split("\n");
                  var small = document.createElement('small');
                      small.setAttribute('char', lkey[0]);
                  for (var z = 0; z < text.length; z++) {
                    if (z) small.appendChild(document.createElement("br"));
                    small.appendChild(document.createTextNode(text[z]));
                  } td.appendChild(small);
                } else td.appendChild(document.createTextNode(lkey[0] || "\xa0"));

                var className = [];
                if (this.VKI_deadkeysOn.checked)
                  for (key in this.VKI_deadkey)
                    if (key === lkey[0]) { className.push("deadkey"); break; }
                if (lyt.length > this.VKI_keyCenter && y == lyt.length) className.push("last");
                if (lkey[0] == " " || lkey[1] == " ") className.push("space");
                  td.className = className.join(" ");

                switch (lkey[1]) {
                  case "Caps": case "Shift":
                  case "Alt": case "AltGr": case "AltLk":
                    VKI_addListener(td, 'click', (function(type) { return function() { self.VKI_modify(type); return false; }})(lkey[1]), false);
                    break;
                  case "Tab":
                    VKI_addListener(td, 'click', function() {
                      if (self.VKI_activeTab) {
                        if (self.VKI_target.form) {
                          var target = self.VKI_target, elems = target.form.elements;
                          self.VKI_close();
                          for (var z = 0, me = false, j = -1; z < elems.length; z++) {
                            if (j == -1 && elems[z].getAttribute("VKI_attached")) j = z;
                            if (me) {
                              if (self.VKI_activeTab == 1 && elems[z]) break;
                              if (elems[z].getAttribute("VKI_attached")) break;
                            } else if (elems[z] == target) me = true;
                          } if (z == elems.length) z = Math.max(j, 0);
                          if (elems[z].getAttribute("VKI_attached")) {
                            self.VKI_show(elems[z]);
                          } else elems[z].focus();
                        } else self.VKI_target.focus();
                      } else self.VKI_insert("\t");
                      return false;
                    }, false);
                    break;
                  case "Bksp":
                    VKI_addListener(td, 'click', function() {
                      self.VKI_target.focus();
                      if (self.VKI_target.setSelectionRange && !self.VKI_target.readOnly) {
                        var rng = [self.VKI_target.selectionStart, self.VKI_target.selectionEnd];
                        if (rng[0] < rng[1]) rng[0]++;
                        self.VKI_target.value = self.VKI_target.value.substr(0, rng[0] - 1) + self.VKI_target.value.substr(rng[1]);
                        self.VKI_target.setSelectionRange(rng[0] - 1, rng[0] - 1);
                      } else if (self.VKI_target.createTextRange && !self.VKI_target.readOnly) {
                        try {
                          self.VKI_target.range.select();
                        } catch(e) { self.VKI_target.range = document.selection.createRange(); }
                        if (!self.VKI_target.range.text.length) self.VKI_target.range.moveStart('character', -1);
                        self.VKI_target.range.text = "";
                      } else self.VKI_target.value = self.VKI_target.value.substr(0, self.VKI_target.value.length - 1);
                      if (self.VKI_shift) self.VKI_modify("Shift");
                      if (self.VKI_altgr) self.VKI_modify("AltGr");
                      self.VKI_target.focus();
                      return true;
                    }, false);
                    break;
                  case "Enter":
                    VKI_addListener(td, 'click', function() {
                      if (self.VKI_target.nodeName != "TEXTAREA") {
                        if (self.VKI_enterSubmit && self.VKI_target.form) {
                          for (var z = 0, subm = false; z < self.VKI_target.form.elements.length; z++)
                            if (self.VKI_target.form.elements[z].type == "submit") subm = true;
                          if (!subm) self.VKI_target.form.submit();
                        }
                        self.VKI_close();
                      } else self.VKI_insert("\n");
                      return true;
                    }, false);
                    break;
                  default:
                    VKI_addListener(td, 'click', VKI_keyClick, false);

                } VKI_mouseEvents(td);
                tr.appendChild(td);
              for (var z = 0; z < 4; z++)
                if (this.VKI_deadkey[lkey[z] = lkey[z] || ""]) hasDeadKey = true;
            } tbody.appendChild(tr);
          table.appendChild(tbody);
        container.appendChild(table);
    }
    if (this.VKI_deadBox)
      this.VKI_deadkeysOn.style.display = (hasDeadKey) ? "inline" : "none";
    if (this.VKI_isIE6) {
      this.VKI_iframe.style.width = this.VKI_keyboard.offsetWidth + "px";
      this.VKI_iframe.style.height = this.VKI_keyboard.offsetHeight + "px";
    }
  };

  this.VKI_buildKeys();
  VKI_addListener(this.VKI_keyboard, 'selectstart', function() { return false; }, false);
  this.VKI_keyboard.unselectable = "on";
  if (this.VKI_isOpera)
    VKI_addListener(this.VKI_keyboard, 'mousedown', function() { return false; }, false);


  /* ****************************************************************
   * Controls modifier keys
   *
   */
  this.VKI_modify = function(type) {
    switch (type) {
      case "Alt":
      case "AltGr": this.VKI_altgr = !this.VKI_altgr; break;
      case "AltLk": this.VKI_altgr = 0; this.VKI_altgrlock = !this.VKI_altgrlock; break;
      case "Caps": this.VKI_shift = 0; this.VKI_shiftlock = !this.VKI_shiftlock; break;
      case "Shift": this.VKI_shift = !this.VKI_shift; break;
    } var vchar = 0;
    if (!this.VKI_shift != !this.VKI_shiftlock) vchar += 1;
    if (!this.VKI_altgr != !this.VKI_altgrlock) vchar += 2;

    var tables = this.VKI_keyboard.tBodies[0].getElementsByTagName('div')[0].getElementsByTagName('table');
    for (var x = 0; x < tables.length; x++) {
      var tds = tables[x].getElementsByTagName('td');
      for (var y = 0; y < tds.length; y++) {
        var className = [], lkey = this.VKI_layout[this.VKI_kt].keys[x][y];

        switch (lkey[1]) {
          case "Alt":
          case "AltGr":
            if (this.VKI_altgr) className.push("pressed");
            break;
          case "AltLk":
            if (this.VKI_altgrlock) className.push("pressed");
            break;
          case "Shift":
            if (this.VKI_shift) className.push("pressed");
            break;
          case "Caps":
            if (this.VKI_shiftlock) className.push("pressed");
            break;
          case "Tab": case "Enter": case "Bksp": break;
          default:
            if (type) {
              tds[y].removeChild(tds[y].firstChild);
              if (this.VKI_symbol[lkey[vchar]]) {
                var text = this.VKI_symbol[lkey[vchar]].split("\n");
                var small = document.createElement('small');
                    small.setAttribute('char', lkey[vchar]);
                for (var z = 0; z < text.length; z++) {
                  if (z) small.appendChild(document.createElement("br"));
                  small.appendChild(document.createTextNode(text[z]));
                } tds[y].appendChild(small);
              } else tds[y].appendChild(document.createTextNode(lkey[vchar] || "\xa0"));
            }
            if (this.VKI_deadkeysOn.checked) {
              var character = tds[y].firstChild.nodeValue || tds[y].firstChild.className;
              if (this.VKI_dead) {
                if (character == this.VKI_dead) className.push("pressed");
                if (this.VKI_deadkey[this.VKI_dead][character]) className.push("target");
              }
              if (this.VKI_deadkey[character]) className.push("deadkey");
            }
        }

        if (y == tds.length - 1 && tds.length > this.VKI_keyCenter) className.push("last");
        if (lkey[0] == " " || lkey[1] == " ") className.push("space");
        tds[y].className = className.join(" ");
      }
    }
  };


  /* ****************************************************************
   * Insert text at the cursor
   *
   */
  this.VKI_insert = function(text) {
    this.VKI_target.focus();
    if (this.VKI_target.maxLength) this.VKI_target.maxlength = this.VKI_target.maxLength;
    if (typeof this.VKI_target.maxlength == "undefined" ||
        this.VKI_target.maxlength < 0 ||
        this.VKI_target.value.length < this.VKI_target.maxlength) {
      if (this.VKI_target.setSelectionRange && !this.VKI_target.readOnly && !this.VKI_isIE) {
        var rng = [this.VKI_target.selectionStart, this.VKI_target.selectionEnd];
        this.VKI_target.value = this.VKI_target.value.substr(0, rng[0]) + text + this.VKI_target.value.substr(rng[1]);
        if (text == "\n" && this.VKI_isOpera) rng[0]++;
        this.VKI_target.setSelectionRange(rng[0] + text.length, rng[0] + text.length);
      } else if (this.VKI_target.createTextRange && !this.VKI_target.readOnly) {
        try {
          this.VKI_target.range.select();
        } catch(e) { this.VKI_target.range = document.selection.createRange(); }
        this.VKI_target.range.text = text;
        this.VKI_target.range.collapse(true);
        this.VKI_target.range.select();
      } else this.VKI_target.value += text;
      if (this.VKI_shift) this.VKI_modify("Shift");
      if (this.VKI_altgr) this.VKI_modify("AltGr");
      this.VKI_target.focus();
    } else if (this.VKI_target.createTextRange && this.VKI_target.range)
      this.VKI_target.range.select();
  };


  /* ****************************************************************
   * Show the keyboard interface
   *
   */
  this.VKI_show = function(elem) {
    if (!this.VKI_target) {
      this.VKI_target = elem;
      if (this.VKI_langAdapt && this.VKI_target.lang) {
        var chg = false, sub = [], lang = this.VKI_target.lang.toLowerCase().replace(/-/g, "_");
        for (var x = 0, chg = false; !chg && x < this.VKI_langCode.index.length; x++)
          if (lang.indexOf(this.VKI_langCode.index[x]) == 0)
            chg = kbSelect.firstChild.nodeValue = this.VKI_kt = this.VKI_langCode[this.VKI_langCode.index[x]];
        if (chg) this.VKI_buildKeys();
      }
      if (this.VKI_isIE) {
        if (!this.VKI_target.range) {
          this.VKI_target.range = this.VKI_target.createTextRange();
          this.VKI_target.range.moveStart('character', this.VKI_target.value.length);
        } this.VKI_target.range.select();
      }
      try { this.VKI_keyboard.parentNode.removeChild(this.VKI_keyboard); } catch (e) {}
      if (this.VKI_clearPasswords && this.VKI_target.type == "password") this.VKI_target.value = "";

      var elem = this.VKI_target;
      this.VKI_target.keyboardPosition = "absolute";
      do {
        if (VKI_getStyle(elem, "position") == "fixed") {
          this.VKI_target.keyboardPosition = "fixed";
          break;
        }
      } while (elem = elem.offsetParent);

      if (this.VKI_isIE6) document.body.appendChild(this.VKI_iframe);
      document.body.appendChild(this.VKI_keyboard);
      this.VKI_keyboard.style.position = this.VKI_target.keyboardPosition;
      if (this.VKI_isOpera) this.VKI_keyboard.reflow();

      this.VKI_position(true);
      if (self.VKI_isMoz || self.VKI_isWebKit) this.VKI_position(true);
      this.VKI_target.blur();
      this.VKI_target.focus();
    } else this.VKI_close();
  };


  /* ****************************************************************
   * Position the keyboard
   *
   */
  this.VKI_position = function(force) {
    if (self.VKI_target) {
      var kPos = VKI_findPos(self.VKI_keyboard), wDim = VKI_innerDimensions(), sDis = VKI_scrollDist();
      var place = false, fudge = self.VKI_target.offsetHeight + 3;
      if (force !== true) {
        if (kPos[1] + self.VKI_keyboard.offsetHeight - sDis[1] - wDim[1] > 0) {
          place = true;
          fudge = -self.VKI_keyboard.offsetHeight - 3;
        } else if (kPos[1] - sDis[1] < 0) place = true;
      }
      if (place || force === true) {
        var iPos = VKI_findPos(self.VKI_target), scr = self.VKI_target;
        while (scr = scr.parentNode) {
          if (scr == document.body) break;
          if (scr.scrollHeight > scr.offsetHeight || scr.scrollWidth > scr.offsetWidth) {
            if (!scr.getAttribute("VKI_scrollListener")) {
              scr.setAttribute("VKI_scrollListener", true);
              VKI_addListener(scr, 'scroll', function() { self.VKI_position(true); }, false);
            } // Check if the input is in view
            var pPos = VKI_findPos(scr), oTop = iPos[1] - pPos[1], oLeft = iPos[0] - pPos[0];
            var top = oTop + self.VKI_target.offsetHeight;
            var left = oLeft + self.VKI_target.offsetWidth;
            var bottom = scr.offsetHeight - oTop - self.VKI_target.offsetHeight;
            var right = scr.offsetWidth - oLeft - self.VKI_target.offsetWidth;
            self.VKI_keyboard.style.display = (top < 0 || left < 0 || bottom < 0 || right < 0) ? "none" : "";
            if (self.VKI_isIE6) self.VKI_iframe.style.display = (top < 0 || left < 0 || bottom < 0 || right < 0) ? "none" : "";
          }
        }
        self.VKI_keyboard.style.top = iPos[1] - ((self.VKI_target.keyboardPosition == "fixed" && !self.VKI_isIE && !self.VKI_isMoz) ? sDis[1] : 0) + fudge + "px";
        self.VKI_keyboard.style.left = Math.max(10, Math.min(wDim[0] - self.VKI_keyboard.offsetWidth - 25, iPos[0])) + "px";
        if (self.VKI_isIE6) {
          self.VKI_iframe.style.width = self.VKI_keyboard.offsetWidth + "px";
          self.VKI_iframe.style.height = self.VKI_keyboard.offsetHeight + "px";
          self.VKI_iframe.style.top = self.VKI_keyboard.style.top;
          self.VKI_iframe.style.left = self.VKI_keyboard.style.left;
        }
      }
      if (force === true) self.VKI_position();
    }
  };


  /* ****************************************************************
   * Close the keyboard interface
   *
   */
  this.VKI_close = VKI_close = function() {
    if (this.VKI_target) {
      try {
        this.VKI_keyboard.parentNode.removeChild(this.VKI_keyboard);
        if (this.VKI_isIE6) this.VKI_iframe.parentNode.removeChild(this.VKI_iframe);
      } catch (e) {}
      if (this.VKI_kt != this.VKI_kts) {
        kbSelect.firstChild.nodeValue = this.VKI_kt = this.VKI_kts;
        this.VKI_buildKeys();
      } kbSelect.getElementsByTagName('ol')[0].style.display = "";;
      this.VKI_target.focus();
      if (this.VKI_isIE) {
        setTimeout(function() { self.VKI_target = false; }, 0);
      } else this.VKI_target = false;
    }
  };


  /* ***** Private functions *************************************** */
  function VKI_addListener(elem, type, func, cap) {
    if (elem.addEventListener) {
      elem.addEventListener(type, function(e) { func.call(elem, e); }, cap);
    } else if (elem.attachEvent)
      elem.attachEvent('on' + type, function() { func.call(elem); });
  }

  function VKI_findPos(obj) {
    var curleft = curtop = 0, scr = obj;
    while ((scr = scr.parentNode) && scr != document.body) {
      curleft -= scr.scrollLeft || 0;
      curtop -= scr.scrollTop || 0;
    }
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return [curleft, curtop];
  }

  function VKI_innerDimensions() {
    if (self.innerHeight) {
      return [self.innerWidth, self.innerHeight];
    } else if (document.documentElement && document.documentElement.clientHeight) {
      return [document.documentElement.clientWidth, document.documentElement.clientHeight];
    } else if (document.body)
      return [document.body.clientWidth, document.body.clientHeight];
    return [0, 0];
  }

  function VKI_scrollDist() {
    var html = document.getElementsByTagName('html')[0];
    if (html.scrollTop && document.documentElement.scrollTop) {
      return [html.scrollLeft, html.scrollTop];
    } else if (html.scrollTop || document.documentElement.scrollTop) {
      return [html.scrollLeft + document.documentElement.scrollLeft, html.scrollTop + document.documentElement.scrollTop];
    } else if (document.body.scrollTop)
      return [document.body.scrollLeft, document.body.scrollTop];
    return [0, 0];
  }

  function VKI_getStyle(obj, styleProp) {
    if (obj.currentStyle) {
      var y = obj.currentStyle[styleProp];
    } else if (window.getComputedStyle)
      var y = window.getComputedStyle(obj, null)[styleProp];
    return y;
  }


  VKI_addListener(window, 'resize', this.VKI_position, false);
  VKI_addListener(window, 'scroll', this.VKI_position, false);
  this.VKI_kbsize();
  VKI_addListener(window, 'load', VKI_buildKeyboardInputs, false);
  // VKI_addListener(window, 'load', function() {
  //   setTimeout(VKI_buildKeyboardInputs, 5);
  // }, false);
})();
/*
  html2canvas 0.4.1 <http://html2canvas.hertzen.com>
  Copyright (c) 2013 Niklas von Hertzen

  Released under MIT License
*/

(function(window, document, undefined){

"use strict";

var _html2canvas = {},
previousElement,
computedCSS,
html2canvas;

_html2canvas.Util = {};

_html2canvas.Util.log = function(a) {
  if (_html2canvas.logging && window.console && window.console.log) {
    window.console.log(a);
  }
};

_html2canvas.Util.trimText = (function(isNative){
  return function(input) {
    return isNative ? isNative.apply(input) : ((input || '') + '').replace( /^\s+|\s+$/g , '' );
  };
})(String.prototype.trim);

_html2canvas.Util.asFloat = function(v) {
  return parseFloat(v);
};

(function() {
  // TODO: support all possible length values
  var TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
  var TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
  _html2canvas.Util.parseTextShadows = function (value) {
    if (!value || value === 'none') {
      return [];
    }

    // find multiple shadow declarations
    var shadows = value.match(TEXT_SHADOW_PROPERTY),
      results = [];
    for (var i = 0; shadows && (i < shadows.length); i++) {
      var s = shadows[i].match(TEXT_SHADOW_VALUES);
      results.push({
        color: s[0],
        offsetX: s[1] ? s[1].replace('px', '') : 0,
        offsetY: s[2] ? s[2].replace('px', '') : 0,
        blur: s[3] ? s[3].replace('px', '') : 0
      });
    }
    return results;
  };
})();


_html2canvas.Util.parseBackgroundImage = function (value) {
    var whitespace = ' \r\n\t',
        method, definition, prefix, prefix_i, block, results = [],
        c, mode = 0, numParen = 0, quote, args;

    var appendResult = function(){
        if(method) {
            if(definition.substr( 0, 1 ) === '"') {
                definition = definition.substr( 1, definition.length - 2 );
            }
            if(definition) {
                args.push(definition);
            }
            if(method.substr( 0, 1 ) === '-' &&
                    (prefix_i = method.indexOf( '-', 1 ) + 1) > 0) {
                prefix = method.substr( 0, prefix_i);
                method = method.substr( prefix_i );
            }
            results.push({
                prefix: prefix,
                method: method.toLowerCase(),
                value: block,
                args: args
            });
        }
        args = []; //for some odd reason, setting .length = 0 didn't work in safari
        method =
            prefix =
            definition =
            block = '';
    };

    appendResult();
    for(var i = 0, ii = value.length; i<ii; i++) {
        c = value[i];
        if(mode === 0 && whitespace.indexOf( c ) > -1){
            continue;
        }
        switch(c) {
            case '"':
                if(!quote) {
                    quote = c;
                }
                else if(quote === c) {
                    quote = null;
                }
                break;

            case '(':
                if(quote) { break; }
                else if(mode === 0) {
                    mode = 1;
                    block += c;
                    continue;
                } else {
                    numParen++;
                }
                break;

            case ')':
                if(quote) { break; }
                else if(mode === 1) {
                    if(numParen === 0) {
                        mode = 0;
                        block += c;
                        appendResult();
                        continue;
                    } else {
                        numParen--;
                    }
                }
                break;

            case ',':
                if(quote) { break; }
                else if(mode === 0) {
                    appendResult();
                    continue;
                }
                else if (mode === 1) {
                    if(numParen === 0 && !method.match(/^url$/i)) {
                        args.push(definition);
                        definition = '';
                        block += c;
                        continue;
                    }
                }
                break;
        }

        block += c;
        if(mode === 0) { method += c; }
        else { definition += c; }
    }
    appendResult();

    return results;
};

_html2canvas.Util.Bounds = function (element) {
  var clientRect, bounds = {};

  if (element.getBoundingClientRect){
    clientRect = element.getBoundingClientRect();

    // TODO add scroll position to bounds, so no scrolling of window necessary
    bounds.top = clientRect.top;
    bounds.bottom = clientRect.bottom || (clientRect.top + clientRect.height);
    bounds.left = clientRect.left;

    bounds.width = element.offsetWidth;
    bounds.height = element.offsetHeight;
  }

  return bounds;
};

// TODO ideally, we'd want everything to go through this function instead of Util.Bounds,
// but would require further work to calculate the correct positions for elements with offsetParents
_html2canvas.Util.OffsetBounds = function (element) {
  var parent = element.offsetParent ? _html2canvas.Util.OffsetBounds(element.offsetParent) : {top: 0, left: 0};

  return {
    top: element.offsetTop + parent.top,
    bottom: element.offsetTop + element.offsetHeight + parent.top,
    left: element.offsetLeft + parent.left,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
};

function toPX(element, attribute, value ) {
    var rsLeft = element.runtimeStyle && element.runtimeStyle[attribute],
        left,
        style = element.style;

    // Check if we are not dealing with pixels, (Opera has issues with this)
    // Ported from jQuery css.js
    // From the awesome hack by Dean Edwards
    // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

    // If we're not dealing with a regular pixel number
    // but a number that has a weird ending, we need to convert it to pixels

    if ( !/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test( value ) && /^-?\d/.test(value) ) {
        // Remember the original values
        left = style.left;

        // Put in the new values to get a computed value out
        if (rsLeft) {
            element.runtimeStyle.left = element.currentStyle.left;
        }
        style.left = attribute === "fontSize" ? "1em" : (value || 0);
        value = style.pixelLeft + "px";

        // Revert the changed values
        style.left = left;
        if (rsLeft) {
            element.runtimeStyle.left = rsLeft;
        }
    }

    if (!/^(thin|medium|thick)$/i.test(value)) {
        return Math.round(parseFloat(value)) + "px";
    }

    return value;
}

function asInt(val) {
    return parseInt(val, 10);
}

function parseBackgroundSizePosition(value, element, attribute, index) {
    value = (value || '').split(',');
    value = value[index || 0] || value[0] || 'auto';
    value = _html2canvas.Util.trimText(value).split(' ');

    if(attribute === 'backgroundSize' && (!value[0] || value[0].match(/cover|contain|auto/))) {
        //these values will be handled in the parent function
    } else {
        value[0] = (value[0].indexOf( "%" ) === -1) ? toPX(element, attribute + "X", value[0]) : value[0];
        if(value[1] === undefined) {
            if(attribute === 'backgroundSize') {
                value[1] = 'auto';
                return value;
            } else {
                // IE 9 doesn't return double digit always
                value[1] = value[0];
            }
        }
        value[1] = (value[1].indexOf("%") === -1) ? toPX(element, attribute + "Y", value[1]) : value[1];
    }
    return value;
}

_html2canvas.Util.getCSS = function (element, attribute, index) {
    if (previousElement !== element) {
      computedCSS = document.defaultView.getComputedStyle(element, null);
    }

    var value = computedCSS[attribute];

    if (/^background(Size|Position)$/.test(attribute)) {
        return parseBackgroundSizePosition(value, element, attribute, index);
    } else if (/border(Top|Bottom)(Left|Right)Radius/.test(attribute)) {
      var arr = value.split(" ");
      if (arr.length <= 1) {
          arr[1] = arr[0];
      }
      return arr.map(asInt);
    }

  return value;
};

_html2canvas.Util.resizeBounds = function( current_width, current_height, target_width, target_height, stretch_mode ){
  var target_ratio = target_width / target_height,
    current_ratio = current_width / current_height,
    output_width, output_height;

  if(!stretch_mode || stretch_mode === 'auto') {
    output_width = target_width;
    output_height = target_height;
  } else if(target_ratio < current_ratio ^ stretch_mode === 'contain') {
    output_height = target_height;
    output_width = target_height * current_ratio;
  } else {
    output_width = target_width;
    output_height = target_width / current_ratio;
  }

  return {
    width: output_width,
    height: output_height
  };
};

function backgroundBoundsFactory( prop, el, bounds, image, imageIndex, backgroundSize ) {
    var bgposition =  _html2canvas.Util.getCSS( el, prop, imageIndex ) ,
    topPos,
    left,
    percentage,
    val;

    if (bgposition.length === 1){
      val = bgposition[0];

      bgposition = [];

      bgposition[0] = val;
      bgposition[1] = val;
    }

    if (bgposition[0].toString().indexOf("%") !== -1){
      percentage = (parseFloat(bgposition[0])/100);
      left = bounds.width * percentage;
      if(prop !== 'backgroundSize') {
        left -= (backgroundSize || image).width*percentage;
      }
    } else {
      if(prop === 'backgroundSize') {
        if(bgposition[0] === 'auto') {
          left = image.width;
        } else {
          if (/contain|cover/.test(bgposition[0])) {
            var resized = _html2canvas.Util.resizeBounds(image.width, image.height, bounds.width, bounds.height, bgposition[0]);
            left = resized.width;
            topPos = resized.height;
          } else {
            left = parseInt(bgposition[0], 10);
          }
        }
      } else {
        left = parseInt( bgposition[0], 10);
      }
    }


    if(bgposition[1] === 'auto') {
      topPos = left / image.width * image.height;
    } else if (bgposition[1].toString().indexOf("%") !== -1){
      percentage = (parseFloat(bgposition[1])/100);
      topPos =  bounds.height * percentage;
      if(prop !== 'backgroundSize') {
        topPos -= (backgroundSize || image).height * percentage;
      }

    } else {
      topPos = parseInt(bgposition[1],10);
    }

    return [left, topPos];
}

_html2canvas.Util.BackgroundPosition = function( el, bounds, image, imageIndex, backgroundSize ) {
    var result = backgroundBoundsFactory( 'backgroundPosition', el, bounds, image, imageIndex, backgroundSize );
    return { left: result[0], top: result[1] };
};

_html2canvas.Util.BackgroundSize = function( el, bounds, image, imageIndex ) {
    var result = backgroundBoundsFactory( 'backgroundSize', el, bounds, image, imageIndex );
    return { width: result[0], height: result[1] };
};

_html2canvas.Util.Extend = function (options, defaults) {
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      defaults[key] = options[key];
    }
  }
  return defaults;
};


/*
 * Derived from jQuery.contents()
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
_html2canvas.Util.Children = function( elem ) {
  var children;
  try {
    children = (elem.nodeName && elem.nodeName.toUpperCase() === "IFRAME") ? elem.contentDocument || elem.contentWindow.document : (function(array) {
      var ret = [];
      if (array !== null) {
        (function(first, second ) {
          var i = first.length,
          j = 0;

          if (typeof second.length === "number") {
            for (var l = second.length; j < l; j++) {
              first[i++] = second[j];
            }
          } else {
            while (second[j] !== undefined) {
              first[i++] = second[j++];
            }
          }

          first.length = i;

          return first;
        })(ret, array);
      }
      return ret;
    })(elem.childNodes);

  } catch (ex) {
    _html2canvas.Util.log("html2canvas.Util.Children failed with exception: " + ex.message);
    children = [];
  }
  return children;
};

_html2canvas.Util.isTransparent = function(backgroundColor) {
  return (backgroundColor === "transparent" || backgroundColor === "rgba(0, 0, 0, 0)");
};
_html2canvas.Util.Font = (function () {

  var fontData = {};

  return function(font, fontSize, doc) {
    if (fontData[font + "-" + fontSize] !== undefined) {
      return fontData[font + "-" + fontSize];
    }

    var container = doc.createElement('div'),
    img = doc.createElement('img'),
    span = doc.createElement('span'),
    sampleText = 'Hidden Text',
    baseline,
    middle,
    metricsObj;

    container.style.visibility = "hidden";
    container.style.fontFamily = font;
    container.style.fontSize = fontSize;
    container.style.margin = 0;
    container.style.padding = 0;

    doc.body.appendChild(container);

    // http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever (handtinywhite.gif)
    img.src = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=";
    img.width = 1;
    img.height = 1;

    img.style.margin = 0;
    img.style.padding = 0;
    img.style.verticalAlign = "baseline";

    span.style.fontFamily = font;
    span.style.fontSize = fontSize;
    span.style.margin = 0;
    span.style.padding = 0;

    span.appendChild(doc.createTextNode(sampleText));
    container.appendChild(span);
    container.appendChild(img);
    baseline = (img.offsetTop - span.offsetTop) + 1;

    container.removeChild(span);
    container.appendChild(doc.createTextNode(sampleText));

    container.style.lineHeight = "normal";
    img.style.verticalAlign = "super";

    middle = (img.offsetTop-container.offsetTop) + 1;
    metricsObj = {
      baseline: baseline,
      lineWidth: 1,
      middle: middle
    };

    fontData[font + "-" + fontSize] = metricsObj;

    doc.body.removeChild(container);

    return metricsObj;
  };
})();

(function(){
  var Util = _html2canvas.Util,
    Generate = {};

  _html2canvas.Generate = Generate;

  var reGradients = [
  /^(-webkit-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,
  /^(-o-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,
  /^(-webkit-gradient)\((linear|radial),\s((?:\d{1,3}%?)\s(?:\d{1,3}%?),\s(?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)\-]+)\)$/,
  /^(-moz-linear-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)]+)\)$/,
  /^(-webkit-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/,
  /^(-moz-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s?([a-z\-]*)([\w\d\.\s,%\(\)]+)\)$/,
  /^(-o-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/
  ];

  /*
 * TODO: Add IE10 vendor prefix (-ms) support
 * TODO: Add W3C gradient (linear-gradient) support
 * TODO: Add old Webkit -webkit-gradient(radial, ...) support
 * TODO: Maybe some RegExp optimizations are possible ;o)
 */
  Generate.parseGradient = function(css, bounds) {
    var gradient, i, len = reGradients.length, m1, stop, m2, m2Len, step, m3, tl,tr,br,bl;

    for(i = 0; i < len; i+=1){
      m1 = css.match(reGradients[i]);
      if(m1) {
        break;
      }
    }

    if(m1) {
      switch(m1[1]) {
        case '-webkit-linear-gradient':
        case '-o-linear-gradient':

          gradient = {
            type: 'linear',
            x0: null,
            y0: null,
            x1: null,
            y1: null,
            colorStops: []
          };

          // get coordinates
          m2 = m1[2].match(/\w+/g);
          if(m2){
            m2Len = m2.length;
            for(i = 0; i < m2Len; i+=1){
              switch(m2[i]) {
                case 'top':
                  gradient.y0 = 0;
                  gradient.y1 = bounds.height;
                  break;

                case 'right':
                  gradient.x0 = bounds.width;
                  gradient.x1 = 0;
                  break;

                case 'bottom':
                  gradient.y0 = bounds.height;
                  gradient.y1 = 0;
                  break;

                case 'left':
                  gradient.x0 = 0;
                  gradient.x1 = bounds.width;
                  break;
              }
            }
          }
          if(gradient.x0 === null && gradient.x1 === null){ // center
            gradient.x0 = gradient.x1 = bounds.width / 2;
          }
          if(gradient.y0 === null && gradient.y1 === null){ // center
            gradient.y0 = gradient.y1 = bounds.height / 2;
          }

          // get colors and stops
          m2 = m1[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g);
          if(m2){
            m2Len = m2.length;
            step = 1 / Math.max(m2Len - 1, 1);
            for(i = 0; i < m2Len; i+=1){
              m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/);
              if(m3[2]){
                stop = parseFloat(m3[2]);
                if(m3[3] === '%'){
                  stop /= 100;
                } else { // px - stupid opera
                  stop /= bounds.width;
                }
              } else {
                stop = i * step;
              }
              gradient.colorStops.push({
                color: m3[1],
                stop: stop
              });
            }
          }
          break;

        case '-webkit-gradient':

          gradient = {
            type: m1[2] === 'radial' ? 'circle' : m1[2], // TODO: Add radial gradient support for older mozilla definitions
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 0,
            colorStops: []
          };

          // get coordinates
          m2 = m1[3].match(/(\d{1,3})%?\s(\d{1,3})%?,\s(\d{1,3})%?\s(\d{1,3})%?/);
          if(m2){
            gradient.x0 = (m2[1] * bounds.width) / 100;
            gradient.y0 = (m2[2] * bounds.height) / 100;
            gradient.x1 = (m2[3] * bounds.width) / 100;
            gradient.y1 = (m2[4] * bounds.height) / 100;
          }

          // get colors and stops
          m2 = m1[4].match(/((?:from|to|color-stop)\((?:[0-9\.]+,\s)?(?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)\))+/g);
          if(m2){
            m2Len = m2.length;
            for(i = 0; i < m2Len; i+=1){
              m3 = m2[i].match(/(from|to|color-stop)\(([0-9\.]+)?(?:,\s)?((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\)/);
              stop = parseFloat(m3[2]);
              if(m3[1] === 'from') {
                stop = 0.0;
              }
              if(m3[1] === 'to') {
                stop = 1.0;
              }
              gradient.colorStops.push({
                color: m3[3],
                stop: stop
              });
            }
          }
          break;

        case '-moz-linear-gradient':

          gradient = {
            type: 'linear',
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 0,
            colorStops: []
          };

          // get coordinates
          m2 = m1[2].match(/(\d{1,3})%?\s(\d{1,3})%?/);

          // m2[1] == 0%   -> left
          // m2[1] == 50%  -> center
          // m2[1] == 100% -> right

          // m2[2] == 0%   -> top
          // m2[2] == 50%  -> center
          // m2[2] == 100% -> bottom

          if(m2){
            gradient.x0 = (m2[1] * bounds.width) / 100;
            gradient.y0 = (m2[2] * bounds.height) / 100;
            gradient.x1 = bounds.width - gradient.x0;
            gradient.y1 = bounds.height - gradient.y0;
          }

          // get colors and stops
          m2 = m1[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}%)?)+/g);
          if(m2){
            m2Len = m2.length;
            step = 1 / Math.max(m2Len - 1, 1);
            for(i = 0; i < m2Len; i+=1){
              m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%)?/);
              if(m3[2]){
                stop = parseFloat(m3[2]);
                if(m3[3]){ // percentage
                  stop /= 100;
                }
              } else {
                stop = i * step;
              }
              gradient.colorStops.push({
                color: m3[1],
                stop: stop
              });
            }
          }
          break;

        case '-webkit-radial-gradient':
        case '-moz-radial-gradient':
        case '-o-radial-gradient':

          gradient = {
            type: 'circle',
            x0: 0,
            y0: 0,
            x1: bounds.width,
            y1: bounds.height,
            cx: 0,
            cy: 0,
            rx: 0,
            ry: 0,
            colorStops: []
          };

          // center
          m2 = m1[2].match(/(\d{1,3})%?\s(\d{1,3})%?/);
          if(m2){
            gradient.cx = (m2[1] * bounds.width) / 100;
            gradient.cy = (m2[2] * bounds.height) / 100;
          }

          // size
          m2 = m1[3].match(/\w+/);
          m3 = m1[4].match(/[a-z\-]*/);
          if(m2 && m3){
            switch(m3[0]){
              case 'farthest-corner':
              case 'cover': // is equivalent to farthest-corner
              case '': // mozilla removes "cover" from definition :(
                tl = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.cy, 2));
                tr = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                br = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                bl = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.cy, 2));
                gradient.rx = gradient.ry = Math.max(tl, tr, br, bl);
                break;
              case 'closest-corner':
                tl = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.cy, 2));
                tr = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                br = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                bl = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.cy, 2));
                gradient.rx = gradient.ry = Math.min(tl, tr, br, bl);
                break;
              case 'farthest-side':
                if(m2[0] === 'circle'){
                  gradient.rx = gradient.ry = Math.max(
                    gradient.cx,
                    gradient.cy,
                    gradient.x1 - gradient.cx,
                    gradient.y1 - gradient.cy
                    );
                } else { // ellipse

                  gradient.type = m2[0];

                  gradient.rx = Math.max(
                    gradient.cx,
                    gradient.x1 - gradient.cx
                    );
                  gradient.ry = Math.max(
                    gradient.cy,
                    gradient.y1 - gradient.cy
                    );
                }
                break;
              case 'closest-side':
              case 'contain': // is equivalent to closest-side
                if(m2[0] === 'circle'){
                  gradient.rx = gradient.ry = Math.min(
                    gradient.cx,
                    gradient.cy,
                    gradient.x1 - gradient.cx,
                    gradient.y1 - gradient.cy
                    );
                } else { // ellipse

                  gradient.type = m2[0];

                  gradient.rx = Math.min(
                    gradient.cx,
                    gradient.x1 - gradient.cx
                    );
                  gradient.ry = Math.min(
                    gradient.cy,
                    gradient.y1 - gradient.cy
                    );
                }
                break;

            // TODO: add support for "30px 40px" sizes (webkit only)
            }
          }

          // color stops
          m2 = m1[5].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g);
          if(m2){
            m2Len = m2.length;
            step = 1 / Math.max(m2Len - 1, 1);
            for(i = 0; i < m2Len; i+=1){
              m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/);
              if(m3[2]){
                stop = parseFloat(m3[2]);
                if(m3[3] === '%'){
                  stop /= 100;
                } else { // px - stupid opera
                  stop /= bounds.width;
                }
              } else {
                stop = i * step;
              }
              gradient.colorStops.push({
                color: m3[1],
                stop: stop
              });
            }
          }
          break;
      }
    }

    return gradient;
  };

  function addScrollStops(grad) {
    return function(colorStop) {
      try {
        grad.addColorStop(colorStop.stop, colorStop.color);
      }
      catch(e) {
        Util.log(['failed to add color stop: ', e, '; tried to add: ', colorStop]);
      }
    };
  }

  Generate.Gradient = function(src, bounds) {
    if(bounds.width === 0 || bounds.height === 0) {
      return;
    }

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    gradient, grad;

    canvas.width = bounds.width;
    canvas.height = bounds.height;

    // TODO: add support for multi defined background gradients
    gradient = _html2canvas.Generate.parseGradient(src, bounds);

    if(gradient) {
      switch(gradient.type) {
        case 'linear':
          grad = ctx.createLinearGradient(gradient.x0, gradient.y0, gradient.x1, gradient.y1);
          gradient.colorStops.forEach(addScrollStops(grad));
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, bounds.width, bounds.height);
          break;

        case 'circle':
          grad = ctx.createRadialGradient(gradient.cx, gradient.cy, 0, gradient.cx, gradient.cy, gradient.rx);
          gradient.colorStops.forEach(addScrollStops(grad));
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, bounds.width, bounds.height);
          break;

        case 'ellipse':
          var canvasRadial = document.createElement('canvas'),
            ctxRadial = canvasRadial.getContext('2d'),
            ri = Math.max(gradient.rx, gradient.ry),
            di = ri * 2;

          canvasRadial.width = canvasRadial.height = di;

          grad = ctxRadial.createRadialGradient(gradient.rx, gradient.ry, 0, gradient.rx, gradient.ry, ri);
          gradient.colorStops.forEach(addScrollStops(grad));

          ctxRadial.fillStyle = grad;
          ctxRadial.fillRect(0, 0, di, di);

          ctx.fillStyle = gradient.colorStops[gradient.colorStops.length - 1].color;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(canvasRadial, gradient.cx - gradient.rx, gradient.cy - gradient.ry, 2 * gradient.rx, 2 * gradient.ry);
          break;
      }
    }

    return canvas;
  };

  Generate.ListAlpha = function(number) {
    var tmp = "",
    modulus;

    do {
      modulus = number % 26;
      tmp = String.fromCharCode((modulus) + 64) + tmp;
      number = number / 26;
    }while((number*26) > 26);

    return tmp;
  };

  Generate.ListRoman = function(number) {
    var romanArray = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"],
    decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    roman = "",
    v,
    len = romanArray.length;

    if (number <= 0 || number >= 4000) {
      return number;
    }

    for (v=0; v < len; v+=1) {
      while (number >= decimal[v]) {
        number -= decimal[v];
        roman += romanArray[v];
      }
    }

    return roman;
  };
})();
function h2cRenderContext(width, height) {
  var storage = [];
  return {
    storage: storage,
    width: width,
    height: height,
    clip: function() {
      storage.push({
        type: "function",
        name: "clip",
        'arguments': arguments
      });
    },
    translate: function() {
      storage.push({
        type: "function",
        name: "translate",
        'arguments': arguments
      });
    },
    fill: function() {
      storage.push({
        type: "function",
        name: "fill",
        'arguments': arguments
      });
    },
    save: function() {
      storage.push({
        type: "function",
        name: "save",
        'arguments': arguments
      });
    },
    restore: function() {
      storage.push({
        type: "function",
        name: "restore",
        'arguments': arguments
      });
    },
    fillRect: function () {
      storage.push({
        type: "function",
        name: "fillRect",
        'arguments': arguments
      });
    },
    createPattern: function() {
      storage.push({
        type: "function",
        name: "createPattern",
        'arguments': arguments
      });
    },
    drawShape: function() {

      var shape = [];

      storage.push({
        type: "function",
        name: "drawShape",
        'arguments': shape
      });

      return {
        moveTo: function() {
          shape.push({
            name: "moveTo",
            'arguments': arguments
          });
        },
        lineTo: function() {
          shape.push({
            name: "lineTo",
            'arguments': arguments
          });
        },
        arcTo: function() {
          shape.push({
            name: "arcTo",
            'arguments': arguments
          });
        },
        bezierCurveTo: function() {
          shape.push({
            name: "bezierCurveTo",
            'arguments': arguments
          });
        },
        quadraticCurveTo: function() {
          shape.push({
            name: "quadraticCurveTo",
            'arguments': arguments
          });
        }
      };

    },
    drawImage: function () {
      storage.push({
        type: "function",
        name: "drawImage",
        'arguments': arguments
      });
    },
    fillText: function () {
      storage.push({
        type: "function",
        name: "fillText",
        'arguments': arguments
      });
    },
    setVariable: function (variable, value) {
      storage.push({
        type: "variable",
        name: variable,
        'arguments': value
      });
      return value;
    }
  };
}
_html2canvas.Parse = function (images, options) {
  window.scroll(0,0);

  var element = (( options.elements === undefined ) ? document.body : options.elements[0]), // select body by default
  numDraws = 0,
  doc = element.ownerDocument,
  Util = _html2canvas.Util,
  support = Util.Support(options, doc),
  ignoreElementsRegExp = new RegExp("(" + options.ignoreElements + ")"),
  body = doc.body,
  getCSS = Util.getCSS,
  pseudoHide = "___html2canvas___pseudoelement",
  hidePseudoElements = doc.createElement('style');

  hidePseudoElements.innerHTML = '.' + pseudoHide + '-before:before { content: "" !important; display: none !important; }' +
  '.' + pseudoHide + '-after:after { content: "" !important; display: none !important; }';

  body.appendChild(hidePseudoElements);

  images = images || {};

  function documentWidth () {
    return Math.max(
      Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
      Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
      Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
      );
  }

  function documentHeight () {
    return Math.max(
      Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
      Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
      Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
      );
  }

  function getCSSInt(element, attribute) {
    var val = parseInt(getCSS(element, attribute), 10);
    return (isNaN(val)) ? 0 : val; // borders in old IE are throwing 'medium' for demo.html
  }

  function renderRect (ctx, x, y, w, h, bgcolor) {
    if (bgcolor !== "transparent"){
      ctx.setVariable("fillStyle", bgcolor);
      ctx.fillRect(x, y, w, h);
      numDraws+=1;
    }
  }

  function capitalize(m, p1, p2) {
    if (m.length > 0) {
      return p1 + p2.toUpperCase();
    }
  }

  function textTransform (text, transform) {
    switch(transform){
      case "lowercase":
        return text.toLowerCase();
      case "capitalize":
        return text.replace( /(^|\s|:|-|\(|\))([a-z])/g, capitalize);
      case "uppercase":
        return text.toUpperCase();
      default:
        return text;
    }
  }

  function noLetterSpacing(letter_spacing) {
    return (/^(normal|none|0px)$/.test(letter_spacing));
  }

  function drawText(currentText, x, y, ctx){
    if (currentText !== null && Util.trimText(currentText).length > 0) {
      ctx.fillText(currentText, x, y);
      numDraws+=1;
    }
  }

  function setTextVariables(ctx, el, text_decoration, color) {
    var align = false,
    bold = getCSS(el, "fontWeight"),
    family = getCSS(el, "fontFamily"),
    size = getCSS(el, "fontSize"),
    shadows = Util.parseTextShadows(getCSS(el, "textShadow"));

    switch(parseInt(bold, 10)){
      case 401:
        bold = "bold";
        break;
      case 400:
        bold = "normal";
        break;
    }

    ctx.setVariable("fillStyle", color);
    ctx.setVariable("font", [getCSS(el, "fontStyle"), getCSS(el, "fontVariant"), bold, size, family].join(" "));
    ctx.setVariable("textAlign", (align) ? "right" : "left");

    if (shadows.length) {
      // TODO: support multiple text shadows
      // apply the first text shadow
      ctx.setVariable("shadowColor", shadows[0].color);
      ctx.setVariable("shadowOffsetX", shadows[0].offsetX);
      ctx.setVariable("shadowOffsetY", shadows[0].offsetY);
      ctx.setVariable("shadowBlur", shadows[0].blur);
    }

    if (text_decoration !== "none"){
      return Util.Font(family, size, doc);
    }
  }

  function renderTextDecoration(ctx, text_decoration, bounds, metrics, color) {
    switch(text_decoration) {
      case "underline":
        // Draws a line at the baseline of the font
        // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
        renderRect(ctx, bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, color);
        break;
      case "overline":
        renderRect(ctx, bounds.left, Math.round(bounds.top), bounds.width, 1, color);
        break;
      case "line-through":
        // TODO try and find exact position for line-through
        renderRect(ctx, bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, color);
        break;
    }
  }

  function getTextBounds(state, text, textDecoration, isLast, transform) {
    var bounds;
    if (support.rangeBounds && !transform) {
      if (textDecoration !== "none" || Util.trimText(text).length !== 0) {
        bounds = textRangeBounds(text, state.node, state.textOffset);
      }
      state.textOffset += text.length;
    } else if (state.node && typeof state.node.nodeValue === "string" ){
      var newTextNode = (isLast) ? state.node.splitText(text.length) : null;
      bounds = textWrapperBounds(state.node, transform);
      state.node = newTextNode;
    }
    return bounds;
  }

  function textRangeBounds(text, textNode, textOffset) {
    var range = doc.createRange();
    range.setStart(textNode, textOffset);
    range.setEnd(textNode, textOffset + text.length);
    return range.getBoundingClientRect();
  }

  function textWrapperBounds(oldTextNode, transform) {
    var parent = oldTextNode.parentNode,
    wrapElement = doc.createElement('wrapper'),
    backupText = oldTextNode.cloneNode(true);

    wrapElement.appendChild(oldTextNode.cloneNode(true));
    parent.replaceChild(wrapElement, oldTextNode);

    var bounds = transform ? Util.OffsetBounds(wrapElement) : Util.Bounds(wrapElement);
    parent.replaceChild(backupText, wrapElement);
    return bounds;
  }

  function renderText(el, textNode, stack) {
    var ctx = stack.ctx,
    color = getCSS(el, "color"),
    textDecoration = getCSS(el, "textDecoration"),
    textAlign = getCSS(el, "textAlign"),
    metrics,
    textList,
    state = {
      node: textNode,
      textOffset: 0
    };

    if (Util.trimText(textNode.nodeValue).length > 0) {
      textNode.nodeValue = textTransform(textNode.nodeValue, getCSS(el, "textTransform"));
      textAlign = textAlign.replace(["-webkit-auto"],["auto"]);

      textList = (!options.letterRendering && /^(left|right|justify|auto)$/.test(textAlign) && noLetterSpacing(getCSS(el, "letterSpacing"))) ?
      textNode.nodeValue.split(/(\b| )/)
      : textNode.nodeValue.split("");

      metrics = setTextVariables(ctx, el, textDecoration, color);

      if (options.chinese) {
        textList.forEach(function(word, index) {
          if (/.*[\u4E00-\u9FA5].*$/.test(word)) {
            word = word.split("");
            word.unshift(index, 1);
            textList.splice.apply(textList, word);
          }
        });
      }

      textList.forEach(function(text, index) {
        var bounds = getTextBounds(state, text, textDecoration, (index < textList.length - 1), stack.transform.matrix);
        if (bounds) {
          drawText(text, bounds.left, bounds.bottom, ctx);
          renderTextDecoration(ctx, textDecoration, bounds, metrics, color);
        }
      });
    }
  }

  function listPosition (element, val) {
    var boundElement = doc.createElement( "boundelement" ),
    originalType,
    bounds;

    boundElement.style.display = "inline";

    originalType = element.style.listStyleType;
    element.style.listStyleType = "none";

    boundElement.appendChild(doc.createTextNode(val));

    element.insertBefore(boundElement, element.firstChild);

    bounds = Util.Bounds(boundElement);
    element.removeChild(boundElement);
    element.style.listStyleType = originalType;
    return bounds;
  }

  function elementIndex(el) {
    var i = -1,
    count = 1,
    childs = el.parentNode.childNodes;

    if (el.parentNode) {
      while(childs[++i] !== el) {
        if (childs[i].nodeType === 1) {
          count++;
        }
      }
      return count;
    } else {
      return -1;
    }
  }

  function listItemText(element, type) {
    var currentIndex = elementIndex(element), text;
    switch(type){
      case "decimal":
        text = currentIndex;
        break;
      case "decimal-leading-zero":
        text = (currentIndex.toString().length === 1) ? currentIndex = "0" + currentIndex.toString() : currentIndex.toString();
        break;
      case "upper-roman":
        text = _html2canvas.Generate.ListRoman( currentIndex );
        break;
      case "lower-roman":
        text = _html2canvas.Generate.ListRoman( currentIndex ).toLowerCase();
        break;
      case "lower-alpha":
        text = _html2canvas.Generate.ListAlpha( currentIndex ).toLowerCase();
        break;
      case "upper-alpha":
        text = _html2canvas.Generate.ListAlpha( currentIndex );
        break;
    }

    return text + ". ";
  }

  function renderListItem(element, stack, elBounds) {
    var x,
    text,
    ctx = stack.ctx,
    type = getCSS(element, "listStyleType"),
    listBounds;

    if (/^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i.test(type)) {
      text = listItemText(element, type);
      listBounds = listPosition(element, text);
      setTextVariables(ctx, element, "none", getCSS(element, "color"));

      if (getCSS(element, "listStylePosition") === "inside") {
        ctx.setVariable("textAlign", "left");
        x = elBounds.left;
      } else {
        return;
      }

      drawText(text, x, listBounds.bottom, ctx);
    }
  }

  function loadImage (src){
    var img = images[src];
    return (img && img.succeeded === true) ? img.img : false;
  }

  function clipBounds(src, dst){
    var x = Math.max(src.left, dst.left),
    y = Math.max(src.top, dst.top),
    x2 = Math.min((src.left + src.width), (dst.left + dst.width)),
    y2 = Math.min((src.top + src.height), (dst.top + dst.height));

    return {
      left:x,
      top:y,
      width:x2-x,
      height:y2-y
    };
  }

  function setZ(element, stack, parentStack){
    var newContext,
    isPositioned = stack.cssPosition !== 'static',
    zIndex = isPositioned ? getCSS(element, 'zIndex') : 'auto',
    opacity = getCSS(element, 'opacity'),
    isFloated = getCSS(element, 'cssFloat') !== 'none';

    // https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context
    // When a new stacking context should be created:
    // the root element (HTML),
    // positioned (absolutely or relatively) with a z-index value other than "auto",
    // elements with an opacity value less than 1. (See the specification for opacity),
    // on mobile WebKit and Chrome 22+, position: fixed always creates a new stacking context, even when z-index is "auto" (See this post)

    stack.zIndex = newContext = h2czContext(zIndex);
    newContext.isPositioned = isPositioned;
    newContext.isFloated = isFloated;
    newContext.opacity = opacity;
    newContext.ownStacking = (zIndex !== 'auto' || opacity < 1);

    if (parentStack) {
      parentStack.zIndex.children.push(stack);
    }
  }

  function renderImage(ctx, element, image, bounds, borders) {

    var paddingLeft = getCSSInt(element, 'paddingLeft'),
    paddingTop = getCSSInt(element, 'paddingTop'),
    paddingRight = getCSSInt(element, 'paddingRight'),
    paddingBottom = getCSSInt(element, 'paddingBottom');

    drawImage(
      ctx,
      image,
      0, //sx
      0, //sy
      image.width, //sw
      image.height, //sh
      bounds.left + paddingLeft + borders[3].width, //dx
      bounds.top + paddingTop + borders[0].width, // dy
      bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight), //dw
      bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom) //dh
      );
  }

  function getBorderData(element) {
    return ["Top", "Right", "Bottom", "Left"].map(function(side) {
      return {
        width: getCSSInt(element, 'border' + side + 'Width'),
        color: getCSS(element, 'border' + side + 'Color')
      };
    });
  }

  function getBorderRadiusData(element) {
    return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(side) {
      return getCSS(element, 'border' + side + 'Radius');
    });
  }

  var getCurvePoints = (function(kappa) {

    return function(x, y, r1, r2) {
      var ox = (r1) * kappa, // control point offset horizontal
      oy = (r2) * kappa, // control point offset vertical
      xm = x + r1, // x-middle
      ym = y + r2; // y-middle
      return {
        topLeft: bezierCurve({
          x:x,
          y:ym
        }, {
          x:x,
          y:ym - oy
        }, {
          x:xm - ox,
          y:y
        }, {
          x:xm,
          y:y
        }),
        topRight: bezierCurve({
          x:x,
          y:y
        }, {
          x:x + ox,
          y:y
        }, {
          x:xm,
          y:ym - oy
        }, {
          x:xm,
          y:ym
        }),
        bottomRight: bezierCurve({
          x:xm,
          y:y
        }, {
          x:xm,
          y:y + oy
        }, {
          x:x + ox,
          y:ym
        }, {
          x:x,
          y:ym
        }),
        bottomLeft: bezierCurve({
          x:xm,
          y:ym
        }, {
          x:xm - ox,
          y:ym
        }, {
          x:x,
          y:y + oy
        }, {
          x:x,
          y:y
        })
      };
    };
  })(4 * ((Math.sqrt(2) - 1) / 3));

  function bezierCurve(start, startControl, endControl, end) {

    var lerp = function (a, b, t) {
      return {
        x:a.x + (b.x - a.x) * t,
        y:a.y + (b.y - a.y) * t
      };
    };

    return {
      start: start,
      startControl: startControl,
      endControl: endControl,
      end: end,
      subdivide: function(t) {
        var ab = lerp(start, startControl, t),
        bc = lerp(startControl, endControl, t),
        cd = lerp(endControl, end, t),
        abbc = lerp(ab, bc, t),
        bccd = lerp(bc, cd, t),
        dest = lerp(abbc, bccd, t);
        return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
      },
      curveTo: function(borderArgs) {
        borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
      },
      curveToReversed: function(borderArgs) {
        borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
      }
    };
  }

  function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
    if (radius1[0] > 0 || radius1[1] > 0) {
      borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
      corner1[0].curveTo(borderArgs);
      corner1[1].curveTo(borderArgs);
    } else {
      borderArgs.push(["line", x, y]);
    }

    if (radius2[0] > 0 || radius2[1] > 0) {
      borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
    }
  }

  function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
    var borderArgs = [];

    if (radius1[0] > 0 || radius1[1] > 0) {
      borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
      outer1[1].curveTo(borderArgs);
    } else {
      borderArgs.push([ "line", borderData.c1[0], borderData.c1[1]]);
    }

    if (radius2[0] > 0 || radius2[1] > 0) {
      borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
      outer2[0].curveTo(borderArgs);
      borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
      inner2[0].curveToReversed(borderArgs);
    } else {
      borderArgs.push([ "line", borderData.c2[0], borderData.c2[1]]);
      borderArgs.push([ "line", borderData.c3[0], borderData.c3[1]]);
    }

    if (radius1[0] > 0 || radius1[1] > 0) {
      borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
      inner1[1].curveToReversed(borderArgs);
    } else {
      borderArgs.push([ "line", borderData.c4[0], borderData.c4[1]]);
    }

    return borderArgs;
  }

  function calculateCurvePoints(bounds, borderRadius, borders) {

    var x = bounds.left,
    y = bounds.top,
    width = bounds.width,
    height = bounds.height,

    tlh = borderRadius[0][0],
    tlv = borderRadius[0][1],
    trh = borderRadius[1][0],
    trv = borderRadius[1][1],
    brh = borderRadius[2][0],
    brv = borderRadius[2][1],
    blh = borderRadius[3][0],
    blv = borderRadius[3][1],

    topWidth = width - trh,
    rightHeight = height - brv,
    bottomWidth = width - brh,
    leftHeight = height - blv;

    return {
      topLeftOuter: getCurvePoints(
        x,
        y,
        tlh,
        tlv
        ).topLeft.subdivide(0.5),

      topLeftInner: getCurvePoints(
        x + borders[3].width,
        y + borders[0].width,
        Math.max(0, tlh - borders[3].width),
        Math.max(0, tlv - borders[0].width)
        ).topLeft.subdivide(0.5),

      topRightOuter: getCurvePoints(
        x + topWidth,
        y,
        trh,
        trv
        ).topRight.subdivide(0.5),

      topRightInner: getCurvePoints(
        x + Math.min(topWidth, width + borders[3].width),
        y + borders[0].width,
        (topWidth > width + borders[3].width) ? 0 :trh - borders[3].width,
        trv - borders[0].width
        ).topRight.subdivide(0.5),

      bottomRightOuter: getCurvePoints(
        x + bottomWidth,
        y + rightHeight,
        brh,
        brv
        ).bottomRight.subdivide(0.5),

      bottomRightInner: getCurvePoints(
        x + Math.min(bottomWidth, width + borders[3].width),
        y + Math.min(rightHeight, height + borders[0].width),
        Math.max(0, brh - borders[1].width),
        Math.max(0, brv - borders[2].width)
        ).bottomRight.subdivide(0.5),

      bottomLeftOuter: getCurvePoints(
        x,
        y + leftHeight,
        blh,
        blv
        ).bottomLeft.subdivide(0.5),

      bottomLeftInner: getCurvePoints(
        x + borders[3].width,
        y + leftHeight,
        Math.max(0, blh - borders[3].width),
        Math.max(0, blv - borders[2].width)
        ).bottomLeft.subdivide(0.5)
    };
  }

  function getBorderClip(element, borderPoints, borders, radius, bounds) {
    var backgroundClip = getCSS(element, 'backgroundClip'),
    borderArgs = [];

    switch(backgroundClip) {
      case "content-box":
      case "padding-box":
        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
        break;

      default:
        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
        break;
    }

    return borderArgs;
  }

  function parseBorders(element, bounds, borders){
    var x = bounds.left,
    y = bounds.top,
    width = bounds.width,
    height = bounds.height,
    borderSide,
    bx,
    by,
    bw,
    bh,
    borderArgs,
    // http://www.w3.org/TR/css3-background/#the-border-radius
    borderRadius = getBorderRadiusData(element),
    borderPoints = calculateCurvePoints(bounds, borderRadius, borders),
    borderData = {
      clip: getBorderClip(element, borderPoints, borders, borderRadius, bounds),
      borders: []
    };

    for (borderSide = 0; borderSide < 4; borderSide++) {

      if (borders[borderSide].width > 0) {
        bx = x;
        by = y;
        bw = width;
        bh = height - (borders[2].width);

        switch(borderSide) {
          case 0:
            // top border
            bh = borders[0].width;

            borderArgs = drawSide({
              c1: [bx, by],
              c2: [bx + bw, by],
              c3: [bx + bw - borders[1].width, by + bh],
              c4: [bx + borders[3].width, by + bh]
            }, borderRadius[0], borderRadius[1],
            borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
            break;
          case 1:
            // right border
            bx = x + width - (borders[1].width);
            bw = borders[1].width;

            borderArgs = drawSide({
              c1: [bx + bw, by],
              c2: [bx + bw, by + bh + borders[2].width],
              c3: [bx, by + bh],
              c4: [bx, by + borders[0].width]
            }, borderRadius[1], borderRadius[2],
            borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
            break;
          case 2:
            // bottom border
            by = (by + height) - (borders[2].width);
            bh = borders[2].width;

            borderArgs = drawSide({
              c1: [bx + bw, by + bh],
              c2: [bx, by + bh],
              c3: [bx + borders[3].width, by],
              c4: [bx + bw - borders[3].width, by]
            }, borderRadius[2], borderRadius[3],
            borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
            break;
          case 3:
            // left border
            bw = borders[3].width;

            borderArgs = drawSide({
              c1: [bx, by + bh + borders[2].width],
              c2: [bx, by],
              c3: [bx + bw, by + borders[0].width],
              c4: [bx + bw, by + bh]
            }, borderRadius[3], borderRadius[0],
            borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
            break;
        }

        borderData.borders.push({
          args: borderArgs,
          color: borders[borderSide].color
        });

      }
    }

    return borderData;
  }

  function createShape(ctx, args) {
    var shape = ctx.drawShape();
    args.forEach(function(border, index) {
      shape[(index === 0) ? "moveTo" : border[0] + "To" ].apply(null, border.slice(1));
    });
    return shape;
  }

  function renderBorders(ctx, borderArgs, color) {
    if (color !== "transparent") {
      ctx.setVariable( "fillStyle", color);
      createShape(ctx, borderArgs);
      ctx.fill();
      numDraws+=1;
    }
  }

  function renderFormValue (el, bounds, stack){

    var valueWrap = doc.createElement('valuewrap'),
    cssPropertyArray = ['lineHeight','textAlign','fontFamily','color','fontSize','paddingLeft','paddingTop','width','height','border','borderLeftWidth','borderTopWidth'],
    textValue,
    textNode;

    cssPropertyArray.forEach(function(property) {
      try {
        valueWrap.style[property] = getCSS(el, property);
      } catch(e) {
        // Older IE has issues with "border"
        Util.log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
      }
    });

    valueWrap.style.borderColor = "black";
    valueWrap.style.borderStyle = "solid";
    valueWrap.style.display = "block";
    valueWrap.style.position = "absolute";

    if (/^(submit|reset|button|text|password)$/.test(el.type) || el.nodeName === "SELECT"){
      valueWrap.style.lineHeight = getCSS(el, "height");
    }

    valueWrap.style.top = bounds.top + "px";
    valueWrap.style.left = bounds.left + "px";

    textValue = (el.nodeName === "SELECT") ? (el.options[el.selectedIndex] || 0).text : el.value;
    if(!textValue) {
      textValue = el.placeholder;
    }

    textNode = doc.createTextNode(textValue);

    valueWrap.appendChild(textNode);
    body.appendChild(valueWrap);

    renderText(el, textNode, stack);
    body.removeChild(valueWrap);
  }

  function drawImage (ctx) {
    ctx.drawImage.apply(ctx, Array.prototype.slice.call(arguments, 1));
    numDraws+=1;
  }

  function getPseudoElement(el, which) {
    var elStyle = window.getComputedStyle(el, which);
    if(!elStyle || !elStyle.content || elStyle.content === "none" || elStyle.content === "-moz-alt-content" || elStyle.display === "none") {
      return;
    }
    var content = elStyle.content + '',
    first = content.substr( 0, 1 );
    //strips quotes
    if(first === content.substr( content.length - 1 ) && first.match(/'|"/)) {
      content = content.substr( 1, content.length - 2 );
    }

    var isImage = content.substr( 0, 3 ) === 'url',
    elps = document.createElement( isImage ? 'img' : 'span' );

    elps.className = pseudoHide + "-before " + pseudoHide + "-after";

    Object.keys(elStyle).filter(indexedProperty).forEach(function(prop) {
      // Prevent assigning of read only CSS Rules, ex. length, parentRule
      try {
        elps.style[prop] = elStyle[prop];
      } catch (e) {
        Util.log(['Tried to assign readonly property ', prop, 'Error:', e]);
      }
    });

    if(isImage) {
      elps.src = Util.parseBackgroundImage(content)[0].args[0];
    } else {
      elps.innerHTML = content;
    }
    return elps;
  }

  function indexedProperty(property) {
    return (isNaN(window.parseInt(property, 10)));
  }

  function injectPseudoElements(el, stack) {
    var before = getPseudoElement(el, ':before'),
    after = getPseudoElement(el, ':after');
    if(!before && !after) {
      return;
    }

    if(before) {
      el.className += " " + pseudoHide + "-before";
      el.parentNode.insertBefore(before, el);
      parseElement(before, stack, true);
      el.parentNode.removeChild(before);
      el.className = el.className.replace(pseudoHide + "-before", "").trim();
    }

    if (after) {
      el.className += " " + pseudoHide + "-after";
      el.appendChild(after);
      parseElement(after, stack, true);
      el.removeChild(after);
      el.className = el.className.replace(pseudoHide + "-after", "").trim();
    }

  }

  function renderBackgroundRepeat(ctx, image, backgroundPosition, bounds) {
    var offsetX = Math.round(bounds.left + backgroundPosition.left),
    offsetY = Math.round(bounds.top + backgroundPosition.top);

    ctx.createPattern(image);
    ctx.translate(offsetX, offsetY);
    ctx.fill();
    ctx.translate(-offsetX, -offsetY);
  }

  function backgroundRepeatShape(ctx, image, backgroundPosition, bounds, left, top, width, height) {
    var args = [];
    args.push(["line", Math.round(left), Math.round(top)]);
    args.push(["line", Math.round(left + width), Math.round(top)]);
    args.push(["line", Math.round(left + width), Math.round(height + top)]);
    args.push(["line", Math.round(left), Math.round(height + top)]);
    createShape(ctx, args);
    ctx.save();
    ctx.clip();
    renderBackgroundRepeat(ctx, image, backgroundPosition, bounds);
    ctx.restore();
  }

  function renderBackgroundColor(ctx, backgroundBounds, bgcolor) {
    renderRect(
      ctx,
      backgroundBounds.left,
      backgroundBounds.top,
      backgroundBounds.width,
      backgroundBounds.height,
      bgcolor
      );
  }

  function renderBackgroundRepeating(el, bounds, ctx, image, imageIndex) {
    var backgroundSize = Util.BackgroundSize(el, bounds, image, imageIndex),
    backgroundPosition = Util.BackgroundPosition(el, bounds, image, imageIndex, backgroundSize),
    backgroundRepeat = getCSS(el, "backgroundRepeat").split(",").map(Util.trimText);

    image = resizeImage(image, backgroundSize);

    backgroundRepeat = backgroundRepeat[imageIndex] || backgroundRepeat[0];

    switch (backgroundRepeat) {
      case "repeat-x":
        backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
          bounds.left, bounds.top + backgroundPosition.top, 99999, image.height);
        break;

      case "repeat-y":
        backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
          bounds.left + backgroundPosition.left, bounds.top, image.width, 99999);
        break;

      case "no-repeat":
        backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
          bounds.left + backgroundPosition.left, bounds.top + backgroundPosition.top, image.width, image.height);
        break;

      default:
        renderBackgroundRepeat(ctx, image, backgroundPosition, {
          top: bounds.top,
          left: bounds.left,
          width: image.width,
          height: image.height
        });
        break;
    }
  }

  function renderBackgroundImage(element, bounds, ctx) {
    var backgroundImage = getCSS(element, "backgroundImage"),
    backgroundImages = Util.parseBackgroundImage(backgroundImage),
    image,
    imageIndex = backgroundImages.length;

    while(imageIndex--) {
      backgroundImage = backgroundImages[imageIndex];

      if (!backgroundImage.args || backgroundImage.args.length === 0) {
        continue;
      }

      var key = backgroundImage.method === 'url' ?
      backgroundImage.args[0] :
      backgroundImage.value;

      image = loadImage(key);

      // TODO add support for background-origin
      if (image) {
        renderBackgroundRepeating(element, bounds, ctx, image, imageIndex);
      } else {
        Util.log("html2canvas: Error loading background:", backgroundImage);
      }
    }
  }

  function resizeImage(image, bounds) {
    if(image.width === bounds.width && image.height === bounds.height) {
      return image;
    }

    var ctx, canvas = doc.createElement('canvas');
    canvas.width = bounds.width;
    canvas.height = bounds.height;
    ctx = canvas.getContext("2d");
    drawImage(ctx, image, 0, 0, image.width, image.height, 0, 0, bounds.width, bounds.height );
    return canvas;
  }

  function setOpacity(ctx, element, parentStack) {
    return ctx.setVariable("globalAlpha", getCSS(element, "opacity") * ((parentStack) ? parentStack.opacity : 1));
  }

  function removePx(str) {
    return str.replace("px", "");
  }

  var transformRegExp = /(matrix)\((.+)\)/;

  function getTransform(element, parentStack) {
    var transform = getCSS(element, "transform") || getCSS(element, "-webkit-transform") || getCSS(element, "-moz-transform") || getCSS(element, "-ms-transform") || getCSS(element, "-o-transform");
    var transformOrigin = getCSS(element, "transform-origin") || getCSS(element, "-webkit-transform-origin") || getCSS(element, "-moz-transform-origin") || getCSS(element, "-ms-transform-origin") || getCSS(element, "-o-transform-origin") || "0px 0px";

    transformOrigin = transformOrigin.split(" ").map(removePx).map(Util.asFloat);

    var matrix;
    if (transform && transform !== "none") {
      var match = transform.match(transformRegExp);
      if (match) {
        switch(match[1]) {
          case "matrix":
            matrix = match[2].split(",").map(Util.trimText).map(Util.asFloat);
            break;
        }
      }
    }

    return {
      origin: transformOrigin,
      matrix: matrix
    };
  }

  function createStack(element, parentStack, bounds, transform) {
    var ctx = h2cRenderContext((!parentStack) ? documentWidth() : bounds.width , (!parentStack) ? documentHeight() : bounds.height),
    stack = {
      ctx: ctx,
      opacity: setOpacity(ctx, element, parentStack),
      cssPosition: getCSS(element, "position"),
      borders: getBorderData(element),
      transform: transform,
      clip: (parentStack && parentStack.clip) ? Util.Extend( {}, parentStack.clip ) : null
    };

    setZ(element, stack, parentStack);

    // TODO correct overflow for absolute content residing under a static position
    if (options.useOverflow === true && /(hidden|scroll|auto)/.test(getCSS(element, "overflow")) === true && /(BODY)/i.test(element.nodeName) === false){
      stack.clip = (stack.clip) ? clipBounds(stack.clip, bounds) : bounds;
    }

    return stack;
  }

  function getBackgroundBounds(borders, bounds, clip) {
    var backgroundBounds = {
      left: bounds.left + borders[3].width,
      top: bounds.top + borders[0].width,
      width: bounds.width - (borders[1].width + borders[3].width),
      height: bounds.height - (borders[0].width + borders[2].width)
    };

    if (clip) {
      backgroundBounds = clipBounds(backgroundBounds, clip);
    }

    return backgroundBounds;
  }

  function getBounds(element, transform) {
    var bounds = (transform.matrix) ? Util.OffsetBounds(element) : Util.Bounds(element);
    transform.origin[0] += bounds.left;
    transform.origin[1] += bounds.top;
    return bounds;
  }

  function renderElement(element, parentStack, pseudoElement, ignoreBackground) {
    var transform = getTransform(element, parentStack),
    bounds = getBounds(element, transform),
    image,
    stack = createStack(element, parentStack, bounds, transform),
    borders = stack.borders,
    ctx = stack.ctx,
    backgroundBounds = getBackgroundBounds(borders, bounds, stack.clip),
    borderData = parseBorders(element, bounds, borders),
    backgroundColor = (ignoreElementsRegExp.test(element.nodeName)) ? "#efefef" : getCSS(element, "backgroundColor");


    createShape(ctx, borderData.clip);

    ctx.save();
    ctx.clip();

    if (backgroundBounds.height > 0 && backgroundBounds.width > 0 && !ignoreBackground) {
      renderBackgroundColor(ctx, bounds, backgroundColor);
      renderBackgroundImage(element, backgroundBounds, ctx);
    } else if (ignoreBackground) {
      stack.backgroundColor =  backgroundColor;
    }

    ctx.restore();

    borderData.borders.forEach(function(border) {
      renderBorders(ctx, border.args, border.color);
    });

    if (!pseudoElement) {
      injectPseudoElements(element, stack);
    }

    switch(element.nodeName){
      case "IMG":
        if ((image = loadImage(element.getAttribute('src')))) {
          renderImage(ctx, element, image, bounds, borders);
        } else {
          Util.log("html2canvas: Error loading <img>:" + element.getAttribute('src'));
        }
        break;
      case "INPUT":
        // TODO add all relevant type's, i.e. HTML5 new stuff
        // todo add support for placeholder attribute for browsers which support it
        if (/^(text|url|email|submit|button|reset)$/.test(element.type) && (element.value || element.placeholder || "").length > 0){
          renderFormValue(element, bounds, stack);
        }
        break;
      case "TEXTAREA":
        if ((element.value || element.placeholder || "").length > 0){
          renderFormValue(element, bounds, stack);
        }
        break;
      case "SELECT":
        if ((element.options||element.placeholder || "").length > 0){
          renderFormValue(element, bounds, stack);
        }
        break;
      case "LI":
        renderListItem(element, stack, backgroundBounds);
        break;
      case "CANVAS":
        renderImage(ctx, element, element, bounds, borders);
        break;
    }

    return stack;
  }

  function isElementVisible(element) {
    return (getCSS(element, 'display') !== "none" && getCSS(element, 'visibility') !== "hidden" && !element.hasAttribute("data-html2canvas-ignore"));
  }

  function parseElement (element, stack, pseudoElement) {
    if (isElementVisible(element)) {
      stack = renderElement(element, stack, pseudoElement, false) || stack;
      if (!ignoreElementsRegExp.test(element.nodeName)) {
        parseChildren(element, stack, pseudoElement);
      }
    }
  }

  function parseChildren(element, stack, pseudoElement) {
    Util.Children(element).forEach(function(node) {
      if (node.nodeType === node.ELEMENT_NODE) {
        parseElement(node, stack, pseudoElement);
      } else if (node.nodeType === node.TEXT_NODE) {
        renderText(element, node, stack);
      }
    });
  }

  function init() {
    var background = getCSS(document.documentElement, "backgroundColor"),
      transparentBackground = (Util.isTransparent(background) && element === document.body),
      stack = renderElement(element, null, false, transparentBackground);
    parseChildren(element, stack);

    if (transparentBackground) {
      background = stack.backgroundColor;
    }

    body.removeChild(hidePseudoElements);
    return {
      backgroundColor: background,
      stack: stack
    };
  }

  return init();
};

function h2czContext(zindex) {
  return {
    zindex: zindex,
    children: []
  };
}

_html2canvas.Preload = function( options ) {

  var images = {
    numLoaded: 0,   // also failed are counted here
    numFailed: 0,
    numTotal: 0,
    cleanupDone: false
  },
  pageOrigin,
  Util = _html2canvas.Util,
  methods,
  i,
  count = 0,
  element = options.elements[0] || document.body,
  doc = element.ownerDocument,
  domImages = element.getElementsByTagName('img'), // Fetch images of the present element only
  imgLen = domImages.length,
  link = doc.createElement("a"),
  supportCORS = (function( img ){
    return (img.crossOrigin !== undefined);
  })(new Image()),
  timeoutTimer;

  link.href = window.location.href;
  pageOrigin  = link.protocol + link.host;

  function isSameOrigin(url){
    link.href = url;
    link.href = link.href; // YES, BELIEVE IT OR NOT, that is required for IE9 - http://jsfiddle.net/niklasvh/2e48b/
    var origin = link.protocol + link.host;
    return (origin === pageOrigin);
  }

  function start(){
    Util.log("html2canvas: start: images: " + images.numLoaded + " / " + images.numTotal + " (failed: " + images.numFailed + ")");
    if (!images.firstRun && images.numLoaded >= images.numTotal){
      Util.log("Finished loading images: # " + images.numTotal + " (failed: " + images.numFailed + ")");

      if (typeof options.complete === "function"){
        options.complete(images);
      }

    }
  }

  // TODO modify proxy to serve images with CORS enabled, where available
  function proxyGetImage(url, img, imageObj){
    var callback_name,
    scriptUrl = options.proxy,
    script;

    link.href = url;
    url = link.href; // work around for pages with base href="" set - WARNING: this may change the url

    callback_name = 'html2canvas_' + (count++);
    imageObj.callbackname = callback_name;

    if (scriptUrl.indexOf("?") > -1) {
      scriptUrl += "&";
    } else {
      scriptUrl += "?";
    }
    scriptUrl += 'url=' + encodeURIComponent(url) + '&callback=' + callback_name;
    script = doc.createElement("script");

    window[callback_name] = function(a){
      if (a.substring(0,6) === "error:"){
        imageObj.succeeded = false;
        images.numLoaded++;
        images.numFailed++;
        start();
      } else {
        setImageLoadHandlers(img, imageObj);
        img.src = a;
      }
      window[callback_name] = undefined; // to work with IE<9  // NOTE: that the undefined callback property-name still exists on the window object (for IE<9)
      try {
        delete window[callback_name];  // for all browser that support this
      } catch(ex) {}
      script.parentNode.removeChild(script);
      script = null;
      delete imageObj.script;
      delete imageObj.callbackname;
    };

    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", scriptUrl);
    imageObj.script = script;
    window.document.body.appendChild(script);

  }

  function loadPseudoElement(element, type) {
    var style = window.getComputedStyle(element, type),
    content = style.content;
    if (content.substr(0, 3) === 'url') {
      methods.loadImage(_html2canvas.Util.parseBackgroundImage(content)[0].args[0]);
    }
    loadBackgroundImages(style.backgroundImage, element);
  }

  function loadPseudoElementImages(element) {
    loadPseudoElement(element, ":before");
    loadPseudoElement(element, ":after");
  }

  function loadGradientImage(backgroundImage, bounds) {
    var img = _html2canvas.Generate.Gradient(backgroundImage, bounds);

    if (img !== undefined){
      images[backgroundImage] = {
        img: img,
        succeeded: true
      };
      images.numTotal++;
      images.numLoaded++;
      start();
    }
  }

  function invalidBackgrounds(background_image) {
    return (background_image && background_image.method && background_image.args && background_image.args.length > 0 );
  }

  function loadBackgroundImages(background_image, el) {
    var bounds;

    _html2canvas.Util.parseBackgroundImage(background_image).filter(invalidBackgrounds).forEach(function(background_image) {
      if (background_image.method === 'url') {
        methods.loadImage(background_image.args[0]);
      } else if(background_image.method.match(/\-?gradient$/)) {
        if(bounds === undefined) {
          bounds = _html2canvas.Util.Bounds(el);
        }
        loadGradientImage(background_image.value, bounds);
      }
    });
  }

  function getImages (el) {
    var elNodeType = false;

    // Firefox fails with permission denied on pages with iframes
    try {
      Util.Children(el).forEach(getImages);
    }
    catch( e ) {}

    try {
      elNodeType = el.nodeType;
    } catch (ex) {
      elNodeType = false;
      Util.log("html2canvas: failed to access some element's nodeType - Exception: " + ex.message);
    }

    if (elNodeType === 1 || elNodeType === undefined) {
      loadPseudoElementImages(el);
      try {
        loadBackgroundImages(Util.getCSS(el, 'backgroundImage'), el);
      } catch(e) {
        Util.log("html2canvas: failed to get background-image - Exception: " + e.message);
      }
      loadBackgroundImages(el);
    }
  }

  function setImageLoadHandlers(img, imageObj) {
    img.onload = function() {
      if ( imageObj.timer !== undefined ) {
        // CORS succeeded
        window.clearTimeout( imageObj.timer );
      }

      images.numLoaded++;
      imageObj.succeeded = true;
      img.onerror = img.onload = null;
      start();
    };
    img.onerror = function() {
      if (img.crossOrigin === "anonymous") {
        // CORS failed
        window.clearTimeout( imageObj.timer );

        // let's try with proxy instead
        if ( options.proxy ) {
          var src = img.src;
          img = new Image();
          imageObj.img = img;
          img.src = src;

          proxyGetImage( img.src, img, imageObj );
          return;
        }
      }

      images.numLoaded++;
      images.numFailed++;
      imageObj.succeeded = false;
      img.onerror = img.onload = null;
      start();
    };
  }

  methods = {
    loadImage: function( src ) {
      var img, imageObj;
      if ( src && images[src] === undefined ) {
        img = new Image();
        if ( src.match(/data:image\/.*;base64,/i) ) {
          img.src = src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, '');
          imageObj = images[src] = {
            img: img
          };
          images.numTotal++;
          setImageLoadHandlers(img, imageObj);
        } else if ( isSameOrigin( src ) || options.allowTaint ===  true ) {
          imageObj = images[src] = {
            img: img
          };
          images.numTotal++;
          setImageLoadHandlers(img, imageObj);
          img.src = src;
        } else if ( supportCORS && !options.allowTaint && options.useCORS ) {
          // attempt to load with CORS

          img.crossOrigin = "anonymous";
          imageObj = images[src] = {
            img: img
          };
          images.numTotal++;
          setImageLoadHandlers(img, imageObj);
          img.src = src;
        } else if ( options.proxy ) {
          imageObj = images[src] = {
            img: img
          };
          images.numTotal++;
          proxyGetImage( src, img, imageObj );
        }
      }

    },
    cleanupDOM: function(cause) {
      var img, src;
      if (!images.cleanupDone) {
        if (cause && typeof cause === "string") {
          Util.log("html2canvas: Cleanup because: " + cause);
        } else {
          Util.log("html2canvas: Cleanup after timeout: " + options.timeout + " ms.");
        }

        for (src in images) {
          if (images.hasOwnProperty(src)) {
            img = images[src];
            if (typeof img === "object" && img.callbackname && img.succeeded === undefined) {
              // cancel proxy image request
              window[img.callbackname] = undefined; // to work with IE<9  // NOTE: that the undefined callback property-name still exists on the window object (for IE<9)
              try {
                delete window[img.callbackname];  // for all browser that support this
              } catch(ex) {}
              if (img.script && img.script.parentNode) {
                img.script.setAttribute("src", "about:blank");  // try to cancel running request
                img.script.parentNode.removeChild(img.script);
              }
              images.numLoaded++;
              images.numFailed++;
              Util.log("html2canvas: Cleaned up failed img: '" + src + "' Steps: " + images.numLoaded + " / " + images.numTotal);
            }
          }
        }

        // cancel any pending requests
        if(window.stop !== undefined) {
          window.stop();
        } else if(document.execCommand !== undefined) {
          document.execCommand("Stop", false);
        }
        if (document.close !== undefined) {
          document.close();
        }
        images.cleanupDone = true;
        if (!(cause && typeof cause === "string")) {
          start();
        }
      }
    },

    renderingDone: function() {
      if (timeoutTimer) {
        window.clearTimeout(timeoutTimer);
      }
    }
  };

  if (options.timeout > 0) {
    timeoutTimer = window.setTimeout(methods.cleanupDOM, options.timeout);
  }

  Util.log('html2canvas: Preload starts: finding background-images');
  images.firstRun = true;

  getImages(element);

  Util.log('html2canvas: Preload: Finding images');
  // load <img> images
  for (i = 0; i < imgLen; i+=1){
    methods.loadImage( domImages[i].getAttribute( "src" ) );
  }

  images.firstRun = false;
  Util.log('html2canvas: Preload: Done.');
  if (images.numTotal === images.numLoaded) {
    start();
  }

  return methods;
};

_html2canvas.Renderer = function(parseQueue, options){

  // http://www.w3.org/TR/CSS21/zindex.html
  function createRenderQueue(parseQueue) {
    var queue = [],
    rootContext;

    rootContext = (function buildStackingContext(rootNode) {
      var rootContext = {};
      function insert(context, node, specialParent) {
        var zi = (node.zIndex.zindex === 'auto') ? 0 : Number(node.zIndex.zindex),
        contextForChildren = context, // the stacking context for children
        isPositioned = node.zIndex.isPositioned,
        isFloated = node.zIndex.isFloated,
        stub = {node: node},
        childrenDest = specialParent; // where children without z-index should be pushed into

        if (node.zIndex.ownStacking) {
          // '!' comes before numbers in sorted array
          contextForChildren = stub.context = { '!': [{node:node, children: []}]};
          childrenDest = undefined;
        } else if (isPositioned || isFloated) {
          childrenDest = stub.children = [];
        }

        if (zi === 0 && specialParent) {
          specialParent.push(stub);
        } else {
          if (!context[zi]) { context[zi] = []; }
          context[zi].push(stub);
        }

        node.zIndex.children.forEach(function(childNode) {
          insert(contextForChildren, childNode, childrenDest);
        });
      }
      insert(rootContext, rootNode);
      return rootContext;
    })(parseQueue);

    function sortZ(context) {
      Object.keys(context).sort().forEach(function(zi) {
        var nonPositioned = [],
        floated = [],
        positioned = [],
        list = [];

        // positioned after static
        context[zi].forEach(function(v) {
          if (v.node.zIndex.isPositioned || v.node.zIndex.opacity < 1) {
            // http://www.w3.org/TR/css3-color/#transparency
            // non-positioned element with opactiy < 1 should be stacked as if it were a positioned element with ‘z-index: 0’ and ‘opacity: 1’.
            positioned.push(v);
          } else if (v.node.zIndex.isFloated) {
            floated.push(v);
          } else {
            nonPositioned.push(v);
          }
        });

        (function walk(arr) {
          arr.forEach(function(v) {
            list.push(v);
            if (v.children) { walk(v.children); }
          });
        })(nonPositioned.concat(floated, positioned));

        list.forEach(function(v) {
          if (v.context) {
            sortZ(v.context);
          } else {
            queue.push(v.node);
          }
        });
      });
    }

    sortZ(rootContext);

    return queue;
  }

  function getRenderer(rendererName) {
    var renderer;

    if (typeof options.renderer === "string" && _html2canvas.Renderer[rendererName] !== undefined) {
      renderer = _html2canvas.Renderer[rendererName](options);
    } else if (typeof rendererName === "function") {
      renderer = rendererName(options);
    } else {
      throw new Error("Unknown renderer");
    }

    if ( typeof renderer !== "function" ) {
      throw new Error("Invalid renderer defined");
    }
    return renderer;
  }

  return getRenderer(options.renderer)(parseQueue, options, document, createRenderQueue(parseQueue.stack), _html2canvas);
};

_html2canvas.Util.Support = function (options, doc) {

  function supportSVGRendering() {
    var img = new Image(),
    canvas = doc.createElement("canvas"),
    ctx = (canvas.getContext === undefined) ? false : canvas.getContext("2d");
    if (ctx === false) {
      return false;
    }
    canvas.width = canvas.height = 10;
    img.src = [
    "data:image/svg+xml,",
    "<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'>",
    "<foreignObject width='10' height='10'>",
    "<div xmlns='http://www.w3.org/1999/xhtml' style='width:10;height:10;'>",
    "sup",
    "</div>",
    "</foreignObject>",
    "</svg>"
    ].join("");
    try {
      ctx.drawImage(img, 0, 0);
      canvas.toDataURL();
    } catch(e) {
      return false;
    }
    _html2canvas.Util.log('html2canvas: Parse: SVG powered rendering available');
    return true;
  }

  // Test whether we can use ranges to measure bounding boxes
  // Opera doesn't provide valid bounds.height/bottom even though it supports the method.

  function supportRangeBounds() {
    var r, testElement, rangeBounds, rangeHeight, support = false;

    if (doc.createRange) {
      r = doc.createRange();
      if (r.getBoundingClientRect) {
        testElement = doc.createElement('boundtest');
        testElement.style.height = "123px";
        testElement.style.display = "block";
        doc.body.appendChild(testElement);

        r.selectNode(testElement);
        rangeBounds = r.getBoundingClientRect();
        rangeHeight = rangeBounds.height;

        if (rangeHeight === 123) {
          support = true;
        }
        doc.body.removeChild(testElement);
      }
    }

    return support;
  }

  return {
    rangeBounds: supportRangeBounds(),
    svgRendering: options.svgRendering && supportSVGRendering()
  };
};
window.html2canvas = function(elements, opts) {
  elements = (elements.length) ? elements : [elements];
  var queue,
  canvas,
  options = {
    // general
    logging: false,
    elements: elements,
    background: "#fff",

    // preload options
    proxy: null,
    timeout: 0,    // no timeout
    useCORS: false, // try to load images as CORS (where available), before falling back to proxy
    allowTaint: false, // whether to allow images to taint the canvas, won't need proxy if set to true

    // parse options
    svgRendering: false, // use svg powered rendering where available (FF11+)
    ignoreElements: "IFRAME|OBJECT|PARAM",
    useOverflow: true,
    letterRendering: false,
    chinese: false,

    // render options

    width: null,
    height: null,
    taintTest: true, // do a taint test with all images before applying to canvas
    renderer: "Canvas"
  };

  options = _html2canvas.Util.Extend(opts, options);

  _html2canvas.logging = options.logging;
  options.complete = function( images ) {

    if (typeof options.onpreloaded === "function") {
      if ( options.onpreloaded( images ) === false ) {
        return;
      }
    }
    queue = _html2canvas.Parse( images, options );

    if (typeof options.onparsed === "function") {
      if ( options.onparsed( queue ) === false ) {
        return;
      }
    }

    canvas = _html2canvas.Renderer( queue, options );

    if (typeof options.onrendered === "function") {
      options.onrendered( canvas );
    }


  };

  // for pages without images, we still want this to be async, i.e. return methods before executing
  window.setTimeout( function(){
    _html2canvas.Preload( options );
  }, 0 );

  return {
    render: function( queue, opts ) {
      return _html2canvas.Renderer( queue, _html2canvas.Util.Extend(opts, options) );
    },
    parse: function( images, opts ) {
      return _html2canvas.Parse( images, _html2canvas.Util.Extend(opts, options) );
    },
    preload: function( opts ) {
      return _html2canvas.Preload( _html2canvas.Util.Extend(opts, options) );
    },
    log: _html2canvas.Util.log
  };
};

window.html2canvas.log = _html2canvas.Util.log; // for renderers
window.html2canvas.Renderer = {
  Canvas: undefined // We are assuming this will be used
};
_html2canvas.Renderer.Canvas = function(options) {
  options = options || {};

  var doc = document,
  safeImages = [],
  testCanvas = document.createElement("canvas"),
  testctx = testCanvas.getContext("2d"),
  Util = _html2canvas.Util,
  canvas = options.canvas || doc.createElement('canvas');

  function createShape(ctx, args) {
    ctx.beginPath();
    args.forEach(function(arg) {
      ctx[arg.name].apply(ctx, arg['arguments']);
    });
    ctx.closePath();
  }

  function safeImage(item) {
    if (safeImages.indexOf(item['arguments'][0].src ) === -1) {
      testctx.drawImage(item['arguments'][0], 0, 0);
      try {
        testctx.getImageData(0, 0, 1, 1);
      } catch(e) {
        testCanvas = doc.createElement("canvas");
        testctx = testCanvas.getContext("2d");
        return false;
      }
      safeImages.push(item['arguments'][0].src);
    }
    return true;
  }

  function renderItem(ctx, item) {
    switch(item.type){
      case "variable":
        ctx[item.name] = item['arguments'];
        break;
      case "function":
        switch(item.name) {
          case "createPattern":
            if (item['arguments'][0].width > 0 && item['arguments'][0].height > 0) {
              try {
                ctx.fillStyle = ctx.createPattern(item['arguments'][0], "repeat");
              }
              catch(e) {
                Util.log("html2canvas: Renderer: Error creating pattern", e.message);
              }
            }
            break;
          case "drawShape":
            createShape(ctx, item['arguments']);
            break;
          case "drawImage":
            if (item['arguments'][8] > 0 && item['arguments'][7] > 0) {
              if (!options.taintTest || (options.taintTest && safeImage(item))) {
                ctx.drawImage.apply( ctx, item['arguments'] );
              }
            }
            break;
          default:
            ctx[item.name].apply(ctx, item['arguments']);
        }
        break;
    }
  }

  return function(parsedData, options, document, queue, _html2canvas) {
    var ctx = canvas.getContext("2d"),
    newCanvas,
    bounds,
    fstyle,
    zStack = parsedData.stack;

    canvas.width = canvas.style.width =  options.width || zStack.ctx.width;
    canvas.height = canvas.style.height = options.height || zStack.ctx.height;

    fstyle = ctx.fillStyle;
    ctx.fillStyle = (Util.isTransparent(zStack.backgroundColor) && options.background !== undefined) ? options.background : parsedData.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = fstyle;

    queue.forEach(function(storageContext) {
      // set common settings for canvas
      ctx.textBaseline = "bottom";
      ctx.save();

      if (storageContext.transform.matrix) {
        ctx.translate(storageContext.transform.origin[0], storageContext.transform.origin[1]);
        ctx.transform.apply(ctx, storageContext.transform.matrix);
        ctx.translate(-storageContext.transform.origin[0], -storageContext.transform.origin[1]);
      }

      if (storageContext.clip){
        ctx.beginPath();
        ctx.rect(storageContext.clip.left, storageContext.clip.top, storageContext.clip.width, storageContext.clip.height);
        ctx.clip();
      }

      if (storageContext.ctx.storage) {
        storageContext.ctx.storage.forEach(function(item) {
          renderItem(ctx, item);
        });
      }

      ctx.restore();
    });

    Util.log("html2canvas: Renderer: Canvas renderer done - returning canvas obj");

    if (options.elements.length === 1) {
      if (typeof options.elements[0] === "object" && options.elements[0].nodeName !== "BODY") {
        // crop image to the bounds of selected (single) element
        bounds = _html2canvas.Util.Bounds(options.elements[0]);
        newCanvas = document.createElement('canvas');
        newCanvas.width = Math.ceil(bounds.width);
        newCanvas.height = Math.ceil(bounds.height);
        ctx = newCanvas.getContext("2d");

        ctx.drawImage(canvas, bounds.left, bounds.top, bounds.width, bounds.height, 0, 0, bounds.width, bounds.height);
        canvas = null;
        return newCanvas;
      }
    }

    return canvas;
  };
};
})(window,document);'use strict';
function okrugldo(a,b){
/**Округлить a с точностью до b*/
	if(!b)
		b=1;
	a=Math.round(a/b)*b;
	return a;
}
function sluchch(n,k,s){
/**Случайное число от n до k с шагом s.
Если s опущено - с шагом 1.
Если k опущено - от 0 до n*/
	if(!s)
		s=1;
	if(k==undefined)
		return sluchch(0,n,1);
	
	return okrugldo(Math.random() * (k-n),s) + n;
}

function slKrome(a,p1,p2,p3){
/**Случайное число, кроме a:
если a - массив, то не содержащееся в нём;
если a - число или строка, то не равное ему;
если a - функция, принимающая параметр - то не удовлетворяющее ей (т. е. чтобы функция вернула 0).*/
	var b;
	
	if(a.isNumber || a.isString)
		do{
			b=sl(p1,p2,p3);
		}while(b==a);
	else if(a.isArray)
		if(a.length)
			do{
				b=sl(p1,p2,p3);
			}while(a.hasElem(b));
		else
			return sl(p1,p2,p3);
	else if(a.isFunction)
		do{
			b=sl(p1,p2,p3);
		}while(a(b));
	else
		console.error('Первый параметр функции slKrome должен быть числом, строкой, массивом или функцией.');
	return b;
}

function sluchDel(a){
/**Случайный делитель числа a*/
	return a.sluchDel();
}

function sluchiz(a,n){
/**Массив n случайных неповторяющихся элементов массива a*/	
	if(!(n>=1))
		n=1;
	var b=a.slice();
	b.shuffle();
	b.length=n;
	return b;
}

function chislit(a,s1,s2,s5){
/**Вспомогательная процедура*/
	a=a%100;
	if((a>=5)&&(a<=20))
		return s5;
	
	a=a%10;
	if(a==1)
		return s1;
	
	if((a<=4)&&(a>=2))
		return s2;
	
	return s5;
}

function s3ug(Ax,Ay,Bx,By,Cx,Cy){
/**Площадь треугольника по координатам трёх вершин.*/
	return 0.5*(Ax*By+Ay*Cx+Bx*Cy-By*Cx-Cy*Ax-Ay*Bx).abs();
}

function chislitM(p1,p2,p3,p4){
	return p1.ts()+' '+chislit(p1,p2,p3,p4);
}

function chislitlx(p1,p2,p3){
/***/
	var rez=sklonlxkand(p2,undefined,0);
	switch(p3){
		case 'i': return chislitM(p1,	rez.ie,	(rez.r2?rez.r2:rez.re),	rez.rm);
		case 'r': return chislitM(p1,	rez.re,	 rez.rm,				rez.rm);
		case 'd': return chislitM(p1,	rez.de,	 rez.dm,				rez.dm);
		case 'v': return chislitM(p1,	rez.ve,	(rez.r2?rez.r2:rez.ve),	rez.vm);
		case 't': return chislitM(p1,	rez.te,	 rez.tm,				rez.tm);
		case 'p': return chislitM(p1,	rez.pe,	 rez.pm,				rez.pm);
	}
	return chislitM(p1,rez.ie,(rez.r2?rez.r2:rez.re),rez.rm);
}

var Drob={};

Drob.prov=function(p1){
	p1=Drob.fixN(p1);
	return !!p1.ch&&!!p1.zn;
}

Drob.fixN=function(p1){
	if(p1.isNumber)
		p1={ch:p1,zn:1};
	return p1;
}

Drob.sokr=function(p1){
	p1=Drob.fixN(p1);
	if(!Drob.prov(p1))return null;
	if(p1.zn<0){
		p1.ch*=-1;
		p1.zn*=-1;
	}
	var a1=p1.ch.nod(p1.zn);
	p1.ch/=a1;
	p1.zn/=a1;
	return p1;
}

function clone(obj){
	if(obj == null || typeof(obj) != 'object')
		return obj;
	
	var temp = {};
	for(var key in obj)
		if(obj[key] === undefined)
			temp[key]=undefined;
		else if(obj[key].isArray)
			temp[key]=obj[key].slice();
		else
			temp[key] = clone(obj[key]);
	return temp;
}

function sl1(){
	return Math.random().round();
}

function sp(a){//Я просто оставлю это здесь
	for(var i=0,c=a.split('\''),b=[];i<c.length;i++)
		b=b.concat(i%2?c[i]:c[i].split(' '));
	for(var i=0;i<b.length;b.splice(i,!b[i++])){};
	return b;
}

function cvet(a){
	return '#'+a.r.toString(16).dopdo('0',2)+a.g.toString(16).dopdo('0',2)+a.b.toString(16).dopdo('0',2);
}

function proporMezhdu(a,b,pr){
	return a.proporMezhdu(b,pr);
}

function cvetMezhdu(a,b,pr){
	return cvet({
		r:proporMezhdu(a.r,b.r,pr).round(),
		g:proporMezhdu(a.g,b.g,pr).round(),
		b:proporMezhdu(a.b,b.b,pr).round(),
	});
}

function perevodVelichin(a){
/**Наброски движка про перевод величин*/
	var edIzm=a.iz(2);
	var ishIzm=edIzm[0];
	var rezIzm=edIzm[1];
	var koef=sl(0.1,9.9,0.1)*10 .pow(sl(-1,1));
	var otv=koef*ishIzm[1]/rezIzm[1];
	window.vopr.txt='Выразите '+chislitlx(koef,ishIzm[0])+' в '+lx[rezIzm[0]].pm;
	window.vopr.ver=[otv.ts()];
}


function multiplyMatrix(A,B){//http://mathhelpplanet.com/viewtopic.php?f=44&t=22337
	var rowsA = A.length,
		colsA = A[0].length,
		rowsB = B.length,
		colsB = B[0].length,
		C = [];
	for(var i=0; i<rowsA; i++)
		C[i]=[];
	for(	var k=0; k<colsB; k++)
		for(	var i=0; i < rowsA; i++){
			var temp=0;
			for(	var j = 0; j < rowsB; j++)
				temp += A[i][j]*B[j][k];
			C[i][k] = temp;
		}
	return C;
}

function Determinant(A){	// Определитель матрицы (используется алгоритм Барейса)
	var N=A.length,
		B=[],
		denom=1,
		exchanges=0;
	for(var i=0; i<N; ++i){
		B[i]=[];
		for(var j=0; j<N; ++j)
			B[i][j] = A[i][j];
	}
	for(var i=0; i<N-1; ++i){
		var maxN=i,
		maxValue=Math.abs(B[i][i]);
		for(var j=i+1; j<N; ++j){
			var value=Math.abs(B[j][i]);
			if(value>maxValue){
				maxN=j;
				maxValue = value;
			}
		}
		if(maxN>i){
			var temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
			++exchanges;
		}else if(maxValue==0)
			return maxValue; 
		var value1=B[i][i];
		for(var j = i+1; j < N; ++j){
			var value2=B[j][i];
			B[j][i]=0;
			for(var k=i+1; k<N; ++k)
				B[j][k]=(B[j][k]*value1-B[i][k]*value2)/denom;
		}
		denom=value1;
	} //@ http://mathhelpplanet.com/viewtopic.php?f=44&t=22390
	if(exchanges%2)
		return -B[N-1][N-1];
	else
		return B[N-1][N-1];
}

function MatrixCofactor(i,j,A){   //Алгебраическое дополнение матрицы
	var N=A.length,
		sign=((i+j)%2==0) ? 1 : -1;
	for(var m=0; m<N; m++){
		for(var n=j+1; n<N; n++)
			A[m][n-1]=A[m][n];
		A[m].length--;
	}
	for(var k=i+1; k<N; k++)
		A[k-1] = A[k];
	A.length--;
	return sign*Determinant(A);
}

function AdjugateMatrix(A){   //Союзная (присоединённая) матрица
	var N=A.length,
		B=[],
		adjA=[];
	for(var i=0; i<N; i++){
		adjA[i]=[]; 
		for(var j=0; j<N; j++){
			for(var m=0; m<N; m++)
			{
				B[m]=[];
				for(var n = 0; n < N; n++)
					B[m][n] = A[m][n];
			}
			adjA[i][j] = MatrixCofactor(j,i,B);
		}
	}
	return adjA;
}

function InverseMatrix(B){   // Обратная матрица
	var det=Determinant(B);
	if(!det)
		return false;
	var N=B.length,
		A = AdjugateMatrix(B);
	for(var i=0; i<N; i++)
		for(var j=0; j<N; j++)
			A[i][j] /= det; 
	return A;
}

function objSum(a,b){
/**Сложение двух матриц или двух чисел.*/
	if(!a)
		return b;
	if(!b)
		return a;
	if(a.isNumber && b.isNumber)
		return a+b;
	if(a.isArray && b.isArray)
		return a.map(function(a1,b1){
			return objSum(a1,b[b1]);
		});
	return undefined;
}

function objUmn(a,b){
/**Умножение a на b (матрица или число)*/
	if(!a || !b)
		return 0;
	if(a.isNumber && b.isNumber)
		return a*b;
	if(a.isArray && b.isArray)
		return multiplyMatrix(a,b);
	if(a.isArray && b.isNumber)
		return a.map(function(a1){
			return objUmn(a1,b);
		});
	if(b.isArray && a.isNumber)
		return objUmn(b,a);
	
	return undefined;
}

function generateMatrix(stroki,stolbcy,min,max,p1){
/**Генерирует матрицу из случайных чисел. min, max и p1 - параметры sluchch.*/
	var rez=[];
	for(var i=0;i<stroki;i++){
		rez[i]=[];
		for(var j=0;j<stolbcy;j++)
			rez[i][j]=sl(min,max,p1);
	}
	return rez;
}

function generateScalMatrix(x,n){
/**Генерирует скалярную иатрицу n на n с числом x на главной диагонали.*/
	var rez=generateMatrix(n,n,0);
	for(var i=0;i<n;i++)
		rez[i][i]=x;
	return rez;
}

//перевод числа x из системы с основанием sysBefore в систему с основанием sysAfter
function intoAnotherSystem(x,sysBefore,sysAfter) {
//перевод из заданной в 10-ную
	var i=String(x).length;
	var c = 1;
	var x10 = 0;
	while (i>0) {
		var t = String(x).charAt(i-1)*1;
		if (isNaN(t))
			t = String(x).charCodeAt(i-1)-String("A").charCodeAt(0)+10;
		x10 = t*c+x10;
		i=i-1;
		c = c*sysBefore;
	}
//перевод из 10-ной в заданную
	var finall = '';
	while (x10>0) {
		var t = String(x10 % sysAfter);
		if (x10 % sysAfter >= 10)
			t = String.fromCharCode(String("A").charCodeAt(0)+(x10 % sysAfter)-10);
		x10 = Math.floor(x10/sysAfter);
		finall = t+finall;
	}
	return(finall);
}

function isZ(n){
/**Является ли n целым числом.*/
	return n.isZ();
}

function isPolnKvadr(n){
/**Является ли n полным квадратом.*/
	return n.isPolnKvadr();
}

document.writeln=function(p1){
	return document.write(p1+'<br/>');
}

function hasErrors(p,bdr){
	if(p==undefined)
		return 'undefined; '
	if(p.isFunction)
		return 0;
	var rez='';
	if(p.isNumber)
		p=''+p;
	if(p.isString){
		if(p.match(/NaN/))
			rez+='NaN; ';
		if(p.match(/undefined/))
			rez+='undefined; ';
		if(p.match(/Infinity/))
			rez+='Infinity; ';
		if(p.match(/[.,][0-9]*00000/))
			rez+='00000; ';
		if(!bdr && p.reverse().match(/[0-9]{6,}[.,](?!0("|sir))/))
			rez+='6 и более цифр после десятичной запятой '+
				'(если так и должно быть, установите vopr.kat.bdr значение 1; ';
	}
	if(p.isArray){
		for(var i=0;i<p.length;i++){
			rez+=hasErrors(p[i]);
		}
	}
	return rez;
}

function rang_mat(A){//Отсюда: http://liloisproj.narod.ru/mat_rang.htm
	var i=A.length;
	var j=A[0].length;
	var q = Math.min(i,j);

	while(q) // проверка: порядок матрицы меньше или равен минимальному из размеров матрицы?
	{ // если да
		var B = []; // создаем новую матрицу размера q
		for(var w=0;w<q;w++)
			B[w]=[];
		
		for(var a=0;a<(i-(q-1));a++) // тут начинается перебор матриц q-го порядка
		{
			for(var b=0;b<(j-(q-1));b++)
			{
				for(var c=0;c<q;c++)
				{
					for(var d=0;d<q;d++)
					{
						B[c][d] = A[a+c][b+d];
					}
				}

				if(B.det()) // если определитель матрицы отличен от нуля
				{ // то
					return q; // присваиваем рангу значение q
				}
			}
		}
		q--;
	}
	return 0;
}

function getLen(x1, x2, y1, y2){
	return Math.sqrt( Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2) );
}

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeStruct(strNames){
	var names = strNames.split(' ');
	var count = names.length;
	function constructor(){
		for (var i = 0; i < count; i++){
			this[names[i]] = arguments[i];
		}
	}
	return constructor;
}

function make2Array(ch,k) {
/**из числа делает массив 0 и 1 с количеством элементов k*/
	var x=[];
	for (var i=0; i<k; i++) {
		var t=ch % 2;
		ch = Math.floor(ch / 2);
		x.push(t);
	}
	return x;
}

function parseLogic(exp) {
/**преобразует логическое выражение в выражение, доступное для вычисления*/
	while (exp.indexOf('>')!=-1){
		var t = exp.indexOf('>');
		var A = findA(exp,t);
		exp=exp.insert(A,'!');
		exp = exp.replace('>','||');
	}
	while (exp.indexOf('~')!=-1){
		var t = exp.indexOf('~');
		var A = findA(exp,t);
		var B = findB(exp,t);
		var exp1=exp.substring(A,t);
		var exp2=exp.substring(t+1,B+1);
		exp = exp.replace(exp1+'~'+exp2,'('+exp1+'&&'+exp2+')'+'||(!'+exp1+'&&!'+exp2+')');
	}
	return exp;
}

function findA(exp,t) {
	var i=t-1;
	if (exp[t-1]==')') {
		var k = 1;
		while (k>0){
			i--;
			if (exp[i]==')')
				k++;
			else if (exp[i]=='(')
				k--;
		}
	}
	else
		i=i-3;
	while (exp[i-1]=='!')
		i--;
	return i;
}

function findB(exp,t) {
	var i=t+1;
	while (exp[i]=='!')
		i++;
	if (exp[t+1]=='(') {
		var k = 1;
		while (k>0){
			i++;
			if (exp[i]=='(')
				k++;
			else if (exp[i]==')')
				k--;
		}
	}
	else
		i = i+3;
	return i;
}

function printLogic(exp) {
/**&#172; - отрицание
&#8594; - стрелка направо
&#8743; - Логическая и
&#8744; - Логическая иили
&#8801; - Идентичный, тождество
печатает логическое выражение*/
	exp=exp.replace(/\|\|/g,'&#8744;');
	exp=exp.replace(/\&\&/g,'&#8743;');
	exp=exp.replace(/\~/g,'&#8801;');
	exp=exp.replace(/\>/g,'&#8594;');
	exp=exp.replace(/\!/g,'&#172;');
	var re = /x\[(\d)\]/g;
	exp = exp.replace(re, function(str,a) { return 'X'+(Number(a)+1) });

	return exp;
}

function genLogFunc(k,b) {
/**генерирует логическую функцию*/
	var t=0;
	var f='';
	for (var i=0;i<k;i++) {
		var d3=sl1();
		if (d3&&i!=0) {
			f=f+'(';
			t++;
		}
		f+='!'.esli(sl1());
		f=f+'x['+i+']';
		if (i!=k-1)	{
			var d4=sl1();
			if (d4&&t>0) {
				f=f+')';
				t--;
			}
			var d2=0;
			if (!b)
				d2=sluchch(3);
			else
				d2=sluchch(1,2);
			switch (d2) {
				case 0: 
					f='('+f+')';
					f=f+'>';
					break;
				case 1: 
					f=f+'||';
					break;
				case 2: 
					f=f+'&&';
					break;
				case 3: 
					f='('+f+')'+'~'+'(';
					t++;
					break;
			}
		}
	}
	for (var i=0; i<t; i++)
		f=f+')';
	//убираем лишние скобки
	var re = /\(x\[(\d)\]\)/g;
	while (f.search(re)!=-1) {
		f = f.replace(re, "x[$1]");
	}
	re = /\(!x\[(\d)\]\)/g;
	while (f.search(re)!=-1) {
		f = f.replace(re, "!x[$1]");
	}
	return f;
}

function slLetter(b) {
/**генерирует случайную букву английского алфавита*/
	var a = '';
	if (!b)
		a = String.fromCharCode('a'.charCodeAt(0)+sluchch(25));
	else {
		if (b.isString) {
			var temp = b.charCodeAt(0)-'a'.charCodeAt(0);
			a = String.fromCharCode('a'.charCodeAt(0)+slKrome(temp,25));
		}
		else if (b.isArray) {
			var temp=[];
			for (var i=0; i<b.length; i++)
				temp[i] = b[i].charCodeAt(0)-'a'.charCodeAt(0);
			a = String.fromCharCode('a'.charCodeAt(0)+slKrome(temp,25));
		}
	}
	return a;
}

function genMask() {
/**генерирует случайную маску*/
	var l = sluchch(5,10);//количество символов в маске
	var mask = '';
	for (var i=0; i<l; i++) {
		var d = sluchch(3);
		switch(d) {
			case 0:
				mask+='?';
				break;
			case 1:
				mask+='*';
				break;
			case 2:
			case 3:
				mask+=slLetter();
				break;
			
		}
	}
	if (mask.search(/\?/)==-1)
		mask = mask+'?';
	return mask;
}

function genWrongWordForMask(rmask) {
/**генерирует случайное слово, похожее на маску, но с ошибкой*/
	var word='';
	var reg = rmask.replace(/\*/g,'[a-z]*').replace(/\?/g,'[a-z]');
	var mask = rmask;
	do{
		var re1 = /\*+\?\**|\**\?\*+/;//*?*
		var re2 = /([^\*]*)\?([^\*]*)/;//?
		if (sl1()&& mask.search(re1)!=-1) {
			mask=mask.replace(re1,'');
		}
		else if (sl1() && mask.search(re2)!=-1) {
			var w='';
			var d = slKrome(1,3);
			for (var j=0; j<d; j++)
				w+=slLetter();
			mask=mask.replace(re2,"$1"+w+"$2");
		}
		else {
			var l = mask.length;
			var d = sluchch(l-1);
			while (!mask[d].isLetter()) {
				d=sluchch(l-1);
			}
			mask=mask.replace(mask[d],slLetter());
		}
		var word = genWordForMask(mask);

	}
	while (word.search(reg)!=-1)
	return word;
}

function genWordForMask(mask) {
/**генерирует случайное слово по маске*/
	var l = mask.length;//количество символов в маске
	var word = '';
	for (var i=0; i<l; i++) {
		switch(mask[i]) {
			case '*':
				var d = sluchch(3);
				for (var j=0; j<d; j++)
					word+=slLetter();
				break;
			case '?':
				word+=slLetter();
				break;
			default:
				word+=mask[i];
				break;
			
		}
	}
	return word;
}

function genAlg() {
/**Для составления цепочек/слов/бус/чисел разрешается использовать бусины k типов, обозначаемых буквами  
цепочка должна состоять из N бусин
0) нет правила
1) На i-м месте цепочки стоит одна из бусин [список]
2) На i-м месте не может стоять одна из бусин [список]
3) На i-м месте цепочки стоит бусина, которой нет на j-м месте цепочки
4) На i-м месте цепочки такая же бусина, как и на j-м месте цепочки
5) На i-м – любая гласная, если j согласная, и любая согласная, если j гласная
6) На i-м – любая гласная, если j гласная, и любая согласная, если j согласная
7) На i-м месте цепочки стоит гласная/согласная буква*/
	var alg=[];
	if (sl1()==0)
		alg.push('z');//цифры
	else
		alg.push('l');//буквы
	var has0 = false;
	var has1 = false;
	var k = sluchch(4,6);
	var N = sluchch(3,k-1);
	alg[1]=[];
	for (var i=0; i<k; i++) {
		if (alg[0]=='z'){
			var c = slKrome(alg[1],9);//список элементов, которые  можно использовать в цепочке
			if (c%2==0)
				has0=true;
			else
				has1=true;
		}
		else {
			var c = slLetter(alg[1]);//список элементов, которые  можно использовать в цепочке
			if (c.isGl())
				has0=true;
			else
				has1=true;
		}
		alg[1].push(c);
	}

	for (var i=2; i<N+2; i++) {
		var d=0;
		if (has0 && has1)
			d = sluchch(7);//номер правила, используемого для данной бусины
		else
			d = sluchch(4);//если есть только согласные(гласные) буква, нельзя использовать 4,5 правило
		alg[i]=[];
		alg[i][0]=d;
		switch (d) {
			case 1:
			case 2:
				alg[i][1]=[];
				var c = sluchch(1,k-2);
				for (var j=0; j<c; j++)
					alg[i][1].push(slKrome(alg[i][1],k-1));//кладутся не сами буквы/цифры, а их индексы из alg[1]!
				break;
			case 3:
			case 4:
			case 5:
			case 6:
				if (i>2)
					alg[i][1]=slKrome(i-2,i-2);
				else alg[i][0]=0;
				break;
			case 7:
				alg[i][1]=sl1();//
				break;
		}
	}
	return alg;
}

function algInText(alg) {
/**Преобразует алгоритм в текст*/
	var k = alg[1].length;
	var N = (alg.length-2);
	var ch = '';
	var text  = 'Для составления цепочек разрешается использовать бусины '+k+' типов, обозначаемых';
	if (alg[0]=='z'){
		text += ' цифрами ';
		ch = ['четная','нечетная'];
	}
	else {
		text += ' буквами ';
		ch = ['гласная','согласная'];
	}
	text += alg[1];
	text += '. Цепочка должна состоять из '+N+' бусин, при этом должны соблюдаться следующие правила:';
	for (var i=2; i<N+2; i++) {
		if (alg[i][0]!=0) {
			text = text+'<br/>';
			if (i==2)
				text = text+'На первом месте цепочки ';
			else if (i==N+1)
				text = text+'На последнем месте цепочки ';
			else
				text = text+'На '+(i-1)+'-м месте цепочки ';
		}
		switch (alg[i][0]) {
			case 1:
				text += 'стоит ';
				if (alg[i][1].length==1)
					text += 'бусина ';
				else
					text += 'одна из бусин ';
				for (var j=0; j<alg[i][1].length; j++)
					text += alg[1][alg[i][1][j]]+', ';
				break;
			case 2:
				text += 'не может стоять ';
				if (alg[i][1].length==1)
					text += 'бусина ';
				else
					text += 'одна из бусин ';
				for (var j=0; j<alg[i][1].length; j++)
					text += alg[1][alg[i][1][j]]+',';
				break;
			case 3:
				text += 'стоит бусина, которой нет на '+
					(alg[i][1]+1)+'-м месте цепочки';
				break;
			case 4:
				text += 'стоит такая же бусина, как и на '+
					(alg[i][1]+1)+'-м месте цепочки';
				break;
			case 5:
				text += 'стоит любая '+ch[0]+', если '+
					(alg[i][1]+1)+'-я '+ch[1]+', и любая '+ch[1]+', если '+
					(alg[i][1]+1)+'-я '+ch[0];
				break;
			case 6:
				text += 'стоит любая '+ch[0]+', если '+
					(alg[i][1]+1)+'-я '+ch[0]+', и любая '+ch[1]+', если '+
					(alg[i][1]+1)+'-я '+ch[1];
				break;
			case 7:
				text += 'стоит '+ch[alg[i][1]]+' буcина';
				break;
		}
	}
	return text;
}

function genWordForAlg(walg) {
/**генерирует цепочку для алгоритма*/
	var alg = walg.slice();
	var word='';
	var k = alg[1].length;
	var ar0 = [];
	var ar1 = [];
	for (var i=0; i<k; i++){
		if (alg[0]=='z'){
			if (alg[1][i]%2==0)
				ar0.push(alg[1][i]);
			else
				ar1.push(alg[1][i]);
		}
		else {
			if (alg[1][i].isGl())
				ar0.push(alg[1][i]);
			else
				ar1.push(alg[1][i]);
		}
	}
	for (var i=2; i<alg.length; i++) {
		switch (alg[i][0]) {
			case 0:
				word+=alg[1].iz();
				break;
			case 1:
				word+=alg[1][alg[i][1].iz()];
				break;
			case 2:
				word+=alg[1][slKrome(alg[i][1],k-1)];
				break;
			case 3:
				word+=alg[1][slKrome(alg[1].indexOf(word[alg[i][1]]),k-1)];
				break;
			case 4:
				word+=word[alg[i][1]];
				break;
			case 5:
				if (alg[0]=='z'){
					if (word[alg[i][1]]%2==0)
						word+=ar1.iz();
					else
						word+=ar0.iz();
				}
				else {
					if (word[alg[i][1]].isGl())
						word+=ar1.iz();
					else
						word+=ar0.iz();
				}
				break;
			case 6:
				if (alg[0]=='z'){
					if (word[alg[i][1]]%2==0)
						word+=ar0.iz();
					else
						word+=ar1.iz();
				}
				else {
					if (word[alg[i][1]].isGl())
						word+=ar0.iz();
					else
						word+=ar1.iz();
				}
				break;
			case 7:
				if (alg[i][1])
					word+=ar1.iz();
				else
					word+=ar0.iz();
				break;
		}
	}
	return word;
}

function genWrongWordForAlg(walg) {
/**генерирует цепочку для алгоритма*/
	var alg = walg.copyAr();
	var N = (alg.length-2);
	var r = 0;
	do {
		r = sluchch(2,N+1);
	} while (alg[r][0]==0);
	switch (alg[r][0]) {
		case 1:
			alg[r][0]=2;
			break;
		case 2:
			alg[r][0]=1;
			break;
		case 3:
			alg[r][0]=4;
			break;
		case 4:
			alg[r][0]=3;
			break;
		case 5:
			alg[r][0]=6;//
			break;
		case 6:
			alg[r][0]=5;//
			break;
		case 7:
			alg[r][1]=1-alg[r][1];//
			break;
	}
	var word = '';
	var word = genWordForAlg(alg);
	return word;
}


function printLogicRus(exp,ar) {
	exp=exp.replace(/\|\|/g,' ИЛИ ');
	exp=exp.replace(/\&\&/g,' И ');
	exp=exp.replace(/\!/g,' НЕ ');
	var re = /c\[(\d)\]/g;
	exp = exp.replace(re, function(str,a) { return ar[Number(a)] });
	return exp;
}

function genPifag(){
	return objUmn([[sl(1,5)]],[om.pifagtr.iz().slice()])[0];
}

function mapRecursive(obj,fun){
	if(obj.isFunction){
		return obj;
	}
	if(obj===undefined || obj.isNumber || obj.isString){
		return fun(obj);
	}
	if(obj.isArray){
		var len=obj.length;
		var rez=[];
		for(var i=0;i<len;i++){
			rez[i]=mapRecursive(obj[i],fun);
		}
		return rez;
	}
	if(obj.isObject){
		var rez={};
		for(var chto in obj){
			rez[chto]=mapRecursive(obj[chto],fun);
		}
		return rez;
	}
	return obj;
}

function compareObjects(a,b,propList){
	var len=propList.length;
	for(var i=0;i<len;i++){
		if(a[propList[i]]<b[propList[i]])
			return -1;
		else if (a[propList[i]]>b[propList[i]])
			return 1;
	}
	return 0;
}

function safeinc(obj,prop){
	if(!obj[prop])
		obj[prop]=1;
	else
		obj[prop]++;
}

function setProps(obj,props){
	for(var chto in props){
		obj[chto]=props[chto];
	}
}
'use strict';
/*Функции, затрагивающие DOM, но не использующие jquery и другие внешние библиотеки*/

function escapeFromIframe(){
/**"Выпрыгивание" из iframe*/
	if(top.location.href!=document.location.href)
		top.location.href=document.location.href;
}

function getDocHeight(){
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}//Вроде как отсюда: http://james.padolsey.com/javascript/get-document-height-cross-browser/

function catchTab(elem,key){
	if(key.keyCode==9){
		var n=elem.scrollTop;
		var val=elem.value;
		var sel=elem.selectionStart;
		var rep=val.substr(elem.selectionStart-1,elem.selectionEnd-elem.selectionStart);
		if(rep.match(/[\n\r]/)){
			console.log(rep);
			rep=rep.replace(/[\n](?![\n\r])/g,'\n\t');
			rep=rep.replace(/[\r](?![\n\r])/g,'\r\t');
			elem.value=val.substr(0,sel-1)+rep+val.substr(elem.selectionEnd-1);
		}else{
			elem.value=val.substr(0,sel)+'\t'+val.substr(elem.selectionEnd);
			elem.selectionStart=elem.selectionEnd=sel+1;
		}
		elem.scrollTop=n;
		return false;
	}
}

function linkSpan(link,blank)
{
	if(blank)
		window.open(link.replace("_","http://"));
	else
		self.location.replace(link.replace("_","http://"));
}
'use strict';

Object.prototype.clone=function(){
/**Рекурсивно клонирует объект.*/
	return clone(this);
}

Object.prototype.makeAllPropertiesNotEnumerable=function(){
/**Сделать все свойства объекта неперечислимыми.*/
	for(var chto in this)
		Object.defineProperty(this, chto, {enumerable: false});
}

Object.prototype.cloneNonRecursive=function(){
/**Нерекурсивно клонирует объект.*/
	var a={};
	for(var chto in this)
		a[chto]=this[chto];
	return a;
}

Object.prototype.addToGlobal=function(glname,p1){
/**Добавляет все перечислимые свойства объекта в глобальную переменную и, если p1, то делает их в объекте неперечислимыми.*/
	if(window[glname]===undefined)
		window[glname]={};
	for(var chto in this){
		window[glname][chto]=this[chto];
		if(p1)
			Object.defineProperty(this, chto, {enumerable: false});
	}
	return this;
}

Object.prototype.importFrom=function(p1){
/**Импортировать все свойства p1 в данный объект*/
	if(p1)
		for(var chto in p1)
			this[chto]=p1[chto];
}

Object.prototype.NaNtoUndefined=function(r){
	for(var chto in this){
		if(this[chto]!==undefined && this[chto].isNumber && isNaN(this[chto])){
			this[chto]=undefined;
		}else if(r && this[chto].isObject){
			this[chto].NaNtoUndefined();
		}
	}
}

Object.prototype.isObject=true;

Object.prototype.addToGlobal('docsObject',1);
'use strict';
Array.prototype.shuffle = function(b){
/**Перемешивает массив случайным образом. Если b, то ещё и рекурсивно на один уровень.*/
	var i = this.length, j, t;
	while(i) 
	{
		j=((i--)*Math.random() ).floor();
		t=b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
		this[i]=this[j];
		this[j]=t;
	}
	return this;
};//за основу взят пример с tigir.com 

Array.prototype.soed=function(){
/**"Склеивает" массив в строку без разделителей*/
	return this.join('');
};

Array.prototype.sum=function(){
/**Находит сумму элементов числового массива. Если есть нечисловые элементы, они не учитываются.*/
	var a=0;
	var b=this.length;
	for(var i=0;i<b;i++){
		if((this[i]>0)||(this[i]<0)){
			a+=this[i];
		}
	}
 return a;
};

Array.prototype.sumObj=function(){
/**Находит сумму массива чисел или матриц.*/
	var a=0;
	var b=this.length;
	for(var i=0;i<b;i++){
		a=objSum(a,this[i]);
	}
 return a;
};

Array.prototype.umnObj=function(){
/**Находит произведение массива чисел или матриц.*/
	var a=1;
	var b=this.length;
	for(var i=0;i<b;i++){
		a=objUmn(a,this[i]);
	}
 return a;
};

Array.prototype.min=function(f){
/**Индекс минимального элемента числового массива. Если f, то первого, иначе последнего.*/
	var i;
	var m=0;
	if(f){
		for(i=this.length;i;i--)
			if(this[i]<=this[m])
				m=i;
	}else
		for(i=this.length;i;i--)
			if(this[i]<this[m])
				m=i;
	return m;
}

Array.prototype.max=function(f){
/**Индекс максимального элемента числового массива. Если f, то первого, иначе последнего.*/
	var i;
	var m=0;
	if(f){
		for(i=this.length;i;i--){
			if(this[i]>=this[m]){
				m=i;
			}
		}
	}else{
		for(i=this.length;i;i--){
			if(this[i]>this[m]){
				m=i;
			}
		}
	}
	return m;
}

Array.prototype.minE=function(){
/**Минимальный элемент числового массива.*/
	return this[this.min()];
}

Array.prototype.maxE=function(){
/**Максимальный элемент числового массива.*/
	return this[this.max()];
}

Array.prototype.toStandart=function(){
/**Преобразует каждый элемент массива (строку или число) в строку, записанную "по стандарту".*/
	var len=this.length-1;
	for(;len+1;len--){
		this[len]=this[len].toStandart();
	}
}

Array.prototype.iz=function(p1){
/**Если p1 опущено, возвращает случайный элемент массива, иначе последовательность p1 неповторяющихся элементов массива.*/
	if(p1)
		return sluchiz(this,p1);
	else
		return this[sl(0,this.length-1)];
}

Array.prototype.tr=function(p1,p2){
/**Возвращает строку таблицы с записанными в неё элементами массива.
	p1 и p2 позволяют выбрать тэги, отличные от td и tr соотв.*/
	var len=this.length-1;
	var str='';
	for(;len+1;len--){
		str=this[len].vTag(p1?p1:'td')+str;
	}
	return str.vTag(p2?p2:'tr');
}

Array.prototype.zapslch=function(m,n,p1,p2,p3){
/**Присваивает элементам с m по n случайные значения от p1 до p2 с шагом генерации p3. p2 и p3 можно опускать, как в sluchch()*/
	for(;m<=n;m++)
		this[m]=sluchch(p1,p2,p3);
	return this;
}

Array.prototype.N=function(p1,p2){
/**Присваивает p1 первым элементам массива значения натурального ряда, умноженные на p2, если p2 не ноль*/
	for(var i=0;i<p1;this[i++]=(p2?i*p2:i)){};
	this.length=p1;
	return this;
}

Array.prototype.sluchiz=function(n){
/**Возвращает массив из p1 неповторяющихся элементов массива.*/
	return sluchiz(this,n);
}

Array.prototype.malRazn=function(n,s,p){
/**Заполняет массив значениями, каждое из к-рых отличается от предыдущего не более, чем на s*p, и притом с шагом дискретизации s
 n - сколько элементов добавляем
 s - шаг изменения
 p - максимальное количество шагов изменения (в обе стороны)
*/
	for(var i=1;i<=n;i++)
		this[i]=this[i-1]+s*sluchch(-p,p);
	return this;
}

Array.prototype.pervSovp=function(p1){
/**Возвращает индекс первого элемента, совпавшего с данным, и -1, если таких элементов нет*/
	for(var i=0;i<this.length;i++)
		if(this[i]==p1)
			return i;
	return -1;
}

Array.prototype.poslSovp=function(p1){
/**Возвращает индекс последнего элемента, совпавшего с данным, и -1, если таких элементов нет*/
	for(var i=this.length-1;i>=0;i--)
		if(this[i]==p1)
			return i;
	return -1;
}

Array.prototype.sovp=function(p1){
/**Возвращает количество элементов, совпавших с данным, и 0, если таких элементов нет*/
	var s=0;
	for(var i=this.length-1;i>=0;i--)
		if(this[i]==p1)
			s++;
	return s;
}

Array.prototype.toFixedLess=function(p1){
/**Возвращает массив, в котором каждый элемент - строка, содержащая соттв. элемент данного, округлённый до p1 цифр после запятой*/
	var a=[];
	var len=this.length;
	for(var i=0;i<len;i++)
		a[i]=this[i].toFixedLess(p1);
	return a;
}

Array.prototype.dopFixedLess=function(p1){
/**Дополняет массив элементами, округлёнными до p1 цифр после запятой и представленными в виде строк*/
	var len=this.length;
	for(var i=0;i<len;i++)
		this[i]=[this[i],this[i].toFixedLess(p1)];
	return this;
}

Array.prototype.T=function(){
/**Возвращает транспонированный массив*/
	var l1=this.length;
	var l2=0;
	for(var i=0;i<l1;i++)
		if(this[i].length>l2)
			l2=this[i].length;
	var a=[];
	for(i=0;i<l2;i++)
		a[i]=[];
	for(i=0;i<l1;i++)
		for(var j=0;j<l2;j++)
			a[j][i]=this[i][j];
	return a;
}

Array.prototype.zapMonot=function(n,a,minD,maxD,shag){
/**Заполняет массив монотонно возрастающими или убывающими числами.
a - нулевой (начальный) элемент массива.
n - количество элементов
Каждый следующий элемент массива отличается от предыдущего не менее, чем на minD и не более, чем maxD, с шагом shag*/
	this[0]=a;
	for(var i=1;i<n;i++)
		this[i]=this[i-1]+sluchch(minD,maxD,shag);
	return this;
}

Array.prototype.udFunc=function(f1){
/**Количество элементов, удовлетворяющих в качестве параметра функции, возвращающей 0 или 1. Дикий костыль.*/
	return this.map(f1).sum();
}

Array.prototype.kolvoMzhd=function(min,max,vkl){
/**Возвращает кол-во чисел в массиве, лежащих между min и max, если vkl, то включительно*/
	return this.udFunc(function(p1){
		return vkl?p1>=min&&p1<=max:p1>min&&p1<max;
	});
}

Array.prototype.isArray=true;

Array.prototype.mn_plus=function(p1){
/**Прибавляет к массиву коэффициентов многочлена, записанных по возрастанию степеней, другой такой массив.
Текущий массив не изменяет!
*/
	var b=this.slice()
	if(p1.isNumber){
		b[0]+=p1;
		return b;
	}
	if(!p1.isArray)
		return this;
	if(p1.length>this.length)
		return p1.mn_plus(this);

	var len=p1.length;
	for(var i=0; i<len;i++)
		b[i]+=p1[i];
	return b;
}

Array.prototype.mn_umn=function(p1){
/**Умножает массив коэффициентов многочлена, записанных по возрастанию степеней, на другой такой массив.
Текущий массив не изменяет!
*/
	var b=this.slice()
	if(p1.isNumber){
		return this.map(function(p2){return p1*p2;});
	}
	if(!p1.isArray){
		return this;
	}
	if(p1.length>this.length){
		return p1.mn_umn(this);
	}
	var c=p1.slice()
	var d=[];
	var len=p1.length;
	for(var i=0; i<len;i++){
		d=d.mn_plus(b.mn_umn(p1[i]));
		b.unshift(0);
	}
	return d;
}

Array.prototype.slag=function(){
/**Перемешивает массив в случайном порядке и радостно соединяет плюсиками.*/
	return this.shuffle().join('+');
}

Array.prototype.addPrefix=function(p1){
/**Добавляет к каждому элементы массива префикс p1.
Текущий массив не изменяет!*/
	return this.map(function(p2){return p1+p2;});
}

Array.prototype.toSum=function(a){
/**Возвращает массив, элементы которого пропорциональны элементам данного, но их сумма равна a или 1, если a не указано*/
	if(a==undefined)
		a=1;
	var s=this.sum();
	return this.map(function(p1){return a*p1/s});
}

Array.prototype.sumPyram=function(){
/**Присваивает каждому элементу массива значение суммы всех предыдущих*/
	for(var i=1;i<this.length;i++)
		this[i]+=this[i-1];
	return this;
}

Array.prototype.sVeroyatn=function(){
/**Возвращает номер элемента массива с вероятностью, пропорциональной значению элемента*/
	var th=this.toSum().sumPyram();
	var a=Math.random();
	var i;
	for(i=0; a>th[i] && i<th.length ;i++){};
	return i;
}

Array.prototype.hasElem=function(a){
/**Определяет, есть ли в массиве заданный элемент*/
	return this.some(function(p1){
		return p1==a;
	});
}

Array.prototype.hasElemStrict=function(a){
/**Определяет, есть ли в массиве заданный элемент - строго, с точностью до совпадения типов*/
	return this.some(function(p1){
		return p1===a;
	});
}

Array.prototype.matrToVect=function(n){
/**Раскладывает m-мерный массив в (m-n)-мерный. Если n не указано, то принимается равным 1.*/
	if(n>1)
		return this.matrToVect(n-1).matrToVect();
	else{
		var rez=[];
		var len=this.length;
		for(var i=0;i<len;i++){
			rez=rez.concat(this[i]);
		}
		return rez;
	}
}

Array.prototype.ob$=function(){
/**Возвращает массив, в котором элементы данного приведены к строкам и окружены символами $ (начало или конец формулы)*/
	return this.map(function(p1){
		return (''+p1).ob$();
	});
}

Array.prototype.sortDelDubl=function(p1){
/**Отсортировать копию массива по функции p1 (может быть опущена) и удалить дублирующиеся элементы*/
	if(this===[])
		return [];
	var a=this.slice().sort(p1);
	for(var i=0;i<a.length;i++)
		if(a[i]==a[i+1])
			a.splice(i--,1);
	return a;
}

Array.prototype.hasDubl=function(){
/**Есть ли в массиве дублирующиеся элементы*/
	if(this===[])
		return 0;
	var a=this.slice().sort();
	for(var i=0;i<a.length;i++)
		if(a[i]==a[i+1])
			return 1;
	return 0;
}

Array.prototype.matrixToTex=function(){
/**Возвращает строку - представление массива как матрицы в TeX-нотации.*/
	if(this==[])
		return '';
	return '\\begin{array}{c}'+
		this.map(function(p1){
			return p1.isArray?
				p1.join(' & '):
				p1;
		}).join('\\\\')+
		'\\end{array}';
}

Array.prototype.det=function(){
/**Функция-обёртка. Возвращает определитель матрицы.*/
	return Determinant(this);
}

Array.prototype.inv=function(){
/**Функция-обёртка. Возвращает обратную матрицу.*/
	return InverseMatrix(this);
}

Array.prototype.allStrToNum=function(){
/**Все строки, встречающиеся в массиве, превратить в числа (если получится).
Исходный массив не изменяет.*/
	return this.slice().map(function(elem){
		if(elem.isNumber)
			return elem;
		if(elem.isArray)
			return elem.allStrToNum();
		if(elem.isString)
			return elem.toNumberExt();
		return 0;
	});
}

Array.prototype.isLNez=function(){
/**Является ли система строк матрицы линейно независимой.*/
	var len=this.length;
	if(len<this[0].length){
		return this.T().isLNez();
	}
	if(len==this[0].length){
		return !!this.det();
	}
	for(var i=0;i<len;i++){
		var buf=this.slice();
		buf.splice(i,1);
		if(buf.isLNez())
			return 1;
	}
	return 0;
}

Array.prototype.testSLU=function(a,b,tochnost){
/**Является ли данный вектор решением СЛУ с матрицей a и столбцом свободных членов b
с точностью tochnost (всё-таки с float-ами фактически работаем).*/
	if(tochnost===undefined){
		tochnost=1e-5;
	}
	var len=a.length;
	if(!b){
		b=generateMatrix(len,1,0,0);
	}

	b=b.allStrToNum();
	a=a.allStrToNum();

	for(var i=0;i<len;i++){
		if( Math.abs( objUmn( [a[i]], this )[0][0]
			- b[i][0] ) > tochnost ){
			return 0;
		}
	}
	return 1;
}

Array.prototype.rk=function(){
/**Ранг матрицы. Функция-обёртка над rang_mat*/
	return rang_mat(this);
}

Array.prototype.isFSR=function(a){
/**Является ли данная матрица, в которой векторы - столбцы, ФСР для СЛОУ с матрицей a.*/
	var t=this.T();
	var len=t.length;

	a=a.allStrToNum();
	t=t.allStrToNum();

	if(!t.isLNez())
		return 0;
	if(a[0].length-a.rk() != len)
		return 0;

	for(var i=0;i<len;i++){
		if(![t[i]].T().testSLU(a))
			return 0;
	}
	return 1;
}

Array.prototype.isNullVect=function(){
/**Является ли вектор нулевым*/
	var len=this.length;
	for(var i=0;i<len;i++)
		if(this[i])
			return 0;
	return 1;
}

Array.prototype.hasNullVect=function(){
/**Есть ли в матрице нулевые векторы - строки или столбцы?*/	
	var len=this.length;
	for(var i=0;i<len;i++)
		if(this[i].isNullVect())
			return 1;
	var th=this.T();
	len=th.length;
	for(var i=0;i<len;i++)
		if(th[i].isNullVect())
			return 1;
	return 0;
}

Array.prototype.copyAr=function() {
/**Если массив содержит вложенные, slice не подходит*/
	var ar = [];
	for (var i=0; i<this.length; i++){
		if (Array.isArray(this[i])){
			ar[i] = this[i].copyAr();
		}
		else {
			ar[i] = this[i];
		}
	}
	return ar;
}

Array.prototype.equalAr=function(x1) {
/**Возвращает, равны ли this и x1*/
	var f=true;
	if (x1.length==this.length){
		var i=0;
		while (i<x1.length && f) {
			f=f&&(x1[i]==this[i]);
			i++;
		}
		return(f);
	}
	else return false;
}

Array.prototype.reverseElems=function(recursive){
	return this.map(function(p1){
		return recursive && p1.reverseElems ? p1.reverseElems(1) : p1.reverse();
	});
}

Array.prototype.hasCommon=function(arr){
/**Имеет ли данный массив и arr общие элементы?*/
	var len=arr.length;
	for(var i=0; i<len; i++)
		if(this.hasElem(arr[i]))
			return 1;
		return 0;
}

Array.prototype.delEmpty=function(){
/**Удалить из массива пустые строки и undefined*/
	var len=this.length;
	for(var i=0;i<len;i++){
		if(this[i]===undefined || this[i]==""){
			this.splice(i,1);
			len--;
			i--;
		}
	}
}

Array.prototype.trimStrings=function(){
/**Для каждой строки-элемента массива вызвать .trim()*/
	var len=this.length;
	for(var i=0;i<len;i++){
		this[i]=this[i].trim();
	}
}

Array.prototype.replaceStrings=function(p1,p2){
/**Для каждой строки-элемента массива вызвать .replace(p1,p2)*/
	var len=this.length;
	for(var i=0;i<len;i++){
		this[i]=this[i].replace(p1,p2);
	}
}

Array.prototype.delDublByProp=function(prop){
/**Удаление элементов массива, у которых свойства из массива строк prop совпадают с ранее рассмотренными.*/
	var rez=this.slice();
	rez=rez.sortBy(prop);
	var len=rez.length;
	var p=prop.length;
	for(var i=1;i<len;i++){
		if(!compareObjects(rez[i-1],rez[i],prop)){
			rez.splice(i,1);
			len--;
			i--;
		}
	}
	return rez;
}

Array.prototype.sortNumeric=function(){
/**Сортировка численного массива.*/
	return this.sort(function(a,b){
		return a-b;
	});
}

Array.prototype.sortNumericArr=function(){
/**Сортировка массива числовых массивов по первому элементу.*/
	return this.sort(function(a,b){
		return a[0]-b[0];
	});
}

Array.prototype.sortBy=function(prop){
/**Сортировка элементов массива по списку свойств prop, где prop - массив строк.*/
	return this.sort(function(a,b){
		return compareObjects(a,b,prop);
	});
	
}

Array.prototype.getVariety=function(prop){
/**Возвращает массив значений выбранного свойства элементов-объектов исходного массива.*/
	var len=this.length;
	var rez=[];
	for(var i=0;i<len;i++){
		if(this[i][prop]!==undefined){
			if(this[i][prop].isArray){
				rez=rez.concat(this[i][prop]);
			}else{
				rez.push(this[i][prop]);
			}
		}
	}
	return rez.sortDelDubl();
}

Array.prototype.addToGlobal('docsArray',1);
'use strict';

Array.prototype.mt_prov=function(kolvo){
/**Проверяет, можно ли трактовать каждый элемент массива как точку, т. е.
у каждого ли элемента массива есть свойства x и y,
и, если kolvo, то есть ли в данном массиве kolvo точек.*/
	if(this.length<kolvo)
		return 0;
	var fl=true;
	var len=this.length-1;
	for(;(len+1) && fl;len--)
		fl=fl&&(this[len].x!=undefined)&&(this[len].y!=undefined);
	return fl;
};

Array.prototype.mt_s3ug=function(){
/**Площадь треугольника, вершины которого - первые три элемента массива точек.*/
	if(!this.mt_prov(3))
		return 0;
	return 0.5*(this[0].x*this[1].y+this[0].y*this[2].x+this[1].x*this[2].y-this[1].y*this[2].x-this[2].y*this[0].x-this[0].y*this[1].x).abs();
};

Array.prototype.mt_tgUnakl=function(){
/**Возвращает тангенс угла наклона прямой, проходящей через две первые точки массива.*/
	if(!this.mt_prov(2))
		return undefined;
	if(!(this[0].y-this[1].y))
		return 0;
	return (this[0].y-this[1].y)/(this[0].x-this[1].x);
}

Array.prototype.mt_is3ug=function(){
/**Проверяет, образуют ли три данные точки треугольник. 
Можно использовать и для того, чтобы выяснить, лежат ли три данные точки на одной прямой.*/
	if(!this.mt_prov(3))
		return 0;
	return this.mt_tgUnakl()!=[this[1],this[2]].mt_tgUnakl();
};

Array.prototype.mt_uPeres=function(){
/**Угол пересечения прямых, проходящих через первые две пары точек.*/
	if(!this.mt_prov(4))
		return 0;
	var u=(this.mt_tgUnakl().atan()-[this[2],this[3]].mt_tgUnakl().atan()).abs();
	for(;u>=Math.PI;u=u-Math.PI){};
	for(;u>Math.PI/2;u=Math.PI-u){};
	return u;
};

Array.prototype.mt_isMnug=function(p1){
/**Проверяет, задаёт ли массив точек p1-угольник.
При вызове без параметра - многоугольник.*/
	if(
			(p1!=undefined)&&(this.length!=p1)
		||	(!this.mt_prov(3))
		||	(this.mt_dubli())
		||	(this.mt_estSamoper())
		){
			return 0;
	}
	
	var len=this.length-1;
	var fl=1;
	
	fl*=[this[0],this[len],this[len-1]].mt_is3ug();
	fl*=[this[0],this[1],this[len]].mt_is3ug();
	for(;len-1;len--)
		fl*=[this[len],this[len-1],this[len-2]].mt_is3ug();

	return fl;
};

Array.prototype.mt_rasst=function(){
/**Расстояние между двумя первыми точками массива.*/
	if(!this.mt_prov(2))
		return undefined;
	return ((this[0].x-this[1].x).pow(2)+(this[0].y-this[1].y).pow(2)).sqrt();
};

Array.prototype.mt_s4ug=function(){
/**Площадь четырёхугольника.*/
	if(!this.mt_isMnug(4))
		return undefined;
	return 0.5*[this[0],this[2]].mt_rasst()*[this[1],this[3]].mt_rasst()*
		[this[0],this[2],this[1],this[3]].mt_uPeres().sin();
};

Array.prototype.mt_dubli=function(){
/**Есть ли в массиве повторяющиеся точки*/
	if(!this.mt_prov())
		return undefined;
	var len;
	var l2;
	for(len=this.length-1;len+1;len--)
		for(l2=this.length-1;l2>len;l2--)
			if(this[len].x==this[l2].x&&this[len].y==this[l2].y)
				return 1;
	return 0;
};

Array.prototype.mt_pryam=function(){
/**Возвращает коэффициенты a и b прямой y=ax+b, проходящей через две первые точки.*/
	if(!this.mt_prov(2))
		return undefined;
	var a=this.mt_tgUnakl();
	if(a.abs()==Infinity)
		var b=this[0].x;
	else
		var b=this[0].y-a*this[0].x;
	return {a:a,b:b};
};

Array.prototype.mt_join=function(p1){
/**Возращает строку - координаты точек через запятую.*/
	if(!this.mt_prov())
		return undefined;
	if(!p1)
		p1=', ';
	var p2='';
	var len=this.length-1;
	for(var l2=0;l2<len;l2++)
		p2+='('+this[l2].x+'; '+this[l2].y+')'+p1;
	p2+='('+this[l2].x+'; '+this[l2].y+')';
	return p2;
}

Array.prototype.mt_otrPeres=function(){
/**Количество точек пересечения двух отрезков, задаваемых первыми парами точек.*/
	if(!this.mt_prov())
		return undefined;
	var p1=[[this[0],this[1]].mt_pryam(),[this[2],this[3]].mt_pryam()].mp_tPeres();
	if(p1.x==Infinity)
		return Infinity;
	else if(p1.x.mzhd(this[0].x,this[1].x,1)&&p1.x.mzhd(this[2].x,this[3].x,1)&&p1.y.mzhd(this[0].y,this[1].y,1)&&p1.y.mzhd(this[2].y,this[3].y,1))
		return 1;
	return 0;
}

Array.prototype.mt_estSamoper=function(){
/**Имеет ли ломанная, образованная точками, самопересечения.*/	
	if(!this.mt_prov(3))
		return undefined;
	var len=this.length;
	var th=this.concat(this,this);
	var fl=0;
	for(var l1=0;l1<len;l1++)
		for(var l2=l1+2;l2<=l1+len-2;l2++)
			fl+=[th[l1],th[l1+1],th[l2],th[l2+1]].mt_otrPeres();
	return fl;
}

Array.prototype.mt_ladMnug=function(){
/**Перемешивать точки до тех пор, пока не получится многоугольник.*/
	if(		(!this.mt_prov(3))
		||	(this.mt_dubli())
	)
		return 0;
	
	for(;!this.mt_isMnug();this.shuffle()){};
	//Крайне криво, но думать лень.
	return this;
}

Array.prototype.mt_perpend=function(){
/**Перпендикулярны ли прямые, задаваемые первыми двумя парами точек.*/
	return (this.mt_uPeres()==Math.PI/2);
}

Array.prototype.mt_paral=function(){
/**Параллельны ли прямые, задаваемые первыми двумя парами точек.*/
	return this.mt_uPeres()==0;
}

Array.prototype.mt_imen4ug=function(){
/**Называет четырёхугольник.*/
	if(!this.mt_isMnug(4)){return 0;};
	var A=this[0];
	var B=this[1];
	var C=this[2];
	var D=this[3];
	var prug=	([A,B,B,C].mt_perpend())&&
				([B,C,C,D].mt_perpend())&&
				([A,D,D,C].mt_perpend());
	var rstor=	([A,B].mt_rasst()==[A,D].mt_rasst())*
				([C,B].mt_rasst()==[C,D].mt_rasst())+
				([B,A].mt_rasst()==[B,C].mt_rasst())*
				([D,A].mt_rasst()==[D,C].mt_rasst());
	var paral=	([A,B,C,D].mt_paral())+
				([A,D,B,C].mt_paral());
	if(prug&&(rstor==2))
		return lx['квадрат'];
	else if(prug)
		return lx['прямоугольник'];
	else if(rstor==2)
		return lx['ромб'];
	else if(paral==2)
		return lx['параллелограмм'];
	else if(paral==1)
		return lx['трапеция'];
	else if(rstor==1)
		return lx['дельтоид'];
	else
		return lx['четырёхугольник'];
};

Array.prototype.addToGlobal('docsArray',1);
'use strict';

Array.prototype.mp_prov=function(){
/**Проверяет, можно ли трактовать массив как массив прямых, 
т. е. у каждого ли элемента массива есть свойства a и b*/
	var fl=true;
	var len=this.length-1;
	for(;(len+1)&&fl;len--)
		fl=fl&&(this[len].a!=undefined)&&(this[len].b!=undefined);
	return fl;
}

Array.prototype.mp_tPeres=function(){
/**Находит точку пересечения первых двух прямых.*/
	if(!this.mp_prov())
		return undefined;
	
	var x;
	var y;
	if(this[0].a.abs()==Infinity){
		x=this[0].b;
		y=this[1].a*x+this[1].b;
	}else if(this[1].a.abs()==Infinity){
		x=this[1].b;
		y=this[0].a*x+this[0].b;
	}else{
		var c=this[1].a-this[0].a;
		if(c==0)
			if(this[0].b==this[1].b)
				x=y=Infinity;
			else
				x=y=NaN;
		else{
			x=(this[0].b-this[1].b)/(this[1].a-this[0].a);
			y=this[0].a*x+this[0].b;
		}
	}	
	return {x:x,y:y};
}

Array.prototype.addToGlobal('docsArray',1);
'use strict';
Array.prototype.mn_proizv=function(){
/**Находит производную от многочлена, коэфф. которого в порядке возрастания степеней - элементы данного массива.*/
	var len=this.length;
	var th=[];
	for(var i=0;i<len-1;i++){
		th[i]=clone(this[i+1]);
		th[i]=Drob.fixN(th[i]);
		th[i].ch=th[i].ch*(i+1);
		Drob.sokr(th[i]);
	}
	return th;
}

Array.prototype.mn_vychisl=function(x){
/**Находит значение многочлена, коэфф. которого в порядке возрастания степеней - элементы данного массива,
при значении переменной, равном x*/
	var len=this.length;
	var s=0;
	for(var i=0;i<len;i++){
		this[i]=Drob.fixN(this[i]);
		s+=this[i].ch*x.pow(i)/this[i].zn;
	}
	return s;
}

Array.prototype.mn_txt=function(x){
/**TeX-представление многочлена, коэфф. которого в порядке возрастания степеней - элементы данного массива, x - символ переменной.*/
	var len=this.length;
	this[0]=Drob.fixN(this[0]);
	var s=this[0].ch.frac(this[0].zn).esli(this[0].ch);
	for(var i=1;i<len;i++){
		this[i]=Drob.fixN(this[i]);
		if(this[i].ch){
			s= this[i].ch.frac(this[i].zn)+x+('^{'+i+'}').esli(i!=1)
				+'+'+s;
		}
	}
	return s.plusminus();
}

Array.prototype.mn_pervoobr=function(){
/**Находит первообразную (C=0) от многочлена, коэфф. которого в порядке возрастания степеней - элементы данного массива.*/
	var len=this.length;
	var th=[0];
	for(var i=1;i<len+1;i++){
		th[i]=clone(this[i-1]);
		th[i]=Drob.fixN(th[i]);
		th[i].zn=th[i].zn*i;
		Drob.sokr(th[i]);
	}
	return th;
}

Array.prototype.mn_txtmas=function(x){
/**TeX-представление многочлена, коэфф. которого в порядке возрастания степеней - элементы данного массива, x - символ переменной, в виде массива выражений*/
	var len=this.length;
	this[0]=Drob.fixN(this[0]);
	var s=[this[0].ch.frac(this[0].zn).esli(this[0].ch)];
	for(var i=1;i<len;i++){
		this[i]=Drob.fixN(this[i]);
		if(this[i].ch){
			s.push(this[i].ch.frac(this[i].zn)+x+('^{'+i+'}').esli(i!=1));
		}
	}
	return s;
}

Array.prototype.addToGlobal('docsArray',1);
'use strict';

Array.prototype.pe_inv=function(){
/**Количество инверсий в перестановке, образованной элементами массива.*/
	var perest=0;
	var len=this.length;
	for(var i=0;i<len;i++)
		for(var j=i;j<len;j++)
			if(this[i]>this[j])
				perest++;
	return perest;
}

Array.prototype.pe_txt=function(){
/**Перестановка, образованная элементами массива, в TeX-нотации.*/
	return "$\\left("+this.join(";")+"\\right)$";
}

Array.prototype.addToGlobal('docsArray',1);
'use strict';

String.prototype.mesh=function(){
/**Перемешивает строку посимвольно в случайном порядке*/
	return this.split('').shuffle().soed();	
};

String.prototype.dopdo=function(c,n){
/**Дополняет строку подстроками спереди, пока длина строки не станет не менее n.*/
	var str=this;
	for(;str.length<n;str=c+str){};
	return str;
};

String.prototype.toZagl=function(){
/**Делает первую букву строки заглавной*/
	if(this=='')
		return '';
	return this[0].toUpperCase()+this.substr(1);//.toLowerCase();
};

String.prototype.frac=function(p1){
/**Возвращает TeX-запись дроби, в которой числитель - данная строка, знаменатель p1.*/
	return '\\frac{'+this+'}{'+p1+'}';
}

String.prototype.posl=function(){
/**Возвращает последний символ строки*/
	return this[this.length-1];
};

String.prototype.udalPosl=function(n){
/**Удаляет n последних символов строки. При вызове без параметров удаляет 1 символ.*/
	if(n==undefined)
		n=1;
	return this.substr(0,this.length-n);
};

String.prototype.udalPerv=function(n){
/**Удаляет n первых символов строки. При вызове без параметров удаляет 1 символ.*/
	if(n==undefined)
		n=1;
	return this.substr(n,this.length-n);
};

String.prototype.toStandart=function(p1){
/**Приводит строку к записи "по стандарту": заменяет точку на запятую. 
Если p1, то берёт запятую в фигурные скобки, чтобы убрать отступы в TeX.
Предназначена для строк, содержащих представление числа.*/
	var a=this.replace(/[.]/g,',');
	if(p1)
		a=a.replace(/[,]/,'{,}');
	return a;
};

String.prototype.esli=function(p1){
/**Возвращает данную строку, если p1, и пустую в противном случае.*/
	return p1?this:'';
}

String.prototype.vTag=function(p1,p2){
/**"Оборачивает" данную строку с тэг p1 c параметрами p2. p2 можно опускать.*/
	return '<'+p1+(' '+p2).esli(p2)+'>'+this+'</'+p1+'>';
}

String.prototype.vTabl=function(p1,p2){
/**"Оборачивает" данную строку в тэг таблицы. Применяется крайне редко и узко.*/
	return (p1?p1:'<br/><br/>')+
		this.vTag('table',p2?p2:'style="text-align:center;font:inherit;" border=1');
		//.vTag('center');
}

String.prototype.reverse=function (){
/**Переворачивает строку*/
	return this.split('').reverse().soed();
};//http://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript //Товарищ очень сильно выручил

String.prototype.tn=function(){
/**Возвращает число, если данная строка - запись числа с десятичной точкой или запятой.*/
	return 1*this.replace(',','.');
};

String.prototype.ob$=function(){
/**Оборачивает строку в символы начала/конца формулы TeX - $*/
	return '$'+this+'$';
};

String.prototype.encodeURIComponent=function(){
	return encodeURIComponent(this);
}

String.prototype.decodeURIComponent=function(){
	return decodeURIComponent(this);
}

String.prototype.encodeURI=function(){
	return encodeURI(this);
}

String.prototype.decodeURI=function(){
	return decodeURI(this);
}

String.prototype.neutralizeXSS=function(){
/**Нейтрализует (экранирует) XSS-угрозы. По крайней мере, должна. Будет пополняться.*/
	return this.replace(/<\//g,'');
}

String.prototype.toNumberExt=function(){
/**Превращает арифметическое выражение (+-/*) в число.*/
	if(/[\s0-9\.,\+\-\*\/\(\)]+/.test(this)){
		try{
			return eval(this.replace(/\,/g,'.'));
		}catch(e){
		}
	}
	return 0;
}

String.prototype.toMtr=function(){
/**Превращает многострочный текст в матрицу строк.*/
	var t=this.
		replace(/<br[\/]*>/g,'\n').
		replace(/[\t]+/g,' ').
		trim();
	var a=t.split(/\s*[\n\r]+\s*/);
	var len=a.length;
	for (var i=0;i<len;i++)
		a[i]=a[i].split(/\s+/);
	return a;
}

String.prototype.istDataToStd=function(){
/**Приводит дату, записанную в одной из общепринятых форм, к записи "по стандарту". Применяется только в комплексе заданий по истории.*/
	var a=this;
	a=a.replace(/\s/g,'.');
	a=a.replace(/\//g,'.');
	a=a.replace(/[-]/g,'.');
	a=a.replace(/[,]/g,'.');
	a=a.replace(/ю/g,'.');
	a=a.replace(/[.]+/g,'.');
	a=a.replace(/[.]0/g,'.');
	a=a.replace(/^0/g,'');
	a=a.replace(/^[.]/g,'');
	//Убираем г. в конце, если есть
	a=a.replace(/[.]$/g,'');
	a=a.replace(/г$/g,'');
	a=a.replace(/[.]$/g,'');
	//Теперь меняем номер месяца на месяц
	a=a.replace(/[.]1[.]/g, ' января '	);
	a=a.replace(/[.]2[.]/g, ' февраля '	);
	a=a.replace(/[.]3[.]/g, ' марта '	);
	a=a.replace(/[.]4[.]/g, ' апреля '	);
	a=a.replace(/[.]5[.]/g, ' мая '		);
	a=a.replace(/[.]6[.]/g, ' июня '	);
	a=a.replace(/[.]7[.]/g, ' июля '	);
	a=a.replace(/[.]8[.]/g, ' августа '	);
	a=a.replace(/[.]9[.]/g, ' сентября ');
	a=a.replace(/[.]10[.]/g,' октября '	);
	a=a.replace(/[.]11[.]/g,' ноября '	);
	a=a.replace(/[.]12[.]/g,' декабря '	);
	//И наконец, если исправление буквы "ю" на точку привело к повреждению названия месяца:
	a=a.replace(/и[.]ня/g, 'июня'	);
	a=a.replace(/и[.]ля/g, 'июля'	);
	//Меняем точки на пробелы
	a=a.replace(/[.]/g, ' '	);
	
	a=a+' г.';

	return a;
};

String.prototype.plusminus=function(){
/**Примитивное упрощение математических выражений. Меняет "++" на "+", например.*/
	var a=this;
	for(;a.match(/[+-][+-]/);){
		a=a.replace(/[+][+]/g,'+');
		a=a.replace(/--/g,'+');
		a=a.replace(/[+]-/g,'-');
		a=a.replace(/-[+]/g,'-');
		a=a.replace(/[+]$/g,'');
		a=a.replace(/[{][+]/g,'{');
		a=a.replace(/[+][}]/g,'}');
		a=a.replace(/\(\+/g,'(');
		a=a.replace(/\+\)/g,')');
	}
	a=a.replace(/[=]\s*[+]/g,'=');
	a=a.replace(/[+]1(?=[A-Za-zА-Яа-яЁё\\(])/g,'+');
	a=a.replace(/[-]1(?=[A-Za-zА-Яа-яЁё\\(])/g,'-');
	a=a.replace(/[{]1(?=[A-Za-zА-Яа-яЁё\\(])/g,'{');
	a=a.replace(/[}]1(?=[A-Za-zА-Яа-яЁё\\(])/g,'}');
	a=a.replace(/[ ]1(?=[A-Za-zА-Яа-яЁё\\(])/g,' ');
	a=a.replace(/[~]1(?=[A-Za-zА-Яа-яЁё\\(])/g,'~');
	a=a.replace(/[(]1(?=[A-Za-zА-Яа-яЁё\\(])/g,'(');
	a=a.replace(/[)]1(?=[A-Za-zА-Яа-яЁё\\(])/g,')');
	a=a.replace(/[=]1(?=[A-Za-zА-Яа-яЁё\\(])/g,'=');
	a=a.replace(/[;]1(?=[A-Za-zА-Яа-яЁё\\(])/g,';');
	a=a.replace(/\^1(?=[A-Za-zА-Яа-яЁё\\(])/g,'^');
	a=a.replace(/\$1(?=[A-Za-zА-Яа-яЁё\\(])/g,'$');
	a=a.replace(/^1(?=[A-Za-zА-Яа-яЁё])/g,'');
	a=a.replace(/^[+]/g,'');
	a=a.replace(/[;][-]0/g,';0');
	a=a.reverse();
	a=a.replace(/[.]{2}(?=[A-Za-zА-Яа-яЁё])/g,'.');
	a=a.replace(/[.]{1}[$][.]{1}(?=[A-Za-zА-Яа-яЁё\\])/g,'$.');
	a=a.reverse();
	return a;
};

String.prototype.insert=function(i,str) {
//вставляет в строку после i-го символа
	var ss='';
	if (i>0)
		ss=this.substring(0, i);
	var sss='';
	if (i<this.length-1)
		sss=this.substring(i);
	return ss+str+sss;
}

String.prototype.isLetter=function() {
/**проверяет, буква ли данный символ*/
	var d = (this.length==1) && (this.search(/[a-z]/)!=-1);
	return d;
}

String.prototype.isGl=function() {
/**проверяет, гласная ли данный символ*/
	var d = (this.search(/[aeiou]/)!=-1) && (this.length==1);
	return d;
}

String.prototype.cepZamena=function(mas1, mas2){
/**Заменяет i-й символ из массива mas1 i-м символом из массива mas2*/
	var len=this.length;
	var rez='';
	var fl;
	for(var i=0; i<len; i++){
		fl=1;
		for(var j=0;j<26 && fl;j++){
			if(this[i]==mas1[j]){
				rez+=mas2[j];
				fl=0;
			}
		}
		if(fl){
			rez+=this[i];
		}
	}
	return rez;
}

String.prototype.multiply=function(n){
/**Возвращает строку, записанную n раз подряд*/
	var rez=this;
	for(var i=1;i<n;i++)
		rez+=this;
	return rez;
}

String.prototype.isString=true;

String.prototype.addToGlobal('docsString',1);

'use strict';
Number.prototype.toFixedLess=function(n){
/**Возвращает строку - предсиавление числа с не более чем n знаками после запятой.*/
	var a=this.toFixed(n);
	for(;a.posl()=='0'&&a.search(/[.]/)!=-1;a=a.udalPosl()){};
	for(;a.posl()=='.';a=a.udalPosl()){};
	return a;
}

Number.prototype.pm=function(){
/**Случайным образом возвращает число или ему противоположное.*/
	return sl1()?this:-this;
}

Number.prototype.dopdo=function(c,n){
/**Возвращает строковое представление числа, дополненное спереди строками c до длины не менее n*/
		return (''+this).dopdo(c,n);
}

Number.prototype.isZ=function(){
/**Проверяет, является ли число целым.*/
	return this-this.floor()==0;
}

Number.prototype.isPolnKvadr=function(){
/**Проверяет, является ли число полным квадратом.*/
	return this.sqrt().isZ();
}

Number.prototype.ts=
Number.prototype.toStandart=function(p1){
/**Возвращает представление числа в записи "по стандарту": с десятичной запятой и не более чем 10 знаками после неё.
Для отсечения "ложной точности" хватает.*/
	return this.toFixedLess(10).toStandart(p1);
}

Number.prototype.mzhd=function(a,b,c){
/**Находится ли число между a и b, если c - то включительно. a и b можно не упорядочивать.*/
	var p1=[a,b];
	var p2=p1[p1.max()];
	var p3=p1[p1.min()];
	return (this<p2)&&(this>p3)||((this==p2)||(this==p3))&&(!!c);
}

Number.prototype.polozh=function(){
/**Если число положительно, вернёт его, иначе 0.*/
	return this<0?0:this;
}

Number.prototype.nod=function(p1){
/**НОД данного числа и p1*/
	var a,b;
	a=this<0?-this:this;
	b=p1<0?-p1:p1;
	if(a==b) return a;
	if((a==1)||(b==1))return 1;
	if(a==0) return b;
	if(b==0) return a;
	if(a>b) return b.nod(a%b);
			return a.nod(b%a);
}

Number.prototype.pina=function(p1){
/**TeX-представление дроби, у которой в числителе данное число, умнолженное на пи, а в знаменателе p1.
Случай p1=1 учитывается.*/
	var a1={ch:this,zn:p1};
	Drob.sokr(a1);
	if(a1.ch==0)
		return '0';
	var z='';
	if(a1.ch<0){
		z='-';
		a1.ch*=-1;
	} 
	return z+('\\frac{').esli(a1.zn!=1)+(a1.ch==1?'':a1.ch)+'\\pi'+('}{'+a1.zn+'}').esli(a1.zn!=1);
}

Number.prototype.koren=function(p1){
/**TeX-представление корня из данного числа.
Если данное число  полный квадрат, то само число.
Если p1, то из-под корня будут вынесены возможные множители.*/
	if(this.isPolnKvadr())
		return this.ts();
	var a='';
	var t=this;
	if(p1){
		a=this.polnKvadrMnozh();
		t=t/a.sqr();
	}
	return a+'\\sqrt{'+t.ts()+'}';
}

Number.prototype.polnKvadrMnozh=function(){
/**Максимальный делитель данного числа, квадрат которого также является делителем данного числа.*/
	if(this==0)
		return 0;
	var t=this.abs();
	var i=1;
	for(var rez=1;i.sqr()<=t;i++)
		if(t.kratno(i.sqr()))
			rez=i;
	return rez;
}

Number.prototype.frac=function(p1){
/**TeX-представление дроби, у которой в числителе данное число, а в знаменателе p1.
Случай p1=1 учитывается.*/
	var a1={ch:this,zn:p1};
	if(p1.isString)
		return ('\\frac{').esli(a1.zn!='1')+(a1.ch==1?'1':a1.ch)+('}{'+a1.zn+'}').esli(a1.zn!='1');
	
	Drob.sokr(a1);
	if(a1.ch==0)return '0';
	var z='';
	if(a1.ch<0){
		z='-';
		a1.ch*=-1;
	} 
	return z+('\\frac{').esli(a1.zn!=1)+(a1.ch==1?'1':a1.ch)+('}{'+a1.zn+'}').esli(a1.zn!=1);
	
}

Number.prototype.fracstr=function(p1,str){
/**TeX-представление дроби с числителем - произведением данного числа и строки str и знаменателем p1.*/
	var a1={ch:this,zn:p1};
	if(p1.isString)
		return 
			a1.zn!=1?
			'\\frac{'+a1.ch+str+'}{'+a1.zn+'}':
			'{'+a1.ch+str+'}';
	
	Drob.sokr(a1);
	if(!a1.ch)
		return '0';
	var z='';
	if(a1.ch<0){
		z='-';
		a1.ch*=-1;
	} 
	return z+('\\frac{').esli(a1.zn!=1)+(a1.ch==1?str:a1.ch+str)+('}{'+a1.zn+'}').esli(a1.zn!=1);
	
}

Number.prototype.kratno=function(p1){
/**Кратно ли данное число p1*/
	return !(this%p1);
}

Number.prototype.delit=function(p1){
/**Является ли данное число делителем p1*/
	return !(p1%this);
}

Number.prototype.sluchDel=function(){
/**Возвращает случайный делитель числа.*/
	for(var r=this+1;!this.kratno(r);r=sluchch(1,this)){};
	return r; 
}

Number.prototype.toChMin=function(){
/**Трактует число как количество минут и возвращает строку вида "A часов B минут".*/
	var a=(this/60).floor();
	var b=this%60;
	return chislitlx(a,'час').esli(a)+' '.esli(a&&b)+chislitlx(b,'минута').esli(b);
}

Number.prototype.chislit=function(p1,p2,p3){
/**Вспомогательная функция для согласования существительного с числительным.*/
	return chislit(this,p1,p2,p3);
}

Number.prototype.chislitM=function(p1,p2,p3){
/**Вспомогательная функция для согласования существительного с числительным.*/
	return chislitM(this,p1,p2,p3);
}

Number.prototype.chislitlx=function(p1,p2){
/**Возвращает строку, состоящую из данного числа и подходящего падежа слова p1, при этом
полученное словосочетанию стоит в падеже p2 (есдли не указан - именительный).*/
	return chislitlx(this,p1,p2);
}

Number.prototype.min=function(){
/**Минимум из данного числа и всех аргументов функции.*/
	var a=Array.prototype.slice.call(arguments);
	a.push(this);
	return a.minE();
}

Number.prototype.max=function(){
/**Максиимум из данного числа и всех аргументов функции.*/
	var a=Array.prototype.slice.call(arguments);
	a.push(this);
	return a.maxE();
}

Number.prototype.plusminus=Number.prototype.ts;

Number.prototype.proporMezhdu=function(k,pr){
/**Возвращает число, лежащее между данным и k пропорционально pr*/
	return this+(k-this)*pr;
}

Number.prototype.toDvoet=function(a){
/**Представить число в виде "часы-минуты" с двоеточием.*/
	if(!a)
		a=60;
	return Math.floor(this/60)+':'+Math.floor(this%60).dopdo('0',2);
}

Number.prototype.okrugldo=function(p1){
/**Округлить число до кратных p1*/
	return okrugldo(this,p1);
}

Number.prototype.fct=function(){
/**Факториал числа.*/
	return this>0?(this-1).fct()*this:1;
}

Number.prototype.rub=function(){
/**Возвращает строку вида this рублей*/
	return chislitlx(this,'рубль');
}

Number.prototype.toComplex=function(){
/**Представляет число в виде чисто действительного комплексного*/
	return new Complex(this);
}

Number.prototype.isNumber=true;

Number.prototype.addToGlobal('docsNumber',1);
'use strict';

Number.prototype.pow=function(n){
/**Возвращает число в степени n*/
	return Math.pow(this,n);
}

Number.prototype.sqrt=function(){
/**Квадратный корень из числа.*/
	return Math.sqrt(this);
}

Number.prototype.sqr=function(){
/**Квадрат числа.*/
	return Math.pow(this,2);
}
Number.prototype.abs=function(){
/**Модуль числа.*/
	return Math.abs(this);
}

Number.prototype.floor=function(){
/**Округлить число до целых в меньшую сторону.*/
	return Math.floor(this);
}

Number.prototype.ceil=function(){
/**Округлить число до целых в большую сторону.*/
	return Math.ceil(this);
}

Number.prototype.arctg=
Number.prototype.atan=function(){
/**Арктангенс числа.*/
	return Math.atan(this);
}

Number.prototype.arcsin=
Number.prototype.asin=function(){
/**Арксинус числа.*/
	return Math.asin(this);
}

Number.prototype.arccos=
Number.prototype.acos=function(){
/**Арккосинус числа.*/
	return Math.acos(this);
}

Number.prototype.arcctg=function(){
/**Аркотангенс числа.*/
	return Math.atan(1/this);
}

Number.prototype.sin=function(){
/**Синус числа.*/
	return Math.sin(this);
}

Number.prototype.cos=function(){
/**Косинус числа.*/
	return Math.cos(this);
}

Number.prototype.tg=
Number.prototype.tan=function(){
/**Тангенс числа.*/
	return Math.tan(this);
}

Number.prototype.ctg=function(){
/**Котангенс числа.*/
	return 1/Math.tan(this);
}

Number.prototype.round=function(){
/**Округление числа до целых.*/
	return Math.round(this);
}

Number.prototype.addToGlobal('docsNumber',1);
'use strict';

CanvasRenderingContext2D.prototype.drawLine=function(x1,y1,x2,y2){
	this.beginPath();
	this.moveTo(x1,y1);
	this.lineTo(x2,y2);
	this.stroke();
	this.closePath();
}

CanvasRenderingContext2D.prototype.setka=function(s,n){
	for(var i=-n;i<=n;i++){
		this.drawLine(-s*n,s*i,s*n,s*i);
		this.drawLine(s*i,-s*n,s*i,s*n);
	}
}

CanvasRenderingContext2D.prototype.setkaXY=function(s,n1,n2,n3,n4){
	for(var i=n1;i<=n2;i++){
		this.drawLine(s*i,s*n3,s*i,s*n4);
	}
	for(i=n3;i<=n4;i++){
		this.drawLine(s*n1,s*i,s*n2,s*i);
	}
}

CanvasRenderingContext2D.prototype.fillKrug=function(x,y,r){
	this.beginPath();
	this.arc(x,y, r, 0, 2*Math.PI, false);
	this.fill();
}

CanvasRenderingContext2D.prototype.drawLineSpec=function(x1,y1,x2,y2){
	var m = (x1-x2);
	var n = (y1-y2);
	var k = (n/m);

	if(x1==x2){
		for(var iy = Math.min(y1,y2); iy < Math.max(y1,y2); iy += 14){
			this.drawLine(x1,iy,x1,iy+7);
		}
	}

	if(y1==y2){
		for(var ix = Math.min(x1,x2); ix < Math.max(x1,x2); ix += 14){
			this.drawLine(ix, y1, ix+7, y1);
		}
	}

	if((x2>x1)&(y2>y1)){
		for (var ix=x1+7; ix<x2; ix+=14){
			this.drawLine(ix, y1+ix-x1, ix+7, y1+ix-x1+7);
		}
	}

	if((x2>x1)&(y2<y1)){
		for (var ix=x1+7; ix<x2; ix+=14){
			this.drawLine(ix, y1-ix-x1, ix+7, y1-ix-x1-7);
		}
	}

	if((x2<x1)&(y2<y1)){
		for (var ix=x2+7; ix<x1; ix+=14){
			this.drawLine(ix, y2+ix-x2, ix+7, y2+ix-x2+7);
		}
	}

	if((x2<x1)&(y2>y1)){
		for (var ix=x2+7; ix<x1; ix+=14){
			this.drawLine(ix, y2-ix+x2, ix+7, y2-ix+x2-7);
		}
	}
}

CanvasRenderingContext2D.prototype.isCanvasRenderingContext2D=true;

/*Иначе огнелисичка матюкается
var docsCanvas;
if(!docsCanvas)
	docsCanvas={};

for(var chto in CanvasRenderingContext2D.prototype){
	docsCanvas[chto]=CanvasRenderingContext2D.prototype[chto];
//	Object.defineProperty(CanvasRenderingContext2D.prototype, chto, { enumerable: false });
}*/
'use strict';

RegExp.prototype.isRegExp=true;

RegExp.prototype.addToGlobal('docsRegExp',1);
'use strict';

Function.prototype.toStr=function(){
/**Возвращает код функции в виде строки*/
	return ''+this;
}

Function.prototype.telo=function(){
/**Возвращает тело функции в виде строки*/
	return this.toStr().replace(/}$/,'').replace(/^function \(.*\){/,'');
}

Function.prototype.zagl=function(){
/**Возвращает заголовок функции в виде строки*/
	return /^function \(.*\)/.exec(this.toStr())[0];
}

Function.prototype.attr=function(){
/**Возвращает список параметров функции в виде строки*/
	return this.zagl().replace(/^function /,'');
}

Function.prototype.codeComment=function(){
/**Возвращает первый документационный комментарий внутри функции - такой, как этот.*/
	try{
	return /\/\*\*.*?[\s\S]*?\*\//m.
		exec(this.toStr())[0].
		replace(/^\/\*\*/,'').
		replace(/\*\/$/,'');
	}catch(e){
		return '';
	}
}

Function.prototype.isFunction=true;

Function.prototype.addToGlobal('docsFunction',1);
////////////////////////////////////////////////////////////////////////
//
//	ie: именительный	падеж единственного	числа
//	re: родительный		падеж единственного	числа
//	de: дательный		падеж единственного	числа
//	ve: винительный		падеж единственного	числа
//	te: творительный	падеж единственного	числа
//	pe: предложный		падеж единственного	числа
//	ie: именительный	падеж множественного	числа
//	re: родительный		падеж множественного	числа
//	de: дательный		падеж множественного	числа
//	ve: винительный		падеж множественного	числа
//	te: творительный	падеж множественного	числа
//	pe: предложный		падеж множественного	числа
//
//	rod: род:
//		0: мужской
//		1: женский
//		2: средний
//		3: только множественное число
//
//	odu: одушевлённость:
//		0: неодушевлённое
//		1: одушевлённое
//
//	skl: склонение:
//		0: несклоняемое
//		1: первое
//		2: второе
//		3: третье
//		4: разносклоняемые существительные
////////////////////////////////////////////////////////////////////////
if(lx==undefined)
	var lx=[];	//Объявляем глобальный объект lx
////////////////////////////////////////////////////////////////////////


//{{Существительные
lx['август']={
	ie:'август',
	re:'августа',
	de:'августу',
	ve:'август',
	te:'августом',
	pe:'августе',
	im:'августы',
	rm:'августов',
	dm:'августам',
	vm:'августы',
	tm:'августами',
	pm:'августах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Австралия']={
	ie:'Австралия',
	re:'Австралии',
	de:'Австралии',
	ve:'Австралию',
	te:'Австралией',
	pe:'Австралии',
	im:'Австралии',
	rm:'Австралий',
	dm:'Австралиям',
	vm:'Австралии',
	tm:'Австралиями',
	pm:'Австралиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Австрия']={
	ie:'Австрия',
	re:'Австрии',
	de:'Австрии',
	ve:'Австрию',
	te:'Австрией',
	pe:'Австрии',
	im:'Австрии',
	rm:'Австрий',
	dm:'Австриям',
	vm:'Австрии',
	tm:'Австриями',
	pm:'Австриях',
	rod:1,
	skl:1,
	odu:0,
};
lx['автобус']={
	ie:'автобус',
	re:'автобуса',
	de:'автобусу',
	ve:'автобус',
	te:'автобусом',
	pe:'автобусе',
	im:'автобусы',
	rm:'автобусов',
	dm:'автобусам',
	vm:'автобусы',
	tm:'автобусами',
	pm:'автобусах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['автомобиль']={
	ie:'автомобиль',
	re:'автомобиля',
	de:'автомобилю',
	ve:'автомобиль',
	te:'автомобилем',
	pe:'автомобиле',
	im:'автомобили',
	rm:'автомобилей',
	dm:'автомобилям',
	vm:'автомобили',
	tm:'автомобилями',
	pm:'автомобилях',
	rod:0,
	skl:2,
	odu:0,
};
lx['аквариум']={
	ie:'аквариум',
	re:'аквариума',
	de:'аквариуму',
	ve:'аквариум',
	te:'аквариумом',
	pe:'аквариуме',
	im:'аквариумы',
	rm:'аквариумов',
	dm:'аквариумам',
	vm:'аквариумы',
	tm:'аквариумами',
	pm:'аквариумах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Анастасия']={
	ie:'Анастасия',
	re:'Анастасии',
	de:'Анастасии',
	ve:'Анастасию',
	te:'Анастасией',
	pe:'Анастасии',
	im:'Анастасии',
	rm:'Анастасий',
	dm:'Анастасиям',
	vm:'Анастасий',
	tm:'Анастасиями',
	pm:'Анастасиях',
	rod:1,
	skl:1,
	odu:1,
	sbs:1,
};
lx['Анатольевна']={
	ie:'Анатольевна',
	re:'Анатольевны',
	de:'Анатольевне',
	ve:'Анатольевну',
	te:'Анатольевной',
	pe:'Анатольевне',
	im:'Анатольевны',
	rm:'Анатольевн',
	dm:'Анатольевнам',
	vm:'Анатольевн',
	tm:'Анатольевнами',
	pm:'Анатольевнах',
	rod:1,
	skl:1,
	odu:1,
	sbs:1,
};
lx['Англия']={
	ie:'Англия',
	re:'Англии',
	de:'Англии',
	ve:'Англию',
	te:'Англией',
	pe:'Англии',
	im:'Англии',
	rm:'Англий',
	dm:'Англиям',
	vm:'Англии',
	tm:'Англиями',
	pm:'Англиях',
	rod:1,
	skl:1,
	odu:0,
	sbs:1,
};
lx['апрель']={
	ie:'апрель',
	re:'апреля',
	de:'апрелю',
	ve:'апрель',
	te:'апрелем',
	pe:'апреле',
	im:'апрели',
	rm:'апрелей',
	dm:'апрелям',
	vm:'апрели',
	tm:'апрелями',
	pm:'апрелях',
	rod:0,
	skl:2,
	odu:0,
};
lx['аспирантка']={
	ie:'аспирантка',
	re:'аспирантки',
	de:'аспирантке',
	ve:'аспирантку',
	te:'аспиранткой',
	pe:'аспирантке',
	im:'аспирантки',
	rm:'аспиранток',
	dm:'аспиранткам',
	vm:'аспиранток',
	tm:'аспирантками',
	pm:'аспирантках',
	rod:1,
	skl:1,
	odu:0,
};
lx['атомоход']={
	ie:'атомоход',
	re:'атомохода',
	de:'атомоходу',
	ve:'атомоход',
	te:'атомоходом',
	pe:'атомоходе',
	im:'атомоходы',
	rm:'атомоходов',
	dm:'атомоходам',
	vm:'атомоходы',
	tm:'атомоходами',
	pm:'атомоходах',
	rod:0,
	skl:2,
	odu:0,
};
lx['бадминтон']={
	ie:'бадминтон',
	re:'бадминтона',
	de:'бадминтону',
	ve:'бадминтон',
	te:'бадминтоном',
	pe:'бадминтоне',
	im:'бадминтоны',
	rm:'бадминтонов',
	dm:'бадминтонам',
	vm:'бадминтоны',
	tm:'бадминтонами',
	pm:'бадминтонах',
	rod:0,
	skl:2,
	odu:0,
};
lx['батон']={
	ie:'батон',
	re:'батона',
	de:'батону',
	ve:'батон',
	te:'батоном',
	pe:'батоне',
	im:'батоны',
	rm:'батонов',
	dm:'батонам',
	vm:'батоны',
	tm:'батонами',
	pm:'батонах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Белоруссия']={
	ie:'Белоруссия',
	re:'Белоруссии',
	de:'Белоруссии',
	ve:'Белоруссию',
	te:'Белоруссией',
	pe:'Белоруссии',
	im:'Белоруссии',
	rm:'Белоруссий',
	dm:'Белоруссиям',
	vm:'Белоруссии',
	tm:'Белоруссиями',
	pm:'Белоруссиях',
	rod:1,
	skl:1,
	odu:0,
	sbs:1,
};
lx['Бельгия']={
	ie:'Бельгия',
	re:'Бельгии',
	de:'Бельгии',
	ve:'Бельгию',
	te:'Бельгией',
	pe:'Бельгии',
	im:'Бельгии',
	rm:'Бельгий',
	dm:'Бельгиям',
	vm:'Бельгии',
	tm:'Бельгиями',
	pm:'Бельгиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['бензин']={
	ie:'бензин',
	re:'бензина',
	de:'бензину',
	ve:'бензин',
	te:'бензином',
	pe:'бензине',
	im:'бензины',
	rm:'бензинов',
	dm:'бензинам',
	vm:'бензины',
	tm:'бензинами',
	pm:'бензинах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['бетон']={
	ie:'бетон',
	re:'бетона',
	de:'бетону',
	ve:'бетон',
	te:'бетоном',
	pe:'бетоне',
	im:'бетоны',
	rm:'бетонов',
	dm:'бетонам',
	vm:'бетоны',
	tm:'бетонами',
	pm:'бетонах',
	rod:0,
	skl:2,
	odu:0,
};
lx['блондинка']={
	ie:'блондинка',
	re:'блондинки',
	de:'блондинке',
	ve:'блондинку',
	te:'блондинкой',
	pe:'блондинке',
	im:'блондинки',
	rm:'блондинок',
	dm:'блондинкам',
	vm:'блондинок',
	tm:'блондинками',
	pm:'блондинках',
	rod:1,
	skl:1,
	odu:0,
};
lx['Бразилия']={
	ie:'Бразилия',
	re:'Бразилии',
	de:'Бразилии',
	ve:'Бразилию',
	te:'Бразилией',
	pe:'Бразилии',
	im:'Бразилии',
	rm:'Бразилий',
	dm:'Бразилиям',
	vm:'Бразилии',
	tm:'Бразилиями',
	pm:'Бразилиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['брус']={
	ie:'брус',
	re:'бруса',
	de:'брусу',
	ve:'брус',
	te:'брусом',
	pe:'брусе',
	im:'брусья',
	rm:'брусьев',
	dm:'брусьям',
	vm:'брусья',
	tm:'брусьями',
	pm:'брусьях',
	rod:0,
	skl:2,
	odu:0,
};
lx['булавка']={
	ie:'булавка',
	re:'булавки',
	de:'булавке',
	ve:'булавку',
	te:'булавкой',
	pe:'булавке',
	im:'булавки',
	rm:'булавок',
	dm:'булавкам',
	vm:'булавки',
	tm:'булавками',
	pm:'булавках',
	rod:1,
	skl:1,
	odu:0,
};
lx['бутерброд']={
	ie:'бутерброд',
	re:'бутерброда',
	de:'бутерброду',
	ve:'бутерброд',
	te:'бутербродом',
	pe:'бутерброде',
	im:'бутерброды',
	rm:'бутербродов',
	dm:'бутербродам',
	vm:'бутерброды',
	tm:'бутербродами',
	pm:'бутербродах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Васильевна']={
	ie:'Васильевна',
	re:'Васильевны',
	de:'Васильевне',
	ve:'Васильевну',
	te:'Васильевной',
	pe:'Васильевне',
	im:'Васильевны',
	rm:'Васильевн',
	dm:'Васильевнам',
	vm:'Васильевн',
	tm:'Васильевнами',
	pm:'Васильевнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['веб-дизайнер']={
	ie:'веб-дизайнер',
	re:'веб-дизайнера',
	de:'веб-дизайнеру',
	ve:'веб-дизайнера',
	te:'веб-дизайнером',
	pe:'веб-дизайнере',
	im:'веб-дизайнеры',
	rm:'веб-дизайнеров',
	dm:'веб-дизайнерам',
	vm:'веб-дизайнеров',
	tm:'веб-дизайнерами',
	pm:'веб-дизайнерах',
	rod:0,
	skl:2,
	odu:0,
};
lx['ведомство']={
	ie:'ведомство',
	re:'ведомства',
	de:'ведомству',
	ve:'ведомство',
	te:'ведомством',
	pe:'ведомстве',
	im:'ведомства',
	rm:'ведомств',
	dm:'ведомствам',
	vm:'ведомства',
	tm:'ведомствами',
	pm:'ведомствах',
	rod:2,
	skl:2,
	odu:0,
};
lx['велосипед']={
	ie:'велосипед',
	re:'велосипеда',
	de:'велосипеду',
	ve:'велосипед',
	te:'велосипедом',
	pe:'велосипеде',
	im:'велосипеды',
	rm:'велосипедов',
	dm:'велосипедам',
	vm:'велосипеды',
	tm:'велосипедами',
	pm:'велосипедах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Венесуэла']={
	ie:'Венесуэла',
	re:'Венесуэлы',
	de:'Венесуэле',
	ve:'Венесуэлу',
	te:'Венесуэлой',
	pe:'Венесуэле',
	im:'Венесуэлы',
	rm:'Венесуэл',
	dm:'Венесуэлам',
	vm:'Венесуэлы',
	tm:'Венесуэлами',
	pm:'Венесуэлах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Вероника']={
	ie:'Вероника',
	re:'Вероники',
	de:'Веронике',
	ve:'Веронику',
	te:'Вероникой',
	pe:'Веронике',
	im:'Вероники',
	rm:'Вероник',
	dm:'Вероникам',
	vm:'Вероник',
	tm:'Верониками',
	pm:'Верониках',
	rod:1,
	skl:1,
	odu:0,
};
lx['верста']={
	ie:'верста',
	re:'версты',
	de:'версте',
	ve:'версту',
	te:'верстой',
	pe:'версте',
	im:'вёрсты',
	rm:'вёрст',
	dm:'вёрстам',
	vm:'вёрсты',
	tm:'вёрстами',
	pm:'вёрстах',
	rod:1,
	skl:1,
	odu:0,
};
lx['витрина']={
	ie:'витрина',
	re:'витрины',
	de:'витрине',
	ve:'витрину',
	te:'витриной',
	pe:'витрине',
	im:'витрины',
	rm:'витрин',
	dm:'витринам',
	vm:'витрины',
	tm:'витринами',
	pm:'витринах',
	rod:1,
	skl:1,
	odu:0,
};
lx['вода']={
	ie:'вода',
	re:'воды',
	de:'воде',
	ve:'воду',
	te:'водой',
	pe:'воде',
	im:'воды',
	rm:'вод',
	dm:'водам',
	vm:'воды',
	tm:'водами',
	pm:'водах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Воронеж']={
	ie:'Воронеж',
	re:'Воронежа',
	de:'Воронежу',
	ve:'Воронеж',
	te:'Воронежом',
	pe:'Воронеже',
	im:'Воронежи',
	rm:'Воронежей',
	dm:'Воронежам',
	vm:'Воронежи',
	tm:'Воронежами',
	pm:'Воронежах',
	rod:0,
	skl:2,
	odu:0,
	sbs:1,
	chr:1,
};
lx['воскресенье']={
	ie:'воскресенье',
	re:'воскресенья',
	de:'воскресенью',
	ve:'воскресенье',
	te:'воскресеньем',
	pe:'воскресенье',
	im:'воскресенья',
	rm:'воскресений',
	dm:'воскресеньям',
	vm:'воскресенья',
	tm:'воскресеньями',
	pm:'воскресеньях',
	rod:2,
	skl:2,
	odu:0,
};
lx['время']={
	ie:'время',
	re:'времени',
	de:'времени',
	ve:'время',
	te:'временем',
	pe:'времени',
	im:'времена',
	rm:'времён',
	dm:'временам',
	vm:'времена',
	tm:'временами',
	pm:'временах',
	rod:0,
	skl:4,
	odu:0,
};
lx['вторник']={
	ie:'вторник',
	re:'вторника',
	de:'вторнику',
	ve:'вторник',
	te:'вторником',
	pe:'вторнике',
	im:'вторники',
	rm:'вторников',
	dm:'вторникам',
	vm:'вторники',
	tm:'вторниками',
	pm:'вторниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['выступление']={
	ie:'выступление',
	re:'выступления',
	de:'выступлению',
	ve:'выступление',
	te:'выступлением',
	pe:'выступлении',
	im:'выступления',
	rm:'выступлений',
	dm:'выступлениям',
	vm:'выступления',
	tm:'выступлениями',
	pm:'выступлениях',
	rod:2,
	skl:2,
	odu:0,
	sbs:0,
	chr:1,
	rmn:'выступлениев',
};
lx['газ']={
	ie:'газ',
	re:'газа',
	de:'газу',
	ve:'газ',
	te:'газом',
	pe:'газе',
	im:'газы',
	rm:'газов',
	dm:'газам',
	vm:'газы',
	tm:'газами',
	pm:'газах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['гараж']={
	ie:'гараж',
	re:'гаража',
	de:'гаражу',
	ve:'гараж',
	te:'гаражом',
	pe:'гараже',
	im:'гаражы',
	rm:'гаражов',
	dm:'гаражам',
	vm:'гаражы',
	tm:'гаражами',
	pm:'гаражах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Германия']={
	ie:'Германия',
	re:'Германии',
	de:'Германии',
	ve:'Германию',
	te:'Германией',
	pe:'Германии',
	im:'Германии',
	rm:'Германий',
	dm:'Германиям',
	vm:'Германии',
	tm:'Германиями',
	pm:'Германиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['гимнастика']={
	ie:'гимнастика',
	re:'гимнастики',
	de:'гимнастике',
	ve:'гимнастику',
	te:'гимнастикой',
	pe:'гимнастике',
	im:'гимнастики',
	rm:'гимнастик',
	dm:'гимнастикам',
	vm:'гимнастики',
	tm:'гимнастиками',
	pm:'гимнастиках',
	rod:1,
	skl:1,
	odu:0,
};
lx['город']={
	ie:'город',
	re:'города',
	de:'городу',
	ve:'город',
	te:'городом',
	pe:'городе',
	im:'города',
	rm:'городов',
	dm:'городам',
	vm:'города',
	tm:'городами',
	pm:'городах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['городок']={
	ie:'городок',
	re:'городка',
	de:'городку',
	ve:'городок',
	te:'городком',
	pe:'городке',
	im:'городки',
	rm:'городков',
	dm:'городкам',
	vm:'городки',
	tm:'городками',
	pm:'городках',
	rod:0,
	skl:2,
	odu:0,
};
lx['гравий']={
	ie:'гравий',
	re:'гравия',
	de:'гравию',
	ve:'гравий',
	te:'гравием',
	pe:'гравии',
	im:'гравии',
	rm:'гравиев',
	dm:'гравиям',
	vm:'гравии',
	tm:'гравиями',
	pm:'гравиях',
	rod:0,
	skl:2,
	odu:0,
};
lx['гранит']={
	ie:'гранит',
	re:'гранита',
	de:'граниту',
	ve:'гранит',
	te:'гранитом',
	pe:'граните',
	im:'граниты',
	rm:'гранитов',
	dm:'гранитам',
	vm:'граниты',
	tm:'гранитами',
	pm:'гранитах',
	rod:0,
	skl:2,
	odu:0,
};
lx['грузовик']={
	ie:'грузовик',
	re:'грузовика',
	de:'грузовику',
	ve:'грузовик',
	te:'грузовиком',
	pe:'грузовике',
	im:'грузовики',
	rm:'грузовиков',
	dm:'грузовикам',
	vm:'грузовики',
	tm:'грузовиками',
	pm:'грузовиках',
	rod:0,
	skl:2,
	odu:0,
};
lx['груша']={
	ie:'груша',
	re:'груши',
	de:'груше',
	ve:'грушу',
	te:'грушой',
	pe:'груше',
	im:'груши',
	rm:'груш',
	dm:'грушам',
	vm:'груши',
	tm:'грушами',
	pm:'грушах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Дарья']={
	ie:'Дарья',
	re:'Дарьи',
	de:'Дарье',
	ve:'Дарью',
	te:'Дарьей',
	pe:'Дарье',
	im:'Дарьи',
	rm:'Дарий',
	dm:'Дарьям',
	vm:'Дарьи',
	tm:'Дарьями',
	pm:'Дарьях',
	rod:1,
	skl:1,
	odu:0,
};
lx['дача']={
	ie:'дача',
	re:'дачи',
	de:'даче',
	ve:'дачу',
	te:'дачей',
	pe:'даче',
	im:'дачи',
	rm:'дач',
	dm:'дачам',
	vm:'дачи',
	tm:'дачами',
	pm:'дачах',
	rod:1,
	skl:1,
	odu:0,
};
lx['декада']={
	ie:'декада',
	re:'декады',
	de:'декаде',
	ve:'декаду',
	te:'декадой',
	pe:'декаде',
	im:'декады',
	rm:'декад',
	dm:'декадам',
	vm:'декады',
	tm:'декадами',
	pm:'декадах',
	rod:1,
	skl:1,
	odu:0,
};
lx['дельтоид']={
	ie:'дельтоид',
	re:'дельтоида',
	de:'дельтоиду',
	ve:'дельтоид',
	te:'дельтоидом',
	pe:'дельтоиде',
	im:'дельтоиды',
	rm:'дельтоидов',
	dm:'дельтоидам',
	vm:'дельтоиды',
	tm:'дельтоидами',
	pm:'дельтоидах',
	rod:0,
	skl:2,
	odu:0,
};
lx['день']={
	ie:'день',
	re:'дня',
	de:'дню',
	ve:'день',
	te:'днём',
	pe:'дне',
	im:'дни',
	rm:'дней',
	dm:'дням',
	vm:'дни',
	tm:'днями',
	pm:'днях',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['деревня']={
	ie:'деревня',
	re:'деревни',
	de:'деревне',
	ve:'деревню',
	te:'деревней',
	pe:'деревне',
	im:'деревни',
	rm:'деревень',
	dm:'деревням',
	vm:'деревни',
	tm:'деревнями',
	pm:'деревнях',
	rod:1,
	skl:1,
	odu:0,
};
lx['деталь']={
	ie:'деталь',
	re:'детали',
	de:'детали',
	ve:'деталь',
	te:'деталью',
	pe:'детали',
	im:'детали',
	rm:'деталей',
	dm:'деталям',
	vm:'детали',
	tm:'деталями',
	pm:'деталях',
	rod:1,
	skl:3,
	odu:0,
};
lx['дециметр']={
	ie:'дециметр',
	re:'дециметра',
	de:'дециметру',
	ve:'дециметр',
	te:'дециметром',
	pe:'дециметре',
	im:'дециметры',
	rm:'дециметров',
	dm:'дециметрам',
	vm:'дециметры',
	tm:'дециметрами',
	pm:'дециметрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'дм',
};
lx['диагональ']={
	ie:'диагональ',
	re:'диагонали',
	de:'диагонали',
	ve:'диагональ',
	te:'диагональю',
	pe:'диагонали',
	im:'диагонали',
	rm:'диагоналей',
	dm:'диагоналям',
	vm:'диагонали',
	tm:'диагоналями',
	pm:'диагоналях',
	rod:1,
	skl:3,
	odu:0,
};
lx['дизель']={
	ie:'дизель',
	re:'дизеля',
	de:'дизелю',
	ve:'дизель',
	te:'дизелем',
	pe:'дизеле',
	im:'дизели',
	rm:'дизелей',
	dm:'дизелям',
	vm:'дизели',
	tm:'дизелями',
	pm:'дизелях',
	rod:0,
	skl:2,
	odu:0,
};
lx['доллар']={
	ie:'доллар',
	re:'доллара',
	de:'доллару',
	ve:'доллар',
	te:'долларом',
	pe:'долларе',
	im:'доллары',
	rm:'долларов',
	dm:'долларам',
	vm:'доллары',
	tm:'долларами',
	pm:'долларах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['дом']={
	ie:'дом',
	re:'дома',
	de:'дому',
	ve:'дом',
	te:'домом',
	pe:'доме',
	im:'дома',
	rm:'домов',
	dm:'домам',
	vm:'дома',
	tm:'домами',
	pm:'домах',
	rod:0,
	skl:2,
	odu:0,
};
lx['домик']={
	ie:'домик',
	re:'домика',
	de:'домику',
	ve:'домик',
	te:'домиком',
	pe:'домике',
	im:'домики',
	rm:'домиков',
	dm:'домикам',
	vm:'домики',
	tm:'домиками',
	pm:'домиках',
	rod:0,
	skl:2,
	odu:0,
};
lx['дробь']={
	ie:'дробь',
	re:'дроби',
	de:'дроби',
	ve:'дробь',
	te:'дробью',
	pe:'дроби',
	im:'дроби',
	rm:'дробей',
	dm:'дробям',
	vm:'дроби',
	tm:'дробями',
	pm:'дробях',
	rod:1,
	skl:3,
	odu:0,
	chr:1,
};
lx['евро']={
	ie:'евро',
	re:'евро',
	de:'евро',
	ve:'евро',
	te:'евро',
	pe:'евро',
	im:'евро',
	rm:'евро',
	dm:'евро',
	vm:'евро',
	tm:'евро',
	pm:'евро',
	rod:2,
	skl:0,
	odu:0,
};
lx['Елена']={
	ie:'Елена',
	re:'Елены',
	de:'Елене',
	ve:'Елену',
	te:'Еленой',
	pe:'Елене',
	im:'Елены',
	rm:'Елен',
	dm:'Еленам',
	vm:'Елен',
	tm:'Еленами',
	pm:'Еленах',
	rod:1,
	skl:1,
	odu:0,
};
lx['жидкость']={
	ie:'жидкость',
	re:'жидкости',
	de:'жидкости',
	ve:'жидкость',
	te:'жидкостью',
	pe:'жидкости',
	im:'жидкости',
	rm:'жидкостей',
	dm:'жидкостям',
	vm:'жидкости',
	tm:'жидкостями',
	pm:'жидкостях',
	rod:1,
	skl:3,
	odu:0,
};
lx['задание']={
	ie:'задание',
	re:'задания',
	de:'заданию',
	ve:'задание',
	te:'заданием',
	pe:'задании',
	im:'задания',
	rm:'заданий',
	dm:'заданиям',
	vm:'задания',
	tm:'заданиями',
	pm:'заданиях',
	rod:2,
	skl:2,
	odu:0,
};
lx['"Запорожец"']={
	ie:'"Запорожец"',
	re:'"Запорожца"',
	de:'"Запорожцу"',
	ve:'"Запорожец"',
	te:'"Запорожцем"',
	pe:'"Запорожце"',
	im:'"Запорожцы"',
	rm:'"Запорожцев"',
	dm:'"Запорожцам"',
	vm:'"Запорожцы"',
	tm:'"Запорожцами"',
	pm:'"Запорожцах"',
	rod:0,
	skl:2,
	odu:0,
};
lx['значение']={
	ie:'значение',
	re:'значения',
	de:'значению',
	ve:'значение',
	te:'значением',
	pe:'значении',
	im:'значения',
	rm:'значений',
	dm:'значениям',
	vm:'значения',
	tm:'значениями',
	pm:'значениях',
	rod:2,
	skl:2,
	odu:0,
};
lx['Ивановна']={
	ie:'Ивановна',
	re:'Ивановны',
	de:'Ивановне',
	ve:'Ивановну',
	te:'Ивановной',
	pe:'Ивановне',
	im:'Ивановны',
	rm:'Ивановн',
	dm:'Ивановнам',
	vm:'Ивановн',
	tm:'Ивановнами',
	pm:'Ивановнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['известняк']={
	ie:'известняк',
	re:'известняка',
	de:'известняку',
	ve:'известняк',
	te:'известняком',
	pe:'известняке',
	im:'известняки',
	rm:'известняков',
	dm:'известнякам',
	vm:'известняки',
	tm:'известняками',
	pm:'известняках',
	rod:0,
	skl:2,
	odu:0,
};
lx['Израиль']={
	ie:'Израиль',
	re:'Израиля',
	de:'Израилю',
	ve:'Израиль',
	te:'Израилем',
	pe:'Израиле',
	im:'Израили',
	rm:'Израилей',
	dm:'Израилям',
	vm:'Израили',
	tm:'Израилями',
	pm:'Израилях',
	rod:0,
	skl:2,
	odu:0,
};
lx['инноград']={
	ie:'инноград',
	re:'иннограда',
	de:'иннограду',
	ve:'инноград',
	te:'инноградом',
	pe:'иннограде',
	im:'иннограды',
	rm:'инноградов',
	dm:'инноградам',
	vm:'иннограды',
	tm:'инноградами',
	pm:'инноградах',
	rod:0,
	skl:2,
	odu:0,
};
lx['интервал']={
	ie:'интервал',
	re:'интервала',
	de:'интервалу',
	ve:'интервал',
	te:'интервалом',
	pe:'интервале',
	im:'интервалы',
	rm:'интервалов',
	dm:'интервалам',
	vm:'интервалы',
	tm:'интервалами',
	pm:'интервалах',
	rod:0,
	skl:2,
	odu:0,
};
lx['июнь']={
	ie:'июнь',
	re:'июня',
	de:'июню',
	ve:'июнь',
	te:'июнем',
	pe:'июне',
	im:'июни',
	rm:'июней',
	dm:'июням',
	vm:'июни',
	tm:'июнями',
	pm:'июнях',
	rod:0,
	skl:2,
	odu:0,
};
lx['июль']={
	ie:'июль',
	re:'июля',
	de:'июлю',
	ve:'июль',
	te:'июлем',
	pe:'июле',
	im:'июли',
	rm:'июлей',
	dm:'июлям',
	vm:'июли',
	tm:'июлями',
	pm:'июлях',
	rod:0,
	skl:2,
	odu:0,
};
lx['кабельтов']={
	ie:'кабельтов',
	re:'кабельтова',
	de:'кабельтову',
	ve:'кабельтов',
	te:'кабельтовым',
	pe:'кабельтовом',
	im:'кабельтовы',
	rm:'кабельтовых',
	dm:'кабельтовым',
	vm:'кабельтовых',
	tm:'кабельтовыми',
	pm:'кабельтовых',
	rod:0,
	skl:2,
	odu:0,
};
lx['Казань']={
        ie:'Казань',
        re:'Казани',
        de:'Казани',
        ve:'Казань',
        te:'Казанью',
        pe:'Казани',
        im:'Казани',
        rm:'Казаней',
        dm:'Казаням',
        vm:'Казани',
        tm:'Казанями',
        pm:'Казанях',
        rod:1,
        skl:3,
        odu:0,
};
lx['кальций']={
	ie:'кальций',
	re:'кальция',
	de:'кальцию',
	ve:'кальций',
	te:'кальцием',
	pe:'кальции',
	im:'кальции',
	rm:'кальциев',
	dm:'кальциям',
	vm:'кальции',
	tm:'кальциями',
	pm:'кальциях',
	rod:0,
	skl:2,
	odu:0,
};
lx['камень']={
	ie:'камень',
	re:'камня',
	de:'камню',
	ve:'камень',
	te:'камнем',
	pe:'камне',
	im:'камни',
	rm:'камней',
	dm:'камням',
	vm:'камни',
	tm:'камнями',
	pm:'камнях',
	rod:0,
	skl:2,
	odu:0,
};
lx['канцелярия']={
	ie:'канцелярия',
	re:'канцелярии',
	de:'канцелярии',
	ve:'канцелярию',
	te:'канцелярией',
	pe:'канцелярии',
	im:'канцелярии',
	rm:'канцелярий',
	dm:'канцеляриям',
	vm:'канцелярии',
	tm:'канцеляриями',
	pm:'канцеляриях',
	rod:1,
	skl:1,
	odu:0,
};
lx['катет']={
	ie:'катет',
	re:'катета',
	de:'катету',
	ve:'катет',
	te:'катетом',
	pe:'катете',
	im:'катеты',
	rm:'катетов',
	dm:'катетам',
	vm:'катеты',
	tm:'катетами',
	pm:'катетах',
	rod:0,
	skl:2,
	odu:0,
};
lx['квадрат']={
	ie:'квадрат',
	re:'квадрата',
	de:'квадрату',
	ve:'квадрат',
	te:'квадратом',
	pe:'квадрате',
	im:'квадраты',
	rm:'квадратов',
	dm:'квадратам',
	vm:'квадраты',
	tm:'квадратами',
	pm:'квадратах',
	rod:0,
	skl:2,
	odu:0,
};
lx['керосин']={
	ie:'керосин',
	re:'керосина',
	de:'керосину',
	ve:'керосин',
	te:'керосином',
	pe:'керосине',
	im:'керосины',
	rm:'керосинов',
	dm:'керосинам',
	vm:'керосины',
	tm:'керосинами',
	pm:'керосинах',
	rod:0,
	skl:2,
	odu:0,
};
lx['километр']={
	ie:'километр',
	re:'километра',
	de:'километру',
	ve:'километр',
	te:'километром',
	pe:'километре',
	im:'километры',
	rm:'километров',
	dm:'километрам',
	vm:'километры',
	tm:'километрами',
	pm:'километрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'км',
};
lx['Китай']={
	ie:'Китай',
	re:'Китая',
	de:'Китаю',
	ve:'Китай',
	te:'Китаем',
	pe:'Китае',
	im:'Китаи',
	rm:'Китаев',
	dm:'Китаям',
	vm:'Китаи',
	tm:'Китаями',
	pm:'Китаях',
	rod:0,
	skl:2,
	odu:0,
};
lx['клавиатура']={
	ie:'клавиатура',
	re:'клавиатуры',
	de:'клавиатуре',
	ve:'клавиатуру',
	te:'клавиатурой',
	pe:'клавиатуре',
	im:'клавиатуры',
	rm:'клавиатур',
	dm:'клавиатурам',
	vm:'клавиатуры',
	tm:'клавиатурами',
	pm:'клавиатурах',
	rod:1,
	skl:1,
	odu:0,
	sbs:0,
	chr:1,
};
lx['компакт-диск']={
	ie:'компакт-диск',
	re:'компакт-диска',
	de:'компакт-диску',
	ve:'компакт-диск',
	te:'компакт-диском',
	pe:'компакт-диске',
	im:'компакт-диски',
	rm:'компакт-дисков',
	dm:'компакт-дискам',
	vm:'компакт-диски',
	tm:'компакт-дисками',
	pm:'компакт-дисках',
	rod:0,
	skl:2,
	odu:0,
};
lx['конструкция']={
	ie:'конструкция',
	re:'конструкции',
	de:'конструкции',
	ve:'конструкцию',
	te:'конструкцией',
	pe:'конструкции',
	im:'конструкции',
	rm:'конструкций',
	dm:'конструкциям',
	vm:'конструкции',
	tm:'конструкциями',
	pm:'конструкциях',
	rod:1,
	skl:1,
	odu:0,
};
lx['копейка']={
	ie:'копейка',
	re:'копейки',
	de:'копейке',
	ve:'копейку',
	te:'копейкой',
	pe:'копейке',
	im:'копейки',
	rm:'копеек',
	dm:'копейкам',
	vm:'копейки',
	tm:'копейками',
	pm:'копейках',
	rod:1,
	skl:1,
	odu:0,
	sbs:0,
	chr:1,
};
lx['корабль']={
	ie:'корабль',
	re:'корабля',
	de:'кораблю',
	ve:'корабль',
	te:'кораблём',
	pe:'корабле',
	im:'корабли',
	rm:'кораблей',
	dm:'кораблям',
	vm:'корабли',
	tm:'кораблями',
	pm:'кораблях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Красноярск']={
	ie:'Красноярск',
	re:'Красноярска',
	de:'Красноярску',
	ve:'Красноярск',
	te:'Красноярском',
	pe:'Красноярске',
	im:'Красноярски',
	rm:'Красноярсков',
	dm:'Красноярскам',
	vm:'Красноярски',
	tm:'Красноярсками',
	pm:'Красноярсках',
	rod:0,
	skl:2,
	odu:0,
};
lx['Кристина']={
	ie:'Кристина',
	re:'Кристины',
	de:'Кристине',
	ve:'Кристину',
	te:'Кристиной',
	pe:'Кристине',
	im:'Кристины',
	rm:'Кристин',
	dm:'Кристинам',
	vm:'Кристин',
	tm:'Кристинами',
	pm:'Кристинах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Куба']={
	ie:'Куба',
	re:'Кубы',
	de:'Кубе',
	ve:'Кубу',
	te:'Кубой',
	pe:'Кубе',
	im:'Кубы',
	rm:'Куб',
	dm:'Кубам',
	vm:'Кубы',
	tm:'Кубами',
	pm:'Кубах',
	rod:1,
	skl:1,
	odu:0,
};
lx['кубометр']={
	ie:'кубометр',
	re:'кубометра',
	de:'кубометру',
	ve:'кубометр',
	te:'кубометром',
	pe:'кубометре',
	im:'кубометры',
	rm:'кубометров',
	dm:'кубометрам',
	vm:'кубометры',
	tm:'кубометрами',
	pm:'кубометрах',
	rod:0,
	skl:2,
	odu:0,
};
lx['литр']={
	ie:'литр',
	re:'литра',
	de:'литру',
	ve:'литр',
	te:'литром',
	pe:'литре',
	im:'литры',
	rm:'литров',
	dm:'литрам',
	vm:'литры',
	tm:'литрами',
	pm:'литрах',
	rod:0,
	skl:2,
	odu:0,
}; 
lx['луч']={
	ie:'луч',
	re:'луча',
	de:'лучу',
	ve:'луч',
	te:'лучом',
	pe:'луче',
	im:'лучи',
	rm:'лучей',
	dm:'лучам',
	vm:'лучи',
	tm:'лучами',
	pm:'лучах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Магадан']={
	ie:'Магадан',
	re:'Магадана',
	de:'Магадану',
	ve:'Магадан',
	te:'Магаданом',
	pe:'Магадане',
	im:'Магаданы',
	rm:'Магаданов',
	dm:'Магаданам',
	vm:'Магаданы',
	tm:'Магаданами',
	pm:'Магаданах',
	rod:0,
	skl:2,
	odu:0,
};
lx['магазин']={
	ie:'магазин',
	re:'магазина',
	de:'магазину',
	ve:'магазин',
	te:'магазином',
	pe:'магазине',
	im:'магазины',
	rm:'магазинов',
	dm:'магазинам',
	vm:'магазины',
	tm:'магазинами',
	pm:'магазинах',
	rod:0,
	skl:2,
	odu:0,
};
lx['магия']={
	ie:'магия',
	re:'магии',
	de:'магии',
	ve:'магию',
	te:'магией',
	pe:'магии',
	im:'магии',
	rm:'магий',
	dm:'магиям',
	vm:'магии',
	tm:'магиями',
	pm:'магиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['май']={
	ie:'май',
	re:'мая',
	de:'маю',
	ve:'май',
	te:'маем',
	pe:'мае',
	im:'маи',
	rm:'маев',
	dm:'маям',
	vm:'маи',
	tm:'маями',
	pm:'маях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Мария']={
	ie:'Мария',
	re:'Марии',
	de:'Марии',
	ve:'Марию',
	te:'Марией',
	pe:'Марии',
	im:'Марии',
	rm:'Марий',
	dm:'Мариям',
	vm:'Марии',
	tm:'Мариями',
	pm:'Мариях',
	rod:1,
	skl:1,
	odu:0,
};
lx['март']={
	ie:'март',
	re:'марта',
	de:'марту',
	ve:'март',
	te:'мартом',
	pe:'марте',
	im:'марты',
	rm:'мартов',
	dm:'мартам',
	vm:'марты',
	tm:'мартами',
	pm:'мартах',
	rod:0,
	skl:2,
	odu:0,
};
lx['матрёшка']={
	ie:'матрёшка',
	re:'матрёшки',
	de:'матрёшке',
	ve:'матрёшку',
	te:'матрёшкой',
	pe:'матрёшке',
	im:'матрёшки',
	rm:'матрёшек',
	dm:'матрёшкам',
	vm:'матрёшки',
	tm:'матрёшками',
	pm:'матрёшках',
	rod:1,
	skl:1,
	odu:0,
};
lx['Мексика']={
	ie:'Мексика',
	re:'Мексики',
	de:'Мексике',
	ve:'Мексику',
	te:'Мексикой',
	pe:'Мексике',
	im:'Мексики',
	rm:'Мексик',
	dm:'Мексикам',
	vm:'Мексики',
	tm:'Мексиками',
	pm:'Мексиках',
	rod:1,
	skl:1,
	odu:0,
};
lx['меню']={
	ie:'меню',
	re:'меню',
	de:'меню',
	ve:'меню',
	te:'меню',
	pe:'меню',
	im:'меню',
	rm:'меню',
	dm:'меню',
	vm:'меню',
	tm:'меню',
	pm:'меню',
	rod:2,
	skl:0,
	odu:0,
};
lx['месяц']={
	ie:'месяц',
	re:'месяца',
	de:'месяцу',
	ve:'месяц',
	te:'месяцем',
	pe:'месяце',
	im:'месяцы',
	rm:'месяцев',
	dm:'месяцам',
	vm:'месяцы',
	tm:'месяцами',
	pm:'месяцах',
	rod:0,
	skl:2,
	odu:0,
};
lx['метр']={
	ie:'метр',
	re:'метра',
	de:'метру',
	ve:'метр',
	te:'метром',
	pe:'метре',
	im:'метры',
	rm:'метров',
	dm:'метрам',
	vm:'метры',
	tm:'метрами',
	pm:'метрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'м',
};
lx['мешок']={
	ie:'мешок',
	re:'мешка',
	de:'мешку',
	ve:'мешок',
	te:'мешком',
	pe:'мешке',
	im:'мешки',
	rm:'мешков',
	dm:'мешкам',
	vm:'мешки',
	tm:'мешками',
	pm:'мешках',
	rod:0,
	skl:2,
	odu:0,
};
lx['миллиметр']={
	ie:'миллиметр',
	re:'миллиметра',
	de:'миллиметру',
	ve:'миллиметр',
	te:'миллиметром',
	pe:'миллиметре',
	im:'миллиметры',
	rm:'миллиметров',
	dm:'миллиметрам',
	vm:'миллиметры',
	tm:'миллиметрами',
	pm:'миллиметрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'мм',
};
lx['министерство']={
	ie:'министерство',
	re:'министерства',
	de:'министерству',
	ve:'министерство',
	te:'министерством',
	pe:'министерстве',
	im:'министерства',
	rm:'министерств',
	dm:'министерствам',
	vm:'министерства',
	tm:'министерствами',
	pm:'министерствах',
	rod:2,
	skl:2,
	odu:0,
};
lx['Минобрнауки']={
	ie:'Минобрнауки',
	re:'Минобрнауки',
	de:'Минобрнауки',
	ve:'Минобрнауки',
	te:'Минобрнауки',
	pe:'Минобрнауки',
	im:'Минобрнауки',
	rm:'Минобрнауки',
	dm:'Минобрнауки',
	vm:'Минобрнауки',
	tm:'Минобрнауки',
	pm:'Минобрнауки',
	rod:2,
	skl:0,
	odu:0,
};
lx['минута']={
	ie:'минута',
	re:'минуты',
	de:'минуте',
	ve:'минуту',
	te:'минутой',
	pe:'минуте',
	im:'минуты',
	rm:'минут',
	dm:'минутам',
	vm:'минуты',
	tm:'минутами',
	pm:'минутах',
	rod:1,
	skl:1,
	odu:0,
};
lx['Москва']={
	ie:'Москва',
	re:'Москвы',
	de:'Москве',
	ve:'Москву',
	te:'Москвой',
	pe:'Москве',
	im:'Москвы',
	rm:'Москв',
	dm:'Москвам',
	vm:'Москвы',
	tm:'Москвами',
	pm:'Москвах',
	rod:1,
	skl:1,
	odu:0,
	sbs:1,
	chr:1,
};
lx['"Москвич"']={
	ie:'"Москвич"',
	re:'"Москвича"',
	de:'"Москвичу"',
	ve:'"Москвич"',
	te:'"Москвичом"',
	pe:'"Москвиче"',
	im:'"Москвичи"',
	rm:'"Москвичей"',
	dm:'"Москвичам"',
	vm:'"Москвичи"',
	tm:'"Москвичами"',
	pm:'"Москвичах"',
	rod:0,
	skl:2,
	odu:0,
};
lx['наукоград']={
	ie:'наукоград',
	re:'наукограда',
	de:'наукограду',
	ve:'наукоград',
	te:'наукоградом',
	pe:'наукограде',
	im:'наукограды',
	rm:'наукоградов',
	dm:'наукоградам',
	vm:'наукограды',
	tm:'наукоградами',
	pm:'наукоградах',
	rod:0,
	skl:2,
	odu:0,
};
lx['неделя']={
	ie:'неделя',
	re:'недели',
	de:'неделе',
	ve:'неделю',
	te:'неделей',
	pe:'неделе',
	im:'недели',
	rm:'недель',
	dm:'неделям',
	vm:'недели',
	tm:'неделями',
	pm:'неделях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Николаевна']={
	ie:'Николаевна',
	re:'Николаевны',
	de:'Николаевне',
	ve:'Николаевну',
	te:'Николаевной',
	pe:'Николаевне',
	im:'Николаевны',
	rm:'Николаевн',
	dm:'Николаевнам',
	vm:'Николаевн',
	tm:'Николаевнами',
	pm:'Николаевнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['ноябрь']={
	ie:'ноябрь',
	re:'ноября',
	de:'ноябрю',
	ve:'ноябрь',
	te:'ноябрём',
	pe:'ноябре',
	im:'ноябри',
	rm:'ноябрей',
	dm:'ноябрям',
	vm:'ноябри',
	tm:'ноябрями',
	pm:'ноябрях',
	rod:0,
	skl:2,
	odu:0,
};
lx['октябрь']={
	ie:'октябрь',
	re:'октября',
	de:'октябрю',
	ve:'октябрь',
	te:'октябрём',
	pe:'октябре',
	im:'октябри',
	rm:'октябрей',
	dm:'октябрям',
	vm:'октябри',
	tm:'октябрями',
	pm:'октябрях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Олеся']={
	ie:'Олеся',
	re:'Олеси',
	de:'Олесе',
	ve:'Олесю',
	te:'Олесей',
	pe:'Олесе',
	im:'Олеси',
	rm:'Олесь',
	dm:'Олесям',
	vm:'Олесь',
	tm:'Олесями',
	pm:'Олесях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Ольга']={
	ie:'Ольга',
	re:'Ольги',
	de:'Ольге',
	ve:'Ольгу',
	te:'Ольгой',
	pe:'Ольге',
	im:'Ольги',
	rm:'Ольг',
	dm:'Ольгам',
	vm:'Ольг',
	tm:'Ольгами',
	pm:'Ольгах',
	rod:1,
	skl:1,
	odu:0,
};
lx['отрезок']={
	ie:'отрезок',
	re:'отрезка',
	de:'отрезку',
	ve:'отрезок',
	te:'отрезком',
	pe:'отрезке',
	im:'отрезки',
	rm:'отрезков',
	dm:'отрезкам',
	vm:'отрезки',
	tm:'отрезками',
	pm:'отрезках',
	rod:0,
	skl:2,
	odu:0,
};
lx['офис']={
	ie:'офис',
	re:'офиса',
	de:'офису',
	ve:'офис',
	te:'офисом',
	pe:'офисе',
	im:'офисы',
	rm:'офисов',
	dm:'офисам',
	vm:'офисы',
	tm:'офисами',
	pm:'офисах',
	rod:0,
	skl:2,
	odu:0,
};
lx['параллелограмм']={
	ie:'параллелограмм',
	re:'параллелограмма',
	de:'параллелограмму',
	ve:'параллелограмм',
	te:'параллелограммом',
	pe:'параллелограмме',
	im:'параллелограммы',
	rm:'параллелограммов',
	dm:'параллелограммам',
	vm:'параллелограммы',
	tm:'параллелограммами',
	pm:'параллелограммах',
	rod:0,
	skl:2,
	odu:0,
};
lx['пароход']={
	ie:'пароход',
	re:'парохода',
	de:'пароходу',
	ve:'пароход',
	te:'пароходом',
	pe:'пароходе',
	im:'пароходы',
	rm:'пароходов',
	dm:'пароходам',
	vm:'пароходы',
	tm:'пароходами',
	pm:'пароходах',
	rod:0,
	skl:2,
	odu:0,
};
lx['ПГТ']={
	ie:'ПГТ',
	re:'ПГТ',
	de:'ПГТ',
	ve:'ПГТ',
	te:'ПГТ',
	pe:'ПГТ',
	im:'ПГТ',
	rm:'ПГТ',
	dm:'ПГТ',
	vm:'ПГТ',
	tm:'ПГТ',
	pm:'ПГТ',
	rod:0,
	skl:0,
	odu:0,
};
lx['пенобетон']={
	ie:'пенобетон',
	re:'пенобетона',
	de:'пенобетону',
	ve:'пенобетон',
	te:'пенобетоном',
	pe:'пенобетоне',
	im:'пенобетоны',
	rm:'пенобетонов',
	dm:'пенобетонам',
	vm:'пенобетоны',
	tm:'пенобетонами',
	pm:'пенобетонах',
	rod:0,
	skl:2,
	odu:0,
};
lx['песок']={
	ie:'песок',
	re:'песка',
	de:'песку',
	ve:'песок',
	te:'песком',
	pe:'песке',
	im:'пески',
	rm:'песков',
	dm:'пескам',
	vm:'пески',
	tm:'песками',
	pm:'песках',
	rod:0,
	skl:2,
	odu:0,
};
lx['песчаник']={
	ie:'песчаник',
	re:'песчаника',
	de:'песчанику',
	ve:'песчаник',
	te:'песчаником',
	pe:'песчанике',
	im:'песчаники',
	rm:'песчаников',
	dm:'песчаникам',
	vm:'песчаники',
	tm:'песчаниками',
	pm:'песчаниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['Петровна']={
	ie:'Петровна',
	re:'Петровны',
	de:'Петровне',
	ve:'Петровну',
	te:'Петровной',
	pe:'Петровне',
	im:'Петровны',
	rm:'Петровн',
	dm:'Петровнам',
	vm:'Петровн',
	tm:'Петровнами',
	pm:'Петровнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['пирожок']={
	ie:'пирожок',
	re:'пирожка',
	de:'пирожку',
	ve:'пирожок',
	te:'пирожком',
	pe:'пирожке',
	im:'пирожки',
	rm:'пирожков',
	dm:'пирожкам',
	vm:'пирожки',
	tm:'пирожами',
	pm:'пирожах',
	rod:0,
	skl:2,
	odu:0,
};
lx['поезд']={
	ie:'поезд',
	re:'поезда',
	de:'поезду',
	ve:'поезд',
	te:'поездом',
	pe:'поезде',
	im:'поезды',
	rm:'поездов',
	dm:'поездам',
	vm:'поезды',
	tm:'поездами',
	pm:'поездах',
	rod:0,
	skl:2,
	odu:0,
};
lx['полуинтервал']={
	ie:'полуинтервал',
	re:'полуинтервала',
	de:'полуинтервалу',
	ve:'полуинтервал',
	te:'полуинтервалом',
	pe:'полуинтервале',
	im:'полуинтервалы',
	rm:'полуинтервалов',
	dm:'полуинтервалам',
	vm:'полуинтервалы',
	tm:'полуинтервалами',
	pm:'полуинтервалах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Польша']={
	ie:'Польша',
	re:'Польши',
	de:'Польше',
	ve:'Польшу',
	te:'Польшой',
	pe:'Польше',
	im:'Польши',
	rm:'Польш',
	dm:'Польшам',
	vm:'Польши',
	tm:'Польшами',
	pm:'Польшах',
	rod:1,
	skl:1,
	odu:0,
};
lx['понедельник']={
	ie:'понедельник',
	re:'понедельника',
	de:'понедельнику',
	ve:'понедельник',
	te:'понедельником',
	pe:'понедельнике',
	im:'понедельники',
	rm:'понедельников',
	dm:'понедельникам',
	vm:'понедельники',
	tm:'понедельниками',
	pm:'понедельниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['посёлок']={
	ie:'посёлок',
	re:'посёлка',
	de:'посёлку',
	ve:'посёлок',
	te:'посёлком',
	pe:'посёлке',
	im:'посёлки',
	rm:'посёлков',
	dm:'посёлкам',
	vm:'посёлки',
	tm:'посёлками',
	pm:'посёлках',
	rod:0,
	skl:2,
	odu:0,
};
lx['программистка']={
	ie:'программистка',
	re:'программистки',
	de:'программистке',
	ve:'программистку',
	te:'программисткой',
	pe:'программистке',
	im:'программистки',
	rm:'программисток',
	dm:'программисткам',
	vm:'программисток',
	tm:'программистками',
	pm:'программистках',
	rod:1,
	skl:1,
	odu:0,
};
lx['промежуток']={
	ie:'промежуток',
	re:'промежутка',
	de:'промежутку',
	ve:'промежуток',
	te:'промежутком',
	pe:'промежутке',
	im:'промежутки',
	rm:'промежутков',
	dm:'промежуткам',
	vm:'промежутки',
	tm:'промежутками',
	pm:'промежутках',
	rod:0,
	skl:2,
	odu:0,
};
lx['прямоугольник']={
	ie:'прямоугольник',
	re:'прямоугольника',
	de:'прямоугольнику',
	ve:'прямоугольник',
	te:'прямоугольником',
	pe:'прямоугольнике',
	im:'прямоугольники',
	rm:'прямоугольников',
	dm:'прямоугольникам',
	vm:'прямоугольники',
	tm:'прямоугольниками',
	pm:'прямоугольниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['пункт']={
	ie:'пункт',
	re:'пункта',
	de:'пункту',
	ve:'пункт',
	te:'пунктом',
	pe:'пункте',
	im:'пункты',
	rm:'пунктов',
	dm:'пунктам',
	vm:'пункты',
	tm:'пунктами',
	pm:'пунктах',
	rod:0,
	skl:2,
	odu:0,
};
lx['путь']={
	ie:'путь',
	re:'пути',
	de:'пути',
	ve:'путь',
	te:'путём',
	pe:'пути',
	im:'пути',
	rm:'путей',
	dm:'путям',
	vm:'пути',
	tm:'путями',
	pm:'путях',
	rod:0,
	skl:2,
	odu:0,
};
lx['пятница']={
	ie:'пятница',
	re:'пятницы',
	de:'пятнице',
	ve:'пятницу',
	te:'пятницей',
	pe:'пятнице',
	im:'пятницы',
	rm:'пятниц',
	dm:'пятницам',
	vm:'пятницы',
	tm:'пятницами',
	pm:'пятницах',
	rod:1,
	skl:1,
	odu:0,
};
lx['раз']={
	ie:'раз',
	re:'раза',
	de:'разу',
	ve:'раз',
	te:'разом',
	pe:'разе',
	im:'разы',
	rm:'раз',
	dm:'разам',
	vm:'разы',
	tm:'разами',
	pm:'разах',
	rod:0,
	skl:2,
	odu:0,
	sbs:0,
	chr:1,
};
lx['раствор']={
	ie:'раствор',
	re:'раствора',
	de:'раствору',
	ve:'раствор',
	te:'раствором',
	pe:'растворе',
	im:'растворы',
	rm:'растворов',
	dm:'растворам',
	vm:'растворы',
	tm:'растворами',
	pm:'растворах',
	rod:0,
	skl:2,
	odu:0,
};
lx['ребёнок']={
	ie:'ребёнок',
	re:'ребёнка',
	de:'ребёнку',
	ve:'ребёнка',
	te:'ребёнком',
	pe:'ребёнке',
	im:'ребята',
	rm:'ребят',
	dm:'ребятам',
	vm:'ребят',
	tm:'ребятами',
	pm:'ребятах',
	rod:0,
	skl:2,
	odu:1,
	sbs:0,
	chr:1,
};
lx['ромб']={
	ie:'ромб',
	re:'ромба',
	de:'ромбу',
	ve:'ромб',
	te:'ромбом',
	pe:'ромбе',
	im:'ромбы',
	rm:'ромбов',
	dm:'ромбам',
	vm:'ромбы',
	tm:'ромбами',
	pm:'ромбах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Рособрнадзор']={
	ie:'Рособрнадзор',
	re:'Рособрнадзора',
	de:'Рособрнадзору',
	ve:'Рособрнадзор',
	te:'Рособрнадзором',
	pe:'Рособрнадзоре',
	im:'Рособрнадзоры',
	rm:'Рособрнадзоров',
	dm:'Рособрнадзорам',
	vm:'Рособрнадзоры',
	tm:'Рособрнадзорами',
	pm:'Рособрнадзорах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Россия']={
	ie:'Россия',
	re:'России',
	de:'России',
	ve:'Россию',
	te:'Россией',
	pe:'России',
	im:'России',
	rm:'Россий',
	dm:'Россиям',
	vm:'России',
	tm:'Россиями',
	pm:'Россиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['ртуть']={
	ie:'ртуть',
	re:'ртути',
	de:'ртути',
	ve:'ртуть',
	te:'ртутью',
	pe:'ртути',
	im:'ртути',
	rm:'ртутей',
	dm:'ртутям',
	vm:'ртути',
	tm:'ртутями',
	pm:'ртутях',
	rod:1,
	skl:3,
	odu:0,
};
lx['рубль']={
	ie:'рубль',
	re:'рубля',
	de:'рублю',
	ve:'рубль',
	te:'рублём',
	pe:'рубле',
	im:'рубли',
	rm:'рублей',
	dm:'рублям',
	vm:'рубли',
	tm:'рублями',
	pm:'рублях',
	rod:0,
	skl:2,
	odu:0,
};
lx['рука']={
	ie:'рука',
	re:'руки',
	de:'руке',
	ve:'руку',
	te:'рукой',
	pe:'руке',
	im:'руки',
	rm:'рук',
	dm:'рукам',
	vm:'руки',
	tm:'руками',
	pm:'руках',
	rod:1,
	skl:1,
	odu:0,
};
lx['ручка']={
	ie:'ручка',
	re:'ручки',
	de:'ручке',
	ve:'ручку',
	te:'ручкой',
	pe:'ручке',
	im:'ручки',
	rm:'ручек',
	dm:'ручкам',
	vm:'ручки',
	tm:'ручками',
	pm:'ручках',
	rod:1,
	skl:1,
	odu:0,
};
lx['Санкт-Петербург']={
	ie:'Санкт-Петербург',
	re:'Санкт-Петербурга',
	de:'Санкт-Петербургу',
	ve:'Санкт-Петербург',
	te:'Санкт-Петербургом',
	pe:'Санкт-Петербурге',
	im:'Санкт-Петербурги',
	rm:'Санкт-Петербургов',
	dm:'Санкт-Петербургам',
	vm:'Санкт-Петербурги',
	tm:'Санкт-Петербургами',
	pm:'Санкт-Петербургах',
	rod:0,
	skl:2,
	odu:0,
};
lx['сантиметр']={
	ie:'сантиметр',
	re:'сантиметра',
	de:'сантиметру',
	ve:'сантиметр',
	te:'сантиметром',
	pe:'сантиметре',
	im:'сантиметры',
	rm:'сантиметров',
	dm:'сантиметрам',
	vm:'сантиметры',
	tm:'сантиметрами',
	pm:'сантиметрах',
	rod:0,
	skl:2,
	odu:0,
	skr:'см',
};
lx['секретариат']={
	ie:'секретариат',
	re:'секретариата',
	de:'секретариату',
	ve:'секретариат',
	te:'секретариатом',
	pe:'секретариате',
	im:'секретариаты',
	rm:'секретариатов',
	dm:'секретариатам',
	vm:'секретариаты',
	tm:'секретариатами',
	pm:'секретариатах',
	rod:0,
	skl:2,
	odu:0,
};
lx['село']={
	ie:'село',
	re:'села',
	de:'селу',
	ve:'село',
	te:'селом',
	pe:'селе',
	im:'сёла',
	rm:'сёл',
	dm:'сёлам',
	vm:'сёла',
	tm:'сёлами',
	pm:'сёлах',
	rod:2,
	skl:2,
	odu:0,
};
lx['Семилуки']={
        ie:'Семилуки',
        re:'Семилук',
        de:'Семилукам',
        ve:'Семилуки',
        te:'Семилуками',
        pe:'Семилуках',
        im:'Семилуки',
        rm:'Семилук',
        dm:'Семилукам',
        vm:'Семилуки',
        tm:'Семилуками',
        pm:'Семилуках',
        rod:3,
        skl:2,
        odu:0,
};
lx['сентябрь']={
	ie:'сентябрь',
	re:'сентября',
	de:'сентябрю',
	ve:'сентябрь',
	te:'сентябре',
	pe:'сентябре',
	im:'сентябри',
	rm:'сентябрей',
	dm:'сентябрям',
	vm:'сентябри',
	tm:'сентябрями',
	pm:'сентябрях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Сербия']={
	ie:'Сербия',
	re:'Сербии',
	de:'Сербии',
	ve:'Сербию',
	te:'Сербией',
	pe:'Сербии',
	im:'Сербии',
	rm:'Сербий',
	dm:'Сербиям',
	vm:'Сербии',
	tm:'Сербиями',
	pm:'Сербиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['Сергеевна']={
	ie:'Сергеевна',
	re:'Сергеевны',
	de:'Сергеевне',
	ve:'Сергеевну',
	te:'Сергеевной',
	pe:'Сергеевне',
	im:'Сергеевны',
	rm:'Сергеевн',
	dm:'Сергеевнам',
	vm:'Сергеевн',
	tm:'Сергеевнами',
	pm:'Сергеевнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['склонение']={
	ie:'склонение',
	re:'склонения',
	de:'склонению',
	ve:'склонение',
	te:'склонением',
	pe:'склонении',
	im:'склонения',
	rm:'склонений',
	dm:'склонениям',
	vm:'склонения',
	tm:'склонениями',
	pm:'склонениях',
	rod:2,
	skl:2,
	odu:0,
	sbs:0,
	chr:1,
};
lx['Словакия']={
	ie:'Словакия',
	re:'Словакии',
	de:'Словакии',
	ve:'Словакию',
	te:'Словакией',
	pe:'Словакии',
	im:'Словакии',
	rm:'Словакий',
	dm:'Словакиям',
	vm:'Словакии',
	tm:'Словакиями',
	pm:'Словакиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['словарь']={
	ie:'словарь',
	re:'словаря',
	de:'словарю',
	ve:'словарь',
	te:'словарем',
	pe:'словаре',
	im:'словари',
	rm:'словарей',
	dm:'словарям',
	vm:'словари',
	tm:'словарями',
	pm:'словарях',
	rod:0,
	skl:2,
	odu:0,
	chr:1,
};
lx['Словения']={
	ie:'Словения',
	re:'Словении',
	de:'Словении',
	ve:'Словению',
	te:'Словенией',
	pe:'Словении',
	im:'Словении',
	rm:'Словений',
	dm:'Словениям',
	vm:'Словении',
	tm:'Словениями',
	pm:'Словениях',
	rod:1,
	skl:1,
	odu:0,
};
lx['слово']={
	ie:'слово',
	re:'слова',
	de:'слову',
	ve:'слове',
	te:'словом',
	pe:'слове',
	im:'слова',
	rm:'слов',
	dm:'словам',
	vm:'слова',
	tm:'словами',
	pm:'словах',
	rod:2,
	skl:2,
	odu:0,
	chr:1,
};
lx['солярка']={
	ie:'солярка',
	re:'солярки',
	de:'солярке',
	ve:'солярку',
	te:'соляркой',
	pe:'солярке',
	im:'солярки',
	rm:'солярк',
	dm:'соляркам',
	vm:'солярки',
	tm:'солярками',
	pm:'солярках',
	rod:1,
	skl:1,
	odu:0,
};
lx['Сочи']={
	ie:'Сочи',
	re:'Сочи',
	de:'Сочи',
	ve:'Сочи',
	te:'Сочи',
	pe:'Сочи',
	im:'Сочи',
	rm:'Сочи',
	dm:'Сочи',
	vm:'Сочи',
	tm:'Сочи',
	pm:'Сочи',
	rod:1,
	skl:0,
	odu:0,
};
lx['среда']={
	ie:'среда',
	re:'среды',
	de:'среде',
	ve:'среду',
	te:'средой',
	pe:'среде',
	im:'среды',
	rm:'сред',
	dm:'средам',
	vm:'среды',
	tm:'средами',
	pm:'средах',
	rod:1,
	skl:1,
	odu:0,
};
lx['сторона']={
	ie:'сторона',
	re:'стороны',
	de:'стороне',
	ve:'сторону',
	te:'стороной',
	pe:'стороне',
	im:'стороны',
	rm:'сторон',
	dm:'сторонам',
	vm:'стороны',
	tm:'сторонами',
	pm:'сторонах',
	rod:1,
	skl:1,
	odu:0,
};
lx['студентка']={
	ie:'студентка',
	re:'студентки',
	de:'студентке',
	ve:'студентку',
	te:'студенткой',
	pe:'студентке',
	im:'студентки',
	rm:'студенток',
	dm:'студенткам',
	vm:'студенток',
	tm:'студентками',
	pm:'студентках',
	rod:1,
	skl:1,
	odu:0,
};
lx['суббота']={
	ie:'суббота',
	re:'субботы',
	de:'субботе',
	ve:'субботу',
	te:'субботой',
	pe:'субботе',
	im:'субботы',
	rm:'суббот',
	dm:'субботам',
	vm:'субботы',
	tm:'субботами',
	pm:'субботах',
	rod:1,
	skl:1,
	odu:0,
};
lx['сувенир']={
	ie:'сувенир',
	re:'сувенира',
	de:'сувениру',
	ve:'сувенир',
	te:'сувениром',
	pe:'сувенире',
	im:'сувениры',
	rm:'сувениров',
	dm:'сувенирам',
	vm:'сувениры',
	tm:'сувенирами',
	pm:'сувенирах',
	rod:0,
	skl:2,
	odu:0,
};
lx['сырок']={
	ie:'сырок',
	re:'сырка',
	de:'сырку',
	ve:'сырок',
	te:'сырком',
	pe:'сырке',
	im:'сырки',
	rm:'сырков',
	dm:'сыркам',
	vm:'сырки',
	tm:'сырками',
	pm:'сырках',
	rod:0,
	skl:2,
	odu:0,
};
lx['теплоход']={
	ie:'теплоход',
	re:'теплохода',
	de:'теплоходу',
	ve:'теплоход',
	te:'теплоходом',
	pe:'теплоходе',
	im:'теплоходы',
	rm:'теплоходов',
	dm:'теплоходам',
	vm:'теплоходы',
	tm:'теплоходами',
	pm:'теплоходах',
	rod:0,
	skl:2,
	odu:0,
};
lx['террариум']={
	ie:'террариум',
	re:'террариума',
	de:'террариуму',
	ve:'террариум',
	te:'террариумом',
	pe:'террариуме',
	im:'террариумы',
	rm:'террариумов',
	dm:'террариумам',
	vm:'террариумы',
	tm:'террариумами',
	pm:'террариумах',
	rod:0,
	skl:2,
	odu:0,
};
lx['тетрадь']={
	ie:'тетрадь',
	re:'тетради',
	de:'тетради',
	ve:'тетрадь',
	te:'тетрадью',
	pe:'тетради',
	im:'тетради',
	rm:'тетрадей',
	dm:'тетрадям',
	vm:'тетради',
	tm:'тетрадями',
	pm:'тетрадях',
	rod:1,
	skl:3,
	odu:0,
};
lx['тонна']={
	ie:'тонна',
	re:'тонны',
	de:'тонне',
	ve:'тонну',
	te:'тонной',
	pe:'тонне',
	im:'тонны',
	rm:'тонн',
	dm:'тоннам',
	vm:'тонны',
	tm:'тоннами',
	pm:'тоннах',
	rod:1,
	skl:1,
	odu:0,
}; 
lx['топливо']={
	ie:'топливо',
	re:'топлива',
	de:'топливу',
	ve:'топливо',
	te:'топливом',
	pe:'топливе',
	im:'топливо',
	rm:'топлива',
	dm:'топливу',
	vm:'топливо',
	tm:'топливом',
	pm:'топливе',
	rod:2,
	skl:2,
	odu:0,
}; 
lx['точка']={
	ie:'точка',
	re:'точки',
	de:'точке',
	ve:'точку',
	te:'точкой',
	pe:'точке',
	im:'точки',
	rm:'точек',
	dm:'точкам',
	vm:'точки',
	tm:'точками',
	pm:'точках',
	rod:1,
	skl:1,
	odu:0,
};
lx['трапеция']={
	ie:'трапеция',
	re:'трапеции',
	de:'трапеции',
	ve:'трапецию',
	te:'трапецией',
	pe:'трапеции',
	im:'трапеции',
	rm:'трапеций',
	dm:'трапециям',
	vm:'трапеции',
	tm:'трапециями',
	pm:'трапециях',
	rod:1,
	skl:1,
	odu:0,
};
lx['учебник']={
	ie:'учебник',
	re:'учебника',
	de:'учебнику',
	ve:'учебник',
	te:'учебником',
	pe:'учебнике',
	im:'учебники',
	rm:'учебников',
	dm:'учебникам',
	vm:'учебники',
	tm:'учебниками',
	pm:'учебниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['февраль']={
	ie:'февраль',
	re:'февраля',
	de:'февралю',
	ve:'февраль',
	te:'февралём',
	pe:'феврале',
	im:'феврали',
	rm:'февралей',
	dm:'февралям',
	vm:'феврали',
	tm:'февралями',
	pm:'февралях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Фёдоровна']={
	ie:'Фёдоровна',
	re:'Фёдоровны',
	de:'Фёдоровне',
	ve:'Фёдоровну',
	te:'Фёдоровной',
	pe:'Фёдоровне',
	im:'Фёдоровны',
	rm:'Фёдоровн',
	dm:'Фёдоровнам',
	vm:'Фёдоровн',
	tm:'Фёдоровнами',
	pm:'Фёдоровнах',
	rod:1,
	skl:1,
	odu:0,
};
lx['флэшка']={
	ie:'флэшка',
	re:'флэшки',
	de:'флэшке',
	ve:'флэшку',
	te:'флэшкой',
	pe:'флэшке',
	im:'флэшки',
	rm:'флэшек',
	dm:'флэшкам',
	vm:'флэшки',
	tm:'флэшками',
	pm:'флэшках',
	rod:1,
	skl:1,
	odu:0,
};
lx['фонарик']={
	ie:'фонарик',
	re:'фонарика',
	de:'фонарику',
	ve:'фонарик',
	te:'фонариком',
	pe:'фонарике',
	im:'фонарики',
	rm:'фонариков',
	dm:'фонарикам',
	vm:'фонарики',
	tm:'фонариками',
	pm:'фонариках',
	rod:0,
	skl:2,
	odu:0,
};
lx['форма']={
	ie:'форма',
	re:'формы',
	de:'форме',
	ve:'форму',
	te:'формой',
	pe:'форме',
	im:'формы',
	rm:'форм',
	dm:'формам',
	vm:'формы',
	tm:'формами',
	pm:'формах',
	rod:1,
	skl:1,
	odu:0,
	chr:1,
};
lx['фурлонг']={
	ie:'фурлонг',
	re:'фурлонга',
	de:'фурлонгу',
	ve:'фурлонг',
	te:'фурлонгом',
	pe:'фурлонге',
	im:'фурлонги',
	rm:'фурлонгов',
	dm:'фурлонгам',
	vm:'фурлонги',
	tm:'фурлонгами',
	pm:'фурлонгах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Хабаровск']={
	ie:'Хабаровск',
	re:'Хабаровска',
	de:'Хабаровску',
	ve:'Хабаровск',
	te:'Хабаровском',
	pe:'Хабаровске',
	im:'Хабаровски',
	rm:'Хабаровсков',
	dm:'Хабаровскам',
	vm:'Хабаровски',
	tm:'Хабаровсками',
	pm:'Хабаровсках',
	rod:0,
	skl:2,
	odu:0,
	sbs:1,
	chr:1,
};
lx['хутор']={
	ie:'хутор',
	re:'хутора',
	de:'хутору',
	ve:'хутор',
	te:'хутором',
	pe:'хуторе',
	im:'хутора',
	rm:'хуторов',
	dm:'хуторам',
	vm:'хутора',
	tm:'хуторами',
	pm:'хуторах',
	rod:0,
	skl:2,
	odu:0,
};
lx['час']={
	ie:'час',
	re:'часа',
	de:'часу',
	ve:'час',
	te:'часом',
	pe:'часе',
	im:'часы',
	rm:'часов',
	dm:'часам',
	vm:'часы',
	tm:'часами',
	pm:'часах',
	rod:0,
	skl:2,
	odu:0,
};
lx['четверг']={
	ie:'четверг',
	re:'четверга',
	de:'четвергу',
	ve:'четверг',
	te:'четвергом',
	pe:'четверге',
	im:'четверги',
	rm:'четвергов',
	dm:'четвергам',
	vm:'четверги',
	tm:'четвергами',
	pm:'четвергах',
	rod:0,
	skl:2,
	odu:0,
};
lx['четырёхугольник']={
	ie:'четырёхугольник',
	re:'четырёхугольника',
	de:'четырёхугольнику',
	ve:'четырёхугольник',
	te:'четырёхугольником',
	pe:'четырёхугольнике',
	im:'четырёхугольники',
	rm:'четырёхугольников',
	dm:'четырёхугольникам',
	vm:'четырёхугольники',
	tm:'четырёхугольниками',
	pm:'четырёхугольниках',
	rod:0,
	skl:2,
	odu:0,
};
lx['Чехия']={
	ie:'Чехия',
	re:'Чехии',
	de:'Чехии',
	ve:'Чехию',
	te:'Чехией',
	pe:'Чехии',
	im:'Чехии',
	rm:'Чехий',
	dm:'Чехиям',
	vm:'Чехии',
	tm:'Чехиями',
	pm:'Чехиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['число']={
	ie:'число',
	re:'числа',
	de:'числу',
	ve:'число',
	te:'числом',
	pe:'числе',
	im:'числа',
	rm:'чисел',
	dm:'числам',
	vm:'числа',
	tm:'числами',
	pm:'числах',
	rod:2,
	skl:2,
	odu:0,
	chr:1,
};
lx['шахматы']={
	ie:'шахматы',
	re:'шахмат',
	de:'шахматам',
	ve:'шахматы',
	te:'шахматами',
	pe:'шахматах',
	im:'шахматы',
	rm:'шахмат',
	dm:'шахматам',
	vm:'шахматы',
	tm:'шахматами',
	pm:'шахматах',
	rod:0,
	skl:2,
	odu:0,
};
lx['шашки']={
	ie:'шашки',
	re:'шашек',
	de:'шашкам',
	ve:'шашки',
	te:'шашками',
	pe:'шашках',
	im:'шашки',
	rm:'шашек',
	dm:'шашкам',
	vm:'шашки',
	tm:'шашками',
	pm:'шашках',
	rod:3,
	skl:1,
	odu:0,
};
lx['школьница']={
	ie:'школьница',
	re:'школьницы',
	de:'школьнице',
	ve:'школьницу',
	te:'школьницей',
	pe:'школьнице',
	im:'школьницы',
	rm:'школьниц',
	dm:'школьницам',
	vm:'школьницы',
	tm:'школьницами',
	pm:'школьницах',
	rod:1,
	skl:1,
	odu:0,
};
lx['шлак']={
	ie:'шлак',
	re:'шлака',
	de:'шлаку',
	ve:'шлак',
	te:'шлаком',
	pe:'шлаке',
	im:'шлаки',
	rm:'шлаков',
	dm:'шлакам',
	vm:'шлаки',
	tm:'шлаками',
	pm:'шлаках',
	rod:0,
	skl:2,
	odu:0,
};
lx['шоколадка']={
	ie:'шоколадка',
	re:'шоколадки',
	de:'шоколадке',
	ve:'шоколадку',
	te:'шоколадкой',
	pe:'шоколадке',
	im:'шоколадки',
	rm:'шоколадок',
	dm:'шоколадкам',
	vm:'шоколадки',
	tm:'шоколадками',
	pm:'шоколадках',
	rod:1,
	skl:1,
	odu:0,
};
lx['щебень']={
	ie:'щебень',
	re:'щебня',
	de:'щебню',
	ve:'щебень',
	te:'щебнем',
	pe:'щебне',
	im:'щебни',
	rm:'щебней',
	dm:'щебням',
	vm:'щебни',
	tm:'щебнями',
	pm:'щебнях',
	rod:0,
	skl:2,
	odu:0,
};
lx['Эквадор']={
	ie:'Эквадор',
	re:'Эквадора',
	de:'Эквадору',
	ve:'Эквадор',
	te:'Эквадором',
	pe:'Эквадоре',
	im:'Эквадоры',
	rm:'Эквадоров',
	dm:'Эквадорам',
	vm:'Эквадоры',
	tm:'Эквадорами',
	pm:'Эквадорах',
	rod:0,
	skl:2,
	odu:0,
};
lx['электричка']={
	ie:'электричка',
	re:'электрички',
	de:'электричке',
	ve:'электричку',
	te:'электричкой',
	pe:'электричке',
	im:'электрички',
	rm:'электричк',
	dm:'электричкам',
	vm:'электрички',
	tm:'электричками',
	pm:'электричках',
	rod:1,
	skl:1,
	odu:0,
}; 
lx['Элеонора']={
	ie:'Элеонора',
	re:'Элеоноры',
	de:'Элеоноре',
	ve:'Элеонору',
	te:'Элеонорой',
	pe:'Элеоноре',
	im:'Элеоноры',
	rm:'Элеонор',
	dm:'Элеонорам',
	vm:'Элеонор',
	tm:'Элеонорами',
	pm:'Элеонорах',
	rod:1,
	skl:1,
	odu:0,
};
lx['этаж']={
	ie:'этаж',
	re:'этажа',
	de:'этажу',
	ve:'этаж',
	te:'этажом',
	pe:'этаже',
	im:'этажи',
	rm:'этажей',
	dm:'этажам',
	vm:'этажи',
	tm:'этажами',
	pm:'этажах',
	rod:0,
	skl:2,
	odu:0,
};
lx['Юлия']={
	ie:'Юлия',
	re:'Юлии',
	de:'Юлии',
	ve:'Юлию',
	te:'Юлией',
	pe:'Юлии',
	im:'Юлии',
	rm:'Юлий',
	dm:'Юлиям',
	vm:'Юлий',
	tm:'Юлиями',
	pm:'Юлиях',
	rod:1,
	skl:1,
	odu:0,
};
lx['яблоко']={
	ie:'яблоко',
	re:'яблока',
	de:'яблоку',
	ve:'яблоко',
	te:'яблоком',
	pe:'яблоке',
	im:'яблоки',
	rm:'яблок',
	dm:'яблокам',
	vm:'яблоки',
	tm:'яблоками',
	pm:'яблоках',
	rod:2,
	skl:2,
	odu:0,
};
lx['Яна']={
	ie:'Яна',
	re:'Яны',
	de:'Яне',
	ve:'Яну',
	te:'Яной',
	pe:'Яне',
	im:'Яны',
	rm:'Ян',
	dm:'Янам',
	vm:'Ян',
	tm:'Янами',
	pm:'Янах',
	rod:1,
	skl:1,
	odu:0,
};
lx['январь']={
	ie:'январь',
	re:'января',
	de:'январю',
	ve:'январь',
	te:'январём',
	pe:'январе',
	im:'январи',
	rm:'январей',
	dm:'январям',
	vm:'январи',
	tm:'январями',
	pm:'январях',
	rod:0,
	skl:2,
	odu:0,
};

//}}Существительные

////////////////////////////////////////////////////////////////////////

lx['выраженный']={};
lx['выраженный'].i=['выраженный','выраженная','выраженное','выраженные'];
lx['выраженный'].r=['выраженного','выраженной','выраженного','выраженных'];
lx['выраженный'].d=['выраженному','выраженной','выраженному','выраженным'];
lx['выраженный'].v=['выраженный','выраженную','выраженное','выраженные'];
lx['выраженный'].t=['выраженным','выраженной','выраженным','выраженными'];
lx['выраженный'].p=['выраженном','выраженной','выраженном','выраженных'];

///////////////////////////////////////////////////////////////////////
//Здесь - только список наречий
//sl - само слово. Оно же неизменяемое
//sr - сравнительная степень
//pr - превосходная степень
//chr - часть речи.
//0 - наречие
//1 - существительное
//2 - числительное
//3 - прилагательное
//4 - местоимение
'use strict';

lx['абсолютно']={
	sl:'абсолютно',
	chr:0,
}
lx['временно']={
	sl:'временно',
	chr:0,
}
////////////////////////////////////////////////////////////////////////
//
//	ie: именительный	падеж единственного	числа
//	re: родительный		падеж единственного	числа
//	de: дательный		падеж единственного	числа
//	ve: винительный		падеж единственного	числа
//	te: творительный	падеж единственного	числа
//	pe: предложный		падеж единственного	числа
//	ie: именительный	падеж множественного	числа
//	re: родительный		падеж множественного	числа
//	de: дательный		падеж множественного	числа
//	ve: винительный		падеж множественного	числа
//	te: творительный	падеж множественного	числа
//	pe: предложный		падеж множественного	числа
//
//	rod: род:
//		0: мужской
//		1: женский
//		2: средний
//		3: только множественное число
//
//	odu: одушевлённость:
//		0: неодушевлённое
//		1: одушевлённое
//
//	skl: склонение:
//		0: несклоняемое
//		1: первое
//		2: второе
//		3: третье
//		4: разносклоняемые существительные
////////////////////////////////////////////////////////////////////////
'use strict';
if(lx==undefined)
	var lx=[];	//Объявляем глобальный объект lx
////////////////////////////////////////////////////////////////////////

//{{Словосочетания с главным словом - существительным
lx['американская миля']={
	ie:'американская миля',
	re:'американской мили',
	de:'американской миле',
	ve:'американскую милю',
	te:'американской милей',
	pe:'американской миле',
	im:'американские мили',
	rm:'американских миль',
	dm:'американским милям',
	vm:'американские мили',
	tm:'американскими милями',
	pm:'американских милях',
	rod:1,
	odu:0,
};
lx['бутылка газировки']={
	ie:'бутылка газировки',
	re:'бутылки газировки',
	de:'бутылке газировки',
	ve:'бутылку газировки',
	te:'бутылкой газировки',
	pe:'бутылке газировки',
	im:'бутылки газировки',
	rm:'бутылок газировки',
	dm:'бутылкам газировки',
	vm:'бутылки газировки',
	tm:'бутылками газировки',
	pm:'бутылках газировки',
	rod:0,
	odu:0,
};
lx['буханка хлеба']={
	ie:'буханка хлеба',
	re:'буханки хлеба',
	de:'буханке хлеба',
	ve:'буханку хлеба',
	te:'буханкой хлеба',
	pe:'буханке хлеба',
	im:'буханки хлеба',
	rm:'буханок хлеба',
	dm:'буханкам хлеба',
	vm:'буханки хлеба',
	tm:'буханками хлеба',
	pm:'буханках хлеба',
	rod:1,
	odu:0,
};
lx['вольная борьба']={
	ie:'вольная борьба',
	re:'вольной борьбы',
	de:'вольной борьбе',
	ve:'вольную борьбу',
	te:'вольной борьбой',
	pe:'вольной борьбе',
	im:'вольные борьбы',
	rm:'вольных борьб',
	dm:'вольным борьбам',
	vm:'вольные борьбы',
	tm:'вольными борьбами',
	pm:'вольных борьбах',
	rod:1,
	odu:0,
};
lx['доисторический омнибус']={
	ie:'доисторический омнибус',
	re:'доисторического омнибуса',
	de:'доисторическому омнибусу',
	ve:'доисторический омнибус',
	te:'доисторическим омнибусом',
	pe:'доисторическом омнибусе',
	im:'доисторические омнибусы',
	rm:'доисторических омнибусов',
	dm:'доисторическим омнибусам',
	vm:'доисторические омнибусы',
	tm:'доисторическими омнибусами',
	pm:'доисторических омнибусах',
	rod:0,
	odu:0,
};
lx['книжная полка']={
	ie:'книжная полка',
	re:'книжной полки',
	de:'книжной полке',
	ve:'книжную полку',
	te:'книжной полкой',
	pe:'книжной полке',
	im:'книжные полки',
	rm:'книжных полок',
	dm:'книжным полкам',
	vm:'книжные полки',
	tm:'книжными полками',
	pm:'книжных полках',
	rod:1,
	odu:0,
};
lx['комсомолка, спортсменка, отличница и, наконец, просто красавица']={
	ie:'комсомолка, спортсменка, отличница и, наконец, просто красавица',
	re:'комсомолки, спортсменки, отличницы и, наконец, просто красавицы',
	de:'комсомолке, спортсменке, отличнице и, наконец, просто красавице',
	ve:'комсомолку, спортсменку, отличницу и, наконец, просто красавицу',
	te:'комсомолкой, спортсменкой, отличницей и, наконец, просто красавицей',
	pe:'комсомолке, спортсменке, отличнице и, наконец, просто красавице',
	im:'комсомолки, спортсменки, отличницы и, наконец, просто красавицы',
	rm:'комсомолок, спортсменок, отличниц и, наконец, просто красавиц',
	dm:'комсомолкам, спортсменкам, отличницам и, наконец, просто красавицам',
	vm:'комсомолок, спортсменок, отличниц и, наконец, просто красавиц',
	tm:'комсомолками, спортсменками, отличницами и, наконец, просто красавицами',
	pm:'комсомолках, спортсменках, отличницах и, наконец, просто красавицах',
	rod:1,
	odu:0,
};
lx['круизный лайнер']={
	ie:'круизный лайнер',
	re:'круизного лайнера',
	de:'круизному лайнеру',
	ve:'круизный лайнер',
	te:'круизным лайнером',
	pe:'круизном лайнере',
	im:'круизные лайнеры',
	rm:'круизных лайнеров',
	dm:'круизным лайнерам',
	vm:'круизные лайнеры',
	tm:'круизными лайнерами',
	pm:'круизных лайнерах',
	rod:0,
	odu:0,
};
lx['лёгкая атлетика']={
	ie:'лёгкая атлетика',
	re:'лёкой атлетики',
	de:'лёгкой атлетике',
	ve:'лёгкую атлетику',
	te:'лёгкой атлетикой',
	pe:'лёгкой атлетике',
	im:'лёгкие атлетики',
	rm:'лёгких атлетик',
	dm:'лёгким атлетикам',
	vm:'лёгкие атлетики',
	tm:'лёгкими атлетиками',
	pm:'лёгких атлетиках',
	rod:1,
	odu:0,
};
lx['магнит на холодильник']={
	ie:'магнит на холодильник',
	re:'магнита на холодильник',
	de:'магниту на холодильник',
	ve:'магнит на холодильник',
	te:'магнитом на холодильник',
	pe:'магните на холодильник',
	im:'магниты на холодильник',
	rm:'магнитов на холодильник',
	dm:'магнитам на холодильник',
	vm:'магниты на холодильник',
	tm:'магнитами на холодильник',
	pm:'магнитах на холодильник',
	rod:0,
	odu:0,
};
lx['метиловый спирт']={
	ie:'метиловый спирт',
	re:'метилового спирта',
	de:'метиловому спирту',
	ve:'метиловый спирт',
	te:'метиловым спиртом',
	pe:'метиловом спирте',
	im:'метиловые спирты',
	rm:'метиловых спиртов',
	dm:'метиловым спиртам',
	vm:'метиловые спирты',
	tm:'метиловыми спиртами',
	pm:'метиловых спиртах',
	rod:0,
	odu:0,
};
lx['морская миля']={
	ie:'морская миля',
	re:'морской мили',
	de:'морской миле',
	ve:'морскую милю',
	te:'морской милей',
	pe:'морской миле',
	im:'морские мили',
	rm:'морских миль',
	dm:'морским милям',
	vm:'морские мили',
	tm:'морскими милями',
	pm:'морских милях',
	rod:1,
	odu:0,
};
lx['наименьшее значение']={
	ie:'наименьшее значение',
	re:'наименьшего значения',
	de:'наименьшему значению',
	ve:'наименьшее значение',
	te:'наименьшим значением',
	pe:'наименьшем значении',
	im:'наименьшие значения',
	rm:'наименьших значений',
	dm:'наименьшим значениям',
	vm:'наименьшие значения',
	tm:'наименьшими значениями',
	pm:'наименьших значениях',
	rod:2,
	odu:0,
};
lx['наибольшее значение']={
	ie:'наибольшее значение',
	re:'наибольшего значения',
	de:'наибольшему значению',
	ve:'наибольшее значение',
	te:'наибольшим значением',
	pe:'наибольшем значении',
	im:'наибольшие значения',
	rm:'наибольших значений',
	dm:'наибольшим значениям',
	vm:'наибольшие значения',
	tm:'наибольшими значениями',
	pm:'наибольших значениях',
	rod:2,
	odu:0,
};
lx['населённый пункт']={
	ie:'населённый пункт',
	re:'населённого пункта',
	de:'населённому пункту',
	ve:'населённый пункт',
	te:'населённым пунктом',
	pe:'населённом пункте',
	im:'населённые пункты',
	rm:'населённых пунктов',
	dm:'населённым пунктам',
	vm:'населённые пункты',
	tm:'населёнными пунктами',
	pm:'населённых пунктах',
	r2:'населённых пункта',
	rod:0,
	odu:0,
};
lx['настольный теннис']={
	ie:'настольный теннис',
	re:'настольного тенниса',
	de:'настольному теннису',
	ve:'настольный теннис',
	te:'настольным теннисом',
	pe:'настольном теннисе',
	im:'настольные теннисы',
	rm:'настольных теннисов',
	dm:'настольным теннисам',
	vm:'настольные теннисы',
	tm:'настольными теннисами',
	pm:'настольных теннисах',
	rod:0,
	odu:0,
};
lx['оконная рама']={
	ie:'оконная рама',
	re:'оконной рамы',
	de:'оконной раме',
	ve:'оконную раму',
	te:'оконной рамой',
	pe:'оконной раме',
	im:'оконные рамы',
	rm:'оконных рам',
	dm:'оконным рамам',
	vm:'оконные рамы',
	tm:'оконными рамами',
	pm:'оконных рамах',
	rod:1,
	odu:0,
};
lx['открытый луч']={
	ie:'открытый луч',
	re:'открытого луча',
	de:'открытому лучу',
	ve:'открытый луч',
	te:'открытым лучом',
	pe:'открытом луче',
	im:'открытые лучы',
	rm:'открытых лучей',
	dm:'открытым лучам',
	vm:'открытые лучи',
	tm:'открытыми лучами',
	pm:'открытых лучах',
	rod:0,
	odu:0,
};
lx['прогулочное судно']={
	ie:'прогулочное судно',
	re:'прогулочного судна',
	de:'прогулочному судну',
	ve:'прогулочное судно',
	te:'прогулочным судном',
	pe:'прогулочном судне',
	im:'прогулочные суда',
	rm:'прогулочных судов',
	dm:'прогулочным судам',
	vm:'прогулочные суда',
	tm:'прогулочными судами',
	pm:'прогулочных судах',
	rod:2,
	odu:0,
};
lx['русская миля']={
	ie:'русская миля',
	re:'русской мили',
	de:'русской миле',
	ve:'русскую милю',
	te:'русской милей',
	pe:'русской миле',
	im:'русские мили',
	rm:'русских миль',
	dm:'русским милям',
	vm:'русские мили',
	tm:'русскими милями',
	pm:'русских милях',
	rod:1,
	odu:0,
};
lx['сборник тестов для подготовки к ЕГЭ']={
	ie:'сборник тестов для подготовки к ЕГЭ',
	re:'сборника тестов для подготовки к ЕГЭ',
	de:'сборнику тестов для подготовки к ЕГЭ',
	ve:'сборник тестов для подготовки к ЕГЭ',
	te:'сборником тестов для подготовки к ЕГЭ',
	pe:'сборнике тестов для подготовки к ЕГЭ',
	im:'сборники тестов для подготовки к ЕГЭ',
	rm:'сборников тестов для подготовки к ЕГЭ',
	dm:'сборникам тестов для подготовки к ЕГЭ',
	vm:'сборники тестов для подготовки к ЕГЭ',
	tm:'сборниками тестов для подготовки к ЕГЭ',
	pm:'сборниках тестов для подготовки к ЕГЭ',
	rod:0,
	odu:0,
};
lx['скромный библиотекарь']={
	ie:'скромный библиотекарь',
	re:'скромного библиотекаря',
	de:'скромному библиотекарю',
	ve:'скромного библиотекаря',
	te:'скромным библиотекарем',
	pe:'скромном библиотекаре',
	im:'скромные библиотекари',
	rm:'скромных библиотекарей',
	dm:'скромным библиотекарям',
	vm:'скромных библиотекарей',
	tm:'скромными библиотекарями',
	pm:'скромных библиотекарях',
	rod:0,
	odu:0,
};
lx['суровая воронежская хакерша']={
	ie:'суровая воронежская хакерша',
	re:'суровой воронежской хакерши',
	de:'суровой воронежской хакерше',
	ve:'суровую воронежскую хакершу',
	te:'суровой воронежской хакершой',
	pe:'суровой воронежской хакерше',
	im:'суровые воронежские хакерши',
	rm:'суровых воронежских хакерш',
	dm:'суровым воронежским хакершам',
	vm:'суровых воронежских хакерш',
	tm:'суровыми воронежскими хакершами',
	pm:'суровых воронежских хакершах',
	rod:1,
	odu:0,
};
lx['точка минимума']={
	ie:'точка минимума',
	re:'точки минимума',
	de:'точке минимума',
	ve:'точку минимума',
	te:'точкой минимума',
	pe:'точке минимума',
	im:'точки минимума',
	rm:'точек минимума',
	dm:'точкам минимума',
	vm:'точки минимума',
	tm:'точками минимума',
	pm:'точках минимума',
	rod:1,
	odu:0,
};
lx['точка максимума']={
	ie:'точка максимума',
	re:'точки максимума',
	de:'точке максимума',
	ve:'точку максимума',
	te:'точкой максимума',
	pe:'точке максимума',
	im:'точки максимума',
	rm:'точек максимума',
	dm:'точкам максимума',
	vm:'точки максимума',
	tm:'точками максимума',
	pm:'точках максимума',
	rod:1,
	odu:0,
};
lx['тяжелая атлетика']={
	ie:'тяжелая атлетика',
	re:'тяжелой атлетики',
	de:'тяжелой атлетике',
	ve:'тяжелую атлетику',
	te:'тяжелой атлетикой',
	pe:'тяжелой атлетике',
	im:'тяжелые атлетики',
	rm:'тяжелых атлетик',
	dm:'тяжелым атлетикам',
	vm:'тяжелые атлетики',
	tm:'тяжелыми атлетиками',
	pm:'тяжелых атлетиках',
	rod:1,
	odu:0,
};
lx['упаковка сока']={
	ie:'упаковка сока',
	re:'упаковки сока',
	de:'упаковке сока',
	ve:'упаковку сока',
	te:'упаковкой сока',
	pe:'упаковке сока',
	im:'упаковки сока',
	rm:'упаковок сока',
	dm:'упаковкам сока',
	vm:'упаковки сока',
	tm:'упаковками сока',
	pm:'упаковках сока',
	rod:1,
	odu:0,
};
lx['флакон шампуня']={
	ie:'флакон шампуня',
	re:'флакона шампуня',
	de:'флакону шампуня',
	ve:'флакон шампуня',
	te:'флаконом шампуня',
	pe:'флаконе шампуня',
	im:'флаконы шампуня',
	rm:'флаконов шампуня',
	dm:'флаконам шампуня',
	vm:'флаконы шампуня',
	tm:'флаконами шампуня',
	pm:'флаконах шампуня',
	rod:0,
	odu:0,
};
lx['фунт стерлингов']={
	ie:'фунт стерлингов',
	re:'фунта стерлингов',
	de:'фунту стерлингов',
	ve:'фунт стерлингов',
	te:'фунтом стерлингов',
	pe:'фунте стерлингов',
	im:'фунты стерлингов',
	rm:'фунтов стерлингов',
	dm:'фунтам стерлингов',
	vm:'фунты стерлингов',
	tm:'фунтами стерлингов',
	pm:'фунтах стерлингов',
	rod:0,
	skl:2,
	odu:0,
};
lx['цветочный горшок']={
	ie:'цветочный горшок',
	re:'цветочного горшка',
	de:'цветочному горшку',
	ve:'цветочный горшок',
	te:'цветочным горшком',
	pe:'цветочном горшке',
	im:'цветочные горшки',
	rm:'цветочных горшков',
	dm:'цветочным горшкам',
	vm:'цветочные горшки',
	tm:'цветочными горшками',
	pm:'цветочных горшках',
	rod:0,
	skl:2,
	odu:0,
};
//}}Словосочетания с главным словом - существительным

'use strict';
////////////////////////////////////////////////////////////////////////
var lxskl=[];	//Объявляем глобальный объект lxskl - типичные окончания
////////////////////////////////////////////////////////////////////////
var lxpad={ie:1,re:1,de:1,ve:1,te:1,pe:1,im:1,rm:1,dm:1,vm:1,tm:1,pm:1,};

//Пустой шаблон

lxskl['']={
	ie:'',
	re:'',
	de:'',
	ve:'',
	te:'',
	pe:'',
	im:'',
	rm:'',
	dm:'',
	vm:'',
	tm:'',
	pm:'',
	rod:0,
	skl:2,
	odu:0,
};
//Первое склонение. Род считаем женским, если что, ставим вручную.
{
lxskl['я']={
	ie:'я',
	re:'и',
	de:'е',
	ve:'ю',
	te:'ей',
	pe:'е',
	im:'и',
	rm:'',
	dm:'ям',
	vm:'и',
	tm:'ями',
	pm:'ях',
	rod:1,
	skl:1,
	odu:0,
};
lxskl['а']={
	ie:'а',
	re:'ы',
	de:'е',
	ve:'у',
	te:'ой',
	pe:'е',
	im:'ы',
	rm:'',
	dm:'ам',
	vm:'ы',
	tm:'ами',
	pm:'ах',
	rod:1,
	skl:1,
	odu:0,
};
['ж','ш','ч','щ','к','х','г'].map(function(a){
	lxskl[a+'а']={
		ie:a+'а',
		re:a+'и',
		de:a+'е',
		ve:a+'у',
		te:a+'ой',
		pe:a+'е',
		im:a+'и',
		rm:a+'',
		dm:a+'ам',
		vm:a+'и',
		tm:a+'ами',
		pm:a+'ах',
		rod:1,
		skl:1,
		odu:0,
	}; 
});
['ж','ш','ч'].map(function(a){
	lxskl[a+'ка']={
		ie:a+'ка',
		re:a+'ки',
		de:a+'ке',
		ve:a+'ку',
		te:a+'кой',
		pe:a+'ке',
		im:a+'ки',
		rm:a+'ек',
		dm:a+'кам',
		vm:a+'ки',
		tm:a+'ками',
		pm:a+'ках',
		rod:1,
		skl:1,
		odu:0,
	}; 	
});
['б','в','д','з','л','м','н','п','р','с','т'].map(function(a){
	lxskl[a+'ка']={
		ie:a+'ка',
		re:a+'ки',
		de:a+'ке',
		ve:a+'ку',
		te:a+'кой',
		pe:a+'ке',
		im:a+'ки',
		rm:a+'ок',
		dm:a+'кам',
		vm:a+'ки',
		tm:a+'ками',
		pm:a+'ках',
		rod:1,
		skl:1,
		odu:0,
	}; 	
});
lxskl['ия']={
	ie:'ия',
	re:'ии',
	de:'ии',
	ve:'ию',
	te:'ией',
	pe:'ии',
	im:'ии',
	rm:'ий',
	dm:'иям',
	vm:'ии',
	tm:'иями',
	pm:'иях',
	rod:1,
	skl:1,
	odu:0,
};
}
//Второе склонение, средний род
lxskl['ие']={
	ie:'ие',
	re:'ия',
	de:'ию',
	ve:'ие',
	te:'ием',
	pe:'ии',
	im:'ия',
	rm:'ий',
	dm:'иям',
	vm:'ия',
	tm:'иями',
	pm:'иях',
	rod:2,
	skl:2,
	odu:0,
};
['ё','е'].map(function(a){
	lxskl[a]={
		ie:a,
		re:'я',
		de:'ю',
		ve:a,
		te:'ем',
		pe:'е',
		im:'я',
		rm:'ей',
		dm:'ям',
		vm:'я',
		tm:'ями',
		pm:'ях',
		rod:2,
		skl:2,
		odu:0,
	};
});

lxskl['о']={
	ie:'о',
	re:'а',
	de:'у',
	ve:'о',
	te:'ом',
	pe:'е',
	im:'а',
	rm:'',
	dm:'ам',
	vm:'а',
	tm:'ами',
	pm:'ах',
	rod:2,
	skl:2,
	odu:0,
};
//Второе склонение, мужской род
lxskl['ий']={
	ie:'ий',
	re:'ия',
	de:'ию',
	ve:'ий',
	te:'ием',
	pe:'ии',
	im:'ии',
	rm:'иев',
	dm:'иям',
	vm:'ии',
	tm:'иями',
	pm:'иях',
	rod:0,
	skl:2,
	odu:0,
};
lxskl['ь']={
	ie:'ь',
	re:'я',
	de:'ю',
	ve:'ь',
	te:'ем',
	pe:'е',
	im:'и',
	rm:'ей',
	dm:'ям',
	vm:'и',
	tm:'ями',
	pm:'ях',
	rod:0,
	skl:2,
	odu:0,
}; 
lxskl['й']={
	ie:'й',
	re:'я',
	de:'ю',
	ve:'й',
	te:'ем',
	pe:'е',
	im:'и',
	rm:'ев',
	dm:'ям',
	vm:'и',
	tm:'ями',
	pm:'ях',
	rod:0,
	skl:2,
	odu:0,
};
['б','в','д','з','л','м','н','п','р','с','т','ф','ц'].map(function(a){
	lxskl[a]={
		ie:a,
		re:a+'а',
		de:a+'у',
		ve:a,
		te:a+'ом',
		pe:a+'е',
		im:a+'ы',
		rm:a+'ов',
		dm:a+'ам',
		vm:a+'ы',
		tm:a+'ами',
		pm:a+'ах',
		rod:0,
		skl:2,
		odu:0,
	}; 	
});
['ж','ш','ч','щ','к','х','г'].map(function(a){
	lxskl[a]={
		ie:a,
		re:a+'а',
		de:a+'у',
		ve:a,
		te:a+'ом',
		pe:a+'е',
		im:a+'и',
		rm:a+'ей',
		dm:a+'ам',
		vm:a+'и',
		tm:a+'ами',
		pm:a+'ах',
		rod:0,
		skl:2,
		odu:0,
	}; 
});
lxskl['к'].rm='ков';
lxskl['г'].rm='гов';
lxskl['х'].rm='хов';

['ё','е','о'].map(function(a){
	lxskl[a+'к']={
		ie:a+'к',
		re:'ка',
		de:'ку',
		ve:a+'к',
		te:'ком',
		pe:'ке',
		im:'ки',
		rm:'ков',
		dm:'кам',
		vm:'ки',
		tm:'ками',
		pm:'ках',
		rod:0,
		skl:2,
		odu:0,
	};
});
//Костыли
lxskl['0']={
	ie:'',
	re:'',
	de:'',
	ve:'',
	te:'',
	pe:'',
	im:'',
	rm:'',
	dm:'',
	vm:'',
	tm:'',
	pm:'',
	rod:0,
	skl:0,
	odu:0,
};
lxskl['мя']={
	ie:'мя',
	re:'мени',
	de:'мени',
	ve:'мя',
	te:'менем',
	pe:'мени',
	im:'мена',
	rm:'мён',
	dm:'менам',
	vm:'мена',
	tm:'менами',
	pm:'менах',
	rod:0,
	skl:4,
	odu:0,
};
//И отдельный набор костылей для третьего склонения
lxskl['ь3']={
	ie:'ь',
	re:'и',
	de:'и',
	ve:'ь',
	te:'ью',
	pe:'и',
	im:'и',
	rm:'ей',
	dm:'ям',
	vm:'и',
	tm:'ями',
	pm:'ях',
	rod:1,
	skl:3,
	odu:0,
};
['ж','ш','ч','щ'].map(function(a){
	lxskl[a+'ь']={
		ie:a+'ь',
		re:a+'и',
		de:a+'и',
		ve:a+'ь',
		te:a+'ью',
		pe:a+'и',
		im:a+'и',
		rm:a+'ей',
		dm:a+'ям',
		vm:a+'и',
		tm:a+'ями',
		pm:a+'ях',
		rod:1,
		skl:3,
		odu:0,
	};
});
//Несклоняемые
['у','ю','э'].map(function(a){
	lxskl[a]={
		ie:a,
		re:a,
		de:a,
		ve:a,
		te:a,
		pe:a,
		im:a,
		rm:a,
		dm:a,
		vm:a,
		tm:a,
		pm:a,
		rod:1,
		skl:1,
		odu:0,
	}; 	
});

//Субстантивированные - по мере необходмости
lxskl['ый']={
	ie:'ый',
	re:'ого',
	de:'ому',
	ve:'ого',
	te:'ым',
	pe:'ом',
	im:'ые',
	rm:'ых',
	dm:'ым',
	vm:'ых',
	tm:'ыми',
	pm:'ых',
	rod:0,
	skl:5,
	odu:1,
};
lxskl['ыйся']={
	ie:'ыйся',
	re:'огося',
	de:'омуся',
	ve:'огося',
	te:'ымся',
	pe:'омся',
	im:'ыеся',
	rm:'ыхся',
	dm:'ымся',
	vm:'ыхся',
	tm:'ымися',
	pm:'ыхся',
	rod:0,
	skl:5,
	odu:1,
};
lxskl['ийся']={
	ie:'ийся',
	re:'егося',
	de:'емуся',
	ve:'егося',
	te:'имся',
	pe:'емся',
	im:'иеся',
	rm:'ихся',
	dm:'имся',
	vm:'ихся',
	tm:'имися',
	pm:'ихся',
	rod:0,
	skl:5,
	odu:1,
};
'use strict';
lx['один']={
	chr:2,
	i:'один',
	r:'одного',
	d:'одному',
	v:'один',
	t:'одним',
	p:'одном',
};
lx['одна']={
	chr:2,
	i:'одна',
	r:'одной',
	d:'одной',
	v:'одну',
	t:'одной',
	p:'одной',
};
lx['одно']={
	chr:2,
	i:'одно',
	r:'одного',
	d:'одному',
	v:'одно',
	t:'одним',
	p:'одном',
};
lx['одни']={
	chr:2,
	i:'одни',
	r:'одних',
	d:'одним',
	v:'одни',
	t:'одними',
	p:'одних',
};
lx['две']={
	chr:2,
	i:'две',
	r:'двух',
	d:'двум',
	v:'две',
	t:'двумя',
	p:'двух',
};
lx['два']={
	chr:2,
	i:'два',
	r:'двух',
	d:'двум',
	v:'два',
	t:'двумя',
	p:'двух',
};
lx['три']={
	chr:2,
	i:'три',
	r:'трёх',
	d:'трём',
	v:'три',
	t:'тремя',
	p:'трех',
};
lx['четыре']={
	chr:2,
	i:'четыре',
	r:'четырёх',
	d:'четырём',
	v:'четыре',
	t:'четырьмя',
	p:'четырёх',
};
lx['пять']={
	chr:2,
	i:'пять',
	r:'пяти',
	d:'пяти',
	v:'пять',
	t:'пятью',
	p:'пяти',
};
lx['шесть']={
	chr:2,
	i:'шесть',
	r:'шести',
	d:'шести',
	v:'шесть',
	t:'шестью',
	p:'шести',
};
lx['семь']={
	chr:2,
	i:'семь',
	r:'семи',
	d:'семи',
	v:'семь',
	t:'семью',
	p:'семи',
};
lx['восемь']={
	chr:2,
	i:'восемь',
	r:'восьми',
	d:'восьми',
	v:'восемь',
	t:'восемью',
	p:'восьми',
};
lx['девять']={
	chr:2,
	i:'девять',
	r:'девяти',
	d:'девяти',
	v:'девять',
	t:'девятью',
	p:'девяти',
};
lx['десять']={
	chr:2,
	i:'десять',
	r:'десяти',
	d:'десяти',
	v:'десять',
	t:'десятью',
	p:'десяти',
};
lx['одиннадцать']={
	chr:2,
	i:'одиннадцать',
	r:'одиннадцати',
	d:'одиннадцати',
	v:'одиннадцать',
	t:'одиннадцатью',
	p:'одиннадцати',
};
lx['двенадцать']={
	chr:2,
	i:'двенадцать',
	r:'двенадцати',
	d:'двенадцати',
	v:'двенадцать',
	t:'двенадцатью',
	p:'двенадцати',
};
lx['тринадцать']={
	chr:2,
	i:'тринадцать',
	r:'тринадцати',
	d:'тринадцати',
	v:'тринадцать',
	t:'тринадцатью',
	p:'тринадцати',
};
lx['четырнадцать']={
	chr:2,
	i:'четырнадцать',
	r:'четырнадцати',
	d:'четырнадцати',
	v:'четырнадцать',
	t:'четырнадцатью',
	p:'четырнадцати',
};
lx['пятнадцать']={
	chr:2,
	i:'пятнадцать',
	r:'пятнадцати',
	d:'пятнадцати',
	v:'пятнадцать',
	t:'пятнадцатью',
	p:'пятнадцати',
};
lx['шестнадцать']={
	chr:2,
	i:'шестнадцать',
	r:'шестнадцати',
	d:'шестнадцати',
	v:'шестнадцать',
	t:'шестнадцатью',
	p:'шестнадцати',
};
lx['семнадцать']={
	chr:2,
	i:'семнадцать',
	r:'семнадцати',
	d:'семнадцати',
	v:'семнадцать',
	t:'семнадцатью',
	p:'семнадцати',
};
lx['восемнадцать']={
	chr:2,
	i:'восемнадцать',
	r:'восемнадцати',
	d:'восемнадцати',
	v:'восемнадцать',
	t:'восемнадцатью',
	p:'восемнадцати',
};
lx['девятнадцать']={
	chr:2,
	i:'девятнадцать',
	r:'девятнадцати',
	d:'девятнадцати',
	v:'девятнадцать',
	t:'девятнадцатью',
	p:'девятнадцати',
};
lx['двадцать']={
	chr:2,
	i:'двадцать',
	r:'двадцати',
	d:'двадцати',
	v:'двадцать',
	t:'двадцатью',
	p:'двадцати',
};
lx['тридцать']={
	chr:2,
	i:'тридцать',
	r:'тридцати',
	d:'тридцати',
	v:'тридцать',
	t:'тридцатью',
	p:'тридцати',
};
lx['сорок']={
	chr:2,
	i:'сорок',
	r:'сорока',
	d:'сорока',
	v:'сорок',
	t:'сорока',
	p:'сорока',
};
lx['пятьдесят']={
	chr:2,
	i:'пятьдесят',
	r:'пятидесяти',
	d:'пятидесяти',
	v:'пятьдесят',
	t:'пятьюдесятью',
	p:'пятидесяти',
};
lx['шестьдесят']={
	chr:2,
	i:'шестьдесят',
	r:'шестидесяти',
	d:'шестидесяти',
	v:'шестьдесят',
	t:'шестьюдесятью',
	p:'шестидесяти',
};
lx['семьдесят']={
	chr:2,
	i:'семьдесят',
	r:'семидесяти',
	d:'семидесяти',
	v:'семьдесят',
	t:'семьюдесятью',
	p:'семидесяти',
};
lx['восемьдесят']={
	chr:2,
	i:'восемьдесят',
	r:'восьмидесяти',
	d:'восьмидесяти',
	v:'восемьдесят',
	t:'восемьюдесятью',
	p:'восьмидесяти',
};
lx['девяносто']={
	chr:2,
	i:'девяносто',
	r:'девяноста',
	d:'девяноста',
	v:'девяносто',
	t:'девяноста',
	p:'девяноста',
};
lx['сто']={
	chr:2,
	i:'сто',
	r:'ста',
	d:'ста',
	v:'сто',
	t:'ста',
	p:'ста',
};
lx['двести']={
	chr:2,
	i:'двести',
	r:'двухсот',
	d:'двумстам',
	v:'двести',
	t:'двумястами',
	p:'двухстах',
};
lx['триста']={
	chr:2,
	i:'триста',
	r:'трёхсот',
	d:'трёмстам',
	v:'триста',
	t:'тремястами',
	p:'трёхстах',
};
lx['четыреста']={
	chr:2,
	i:'четыреста',
	r:'четырёхсот',
	d:'четырёмстам',
	v:'четыреста',
	t:'четырьмястами',
	p:'четырёхстах',
};
lx['пятьсот']={
	chr:2,
	i:'пятьсот',
	r:'пятисот',
	d:'пятистам',
	v:'пятьсот',
	t:'пятьюстами',
	p:'пятистах',
};
lx['шестьсот']={
	chr:2,
	i:'шестьсот',
	r:'шестисот',
	d:'шестистам',
	v:'шестьсот',
	t:'шестьюстами',
	p:'шестистах',
};
lx['семьсот']={
	chr:2,
	i:'семьсот',
	r:'семисот',
	d:'семистам',
	v:'семисот',
	t:'семьюстами',
	p:'семистах',
};
lx['восемьсот']={
	chr:2,
	i:'восемьсот',
	r:'восьмисот',
	d:'восьмистам',
	v:'восемьсот',
	t:'восемьюстами',
	p:'восьмистах',
};
lx['девятьсот']={
	chr:2,
	i:'девятьсот',
	r:'девятисот',
	d:'девятистам',
	v:'девятьсот',
	t:'девятьюстами',
	p:'девятистах',
};
lx['тысяча']={
	chr:2,
	i:'тысяча',
	r:'тысячи',
	d:'тысяче',
	v:'тысячу',
	t:'тысячей',
	p:'тысяче',
};
lx['тысячи']={
	chr:2,
	i:'тысячи',
	r:'тысяч',
	d:'тысячам',
	v:'тысячи',
	t:'тысячами',
	p:'тысячах',
};
lx['миллион']={
	chr:2,
	i:'миллион',
	r:'миллиона',
	d:'миллиону',
	v:'миллион',
	t:'миллионом',
	p:'миллионе',
};
lx['миллионы']={
	chr:2,
	i:'миллионы',
	r:'миллионов',
	d:'миллионам',
	v:'миллионы',
	t:'миллионами',
	p:'миллионах',
};
lx['миллиард']={
	chr:2,
	i:'миллиард',
	r:'миллиарда',
	d:'миллиарду',
	v:'миллиард',
	t:'миллиардом',
	p:'миллиарде',
};
lx['миллиарды']={
	chr:2,
	i:'миллиарды',
	r:'миллиардов',
	d:'миллиардам',
	v:'миллиарды',
	t:'миллиардами',
	p:'миллиардах',
};
lx['двое']={
	chr:2,
	i:'двое',
	r:'двоих',
	d:'двоим',
	v:'двое',
	t:'двоими',
	p:'двоих',
};
lx['трое']={
	chr:2,
	i:'трое',
	r:'троих',
	d:'троим',
	v:'трое',
	t:'троими',
	p:'троих',
};
lx['четверо']={
	chr:2,
	i:'четверо',
	r:'четверых',
	d:'четверым',
	v:'четверо',
	t:'четверыми',
	p:'четверых',
};
lx['пятеро']={
	chr:2,
	i:'пятеро',
	r:'пятерых',
	d:'пятерым',
	v:'пятеро',
	t:'пятерыми',
	p:'пятерых',
}; 
lx['шестеро']={
	chr:2,
	i:'шестеро',
	r:'шестерых',
	d:'шестерым',
	v:'шестеро',
	t:'шестерыми',
	p:'шестерых',
};
lx['семеро']={
	chr:2,
	i:'семеро',
	r:'семерых',
	d:'семерым',
	v:'семеро',
	t:'семерыми',
	p:'семерых',
};
lx['восьмеро']={
	chr:2,
	i:'восьмеро',
	r:'восьмерых',
	d:'восьмерым',
	v:'восьмеро',
	t:'восьмерыми',
	p:'восьмерых',
};
lx['девятеро']={
	chr:2,
	i:'девятеро',
	r:'девятерых',
	d:'девятерым',
	v:'девятеро',
	t:'девятерыми',
	p:'девятерых',
};
lx['десятеро']={
	chr:2,
	i:'десятеро',
	r:'десятерых',
	d:'десятерым',
	v:'десятеро',
	t:'десятерыми',
	p:'десятерых',
};
//http://pastebin.com/Dpv8pQWW - Любовь Ерышова
//http://pastebin.com/jJ8CWxd0 - Екатерина Трегубова
//+Николай Авдеев
'use strict';

function autosklon(slovo,p1){
	if(slovo.isArray){
		for(var lensl=slovo.length-1;lensl>=0;lensl--)
			autosklon(slovo[lensl],p1);
		return;
	}
	if(lx[slovo])
		return console.log('Такое слово уже есть в словаре.');
	var rez=setlx(slovo);
	if(p1!=undefined)
		slovo+=p1;
	var sl=slovo;
	for(;sl.length && !lx[sl] && !lxskl[sl]; sl=sl.udalPerv()){};
	var lxparent=lx[sl]?lx[sl]:lxskl[sl];
	var osnova=slovo.udalPosl(sl.length);
	for(var padezh in lxpad)
		rez+=logparam(padezh,osnova+lxparent[padezh]);
	rez+=logparam('rod',lxparent.rod);
	rez+=logparam('skl',lxparent.skl);
	rez+=logparam('odu',lxparent.odu);
	rez+='};\n'
	console.log(rez);//Это НЕ ОТЛАДКА!!!
}

var lxkand=[];

function sklonlxkand(slovo,p1,al){
	if(slovo.ie)
		return sklonlxkand(slovo.ie,p1,al);
	if(lx[slovo]){
		if(al)
			alert('Такое слово уже есть в словаре.');
		return lx[slovo];
	}
	lxkand[slovo]={};
	if(p1!=undefined)
		slovo+=p1;
	var sl=slovo;
	for(;sl.length && !lx[sl] && !lxskl[sl]; sl=sl.udalPerv()){};
	var lxparent=lx[sl]?lx[sl]:lxskl[sl];
	var osnova=slovo.udalPosl(sl.length);
	lxkand[slovo]=lxparent.clone();
	for(var padezh in lxpad)
		lxkand[slovo][padezh]=osnova+lxparent[padezh];
	lxkand[slovo].chr=1;
	return lxkand[slovo];
}

var lxdop={
	rod:1,
	skl:1,
	odu:1,
	sbs:1,
	sl:1,
	sr:1,
	pr:1,
	chr:1,
};

function strlxkand(slovo,p1,al){
	var rez=setlx(slovo);
	var sl;
	if(!lxkand[slovo])
		sl=sklonlxkand(slovo,p1,al).clone();
	else
		sl=lxkand[slovo].clone();
	for(var pad in lxpad){
		rez+=logparam(pad,sl[pad]);
		sl[pad]=undefined;
	}
	for(var pad in lxdop){
		rez+=logparam(pad,sl[pad]);
		sl[pad]=undefined;
	}
	for(var pad in sl)
		rez+=logparam(pad,sl[pad]);
	rez+='};\n';
	return rez;
}

function loglxkand(slovo,p1){
	console.log(strlxkand(slovo,p1,1));
}

function setlx(p1){
	return('\nlx[\''+p1+'\']={\n');
}

function logparam(p1,p2){
	return p2!=undefined? 
		p2.isString?
			('\t'+p1+':\''+p2+'\',\n'):
			('\t'+p1+':'+p2+',\n')
		:'';
}

function logsklon(a){
	if(slovo.isArray){
		for(var lensl=slovo.length-1;lensl>=0;lensl--)
			logsklon(slovo[lensl],p1);
		return;
	}
	console.log(sklon(a))
}

function sklon(a){
	setlx(a);
	var osn;//"Основа" слова. Выбирается так, чтобы было удобно.
	var rez='';//То, что отправим в результат. Например, в консоль.
	rez+=setlx(a);
	if(a.posl()=='а'){
		osn=a.udalPosl();
		rez+=logparam('ie',a);
		rez+=logparam('re',osn+'ы');
		rez+=logparam('de',osn+'е');
		rez+=logparam('ve',osn+'у');
		rez+=logparam('te',osn+'ой');
		rez+=logparam('pe',osn+'е');
		rez+=logparam('im',osn+'ы');
		rez+=logparam('rm',osn);
		rez+=logparam('dm',osn+'ам');
		rez+=logparam('vm',osn+'ы');
		rez+=logparam('tm',osn+'ами');
		rez+=logparam('pm',osn+'ах');
		rez+=logparam('rod',1);
		rez+=logparam('skl',1);
		rez+=logparam('odu',0);
	}else
	if(a.posl()=='ь'){
		osn=a.udalPosl();
		rez+=logparam('ie',a);
		rez+=logparam('re',osn+'я');
		rez+=logparam('de',osn+'ю');
		rez+=logparam('ve',a);
		rez+=logparam('te',osn+'ем');
		rez+=logparam('pe',osn+'е');
		rez+=logparam('im',osn+'и');
		rez+=logparam('rm',osn+'ей');
		rez+=logparam('dm',osn+'ям');
		rez+=logparam('vm',osn+'и');
		rez+=logparam('tm',osn+'ями');
		rez+=logparam('pm',osn+'ях');
		rez+=logparam('rod',0);
		rez+=logparam('skl',2);
		rez+=logparam('odu',0);
	}else
	{
		osn=a;
		rez+=logparam('ie',a);
		rez+=logparam('re',osn+'а');
		rez+=logparam('de',osn+'у');
		rez+=logparam('ve',a);
		rez+=logparam('te',osn+'ом');
		rez+=logparam('pe',osn+'е');
		rez+=logparam('im',osn+'ы');
		rez+=logparam('rm',osn+'ов');
		rez+=logparam('dm',osn+'ам');
		rez+=logparam('vm',osn+'ы');
		rez+=logparam('tm',osn+'ами');
		rez+=logparam('pm',osn+'ах');
		rez+=logparam('rod',0);
		rez+=logparam('skl',2);
		rez+=logparam('odu',0);
	}
	rez+='};\n'
	return rez;
}
'use strict';

function Complex(re,im){
	this.re=+re?+re:0;
	this.im=+im?+im:0;
	this.isComplex=1;
	this.toString=function(){
	/**Представляет число в виде a+bi*/
		var rez;
		if(!this.re && !this.im)
			rez='0';
		else if( this.re && !this.im)
			rez=''+this.re;
		else if(!this.re &&  this.im)
			rez=''+this.im+'i';
		else if( this.re &&  this.im)
			rez= ''+this.re+'+'+this.im+'i';
		return rez.plusminus();
	}
	this.ts=function(){
		return this.toString().ts();
	}

	this.minus=function(){
	/**Противоположное число: -a-bi*/
		return new Complex( -(this.re), - (this.im));
	}

	this.sopr=function(){
	/**Сопряжёное число: a-bi*/
		return new Complex(this.re, - (this.im));
	}

	this.abs=
	this.norma=function(){
	/**Норма (модуль, абсолютное значение) комплексного числа*/
		return (this.re.sqr()+this.im.sqr()).sqrt();
	}

	this.obrat=function(){
	/**Обратное число: a-bi*/
		var n=this.norma().sqr();
		return new Complex(this.re/n, - (this.im)/n);
	}
	
	this.sum=function(){
	/**Прибавить к комплексному числу комплексные или действительные*/
		var rez=this.clone();
//		arguments[0].isComplex?arguments[0].clone():new Complex(arguments[0]);
		for(var i=arguments.length-1;i>=0;i--){
			var operand=arguments[i];
			if(operand.isNumber){
				rez.re+=operand;
			}else{
				if(operand.re){
					rez.re+=operand.re;
				}
				if(operand.im){
					rez.im+=operand.im;
				}
			}
		}
		return rez;
	}

	this.umn=function(){
	/**Умножить комплексное число на комплексные или действительные*/
		var rez=this.clone();
		for(var i=arguments.length-1;i>=0;i--){
			var operand=arguments[i];
			if(operand.isNumber){
				if(operand===0){
					return new Complex();
				}
				rez.re*=operand;
				rez.im*=operand;
			}else{
				if(!operand.re && !operand.im){
					//Нуль
					return new Complex();
				}else{
					var r=rez.re,
						m=rez.im;
					rez.re=r*operand.re-m*operand.im;
					rez.im=r*operand.im+m*operand.re;
				} 
			}
		}
		return rez;
	}
}
//Синонимы функций: сокращение, транслит, антитранслит и тому подобное

//Для func.js
var sl=sluchch;

//Для прототипных
String.prototype.ts=String.prototype.toStandart;
'use strict';
/*Функции, использующие jquery и другие внешние библиотеки*/

function allCanvasToBackgroundImage(){
	$('canvas').each(function(){
		if(!this.style.backgroundImage)
			this.style.backgroundImage='url('+this.toDataURL()+')';
//		this.width=this.width;
	});
}

function spoiler(){
	$('.spoiler-body').hide();
	$('.spoiler-hide').hide();
	$('.spoiler-show').click(function(){
		$(this).next().toggle();
		$(this).next().next().slideToggle();
		$(this).hide();
	});
	$('.spoiler-hide').click(function(){
		$(this).next().slideToggle();
		$(this).prev().toggle();
		$(this).hide();
	});
}

function allLinksToBlankTarget(){
	$('a').each(function(){
		this.dataOldTarget=this.target;
		this.target="_blank";
	});
}

function restoreLinksTarget(){
	$('a').each(function(){
		this.target=this.dataOldTarget;
	});
}

function innerHTMLtoImg(elem){
	html2canvas(elem, {
		onrendered: function(canvas) {
			var img=document.createElement('img');
			img.src=canvas.toDataURL();
			img.width=canvas.width;
			img.height=canvas.height;
			elem.innerHTML='';
			elem.appendChild(img);
		}
	});
}

function replaceWithImg(elem){
	html2canvas(elem, {
		onrendered: function(canvas) {
			var img=document.createElement('img');
			img.src=canvas.toDataURL();
			img.width=canvas.width;
			img.height=canvas.height;
			$(elem).replaceWith(img);
		}
	});
}

function allLinksToSpans(){
	$('a').each(function(){
		if(this.target=="_blank"){
			$(this).replaceWith('<span class="spanlink" onclick="linkSpan(\''+
				this.href.replace(/\/\/|https*:\/\//,'_')+'\',1);">'+this.innerHTML+'</span>');
		}else{
			$(this).replaceWith('<span class="spanlink" onclick="linkSpan(\''+
				this.href.replace(/\/\/|https*:\/\//,'_')+'\');">'+this.innerHTML+'</span>');
		}
	});
}
'use strict';

var umka;

function zagrUmka(){
	umka=$.jStorage.get('umka'+nabor.name);
	if(!umka)
		pustUmka();
	if(!umka.vremya)
		umka.vremya=[];
	if(!umka.kvoNaVremya)
		umka.kvoNaVremya=[];
	for(var i=1;i<=nabor.nZad;i++){
		if(!umka.verno[i])
			umka.verno[i]=0;
		if(!umka.vsego[i])
			umka.vsego[i]=0;
		if(!umka.vremya[i])
			umka.vremya[i]=0;
		if(!umka.kvoNaVremya[i])
			umka.kvoNaVremya[i]=0;
	}
}

function pustUmka(){
	umka={
		verno:[].zapslch(0,nabor.nZad,0,0,0),
		vsego:[].zapslch(0,nabor.nZad,0,0,0),
		vremya:[].zapslch(0,nabor.nZad,0,0,0),
		kvoNaVremya:[].zapslch(0,nabor.nZad,0,0,0),
	}
}

function sbrosUmka(a){
	if(confirm('Вы действительно хотите сбросить статистику? Это действие нельзя отменить.')){
		pustUmka();
		sohrUmka();
		if(a && a.isFunction)
			a();
	}
}

function sohrUmka(){
	$.jStorage.set('umka'+nabor.name,umka);
}

console.log('umka.js отработал');
'use strict';

window.vopr={};

window.vopr.vrn_ist=function(kand){
	for(var i2=0;i2<this.ver.length;i2++){
		this.ver[i2]=this.ver[i2].istDataToStd();
		if(this.ver[i2]==kand.istDataToStd())
			return 1;
	}
	return 0;
};

window.vopr.vrn_mat=function(kand){
	for(var i2=0;i2<this.ver.length;i2++)
		if(this.ver[i2].ts()==kand.ts())
			return 1;
	return 0;
};

window.vopr.podg=function(){
	window.vopr.dey=function(){};
	window.vopr.ver=[];
	window.vopr.nev=[];
	window.vopr.txt='';
	window.vopr.rsh='';
	window.vopr.kat=[];
	window.vopr.dgn=1;
	window.vopr.err=0;
	window.vopr.vrn=window.vopr.vrn_mat;
}
window.vopr.podg();

window.vopr.trd=function(){'use strict';
	try{
		window.vopr.dey();
	}catch(e){}
}

function AtoB(n){
//n - количество неверных ответов
	n=n?n:3;
	if(window.vopr.nev.hasDubl()){
		window.vopr.nev=window.vopr.nev.sortDelDubl();
		console.log('AtoB(): nev: повторяющиеся варианты;');
	}
	if(window.vopr.ver.hasDubl()){
		window.vopr.ver=window.vopr.ver.sortDelDubl();
		console.log('AtoB(): ver: повторяющиеся варианты;');
	}
	if(vopr.dgn && dvig.dgn && dvig.validateVopr()){
		vopr.err=1;
		return;
	}
	var nev=window.vopr.nev.iz(n);
	var ver=window.vopr.ver.iz();
	var a=[[ver].concat(nev),[].N(n+1)].T().shuffle().T();
	window.vopr.ver=[a[1].pervSovp(1)+1];
	window.vopr.nev=[];
	for(var i=0;i<=n;i++){
		window.vopr.txt+='<br/>'+(i+1)+') '+a[0][i];
	}
}
console.log('core_vopr.js отработал');
'use strict';

function readNabor(str){
//Строка вида favorgems.ru/sh/sluch.html#nabor&nZad=14&adres=..zdn/mat/
	var a=str.split('#nabor')[1];
	strNabor='##nabor'+a;
	if(a==undefined)
		return;
	var b=a.split('&');
	b.splice(0,1);//Первый элемент - пустой
	b.map(function(p1){
		var c=p1.split('=');
		nabor[c[0]]=c[1];
	});
}

var strNabor='';
var nabor={}; // Глобальная переменная, отвечающая за выбор предмета
nabor.zagol='';
nabor.mnogostrOtvet=0;
nabor.importFrom({
	nZad:14,
	adres:'../zdn/matege2015p/',
	name:'matege2015p',
	prefix:'',
});
nabor.kat={
	prz:'Без производной'		,
	log:'Без логарифмов'		,
	tri:'Без тригонометрии'		,
	drs:'Без дробных степеней'	,
};

nabor.vykl=[];
nabor.altz=[];

readNabor(document.location.href);

console.log('core_nabor.js отработал');
'use strict';
//{{Движок
var dvig={};
dvig.ping=svinta?100:500;
dvig.startxt='1';
dvig.flObn=0;
dvig.dgn=1;

dvig.validateVopr=function(){
	var rez='';
	for(var pole in vopr){
		var t=hasErrors(vopr[pole],vopr.kat.bdr);
		if(t)
			rez+=pole+" : "+t+'; ';
	}
	if(vopr.nev.hasElemStrict(''))
		rez+='nev: пустой вариант; ';
	if(vopr.ver.hasElemStrict(''))
		rez+='ver: пустой вариант; ';
	if(vopr.nev.hasDubl())
		rez+='nev: повторяющиеся варианты; ';
	var masOtv=vopr.ver.sortDelDubl().concat(vopr.nev.sortDelDubl());
	if(masOtv.hasDubl())
		rez+='варианты ответа, верные и не верные одновременно; ';
	
	return rez;
}

dvig.obnov=function(cb,kat,nom){'use strict';//cb - функция, вызываемая, когда вопрос успешно обновился
	if(dvig.flObn)
		return;
	if((window.vopr.txt!=0)&&(dvig.startxt!=window.vopr.txt)){
		dvig.startxt=window.vopr.txt;
		clearInterval(dvig.intervZapros);
		clearInterval(dvig.intervZadan);
		if(!sootvKat() || vopr.err){
			dvig.zadan(cb,kat);
			return;
		}
		var t=dvig.validateVopr();
		if(t){
			console.log(t+'\n\r');
			if(vopr.dgn && dvig.dgn){
				dvig.zadan(cb,kat);
				return;
			}
		}
		dvig.flObn=1;
		cb(window.vopr.clone());
	}else
		setTimeout('dvig.obnov('+cb+','+kat+','+nom+');',100);
}

dvig.zapros=function(cb,kat,nom){'use strict';
	if(dvig.flObn)
		return;
	if(kat === undefined)
		kat=kategory;
	if(nom === undefined)
		nom=nomer;
	window.vopr.dop.nomer=nom;
	try{
		console.log('Составляется задание '+nom+' категории '+kat);
		nabor.upak[dvig.getzadname(kat)][nom]();
		setTimeout('dvig.obnov('+cb+','+kat+','+nom+');',0);
	}catch(e){
		zagr(nabor.adres+dvig.getzadname(kat)+'/'+nomer+'.js');
		setTimeout('dvig.obnov('+cb+','+kat+','+nom+');',dvig.ping);
	clearInterval(dvig.intervZapros);
	dvig.intervZapros=setTimeout('dvig.zapros('+cb+','+kat+','+nomer+');',dvig.ping*4);
	}
}

dvig.zadan=function(cb,kat,nom,ekz){'use strict';
	dvig.flObn=0;
	dvig.startxt=window.vopr.txt;
	window.vopr.podg();
	window.vopr.dop={prefix:nabor.prefix,kategory:kat,nomer:nom,ekz:ekz,};
	if(nom !== undefined)
		return dvig.zapros(cb,kat,nom);
	try{
		nabor.upak[dvig.getzadname(kat)].main();
		dvig.zapros(cb,kat,nomer);
	}catch(e){
		zagr(nabor.adres+dvig.getzadname(kat)+'/main.js');
		setTimeout('dvig.zapros('+cb+','+kat+','+nomer+');',dvig.ping);
	clearInterval(dvig.intervZadan);
	dvig.intervZadan=setTimeout('dvig.zadan('+cb+','+kat+');',dvig.ping*8)
	}
}

dvig.getzadname=function(kat){
	return nabor.altz[kat]?nabor.altz[kat]:nabor.prefix+kat;
}

dvig.variativeABC=function(){
	var alph='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	var alph2=alph.slice().shuffle();
	vopr=mapRecursive(vopr,function(str){
		return (''+str).cepZamena(alph,alph2);
	});
}
//}}Движок

console.log('core_dvig.js отработал');
'use strict';
//Движок от В14

//a - объект с параметрами. Так сказать, питонический подход.
//slag - массив со слагаемыми в виде строк. Наверное, можно и числа, но лучше не надо.
//minx - точка минимума					//Если одно из них не указано, попросту не спрашиваем
//miny - значение в точке минимума		//
//maxx - точка максимума				//
//maxy - значение в точке максимума		//
//cnst - принудительно указать константу. Если 0 - то ясно, не упоминать.
//prnz - начало промежутка				//
//prkz - конец промежутка				//Если одного нет, то луч. Если обоих, то вся ОДЗ
//prnb - открытое начало промежутка				
//prkb - открытый конец промежутка				
//chet - чётная функция
//nech - нечётная функция

function fn_promezh(a){
	if(a.prnz)
		a.prnz=a.prnz.ts().plusminus();
	if(a.prkz)
		a.prkz=a.prkz.ts().plusminus();
	//Если границ промежутка нет, то это числовая прямая.
	if(a.prnz==undefined && a.prkz==undefined)
		return {
			nazv:'',
			text:'$(-\\infty;\\infty)$',
		}
	
	if(a.prnz==undefined && a.prkb)
		return{
			nazv:'открытый луч',
			text:'$(-\\infty;'+a.prkz.ts()+')$',
		}
	
	if(a.prkz==undefined && a.prnb)
		return{
			nazv:'открытый луч',
			text:'$('+a.prnz.ts()+';\\infty)$',
		}
	
	if(a.prnz==undefined)
		return{
			nazv:'луч',
			text:'$(-\\infty;'+a.prkz.ts()+']$',
		}
	
	if(a.prkz==undefined)
		return{
			nazv:'луч',
			text:'$['+a.prnz.ts()+';\\infty)$',
		}

	//Ага, обе границы есть
	
	if(a.prkb&&a.prnb)
		return{
			nazv:'интервал',
			text:'$('+a.prnz.ts()+';'+a.prkz.ts()+')$',
		}
	
	if(a.prkb)
		return{
			nazv:'полуинтервал',
			text:'$['+a.prnz.ts()+';'+a.prkz.ts()+')$',
		}
	
	if(a.prnb)
		return{
			nazv:'полуинтервал',
			text:'$('+a.prnz.ts()+';'+a.prkz.ts()+']$',
		}
	
	return{
		nazv:'отрезок',
		text:'$['+a.prnz.ts()+';'+a.prkz.ts()+']$',
	}
}

function fn_na(a){
	var b=fn_promezh(a);
	if(!b.nazv)
		return '';
	return ' на '+lx[b.nazv].pe+' '+b.text;
}

function fn_formul(a){
	var txt=[];
	var otv=[];
	if(a.minx!=undefined){
		txt.push('точка минимума');
		otv.push(a.minx);
	}
	if(a.maxx!=undefined){
		txt.push('точка максимума');
		otv.push(a.maxx);
	}
	if(a.miny!=undefined){
		txt.push('наименьшее значение');
		otv.push(a.miny);
	}
	if(a.maxy!=undefined){
		txt.push('наибольшее значение');
		otv.push(a.maxy);
	}
	var vpr=[txt,otv].T().iz();
	return {
		txt: (om.otvnaydite.iz().toZagl()+' '+lx[vpr[0]].ve+
			' функции $y = '+a.slag.slag()+'$'+fn_na(a)).plusminus(),
		ver: vpr[1].plusminus(),
	}
}

function fn_maxminxObmen(a){
	//Меняем местами минимум и максимум
	var buf=a.minx;
	a.minx=a.maxx;
	a.maxx=buf;
}

function fn_maxminxMinus(a){
	a.maxx=fn_minus(a.maxx);
	a.minx=fn_minus(a.minx);
}

function fn_promezhMinus(a){
	//Меняем местами границы интервала и дописываем минус
	var buf=a.prnz;
	a.prnz=fn_minus(a.prkz);
	a.prkz=fn_minus(buf);

	buf=a.prnb;
	a.prnb=a.prkb;
	a.prkb=buf;
}

function fn_maxminyMinusObmen(a){
	//Меняем местами наибольшее и наименьшее значения
	var buf=a.miny;
	a.miny=fn_minus(a.maxy);
	a.maxy=fn_minus(buf);
}

function fn_minus(b){
	if(b)
		return '-'+b.ts();
	return b;
}

function fn_plusminus(a){
	if(sl1()){
		//Меняем местами минимум и максимум
		fn_maxminxObmen(a);
		//Меняем местами наибольшее и наименьшее значения
		fn_maxminyMinusObmen(a);
		a.slag=a.slag.addPrefix('-');
	}
}

function fn_const(a){
	if( (a.cnst!=0) && (!a.maxy||a.maxy.isNumber) && (!a.miny||a.miny.isNumber) )	{
		if(a.cnst==undefined)
			a.cnst=sl(-99,99);
		if(a.cnst.isNumber){
			a.slag.push(a.cnst);
			if(a.maxy!=undefined)
				a.maxy+=a.cnst;
			if(a.miny!=undefined)
				a.miny+=a.cnst;
		}
	}
}

function fn_chet(a){
	if(sl1()){
		fn_maxminxMinus(a);
		fn_promezhMinus(a);
	}
}

function fn_nech(a){
	if(sl1()){
		fn_maxminxObmen(a);
		fn_maxminxMinus(a);
		fn_promezhMinus(a);
		fn_maxminyMinusObmen(a);
	}
}

function fn_zadan(a){
	a.NaNtoUndefined();
	if(a.nech)
		fn_nech(a);
	else if(a.chet)
		fn_chet(a);
	fn_const(a);
	fn_plusminus(a);
	return fn_formul(a);
}

//А это - неудачная, тупиковая ветка, но она таки используется

function fn_txt(nai,f,n,k,nb,kb){
	return (
		om.otvnaydite.iz().toZagl()+' '+nai+' функции $y = '+f+'$ на промежутке $'+(nb?'(':'[')+n+';'+k+(kb?')':']')+'$.'
	).plusminus();
}	

'use strict';
//Блок из функций, которые обеспечивают движок расчётных задач
//{{

function svVel(a){
/*Массив a состоит из элементов-объектов следующей структуры:
	vel: название величины
	rod: род существительного
		0: мужской
		1: женский
		2: средний
		3: только во множественном числе
	bkv: буква, которой обозначается величина. Если её нет, не упоминается.
	zna: значение величины
	nmn: размерность величины. Опять же, если не указано - лесом.
	nah: можно ли требовать найти величину
	pre: префикс, то есть то, что пишется перед названием величины
	utv: альтернативное величине утвердительное высказывание
	vpr: альтернативный вопрос
	vin: величина в винительном падеже. Если равна 1, то именительный и винительный падежи совпадают. Если не определена, то конструкции, где нужен в. п., избегаются.
*/
	var b=a.slice();
	b.shuffle();
	for(;!b[0].nah;b.shuffle()){};
	var rez='';//Сюда будет записан результат
	var c=b[0];
	for(var i1=b.length-1;i1>0;i1--)
		b[i1]=nazvVel(b[i1]);
	
	b.splice(0,1);
	var d=sluchch(1,[b.length,3].minE());
	var f=[c.zna];//В этом массиве будут фразы.
	f[1]=voprVel(c,sosiskaVel(b.splice(0,d)));
	for(;b.length;){
		var st=b.splice(0,1);
		var sk=sosiskaVel(b.splice(0,sluchch(2)));
		f.push((om.utochn.iz()+st+(sk?om.utochn2.iz()+sk:'')+'. ').plusminus().toZagl());
	}
	return f;
}

function nazvVel(a){
	if(a.utv)
		return a.utv;
	if(!a.rod)
		a.rod=0;
	
	var rez=(
		a.vel+' '+
		(a.bkv?
			'$'+a.bkv+'=':
			[om.ravno,om.sostavl].iz()[a.rod]+' '
		)+
		(a.pre?
			a.pre:
			''
		)+
		a.zna+
		(a.nmn?
			(a.bkv?
			'~':
			' '
			)
			+a.nmn:
			''
		)+
		(a.bkv?
			'$':
			''
		)
	);
//	console.log(rez);
	return rez;
}

function sosiskaVel(a){
	if(!a.length)
		return '';

	for(var rez=''+a.splice(0,1);a.length;)
		rez+=om.utochn2.iz()+a.splice(0,1);

	return rez;
}

function voprVel(a,t1){
	var rez='';
	t1=t1.trim();
	t1=t1?', если '+t1:'';
	a.rod=a.rod?a.rod:0;
	if(a.vpr){
		rez=a.vpr.toZagl()+t1+'? '+
		(
		!!a.nmn?
		['ответ',otvdayte.iz()].shuffle().join(' ').toZagl()+' в '+a.nmn+'.':
		''		
		);
		return rez;
	}
	var bkv=(' $'+a.bkv+'$').esli(a.bkv);
	var rez=[
			'Чему '+om.ravno[a.rod]+' '+a.vel+bkv+t1+'? '+
			(
				a.nmn?
				'Ответ выразите в '+a.nmn+'.'.esli(a.nmn.posl()!='.')+' ':
				''
			)
		,
			'Чему '+om.ravno[a.rod]+' '+a.vel+bkv+
			(
				a.nmn?
				', '+lx['выраженный'].i[a.rod]+' в '+a.nmn:
				''
			)+
			t1+'? '
		,
			'Сколько '+(a.nmn+' ').esli(a.nmn)+om.sostavl[a.rod]+' '+a.vel+bkv+t1+'? '
		,
	];
	if(a.vin==1)
		a.vin=a.vel;
	
	if(a.vin){
		rez.push(
			om.otvnaydite.iz().toZagl()+' '+a.vin+bkv+
			(
				a.nmn?
				', '+lx['выраженный'].v[a.rod]+'в '+a.nmn:
				''
			)
			+t1+'. '
		);
		rez.push(
			om.otvnaydite.iz().toZagl()+' '+a.vin+bkv+t1+'. '+
			(
				a.nmn?
				'Ответ выразите в '+a.nmn+'. ':
				''
			)
		);
	}
	return rez.iz();
}

//}}
'use strict';

function lz_main(string){
	var vars=[];
	
}

function lz_split(string){
	if(!string)
		return [[]];
	var mas=string.reverse().split(/\s(?=[?!.,:;-])/).reverse().reverseElems();
	var len=mas.length;
	if(mas[len-1]==''){
		mas.length--;
		len--;
	}
	var temp;
	for(var i=0;i<len;){
		if(mas[i]==''){
			mas.splice(i,1);
			len--;
			continue;
		}
		temp=mas[i].match(/[?!.,:;-]+$/)[0];
		mas[i]=mas[i].replace(/[?!.,:;-]/g,'').split(/\s/);
		mas[i].push(temp);
		i++;
	}
	return mas.matrToVect();
}
'use strict';

var nastr={};//Глобальный объект с настройками
nastr.nabor=nabor;

try{
	var decodedJSON=document.location.hash.decodeURIComponent();
	document.location.hash=decodedJSON;
	var parsedJSON=JSON.parse(decodedJSON.substr(1));
	
	if(parsedJSON.isString)
		nastr.previousHash='#'+parsedJSON;
	else{
		nastr.nabor.importFrom(parsedJSON.nabor);
	}
}catch(e){
	console.log('Не удалось выделить настройки из адреса страницы.');
}

var previousHeight=-1;
var previousWidth=-1;

function podgonIframeHeight(){
	if(window.parsedJSON.iframe){
		var h=getDocHeight();
		if(h!=previousHeight){
			previousHeight=h;
			var ifrh=[];
			ifrh[parsedJSON.iframe.nomer]=h;
			parent.postMessage(
			{
				chasMessage:{
					iframeHeight:ifrh,
				},
			}
			,'*');
		}
	}
}

function parseMessageInIframe(mes){
	if(!mes.data.chasMessage)
		return;
	var ifr=mes.data.chasMessage.iframeWidth;
	if(ifr<900 && ifr!=previousWidth && !self.location.href.match(/mini\.html/)){
		document.body.style.zoom=ifr/900;
		previousWidth=ifr;
		console.log(ifr);
	}
}

try{
	if(window!=top){
		$(setInterval(podgonIframeHeight,256));
		window.addEventListener("message",parseMessageInIframe,false);
	}
}catch(e){}

addscript(nabor.adres+'upak.js');
if(nabor.zagol)
	addscript(nabor.zagol,'$(function(){zagr(nabor.adres+\'upak.js\')});');
'use strict';
nastr.style={fon:'white',pan:'#e9b96e',menuLinkTarget:"_self"};//Оформление по умолчанию
if(egeok || (document.referrer.search(/\/\/ege-ok\.ru/)+1)){
	//Если с сайта ege-ok.ru, меняем оформление
	nastr.style.fon='white';
	nastr.style.pan='#DED';
	document.write('<style>div.egeok{display:block;}</style>');
//	$('.egeok').css('display','auto');
}else if(izvk || _4ege){
	nastr.style.fon='#FFF';
	nastr.style.pan='#DDF';
}else if(document.referrer.search(/\/\/edu\.ru/)+1){
	nastr.style.fon='white';
	nastr.style.menuLinkTarget='_self';
}

try{
	if(parsedJSON){
		nastr.style.importFrom(parsedJSON.style);
	}
}catch(e){};

document.write('<style>');
document.write('body, .fon{');
document.write('	background-color:'+nastr.style.fon+';');
document.write('}');
document.write('#prov_knopki, #panel, ul.pureCssMenu,ul.pureCssMenu ul, ul.pureCssMenu a, ul.pureCssMenu li.dis a:hover, ul.pureCssMenu li.sep a:hover, ul.pureCssMenu li a.pureCssMenui0{');
document.write('	background-color:'+nastr.style.pan+';');
document.write('}');
document.write('ul.pureCssMenu li:hover>a, ul.pureCssMenu li a:hover, ul.pureCssMenu li a.pureCssMenui0:hover, ul.pureCssMenu li.dis a:hover, ul.pureCssMenu li.sep a:hover {');
document.write('	background-color:'+nastr.style.fon+';');
document.write('}');
document.write('.anythingSlider .arrow span {');
document.write('	color:'+nastr.style.pan+';');
document.write('}');
document.write('#inf {');
document.write('	border: 2px ridge'+nastr.style.pan+';');
document.write('	border-top:none;');
document.write('}');
document.write('#sovety{');
document.write("	font:13.5px bold;");
document.write("	font-family:'liberation_sans';");
document.write('}');
document.write('#menucenter{');
document.write("	font:14px bold;");
document.write("	font-family:'liberation_sans';");
document.write('}');
document.write('</style>');
document.write('<style id="imported">');
try{
	document.write(''+(nastr.style.strCSS).neutralizeXSS());
}catch(e){}
document.write('</style>');
'use strict';

function _getMenuModel(genJson, nastrCopy, obol) {
	//Математика ЕГЭ-2013
	var nastr_mat2013 = nastrCopy.clone();
	nastr_mat2013.nabor = { zagol:'../zdn/mat/mat.js' };

	//Математика ЕГЭ-2014
	var nastr_mat2014 = nastrCopy.clone();
	nastr_mat2014.nabor = { zagol:'../zdn/mat2014/mat2014.js' };

	//Математика ЕГЭ-2015 профильный
	var nastr_matege2015p=nastrCopy.clone();
	nastr_matege2015p.nabor={zagol:'../zdn/matege2015p/matege2015p.js'};

	//Тригонометрия
	var nastr_tri = nastrCopy.clone();
	nastr_tri.nabor = { zagol:'../zdn/tri/tri.js' };

	//Русский язык ЕГЭ-2014
	var nastr_rus2014 = nastrCopy.clone();
	nastr_rus2014.nabor = { zagol:'../zdn/rus2014/rus2014.js' };

	//Информатика ЕГЭ-2014
	var nastr_inf2014 = nastrCopy.clone();
	nastr_inf2014.nabor = { zagol:'../zdn/inf/inf.js' };

	//История: Перегудов
	var nastr_istpereg = nastrCopy.clone();
	nastr_istpereg.nabor = { zagol:'../zdn/istpereg/istpereg.js' };

	return {
		"На главную": "../doc/index.html" + genJson(null),
		"Тесты": {
			"По предметам": {
				"Математика: ЕГЭ-2015 (профильный)": obol + genJson(nastr_matege2015p),
				"Математика: ЕГЭ-2014": obol + genJson(nastr_mat2014),
				"Математика: ЕГЭ-2013": obol + genJson(nastr_mat2013),
				"Тригонометрия: формулы": obol + genJson(nastr_tri),
				"История: даты": obol + genJson(nastr_istpereg),
				"Русский язык, ЕГЭ: часть": obol + genJson(nastr_rus2014),
				"Информатика, ЕГЭ: начало": obol + genJson(nastr_inf2014)
			},
			"Случайное задание": "../sh/sluch.html" + genJson(null),
			"Каталог заданий набора": "../sh/katalog.html" + genJson(null),
			"Полный тест": "../sh/polnmat.html" + genJson(null),
			"Тесты на печать": "../sh/pechmat.html" + genJson(null),
		},
		"Прочее": {
			"Разработчикам": {
				"Техническое": "../doc/tech.html" + genJson(null),
				"Режим отладки шаблона": "../sh/otladka.html" + genJson(null),
			},
			"Скачивание": {
				"Системные требования": "../doc/systreb.html" + genJson(null),
				"Скачать": "../doc/skachat.html" + genJson(null),
				"Репозиторий на GitHub": "https://github.com/nickkolok/chas-ege",
			},
			"Информация": {
				"Лицензии": "../doc/license.html" + genJson(null),
				"Разработчики": "../doc/razrab.html" + genJson(null),
				"История выпусков": "../doc/istor.html" + genJson(null),
				"Концепция": "../doc/koncepc2.html" + genJson(null),
				"Ссылки": "../doc/ssylki.html" + genJson(null),
			},
			"Опросы и голосования": "../doc/oprosy.html" + genJson(null),
		},
		"Мы ВКонтакте": {
			"Приложение": "https://vk.com/app3634828",
			"Группа": "https://vk.com/chasege",
		},
		"Сайт Математического факультета ВГУ": "https://www.math.vsu.ru"
	};
}

////
//// Are you really wanna get deeper?
////

if(!_4ege) {
	(function() {
		var nastrCopy = nastr.clone();
		nastrCopy.upak = undefined;
		var obol = document.location.href.match(/[a-zA-Z0-9]+\.html/)[0] + "?" + Math.random();
		var target = " target=\""+nastr.style.menuLinkTarget+" \" ";

		function genJsonerator(n) {
			return '#' + JSON.stringify( n==null ? nastrCopy : n ).encodeURIComponent();

		}

		function writeMenuItem(title, href) {
			document.write("<li class=\"pureCssMenui\"><a class=\"pureCssMenui0\" href=\"" + href + "\"" + target + ">"
			               + title + "</a></li>");
		}

		function writeNodes(nodes) {
			for (var title in nodes) {
				if (typeof nodes[title] == typeof "")
					writeMenuItem(title, nodes[title]);
				else
					writeMenuCategory(title, nodes[title]);
			}
		}

		function writeMenuCategory(title, nodes) {
			document.write("	<li class=\"pureCssMenui\"><a class=\"pureCssMenui\" href=\"#\"><span>" + title + "</span>");
			document.write("	<!--[if gt IE 6]--></a><!--[endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->");
			document.write("	<ul class=\"pureCssMenum\">");

			writeNodes(nodes);

			document.write("	</ul>");
			document.write("	<!--[if lte IE 6]></td></tr></table></a><![endif]-->");
			document.write("	</li>");
		}

		document.write("<div id=\"menucenter\">");
		document.write("<ul class=\"pureCssMenu pureCssMenum\">");
		writeNodes(_getMenuModel(genJsonerator, nastrCopy, obol));
		document.write("</ul>");
		document.write("</div>");

		console.log("menu.js отработал");
	})();
} else {
	document.write('<center><a href="https://www.math.vsu.ru/chas-ege/doc/index.html" target="blank">"Час ЕГЭ"</a> разработан при <a href="https://www.math.vsu.ru/" target="blank">Математическом факультете ВГУ</a>.</center>');
}

'use strict';
try{
	if(egeok){
		document.referrer=document.referrer.replace('ege-ok.ru','ege_ok.referrer');
	}
}catch(e){}

var referrer=egeok?document.referrer.replace('ege-ok.ru','ege_ok.referrer'):document.referrer;

try{
//$(function(){
	if(!svinta){
//		var ymdiv=document.createElement('div');
//		ymdiv.style.top='-9999px';
//		ymdiv.style.position='absolute';
//		document.body.appendChild(ymdiv);
		var h='';
		if(!egeok)
			h=('<!-- Yandex.Metrika counter -->'+
			'<script type="text/javascript">'+
			'(function (d, w, c) { (w[c] = w[c] || []).push(function() {'+
			' try { w.yaCounter22534447 = new Ya.Metrika({id:22534447, clickmap:true, trackLinks:true, accurateTrackBounce:true, trackHash:true}); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script>'+
			'<noscript><div><img src="//mc.yandex.ru/watch/22534447" style="position:absolute; left:-9999px;" alt="" /></div></noscript>'+
			'<!-- /Yandex.Metrika counter -->');
		h+=('<!--LiveInternet counter--><script type="text/javascript">'+
		'document.write("<a href=\'http://www.liveinternet.ru/click\' target=_blank>'+
		'<img src=\'//counter.yadro.ru/hit?t22.6;r" + escape(referrer) + ((typeof(screen)=="undefined")?"":";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth)) +'+
		' ";u" + escape(document.URL) +";h"+escape(document.title.substring(0,80)) +'+
		'  ";" + Math.random() + "\' border=0 width=88 height=31 alt=\'\' '+
		'title=\'LiveInternet: показано число просмотров за 24 часа, посетителей за 24 часа и за сегодня\'>'+
		'<\/a>")</script><!--/LiveInternet-->');
//		if(!(document.location.href.search('/sh/')+1)
			document.write(h.vTag('div','hidden style="display:none;position:absolute;top:-9999px;"'));
//		ymdiv.innerHTML=h;
//		console.log('Счётчики добавлены');
	}
//});
console.log('yametrika.js отработал');
}catch(e){
console.log('yametrika.js завершился с ошибкой');
console.log(e);
}
'use strict';

var bIE=0;
var bOpera=0;
var bApple=0;
var bGecko=0;
var strBrowser='Chromium-based';
if (!"\v1") {
	bIE=1;
	strBrowser='"MS Internet Explorer", жёстко привязанный к закрытой ОС "Microsoft Windows"';
}
if (/*@cc_on!@*/0) {
	bIE=1;
	strBrowser='"MS Internet Explorer", жёстко привязанный к закрытой ОС "Microsoft Windows"';
}
if (navigator.userAgent.search('Trident')+1) {
	bIE=1;
	strBrowser='"MS Internet Explorer", жёстко привязанный к закрытой ОС "Microsoft Windows"';
}
if (self.opera) {
	bOpera=1;
	strBrowser='"Opera"';
}
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
	strBrowser='устройств "iPhone" или "iPod"';
	bApple=1;
}
if(navigator.userAgent.match('Gecko/')){
	strBrowser='Mozilla Firefox или ему подобный';
	bGecko=1;
}

var strpr='Вероятно, Вы используете проприетарный браузер '+strBrowser;

if(bIE &&
	!(location.href.match('ege-ok.ru')||document.referrer.match('ege-ok.ru')) &&
	!(location.href.match('matematikalegko'))
){
	alert(strpr+
		'\n\rТренажёр правильно работает в браузерах Firefox, Chromium, Google Chrome, Интернет.Mail.Ru и т. д.\n\rВ браузерах Internet Explorer и Opera тренажёр может не работать.');
}

if(bIE+bOpera+bApple) {
	document.write('<center><div id="browser"><font color="red" size="5">'+strpr+'.<br/>  Система "Час ЕГЭ" официально не предназначалась и, скорее всего, не будет предназначаться для работы в проприетарных браузерах.</font><br/>Возможно, некоторые элементы будут работать.<br/>'+
		'<button onclick="document.getElementById(\'browser\').innerHTML=\'\';" >Свернуть это предупреждение</button></div>'+
		'<div class="predupr">Настоятельно рекомендуем Вам скачать <a href="http://mozilla-russia.org/">Firefox</a> или <a href="https://www.google.com/intl/ru/chrome/browser/">Chrome</a></div></center>');
}

if(!window.chas)
	window.chas={};

if(bIE){
	chas.integrate=function(){
			document.write('Ваш браузер не поддерживается модулем интеграции.');
	}
}else{
	chas.integratedCount=0;
	chas.integrate=function(href,strn,width,height,predupr){
		if(chas.autoIntegrated)
			return;
		if(!height){
			height='1500';
		}
		if(!width){
			width='900';
		}
		if(!strn){
			strn={};
		}
		if(!href){
			href="https://www.math.vsu.ru/chas-ege/sh/sluch.html";
		}
		strn.iframe={nomer:chas.integratedCount};
		document.write(
			'<iframe'+
				' src="'+href.split('#')[0]+'#'+encodeURIComponent(JSON.stringify(strn))+'"'+
				' width="'+width+'"'+
				' height="'+height+'"'+
				' id="chas-integrated-iframe'+chas.integratedCount+'"'+
			'></iframe>'
		);
		if(predupr)try{
			var pred;
			while(pred=document.getElementById(predupr)){
				pred.innerHTML='';
				pred.id='';
			}
		}catch(e){};
		chas.integratedCount++;
	}
	
	chas.parseWindowMessage=function(mes){
		if(!mes.data.chasMessage)
			return;
		if(!mes.data.chasMessage.iframeHeight)
			return;
		var ifr=mes.data.chasMessage.iframeHeight;
		for(var i=0;i<=chas.integratedCount;i++)
			if(ifr[i])
				document.getElementById('chas-integrated-iframe'+i).height=ifr[i];
	};
	window.addEventListener("message",chas.parseWindowMessage,false);
	
	chas.postMessagesWidth=function(){
		for(var i=0;i<chas.integratedCount;i++){
			var elem=document.getElementById('chas-integrated-iframe'+i);
			elem.contentWindow.postMessage(
			{
				chasMessage:{
					iframeWidth:window.getComputedStyle(elem).width.replace(/px/,''),
				},
			}
			,'*');
		}
	};
	setInterval(chas.postMessagesWidth,256);

	//Эти две строки, кажется, надо бы выкинуть. Но вдруг что-нибудь сломается.
	chas.resizeIframes=function(interval){
		setInterval(chas.resizeIframesOnce,interval);
	}
	document.write('<script src="https://www.math.vsu.ru/chas-ege/lib/autointegr.js"></script>');
}
'use strict';

window.latbukv=["A","B","C","D","F","G","H","J","L","M","N","P","R","S","T","Q","U","W","X","Y","Z"];
window.rusbukv=["А","Б","В","Г","Д","Е","Ё","Ж","И","Й","К","Л","М","Н","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я"];

window.moneta=['орёл','решка'];

window.razy=['ни разу','один раз','дважды','трижды','четырежды','пятикратно','шестикратно','семикратно','восьмикратно','девятикратно','десятикратно'];

window.kachestva={};
window.kachestva.ie=['безопасность','комфорт','функциональность','качество','внешний вид','простота ремонта','надёжность','гарантийный срок','скорость запуска','настраиваемость'];

window.tovary={};
window.tovary.ie=['автомобиль'	,'кофеварка'	,'чайник'	,'ноутбук'		,'бензопила'	,'СВЧ-печь'		,'велосипед'	,'садовый насос'	];
window.tovary.rm=['автомобилей'	,'кофеварок'	,'чайников'	,'ноутбуков'	,'бензопил'		,'СВЧ-печей'	,'велосипедов'	,'садовых насосов'	];

window.dlina={};
window.dlina.m= [/*7467.6, 			*/	1066.8,		185.2,			1852,				1609.34,				201.16		];
window.dlina.pm=[/*'русских милях',	*/	'вёрстах',	'кабельтовах',	'морских милях',	'американских милях',	'фурлонгах'	];
window.dlina.ie=[/*'русская миля',	*/	'верста',	'кабельтов',	'морская миля',		'американская миля',	'фурлонг'	];
window.dlina.rm=[/*'русских миль',	*/	'вёрст',	'кабельтовых',	'морских миль',		'американских миль',	'фурлонгов'	];

window.imenaj={};
window.imenaj.ie=['Анастасия','Юлия','Елена','Ольга','Яна','Олеся','Кристина','Вероника','Элеонора','Дарья','Мария','Екатерина','Софья','Наталия','Надежда','Александра'];

window.otchestvaj={};
window.otchestvaj.ie=['','Ивановна','Петровна','Фёдоровна','Васильевна','Анатольевна','Николаевна','Сергеевна','Игоревна','Михайловна','Владимировна','Олеговна','Степановна','Юрьевна','Александровна','Алексеевна','','','','']

window.profesj={};
window.profesj.ie=['суровая воронежская хакерша','','программистка','веб-дизайнер','аспирантка','скромный библиотекарь','блондинка','студентка','школьница','комсомолка, спортсменка, отличница и, наконец, просто красавица','']

window.deistviaj=['купила','получила в наследство','получила в подарок','нашла','приобрела','раздобыла'];

window.transportm={};
window.transportm.ie=['"Запорожец"'	,'"Москвич"'	/*,'автомобиль'*/	,'грузовик'	,'велосипед'	,'доисторический омнибус','автобус'];
window.transportm.r2=['"Запорожца"'	,'"Москвича"'	/*,'автомобиля'*/	,'грузовика','велосипеда'	,'доисторических омнибуса','автобуса'];
window.transportm.re=['"Запорожца"'	,'"Москвича"'	/*,'автомобиля'*/	,'грузовика','велосипеда'	,'доисторического омнибуса','автобуса'];
window.transportm.te=['"Запорожцем"','"Москвичом"'	/*,'автомобилем'*/	,'грузовиком','велосипедом','доисторическим омнибусом','автобусом'];

window.pifagtr=[[3,4,5],[5,12,13],[8,15,17],[7,24,25]];

window.mesiacy={};
window.mesiacy.re=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
window.mesiacy.dni=[31,28,31,30,31,30,31,31,30,31,30,31];

window.valuta={};
window.valuta.re=['доллара','евро','фунта стерлингов'];

var om={};
om.eda={};
om.eda.ie=['сырок'	,'шоколадка'	,'яблоко'	,'груша'	,'упаковка сока'	,'бутерброд'	,'бутылка газировки'	,'батон'	,'буханка хлеба'	];
om.eda.re=['сырка'	,'шоколадки'	,'яблока'	,'груши'	,'упаковки сока'	,'бутерброда'	,'бутылки газировки'	,'батона'	,'буханки хлеба'	];
om.eda.ve=['сырок'	,'шоколадку'	,'яблоко'	,'грушу'	,'упаковку сока'	,'бутерброд'	,'бутылку газировки'	,'батон'	,'буханку хлеба'	];
om.eda.rm=['сырков'	,'шоколадок'	,'яблок'	,'груш'		,'упаковок сока'	,'бутербродов'	,'бутылок газировки'	,'батонов'	,'буханок хлеба'	];

om.korabli={};
om.korabli.ie=['корабль'	,'круизный лайнер'	,'прогулочное судно'	,'теплоход'		,'пароход'	,'атомоход'		];
om.korabli.pe=['корабле'	,'круизном лайнере'	,'прогулочном судне'	,'теплоходе'	,'пароходе'	,'атомоходе'	];

om.meltov={};
om.meltov.ie=['фонарик'		,'флакон шампуня'	,'флэшка'	,'компакт-диск'		,'сувенир'		,'матрёшка'	,'магнит на холодильник'	,'сборник тестов для подготовки к ЕГЭ'		,'тетрадь'	,'учебник'		,'цветочный горшок'		];
om.meltov.im=['фонарики'	,'флаконы шампуня'	,'флэшки'	,'компакт-диски'	,'сувениры'		,'матрёшки'	,'магниты на холодильник'	,'сборники тестов для подготовки к ЕГЭ'		,'тетради'	,'учебники'		,'цветочные горшки'		];
om.meltov.re=['фонарика'	,'флакона шампуня'	,'флэшки'	,'компакт-диска'	,'сувенира'		,'матрёшки'	,'магнита на холодильник'	,'сборника тестов для подготовки к ЕГЭ'		,'тетради'	,'учебника'		,'цветочных горшка'		];
om.meltov.ve=['фонарик'		,'флакон шампуня'	,'флэшку'	,'компакт-диск'		,'сувенир'		,'матрёшку'	,'магнит на холодильник'	,'сборник тестов для подготовки к ЕГЭ'		,'тетрадь'	,'учебник'		,'цветочный горшок'		];
om.meltov.rm=['фонариков'	,'флаконов шампуня'	,'флэшек'	,'компакт-дисков'	,'сувениров'	,'матрёшек'	,'магнитов на холодильник'	,'сборников тестов для подготовки к ЕГЭ'	,'тетрадей'	,'учебников'	,'цветочных горшков'	];

om.sroki={};
om.sroki.re=['недели'	,'декады'	,'месяца'	];
om.sroki.ve=['неделю'	,'декаду'	,'месяц'	];
om.sroki.rm=['недель'	,'декад'	,'месяцев'	];

om.uchrezhd={};
om.uchrezhd.ie=['офис'	,'канцелярия'	,'секретариат'	,'министерство'	,'ведомство'	,'Рособрнадзор'	,'Минобрнауки'	];
om.uchrezhd.ve=['офис'	,'канцелярию'	,'секретариат'	,'министерство'	,'ведомство'	,'Рособрнадзор'	,'Минобрнауки'	];
om.uchrezhd.pe=['офисе'	,'канцелярии'	,'секретариате'	,'министерстве'	,'ведомстве'	,'Рособрнадзоре','Минобрнауки'	];

om.denned={};
om.denned.ie=		['воскресенье'	,'понедельник'	,'вторник'	,'среда'	,'четверг'	,'пятница'	,'суббота'	];
om.denned.ve=		['воскресенье'	,'понедельник'	,'вторник'	,'среду'	,'четверг'	,'пятницу'	,'субботу'	];
om.denned.pg=[];
om.denned.pg['в']=	['в'			,'в'			,'во'		,'в'		,'в'		,'в'		,'в'		];

om.igrkosti=[];
om.igrkosti[2]=[0,0,1,2,3,4,5,6,5,4,3,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
om.igrkosti[3]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
(function() {
	for(var i1=1;i1<=6;i1++)
		for(var i2=1;i2<=6;i2++)
			for(var i3=1;i3<=6;i3++)
				om.igrkosti[3][i1+i2+i3]++;
})();

om.strany={};
om.strany.ie=['Россия'	,'Белоруссия'	,'Китай'	,'ЮАР'	,'Эквадор'	,'Венесуэла'	,'Куба'	,'Австралия'	,'Австрия'	,'Бельгия'	,'Англия'	,'Германия'	,'Польша'	,'Сербия'	,'Чехия'	,'Словакия'	,'Словения'	,'Израиль'	,'Бразилия'	,'Мексика'	];
om.strany.re=['России'	,'Белоруссии'	,'Китая'	,'ЮАР'	,'Эквадора'	,'Венесуэлы'	,'Кубы'	,'Австралии'	,'Австрии'	,'Бельгии'	,'Англии'	,'Германии'	,'Польши'	,'Сербии'	,'Чехии'	,'Словакии'	,'Словении'	,'Израиля'	,'Бразилии'	,'Мексики'	];

om.sportparn={};
om.sportparn.ie=['шахматы'	,'вольная борьба'	,'настольный теннис'	,'бадминтон'	,'шашки'	];
om.sportparn.pe=['шахматам'	,'вольной борьбе'	,'настольному теннису'	,'бадминтону'	,'шашкам'	];


om.sport={};
om.sport.ie=['гимнастика'	,'вольная борьба'	,'лёгкая атлетика'	,'тяжёлая атлетика'	];
om.sport.pe=['гимнастике'	,'вольной борьбе'	,'лёгкой атлетике'	,'тяжёлой атлетике'	];

om.izdsteklo={};
om.izdsteklo.rm=['витрин','оконных рам','аквариумов','книжных полок','террариумов'];

om.znamenat=[2,4,5,8,10,20,25,100,200];

om.zhidkost={};
om.zhidkost.re=['воды','ртути','жидкости','раствора','бензина','керосина','метилового спирта','газировки','уксуса','нефти'];

om.ravno=['равен','равна','равно','равны'];
om.sostavl=['составляет','составляет','составляет','составляют'];
om.vyrazh=['выраженный','выраженная','выраженное','выраженные'];
om.utochn=['','','','','','при этом ','известно, что '];
om.utochn2=[', при этом ',', а ',', '];

om.goroda=['Воронеж','Москва','Санкт-Петербург','Казань','Сочи','Семилуки','Хабаровск','Магадан','Красноярск'];

om.porchisl={};
om.porchisl[1]={};
om.porchisl[1].i=['первый','первая','первое','первые'];
om.porchisl[2]={};
om.porchisl[2].i=['второй','вторая','второе','вторые'];
om.porchisl[3]={};
om.porchisl[3].i=['третий','третья','третье','третьи'];
om.porchisl[4]={};
om.porchisl[4].i=['четвёртый','четвёртая','четвёртое','четвёртые'];
om.porchisl[5]={};
om.porchisl[5].i=['пятый','пятая','пятое','пятые'];
om.porchisl[6]={};
om.porchisl[6].i=['шестой','шестая','шестое','шестые'];
om.porchisl[7]={};
om.porchisl[7].i=['седьмой','седьмая','седьмое','седьмые'];
om.porchisl[8]={};
om.porchisl[8].i=['восьмой','восьмая','восьмое','восьмые'];
om.porchisl[9]={};
om.porchisl[9].i=['девятый','девятая','девятое','девятые'];
om.porchisl[10]={};
om.porchisl[10].i=['деcятый','деcятая','деcятое','деcятые'];
om.porchisl[11]={};
om.porchisl[11].i=['одиннадцатый','одиннадцатая','одиннадцатое','одиннадцатые'];
om.porchisl[12]={};
om.porchisl[12].i=['двенадцатый','двенадцатая','двенадцатое','двенадцатые'];
om.porchisl[13]={};
om.porchisl[13].i=['тринадцатый','тринадцатая','тринадцатое','тринадцатые'];
om.porchisl[14]={};
om.porchisl[14].i=['четырнадцатый','четырнадцатая','четырнадцатое','четырнадцатые'];
om.porchisl[15]={};
om.porchisl[15].i=['пятнадцатый','пятнадцатая','пятнадцатое','пятнадцатые'];
om.porchisl[16]={};
om.porchisl[16].i=['шестнадцатый','шестнадцатая','шестнадцатое','шестнадцатые'];
om.porchisl[17]={};
om.porchisl[17].i=['семнадцатый','семнадцатая','семнадцатое','семнадцатые'];
om.porchisl[18]={};
om.porchisl[18].i=['восемнадцатый','восемнадцатая','восемнадцатое','восемнадцатые'];
om.porchisl[19]={};
om.porchisl[19].i=['девятнадцатый','девятнадцатая','девятнадцатое','девятнадцатые'];
om.porchisl[20]={};
om.porchisl[20].i=['двадцатый','двадцатая','двадцатое','двадцатые'];

om.otvdayte=['выразите','дайте','приведите','запишите'];
om.otvnaydite=['найдите','определите','вычислите'];

om.metally={};
om.metally.re=['меди','алюминия','чугуна','железа','стали','никеля','хрома'];


om.mesiacy=window.mesiacy;
om.tovary=window.tovary;
om.rusbukv=window.rusbukv;
om.latbukv=window.latbukv;
om.imenaj=window.imenaj;
om.transportm=window.transportm;
om.pifagtr=window.pifagtr;

om.toplivo=['топливо','бензин','дизель','газ','керосин','солярка'];
om.mezhgortrans=['автобус','поезд'];
om.naspunkt=['пункт','населённый пункт','город','городок','ПГТ','деревня','село','хутор','посёлок','инноград','наукоград'];
om.stroymat=['пенобетон','бетон','брус','шлак','песок','щебень','гранит','известняк','песчаник','камень','гравий'];
om.izmergruz=['тонна','кубометр'];
om.stroenmal=['гараж','дом','дача','магазин'];

om.edizm={};
om.edizm.dlina=[
	['метр',1],
	['километр',1000],
	['дециметр',0.1],
	['сантиметр',0.01],
	['миллиметр',0.001],
];
'use strict';
try{
	var cashdiv=document.createElement('div');
	cashdiv.style.top='-9999px';
	cashdiv.style.position='absolute';
	cashdiv.style.display='none';
	document.body.appendChild(cashdiv);
	cashdiv.innerHTML='$'+'0123456789=+-\\cdot'+latbukv.soed()+'\\in'+
		latbukv.soed().toLowerCase()+'\\sin\\cos\\ln\\log\\lg 2'+
		'\\def\\tg{\\mathrm{tg~}}'+
		'\\def\\ctg{\\mathrm{ctg~}}'+
		'$';
$(window).load(function(){
	if(!window.mjConfig)
		window.mjConfig='TeX-AMS_HTML-full';
	chas.libs.fileMathJax='MathJax.js?config='+mjConfig+'&locale=ru';
	if(svinta || chas.mode.offline){
		zagr(chas.libs. localMathJax+chas.libs.fileMathJax);
	}else{
		zagr(chas.libs.remoteMathJax+chas.libs.fileMathJax);
	}
});
console.log('cache.js отработал');
}catch(e){
console.log('cache.js завершился с ошибкой');
console.log(e);
}
'use strict';
/*
Атрибуты (HTML5-data-)
* data-jstorage-id - идентификатор элемента в jStorage. Обязателен!
* data-jstorage-ne - не отслеживать (через пробел)
* 	zn - значение
* 	vi - видимость
* 	ih - innerHTML
*/

/*
Attributes (HTML5-data-)
* data-jstorage-id - identifier to link the element in jStorage with. Necessary!
* data-jstorage-ne - do not track (divided by space)
* 	zn - value
* 	vi - visibility
* 	ih - innerHTML
*/

//Загрузить данные
//Load data
$.jStorage.zagrData=function(){
	var storedData=$.jStorage.get('data-jstorage');
	if(!storedData)
		return;
	[].slice.call(document.querySelectorAll('*[data-jstorage-id]'),0).map(
		function(th){'use strict';
			try{
				var stor=storedData[th.getJStorageId()];
				if(stor){
					var ne=th.getAttribute('data-jstorage-ne');
					ne=ne?ne:'';
					if(!ne.match('zn')){
						th.checked=stor.checked;
						th.value=stor.value;
					}
					if(!ne.match('ih'))
						th.innerHTML=stor.innerHTML;
					if(!ne.match('vi'))
						th.style.display=stor.style.display;
				}
			}catch(e){
				console.log(th,' - ошибка в jStorage.zapomni');
				console.log(th,' - error in jStorage.zapomni');
			}
		}
	);
};

//Сохранить данные
//Save data
$.jStorage.sohrData=function(){
	var storedData=$.jStorage.get('data-jstorage');
	if(!storedData)
		storedData={};
	[].slice.call(document.querySelectorAll('*[data-jstorage-id]'),0).map(
		function(th){'use strict';
			try{
				var jstid=th.getJStorageId();
				var stor=storedData[jstid];
				if(!stor){
					storedData[jstid]={};
					stor=storedData[jstid];
				}
				var ne=th.getAttribute('data-jstorage-ne');
				ne=ne?ne:'';
				if(!ne.match('zn')){
					stor.checked=th.checked;
					stor.value=th.value;
				}
				if(!ne.match('ih'))
					stor.innerHTML=th.innerHTML;
				if(!stor.style)
					stor.style={};
				if(!ne.match('vi'))
					stor.style.display=th.style.display;
			}catch(e){
				console.log(th,' - ошибка в jStorage.zapomni');
				console.log(th,' - error in jStorage.zapomni');
			}
		}
	);
	$.jStorage.set('data-jstorage',storedData)
};

HTMLElement.prototype.getJStorageId=function(){
	return this.getAttribute('data-jstorage-id');
}

//Объявили свой метод у HTMLElement.prototype - сделаем его неперечислимым
//Since we have created a new method in HTMLElement.prototype , we should make the method unenumerable
Object.defineProperty(HTMLElement.prototype, "getJStorageId", { enumerable: false });
'use strict';
window.sovety=[
'Это - экспериментальная, тестовая версия программы.<br/>В ней могут быть ошибки и неполадки.',
'Все замечания и предложения отправляйте<br/>на адрес nickkolok@mail.ru',
'Программа "Час ЕГЭ" корректно работает<br/>только в <a href="../doc/systreb.html" target="_blank">поддерживаемых браузерах</a>.',
'В тренажёре иногда используются статистические данные,<br/>например, о погоде или ценах. Эти данные являются<br/>автоматически сгенерированными, а <i>не</i> реальными.',
'Одна из разработчиц "Час ЕГЭ", Настя Червинская, срочно и <br/>бесплатно отдаёт котят в хорошие руки. Связаться с ней<br/> можно <a href="https://vk.com/kitten112007" target="_blank">ВКонтакте</a> или по телефону 8 (951) 5519607',
//'<br/>16.05.2014 в 15-00 в ауд. 430 Главного корпуса ВГУ состоится<br/>бесплатная лекция проф. Глушко, главы экзаменационной <br/>комиссии по математике. Приглашаются все желающие!',
'Математический факультет ВГУ - это <br/>высококвалифицированный профессорско-преподавательский <br/> состав и увлекательная студенческая жизнь.',
'Математический факультет ВГУ - это <br/>отличная профессиональная подготовка <br/>для работы в различных сферах деятельности.',
'Математический факультет ВГУ - это <br/>увлекательная студенческая жизнь и весёлый,<br/>доброжелательный, жизнерадостный коллектив.',
'Если Вам близка математика, Вы хотите стать специалистом, <br/>владеющим современными информационными технологиями и<br/> технологиями математического моделирования<br/>– ждем Вас на математическом факультете!',
'Вы можете <a href="../doc/oprosy.html"  target="blank">проголосовать</a> за то, <br/>что будет добавлено в "Час ЕГЭ"<br/>в ближайшем еженедельном выпуске.',
'"Час ЕГЭ" содержит задания ЕГЭ по математике от 1 до 15 - <br/>в соответствии с проектом тестовой части<br/>профильного уровня ЕГЭ-2015.',
'Набор заданий тренажёра "Час ЕГЭ" по математике <br/>основан на <a href="http://mathege.ru/" target="_blank">Открытом банке заданий</a>,<br/>но не повторяет его в точности.',
//'<br/>9 февраля, в воскресенье, в 10:00, Математический<br/>факультет проводит день открытых дверей<br/>в Главном корпусе ВГУ (Университетская пл., 1), ауд. 435',
//'Дорогие старшеклассники! Вы можете попробовать свои силы<br/>на бесплатном пробном ЕГЭ по математике (с оценкой от экспертов),<br/>а также посетить бесплатные консультации, которые ведут<br/>преподаватели математического факультета. <a href="https://www.math.vsu.ru/index.php?option=com_content&view=article&id=49:%D0%BF%D1%80%D0%BE%D0%B1%D0%BD%D1%8B%D0%B9-%D0%B5%D0%B3%D1%8D-%D0%B8-%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%B0%D0%B1%D0%B8%D1%82%D1%83%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%BE%D0%B2&catid=11:abiturientu&Itemid=101">Подробнее...</a>',
].shuffle();
function fixHeight(){
	var br = [];
	for (var i = 0; i < window.sovety.length; i++) {
		var pos = -1;
		br[i] = 0;
		// Ищем сколько раз встречается "<br/>"" в каждом элементе window.sovety и записываем значения в массив br
		while ( ((pos = window.sovety[i].indexOf('<br/>', pos+1)) != -1)) {
			br[i]++;
		}
	}
	// Ищем максимальное кол-во "<br/>"
	var max = Math.max.apply(0, br);
	// Меняем высоту #inf в зависимости от строк в самом длинном совете
	$(function(){
			$('#inf').css({height:(24 * (max + 1))});
	});
}
function informer(){
	var i;
	document.write('<div id="inf">');
	document.write('<ul id="sovety">');
	for(i=0;i<window.sovety.length;i++){
		document.write('<li><div class="lisov">');
		document.write(window.sovety[i]);
		document.write('</div></li>');
	}
	document.write('</ul>');
	document.write('</div>');
	$(function(){'use strict';
		$('#sovety').anythingSlider({
			forwardText         : "&gt;",
			backText         	: "&lt;",
			hashTags			:false,
//			expand				:true,
			startPanel			:1,
			theme				:'minimalist-square',
			buildNavigation		:false,
			buildStartStop		:false,
			resizeContents  	:false,
			enableKeyboard		:false,
			autoPlay			:true,
			delay				:10000,
		});
	});
}
fixHeight();
informer();
"use strict";

/** @namespace NLib
 * Утилиты
 */
var NLib = {
	/** @namespace NLib._
	 * Функционал, используемый только внутри модуля NLib
	 * @private
	 */
	_ : {
		/** @function NLib._.loadLibModule
		 * Загрузить модуль NLib
		 * @param {String} name название модуля
		 * @private
		 */
		loadLibModule : function(name) {
			document.write("<script charset=\"utf-8\" src=\"../lib/nlib/" + name + ".js\" onload=\"console.log('[NLib] Загружен модуль " + name + "');\"></script>");
		}
	},


	/** @function NLib.getTypeOf
	 * @param object объект
	 * @return тип объекта ввиде [object ТИП]
	 */
	getTypeOf : function(object) {
		return Object.prototype.toString.call(object);
	},


	/** @function NLib.toStringsArray
	 * @param arr объект, которые необходимо превратить
	 * @return arr ввиде массива строк
	 */
	toStringsArray : function(arr) {
		switch (NLib.getTypeOf(arr)) {
		case "[object Array]":
			var newArr = [];
			for (var i = 0; i < arr.length; i++) {
				switch (NLib.getTypeOf(arr[i])) {
				case "[object Number]":
					newArr.push(arr[i].ts().toString());
					break;
				case "[object String]":
					newArr.push(arr[i]);
					break;
				default:
					throw TypeError("Параметр arr должен содержать только строки и числа");
				}
			}
			return newArr;
		case "[object Number]":
			return [arr.ts()];
		case "[object String]":
			return [arr];
		default:
			throw TypeError("Параметр answers должен");
		}
	}
};


(function() {
})();

"use strict";

/** @function Array#getRandomItems
 * Получение случайные (не повторяющиеся) элементы массива
 * @param {Number} count кол-во случайных элеметнов
 * @return Массив случайных элементов массива
 */
Array.prototype.getRandomItems = function(count) {
	var items = [];
	for (var i = 0; i < count; i++) {
		if (this.length >= 1) {
			items.push(this[NLib.math.randomize(0, this.length - 1)]);
		} else {
			items.push(this[0]);
		}
	}
	return items;
};


/** @function NLib#getRandomItem
 * Получение случайный элемент массива
 * @return Случайный элемент массива
 */
Array.prototype.getRandomItem = function() {
	return this.getRandomItems(1);
}

"use strict";

/** @function Number#round
 * Округление числа
 * @param {Number} dec_places точность округления
 * @return число num округлённое до dp
 */
Number.prototype.round = function(dec_places) {
	var dec_places = dec_places || 1;
	return Math.round(this / dec_places) * dec_places;
};


/** @function Number#is_divied_by
 * Проверка кратности
 * @param {Number} divisor делитель
 * @return Кратно ли числу divisor
 */
Number.prototype.isDividedBy = function(divisor) {
	return this % divisor == 0;
};


/** @function Number#isDivisorOf
 * Проверка на кратность числу
 * @param {Number} num делимое
 * @return Является ли число делителем num
 */
Number.prototype.isDivisorOf = function(num) {
	return num % this == 0;
};


/** @function Number#getDivisors
 * Получение делителей числа
 * @return Массив делителей числа
 */
Number.prototype.getDivisors = function() {
	if (this == 0) {
		return [1];
	}
	var divisors = [];
	for (var d = 1; d <= num; d++) {
		if (this.is_divied_by(d)) {
			divisors.push(d);
		}
	}
	return divisors;
};


/** @function Number#getRandomDivisor
 * Случайные делитель
 * @return Случайный делитель числа num
 */
Number.prototype.getRandomDivisor = function() {
	return this.getDivisors().get_random_item();
};

"use strict";

/** @namespace NLib.math
 * Работа с числами
 */
NLib.math = {
	Vec2 : function(x, y) {
		return { x : x || 0, y : y || 0 };
	},


	Vec3 : function(x, y, z) {
		return { x : x || 0, y : y || 0, z : z || 0 };
	},

	/** @function NLib.math.randomize
	 * Генерация случайного числа
	 * @param {Number} min минимальное значение
	 * @param {Number} max минимальное значение
	 * @param {Number} dec_places кол-во знаков после запятой
	 * @return случайное число
	 */
	randomize : function(min, max, dec_places) {
		return (Math.random() * ((max || 9007199254740992) - (min || 0))).round(dec_places || 1);
	}
};

"use strict";

/** @namespace NLib.sets
 * Наборы
 */
NLib.sets = {
	/** @namespace NLib.sets.alphabets
	 * Алфавиты/Азбуки
	 */
	alphabets : {
		/**
		 * Английский алфавит
		 */
		english : [ "A", "B", "C", "D", "F", "G", "H", "J", "L", "M", "N", "P", "R", "S", "T", "Q", "U", "W", "X", "Y", "Z" ],


		/**
		 * Русская азбука
		 */
		russian : [ "А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "И", "Й", "К", "Л", "М", "Н", "П", "Р", "С", "Т", "У", "Ф",
		            "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я" ],
	},


	/**
	 * Единицы длинны
	 */
	lengthUnits : [
		{ name : "русская миля", inMeters : 7467.6 },
		{ name : "верста", inMeters : 1066.8 },
		{ name : "кабельтов", inMeters : 185.2 },
		{ name : "морская миля", inMeters : 1852 },
		{ name : "американская миля", inMeters : 1609.34 },
		{ name : "фурлонг", inMeters : 201.16 },
		{ name : "метр", inMeters : 1 },
		{ name : "километр", inMeters : 1000 },
		{ name : "дециметр", inMeters : 0.1 },
		{ name : "сантиметр", inMeters : 0.01 },
		{ name : "миллиметр", inMeters : 0.001 },
	],


	/**
	 * Единицы измерения грузов
	 */
	weightUnits : [ "тонна", "кубометр" ],


	/**
	 * Стороны монеты
	 */
	sidesOfCoin : [ "орёл", "решка" ],


	/**
	 * Разы
	 */
	times : [ "ни разу", "один раз", "дважды", "трижды", "четырежды", "пятикратно", "шестикратно", "семикратно", "восьмикратно",
	          "девятикратно", "десятикратно" ],

	/**
	 * Качества
	 */
	merits  : [ "безопасность", "комфорт", "функциональность", "качество", "внешний вид", "простота ремонта", "надёжность",
	            "гарантийный срок", "скорость запуска", "настраиваемость" ],

	/**
	 * Товары
	 */
	goods : [ "автомобиль", "кофеварка", "чайник", "ноутбук", "бензопила", "СВЧ-печь", "велосипед", "садовый насос" ],


	/**
	 * Имена (женские)
	 */
	womanNames : [ "Анастасия", "Юлия", "Елена", "Ольга", "Яна", "Олеся", "Кристина", "Вероника", "Элеонора", "Дарья", "Мария",
	                "Екатерина", "Софья", "Наталия", "Надежда", "Александра" ],


	/**
	 * Отчества (женские)
	 */
	womanPatronymic : [ "Ивановна", "Петровна", "Фёдоровна", "Васильевна", "Анатольевна", "Николаевна", "Сергеевна", "Игоревна",
	                     "Михайловна", "Владимировна", "Олеговна", "Степановна", "Юрьевна", "Александровна", "Алексеевна" ],


	/**
	 * Професии (женские)
	 */
	womanProfessions : [ "суровая хакерша", "программистка", "веб-дизайнер", "аспирантка", "скромный библиотекарь", "блондинка",
	                      "студентка", "школьница", "комсомолка, спортсменка, отличница и, наконец, просто красавица", "" ],


	/**
	 * Транспортные средства
	 */
	transportation : [ "\"Запорожец\"", "\"Москвич\"" /*, "автомобиль"*/, "грузовик", "велосипед", "доисторический омнибус", "автобус" ],


	/**
	 * Месяца
	 */
	months : [
		{ name : "январь", daysCount : 31 },
		{ name : "февраль", daysCount : 28 },
		{ name : "март", daysCount : 31 },
		{ name : "апрель", daysCount : 30 },
		{ name : "май", daysCount : 31 },
		{ name : "июнь", daysCount : 30 },
		{ name : "июль", daysCount : 31 },
		{ name : "август", daysCount : 31 },
		{ name : "сентябрь", daysCount : 30 },
		{ name : "октябрь", daysCount : 31 },
		{ name : "ноябрь", daysCount : 30 },
		{ name : "декабрь", daysCount : 31 }
	],


	/**
	 * Валюты
	 */
	currencies : [ "российский рубль", "доллар США", "евро", "фунт стерлингов" ],


	/**
	 * Еда
	 */
	food : [ "сырок", "шоколадка", "яблоко", "груша", "упаковка сока", "бутерброд", "бутылка газировки", "батон", "буханка хлеба" ],


	/**
	 * Корабли
	 */
	ships : [ "корабль", "круизный лайнер", "прогулочное судно", "теплоход", "пароход", "атомоход" ],


	/**
	 * Сроки
	 */
	terms : [ "неделя", "декада", "месяц" ],


	/**
	 * Учереждения
	 */
	agencies : [ "офис", "канцелярия", "секретариат", "министерство", "ведомство", "Рособрнадзор", "Минобрнауки" ],


	/**
	 * Дни недели
	 */
	weekDays : [ "воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота" ],

	/**
	 * Страны
	 */
	countries : [ "Россия", "Белоруссия", "Китай", "ЮАР", "Эквадор", "Венесуэла", "Куба", "Австралия", "Австрия", "Бельгия",
	              "Англия", "Германия", "Польша", "Сербия", "Чехия", "Словакия", "Словения", "Израиль", "Бразилия", "Мексика" ],


	/**
	 * Игры на двоих
	 */
	gamesForTwo : [ "шахматы", "вольная борьба", "настольный теннис", "бадминтон", "шашки" ],


	/**
	 * Виды спорта
	 */
	sports : [ "гимнастика", "вольная борьба", "лёгкая атлетика", "тяжёлая атлетика" ],


	/**
	 * Стеклянные изделия
	 */
	vitrics : [ "витрина", "оконная рама", "аквариум", "книжная полка", "террариум" ],


	/**
	 * Жидкости
	 */
	liquids : [ "воды", "ртути", "жидкости", "раствора", "бензина", "керосина", "метилового спирта", "газировки", "уксуса",
	            "нефти" ],

	/**
	 * Города
	 */
	cities : [ "Киров", "Воронеж", "Москва", "Санкт-Петербург", "Казань", "Сочи", "Семилуки", "Хабаровск", "Магадан", "Красноярск" ],


	/**
	 * Просьбы ответить
	 */
	answer : [ "выразите", "дайте", "приведите", "запишите" ],


	/**
	 * Просьбы найти
	 */
	answerFind : [ "найдите", "определите", "вычислите" ],


	/**
	 * Металы
	 */
	metals : [ "меди", "алюминия", "чугуна", "железа", "стали", "никеля", "хрома" ],


	/**
	 * Топлива
	 */
	fuels : [ "топливо", "бензин", "дизель", "газ", "керосин", "солярка" ],


	/**
	 * Междугородний транспорт
	 */
	longDistanceTransport : [ "автобус", "поезд" ],


	/**
	 * Виды населённых пунтков
	 */
	typesOfSettlements : [ "пункт", "населённый пункт", "город", "городок", "ПГТ", "деревня", "село", "хутор", "посёлок",
	                         "инноград", "наукоград" ],


	/**
	 * Стройматериалы
	 */
	buildingMaterials : [ "пенобетон", "бетон", "брус", "шлак", "песок", "щебень", "гранит", "известняк", "песчаник",
	                       "камень", "гравий" ],


	/**
	 * Строения
	 */
	buildings : ["гараж", "дом", "дача", "магазин"]
};

"use strict";

/**
 * Алиас на NLib
 */
var NL = NLib;

/**
 * Алиас на NLib.math
 */
var NLmath = NLib.math;


/**
 * Алиас на NLib.sets
 */
var NLsets = NLib.sets;

"use strict";

/** @namespace NApi
 * New API [на́пи]
 */
var NApi = {
	/** @namespace NApi.info
	 * Информация об API
	 */
	info : {
		/**
		 * Версия API
		 */
		API_VERSION : { major : 0, minor : 0 },


		/**
		 * Выпуск приложения
		 */
		APPLICATION_RELEASE : "__APPLICATION_RELEASE____",


		/**
		 * Версия в которой была (последний раз) сломана обратная совметсимость
		 */
		LAST_BACKWARD_COMPATIBILITY_BREAK : { major : 0, minor : 0 },


		/** @function NApi.info.requireApiVersion
		 * Проверить совместимость с текущего API, с API версии major.minor
		 * @param {Number} major
		 * @param {Number} minor
		 */
		requireApiVersion : function(major, minor) {
			if (major < NApi.info.LAST_BACKWARD_COMPATIBILITY_BREAK.major || minor < NApi.info.LAST_BACKWARD_COMPATIBILITY_BREAK.minor) {
				throw new Error("Была запрошена устаревшая версия NApi");
			} else if (major > NApi.info.API_VERSION.major || minor > NApi.info.API_VERSION.minor) {
				throw new Error("Была запрошена более новая версия NApi");
			}
		}
	},


	/** @namespace NApi._
	 * Функционал, используемый только внутри самого NApi
	 * @private
	 */
	_ : {
		/** @function NApi._.Linfo
		 * Занести в лог информацию
		 * @param {String} msg текст сообщения
		 * @private
		 */
		Linfo : function(msg) {
			console.log("[NApi][info] " + msg);
		},


		/** @function NApi._.Lmsg
		 * Занести в лог сообщение
		 * @param {String} msg текст сообщения
		 * @private
		 */
		Lmsg : function(msg) {
			console.log("[NApi][msg] " + msg);
		},


		/** @function NApi._.Lwarn
		 * Занести в лог предупреждение
		 * @param {String} msg текст сообщения
		 * @private
		 */
		Lwarn : function(msg) {
			console.log("[NApi][WARN] " + msg);
		},


		/** @function NApi._.Lerr
		 * Занести в лог информацию об ощибке
		 * @param {String} msg текст сообщения
		 * @private
		 */
		Lerr : function(msg) {
			console.log("[NApi][ERROR] " + msg);
		},


		/** @function NApi._.loadApiModule
		 * Загрузить модуль API
		 * @param {String} name название модуля
		 * @private
		 */
		loadApiModule : function(name) {
			document.write("<script charset=\"utf-8\" src=\"../lib/napi/" + name + ".js\" onload=\"NApi._.Linfo('Загружен модуль " + name + "');\"></script>");
		}
	},


	/** @function NApi.Linfo
	 * Занести в лог информацию
	 * @param {String} msg текст сообщения
	 */
	Linfo : function(msg) {
		console.log("[info] " + msg);
	},


	/** @function NApi.Lmsg
	 * Занести в лог сообщение
	 * @param {String} msg текст сообщения
	 */
	Lmsg : function(msg) {
		console.log("[msg] " + msg);
	},


	/** @function NApi.Lwarn
	 * Занести в лог предупреждение
	 * @param {String} msg текст сообщения
	 */
	Lwarn : function(msg) {
		console.log("[WARN] " + msg);
	},


	/** @function NApi.Lerr
	 * Занести в лог информацию об ощибке
	 * @param {String} msg текст сообщения
	 */
	Lerr : function(msg) {
		console.log("[ERROR] " + msg);
	},


	/** @function NApi.panic
	 * Сообщить о серёзной проблеме (с последующей остановкой)
	 * @param cause причина
	 */
	panic : function(cause) {
		NApi.Lerr("NApi.panic()");
		switch (NApi.getTypeOf(cause)) {
		case "[object String]":
			NApi.Linfo("Причина: " + cause);
			break;
		case "[object Error]":
			NApi.Linfo("Причина: " + cause.msg);
			break;
		}
		throw Error("Паника");
	},
};


(function() {
	NApi._.Linfo("NApi v" + NApi.info.API_VERSION.major + "." + NApi.info.API_VERSION.minor);
})();

"use strict";

/** @namespace NApi.debug
 * Параметры задания
 */
NApi.debug = {
	/** @namespace NApi.debug._
	 * Функционал, используемый только внутри модуля NApi.debug
	 * @private
	 */
	_ : {
		debug_mode : false,
	},


	isDebug : function() {
		return NApi.debug._.debug_mode;
	},


	/** @function NApi.debug.enableDebugging
	 * Включить режим отладки
	 */
	enableDebugging : function() {
		NApi.debug._.debug_mode = true;
	},


	/** @function NApi.debug.disableDebugging
	 * Выключить режим отладки
	 */
	disableDebugging : function() {
		NApi.debug._.debug_mode = false;
	},


	/** @function NApi.debug.Ldebug
	 * Занести в лог отладочную информацию
	 * @param {String} msg текст сообщения
	 * @note Выводиться только в режиме отладки
	 */
	Ldebug : function(msg) {
		if (NApi.debug.isDebug()) {
			console.log("[DEBUG] " + msg);
		}
	}
};


(function() {
	NApi.debug.enableDebugging();
})();

"use strict";

/** @namespace NApi.task
 * Параметры задания
 */
NApi.task = {
	/** @namespace NApi.task._
	 * Функционал, используемый только внутри модуля NApi.task
	 * @private
	 */
	_ : {},


	/** @function NApi.task.setTask
	 * Установить задание
	 * @param {String} text текст задания
	 * @param {String} analys текс разбора задания
	 * @param {String|Number|String[]|Number[]} answers правильные ответы
	 * @param {String|Number|String[]|Number[]} wrongAnswers неправильные ответы
	 * @param {String[]} tags теги
	 * @param {Function} checkAnswer функция проверки ответа
	 * @param {Function} draw функция отрисовки
	 */
	setTask : function(o) {
		window.vopr.podg();

		var text = o.text || "";
		var analys = o.analys || "";
		var answers = o.answers || [];
		var wrongAnswers = o.wrongAnswers || [];
		var checkAnswer = o.checkAnswer;
		var draw = o.draw;
		var tags = o.tags;

		if (NLib.getTypeOf(text) != "[object String]") {
			throw TypeError("Параметр text должен быть строкой");
		}

		if (NLib.getTypeOf(analys) != "[object String]") {
			throw TypeError("Параметр analys должен быть строкой");
		}

		if (checkAnswer != undefined && NLib.getTypeOf(checkAnswer) != "[object Function]") {
			throw TypeError("Параметр checkAnswer должен быть функцией или отсутствовать");
		}

		if (draw != undefined && NLib.getTypeOf(draw) != "[object Function]") {
			throw TypeError("Параметр draw должен быть функцией или отсутствовать");
		}

		if (tags != undefined && NLib.getTypeOf(tags) != "[object Array]") {
			throw TypeError("Параметр tags должен быть массивом строк или отсутствовать");
		}
		for (var t in tags) {
			if (NLib.getTypeOf(t) != "[object String]") {
				throw TypeError("Параметр tags (массив) должен содержать только строки");
			}
		}

		answers = NLib.toStringsArray(answers);
		wrongAnswers = NLib.toStringsArray(wrongAnswers);

		window.vopr.txt = text;
		window.vopr.rsh = analys;
		window.vopr.ver = answers;
		window.vopr.nev = wrongAnswers;
		if (checkAnswer) {
			window.vopr.vrn = checkAnswer;
		}
		if (draw) {
			window.vopr.dey = draw;
		}

		if (tags) {
			for (var t in tags) {
				window.vopr.kat[tags[t]] = 0;
			}
		}

		var voprcheck = dvig.validateVopr();
		if (voprcheck) {
			NApi._.Lwarn("Результат проверки вопроса:\n\t" + voprcheck);
		}
	}
}

"use strict";

/** @namespace NApi.ui
 * Работа с интерфейсом
 */
NApi.ui = {
	/** @namespace NApi.ui._
	 * Функционал, используемый только внутри модуля NApi.ui
	 * @private
	 */
	_ : {},
}

"use strict";

/** @namespace NApi.test
 * Тесты
 */
NApi.test = {
	/** @namespace NApi.test._
	 * Функционал, используемый только внутри модуля NApi.test
	 * @private
	 */
	_ : {},


	/** @function NApi.test.testTemplates
	 * Проверить шаблоны в текущем наборе
	 * @param {Number} triesCount кол-во прогонов каждого шаблона
	 * @param {Function} infoFunc функция вывода информационной строки
	 * @param {Function} warnFunc функция вывода предупреждающей строки
	 * @param {Function} errFunc функция вывода строки об ошибке
	 */
	testTemplates : function(p) {
		var infoFunc = p.infoFunc || NApi.Linfo;
		var warnFunc = p.warnFunc || NApi.Lwarn;
		var errFunc  = p.errFunc || NApi.Lerr;

		infoFunc("Проверка шаблонов в наборе '" + nabor.adres + "'");

		var errCount = 0;
		for (var category in nabor.upak){
			infoFunc("\tПроверка категории " + category);

			var errCountPerCat = 0;

			for (var templ in nabor.upak[category]) {
				if (templ != "main"){
					infoFunc("\t\tПроверка шаблона B1/" + templ);
					for (var i = p.triesCount || 10; i; i--) {
						try {
							nabor.upak[category][templ]();
							var checkResult = dvig.validateVopr();
							if (checkResult != "") {
								warnFunc("\t\t\t" + checkResult);
							}
						} catch (e) {
							errFunc("\t\t\tОшибка :" + e);
							errCountPerCat++;
						}
					}
				}
			}
			infoFunc("\tПроверка категории " + category + " закончена c " + errCountPerCat + " ошибками");
		}
		infoFunc("Проверка шаблонов в наборе '" + nabor.adres + "' закончена с " + errCount + " ошибками");
	}
}

"use strict";

/**
 * Алиас на NApi
 */
var NA = NApi;

/**
 * Алиас на NApi.info
 */
var NAinfo = NApi.info;


/**
 * Алиас на NApi.debug
 */
var NAdbg = NApi.debug;


/**
 * Алиас на NApi.task
 */
var NAtask = NApi.task;


/**
 * Алиас на NApi.ui
 */
var NAui = NApi.ui;


/**
 * алиас на napi.task
 */
var NAtask = NApi.task;


/**
 * Алиас на NApi.opt
 */
var NAopt = NApi.opt;


/**
 * Алиас на NApi.test
 */
var NAtest = NApi.test;


