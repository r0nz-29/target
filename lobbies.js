const randomstring=require('randomstring');
const room_limit=5;
const structure= {
	socket_id:"",
}
// lobbie={
// 	lobbie_id:"",
// 	participants:[structure..]
//  time:100
// }
function create_lobby(lobbies,difficulty){
    let lobbie_id= randomstring.generate(26);
    let l=lobbies[difficulty];
    l = [...l, {lobbie_id:lobbie_id,time:5,participants:[]}]
    
    lobbies[difficulty]=l;
    
   
}
 function find_lobby(lobbies,difficulty,socket){
    if(lobbies[difficulty].length==0){
       create_lobby(lobbies,difficulty);
       return find_lobby(lobbies,difficulty,socket)
    }
    else{
        
        for(let i=0;i<lobbies[difficulty].length;i++){
            if(lobbies[difficulty][i].participants.length<room_limit){
                lobbies[difficulty][i].participants.push(
                   socket.id
                );
               return lobbies[difficulty][i].lobbie_id; 
            }  
        }
        create_lobby(lobbies,difficulty);
       return find_lobby(lobbies,difficulty,socket);
    }
}


 function join_lobby(lobbies,difficulty,socket) {
    return  find_lobby(lobbies,difficulty,socket);
}
module.exports= {
    join_lobby
};