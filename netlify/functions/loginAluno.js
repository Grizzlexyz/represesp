exports.handler = async (event) => {

    try{

        const body = JSON.parse(event.body);

        const response = await fetch(
            "https://sedintegracoes.educacao.sp.gov.br/saladofuturobffapi/credenciais/api/LoginCompletoToken",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body:JSON.stringify({
                    user: body.user,
                    senha: body.senha
                })
            }
        );

        const data = await response.json();

        return{
            statusCode: response.status,
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        };

    }catch(error){

        return{
            statusCode:500,
            body:JSON.stringify({
                erro:"Erro interno",
                detalhes:error.message
            })
        };

    }

};
