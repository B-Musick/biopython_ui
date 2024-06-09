import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaCheck, FaSave } from "react-icons/fa";

function useDeleteMutation(mutationFuncton, onSuccessAction, mutationKey){
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: mutationFuncton,
        onSuccess: (data) => {
            queryClient.invalidateQueries(mutationKey);
            onSuccessAction()
        }
    })

    let deleteItem = async (mutationObj) => {
        deleteMutation.mutate(mutationObj)
    }

    return [deleteItem]
}

export default useDeleteMutation;