import Automizer from './automizer';

export default Automizer;

import ModifyHelper from './helper/modify-helper';
const dump = ModifyHelper.dump;
const setAttribute = ModifyHelper.setAttribute;

import ModifyShapeHelper from './helper/modify-shape-helper';
const setSolidFill = ModifyShapeHelper.setSolidFill;
const setText = ModifyShapeHelper.setText;
const replaceText = ModifyShapeHelper.replaceText;
const setPosition = ModifyShapeHelper.setPosition;

import ModifyTableHelper from './helper/modify-table-helper';
const setTableData = ModifyTableHelper.setTableData;
const adjustHeight = ModifyTableHelper.adjustHeight;
const adjustWidth = ModifyTableHelper.adjustWidth;
const setTable = ModifyTableHelper.setTable;

import ModifyChartHelper from './helper/modify-chart-helper';
const setChartData = ModifyChartHelper.setChartData;
const setChartVerticalLines = ModifyChartHelper.setChartVerticalLines;
const setChartScatter = ModifyChartHelper.setChartScatter;
const setChartBubbles = ModifyChartHelper.setChartBubbles;
const setChartCombo = ModifyChartHelper.setChartCombo;

import { AutomizerSummary } from './types/types';
export type { AutomizerSummary };

import { ModifyTableParams, TableData, TableRow, TableRowStyle } from './types/table-types';
import {ChartBubble, ChartCategory, ChartData, ChartSeries, ChartValueStyle } from './types/chart-types';
import {Color, ReplaceText, TextStyle } from './types/modify-types';
import { ShapeCoordinates } from './types/shape-types';

export type {
  ChartBubble, ChartCategory, ChartSeries,
  TableData, TableRow,
  TextStyle,
  ModifyTableParams,
  TableRowStyle,
  ChartData,
  ChartValueStyle,
  Color,
  ShapeCoordinates,
  ReplaceText
};

export {
  Automizer,
  ModifyHelper,
  ModifyShapeHelper,
  ModifyTableHelper,
  ModifyChartHelper,
};

export const modify = {
  dump,
  setAttribute,
  setSolidFill,
  setText,
  replaceText,
  setPosition,
  setTableData,
  adjustHeight,
  adjustWidth,
  setTable,
  setChartData,
  setChartVerticalLines,
  setChartScatter,
  setChartCombo,
  setChartBubbles,
};
