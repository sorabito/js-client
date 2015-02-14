/**
 * JavaScript client for jsonrates.com
 * Currency exchange rates and conversion API
 * Core functionality for API interaction
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
            dateEnd: null,
            list: null
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
     * Set the list
     * @param {string} list
     * @return {JR}
     */
    exports.list = function(list) {
        params.list = list;
        
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
            response = new Error(response.error);
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
            case 'fetch':
                fetch.callback(func, response);
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
            func(getResult(rsp, rsp.rate, rsp.rates));
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
            func(getResult(rsp, rsp.amount, rsp.amounts));
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
            func(getResult(rsp, rsp.rates, rsp.rates));
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
            func(getResult(rsp, rsp.rate, rsp.rates));
        }
    };
    
    /**
     * Fetch static lists
     */
    var fetch = {
        
        /**
         * Build the url to fetch the static list
         * @param {string} url The prepared url in API endpoint format
         * @return {string} The new url for the call
         */
        getUrl: function(url) {
            return url.replace('fetch/?list=', '').replace('&', '.json?');
        },
        
        /**
         * Execute the fetch-request
         * @param {function} func Callback function from the caller
         */
        perform: function(func) {
            send('fetch', func, {
                list: params.list
            });
        },
        
        /**
         * Process the fetch-callback
         * @param {function} func Callback function from the caller
         * @param {object} rsp Response from the request
         */
        callback: function(func, rsp) {
            func(getResult(rsp, rsp, rsp));
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
        url = (endpoint != 'fetch') ? url : fetch.getUrl(url);
        JREQUEST.execute(url);
    };
    
    /**
     * Detect from the response the result or the error
     * @param {object} responseOrError The original response
     * @param {object} resultIfDefined The result, if this value is defined
     * @param {object} resultIfUndefined The result, if the second parameter is undefined
     * @return {object} The detected result object (Error or String or JSONObject)
     */
    var getResult = function(responseOrError, resultIfDefined, resultIfUndefined) {
        if (Object.prototype.toString.call(responseOrError) === '[object Error]') {
            return responseOrError;
        }
        if (typeof resultIfDefined !== 'undefined') {
            return resultIfDefined;
        }
        return resultIfUndefined;
    };
    
    exports.get = get.perform;
    exports.convert = convert.perform;
    exports.historical = historical.perform;
    exports.locale = locale.perform;
    exports.fetch = fetch.perform;
    
    return exports;
})();