import React, { useState } from "react";
import { Edit, Trash, PlusCircle } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";

const WorkflowEditor = () => {
  const [nodes, setNodes] = useState([
    {
      id: 1,
      title: "Welcome to Tesla",
      type: "start",
      actions: ["Company Information", "Visual Info", "Brochure"],
      x: 300,
      y: 50,
      showSideConnection: false,
    },
    {
      id: 2,
      title: "Personal Details",
      type: "step",
      actions: ["Data Collection"],
      x: 300,
      y: 250,
      showSideConnection: true,
    },
    {
      id: 3,
      title: "Verification",
      type: "step",
      actions: [
        "Archive Verification",
        "Offer Letter",
        "Compliance and Acknowledgment",
      ],
      x: 300,
      y: 450,
      showSideConnection: false,
    },
    {
      id: 4,
      title: "Onboarding Kit",
      type: "step",
      actions: ["Onboarding Kit"],
      x: 300,
      y: 650,
      showSideConnection: false,
    },
    {
      id: 5,
      title: "Company Assets",
      type: "step",
      actions: ["Media Library"],
      x: 300,
      y: 850,
      showSideConnection: false,
    },
  ]);

  const [editingNode, setEditingNode] = useState(null);
  const [editingTask, setEditingTask] = useState({
    nodeId: null,
    taskIndex: null,
  });
  const addNode = () => {
    setNodes((prevNodes) => {
      const lastNode = prevNodes[prevNodes.length - 1];
      const newNode = {
        id: prevNodes.length + 1,
        title: `Node ${prevNodes.length + 1}`,
        type: "step",
        actions: ["Task 1", "Task 2"],
        x: lastNode.x,
        y: lastNode.y + 200,
        showSideConnection: false,
      };
      return [...prevNodes, newNode];
    });
  };
  const deleteNode = (id) => {
    if (id === 1) return;
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  };
  const editNode = (id, newTitle) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id ? { ...node, title: newTitle } : node
      )
    );
    setEditingNode(null);
  };
  const editTask = (nodeId, taskIndex, newTask) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              actions: node.actions.map((task, index) =>
                index === taskIndex ? newTask : task
              ),
            }
          : node
      )
    );
    setEditingTask({ nodeId: null, taskIndex: null });
  };
  const toggleSideConnection = (id) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id
          ? { ...node, showSideConnection: !node.showSideConnection }
          : node
      )
    );
  };
  const handleKeyPress = (e, callback) => {
    if (e.key === "Enter") {
      e.target.blur();
      callback();
    }
  };
  return (
    <div className="p-10 bg-gray-100 min-h-screen relative flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Workflow Editor</h1>
      <div className="bg-purple-800 text-white px-4 py-2 rounded-full">
        Start
      </div>
      <div className="w-0.5 border-dashed border border-purple-400 h-8"></div>
      {nodes.map((node, index) => (
        <div
          key={node.id}
          className={`relative w-96 p-6 rounded-2xl shadow-lg border-l-4 ${
            node.type === "start" || node.id === nodes[nodes.length - 1].id
              ? "bg-purple-100 border-purple-500"
              : "bg-white border-blue-500"
          }`}
          style={{ marginBottom: "40px" }}
        >
          <div className="flex justify-between items-center mb-4">
            {editingNode === node.id ? (
              <input
                type="text"
                defaultValue={node.title}
                className="border px-2 py-1 rounded-lg w-full"
                onBlur={(e) => editNode(node.id, e.target.value)}
                onKeyDown={(e) =>
                  handleKeyPress(e, () => editNode(node.id, e.target.value))
                }
              />
            ) : (
              <h2 className="text-lg font-semibold text-gray-800">
                {node.title}
              </h2>
            )}
            <div className="flex gap-2">
              <Edit
                size={18}
                className="text-yellow-500 cursor-pointer"
                onClick={() => setEditingNode(node.id)}
              />
              {node.id !== 1 && (
                <Trash
                  size={18}
                  className="text-red-500 cursor-pointer"
                  onClick={() => deleteNode(node.id)}
                />
              )}
              <FaArrowRight
                size={18}
                className={`cursor-pointer ${
                  node.showSideConnection ? "text-green-500" : "text-gray-500"
                }`}
                onClick={() => toggleSideConnection(node.id)}
              />
            </div>
          </div>
          {node.actions.map((action, i) => (
            <div
              key={i}
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg mt-2 flex justify-between items-center"
            >
              {editingTask.nodeId === node.id && editingTask.taskIndex === i ? (
                <input
                  type="text"
                  defaultValue={action}
                  className="border px-2 py-1 rounded-lg w-full mr-2"
                  onBlur={(e) => editTask(node.id, i, e.target.value)}
                  onKeyDown={(e) =>
                    handleKeyPress(e, () =>
                      editTask(node.id, i, e.target.value)
                    )
                  }
                />
              ) : (
                <span>{action}</span>
              )}
              <Edit
                size={18}
                className="text-green-500 cursor-pointer"
                onClick={() =>
                  setEditingTask({ nodeId: node.id, taskIndex: i })
                }
              />
            </div>
          ))}
          {node.showSideConnection && (
            <>
              <div className="absolute w-32 h-0.5 border-dashed border border-green-500 top-1/2 left-full translate-y-[-50%]"></div>
              <div className="absolute right-[-270px] top-[50%] translate-y-[-50%] w-[240px] bg-green-100 p-4 rounded-xl shadow-lg border-2 border-green-300">
                <h3 className="text-lg font-semibold">Reminder Message</h3>
                <div className="bg-white p-2 rounded-lg shadow">WhatsApp</div>
              </div>
            </>
          )}
          {index < nodes.length - 1 && (
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 border-dashed border border-purple-400 h-40 top-full"></div>
          )}
        </div>
      ))}
      <div className="w-0.5 border-dashed border border-purple-400 h-12 mx-auto -mt-10"></div>
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        onClick={addNode}
      >
        <PlusCircle size={20} /> Add Another
      </button>
      <div className="w-0.5 border-dashed border border-purple-400 h-12 mx-auto"></div>
      <div className="bg-purple-800 text-white px-4 py-2 rounded-full">
        Ends
      </div>
    </div>
  );
};

export default WorkflowEditor;
