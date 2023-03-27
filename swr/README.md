“SWR” 这个名字来自于 stale-while-revalidate：一种由 HTTP RFC 5861 推广的 HTTP 缓存失效策略。这种策略首先从缓存中返回数据（过期的），同时发送 fetch 请求（重新验证），最后得到最新数据。

# 使用 SWR，组件将会不断地、自动获得最新数据流。UI 也会一直保持快速响应。

特性
仅需一行代码，你就可以简化项目中数据请求的逻辑，并立即拥有以下这些不可思议的特性：

极速、轻量、可重用的 数据请求
内置 缓存 和重复请求去除
实时 体验
传输和协议不可知
支持 SSR / ISR / SSG
支持 TypeScript
React Native
SWR 涵盖了性能，正确性和稳定性的各个方面，以帮你建立更好的体验：

快速页面导航
间隔轮询
数据依赖
聚焦时重新验证
网络恢复时重新验证
本地缓存更新 (Optimistic UI)
智能错误重试
分页和滚动位置恢复
React Suspense

# 传参方式

单个参数：useSWR(`${id}`, fetcher) **_直接 data
数组：useSWR([`${id}`,{name:1}], fetcher) _**取值 data[0]
对象：useSWR({ url: `${id}`, args: 1 }, fetcher) \_\_\_取值 data.url

# 数据更改 & 重新验证

SWR 提供了 mutate 和 useSWRMutation 两个 API 用于更改远程数据及相关缓存。
全局数据更改
推荐使用 useSWRConfig hook 获取全局 mutator：

import { useSWRConfig } from "swr"
function App() {
const { mutate } = useSWRConfig()
mutate(key, data, options)
}

import { mutate } from "swr"
function App() {
mutate(key, data, options)
}

绑定数据更改

绑定数据更改可以更便捷的更改当前 key 数据，它的 key 与传递给 useSWR 的 key 相绑定，并接收 data 作为第一个参数。
它在功能上等同于上文提到的的全局 mutate 函数，但它不需要传入 key 参数：
const { data, mutate } = useSWR('/api/user', fetcher)

# mutate(key) 一个参数通知所有拥有这个 key SWR 重新验证 。带 data：立即更新并重新验证本地数据（重新请求）。当使用 useSWR 的 mutate 时，key 并不是必须的，因为它已经预先绑定了。

1. mutate useSWRMutation api 输入指定的 key 可以修改当前接口请求，
1. 全局数据更改 API 可以更改任何 key 的数据，而绑定数据更改只能更改对应 SWR hook 的数据。
1.

# useSWRMutation 远程数据更改的 hook。远程数据更改只能手动触发，而不像 useSWR 那样会自动触发。

import useSWRMutation from 'swr/mutation'
const { trigger } = useSWRMutation('/api/user', updateUser, options?)
