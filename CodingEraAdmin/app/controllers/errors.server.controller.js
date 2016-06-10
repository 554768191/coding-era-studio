'use strict';


/**
 * Get unique error field name
 */
var getUniqueErrorMessage = function(err) {
	var output;

	try {
		var fieldName = err.err.substring(err.err.lastIndexOf('.$') + 2, err.err.lastIndexOf('_1'));
		output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';

	} catch (ex) {
		output = 'Unique field already exists';
	}

	return output;
};

/**
 * Get the error message from error object
 */
exports.getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = getUniqueErrorMessage(err);
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};


/**
 * api请求错误信息处理
 *
 * { "result" : "fail", "data" : "不允许访问" }
 *
 */
exports.apiErrorHandle = function(err, result, res) {
	if(err){
		res.status(400).send({
			message: err
		});
		return false;
	}
	if(result && result.result === 'fail'){
		res.status(400).send({
			message: result.data
		});
		return false;
	}
	return true;
};