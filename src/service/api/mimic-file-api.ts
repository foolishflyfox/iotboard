import type { AxiosInstance } from 'axios';
import { CustomAxiosInstance } from '../request';
import type { EditorType, FileTreeNode } from '@/views/mimic/types';

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
}

export const mimicFileApi = new MimicFileApi();
