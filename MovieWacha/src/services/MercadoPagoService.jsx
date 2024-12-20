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
        console.error("Error MP Success", error);
        throw error; // Lanza el error para manejarlo en el componente
    }
}

export const getPreferenceId = async () =>{
    const respone = await fetch(`${API_URL}/get-actual-preference`,{
        method:"GET",
        mode:"cors",
    })
     const data =await respone.json()
    if (respone.ok) {
        console.log("preference id", data.id)
        return data.id
    }
}

