Stay up to date by following @apilayernet on Twitter.
____________

JavaScript client for the currencylayer API
=========

Currencylayer is a free, powerful REST-based JSON API offering accurate and reliable spot exchange rates (quotes) for 168 world currencies & precious metals.

Website: [currencylayer.com](https://currencylayer.com/)  

Installation
-----
Download the file [`currencylayer.min.js`](/currencylayer.min.js) and include it in your website:
``` html
<script src="currencylayer.min.js"></script>
```
Set your API Access Key:
``` js
CL.access_key('YOUR_ACCESS_KEY');
```

Usage examples
-----

**"live" endpoint - request real-time quotes**

``` js
/* Example: USDEUR */
CL.source('USD').currencies('EUR').live(function(result) {
    console.log('USDEUR: ' + result.quotes.USDEUR);
});
```

<br>

**"historical" endpoint - request historical quotes**

``` js
/* Example: USDEUR on October 10th, 2001 */
CL.source('USD').currencies('EUR').date('2001-10-10').historical(function(result) {
    console.log('USDEUR on 2001-10-10: ' + result.quotes.USDEUR);
});
```

<br>

**"convert" endpoint - convert currencies**

``` js
/* Example: Convert USD 10 to EUR */
CL.from('USD').to('EUR').amount('10').convert(function(result) {
    console.log('USD 10 in EUR: ' + result.result);
});
```

<br>

**"timeframe" endpoint - request quotes for a specific timeframe**

``` js
/* Example: USDEUR quotes between October and November 2010  */
CL.source('USD').currencies('EUR').start_date('2010-10-01').end_date('2010-11-01').timeframe(function(result) {
    console.log('Quotes: ' + result.quotes);
});
```

<br>

**"change" endpoint - request change parameters for a specific timeframe**

``` js
/* Example: USDEUR change between the years 2010 and 2015  */
CL.source('USD').currencies('EUR').start_date('2010-01-01').end_date('2015-01-01').change(function(result) {
    console.log('USDEUR change between 2010-2015: ' + result.quotes.USDEUR.change);
});
```

API Documentation
-----
See: [currencylayer.com/documentation](https://currencylayer.com/documentation)

Get Free API Access
-----
Start using the currencylayer API for free: [currencylayer.com/product](https://currencylayer.com/product)
