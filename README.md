JavaScript client for jsonrates.com
=========

Website: [jsonrates.com](http://jsonrates.com/)  
The API documentation can be found at: [jsonrates.com/docs](http://jsonrates.com/docs/)

Installation
-----
Download the file [`jsonrates.min.js`](/jsonrates.min.js) and include it in your website:
``` html
<script src="jsonrates.min.js"></script>
```

Usage
-----
``` js
JR.from('EUR').to('USD').get(function(rate) {
    console.log('Exchange rate is: ' + rate);
});
```
