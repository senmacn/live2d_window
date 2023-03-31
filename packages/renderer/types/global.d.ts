import type { VNodeChild, ComponentPublicInstance, FunctionalComponent, PropType as VuePropType } from 'vue';

declare global {
  declare type PropType<T> = VuePropType<T>;
  declare type VueNode = VNodeChild | JSX.Element;

  declare type Fn = () => void;

  declare;
}

declare module 'vue' {
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>;
}
