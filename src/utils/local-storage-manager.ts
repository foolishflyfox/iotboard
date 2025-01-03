class LocalStorageManager {
  private readonly UI_ITEM_KEY = 'mimic_ui_clipboard';

  /**
   * 保存 UI JSON 数据到 localStorage
   * @param data UI 的 JSON 数据
   */
  saveUi(data: any): void {
    try {
      localStorage.setItem(this.UI_ITEM_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('保存 UI 数据到 localStorage 失败:', error);
    }
  }

  /**
   * 从 localStorage 获取 UI JSON 数据
   * @returns UI 的 JSON 数据，如果不存在则返回 null
   */
  getUi(): any | null {
    try {
      const data = localStorage.getItem(this.UI_ITEM_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('从 localStorage 获取 UI 数据失败:', error);
      return null;
    }
  }

  /**
   * 从 localStorage 删除 UI JSON 数据
   */
  clearUi(): void {
    try {
      localStorage.removeItem(this.UI_ITEM_KEY);
    } catch (error) {
      console.error('删除 localStorage 中的 UI 数据失败:', error);
    }
  }
}

// 导出单例实例
export const uiStorage = new LocalStorageManager();
