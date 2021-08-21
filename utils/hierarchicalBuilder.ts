import { defaults } from "lodash";

const hierarchicalBuilder = function (items: any[]) {
  let nodes: any = {};
  const categoryNodes = items.filter(function (obj) {
    const id = obj["id"],
      parentId = obj["parentId"];
    nodes[id] = defaults(obj, nodes[id], { children: [] });
    parentId && (nodes[parentId] = (nodes[parentId] || { children: [] }))["children"].push(obj);
    return !parentId;
  });

  return categoryNodes.map(categoryNode => {
    if(categoryNode.linkRelationship === "blogs" || categoryNode.linkRelationship === "join-our-network")
      categoryNode.url = "/" + categoryNode.linkRelationship;
    else
      categoryNode.url = categoryNode.url = "/category/" + categoryNode.linkRelationship;

    if(categoryNode.children.length){
      categoryNode.children.forEach((productNode: any) => {
        productNode.url = categoryNode.url + "/product/" + productNode.linkRelationship;
      })
      return {
        id: categoryNode.id,
        title: categoryNode.title,
        url: categoryNode.url,
        target: categoryNode.target,
        label: categoryNode.label,
        parentId: null,
        children: [categoryNode]
      };
    }
    return categoryNode;
  });


};

export default hierarchicalBuilder;