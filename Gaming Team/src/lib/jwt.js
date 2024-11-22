import jsonWebToken from 'jsonwebtoken';
import util from 'util';

const verify = util.promisify(jsonWebToken.verify);
const sign = util.promisify(jsonWebToken.sign);

const jwt = {
	verify,
	sign,
};

export default jwt;
