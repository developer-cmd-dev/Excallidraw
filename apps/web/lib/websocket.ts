

let websocket:WebSocket|null = null;

export const connectSocket = (token: string): Promise<WebSocket> => {
    return new Promise((resolve, reject) => {

        const ws = new WebSocket(`ws://localhost:8080/?token=${token}`);
        websocket=ws;
        if (ws.readyState == WebSocket.OPEN) {
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


export async function getSocket(){
    console.log(websocket   )
    return  websocket;
}
