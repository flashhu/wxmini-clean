// ---- 预约服务 ----
export const SERVICE_MAP = {
  's': '溯源检测',
  'c': 'CMA检测',
  'g': '国标治理',
  'm': '母婴治理'
}

/**
 * 产品单价
 */
export const PER_PRICE = {
  's': 99,
  'c': 299,
  'g': 0.07 * 189,
  'm': 0.09 * 189
};

/**
 * 每平米治理费用
 */
export const GOVERN_PER_COST = 6;

/**
 * 工程师可选类型
 */
export const PERSON_TYPES = ['高级+中级', '高级+高级'];

/**
 * 工程师时薪
 * 0: 中+高  1: 高+高
 */
export const PERSON_SALARY = [290, 320];
/**
 * 工程师起步出场费
 */
export const PERSON_BASE = [1120, 1280];

/**
 * 起步治理面积
 */
export const MIN_AREA = 50;

/**
 * 保费比率
 */
export const INSURE_RATE = 0.03;