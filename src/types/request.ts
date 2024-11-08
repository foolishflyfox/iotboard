export interface HttpResult<T> {
  /** 响应码，根据该字段判断请求是否成功 */
  code: number;
  /** 响应信息，当请求失败时，该字段返回失败原因 */
  msg?: string;
  /** 响应结果 */
  result?: T;
  /** 返回时间戳 */
  timestamp: string;
}
