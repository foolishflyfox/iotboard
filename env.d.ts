/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 可以根据实际定义的变量添加更多的属性声明
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
