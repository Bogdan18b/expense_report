import { Node } from "../components/Table";

export function getTotal(nodes: {node: Node}[]): number {
  return nodes.reduce((total, currentNode) => {
    return total + currentNode.node.amount
  }, 0)
}
