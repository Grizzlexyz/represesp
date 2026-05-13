exports.handler = async (event) => {

    try{

        const codigoAluno =
            event.queryStringParameters.codigoAluno;

        const token =
            event.headers.authorization;

        const response = await fetch(
            `https://sedintegracoes.educacao.sp.gov.br/saladofuturobffapi/apihubintegracoes/api/v2/Turma/ListarTurmasPorAluno?codigoAluno=${codigoAluno}`,
            {
                method:"GET",
                headers:{
                    "Accept":"application/json, text/plain, */*",
                    "Authorization":token,
                    "Ocp-Apim-Subscription-Key":process.env.API_KEY
                }
            }
        );

        const data = await response.json();

        return {
            statusCode:200,
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
