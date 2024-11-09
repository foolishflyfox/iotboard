import type { AxiosInstance } from 'axios';
import { CustomAxiosInstance } from '../request';
import type { EditorType, FileTreeNode } from '@/views/mimic/types';
import path from 'path-browserify';

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
    console.log('result =', result);
    return result;
  }

  async mkdir(fileType: EditorType, parentFolderPath: string, newFolderName: string) {
    await this.instance.post('mkdir', {
      fileType: fileType,
      folderPath: path.join(parentFolderPath, newFolderName),
    });
  }
}

export const mimicFileApi = new MimicFileApi();
