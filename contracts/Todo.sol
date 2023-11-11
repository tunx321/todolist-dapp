// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract Todo {
    uint public taskId;

    event AddTask(uint taskId, string body, uint len_of_tasks);
    event CompleteTask(uint taskId, bool completed);

    enum Status {
        Free,
        VIP,
        Premium
    }

    struct UserInfo{
        Status status;
    }

    struct Task {
        uint id;
        string body;
        bool completed;
    }

    mapping(address => Task[]) private Users;
    mapping(address => UserInfo) public UserStatus;


    function addTask(string memory body) external {
        uint len_of_tasks = 0;
        for (uint i = 0; i < Users[msg.sender].length; i++) 
        {
            if (!Users[msg.sender][i].completed){
                len_of_tasks++; 
            }
            
        }

        if (UserStatus[msg.sender].status == Status.Free){
            require(len_of_tasks < 3, "You can't add more than 3 tasks, because you are free user");
            taskId = Users[msg.sender].length;
            Users[msg.sender].push(
                Task({id: taskId, body: body, completed: false})
            );
            taskId++;
            
        }else if (UserStatus[msg.sender].status == Status.VIP){
            require(len_of_tasks < 5, "You can't add more than 5 tasks, because you are VIP user");
            taskId = Users[msg.sender].length;
            Users[msg.sender].push(
                Task({id: taskId, body: body, completed: false})
            );
            taskId++;
            
        }else{
            require(len_of_tasks < 7, "You can't add more than 7 tasks, because you are Premium user");
            taskId = Users[msg.sender].length;
            Users[msg.sender].push(
                Task({id: taskId, body: body, completed: false})
            );
            taskId++;
            
        }
        emit AddTask(taskId, body, len_of_tasks);
    }

    function getMyTasks() external view returns (Task[] memory) {
        return Users[msg.sender];
    }

    function completeTask(uint256 _taskId) external {
        require(_taskId <= Users[msg.sender].length, "No task has been added");
        Users[msg.sender][_taskId].completed = true;
        emit CompleteTask(_taskId, true);
    }

    function purchaseStatus(uint _status) public payable {
        require(_status >= 1 && _status <= 2, "Out of range");
        require(uint(UserStatus[msg.sender].status) < _status, "You have already premium subscription");
        UserStatus[msg.sender] = UserInfo({status: Status(_status)});
    }

    function getTaskCount() external view returns (uint256) {
        return Users[msg.sender].length;
    }

    function getStatus() public view returns (Status){
        return UserStatus[msg.sender].status;
    } 


}