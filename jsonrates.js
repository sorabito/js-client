/**
 * Javascript client for jsonrates.com
 * Currency exchange rates and conversion API
 * @version 1.0.0
 * @author Jamil Soufan (@jamsouf)
 * @link http://jsonrates.com/
 */
var JR = (function() {
    
    /**
     * Container for public objects
     */
    var exports = {};
    
    /**
     * All available API request parameters
     */
    var params = {
            base: null,
            from: null,
            to: null,
            amount: null,
            inverse: null,
            date: null,
            dateStart: null,
            dateEnd: null
    };
    
    /**
     * Set the base-currency
     * @param {string} base
     * @return {JR}
     */
    exports.base = function(base) {
        params.base = base;
        params.from = null;
        params.to = null;
        
        return this;
    };
    
    /**
     * Set the from-currency
     * @param {string} from
     * @return {JR}
     */
    exports.from = function(from) {
        params.from = from;
        params.base = null;
        
        return this;
    };
    
    /**
     * Set the to-currency
     * @param {string} to
     * @return {JR}
     */
    exports.to = function(to) {
        params.to = to;
        params.base = null;
        
        return this;
    };
    
    /**
     * Set the amount
     * @param {number} amount
     * @return {JR}
     */
    exports.amount = function(amount) {
        params.amount = amount;
        
        return this;
    };
    
    /**
     * Set the inverse
     * @param {string} inverse
     * @return {JR}
     */
    exports.inverse = function(inverse) {
        params.inverse = inverse;
        
        return this;
    };
    
    /**
     * Set the date
     * @param {string} date
     * @return {JR}
     */
    exports.date = function(date) {
        params.date = date;
        params.dateStart = null;
        params.dateEnd = null;
        
        return this;
    };
    
    /**
     * Set the date-start
     * @param {string} dateStart
     * @return {JR}
     */
    exports.dateStart = function(dateStart) {
        params.dateStart = dateStart;
        params.date = null;
        
        return this;
    };
    
    /**
     * Set the date-end
     * @param {string} dateEnd
     * @return {JR}
     */
    exports.dateEnd = function(dateEnd) {
        params.dateEnd = dateEnd;
        params.date = null;
        
        return this;
    };
    
    /**
     * Process the request-callback
     * @param {number} reqid Request ID
     * @param {string} endpoint The requested endpoint
     * @param {function} func Callback function from the caller
     * @param {object} response Response from the request
     * @return {JR}
     */
    exports.callback = function(reqid, endpoint, func, response) {
        JREQUEST.delete(reqid);
        
        if (typeof response.error !== 'undefined') {
            throw 'JR-ERROR: ' + response.error;
        }
        
        switch(endpoint) {
            case 'get':
                get.callback(func, response);
                break;
            case 'convert':
                convert.callback(func, response);
                break;
            case 'historical':
                historical.callback(func, response);
                break;
            case 'locale':
                locale.callback(func, response);
                break;
        }
    };
    
    /**
     * API-endpoint get()
     */
    var get = {
        
        /**
         * Execute the get-request
         * @param {function} func Callback function from the caller
         */
        perform: function(func) {
            send('get', func, {
                base: params.base,
                from: params.from,
                to: params.to
            });
        },
        
        /**
         * Process the get-callback
         * @param {function} func Callback function from the caller
         * @param {object} rsp Response from the request
         */
        callback: function(func, rsp) {
            var result = params.base === null ? rsp.rate : rsp.rates;
            func(result);
        }
    };
    
    /**
     * API-endpoint convert()
     */
    var convert = {
        
        /**
         * Execute the convert-request
         * @param {function} func Callback function from the caller
         */
        perform: function(func) {
            send('convert', func, {
                base: params.base,
                from: params.from,
                to: params.to,
                amount: params.amount,
                inverse: params.inverse
            });
        },
        
        /**
         * Process the convert-callback
         * @param {function} func Callback function from the caller
         * @param {object} rsp Response from the request
         */
        callback: function(func, rsp) {
            var result =  params.base === null ? rsp.amount : rsp.amounts;
            func(result);
        }
    };
    
    /**
     * API-endpoint historical()
     */
    var historical = {
        
        /**
         * Execute the historical-request
         * @param {function} func Callback function from the caller
         */
        perform: function(func) {
            send('historical', func, {
                base: params.base,
                from: params.from,
                to: params.to,
                date: params.date,
                dateStart: params.dateStart,
                dateEnd: params.dateEnd
            });
        },
        
        /**
         * Process the historical-callback
         * @param {function} func Callback function from the caller
         * @param {object} rsp Response from the request
         */
        callback: function(func, rsp) {
            var result =  rsp.rates;
            func(result);
        }
    };
    
    /**
     * API-endpoint locale()
     */
    var locale = {
        
        /**
         * Execute the locale-request
         * @param {function} func Callback function from the caller
         */
        perform: function(func) {
            send('locale', func, {
                base: params.base,
                from: params.from,
                to: params.to
            });
        },
        
        /**
         * Process the locale-callback
         * @param {function} func Callback function from the caller
         * @param {object} rsp Response from the request
         */
        callback: function(func, rsp) {
            var result =  params.base === null ? rsp.rate : rsp.rates;
            func(result);
        }
    };
    
    /**
     * Send the API request
     * @param {string} endpoint Endpoint of the request
     * @param {function} func Callback function from the caller
     * @param {object} params Parameters of the request
     */
    var send = function(endpoint, func, params) {
        var url = JREQUEST.create(endpoint, func, params);
        JREQUEST.execute(url);
    };
    
    exports.get = get.perform;
    exports.convert = convert.perform;
    exports.historical = historical.perform;
    exports.locale = locale.perform;
    
    return exports;
})();

/**
 * Handle and execute API calls
 * for jsonrates.com
 */
var JREQUEST = (function() {
    
    var ENDPOINT = 'http://jsonrates.com/{endpoint}/';
    var CALLBACK_NAME = 'callback';
    var exports = {};
    var cntr = 0;
    
    /**
     * Prepare a new API call
     * Create a callback-function und build the url
     * @param {string} endpoint Endpoint of the request
     * @param {function} func Callback function from the caller
     * @param {object} params Parameters of the request
     * @return {string} Full url with query-parameters for the call
     */
    exports.create = function(endpoint, func, params) {
        params.callback = createCallback(endpoint, func);
        var query = buildQuery(params);
        
        return  ENDPOINT.replace('{endpoint}', endpoint) + '?' + query;
    };
    
    /**
     * Execute the jsonp rest call
     * @param {string} url The url to request
     */
    exports.execute = function(url) {
        var script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);
    };
    
    /**
     * Delete the created callback-function from the finished request
     * @param {number} reqid ID of the request
     */
    exports.delete = function(reqid) {
        var name = CALLBACK_NAME + reqid;
        delete JREQUEST[name];
    };
    
    /**
     * Create for every request an unique callback-function
     * @param {string} endpoint Endpoint of the request
     * @param {function} func Callback function from the caller
     * @return {string} Unique full-qualified name of the callback-function for jsonp
     */
    var createCallback = function(endpoint, func) {
        cntr++;
        var reqid = cntr;
        var name = CALLBACK_NAME + reqid;
        
        JREQUEST[name] = function(response) {
            JR.callback(reqid, endpoint, func, response);
        };
        
        return 'JREQUEST.' + name;
    };
    
    /**
     * Build with the parameters the query-string
     * @param {object} params Parameters of the request
     * @return {string} Query-string with the concatenated parameters
     */
    var buildQuery = function(params) {
        var res = '';
        for (var key in params) {
            var value = params[key];
            if (value !== null) {
                res = (res != '') ? res + '&' : res;
                res = res + key + '=' + value;
            }
        }
        
        return res;
    };
    
    return exports;
})();