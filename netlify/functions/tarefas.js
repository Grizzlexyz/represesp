exports.handler = async (event) => {

    try{

        const authToken =
            event.queryStringParameters.authToken;

        const nick =
            event.queryStringParameters.nick || "";

        const rooms =
            JSON.parse(
                event.queryStringParameters.rooms || "[]"
            );

        const expired =
            event.queryStringParameters.expired === "true";

        let publicationTargets = [];

        rooms.forEach(room => {

            /* ROOM */

            if(room.name){

                publicationTargets.push(
                    room.name
                );

            }

            /* ROOM:NICK */

            if(room.name && nick){

                publicationTargets.push(
                    `${room.name}:${nick}`
                );

            }

            /* GROUP CATEGORIES */

            if(room.group_categories){

                room.group_categories.forEach(group => {

                    if(group.id){

                        publicationTargets.push(
                            group.id
                        );

                    }

                });

            }

        });

        /* QUERY */

        const params = new URLSearchParams();

        params.append(
            "expired_only",
            expired ? "true" : "false"
        );

        params.append(
            "limit",
            "100"
        );

        params.append(
            "offset",
            "0"
        );

        params.append(
            "filter_expired",
            expired ? "false" : "true"
        );

        params.append(
            "is_exam",
            "false"
        );

        params.append(
            "with_answer",
            "true"
        );

        params.append(
            "is_essay",
            "false"
        );

        params.append(
            "answer_statuses",
            "draft"
        );

        params.append(
            "with_apply_moment",
            "true"
        );

        publicationTargets.forEach(target => {

            params.append(
                "publication_target",
                target
            );

        });

        const response = await fetch(
            `https://edusp-api.ip.tv/tms/task/todo?${params.toString()}`,
            {
                method:"GET",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "x-api-key":authToken
                }
            }
        );

        const responseText =
            await response.text();

        console.log(
            "Resposta API:",
            responseText
        );

        let data;

        try{

            data = JSON.parse(
                responseText
            );

        }catch(parseError){

            return{
                statusCode:500,
                headers:{
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Origin":"*"
                },
                body:JSON.stringify({
                    error:"API retornou HTML ao invés de JSON",
                    response:responseText
                })
            };

        }

        return{
            statusCode:200,
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin":"*"
            },
            body:JSON.stringify(data)
        };

    }catch(error){

        return{
            statusCode:500,
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin":"*"
            },
            body:JSON.stringify({
                error:error.message
            })
        };

    }

};
