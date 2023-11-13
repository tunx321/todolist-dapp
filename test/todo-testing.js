const { expect } = require("chai");
const { ethers } = require("hardhat")

describe("Todo", function(){
  let MyContract, myContractDeployed, owner, addr1, addr2, addr3, addrs
  
  beforeEach(async function(){
    MyContract = await ethers.getContractFactory("Todo");
    myContractDeployed = await MyContract.deploy();
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
    
  });

  describe("Basic function test", function() {
    it("should return length of tasks = 1", async function(){
      await myContractDeployed.connect(addr1).addTask("task1")
      expect(await myContractDeployed.connect(addr1).getTaskCount()).to.equal(1);
    });
  
    it("should complete the task", async function() {
      await myContractDeployed.connect(addr1).addTask("task1")
      await myContractDeployed.connect(addr1).completeTask(Number(0))
      expect(await myContractDeployed.connect(addr1).getTaskCount()).to.equal(1);
    })

    it("should return the free status", async function() {
      expect(await myContractDeployed.getStatus()).to.equal(0)
    })

    it("should buy the VIP status", async function() {
      const mintTx = await myContractDeployed.connect(addr1).purchaseStatus(1)
      await mintTx.wait()
      expect(await myContractDeployed.connect(addr1).getStatus()).to.equal(1)
    })

    it("should buy the Premium status", async function() {
      const mintTx = await myContractDeployed.connect(addr1).purchaseStatus(2)
      await mintTx.wait()
      expect(await myContractDeployed.connect(addr1).getStatus()).to.equal(2)
    })

})

describe("Status privilege testing", function() {
  it("should revert because of free(max 3 tasks) user status", async function(){
    await myContractDeployed.connect(addr1).addTask("task1")
    await myContractDeployed.connect(addr1).addTask("task2")
    await myContractDeployed.connect(addr1).addTask("task3")
    await expect(myContractDeployed.connect(addr1).addTask("task4")).to.be.revertedWith("You can't add more than 3 tasks, because you are free user")
 
  });

  it("should revert because of vip(max 5 tasks) user status", async function(){
    await myContractDeployed.connect(addr1).purchaseStatus(1)
    await myContractDeployed.connect(addr1).addTask("task1")
    await myContractDeployed.connect(addr1).addTask("task2")
    await myContractDeployed.connect(addr1).addTask("task3")
    await myContractDeployed.connect(addr1).addTask("task4")
    await myContractDeployed.connect(addr1).addTask("task5")
    await expect(myContractDeployed.connect(addr1).addTask("task6")).to.be.revertedWith("You can't add more than 5 tasks, because you are VIP user")
 
  });

  it("should revert because of vip(max 5 tasks) user status", async function(){
    await myContractDeployed.connect(addr1).purchaseStatus(2)
    await myContractDeployed.connect(addr1).addTask("task1")
    await myContractDeployed.connect(addr1).addTask("task2")
    await myContractDeployed.connect(addr1).addTask("task3")
    await myContractDeployed.connect(addr1).addTask("task4")
    await myContractDeployed.connect(addr1).addTask("task5")
    await myContractDeployed.connect(addr1).addTask("task6")
    await myContractDeployed.connect(addr1).addTask("task7")
    await expect(myContractDeployed.connect(addr1).addTask("task8")).to.be.revertedWith("You can't add more than 7 tasks, because you are Premium user")
  });

})

  
});