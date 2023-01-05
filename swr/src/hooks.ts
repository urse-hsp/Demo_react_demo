import useSWR from 'swr'

export const fetcher: any = (...args: any[]) => {
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
  const { data, error, isLoading } = useSWR(`${id}`, fetcher)

  return {
    data: data,
    loading: isLoading,
    error: error,
  }
}
