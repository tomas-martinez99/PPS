const API_URL = "https://localhost:7289/api/subscription";

export const successPay = async (paymentId) =>{
    try{
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/add-to-user-from-payment`,{
            method:"POST",
            mode:"cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
              },
              body: Number(paymentId)
        })
        if(response.ok){
            console.log("Pagaste")
        }
    }catch (error) {
        console.error("Error MP Success", error.message);
        throw error; // Lanza el error para manejarlo en el componente
    }
}
