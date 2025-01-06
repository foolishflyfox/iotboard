import type { IMatrixData } from 'leafer-editor';

/**
 * 获取水平方向的缩放因子（X 轴的缩放比例）
 */
export function getScaleX(matrixData: IMatrixData) {
  return matrixData.a;
}

/**
 * 获取垂直方向的缩放因子（Y 轴的缩放比例）
 */
export function getScaleY(matrixData: IMatrixData) {
  return matrixData.d;
}

/**
 * X 轴方向的倾斜因子（垂直倾斜变换，影响水平方向）
 */
export function getSkewX(matrixData: IMatrixData) {
  return matrixData.c;
}

/**
 * Y 轴方向的倾斜因子（水平倾斜变换，影响垂直方向）
 */
export function getSkewY(matrixData: IMatrixData) {
  return matrixData.b;
}

export function getTranslateX(matrixData: IMatrixData) {
  return matrixData.e;
}

export function getTrarnslateY(matrixData: IMatrixData) {
  return matrixData.f;
}
