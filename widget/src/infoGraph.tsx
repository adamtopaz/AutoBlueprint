import { useState } from "react";
import HtmlDisplay, { Html } from './htmlDisplay';
import ClickableGraph from './clickableGraph';
import { styles } from './styles';
import ResizableContainer from "./container";

export interface InfoGraphNode {
  id : string;
  html : Html;
}

export interface InfoGraphProps {
  nodes : Array<InfoGraphNode>
  dot : string
  defaultHtml : Html
}

export default function DeclGraph ({nodes, dot, defaultHtml} : InfoGraphProps) {

  const nodeMap = new Map(nodes.map(node => [node.id, node.html]))
  const [infoState, setInfoState] = useState<Html>(defaultHtml);

  const clickHandler = (id: string) : void => {
    const html = nodeMap.get(id);
    if (html) {
      setInfoState(html);
    }
  }

  const defaultHandler = () : void => {
    setInfoState(defaultHtml);
  }

  return (
    <div style={styles.container}> 
      <ResizableContainer title={"Declaration Graph"}>
        <ClickableGraph dot={dot} clickHandler={clickHandler} defaultHandler={defaultHandler} />
      </ResizableContainer>
      <ResizableContainer title={"Declaration Information"}>
        <div style={{padding : "16px"}}>
          <HtmlDisplay html={infoState} />
        </div>
      </ResizableContainer>
    </div>
  )

}