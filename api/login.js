export default async function handler(req, res){

    if(req.method !== "POST"){

        return res.status(405).json({
            error:"Método não permitido"
        });

    }

    try{

        const response = await fetch(
            "https://sedintegracoes.educacao.sp.gov.br/saladofuturobffapi/credenciais/api/LoginCompletoToken",
            {
                method:"POST",
                headers:{
                    "Accept":"application/json, text/plain, */*",
                    "Content-Type":"application/json",
                    "Ocp-Apim-Subscription-Key":process.env.API_KEY
                },
                body:JSON.stringify(req.body)
            }
        );

        const data = await response.json();

        return res.status(response.status).json(data);

    }catch(error){

        return res.status(500).json({
            error:"Erro interno",
            details:error.message
        });

    }

}
