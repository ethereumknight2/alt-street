'use client';

import { ReactNode } from 'react';
import * as runtime from 'react/jsx-runtime';

interface MDXContentProps {
  code: string;
  components?: Record<string, React.ComponentType<any>>;
}

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

export function MDXContent({ code, components = {} }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
