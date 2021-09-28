// 'use strict';

import { handler } from './lambda_handler'
// const handler = require('lambda_handler.js');
require('dotenv').config();

import Web3 from 'web3';
// const Web3 = require('web3');
import moment from 'moment';
// const moment = require('moment');
// const _ = require('lodash');
import _ from 'lodash';
import { EthDater } from './ethereum-block-by-date';
// const EthDater = require('./ethereum-block-by-date.js');
import { delayTime } from './config';
// const { delayTime } = require('./config');

const archiveNodeUrl = process.env.ARCHIVENODE_ENDPOINT;
const infuraUrl = process.env.WEB3_ENDPOINT_HTTPS;
const archiveNodeWeb3 = new Web3(archiveNodeUrl);
const infuraWeb3 = new Web3(infuraUrl);
const blocks = new EthDater(archiveNodeWeb3, delayTime);

let currentBlockNbr;
let oneDayAgoBlock;
let threeDaysAgoBlock;
let oneWeekAgoBlock;
let oneMonthAgoBlock;
let nbrBlocksInDay;
const oneDayAgo = moment().subtract(1, 'days').valueOf();
const threeDaysAgo = moment().subtract(3, 'days').valueOf();
const oneWeekAgo = moment().subtract(1, 'weeks').valueOf();
const oneMonthAgo = moment().subtract(1, 'months').valueOf();

//const nbrBlocksInDay = currentBlockNbr - oneDayAgoBlock;

const getBlockDelta = async (previousValue, currentValue, previousBlockNbr) => {
    if (!previousValue) {
      return 0;
    }
    const blockDelta = currentBlockNbr - previousBlockNbr;
    const returnSincePrevBlock = (currentValue - previousValue) / previousValue;
    const blockDays = blockDelta / nbrBlocksInDay;
    const checkBlockDelta = 100 * ((1 + returnSincePrevBlock) ** (365.2425 / blockDays) - 1);
    const safeBlockDelta = blockDelta / nbrBlocksInDay;
    return safeBlockDelta;
  };

  module.exports.handler = handler(async () => {
  console.log('Fetching historical blocks');
  currentBlockNbr = await infuraWeb3.eth.getBlockNumber();
  oneDayAgoBlock = (await blocks.getDate(oneDayAgo)).block;
  threeDaysAgoBlock = (await blocks.getDate(threeDaysAgo)).block;
  oneWeekAgoBlock = (await blocks.getDate(oneWeekAgo)).block;
  oneMonthAgoBlock = (await blocks.getDate(oneMonthAgo)).block;
  nbrBlocksInDay = currentBlockNbr - oneDayAgoBlock;
  console.log('Done fetching historical blocks');

});
