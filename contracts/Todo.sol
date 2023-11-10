// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Todo {
    uint public taskId;

    event AddTask(uint taskId, string body);
    event CompleteTask(uint taskId, bool completed);

    struct Task {
        uint id;
        string body;
        bool completed;
    }

    mapping(address => Task[]) private Users;

    function addTask(string memory body) external {
        taskId = Users[msg.sender].length;
        Users[msg.sender].push(
            Task({id: taskId, body: body, completed: false})
        );
        taskId++;
        emit AddTask(taskId, body);
    }

    function getMyTasks(uint idTask) external view returns (uint id, string memory body, bool completed ) {
        return (Users[msg.sender][idTask].id, Users[msg.sender][idTask].body, Users[msg.sender][idTask].completed);
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