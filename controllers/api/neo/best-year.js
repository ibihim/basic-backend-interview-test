'use strict';

const router = require('express').Router();

const ROOT                     = '../../..';
const { getYearWithMostNeos }  = require(`${ ROOT }/lib/neo`);
const {
          controllerErrHandler,
          controllerOkHandler,
          simpleQueryValidation
      } = require(`${ ROOT }/lib/utils`);

router.get('/', (req, res) => {
    getYearWithMostNeos(simpleQueryValidation(req))
        .then(controllerOkHandler(res))
        .catch(controllerErrHandler(res));
});

module.exports = router;
