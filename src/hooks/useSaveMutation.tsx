import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaCheck, FaSave } from "react-icons/fa";

function useSaveMutation(mutationFuncton, onSuccessAction, mutationKey){
    const queryClient = useQueryClient();
    const [saveIcon, setSaveIcon] = useState(<FaSave />);

    const saveMutation = useMutation({
        mutationFn: mutationFuncton,
        mutationKey: [mutationKey],
        onSuccess: () => {
            setSaveIcon(<FaCheck />)
            setTimeout(()=>setSaveIcon(<FaSave />), 2000)
            queryClient.invalidateQueries(mutationKey)
            onSuccessAction()
        }
    })

    let save = async (mutationObj) => {
        saveMutation.mutate(mutationObj)
    }

    return [save, saveIcon]
}

export default useSaveMutation;
5