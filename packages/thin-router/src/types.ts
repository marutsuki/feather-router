import { type ReactNode } from "react";

/**
 * Type for a path match result, including extracted parameters.
 */
export type PathMatch = {
  /** The extracted parameters from the path. */
  params: Record<string, string>;
  /** The extracted query parameters from the path. */
  queryParams: Record<string, string>;
  /** Indicates if it's an exact match. */
  isExact: boolean;
};

/**
 * Helper type for `PathElements` to turn a URL into an array of path components.
 */
type _PathElements<Path extends string> =
  Path extends `${infer Param}/${infer PathAfter}`
    ? [Param, ..._PathElements<PathAfter>]
    : Path extends `${infer Param}`
    ? [Param]
    : [];

/**
 * Gets the unique path components from a URL string.
 */
type PathElements<Path extends string> = Path extends `/${infer _Path}`
  ? _PathElements<_Path>
  : _PathElements<Path>;

/**
 * Helper type for `ExtractPathParams`
 * to build an object of all the parameter components of a URL.
 */
type _ExtractPathParams<Elements extends string[]> = Elements extends [
  infer PathElement,
  ...infer PathElementsAfter extends string[]
]
  ? PathElement extends `:${infer Param}`
    ? {
        [K in Param]: string;
      } & _ExtractPathParams<PathElementsAfter>
    : _ExtractPathParams<PathElementsAfter>
  : object;

/**
 * Gets the path parameters of a URL string and builds an object map.
 */
export type ExtractPathParams<Path extends string> =
  PathElements<Path> extends infer Elements extends string[]
    ? _ExtractPathParams<Elements>
    : object;

/**
 * Represents a route configuration.
 */
export type RouteConfig<P> = {
  /** The URL path. */
  path: P;
  /** The React component to render when the path matches. */
  element: ReactNode;
};

/**
 * The context value provided by RouterProvider to its children.
 */
export type RouterContextType<P> = {
  /** The current URL pathname. */
  path: string;
  /** Function to navigate to a new path. */
  navigate: (to: string) => void;
  /** Internal property to hold the currently matched route's parameters. */
  currentParams: Record<string, string>;
  /** Internal property to hold the currently matched route's query parameters. */
  currentQueryParams: Record<string, string>;
  /** Stores the currently active route config for the matched route. */
  activeRouteConfig: RouteConfig<P> | null;
};
