const express = require("express");
const app = express();
const port = 3001;
const cors = require('cors');
const fs = require('fs'); 
app.use(cors()); 
app.use(express.json()); 
let data = require("./data.json");

app.get("/api/nodes", (req, res) => {
  res.json({ nodes: data.nodes, edges: data.edges }); 
});

app.post("/api/nodes", (req, res) => {
  const { group, node, tier, edge } = req.body;
  
  if (!group || !node || !tier) {
    return res.status(400).json({ message: "Missing required data" });
  }
  const existingGroupIndex = data.nodes.findIndex(
    (existingNode) => existingNode.id === group.id
  );

  if (existingGroupIndex !== -1) {
    const existingGroup = data.nodes[existingGroupIndex];

    if (node.type === "custom" && !existingGroup.data.children.includes(node.id)) {
      let lastNodeX = 0;

      existingGroup.data.children.forEach(childId => {
        const childNode = data.nodes.find(n => n.id === childId);
        if (childNode && childNode.position && childNode.position.x !== undefined) {
          lastNodeX = Math.max(lastNodeX, childNode.position.x);
        }
      });

      node.position = node.position || {}; 
      node.position.x = lastNodeX + 240;  

      existingGroup.data.children.push(node.id);
    }

  } else {
    group.data.children.push(node.id);

    group.data.tierName = tier.data.tierName;

    data.nodes.push(group, node, tier);
  }

  if (edge) {
    data.edges.push(edge);
  }

  const existingNodeIndex = data.nodes.findIndex(
    (existingNode) => existingNode.id === node.id
  );
  if (existingNodeIndex === -1) {
    data.nodes.push(node);
  }

  const existingTierIndex = data.nodes.findIndex(
    (existingNode) => existingNode.id === tier.id
  );
  if (existingTierIndex === -1) {
    data.nodes.push(tier);
  }

  fs.writeFile("./data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error saving node or edge", error: err });
    }

    res.status(200).json({
      message: "Node and/or edge added/updated successfully",
      nodes: data.nodes,
      edges: data.edges,
    });
  });
});


app.delete("/api/nodes/:nodeId", (req, res) => {
  const { nodeId } = req.params;

  if (!nodeId) {
    return res.status(400).json({ error: "Node ID is required" });
  }

  const groupNode = data.nodes.find(
    (node) => node.type === "group" && node.data?.children?.includes(nodeId)
  );

  let nodesToDelete = [nodeId];
  
  if (groupNode) {
    groupNode.data.children = groupNode.data.children.filter((id) => id !== nodeId);
  }

  const filteredNodes = data.nodes.filter((node) => !nodesToDelete.includes(node.id));
  const filteredEdges = data.edges.filter(
    (edge) => !nodesToDelete.includes(edge.source) && !nodesToDelete.includes(edge.target)
  );

  if (filteredNodes.length === data.nodes.length) {
    return res.status(404).json({ error: "Node not found" });
  }
  data.nodes = filteredNodes;
  data.edges = filteredEdges;

  fs.writeFile("./data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Error saving data after deletion", error: err });
    }

    res.status(200).json({
      message: "Node deleted successfully",
      nodes: data.nodes,
      edges: data.edges,
    });
  });
});

app.put("/api/nodes/:id", (req, res) => {
  const { id } = req.params;
  
  const { label, employees } = req.body;

  if (!label || employees === undefined) return res.status(400).json({ message: "Missing required data" });

  const nodeIndex = data.nodes.findIndex(node => node.id === id);
  
  if (nodeIndex === -1) return res.status(404).json({ message: "Node not found" });
  
  data.nodes[nodeIndex].data.label = label;
  data.nodes[nodeIndex].data.employees = employees;

  fs.writeFile("./data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Error saving updated node", error: err });
    }

    res.status(200).json({ message: "Node updated successfully", node: data.nodes[nodeIndex] });
  });
  
});

app.put("/api/tier/:id", (req, res) => {
  const { id } = req.params;
  const { tierName } = req.body;

  if (!tierName) return res.status(400).json({ message: "Missing required data: tierName" });
  
  const tierNodeIndex = data.nodes.findIndex(node => node.data.tierId === id);

  if (tierNodeIndex === -1) return res.status(404).json({ message: "Tier node not found" });

  const parentId = data.nodes[tierNodeIndex].parentId;

  data.nodes[tierNodeIndex].data.tierName = tierName;

  data.nodes = data.nodes.map(node => {
    if (node.data.tierId === id) {
      return { ...node, data: { ...node.data, tierName } };
    }
    if (node.type === "custom" && node.parentId === parentId) {
      return { ...node, data: { ...node.data, tierName } };
    }
    return node;
  });
  
  fs.writeFile("./data.json", JSON.stringify(data, null, 2), err => {
    if (err) {
      return res.status(500).json({ message: "Error saving updated tier", error: err });
    }

    res.status(200).json({ 
      message: "Tier updated successfully",
      nodes: data.nodes,
    });
  });


});


app.put("/api/nodes/:id/group", (req, res) => {
  const { id } = req.params;
  const { newGroupId, newPosition,updatedEdges } = req.body; 
 
  if (!newGroupId)  return res.status(400).json({ message: "Missing required data: newGroupId" });
  
  const nodeIndex = data.nodes.findIndex((node) => node.id === id);
  if (nodeIndex === -1) {
    return res.status(404).json({ message: "Node not found" });
  }

  const oldGroup = data.nodes.find(
    (node) => node.type === "group" && node.data?.children?.includes(id)
  );

  if (oldGroup) {
    oldGroup.data.children = oldGroup.data.children.filter((childId) => childId !== id);
  }

  const newGroup = data.nodes.find((node) => node.id === newGroupId && node.type === "group");
  if (!newGroup) {
    return res.status(404).json({ message: "New group not found" });
  }

  if (updatedEdges) {
    data.edges = updatedEdges
  }

  if (!Array.isArray(newGroup.data.children)) {
    newGroup.data.children = [];
  }

  if (!newGroup.data.children.includes(id)) {
    newGroup.data.children.push(id);
  }

  const updatedNode = { 
    ...data.nodes[nodeIndex],
    parentId: newGroupId,
    position :newPosition, 
    data: {
      ...data.nodes[nodeIndex].data,
      tierName: newGroup.data.tierName || "",
    }
  };

  data.nodes[nodeIndex] = updatedNode;

  fs.writeFile("./data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Error saving updated node", error: err });
    }

    res.status(200).json({
      message: "Node updated successfully",
      node: updatedNode,  
      edges: data.edges, 

    });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
