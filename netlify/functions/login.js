exports.handler = async (event) => {

    if(event.httpMethod !== "POST"){

        return {
            statusCode:405,
            body:JSON.stringify({
                error:"Método não permitido"
            })
        };

    }

    try{

        const { user, senha } = JSON.parse(event.body);

        const response = await fetch(
            "https://sedintegracoes.educacao.sp.gov.br/saladofuturobffapi/credenciais/api/LoginCompletoToken",
            {
                method:"POST",
                headers:{
                    "Accept":"application/json, text/plain, */*",
                    "Content-Type":"application/json",
                    "Ocp-Apim-Subscription-Key":process.env.API_KEY
                },
                body:JSON.stringify({
                    user,
                    senha
                })
            }
        );

        const data = await response.json();

        return {
            statusCode:response.status,
            body:JSON.stringify(data)
        };

    }catch(error){

        return {
            statusCode:500,
            body:JSON.stringify({
                error:error.message
            })
        };

    }

};
