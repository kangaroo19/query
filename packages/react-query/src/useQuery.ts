'use client'
import { QueryObserver } from '@tanstack/query-core'
import { useBaseQuery } from './useBaseQuery'
import type {
  DefaultError,
  NoInfer,
  QueryClient,
  QueryKey,
} from '@tanstack/query-core'
import type {
  DefinedUseQueryResult,
  UseQueryOptions,
  UseQueryResult,
} from './types'
import type {
  DefinedInitialDataOptions,
  UndefinedInitialDataOptions,
} from './queryOptions'

// useQuery는 함수 오버로드 시그니처 사용하여 3개가 정의되어 있음

// 1. initialData가 명시적으로 있는 경우
// ex) initialData: [], // 명시적으로 초기값 제공
export function useQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient,
): DefinedUseQueryResult<NoInfer<TData>, TError>

// 2. initialData가 undefined인 경우
// ex) initialData: undefined, // 명시적으로 초기값 없음(undefined)
export function useQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient,
): UseQueryResult<NoInfer<TData>, TError>

// 3. initialData 속성이 없는 경우 (일반적인 UseQueryOptions)
//함수 오버로드 시그니처는 동일한 함수명으로 여러 입력 패턴을 처리하면서도, 
// 각 상황에 맞는 정확한 타입 정보를 제공하여 타입 안전성과 개발자 경험을 모두 향상시키는 중요한 TypeScript 기능입니다.
export function useQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient,
): UseQueryResult<NoInfer<TData>, TError>

export function useQuery(options: UseQueryOptions, queryClient?: QueryClient) {
  return useBaseQuery(options, QueryObserver, queryClient)
}
