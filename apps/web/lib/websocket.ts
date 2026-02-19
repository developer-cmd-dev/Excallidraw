


export const connectSocket = (token: string): Promise<WebSocket> => {


    return new Promise((resolve, reject) => {

        const ws = new WebSocket(`ws://localhost:8080/?token=${token}`);

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