/**
 * Created by Jason on 15/12/5.
 */


var Assert = require('assert');
var Asserts = require('asserts');
var path = require('path');

/*describe('path', function() {

    it('path output', function () {
        console.log(path.join("web", '/app/!**!/!*.module.js'));
    });
});*/

describe('Array', function() {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            Assert.equal(-1, [1,2,3].indexOf(5));
            Assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});

/*Asserts({
    foo : function() {
        Assert.equal("something", "something", "optional message");
        Assert.equal(2, 2);
    },
    barf : {
        ing : function () {
            Assert.equal(1, 2, "okay");
        },
        ed : function() {
            Assert.equal(2, 2, "yep");
        }
    }
});*/
