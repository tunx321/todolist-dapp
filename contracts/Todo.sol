// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Todo {
    uint public taskId;

    event AddTask(address recipient, uint taskId);
    event CompleteTask(uint taskId, bool completed);
    event ShowTasks(Task[]);

    struct Task {
        uint id;
        string body;
        bool completed;
    }

    mapping(address => Task[]) private Users;

    function addTask(string memory body) external {
        Users[msg.sender].push(
            Task({id: taskId, body: body, completed: false})
        );
        emit ShowTasks(Users[msg.sender]);
        emit AddTask(msg.sender, taskId);
    }

    function getMyTasks() external view returns (Task[] memory) {
        
        return Users[msg.sender];
        
    }

    function completeTask(uint _taskId) external {
        require(_taskId < Users[msg.sender].length, "No task has been added"); 
        Users[msg.sender][_taskId].completed = true;
        emit CompleteTask(_taskId, true);
    }

    function deleteTask(uint _taskId) external {
        delete Users[msg.sender][_taskId];
    }

    function getTaskCount() external view returns (uint256) {
        return Users[msg.sender].length;
    }
}