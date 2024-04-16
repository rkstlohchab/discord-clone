import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";


const SetupPage = async () => {

    const profile = await initialProfile();

    //check if the user is already in a server
    const server = await db.server.findFirst({
        where:{
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    //if the user is in a server, redirect them to the server page
    if(server){
        return redirect(`/servers/${server.id}`);
    }

    return ( 
        <InitialModal/>
    );
}

export default SetupPage;