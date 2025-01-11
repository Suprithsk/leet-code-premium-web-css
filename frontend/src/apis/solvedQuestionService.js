import apiClient from "./apiClient";

export const isSolvedByUser = async (questionId) => {
    try{
        const response = await apiClient.get(`/solvedQuestions/isSolvedByUser/${questionId}`);
        return response.data;
    }catch(error){
        console.error('Error checking if solved:', error);
        throw error;
    }
    
}

export const addSolvedQuestion = async (questionId) => {
    try{
        const response = await apiClient.post('/solvedQuestions/addSolvedQuestion',{questionId});
        return response.data;
    }catch(error){
        console.error('Error creating solved question:', error);
        throw error;
    }
}

export const removeSolvedQuestion = async (questionId) => {
    try{
        const response = await apiClient.delete(`/solvedQuestions/removeSolvedQuestion/${questionId}`);
        return response.data;
    }catch(error){
        console.error('Error removing solved question:', error);
        throw error;
    }
}