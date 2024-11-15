import type { AxiosInstance } from 'axios';
import { CustomAxiosInstance } from '../request';
import type { DisplayData, EditorType, FileItem, FileTreeNode } from '@/views/mimic/types';
import path from 'path-browserify';

const dataUrlPrefix = '/data';

class MimicFileApi {
  private instance: CustomAxiosInstance;

  constructor() {
    this.instance = new CustomAxiosInstance({
      baseURL: '/mimic/file',
      timeout: 3000,
    });
  }

  async queryTree(fileType: EditorType) {
    const result = await this.instance.get<FileTreeNode[]>(`tree/${fileType}`);
    return result;
  }

  async mkdir(fileType: EditorType, parentFolderPath: string, newFolderName: string) {
    await this.instance.post('mkdir', {
      fileType,
      folderPath: path.join(parentFolderPath, newFolderName),
    });
  }

  async rmdir(fileType: EditorType, folderPath: string) {
    await this.instance.post('rmdir', { fileType, folderPath });
  }

  async renameDir(fileType: EditorType, folderPath: string, newName: string) {
    await this.instance.post('renameDir', { fileType, folderPath, newName });
  }

  async listFiles(fileType: EditorType, folderPath: string) {
    const result = await this.instance.post<FileItem[]>('list', { fileType, folderPath });
    return result;
  }

  /** 根据指定路径创建图纸 */
  async createDisplay(displayPath: string, displayData: DisplayData) {
    const content = JSON.stringify(displayData, null, 2);
    await this.instance.post('create', { fileType: 'display', filePath: displayPath, content });
  }

  async deleteDisplay(displayPath: string) {
    await this.instance.post('delete', { fileType: 'display', filePath: displayPath });
  }

  async openDisplay(displayPath: string) {
    const content = await this.instance.post<string>('open', {
      fileType: 'display',
      filePath: displayPath,
    });
    const displayData: DisplayData = JSON.parse(content);
    return displayData;
  }

  /** 获取组件的 JSON 文件 */
  async getComponentJson(tag: string) {
    const response = await fetch(`${dataUrlPrefix}/${tag}.json`);
    const result = await response.json();
    console.log('####', result);
    return result;
  }
}

export const mimicFileApi = new MimicFileApi();
