
**Important**

We're happy to announce the integration of [jsonrates](http://jsonrates.com) into the [currencylayer API](https://currencylayer.com/). 

You may resume your free API access by [signing up here](https://currencylayer.com?ref=jsonrates). Please note that the current jsonrates API has been **deprecated** and will become unavailable by June 30th 23:59:59 PM London time. 

[Read more](http://jsonrates.com/about)

*This Github Repository has been deprecated and will be adjusted to work with the currencylayer API shortly.*

____________



JavaScript client for jsonrates.com
=========

Real-time and reliable exchange rates for over 170 currencies.  
Different endpoints to interact are available through a simple and fast JSON API.  

Website: [jsonrates.com](http://jsonrates.com/)  

Installation
-----
Download the file [`jsonrates.min.js`](/jsonrates.min.js) and include it in your website:
``` html
<script src="jsonrates.min.js"></script>
```
Set your API key before first usage:
``` js
JR.apikey('YOUR-API-KEY');
```

Usage examples
-----
``` js
/* Get the current exchange rate
   from Euro to US Dollar */
JR.from('EUR').to('USD').get(function(result) {
    console.log('Exchange rate is: ' + result.rate);
});

/* Convert 2.5 Pound Sterling
   to all available currencies */
JR.base('GBP').amount(2.5).convert(function(result) {
    console.log('Converted amounts are: ' + result.amounts);
});

/* Get the historical exchange rates
   for 3 days in January 2015 */
JR.from('USD').to('CHF').dateStart('2015-01-01').dateEnd('2015-01-03').historical(function(result) {
    console.log('Historical rates are: ' + result.rates);
});

/* Get the current exchange rate
   from the locale de_DE to en_US */
JR.from('de_DE').to('en_US').locale(function(result) {
    console.log('Exchange rate is: ' + result.rate);
});
```

API Documentation
-----
See: [jsonrates.com/docs](http://jsonrates.com/docs/)
