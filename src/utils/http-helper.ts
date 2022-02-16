import axios, { CancelTokenSource, AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
import CryptoHelper from "./crypto-helper";
import Storage from "./storage-helper";


const CANCELTYPE = {
  CACHE: 1,
  REPEAT: 2
}

interface ICancel {
  data: any;
  type: number;
}

interface Request {
  md5Key: string;
  source: CancelTokenSource;
}

const pendingRequests: Request[] = [];

const http = axios.create()
const storage = new Storage()
const cryptoHelper = new CryptoHelper('helloworld')

http.interceptors.request.use((config: AxiosRequestConfig) => {
    /**
     * 为每一次请求生成一个CancelToken
     */
    const source = axios.CancelToken.source()
    config.cancelToken = source.token

    /**
     * 尝试获取缓存数据
     * 缓存命中判断
     * 成功则取消当次请求
     */
    const data = storage.get(cryptoHelper.encrypt(
      config.url + JSON.stringify(config.data) + (config.method || '')
    ))
    if (data && (Date.now() <= data.exppries)) {
      console.log(`接口：${config.url} 缓存命中 -- ${Date.now()} -- ${data.exppries}`)
      source.cancel(JSON.stringify({
        type: CANCELTYPE.CACHE,
        data: data.data
      }))
    }
    /**
     * 重复请求判断
     * 同url，同请求类型判定为重复请求
     * 以最新的请求为准
     */
    const md5Key = cryptoHelper.encrypt(config.url + (config.method || ''))
    /**
     * 将之前的重复且未完成的请求全部取消
     */
    const hits = pendingRequests.filter((item) => {
      item.md5Key === md5Key
    })
    if (hits.length > 0) {
      hits.forEach(item => {
        item.source.cancel(JSON.stringify({
          type: CANCELTYPE.REPEAT,
          data: '重复请求，已取消'
        }))
      })
    }
    /**
     * 将当前请求添加进请求对列中
     */
    pendingRequests.push({
      md5Key,
      source
    })
    return config
  }
)

