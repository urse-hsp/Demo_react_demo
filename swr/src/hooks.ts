import useSWR from 'swr'

export const fetcher: any = (...args: any[]) => {
  // export const fetcher: any = (data: any) => {
  console.log(args, 'args')
  return fetch(args[0], {
    // method: 'POST',
    // mode: 'cors', // 跨域
    // redirect: 'follow',
    // headers: new Headers({
    //   'Content-Type': 'text/plain',
    // }),
    // body: JSON.stringify({ name: 'zaozuo' }),
  }).then((res) => res.json())
}

export function useUser(id: string) {
  // const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher)
  const { data, error, isLoading, mutate } = useSWR(`${id}`, fetcher)
  // const { data, error, isLoading } = useSWR([`${id}`, { name: 1 }], fetcher) // 数组
  // const { data, error, isLoading } = useSWR({ url: `${id}`, args: 1 }, fetcher) // 数组

  return {
    data: data,
    loading: isLoading,
    error: error,
    mutate,
  }
}

// # 传参方式
// 单个参数：useSWR(`${id}`, fetcher) ___直接data
// 数组：useSWR([`${id}`,{name:1}], fetcher) ___取值data[0]
// 对象：useSWR({ url: `${id}`, args: 1 }, fetcher) ___取值data.url
