/** ============================== Start ============================== */
JR.apikey('jr-demo-54beb0044ee6a01f303c798d89e');

/** ============================== Test ============================== */
JR.list('currencies').fetch(function(res) {
    QUnit.test('Static_List_Of_All_Currencies_Is_A_Large_List', function(assert) {
        assert.strictEqual(
            Object.keys(res).length >= 168,
            true,
            'size: ' + Object.keys(res).length + ' | response: ' + stringify(res)
        );
    });
});

/** ============================== Test ============================== */
JR.list('locales').fetch(function(res) {
    QUnit.test('Static_List_Of_All_Locales_Is_A_Large_List', function(assert) {
        assert.strictEqual(
            Object.keys(res).length >= 255,
            true,
            'size: ' + Object.keys(res).length + ' | response: ' + stringify(res)
        );
    });
});

/** ============================== Test ============================== */
JR.from('EUR').to('EUR').get(function(res) {
    QUnit.test('Rate_For_Same_Currencies_Is_Exactly_One', function(assert) {
        assert.strictEqual(
            res.rate,
            '1.00000000',
            'response: ' + stringify(res)
        );
    });
});

/** ============================== Test ============================== */
JR.from('XBT').to('GBP').get(function(res) {
    QUnit.test('Valid_From_To_Rate_Has_Eight_Decimal_Places', function(assert) {
        assert.strictEqual(
            res.rate.substring(res.rate.indexOf('.') + 1).length,
            8,
            'response: ' + stringify(res)
        );
    });
});

/** ============================== Test ============================== */
JR.base('JPY').get(function(res) {
    QUnit.test('All_Currencies_For_A_Base_Is_A_Large_List', function(assert) {
        assert.strictEqual(
            Object.keys(res.rates).length > 150,
            true,
            'size: ' + Object.keys(res.rates).length + ' | response: ' + stringify(res)
        );
    });
});

/** ============================== Test ============================== */
JR.from('USD').to('EURR').get(function(res) {
    QUnit.test('Unknown_Currency_For_Get_Delivers_An_Error', function(assert) {
        assert.strictEqual(
            res.message,
            'currency EURR does not exist',
            'response: ' + res
        );
    });
});

/** ============================== Test ============================== */
JR.from('XBT').to('USD').amount(1).convert(function(res) {
    QUnit.test('Converting_One_XBT_To_USD', function(assert) {
        assert.strictEqual(
            res.amount > 100,
            true,
            'Value is greater than hundred => response: ' + stringify(res)
        );
        assert.strictEqual(
            res.amount.indexOf('.') > -1,
            true,
            'Value contains a dot => response: ' + stringify(res)
        );
    });
});

/** ============================== Test ============================== */
JR.from('JPY').to('SAR').date('2015-01-01').historical(function(res) {
    QUnit.test('Historical_Rate_For_Specific_Currencies_Is_Always_The_Same', function(assert) {
        assert.strictEqual(
            res.rates['2015-01-01'].rate,
            '0.03132084',
            'Rate is exactly correct => response: ' + stringify(res)
        );
        assert.strictEqual(
            res.rates['2015-01-01'].utctime,
            '2015-01-01T23:50:02+01:00',
            'Utctime is exactly correct => response: ' + stringify(res)
        );
    });
});

/** ============================== Test ============================== */
JR.from('JPY').to('SAR').dateStart('2015-01-01').dateEnd('2015-01-04').historical(function(res) {
    QUnit.test('Historical_Rates_For_Four_Days_Gets_Four_Result_Objects', function(assert) {
        assert.strictEqual(
            Object.keys(res.rates).length === 4,
            true,
            'Three result objects are available => response: ' + stringify(res)
        );
        assert.strictEqual(
            res.rates['2015-01-02'].rate,
            '0.03115948',
            'Rate of second day is exactly correct => response: ' + stringify(res)
        );
        assert.strictEqual(
            res.rates['2015-01-03'].utctime,
            '2015-01-03T23:50:02+01:00',
            'Utctime of third day is exactly correct => response: ' + stringify(res)
        );
    });
});

/** ============================== Test ============================== */
JR.from('de_DE').to('en_US').locale(function(res) {
    QUnit.test('Rate_For_Two_Valid_Locales_Has_Eight_Decimal_Places', function(assert) {
        assert.strictEqual(
            res.rate.substring(res.rate.indexOf('.') + 1).length,
            8,
            'response: ' + stringify(res)
        );
    });
});

/** ============================== Test ============================== */
JR.from('de_DE').to('de_DE').locale(function(res) {
    QUnit.test('Rate_For_Same_Locales_Is_Exactly_One', function(assert) {
        assert.strictEqual(
            res.rate,
            '1.00000000',
            'response: ' + stringify(res)
        );
    });
});

/** ============================== Helper ============================== */
var stringify = function(json) {
    return JSON.stringify(json).replace(/,/g, ', ');
};