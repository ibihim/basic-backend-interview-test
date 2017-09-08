'use strict';

const ROOT = '../..';
const Neo = require(`${ ROOT }/models/Neo`);
const {
          yearWithMostNeosAggregateObj,
          yearWithMostHazardousNeosAggregateObj,
          monthWithMostNeosAggregateObj,
          monthWithMostHazardousNeosAggregateObj
      } = require(`${ ROOT }/lib/neo/aggregate-queries`);

const findNeo        = param => Neo.find(param);
const findFastestNeo = param => findNeo(param).sort({ speed: -1 });

const getYearWithMostNeos = ({ isHazardous }) => {
    const aggregateObj = isHazardous
                         ? yearWithMostHazardousNeosAggregateObj
                         : yearWithMostNeosAggregateObj;

    return Neo.aggregate(aggregateObj).then(
        ([{ _id: year, count }]) => (
            { year, count }
        ));
};

const getMonthWithMostNeos = ({ isHazardous }) => {
    const aggregateObj = isHazardous
                         ? monthWithMostHazardousNeosAggregateObj
                         : monthWithMostNeosAggregateObj;

    return Neo.aggregate(aggregateObj).then(
        ([{ _id: { month, year }, count }]) => (
            { month, year, count }
        )
    );
};

module.exports = {
    findNeo,
    findFastestNeo,
    getYearWithMostNeos,
    getMonthWithMostNeos
};
