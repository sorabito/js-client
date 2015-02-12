/** ============================== Test ============================== */
JR.from('EUR').to('EUR').get(function(res) {
    QUnit.test('Rate_For_Same_Currencies_Is_Exactly_One', function(assert) {
        assert.strictEqual(
            res,
            '1.00000000',
            'response: ' + res
        );
    });
});

/** ============================== Test ============================== */
JR.from('XBT').to('GBP').get(function(res) {
    QUnit.test('Valid_From_To_Rate_Has_Eight_Decimal_Places', function(assert) {
        assert.strictEqual(
            res.substring(res.indexOf('.') + 1).length,
            8,
            'response: ' + res
        );
    });
});

/** ============================== Test ============================== */
JR.base('JPY').get(function(res) {
    QUnit.test('All_Currencies_For_A_Base_Is_A_Large_List', function(assert) {
        assert.strictEqual(
            Object.keys(res).length > 150,
            true,
            'size: ' + Object.keys(res).length + ' | response: ' + stringify(res)
        );
    });
});

/** ============================== Helper ============================== */
var stringify = function(json) {
    return JSON.stringify(json).replace(/,/g, ', ');
}