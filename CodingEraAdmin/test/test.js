/**
 * Created by Jason on 15/12/5.
 *
 * 测试驱动开发
 * mohca see http://mochajs.org/
 *
 * 用法
 * $ npm install -g mocha
 * $ mocha tes/test.js
 */


var Assert = require('assert');
var Asserts = require('asserts');
var path = require('path');

//测试写法一
describe('Array', function() {
    describe('#indexOf()', function () {
        //断言
        it('should return -1 when the value is not present', function () {
            Assert.equal(-1, [1,2,3].indexOf(5));
            Assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});

//测试写法二
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
