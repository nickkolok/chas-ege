tools_loader = new Object;
tools_loader.calc = false;
tools_loader.init_funcs = [];
tools_loader.tools = {r3d:[], fcalc:[], graph:[]}
tools_loader.init = function(tool, func){
    tools_loader.tools[tool].push(func)
};
$(document).ready(function(){
    if (tools_loader.calc)
        $.getScript("/js/calc.js", function(){Calc()});
    if (tools_loader.tools['r3d'].length)
        $.getScript("/js/3drender.js", function(){for (var i in tools_loader.tools['r3d']) tools_loader.tools['r3d'][i]()});
    if (tools_loader.tools['fcalc'].length)
        $.getScript("/js/fcalc.js", function(){for (var i in tools_loader.tools['fcalc']) tools_loader.tools['fcalc'][i]()});
    if (tools_loader.tools['graph'].length)
        $.getScript("/js/graph.js", function(){for (var i in tools_loader.tools['graph']) tools_loader.tools['graph'][i]()});
    for (fnum in tools_loader.init_funcs){
        tools_loader.init_funcs[fnum]();
        }
});
flyout = new Object;
flyout.func = function(){};
flyout.overlay = null;
flyout.div = null;
flyout.show = function(query, func){
    flyout.func = func;
    flyout.overlay = $('<div style="background-color:rgba(0,0,0,0.5);position:fixed;top:0px;bottom:0px;left:0px;right:0px;z-index:100;opacity:0">');
    $('body').prepend(flyout.overlay);
    flyout.div = $('<div style="z-index:101;position:fixed;background:white;border:1px solid black;border-radius:10px;padding:10px;opacity:0">')
    flyout.overlay.animate({opacity:1}, 'fast');
    $.ajax({url:query, success:function(data){
        flyout.div.html(data);
        flyout.overlay.after(flyout.div);
        flyout.div.css('left', Math.round((flyout.overlay.width()-flyout.div.width())/2)+'px');
        flyout.div.css('top', Math.round((flyout.overlay.height()-flyout.div.height())/2)+'px');
        flyout.div.animate({opacity:1}, 'fast');
    }});
}
flyout.close = function(callback){
    if (callback!==undefined)
        flyout.func(callback);
    flyout.overlay.animate({opacity:0}, 'fast', function(){flyout.overlay.remove()});
    flyout.div.animate({opacity:0}, 'fast', function(){flyout.div.remove()});
    }
