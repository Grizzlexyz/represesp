exports.handler = async (event) => {

    if(event.httpMethod !== "POST"){
        return {
            statusCode: 405,
            body: JSON.stringify({
                error: "Método não permitido"
            })
        };
    }

    try{

        const body = JSON.parse(event.body);

        const response = await fetch(
            "https://sedintegracoes.educacao.sp.gov.br/saladofuturobffapi/credenciais/api/LoginCompletoToken",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Ocp-Apim-Subscription-Key": process.env.API_KEY
                },
                body: JSON.stringify({
                    user: body.user,
                    senha: body.senha
                })
            }
        );

        const data = await response.json();

localStorage.setItem(
    "token",
    data.token || data.Token || ""
);

localStorage.setItem(
    "codigoAluno",
    data.CD_USUARIO || ""
);

localStorage.setItem(
    "nick",
    data.NICKNAME || ""
);

localStorage.setItem(
    "rooms",
    JSON.stringify(
        data.ROOMS || []
    )
);

        return {
            statusCode: response.status,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        };

    }catch(error){

        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                error: error.message
            })
        };

    }

};
