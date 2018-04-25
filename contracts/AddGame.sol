pragma solidity ^0.4.16;

contract AddGame {
    
    address owner;
    
    struct Gamer {
        uint age;
        string name;
        uint points;
    }
    
    modifier ownerOnly {
    if(msg.sender == owner){
      _;
     } else {
       revert();
     }
    }
    
    mapping(address => Gamer) gamers;
    
    event pointsStatus(address gamer, string name, uint points);
    
    function AddGame() public {
        owner = msg.sender;
    }
    
    function addPlayer(uint age, string name) public returns(bool){
    
        Gamer memory g;

        g.age = age;
        g.name = name;
        g.points = 0;
        gamers[msg.sender] = g;
     
        return true;
    }
    
    
    function addPoints(address gamer, uint points) ownerOnly public returns(bool) {
        
        gamers[gamer].points += points;
        
        pointsStatus(gamer, gamers[gamer].name, points);
        
        return true;
        
    }
    
    function getPoints(address gamer) view public returns(uint) {
    
        return gamers[gamer].points;
    }
        
}