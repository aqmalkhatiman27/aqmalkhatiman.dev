import type { MDXComponents } from "mdx/types";

import { getArticleMdxComponents } from "@/components/mdx/article-mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const article = getArticleMdxComponents();
  return {
    ...article,
    ...components,
  };
}