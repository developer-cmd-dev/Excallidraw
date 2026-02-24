
let socket:WebSocket|null=null;


export const connectSocket = (token: string): Promise<WebSocket> => {
    return new Promise((resolve, reject) => {

     
        const ws = new WebSocket(`ws://localhost:8080/?token=${token}`);
        socket=ws;
        if (ws.readyState == WebSocket.OPEN) {
            socket=ws
            resolve(ws);
        }

        ws.onopen = () => {
            resolve(ws)
        }

        ws.onerror = (error) => {
            console.log(error)
            reject(error)
        }

        

      
   
    })
}



export function getSocket():WebSocket|null{
   return socket
}