exports.handler = async (event) => {

    if(event.httpMethod !== "POST"){
        return {
            statusCode: 405,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                error: "Método não permitido"
            })
        };
    }

    try{

        const body = JSON.parse(event.body);

        if(!body.user || !body.senha){

            return {
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    error: "Usuário e senha obrigatórios"
                })
            };

        }

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

        const text = await response.text();

        let data = {};

        try{

            data = JSON.parse(text);

        }catch{

            data = {
                raw: text
            };

        }

        return {
            statusCode: response.status,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        };

    }catch(error){

        console.error("LOGIN ERROR:", error);

        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                error: error.message
            })
        };

    }

};
