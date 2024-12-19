export interface ThemeOption {
  /**
   * 背景颜色
   */
  backgroundColor: string

  /**
   * 文字颜色
   */
  textColor: string

  /**
   * 边框颜色
   */
  borderColor: string

  /**
   * 高亮颜色
   */
  highlightColor: string
}

export interface RulerConfig {
  /**
   * 是否启用标尺线
   */
  enabled: boolean
  /**
   * 标尺线主题
   */
  theme: string
}

export interface RulerOptions {
  /**
   * 标尺宽高
   */
  ruleSize?: number;
  /**
   * 字体大小
   */
  fontSize?: number;
  /**
   * 主题，默认存在明亮、暗黑主图
   */
  themes?: Map<string, ThemeOption>;
}
