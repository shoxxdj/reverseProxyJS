#NodeJS Based Reverse Proxy

2 files : 

 1. admin.js to configure the Reverse Proxy
 2. reveseProxy.js for most obvious job

####Admin.js

> node admin.js 

This one is used to configure the reverse proxy.
2 options : 
	-a to add an entry
	-l to list all entries

####reverseProxy.js

By Default it listen on port 80.
You have to specify a default port / host to redirect bad requests.

###Quick Install
>git clone https://github.com/shoxxdj/reverseProxyJS.git

>cd reverseProxyJS

>npm install

>node admin.js

>node admin.js -a #add your website

>sudo node reverseProxy.js


