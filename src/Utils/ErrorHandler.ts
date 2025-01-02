import { AxiosError } from "axios"
import { toast } from "react-toastify";


export const errorHandler = (error: any)=>{
    if(error instanceof AxiosError)
        if(error.response)
            toast.error(error.response.data);
        else
            toast.error(error.message);
    
    else if(typeof(error) === 'string')
        toast.error(error);
    else
        toast.error(error.message);
}
