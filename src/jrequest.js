/**
 * JavaScript client for jsonrates.com
 * Currency exchange rates and conversion API
 * Execute API calls and handle the callbacks
 * @author Jamil Soufan (@jamsouf)
 * @link http://jsonrates.com/
 */
var JREQUEST = (function() {
    
    /**
     * Constants
     */
    var ENDPOINT = 'http://jsonrates.com/{endpoint}/';
    var CALLBACK_NAME = 'callback';
    
    /**
     * Container for public objects
     */
    var exports = {};
    
    /**
     * Counter for the created unique callback functions
     */
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