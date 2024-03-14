import { useState } from "react";

import SplitPane from "split-pane-react";

interface SplitProps {
  type: "vertical" | "horizontal";
  children: JSX.Element[];
}

export default function Split({ children, type }: SplitProps) {
  const [sizes, setSizes] = useState<(number | string)[]>([100, 100]);

  return (
    <SplitPane
      split={type}
      sizes={sizes}
      onChange={setSizes}
      sashRender={() => undefined}
    >
      {children}
    </SplitPane>
  );
}
