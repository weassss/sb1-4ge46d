export interface TreeNode {
  id: string;
  label: string;
  type: "page" | "component" | "element";
  children?: TreeNode[];
}