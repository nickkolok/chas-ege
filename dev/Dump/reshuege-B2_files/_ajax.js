function get_http_object()
{
	var xmlHttp;
	try
	{
		// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();
	}
	catch (e)
	{
		// Internet Explorer
		try
		{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{
				alert("Your browser does not support AJAX!");
				return false;
			}
		}
	}
	return xmlHttp;
}
var ajax_busy = false;
var query_len = 0;
function update_div(url, div_name)
{
area = document.getElementById(div_name);
if (!area)return;
xml_http = get_http_object();
xml_http.open('POST', url + "&rnd=" + Math.ceil(Math.random() * 10000), true);
xml_http.onreadystatechange = function(){if (xml_http.readyState == 4) {area.innerHTML = xml_http.responseText; after_ajax()}}
xml_http.send(null);
}
function update_div_post(url, data, div_name)
{
if (ajax_busy) {
if (query_len > 300) return;
query_len++;
window.setTimeout(function(){update_div_post(url, data, div_name)}, 100);
return;}
if (query_len > 0) query_len--;
ajax_busy = true;
area = document.getElementById(div_name);
if (!area)return;
params = 'body=' + encodeURIComponent(data);
xml_http = get_http_object();
xml_http.open('POST', url + "&rnd=" + Math.ceil(Math.random() * 10000), true);
xml_http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xml_http.setRequestHeader("Content-length", params.length);
xml_http.setRequestHeader("Connection", "close");
xml_http.onreadystatechange = function(){if (xml_http.readyState == 4) area.innerHTML = xml_http.responseText;ajax_busy = false;after_ajax()}
xml_http.send(params);
}
function update_div_mpost(url, data, div_name)
{
if (typeof div_name == 'string')
area = document.getElementById(div_name);
else
area = div_name;
if (!area)return;
params = data;
xml_http = get_http_object();
xml_http.open('POST', url + "&rnd=" + Math.ceil(Math.random() * 10000), true);
xml_http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xml_http.setRequestHeader("Content-length", params.length);
xml_http.setRequestHeader("Connection", "close");
xml_http.onreadystatechange = function(){if (xml_http.readyState == 4) {area.innerHTML = xml_http.responseText;after_ajax()}}
xml_http.send(params);
}
function update_div_show(url, div_name)
{
area = document.getElementById(div_name);
if (!area)return;
xml_http = get_http_object();
xml_http.onreadystatechange = function(){if (xml_http.readyState == 4){area.innerHTML = xml_http.responseText;area.style.display='';after_ajax()}}
xml_http.open('GET', url + "&rnd=" + Math.ceil(Math.random() * 10000));
xml_http.send(null);
}
function update_div_call(url, div_name, passed_function)
{
if (ajax_busy) {
if (query_len > 50) return;
query_len++;
window.setTimeout(function(){update_div_call(url, div_name, passed_function)}, 100);
return;}
if (query_len > 0) query_len--;
ajax_busy = true;
area = document.getElementById(div_name);
if (!area)return;
xml_http = get_http_object();
xml_http.open('GET', url + "&rnd=" + Math.ceil(Math.random() * 10000), true);
xml_http.onreadystatechange = function(){if (xml_http.readyState == 4) {area.innerHTML = xml_http.responseText;ajax_busy = false; passed_function();after_ajax();}}
xml_http.send(null);
}
function update_div_pcall(url, data, div_name, passed_function)
{
if (ajax_busy) {
if (query_len > 50) return;
query_len++;
window.setTimeout(function(){updtwo(url, div_name)}, 100);
return;}
if (query_len > 0) query_len--;
ajax_busy = true;
area = document.getElementById(div_name);
if (!area)return;
xml_http = get_http_object();
xml_http.open('POST', url + "&rnd=" + Math.ceil(Math.random() * 10000), true);
xml_http.onreadystatechange = function(){if (xml_http.readyState == 4) {area.innerHTML = xml_http.responseText;ajax_busy = false; passed_function();after_ajax()}}
xml_http.setRequestHeader("Connection", "close");
xml_http.setRequestHeader("Content-length", data.length);
xml_http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xml_http.send(data);
}
function update_call(url, passed_function)
{
if (ajax_busy) {
if (query_len > 50) return;
query_len++;
window.setTimeout(function(){update_call(url, passed_function)}, 100);
return;}
if (query_len > 0) query_len--;
ajax_busy = true;
xml_http = get_http_object();
xml_http.open('GET', url + "&rnd=" + Math.ceil(Math.random() * 10000), true);
xml_http.onreadystatechange = function(){if (xml_http.readyState == 4) {ajax_busy = false; passed_function(xml_http.responseText); after_ajax()}}
xml_http.send(null);
}
cache = new Object()

function update_div_cache(url, div_name)
{
area = document.getElementById(div_name);
if (cache[url]){
area.innerHTML = cache[url];
return;
}
if (!area)return;
document.body.style.cursor = 'wait';
xml_http = get_http_object();
xml_http.open('POST', url + "&rnd=" + Math.ceil(Math.random() * 10000), true);
xml_http.onreadystatechange = function(){if (xml_http.readyState == 4) {area.innerHTML = xml_http.responseText; cache[url] = xml_http.responseText;document.body.style.cursor = 'default'; after_ajax()}}
xml_http.send(null);
}
function after_ajax(){

	}
